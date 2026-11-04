---
title: Typography
description: Font, thang chữ, text styles và hướng dẫn bàn giao typography của SmartAds Design System.
section: Foundation
updated: 04/11/2026
status: draft
sources:
  - label: Figma SmartAds Design System — Typography
    url: https://www.figma.com/design/cRZ5kIi4kD6j9lh1dbh5mh/SmartAds---Design-System?node-id=68-1746&m=dev
  - label: Figma SmartAds Design System — nguồn của bản export 02/11/2026
    url: https://www.figma.com/design/cRZ5kIi4kD6j9lh1dbh5mh/SmartAds---Design-System?m=dev
---

## Phạm vi và nguồn dữ liệu

Đây là bản **draft** cho typography của giao diện sản phẩm SmartAds. Trang [Typography trong Figma](https://www.figma.com/design/cRZ5kIi4kD6j9lh1dbh5mh/SmartAds---Design-System?node-id=68-1746&m=dev) có các frame `Introduction Typography`, `Typography Term`, `Typography` và `New Update Text Warp Style`; trang được kiểm tra ở chế độ chỉ xem ngày 04/11/2026. Các con số và ID bên dưới lấy từ `variable-figma-export/styles.json` và `variables.text.json` ngày **02/11/2026**. Bản export không tự đồng bộ; cần đọc lại Figma trước khi coi đây là thông số mới nhất.

Bản chụp có **77 text styles**: 62 `Brand/*`, 1 `Code/*` và 14 `Ads/*`; collection `Text` có **21 variables**, một mode tên `Mode 1`. Bảng specimen phía trên được dựng từ cùng bản chụp để nhìn tỷ lệ chữ; đó là bản xem trước trên website tài liệu, không phải gói typography SDS đã phát hành.

## Font family và phạm vi sử dụng

| Nhóm style Figma | Font trong snapshot | Phạm vi có bằng chứng | Ghi chú bàn giao |
| --- | --- | --- | --- |
| `Brand/*` | Public Sans | Hệ chữ Brand trên trang Typography. | Dùng đúng style và weight thực; font của website docs cũng là Public Sans nhưng quy tắc line-height của website khác. |
| `Code/Regular` | DM Mono | Style code duy nhất trong snapshot. | 12px, line-height 140%, letter-spacing 2%; chưa có variable font family trong collection `Text`. |
| `Ads/Merriweather/*` | Merriweather | 10 text styles trong nhóm nội dung quảng cáo. | Không thay font UI sản phẩm bằng font Ads. |
| `Ads/Arial/*` | Arial | 4 text styles trong nhóm nội dung quảng cáo. | Hai style có chữ `bold` trong tên nhưng snapshot lưu `fontName.style = Regular`; cần review trước khi code. |

`typography/family/display` (`VariableID:939:385`) và `typography/family/text` (`VariableID:939:418`) đều có giá trị **Public Sans** trong `Mode 1`. Không suy ra hai vai trò khác font chỉ từ tên biến.

## Thang chữ Brand

Các hàng chuẩn của `Brand/*` có bốn style `Regular`, `Medium`, `Semi`, `Bold`. Weight thực thường là **400 / 500 / 600 / 700**; ngoại lệ `Brand/Body-xl/Semi` ở mục cần review. `letterSpacing` của tất cả style Brand trong bản export là 0%. Figma lưu line-height dạng phần trăm; cột CSS dưới đây quy đổi phần trăm thành tỷ lệ unitless, còn `AUTO` giữ là `normal`.

| Family trong Figma | Cỡ | Line-height Figma | CSS tương ứng | Style ID để truy vết |
| --- | ---: | --- | --- | --- |
| `Brand/Display-2xl/*` | 80px | 120% | `1.2` | `Brand/Display-2xl/Regular`: `S:5adbb060322ac713b01d0fcc8cd36d42865ec06,` |
| `Brand/Display-xl/*` | 60px | 120% | `1.2` | `Brand/Display-xl/Regular`: `S:513bac6b36418c039b62b0e68d7996c7d84154d9,` |
| `Brand/Display-lg/*` | 48px | 120% | `1.2` | `Brand/Display-lg/Regular`: `S:5bf96ab2c4acdc89112db491da63013c70c33528,` |
| `Brand/Display-md/*` | 40px | 120% | `1.2` | `Brand/Display-md/Regular`: `S:fb18d5d3689fe0e44fcfe90f35e0b3c5c05ae489,` |
| `Brand/Display-sm/*` | 32px | 120% | `1.2` | `Brand/Display-sm/Regular`: `S:ed7816188423dd3fc997f1833e3a1b4519314856,` |
| `Brand/Display-xs/*` | 28px | 120%; **Bold = AUTO** | `1.2`; **Bold = `normal`** | `Brand/Display-xs/Bold`: `S:167e0ca8b2ed21371d69aeff68d402c43e09df55,` |
| `Brand/Body-xl/*` | 24px | AUTO | `normal` | `Brand/Body-xl/Semi`: `S:ddb784087e360e74426a2c4394d9b80f93e98a76,` |
| `Brand/Body-lg/*` | 20px | 120% | `1.2` | `Brand/Body-lg/Regular`: `S:1559db1735cb8ff601ef54df41ecd15f46388151,` |
| `Brand/Body-md/*` | 18px | 120% | `1.2` | `Brand/Body-md/Regular`: `S:0ed2258c378f6b602027c49b5ffecfe8893ce99d,` |
| `Brand/Body-sm/*` | 16px | 120% | `1.2` | `Brand/Body-sm/Regular`: `S:939a069401f6cadc4f4ee43177ca87c7fe47db03,` |
| `Brand/Body-xs/*` | 14px | 120% | `1.2` | `Brand/Body-xs/Regular`: `S:90b40f75ada5c72c48f665ca52b50ffe94a0a4fe,` |
| `Brand/Microscope/*` | 13px | 120% | `1.2` | `Brand/Microscope/Regular`: `S:5fd11227e100608895aa1f982e67b5e4a4ccc19f,` |
| `Brand/Body-caption/*` | 12px | 120% | `1.2` | `Brand/Body-caption/Regular`: `S:868ad855b2a11665c24f9a4b409452871d32b07e,` |
| `Brand/Body-caption-sub/*` | 11px | 110% | `1.1` | `Brand/Body-caption-sub/Regular`: `S:cd6f976a7c5a9fd336958c6538084a55cdd28104,` |
| `Brand/Tini/*` | 10px | 120% | `1.2` | `Brand/Tini/Regular`: `S:f61e691953813a3a9420b9ade0bf6ae78094818e,` |

Hai style bổ sung `Brand/Microscope/Semi Balance` (13px, 600, 120%) và `Brand/Body-sm/Bold Balance` (16px, 700, 120%) có trong snapshot. `Balance` là tên style gốc; cần xác nhận ngữ cảnh dùng và thuộc tính cân dòng trước khi đưa vào API triển khai. Tên `Tini` cũng được giữ nguyên theo Figma, chưa tự sửa thành `Tiny`.

## Code và Ads styles

`Code/Regular` (`S:a2a0463c0c370790334972d0b13a83e162f26071,`) dùng **DM Mono Regular 12px**, line-height **140% = 1.4**, letter-spacing **2% = 0.02em**. Snapshot có binding cho `fontSize` và `fontStyle`, không có binding `fontFamily`.

| Nhóm Ads | Cỡ và weight ghi trong snapshot | Line-height |
| --- | --- | --- |
| `Ads/Merriweather/ads-merri-headline-xl-{regular,bold}` | 20px; 400 / 700 | AUTO |
| `Ads/Merriweather/ads-merri-headline-lg-{regular,bold}` | 16px; 400 / 700 | 120% |
| `Ads/Merriweather/ads-merri-headline-md-{regular,bold}` | 14px; 400 / 700 | 120% |
| `Ads/Merriweather/ads-merri-headline-sm-{regular,bold}` | 13px; 400 / 700 | 120% |
| `Ads/Merriweather/ads-merri-subtitle-lg-{regular,bold}` | 12px; 400 / 700 | 120% |
| `Ads/Arial/ads-arial-tini-sm-medium` | 12px; `fontName.style = Medium` | AUTO |
| `Ads/Arial/ads-arial-tini-sm-bold` | 12px; **`fontName.style = Regular`** | AUTO |
| `Ads/Arial/ads-arial-headline-sm-bold` | 14px; **`fontName.style = Regular`** | AUTO |
| `Ads/Arial/ads-arial-headline-md-medium` | 14px; `fontName.style = Medium` | AUTO |

Các style Ads trong snapshot không có `boundVariables`. Không suy ra nhóm Ads đã có token family, size hay weight tương ứng trong collection `Text`.

## Text variables và CSS handover

Các biến cỡ chữ bên dưới là tên **đang có trong Figma**. Tất cả nằm trong collection `Text`, mode `Mode 1` và alias tới biến `typography/text/<số> (size <số>)`; giá trị px ở bảng là giá trị đã giải alias. Tên `fs-xs = 16` lớn hơn `fs-lg = 12`, vì vậy không dùng tên như một thang T-shirt đã được duyệt.

| Figma variable | ID | Giá trị |
| --- | --- | ---: |
| `typography/size/fs-sm` | `VariableID:939:388` | 10px |
| `typography/size/fs-md` | `VariableID:939:394` | 11px |
| `typography/size/fs-lg` | `VariableID:939:395` | 12px |
| `typography/size/fs-xl` | `VariableID:4900:5252` | 13px |
| `typography/size/fs-2xl` | `VariableID:939:396` | 14px |
| `typography/size/fs-xs` | `VariableID:939:397` | 16px |
| `typography/size/fs-xxl` | `VariableID:939:398` | 18px |
| `typography/size/fs-base 1` | `VariableID:939:399` | 20px |
| `typography/size/fs-base 2` | `VariableID:3562:19910` | 24px |
| `typography/size/fs-base 3` | `VariableID:2143:29` | 28px |
| `typography/size/fs-title` | `VariableID:939:400` | 32px |
| `typography/size/fs-body` | `VariableID:939:401` | 40px |
| `typography/size/fs-display 2` | `VariableID:3826:23561` | 48px |
| `typography/size/fs-display` | `VariableID:941:398` | 60px |
| `typography/size/fs-hero` | `VariableID:939:404` | 80px |

Collection còn bốn biến weight: `typography/weight/Regular` (`VariableID:939:419`), `Medium` (`VariableID:1560:1408`), `Semi` (`VariableID:939:420`) và `Bold` (`VariableID:939:421`). Giá trị của chúng là chuỗi cùng tên; khi viết CSS, dùng **weight số thực của text style**, không suy từ chuỗi biến.

Ví dụ ánh xạ **một style đã quan sát**, chưa phải class hay token CSS chính thức của SDS:

```css
/* Brand/Body-sm/Regular · S:939a069401f6cadc4f4ee43177ca87c7fe47db03, */
.example-body-sm {
  font-family: "Public Sans", sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.2;
  letter-spacing: 0;
}
```

Website tài liệu dùng `line-height: 200%` cho nội dung bài và `120%` ở header/sidebar. Đó là quy tắc riêng của **website docs**. Specimen trên trang này hiển thị line-height theo **text style Figma** để designer và developer so sánh, không thay đổi quy tắc chữ của các bài docs khác.

## Kiểm tra khi bàn giao cho developer

1. Chọn **đúng tên và ID text style** trên node thiết kế; kiểm tra font family, weight, line-height, letter-spacing và binding thực tế, nhất là khi tên gợi ra thông số khác.
2. Kiểm tra dấu tiếng Việt, chuỗi dài, xuống dòng và khả năng phóng to chữ trên kích thước màn hình đích. Frame `New Update Text Warp Style` có trong Figma, nhưng chưa được chuyển thành quy tắc overflow chung khi chưa đọc đủ node và trạng thái cụ thể.
3. Kiểm tra màu chữ trên nền thực tế ở Light/Dark; typography style không tự quyết định màu và một tên token màu không chứng minh contrast đạt chuẩn.
4. Dùng đúng font asset và giấy phép trong dự án đích. Website docs hiện chỉ đóng gói Public Sans; DM Mono, Merriweather và Arial trong snapshot không đồng nghĩa website đã đóng gói các font đó.

## Cần phê duyệt hoặc xác nhận

- **D2 — `Tini` hay `Tiny`:** giữ tên Figma hiện tại cho tới khi có quyết định đổi tên và mapping theo ID.
- **D4 — thang cỡ chữ:** chọn thang T-shirt tăng dần hoặc thang tên theo px trước khi phát hành CSS variables; các tên `fs-*` hiện tại không nhất quán.
- **D8 — line-height cho đoạn văn dài:** chưa có quyết định thay 1.2 bằng mức khác; không tự thay trong Figma hoặc code sản phẩm.
- **Sai khác style:** `Brand/Body-xl/Semi` bind weight `Semi` nhưng lưu `fontName.style = Bold` và weight 700; `Brand/Display-xs/Bold` dùng `AUTO`; `Brand/Tini/Medium` thiếu binding `fontSize`; hai style `Balance` thiếu binding `fontStyle`; hai style Ads/Arial mang tên `bold` lưu `Regular`. Snapshot không ghi binding `lineHeight` cho cả 77 styles.
- **Nguồn hiện tại:** cần đối chiếu lại toàn bộ 77 style và 21 variable qua Figma Local trước khi nâng trang từ `draft` hoặc phát hành mapping token. Việc xem trang Typography chỉ xác nhận cấu trúc trang, chưa xác nhận từng giá trị trong bản export vẫn còn mới.
