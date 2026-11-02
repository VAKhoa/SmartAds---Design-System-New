import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { normalizeName, lintTokens, suggestRenames, loadTokens } from '../scripts/ds-tokens.mjs';

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
console.log(`OK – ${issues.length} cảnh báo trên mẫu, ${sug.length} gợi ý đổi tên`);
