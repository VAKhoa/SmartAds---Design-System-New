---
title: Icons
description: Tra cứu MingCute Core Regular và Core Filled, sao chép SVG, tải asset và đối chiếu token icon SmartAds.
section: Foundation
updated: 13/11/2026
status: draft
sources:
  - label: MingCute Icons — thư viện chính thức
    url: https://www.mingcute.com/
  - label: MingCute Icons — gói SVG và hướng dẫn chính thức
    url: https://github.com/mingcute-design/mingcute-icons/blob/main/README.md
  - label: SmartAds Design System — snapshot variables ngày 02/11/2026
    url: https://www.figma.com/design/cRZ5kIi4kD6j9lh1dbh5mh/SmartAds---Design-System?m=dev
---

## Phạm vi thư viện

SmartAds dùng **MingCute** làm nguồn icon cho giao diện sản phẩm. Danh mục dưới đây được tạo từ gói public **`@mingcute/svg@3.1.0`**: **2.263 tên icon**, mỗi tên có **Core Regular** và **Core Filled**, tổng **4.526 SVG** thuộc **26 nhóm**. Đây là toàn bộ bộ public ở phiên bản đã khóa, **không phải danh sách icon đã xuất hiện trong từng màn SmartAds**. Chưa có node Figma chỉ ra subset đang dùng, cách chọn Regular/Filled theo trạng thái hay ánh xạ từng glyph sang component sản phẩm; không suy các thông tin đó từ tên gói. MingCute Pro không có trong gói public này.

Các SVG được lấy từ gói npm chính thức và phục vụ cục bộ trên website SDS; tìm kiếm, sao chép và tải file không phụ thuộc vào việc website MingCute đang mở. Giữ tên file nguồn, `viewBox` và đường vector. Bản public được phát hành theo [Apache-2.0](https://github.com/mingcute-design/mingcute-icons/blob/main/LICENSE); file giấy phép được kèm trong thư mục asset của website.

## Kết nối thư viện từ GitHub

Sơ đồ dưới đây đi từ **repository GitHub → gói SVG → asset trong SmartAds**. Nút **GitHub MingCute** trong sơ đồ mở [repository chính thức](https://github.com/mingcute-design/mingcute-icons) ở tab mới. Tại đó, đọc `README.md` để xem các gói public, đường dẫn SVG và giấy phép. Repository là nơi xem nguồn và lịch sử; website SDS hiện dùng **gói SVG public được khóa ở phiên bản 3.1.0**, nên nhánh `main` trên GitHub có thể thay đổi sau bản này.

<!-- smartads-icon-connection -->

Để dùng cùng phiên bản trong dự án HTML/CSS/JavaScript thuần:

1. Chạy `npm install @mingcute/svg@3.1.0` ở thư mục dự án. Gói này cung cấp SVG độc lập, không cần React hoặc runtime MingCute trong trình duyệt.
2. Chọn một file từ `node_modules/@mingcute/svg/core-regular/` hoặc `core-filled/`, ví dụ `home-1.svg`. Sao chép file cần dùng vào thư mục asset của dự án và giữ giấy phép Apache-2.0 đi kèm. Không đặt URL trình duyệt trỏ thẳng vào `node_modules`.
3. Dùng nút **Sao chép SVG / Sao chép HTML / Tải SVG** ở catalog bên dưới để lấy đúng vector theo style đã chọn. Kiểm tra tên file, style và màu/size theo thiết kế SmartAds trước khi sử dụng trong component.

Nếu cần xem cấu trúc nguồn trên máy, có thể clone repository bằng `git clone https://github.com/mingcute-design/mingcute-icons.git`; bước clone chỉ để tra cứu nguồn, **không thay** phiên bản npm đã khóa cho sản phẩm. [README MingCute](https://github.com/mingcute-design/mingcute-icons/blob/main/README.md) mô tả đường dẫn `@mingcute/svg/core-regular/home-1.svg` và các package khác.

## Danh mục tìm kiếm và tải icon

Catalog hỗ trợ tìm theo tên, lọc nhóm, đổi Regular/Filled, xem trước các kích thước và sao chép/tải trực tiếp từng SVG. ID `sa-icon-*` chỉ là tên asset trong tài liệu, không phải variable Figma.

<!-- smartads-icon-catalog -->

## Sử dụng icon trong HTML/CSS/JS

1. Trên website SDS, tìm theo tên tiếng Anh hoặc lọc theo nhóm và chọn **Core Regular / Core Filled**. Chọn **Sao chép SVG** để lấy nguyên vector, **Sao chép mã HTML** để lấy đoạn HTML thuần, hoặc **Tải SVG** để lưu file. Nút **Sao chép tên** trả về ID ổn định của asset, ví dụ `sa-icon-home-1-regular`.
2. Trong code sản phẩm HTML/CSS/JavaScript thuần, dán SVG **inline** để `currentColor` nhận màu chữ/token của phần tử chứa. Dùng kích thước hộp từ `--sa-icon-size`; thêm tên truy cập cho nút chỉ có icon, hoặc đặt `aria-hidden="true"` khi chữ bên cạnh đã mô tả chức năng. Không dùng `stroke-width` CSS để sửa đường vector MingCute đã đóng thành path.

Với dự án có bundler, có thể import asset theo đường dẫn `@mingcute/svg/core-regular/home-1.svg` như [ví dụ chính thức](https://github.com/mingcute-design/mingcute-icons/blob/main/README.md#standalone-svg). Đây là cách lấy file trong bước build, không phải phụ thuộc runtime của snippet HTML/CSS/JS bàn giao. Muốn cập nhật phiên bản, kiểm tra thay đổi và giấy phép trên [GitHub MingCute](https://github.com/mingcute-design/mingcute-icons) trước khi sinh lại catalog.

Ví dụ HTML thuần với file SVG tải về (nếu dùng `<img>`, màu `currentColor` trong file ngoài **không kế thừa** màu CSS của phần tử cha; dùng SVG inline khi cần token màu):

```html
<button class="sa-action" type="button" aria-label="Về trang chủ">
  <!-- Dán mã SVG đã sao chép từ thẻ Home 1 Regular tại đây. -->
</button>
```

```css
.sa-action svg { width: var(--sa-icon-size); height: var(--sa-icon-size); color: var(--sa-icon-color-primary); }
```

Đoạn HTML trên chỉ minh họa nơi đặt SVG; nút **Sao chép mã HTML** trên từng thẻ tạo mã chứa SVG thật. Giá trị CSS ở bảng dưới là **ánh xạ đề xuất từ snapshot Figma**, chưa phải gói token sản phẩm được duyệt.

## Tên asset và token SmartAds

Tách ba lớp tên để Dev không nhầm glyph với variable: **tên file MingCute** giữ nguyên (`home-1.svg`), **ID asset SDS đề xuất** là `sa-icon-{tên-kebab}-{regular|filled}` (ví dụ `sa-icon-home-1-regular`), còn **CSS custom property** dùng cho kích thước và màu đã có nguồn Figma. Prefix `sa` là quyết định đã duyệt; tên ID/CSS ở bảng là ánh xạ tài liệu đang chờ duyệt, không đổi tên Figma.

| Variable Figma trong snapshot 02/11/2026 | ID Figma | Giá trị nguồn | CSS alias đề xuất | Cách dùng |
| --- | --- | --- | --- | --- |
| `icon/size` | `VariableID:424:103` | 16px | `--sa-icon-size` | Hộp hiển thị mặc định; SVG gốc vẽ trên `viewBox` 24 × 24. |
| `icon/stroke` | `VariableID:424:104` | ≈1.4px | `--sa-icon-stroke` | Chỉ đối chiếu thiết kế; không áp lên path của MingCute. |
| `icon/radius` | `VariableID:424:105` | 2px | `--sa-icon-radius` | Chỉ đối chiếu thiết kế; không sửa vector gốc. |
| `component/icon/common/primary` | `VariableID:205:4228` | Light `#9EA1A5`; Dark `#CBCFD3` | `--sa-icon-color-primary` | Màu theo semantic role khi binding được xác nhận. |
| `component/icon/common/secondary` | `VariableID:437:4444` | Light `#7B7D80`; Dark `#EAECF0` | `--sa-icon-color-secondary` | Vai trò phụ, không mặc định cho mọi icon. |
| `component/icon/common/accent` | `VariableID:44:55` | Light/Dark `#3D63F0` | `--sa-icon-color-accent` | Vai trò accent, chỉ dùng đúng ngữ cảnh. |

**Điểm cần đối chiếu:** MingCute Core Regular có nét nguồn tương ứng 2px trên lưới 24 × 24. Khi thu hộp xuống 16px, hình cũng co theo tỷ lệ; token `icon/stroke ≈ 1.4px` trong snapshot không biến đường path thành nét 1.4px chính xác. Cần node icon SmartAds và binding trước khi chuẩn hóa quy tắc stroke/radius hoặc chuyển một glyph thành token sản phẩm.

## Nguyên tắc truy cập và giới hạn

- Icon mang ý nghĩa độc lập cần tên truy cập; icon trang trí cạnh chữ nên ẩn với screen reader. Vùng bấm của nút phải có nhãn và focus rõ ràng; đừng chỉ dựa vào hình hoặc màu để diễn đạt trạng thái.
- Catalogue dùng bản **public** của MingCute. Không tải hoặc phân phối file Pro nếu chưa có quyền và chưa xác định giấy phép. Các icon thương hiệu, Publisher và Partnership từ Figma được quản lý ở [Logo](/foundation/logo/), không thay bằng glyph trùng tên trong MingCute.
- Snapshot token SmartAds ngày 02/11/2026 chưa chứng minh binding của từng icon đang dùng trong Figma. Trang này giữ `draft`; xác nhận node icon/component và quyết định naming trước khi phát hành CSS alias hoặc thay thế icon trong code sản phẩm.
- Icon chức năng của **website tài liệu SDS** hiện đi qua Tabler ở `src/components/Icon.js`; catalog này mô tả thư viện icon **sản phẩm SmartAds** và không tự đổi chrome của website. Hai lớp có phạm vi riêng.
