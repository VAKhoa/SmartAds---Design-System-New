#!/usr/bin/env node
// Chỉ mục token SDS (Light mode) từ bản chụp Figma: tên Figma ↔ tên CSS ↔ giá trị ↔ gate.
// Chỉ đọc. Không gọi Figma.
//
// Cách dùng (chạy từ bất kỳ đâu trong repo SDS, hoặc truyền --sds <thư mục SDS-docs>):
//   node token-index.mjs value "#048845"          → token nào có giá trị này (ưu tiên semantic/component, gate A/B)
//   node token-index.mjs value 12 --kind dim       → token kích thước = 12px
//   node token-index.mjs name surface/primary       → giá trị, css var, gate, chuỗi alias
//   node token-index.mjs css --sa-surface-primary   → tên Figma + giá trị của biến CSS
//   node token-index.mjs id VariableID:12:849       → tên token theo id (dùng cho boundVariables)
//   node token-index.mjs style "Brand/Body-xs/Regular" → thông số text/effect style
//   node token-index.mjs dump > tokens.min.json     → toàn bộ chỉ mục rút gọn (cho compare.mjs --tokens)
// Thêm --json để in JSON.

import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { normColor } from './lib/normalize.mjs';

const FILES = ['primitives', 'spacing', 'alias', 'text', 'viewport-desktop', 'viewport-mobile-tablet'];

export function findSdsRoot(start = process.cwd(), explicit = null) {
  if (explicit) return path.resolve(explicit);
  let dir = path.resolve(start);
  for (;;) {
    for (const cand of [dir, path.join(dir, 'SDS-docs')]) {
      if (fs.existsSync(path.join(cand, 'ds.config.json')) && fs.existsSync(path.join(cand, 'variable-figma-export'))) return cand;
    }
    const up = path.dirname(dir);
    if (up === dir) return null;
    dir = up;
  }
}

const slug = (name) => String(name).toLowerCase().replace(/\([^)]*\)/g, ' ').replace(/%/g, '')
  .replace(/[\s/_.]+/g, '-').replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-').replace(/^-|-$/g, '');

export async function loadIndex(sdsRoot) {
  const cfg = JSON.parse(fs.readFileSync(path.join(sdsRoot, 'ds.config.json'), 'utf8'));
  const prefix = cfg.prefix || 'sa';
  const dir = path.join(sdsRoot, 'variable-figma-export');
  // Gate A/B/E: dùng build-tokens.mjs của repo nếu import được, nếu không thì bỏ trống.
  let gates = {};
  try {
    const mod = await import(pathToFileURL(path.join(sdsRoot, 'scripts', 'build-tokens.mjs')).href);
    const built = mod.buildTokens({ root: sdsRoot });
    for (const col of Object.values(built.collections)) for (const [n, t] of Object.entries(col.tokens)) gates[n] = { gate: t.gate, reasons: t.gateReasons };
  } catch { gates = {}; }
  const usage = fs.existsSync(path.join(dir, 'usage.json')) ? JSON.parse(fs.readFileSync(path.join(dir, 'usage.json'), 'utf8')) : null;
  const tokens = {}; const byId = {}; let readDate = null;
  for (const f of FILES) {
    const p = path.join(dir, `variables.${f}.json`);
    if (!fs.existsSync(p)) continue;
    const j = JSON.parse(fs.readFileSync(p, 'utf8'));
    readDate = j.readDate;
    const mode = (j.modes.find((m) => /light/i.test(m.name)) || j.modes[0]).name; // D9: chỉ Light
    for (const v of j.variables) {
      const raw = v.values?.[mode];
      const resolved = v.resolvedValues?.[mode] ?? raw;
      const t = {
        name: v.name, id: v.id, collection: j.collection.trim(), type: v.type,
        css: `--${prefix}-${slug(v.name)}`,
        alias: raw && typeof raw === 'object' ? raw.alias : null,
        value: v.type === 'COLOR' ? normColor(resolved) : resolved,
        deprecated: /DEPRECATED/i.test(v.description || ''),
        ...(gates[v.name] || {}),
      };
      tokens[v.name] = t; byId[v.id] = v.name;
    }
  }
  const styles = JSON.parse(fs.readFileSync(path.join(dir, 'styles.json'), 'utf8'));
  return { sdsRoot, prefix, readDate, fileKey: cfg.figma?.fileKey, tokens, byId, styles, usage };
}

const TIER = (n) => (/^component\//.test(n) ? 0 : /^(text|surface|border|background|overlay|chart|foreground)\//.test(n) ? 1 : /^(spacing|radius|typography)\//.test(n) ? 1 : 2);

/** Token có giá trị = value. kind: 'color' | 'dim' | auto. Sắp: gate A/B trước, component/semantic trước primitive. */
export function byValue(idx, value, kind = 'auto') {
  const isColor = kind === 'color' || (kind === 'auto' && /^#|^rgb/i.test(String(value)));
  const target = isColor ? normColor(value) : Number(String(value).replace(/px$/, ''));
  return Object.values(idx.tokens)
    .filter((t) => (isColor ? t.type === 'COLOR' && t.value === target : t.type === 'FLOAT' && Number(t.value) === target))
    .filter((t) => !t.deprecated)
    .sort((a, b) => (a.gate === 'E') - (b.gate === 'E') || TIER(a.name) - TIER(b.name) || a.name.localeCompare(b.name));
}

export function byCss(idx, cssVar) {
  const v = cssVar.trim().replace(/^var\(|\)$/g, '');
  return Object.values(idx.tokens).find((t) => t.css === v) || null;
}

export function aliasChain(idx, name) {
  const chain = [name]; let cur = idx.tokens[name];
  while (cur?.alias && chain.length < 8) { chain.push(cur.alias); cur = idx.tokens[cur.alias]; }
  return chain;
}

export function findStyle(idx, name) {
  for (const kind of ['text', 'effect', 'paint', 'grid']) {
    const s = (idx.styles[kind] || []).find((x) => x.name === name);
    if (s) return { kind, ...s };
  }
  return null;
}

const brief = (t) => `${t.name}  ${t.css}  = ${t.value}${t.gate ? `  [gate ${t.gate}${t.reasons ? ': ' + t.reasons.join(',') : ''}]` : ''}${t.deprecated ? '  DEPRECATED' : ''}`;

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = process.argv.slice(2);
  const opt = (k) => { const i = args.indexOf(k); return i >= 0 ? args.splice(i, 2)[1] : null; };
  const json = args.includes('--json'); if (json) args.splice(args.indexOf('--json'), 1);
  const sds = findSdsRoot(process.cwd(), opt('--sds'));
  const kind = opt('--kind') || 'auto';
  if (!sds) { console.error('Không tìm thấy thư mục SDS-docs (cần ds.config.json + variable-figma-export/). Dùng --sds <path>.'); process.exit(2); }
  const idx = await loadIndex(sds);
  const [cmd, q] = args;
  let out;
  if (cmd === 'value') out = byValue(idx, q, kind);
  else if (cmd === 'name') out = idx.tokens[q] ? { ...idx.tokens[q], chain: aliasChain(idx, q) } : null;
  else if (cmd === 'css') out = byCss(idx, q);
  else if (cmd === 'id') out = idx.byId[q] ? idx.tokens[idx.byId[q]] : null;
  else if (cmd === 'style') out = findStyle(idx, q);
  else if (cmd === 'dump') {
    out = { readDate: idx.readDate, fileKey: idx.fileKey, prefix: idx.prefix, tokens: Object.fromEntries(Object.values(idx.tokens).map((t) => [t.name, { css: t.css, value: t.value, type: t.type, gate: t.gate, alias: t.alias, deprecated: t.deprecated || undefined }])) };
    console.log(JSON.stringify(out)); process.exit(0);
  } else { console.error('Lệnh: value | name | css | id | style | dump'); process.exit(2); }
  if (json || !Array.isArray(out)) console.log(out == null ? '[NOT FOUND]' : JSON.stringify(out, null, 1));
  else console.log(out.length ? out.slice(0, 12).map(brief).join('\n') + (out.length > 12 ? `\n… +${out.length - 12}` : '') : '[NOT FOUND] không token nào có giá trị này');
  console.error(`(snapshot ${idx.readDate}, ${Object.keys(idx.tokens).length} token, Light mode)`);
}
