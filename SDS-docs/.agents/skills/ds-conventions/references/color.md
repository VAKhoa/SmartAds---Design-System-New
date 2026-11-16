# Color

Giá trị dưới đây đọc trực tiếp từ Figma ngày 14/11/2026 (khớp snapshot 02/11 trong `variable-figma-export/`). Phạm vi: **Light mode** (dark mode của sản phẩm đã loại, 14/11/2026). Bảng đầy đủ kèm trạng thái qua gate: `docs/_audit/SDS-CONTEXT.md` §4; dữ liệu máy đọc: `tokens/generated/tokens.json` (`node scripts/build-tokens.mjs`).

## Base (collection `Primitives `, mode `Value`) — tên hiện tại trong Figma

| Thang | Bậc 50 → 900 (hex) |
|---|---|
| `color/primary` | e6f3ec · b1dac5 · 8cc8a9 · 57af82 · 36a06a · **048845** · 047c3f · 036131 · 024b26 · 02391d |
| `color/neutral` | 50 fcfcfd · 100 f7f7f8 · 200 f0f2f4 · 300 eaecf0 · 350 e5e9ed · 400 dfe3e8 · 500 cbcfd3 · 600 9ea1a5 · 650 8c8c8c · 700 7b7d80 · 800 5e5f61 · 900 3c3c3c · 950 1f1f1f (gộp từ gray + secondary dark, 16/11/2026) |
| `color/green` | ecffea · bae0b7 · 99d194 · 6bbb63 · 4eae45 · **229a16** · 1f8c14 · 186d10 · 13550c · 0e4109 |
| `color/blue` | eceffe · c3cffa · a6b7f8 · 7d96f5 · 6482f3 · **3d63f0** · 385ada · 2b46aa · 223684 · 1a2a65 |
| `color/yellow` | fff7e8 · fde6b6 · fdd993 · fcc862 · fbbd43 · **faad14** · e49d12 · b27b0e · 8a5f0b · 694908 |
| `color/red light` | fceceb · f6c3bf · f2a6a1 · ec7e76 · e9655b · **e33e32** · cf382e · a12c24 · 7d221c · 5f1a15 |
| `color/secondary dark` (DEPRECATED, 9 token, không còn tham chiếu) | 10 fdfdfd · 30 f4f6f5 · 50 f0f0f0 · 100 e8e8e8 · 200 e1e1e1 · 300 cecece · 400 bbbbbb · 600 828282 · 700 636363 |
| `color/base` | black 000000 · white ffffff · black-weak 3c4043 |

`color/opacity/<hue>/<α>` (hex + alpha) cho primary, gray, red, yellow, blue, green, black, white; 69 token, 33 chưa được dùng.

Trạng thái (16/11/2026): `color/orange`, `color/secondary light`, `color/red dark` **đã bị xóa khỏi Figma** (không tạo lại, không tham chiếu). `color/semantic tokens/*` không được component nào dùng → ứng viên deprecated. Danh sách token không dùng: `docs/_audit/UNUSED-TOKENS.md`.

## Quy tắc đặt tên Base
- `color/<hue>/<step>`, step là `50, 100, 200 … 900`.
- Hue viết kebab-case: `primary`, `neutral`, `green`, `blue`, `yellow`, `red-light` (hiện Figma còn khoảng trắng — các mục đổi tên đang `proposed` trong `tokens/rename-map.json`).
- Thang trung tính duy nhất là `color/neutral` (D3, 16/11/2026). Không dùng `color/secondary dark/*` còn lại (deprecated) và không tạo lại `color/gray`.
- Token tầng Base không mang nghĩa semantic: `color/semantic tokens/color-ai-*` nên thành `color/ai/*`.

## Semantic (`Alias`, mode Light)
Vai trò đang có trong Figma: `background/*`, `text/*`, `surface/*`, `border/*`, `foreground/*`, `overlay/*`, `chart/heatmap-level-*`, và token component `component/*` (147 token, cùng collection).

Bộ vai trò đề xuất (khung; chưa duyệt):

| Vai trò | Biến thể | Trạng thái |
|---|---|---|
| `surface/*` | `default, subtle, inverse, primary, info, success, warning, danger` | `rest, hover, pressed, focus, disabled` khi cần |
| `text/*` | `primary, secondary, tertiary, disabled, inverse, on-primary, link, info, success, warning, danger` | `hover, pressed` cho link |
| `border/*` | `default, subtle, strong, focus, info, success, warning, danger` | |
| `icon/*` | `default, secondary, disabled, inverse, on-primary, info, success, warning, danger` | |

Vấn đề hiện tại (xem `SDS-AUDIT.md` TK-03): không có `text/primary` (chữ body là `text/secondary-black (main)`); nhiều token đặt theo giá trị (`text/primary-white`, `surface/neutral-white`, `border/gray-stronger`); `surface/primary-default` thực chất là gray/100.

## Tương phản (WCAG 2.2 AA: chữ thường ≥ 4,5:1, chữ lớn ≥ 3:1, icon/viền ≥ 3:1) — đo trên nền trắng
Không đạt: `text/secondary` 4.13 · `text/gray-on-surface` 4.13 · `text/link` 3.48 · `text/success` 3.68 · `text/danger` 4.20 · `text/warning` 1.90 · `text/gray` 2.59 · `text/on-primary-white` trên primary 4.44. `node scripts/build-tokens.mjs` gắn `a11y:<tỉ lệ>` vào `gateReasons`.

## Light / Dark
- Dark mode sản phẩm **ngoài phạm vi** (quyết định 14/11/2026); `ds.config.json` `themes: ["light"]`. Mode `Accessible (Dark Mode)` vẫn còn trong Figma; chỉ theme dark của **website docs** dùng nó.
- Component color dùng alias của Semantic; không đặt hex trực tiếp.
