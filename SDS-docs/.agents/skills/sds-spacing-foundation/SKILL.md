---
name: sds-spacing-foundation
description: Viết, rà soát và triển khai tài liệu Foundation / Spacing của SmartAds SDS từ Figma snapshot có ID; dùng khi task liên quan thang spacing, hiển thị px/rem hoặc trang Spacing của website.
---

# SDS Spacing Foundation

Áp dụng cho `SDS-docs/content/pages/foundation/spacing.md` và, sau khi nội dung được duyệt, route `/foundation/spacing/` trong website SDS. Skill này hướng dẫn nguồn và cách bàn giao; không biến đề xuất thành token đã phát hành.

## Nguồn và quyết định

1. Đọc `SmartAds - SDS/AGENTS.md`, `SDS-docs/content/rules/SDS-rules.md`, `SDS-docs/content/guides/content-guide.md`, `SDS-docs/ds.config.json`, skill `ds-conventions` và `references/spacing-radius.md` của nó.
2. Lấy tên, ID, mode, alias và giá trị từ `SDS-docs/variable-figma-export/variables.spacing.json`. Ghi ngày của snapshot. Nếu task đòi hiện trạng hoặc mapping mới, đối chiếu đúng file Figma được giao theo `AGENTS.md`; chỉ đọc qua app desktop `info@smartads.tech` ở Dev Mode. Không dùng Figma file khác hay sửa Figma.
3. Phân biệt **Figma observed**, **quy ước đã duyệt cho website docs**, **CSS website đã sinh** và **CSS product đã phát hành**. `--sa-space-*` numeric đã được duyệt cho trang Spacing của website docs, chưa phải package sản phẩm. `spacing/lg (Base)` và `spacing/lg` là hai ID và hai giá trị khác nhau. Không sửa `tokens/rename-map.json` hoặc nguồn Figma chỉ vì tài liệu nêu phương án.
4. Với mọi giá trị kích thước hiển thị trên trang Spacing, hiện `px` cùng `rem` quy đổi trên cơ sở 16px (1rem); công thức `rem = px / 16`. Không tạo input/calculator. Nguồn Figma có giá trị ngoài bước ưu tiên 4px (0.25rem), nên không tự làm tròn hay loại bỏ.

## Viết tài liệu và triển khai

- File Markdown chính là `SDS-docs/content/pages/foundation/spacing.md`; frontmatter theo `content-guide.md`. Trang đã được duyệt để build ở trạng thái `beta`; dữ liệu từ snapshot vẫn cần đối chiếu lại trước khi khẳng định hiện trạng Figma. Ghi rõ ví dụ minh họa chưa phải UI Figma được xác nhận. Khi chưa có bằng chứng component binding, dùng “đề xuất” hoặc “chưa xác minh”.
- Nếu người dùng yêu cầu duyệt bản nháp trước, chỉ hoàn thiện `.md` và skill; chờ phản hồi rồi mới sửa website. `Spacing` đã nằm trong `plannedNavigation`, nên không tự thêm mục sidebar thứ hai.
- Sau phê duyệt build, đọc `SDS-docs/content/rules/website-ui-rules.md` và skill `sds-fe-website-builder` ở gốc repo. Giữ Next.js, React JavaScript, CSS thuần, Public Sans, token màu website đã có, light/dark và responsive. Đặt component tái sử dụng cho giá trị spacing, nút copy dùng bàn phím/touch và `aria-live`; chỉ báo “Copied!” sau khi Clipboard API thành công. Không sửa output sinh tự động.
- Với code tabs và bảng, cho copy `var(--sa-space-*)` của website docs; đừng gọi đây là package token sản phẩm. Responsive bảng dùng cuộn ngang khi cần. Overlay đo khoảng cách không được thay layout hay chặn thao tác.
- Sau thay đổi website, chạy build, kiểm tra route, file Markdown gốc, light/dark, mobile, tương tác copy và overlay. Rà nội dung `content/pages/` và `website/README.md` theo bảng tác động trong `workspace-guide.md`, cập nhật các phát biểu đã cũ.
