/* page-02-variants-states.js — TRANG 02: ma trận biến thể (1 bảng) + vài biến thể tiêu biểu + các state, note nằm CẠNH hình.
 * Dán SAU helpers.js. Chỉ sửa CONFIG. State nhiều → vẫn nằm chung trang này; chỉ cắt (crop) phần liên quan khi component lớn.
 * Giọng note: Product Designer khẳng định. KHÔNG viết "thấy trong Figma / chưa rõ…". Điều chưa chốt → chuyển sang Section REVIEW.
 */
// ===================== CONFIG =====================
const CFG2 = {
  targetPageId: '474:843', esdsPageId: '1:413', sourceId: '474:22181',
  prefix: 'SPEC', component: 'primitive-search-create-campaign', status: 'Pending',
  after: 'SPEC · primitive-search-create-campaign · 01 Anatomy & Layout',   // tên Section phía trên (để tính y); null → dùng originY
  originX: X0, originY: -355,
  state: '16 biến thể · các trạng thái',
  sub: 'Component được thiết kế với 16 tổ hợp thuộc tính. Mỗi trạng thái bên dưới có ghi chú đặt ngay cạnh hình.',
  matrix: {
    rows: [['Loại', 'Tier', 'Search box', 'Trạng thái', 'Kích thước (rộng × cao)'], ['Keywords', 'false', 'false', 'Enable · Disable · Typing · Search empty', '712 × 253'], ['Contextual', 'true', 'false', 'Enable · Disable · Typing · Search empty', '712 × 340'], ['Contextual', 'true', 'true', 'Enable · Disable · Typing · Search empty', '712 × 348–361'], ['Contextual', 'false', 'false', 'Enable', '712 × 40 (chỉ thanh tìm kiếm)'], ['Retargeting & User Behavior', 'false', 'false', 'Enable · Press · Empty', '1193 × 709 (Empty: 617)']],
    widths: [260, 80, 130, 380, 330],
    note: { title: 'Tổ hợp được hỗ trợ', body: 'Component được thiết kế với 16 tổ hợp thuộc tính như bảng bên cạnh. Khi triển khai chỉ sử dụng các tổ hợp này.' }
  },
  exhibits: [   // biến thể tiêu biểu (mỗi khác biệt về Type/Tier/… một hình)
    { label: 'Keywords', meta: '712 × 253', props: { Type: 'Keywords', Tier: 'false', 'Search box': 'false', State: 'Enable' } },
    { label: 'Contextual + Tier', meta: '712 × 340', props: { Type: 'Contextual', Tier: 'true', 'Search box': 'false', State: 'Enable' } },
    { label: 'Contextual + Tier + Search box', meta: '712 × 361', props: { Type: 'Contextual', Tier: 'true', 'Search box': 'true', State: 'Enable' } }
  ],
  // groups: mode 'crop' = chỉ cắt vùng liên quan (cropSize) ; 'full' = cả component
  groups: [
    { title: 'Ô tìm kiếm', meta: 'Contextual · Tier = true', mode: 'crop', cropSize: [712, 240], baseProps: { Type: 'Contextual', Tier: 'true', 'Search box': 'false' }, states: [
      { label: 'Enable', meta: 'Mặc định', state: 'Enable' },
      { label: 'Disable', meta: '712 × 340 · phần ô tìm kiếm', state: 'Disable', noteTitle: 'Disable — ô khóa', noteBody: 'Ô tìm kiếm ở trạng thái khóa. Nền (surface/elevation) và viền (border/gray-hover) nhạt hơn mặc định; icon và chữ gợi ý dùng màu text/disable. Bố cục giữ nguyên. Người dùng không nhập và không thao tác được với ô.' },
      { label: 'Typing', meta: '712 × 340 · phần ô tìm kiếm', state: 'Typing', noteTitle: 'Typing — đang nhập', noteBody: 'Ô tìm kiếm khi người dùng nhập chữ. Viền chuyển sang màu xanh (border/primary), chữ đang nhập hiển thị màu text/secondary-black. Nút × xuất hiện ở cuối ô để xóa nhanh nội dung. Bên dưới hiển thị danh sách 5 gợi ý, phần chữ trùng với nội dung đang nhập được in đậm.' },
      { label: 'Search empty', meta: '712 × 340 · phần ô tìm kiếm', state: 'Search empty', noteTitle: 'Search empty', noteBody: 'Trạng thái Search empty hiển thị tương tự Typing: viền xanh, nội dung đang nhập, nút × và danh sách gợi ý.' }
    ] },
    { title: 'Panel Retargeting & User Behavior', meta: 'Trạng thái Enable xem ở trang 01', mode: 'full', baseProps: { Type: 'Retargeting & User Behavior', Tier: 'false', 'Search box': 'false' }, states: [
      { label: 'Press', meta: '1193 × 709', state: 'Press', noteTitle: 'Press — chọn campaign', noteBody: 'Người dùng chọn campaign. Danh sách Campaigns hiển thị 6 hàng, mỗi hàng có chấm trạng thái (xanh: available, xám: unavailable); nhãn “5 Selected ×” xuất hiện cạnh tiêu đề Campaigns. Khung thông tin bên phải hiển thị dữ liệu của campaign: Size, Name, Type và Availability. Hàng audience đầu tiên có nền xám nhạt.' },
      { label: 'Empty', meta: '1193 × 617', state: 'Empty', noteTitle: 'Empty — chưa có audience', noteBody: 'Chưa có audience. Chiều cao component giảm từ 709 xuống 617 px. Vùng Audience hiển thị hình minh họa, tiêu đề “No Campaign Selected” và dòng hướng dẫn thay cho danh sách.' }
    ] }
  ]
};
// ===================== BUILD =====================
await initHandoff(CFG2.targetPageId, { esdsPageId: CFG2.esdsPageId });
removeSectionsByPrefix(new RegExp('^' + CFG2.prefix + ' · ' + CFG2.component + ' · 02 '));
const src2 = await figma.getNodeByIdAsync(CFG2.sourceId);
const prev = CFG2.after && figma.currentPage.children.find(c => c.type === 'SECTION' && c.name === CFG2.after);
const sec2 = mkSection(`${CFG2.prefix} · ${CFG2.component} · 02 Variants & States`, CFG2.originX, prev ? prev.y + prev.height + 240 : CFG2.originY);
await header(sec2, { status: CFG2.status, title: CFG2.component, state: CFG2.state, heading: '❖ 02 Variants & States', sub: CFG2.sub });
const mt = await table(sec2, CFG2.matrix.rows, CFG2.matrix.widths, 'Table · Variants'); mt.x = 120; mt.y = 520;
await note(sec2, 'none', 'default', CFG2.matrix.note.title, CFG2.matrix.note.body, mt.x + mt.width + 80, 520, 600);
// biến thể tiêu biểu: một hàng, cách nhau 40
let ex = 120, exMax = 0; const ey = mt.y + mt.height + 160 + 80;
for (const e of CFG2.exhibits) {
  const c = src2.clone(); c.setProperties(e.props);
  const fr = artFrame(sec2, 'Exhibit · ' + e.label, ex, ey, Math.round(c.width) + 48, Math.round(c.height) + 48); fr.appendChild(c); c.x = 24; c.y = 24;
  await label(sec2, 'item', e.label, e.meta, fr.x, ey - 64); ex += fr.width + 40; exMax = Math.max(exMax, fr.height);
}
let y = ey + exMax + 200;
for (const g of CFG2.groups) {
  await label(sec2, 'group', g.title, g.meta, 120, y); y += 100;
  for (const s of g.states) {
    await label(sec2, 'item', s.label, s.meta, 120, y);
    const c = src2.clone(); c.setProperties({ ...g.baseProps, State: s.state }); let art;
    if (g.mode === 'crop') { art = artFrame(sec2, 'Artwork · ' + s.label, 120, y + 64, g.cropSize[0] + 80, g.cropSize[1] + 80); const cr = cropFrame(art, g.cropSize[0], g.cropSize[1], 40, 40); cr.appendChild(c); c.x = 0; c.y = 0; }
    else { art = artFrame(sec2, 'Artwork · ' + s.label, 120, y + 64, Math.round(c.width) + 80, Math.round(c.height) + 80); art.appendChild(c); c.x = 40; c.y = 40; }
    let h = 64 + art.height;
    if (s.noteTitle) { const n = await note(sec2, 'none', 'default', s.noteTitle, s.noteBody, 120 + art.width + 80, y + 64, 600); h = Math.max(h, 64 + n.height); }
    y += h + 100;
  }
  y += 60;
}
fit(sec2);
return { id: sec2.id, h: sec2.height, warn };
