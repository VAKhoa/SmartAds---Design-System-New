# Quyết định thiết kế token

D1 đã được duyệt. Các mục có dấu ⭐ còn lại là lựa chọn tạm; giữ trạng thái `proposed` cho đến khi người dùng chốt.

| Mã | Câu hỏi | Lựa chọn | Ảnh hưởng |
|---|---|---|---|
| D1 | Tiền tố code (độc lập với tên viết tắt SDS) | **Đã duyệt: `sa`** (`--sa-*`, `<sa-button>`) | mọi tên CSS và thẻ |
| D2 | "Tini" là "Tiny"? | ⭐ đổi thành `tiny` · giữ `tini` | tên text style |
| D3 | Màu: neutral vs gray; "Secondary option 1/2"; `Alias/Primary - On Theme` nghĩa là gì? | **Phần trung tính đã chốt 16/11/2026: `color/neutral` 13 bậc** (xem dưới); hai ý còn lại cần xác nhận | thang Base, vai trò Semantic |
| D4 | Thang cỡ chữ | **Đã chốt 16/11/2026: thang số px** (xem dưới) | `typography/size/*` |
| D5 | Thư viện chuẩn | ⭐ "SmartAds - Design System" · "Design System 2" là legacy | toàn bộ token |
| D6 | Cấu trúc collection | ⭐ Base · Semantic (Light/Dark) · Component · Spacing · Radius · Font | cách import và tài liệu |
| D7 | Có Base `dimension/<px>` không | ⭐ có (thang số) · không (spacing đặt giá trị trực tiếp) | tầng spacing/radius |
| D8 | Line-height cho đoạn văn dài | giữ 1.2 · tăng cho body | text style |

Quyết định D1 (02/11/2026): dùng `sa` làm tiền tố code và CSS. Tên viết tắt của SmartAds Design System là `SDS`.

Quyết định D9 (14/11/2026): **dark mode loại khỏi phạm vi token sản phẩm**; `ds.config.json` `themes: ["light"]`. Mode Dark của `Alias` còn trong Figma (xóa hay ẩn: chờ bạn duyệt, `docs/_audit/SDS-AUDIT.md` câu hỏi 4); theme dark của website docs vẫn dùng nó.

Quyết định D4 (16/11/2026): thang cỡ chữ dùng **số px** (`typography/size/{10,11,12,13,14,16,18,20,24,28,32,40,48,60,80}`), không dùng t-shirt. Người dùng ghi "thang cỡ chữ theo số hiện tại A" — hiểu là phương án A (số); cần xác nhận nếu ý khác. Chưa áp dụng vào Figma.

Quyết định D11 (16/11/2026): **spacing giữ t-shirt** (`spacing/2xs…`), không chuyển sang số. Hệ quả: tên numeric `--sa-space-*` trong website docs là quy ước riêng của docs, không phải token sản phẩm; chưa quyết có đổi docs theo t-shirt hay giữ.

Quyết định D12 (16/11/2026): mode Dark và `Shadow/elevation-dark/*` **tạm ẩn, không xóa** trong Figma (làm sau khi được cho phép hành động cụ thể). Bổ sung D9.

Quyết định D3 — phần trung tính (16/11/2026, đã áp dụng trong Figma): gộp `color/gray` + `color/secondary dark` thành `color/neutral/{50,100,200,300,350,400,500,600,650,700,800,900,950}`; giữ sắc xanh lạnh nhẹ ở 50–800, xám thuần ở 650/900/950; 9 token `color/secondary dark` thừa được đánh dấu `DEPRECATED`, chưa xóa. Chi tiết và ánh xạ: `docs/_audit/NEUTRAL-MERGE.md`.

Quyết định D10 (12/11/2026, xác nhận 14/11/2026): component bàn giao dùng **HTML/CSS/JavaScript thuần** (`content/rules/component-code-rules.md`).

Với D2–D8, ghi quyết định và ngày chốt dưới bảng trước khi áp dụng. Các câu hỏi đang chờ (D2–D8 cùng thang cỡ chữ, trung tính, spacing, data-viz, lifecycle, density, format số/tiền): `docs/_audit/SDS-AUDIT.md` §6.
