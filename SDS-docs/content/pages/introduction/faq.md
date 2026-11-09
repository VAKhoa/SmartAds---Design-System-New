---
title: FAQ
description: Những câu hỏi thường gặp khi bắt đầu sử dụng tài liệu SmartAds Design System.
section: Introduction
updated: 09/11/2026
status: draft
sources:
  - label: SmartAds
    url: https://smartads.tech/
  - label: Figma SmartAds Design System
    url: https://www.figma.com/design/cRZ5kIi4kD6j9lh1dbh5mh/SmartAds---Design-System
---

## SmartAds và SDS có quan hệ như thế nào?

SmartAds là nền tảng quảng cáo. SDS là hệ thống thiết kế được xây dựng để đội ngũ tạo và duy trì giao diện cho nền tảng đó.

## Website này đã có thư viện component chưa?

Chưa có thư viện component code dành cho sản phẩm. Website hiện có 7 trang Introduction, trang Resource / Figma, [Colors](/foundation/colors/), [Typography](/foundation/typography/) và [Spacing](/foundation/spacing/) trong Foundation; 17 mục Foundation, Components, Patterns còn lại đang chờ bài. `Foundation / Overview` đã được bỏ; trang chủ [Overview](/) tiếp tục giới thiệu SDS.

## Thêm bài cho một mục sidebar như thế nào?

Tra `SDS-docs/content/guides/content-guide.md` để biết file chính của từng mục. **Colors** dùng `content/pages/foundation/sds-color.md`; **Typography** dùng `content/pages/foundation/typography.md`; **Spacing** dùng `content/pages/foundation/spacing.md`. Mỗi bài có link mở Markdown gốc. Mục chưa có bài tiếp tục để trống.

## Tra giá trị thiết kế ở đâu?

Mở mục [Resource / Figma file](/resource/figma/) để vào các file thiết kế SmartAds. Trong bộ mã nguồn SDS, `variable-figma-export/` lưu bản chụp variables và styles để đối chiếu; bản chụp không tự cập nhật mỗi khi Figma thay đổi.

## Tên viết tắt và tiền tố CSS là gì?

Tên viết tắt là **SDS**. Tiền tố CSS đã được chọn là **`sa`**; biến CSS mang dạng `--sa-…`.

## Bản nháp có nghĩa là gì?

Nội dung đang được biên tập và cần review. Một trang có thể mô tả dữ liệu đã đọc được, đồng thời chứa hướng dẫn đề xuất. Chỉ coi phần đã được duyệt là quy tắc chính thức.

## Khi Figma và tài liệu khác nhau thì làm gì?

Ghi lại liên kết Figma, tên variable hoặc thành phần, mode và điểm khác biệt. Đối chiếu ngày cập nhật rồi review cùng người phụ trách trước khi sửa.

## Có cần gọi nhiều agent để sử dụng SDS không?

Bạn có thể giao việc cho một Codex chính với phạm vi cụ thể, hoặc giao phần FE website cho chat SDS — FE Website Builder. Skill được chọn theo loại task; xem [AI Agents](/introduction/ai-agents/) và `SDS-docs/content/guides/workspace-guide.md` để biết cách dùng.

## Khi quy tắc hoặc file trong dự án thay đổi, website docs có tự cập nhật không?

Không. Build chỉ sinh lại trang từ Markdown đang có. Codex phải kiểm tra những trang bị ảnh hưởng, sửa nội dung, ví dụ và prompt đã cũ, rồi build và xem route liên quan. Khi sửa UI website, đọc `.agents/skills/sds-fe-website-builder/SKILL.md` ở gốc repo và `SDS-docs/content/rules/website-ui-rules.md`; file thứ hai là quy tắc website. Xem quy trình và bảng tác động trên trang [AI Agents](/introduction/ai-agents/).
