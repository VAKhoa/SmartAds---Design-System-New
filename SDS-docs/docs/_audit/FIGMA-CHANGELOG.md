# Nhật ký thay đổi Figma (SmartAds Design System)

> File `cRZ5kIi4kD6j9lh1dbh5mh`. Mỗi lần Figma thay đổi (do AI được cho phép, hoặc do người dùng tự làm) ghi một mục ở đây, mới nhất ở trên. Mọi AI đọc file này **trước khi** dùng số liệu trong `SDS-CONTEXT`, `SDS-AUDIT`, `SDS-RECONCILIATION` (các báo cáo đó ghi ngày 14/11/2026 và chỉ được vá phần đầu).

## Trạng thái hiện tại (đọc lại Figma 16/11/2026, tài khoản `info@smartads.tech`)
| Collection | Số variable |
|---|---|
| Primitives | 226 (161 COLOR, 63 FLOAT, 2 BOOLEAN) |
| Spacing | 98 |
| Alias | 293 |
| Text | 21 |
| Viewport Desktop | 19 |
| Viewport Mobile Tablet | 3 |
| **Tổng** | **660** |

Họ màu gốc còn lại: `base` 3 · `primary` 10 · `neutral` 13 · `secondary dark` 9 (DEPRECATED) · `green` 10 · `green light` 3 · `red light` 10 · `yellow` 10 · `blue` 10 · `brand` 8 · `semantic tokens` 6 · `opacity` 69.

Gate (tính lại bằng `node scripts/build-tokens.mjs`): **A 17 · B 219 · E 424**. Token không dùng: 309 (`UNUSED-TOKENS.md`).

## Việc còn treo trong Figma
| Việc | Chi tiết | Cần ai |
|---|---|---|
| 3 alias mode Dark đang treo (ĐÃ QUYẾT: để nguyên) | `border/primary-press` → `color/secondary light/50` (đã xóa) · `component/button/border/danger/default` → `color/red dark/500` (đã xóa) · `component/button/border/danger/subtle` → `color/red dark/100` (đã xóa). Mode Light của ba token này không bị ảnh hưởng. | **Đã quyết 16/11/2026: để nguyên** (Dark ngoài phạm vi, D9/D12). Không sửa; nếu sau này mở lại Dark thì trỏ lại như mode Light (`color/primary/50`, `color/red light/500`, `color/red light/100`) |
| 9 token `color/secondary dark/*` DEPRECATED | 10, 30, 50, 100, 200, 300, 400, 600, 700; 0 tham chiếu, 0 chỗ bind | Người dùng cho phép xóa |
| Màu hard-code | Khoảng 1.080 fill/stroke dùng hex xám không gắn variable (`#e8e8e8` 688) | Nhiệm vụ CP-07 |
| D4, D12 | Thang cỡ chữ số px; ẩn mode Dark — đã chốt, chưa làm | Người dùng cho phép từng hành động |

## 16/11/2026 — Người dùng xóa ba họ màu không dùng
- **Ai làm:** người dùng, trực tiếp trong Figma.
- **Thay đổi:** xóa 30 primitive: `color/secondary light/{50…900}` (10), `color/red dark/{50…900}` (10), `color/orange/{50…900}` (10). Primitives 256 → 226; tổng 690 → 660.
- **Kiểm (AI đọc lại, chỉ đọc):** số variable theo collection khớp; không còn họ nào trong ba họ trên. Phát hiện 3 alias mode Dark treo (bảng trên). Chưa quét lại chỗ bind trực tiếp vào 30 token này trên các trang; trước khi xóa, `usage.json` (14/11, 45 trang component, chuỗi alias mode Light) ghi cả 30 token không được component nào dùng; các trang Application UI chưa được quét cho 30 token này.
- **Repo đã cập nhật:** `variable-figma-export/` (xóa 30 mục, đánh dấu 3 alias `deleted`), `overview.json`, `usage.json`, `rename-map.json` (3 mục liên quan → `rejected`), trang Colors, `ColorShowcase.js`, `color.md`, `naming.md`, test.

## 16/11/2026 — Gộp màu xám thành `color/neutral` (D3)
- **Ai làm:** AI (Claude Code), người dùng duyệt từng lựa chọn.
- **Thay đổi:** đổi tên 13 primitive thành `color/neutral/{50,100,200,300,350,400,500,600,650,700,800,900,950}` (ID giữ nguyên); chuyển 17 tham chiếu alias (10 Light, 7 Dark) từ 9 token `color/secondary dark` sang neutral; gắn lại 1 fill ở trang Pricing; ghi description `DEPRECATED` cho 9 token. Không xóa, không đổi giá trị primitive.
- **Kiểm:** 140 tham chiếu đều trỏ vào `color/neutral/*`; 759 chỗ bind trực tiếp trên 106 trang còn nguyên; 0 chỗ còn trỏ vào 9 token bị gộp.
- **Chi tiết đầy đủ và cách hoàn tác:** `NEUTRAL-MERGE.md`.

## 14/11/2026 — Mốc đối chiếu
- Đọc toàn bộ variables/styles, khớp 100% với bản chụp 02/11/2026 (690 variable, 132 style). Quét usage 45 trang component → `usage.json`. Không thay đổi gì trong Figma.
