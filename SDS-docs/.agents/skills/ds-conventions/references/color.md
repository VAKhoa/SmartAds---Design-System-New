# Color

## Base (đã quan sát trong Figma, node `55:251` "primitives-color")

Giá trị lấy trực tiếp từ Figma. Các thang màu khác (neutral, secondary, gray, green, blue, gradient) chưa có giá trị đầy đủ: `needs-value`, lấy sau khi dump.

### Primary (xanh lá)
| Step | Hex | Step | Hex |
|---|---|---|---|
| 50 | #e6f3ec | 500 | #048845 |
| 100 | #b1dac5 | 600 | #047c3f |
| 200 | #8cc8a9 | 700 | #036131 |
| 300 | #57af82 | 800 | #024b26 |
| 400 | #36a06a | 900 | #02391d |

### Red light
50 #fceceb · 100 #f6c3bf · 200 #f2a6a1 · 300 #ec7e76 · 400 #e9655b · 500 #e33e32 · 600 #cf382e · 700 #a12c24 · 800 #7d221c · 900 #5f1a15

### Red dark
50 #fbe8e9 · 100 #f3b8ba · 200 #ed9598 · 300 #e4656a · 400 #df474d · 500 #d71920 · 600 #c4171d · 700 #991217 · 800 #760e12 · 900 #5a0b0d

### Orange
50 #fff5e7 · 100 #ffdfb4 · 200 #ffd090 · 300 #ffba5d · 400 #ffad3d · 500 #ff980d · 600 #e88a0c · 700 #b56c09 · 800 #8c5407 · 900 #6b4005

### Đã thấy lẻ
`Neutral/200 #E5E5E5`, `Neutral/900 #171717`, `Generic/White #FFFFFF`, `text/secondary #7b7d80`, `Alias/Primary - On Theme #27272A`.

## Quy tắc đặt tên Base
- `color/<hue>/<step>`, step là `50, 100, 200 … 900` (thêm `950` nếu cần).
- Hue viết kebab-case: `primary`, `neutral`, `gray`, `green`, `blue`, `orange`, `red-light`, `red-dark`.
- "Secondary (option 1)" và "(option 2)" là hai phương án chưa chốt: không tạo token cho đến khi người dùng chọn (D3).
- `neutral` và `gray` đang tồn tại song song: cần xác nhận có phải cùng một thang hay không (D3).

## Semantic: bộ vai trò đề xuất (khung, chưa phải danh sách đã duyệt)

| Vai trò | Biến thể | Trạng thái |
|---|---|---|
| `surface/*` | `default, subtle, inverse, primary, info, success, warning, danger` | `rest, hover, pressed, focus, disabled` khi cần |
| `text/*` | `primary, secondary, tertiary, disabled, inverse, on-primary, link, info, success, warning, danger` | `hover, pressed` cho link |
| `border/*` | `default, subtle, strong, focus, info, success, warning, danger` | |
| `icon/*` | `default, secondary, disabled, inverse, on-primary, info, success, warning, danger` | |

Ghi chú: bộ này chỉ là bộ khung để đối chiếu khi dump xong; token Semantic thật lấy từ Figma. Token nào có trong Figma mà không có trong khung thì giữ, ghi chú vai trò.

## Light và Dark
- Semantic color có hai mode `Light` và `Dark` trong cùng một collection. Token Base không có mode.
- Component color dùng alias của Semantic; không đặt hex trực tiếp.
- Kiểm tra tương phản WCAG 2.2 AA: chữ thường ≥ 4,5:1, chữ lớn ≥ 3:1, icon và viền ≥ 3:1.
