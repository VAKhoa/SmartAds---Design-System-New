# Quy tắc code component SmartAds

Quyết định của người dùng ngày **12/11/2026**: component thực tế từ Figma phải dùng **HTML, CSS và JavaScript thuần**. Áp dụng cho component sản phẩm, ví dụ code để Dev sao chép, file bàn giao và code trong spec. Đọc cùng [SDS-rules.md](SDS-rules.md); quy tắc này không xác nhận rằng thư viện component đã được phát hành.

## Phân biệt hai lớp triển khai

| Phạm vi | Công nghệ và cách thực hiện |
| --- | --- |
| Website tài liệu: shell, sidebar, search, theme, viewer, nút copy | Giữ Next.js/React, JavaScript/JSX và CSS hiện có. Giữ bố cục và [quy tắc UI website](website-ui-rules.md). |
| Component thực tế từ Figma, snippet và code handoff | HTML ngữ nghĩa, CSS thuần, JavaScript dùng DOM API và sự kiện native; không phụ thuộc runtime framework hay bước biên dịch. |

Xuất website Next.js thành HTML tĩnh không biến source JSX thành component thuần để bàn giao. Không giao React/JSX, Vue, TypeScript, SCSS, Tailwind hoặc thư viện UI thay cho HTML/CSS/JS khi chưa có yêu cầu mới cho phép đổi công nghệ. Công cụ build/test của repository vẫn được dùng để kiểm tra.

## Nguồn thiết kế và token

- Xác định node, variant, state, mode và responsive trong Figma được giao. Ghi file key, node/variable/style ID, ngày kiểm chứng hoặc ngày snapshot trong tài liệu component.
- Dùng semantic token đã xác minh qua CSS custom properties khi có; giữ prefix `sa`. Ghi rõ ánh xạ từ tên CSS tới ID/tên Figma, không tự coi tên đề xuất là tên đã duyệt.
- Quy tắc typography, màu dark, icon Tabler React và biến `--sa-docs-*` của website chỉ phục vụ lớp tài liệu. Component sản phẩm theo thiết kế/token của chính component; không kế thừa chúng chỉ vì preview được đặt trong website.
- Asset/font/icon phải có nguồn và đi kèm hướng dẫn tải. Không đưa `@tabler/icons-react` vào code component thuần. Với icon sản phẩm từ MingCute, dùng SVG public đã khóa phiên bản và dán inline khi cần màu `currentColor`; không sửa path theo token stroke/radius chưa được xác nhận. Logo và asset thương hiệu vẫn lấy từ Figma, không thay bằng icon cùng tên trong MingCute.
- Thiếu thiết kế state hoặc binding token thì ghi phần chưa xác minh; tách đề xuất xử lý khỏi dữ liệu thiết kế đã xác nhận.

## Cấu trúc code bàn giao

- Giao markup `.html`, style `.css` và `.js` khi có tương tác. Component tĩnh không cần tạo JS rỗng. Đặt source trong thư mục component của dự án đích được giao; không mặc định dùng `website/src/components/` làm thư viện sản phẩm.
- CSS dùng class có phạm vi `sa-…`, tránh selector/reset toàn trang gây ảnh hưởng nơi nhúng. Giữ token phụ thuộc và cách nạp CSS rõ ràng; không phụ thuộc CSS nội bộ của docs shell.
- JavaScript dùng DOM API, hỗ trợ nhiều instance cùng trang, không gắn ID trùng hoặc khởi tạo listener nhiều lần. Nêu cách khởi tạo và dọn listener nếu component có vòng đời động; ES modules được phép.
- Dùng phần tử HTML native phù hợp, keyboard/focus và ARIA đúng hành vi. Liệt kê state áp dụng theo nguồn: default, hover, focus, active, disabled, selected, loading, empty, error…; không bắt mọi component phải có toàn bộ state.
- Spec mô tả cấu trúc HTML, class/CSS variables, attribute/data-attribute, sự kiện và hàm JS nếu có. Không chỉ bàn giao API React props.

## Tài liệu, preview và kiểm tra

1. Trang component theo file chính trong [content-guide.md](../guides/content-guide.md); code tabs dùng HTML / CSS / JavaScript với nội dung copy được. Ghi phụ thuộc token/asset và cách chạy ví dụ bằng static server.
2. Preview component phải dùng cùng source HTML/CSS/JS được bàn giao, có thể nhúng qua wrapper hoặc iframe trong website React. Wrapper của tài liệu không nằm trong code Dev copy; không duy trì bản React mô phỏng rồi gọi đó là component thuần.
3. Kiểm tra component độc lập ngoài docs shell: render đúng khi nạp đủ file/token/asset, nhiều instance, keyboard/focus, state và viewport được giao. Đối chiếu giá trị thực tế với Figma, ghi phần chưa xác minh và cách sửa đề xuất.
4. Khi thêm preview vào website, kiểm tra thêm route và build website. Bàn giao danh sách file, nguồn, cách dùng, state/responsive đã kiểm và giới hạn; không tự publish package hoặc sửa Figma.
