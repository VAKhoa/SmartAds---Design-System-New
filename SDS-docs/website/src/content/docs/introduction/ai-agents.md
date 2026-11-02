---
title: AI Agents
description: Cách cung cấp ngữ cảnh SmartAds cho Codex để hỗ trợ thiết kế, viết tài liệu và phát triển giao diện.
section: Introduction
updated: 02/11/2026
status: draft
sources:
  - label: Figma SmartAds Design System
    url: https://www.figma.com/design/cRZ5kIi4kD6j9lh1dbh5mh/SmartAds---Design-System
---

## Làm việc cùng Codex

Dự án SDS hiện sử dụng **Codex**. Khi làm việc trong bộ mã nguồn SDS, mở thư mục `SDS-docs` để agent có thể đọc `AGENTS.md`, cấu hình và hướng dẫn của dự án.

Giao việc theo kết quả cần đạt: trang nào cần xây, phần nào được thay đổi và nguồn nào cần đối chiếu. Bạn có thể bắt đầu với một Codex chính; dự án chưa có custom agent riêng.

## Ngữ cảnh cần cung cấp

| Thông tin | Ví dụ |
| --- | --- |
| Mục tiêu | Viết phần hướng dẫn bắt đầu cho designer. |
| Phạm vi | Chỉ cập nhật trang Getting Started. |
| Nguồn | Tài liệu SmartAds và file Figma SDS. |
| Điều kiện hoàn thành | Nội dung đúng nguồn, liên kết hoạt động, ghi rõ điểm còn chờ duyệt. |

## Hai skill hiện có

- **`ds-conventions`:** hỗ trợ đối chiếu quy ước đặt tên và cấu trúc token. Phân biệt quy ước đề xuất với quyết định đã được duyệt.
- **`figma-token-workflow`:** hỗ trợ đọc, đồng bộ và kiểm kê dữ liệu Figma; quản lý đề xuất thay đổi.

Các skill này nằm trong bộ mã nguồn SDS. Chúng không tự được cài vào một dự án khác khi bạn truy cập website này.

## Ví dụ giao việc

```text
Đọc AGENTS.md và introduction/about-smartads.md.
Cập nhật trang Getting Started để designer mới hiểu cách bắt đầu với SDS.
Đối chiếu với Figma SmartAds đã cung cấp.
Ghi rõ thông tin chưa được duyệt và kiểm tra các liên kết sau khi sửa.
```

## Review kết quả của agent

Kiểm tra agent có dùng đúng nguồn SmartAds, giữ tên viết tắt SDS và phân biệt dữ liệu thực tế với đề xuất hay không. Với thay đổi thiết kế, đối chiếu tên, giá trị và mode trong Figma trước khi duyệt.
