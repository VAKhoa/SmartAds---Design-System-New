# Spacing và Radius

Giá trị đọc trực tiếp từ Figma ngày 14/11/2026 (collection `Spacing`, mode `sm`; alias tới Primitives `space/*`). Chi tiết: `docs/_audit/SDS-CONTEXT.md` §4.4.

## Giá trị hiện tại (px)

- `spacing/*`: `none` 0 · `hairline` 1 · `xxs` 2 · `xs` 4 · `xs-plus` 6 · `odd-7` 7 · `sm` 8 · `sm-plus` 10 · `md` 12 · `md-plus` 14 · `lg (Base)` 16 · `xl` 20 · `2xl` 24 · `3xl` 32 · `4xl` 40 · `5xl` 48 · `6xl` 56 · `7xl` 64 · `8xl` 80 · **`lg` 18** (trùng gốc với `lg (Base)`).
- `radius/*`: `none` 0 · `xs` 2 · `sm` 4 · `sm-plus` 6 · `md` 8 · `md-plus` 10 · `lg` 12 · `lg-plus` 14 · `xl` 16 · `xl-plus` 20 · `2xl` 24 · `3xl` 28 · `4xl` 32 · `5xl` 40 · `6xl` 48 · `7xl` 56 · `full` 999.
- `icon/size` 16 · `icon/stroke` 1.4 · `icon/radius` 2 (không component nào dùng bản local).
- `component/table/cell/padding/x-default` 12 · `y-default` 8 · `cell/gap/content` 8.
- Bước ưu tiên 4px; ngoại lệ 1, 6, 7, 10, 14, 18.
- Mô tả có sẵn trong Figma cho radius: `xs` checkbox/tag nhỏ · `sm` input/button nhỏ · `md` card/modal mặc định.

## Trạng thái dùng (quét 14/11/2026)
Đang được component dùng: `spacing/{none,hairline,xxs,xs,xs-plus,odd-7,sm,sm-plus,md,md-plus,lg (Base),lg,xl,2xl,4xl,5xl}`, `radius/{none,xs,sm,sm-plus,md,md-plus,lg,lg-plus,full}`. Chưa dùng: `spacing/{3xl,6xl,7xl,8xl}`, `radius/{xl…7xl}`. Trong cùng collection còn `screen/*` (42) và `typography/text/*` (13): trùng Primitives, không dùng (`rename-map.json`: đề xuất xóa).

Thư viện cũ ("Design System 2") dùng thang số (`margin/4`, `padding/8`, `radius/4 (4px)`…): **vẫn đang được bind** trong nhiều component nhưng không còn trong collection local (xem `SDS-AUDIT.md` TK-01).

## Quy tắc đề xuất

1. Hai tầng: Base (`space/<px>` hoặc `dimension/<n>` nếu chọn thang số, D7) và Semantic `spacing/<size>`, `radius/<size>` alias về Base.
2. Thang tăng dần: `3xs, 2xs, xs, sm, md, lg, xl, 2xl, 3xl…`. Đổi `xxs` → `2xs`. `spacing/lg` (18) → `lg-plus` **trước**, rồi `lg (Base)` → `lg`.
3. Tách hai collection: `Spacing` chỉ chứa `spacing/*`; `Radius` chứa `radius/*` (D6).
4. `radius/full` giữ nếu có trong thiết kế (hiện 999).
5. Kích thước component (button 32/40/48…) là token Component hoặc `dimension`, không đặt vào `spacing`.
6. Thu hẹp scope (hiện `ALL_SCOPES` ở mọi variable): spacing → `GAP`, `WIDTH_HEIGHT`; radius → `CORNER_RADIUS`.
7. Mỗi radius/spacing nên có mô tả công dụng (hiện chỉ 6/98 có).
8. Tên CSS: `--sa-spacing-md`, `--sa-radius-md` (quy tắc slug trong `scripts/css-name.mjs`). `--sa-space-*` numeric trong CSS website là alias riêng của trang docs.
