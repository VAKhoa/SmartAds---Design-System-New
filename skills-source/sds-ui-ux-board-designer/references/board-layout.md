# Board Layout & Self-check

## Cấu trúc board (một Section cho mỗi assign)

Tên Section: `<Mã/Tên assign> — <YYYY-MM-DD> — v<N>`. Xếp các khung từ trái sang phải hoặc trên xuống dưới theo thứ tự đọc:

| # | Khung | Nội dung |
|---|---|---|
| 1 | `00 Cover & Brief` | Tên assign, mục tiêu, persona, phạm vi, giả định, nguồn design system (file key, ngày đọc), trạng thái (Draft/Review) |
| 2 | `01 User Flow` | Sơ đồ flow: bước, quyết định, nhánh lỗi/rỗng; đánh số màn khớp khung 03 |
| 3 | `02 Wireframe` (tùy chọn) | Chỉ khi flow/IA còn mơ hồ cần chốt trước; low-fi, dùng component SDS dạng đơn giản |
| 4 | `03 Screens — Desktop` / `— Tablet` / `— Mobile` | Màn hình chính, mỗi màn một frame đúng kích thước viewport của SDS |
| 5 | `04 States` | Loading, empty, error, success, disabled, nội dung dài/tràn cho các vùng quan trọng |
| 6 | `05 Component & Token Usage` | Bảng component đã dùng (instance), token chính, annotation tương tác cho Dev |
| 7 | `06 Proposed (chờ duyệt)` | Element/variant/token mới, nhãn rõ trạng thái `PENDING` / `APPROVED` |
| 8 | `07 Open Questions & Decisions` | Câu hỏi mở, `needs-value`, `[UNVERIFIED]`, quyết định đã duyệt (ngày) |

Chỉ tạo khung có nội dung; không tạo khung rỗng cho đủ.

## Quy tắc dựng
- Frame màn hình dùng viewport/grid/margin theo foundation layout của SDS (đọc từ Figma, không tự nghĩ).
- Auto layout cho mọi container; spacing/padding/gap bind token spacing; radius bind token radius.
- Màu fill/stroke/text bind variable Semantic (`surface/*`, `text/*`, `border/*`, `icon/*`); không dùng trực tiếp Base nếu có Semantic.
- Chữ dùng text style của SDS; không chỉnh size/weight rời.
- Icon lấy từ bộ icon SDS (instance), không import icon ngoài.
- Dữ liệu mẫu thực tế & nhất quán (đơn vị tiền, định dạng số, ngày theo ngôn ngữ brief).
- Tên layer: `Screen/<Tên màn>`, `Section/<Vùng>`, component con giữ tên instance; không `Frame 123`, `Group 4`.
- Annotation: dùng khung chú thích nhất quán, không để chồng lên UI.
- Mỗi lần ghi Figma: một phần nhỏ → `get_screenshot` kiểm tra → tiếp tục. Không tạo hàng loạt rồi mới xem.

## Self-check trước khi giao
**Design system**
- [ ] 0 fill/stroke/text/spacing/radius hard-code (kiểm bằng binding thật, không bằng mắt)
- [ ] Mọi component là instance của thư viện, không detach ngoài ý muốn
- [ ] Variant/property đúng ngữ cảnh; không override ngầm style
- [ ] Không dùng token DEPRECATED/đã xóa
- [ ] Phần mới đều nằm ở `Proposed` hoặc đã có xác nhận ghi trong `Decisions`

**UX**
- [ ] Mỗi màn có một hành động chính duy nhất, nổi bật
- [ ] Flow có đường ra/quay lại, có xử lý lỗi và trạng thái rỗng
- [ ] Ma trận trạng thái đã cam kết đều có frame
- [ ] Nhãn/copy ngắn, nhất quán, cùng thuật ngữ với sản phẩm (xem glossary SDS)

**Chất lượng hình ảnh & truy cập**
- [ ] Tương phản chữ ≥ 4.5:1 (chữ lớn ≥ 3:1); không truyền đạt chỉ bằng màu
- [ ] Vùng chạm ≥ 44×44px trên mobile; focus state hiện diện cho control tương tác
- [ ] Không text bị cắt/tràn khi nội dung dài; resize hợp lý giữa các viewport
- [ ] Căn lề/hierarchy nhất quán; không có phần tử lệch pixel

**Tên & tổ chức**
- [ ] Tên layer/component đúng quy ước; section đặt tên + ngày + phiên bản
- [ ] Cover ghi rõ nguồn design system và giả định
