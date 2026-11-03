# Quy tắc giao diện website SDS Docs

File này áp dụng cho **website tài liệu** trong `SDS-docs/website/`. Đây là quy tắc triển khai của website đang có, không phải bộ token hay component SDS đã phát hành cho sản phẩm SmartAds. Đọc cùng `../SDS-RULES.md` trước khi thêm hoặc sửa UI. Các giá trị ở đây mô tả quyết định hiện tại của website; khi người dùng gửi node Figma mới và yêu cầu đổi thiết kế, đối chiếu node đó rồi cập nhật code và quy tắc liên quan.

## Thứ tự nguồn khi làm UI

1. Yêu cầu mới nhất của người dùng và node Figma cụ thể được giao cho màn/component đó.
2. Figma SmartAds Design System trong `../ds.config.json` cho variable, style và asset thương hiệu. `../variable-figma-export/` chỉ là snapshot ngày 02/11/2026; kiểm tra Figma hiện tại khi cần khẳng định giá trị mới.
3. Quy tắc dự án `../SDS-RULES.md` và các quyết định đã duyệt. D1 là tiền tố `sa`; D2–D8 vẫn mở, không biến thành quy tắc sản phẩm.
4. Các pattern website đang dùng trong `src/components/`, `src/styles/globals.css` và `src/styles/figma-resources.css`. Nếu Figma không quy định một chi tiết, dùng pattern hiện có và nói rõ phần suy luận.

Không lấy giá trị màu, font hoặc nội dung thương hiệu từ website mẫu. Không chỉnh tay `src/styles/figma.generated.css`, `src/data/*.generated.json`, `.next/` hoặc `out/`. Với một giá trị mới từ Figma, ghi node/variable/style ID ở tài liệu hoặc comment gần code để lần sau tra được nguồn. Các biến `--sa-docs-*` và `--sa-resource-*` chỉ dành cho website docs; không gọi chúng là token sản phẩm SDS.

## Typography

| Thuộc tính | Quy tắc website |
| --- | --- |
| Font family | Chỉ dùng Public Sans; file font cục bộ và license ở `public/fonts/public-sans/`, khai báo trong `src/styles/public-sans.css`. Code, phím tắt và nút cũng dùng font này. |
| Font weight | Chỉ dùng `400`, `500`, `600`, `700`, đúng bốn weight có file font normal/italic cục bộ. Body thường `400`; điều khiển/chú thích nhấn nhẹ `500`; heading, tên card, nhãn nhóm và mục cần nhấn `600`; tiêu đề trang/header thương hiệu `700` khi pattern hiện tại yêu cầu. Không dùng `550` hay `650`. |
| Cỡ chữ body content | Chọn trong dãy `11, 12, 13, 14, 16, 18, 20, 24, 28, 32px`. Bài viết thường `16px`; H2 `24px` desktop, `20px` mobile; H3 `18px`; tiêu đề trang `32px` desktop, `28px` mobile. Cỡ nhỏ chỉ dùng cho metadata, bảng, code hoặc nhãn. |
| Line-height | Nội dung trong `.sa-main` là `200%`; header, sidebar và điều hướng ngoài nội dung là `120%`. Giữ các giá trị này khi thêm thành phần mới. |
| Màu chữ | Chữ đen chính light `#1F1F1F`; chữ menu dark `#FAFAFA`. Các mức chữ phụ và link lấy từ biến theme đang dùng; không đổi tất cả chữ phụ thành màu chính. |

Thang cỡ chữ trên là quy ước **website docs**, không thay các text style gốc trong Figma. Không thêm cỡ `15`, `21`, `23px` hoặc weight trung gian để sửa một trang đơn lẻ. Nếu node Figma mới yêu cầu ngoại lệ, ghi rõ nguồn và phạm vi ngoại lệ trước khi áp dụng.

## Màu và theme

Ưu tiên biến Figma đã được sinh trong `figma.generated.css`, sau đó dùng biến ngữ nghĩa của website trong `globals.css` hoặc `figma-resources.css`. Khi một màu xuất hiện ở nhiều thành phần, đặt một biến có tên theo **vai trò**, không lặp hex ở từng selector. Giữ light/dark cùng một vai trò để đổi mode nhất quán.

| Vai trò hiện có | Light | Dark | Nơi kiểm tra |
| --- | --- | --- | --- |
| Nền body/header | `#FFFFFF` | `#09090A` | `--sa-docs-bg` và header. |
| Primary/link | `#048845` | `#048845` | `--sa-docs-primary`; kiểm tra tương phản trên nền sử dụng. |
| Tiêu đề nhóm sidebar | `#737373` | `#A1A1A1` | `.sa-sidebar-heading`. |
| Chữ mục sidebar | `#1F1F1F` | `#FAFAFA` | `.sa-nav-list a`, `.sa-resource-link`. |
| Mục sidebar hover/selected | `#F4F4F4` | `#1F1F22` | State của menu. |
| Viền header/sidebar | Theo `--sa-docs-border` | `#222222` | Hai đường chia bố cục. |
| Nút chuyển trang: nền/chữ | `#F5F5F5` / `#171717` | `#262626` / `#FAFAFA` | Nút ở toolbar và cuối bài. |
| Nút GitHub: nền/chữ | `#000000` / `#FFFFFF` | `#FFFFFF` / `#1F1F1F` | Header; icon SVG theo mode từ Figma. |

Các màu khác của panel, chữ phụ, border và thẻ Resource đã có biến `--sa-docs-*` hoặc `--sa-resource-*`; xem selector hiện hành trước khi thêm màu mới. Màu dark của trang docs có thể khác giá trị Base trong snapshot Figma vì đây là quyết định UI của website. Không sửa snapshot để làm cho nó khớp website.

## Khoảng cách, kích thước và bố cục

- Dùng spacing Figma đã xuất (`4`, `8`, `12`, `20px`) khi phù hợp. Với layout docs, ưu tiên các khoảng cách đang lặp lại (`16`, `24`, `32px`) trước khi tạo mức mới. Một thông số đặc thù của node Figma, logo hoặc một component có thể khác; ghi nguồn khi thêm.
- Header cao `64px`; logo header rộng `110px`. Các điều khiển search, GitHub và theme ở header cao `36px`. Sidebar desktop rộng `240px` và có scroll riêng. Sidebar không có icon.
- Nút `Sao chép trang` trong toolbar và nút sao chép URL ở trang AI Agents cao `36px` theo Figma `361:833`, `361:2139`, `361:4834`, `361:4710`.
- Ở màn từ `1200px`, khung bài viết có cột mục lục bên phải `208px`. Dưới `1200px`, mục lục bên phải ẩn và mục lục trong bài xuất hiện. Dưới `768px`, sidebar chuyển thành menu mở từ header.
- Padding ngang `.sa-main`: `320px` từ 1920px; `240px` ở 1600–1919px; `160px` ở 1440–1599px; `96px` ở 1200–1439px; `64px` ở 960–1199px; `28px` ở 768–959px; `24px` ở 401–767px; `18px` đến 400px. Kiểm tra tràn ngang khi sửa grid, bảng, code hoặc text dài.
- Bảng trong bài có khung scroll ngang; code block tự scroll ngang. Thẻ Resource dùng grid tự giảm số cột, preview cao `140px`, gap `24px`, radius `10px` theo node Figma `9:4767`.
- Khi thêm component, dùng radius và chiều cao của pattern gần nhất hoặc node Figma được giao. Không áp một radius mới cho toàn site chỉ vì một ví dụ. Những số lẻ trong tỷ lệ asset/logo được giữ nguyên để không bóp méo nguồn.

## Thành phần và trạng thái

- Bắt đầu từ component và class hiện có, dùng prefix `sa`. Một thay đổi dùng chung phải được sửa ở component/style dùng chung; không chép CSS của cùng một nút vào nhiều trang.
- Với link, nút, menu và card tương tác, kiểm tra `rest`, `hover`, `active/pressed`, `focus-visible`, `disabled` nếu có, và `selected` nếu thành phần có trạng thái chọn. Không tự thêm state mà Figma hoặc hành vi sản phẩm chưa cần; ghi rõ state còn thiếu nguồn.
- Kiểm tra mỗi state ở light và dark mode. Dùng cùng logic tương tác và aria state cho cả hai mode. Focus phải nhìn thấy khi dùng bàn phím. Mobile menu và search dialog phải đóng/mở bằng bàn phím; thiết bị cảm ứng phải nhìn thấy hành động mở file Figma.
- Icon chức năng chỉ lấy từ `@tabler/icons-react` qua `src/components/Icon.js`. Logo SmartAds và icon GitHub ở header là SVG thương hiệu gốc từ Figma. Không thêm icon trong sidebar.
- Giữ semantic HTML, nhãn điều khiển, alt phù hợp, giảm chuyển động với `prefers-reduced-motion` và không để nội dung tràn ngang ở các viewport cần hỗ trợ. Không tuyên bố đạt một mức WCAG nếu chưa audit tương ứng.

## Quy trình áp dụng cho mỗi task UI

1. Đọc `../SDS-RULES.md`, file này và node Figma được giao. Xác định route, component, mode, state và viewport liên quan.
2. Tra giá trị đã có trong generated Figma CSS và các biến docs. Nếu phải thêm giá trị, ghi nguồn và đặt ở lớp website phù hợp; không sửa token sản phẩm hay file generated.
3. Sửa component/CSS, kiểm tra tương tác và đọc lại các selector ghi đè ở cuối `globals.css`. File hiện có nhiều lớp CSS lịch sử; đừng chỉ kiểm tra một khai báo đầu tiên.
4. Chạy `npm run build` trong `website/`. Với layout, theme, điều hướng hoặc state, chạy `npm run test:e2e` sau build. Xem màn được sửa ở light/dark và kích thước liên quan, gồm `1920`, `1440`, `1280`, `960`, `768`, `390`, `320px` khi thay đổi bố cục.
5. Kiểm tra các bài ở `src/content/docs/` theo bảng tác động trong `../introduction/workspace-guide.md`. Nếu quy tắc, cấu trúc hoặc cách vận hành website đổi, cập nhật trang AI Agents và các trang Introduction liên quan, không chỉ sửa file này. Cập nhật `updated` cho bài đã sửa, build và xem route; nếu không bài nào cần sửa, báo rõ đã kiểm tra những trang nào.
6. Báo file đã sửa, node/variable làm nguồn, phần đã kiểm và ngoại lệ hoặc quyết định còn chờ. Nếu một yêu cầu mới làm đổi quy tắc chung, cập nhật file này cùng code.

Các bài Playwright hiện kiểm tra font Public Sans, line-height, dãy cỡ chữ body, một số màu và kích thước header/sidebar, dark mode, route, tương tác và không tràn ngang. Đây là hàng rào tự động cho phần đã có; kiểm tra bằng mắt vẫn cần cho UI mới hoặc Figma node mới.
