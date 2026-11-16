import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { normalizeName, lintTokens, suggestRenames, loadTokens } from '../scripts/ds-tokens.mjs';
import { slugToken, cssVarName, isValidCssVarName } from '../scripts/css-name.mjs';
import { buildTokens, contrast } from '../scripts/build-tokens.mjs';

const eq = (a, b) => assert.equal(normalizeName(a), b, `${a} → ${normalizeName(a)} (mong đợi ${b})`);
eq('color/red light/500', 'color/red-light/500');
eq('typography/size/fs-display 2', 'typography/size/fs-display-2');
eq('spacing/xxs', 'spacing/2xs');
eq('spacing/1 (1px)', 'spacing/1');
eq('component/button/border/secondary/sub', 'component/button/border/secondary/subtle');
eq('component/button/border/primary/select', 'component/button/border/primary/selected');
eq('component/button/border/focus/focus', 'component/button/border/focus/focus');
eq('component/badge/info/surface-rest', 'component/badge/surface/info/rest');
eq('component/toast alert/surface-rest', 'component/toast-alert/surface/default/rest');
eq('component/button/split button/surface-hover', 'component/button/surface/split-button/hover');
eq('Brand/Body-lg/Semi', 'brand/body-lg/semibold');
eq('text/secondary', 'text/secondary');

const tokens = loadTokens(fileURLToPath(new URL('./fixtures/observed-sample.json', import.meta.url)));
assert.equal(tokens.length, 19);
const cfg = { collections: { semantic: ['Alias'], component: ['Component'] } };
const issues = lintTokens(tokens, cfg);
const has = (rule, name) => issues.some((i) => i.rule === rule && i.name === name);
assert.ok(has('R01-space', 'color/red light/500'));
assert.ok(has('R04-order', 'typography/size/fs-lg'), 'phải bắt thang cỡ chữ đảo chiều');
assert.ok(has('R07-tier', 'component/badge/info/surface-rest'));
assert.ok(has('R08-state-position', 'component/badge/info/surface-rest'));
assert.ok(has('R05-term', 'spacing/xxs'));
assert.ok(!issues.some((i) => i.name === 'text/secondary'), 'token đúng chuẩn không được báo lỗi');
assert.ok(!issues.some((i) => i.rule === 'R06-duplicate'), 'Semi → semibold khác bold nên không được báo trùng');

const sug = suggestRenames(tokens);
assert.ok(sug.every((s) => s.status === 'proposed' || s.status === 'needs-decision'));
assert.ok(sug.some((s) => s.status === 'needs-decision'));
// --- tên CSS: một quy tắc cho mọi token (kể cả tên có khoảng trắng/ngoặc)
const css = (n) => cssVarName('sa', n);
assert.equal(css('surface/primary-hover'), '--sa-surface-primary-hover');
assert.equal(css('color/red light/500'), '--sa-color-red-light-500');
assert.equal(css('spacing/lg (Base)'), '--sa-spacing-lg');
assert.equal(css('typography/size/fs-base 1'), '--sa-typography-size-fs-base-1');
assert.equal(css('component/toast alert/surface-rest'), '--sa-component-toast-alert-surface-rest');
assert.equal(css('color/brand/fpt/Color-F-20%'), '--sa-color-brand-fpt-color-f-20');
assert.equal(slugToken('Screen/Container/size-screen-width'), 'screen-container-size-screen-width');
assert.ok(isValidCssVarName(css('text/secondary-black (main)')));

// --- build-tokens: Light-only, gate hợp lý, tên CSS hợp lệ
const built = buildTokens();
const aliasCol = built.collections.Alias;
assert.equal(aliasCol.modes.length, 1, 'ds.config themes=[light] → Alias chỉ còn mode Light');
assert.ok(aliasCol.modes[0].includes('Light'));
assert.ok(!JSON.stringify(built).includes('Dark Mode'), 'không còn giá trị Dark');
assert.ok(!built.styles.effect.some((s) => /-dark\//.test(s.name)), 'effect elevation-dark bị loại');
let nTok = 0;
for (const c of Object.values(built.collections)) {
  for (const [n, t] of Object.entries(c.tokens)) {
    nTok++;
    assert.ok(isValidCssVarName(t.css), `tên CSS không hợp lệ: ${n} → ${t.css}`);
  }
}
assert.equal(nTok, 690);
const find = (n) => Object.values(built.collections).map((c) => c.tokens[n]).find(Boolean);
assert.equal(find('spacing/md').gate, 'A');
assert.equal(find('background/neutral').gate, 'A');
assert.equal(find('surface/primary').gate, 'B');
assert.equal(find('color/red light/500').gate, 'E');
assert.ok(find('text/secondary').gateReasons.some((r) => r.startsWith('a11y')));
assert.ok(find('color/orange/500').gateReasons.includes('orphan'));
assert.equal(built.meta.gateCounts.A + built.meta.gateCounts.B + built.meta.gateCounts.E, 690);
assert.ok(Math.abs(contrast('#ffffff', '#000000') - 21) < 0.01);

console.log(`OK – ${issues.length} cảnh báo trên mẫu, ${sug.length} gợi ý đổi tên, ${nTok} token, gate ${JSON.stringify(built.meta.gateCounts)}`);
