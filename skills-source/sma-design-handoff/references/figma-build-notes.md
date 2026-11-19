# Ghi chú dựng trong Figma

## Cách chạy script
- Mỗi lệnh `use_figma` = nội dung `scripts/helpers.js` + **một** script trang (hoặc `review-section.js` / `finish-check.js`). Không ghép nhiều script trang trong một lệnh (trùng tên biến). Luôn kèm `skillNames: "figma-use,figma-generate-design"`.
- Sửa **chỉ khối `CONFIG`** ở đầu script trang. Nội dung CONFIG trong repo là bản đã duyệt của `primitive-search-create-campaign` (ví dụ mẫu và bài test chuẩn).
- Trong file ESDS Specs: truyền `esdsPageId: '1:413'` (component local chưa publish). Ở file khác: bỏ `esdsPageId`; cần bật thư viện ESDS + Design System; `initHandoff` báo rõ component nào thiếu.
- Mỗi script tự xóa Section cùng tiền tố/tên rồi dựng lại → chạy lại được, **nhưng** sẽ ghi đè Section hiện có cùng tên. Muốn thử mà không đụng bản đã duyệt: đổi `prefix` (vd `TST`) và `originX` xa (vd 20000), xong xóa Section thử.
- Không dùng `figma.notify`, không `console.log`; kết quả qua `return`.

## Đọc node nguồn (trước khi viết CONFIG)
Chạy script chỉ đọc (mỗi lần một trang):
1. `get_metadata` + `get_screenshot` node nguồn; liệt kê component set: `main.parent.componentPropertyDefinitions` (variant, giá trị, default).
2. Cây layer + kích thước + auto layout + binding: duyệt `node.findAll(()=>true)`; với mỗi node đọc `boundVariables` → `figma.variables.getVariableByIdAsync(id)` → tên token; `n.textStyleId` → `getStyleByIdAsync` → tên style. (Biến local của thư viện cũng truy được theo cách này.)
3. **Chụp từng state** (tạo bản `clone()`, `setProperties`, `get_screenshot`) và xem ảnh trước khi viết note. Có thể so khác biệt layer bằng cách duyệt song song hai cây, nhưng **ảnh quyết định**.
4. Contrast: lấy màu chữ (`fills[0].color` đã resolve) và nền gần nhất (đi ngược `parent` tới fill SOLID) rồi tính tỉ lệ — kết quả < 4.5:1 đưa vào REVIEW, không vào spec.
5. Tràn chữ: ghi đè một chuỗi dài trong **bản sao** và quan sát (`textTruncation`, chữ đè lên nhãn bên cạnh…) — dùng cho trường hợp Do/Don't.

## Hằng số bố cục
Section rộng 2600 · lề 120 · nội dung 2360 · cách Section 240 · Card spec y=120 · heading y=358 · mô tả y=420 · nội dung từ y=520 · Label cách hình 64–80 · artwork đệm 200/160 (anatomy), 240/260 (dimension), 40–80 (state) · cột phần tử rộng ~600, cách nhau 56 · note 560–720.

## Bẫy Plugin API (đã gặp)
- Đặt `layoutSizingHorizontal='FILL'/'HUG'` **sau** `appendChild` vào auto layout; `resize()` trước khi đặt sizing.
- Mọi `characters` / `setRange*` cần `loadFontAsync` (Public Sans Regular/Medium/SemiBold/Bold — đã load trong `initHandoff`).
- `setTextStyleIdAsync` thay cho gán `textStyleId`; biến màu gắn bằng `setBoundVariableForPaint` rồi gán lại `fills` (paint mới).
- Đổi property component: tìm key theo tên (`pk`) vì key có hậu tố `#id` và có thể có emoji.
- Instance của set trong thư viện: `importComponentSetByKeyAsync` rồi `children.find(tên variant).createInstance()`.
- Section **không lồng** nhau; node con của Section dùng toạ độ trong Section. Section lớn lên sau khi sửa → luôn xếp lại bằng `finish-check.js`.
- Cắt vùng (`crop`): frame `clipsContent=true` + instance đặt toạ độ âm.
- `findAll` trên instance lớn chậm nhưng chấp nhận được; tránh lặp qua nhiều trang trong một lệnh.
- Trong frame auto layout của ESDS (`1:743`) thứ tự con quyết định vị trí: thêm component set thì thêm heading trước, set sau.

## Quyền ghi Figma
Chỉ ghi vào file + page người dùng đã cho; hỏi lại nếu đổi đích. Không chỉnh thiết kế gốc, không đổi/xóa component hay biến của thư viện; tạo component mới trong ESDS chỉ khi người dùng yêu cầu (Label spec và Dimension px được tạo theo yêu cầu ngày 2026-11-18).
