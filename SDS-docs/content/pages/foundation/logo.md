---
title: Logo
description: Danh mục tài sản SmartAds, Publisher, Partnership và Third Party với bản xem trước và tải SVG/PNG.
section: Foundation
updated: 12/11/2026
status: draft
sources:
  - label: SmartAds Design System — Logo, node 123:153
    url: https://www.figma.com/design/cRZ5kIi4kD6j9lh1dbh5mh/SmartAds---Design-System?node-id=123-153&m=dev
  - label: SmartAds Design System — logo đầy đủ, node 123:497
    url: https://www.figma.com/design/cRZ5kIi4kD6j9lh1dbh5mh/SmartAds---Design-System?node-id=123-497&m=dev
  - label: SmartAds Design System — Publisher vnEGO, node 2391:619
    url: https://www.figma.com/design/cRZ5kIi4kD6j9lh1dbh5mh/SmartAds---Design-System?node-id=2391-619&m=dev
---

## Tổng quan

Trang này liệt kê **177 biến thể** từ node Logo `123:153` của file SmartAds Design System. Các nhóm nguồn trong Figma gồm **SmartAds & FPT (12)**, **Publisher (24)**, **Partnership (32)**, **Third Party (6)**, **Third Party / Social (33)**, **Third Party / AI (67)** và **Third Party / Contact (3)**. Tên nhóm nguồn trong catalog giữ theo bản xuất; Social, AI và Contact là các phân nhóm của Third Party trong dữ liệu đang có. Ba bản từng mang tên `Publisher=Default*` hiện được đối chiếu với node Publisher `2391:619` và hiển thị là **vnEgo · Brand / Gray / White**.

Các tài sản trong catalog có file **SVG** từ Figma Local và file **PNG 4×** được render từ SVG tương ứng. PNG là bản chuyển đổi có canvas trong suốt, không phải file PNG gốc tách riêng trong Figma. Ba SVG vnEgo lấy trực tiếp từ vector bên trong các node `11112:362370`, `11112:362369`, `11112:362368`; 174 SVG còn lại tách từ bản xuất tổng. Hai file `smartads-full-light.svg` và `smartads-full-light.png` ở phần đầu là bản xuất trực tiếp từ node `123:497`. Nguồn máy đọc của danh mục là `website/public/brand/logo-library/manifest.json`.

## Bản logo SmartAds đầy đủ

Bản xuất trực tiếp từ node `123:497` có kích thước **295 × 90**. Thẻ dưới hiển thị chính file SVG tải xuống; đây là bản đầy đủ **để đối chiếu Figma**, có nền tím nhạt opaque của node, không phải logo tách nền dùng cho sản phẩm. Bản xuất giữ nền của node Figma, nên không thay bằng ảnh ghép hoặc tự đổi màu nền.

## Danh mục biến thể

Lọc theo nhóm Figma hoặc tìm tên biến thể để đối chiếu và tải từng file. Trên mỗi thẻ, `sourceGroupId` là tên nhóm/variant từ bản xuất; `parentGroupId` giúp truy ngược nhóm cha. Kích thước ghi dưới tên là kích thước nội tại của file SVG; riêng vnEgo còn ghi frame component Figma **140 × 48 px**. Mọi logo được **xếp vào cùng vùng xem trước 140 × 48 px** bằng `object-fit: contain`; thao tác này không sửa tỷ lệ của file tải xuống. SVG giữ vector để phóng lớn mà không mất nét; PNG là ảnh raster 4×.

Tag **Light** hoặc **Dark** chỉ nền xem trước được đánh giá phù hợp hơn bằng phép đo tương phản: ít nhất 70% pixel logo có alpha từ 0,7 phải đạt tỷ lệ 3:1 trên nền trắng hoặc `#1f1f22`. Bản đạt cả hai được gắn cả hai tag; bản chưa đạt trên cả hai nền hiển thị nền ưu tiên kèm **Cần rà soát**. Đây là phép đo hỗ trợ đọc tài liệu, **không phải quy tắc sử dụng thương hiệu đã duyệt trong Figma**. Kết quả hiện tại: 59 Light, 82 Dark, 26 cả hai và 10 cần rà soát.

<!-- smartads-logo-assets -->

## Nguồn và giới hạn

- Mọi thẻ catalog dẫn đến file thật dưới `website/public/brand/logo-library/`. Tải SVG giữ vector; tải PNG lấy bản render 4× từ SVG. Bản full-light riêng là export trực tiếp từ Figma và có nền tím nhạt của node.
- Danh mục lấy từ node `123:153` và giữ tên nhóm, variant, ID nguồn trong `manifest.json`. Không suy ra clearspace, kích thước tối thiểu, quy tắc đổi màu hoặc quyền dùng thương hiệu của Publisher/Partner từ tên file.
- Tỷ lệ `width`/`height` của SVG tách từ bảng tổng nay trùng với tỷ lệ `viewBox`; không còn làm tròn hai chiều độc lập. Đã đối chiếu trực tiếp kích thước frame của ba bản vnEgo; frame riêng của 174 bản còn lại chưa thể xác minh qua công cụ đang được cấp, nên kích thước file của chúng chỉ phản ánh bản xuất tổng.
- Trạng thái vẫn là **draft** vì công cụ `whoami` chưa xác minh được email account Figma Local trong phiên hiện tại. Khi xác minh `info@smartads.tech`, kiểm tra lại các node/asset hiện hành trước khi nâng trạng thái tài liệu.
