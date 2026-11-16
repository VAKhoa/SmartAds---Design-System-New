#!/usr/bin/env node
// Sinh tokens/generated/tokens.json từ bản chụp Figma trong variable-figma-export/.
// - Chỉ đọc file đầu vào; không gọi Figma, không sửa export.
// - Mode: theo ds.config.json "themes" (hiện ["light"]: collection Alias chỉ giữ mode Light).
// - Mỗi token có "gate": A (khớp Figma + theme website), B (chỉ Figma, qua gate), E (không qua gate, kèm "gateReasons").
//   Quy tắc gate: xem docs/_audit/SDS-RECONCILIATION.md §3.1.
// - "orphan" dựa trên variable-figma-export/usage.json (xuất bằng scripts/dump-usage.figma.js).
// Cách chạy: node scripts/build-tokens.mjs [--out tokens/generated/tokens.json]

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { cssVarName } from './css-name.mjs';
import { colorNames, dimensionNames, primitiveColorNames } from '../website/scripts/theme-tokens.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const EXPORT_FILES = ['primitives', 'spacing', 'alias', 'text', 'viewport-desktop', 'viewport-mobile-tablet'];
const USED_BY_THEME = new Set([...colorNames, ...dimensionNames, ...primitiveColorNames, 'typography/family/display']);

const readJson = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));

function luminance(hex) {
  const h = hex.replace('#', '').slice(0, 6);
  const c = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255).map((x) => (x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
export function contrast(a, b) {
  const x = luminance(a); const y = luminance(b);
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
}

const TYPO = /sematic|sucess|waring|campagin|subtitble|-haf\b|pannel/i;

/** Trả về danh sách lý do không qua gate cho một token. */
export function gateReasons(ctx) {
  const { collection, name, type, resolved, aliasTarget, unusedSet, dupSeen, isAliasCol } = ctx;
  const r = [];
  if (unusedSet.has(name)) r.push('orphan');
  if (/[A-Z ()]/.test(name) || TYPO.test(name)) r.push('naming');
  if (name.startsWith('color/semantic tokens/') || (collection === 'Primitives' && type === 'BOOLEAN') ||
      (collection === 'Spacing' && (name.startsWith('screen/') || name.startsWith('typography/text/')))) r.push('tier');
  if (isAliasCol && !aliasTarget) r.push('hardcode');
  if (isAliasCol && !/^(component|overlay|chart|sematic)\//.test(name) &&
      /(^|[/-])(white|black|gray|green|blue|red|yellow)([/-]|$)/.test(name.split('/').slice(1).join('/'))) r.push('value-named');
  if (isAliasCol && /^(text|surface|border|background)\//.test(name) && aliasTarget) {
    const k = `${name.split('/')[0]}|${aliasTarget}`;
    if (dupSeen[k]) r.push(`duplicate:${dupSeen[k]}`); else dupSeen[k] = name;
  }
  if (name.startsWith('typography/size/')) r.push('scale-order');
  if (name === 'typography/family/text') r.push('duplicate:typography/family/display');
  if (name === 'spacing/lg' || name === 'spacing/odd-7') r.push('naming');
  if (name === 'surface/primary-default') r.push('misleading');
  if (name === 'space/1536' || (collection === 'Viewport Desktop' && name === 'Screen/Container/size-screen-width')) r.push('value');
  if (isAliasCol && name.startsWith('text/') && typeof resolved === 'string' && /^#[0-9a-f]{6}/i.test(resolved) && !/disable|inverse|white/.test(name)) {
    const bg = '#ffffff';
    const c = contrast(resolved, bg);
    if (c < 4.5) r.push(`a11y:${c.toFixed(2)}`);
  }
  if (name === 'text/on-primary-white' && typeof resolved === 'string') {
    const c = contrast(resolved, '#048845');
    if (c < 4.5) r.push(`a11y:${c.toFixed(2)}`);
  }
  return r;
}

export function buildTokens({ root = ROOT } = {}) {
  const config = readJson(path.join(root, 'ds.config.json'));
  const themes = config.themes || ['light'];
  const exportDir = path.join(root, 'variable-figma-export');
  const usagePath = path.join(exportDir, 'usage.json');
  const usage = fs.existsSync(usagePath) ? readJson(usagePath) : { unused: {}, unusedStyles: [] };
  const wantDark = themes.includes('dark');
  const out = {
    $comment: 'File SINH RA bởi scripts/build-tokens.mjs — không sửa tay. Nguồn: variable-figma-export/ + usage.json.',
    fileKey: config.figma.fileKey, themes, collections: {}, styles: {},
  };
  const stats = { A: 0, B: 0, E: 0 };
  let readDate = null;
  for (const f of EXPORT_FILES) {
    const j = readJson(path.join(exportDir, `variables.${f}.json`));
    readDate = j.readDate;
    const colKey = j.collection;
    const isAliasCol = colKey === 'Alias';
    const modes = isAliasCol && !wantDark ? j.modes.filter((m) => /light/i.test(m.name)) : j.modes;
    const unusedSet = new Set(usage.unused?.[colKey] || []);
    const dupSeen = {};
    const tokens = {};
    for (const v of j.variables) {
      const values = {};
      for (const m of modes) {
        const x = v.values[m.name];
        values[m.name] = x && typeof x === 'object' && x.alias ? { alias: x.alias, resolved: v.resolvedValues?.[m.name] ?? null } : x;
      }
      const first = values[modes[0].name];
      const aliasTarget = first && typeof first === 'object' ? first.alias : null;
      const resolved = aliasTarget ? first.resolved : first;
      const reasons = gateReasons({ collection: colKey.trim(), name: v.name, type: v.type, resolved, aliasTarget, unusedSet, dupSeen, isAliasCol });
      const gate = reasons.length ? 'E' : (USED_BY_THEME.has(v.name) ? 'A' : 'B');
      stats[gate]++;
      tokens[v.name] = { id: v.id, type: v.type, values, gate, ...(reasons.length ? { gateReasons: reasons } : {}), css: cssVarName(config.prefix, v.name) };
    }
    out.collections[colKey.trim()] = { modes: modes.map((m) => m.name), count: j.variables.length, tokens };
  }
  const styles = readJson(path.join(exportDir, 'styles.json'));
  const unusedStyles = new Set(usage.unusedStyles || []);
  for (const kind of ['text', 'effect', 'paint', 'grid']) {
    out.styles[kind] = (styles[kind] || [])
      .filter((s) => wantDark || !/-dark(\/|$)/.test(s.name))
      .map((s) => ({ name: s.name, usedByComponents: !unusedStyles.has(s.name) }));
  }
  out.meta = { readDate, usageReadDate: usage.readDate || null, gateCounts: stats, gateLegend: { A: 'khớp Figma + theme website, qua gate', B: 'chỉ Figma, qua gate (chưa có code)', E: 'không qua gate (xem gateReasons)' } };
  return out;
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const i = process.argv.indexOf('--out');
  const outPath = path.resolve(ROOT, i > 0 ? process.argv[i + 1] : 'tokens/generated/tokens.json');
  const result = buildTokens();
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, JSON.stringify(result, null, 1) + '\n');
  console.log(`Đã ghi ${path.relative(ROOT, outPath)} — gate A/B/E: ${JSON.stringify(result.meta.gateCounts)}`);
}
