#!/usr/bin/env node
// Quét đầu ra trong SDS-workspace/**/out/ tìm giá trị MÀU và CỠ CHỮ không dùng token SDS.
// Chỉ đọc file trên máy. KHÔNG gọi Figma, KHÔNG sửa file nào.
//
// Dùng (chạy từ gốc repo SDS):
//   node SDS-workspace/_tools/check-tokens.mjs                      quét mọi thư mục out/ trong SDS-workspace/
//   node SDS-workspace/_tools/check-tokens.mjs SDS-workspace/ad-formats/2026-11-sticky   chỉ một task
//   thêm: --json (in JSON) · --svg (quét cả .svg) · --sds <thư mục SDS-docs>
//
// Kết quả mỗi dòng:
//   NOT-IN-TOKEN  giá trị không có trong token SDS nào  → sửa theo token hoặc xin duyệt (xem allow-tokens.json)
//   HARDCODED     giá trị TRÙNG một token nhưng viết cứng → đổi sang var(--sa-...)
//   UNKNOWN-VAR   var(--sa-...) không tồn tại trong snapshot
//   DEPRECATED    var(--sa-...) trỏ token đã đánh dấu DEPRECATED
// Thoát mã 1 nếu còn phát hiện chưa được cho phép, 0 nếu sạch, 2 nếu lỗi chạy.
//
// Ngoại lệ có lý do: file allow-tokens.json cạnh brief.md của task:
//   { "colors": [{ "value": "#ffffff", "reason": "nền trang nhà xuất bản, ngoài DS" }],
//     "fontSizes": [{ "value": 15, "reason": "…" }] }
// Mục không có "reason" bị bỏ qua (không được cho phép).
//
// Giới hạn: so với BẢN CHỤP token (ngày hiện trong kết quả), không phải Figma trực tiếp.
// Cỡ chữ tương đối (em, %, calc, từ khóa) không kiểm được và bị bỏ qua.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const skillScripts = path.resolve(here, '../../skills-source/ui-qa-figma-vs-code/scripts');
const { findSdsRoot, loadIndex, byValue, byCss } = await import(pathToFileURL(path.join(skillScripts, 'token-index.mjs')).href);
const { normColor } = await import(pathToFileURL(path.join(skillScripts, 'lib/normalize.mjs')).href);

const NAMED = new Set(['white', 'black', 'red', 'green', 'blue', 'gray', 'grey', 'silver', 'orange', 'yellow', 'purple', 'pink', 'brown', 'navy', 'teal', 'maroon', 'lime', 'aqua', 'cyan', 'magenta', 'gold']);
const NAMED_HEX = { white: '#ffffff', black: '#000000', red: '#ff0000', green: '#008000', blue: '#0000ff', gray: '#808080', grey: '#808080', silver: '#c0c0c0', orange: '#ffa500', yellow: '#ffff00', purple: '#800080', pink: '#ffc0cb', brown: '#a52a2a', navy: '#000080', teal: '#008080', maroon: '#800000', lime: '#00ff00', aqua: '#00ffff', cyan: '#00ffff', magenta: '#ff00ff', gold: '#ffd700' };
const COLOR_PROPS = /^(color|background|background-color|background-image|border|border-(top|right|bottom|left)(-color)?|border-color|outline|outline-color|fill|stroke|stop-color|flood-color|lighting-color|--[\w-]+|box-shadow|text-shadow|caret-color|accent-color|text-decoration-color|column-rule-color|filter)$/;

// ---------- tiện ích ----------
function blank(s, re) { return s.replace(re, (m) => m.replace(/[^\n]/g, ' ')); }
const rank = (n) => (/^component\//.test(n) ? 2 : /^color\//.test(n) ? 1 : 0); // ưu tiên semantic, rồi primitive, component sau cùng
const prefer = (hits) => hits.slice().sort((a, b) => rank(a.name) - rank(b.name));
const kebab = (s) => s.replace(/[A-Z]/g, (c) => '-' + c.toLowerCase());
const alt = (hits) => hits.slice(0, 3).map((h) => `var(${h.css})`).join(' | ');
function stripComments(text, ext) {
  let t = blank(text, /\/\*[\s\S]*?\*\//g);
  if (ext === '.html' || ext === '.htm' || ext === '.svg') t = blank(t, /<!--[\s\S]*?-->/g);
  if (ext === '.js') t = t.replace(/(?<=^|[\s;,){}])\/\/[^\n]*/gm, (m) => ' '.repeat(m.length));
  return t;
}
function lineOf(text, index) { let n = 1; for (let i = 0; i < index; i++) if (text.charCodeAt(i) === 10) n++; return n; }
function hslToHex(h, s, l, a = 1) {
  s /= 100; l /= 100; const k = (n) => (n + h / 30) % 12; const f = (n) => l - s * Math.min(l, 1 - l) * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  const x = (v) => Math.round(v * 255).toString(16).padStart(2, '0');
  return normColor('#' + x(f(0)) + x(f(8)) + x(f(4)) + (a < 1 ? x(a) : ''));
}

/** Tách các "khai báo" CSS (prop: value) từ văn bản; chấp nhận cả style="..." và chuỗi trong JS. */
function* declarations(text) {
  const re = /([a-zA-Z-]+)\s*:\s*([^;{}"'`<>]+(?:\([^)]*\)[^;{}"'`<>]*)*)/g;
  let m;
  while ((m = re.exec(text))) yield { prop: m[1].toLowerCase(), value: m[2], index: m.index + m[0].indexOf(m[2]) };
}

/** Lấy các màu trong một giá trị CSS. Trả về [{raw, hex}]. Bỏ màu nằm trong var(--x, fallback). */
function colorsIn(value) {
  const v = value.replace(/var\(\s*--[\w-]+\s*(?:,[^)]*)?\)/g, (m) => ' '.repeat(m.length));
  const out = [];
  for (const m of v.matchAll(/#[0-9a-fA-F]{3,8}\b/g)) { const hex = normColor(m[0]); if (hex) out.push({ raw: m[0], hex }); }
  for (const m of v.matchAll(/\brgba?\([^)]+\)/gi)) { const hex = normColor(m[0]); if (hex) out.push({ raw: m[0], hex }); }
  for (const m of v.matchAll(/\bhsla?\(\s*([\d.]+)(?:deg)?[\s,]+([\d.]+)%[\s,]+([\d.]+)%(?:[\s,/]+([\d.]+%?))?\s*\)/gi)) {
    const a = m[4] == null ? 1 : m[4].endsWith('%') ? parseFloat(m[4]) / 100 : parseFloat(m[4]);
    out.push({ raw: m[0], hex: hslToHex(+m[1], +m[2], +m[3], a) });
  }
  for (const w of v.toLowerCase().match(/\b[a-z]+\b/g) || []) if (NAMED.has(w)) out.push({ raw: w, hex: NAMED_HEX[w] });
  return out;
}

/** Thuộc tính HTML/SVG kiểu fill="#123456" (cặp thuộc tính, không phải khai báo CSS). */
function* attributes(text) {
  const re = /\b(fill|stroke|stop-color|flood-color|lighting-color|color|bgcolor)\s*=\s*(["'])([^"']*)\2/gi;
  let m;
  while ((m = re.exec(text))) yield { prop: m[1].toLowerCase(), value: m[3], index: m.index + m[0].indexOf(m[3]) };
}

/** JS: {color:'#fff'}, el.style.fontSize = '15px', setProperty('color', '#fff'). */
function* jsPairs(text) {
  let m;
  const re = /(?:\.|\b)([a-zA-Z][\w-]*)\s*[:=]\s*(['"`])([^'"`\n]*)\2/g;
  while ((m = re.exec(text))) yield { prop: kebab(m[1]).toLowerCase(), value: m[3], index: m.index + m[0].indexOf(m[3]) };
  const re2 = /setProperty\(\s*(['"`])([\w-]+)\1\s*,\s*(['"`])([^'"`\n]*)\3/g;
  while ((m = re2.exec(text))) yield { prop: m[2].toLowerCase(), value: m[4], index: m.index + m[0].indexOf(m[4]) };
}

function fontSizesIn(prop, value) {
  const v = value.replace(/var\(\s*--[\w-]+\s*(?:,[^)]*)?\)/g, ' ').trim();
  if (prop === 'font-size') {
    const m = v.match(/^(\d*\.?\d+)(px|rem)\b/i);
    return m ? [{ raw: m[0], px: m[2].toLowerCase() === 'rem' ? +m[1] * 16 : +m[1] }] : [];
  }
  if (prop === 'font') {
    const m = v.match(/(?:^|\s)(\d*\.?\d+)(px|rem)(?=\s|\/|$)/i);
    return m ? [{ raw: m[0].trim(), px: m[2].toLowerCase() === 'rem' ? +m[1] * 16 : +m[1] }] : [];
  }
  return [];
}

// ---------- quét ----------
function findOutDirs(start) {
  const res = [];
  (function walk(d) {
    if (!fs.existsSync(d)) return;
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      if (!e.isDirectory() || e.name === 'node_modules' || e.name === '.git') continue;
      const p = path.join(d, e.name);
      if (e.name === 'out') res.push(p); else walk(p);
    }
  })(start);
  if (path.basename(start) === 'out' && fs.existsSync(start)) res.push(start);
  return [...new Set(res)];
}
function listFiles(dir, exts) {
  const res = [];
  (function walk(d) { for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (e.name === 'node_modules') continue; const p = path.join(d, e.name);
    if (e.isDirectory()) walk(p); else if (exts.has(path.extname(e.name).toLowerCase())) res.push(p);
  } })(dir);
  return res;
}
function loadAllow(outDir) {
  const f = path.join(path.dirname(outDir), 'allow-tokens.json');
  const empty = { colors: new Set(), fontSizes: new Set(), file: null };
  if (!fs.existsSync(f)) return empty;
  try {
    const j = JSON.parse(fs.readFileSync(f, 'utf8'));
    const ok = (a) => (a || []).filter((x) => x && x.reason && String(x.reason).trim());
    return {
      colors: new Set(ok(j.colors).map((x) => normColor(x.value)).filter(Boolean)),
      fontSizes: new Set(ok(j.fontSizes).map((x) => Number(String(x.value).replace(/px$/, '')))),
      file: f,
    };
  } catch { return { ...empty, file: f, bad: true }; }
}

function main() {
  const args = process.argv.slice(2);
  const opt = (k) => { const i = args.indexOf(k); return i >= 0 ? args.splice(i, 2)[1] : null; };
  const flag = (k) => { const i = args.indexOf(k); if (i >= 0) { args.splice(i, 1); return true; } return false; };
  return (async () => {
    const json = flag('--json'); const svg = flag('--svg'); const sdsArg = opt('--sds');
    const repoRoot = path.resolve(here, '../..');
    const start = path.resolve(args[0] || path.join(repoRoot, 'SDS-workspace'));
    const sds = findSdsRoot(sdsArg ? process.cwd() : path.join(repoRoot, 'SDS-docs'), sdsArg);
    if (!sds) { console.error('Không tìm thấy SDS-docs (cần ds.config.json + variable-figma-export/). Dùng --sds <path>.'); process.exit(2); }
    if (!fs.existsSync(start)) { console.error('Không thấy thư mục cần quét: ' + start); process.exit(2); }

    const idx = await loadIndex(sds);
    const fsTokens = Object.values(idx.tokens).filter((t) => t.type === 'FLOAT' && /^typography\/size\//.test(t.name) && !t.deprecated);
    const sizeSet = new Map(); // px -> token css
    for (const t of fsTokens) if (!sizeSet.has(Number(t.value))) sizeSet.set(Number(t.value), t.css);
    for (const s of idx.styles.text || []) if (s.fontSize != null && !sizeSet.has(Number(s.fontSize))) sizeSet.set(Number(s.fontSize), null);
    const sizes = [...sizeSet.keys()].sort((a, b) => a - b);

    const exts = new Set(['.html', '.htm', '.css', '.js']); if (svg) exts.add('.svg');
    const findings = []; let files = 0; let allowed = 0; let skippedRel = 0;
    const outDirs = findOutDirs(start);

    for (const out of outDirs) {
      const allow = loadAllow(out);
      if (allow.bad) findings.push({ file: path.relative(repoRoot, allow.file), line: 1, kind: 'BAD-ALLOW', detail: 'allow-tokens.json không đọc được (JSON sai) — không có ngoại lệ nào được áp dụng' });
      for (const f of listFiles(out, exts)) {
        files++;
        const ext = path.extname(f).toLowerCase();
        const text = stripComments(fs.readFileSync(f, 'utf8'), ext);
        const rel = path.relative(repoRoot, f);
        const add = (index, kind, detail, extra = {}) => findings.push({ file: rel, line: lineOf(text, index), kind, detail, ...extra });

        // var(--sa-...) tồn tại không / deprecated
        for (const m of text.matchAll(/var\(\s*(--sa-[\w-]+)/g)) {
          const t = byCss(idx, m[1]);
          if (!t) add(m.index, 'UNKNOWN-VAR', `${m[1]} không có trong snapshot token`);
          else if (t.deprecated) add(m.index, 'DEPRECATED', `${m[1]} (${t.name}) đã DEPRECATED`);
        }
        const sources = [...declarations(text)];
        if (ext !== '.css') sources.push(...attributes(text));
        if (ext === '.js') sources.push(...jsPairs(text));
        const seen = new Set();
        for (const d of sources) {
          const key = d.index + ':' + d.prop; if (seen.has(key)) continue; seen.add(key);
          if (COLOR_PROPS.test(d.prop)) {
            for (const c of colorsIn(d.value)) {
              if (allow.colors.has(c.hex)) { allowed++; continue; }
              const hits = prefer(byValue(idx, c.hex, 'color')); const hit = hits[0];
              if (hit) add(d.index, 'HARDCODED', `${d.prop}: ${c.raw} trùng token ${hit.name} → ${alt(hits)} (chọn token đúng ý nghĩa)`, { value: c.hex, suggest: hit.css, alternatives: hits.slice(0, 3).map((h) => h.css) });
              else add(d.index, 'NOT-IN-TOKEN', `${d.prop}: ${c.raw} (${c.hex}) không có trong token nào`, { value: c.hex });
            }
          }
          if (d.prop === 'font-size' || d.prop === 'font') {
            const v = d.value.trim();
            if (d.prop === 'font-size' && !/^\d*\.?\d+(px|rem)\b/i.test(v) && !/var\(/.test(v)) { if (v) skippedRel++; continue; }
            for (const s of fontSizesIn(d.prop, d.value)) {
              if (allow.fontSizes.has(s.px)) { allowed++; continue; }
              if (sizeSet.has(s.px)) {
                const css = sizeSet.get(s.px);
                add(d.index, 'HARDCODED', `${d.prop}: ${s.raw} = ${s.px}px trùng thang cỡ chữ SDS${css ? ' → dùng var(' + css + ')' : ' (có trong text style Figma)'}`, { value: s.px, suggest: css });
              } else {
                const near = sizes.reduce((a, b) => (Math.abs(b - s.px) < Math.abs(a - s.px) ? b : a), sizes[0]);
                add(d.index, 'NOT-IN-TOKEN', `${d.prop}: ${s.raw} = ${s.px}px không có trong thang cỡ chữ SDS (gần nhất ${near}px)`, { value: s.px });
              }
            }
          }
        }
      }
    }

    // trong JS: chuỗi '#rrggbb' đứng riêng (ngoài khai báo CSS)
    // (đã được bắt khi nằm trong chuỗi dạng "color: #fff"; chuỗi trần như el.style.color = '#fff' bắt ở đây)
    for (const out of outDirs) {
      const allow = loadAllow(out);
      for (const f of listFiles(out, new Set(['.js']))) {
        const text = stripComments(fs.readFileSync(f, 'utf8'), '.js'); const rel = path.relative(repoRoot, f);
        // chuỗi chỉ gồm một màu (#hex) hoặc chứa rgb()/hsl(); '#xxx' đứng ngay sau "(" là selector (querySelector('#add')), bỏ qua
        for (const m of text.matchAll(/(["'`])((?:\\.|(?!\1)[^\\\n])*)\1/g)) {
          const body = m[2];
          if (!/^#[0-9a-fA-F]{3,8}$/.test(body) && !/\b(?:rgba?|hsla?)\(/i.test(body)) continue;
          if (body.startsWith('#') && /\(\s*$/.test(text.slice(Math.max(0, m.index - 3), m.index))) continue;
          for (const c of colorsIn(body)) {
            if (allow.colors.has(c.hex)) continue;
            const line = lineOf(text, m.index);
            if (findings.some((x) => x.file === rel && x.line === line && x.value === c.hex)) continue;
            const hits = prefer(byValue(idx, c.hex, 'color')); const hit = hits[0];
            findings.push(hit ? { file: rel, line, kind: 'HARDCODED', detail: `chuỗi ${c.raw} trùng token ${hit.name} → ${alt(hits)}`, value: c.hex, suggest: hit.css, alternatives: hits.slice(0, 3).map((h) => h.css) }
                              : { file: rel, line, kind: 'NOT-IN-TOKEN', detail: `chuỗi ${c.raw} (${c.hex}) không có trong token nào`, value: c.hex });
          }
        }
      }
    }

    const summary = { snapshot: idx.readDate, outDirs: outDirs.map((d) => path.relative(repoRoot, d)), files, findings: findings.length, allowed, skippedRelativeSizes: skippedRel };
    if (json) console.log(JSON.stringify({ summary, findings }, null, 1));
    else {
      for (const f of findings) console.log(`${f.kind.padEnd(13)} ${f.file}:${f.line}  ${f.detail}`);
      console.log(`\n${findings.length ? '✗' : '✓'} ${findings.length} phát hiện · ${files} file trong ${outDirs.length} thư mục out/ · ${allowed} giá trị được cho phép (allow-tokens.json) · ${skippedRel} cỡ chữ tương đối bỏ qua`);
      console.log(`Snapshot token: ${idx.readDate} (không phải Figma trực tiếp — token mới chưa đồng bộ có thể bị báo nhầm).`);
      if (!outDirs.length) console.log('Chưa có thư mục out/ nào để quét.');
    }
    process.exit(findings.length ? 1 : 0);
  })();
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await main();
