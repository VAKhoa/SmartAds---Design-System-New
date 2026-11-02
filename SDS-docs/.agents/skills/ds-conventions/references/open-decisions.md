# Quyết định thiết kế token

D1 đã được duyệt. Các mục có dấu ⭐ còn lại là lựa chọn tạm; giữ trạng thái `proposed` cho đến khi người dùng chốt.

| Mã | Câu hỏi | Lựa chọn | Ảnh hưởng |
|---|---|---|---|
| D1 | Tiền tố code (độc lập với tên viết tắt SDS) | **Đã duyệt: `sa`** (`--sa-*`, `<sa-button>`) | mọi tên CSS và thẻ |
| D2 | "Tini" là "Tiny"? | ⭐ đổi thành `tiny` · giữ `tini` | tên text style |
| D3 | Màu: neutral vs gray; "Secondary option 1/2"; `Alias/Primary - On Theme` nghĩa là gì? | cần xác nhận | thang Base, vai trò Semantic |
| D4 | Thang cỡ chữ | ⭐ t-shirt tăng dần (`xs<sm<md…`) · thang số px | `typography/size/*` |
| D5 | Thư viện chuẩn | ⭐ "SmartAds - Design System" · "Design System 2" là legacy | toàn bộ token |
| D6 | Cấu trúc collection | ⭐ Base · Semantic (Light/Dark) · Component · Spacing · Radius · Font | cách import và tài liệu |
| D7 | Có Base `dimension/<px>` không | ⭐ có (thang số) · không (spacing đặt giá trị trực tiếp) | tầng spacing/radius |
| D8 | Line-height cho đoạn văn dài | giữ 1.2 · tăng cho body | text style |

Quyết định D1 (02/11/2026): dùng `sa` làm tiền tố code và CSS. Tên viết tắt của SmartAds Design System là `SDS`.

Với D2–D8, ghi quyết định và ngày chốt dưới bảng trước khi áp dụng.
