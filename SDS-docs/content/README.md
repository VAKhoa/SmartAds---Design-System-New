# Bản đồ tài liệu Markdown của SDS

Đây là nơi quản lý nội dung Markdown của dự án. Hãy chọn thư mục theo việc cần làm:

| Thư mục | Chứa gì | Khi nào sửa |
| --- | --- | --- |
| [`rules/`](rules/) | `SDS-rules.md` cho toàn dự án; `website-ui-rules.md` cho giao diện website docs; `component-code-rules.md` cho component HTML/CSS/JS từ Figma. | Khi một quy tắc đã được xác nhận thay đổi. |
| [`guides/`](guides/) | `about-smartads.md` giới thiệu sản phẩm; `workspace-guide.md` hướng dẫn quy trình; `content-guide.md` ánh xạ menu với file bài. | Khi thông tin sản phẩm, cấu trúc hoặc cách vận hành thay đổi. |
| [`pages/`](pages/) | Bài viết hiển thị trên website: Overview, Introduction, Foundation, Components, Patterns. | Khi viết hoặc cập nhật một mục sidebar. |

**Ví dụ:** Colors nằm tại [`pages/foundation/sds-color.md`](pages/foundation/sds-color.md), Typography tại [`pages/foundation/typography.md`](pages/foundation/typography.md), Spacing tại [`pages/foundation/spacing.md`](pages/foundation/spacing.md), Logo tại [`pages/foundation/logo.md`](pages/foundation/logo.md) (draft). Để sửa hoặc tạo bài cho mục khác, đọc [`guides/content-guide.md`](guides/content-guide.md), dùng đúng file chính của mục sidebar, rồi chạy `npm run build` trong `SDS-docs/website/`.

`SmartAds - SDS/AGENTS.md` vẫn ở gốc vì Codex tự đọc file tên đó. `SDS-docs/README.md` và `SDS-docs/website/README.md` vẫn là điểm vào của từng thư mục. Các `SKILL.md` và tài liệu tham chiếu trong `.agents/skills/` phải ở cạnh skill tương ứng để công cụ tìm và dùng đúng. Đây là các vị trí có chủ đích, không phải bản sao nội dung trong `content/`.

Khi đổi một quy tắc, đường dẫn hoặc nội dung, rà các trang bị ảnh hưởng theo [`guides/workspace-guide.md`](guides/workspace-guide.md), cập nhật ngày `updated` của bài đã sửa, rồi build và kiểm tra route liên quan.
