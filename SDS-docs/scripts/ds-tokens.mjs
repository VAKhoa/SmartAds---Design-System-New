#!/usr/bin/env node
// ds-tokens: kiểm tra (lint) và gợi ý đổi tên (suggest) token theo ds-conventions.
// Dùng: node scripts/ds-tokens.mjs lint <file|thư-mục> [--json]
//       node scripts/ds-tokens.mjs suggest <file|thư-mục>
// Đọc 2 định dạng: "flat" (dump-variables.figma.js) và nhóm kiểu { $type, $value }.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

export const SIZE_ORDER = ['5xs', '4xs', '3xs', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl'];
export const SEGMENT_RENAMES = { sub: 'subtle', select: 'selected', press: 'pressed', xxxs: '3xs', xxs: '2xs', xxl: '2xl', xxxl: '3xl' };
export const WEIGHT_RENAMES = { semi: 'semibold', demi: 'semibold' };
const STATE_RE = '(rest|hover|pressed|press|focus|disabled|selected)';
const ATTR_STATE = new RegExp(`^(surface|text|border|icon)-${STATE_RE}$`);
const SEMANTIC_ROOTS = ['surface', 'text', 'border', 'icon'];

// ---------- đọc dữ liệu ----------
function walkJson(dir) {
  const st = fs.statSync(dir);
  if (st.isFile()) return [dir];
  return fs.readdirSync(dir).flatMap((f) => {
    const p = path.join(dir, f);
    return fs.statSync(p).isDirectory() ? walkJson(p) : p.endsWith('.json') ? [p] : [];
  });
}

function fromDtcg(obj, collection, trail = [], out = []) {
  if (obj && typeof obj === 'object') {
    if (obj.$value !== undefined) {
      out.push({ collection, name: trail.join('/'), type: String(obj.$type || '').toUpperCase(), values: { default: obj.$value } });
    }
    for (const [k, v] of Object.entries(obj)) {
      if (k.startsWith('$')) continue;
      fromDtcg(v, collection, [...trail, k], out);
    }
  }
  return out;
}

export function loadTokens(input) {
  const tokens = [];
  for (const file of walkJson(input)) {
    let json;
    try { json = JSON.parse(fs.readFileSync(file, 'utf8')); } catch { continue; }
    if (json && json.kind === 'overview') continue;
    if (json && json.kind === 'styles') {
      for (const s of json.text || []) tokens.push({ collection: 'TextStyles', name: s.name, type: 'TEXT_STYLE', values: { default: s.fontSize } });
      for (const s of json.effect || []) tokens.push({ collection: 'EffectStyles', name: s.name, type: 'EFFECT_STYLE', values: { default: null } });
    } else if (json && Array.isArray(json.variables)) {
      tokens.push(...json.variables);
    } else if (Array.isArray(json)) {
      tokens.push(...json.filter((t) => t && t.name));
    } else if (json && typeof json === 'object') {
      const collection = path.basename(file).split('.')[0];
      tokens.push(...fromDtcg(json, collection));
    }
  }
  return tokens;
}

// ---------- chuẩn hóa tên ----------
function normalizeSegment(seg, ctx) {
  let s = seg.trim().toLowerCase();
  s = s.replace(/\(.*?\)/g, '').trim();      // bỏ nội dung trong ngoặc
  s = s.replace(/\s*-\s*/g, '-').replace(/[\s_.]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
  if (SEGMENT_RENAMES[s]) s = SEGMENT_RENAMES[s];
  if (ctx.weights && WEIGHT_RENAMES[s]) s = WEIGHT_RENAMES[s];
  return s;
}

export function normalizeName(name) {
  const raw = name.split('/');
  const ctx = { weights: /^brand$/i.test(raw[0]) || /weight/i.test(name) };
  let segs = raw.map((s) => normalizeSegment(s, ctx)).filter(Boolean);

  // component/<tên>/[biến-thể…]/<thuộc-tính>-<trạng-thái>  →  component/<tên>/<thuộc-tính>/<biến-thể>/<trạng-thái>
  if (segs[0] === 'component' && segs.length >= 3) {
    const m = ATTR_STATE.exec(segs[segs.length - 1]);
    if (m) {
      const attr = m[1];
      const state = m[2] === 'press' ? 'pressed' : m[2];
      const middle = segs.slice(1, -1);
      const comp = middle[0];
      const variant = middle.slice(1).join('-') || 'default';
      segs = ['component', comp, attr, variant, state];
    }
  }
  return segs.join('/');
}

// ---------- lint ----------
function isNumber(v) { return typeof v === 'number' && Number.isFinite(v); }

function firstValue(t) {
  const vals = t.resolvedValues ? Object.values(t.resolvedValues) : t.values ? Object.values(t.values) : [];
  const v = vals[0];
  if (typeof v === 'string' && /^-?\d+(\.\d+)?$/.test(v)) return Number(v);
  return v;
}

export function lintTokens(tokens, config = {}) {
  const issues = [];
  const add = (level, rule, t, msg, extra = {}) => issues.push({ level, rule, collection: t.collection, name: t.name, message: msg, ...extra });
  const cols = config.collections || {};
  const inList = (list, c) => (list || []).some((x) => x.toLowerCase() === String(c).toLowerCase());

  for (const t of tokens) {
    const n = t.name;
    if (/\s/.test(n)) add('error', 'R01-space', t, 'Tên có khoảng trắng');
    if (/[()_.]/.test(n)) add('error', 'R03-chars', t, 'Tên có ký tự không hợp lệ ( ) _ .');
    if (/[A-Z]/.test(n)) add('warn', 'R02-case', t, 'Tên có chữ hoa; quy ước là chữ thường');
    const segs = n.toLowerCase().split('/').map((s) => s.trim());
    for (const s of segs) {
      if (SEGMENT_RENAMES[s]) add('warn', 'R05-term', t, `Đoạn "${s}" nên là "${SEGMENT_RENAMES[s]}"`);
    }
    const last = segs[segs.length - 1] || '';
    if (segs[0] === 'component' && ATTR_STATE.test(last)) add('warn', 'R08-state-position', t, 'Trạng thái nằm trong đoạn thuộc tính; nên tách thành .../<thuộc-tính>/<biến-thể>/<trạng-thái>');
    if (segs[0] === 'component' && (inList(cols.semantic, t.collection) && !inList(cols.component, t.collection))) {
      add('warn', 'R07-tier', t, `Token Component nằm trong collection Semantic "${t.collection}"`);
    }
    if (SEMANTIC_ROOTS.includes(segs[0]) && inList(cols.component, t.collection)) {
      add('warn', 'R07-tier', t, `Token Semantic nằm trong collection Component "${t.collection}"`);
    }
  }

  // R04: thang kích thước phải tăng dần theo tên
  const groups = new Map();
  for (const t of tokens) {
    const segs = t.name.split('/');
    const key = `${t.collection}::${segs.slice(0, -1).join('/').toLowerCase()}`;
    const tail = normalizeSegment(segs[segs.length - 1], {}).replace(/^fs-/, '');
    const idx = SIZE_ORDER.indexOf(tail);
    const val = firstValue(t);
    if (idx >= 0 && isNumber(val)) {
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push({ t, idx, val });
    }
  }
  for (const [key, items] of groups) {
    items.sort((a, b) => a.idx - b.idx);
    for (let i = 1; i < items.length; i++) {
      if (items[i].val < items[i - 1].val) {
        add('error', 'R04-order', items[i].t,
          `Thang không tăng dần: "${items[i - 1].t.name}"=${items[i - 1].val} lớn hơn "${items[i].t.name}"=${items[i].val}`, { group: key });
      }
    }
  }

  // R06: trùng tên sau khi chuẩn hóa
  const seen = new Map();
  for (const t of tokens) {
    const k = `${t.collection}::${normalizeName(t.name)}`;
    if (seen.has(k) && seen.get(k) !== t.name) add('error', 'R06-duplicate', t, `Trùng với "${seen.get(k)}" sau khi chuẩn hóa → "${normalizeName(t.name)}"`);
    else seen.set(k, t.name);
  }
  return issues;
}

// ---------- gợi ý đổi tên ----------
export function suggestRenames(tokens) {
  const items = [];
  for (const t of tokens) {
    const to = normalizeName(t.name);
    if (to !== t.name) {
      items.push({ collection: t.collection, from: t.name, to, reason: 'Chuẩn hóa theo ds-conventions (kebab-case, thuật ngữ, vị trí trạng thái)', status: 'proposed' });
    }
  }
  const lintOrder = lintTokens(tokens).filter((i) => i.rule === 'R04-order');
  const groups = [...new Set(lintOrder.map((i) => i.group))];
  for (const g of groups) {
    items.push({ collection: g.split('::')[0], from: g.split('::')[1] + '/*', to: null, reason: 'Thang kích thước đảo chiều; cần quyết định D4 rồi gán lại tên theo giá trị', status: 'needs-decision' });
  }
  return items;
}

// ---------- CLI ----------
function loadConfig() {
  try { return JSON.parse(fs.readFileSync('ds.config.json', 'utf8')); } catch { return {}; }
}

function main(argv) {
  const [cmd, input, ...flags] = argv;
  if (!cmd || !input || !['lint', 'suggest'].includes(cmd)) {
    console.error('Dùng: node scripts/ds-tokens.mjs <lint|suggest> <file|thư-mục> [--json]');
    process.exit(2);
  }
  if (!fs.existsSync(input)) { console.error(`Không thấy: ${input}`); process.exit(2); }
  const tokens = loadTokens(input);
  if (!tokens.length) { console.error('Không đọc được token nào. Kiểm tra định dạng file.'); process.exit(2); }

  if (cmd === 'suggest') {
    const items = suggestRenames(tokens);
    console.log(JSON.stringify({ generated: 'proposed', count: items.length, items }, null, 2));
    return;
  }
  const issues = lintTokens(tokens, loadConfig());
  if (flags.includes('--json')) { console.log(JSON.stringify({ tokens: tokens.length, issues }, null, 2)); }
  else {
    const by = { error: 0, warn: 0 };
    for (const i of issues) { by[i.level]++; console.log(`${i.level.toUpperCase().padEnd(5)} ${i.rule.padEnd(18)} [${i.collection}] ${i.name} – ${i.message}`); }
    console.log(`\n${tokens.length} token · ${by.error} error · ${by.warn} warn`);
  }
  process.exit(issues.some((i) => i.level === 'error') ? 1 : 0);
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) main(process.argv.slice(2));
