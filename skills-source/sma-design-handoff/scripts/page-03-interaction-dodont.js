/* page-03-interaction-dodont.js — TRANG 03 (UI): điểm thao tác (note có mũi tên) + khối Do / Don't.
 * Dán SAU helpers.js. Chỉ sửa CONFIG.
 * Do = note xanh Success (Default + ghi đè màu); Don't = note State=Error. Chỉ 3–4 trường hợp dễ sai nhất khi dev code / designer khác dùng.
 * Trường hợp có hình: cắt vùng liên quan, Do rồi Don't xếp hàng nối nhau, note bên phải, mũi tên trỏ cuối hàng (không che nội dung).
 * Trường hợp chỉ chữ: Do và Don't đặt cạnh nhau. Nếu "Do" là đề xuất của bạn mà Figma chưa quyết → ghi vào REVIEW để Designer xác nhận.
 */
// ===================== CONFIG =====================
const CFG3 = {
  targetPageId: '474:843', esdsPageId: '1:413', sourceId: '474:22181',
  prefix: 'UI', component: 'primitive-search-create-campaign', status: 'Pending',
  after: 'SPEC · primitive-search-create-campaign · 02 Variants & States',
  originX: X0, originY: -355,
  state: 'Thao tác · chiều rộng hỗ trợ',
  sub: 'Các điểm thao tác chính của component và các chiều rộng đã được thiết kế.',
  interaction: {
    groupTitle: 'Thao tác', groupMeta: 'Retargeting & User Behavior', artSize: [2360, 1540], instanceAt: [320, 380],
    // arrow: hướng của note; at: vị trí note so với instance (trước khi căn); target(b): điểm đích tuyệt đối từ hộp tuyệt đối b của instance
    notes: [
      { arrow: 'down', title: 'Ô tìm kiếm', body: 'Khi người dùng nhập chữ, ô chuyển sang trạng thái Typing: viền xanh, nút × để xóa nội dung và danh sách gợi ý hiển thị bên dưới (chi tiết ở trang 02).', at: [60, -330], target: b => [b.x + 250, b.y + 40] },
      { arrow: 'left', title: 'Chọn campaign', body: 'Khi người dùng chọn campaign, khung thông tin bên phải hiển thị Size, Name, Type, Availability của campaign đó và nhãn “N Selected ×” xuất hiện cạnh tiêu đề Campaigns (trạng thái Press).', at: [1333, 100], target: b => [b.x + 1181, b.y + 190] },
      { arrow: 'up', title: 'Danh sách Audience', body: 'Hàng audience được làm nổi bằng nền xám nhạt trong trạng thái Press. Danh sách hiển thị 7 hàng, mỗi hàng gồm nhãn trạng thái, tên audience và loại.', at: [320, 849], target: b => [b.x + 700, b.y + 709] }
    ]
  },
  dodont: {
    groupTitle: 'Do và Don’t', groupMeta: 'Chiều rộng và nội dung dài · các trường hợp dễ sai khi triển khai',
    visual: {   // trường hợp có hình (chữ dài tràn)
      label: 'Tên audience dài', meta: 'Thử với tên 190 ký tự · bản sao dùng để kiểm tra',
      longText: 'Comprehensive guide to real estate assistance and investment opportunities for first-time buyers in Ho Chi Minh City, Hanoi and Da Nang during the November 2024 to March 2025 campaign period',
      findText: 'Comprehensive guide', neighborText: 'Ads engagement', cropY: 370, cropSize: [1193, 150],
      doNote: { title: 'Cắt gọn tên audience dài', body: 'Tên audience dài được cắt gọn bằng dấu “…” trong một dòng, không chạm vào nhãn loại (Ads engagement) ở bên phải.' },
      dontNote: { title: 'Không để tên audience tràn khung', body: 'KHÔNG ĐƯỢC: để tên audience chạy tràn khung hoặc đè lên nhãn loại (Ads engagement) ở bên phải.' }
    },
    cases: [    // trường hợp chỉ chữ
      { label: 'Chiều rộng component', doTitle: 'Hai chiều rộng đã thiết kế', doBody: 'Dùng đúng chiều rộng đã thiết kế: 712 px (Keywords, Contextual) và 1193 px (Retargeting & User Behavior).', dontTitle: 'Không tự đổi chiều rộng', dontBody: 'KHÔNG ĐƯỢC: co component xuống dưới 712 px hoặc đặt chiều rộng ngoài hai giá trị trên khi chưa có thiết kế tương ứng.' },
      { label: 'Tổ hợp thuộc tính', doTitle: 'Chỉ dùng tổ hợp đã thiết kế', doBody: 'Chỉ dùng 16 tổ hợp thuộc tính trong bảng ở trang 02.', dontTitle: 'Không tự ghép tổ hợp', dontBody: 'KHÔNG ĐƯỢC: ghép tổ hợp không có trong bảng (ví dụ Retargeting & User Behavior với Tier = true) hoặc tự lấy tổ hợp gần nhất để thay thế.' },
      { label: 'Token và khoảng cách', doTitle: 'Dùng token cho màu và khoảng cách', doBody: 'Dùng token đã ghi trong spec, ví dụ khoảng cách giữa các khối là spacing/md (12 px), viền là border/gray-stronger.', dontTitle: 'Không gõ cứng giá trị', dontBody: 'KHÔNG ĐƯỢC: gõ cứng mã màu hoặc số px thay cho token, và không tách (detach) instance để chỉnh style.' }
    ]
  }
};
// ===================== BUILD =====================
await initHandoff(CFG3.targetPageId, { esdsPageId: CFG3.esdsPageId });
removeSectionsByPrefix(new RegExp('^' + CFG3.prefix + ' · ' + CFG3.component + ' · 03 '));
const src3 = await figma.getNodeByIdAsync(CFG3.sourceId);
const prev3 = CFG3.after && figma.currentPage.children.find(c => c.type === 'SECTION' && c.name === CFG3.after);
const sec3 = mkSection(`${CFG3.prefix} · ${CFG3.component} · 03 Interaction & Responsive`, CFG3.originX, prev3 ? prev3.y + prev3.height + 240 : CFG3.originY);
await header(sec3, { status: CFG3.status, title: CFG3.component, state: CFG3.state, heading: '❖ 03 Interaction & Responsive', sub: CFG3.sub });
// --- thao tác ---
const I = CFG3.interaction;
await label(sec3, 'group', I.groupTitle, I.groupMeta, 120, 520);
const artI = artFrame(sec3, 'Artwork · interaction', 120, 620, I.artSize[0], I.artSize[1]);
const clI = src3.clone(); artI.appendChild(clI); clI.x = I.instanceAt[0]; clI.y = I.instanceAt[1];
const bI = clI.absoluteBoundingBox;
for (const nt of I.notes) { const n = await note(artI, nt.arrow, 'default', nt.title, nt.body, clI.x + nt.at[0], clI.y + nt.at[1], 600); const t = nt.target(bI); aim(n, nt.arrow, t[0], t[1]); }
// --- Do / Don't ---
let y = 620 + I.artSize[1] + 200; const D = CFG3.dodont;
await label(sec3, 'group', D.groupTitle, D.groupMeta, 120, y); y += 120;
const V3 = D.visual;
await label(sec3, 'item', V3.label, V3.meta, 120, y); y += 90;
async function visualRow(kind) {
  const c = src3.clone(); const tt = c.findOne(t => t.type === 'TEXT' && t.characters.startsWith(V3.findText)); tt.characters = V3.longText;
  if (kind === 'do') { const nb = c.findAll(t => t.type === 'TEXT' && t.characters === V3.neighborText)[0]; const wmax = nb.absoluteBoundingBox.x - tt.absoluteBoundingBox.x - 24; tt.textAutoResize = 'NONE'; tt.resize(wmax, tt.height); tt.textTruncation = 'ENDING'; }
  const art = artFrame(sec3, 'Artwork · ' + kind, 120, y, V3.cropSize[0] + 80, V3.cropSize[1] + 80);
  const cr = cropFrame(art, V3.cropSize[0], V3.cropSize[1], 40, 40); cr.appendChild(c); c.x = 0; c.y = -V3.cropY;
  const bb = tt.absoluteBoundingBox, cb = c.absoluteBoundingBox;
  const spec = kind === 'do' ? V3.doNote : V3.dontNote;
  const n = await note(sec3, 'left', kind === 'do' ? 'success' : 'error', spec.title, spec.body, 120 + art.width + 200, y, 600);
  aim(n, 'left', cb.x + cb.width - 24, bb.y + bb.height / 2);
  y += Math.max(art.height, n.height) + 80;
}
await visualRow('do'); await visualRow('dont'); y += 60;
for (const k of D.cases) {
  await label(sec3, 'item', k.label, null, 120, y); y += 90;
  const a = await note(sec3, 'none', 'success', k.doTitle, k.doBody, 120, y, 720);
  const b = await note(sec3, 'none', 'error', k.dontTitle, k.dontBody, 120 + 720 + 80, y, 720);
  y += Math.max(a.height, b.height) + 100;
}
fit(sec3);
return { id: sec3.id, h: sec3.height, warn };
