#!/usr/bin/env node
// So sánh cặp thuộc tính Figma ↔ code theo luật QA của skill, sinh khung báo cáo Markdown.
// Đầu vào: một file JSON "pairs" (schema ở references/pairs-schema.md). Chỉ đọc file đầu vào + snapshot token.
//
//   node compare.mjs pairs.json [--sds <SDS-docs>] [--out report.md] [--json result.json]
//
// Script quyết định phần tất định: chuẩn hoá giá trị, chênh lệch, Token đúng?, mức độ, điểm khớp.
// Phần cần phán đoán (gợi ý sửa sâu, góp ý Designer, giả định) do AI viết thêm vào báo cáo.

import fs from 'node:fs';
import { pathToFileURL } from 'node:url';
import { normColor, parsePx, normWeight, normFamily, lineHeightPx, letterSpacingPx, parseShadow, round } from './lib/normalize.mjs';
import { findSdsRoot, loadIndex, byValue, byCss } from './token-index.mjs';

const SEV_RANK = { pass: 0, note: 1, minor: 2, major: 3, critical: 4, unknown: -1 };
const SEV_LABEL = { pass: '✅ Pass', note: '📝 Ghi chú', minor: '🟡 Minor', major: '🟠 Major', critical: '🔴 Critical', unknown: '❔ N/A' };
const maxSev = (...s) => s.filter(Boolean).reduce((a, b) => (SEV_RANK[b] > SEV_RANK[a] ? b : a), 'pass');

// Nhóm thuộc tính → cách so.
const DIM_PROPS = /^(padding|margin|gap|row-gap|column-gap|width|height|min-|max-|border(-\w+)?-width|border(-\w+)*-radius|top|left|right|bottom|font-size|line-height|letter-spacing|icon-size|outline-width|outline-offset)/;
const LAYOUT_PROPS = /^(display|flex-direction|justify-content|align-items|align-self|align-content|flex-wrap|order|position|grid-template|grid-auto-flow|child-order)/;
const ENUM_MAJOR = /^(text-align|border(-\w+)?-style|text-transform|text-decoration|overflow|white-space|font-style|cursor|visibility|object-fit|vertical-align)/;
const COLOR_PROPS = /(color|^background|^fill|^stroke)$/;

function groupOf(prop, explicit) {
  if (explicit) return explicit;
  if (prop === 'presence' || prop === 'element' || prop === 'state') return 'presence';
  if (prop === 'box-shadow' || prop === 'shadow') return 'shadow';
  if (prop === 'opacity') return 'opacity';
  if (prop === 'font-weight') return 'weight';
  if (prop === 'font-family') return 'family';
  if (prop === 'aspect-ratio') return 'ratio';
  if (prop === 'z-index') return 'zindex';
  if (COLOR_PROPS.test(prop) || /-color$/.test(prop)) return 'color';
  if (DIM_PROPS.test(prop)) return 'dim';
  if (LAYOUT_PROPS.test(prop)) return 'layout';
  if (ENUM_MAJOR.test(prop)) return 'enum';
  if (prop === 'asset' || prop === 'icon') return 'asset';
  return 'enum';
}

const dimSev = (d) => (d == null ? 'unknown' : d === 0 ? 'pass' : d <= 1 ? 'note' : d <= 4 ? 'minor' : 'major');

/** So giá trị → {sev, diff, f, c} */
export function compareValue(p, ctx) {
  const g = groupOf(p.prop, p.group);
  const fs_ = ctx.fontSize ?? 16;
  if (p.figma == null && p.code == null) return { g, sev: 'unknown', diff: 'thiếu cả hai giá trị' };
  if (p.code == null || p.code === '[NOT FOUND]') return { g, sev: 'unknown', diff: 'không đọc được giá trị code', f: p.figma };
  if (p.figma == null) return { g, sev: 'unknown', diff: 'Figma không có giá trị', c: p.code };
  switch (g) {
    case 'color': {
      const f = normColor(p.figma), c = normColor(p.code);
      if (!f || !c) return { g, sev: 'unknown', diff: 'không chuẩn hoá được màu', f: p.figma, c: p.code };
      if (f === c) return { g, sev: 'pass', diff: '—', f, c };
      const brand = p.brand ?? ctx.brandColors.has(f);
      return { g, sev: brand ? 'critical' : 'major', diff: `${f} ≠ ${c}${brand ? ' (màu thương hiệu)' : ''}`, f, c };
    }
    case 'dim': {
      let f, c;
      if (p.prop === 'line-height') { f = lineHeightPx(p.figma, fs_); c = lineHeightPx(p.code, fs_); }
      else if (p.prop === 'letter-spacing') { f = letterSpacingPx(p.figma, fs_); c = letterSpacingPx(p.code, fs_); }
      else { f = parsePx(p.figma, { fontSize: fs_ }); c = parsePx(p.code, { fontSize: fs_ }); }
      if (f == null || c == null) {
        const same = String(p.figma).trim() === String(p.code).trim();
        return { g, sev: same ? 'pass' : 'unknown', diff: same ? '—' : 'không quy được về px', f: p.figma, c: p.code };
      }
      const d = round(Math.abs(f - c));
      return { g, sev: dimSev(d), diff: d === 0 ? '—' : `${c - f > 0 ? '+' : '−'}${d}px`, f: `${round(f)}px`, c: `${round(c)}px` };
    }
    case 'weight': {
      const f = normWeight(p.figma), c = normWeight(p.code);
      return { g, sev: f === c ? 'pass' : 'major', diff: f === c ? '—' : `${f} ≠ ${c}`, f, c };
    }
    case 'family': {
      const f = normFamily(p.figma), c = normFamily(p.code);
      return { g, sev: f === c ? 'pass' : 'major', diff: f === c ? '—' : `"${f}" ≠ "${c}"`, f: p.figma, c: p.code };
    }
    case 'opacity': {
      const f = Number(p.figma), c = Number(p.code); const d = round(Math.abs(f - c), 3);
      return { g, sev: d <= 0.01 ? 'pass' : d <= 0.1 ? 'minor' : 'major', diff: d <= 0.01 ? '—' : `Δ${d}`, f, c };
    }
    case 'shadow': {
      const F = parseShadow(p.figma), C = parseShadow(p.code);
      if (F.length !== C.length) return { g, sev: F.length === 0 || C.length === 0 ? 'major' : 'minor', diff: `số lớp ${F.length} ≠ ${C.length}`, f: fmtShadow(F), c: fmtShadow(C) };
      let sev = 'pass'; const notes = [];
      F.forEach((a, i) => {
        const b = C[i];
        for (const k of ['x', 'y', 'blur', 'spread']) { const d = Math.abs(a[k] - b[k]); if (d) { sev = maxSev(sev, d <= 1 ? 'note' : 'minor'); notes.push(`L${i + 1}.${k} ${a[k]}→${b[k]}`); } }
        if (a.color !== b.color) { sev = maxSev(sev, 'minor'); notes.push(`L${i + 1}.color ${a.color}→${b.color}`); }
        if (a.inset !== b.inset) { sev = maxSev(sev, 'major'); notes.push(`L${i + 1} inset khác`); }
      });
      return { g, sev, diff: notes.join('; ') || '—', f: fmtShadow(F), c: fmtShadow(C) };
    }
    case 'ratio': {
      const toN = (v) => { const [a, b] = String(v).split('/').map(Number); return b ? a / b : a; };
      const d = Math.abs(toN(p.figma) - toN(p.code));
      return { g, sev: d < 0.01 ? 'pass' : 'major', diff: d < 0.01 ? '—' : `${p.figma} ≠ ${p.code}`, f: p.figma, c: p.code };
    }
    case 'layout': {
      const same = norm(p.figma) === norm(p.code);
      return { g, sev: same ? 'pass' : 'critical', diff: same ? '—' : `${p.figma} ≠ ${p.code} (sai layout)`, f: p.figma, c: p.code };
    }
    case 'presence': {
      const ok = Boolean(p.code) && p.code !== 'missing';
      return { g, sev: ok ? 'pass' : 'critical', diff: ok ? '—' : 'thiếu trong code', f: p.figma, c: p.code };
    }
    case 'asset': {
      const same = norm(p.figma) === norm(p.code);
      return { g, sev: same ? 'pass' : 'major', diff: same ? '—' : 'sai asset/icon', f: p.figma, c: p.code };
    }
    default: {
      const same = norm(p.figma) === norm(p.code);
      return { g, sev: same ? 'pass' : g === 'zindex' ? 'minor' : 'major', diff: same ? '—' : `${p.figma} ≠ ${p.code}`, f: p.figma, c: p.code };
    }
  }
}
const norm = (v) => String(v).trim().toLowerCase().replace(/^flex-(start|end)$/, '$1').replace(/^(start|left)$/, 'start').replace(/^(end|right)$/, 'end').replace(/\s+/g, ' ');
const fmtShadow = (L) => (L.length ? L.map((s) => `${s.inset ? 'inset ' : ''}${s.x}px ${s.y}px ${s.blur}px ${s.spread}px ${s.color}`).join(', ') : 'none');

// Token gợi ý theo vai trò thuộc tính: text → text/*, nền → surface|background, viền → border/*, khoảng cách → spacing/*, bo góc → radius/*.
function roleRank(prop, name) {
  const pref = prop === 'color' ? /^(text\/|component\/[^/]+\/text)/
    : /background/.test(prop) ? /^(surface\/|background\/|component\/[^/]+\/(surface|card|cell))/
    : /border.*color|outline-color/.test(prop) ? /^(border\/|component\/[^/]+\/border)/
    : /radius/.test(prop) ? /^radius\//
    : /padding|margin|gap/.test(prop) ? /^(spacing\/|component\/[^/]+\/(cell\/)?(padding|gap))/
    : /fill|stroke/.test(prop) ? /^component\/icon\//
    : null;
  return pref && pref.test(name) ? 0 : /^(color|space)\//.test(name) ? 2 : 1;
}

/** Kiểm tra token: dev có dùng đúng biến không? → {ok, label, sev, fix, kind} */
export function checkToken(p, cmp, idx) {
  const authored = p.codeAuthored ?? null;
  const expTok = p.figmaToken ? idx.tokens[p.figmaToken] : null;
  const expCss = expTok?.css ?? null;
  const vars = authored ? [...String(authored).matchAll(/var\(\s*(--[\w-]+)/g)].map((m) => m[1]) : [];
  const sdsVar = vars.find((v) => v.startsWith(`--${idx.prefix}-`));
  const foreignVar = vars.find((v) => !v.startsWith(`--${idx.prefix}-`));
  const fixTo = expCss ? `var(${expCss})` : null;

  if (cmp.g === 'layout' || cmp.g === 'presence' || cmp.g === 'enum' || cmp.g === 'asset' || cmp.g === 'zindex' || cmp.g === 'ratio') return { ok: null, label: '—', sev: 'pass' };
  if (!p.figmaToken && p.figmaStyle) {
    // Figma dùng style (text/effect) — SDS chưa có quy ước biến CSS cho style [NOT FOUND] → không phạt hard-code.
    return { ok: null, label: `🎨 style \`${p.figmaStyle}\``, sev: 'pass' };
  }
  if (authored == null) return { ok: null, label: '❔ không có khai báo trực tiếp (kế thừa / không đọc được)', sev: 'pass', kind: 'unknown' };
  if (!p.figmaToken) {
    // Figma không bind token → lỗi phía Designer, không trừ điểm Dev.
    const cands = cmp.g === 'color' ? byValue(idx, cmp.f, 'color') : cmp.g === 'dim' ? byValue(idx, parseFloat(cmp.f), 'dim') : [];
    const best = cands.filter((t) => t.gate !== 'E').sort((a, b) => roleRank(p.prop, a.name) - roleRank(p.prop, b.name))[0];
    const hint = best?.name;
    const hintNote = best && roleRank(p.prop, best.name) !== 0 ? ' (khác vai trò — cân nhắc thêm token đúng vai trò)' : '';
    return { ok: null, label: `⚠ Figma chưa bind token${hint ? ` (gần nhất: \`${hint}\`${hintNote})` : ''}`, sev: 'pass', kind: 'figma-unbound', designerHint: hint, hintNote };
  }
  if (sdsVar && sdsVar === expCss) return { ok: true, label: '✅ đúng token', sev: 'pass' };
  if (sdsVar) {
    const used = byCss(idx, sdsVar);
    if (!used) return { ok: false, label: `❌ \`${sdsVar}\` không có trong SDS`, sev: 'major', fix: fixTo, kind: 'unknown-var' };
    const sameVal = used.value === expTok.value || String(used.value) === String(expTok.value);
    return sameVal
      ? { ok: false, label: `⚠ token khác cùng giá trị (\`${used.name}\`)`, sev: 'minor', fix: fixTo, kind: 'wrong-semantic' }
      : { ok: false, label: `❌ sai token (\`${used.name}\`)`, sev: 'major', fix: fixTo, kind: 'wrong-token' };
  }
  if (foreignVar) return { ok: false, label: `❌ biến ngoài SDS \`${foreignVar}\``, sev: 'major', fix: fixTo, kind: 'foreign-var' };
  return { ok: false, label: '❌ hard-code', sev: 'major', fix: fixTo, kind: 'hardcode' };
}

export function run(input, idx) {
  const brandColors = new Set(input.brandColors?.map(normColor) || Object.values(idx.tokens).filter((t) => /^color\/primary\//.test(t.name)).map((t) => t.value));
  const comps = []; const tokenErrors = []; const designer = []; const counts = { critical: 0, major: 0, minor: 0, note: 0 };
  let checked = 0, matched = 0;
  for (const comp of input.components || []) {
    const rows = [];
    for (const p of comp.props || []) {
      const fontSize = parsePx(comp.fontSize ?? (comp.props.find((x) => x.prop === 'font-size')?.figma)) ?? 16;
      const cmp = compareValue(p, { brandColors, fontSize });
      const tok = checkToken(p, cmp, idx);
      const sev = cmp.sev === 'unknown' ? 'unknown' : maxSev(cmp.sev, tok.sev);
      if (sev !== 'unknown') { checked++; if (SEV_RANK[cmp.sev] <= 1) matched++; }
      if (counts[sev] != null) counts[sev]++;
      if (tok.kind && !['figma-unbound', 'unknown'].includes(tok.kind)) tokenErrors.push({ comp: comp.name, prop: p.prop, state: p.state, selector: p.selector || comp.codeSelector, authored: p.codeAuthored, kind: tok.kind, fix: tok.fix, figmaToken: p.figmaToken, file: p.file });
      if (tok.kind === 'figma-unbound') designer.push({ comp: comp.name, prop: p.prop, value: cmp.f, hint: tok.designerHint, hintNote: tok.hintNote });
      const ft = p.figmaToken && idx.tokens[p.figmaToken];
      if (p.figmaToken && !ft) designer.push({ comp: comp.name, prop: p.prop, value: cmp.f, issue: `bind \`${p.figmaToken}\` không có trong snapshot (remote/stale/đã xoá)` });
      else if (ft && (ft.gate === 'E' || ft.deprecated)) designer.push({ comp: comp.name, prop: p.prop, value: cmp.f, issue: `bind \`${p.figmaToken}\` ${ft.deprecated ? 'DEPRECATED' : `gate E (${(ft.reasons || []).join(', ')})`}` });
      const fix = p.fix || (sev === 'pass' || sev === 'note' || sev === 'unknown' ? ''
        : cmp.g === 'presence' ? `Bổ sung: ${p.figma}`
        : tok.fix ? `\`${p.prop}: ${tok.fix}\`` : cmp.f != null ? `\`${p.prop}: ${cmp.f}\`` : '');
      rows.push({ prop: p.state && p.state !== 'default' ? `${p.prop} :${p.state}` : p.prop, figma: fmtF(p, cmp), code: fmtC(p, cmp), diff: cmp.diff, token: tok.label, sev, fix, note: p.note });
    }
    comps.push({ ...comp, rows });
  }
  const score = checked ? round((matched / checked) * 100, 1) : null;
  return { meta: { screen: input.screen, figma: input.figma, code: input.code, viewport: input.viewport, snapshot: idx.readDate }, counts, checked, matched, score, comps, tokenErrors, designer };
}
const esc = (s) => String(s ?? '').replace(/\|/g, '\\|').replace(/\n/g, ' ');
const fmtF = (p, c) => `${esc(c.f ?? p.figma)}${p.figmaToken ? `<br>\`${p.figmaToken}\`` : ''}`;
const fmtC = (p, c) => `${esc(c.c ?? p.code)}${p.codeAuthored && p.codeAuthored !== String(p.code) ? `<br>\`${esc(p.codeAuthored)}\`` : ''}`;

export function toMarkdown(r) {
  const L = [];
  const m = r.meta;
  L.push(`# Báo cáo UI QA — ${m.screen || '(screen)'}`, '');
  L.push(`Figma: ${m.figma || '—'} · Code: ${m.code || '—'} · Viewport: ${m.viewport || '—'} · Snapshot token: ${m.snapshot}`, '');
  L.push('## 1. Tóm tắt', '');
  L.push('| Component | Thuộc tính đã so | 🔴 Critical | 🟠 Major | 🟡 Minor | 📝 Ghi chú | Điểm khớp |', '|---|---:|---:|---:|---:|---:|---:|');
  L.push(`| **${r.comps.length}** | ${r.checked} | ${r.counts.critical} | ${r.counts.major} | ${r.counts.minor} | ${r.counts.note} | **${r.score ?? '—'}%** |`, '');
  L.push('> Điểm khớp = thuộc tính có giá trị khớp (pass + ghi chú ≤1px) / thuộc tính so được. Lỗi token không trừ điểm khớp giá trị nhưng tính vào số lỗi.', '');
  L.push('## 2. Chi tiết theo component', '');
  for (const c of r.comps) {
    const worst = c.rows.reduce((a, x) => maxSev(a, x.sev === 'unknown' ? 'pass' : x.sev), 'pass');
    L.push(`### ${c.name} — ${SEV_LABEL[worst]}`, '');
    L.push(`Figma: \`${c.figmaNode || '—'}\` ${c.figmaName ? `(${c.figmaName})` : ''} ↔ Code: \`${c.codeSelector || '—'}\` · Ghép bằng: ${c.match?.method || '—'} · Độ chắc chắn: ${c.match?.confidence || '—'}`, '');
    if (c.classNote) L.push(`> ${c.classNote}`, '');
    L.push('| Thuộc tính | Figma (root) | Code | Chênh lệch | Token đúng? | Mức độ | Gợi ý sửa |', '|---|---|---|---|---|---|---|');
    for (const x of c.rows) L.push(`| ${esc(x.prop)} | ${x.figma} | ${x.code} | ${esc(x.diff)} | ${x.token} | ${SEV_LABEL[x.sev]} | ${esc(x.fix)}${x.note ? ` ${esc(x.note)}` : ''} |`);
    L.push('');
  }
  L.push('## 3. Lỗi token/variable (Dev)', '');
  if (!r.tokenErrors.length) L.push('Không phát hiện.', '');
  else {
    const KIND = { hardcode: 'Hard-code', 'foreign-var': 'Biến ngoài SDS', 'wrong-token': 'Sai token', 'wrong-semantic': 'Token khác cùng giá trị', 'unknown-var': 'Biến không tồn tại' };
    L.push('| Component | Selector / file | Thuộc tính | Đang viết | Loại | Token đúng cần dùng |', '|---|---|---|---|---|---|');
    for (const e of r.tokenErrors) L.push(`| ${esc(e.comp)} | \`${esc(e.selector)}\`${e.file ? ` (${esc(e.file)})` : ''} | ${esc(e.prop)}${e.state ? ` :${e.state}` : ''} | \`${esc(e.authored)}\` | ${KIND[e.kind] || e.kind} | ${e.fix ? `\`${e.fix}\` (\`${e.figmaToken}\`)` : '—'} |`);
    L.push('');
  }
  L.push('## 4. Góp ý cho Product Designer (Figma)', '');
  if (r.designer.length) {
    L.push('| Component | Thuộc tính | Giá trị trong Figma | Vấn đề | Đề xuất |', '|---|---|---|---|---|');
    for (const d of r.designer) L.push(`| ${esc(d.comp)} | ${esc(d.prop)} | ${esc(d.value)} | ${d.issue || 'chưa bind token/style'} | ${d.issue ? 'đổi sang token đã qua gate A/B (AI tra `token-index.mjs value`)' : d.hint ? `bind \`${d.hint}\`${d.hintNote || ''}` : '[NOT FOUND] — cân nhắc thêm token hoặc đưa về thang'} |`);
    L.push('');
  }
  L.push('<!-- AI bổ sung: token gate E đang được dùng, giá trị lệch thang, style detached, state/variant thiếu trong Figma -->', '');
  L.push('## 5. Không xác định được', '', '<!-- AI bổ sung -->', '', '## 6. Giả định đã dùng', '', '<!-- AI bổ sung -->', '');
  L.push('## 7. Danh sách việc cần sửa (theo mức độ)', '');
  const todo = r.comps.flatMap((c) => c.rows.filter((x) => ['critical', 'major', 'minor'].includes(x.sev)).map((x) => ({ ...x, comp: c.name })))
    .sort((a, b) => SEV_RANK[b.sev] - SEV_RANK[a.sev]);
  if (!todo.length) L.push('Không có lỗi cần sửa.');
  todo.forEach((t, i) => {
    const why = [t.diff !== '—' ? t.diff : null, /❌|⚠ token/.test(t.token) ? t.token.replace(/[❌⚠]\s*/, '') : null].filter(Boolean).join(' · ');
    L.push(`${i + 1}. ${SEV_LABEL[t.sev]} **${esc(t.comp)}** — ${esc(t.prop)}: ${esc(why)}${t.fix ? ` → ${esc(t.fix)}` : ''}`);
  });
  L.push('');
  return L.join('\n');
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const args = process.argv.slice(2);
  const opt = (k) => { const i = args.indexOf(k); return i >= 0 ? args.splice(i, 2)[1] : null; };
  const sds = findSdsRoot(process.cwd(), opt('--sds'));
  const out = opt('--out'); const jsonOut = opt('--json');
  if (!args[0]) { console.error('Dùng: node compare.mjs pairs.json [--sds <SDS-docs>] [--out report.md] [--json result.json]'); process.exit(2); }
  if (!sds) { console.error('Không tìm thấy SDS-docs. Dùng --sds <path>.'); process.exit(2); }
  const idx = await loadIndex(sds);
  const input = JSON.parse(fs.readFileSync(args[0], 'utf8'));
  const result = run(input, idx);
  const md = toMarkdown(result);
  if (out) fs.writeFileSync(out, md); else console.log(md);
  if (jsonOut) fs.writeFileSync(jsonOut, JSON.stringify(result, null, 1));
  console.error(`Đã so ${result.checked} thuộc tính · Critical ${result.counts.critical} · Major ${result.counts.major} · Minor ${result.counts.minor} · khớp ${result.score}%`);
}
