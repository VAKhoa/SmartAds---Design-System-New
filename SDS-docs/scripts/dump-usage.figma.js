// CHỈ ĐỌC. Chạy trong môi trường Figma Plugin API (vd Figma MCP `use_figma` ở chế độ đọc). Không chạy bằng Node.
// Mục đích: biết variable/style nào được component dùng, để ghi vào variable-figma-export/usage.json
//   { fileKey, readDate, unused: { "<collection>": [tên variable...] }, unusedStyles: [tên style...] }
// "Dùng" = bind trực tiếp trong node của mọi variant + chuỗi alias (mode mặc định của Alias) + variable bind trong style đã dùng.
// Script không tạo/sửa/xóa gì. Đặt PAGES = id các trang component (dùng get_metadata liệt kê page).

const PAGES = [/* '123:500', '177:3651', ... */];

const cols = await figma.variables.getLocalVariableCollectionsAsync();
const local = {}, colOf = {};
for (const c of cols) for (const id of c.variableIds) { local[id] = await figma.variables.getVariableByIdAsync(id); colOf[id] = c; }
const direct = new Set(), stylesUsed = new Set(), nonLocal = {};
async function noteVar(id) {
  if (local[id]) { direct.add(id); return; }
  if (nonLocal[id] === undefined) { const v = await figma.variables.getVariableByIdAsync(id); nonLocal[id] = v ? { name: v.name, remote: v.remote, count: 0 } : { name: '?', count: 0 }; }
  nonLocal[id].count++;
}
for (const pid of PAGES) {
  const page = await figma.getNodeByIdAsync(pid);
  await page.loadAsync(); // không đổi trang đang xem
  const roots = page.findAllWithCriteria({ types: ['COMPONENT_SET', 'COMPONENT'] })
    .filter((c) => c.type === 'COMPONENT_SET' || c.parent.type !== 'COMPONENT_SET');
  for (const r of roots) {
    for (const n of [r, ...r.findAll(() => true)]) {
      const bv = n.boundVariables || {};
      for (const k of Object.keys(bv)) { const a = Array.isArray(bv[k]) ? bv[k] : [bv[k]]; for (const x of a) if (x && x.id) await noteVar(x.id); }
      for (const key of ['fills', 'strokes']) { const arr = n[key]; if (Array.isArray(arr)) for (const p of arr) { const b = p.boundVariables && p.boundVariables.color; if (b && b.id) await noteVar(b.id); } }
      for (const sk of ['fillStyleId', 'strokeStyleId', 'textStyleId', 'effectStyleId', 'gridStyleId']) { const s = n[sk]; if (s && typeof s === 'string') stylesUsed.add(s); }
    }
  }
}
const allStyles = [...await figma.getLocalTextStylesAsync(), ...await figma.getLocalEffectStylesAsync(), ...await figma.getLocalPaintStylesAsync(), ...await figma.getLocalGridStylesAsync()];
const viaStyle = new Set();
for (const s of allStyles) if (stylesUsed.has(s.id)) {
  const bv = s.boundVariables || {}; for (const k of Object.keys(bv)) { const x = bv[k]; if (x && x.id && local[x.id]) viaStyle.add(x.id); }
  if (s.effects) for (const e of s.effects) { const b = e.boundVariables || {}; for (const k of Object.keys(b)) { const x = b[k]; if (x && x.id && local[x.id]) viaStyle.add(x.id); } }
}
const used = new Set([...direct, ...viaStyle]);
const queue = [...used];
while (queue.length) {
  const id = queue.pop(); const v = local[id]; const c = colOf[id];
  const modes = c.name === 'Alias' ? [c.defaultModeId] : c.modes.map((m) => m.modeId);
  for (const m of modes) { const val = v.valuesByMode[m]; if (val && val.type === 'VARIABLE_ALIAS' && local[val.id] && !used.has(val.id)) { used.add(val.id); queue.push(val.id); } }
}
const unused = {};
for (const c of cols) unused[c.name] = c.variableIds.filter((i) => !used.has(i)).map((i) => local[i].name);
return {
  unused,
  unusedStyles: allStyles.filter((s) => !stylesUsed.has(s.id)).map((s) => s.name),
  nonLocalVariablesUsed: Object.values(nonLocal).sort((a, b) => b.count - a.count).map((x) => `${x.remote ? 'R:' : 'L?:'}${x.name}=${x.count}`),
};
