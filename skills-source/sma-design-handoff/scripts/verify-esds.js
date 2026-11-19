/* verify-esds.js — KIỂM TRA LỆCH thành phần ESDS (CHỈ ĐỌC). Chạy ĐẦU MỖI LẦN handoff (hoặc khi nghi component bị đổi).
 * Dán nguyên file vào use_figma (không cần helpers.js). Chạy được trong file ESDS Specs (kèm esdsPageId) hoặc file đã bật thư viện ESDS.
 * Kết quả: { ok, problems[] }. Có problems → báo người dùng + cập nhật references/esds-components.md TRƯỚC khi dựng.
 */
const ESDS_PAGE_ID = '1:413';   // chỉ dùng khi chạy trong file ESDS Specs; ở file khác để mặc định
const EXPECT = {
  card:      { key: '3cd5e013394c5bb28a1fa65cb8bea1bafaec6c70', name: 'Card spec',    variants: ['Status=Pending', 'Status=In Progress', 'Status=Handed-off'] },
  note:      { key: '0aa030d12537df425fd7745f36e6c3346aecff94', name: 'Note spec',    variants: ['Arrow=No Arrow, State=Default', 'Arrow=No Arrow, State=Error', 'Arrow=↑ Up, State=Default', 'Arrow=→ Right, State=Default', 'Arrow=↓ Down, State=Default', 'Arrow=← Left, State=Default', 'Arrow=← Left, State=Error'], props: ['Title', 'Date'] },
  label:     { key: 'b10c30098c271ab7258cb47866aaad9fd57f9d94', name: 'Label spec',   variants: ['Level=Item', 'Level=Group'], props: ['Title', 'Meta', 'Meta?'] },
  dimpx:     { key: '83132110916ccbd2eee8d3b70be36fe160f471ca', name: 'Dimension px', variants: ['Direction=Horizontal', 'Direction=Vertical'], props: ['Value'] },
  marker:    { key: '20d241e0f6127cc25071f8514d5581bae1767262', name: 'Spec marker',  variants: ['Direction=Left, Type=Tail', 'Direction=Right, Type=Tail', 'Direction=Right, Type=Notch'], props: ['ID'] },
  layerName: { key: '42fa2263b3d923b7680863c54801e25138da8a83', name: 'Spec layer name', variants: ['Type=Frame', 'Type=Instance'] },
  attr:      { key: '1962dfedb327ceb561bfef2b6235858402a3346b', name: 'Spec attribute', variants: ['Type=Default', 'Type=Dependency', 'Type=Style'] },
  badge:     { key: 'aa79bb0252b487086ab2e163a857836d30eed204', name: 'number-spect-badge', variants: ['Size=md (main), Color=Black'] },
  overlay:   { key: '77296397597a15c8987d161ec5a75cd523276c42', name: 'overlay-gaps-line', variants: ['Type=Ngang, Color=Blue', 'Type=Dọc, Color=Blue', 'Type=Dọc, Color=Red', 'Type=Ngang, Color=Red'] }
};
const problems = [], found = {};
for (const [id, e] of Object.entries(EXPECT)) {
  let set = null; try { set = await figma.importComponentSetByKeyAsync(e.key); } catch (err) { /* thử local */ }
  if (!set) { const pg = figma.root.children.find(p => p.id === ESDS_PAGE_ID); if (pg) { await figma.setCurrentPageAsync(pg); set = pg.findAllWithCriteria({ types: ['COMPONENT_SET'] }).find(s => s.key === e.key); } }
  if (!set) { problems.push(e.name + ': KHÔNG tìm thấy key ' + e.key + ' (đổi key, chưa publish hoặc chưa bật thư viện)'); continue; }
  const names = set.children.map(c => c.name);
  for (const v of e.variants) if (!names.includes(v)) problems.push(e.name + ': thiếu variant "' + v + '"');
  const defs = Object.keys(set.componentPropertyDefinitions || {}).map(k => k.split('#')[0].replace('↪️ ', '').trim());
  for (const p of (e.props || [])) if (!defs.includes(p)) problems.push(e.name + ': thiếu property "' + p + '" (hiện có: ' + defs.join(', ') + ')');
  found[id] = { variants: names.length, props: defs };
}
return { ok: problems.length === 0, problems, found };
