---
title: Overview
description: Nền tảng thiết kế chung cho giao diện SmartAds. Kết nối thiết kế, phát triển và trải nghiệm sản phẩm qua cùng một hệ thống.
section: Introduction
updated: 12/11/2026
status: draft
sources:
  - label: SmartAds
    url: https://smartads.tech/
  - label: Figma SmartAds Design System
    url: https://www.figma.com/design/cRZ5kIi4kD6j9lh1dbh5mh/SmartAds---Design-System
---

<div class="sa-actions">
  <a class="sa-action sa-action-primary" href="/introduction/getting-started/">Bắt đầu với SDS <span data-icon="arrow" aria-hidden="true"></span></a>
  <a class="sa-action" href="https://www.figma.com/design/cRZ5kIi4kD6j9lh1dbh5mh/SmartAds---Design-System" target="_blank" rel="noopener noreferrer">Mở thư viện Figma <span data-icon="external" aria-hidden="true"></span><span class="sr-only"> (mở tab mới)</span></a>
</div>

## Một hệ thống cho đội ngũ SmartAds

SmartAds là nền tảng quảng cáo trực tuyến kết nối nhà quảng cáo với nhà xuất bản nội dung. **SmartAds Design System (SDS)** được xây dựng để đội ngũ sản phẩm dùng chung ngôn ngữ thiết kế khi tạo và phát triển giao diện của nền tảng.

Từ một màu thể hiện trạng thái đến cách trình bày một màn hình, SDS giúp designer, developer và người kiểm thử có cùng điểm tham chiếu.

<div class="sa-flow" aria-label="Quy trình từ thiết kế đến sản phẩm">
  <div><strong>Thiết kế trong Figma</strong><small>Variables, styles và các quyết định thiết kế.</small></div>
  <span data-icon="arrow" aria-hidden="true"></span>
  <div><strong>Tài liệu SDS</strong><small>Giải thích vai trò và cách sử dụng.</small></div>
  <span data-icon="arrow" aria-hidden="true"></span>
  <div><strong>Giao diện SmartAds</strong><small>Triển khai và đối chiếu với thiết kế.</small></div>
</div>

## Bắt đầu từ đây

<div class="sa-entry-grid">
  <a class="sa-entry" href="/introduction/design-system/"><strong>Hiểu về SDS</strong><span>Design system là gì, dành cho ai và gồm những phần nào?</span></a>
  <a class="sa-entry" href="/introduction/getting-started/"><strong>Dùng SDS trong công việc</strong><span>Điểm bắt đầu cho designer, developer và người review.</span></a>
  <a class="sa-entry" href="/introduction/principles/"><strong>Nguyên tắc thiết kế</strong><span>Những định hướng đang được đề xuất cho giao diện SmartAds.</span></a>
  <a class="sa-entry" href="/introduction/ai-agents/"><strong>Làm việc cùng Codex</strong><span>Chọn quy tắc, skill và kiểm tra tài liệu sau khi dự án thay đổi.</span></a>
</div>

## Phạm vi hiện tại

Website hiện có **7 trang Introduction** để tìm hiểu SDS, trang [Resource / Figma file](/resource/figma/) để mở file thiết kế và bốn bài [Colors](/foundation/colors/), [Typography](/foundation/typography/), [Spacing](/foundation/spacing/) và [Logo](/foundation/logo/) trong Foundation. Logo là bản nháp với 177 biến thể SVG xuất từ Figma và bản PNG render tương ứng; nguồn tài khoản chưa xác minh được qua `whoami`. Foundation, Components và Patterns có 20 mục trong sidebar, gồm Layout và Logo; 16 mục còn lại đang chờ bài Markdown. `Introduction / Overview` ở trang chủ giữ vai trò giới thiệu chung; không còn `Foundation / Overview`. Mỗi mục có đường dẫn file chính cố định để bổ sung dần, còn route chưa có bài vẫn để trống.

Bản chụp Figma ngày 02/11/2026 ghi nhận 690 local variables thuộc 6 collections cùng 132 local styles. Dữ liệu này là cơ sở để tiếp tục kiểm kê và xây tài liệu; chưa phải một thư viện code đã phát hành.

> Nội dung Introduction đang ở trạng thái bản nháp để chủ dự án review. Tên viết tắt là **SDS**; tiền tố CSS đã được thống nhất là **`sa`**.
