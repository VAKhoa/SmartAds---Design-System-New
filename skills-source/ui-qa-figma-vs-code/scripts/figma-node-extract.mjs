#!/usr/bin/env node
// Làm phẳng JSON node Figma (REST `GET /v1/files/:key/nodes?ids=…` hoặc dump Plugin API có cấu trúc tương tự)
// thành cây layer gọn + thuộc tính quy về tên CSS, kèm tên token đã bind (tra id qua snapshot SDS).
// Dùng khi người dùng đưa file JSON export thay vì link Figma, hoặc để rút gọn output lớn trước khi so.
//
//   node figma-node-extract.mjs node.json [--sds <SDS-docs>] [--depth 6] [--json out.json]
//
// Output text: mỗi dòng 1 layer: `  name (TYPE #id) [w×h] key=value …` ; token bind ghi dạng value{token/name}.

import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import { normColor, round } from './lib/normalize.mjs';
import { findSdsRoot, loadIndex } from './token-index.mjs';

const JUSTIFY = { MIN: 'flex-start', CENTER: 'center', MAX: 'flex-end', SPACE_BETWEEN: 'space-between' };
const ALIGN = { MIN: 'flex-start', CENTER: 'center', MAX: 'flex-end', BASELINE: 'baseline' };
const WEIGHT = { Thin: 100, ExtraLight: 200, Light: 300, Regular: 400, Medium: 500, SemiBold: 600, Semi: 600, Bold: 700, ExtraBold: 800, Black: 900 };

export function extract(root, idx, { depth = 6, styleNames = {} } = {}) {
  const tok = (bv) => {
    if (!bv) return null;
    const id = Array.isArray(bv) ? bv[0]?.id : bv.id;
    if (!id) return null;
    const name = idx?.byId[id];
    return name || `[remote/stale ${id}]`;
  };
  const out = [];
  const walk = (n, d, parentLayout) => {
    if (d > depth || n.visible === false) return;
    const p = {}; const t = {}; const bv = n.boundVariables || {};
    const bb = n.absoluteBoundingBox || n.size || {};
    if (bb.width != null) { p.width = round(bb.width, 1); p.height = round(bb.height, 1); }
    if (n.layoutMode && n.layoutMode !== 'NONE') {
      p.display = 'flex'; p['flex-direction'] = n.layoutMode === 'HORIZONTAL' ? 'row' : 'column';
      if (n.layoutWrap === 'WRAP') p['flex-wrap'] = 'wrap';
      p['justify-content'] = JUSTIFY[n.primaryAxisAlignItems || 'MIN'];
      p['align-items'] = ALIGN[n.counterAxisAlignItems || 'MIN'];
      if (n.itemSpacing != null) { p.gap = n.primaryAxisAlignItems === 'SPACE_BETWEEN' ? 'auto' : n.itemSpacing; t.gap = tok(bv.itemSpacing); }
      for (const s of ['Top', 'Right', 'Bottom', 'Left']) { const k = `padding${s}`; if (n[k]) { p[`padding-${s.toLowerCase()}`] = n[k]; t[`padding-${s.toLowerCase()}`] = tok(bv[k]); } }
    }
    if (n.layoutSizingHorizontal) p['sizing-h'] = n.layoutSizingHorizontal; // FIXED/HUG/FILL
    if (n.layoutSizingVertical) p['sizing-v'] = n.layoutSizingVertical;
    for (const k of ['minWidth', 'maxWidth', 'minHeight', 'maxHeight']) if (n[k] != null) p[k.replace(/[A-Z]/, (m) => '-' + m.toLowerCase())] = n[k];
    // Fill
    const fill = (n.fills || []).find((f) => f.visible !== false);
    if (fill) {
      const key = n.type === 'TEXT' ? 'color' : n.type === 'VECTOR' || n.type === 'BOOLEAN_OPERATION' ? 'fill' : 'background-color';
      if (fill.type === 'SOLID') { p[key] = normColor({ ...fill.color, a: (fill.color?.a ?? 1) * (fill.opacity ?? 1) }); t[key] = tok(fill.boundVariables?.color) || tok(bv.fills); }
      else if (fill.type === 'IMAGE') p['background-image'] = `image:${fill.imageRef || '?'}`;
      else p[key] = fill.type.toLowerCase();
    }
    // Stroke
    const stroke = (n.strokes || []).find((s) => s.visible !== false);
    if (stroke) {
      const isb = n.individualStrokeWeights;
      if (isb) for (const s of ['top', 'right', 'bottom', 'left']) p[`border-${s}-width`] = isb[s];
      else p['border-width'] = n.strokeWeight;
      p['border-style'] = n.strokeDashes?.length || n.dashPattern?.length ? 'dashed' : 'solid';
      if (stroke.type === 'SOLID') { p['border-color'] = normColor({ ...stroke.color, a: (stroke.color?.a ?? 1) * (stroke.opacity ?? 1) }); t['border-color'] = tok(stroke.boundVariables?.color) || tok(bv.strokes); }
      if (n.strokeAlign && n.strokeAlign !== 'INSIDE') p['stroke-align'] = n.strokeAlign; // CSS border = INSIDE (box-sizing border-box)
    }
    // Radius
    if (n.rectangleCornerRadii) { const [a, b, c, e] = n.rectangleCornerRadii; p['border-radius'] = a === b && b === c && c === e ? a : `${a} ${b} ${c} ${e}`; }
    else if (n.cornerRadius) p['border-radius'] = n.cornerRadius;
    if (p['border-radius'] != null) t['border-radius'] = tok(bv.topLeftRadius) || tok(bv.cornerRadius);
    // Effects
    const fx = (n.effects || []).filter((e) => e.visible !== false);
    const sh = fx.filter((e) => /SHADOW/.test(e.type));
    if (sh.length) p['box-shadow'] = sh.map((e) => `${e.type === 'INNER_SHADOW' ? 'inset ' : ''}${e.offset.x}px ${e.offset.y}px ${e.radius}px ${e.spread || 0}px ${normColor(e.color)}`).join(', ');
    const blur = fx.find((e) => e.type === 'LAYER_BLUR'); if (blur) p.filter = `blur(${blur.radius}px)`;
    const bblur = fx.find((e) => e.type === 'BACKGROUND_BLUR'); if (bblur) p['backdrop-filter'] = `blur(${bblur.radius}px)`;
    if (n.opacity != null && n.opacity < 1) p.opacity = round(n.opacity, 3);
    if (n.clipsContent) p.overflow = 'hidden';
    // Text
    if (n.type === 'TEXT' && n.style) {
      const s = n.style;
      p['font-family'] = s.fontFamily; p['font-size'] = s.fontSize;
      p['font-weight'] = s.fontWeight || WEIGHT[(s.fontPostScriptName || '').split('-')[1]] || s.fontStyle;
      if (s.lineHeightPx) p['line-height'] = round(s.lineHeightPx, 2);
      if (s.letterSpacing) p['letter-spacing'] = round(s.letterSpacing, 2);
      if (s.textAlignHorizontal && s.textAlignHorizontal !== 'LEFT') p['text-align'] = s.textAlignHorizontal.toLowerCase();
      if (s.textCase && s.textCase !== 'ORIGINAL') p['text-transform'] = s.textCase.toLowerCase();
      p.text = (n.characters || '').slice(0, 40);
      t['font-size'] = tok(bv.fontSize); t['font-weight'] = tok(bv.fontWeight || bv.fontStyle); t['font-family'] = tok(bv.fontFamily);
    }
    const styleRefs = {};
    for (const [k, id] of Object.entries(n.styles || {})) styleRefs[k] = styleNames[id] || id;
    if (n.componentId) p.component = n.componentId;
    if (n.componentProperties) p.variant = Object.entries(n.componentProperties).filter(([, v]) => v.type === 'VARIANT').map(([k, v]) => `${k}=${v.value}`).join(',');
    out.push({ depth: d, id: n.id, name: n.name, type: n.type, props: p, tokens: Object.fromEntries(Object.entries(t).filter(([, v]) => v)), styles: styleRefs });
    for (const c of n.children || []) walk(c, d + 1, p['flex-direction']);
  };
  walk(root, 0);
  return out;
}

export function toText(list) {
  return list.map((x) => {
    const kv = Object.entries(x.props).filter(([k]) => !['width', 'height', 'text'].includes(k))
      .map(([k, v]) => `${k}=${v}${x.tokens[k] ? `{${x.tokens[k]}}` : ''}`).join(' ');
    const st = Object.entries(x.styles).map(([k, v]) => `${k}Style=${v}`).join(' ');
    return `${'  '.repeat(x.depth)}${x.name} (${x.type} #${x.id}) [${x.props.width}×${x.props.height}]${x.props.text ? ` "${x.props.text}"` : ''} ${kv} ${st}`.trimEnd();
  }).join('\n');
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = process.argv.slice(2);
  const opt = (k) => { const i = args.indexOf(k); return i >= 0 ? args.splice(i, 2)[1] : null; };
  const sds = findSdsRoot(process.cwd(), opt('--sds'));
  const depth = Number(opt('--depth') || 6); const jsonOut = opt('--json');
  if (!args[0]) { console.error('Dùng: node figma-node-extract.mjs node.json [--sds <SDS-docs>] [--depth 6] [--json out.json]'); process.exit(2); }
  const idx = sds ? await loadIndex(sds) : null;
  const raw = JSON.parse(fs.readFileSync(args[0], 'utf8'));
  // REST /nodes: { nodes: { "1:2": { document, styles } } } · REST /files: { document, styles } · dump: node trực tiếp
  const entries = raw.nodes ? Object.values(raw.nodes) : [{ document: raw.document || raw, styles: raw.styles || {} }];
  const all = [];
  for (const e of entries) {
    const styleNames = Object.fromEntries(Object.entries(e.styles || {}).map(([id, s]) => [id, s.name]));
    const list = extract(e.document, idx, { depth, styleNames });
    all.push(...list);
    console.log(toText(list));
  }
  if (jsonOut) fs.writeFileSync(jsonOut, JSON.stringify(all, null, 1));
  if (!idx) console.error('(không tìm thấy SDS-docs — không tra được tên token từ id)');
}
