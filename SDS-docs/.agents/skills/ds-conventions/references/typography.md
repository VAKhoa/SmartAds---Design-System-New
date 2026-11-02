# Typography

## Đã quan sát

- Font family (Base): `typography/family/display` = **Public Sans**.
- Font weight (Base): `Regular`, `Semi`, `Bold` (text style còn thấy `Medium`).
- Cỡ chữ (Base) đã thấy trong một mẫu:

| Tên hiện tại | Giá trị |
|---|---|
| `fs-lg` | 12 |
| `fs-xs` | 16 |
| `fs-base 1` | 20 |
| `fs-display 2` | 48 |

Tên đang **ngược chiều** (`fs-xs` lớn hơn `fs-lg`), cần dump đầy đủ rồi gán lại (D4).

- Text style (nhóm `Brand`): `Brand/Display-lg/Bold`, `Brand/Body-{xl,lg,md,sm,xs}/{Regular,Semi,Bold}`, `Brand/Body-caption/Regular`, `Brand/Tini/{Regular,Medium,Semi,Bold}`.
- Line-height mẫu: 1.2 ở các style đã thấy (kể cả cỡ 12 và 16). Cần xác nhận với từng style, đặc biệt đoạn văn dài (D8).

## Quy tắc đề xuất

1. Weight dùng tên đầy đủ: `regular, medium, semibold, bold`.
2. Text style: `<nhóm>/<vai-trò>/<độ-đậm>` chữ thường. Ví dụ `brand/body-lg/semibold`.
3. Cỡ chữ Base: `typography/size/<tên>` theo thang tăng dần, hoặc thang số (px) – chọn một (D4).
4. Vai trò: `display` (tiêu đề lớn), `heading`, `body`, `caption`, `tiny`. Không tạo vai trò nếu Figma chưa có.
5. Mỗi text style bind biến (family, size, weight, line-height), không gán cứng.
6. Docs liệt kê text style theo vai trò, kèm mẫu "Aa" và cỡ/line-height lấy từ dữ liệu.

## Cần xác nhận
- "Tini" có phải "Tiny" không (D2).
- Font cho số liệu và code (mono) có dùng không.
- Có hỗ trợ tiếng Việt đầy đủ trong Public Sans cho mọi weight đang dùng.
