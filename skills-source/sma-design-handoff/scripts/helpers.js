/* sma-design-handoff · helpers.js
 * CÁCH DÙNG: dán file này TRƯỚC script trang (page-*.js / review-section.js / finish-check.js) trong CÙNG MỘT lệnh use_figma.
 * Chạy trong Figma Plugin API (có top-level await, kết thúc bằng `return`). Không dùng figma.notify, không wrap IIFE.
 * Mọi component ESDS gọi theo KEY của component set + TÊN variant → chạy được cả trong file ESDS Specs lẫn file thiết kế
 * (cần bật thư viện SmartAds - ESDS Specs và SmartAds - Design System; Label spec / Dimension px phải đã publish).
 */
const W = 2600, CW = W - 240, X0 = 1400;               // bề rộng Section, bề rộng nội dung, x gốc cột spec

// ---------- khoá component set ESDS (xem references/esds-components.md; chạy scripts/verify-esds.js khi nghi ngờ lệch) ----------
const ESDS = {
  card: '3cd5e013394c5bb28a1fa65cb8bea1bafaec6c70',      // Card spec   (Status=…)
  note: '0aa030d12537df425fd7745f36e6c3346aecff94',      // Note spec   (Arrow=…, State=Default|Error)
  label: 'b10c30098c271ab7258cb47866aaad9fd57f9d94',     // Label spec  (Level=Item|Group)
  dimpx: '83132110916ccbd2eee8d3b70be36fe160f471ca',     // Dimension px (Direction=Horizontal|Vertical)
  marker: '20d241e0f6127cc25071f8514d5581bae1767262',    // Spec marker (Direction=…, Type=Tail|Notch)
  layerName: '42fa2263b3d923b7680863c54801e25138da8a83', // Spec layer name (Type=Frame|Instance|Text…)
  attr: '1962dfedb327ceb561bfef2b6235858402a3346b',      // Spec attribute (Type=Default|Dependency|Style)
  badge: 'aa79bb0252b487086ab2e163a857836d30eed204',     // number-spect-badge
  overlay: '77296397597a15c8987d161ec5a75cd523276c42'    // overlay-gaps-line (Type=Ngang|Dọc, Color=Red|Blue)
};
// ---------- biến + style của SmartAds - Design System ----------
const VAR_KEYS = {
  white: '9e922b9d5626101e62d0fdfcf98d8c8381bf1c67',   // surface/neutral-white
  stroke: '5a7da52d65b1560ef39c7e5f1c2785a0bbe378f1',  // border/gray-stronger
  gray: '51d36ba3769623afc1f3882c9181ec0f6fe14825',    // text/gray-on-surface
  black: 'f5ce78a1dbc88558f198280fb3df9652523f7945',   // text/primary-black
  sec: '5ead08ec0abfab827995519308b550012a2c4fd9',     // text/secondary-black (main)
  sgray: 'c29b0ae3f144e1a04480837ce177f7d328aa6d1a',   // surface/gray
  danger: 'a9b0f32a4649f51b3295b1f90d940ffe016660ce',  // text/danger-on-surface
  tsucc: '4bde6e54110eca3e55996ca258520a5ae93eb525',   // text/success-on-surface
  bsucc: '4cc3c3d6982691787fac0576153c12ebb5b5f653',   // border/success
  smuted: '5cad4b3985b58ef0fa459bc644d22403ef75c267'   // surface/success-muted
};
const STYLE_KEYS = {
  sm_r: '939a069401f6cadc4f4ee43177ca87c7fe47db03',    // Brand/Body-sm/Regular
  sm_s: 'b28ce4abd316dd5fee62aa3574def9b4aa4d31dc',    // Brand/Body-sm/Semi
  dsm_s: '32bdbb385847f2549e94219c11e397a449021f75'    // Brand/Display-sm/Semi
};
const ARROW = { none: 'No Arrow', up: '↑ Up', right: '→ Right', down: '↓ Down', left: '← Left' };
let V = {}, ST = {}, SETS = {}, TARGET_PAGE = null;
const warn = [];

// ---------- khởi tạo: import component ESDS, biến, style, font; chuyển sang trang đích ----------
// opts.esdsPageId: chỉ dùng khi chạy NGAY TRONG file ESDS Specs (component local chưa publish) — ví dụ '1:413'.
async function initHandoff(targetPageId, opts = {}) {
  const keys = Object.values(ESDS);
  for (const k of keys) { try { SETS[k] = await figma.importComponentSetByKeyAsync(k); } catch (e) { /* thử local bên dưới */ } }
  const missing = keys.filter(k => !SETS[k]);
  if (missing.length && opts.esdsPageId) {
    const pg = figma.root.children.find(p => p.id === opts.esdsPageId);
    if (pg) { await figma.setCurrentPageAsync(pg); for (const s of pg.findAllWithCriteria({ types: ['COMPONENT_SET'] })) if (missing.includes(s.key)) SETS[s.key] = s; }
  }
  const still = keys.filter(k => !SETS[k]);
  if (still.length) throw new Error('Thiếu component ESDS (chưa publish hoặc chưa bật thư viện trong file): ' + still.join(', '));
  TARGET_PAGE = figma.root.children.find(p => p.id === targetPageId);
  await figma.setCurrentPageAsync(TARGET_PAGE);
  for (const s of ['Regular', 'Medium', 'SemiBold', 'Bold']) await figma.loadFontAsync({ family: 'Public Sans', style: s });
  for (const k in VAR_KEYS) V[k] = await figma.variables.importVariableByKeyAsync(VAR_KEYS[k]);
  for (const k in STYLE_KEYS) ST[k] = await figma.importStyleByKeyAsync(STYLE_KEYS[k]);
}
const paint = (v) => figma.variables.setBoundVariableForPaint({ type: 'SOLID', color: { r: 1, g: 1, b: 1 } }, 'color', v);
async function inst(setKey, variantName) {
  const c = SETS[setKey].children.find(x => x.name === variantName);
  if (!c) throw new Error('Không có variant "' + variantName + '" trong component set ' + setKey);
  return c.createInstance();
}
const pk = (i, nm) => Object.keys(i.componentProperties).find(k => k.split('#')[0].replace('↪️ ', '').trim() === nm);
function nowStamp() { // "HH:mm - MMM D, YYYY" — giờ lúc tạo note
  const d = new Date(), M = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0') + ' - ' + M[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
}
async function tx(parent, str, o = {}) {
  const t = figma.createText(); t.fontName = { family: 'Public Sans', style: 'Regular' }; t.characters = str; parent.appendChild(t);
  await t.setTextStyleIdAsync(ST[o.s || 'sm_r'].id); t.fills = [paint(V[o.c || 'sec'])];
  if (o.w) { t.textAutoResize = 'HEIGHT'; t.resize(o.w, t.height); }
  t.name = o.name || str.slice(0, 40); return t;
}
function removeSectionsByPrefix(prefixRegex) { for (const c of [...figma.currentPage.children]) if (c.type === 'SECTION' && prefixRegex.test(c.name)) c.remove(); }
function mkSection(name, x, y, w) { const s = figma.createSection(); s.name = name; s.x = x; s.y = y; s.resizeWithoutConstraints(w || W, 1000); s.fills = [paint(V.white)]; return s; }
function fit(sec, w) { let b = 0; for (const c of sec.children) { b = Math.max(b, c.y + c.height); if (c.x + c.width > (w || W) - 120 + 0.5) warn.push(sec.name + ': ' + c.name + ' vượt lề phải ' + Math.round(c.x + c.width - ((w || W) - 120))); } sec.resizeWithoutConstraints(w || W, b + 120); }
function artFrame(sec, name, x, y, w, h) {
  const a = figma.createFrame(); sec.appendChild(a); a.name = name; a.x = x; a.y = y; a.resize(w, h); a.clipsContent = false;
  a.fills = [paint(V.sgray)]; a.strokes = [{ type: 'SOLID', color: { r: 0.71, g: 0.48, b: 1 } }]; a.dashPattern = [8, 8]; a.strokeWeight = 1; return a;
}
function cropFrame(art, w, h, x, y) { const c = figma.createFrame(); art.appendChild(c); c.name = 'Crop'; c.resize(w, h); c.x = x; c.y = y; c.clipsContent = true; c.fills = []; return c; }

// ---------- Card spec (đầu mỗi trang) + tiêu đề trang ----------
// o: { status:'Pending'|'In Progress'|'Handed-off', title, state, heading, sub, devices:['Desktop','Web'] }
async function header(sec, o) {
  const c = await inst(ESDS.card, 'Status=' + (o.status || 'Pending')); sec.appendChild(c); c.x = 120; c.y = 120; c.name = 'Card spec'; c.resize(CW, c.height);
  for (const t of c.findAllWithCriteria({ types: ['TEXT'] })) { if (t.characters === 'Title spec') t.characters = o.title; else if (t.characters === 'Value') t.characters = o.state; }
  const dev = o.devices || ['Desktop', 'Web'];
  for (const b of c.findAll(n => n.name === 'badge_specDocs')) { const tt = b.findOne(n => n.type === 'TEXT'); if (!dev.includes(tt.characters)) b.visible = false; }
  const h = await tx(sec, o.heading, { s: 'dsm_s', c: 'black', name: 'Block title' }); h.x = 120; h.y = 358;
  const u = await tx(sec, o.sub, { s: 'sm_r', c: 'gray', w: 2000, name: 'Block subtitle' }); u.x = 120; u.y = 420; return c;
}
// ---------- Label spec: level 'item' (nhãn từng hình) | 'group' (nhóm hình) ----------
async function label(parent, level, title, meta, x, y) {
  const l = await inst(ESDS.label, level === 'group' ? 'Level=Group' : 'Level=Item'); parent.appendChild(l);
  const set = {}; set[pk(l, 'Title')] = title; if (meta) set[pk(l, 'Meta')] = meta; else set[pk(l, 'Meta?')] = false;
  l.setProperties(set); l.x = x; l.y = y; l.name = 'Label · ' + title; return l;
}
// ---------- Note spec ----------
// kind: 'default' (xanh dương) | 'error' (State=Error, đỏ — dùng cho KHÔNG ĐƯỢC) | 'success' (Default + ghi đè xanh Success — dùng cho NÊN LÀM)
// arrow: 'none'|'up'|'right'|'down'|'left'.  KHÔNG sửa Assigned By (giữ giá trị gốc của component).
function boldLead(t) { const m = /^[^.:\n]+[.:]/.exec(t.characters); if (m) t.setRangeFontName(0, m[0].length, { family: 'Public Sans', style: 'SemiBold' }); }
async function note(parent, arrow, kind, title, body, x, y, w, o = {}) {
  const n = await inst(ESDS.note, 'Arrow=' + ARROW[arrow] + ', State=' + (kind === 'error' ? 'Error' : 'Default')); parent.appendChild(n);
  n.x = x; n.y = y; n.resize(w || 600, n.height);
  const tk = pk(n, 'Title'); if (tk) n.setProperties({ [tk]: title });
  const tt = n.findOne(t => t.type === 'TEXT' && t.characters === 'Note Title'); if (tt) tt.characters = title;   // variant mũi tên không có property Title
  const hd = n.findOne(t => t.name === 'Heading'); if (hd) hd.layoutSizingHorizontal = 'FILL';
  const bt = n.findOne(t => t.type === 'TEXT' && t.characters === 'Write your note...'); bt.characters = body;
  if (!o.noLead) boldLead(bt);
  if (o.boldLines) { const re = /^\d\. .*$/gm; let m; while ((m = re.exec(body))) bt.setRangeFontName(m.index, m.index + m[0].length, { family: 'Public Sans', style: 'SemiBold' }); }
  const m = /KHÔNG ĐƯỢC:/.exec(body); if (m) { bt.setRangeFontName(m.index, m.index + m[0].length, { family: 'Public Sans', style: 'SemiBold' }); bt.setRangeFills(m.index, m.index + m[0].length, [paint(V.danger)]); }
  if (kind === 'success') {
    n.strokes = [paint(V.bsucc)]; if (hd) hd.fills = [paint(V.smuted)];
    const ti = n.findOne(t => t.type === 'TEXT' && t.characters === title); if (ti) { ti.fills = [paint(V.tsucc)]; ti.setRangeFontName(0, ti.characters.length, { family: 'Public Sans', style: 'SemiBold' }); }
  }
  for (const b of n.findAll(x => x.name === 'badge_specDocs')) { const t2 = b.findOne(x => x.type === 'TEXT'); if (t2 && !['Desktop', 'Web'].includes(t2.characters)) b.visible = false; }
  const dt = n.findAll(t => t.type === 'TEXT' && t.parent && t.parent.name === 'Time' && t.characters !== 'Posted on')[0]; if (dt) dt.characters = nowStamp();
  n.name = 'Note · ' + title; return n;
}
// Căn dấu chấm cuối đường chỉ của note có mũi tên vào đúng điểm đích (toạ độ tuyệt đối). dir = hướng của note: 'down'|'up'|'left'|'right'
function aim(n, dir, tx_, ty_) {
  const ln = n.findOne(x => x.type === 'VECTOR' && x.name === 'Line'); const b = ln.absoluteBoundingBox; let px, py;
  if (dir === 'down') { px = b.x + b.width / 2; py = b.y + b.height; } else if (dir === 'up') { px = b.x + b.width / 2; py = b.y; }
  else if (dir === 'left') { px = b.x; py = b.y + b.height / 2; } else { px = b.x + b.width; py = b.y + b.height / 2; }
  n.x += tx_ - px; n.y += ty_ - py;
}
// ---------- bảng (chỉ dùng khi thật cần, thường 1 bảng ma trận) ----------
async function table(parent, rows, widths, name) {
  const tbl = figma.createAutoLayout('VERTICAL', { itemSpacing: 0 }); parent.appendChild(tbl); tbl.name = name;
  tbl.strokes = [paint(V.stroke)]; tbl.strokeWeight = 1; tbl.cornerRadius = 8; tbl.clipsContent = true;
  for (let i = 0; i < rows.length; i++) {
    const r = figma.createAutoLayout('HORIZONTAL', { itemSpacing: 0 }); tbl.appendChild(r); r.name = i === 0 ? 'Row head' : 'Row'; const cells = [];
    for (let j = 0; j < rows[i].length; j++) {
      const c = figma.createAutoLayout('VERTICAL', { itemSpacing: 0 }); r.appendChild(c); c.name = 'Cell'; c.paddingTop = c.paddingBottom = 12; c.paddingLeft = c.paddingRight = 16;
      c.strokes = [paint(V.stroke)]; c.strokeTopWeight = 0; c.strokeLeftWeight = 0; c.strokeRightWeight = j < rows[i].length - 1 ? 1 : 0; c.strokeBottomWeight = i < rows.length - 1 ? 1 : 0;
      if (i === 0) c.fills = [paint(V.sgray)]; c.resize(widths[j] + 32, c.height); c.counterAxisSizingMode = 'FIXED';
      const t = await tx(c, String(rows[i][j]), { s: i === 0 ? 'sm_s' : 'sm_r' }); t.layoutSizingHorizontal = 'FILL'; t.textAutoResize = 'HEIGHT'; cells.push(c);
    }
    for (const c of cells) c.layoutSizingVertical = 'FILL';
  }
  return tbl;
}
// ---------- marker đánh số, đường đo px, overlay padding/gap ----------
const MK = { TL: 'Direction=Left, Type=Tail', TT: 'Direction=Top, Type=Tail', TR: 'Direction=Right, Type=Tail', TB: 'Direction=Bottom, Type=Tail', NL: 'Direction=Left, Type=Notch', NT: 'Direction=Top, Type=Notch', NB: 'Direction=Bottom, Type=Notch', NR: 'Direction=Right, Type=Notch' };
async function marker(parent, kind, n, x, y) { const m = await inst(ESDS.marker, MK[kind]); parent.appendChild(m); m.setProperties({ [pk(m, 'ID')]: String(n) }); m.x = x; m.y = y; m.name = 'Marker ' + n; return m; }
// dir 'h' = đo chiều rộng (nhãn trên đường), 'v' = đo chiều cao (nhãn bên trái đường). L = độ dài px; label ví dụ '817px'
async function dimPx(parent, dir, x, y, L, labelText) {
  const d = await inst(ESDS.dimpx, dir === 'h' ? 'Direction=Horizontal' : 'Direction=Vertical'); parent.appendChild(d);
  d.setProperties({ [pk(d, 'Value')]: labelText }); if (dir === 'h') d.resize(L, d.height); else d.resize(d.width, L); d.x = x; d.y = y; return d;
}
// color 'Red' = padding/margin, 'Blue' = gap; dir 'h' = dải ngang, 'v' = dải dọc
async function overlay(parent, color, dir, x, y, w, h) { const n = await inst(ESDS.overlay, 'Type=' + (dir === 'h' ? 'Ngang' : 'Dọc') + ', Color=' + color); parent.appendChild(n); n.resize(w, h); n.x = x; n.y = y; return n; }
// ---------- danh sách phần tử (Spec layer name + Spec attribute) ----------
// attrs: [['dep'|'style'|'def', nhãn, giá trị], …]; nums: [1] hoặc [1,2,4,6] cho khối style dùng chung
async function elementBlock(col, nums, layer, type, attrs) {
  const row = figma.createAutoLayout('HORIZONTAL', { itemSpacing: 20 }); col.appendChild(row); row.name = 'Element ' + nums.join('·'); row.counterAxisAlignItems = 'MIN';
  const bs = figma.createAutoLayout('HORIZONTAL', { itemSpacing: 6 }); row.appendChild(bs); bs.name = 'Numbers';
  for (const n of nums) { const b = await inst(ESDS.badge, 'Size=md (main), Color=Black'); bs.appendChild(b); b.findOne(x => x.type === 'TEXT').characters = String(n); }
  const c = figma.createAutoLayout('VERTICAL', { itemSpacing: 10 }); row.appendChild(c);
  const L = await inst(ESDS.layerName, 'Type=' + type); c.appendChild(L); L.findOne(x => x.type === 'TEXT' && x.name === 'Name').characters = layer;
  const AT = { dep: 'Type=Dependency', style: 'Type=Style', def: 'Type=Default' };
  for (const [k, lab, val] of attrs) { const a = await inst(ESDS.attr, AT[k]); c.appendChild(a); a.findOne(x => x.type === 'TEXT' && x.name === 'Name').characters = lab + ' :'; a.findOne(x => x.type === 'TEXT' && x.name === 'Value').characters = val; }
}
// ---------- tìm node trong bản clone + toạ độ tương đối ----------
function findIn(root, f) { // f: { name, prefix, i }
  const all = root.findAll(n => f.prefix ? n.name.startsWith(f.prefix) : n.name === f.name); return all[f.i || 0];
}
function relRect(root, node) { const a = root.absoluteBoundingBox, b = node.absoluteBoundingBox; return { x: b.x - a.x, y: b.y - a.y, w: b.width, h: b.height }; }
