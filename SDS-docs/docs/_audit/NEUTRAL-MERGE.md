# Gộp màu xám thành `color/neutral` · đã áp dụng 16/11/2026

> Figma `cRZ5kIi4kD6j9lh1dbh5mh`, tài khoản `info@smartads.tech`. Người dùng duyệt ngày 16/11/2026 (quyết định D3). File này ghi lại **đúng những gì đã thay đổi** và kết quả kiểm. Không có token nào bị xóa; không có giá trị màu nào của primitive bị sửa.

## 1. Thang sau khi gộp (13 bậc)
22 màu xám của `color/gray` (10) và `color/secondary dark` (12) còn 13 bậc. ID variable giữ nguyên, chỉ đổi tên.

| Tên mới | Giá trị | Tên cũ | Variable ID | Tương phản trên trắng |
|---|---|---|---|---|
| `color/neutral/50` | `#fcfcfd` | `color/gray/50` | `VariableID:12:191` | 1.03 |
| `color/neutral/100` | `#f7f7f8` | `color/gray/100` | `VariableID:12:316` | 1.07 |
| `color/neutral/200` | `#f0f2f4` | `color/gray/200` | `VariableID:12:317` | 1.12 |
| `color/neutral/300` | `#eaecf0` | `color/gray/300` | `VariableID:12:318` | 1.18 |
| `color/neutral/350` | `#e5e9ed` | `color/gray/400` | `VariableID:12:319` | 1.22 |
| `color/neutral/400` | `#dfe3e8` | `color/gray/500` | `VariableID:12:322` | 1.29 |
| `color/neutral/500` | `#cbcfd3` | `color/gray/600` | `VariableID:12:321` | 1.57 |
| `color/neutral/600` | `#9ea1a5` | `color/gray/700` | `VariableID:12:320` | 2.59 |
| `color/neutral/650` | `#8c8c8c` | `color/secondary dark/500` | `VariableID:10:28` | 3.36 |
| `color/neutral/700` | `#7b7d80` | `color/gray/800` | `VariableID:12:315` | 4.13 |
| `color/neutral/800` | `#5e5f61` | `color/gray/900` | `VariableID:12:323` | 6.39 |
| `color/neutral/900` | `#3c3c3c` | `color/secondary dark/800` | `VariableID:12:158` | 11.03 |
| `color/neutral/950` | `#1f1f1f` | `color/secondary dark/900` | `VariableID:12:159` | 16.48 |

Lựa chọn của người dùng: giữ `#e5e9ed` thành bậc riêng (`350`), giữ `#8c8c8c` thành bậc riêng (`650`), giữ sắc xanh lạnh nhẹ ở 50–800, tên bậc trong dải 50…950, chuyển cả mode Dark. Lưu ý: tên bậc **không** trùng số cũ (ví dụ `gray/500` nay là `neutral/400`).

## 2. Token bị gộp (đánh dấu `DEPRECATED`, chưa xóa)
Description của 9 token này trong Figma: `DEPRECATED 2026-11-16: dùng color/neutral/<bậc>. Không dùng token này cho thiết kế mới.` Tên và giá trị giữ nguyên.

| Token | Giá trị | Thay bằng | Giá trị thay | ΔE (OKLab×100) |
|---|---|---|---|---|
| `color/secondary dark/10` | `#fdfdfd` | `neutral/50` | `#fcfcfd` | 0.3 |
| `color/secondary dark/30` | `#f4f6f5` | `neutral/100` | `#f7f7f8` | 0.6 |
| `color/secondary dark/50` | `#f0f0f0` | `neutral/200` | `#f0f2f4` | 0.6 |
| `color/secondary dark/100` | `#e8e8e8` | `neutral/300` | `#eaecf0` | 1.3 |
| `color/secondary dark/200` | `#e1e1e1` | `neutral/400` | `#dfe3e8` | 0.9 |
| `color/secondary dark/300` | `#cecece` | `neutral/500` | `#cbcfd3` | 0.7 |
| `color/secondary dark/400` | `#bbbbbb` | `neutral/500` | `#cbcfd3` | 6.1 (không có chỗ dùng) |
| `color/secondary dark/600` | `#828282` | `neutral/700` | `#7b7d80` | 1.8 (không có chỗ dùng) |
| `color/secondary dark/700` | `#636363` | `neutral/800` | `#5e5f61` | 1.5 |

ΔE dưới 1: mắt không thấy; 1–2: gần như không thấy.

## 3. Tham chiếu của token ngữ nghĩa đã chuyển (17, collection `Alias`)
Đây là toàn bộ chỗ giá trị hiển thị có thay đổi.

| Token ngữ nghĩa | Mode | Trước | Sau | Màu trước → sau |
|---|---|---|---|---|
| `border/secondary-hover` | Light | `secondary dark/700` | `neutral/800` | `#636363` → `#5e5f61` |
| `border/secondary-hover` | Dark | `secondary dark/300` | `neutral/500` | `#cecece` → `#cbcfd3` |
| `text/disable` | Light | `secondary dark/300` | `neutral/500` | `#cecece` → `#cbcfd3` |
| `border/secondary-muted` | Light | `secondary dark/100` | `neutral/300` | `#e8e8e8` → `#eaecf0` |
| `border/secondary-muted` | Dark | `secondary dark/700` | `neutral/800` | `#636363` → `#5e5f61` |
| `border/secondary-disable` | Light | `secondary dark/200` | `neutral/400` | `#e1e1e1` → `#dfe3e8` |
| `background/secondary` | Light | `secondary dark/50` | `neutral/200` | `#f0f0f0` → `#f0f2f4` |
| `background/secondary-inverse` | Dark | `secondary dark/50` | `neutral/200` | `#f0f0f0` → `#f0f2f4` |
| `surface/gray-disable` | Light | `secondary dark/100` | `neutral/300` | `#e8e8e8` → `#eaecf0` |
| `component/icon/common/on-white` | Light, Dark | `secondary dark/50` | `neutral/200` | `#f0f0f0` → `#f0f2f4` |
| `component/button/surface/integrity/tertiary-fg` | Light, Dark | `secondary dark/10` | `neutral/50` | `#fdfdfd` → `#fcfcfd` |
| `component/toast alert/icon-close` | Light, Dark | `secondary dark/700` | `neutral/800` | `#636363` → `#5e5f61` |
| `component/tooltip/text-sub` | Light, Dark | `secondary dark/300` | `neutral/500` | `#cecece` → `#cbcfd3` |

123 tham chiếu còn lại trỏ vào token được giữ: chỉ đổi tên hiển thị, màu không đổi.

## 4. Chỗ bind trực tiếp đã gắn lại (1)
| Trang | Node | Thuộc tính | Trước | Sau |
|---|---|---|---|---|
| `↳ ❖ Pricing (Process)` | `15651:226615` "Transitions — Refine demo" (FRAME) | fill | `secondary dark/10` | `neutral/50` |

## 5. Kết quả kiểm sau khi sửa (đọc lại từ Figma)
| Kiểm | Trước | Sau |
|---|---|---|
| Tham chiếu alias vào 22 màu | 140 | 140, tất cả trỏ vào `color/neutral/*` |
| Tham chiếu alias vào 9 token bị gộp | 17 | **0** |
| Chỗ bind trực tiếp (fill, stroke, effect, màu theo đoạn chữ) trên 106 trang, vào token giữ lại | 758 | 759 (thêm 1 chỗ ở Pricing) |
| Chỗ bind trực tiếp vào 9 token bị gộp | 1 | **0** |
| Style (paint, effect, text) bind vào 22 màu | 0 | 0 |
| Giá trị của 22 primitive | — | không đổi |

Số bind theo từng token sau khi sửa: `neutral/600` 495 · `neutral/800` 82 · `neutral/350` 64 · `neutral/100` 51 · `neutral/200` 39 · `neutral/500` 8 · `neutral/300` 6 · `neutral/400` 6 · `neutral/50` 4 · `neutral/950` 4.

Giới hạn của lần kiểm: chưa so ảnh chụp trước/sau; kết luận "không đổi giao diện" dựa trên số liệu binding và ΔE ở §2–§3. Lần quét không đọc được file khác đang dùng thư viện này (nếu có file sản phẩm bind vào 9 token deprecated thì token vẫn còn nên không vỡ).

## 6. Chưa xử lý (ngoài phạm vi lần này)
- **Màu hard-code** trùng mã hex xám nhưng không gắn variable, khoảng 1.080 chỗ: `#e8e8e8` 688 (Page Shopping Ads 270, Native Article Ads 171, File Illustrator 105, Modals Creative Type 93, Create Campaign 39), `#dfe3e8` 184, `#1f1f1f` 116, `#7b7d80` 22, `#e1e1e1` 19, `#cbcfd3` 15. `#e8e8e8` và `#e1e1e1` nay không còn là bậc của thang. Thuộc nhiệm vụ CP-07.
- **Xóa hẳn** 9 token deprecated: chờ người dùng xác nhận.
- `color/opacity/gray/*`: không đụng. (`color/secondary light`, `color/red dark`, `color/orange` do người dùng xóa sau đó, xem `FIGMA-CHANGELOG.md`.)
- Contrast: `neutral/600`, `/650`, `/700` chưa đạt AA 4.5 cho chữ trên trắng (A11Y-01).
- Tên token ngữ nghĩa còn chữ `gray`/`secondary` (`border/gray`, `text/secondary-black (main)`…): thuộc TK-03.

## 7. Hoàn tác
Đổi lại tên theo cột "Tên cũ" ở §1, trỏ lại 17 tham chiếu theo cột "Trước" ở §3, gắn lại node ở §4, xóa description ở §2. Các ID không đổi nên hoàn tác không mất binding.

## 8. Repo đã đồng bộ
`variable-figma-export/` (tên, tham chiếu, giá trị giải alias, `usage.json`), `tokens/rename-map.json` (13 mục `approved`, đã áp dụng), `website/scripts/theme-tokens.mjs`, CSS website (`--sa-color-neutral-400|700|950`), `ColorShowcase.js`, trang Colors, `SDS-CONTEXT/AUDIT/RECONCILIATION`, `open-decisions.md`, `color.md`, `AGENTS.md`.
