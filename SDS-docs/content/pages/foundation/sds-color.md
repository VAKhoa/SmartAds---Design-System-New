---
title: Colors
description: Bảng màu, vai trò token và cách kiểm tra Light/Dark của SmartAds Design System.
section: Foundation
updated: 04/11/2026
status: draft
sources:
  - label: Figma SmartAds Design System — Color
    url: https://www.figma.com/design/cRZ5kIi4kD6j9lh1dbh5mh/SmartAds---Design-System?node-id=55-153&m=dev
  - label: Figma SmartAds Design System — toàn bộ file
    url: https://www.figma.com/design/cRZ5kIi4kD6j9lh1dbh5mh/SmartAds---Design-System?m=dev
  - label: WCAG 2.2 — Contrast Minimum
    url: https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum
---

## Phạm vi và trạng thái

Đây là tài liệu **draft** của hệ màu SDS. Trang Color trong Figma (`55:153`) hiện có ba phần: ví dụ kiểm tra contrast (`11898:82644`), bảng Primitives Color (`11898:82732`) và Gradient (`11898:82872`). Bảng Figma là minh họa trực quan; danh mục variable bên dưới lấy từ các collection thật, không suy ra chỉ từ số ô màu trên canvas.

Ngày 04/11/2026, tôi đọc trực tiếp Figma và thấy **191 color variables** trong collection `Primitives ` (mode `Value`), **293 color variables** trong `Alias` (hai mode `Accessible (Light Mode)` và `Accessible (Dark Mode)`), cùng **7 paint styles dạng linear gradient**. Các bảng đầy đủ cuối trang được dựng từ bản export ngày 02/11/2026 trong `SDS-docs/variable-figma-export/`. Toàn bộ **484 ID, tên và giá trị màu đã giải alias theo mode** trong export được đối chiếu với Figma ngày 04/11/2026 và khớp. Export vẫn là snapshot, không tự cập nhật khi Figma đổi.

`#048845` là `color/primary/500` (`VariableID:6:28`) và là màu primary đã được chốt cho website SDS. Nhiều tên khác vẫn phản ánh lịch sử thiết kế và chưa được chuẩn hóa; bảng này mô tả **tên đang tồn tại**, không phê duyệt một hệ đặt tên mới.

## Cách chọn màu khi thiết kế và lập trình

1. **Bắt đầu từ vai trò**: chọn variable trong `Alias` theo mục đích như `background/*`, `surface/*`, `text/*`, `border/*` hoặc `component/*`. Kiểm tra cả Light và Dark.
2. **Dùng token component khi có**: ví dụ nút chính đã có `component/button/surface/primary-accent/default`. Đừng tự lấy token của một component khác để dùng lại.
3. **Tra Primitives để hiểu giá trị gốc**: `color/primary/500` giải ra `#048845`. Primitives là nguồn của alias; không coi một bước màu gốc là quyết định dùng cho mọi bối cảnh.
4. **Kiểm tra cặp màu thực tế**: contrast phụ thuộc foreground, background, mode và state. Tên token riêng lẻ không chứng minh được khả năng đọc.
5. **Giữ tên gốc khi tra cứu**: các tên như `sematic/*`, `background/sucess`, `primary-press` và `primary-disable` đang có trong Figma. Đề xuất sửa tên phải qua `tokens/rename-map.json` và review trước khi áp dụng.

Ví dụ quan hệ đã kiểm chứng: `surface/primary` → `color/primary/500` → `#048845` ở cả hai mode. `surface/primary-hover` dùng `color/primary/600` ở Light nhưng `color/primary/700` ở Dark. Như vậy **không được giả định alias giữ nguyên bước màu giữa các mode**.

## Màu thương hiệu và trạng thái chính

| Token đang có trong Figma | Light | Dark | ID / ghi chú |
| --- | --- | --- | --- |
| `color/primary/500` | `#048845` | Cùng một giá trị gốc | `VariableID:6:28` |
| `surface/primary` | `#048845` | `#048845` | `VariableID:50:113` |
| `surface/primary-hover` | `#047C3F` | `#036131` | `VariableID:50:114` |
| `surface/primary-press` | `#036131` | `#024B26` | `VariableID:50:115` |
| `surface/primary-disable` | `#F7F7F8` | `#CBCFD3` | `VariableID:50:116`; không tự suy ra màu chữ disabled |
| `border/primary` | `#048845` | `#048845` | `VariableID:150:705` |
| `component/button/surface/primary-accent/default` | `#048845` | `#048845` | `VariableID:4865:59700` |

Tên CSS nếu xuất từ **tên Figma hiện tại** theo quy tắc tiền tố đã duyệt sẽ có dạng `--sa-surface-primary`, `--sa-surface-primary-hover`. Đây là quy tắc chuyển tên, chưa phải cam kết mọi token đã được phát hành thành gói CSS sản phẩm.

## Nền, chữ và đường viền theo mode

| Vai trò quan sát được | Light | Dark | Lưu ý sử dụng |
| --- | --- | --- | --- |
| `background/neutral` | `#FFFFFF` | `#000000` | Nền trung tính gốc theo hai mode. |
| `background/secondary` | `#F0F0F0` | `#1F1F1F` | Nền phụ; alias đến hai bước khác nhau của `secondary dark`. |
| `surface/elevation` | `#FCFCFD` | `#5E5F61` | Bề mặt nâng; kiểm tra foreground thực tế. |
| `text/secondary` | `#7B7D80` | `#DFE3E8` | Chữ phụ; không dùng cho thông tin chính nếu contrast chưa đạt. |
| `text/on-primary-white` | `#FCFCFD` | `#FFFFFF` | Chữ sáng dự kiến trên nền primary; xem cảnh báo contrast bên dưới. |
| `border/secondary-muted` | `#E8E8E8` | `#636363` | Viền phụ, cần kiểm tra vai trò thông tin. |

Collection `Alias` hiện có 8 `background`, 30 `surface`, 37 `text`, 27 `border`, 4 `foreground`, 26 `overlay`, 6 `chart`, 147 `component` và 8 `sematic` color variables. Các nhóm component chứa icon, button và nhiều thành phần khác; bảng đầy đủ ở cuối trang giữ nguyên tên và giá trị theo từng mode để tra cứu.

## Contrast và khả năng đọc

Trang Figma có ví dụ logo, chữ thường, chữ lớn và component trên nền sáng. Ví dụ `#048845` trên `#FFFFFF` có tỷ lệ tính được **4,55:1**, khớp số trình bày trong Figma. Theo [WCAG 2.2, tiêu chí 1.4.3](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum), chữ thường cần ít nhất **4,5:1** ở mức AA; chữ lớn cần **3:1**. [Tiêu chí 1.4.11](https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast) dùng **3:1** cho thành phần đồ họa/điều khiển cần nhận biết. Logo thương hiệu có ngoại lệ riêng trong tiêu chí chữ; ví dụ logo trên canvas chỉ là minh họa kiểm tra.

| Cặp đã tính từ giá trị hiện có | Tỷ lệ | Kết luận cho chữ thường AA |
| --- | ---: | --- |
| `#048845` trên `#FFFFFF` | `4,55:1` | Đạt, sát ngưỡng. |
| `text/on-primary-white` Light `#FCFCFD` trên `surface/primary` `#048845` | `4,44:1` | **Chưa đạt** 4,5:1; cần review cách ghép token hoặc giá trị. |
| `text/secondary` Light `#7B7D80` trên `background/neutral` `#FFFFFF` | `4,13:1` | **Chưa đạt** cho chữ thường. |
| `text/secondary` Dark `#DFE3E8` trên `background/neutral` `#000000` | `16,29:1` | Đạt cho cặp được đo. |

Các tỷ lệ trên được tính từ hex giải alias trong export, không phải kết quả audit mọi màn hình. Với lớp alpha, gradient, ảnh hoặc background thực tế khác, phải đo lại trên bối cảnh sử dụng. Không làm tròn giá trị dưới 4,5 lên thành đạt. Chưa đổi Figma vì các điều chỉnh token cần được review.

## Gradient

Figma có 7 paint styles `GRADIENT_LINEAR`, được kiểm tra lại ngày 04/11/2026. Chúng không phải một hex đơn và không nên được mô tả như color variable. Các tên hiện có: `Gradient/gradient-linear-avatar`, `Gradient/gradient-linear-neutral`, `Gradient/gradient-linear-dark`, `Gradient/gradient-linear-primary`, `Gradient/gradient-linear-ai-dina`, `Gradient/gradient-linear-blur-chatDina`, `Gradient/gradient-linear-siver`. Tên `siver` là tên nguồn hiện tại, cần review nếu đổi thành `silver`. Xem frame [Gradient trong Figma](https://www.figma.com/design/cRZ5kIi4kD6j9lh1dbh5mh/SmartAds---Design-System?node-id=11898-82872&m=dev) và `variable-figma-export/styles.json` để tra style ID, stops, opacity, transform chính xác.

## Danh mục màu gốc

Bảng dưới giữ nguyên **191 tên và giá trị** từ `variables.primitives.json` ngày 02/11/2026. Màu alpha ghi 8 chữ số hex. Đây là bảng tra cứu, không phải hướng dẫn lấy Primitive trực tiếp cho UI.

### base (3)

| Figma variable | Value |
| --- | --- |
| `color/base/black` | `#000000` |
| `color/base/black-weak` | `#3C4043` |
| `color/base/white` | `#FFFFFF` |

### blue (10)

| Figma variable | Value |
| --- | --- |
| `color/blue/100` | `#C3CFFA` |
| `color/blue/200` | `#A6B7F8` |
| `color/blue/300` | `#7D96F5` |
| `color/blue/400` | `#6482F3` |
| `color/blue/50` | `#ECEFFE` |
| `color/blue/500` | `#3D63F0` |
| `color/blue/600` | `#385ADA` |
| `color/blue/700` | `#2B46AA` |
| `color/blue/800` | `#223684` |
| `color/blue/900` | `#1A2A65` |

### brand (8)

| Figma variable | Value |
| --- | --- |
| `color/brand/fpt/Color-F-20%` | `#1169B033` |
| `color/brand/fpt/Color-P-20%` | `#F2722733` |
| `color/brand/fpt/Color-T-20%` | `#16B14B33` |
| `color/brand/fpt/F` | `#1169B0` |
| `color/brand/fpt/P` | `#F27227` |
| `color/brand/fpt/T` | `#16B14B` |
| `color/brand/smartads/text-logo` | `#637381` |
| `color/brand/smartads/text-powered` | `#919EAB` |

### gray (10)

| Figma variable | Value |
| --- | --- |
| `color/gray/100` | `#F7F7F8` |
| `color/gray/200` | `#F0F2F4` |
| `color/gray/300` | `#EAECF0` |
| `color/gray/400` | `#E5E9ED` |
| `color/gray/50` | `#FCFCFD` |
| `color/gray/500` | `#DFE3E8` |
| `color/gray/600` | `#CBCFD3` |
| `color/gray/700` | `#9EA1A5` |
| `color/gray/800` | `#7B7D80` |
| `color/gray/900` | `#5E5F61` |

### green (10)

| Figma variable | Value |
| --- | --- |
| `color/green/100` | `#BAE0B7` |
| `color/green/200` | `#99D194` |
| `color/green/300` | `#6BBB63` |
| `color/green/400` | `#4EAE45` |
| `color/green/50` | `#ECFFEA` |
| `color/green/500` | `#229A16` |
| `color/green/600` | `#1F8C14` |
| `color/green/700` | `#186D10` |
| `color/green/800` | `#13550C` |
| `color/green/900` | `#0E4109` |

### green light (3)

| Figma variable | Value |
| --- | --- |
| `color/green light/100` | `#EDFEEC` |
| `color/green light/200` | `#DFFCDD` |
| `color/green light/50` | `#F4FFF4` |

### opacity (69)

| Figma variable | Value |
| --- | --- |
| `color/opacity/black/0` | `#00000000` |
| `color/opacity/black/10` | `#0000001A` |
| `color/opacity/black/16` | `#00000029` |
| `color/opacity/black/18` | `#0000002E` |
| `color/opacity/black/2` | `#00000005` |
| `color/opacity/black/20` | `#00000033` |
| `color/opacity/black/4` | `#0000000A` |
| `color/opacity/black/40` | `#00000066` |
| `color/opacity/black/6` | `#0000000F` |
| `color/opacity/black/60` | `#00000099` |
| `color/opacity/black/8` | `#00000014` |
| `color/opacity/blue/0` | `#3D63F000` |
| `color/opacity/blue/10` | `#3D63F01A` |
| `color/opacity/blue/15` | `#3D63F026` |
| `color/opacity/blue/20` | `#3D63F033` |
| `color/opacity/blue/8` | `#3D63F014` |
| `color/opacity/gray/0` | `#5E5F6100` |
| `color/opacity/gray/10` | `#5E5F611A` |
| `color/opacity/gray/15` | `#5E5F6126` |
| `color/opacity/gray/20` | `#5E5F6133` |
| `color/opacity/gray/25` | `#5E5F6140` |
| `color/opacity/gray/8` | `#5E5F6114` |
| `color/opacity/gray/80` | `#5E5F61CC` |
| `color/opacity/gray/85` | `#5E5F61D9` |
| `color/opacity/gray/90` | `#5E5F61E5` |
| `color/opacity/green/0` | `#229A1600` |
| `color/opacity/green/10` | `#229A161A` |
| `color/opacity/green/15` | `#229A1626` |
| `color/opacity/green/20` | `#229A1633` |
| `color/opacity/green/8` | `#229A1614` |
| `color/opacity/primary/0` | `#04884500` |
| `color/opacity/primary/10` | `#0488451A` |
| `color/opacity/primary/15` | `#04884526` |
| `color/opacity/primary/20` | `#04884533` |
| `color/opacity/primary/25` | `#04884540` |
| `color/opacity/primary/30` | `#0488454D` |
| `color/opacity/primary/4` | `#0488450A` |
| `color/opacity/primary/50` | `#04884580` |
| `color/opacity/primary/70` | `#048845B2` |
| `color/opacity/primary/75` | `#048845BF` |
| `color/opacity/primary/8` | `#04884514` |
| `color/opacity/primary/80` | `#048845CC` |
| `color/opacity/primary/85` | `#048845D9` |
| `color/opacity/primary/90` | `#048845E5` |
| `color/opacity/red/0` | `#E33E3200` |
| `color/opacity/red/10` | `#E33E321A` |
| `color/opacity/red/15` | `#E33E3226` |
| `color/opacity/red/20` | `#E33E3233` |
| `color/opacity/red/25` | `#E33E3240` |
| `color/opacity/red/30` | `#E33E324D` |
| `color/opacity/red/50` | `#E33E3280` |
| `color/opacity/red/70` | `#E33E32B2` |
| `color/opacity/red/75` | `#E33E32BF` |
| `color/opacity/red/8` | `#E33E3214` |
| `color/opacity/red/80` | `#E33E32CC` |
| `color/opacity/red/85` | `#E33E32D9` |
| `color/opacity/red/90` | `#E33E32E5` |
| `color/opacity/white/0` | `#FFFFFF00` |
| `color/opacity/white/10` | `#FFFFFF1A` |
| `color/opacity/white/16` | `#FFFFFF29` |
| `color/opacity/white/18` | `#FFFFFF2E` |
| `color/opacity/white/2` | `#FFFFFF05` |
| `color/opacity/white/4` | `#FFFFFF0A` |
| `color/opacity/white/8` | `#FFFFFF14` |
| `color/opacity/yellow/0` | `#FAAD1400` |
| `color/opacity/yellow/10` | `#FAAD141A` |
| `color/opacity/yellow/15` | `#FAAD1426` |
| `color/opacity/yellow/20` | `#FAAD1433` |
| `color/opacity/yellow/8` | `#FAAD1414` |

### orange (10)

| Figma variable | Value |
| --- | --- |
| `color/orange/100` | `#FFDFB4` |
| `color/orange/200` | `#FFD090` |
| `color/orange/300` | `#FFBA5D` |
| `color/orange/400` | `#FFAD3D` |
| `color/orange/50` | `#FFF5E7` |
| `color/orange/500` | `#FF980D` |
| `color/orange/600` | `#E88A0C` |
| `color/orange/700` | `#B56C09` |
| `color/orange/800` | `#8C5407` |
| `color/orange/900` | `#6B4005` |

### primary (10)

| Figma variable | Value |
| --- | --- |
| `color/primary/100` | `#B1DAC5` |
| `color/primary/200` | `#8CC8A9` |
| `color/primary/300` | `#57AF82` |
| `color/primary/400` | `#36A06A` |
| `color/primary/50` | `#E6F3EC` |
| `color/primary/500` | `#048845` |
| `color/primary/600` | `#047C3F` |
| `color/primary/700` | `#036131` |
| `color/primary/800` | `#024B26` |
| `color/primary/900` | `#02391D` |

### red dark (10)

| Figma variable | Value |
| --- | --- |
| `color/red dark/100` | `#F3B8BA` |
| `color/red dark/200` | `#ED9598` |
| `color/red dark/300` | `#E4656A` |
| `color/red dark/400` | `#DF474D` |
| `color/red dark/50` | `#FBE8E9` |
| `color/red dark/500` | `#D71920` |
| `color/red dark/600` | `#C4171D` |
| `color/red dark/700` | `#991217` |
| `color/red dark/800` | `#760E12` |
| `color/red dark/900` | `#5A0B0D` |

### red light (10)

| Figma variable | Value |
| --- | --- |
| `color/red light/100` | `#F6C3BF` |
| `color/red light/200` | `#F2A6A1` |
| `color/red light/300` | `#EC7E76` |
| `color/red light/400` | `#E9655B` |
| `color/red light/50` | `#FCECEB` |
| `color/red light/500` | `#E33E32` |
| `color/red light/600` | `#CF382E` |
| `color/red light/700` | `#A12C24` |
| `color/red light/800` | `#7D221C` |
| `color/red light/900` | `#5F1A15` |

### secondary dark (12)

| Figma variable | Value |
| --- | --- |
| `color/secondary dark/10` | `#FDFDFD` |
| `color/secondary dark/100` | `#E8E8E8` |
| `color/secondary dark/200` | `#E1E1E1` |
| `color/secondary dark/30` | `#F4F6F5` |
| `color/secondary dark/300` | `#CECECE` |
| `color/secondary dark/400` | `#BBBBBB` |
| `color/secondary dark/50` | `#F0F0F0` |
| `color/secondary dark/500` | `#8C8C8C` |
| `color/secondary dark/600` | `#828282` |
| `color/secondary dark/700` | `#636363` |
| `color/secondary dark/800` | `#3C3C3C` |
| `color/secondary dark/900` | `#1F1F1F` |

### secondary light (10)

| Figma variable | Value |
| --- | --- |
| `color/secondary light/100` | `#D6E8E7` |
| `color/secondary light/200` | `#C3DDDB` |
| `color/secondary light/300` | `#A7CDCB` |
| `color/secondary light/400` | `#96C3C1` |
| `color/secondary light/50` | `#F2F8F7` |
| `color/secondary light/500` | `#7CB4B1` |
| `color/secondary light/600` | `#71A4A1` |
| `color/secondary light/700` | `#58807E` |
| `color/secondary light/800` | `#446361` |
| `color/secondary light/900` | `#344C4A` |

### semantic tokens (6)

| Figma variable | Value |
| --- | --- |
| `color/semantic tokens/color-ai-2light-blue` | `#CCE8FE` |
| `color/semantic tokens/color-ai-light-blue` | `#CDF1FF` |
| `color/semantic tokens/color-ai-pink` | `#CDA0FF` |
| `color/semantic tokens/color-ai-purple` | `#8489F5` |
| `color/semantic tokens/color-ai-violet` | `#B591E9` |
| `color/semantic tokens/color-ai-white` | `#F6F8FA` |

### yellow (10)

| Figma variable | Value |
| --- | --- |
| `color/yellow/100` | `#FDE6B6` |
| `color/yellow/200` | `#FDD993` |
| `color/yellow/300` | `#FCC862` |
| `color/yellow/400` | `#FBBD43` |
| `color/yellow/50` | `#FFF7E8` |
| `color/yellow/500` | `#FAAD14` |
| `color/yellow/600` | `#E49D12` |
| `color/yellow/700` | `#B27B0E` |
| `color/yellow/800` | `#8A5F0B` |
| `color/yellow/900` | `#694908` |

## Danh mục Alias theo Light và Dark

293 variables trong `variables.alias.json` (snapshot 02/11/2026). Cột `Nguồn Light / Dark` giữ tên alias gốc nếu variable trỏ tới Primitive; dấu `-` nghĩa là Figma lưu giá trị trực tiếp. Đây là dữ liệu quan sát, không phải tên đã được chuẩn hóa.

### background (8)

| Figma variable | Light | Dark | Nguồn Light / Dark |
| --- | --- | --- | --- |
| `background/default` | `#F7F7F8` | `#F7F7F8` | `color/gray/100` / `color/gray/100` |
| `background/gray` | `#F7F7F8` | `#5E5F61` | `color/gray/100` / `color/gray/900` |
| `background/inverse` | `#000000` | `#FFFFFF` | `color/base/black` / `color/base/white` |
| `background/neutral` | `#FFFFFF` | `#000000` | `color/base/white` / `color/base/black` |
| `background/primary-selected` | `#E6F3EC` | `#024B26` | `color/primary/50` / `color/primary/800` |
| `background/secondary` | `#F0F0F0` | `#1F1F1F` | `color/secondary dark/50` / `color/secondary dark/900` |
| `background/secondary-inverse` | `#1F1F1F` | `#F0F0F0` | `color/secondary dark/900` / `color/secondary dark/50` |
| `background/sucess` | `#ECFFEA` | `#13550C` | `color/green/50` / `color/green/800` |

### border (27)

| Figma variable | Light | Dark | Nguồn Light / Dark |
| --- | --- | --- | --- |
| `border/black` | `#000000` | `#000000` | `color/base/black` / `color/base/black` |
| `border/error` | `#E33E32` | `#E33E32` | `color/red light/500` / `color/red light/500` |
| `border/error-disable` | `#F6C3BF` | `#7D221C` | `color/red light/100` / `color/red light/800` |
| `border/error-muted` | `#F2A6A1` | `#5F1A15` | `color/red light/200` / `color/red light/900` |
| `border/gray` | `#F0F2F4` | `#F0F2F4` | `color/gray/200` / `color/gray/200` |
| `border/gray-hover` | `#CBCFD3` | `#CBCFD3` | `color/gray/600` / `color/gray/600` |
| `border/gray-muted` | `#EAECF0` | `#5E5F61` | `color/gray/300` / `color/gray/900` |
| `border/gray-stronger` | `#DFE3E8` | `#DFE3E8` | `color/gray/500` / `color/gray/500` |
| `border/info` | `#3D63F0` | `#3D63F0` | `color/blue/500` / `color/blue/500` |
| `border/info-disable` | `#C3CFFA` | `#223684` | `color/blue/100` / `color/blue/800` |
| `border/info-muted` | `#A6B7F8` | `#1A2A65` | `color/blue/200` / `color/blue/900` |
| `border/primary` | `#048845` | `#048845` | `color/primary/500` / `color/primary/500` |
| `border/primary-disable` | `#DFE3E8` | `#036131` | `color/gray/500` / `color/primary/700` |
| `border/primary-hover` | `#036131` | `#036131` | `color/primary/700` / `color/primary/700` |
| `border/primary-muted` | `#8CC8A9` | `#036131` | `color/primary/200` / `color/primary/700` |
| `border/primary-opacity-haf` | `#0488454D` | `#0488454D` | `color/opacity/primary/30` / `color/opacity/primary/30` |
| `border/primary-press` | `#E6F3EC` | `#F2F8F7` | `color/primary/50` / `color/secondary light/50` |
| `border/secondary` | `#8C8C8C` | `#8C8C8C` | `color/secondary dark/500` / `color/secondary dark/500` |
| `border/secondary-disable` | `#E1E1E1` | `#3C3C3C` | `color/secondary dark/200` / `color/secondary dark/800` |
| `border/secondary-hover` | `#636363` | `#CECECE` | `color/secondary dark/700` / `color/secondary dark/300` |
| `border/secondary-muted` | `#E8E8E8` | `#636363` | `color/secondary dark/100` / `color/secondary dark/700` |
| `border/success` | `#229A16` | `#229A16` | `color/green/500` / `color/green/500` |
| `border/success-disable` | `#BAE0B7` | `#13550C` | `color/green/100` / `color/green/800` |
| `border/success-muted` | `#99D194` | `#0E4109` | `color/green/200` / `color/green/900` |
| `border/warning` | `#FAAD14` | `#FAAD14` | `color/yellow/500` / `color/yellow/500` |
| `border/warning-muted` | `#FDD993` | `#FDD993` | `color/yellow/200` / `color/yellow/200` |
| `border/white` | `#FFFFFF` | `#FFFFFF` | `color/base/white` / `color/base/white` |

### chart (6)

| Figma variable | Light | Dark | Nguồn Light / Dark |
| --- | --- | --- | --- |
| `chart/heatmap-level-0` | `#F7F7F8` | `#FFFFFF` | `color/gray/100` / `-` |
| `chart/heatmap-level-1` | `#E6F3EC` | `#FFFFFF` | `color/primary/50` / `-` |
| `chart/heatmap-level-2` | `#B1DAC5` | `#FFFFFF` | `color/primary/100` / `-` |
| `chart/heatmap-level-3` | `#8CC8A9` | `#FFFFFF` | `color/primary/200` / `-` |
| `chart/heatmap-level-4` | `#57AF82` | `#FFFFFF` | `color/primary/300` / `-` |
| `chart/heatmap-level-5` | `#36A06A` | `#FFFFFF` | `color/primary/400` / `-` |

### component (147)

| Figma variable | Light | Dark | Nguồn Light / Dark |
| --- | --- | --- | --- |
| `component/avatar/border-contrast` | `#0000001A` | `#FFFFFF1F` | `color/opacity/black/10` / `-` |
| `component/badge/info/border-action` | `#3D63F0` | `#FFFFFF` | `color/blue/500` / `-` |
| `component/badge/info/border-rest` | `#C3CFFA` | `#FFFFFF` | `color/blue/100` / `-` |
| `component/badge/info/surface-action` | `#3D63F0` | `#FFFFFF` | `color/blue/500` / `-` |
| `component/badge/info/surface-rest` | `#ECEFFE` | `#FFFFFF` | `color/blue/50` / `-` |
| `component/badge/info/text-info` | `#3D63F0` | `#FFFFFF` | `color/blue/500` / `-` |
| `component/badge/primary/surface-primary` | `#04884514` | `#FFFFFF` | `color/opacity/primary/8` / `-` |
| `component/badge/sucess/surface-success` | `#229A16` | `#FFFFFF` | `color/green/500` / `-` |
| `component/button group/group-icon-default` | `#3C3C3C` | `#3C3C3C` | `color/secondary dark/800` / `color/secondary dark/800` |
| `component/button group/group-text` | `#3C4043` | `#3C4043` | `color/base/black-weak` / `color/base/black-weak` |
| `component/button/border/danger/default` | `#E33E32` | `#D71920` | `color/red light/500` / `color/red dark/500` |
| `component/button/border/danger/subtle` | `#F6C3BF` | `#F3B8BA` | `color/red light/100` / `color/red dark/100` |
| `component/button/border/focus/focus` | `#8CC8A9` | `#8CC8A9` | `color/primary/200` / `color/primary/200` |
| `component/button/border/info/default` | `#3D63F0` | `#3D63F0` | `color/blue/500` / `color/blue/500` |
| `component/button/border/info/subtle` | `#C3CFFA` | `#C3CFFA` | `color/blue/100` / `color/blue/100` |
| `component/button/border/link/default` | `#3D63F0` | `#3D63F0` | `color/blue/500` / `color/blue/500` |
| `component/button/border/link/subtle` | `#DFE3E8` | `#DFE3E8` | `color/gray/500` / `color/gray/500` |
| `component/button/border/primary/default` | `#048845` | `#048845` | `color/primary/500` / `color/primary/500` |
| `component/button/border/primary/select` | `#B1DAC5` | `#B1DAC5` | `color/primary/100` / `color/primary/100` |
| `component/button/border/secondary/default` | `#DFE3E8` | `#DFE3E8` | `color/gray/500` / `color/gray/500` |
| `component/button/border/secondary/sub` | `#CBCFD3` | `#CBCFD3` | `color/gray/600` / `color/gray/600` |
| `component/button/border/success/default` | `#229A16` | `#229A16` | `color/green/500` / `color/green/500` |
| `component/button/border/success/subtle` | `#BAE0B7` | `#BAE0B7` | `color/green/100` / `color/green/100` |
| `component/button/border/warning/default` | `#FAAD14` | `#FAAD14` | `color/yellow/500` / `color/yellow/500` |
| `component/button/border/warning/subtle` | `#FDE6B6` | `#FDE6B6` | `color/yellow/100` / `color/yellow/100` |
| `component/button/split button/opacity-line` | `#36A06A` | `#36A06A` | `color/primary/400` / `color/primary/400` |
| `component/button/split button/surface-hover` | `#047C3F` | `#047C3F` | `color/primary/600` / `color/primary/600` |
| `component/button/surface/danger/default` | `#E33E32` | `#E33E32` | `color/red light/500` / `color/red light/500` |
| `component/button/surface/danger/subtle` | `#FCECEB` | `#FCECEB` | `color/red light/50` / `color/red light/50` |
| `component/button/surface/gray/default` | `#EAECF0` | `#EAECF0` | `color/gray/300` / `color/gray/300` |
| `component/button/surface/info/default` | `#3D63F0` | `#3D63F0` | `color/blue/500` / `color/blue/500` |
| `component/button/surface/info/subtle` | `#ECEFFE` | `#ECEFFE` | `color/blue/50` / `color/blue/50` |
| `component/button/surface/integrity/link-default` | `#F2F5FF` | `#FFFFFF` | `-` / `-` |
| `component/button/surface/integrity/tertiary-fg` | `#FDFDFD` | `#FDFDFD` | `color/secondary dark/10` / `color/secondary dark/10` |
| `component/button/surface/integrity/tertiary-fg-hover` | `#3C3C3C` | `#3C3C3C` | `color/secondary dark/800` / `color/secondary dark/800` |
| `component/button/surface/primary-accent/default` | `#048845` | `#048845` | `color/primary/500` / `color/primary/500` |
| `component/button/surface/primary-subdued/default` | `#DFFCDD` | `#DFFCDD` | `color/green light/200` / `color/green light/200` |
| `component/button/surface/primary-subdued/select` | `#F4FFF4` | `#F4FFF4` | `color/green light/50` / `color/green light/50` |
| `component/button/surface/secondary/default` | `#FFFFFF` | `#FFFFFF` | `color/base/white` / `color/base/white` |
| `component/button/surface/secondary/link-subtle` | `#F7F7F8` | `#F7F7F8` | `color/gray/100` / `color/gray/100` |
| `component/button/surface/warning/default` | `#FAAD14` | `#FAAD14` | `color/yellow/500` / `color/yellow/500` |
| `component/button/surface/warning/subtle` | `#FFF7E8` | `#FFF7E8` | `color/yellow/50` / `color/yellow/50` |
| `component/card/card-default` | `#FFFFFF` | `#FFFFFF` | `color/base/white` / `color/base/white` |
| `component/card/card-hover` | `#F7F7F8` | `#F7F7F8` | `color/gray/100` / `color/gray/100` |
| `component/checkbox/default` | `#FFFFFF` | `#000000` | `color/base/white` / `color/base/black` |
| `component/checkbox/disable` | `#F7F7F8` | `#5E5F61` | `surface/primary-disable` / `color/gray/900` |
| `component/checkbox/enable` | `#048845` | `#024B26` | `surface/primary` / `color/primary/800` |
| `component/checkbox/hover` | `#047C3F` | `#9EA1A5` | `surface/primary-hover` / `color/gray/700` |
| `component/chips/border` | `#04884514` | `#04884514` | `color/opacity/primary/8` / `color/opacity/primary/8` |
| `component/chips/hover` | `#F7F7F8` | `#5E5F61` | `color/gray/100` / `surface/elevation` |
| `component/chips/press` | `#EAECF0` | `#EAECF0` | `color/gray/300` / `color/gray/300` |
| `component/chips/selected` | `#0488451A` | `#0488451A` | `color/opacity/primary/10` / `color/opacity/primary/10` |
| `component/creative assets/border-asset` | `#B2EFAC` | `#B2EFAC` | `-` / `-` |
| `component/creative assets/surface-asset` | `#ECFFEA` | `#ECFFEA` | `-` / `-` |
| `component/digital verify code/default` | `#FFFFFF` | `#FFFFFF` | `color/base/white` / `-` |
| `component/digital verify code/hover` | `#F7F7F8` | `#FFFFFF` | `color/gray/100` / `-` |
| `component/divider/dashed-divider-default` | `#DFE3E8` | `#FFFFFF` | `color/gray/500` / `-` |
| `component/divider/dashed-divider-strong` | `#CBCFD3` | `#FFFFFF` | `color/gray/600` / `-` |
| `component/divider/divider-bland` | `#FCFCFD` | `#1F1F1F` | `color/gray/50` / `color/secondary dark/900` |
| `component/divider/divider-default` | `#F0F2F4` | `#1F1F1F` | `color/gray/200` / `color/secondary dark/900` |
| `component/divider/divider-strong` | `#E5E9ED` | `#1F1F1F` | `color/gray/400` / `color/secondary dark/900` |
| `component/divider/divider-subtle` | `#F7F7F8` | `#1F1F1F` | `color/gray/100` / `color/secondary dark/900` |
| `component/icon/common/accent` | `#3D63F0` | `#3D63F0` | `color/blue/500` / `color/blue/500` |
| `component/icon/common/accent-hover` | `#385ADA` | `#7D96F5` | `color/blue/600` / `color/blue/300` |
| `component/icon/common/accent-muted` | `#A6B7F8` | `#2B46AA` | `color/blue/200` / `color/blue/700` |
| `component/icon/common/accent-pressed` | `#2B46AA` | `#A6B7F8` | `color/blue/700` / `color/blue/200` |
| `component/icon/common/danger` | `#E33E32` | `#E33E32` | `color/red light/500` / `color/red light/500` |
| `component/icon/common/danger-disable` | `#F6C3BF` | `#7D221C` | `color/red light/100` / `color/red light/800` |
| `component/icon/common/danger-muted` | `#F2A6A1` | `#5F1A15` | `color/red light/200` / `color/red light/900` |
| `component/icon/common/info` | `#3D63F0` | `#3D63F0` | `color/blue/500` / `color/blue/500` |
| `component/icon/common/info-disable` | `#C3CFFA` | `#223684` | `color/blue/100` / `color/blue/800` |
| `component/icon/common/info-muted` | `#ECEFFE` | `#1A2A65` | `color/blue/50` / `color/blue/900` |
| `component/icon/common/link` | `#7D96F5` | `#7D96F5` | `color/blue/300` / `color/blue/300` |
| `component/icon/common/link-hover` | `#6482F3` | `#6482F3` | `color/blue/400` / `color/blue/400` |
| `component/icon/common/on-primary` | `#7B7D80` | `#FFFFFF` | `color/gray/800` / `color/base/white` |
| `component/icon/common/on-secondary` | `#3C3C3C` | `#3C3C3C` | `color/secondary dark/800` / `color/secondary dark/800` |
| `component/icon/common/on-white` | `#F0F0F0` | `#F0F0F0` | `color/secondary dark/50` / `color/secondary dark/50` |
| `component/icon/common/primary` | `#9EA1A5` | `#CBCFD3` | `color/gray/700` / `color/gray/600` |
| `component/icon/common/primary-black-inverse` | `#000000` | `#FFFFFF` | `color/base/black` / `color/base/white` |
| `component/icon/common/primary-disable` | `#CBCFD3` | `#5E5F61` | `color/gray/600` / `color/gray/900` |
| `component/icon/common/primary-green` | `#048845` | `#FFFFFF` | `color/primary/500` / `color/base/white` |
| `component/icon/common/primary-inverse` | `#000000` | `#FFFFFF` | `color/base/black` / `color/base/white` |
| `component/icon/common/primary-neutral` | `#FFFFFF` | `#000000` | `color/base/white` / `color/base/black` |
| `component/icon/common/primary-weak-inverse` | `#3C4043` | `#FFFFFF` | `color/base/black-weak` / `color/base/white` |
| `component/icon/common/secondary` | `#7B7D80` | `#EAECF0` | `color/gray/800` / `color/gray/300` |
| `component/icon/common/secondary-black (main)` | `#1F1F1F` | `#FFFFFF` | `color/secondary dark/900` / `color/base/white` |
| `component/icon/common/secondary-gray` | `#9EA1A5` | `#5E5F61` | `color/gray/700` / `color/gray/900` |
| `component/icon/common/secondary-muted` | `#CBCFD3` | `#7B7D80` | `color/gray/600` / `color/gray/800` |
| `component/icon/common/success` | `#229A16` | `#229A16` | `color/green/500` / `color/green/500` |
| `component/icon/common/success-disable` | `#BAE0B7` | `#BAE0B7` | `color/green/100` / `color/green/100` |
| `component/icon/common/success-muted` | `#99D194` | `#186D10` | `color/green/200` / `color/green/700` |
| `component/icon/common/warning` | `#FAAD14` | `#8A5F0B` | `color/yellow/500` / `color/yellow/800` |
| `component/icon/common/warning-disable` | `#FDE6B6` | `#694908` | `color/yellow/100` / `color/yellow/900` |
| `component/icon/common/warning-muted` | `#FDD993` | `#694908` | `color/yellow/200` / `color/yellow/900` |
| `component/icon/common/white` | `#FFFFFF` | `#FFFFFF` | `color/base/white` / `color/base/white` |
| `component/icon/file/file-accent` | `#6482F3` | `#6482F3` | `color/blue/400` / `color/blue/400` |
| `component/icon/file/file-gray` | `#DCE1E8` | `#DCE1E8` | `-` / `-` |
| `component/icon/file/file-red` | `#FC5144` | `#FC5144` | `-` / `-` |
| `component/inline editable/border-inline` | `#CBCFD3` | `#CBCFD3` | `color/gray/600` / `color/gray/600` |
| `component/logo/3rd-party/apple-black` | `#000000` | `#000000` | `-` / `-` |
| `component/logo/3rd-party/apple-white` | `#FFFFFF` | `#FFFFFF` | `-` / `-` |
| `component/logo/3rd-party/facebook-blue` | `#1977F3` | `#1977F3` | `-` / `-` |
| `component/logo/3rd-party/facebook-white` | `#FFFFFF` | `#FFFFFF` | `-` / `-` |
| `component/logo/3rd-party/fpt-blue` | `#1169B0` | `#1169B0` | `color/brand/fpt/F` / `color/brand/fpt/F` |
| `component/logo/3rd-party/fpt-blue-online` | `#1268B1` | `#1268B1` | `-` / `-` |
| `component/logo/3rd-party/fpt-green` | `#16B14B` | `#16B14B` | `color/brand/fpt/T` / `color/brand/fpt/T` |
| `component/logo/3rd-party/fpt-yellow` | `#F27227` | `#F27227` | `color/brand/fpt/P` / `color/brand/fpt/P` |
| `component/logo/3rd-party/google-blue` | `#3E82F1` | `#3E82F1` | `-` / `-` |
| `component/logo/3rd-party/google-green` | `#32A753` | `#32A753` | `-` / `-` |
| `component/logo/3rd-party/google-red` | `#E74133` | `#E74133` | `-` / `-` |
| `component/logo/3rd-party/google-yellow` | `#F9BB00` | `#F9BB00` | `-` / `-` |
| `component/progress/error` | `#E33E32` | `#E33E32` | `color/red light/500` / `color/red light/500` |
| `component/progress/success` | `#229A16` | `#229A16` | `color/green/500` / `color/green/500` |
| `component/progress/warning` | `#FAAD14` | `#FAAD14` | `color/yellow/500` / `color/yellow/500` |
| `component/radio/default` | `#FFFFFF` | `#000000` | `color/base/white` / `color/base/black` |
| `component/radio/disable` | `#F7F7F8` | `#5E5F61` | `color/gray/100` / `color/gray/900` |
| `component/radio/elevation` | `#FFFFFF` | `#000000` | `color/base/white` / `color/base/black` |
| `component/radio/enable` | `#FCFCFD` | `#024B26` | `color/gray/50` / `color/primary/800` |
| `component/radio/focus-green` | `#E6F3EC` | `#024B26` | `color/primary/50` / `color/primary/800` |
| `component/radio/hover` | `#F7F7F8` | `#9EA1A5` | `color/gray/100` / `color/gray/700` |
| `component/segmented control/press` | `#EAECF0` | `#EAECF0` | `color/gray/300` / `color/gray/300` |
| `component/skeleton/base` | `#E5E9ED` | `#FFFFFF` | `color/gray/400` / `-` |
| `component/skeleton/default` | `#F0F2F4` | `#FFFFFF` | `color/gray/200` / `-` |
| `component/state layers/on-color/default` | `#0488450A` | `#04884514` | `color/opacity/primary/4` / `-` |
| `component/state layers/on-color/dragged` | `#04884533` | `#04884533` | `color/opacity/primary/20` / `-` |
| `component/state layers/on-color/focus` | `#0488451A` | `#0488451A` | `color/opacity/primary/10` / `-` |
| `component/state layers/on-color/hover` | `#04884514` | `#04884514` | `color/opacity/primary/8` / `-` |
| `component/state layers/on-color/press` | `#04884526` | `#04884526` | `color/opacity/primary/15` / `-` |
| `component/table/cell/border/default` | `#EAECF0` | `#5E5F61` | `border/gray-muted` / `border/gray-muted` |
| `component/table/cell/surface/default` | `#FFFFFF` | `#FFFFFF` | `surface/neutral-white` / `surface/neutral-white` |
| `component/table/cell/surface/hover` | `#F7F7F8` | `#F7F7F8` | `component/table/surface/row-press` / `component/table/surface/row-press` |
| `component/table/cell/surface/selected` | `#F7F7F8` | `#F7F7F8` | `component/table/surface/row-press` / `component/table/surface/row-press` |
| `component/table/surface/row-hover` | `#FCFCFD` | `#FCFCFD` | `color/gray/50` / `color/gray/50` |
| `component/table/surface/row-press` | `#F7F7F8` | `#F7F7F8` | `color/gray/100` / `color/gray/100` |
| `component/table/surface/tab-header` | `#F6F8FA` | `#F6F8FA` | `-` / `-` |
| `component/tags/surface-primary` | `#048845` | `#048845` | `color/primary/500` / `color/primary/500` |
| `component/text input/surface-hover` | `#F6F8FA` | `#F6F8FA` | `color/semantic tokens/color-ai-white` / `color/semantic tokens/color-ai-white` |
| `component/toast alert/action-text` | `#B1DAC5` | `#FFFFFF` | `color/primary/100` / `-` |
| `component/toast alert/icon-close` | `#636363` | `#636363` | `color/secondary dark/700` / `color/secondary dark/700` |
| `component/toast alert/icon-error-opacity` | `#E33E3214` | `#E33E3214` | `color/opacity/red/8` / `color/opacity/red/8` |
| `component/toast alert/icon-info-opacity` | `#3D63F014` | `#3D63F014` | `color/opacity/blue/8` / `color/opacity/blue/8` |
| `component/toast alert/icon-rest-opacity` | `#0000000F` | `#0000000F` | `color/opacity/black/6` / `color/opacity/black/6` |
| `component/toast alert/icon-success-opacity` | `#229A1614` | `#229A1614` | `color/opacity/green/8` / `color/opacity/green/8` |
| `component/toast alert/icon-warning-opacity` | `#FAAD1414` | `#FAAD1414` | `color/opacity/yellow/8` / `color/opacity/yellow/8` |
| `component/toast alert/surface-rest` | `#3C4043` | `#FFFFFF` | `color/base/black-weak` / `-` |
| `component/tooltip/surface-bg-black` | `#1F1F1F` | `#1F1F1F` | `color/secondary dark/900` / `color/secondary dark/900` |
| `component/tooltip/text-sub` | `#CECECE` | `#CECECE` | `color/secondary dark/300` / `color/secondary dark/300` |

### foreground (4)

| Figma variable | Light | Dark | Nguồn Light / Dark |
| --- | --- | --- | --- |
| `foreground/on-background-muted` | `#F0F2F4` | `#F0F2F4` | `color/gray/200` / `color/gray/200` |
| `foreground/on-bg` | `#CBCFD3` | `#DFE3E8` | `color/gray/600` / `color/gray/500` |
| `foreground/on-bg-hover` | `#9EA1A5` | `#9EA1A5` | `color/gray/700` / `color/gray/700` |
| `foreground/on-bg-press` | `#7B7D80` | `#7B7D80` | `color/gray/800` / `color/gray/800` |

### overlay (26)

| Figma variable | Light | Dark | Nguồn Light / Dark |
| --- | --- | --- | --- |
| `overlay/black/10` | `#0000001A` | `#0000001A` | `color/opacity/black/10` / `color/opacity/black/10` |
| `overlay/black/20` | `#00000033` | `#00000033` | `color/opacity/black/20` / `color/opacity/black/20` |
| `overlay/black/4` | `#0000000A` | `#0000000A` | `color/opacity/black/4` / `color/opacity/black/4` |
| `overlay/black/40` | `#00000066` | `#00000066` | `color/opacity/black/40` / `color/opacity/black/40` |
| `overlay/black/60` | `#00000099` | `#00000099` | `color/opacity/black/60` / `color/opacity/black/60` |
| `overlay/danger/10` | `#E33E321A` | `#E33E3233` | `color/opacity/red/10` / `color/opacity/red/20` |
| `overlay/danger/15` | `#E33E3226` | `#E33E3240` | `color/opacity/red/15` / `color/opacity/red/25` |
| `overlay/danger/20` | `#E33E3233` | `#E33E324D` | `color/opacity/red/20` / `color/opacity/red/30` |
| `overlay/danger/25` | `#E33E3240` | `#E33E324D` | `color/opacity/red/25` / `color/opacity/red/30` |
| `overlay/danger/30` | `#E33E324D` | `#E33E324D` | `color/opacity/red/30` / `color/opacity/red/30` |
| `overlay/danger/50` | `#E33E3280` | `#E33E3233` | `color/opacity/red/50` / `color/opacity/red/20` |
| `overlay/danger/70` | `#E33E32B2` | `#E33E3233` | `color/opacity/red/70` / `color/opacity/red/20` |
| `overlay/default/10` | `#5E5F611A` | `#5E5F611A` | `color/opacity/gray/10` / `color/opacity/gray/10` |
| `overlay/default/15` | `#5E5F6126` | `#5E5F6126` | `color/opacity/gray/15` / `color/opacity/gray/15` |
| `overlay/default/20` | `#5E5F6133` | `#5E5F6133` | `color/opacity/gray/20` / `color/opacity/gray/20` |
| `overlay/default/25` | `#5E5F6140` | `#5E5F6140` | `color/opacity/gray/25` / `color/opacity/gray/25` |
| `overlay/info/10` | `#3D63F01A` | `#3D63F01A` | `color/opacity/blue/10` / `color/opacity/blue/10` |
| `overlay/primary/10` | `#0488451A` | `#048845E5` | `color/opacity/primary/10` / `color/opacity/primary/90` |
| `overlay/primary/15` | `#04884526` | `#048845D9` | `color/opacity/primary/15` / `color/opacity/primary/85` |
| `overlay/primary/20` | `#04884533` | `#048845CC` | `color/opacity/primary/20` / `color/opacity/primary/80` |
| `overlay/primary/25` | `#04884540` | `#048845BF` | `color/opacity/primary/25` / `color/opacity/primary/75` |
| `overlay/primary/30` | `#0488454D` | `#048845B2` | `color/opacity/primary/30` / `color/opacity/primary/70` |
| `overlay/primary/4` | `#0488450A` | `#048845E5` | `color/opacity/primary/4` / `color/opacity/primary/90` |
| `overlay/primary/50` | `#04884580` | `#048845B2` | `color/opacity/primary/50` / `color/opacity/primary/70` |
| `overlay/primary/70` | `#048845B2` | `#048845B2` | `color/opacity/primary/70` / `color/opacity/primary/70` |
| `overlay/warning/10` | `#FAAD141A` | `#FAAD141A` | `color/opacity/yellow/10` / `color/opacity/yellow/10` |

### sematic (8)

| Figma variable | Light | Dark | Nguồn Light / Dark |
| --- | --- | --- | --- |
| `sematic/ai/ai-gradient-mesh-0` | `#CCE8FE` | `#CCE8FE` | `color/semantic tokens/color-ai-2light-blue` / `color/semantic tokens/color-ai-2light-blue` |
| `sematic/ai/ai-gradient-mesh-100` | `#B591E9` | `#B591E9` | `color/semantic tokens/color-ai-violet` / `color/semantic tokens/color-ai-violet` |
| `sematic/ai/ai-gradient-mesh-24` | `#CDA0FF` | `#CDA0FF` | `color/semantic tokens/color-ai-pink` / `color/semantic tokens/color-ai-pink` |
| `sematic/ai/ai-gradient-mesh-40` | `#8489F5` | `#8489F5` | `color/semantic tokens/color-ai-purple` / `color/semantic tokens/color-ai-purple` |
| `sematic/ai/ai-gradient-mesh-71` | `#CDF1FF` | `#CDF1FF` | `color/semantic tokens/color-ai-light-blue` / `color/semantic tokens/color-ai-light-blue` |
| `sematic/dashboard/icon-demographics` | `#EBAA6A` | `#EBAA6A` | `-` / `-` |
| `sematic/dashboard/surface-demographics` | `#FFF0E0` | `#FFF0E0` | `-` / `-` |
| `sematic/dina/border-mess` | `#8CC8A9` | `#B1DAC5` | `color/primary/200` / `color/primary/100` |

### surface (30)

| Figma variable | Light | Dark | Nguồn Light / Dark |
| --- | --- | --- | --- |
| `surface/accent` | `#3D63F0` | `#3D63F0` | `color/blue/500` / `color/blue/500` |
| `surface/accent-hover` | `#6482F3` | `#6482F3` | `color/blue/400` / `color/blue/400` |
| `surface/accent-muted` | `#A6B7F8` | `#2B46AA` | `color/blue/200` / `color/blue/700` |
| `surface/accent-pressed` | `#2B46AA` | `#A6B7F8` | `color/blue/700` / `color/blue/200` |
| `surface/box` | `#F4FFF4` | `#F4FFF4` | `color/green light/50` / `color/green light/50` |
| `surface/danger` | `#E33E32` | `#E33E32` | `color/red light/500` / `color/red light/500` |
| `surface/danger-disable` | `#F6C3BF` | `#7D221C` | `color/red light/100` / `color/red light/800` |
| `surface/danger-muted` | `#FCECEB` | `#5F1A15` | `color/red light/50` / `color/red light/900` |
| `surface/elevation` | `#FCFCFD` | `#5E5F61` | `color/gray/50` / `color/gray/900` |
| `surface/gray` | `#F0F2F4` | `#7B7D80` | `color/gray/200` / `color/gray/800` |
| `surface/gray-disable` | `#E8E8E8` | `#7B7D80` | `color/secondary dark/100` / `color/gray/800` |
| `surface/gray-hover` | `#F7F7F8` | `#7B7D80` | `color/gray/100` / `color/gray/800` |
| `surface/gray-press` | `#F0F2F4` | `#5E5F61` | `color/gray/200` / `color/gray/900` |
| `surface/info` | `#3D63F0` | `#3D63F0` | `color/blue/500` / `color/blue/500` |
| `surface/info-disable` | `#C3CFFA` | `#223684` | `color/blue/100` / `color/blue/800` |
| `surface/info-muted` | `#ECEFFE` | `#1A2A65` | `color/blue/50` / `color/blue/900` |
| `surface/neutral-white` | `#FFFFFF` | `#FFFFFF` | `color/base/white` / `color/base/white` |
| `surface/primary` | `#048845` | `#048845` | `color/primary/500` / `color/primary/500` |
| `surface/primary-default` | `#F7F7F8` | `#CBCFD3` | `color/gray/100` / `color/gray/600` |
| `surface/primary-disable` | `#F7F7F8` | `#CBCFD3` | `color/gray/100` / `color/gray/600` |
| `surface/primary-hover` | `#047C3F` | `#036131` | `color/primary/600` / `color/primary/700` |
| `surface/primary-press` | `#036131` | `#024B26` | `color/primary/700` / `color/primary/800` |
| `surface/sidebar-hover` | `#EDFEEC` | `#EDFEEC` | `color/green light/100` / `color/green light/100` |
| `surface/sidebar-press` | `#DFFCDD` | `#EDFEEC` | `color/green light/200` / `color/green light/100` |
| `surface/success` | `#229A16` | `#229A16` | `color/green/500` / `color/green/500` |
| `surface/success-disable` | `#BAE0B7` | `#13550C` | `color/green/100` / `color/green/800` |
| `surface/success-muted` | `#ECFFEA` | `#0E4109` | `color/green/50` / `color/green/900` |
| `surface/warning` | `#FAAD14` | `#229A16` | `color/yellow/500` / `color/green/500` |
| `surface/warning-disable` | `#FDE6B6` | `#13550C` | `color/yellow/100` / `color/green/800` |
| `surface/warning-muted` | `#FFF7E8` | `#0E4109` | `color/yellow/50` / `color/green/900` |

### text (37)

| Figma variable | Light | Dark | Nguồn Light / Dark |
| --- | --- | --- | --- |
| `text/accent` | `#6482F3` | `#6482F3` | `color/blue/400` / `color/blue/400` |
| `text/accent-hover` | `#385ADA` | `#7D96F5` | `color/blue/600` / `color/blue/300` |
| `text/accent-muted` | `#A6B7F8` | `#2B46AA` | `color/blue/200` / `color/blue/700` |
| `text/accent-pressed` | `#2B46AA` | `#A6B7F8` | `color/blue/700` / `color/blue/200` |
| `text/danger` | `#E33E32` | `#E33E32` | `color/red light/500` / `color/red light/500` |
| `text/danger-muted` | `#F2A6A1` | `#A12C24` | `color/red light/200` / `color/red light/700` |
| `text/danger-on-surface` | `#CF382E` | `#CF382E` | `color/red light/600` / `color/red light/600` |
| `text/disable` | `#CECECE` | `#EAECF0` | `color/secondary dark/300` / `color/gray/300` |
| `text/gray` | `#9EA1A5` | `#EAECF0` | `color/gray/700` / `color/gray/300` |
| `text/gray-on-surface` | `#7B7D80` | `#EAECF0` | `color/gray/800` / `color/gray/300` |
| `text/info` | `#3D63F0` | `#3D63F0` | `color/blue/500` / `color/blue/500` |
| `text/info-disable` | `#C3CFFA` | `#223684` | `color/blue/100` / `color/blue/800` |
| `text/info-muted` | `#ECEFFE` | `#1A2A65` | `color/blue/50` / `color/blue/900` |
| `text/info-on-surface` | `#385ADA` | `#385ADA` | `color/blue/600` / `color/blue/600` |
| `text/info-weak` | `#6482F3` | `#3D63F0` | `color/blue/400` / `color/blue/500` |
| `text/link` | `#6482F3` | `#6482F3` | `color/blue/400` / `color/blue/400` |
| `text/link-hover` | `#3D63F0` | `#3D63F0` | `color/blue/500` / `color/blue/500` |
| `text/on-primary-black-inverse` | `#000000` | `#FFFFFF` | `color/base/black` / `color/base/white` |
| `text/on-primary-black-weak` | `#3C4043` | `#3C4043` | `color/base/black-weak` / `color/base/black-weak` |
| `text/on-primary-white` | `#FCFCFD` | `#FFFFFF` | `color/gray/50` / `color/base/white` |
| `text/primary-black` | `#000000` | `#000000` | `color/base/black` / `color/base/black` |
| `text/primary-gray-muted` | `#CBCFD3` | `#CBCFD3` | `color/gray/600` / `color/gray/600` |
| `text/primary-green` | `#048845` | `#048845` | `color/primary/500` / `color/primary/500` |
| `text/primary-white` | `#FFFFFF` | `#FFFFFF` | `color/base/white` / `color/base/white` |
| `text/secondary` | `#7B7D80` | `#DFE3E8` | `color/gray/800` / `color/gray/500` |
| `text/secondary-black (700)` | `#3C3C3C` | `#3C3C3C` | `color/secondary dark/800` / `color/secondary dark/800` |
| `text/secondary-black (main)` | `#1F1F1F` | `#DFE3E8` | `color/secondary dark/900` / `color/gray/500` |
| `text/secondary-hover` | `#1F1F1F` | `#1F1F1F` | `color/secondary dark/900` / `color/secondary dark/900` |
| `text/secondary-inverse` | `#DFE3E8` | `#9EA1A5` | `color/gray/500` / `color/gray/700` |
| `text/secondary-muted` | `#CBCFD3` | `#7B7D80` | `color/gray/600` / `color/gray/800` |
| `text/success` | `#229A16` | `#229A16` | `color/green/500` / `color/green/500` |
| `text/success-muted` | `#99D194` | `#186D10` | `color/green/200` / `color/green/700` |
| `text/success-on-surface` | `#1F8C14` | `#1F8C14` | `color/green/600` / `color/green/600` |
| `text/warning` | `#FAAD14` | `#FAAD14` | `color/yellow/500` / `color/yellow/500` |
| `text/warning-disable` | `#FDE6B6` | `#FDE6B6` | `color/yellow/100` / `color/yellow/100` |
| `text/warning-muted` | `#FFF7E8` | `#FFF7E8` | `color/yellow/50` / `color/yellow/50` |
| `text/warning-on-surface` | `#E49D12` | `#E49D12` | `color/yellow/600` / `color/yellow/600` |

## Điểm cần review

- Kiểm tra lại các tên Figma có khoảng trắng, sai chính tả hoặc state chưa thống nhất (`sematic`, `sucess`, `press`, `disable`, `siver`). Không đổi tên trong tài liệu này thay cho Figma.
- Xác nhận vai trò của `secondary light`, `secondary dark`, `gray`, `green light` và các giá trị được lưu trực tiếp trong Alias trước khi chốt quy ước đặt tên.
- Review các cặp màu chưa đạt ngưỡng contrast ở trên và kiểm tra state Light/Dark, overlay, chart, component theo màn hình thật.
- Khi Figma thay đổi: đọc lại variables/styles, cập nhật `variable-figma-export/` với ngày lấy dữ liệu, đối chiếu ID và alias, sửa bài này, build website và kiểm tra route `/foundation/colors/`.
