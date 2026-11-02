# Quy tắc đặt tên token (chi tiết)

## 1. Cấu trúc tên theo tầng

| Tầng | Mẫu | Ví dụ |
|---|---|---|
| Base color | `color/<hue>/<step>` | `color/primary/500`, `color/red-light/500` |
| Base dimension | `dimension/<n>` | `dimension/4`, `dimension/16` (giá trị px, nếu bạn chọn thang số – xem D7) |
| Base typography | `typography/<family|size|weight|line-height>/<tên>` | `typography/family/display`, `typography/weight/semibold` |
| Semantic color | `<vai-trò>/<biến-thể>[/<trạng-thái>]` | `surface/default`, `text/secondary`, `border/focus` |
| Semantic dimension | `spacing/<size>`, `radius/<size>` | `spacing/md`, `radius/sm` |
| Component | `component/<tên>/<thuộc-tính>/<biến-thể>/<trạng-thái>` | `component/button/surface/primary/hover` |
| Text style | `<nhóm>/<vai-trò>/<độ-đậm>` | `brand/body-lg/semibold` |
| Effect style | `shadow/<loại>/<mức>` | `shadow/elevation/300` |

`<vai-trò>` thuộc: `surface, text, border, icon`.
`<thuộc-tính>` của component thuộc: `surface, text, border, icon`.

## 2. Ký tự hợp lệ

`a-z`, `0-9`, `-` trong từng đoạn; `/` giữa các đoạn. Cấm: khoảng trắng, chữ hoa, `( )`, `_`, `.` , dấu tiếng Việt.

| Sai | Đúng |
|---|---|
| `color/red light/500` | `color/red-light/500` |
| `fs-display 2` | `fs-display-2` (hoặc theo D4) |
| `component/toast alert/surface-rest` | `component/toast-alert/surface/default/rest` |
| `spacing/1 (1px)` | `spacing/1` hoặc `dimension/1` |

## 3. Trạng thái và mức độ

- Trạng thái luôn là đoạn cuối: `…/rest`, `…/hover`, `…/pressed`, `…/focus`, `…/disabled`, `…/selected`.
- Mức độ nằm trước trạng thái: `component/button/surface/danger/hover`.
- Mức nhấn: `default` (nhấn bình thường) và `subtle` (nhẹ). Không dùng `sub`, `muted` song song với `subtle`.

## 4. Bảng đổi tên quan sát được trong file Figma hiện tại

Trạng thái `proposed` nghĩa là chưa duyệt. Bản đầy đủ nằm ở `tokens/rename-map.json`.

| Tên hiện tại | Đề xuất | Lý do |
|---|---|---|
| `color/red light/*` | `color/red-light/*` | khoảng trắng |
| `color/red dark/*` | `color/red-dark/*` | khoảng trắng |
| `typography/size/fs-display 2` | `typography/size/fs-display-2` | khoảng trắng |
| `typography/size/fs-xs` (16) và `fs-lg` (12) | cần dump giá trị rồi gán lại thang | tên ngược nghĩa (D4) |
| `spacing/xxs` | `spacing/2xs` | thang chuẩn |
| `component/button/border/secondary/sub` | `component/button/border/secondary/subtle` | thống nhất `subtle` |
| `component/button/border/primary/select` | `component/button/border/primary/selected` | từ vựng trạng thái |
| `component/badge/info/surface-rest` | `component/badge/surface/info/rest` | đưa thuộc tính lên trước, trạng thái xuống cuối |
| `component/toast alert/surface-rest` | `component/toast-alert/surface/default/rest` | khoảng trắng + cấu trúc |
| `component/button/split button/surface-hover` | `component/button/surface/split-button/hover` | khoảng trắng + cấu trúc (split button là biến thể của button) |
| `Alias/Primary - On Theme` | chờ xác nhận ý nghĩa (D3) | tên không theo vai trò |
| `Brand/Tini/*` | `brand/tiny/*` (nếu "Tini" là "Tiny") | chính tả (D2) |
| `Brand/*/Semi` | `brand/*/semibold` | tên đầy đủ của weight |

## 5. Ánh xạ sang CSS (khi build)

`{prefix}` từ `ds.config.json`. Quy tắc: thêm `--{prefix}-`, đổi `/` thành `-`, giữ chữ thường.

| Figma | CSS |
|---|---|
| `surface/default` | `--sa-surface-default` |
| `spacing/md` | `--sa-spacing-md` |
| `brand/body-lg/semibold` | class `.sa-text-brand-body-lg-semibold`, biến `--sa-font-brand-body-lg-semibold` |
| `shadow/elevation/300` | `--sa-shadow-elevation-300` |
