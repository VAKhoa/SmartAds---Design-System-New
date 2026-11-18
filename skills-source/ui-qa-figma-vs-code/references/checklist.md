# Checklist thuộc tính, luật đúng/sai và mức độ

Đọc file này ở Bước 4–5. Mỗi dòng checklist là một (hoặc vài) `prop` trong file pairs (xem `pairs-schema.md`).

## Mục lục
1. Checklist theo nhóm
2. Ánh xạ Figma → CSS (chỗ hay so nhầm)
3. Luật đúng/sai
4. Mức độ nghiêm trọng
5. Phân tích token (Bước 5)
6. Lỗi phía Figma → góp ý Designer

## 1. Checklist theo nhóm

| Nhóm | Thuộc tính (`prop`) | Ghi chú |
|---|---|---|
| Color | `color` (text), `background-color`, `border-color` (từng cạnh nếu khác), `fill`/`stroke`/`color` của icon SVG | So hex chuẩn hoá **và** tên token. Hex đúng nhưng hard-code vẫn là lỗi token. |
| Typography | `font-family`, `font-size`, `font-weight`, `line-height`, `letter-spacing`, `text-align`, (`text-transform` nếu Figma đặt) | Figma dùng text style `Brand/<Role>-<size>/<Weight>` → tra bằng `token-index.mjs style "<tên>"`. |
| Spacing | `padding-top/right/bottom/left`, `margin-*` (khoảng cách giữa khối ngoài auto-layout), `gap` / `row-gap` / `column-gap`, `flex-direction` | Figma không có margin: khoảng cách giữa các con = `itemSpacing` của cha → code có thể dùng `gap` **hoặc** margin; so **khoảng cách thực** (đo bằng rect) rồi mới xét cách viết. |
| Size | `width`, `height`, `min-*`, `max-*`, `aspect-ratio` | Figma HUG/FILL ≠ px cố định: HUG → so kích thước render; FILL → kiểm tra code co giãn (`flex:1`/`width:100%`), không so số tuyệt đối khi viewport khác. |
| Border | `border-width` (từng cạnh), `border-style`, `border-color`, `border-*-radius` (từng góc) | Figma stroke INSIDE = CSS border với `box-sizing:border-box`. OUTSIDE/CENTER → có thể là `outline` hoặc `box-shadow 0 0 0 Npx` — ghi rõ cách quy đổi. Effect style `Border/*` của SDS là viền dạng effect. |
| Effect | `box-shadow` (x, y, blur, spread, màu từng lớp), `opacity`, `filter: blur()`, `backdrop-filter` | Figma radius = CSS blur. Effect style `Shadow/elevation-light/*`, `Focus/ring-*`. |
| Layout | `display`, `flex-direction`, `justify-content`, `align-items`, `flex-wrap`, thứ tự con (`child-order`), `overflow`, `z-index`, `position` | Sai hướng/căn chỉnh/thứ tự = sai layout (Critical). |
| Icon/Image | `icon` / `asset` (đúng tên/asset), kích thước, màu | Icon sản phẩm SDS: MingCute SVG inline, màu qua `currentColor`. Logo/asset lấy từ Figma. |
| States | mỗi state có trong Figma variant (`State=Hover/Focus/Press/Disable/Error…`): lặp lại các prop thay đổi, đặt `state` | Figma có variant mà code không có rule → `prop: "state"`, `code: "missing"` (Critical). |
| Responsive | các breakpoint có frame trong Figma | So từng breakpoint như một screen riêng (viewport khác). SDS Viewport: Desktop 1280/1366/1440/1536/1920 · Mobile-Tablet 390/428/843/1024 (chưa qua gate). |

Chỉ so những gì Figma **có định nghĩa**. Thuộc tính Figma không đặt (vd không có shadow) mà code có → vẫn ghi (code thừa), mức theo bảng §4.

## 2. Ánh xạ Figma → CSS (chỗ hay so nhầm)

| Figma | CSS | Bẫy |
|---|---|---|
| Auto layout HORIZONTAL / VERTICAL | `flex-direction: row / column` | Dev dùng `display:block` + margin vẫn có thể đúng hình; ghi chú cách viết, so khoảng cách thực. |
| `primaryAxisAlignItems` MIN/CENTER/MAX/SPACE_BETWEEN | `justify-content` flex-start/center/flex-end/space-between | `start` ≡ `flex-start`. |
| `counterAxisAlignItems` | `align-items` | Mặc định CSS `stretch` ≠ Figma MIN. |
| `itemSpacing` | `gap` | SPACE_BETWEEN → gap "auto", không so số. |
| Line height % | `line-height` px = size × % / 100 | `normal` trong CSS ≈ 1.2 tuỳ font → ghi Không xác định nếu code để `normal`. |
| Letter spacing % | `letter-spacing` px = size × % / 100 | `normal` = 0. |
| Font style "SemiBold"/"Semi" | `font-weight: 600` | So số, không so chuỗi. |
| Fill có `opacity` riêng | màu `rgba` | Nhân alpha màu × opacity paint trước khi so. Opacity của **layer** là `opacity`, khác alpha màu. |
| Text fill | `color` | Không phải `background-color`. |
| Vector/icon fill | `fill`/`stroke`/`color` (currentColor) | So màu render cuối cùng. |
| Drop shadow radius | blur | Thứ tự lớp: Figma liệt kê dưới→trên có thể ngược CSS; so theo cặp khớp nhất trước khi kết luận. |

## 3. Luật đúng/sai

- **Kích thước / spacing / radius / border-width / font-size / line-height / letter-spacing:** |Δ| = 0 → Pass · |Δ| ≤ 1px → Ghi chú (không tính lỗi) · 2–4px → Minor · > 4px → Major.
- **Màu:** khớp tuyệt đối sau chuẩn hoá `#rrggbb[aa]` (chữ thường, alpha ff bỏ). Lệch 1 đơn vị hex vẫn là lỗi.
- **font-weight, font-family:** khớp tuyệt đối (so số weight; so family đầu tiên, bỏ nháy, không phân biệt hoa thường). Fallback stack khác không sao nếu family đầu đúng.
- **Tên class khác nhưng giá trị đúng → Pass**, nhưng vẫn liệt kê dòng đó và ghi "class khác" ở `classNote` của component. Đánh giá chỉ số, không đánh giá tên class.
- `compare.mjs` áp tất cả luật trên; đừng tự tính lại bằng tay.

## 4. Mức độ nghiêm trọng

| Mức | Khi nào |
|---|---|
| 🔴 Critical | Sai màu thương hiệu (`color/primary/*`, hoặc màu Figma bind tới token primary) · sai layout (hướng, căn chỉnh, thứ tự) · thiếu element · thiếu state có trong Figma |
| 🟠 Major | Sai spacing/size/typography > 4px · sai font-weight/family · sai màu không phải thương hiệu · hard-code giá trị thay vì token · dùng biến ngoài SDS (`--bs-*`, biến tự đặt) · token không tồn tại · thiếu/thừa toàn bộ shadow |
| 🟡 Minor | Lệch 2–4px · shadow lệch nhẹ (số/màu từng lớp) · radius lệch nhẹ · dùng token SDS khác nhưng cùng giá trị (sai ngữ nghĩa) · z-index |
| 📝 Ghi chú | Lệch ≤ 1px · cách viết khác nhưng kết quả đúng (margin thay gap, class khác) |

Mức của một dòng = mức cao nhất giữa *lệch giá trị* và *lỗi token*.

## 5. Phân tích token (Bước 5)

Với mỗi thuộc tính, `codeAuthored` (giá trị dev viết trong CSS, giữ nguyên `var()`) quyết định cột "Token đúng?":

| Dev viết | Figma bind token | Kết luận |
|---|---|---|
| `var(--sa-<đúng token>)` | có | ✅ đúng token |
| `var(--sa-<token khác>)`, cùng giá trị | có | ⚠ sai ngữ nghĩa (Minor) — vd dùng `--sa-border-primary` cho nền thay vì `--sa-surface-primary` |
| `var(--sa-<token khác>)`, khác giá trị | có | ❌ sai token (Major) |
| `var(--sa-…)` không có trong SDS | có | ❌ biến không tồn tại (Major) — dev tự đặt tên |
| `var(--bs-primary)`, `var(--my-green)`… | có | ❌ biến ngoài SDS (Major) — map Bootstrap/biến riêng về `--sa-*` |
| `#048845`, `12px`, `rgb(…)` | có | ❌ hard-code (Major), kể cả khi giá trị đúng |
| bất kỳ | **không** (Figma để giá trị trần) | ⚠ Figma chưa bind → góp ý Designer, không trừ Dev |

Tên CSS đúng = `--sa-` + slug(tên Figma) theo `SDS-docs/scripts/css-name.mjs` (vd `surface/primary-hover` → `--sa-surface-primary-hover`). Không tự nghĩ tên khác.

Thư viện (Bootstrap, chart lib): được phép trong code dev, nhưng giá trị nhìn thấy phải bám token SDS. Cách khuyến nghị: override biến thư viện bằng biến SDS (`--bs-primary: var(--sa-surface-primary)`), chart nhận màu đọc từ `getComputedStyle(root).getPropertyValue('--sa-…')`. Màu chart không có token (SDS chưa có palette series `[NOT FOUND]`) → ghi Không xác định + góp ý Designer, không phạt Dev.

## 6. Lỗi phía Figma → góp ý Designer

Figma là gốc, nhưng vẫn phải kiểm tra gốc có chuẩn design system không. Ghi vào mục "Góp ý cho Product Designer", **không** tính vào lỗi Dev:
- Giá trị trần không bind variable/style (fill, spacing, radius, text không dùng `Brand/*`).
- Bind token gate **E** (`token-index.mjs name <tên>` → `gate E: orphan|naming|value-named|duplicate|a11y…`) hoặc token `DEPRECATED`.
- Variable remote/stale (id không có trong snapshot → `[remote/stale …]`).
- Giá trị lệch thang (vd spacing 13px, radius 5px — không có trong `spacing/*`, `radius/*`).
- Component/state thiếu variant, lẫn lộn giữa các instance cùng loại (2 card cùng loại nhưng padding khác).
- Contrast < 4.5 cho text (gate lý do `a11y`).
Mỗi góp ý: node/layer, vấn đề, token/style đề xuất (chỉ token đã qua gate A/B). Không sửa Figma.
