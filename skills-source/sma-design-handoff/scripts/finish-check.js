/* finish-check.js — BƯỚC CUỐI: xếp lại Section (cách nhau 240) + kiểm tra cấu trúc. Dán SAU helpers.js. Chỉ đọc + đổi toạ độ Section.
 * Section lớn lên sau khi chỉnh nên bắt buộc chạy lại bước này mỗi lần sửa. Kết quả: report.problems phải rỗng.
 */
const CFGF = {
  targetPageId: '474:843', esdsPageId: '1:413', sourceId: '474:22181',
  order: ['SPEC · primitive-search-create-campaign · 01 Anatomy & Layout', 'SPEC · primitive-search-create-campaign · 02 Variants & States', 'UI · primitive-search-create-campaign · 03 Interaction & Responsive'],
  reviewPrefix: 'REVIEW · primitive-search-create-campaign', originX: X0, originY: -355, maxPages: 4
};
await initHandoff(CFGF.targetPageId, { esdsPageId: CFGF.esdsPageId });
const rep = { sections: [], problems: [] };
let yy = CFGF.originY;
for (const n of CFGF.order) {
  const s = figma.currentPage.children.find(c => c.type === 'SECTION' && c.name === n);
  if (!s) { rep.problems.push('THIẾU Section: ' + n); continue; }
  s.x = CFGF.originX; s.y = yy; yy += s.height + 240;
  const card = s.children.find(c => c.name === 'Card spec');
  rep.sections.push(n.split('· ').pop() + ' · ' + Math.round(s.width) + '×' + Math.round(s.height));
  if (!card) rep.problems.push('Không có Card spec: ' + n);
  else if (Math.round(card.width) !== CW) rep.problems.push('Card spec chưa rộng bằng nội dung: ' + n);
  if (!/^(SPEC|UI) · .+ · \d{2} .+/.test(n)) rep.problems.push('Tên Section sai chuẩn: ' + n);
}
if (CFGF.order.length > CFGF.maxPages) rep.problems.push('Quá ' + CFGF.maxPages + ' trang spec');
const secs = CFGF.order.map(n => figma.currentPage.children.find(c => c.name === n)).filter(Boolean);
rep.gaps = secs.slice(1).map((s, i) => Math.round(s.y - (secs[i].y + secs[i].height))); if (rep.gaps.some(g => g !== 240)) rep.problems.push('Khoảng cách Section khác 240: ' + rep.gaps);
const review = figma.currentPage.children.find(c => c.type === 'SECTION' && c.name.startsWith(CFGF.reviewPrefix)); if (!review) rep.problems.push('Thiếu Section REVIEW (phản hồi cho Designer)');
// marker khớp số phần tử
const anat = secs[0] && secs[0].findOne(n => n.name === 'Artwork · anatomy');
if (anat) { const m = anat.children.filter(c => c.name.startsWith('Marker ')).map(c => c.name.slice(7)); const nums = new Set(secs[0].findAll(n => n.name === 'Numbers').flatMap(n => n.children.map(b => b.findOne(x => x.type === 'TEXT').characters)));
  const miss = m.filter(x => !nums.has(x)); if (miss.length) rep.problems.push('Marker không có trong danh sách phần tử: ' + miss); rep.markers = m.length; }
const all = figma.currentPage.findAll(n => n.type === 'INSTANCE' && n.name.startsWith('Note ·'));
rep.notes = all.length;
// Assigned By phải giữ giá trị gốc của component (không đổi); Posted on phải có giờ HH:mm; không còn text mẫu
rep.assignedBy = [...new Set(all.map(n => { const t = n.findAll(x => x.type === 'TEXT' && x.parent && x.parent.name === 'Username')[0]; return t ? t.characters : '?'; }))];
const stale = figma.currentPage.findAll(n => n.type === 'TEXT' && (/^(Note Title|Write your note\.\.\.|Thu Mar 07, 2024)$/.test(n.characters))); if (stale.length) rep.problems.push('Còn text mẫu của Note spec: ' + stale.length);
const machine = figma.currentPage.findAll(n => n.type === 'TEXT' && /Thấy trong Figma|Chưa rõ:|UNVERIFIED|OBSERVED|Lỗi thiết kế:/.test(n.characters) && !(review && review.findAll(x => x.id === n.id).length)); if (machine.length) rep.problems.push('Giọng "máy" / lỗi lẫn trong spec: ' + machine.length);
const noTime = all.filter(n => !n.findAll(t => t.type === 'TEXT' && /^\d{2}:\d{2} - [A-Z][a-z]{2} \d{1,2}, \d{4}$/.test(t.characters)).length); if (noTime.length) rep.problems.push('Note thiếu giờ Posted on: ' + noTime.length);
rep.labels = figma.currentPage.findAll(n => n.type === 'INSTANCE' && n.name.startsWith('Label ·')).length;
rep.tables = figma.currentPage.findAll(n => n.name.startsWith('Table ·')).length; if (rep.tables > 1) rep.problems.push('Nhiều hơn 1 bảng (' + rep.tables + ') — chỉ giữ bảng thật cần');
const src = CFGF.sourceId && await figma.getNodeByIdAsync(CFGF.sourceId); if (src) rep.sourceIntact = { x: src.x, y: src.y, w: Math.round(src.width), h: Math.round(src.height) };
rep.strayOnPage = figma.currentPage.children.filter(c => c.type !== 'SECTION' && c.id !== CFGF.sourceId).map(c => c.name);
rep.warn = warn;
return rep;
