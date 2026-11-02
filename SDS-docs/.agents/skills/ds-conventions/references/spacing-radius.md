# Spacing và Radius

## Hiện trạng trong Figma (collection `Spacing`, thư viện "SmartAds - Design System")

- `spacing/xxs, xs, sm, md, lg, xl, 2xl, 4xl` (và có thể `3xl`): chưa có giá trị trong tay, `needs-value`.
- `radius/xs, sm, md, lg, xl, 3xl, 4xl, 5xl, 6xl, 7xl` (có thể thiếu `2xl`): chưa có giá trị.
- Mô tả có sẵn trong Figma cho radius:
  - `radius/xs`: checkbox, tag nhỏ
  - `radius/sm`: input, button nhỏ
  - `radius/md`: card, modal mặc định

Thư viện cũ ("SmartAds - Design System 2") dùng thang số: `spacing/1 (1px)`, `spacing/2 (2px)`, `spacing/5 (5px)`, `radius/0 (0px)`, `radius/4 (4px)`, `radius/6 (6px)`. Đây là Base dạng số; thuộc quyết định D5/D7.

## Quy tắc đề xuất

1. Hai tầng:
   - Base `dimension/<n>` (n = px, chỉ khi bạn chọn thang số – D7).
   - Semantic `spacing/<size>`, `radius/<size>` alias về Base.
2. Thang tăng dần: `3xs, 2xs, xs, sm, md, lg, xl, 2xl, 3xl, 4xl…`. Đổi `xxs` → `2xs`.
3. Tách hai collection: `Spacing` chỉ chứa `spacing/*`; `Radius` chứa `radius/*`. (Hiện đang chung một collection; đề xuất tách, D6.)
4. Radius có thêm `radius/full` (bo tròn hẳn) nếu có trong thiết kế; giá trị lấy từ Figma.
5. Kích thước component (button 32/40/48…) là `dimension` hoặc token Component, không đặt vào `spacing`.
6. Mỗi radius và spacing nên có mô tả công dụng (như `radius/md` hiện có) để Docs Writer dùng.

## Việc cần dump
Giá trị px của từng token, scope hiện tại (đang `ALL_SCOPES`, nên thu hẹp: spacing → `GAP`, `WIDTH_HEIGHT`; radius → `CORNER_RADIUS`).
