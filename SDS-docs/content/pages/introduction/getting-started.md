---
title: Getting Started
description: Chọn điểm bắt đầu phù hợp với công việc của bạn trong đội ngũ SmartAds.
section: Introduction
updated: 04/11/2026
status: draft
sources:
  - label: Figma SmartAds Design System
    url: https://www.figma.com/design/cRZ5kIi4kD6j9lh1dbh5mh/SmartAds---Design-System
---

## Nếu bạn là designer

1. Mở file Figma SmartAds Design System từ liên kết trên header.
2. Kiểm tra variable, style và mode liên quan đến màn hình bạn đang thiết kế.
3. Ưu tiên những định nghĩa đã có. Ghi nhận trường hợp thiếu hoặc không rõ vai trò để review cùng đội ngũ.

## Nếu bạn là developer

1. Xác định màn hình và trạng thái cần triển khai trong Figma.
2. Đối chiếu tên và giá trị thiết kế với snapshot đang dùng cho dự án.
3. Làm rõ phần chưa có quy tắc trước khi biến nó thành một thành phần dùng chung.

Tiền tố CSS của SDS là `sa`. Website hiện có theme riêng phục vụ tài liệu; chưa có gói token hoặc component SDS để cài vào sản phẩm.

## Nếu bạn review sản phẩm

Kiểm tra nội dung, trạng thái và cách dùng thành phần có đúng với thiết kế đã duyệt hay chưa. Khi ghi nhận vấn đề, bổ sung tên màn hình, trạng thái, thiết bị và liên kết Figma để người thực hiện đối chiếu.

## Nếu bạn làm việc với AI

Cung cấp mục tiêu cụ thể, phạm vi cần thay đổi và nguồn thiết kế. Mở `SmartAds - SDS/` để Codex đọc quy tắc gốc; khi sửa UI website, yêu cầu đọc thêm `SDS-docs/content/rules/website-ui-rules.md`. Sau mỗi thay đổi trong folder, Codex cần rà các trang website có thể đã cũ, cập nhật trang liên quan rồi build lại. Đọc [AI Agents](/introduction/ai-agents/) để xem bảng chọn skill, prompt mẫu và quy trình đồng bộ.

Nếu tạo bài Foundation, Component hoặc Pattern, chọn mục sidebar trước rồi mở `SDS-docs/content/guides/content-guide.md` để lấy đúng tên file và frontmatter. Thêm bài dựa trên nguồn thật, build website; trang và link mở Markdown gốc sẽ xuất hiện tại route của mục đó.

## Đọc tiếp

- [FAQ](/introduction/faq/): các câu hỏi thường gặp về trạng thái hiện tại của SDS.
- [Glossary](/introduction/glossary/): giải thích các thuật ngữ xuất hiện trong tài liệu.
