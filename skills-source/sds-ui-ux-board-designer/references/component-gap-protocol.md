# Component Gap Protocol

Dùng ở Bước 3–4. Mục tiêu: người dùng nhìn một bảng là quyết định được, không phải đọc đoạn văn.

## 1. Bảng Component Mapping (trình cho người dùng)

| # | Element trên board | Trạng thái | Component/Token SDS | Variant / Property | Ghi chú |
|---|---|---|---|---|---|
| 1 | Nút chính "Tạo chiến dịch" | ✅ REUSE | `Button` | type=primary, size=md | — |
| 2 | Chip trạng thái chiến dịch | 🟡 VARIANT-GAP | `Tag` | thiếu state=`paused` | cần duyệt |
| 3 | Thanh chọn khoảng ngày + so sánh | 🟠 COMPOSE | `Input` + `Dropdown` + `Calendar` | — | hỏi đóng component |
| 4 | Thẻ KPI có sparkline | 🔴 NEW | — | — | cần duyệt |
| 5 | Màu nền cảnh báo nhẹ | ⚪ TOKEN-GAP | gần nhất `surface/warning/subtle`? `[UNVERIFIED]` | — | cần duyệt |

Quy tắc điền:
- Cột "Component/Token SDS": tên đúng như trong Figma; không chắc → `[UNVERIFIED]`; không có → `[NOT FOUND]`.
- Chỉ nâng lên `NEW` sau khi đã thử `REUSE`, `VARIANT-GAP`, `COMPOSE`. Ghi lý do đã loại các phương án trước ở phần đề xuất.

## 2. Thẻ đề xuất cho mỗi mục cần duyệt

```
[#4] Thẻ KPI có sparkline — NEW
- Vấn đề: SDS chưa có thẻ số liệu kèm xu hướng; đã thử Card + Text + Chart (COMPOSE) nhưng ...
- Đề xuất: component `kpi-card`, anatomy: label · value · delta (up/down) · sparkline
- Properties: variant(default|compact), delta(up|down|neutral|none) , loading(bool)
- Token dùng (đã có): surface/default, border/default, text/*, spacing/md, radius/md
- Token thiếu: không có / [liệt kê → xin duyệt]
- Phương án thay thế: dùng Card + text thường, không sparkline (đơn giản, kém trực quan)
- Khuyến nghị: dựng `kpi-card` (dùng ở 3 màn: Overview, Campaign, Report)
- Cần bạn quyết: duyệt / sửa / dùng phương án thay thế
```

## 3. Sau khi duyệt
- Ghi quyết định vào khung `Open Questions / Decisions` của board (ngày, nội dung).
- Dựng ở khung `Proposed` trước. Chỉ đưa lên khung chính/thư viện khi người dùng duyệt riêng.
- Mọi đề xuất token mới: tên theo `ds-conventions` (kebab-case, 3 tầng Base → Semantic → Component, trạng thái ở cuối: `rest, hover, pressed, focus, disabled, selected`; severity `info, success, warning, danger`), prefix CSS `--sa-`. Không tự thêm vào `rename-map.json` mức `approved`.

## 4. Khi nào đóng thành component
Đóng khi **một** trong các điều kiện: (a) dùng ≥2 chỗ, (b) có ≥2 trạng thái/biến thể, (c) người dùng yêu cầu, (d) Dev cần handoff độc lập. Không đóng khi: dùng một lần, thuần trang trí, hoặc thực chất là variant của component sẵn có (khi đó là VARIANT-GAP).

Component mới phải có: anatomy rõ, property đặt tên nhất quán (`type`, `size`, `state`, `icon`, `label`), tất cả trạng thái đã cam kết, token bind (không hard-code), mô tả ngắn + ghi chú cách dùng/không dùng, và responsive qua auto layout.
