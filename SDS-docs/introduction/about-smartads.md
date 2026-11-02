---
title: SmartAds và SmartAds Design System
section: Introduction
updated: 02/11/2026
status: in-review
---

# SmartAds và SmartAds Design System (SDS)

SmartAds là nền tảng quảng cáo trực tuyến phục vụ nhà quảng cáo và nhà xuất bản nội dung. **SmartAds Design System (SDS)** là hệ thống thiết kế đang được xây để những người thiết kế, phát triển và kiểm tra giao diện SmartAds dùng chung một nguồn quy tắc. Trang này giới thiệu hai khái niệm đó và phạm vi hiện tại của SDS.

> **Trạng thái:** Phần mô tả sản phẩm được tổng hợp từ website SmartAds công khai. Mục tiêu và phạm vi SDS dựa trên file Figma cùng kế hoạch của dự án này; phần đó đang chờ chủ dự án duyệt.

## SmartAds làm gì?

Theo [website SmartAds](https://smartads.tech/), SmartAds kết hợp xây dựng thương hiệu với tối ưu hiệu quả quảng cáo. Nền tảng sử dụng phân tích nội dung và ngữ cảnh để lựa chọn đối tượng, thông điệp, định dạng và vị trí hiển thị quảng cáo phù hợp. Website mô tả quảng cáo native dạng hình ảnh hoặc video được đặt trong dòng đọc của bài viết; việc lựa chọn vị trí cần cân bằng hiệu quả quảng cáo với trải nghiệm người đọc.

Hai phía sử dụng sản phẩm có nhu cầu khác nhau:

| Nhóm | Việc họ làm với SmartAds | Điều giao diện cần giúp họ làm rõ |
| --- | --- | --- |
| **Advertiser** (nhà quảng cáo) | Tạo chiến dịch, chọn mục tiêu và đối tượng, thiết lập ngân sách, thêm nội dung quảng cáo, theo dõi kết quả. | Hiểu từng bước tạo chiến dịch, biết chi phí và trạng thái, xem trước quảng cáo, đọc báo cáo. |
| **Publisher** (nhà xuất bản) | Quản lý vị trí và định dạng quảng cáo trên sản phẩm nội dung, tối ưu giá trị inventory. | Kiểm soát cách quảng cáo xuất hiện và theo dõi tác động tới doanh thu, trải nghiệm đọc. |
| **Reader** (người đọc) | Tiếp xúc với quảng cáo khi xem nội dung của publisher; họ không phải người quản trị nền tảng. | Nhận diện quảng cáo và tiếp tục đọc nội dung một cách thuận tiện. |

Các mô tả về luồng Advertiser và Publisher dựa trên [trang Advertiser](https://smartads.tech/solution/advertiser) và [trang Publisher](https://smartads.tech/solution/publisher). Website cũng giới thiệu nhắm chọn theo ngữ cảnh, hành vi và retargeting; đây là khả năng của nền tảng, không phải quy tắc thiết kế của SDS.

## SDS là gì và giải quyết vấn đề nào?

SDS là **nguồn tham chiếu thiết kế chung cho giao diện SmartAds**. Nó kết nối quyết định trong Figma với cách designer thiết kế, developer triển khai, người kiểm thử đánh giá và AI agent tạo giao diện. Mục tiêu là để cùng một vai trò, trạng thái và giá trị thiết kế được hiểu thống nhất ở các nơi đó.

SDS dự kiến có bốn lớp:

1. **Foundations:** màu, typography, spacing, radius, elevation, layout và các nguyên tắc sử dụng.
2. **Design tokens:** variable và style từ Figma, phân biệt giá trị gốc, vai trò semantic và token riêng của component; có giá trị theo mode khi Figma định nghĩa.
3. **Components:** mô tả mục đích, biến thể, trạng thái, hành vi, accessibility và cách triển khai của những component được chọn để phát hành.
4. **Tài liệu cho người và máy:** website hướng dẫn, dữ liệu JSON/CSS, Markdown cho AI agent và bản phát hành có phiên bản khi hệ thống đủ điều kiện.

Đây là **định hướng xây SDS**, không phải danh sách tính năng đã hoàn thành. Hiện dự án có hướng dẫn, công cụ kiểm tra, bản chụp token/style từ Figma và khung website với 7 trang Introduction trong `../website/`. Nội dung website đang là bản nháp; chưa có gói CSS token phát hành hoặc thư viện component code dành cho sản phẩm.

## Ai sẽ dùng SDS?

| Vai trò | Dùng SDS để làm gì? |
| --- | --- |
| Product/Design lead | Chốt quy ước và phạm vi áp dụng, biết quy tắc nào đã duyệt hoặc còn đang thử nghiệm. |
| Designer | Chọn variable, style và component trong Figma theo đúng vai trò; ghi nhận trường hợp thiết kế mới cần mở rộng hệ thống. |
| Developer web/app | Tra tên, giá trị, mode, trạng thái và hướng dẫn triển khai; dùng bản phát hành của token/component khi đã có. |
| QA và người review | Đối chiếu giao diện với trạng thái, quy tắc và nguồn Figma đã được duyệt. |
| AI agent | Đọc hướng dẫn và dữ liệu máy đọc để thiết kế hoặc code theo SDS, đồng thời nêu rõ chỗ chưa có quy tắc được duyệt. |

Người dùng sản phẩm SmartAds và người dùng SDS là **hai nhóm khác nhau**: Advertiser/Publisher dùng nền tảng quảng cáo; đội sản phẩm và agent dùng SDS để tạo, duy trì giao diện của nền tảng đó.

## Nguồn thông tin và thứ tự tin cậy

| Cần biết | Nguồn |
| --- | --- |
| SmartAds đang giới thiệu sản phẩm ra thị trường như thế nào | [Website SmartAds](https://smartads.tech/) và các trang giải pháp liên quan. |
| Tên, ID, giá trị và liên kết variable/style hiện có | [File Figma SmartAds Design System](https://www.figma.com/design/cRZ5kIi4kD6j9lh1dbh5mh/SmartAds---Design-System). |
| Bản dữ liệu đã đọc để audit và sinh tài liệu/code | `../variable-figma-export/`; xem ngày đọc trong từng file JSON. |
| Quy ước đã duyệt hoặc còn mở | `../.agents/skills/ds-conventions/references/open-decisions.md` và `../tokens/rename-map.json`. |
| Cách vận hành thư mục này | [Hướng dẫn thư mục và vận hành](workspace-guide.md). |

Tài liệu [VDS mẫu](<../../../Prompt Docs VNE/llms-full.txt>) giúp tham khảo **cách tổ chức tài liệu**, không xác định màu sắc, component hay tiếng nói thương hiệu của SmartAds.

## SDS đang ở đâu?

Ngày 02/11/2026, bản chụp trong dự án ghi **690 local variables** thuộc sáu collection và **132 local styles** (77 text, 43 effect, 7 paint, 5 grid). Tiền tố CSS `sa` đã được duyệt. Các quyết định khác về tên, thang đo và cấu trúc collection còn mở; các đề xuất đổi tên chưa được áp dụng vào Figma. Xem [hướng dẫn vận hành](workspace-guide.md) để biết cách đọc dữ liệu, audit và cập nhật.
