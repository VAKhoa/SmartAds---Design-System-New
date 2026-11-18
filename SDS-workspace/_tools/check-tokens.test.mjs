// Test cho check-tokens.mjs. Chạy: node --test SDS-workspace/_tools/
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const script = path.join(path.dirname(fileURLToPath(import.meta.url)), 'check-tokens.mjs');

function run(files, allow, extra = []) {
  const task = fs.mkdtempSync(path.join(os.tmpdir(), 'sds-check-'));
  const out = path.join(task, 'out'); fs.mkdirSync(out, { recursive: true });
  for (const [name, body] of Object.entries(files)) fs.writeFileSync(path.join(out, name), body);
  if (allow) fs.writeFileSync(path.join(task, 'allow-tokens.json'), JSON.stringify(allow));
  const r = spawnSync(process.execPath, [script, task, '--json', ...extra], { encoding: 'utf8' });
  fs.rmSync(task, { recursive: true, force: true });
  let data = null; try { data = JSON.parse(r.stdout); } catch { /* giữ null */ }
  return { code: r.status, data, stderr: r.stderr };
}
const kinds = (r) => r.data.findings.map((f) => `${f.kind}:${f.value ?? ''}`);

test('màu trùng token viết cứng → HARDCODED kèm var gợi ý', () => {
  const r = run({ 'a.css': '.a { color: #048845; }' });
  assert.equal(r.code, 1);
  const f = r.data.findings.find((x) => x.kind === 'HARDCODED');
  assert.ok(f, 'phải có HARDCODED'); assert.match(f.suggest, /^--sa-/);
});

test('rgb() cùng giá trị token cũng bị bắt', () => {
  const r = run({ 'a.css': '.a { background: rgb(4, 136, 69); }' });
  assert.ok(r.data.findings.some((x) => x.kind === 'HARDCODED'));
});

test('màu không có token → NOT-IN-TOKEN', () => {
  const r = run({ 'a.css': '.a { color: #123456; }' });
  assert.deepEqual(kinds(r), ['NOT-IN-TOKEN:#123456']);
});

test('cỡ chữ: 12px trùng thang → HARDCODED; 15px lạ → NOT-IN-TOKEN; em bỏ qua', () => {
  const r = run({ 'a.css': '.a{font-size:12px}.b{font-size:15px}.c{font-size:1.5em}' });
  const k = kinds(r);
  assert.ok(k.includes('HARDCODED:12')); assert.ok(k.includes('NOT-IN-TOKEN:15'));
  assert.equal(r.data.summary.skippedRelativeSizes, 1);
});

test('dùng đúng var(--sa-...) → sạch, mã thoát 0', () => {
  const r = run({ 'a.css': '.a { color: var(--sa-component-button-border-primary-default); font-size: var(--sa-typography-size-fs-lg); }' });
  assert.equal(r.code, 0, JSON.stringify(r.data));
});

test('var(--sa-không-tồn-tại) → UNKNOWN-VAR', () => {
  const r = run({ 'a.css': '.a { color: var(--sa-khong-ton-tai); }' });
  assert.ok(r.data.findings.some((x) => x.kind === 'UNKNOWN-VAR'));
});

test('fallback trong var() không bị tính', () => {
  const r = run({ 'a.css': '.a { color: var(--sa-component-button-border-primary-default, #123456); }' });
  assert.equal(r.code, 0);
});

test('comment và anchor href="#add" không bị báo', () => {
  const r = run({ 'a.html': '<!-- color: #123456 --><a href="#add">x</a><style>/* color:#abcdef */ p{margin:0}</style>' });
  assert.equal(r.code, 0, JSON.stringify(r.data));
});

test('style="" trong HTML được quét', () => {
  const r = run({ 'a.html': '<p style="color:#123456">x</p>' });
  assert.deepEqual(kinds(r), ['NOT-IN-TOKEN:#123456']);
});

test('allow-tokens.json có reason được bỏ qua; thiếu reason thì không', () => {
  const good = run({ 'a.css': '.a{color:#123456;font-size:15px}' }, { colors: [{ value: '#123456', reason: 'nền publisher' }], fontSizes: [{ value: 15, reason: 'theo format' }] });
  assert.equal(good.code, 0, JSON.stringify(good.data)); assert.equal(good.data.summary.allowed, 2);
  const bad = run({ 'a.css': '.a{color:#123456}' }, { colors: [{ value: '#123456' }] });
  assert.equal(bad.code, 1);
});

test('không có out/ → mã thoát 0 và nói rõ', () => {
  const task = fs.mkdtempSync(path.join(os.tmpdir(), 'sds-check-'));
  const r = spawnSync(process.execPath, [script, task], { encoding: 'utf8' });
  fs.rmSync(task, { recursive: true, force: true });
  assert.equal(r.status, 0); assert.match(r.stdout, /Chưa có thư mục out/);
});

test('JS: chuỗi màu trần bị bắt', () => {
  const r = run({ 'a.js': "el.style.color = '#123456';" });
  assert.deepEqual(kinds(r), ['NOT-IN-TOKEN:#123456']);
});

test('hsl() và rem được quy đổi và kiểm', () => {
  const r = run({ 'a.css': '.a{color:hsl(150 90% 28%);font-size:0.75rem;border:1px solid hsl(210, 50%, 40%)}' });
  assert.ok(r.data.findings.some((x) => x.kind === 'HARDCODED' && x.value === 12), 'rem 0.75 = 12px trùng thang');
  assert.ok(r.data.findings.some((x) => /^#/.test(String(x.value)) ), 'hsl phải thành hex để so sánh');
});

test('font: shorthand lấy đúng cỡ chữ', () => {
  const r = run({ 'a.css': '.a{font:600 15px/20px Arial}' });
  assert.deepEqual(kinds(r), ['NOT-IN-TOKEN:15']);
});

test('biến tùy chỉnh cục bộ chứa màu cứng bị bắt (--x: #123456)', () => {
  const r = run({ 'a.css': ':root{--brand-x:#123456}' });
  assert.deepEqual(kinds(r), ['NOT-IN-TOKEN:#123456']);
});

test('thuộc tính SVG/HTML fill="#..." bị bắt (cần --svg cho .svg)', () => {
  const html = run({ 'a.html': '<svg><path fill="#123456"/></svg>' });
  assert.deepEqual(kinds(html), ['NOT-IN-TOKEN:#123456']);
  const svgOff = run({ 'a.svg': '<svg><path fill="#123456"/></svg>' });
  assert.equal(svgOff.code, 0);
  const svgOn = run({ 'a.svg': '<svg><path fill="#123456"/></svg>' }, null, ['--svg']);
  assert.deepEqual(kinds(svgOn), ['NOT-IN-TOKEN:#123456']);
});

test('JS: {color:"#.."}, style.fontSize, setProperty và rgb() trần đều bị bắt', () => {
  const src = ["const o = {color:'#123456'};", "el.style.fontSize='15px';", "el.style.setProperty('color','#654321');", "const c = 'rgb(1, 2, 3)';"].join(String.fromCharCode(10));
  const k = kinds(run({ 'a.js': src }));
  assert.ok(k.includes('NOT-IN-TOKEN:#123456')); assert.ok(k.includes('NOT-IN-TOKEN:15'));
  assert.ok(k.includes('NOT-IN-TOKEN:#654321')); assert.ok(k.includes('NOT-IN-TOKEN:#010203'));
});

test('JS: comment // sau code không gây báo nhầm; querySelector("#add") không bị coi là màu', () => {
  const r = run({ 'a.js': ["var a = 1; // color:#111111", "document.querySelector('#add');", "var u = 'http://x.com/#fff000';"].join(String.fromCharCode(10)) });
  assert.equal(r.code, 0, JSON.stringify(r.data));
});

test('gợi ý token ưu tiên semantic/primitive trước component', () => {
  const r = run({ 'a.css': '.a{color:#ffffff}' });
  const f = r.data.findings.find((x) => x.kind === 'HARDCODED');
  assert.ok(f, JSON.stringify(r.data));
  assert.ok(!/^--sa-component-/.test(f.suggest) || f.alternatives.every((a) => /^--sa-component-/.test(a)), 'gợi ý đầu không được là component nếu có lựa chọn khác');
});

test('font-size: clamp()/em/% được đếm là bỏ qua', () => {
  const r = run({ 'a.css': '.a{font-size:clamp(1rem,2vw,2rem)}.b{font-size:120%}.c{font-size:1.2em}' });
  assert.equal(r.data.summary.skippedRelativeSizes, 3); assert.equal(r.code, 0);
});

test('allow-tokens.json sai JSON → BAD-ALLOW', () => {
  const task = fs.mkdtempSync(path.join(os.tmpdir(), 'sds-check-')); fs.mkdirSync(path.join(task, 'out'));
  fs.writeFileSync(path.join(task, 'out/a.css'), '.a{color:#123456}'); fs.writeFileSync(path.join(task, 'allow-tokens.json'), '{ sai');
  const r = spawnSync(process.execPath, [script, task, '--json'], { encoding: 'utf8' }); fs.rmSync(task, { recursive: true, force: true });
  assert.ok(JSON.parse(r.stdout).findings.some((x) => x.kind === 'BAD-ALLOW'));
});
