/* page-01-anatomy-layout.js — TRANG 01: Anatomy (hình đánh số) + Dimension (đường đo px) + danh sách phần tử.
 * Dán SAU helpers.js trong cùng một lệnh use_figma. Chỉ sửa khối CONFIG. Ví dụ bên dưới là bản đã duyệt cho primitive-search-create-campaign.
 * Quy tắc: KHÔNG spec thanh cuộn / chrome hệ thống; gom style lặp lại thành khối "dùng chung"; chỉ ghi giá trị khác mặc định.
 */
// ===================== CONFIG =====================
const CFG1 = {
  targetPageId: '474:843',        // trang Figma đích (đã được người dùng cho phép ghi)
  esdsPageId: '1:413',            // CHỈ khi chạy ngay trong file ESDS Specs; xóa dòng này ở file khác
  sourceId: '474:22181',          // node nguồn cần handoff (instance hoặc component)
  prefix: 'SPEC',
  component: 'primitive-search-create-campaign',
  status: 'Pending',
  state: 'Enable · Retargeting & User Behavior',
  sub: 'Hình trên đánh số từng phần của component, chi tiết ở cột bên phải. Hình dưới ghi kích thước và khoảng cách, đơn vị px.',
  originX: X0, originY: -355,
  anatomyMeta: 'Enable · Retargeting & User Behavior',
  layoutMeta: 'Kích thước và khoảng cách · px',
  // marker: kind TL = đuôi chạm cạnh trái phần tử; TR = chạm cạnh phải; NR = ghim đặt bên trái trỏ sang phải. along = px từ mép trên (hoặc 'mid')
  markers: [
    { n: 1, find: { name: '_search-rich-suggestions' }, kind: 'TL', along: 8 },
    { n: 2, find: { name: 'List Container' }, kind: 'TL', along: 18 },
    { n: 3, find: { prefix: 'primitive-illustrator' }, kind: 'NR', along: 'mid' },
    { n: 4, find: { name: 'Popup' }, kind: 'TR', along: 38 },
    { n: 5, find: { name: 'inline-alert' }, kind: 'TR', along: 'mid' },
    { n: 6, find: { name: '__list-checkbox-inner', i: 1 }, kind: 'TL', along: 2 },
    { n: 7, find: { name: '__audience-item ' }, kind: 'TR', along: 'mid' },
    { n: 8, find: { name: 'Badge', i: 1 }, kind: 'TL', along: 'mid' }
  ],
  // elements: khối đầu (nums nhiều số) = style dùng chung. type: 'Frame' | 'Instance' | 'Text'
  elements: [
    { nums: [1, 2, 4, 6], layer: 'Style dùng chung của khung', type: 'Frame', attrs: [['style', 'Nền', 'surface/neutral-white'], ['style', 'Viền', 'border/gray-stronger'], ['def', 'Bo góc (2 · 4 · 6)', '8 · radius/md']] },
    { nums: [1], layer: 'Ô tìm kiếm · _search-rich-suggestions', type: 'Instance', attrs: [['dep', 'Dùng component', '_search-rich-suggestions'], ['def', 'Kích thước', '1193 × 40 (rộng theo khung cha)'], ['def', 'Khoảng đệm', '10 / 12 / 10 / 12 · icon cách chữ 4'], ['style', 'Chữ gợi ý', 'Brand/Body-sm/Regular · text/gray-on-surface']] },
    { nums: [2], layer: 'Khung Campaigns · List Container', type: 'Frame', attrs: [['def', 'Kích thước', '817 × 300'], ['def', 'Khoảng đệm', 'trên 8 · dưới 12 · các mục cách nhau 8'], ['style', 'Nhãn “Campaigns”', 'Brand/Body-xs/Medium · text/gray-on-surface']] },
    { nums: [3], layer: 'Trạng thái trống · Container', type: 'Frame', attrs: [['dep', 'Dùng component', 'primitive-illustrator-compo… (tên bị cắt)'], ['style', 'Tiêu đề', 'Brand/Microscope/Semi · text/primary-black'], ['style', 'Mô tả', 'Brand/Body-xs/Regular · text/gray-on-surface'], ['def', 'Bố cục', 'xếp dọc, căn giữa, cách nhau 6']] },
    { nums: [4], layer: 'Khung thông tin · Popup', type: 'Frame', attrs: [['def', 'Kích thước', '340 × 300'], ['def', 'Khoảng đệm', '12 mọi phía · các mục cách nhau 12'], ['style', 'Nhãn (Size, Name…)', 'Brand/Body-xs/Semi · text/secondary-black (main)']] },
    { nums: [5], layer: 'Cảnh báo · inline-alert', type: 'Instance', attrs: [['dep', 'Dùng component', 'inline-alert'], ['def', 'Biến thể', 'State=Waring · Style=Filled Tinted'], ['style', 'Nền', 'surface/warning-muted'], ['style', 'Chữ', 'Brand/Body-xs/Medium · text/warning-on-surface']] },
    { nums: [6], layer: 'Khung Audience · __list-checkbox-inner', type: 'Frame', attrs: [['def', 'Kích thước', '1193 × 333'], ['def', 'Khoảng đệm', 'trên/dưới 8 · các hàng cách nhau 2'], ['style', 'Nhãn “Audience”', 'Brand/Body-xs/Regular · text/gray-on-surface']] },
    { nums: [7], layer: 'Hàng audience · __audience-item', type: 'Instance', attrs: [['def', 'Số lượng', '7 hàng'], ['style', 'Tên audience', 'Brand/Body-xs/Medium · text/secondary-black (main)'], ['style', 'Loại (bên phải)', 'Brand/Body-xs/Regular · text/gray-on-surface']] },
    { nums: [8], layer: 'Nhãn trạng thái · Badge', type: 'Instance', attrs: [['dep', 'Dùng component', 'Badge'], ['style', 'Available (xanh)', 'text/success · Brand/Body-caption/Regular'], ['style', 'Unavailable (xám)', 'text/on-primary-black-weak']] }
  ],
  // layout: toạ độ TƯƠNG ĐỐI so với góc trên-trái của instance. overlays: [màu 'Red'(padding)|'Blue'(gap), 'h'|'v', x, y, w, h]; dims: ['h'|'v', x, y, độ dài, 'NNNpx']
  layout: {
    overlays: [['Blue', 'h', 0, 364, 1193, 12], ['Blue', 'v', 829, 52, 12, 300], ['Red', 'v', 0, 40, 12, 324], ['Red', 'h', 841, 52, 340, 12], ['Red', 'h', 12, 52, 817, 8]],
    dims: [['h', 0, -190, 1193, '1193px'], ['h', 12, -130, 817, '817px'], ['h', 841, -70, 340, '340px'], ['v', -200, 0, 709, '709px'], ['v', -110, 0, 364, '364px'], ['v', -110, 376, 333, '333px'], ['v', 1233, 52, 300, '300px']]
  },
  readNote: { title: 'Cách đọc hình kích thước', body: 'Nhãn đỏ ghi kích thước theo px. Vùng đỏ nhạt là khoảng đệm bên trong (padding), vùng xanh nhạt là khoảng cách giữa hai khối (gap). Khối trên và khối Audience cách nhau 12 px, khung Campaigns và khung thông tin cũng cách nhau 12 px (spacing/md).' }
};
// ===================== BUILD =====================
await initHandoff(CFG1.targetPageId, { esdsPageId: CFG1.esdsPageId });
removeSectionsByPrefix(new RegExp('^' + CFG1.prefix + ' · ' + CFG1.component + ' · 01 '));
const src1 = await figma.getNodeByIdAsync(CFG1.sourceId);
const sec1 = mkSection(`${CFG1.prefix} · ${CFG1.component} · 01 Anatomy & Layout`, CFG1.originX, CFG1.originY);
await header(sec1, { status: CFG1.status, title: CFG1.component, state: CFG1.state, heading: '❖ 01 Anatomy & Layout', sub: CFG1.sub });
// --- Anatomy ---
await label(sec1, 'item', 'Anatomy', CFG1.anatomyMeta, 120, 520);
const aw = Math.round(src1.width) + 400, ah = Math.round(src1.height) + 320;
const art1 = artFrame(sec1, 'Artwork · anatomy', 120, 600, aw, ah);
const cl1 = src1.clone(); art1.appendChild(cl1); cl1.x = 200; cl1.y = 160; cl1.name = 'Instance · ' + CFG1.anatomyMeta;
for (const m of CFG1.markers) {
  const node = findIn(cl1, m.find); if (!node) { warn.push('Không tìm thấy node cho marker ' + m.n); continue; }
  const r = relRect(cl1, node), ox = 200, oy = 160;
  const yy = oy + r.y + (m.along === 'mid' ? r.h / 2 - 12 : (m.along || 8));
  const xx = m.kind === 'TL' ? ox + r.x + 2 - 48 : m.kind === 'TR' ? ox + r.x + r.w - 2 : ox + r.x - 30;
  await marker(art1, m.kind, m.n, xx, yy);
}
const col1 = figma.createAutoLayout('VERTICAL', { itemSpacing: 56 }); sec1.appendChild(col1); col1.name = 'Elements'; col1.x = 120 + aw + 160; col1.y = 520;
for (const e of CFG1.elements) await elementBlock(col1, e.nums, e.layer, e.type, e.attrs);
// --- Dimension ---
const ly0 = 600 + ah + 160, lw = Math.round(src1.width) + 480, lh = Math.round(src1.height) + 380;
await label(sec1, 'item', 'Dimension', CFG1.layoutMeta, 120, ly0 - 80);
const lart = artFrame(sec1, 'Artwork · layout', 120, ly0, lw, lh);
const lx = 240, ly = 260; const cl2 = src1.clone(); lart.appendChild(cl2); cl2.x = lx; cl2.y = ly; cl2.name = 'Instance · ' + CFG1.anatomyMeta;
for (const [color, dir, x, y, w, h] of CFG1.layout.overlays) await overlay(lart, color, dir, lx + x, ly + y, w, h);
for (const [dir, x, y, L, lab] of CFG1.layout.dims) await dimPx(lart, dir, lx + x, ly + y, L, lab);
await note(sec1, 'none', 'default', CFG1.readNote.title, CFG1.readNote.body, 120 + aw + 160, col1.y + col1.height + 100, 600);
fit(sec1);
return { id: sec1.id, h: sec1.height, warn };
