---
name: ds-conventions
description: Quy ước đặt tên và cấu trúc token của SmartAds Design System (SDS). Đọc skill này trước khi đặt tên hoặc sửa token, viết tài liệu foundation, hay kiểm tra quy tắc Base/Semantic/Component.
---

# ds-conventions

Quy ước đề xuất cho tên token và cấu trúc của dự án. Đọc cùng snapshot Figma mới nhất; các giá trị và tên quan sát trong references là mẫu ban đầu, không đại diện toàn bộ file hiện tại. Mục chờ người dùng chốt nằm ở `references/open-decisions.md`.

## Tóm tắt 8 quy tắc

1. **Ba tầng token** (alias một chiều: Component → Semantic → Base):
   - Base: giá trị gốc (`color/primary/500`, `typography/size/...`). Không dùng trực tiếp trong giao diện.
   - Semantic: theo vai trò (`surface/*`, `text/*`, `border/*`, `icon/*`, `spacing/*`, `radius/*`). Đổi theo Light/Dark.
   - Component: riêng một component (`component/button/surface/primary/rest`). Không mượn của component khác.
2. **kebab-case, chữ thường, không khoảng trắng, không ngoặc, không dấu.** Dùng `/` để phân cấp trong Figma.
3. **Thang kích thước tăng dần theo tên**: `3xs, 2xs, xs, sm, md, lg, xl, 2xl, 3xl…`. Không dùng `xxs`, `xxl`. Tên nhỏ hơn thì giá trị nhỏ hơn.
4. **Trạng thái ở cuối tên**, từ vựng cố định: `rest, hover, pressed, focus, disabled, selected`.
5. **Mức độ (severity)** dùng: `info, success, warning, danger`. Mức nhấn dùng: `default, subtle`.
6. **Tên CSS** = `--{prefix}-` + đường dẫn đổi `/` thành `-`. Ví dụ `surface/default` → `--sa-surface-default`. Prefix đọc từ `ds.config.json`.
7. **Một tên một nghĩa**: không có hai token cùng nghĩa khác tên (`sub` và `subtle`), không có hai thư viện chuẩn song song.
8. **Giá trị chỉ lấy từ Figma**; thiếu thì ghi `needs-value`, không suy đoán.

## Đọc tiếp theo nhu cầu

| Việc | Đọc |
|---|---|
| Quy tắc đặt tên chi tiết, ví dụ đúng/sai, bảng đổi tên từ file Figma hiện tại | `references/naming.md` |
| Thang màu, màu ngữ nghĩa, trạng thái | `references/color.md` |
| Spacing và radius | `references/spacing-radius.md` |
| Font, cỡ chữ, text style | `references/typography.md` |
| Shadow, elevation | `references/effects.md` |
| Các quyết định D1–D8 (D1 đã chốt) | `references/open-decisions.md` |

## Quy trình khi gặp tên mới

1. Xác định tầng (Base, Semantic hay Component).
2. Áp dụng quy tắc 2–5.
3. Nếu trái với một mục đã có trong `tokens/rename-map.json`, theo rename-map.
4. Chưa chắc → ghi vào `tokens/rename-map.json` với `status: proposed` và hỏi người dùng. Không tự quyết.
