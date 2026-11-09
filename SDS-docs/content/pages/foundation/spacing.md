---
title: Spacing
description: Thang khoảng cách, đối chiếu Figma và hướng dẫn triển khai Foundation / Spacing của SmartAds.
section: Foundation
updated: 09/11/2026
status: beta
sources:
  - label: SmartAds Design System — bản export variables ngày 02/11/2026
    url: https://www.figma.com/design/cRZ5kIi4kD6j9lh1dbh5mh/SmartAds---Design-System?m=dev
---

## Trạng thái và nguồn

**Trang beta của website docs; chưa phải token package sản phẩm đã phát hành.** Bảng giá trị Figma bên dưới lấy từ `SDS-docs/variable-figma-export/variables.spacing.json`, collection `Spacing`, mode `sm`, chụp ngày 02/11/2026. Chưa đọc lại thuộc tính node Figma hiện tại trong task này. Bạn đã duyệt tên numeric `--sa-space-*` cho trang docs; các tên này không phải variable gốc của Figma. Ví dụ Table Cell chỉ dựa trên ba binding có ID trong bản export và được ghi rõ là sơ đồ, không phải ảnh chụp UI.

## Tổng quan

Khoảng cách giúp thống nhất nhịp giữa dữ liệu quảng cáo, biểu đồ và bảng biểu. **Đề xuất dùng bước ưu tiên 4px (0.25rem)** cho bố cục chính. Đây không phải quy tắc cấm giá trị khác: snapshot có cả 1px (0.0625rem), 2px (0.125rem), 6px (0.375rem), 7px (0.4375rem), 10px (0.625rem), 14px (0.875rem) và 18px (1.125rem). Khi node Figma hoặc token có giá trị khác bước ưu tiên, dùng đúng nguồn và ghi rõ trường hợp.

| Highlight card | Giá trị | Ý nghĩa |
| --- | --- | --- |
| Base Unit | **4px** · 0.25rem | Bước ưu tiên theo yêu cầu, chưa được tuyên bố là baseline tuyệt đối trong snapshot. |
| Root Font Size | **16px** · 1rem | Cơ sở quy đổi cho ví dụ tài liệu; cần xác nhận `html` thực tế của môi trường triển khai trước khi dùng `rem` để khớp pixel. |
| Formula | **rem = px / 16** | Công thức tĩnh của bảng và mẫu code, không có công cụ chuyển đổi trên trang. |

## Quy tắc hiển thị hai đơn vị

Mọi **giá trị kích thước cụ thể** trên trang, gồm highlight card, bảng, nhãn trên hình minh họa, chú thích và ví dụ, phải hiện `px` cùng giá trị `rem` tính từ cơ sở 16px (1rem). Tên tham số `px`, tên cột `Pixels (px)` và công thức không phải một giá trị kích thước cần ghép cặp. Không tạo input hoặc calculator đổi đơn vị.

**Quy tắc component:** `<SpacingValue px={number} mode="inline|stacked" copy="rem|token" />` tính `px / 16`, định dạng gọn không có số 0 thừa. `inline` hiện giá trị chính như **16px** và phụ như `(1rem)` sát cạnh; `stacked` hiện **16px** ở dòng trên, `1rem` ở dòng dưới. Text phụ dùng màu semantic phụ của theme và kiểu chữ code của website; không hardcode class màu Tailwind. Click vào cụm giá trị copy `rem` mặc định; nút riêng có thể copy `var(...)` của API docs đã duyệt. Hover gợi ý thao tác; nút click/focus dùng được trên touch và bàn phím; thông báo “Copied!” bằng tooltip/toast có `aria-live`. Nếu Clipboard API không khả dụng, hiện thông báo lỗi, không báo đã copy.

## Spacing scale và bảng token

Thang 13 mức sau dùng **numeric API `--sa-space-*` đã được bạn duyệt cho website docs**. Các tên này không phải variable gốc của Figma và chưa tạo thành token package sản phẩm. `spacing/*` và ID là dữ liệu Figma từ snapshot. Giá trị `rem` do `px / 16` tính ra. Với hàng chưa có component binding được xác minh, cột Usage nói rõ là gợi ý hoặc chưa xác minh.

| Token / CSS Variable của docs | Multiplier | Pixels (px) | REM (rem) | Visual Preview | SmartAds Usage Context / nguồn Figma |
| --- | ---: | ---: | ---: | --- | --- |
| `--sa-space-0` | 0x | 0px · 0rem | **0rem** | Không có thanh | `spacing/none` · `VariableID:4754:32681`; không tạo gap — đề xuất. |
| `--sa-space-05` | 0.5x | 2px · 0.125rem | **0.125rem** | Thanh rộng 2px (0.125rem) | `spacing/xxs` · `VariableID:4754:32683`; micro spacing — đề xuất. |
| `--sa-space-1` | 1x | 4px · 0.25rem | **0.25rem** | Thanh rộng 4px (0.25rem) | `spacing/xs` · `VariableID:4754:32684`; icon/text — đề xuất. |
| `--sa-space-15` | 1.5x | 6px · 0.375rem | **0.375rem** | Thanh rộng 6px (0.375rem) | `spacing/xs-plus` · `VariableID:4754:32685`; micro spacing — đề xuất. |
| `--sa-space-2` | 2x | 8px · 0.5rem | **0.5rem** | Thanh rộng 8px (0.5rem) | `spacing/sm` · `VariableID:4754:32687`; table cell padding dọc và content gap đều 8px (0.5rem), ID component ở dưới. |
| `--sa-space-3` | 3x | 12px · 0.75rem | **0.75rem** | Thanh rộng 12px (0.75rem) | `spacing/md` · `VariableID:4754:32689`; table cell padding ngang 12px (0.75rem), ID component ở dưới. |
| `--sa-space-4` | 4x | 16px · 1rem | **1rem** | Thanh rộng 16px (1rem) | `spacing/lg (Base)` · `VariableID:4754:32691`; card inset — đề xuất. **Không gộp với `spacing/lg` = 18px (1.125rem).** |
| `--sa-space-5` | 5x | 20px · 1.25rem | **1.25rem** | Thanh rộng 20px (1.25rem) | `spacing/xl` · `VariableID:4754:32692`; component inset — đề xuất. |
| `--sa-space-6` | 6x | 24px · 1.5rem | **1.5rem** | Thanh rộng 24px (1.5rem) | `spacing/2xl` · `VariableID:4754:32693`; card inset — đề xuất. |
| `--sa-space-8` | 8x | 32px · 2rem | **2rem** | Thanh rộng 32px (2rem) | `spacing/3xl` · `VariableID:4754:32694`; grid gap — đề xuất. |
| `--sa-space-10` | 10x | 40px · 2.5rem | **2.5rem** | Thanh rộng 40px (2.5rem) | `spacing/4xl` · `VariableID:4754:32695`; section gap — đề xuất. |
| `--sa-space-12` | 12x | 48px · 3rem | **3rem** | Thanh rộng 48px (3rem) | `spacing/5xl` · `VariableID:4754:32696`; section gap — đề xuất. |
| `--sa-space-16` | 16x | 64px · 4rem | **4rem** | Thanh rộng 64px (4rem) | `spacing/7xl` · `VariableID:4754:32698`; section gap — đề xuất. |

**Bằng chứng component:** `component/table/cell/padding/x-default` = 12px (0.75rem), `VariableID:15044:691533`; `component/table/cell/padding/y-default` = 8px (0.5rem), `VariableID:15044:691534`; `component/table/cell/gap/content` = 8px (0.5rem), `VariableID:15044:691535`. Ba giá trị này chỉ chứng minh cấu hình table cell, không xác nhận toàn bộ card, badge hoặc dashboard.

**Các token Figma ngoài bảng 13 mức:** `spacing/hairline` 1px (0.0625rem), `spacing/odd-7` 7px (0.4375rem), `spacing/sm-plus` 10px (0.625rem), `spacing/md-plus` 14px (0.875rem), `spacing/lg` 18px (1.125rem), `spacing/6xl` 56px (3.5rem), `spacing/8xl` 80px (5rem). Đây là dữ liệu thật trong cùng snapshot, không tự loại bỏ khi triển khai. `spacing/lg (Base)` 16px (1rem) và `spacing/lg` 18px (1.125rem) là hai ID khác nhau. Với CSS từ tên hiện tại, việc xử lý dấu cách và ngoặc của `spacing/lg (Base)` cần quyết định tên riêng trước khi phát hành.

**Tương tác bảng:** click badge token copy `var(--sa-space-*)`; click cột Pixels copy chuỗi `Npx`; click REM copy chuỗi `Nrem`; cột preview dùng chiều rộng CSS chính xác theo số px của hàng, có min-height để 0px (0rem) vẫn thấy điểm gốc. Mọi ô có hành động copy dùng nút thực, focus ring, nhãn truy cập và “Copied!” sau khi copy thành công. Trên màn hình nhỏ, bảng cuộn ngang có nhãn cột còn đọc được; không ép 6 cột vào viewport.

## Minh họa ứng dụng trên UI SmartAds

Chỉ minh họa **Table Cell**, component có ba spacing variable binding trong bản export Figma. Đây là sơ đồ cấu tạo của component, không phải ảnh chụp một màn hình sản phẩm. Không đưa badge, card thống kê, filter tag hoặc dashboard widget vào ví dụ khi chưa có node và binding chứng minh cách dùng.

| Vùng của Table Cell | Variable Figma | Giá trị | ID |
| --- | --- | --- | --- |
| Padding ngang | `component/table/cell/padding/x-default` | 12px (0.75rem) | `VariableID:15044:691533` |
| Padding dọc | `component/table/cell/padding/y-default` | 8px (0.5rem) | `VariableID:15044:691534` |
| Khoảng cách giữa nội dung | `component/table/cell/gap/content` | 8px (0.5rem) | `VariableID:15044:691535` |

Vùng “Content” trong sơ đồ là placeholder để chỉ vị trí gap, không phải nhãn dữ liệu hay thiết kế Table Cell nguyên gốc. Cần kiểm tra node Table hiện tại trong Figma trước khi khẳng định cấu trúc hoặc trạng thái của component.

Nút “Show Spacing Specs” có `aria-pressed`, nhãn đổi thành “Hide Spacing Specs” khi bật, thao tác được bằng chuột, touch, Enter và Space. Tránh dùng lớp phủ chặn click vào nội dung bên dưới.

## Developer implementation — đặc tả cho giai đoạn build

Các code tab sau dùng **numeric API đã được duyệt cho website docs**. Đây chưa phải token package sản phẩm; không copy sang package sản phẩm hay `figma.generated.css` khi chưa có yêu cầu phát hành và đối chiếu lại Figma. Website hiện là Next.js + React JavaScript + CSS thuần; nếu cần `spacing.ts` cho sản phẩm thì đặt trong package thích hợp sau khi xác định phạm vi, không thêm TypeScript/SCSS vào website chỉ vì ví dụ.

### Tab 1 — CSS Variables (`tokens.css`, API website docs)

```css
:root {
  --sa-space-0: 0rem;       /* 0px = 0rem */
  --sa-space-05: 0.125rem;  /* 2px = 0.125rem */
  --sa-space-1: 0.25rem;    /* 4px = 0.25rem */
  --sa-space-15: 0.375rem;  /* 6px = 0.375rem */
  --sa-space-2: 0.5rem;     /* 8px = 0.5rem */
  --sa-space-3: 0.75rem;    /* 12px = 0.75rem */
  --sa-space-4: 1rem;       /* 16px = 1rem */
  --sa-space-5: 1.25rem;    /* 20px = 1.25rem */
  --sa-space-6: 1.5rem;     /* 24px = 1.5rem */
  --sa-space-8: 2rem;       /* 32px = 2rem */
  --sa-space-10: 2.5rem;    /* 40px = 2.5rem */
  --sa-space-12: 3rem;      /* 48px = 3rem */
  --sa-space-16: 4rem;      /* 64px = 4rem */
}
```

### Tab 2 — Helper (`spacing.ts`, ví dụ cho code sản phẩm)

```ts
export function pxToRem(px: number, base = 16): string {
  return `${px / base}rem`;
}
```

Trong website JavaScript hiện tại, có thể dùng cùng công thức trong helper `.js` của trang docs. Hàm nội bộ chỉ dùng để render giá trị có sẵn; **không tạo UI calculator**. Mỗi tab code có nút “Copy code”, thông báo thành công và trạng thái lỗi Clipboard API rõ ràng.

### Tab 3 — Best Practices

| Do | Don't |
| --- | --- |
| Dùng `gap` của flex/grid cho khoảng giữa các phần tử cùng nhóm, ví dụ `gap: var(--sa-space-2)` trong website docs. | Dùng nhiều `margin` trên từng phần tử để mô phỏng cùng một gap khi layout có thể thay đổi số phần tử. |
| Dùng variable có mapping Figma đã kiểm tra; trong bảng docs hiển thị song song `8px · 0.5rem`. | Đưa tên `--sa-space-*` của docs vào sản phẩm như thể đã có token package phát hành. |
| Giữ ngoại lệ Figma có nguồn, kể cả 18px (1.125rem), và ghi chú khi lệch bước ưu tiên. | Ép mọi giá trị về bội số 4px (0.25rem) khiến giao diện lệch Figma. |

## Quyết định đã chốt và giới hạn nguồn

- **Đã chốt:** dùng bộ `--sa-space-*` numeric cho website docs. Trang `/foundation/spacing/` hiển thị đủ 13 mức chính và các giá trị Figma ngoài thang trong phần đối chiếu.
- **Định hướng hiển thị:** 4px (0.25rem) là bước ưu tiên, không tự xóa hoặc làm tròn ngoại lệ trong Figma.
- **Đã thay:** bỏ ba ví dụ UI chưa có binding nguồn. Sơ đồ Table Cell dùng ba variable ID từ snapshot; cấu trúc node hiện tại trong Figma chưa được xác minh lại.
