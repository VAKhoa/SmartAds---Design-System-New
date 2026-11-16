# Typography

Giá trị đọc trực tiếp từ Figma ngày 14/11/2026 (collection `Text`, mode `Mode 1`, và 77 text style). Chi tiết: `docs/_audit/SDS-CONTEXT.md` §4.3, §5.

## Biến (`Text`)
- `typography/family/display` = `typography/family/text` = **Public Sans** (trùng giá trị).
- `typography/weight/{Regular, Medium, Semi, Bold}` (STRING; `Semi` ứng với font style SemiBold).
- `typography/size/*` (alias → Primitives `typography/text/*`):

| Tên | px | Tên | px | Tên | px |
|---|---:|---|---:|---|---:|
| `fs-sm` | 10 | `fs-2xl` | 14 | `fs-base 3` | 28 |
| `fs-md` | 11 | `fs-xs` | 16 | `fs-title` | 32 |
| `fs-lg` | 12 | `fs-xxl` | 18 | `fs-body` | 40 |
| `fs-xl` | 13 | `fs-base 1` | 20 | `fs-display 2` | 48 |
| | | `fs-base 2` | 24 | `fs-display` · `fs-hero` | 60 · 80 |

Tên **không đơn điệu** (`fs-xs` 16 > `fs-lg` 12; `fs-body` 40); `fs-base 2/3`, `fs-body`, `fs-display*`, `fs-hero` không được component nào dùng (D4).

## Text style (nhóm `Brand`) — 63/77 bind biến
Family Public Sans, letter-spacing 0. Line-height **120%** (Body-caption-sub 110%; `Display-xs/Bold` và `Body-xl/*` là **AUTO**).

`Display-2xl` 80 · `Display-xl` 60 · `Display-lg` 48 · `Display-md` 40 · `Display-sm` 32 · `Display-xs` 28 · `Body-xl` 24 · `Body-lg` 20 · `Body-md` 18 · `Body-sm` 16 · `Body-xs` 14 · `Microscope` 13 · `Body-caption` 12 · `Body-caption-sub` 11 · `Tini` 10; mỗi cỡ có `Bold, Semi, Medium, Regular`. Ngoài ra `Code/Regular` (DM Mono 12/140%, family không bind), `Ads/Merriweather/*` (10) và `Ads/Arial/*` (4) cho mockup quảng cáo, không bind biến.

Đang được component dùng nhiều nhất: `Body-xs/Regular` (14), `Body-xs/Medium`, `Body-caption/Regular` (12), `Microscope/*`, `Body-sm/Semi` (16 trên Button). Không dùng: toàn bộ `Display-2xl…Display-md`, `Display-xs`, `Body-xl/{Bold,Semi,Regular}`, `Code/Regular`, các biến thể `Balance`.

## Quy tắc đề xuất
1. Weight dùng tên đầy đủ: `regular, medium, semibold, bold`.
2. Text style: `<nhóm>/<vai-trò>/<độ-đậm>` chữ thường (`brand/body-lg/semibold`).
3. Cỡ chữ Base theo thang số px (`typography/size/14`) hoặc thang tăng dần — chọn một (D4).
4. Vai trò: `display`, `heading`, `body`, `caption`, `tiny`; không tạo vai trò Figma chưa có.
5. Mỗi text style bind đủ biến (family, size, weight); line-height không để AUTO.
6. Số liệu/KPI: chưa có style riêng (`tabular-nums`) — đề xuất trong `SDS-AUDIT.md` AT-06.

## Cần xác nhận
- "Tini" có phải "Tiny" không (D2).
- `Microscope` (13) nằm giữa `Body-xs` (14) và `Body-caption` (12): đặt tên lại theo thang (D4).
- Public Sans hỗ trợ tiếng Việt đầy đủ cho mọi weight đang dùng.
