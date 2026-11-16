# Effects (shadow, focus, border)

Đọc trực tiếp từ Figma ngày 14/11/2026: 43 effect style. Phạm vi sản phẩm: Light (`Shadow/elevation-dark/*` — 7 style — nằm ngoài phạm vi, vẫn còn trong Figma).

## Elevation (`Shadow/elevation-light/<mức>`, 2-layer drop shadow, chưa bind variable)

| Mức | Công dụng (mô tả Figma) | Dùng bởi component |
|---|---|---|
| 100 | Card tĩnh, widget dashboard | có (2) |
| 200 | Bento/widget dashboard (tối đa nâng lên 300) | có |
| 300 | Hover, press, card bấm được, alert | có |
| 400 | Dropdown, menu | có (nhiều nhất) |
| 500 | (chưa có mô tả) | có |
| 600 | Modal, dialog, snackbar | có |
| 700 | Phần tử đang kéo | không |

## Semantic
- `Shadow/semantic/element/floating-tooltip` (Tooltip & Popover) — đang dùng.
- `…/navigation-sticky-right` (Sticky sidebar menu) — đang dùng; `…/navigation-sticky-bottom` — không dùng.
- `…/pannel-left`, `…/pannel-right` (Modal/dialog/snackbar; tên sai chính tả "pannel").
- `Shadow/semantic/edge/{top,left,right}-sm` — `top-sm` đang dùng.
- `Shadow/semantic/element/tab-header-top` — không dùng.

## Focus
- `Focus/ring-{primary-xs, primary-lg, gray-lg, gray-sm, info-sm, sucess-sm, danger-sm, danger-lg}` — 4 style bind variable (`info-sm`, `sucess-sm`, `danger-sm`, `danger-lg`).
- `Focus/ringShadow-{primary-lg, secondaryLight-lg, info-lg, warning-lg, danger-lg, gray-lg, link}`.
- Button dùng thêm variable `component/button/border/focus/focus` (#8cc8a9). Ba cơ chế focus song song: cần chọn một (`SDS-AUDIT.md` TK/A11Y-03; ring #8cc8a9 trên trắng chỉ 1.92:1).

## Border
`Border/primary-line/border-width-{1-70%, 2-10%, 4-10%, 4-15%}`, `Border/warning-line/border-width-2-10%` — độ dày và opacity nằm trong tên; bind variable màu.

## Quy tắc đề xuất
1. Tên: `shadow/elevation/<mức>`, `shadow/edge/<hướng>-<size>`; không tách `light/dark` trong tên khi có dark mode (hiện không áp dụng).
2. Mức elevation theo vai trò ghi trong mô tả; bổ sung mô tả cho 500 (và 400/600 nếu chưa đủ).
3. Bind màu/offset vào variable (hiện 34/43 effect style hard-code).
4. Border-width nên là variable số; focus ring dùng một cơ chế duy nhất.
5. Thư viện cũ `Shadow/Shadow-default/Shadow-x1…x8` vẫn còn được bind ở vài component (remote) — không dùng cho thiết kế mới.
