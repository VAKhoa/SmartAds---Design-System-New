---
title: Layout
description: Khung trang, lưới cột, viewport tham chiếu và các điểm cần xác nhận cho bố cục SmartAds.
section: Foundation
updated: 13/11/2026
status: draft
sources:
  - label: SmartAds Design System — Grid/Body Layout và Viewport variables, snapshot 02/11/2026
    url: https://www.figma.com/design/cRZ5kIi4kD6j9lh1dbh5mh/SmartAds---Design-System?m=dev
  - label: SmartAds Design System — Drawer, node 8454:44595
    url: https://www.figma.com/design/cRZ5kIi4kD6j9lh1dbh5mh/SmartAds---Design-System?node-id=8454-44595&m=dev
  - label: SmartAds Design System — Create Campaign desktop, node 12055:243217
    url: https://www.figma.com/design/cRZ5kIi4kD6j9lh1dbh5mh/SmartAds---Design-System?node-id=12055-243217&m=dev
  - label: SmartAds Design System — Create Campaign chat/collapsed, node 14637:386593
    url: https://www.figma.com/design/cRZ5kIi4kD6j9lh1dbh5mh/SmartAds---Design-System?node-id=14637-386593&m=dev
  - label: SmartAds Design System — Dashboard sidebar mở, node 3926:89558
    url: https://www.figma.com/design/cRZ5kIi4kD6j9lh1dbh5mh/SmartAds---Design-System?node-id=3926-89558&m=dev
  - label: SmartAds Design System — Dashboard sidebar thu gọn, node 14416:263856
    url: https://www.figma.com/design/cRZ5kIi4kD6j9lh1dbh5mh/SmartAds---Design-System?node-id=14416-263856&m=dev
---

## Phạm vi và mức độ xác minh

**Bản nháp của Foundation / Layout.** Các số đo dưới đây đến từ bản xuất variables/styles của đúng file SmartAds Design System ngày **02/11/2026** hoặc từ những node được chỉ rõ. Trang tách ba khái niệm: **kích thước viewport mẫu**, **giá trị lưới trong Figma** và **CSS breakpoint triển khai**. Chúng không mặc nhiên bằng nhau. Trang này chưa phát hành token layout, bộ breakpoint hoặc API component cho sản phẩm.

Các ví dụ trực quan ở phần Drawer, Create Campaign và Dashboard dùng **ảnh PNG xuất trực tiếp từ frame Figma được dẫn nguồn**. Viền và nhãn đo đặt chồng lên ảnh là lớp chú thích của website SDS Docs, không nằm trong Figma, không phải component sản phẩm và không chứng minh Auto Layout hoặc responsive ngoài frame đã chụp. Có thể bật/tắt lớp này để xem nguyên ảnh thiết kế. Ảnh giữ tỷ lệ gốc khi thu nhỏ trên trang; các số đo bên dưới vẫn tham chiếu frame thật, không lấy từ kích thước ảnh hiển thị trên trình duyệt.

| Phần cần đọc | Bằng chứng đang có | Giới hạn |
| --- | --- | --- |
| Viewport và khung trang | Collections `Viewport Desktop`, `Viewport Mobile Tablet` trong snapshot Figma | Mode cho biết mẫu kích thước, chưa xác nhận ngưỡng chuyển layout. |
| Lưới cột | Grid style `Grid/Body Layout`, ID `S:308be77502ea63d1b71dfc40be0a3c6e1d3416be,` | Chưa chứng minh style áp dụng cho mọi màn hoặc mọi mode. |
| Sidebar | Hai variables Expanded/Collapsed của `Viewport Desktop` | Chưa xác nhận cách chuyển trạng thái, điều kiện thu gọn hoặc cấu trúc mọi màn. |
| Drawer | Component set node `8454:44595` có các tên variant `40%`, `70%`, `90%` | Cơ sở tính phần trăm và hành vi responsive chưa rõ. |
| Create Campaign | Node desktop `12055:243217` và chat/collapsed `14637:386593` | Là ví dụ theo node, không tự nâng thành luật cho Dashboard hoặc toàn sản phẩm. |
| Dashboard | Node sidebar mở `3926:89558`, thu gọn `14416:263856` và dải KPI `5627:300576` | Có số đo desktop và cấu trúc dải KPI; chưa có frame mobile/tablet để xác nhận reflow. |

## Khung trang và viewport tham chiếu

Collection **`Viewport Desktop`** lưu `Screen/Container/size-screen-width` tại `VariableID:2433:193`. Cùng năm mode này, `Screen/Container/size-screen-padding` (`VariableID:2436:193`) đều là **20px**; `Screen/Sidebar/Expanded` (`VariableID:2587:9967`) là **248px** và `Screen/Sidebar/Collapsed` (`VariableID:2589:9968`) là **84px**. Đây là giá trị của snapshot, không phải phép tính chiều rộng content hoặc lệnh bắt buộc dùng sidebar trên mọi màn.

| Mode Figma desktop | Giá trị width lưu trong variable | Padding container | Sidebar expanded / collapsed |
| --- | ---: | ---: | ---: |
| `1280-sm` | 1280px | 20px | 248px / 84px |
| `1366-md` | 1366px | 20px | 248px / 84px |
| `1440-lg` | 1440px | 20px | 248px / 84px |
| `1536-lg` | **1563px** | 20px | 248px / 84px |
| `1920-xl` | 1920px | 20px | 248px / 84px |

**Điểm bất thường:** mode mang tên `1536-lg` nhưng `Screen/Container/size-screen-width` lưu **1563px** trong snapshot. Trang giữ cả tên và giá trị gốc để đối chiếu; không tự sửa thành 1536px, không dùng 1563px làm breakpoint khi chưa xác nhận ý định thiết kế.

Collection **`Viewport Mobile Tablet`** lưu `Screen/Container/size-screen-width` tại `VariableID:2446:194` với bốn mode. Snapshot này không cung cấp một giá trị `size-screen-padding` tương ứng để khẳng định padding mobile/tablet.

| Mode Figma mobile/tablet | Width mẫu |
| --- | ---: |
| `390-Mobile` | 390px |
| `428-Mobile` | 428px |
| `843-Tablet` | 843px |
| `1024-Tablet` | 1024px |

## Lưới cột trong Grid/Body Layout

Style **`Grid/Body Layout`** ở `variable-figma-export/styles.json` có ID `S:308be77502ea63d1b71dfc40be0a3c6e1d3416be,`. Lớp `COLUMNS` chính lưu **12 cột**, alignment **`STRETCH`**, gutter **12px** và offset **20px**. `boundVariables` của lớp này rỗng trong snapshot: chưa có binding variable để đưa ra một tên CSS token sản phẩm. Style còn chứa hai lớp `ROWS` một hàng với `sectionSize` **128px** (MIN) và **46px** (MAX), cùng hai lớp mép `COLUMNS` **20px** (MIN/MAX). Đây là dữ liệu guide; chưa xác minh chúng ứng với header, footer hoặc margin của màn nào.

Snapshot còn bốn grid style khác. Bảng sau ghi lại cấu trúc Figma để tìm đúng style khi kiểm tra component; tên style **không chứng minh** nó đã được gắn vào frame tương ứng.

| Grid style | Lớp cột/hàng được lưu | ID nguồn |
| --- | --- | --- |
| `Grid/Chat Dina` | Một cột STRETCH offset 20px, gutter 20px; mép cột 20px; mép hàng 12px/20px | `S:3b2f566bd8fb484a669b8a1a1ed688454893cce9,` |
| `Grid/Sidebar` | Một cột STRETCH offset 10px, gutter 20px; mép cột 10px; mép hàng 16px | `S:2757315024a19343839a9da154d938fbd97acf2c,` |
| `Grid/Body Content` | Chỉ có mép hàng trên/dưới 20px; không có lớp cột trong style | `S:5c2c2375d26b094b8be0f53221bae6cc11f776d4,` |
| `Grid/Creative` | Mép hàng trên/dưới 20px và mép cột trái/phải 20px; không có lưới cột STRETCH | `S:e2dc01ef90d587a7838fedccaa8c25362c30ebf0,` |

**Phạm vi áp dụng:** bảng trên chứng minh một grid style tồn tại trong file Figma. Nó **chưa chứng minh** mọi màn Desktop, Dashboard, Create Campaign hay Drawer đều dùng 12 cột, và không xác nhận số cột của tablet/mobile. Không tính độ rộng cột sản phẩm từ width viewport nếu chưa biết frame nào gắn style này và content area thực tế.

<!-- smartads-layout-grid -->

## Viewport mẫu không phải breakpoint CSS

Tên mode `1280-sm`, `1366-md`, `1440-lg`, `1536-lg`, `1920-xl`, `390-Mobile`, `428-Mobile`, `843-Tablet`, `1024-Tablet` là **mẫu viewport trong Figma**. Snapshot chưa có ngưỡng media query, quy tắc nội suy giữa hai mẫu, thứ tự reflow, số cột ở từng mode hay điều kiện mở/thu sidebar. Vì vậy không dùng các tên mode làm `@media (min-width: …)` cho sản phẩm nếu chưa có quyết định riêng.

Một dữ liệu responsive hẹp hơn đã có: variable `Screen/Navigation/btn-create-campagin` (`VariableID:2447:401`, giữ nguyên lỗi chính tả trong tên nguồn) có giá trị **false** ở `390-Mobile`, `428-Mobile`, `843-Tablet` và **true** ở `1024-Tablet`. Dữ liệu này chỉ cho biết visibility của nút được đặt tên tại bốn mode mẫu; nó không xác nhận chính xác breakpoint chuyển đổi hoặc hành vi của các control khác.

Các breakpoint của **website tài liệu SDS** nằm trong `content/rules/website-ui-rules.md` và CSS của website. Chúng phục vụ shell tài liệu, không phải quy tắc layout sản phẩm trong Figma.

## Drawer: tên variant và kích thước đo được

Component set **Drawer** tại node `8454:44595` có các variant mang nhãn `40%`, `70%`, `90%`. Trong bản xuất từ canvas 1920px, các hình chữ nhật của ba variant đo được như sau:

| Nhãn variant Figma | Chiều rộng hình đo được | Tỷ lệ nếu lấy 1920px làm cơ sở |
| --- | ---: | ---: |
| `40%` | **480px** | 25%; khác nhãn 40% (40% của 1920px là 768px) |
| `70%` | **1344px** | 70% |
| `90%` | **1728px** | 90% |

**Xung đột cần làm rõ:** riêng variant `40%` không khớp phép tính trên canvas 1920px; tên variant có thể dựa trên một vùng khác hoặc geometry chưa đồng bộ. Không bàn giao `width: 40vw`, không tự sửa node Figma và không suy ra quy tắc responsive chỉ từ ba nhãn. Chưa xác minh ràng buộc mép, overlay, scroll, focus, state đóng/mở hoặc API component.

Ảnh `drawer-variants.png` là bản xuất chỉ đọc của node [Drawer `8454:44595`](https://www.figma.com/design/cRZ5kIi4kD6j9lh1dbh5mh/SmartAds---Design-System?node-id=8454-44595&m=dev). Bản xuất gồm cả nội dung khác trên bảng Figma, nên website chỉ hiển thị vùng Drawer được cắt bằng khung xem; lớp viền là chú thích của tài liệu. Bảng số đo và xung đột ở trên vẫn là nguồn đối chiếu khi đọc ảnh.

<!-- smartads-layout-drawer -->

## Create Campaign: các khung được quan sát

Node [Create Campaign Desktop Web](https://www.figma.com/design/cRZ5kIi4kD6j9lh1dbh5mh/SmartAds---Design-System?node-id=12055-243217&m=dev) có bốn frame desktop. Các số sau là geometry đo trên từng frame: **sidebar 248px**, **header 128px** và gap giữa Main/Overview **20px**. Sidebar 248px trùng giá trị `Screen/Sidebar/Expanded` trong snapshot, nhưng điều đó chưa chứng minh một binding variable trên node.

Ví dụ ảnh gốc `create-campaign-1440.png` lấy từ frame **1440px, sidebar mở `12055:211379`**. PNG đã được Figma thu nhỏ theo giới hạn chiều cao export; nhãn `px` lấy từ số đo frame nguồn, không phải số pixel trên PNG. Viền đo trên ảnh chỉ gắn với frame này; bộ chọn viewport/trạng thái của sơ đồ số đo vẫn dẫn tới các frame riêng trong bảng, không dùng ảnh 1440px để đại diện cho mọi viewport.

| Viewport / frame ID | Sidebar | Header | Main | Gap | Overview |
| --- | ---: | ---: | ---: | ---: | ---: |
| 1920px · `12055:211341` | 248px | 128px | 1257px | 20px | 350px |
| 1440px · `12055:211379` | 248px | 128px | 847px | 20px | 280px |
| 1366px · `12055:211451` | 248px | 128px | 773px | 20px | 280px |
| 1280px · `12055:211415` | 248px | 128px | 687px | 20px | 280px |

Node [Create Campaign chat/collapsed](https://www.figma.com/design/cRZ5kIi4kD6j9lh1dbh5mh/SmartAds---Design-System?node-id=14637-386593&m=dev) có các khung **sidebar 60px**. Ở trạng thái không hiện chat, gap đo được giữa Main/Overview là **20px**:

| Viewport / frame không chat | Sidebar | Main | Gap | Overview |
| --- | ---: | ---: | ---: | ---: |
| 1920px · `14634:348767` | 60px | 1445px | 20px | 350px |
| 1440px · `14634:351243` | 60px | 1011px | 20px | 280px |
| 1366px · `14634:359780` | 60px | 961px | 20px | 280px |
| 1280px · `14637:362268` | 60px | 875px | 20px | 280px |

Khi có chat, các frame quan sát được cho vùng chat và Main như sau. Bảng không khẳng định thứ tự DOM hoặc logic mở chat:

| Viewport / frame có chat | Sidebar | Chat panel | Main |
| --- | ---: | ---: | ---: |
| 1920px · `14637:364814` | 60px | 424px | 1020px |
| 1440px · `14637:364776` | 60px | 360px | 674px |
| 1366px · `14637:364738` | 60px | 360px | 600px |
| 1280px · `14637:364702` | 60px | 320px | 554px |

<!-- smartads-layout-campaign -->

**Chưa phải quy tắc toàn hệ thống:** các bảng chỉ mô tả frame Create Campaign được chỉ định. Sidebar collapsed **60px** ở đây khác `Screen/Sidebar/Collapsed` **84px** của snapshot; cần đối chiếu component/binding và thời điểm thiết kế trước khi chuẩn hóa. Metadata của các child frame chưa đủ chi tiết để khẳng định Auto Layout, `Fill/Hug/Fixed`, grid binding hay phép tính độ rộng Main. Hai node đã bổ sung cho thấy **Screen Layout trong ngữ cảnh Create Campaign**; chưa có node master chung cho Screen Layout.

Layer Main trong các frame mang tên `Col-sm-8`, nhưng các width đo được ở trên không chứng minh Main chiếm 8/12 cột của `Grid/Body Layout`. Không chuyển tên layer này thành span CSS khi chưa kiểm tra grid binding trên node.

## Dashboard: container và nhịp dọc

Hai section [sidebar mở](https://www.figma.com/design/cRZ5kIi4kD6j9lh1dbh5mh/SmartAds---Design-System?node-id=3926-89558&m=dev) và [thu gọn](https://www.figma.com/design/cRZ5kIi4kD6j9lh1dbh5mh/SmartAds---Design-System?node-id=14416-263856&m=dev) của **Dashboard / Advertiser** có bốn frame desktop tương ứng. Header đo được **128px**; body bắt đầu ở y=128. Trong body, nội dung báo cáo có inset ngang **20px** mỗi phía. `Overview_data` rộng bằng content trừ 40px:

Ví dụ ảnh gốc `dashboard-1440.png` lấy từ frame **1440px, sidebar mở `14416:251235`**. Lớp chú thích chỉ đánh dấu vùng được xác định trong frame này, gồm shell và các nhóm báo cáo; trạng thái sidebar thu gọn phải xem qua frame Figma tương ứng trong bảng.

| Viewport | Frame sidebar mở | Sidebar / content / Overview_data | Frame sidebar thu gọn | Sidebar / content / Overview_data |
| --- | --- | --- | --- | --- |
| 1920px | `3926:46530` | 248 / 1669 / 1629px | `14416:263857` | 60 / 1857 / 1817px |
| 1440px | `14416:251235` | 248 / 1189 / 1149px | `14416:263881` | 60 / 1377 / 1337px |
| 1366px | `14416:254824` | 248 / 1115 / 1075px | `14416:263905` | 60 / 1303 / 1263px |
| 1280px | `14416:258413` | 248 / 1029 / 989px | `14416:263929` | 60 / 1217 / 1177px |

Nhịp dọc trong các frame: `Overview_data` bắt đầu tại y=20, cao **118px**; vùng chart bắt đầu y=158, cao **435px**; `section-dashboard` tiếp theo bắt đầu y=613, cao **774px**. Hai khoảng giữa vùng đều **20px**. Đây là số đo frame hiện có, chưa chứng minh một variable binding hoặc quy tắc cho mọi dashboard.

Node dải KPI `5627:300576` trả design context chi tiết: **5 StatisticPanel** trong `flex-wrap`, gap gắn `spacing/md` **12px** (`VariableID:4754:32689`), mỗi panel có `flex: 1 0 0` và `min-width: 166px`. Trên frame 1920 sidebar mở, dải rộng **1629px** cho năm panel **316.2px** với bốn gap 12px. Cấu trúc này là bằng chứng cho dải KPI cụ thể; nó không xác nhận toàn bộ Dashboard dùng `Grid/Body Layout` 12 cột. Chưa có frame mobile/tablet trong hai section để xác định lúc nào panel xuống hàng.

State bổ sung có nguồn nhưng chưa được chuẩn hóa: frame `14422:134583` (1920, sidebar thu) có AI chat phải **424px** và content trái **1432px**; `14422:138428` (1440) có chat **360px** và content trái **1018px**. Frame `14470:202898` (1920, sidebar mở) thêm inline alert cao **44px** ở đầu. Các state này không định nghĩa breakpoint hoặc API component chung.

Một số tên frame Dashboard chứa chiều cao như `1440x900`/`1366x768` nhưng geometry thực của frame không theo đúng tên; frame collapsed 1366 còn ghi `1336x768`. Vì vậy số đo trong bảng dùng metadata layer, không dùng tên frame để xác lập kích thước hay breakpoint.

<!-- smartads-layout-dashboard -->

## Phụ thuộc component và token

- **Giá trị đã định danh:** `Screen/Container/size-screen-width`, `Screen/Container/size-screen-padding`, `Screen/Sidebar/Expanded`, `Screen/Sidebar/Collapsed`, `Screen/Navigation/btn-create-campagin` và style `Grid/Body Layout` có ID ở các phần trên. Dùng đúng tên/giá trị nguồn khi kiểm tra; chưa có ánh xạ CSS token sản phẩm được duyệt cho chúng.
- **Component cần đo theo ngữ cảnh:** Drawer `8454:44595`, dải KPI Dashboard `5627:300576` và các phần tử của Screen Layout/Create Campaign. Chỉ dải KPI có gap binding và cấu trúc panel được đọc chi tiết; không dùng tên một component để suy ra padding, grid binding, variant API, keyboard behavior hoặc dark mode.
- **Code bàn giao:** khi sau này có spec component đủ nguồn, ví dụ cho Dev phải dùng HTML/CSS/JavaScript thuần theo `content/rules/component-code-rules.md`. Trang docs có thể dùng React để trình bày dữ liệu, nhưng React docs không trở thành API component sản phẩm.

## Cần xác nhận trước khi phát hành quy tắc Layout

1. **Mode `1536-lg` / 1563px:** xác nhận giá trị trong Figma là chủ đích hay lỗi nhập. Trong bản nháp này giữ nguyên **1563px** và không dùng làm breakpoint.
2. **Drawer `40%`:** xác nhận vì sao tên 40% đi với hình rộng 480px trên canvas 1920px, trong khi hai variant 70%/90% khớp tỷ lệ viewport; kiểm tra frame cha, ràng buộc và state trước khi viết CSS/spec sản phẩm.
3. **Áp dụng Grid/Body Layout:** xác nhận màn nào gắn style 12 cột, column span và gutter ở tablet/mobile. Không suy từ tên style sang mọi màn.
4. **Screen Layout chung và Dashboard mobile/tablet:** cần node master hoặc frame tương ứng để kiểm tra reflow, số cột và thứ tự nội dung ngoài các frame desktop Create Campaign/Dashboard đã đo.
5. **Sidebar collapsed:** xác nhận vì sao snapshot lưu 84px nhưng frame Create Campaign chat/collapsed đo 60px; hai giá trị chưa thể gộp thành một token.
6. **Breakpoint triển khai:** xác nhận ngưỡng reflow và trạng thái sidebar/navigation giữa các viewport mẫu trước khi phát hành một thang breakpoint hoặc token CSS.

**Giới hạn nguồn:** snapshot variables/styles là bản chụp ngày 02/11/2026; các giá trị hiện hành cần đối chiếu lại nếu Figma đã thay đổi. Figma Local chưa cung cấp công cụ `whoami` trong phiên này để xác minh email tài khoản, nên bài giữ `draft` và không gọi các quyết định còn mở là chuẩn đã duyệt.
