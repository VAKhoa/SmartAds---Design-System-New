# Effects (shadow, elevation)

## Đã quan sát trong Figma

- `Shadow/elevation-light/{200,300,…}` và `Shadow/elevation-dark/{100…700}`.
- Mô tả có sẵn trong `elevation-dark`:

| Mức | Công dụng (trích mô tả Figma, tiếng Việt) |
|---|---|
| 100 | Card tĩnh, widget dashboard |
| 200 | Bento/widget dashboard (tối đa nâng lên 300) |
| 300 | Hover, press, card bấm được, alert |
| 400 | Dropdown, menu |
| 600 | Modal, dialog, snackbar |
| 700 | Phần tử đang kéo |

- `Shadow/semantic/edge/{top,left,right}-sm`: bóng cạnh (edge).
- Thư viện cũ: `Shadow/Shadow-default/Shadow-x1…x8` (không dùng nếu D5 chọn thư viện mới).

## Quy tắc đề xuất

1. Tên: `shadow/elevation/<mức>` (không tách `light`/`dark` trong tên); `shadow/edge/<hướng>-<size>`.
2. Light và Dark là hai bộ giá trị của cùng một tên; lúc build, CSS đổi theo `data-theme`. (Figma hiện tách hai bộ style: ghi nhận ở D6 để chọn cách ánh xạ.)
3. Mức elevation dùng cho vai trò ghi trong mô tả; Docs Writer lấy từ mô tả.
4. Mô tả còn thiếu cho 400/500/600 ở bản light: bổ sung khi dump.
