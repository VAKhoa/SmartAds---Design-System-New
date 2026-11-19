/* review-section.js — Section REVIEW: phản hồi cho Designer, TÁCH khỏi spec bàn giao (đặt bên phải cột spec).
 * Dán SAU helpers.js. Chỉ MỘT note chữ, gom theo nhóm lỗi, KHÔNG lặp lại nội dung đã có trong spec.
 * Nhóm gợi ý: Chính tả và câu chữ · Màu và token · Layer và style · Thiết kế còn thiếu hoặc cần xác nhận · Hành vi cần chốt trước khi bàn giao.
 * Mọi điều spec không khẳng định được (hành vi chưa thiết kế, trigger, giới hạn…) và mọi "Do" là đề xuất của bạn phải nằm ở đây.
 */
// ===================== CONFIG =====================
const CFGR = {
  targetPageId: '474:843', esdsPageId: '1:413', prefix: 'REVIEW', component: 'primitive-search-create-campaign',
  originX: X0 + W + 400, originY: -355,
  groups: [
    { title: 'Chính tả và câu chữ', items: ['“Availble” → “Available” (4 badge trong Audience list).', 'Variant “State=Waring” của inline-alert → “Warning”.', 'Vùng Audience (state Empty) đang dùng câu “No Campaign Selected” và hướng dẫn chọn campaign → cần câu riêng cho Audience.', '6 hàng campaign (state Press) cùng tên mẫu “All website visitors - Eclick.vn”.'] },
    { title: 'Màu và token', items: ['Viền Disable đang dùng border/gray-hover (token của hover) → cần token riêng cho Disable.', 'Token cũ còn được bind: margin/4, margin/8, space/0 → dùng spacing/xs, spacing/sm, spacing/none.', 'Contrast chưa đạt 4.5:1: text/warning-on-surface 2.16 · text/success 3.52 · text/gray-on-surface 4.13.'] },
    { title: 'Layer và style', items: ['Tên layer “__audience-item ” có dấu cách ở cuối.', 'Giá trị “--” của Size dùng Body-caption, các dòng khác trong khung thông tin dùng Body-xs.'] },
    { title: 'Thiết kế còn thiếu hoặc cần xác nhận', items: ['“Search empty” đang giống hệt “Typing” → xác nhận có phải trạng thái không có kết quả; nếu có, cần thiết kế và câu chữ.', 'Chưa có focus ring cho ô tìm kiếm, chip “Selected ×” và hàng danh sách.', 'Chưa có Tablet / Mobile, chưa có chiều rộng tối thiểu / tối đa.', 'Tên audience quá dài: Do / Don’t ở trang 03 đang dùng phương án cắt bằng “…” trong một dòng — cần xác nhận, kèm số ký tự tối đa.', 'Danh sách gợi ý (Typing) đang che một phần hàng tag bên dưới.'] },
    { title: 'Hành vi cần chốt trước khi bàn giao', items: ['Gõ bao nhiêu ký tự thì hiện gợi ý; có debounce không.', 'Chọn campaign bằng cách nào, tối đa bao nhiêu; bấm × trên “N Selected” thì về trạng thái nào.', 'Bấm vào hàng Audience thì làm gì.'] }
  ]
};
// ===================== BUILD =====================
await initHandoff(CFGR.targetPageId, { esdsPageId: CFGR.esdsPageId });
removeSectionsByPrefix(new RegExp('^' + CFGR.prefix + ' · ' + CFGR.component));
const secR = mkSection(`${CFGR.prefix} · ${CFGR.component} · Phản hồi cho Designer`, CFGR.originX, CFGR.originY, 1400);
await label(secR, 'group', 'Phản hồi cho Designer', 'Không thuộc spec bàn giao · xử lý trước khi chuyển Developer', 120, 120);
const bodyR = CFGR.groups.map((g, i) => (i + 1) + '. ' + g.title + '\n' + g.items.map(t => '• ' + t).join('\n')).join('\n\n');
await note(secR, 'none', 'default', 'Các điểm cần rà soát', bodyR, 120, 240, 1100, { noLead: true, boldLines: true });
fit(secR, 1400);
return { id: secR.id, h: secR.height, warn };
