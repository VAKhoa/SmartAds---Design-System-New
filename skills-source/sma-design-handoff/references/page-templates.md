# Trang spec — nội dung, ngân sách, kích thước

## Ngân sách trang
| Độ phức tạp component | Số trang | Trang |
|---|---|---|
| Đơn giản (≤ 3 state, 1 trục biến thể) | 1–2 | 01 (+ 02 nếu có state đáng kể) |
| Trung bình (nhiều state hoặc 2–3 trục biến thể) | 3 | 01 · 02 · 03 |
| Phức tạp / người dùng yêu cầu | 4 | thêm **một** trang theo yêu cầu: Tokens (Spec color token, alias `--sa-*`), Developer notes (HTML/CSS/JS thuần, D10), Content & Copy, hoặc Accessibility |
Section REVIEW **không tính** vào số trang (nằm ngoài spec).

## Section
- Tên: `SPEC · <component> · 01 Anatomy & Layout` · `SPEC · <component> · 02 Variants & States` · `UI · <component> · 03 Interaction & Responsive` · `REVIEW · <component> · Phản hồi cho Designer`.
- Rộng **2600**, lề trong 120, nội dung rộng 2360, cách nhau **240**, xếp dọc tại x = 1400. REVIEW rộng 1400 đặt tại x = 1400 + 2600 + 400, cùng y với trang 01.
- Đầu mỗi trang: **Card spec** (y = 120, rộng 2360; Screen = tên component, State = tóm tắt trang, Platform = thiết bị; ẩn badge thiết bị không áp dụng), rồi heading `❖ NN …` (y = 358) và một dòng mô tả (y = 420). Nội dung bắt đầu y = 520.

## Trang 01 — Anatomy & Layout (`scripts/page-01-anatomy-layout.js`)
- **Label Item "Anatomy"** + artwork (instance sao chép, đệm 200 trái/phải, 160 trên/dưới) có **Spec marker** đánh số trỏ vào từng phần.
- Cột phải: danh sách phần tử = **Spec layer name** (tên tiếng Việt · tên layer thật) + **Spec attribute** (Dùng component / Kích thước / Khoảng đệm / token). Khối đầu "Style dùng chung" gom nền, viền, bo góc lặp lại (nhiều số badge).
- **Label Item "Dimension"** + artwork thứ hai: **Dimension px** (nhãn đỏ #F24822) cho mọi đường đo, **overlay** đỏ = padding, xanh = gap; một Note "Cách đọc hình kích thước".
- Không spec thanh cuộn, chrome hệ thống. Chỉ ghi giá trị khác mặc định.

## Trang 02 — Variants & States (`scripts/page-02-variants-states.js`)
- **Một bảng** ma trận (loại × thuộc tính × trạng thái × kích thước) + Note "Tổ hợp được hỗ trợ".
- Vài **biến thể tiêu biểu** trên một hàng (Label Item từng hình).
- Các **nhóm state** (Label Group) → mỗi state một Label Item + artwork + Note **ngay cạnh**. Component lớn: `mode:'crop'` chỉ cắt vùng liên quan (ví dụ chỉ ô tìm kiếm). Enable chỉ cần hình tham chiếu, không cần note.
- Note mô tả bằng câu khẳng định: giao diện thay đổi gì, token nào, hành vi nào là hệ quả tất yếu của state (ví dụ Disable → không nhập được).

## Trang 03 — Interaction & Responsive (`scripts/page-03-interaction-dodont.js`)
- **Thao tác:** artwork với 2–4 Note có mũi tên trỏ vào vùng tương tác (nhập, chọn, danh sách…). Chỉ mô tả điều đã được thiết kế.
- **Do và Don't:** 3–4 trường hợp dễ sai nhất khi dev code hoặc designer khác dùng (tràn chữ, chiều rộng hỗ trợ, tổ hợp thuộc tính ngoài thiết kế, giá trị gõ cứng thay token). Có hình thì cắt vùng liên quan; Do = note xanh Success, Don't = note đỏ (State=Error). Chi tiết: `writing-style.md`.

## REVIEW (`scripts/review-section.js`)
Một note chữ duy nhất, gom nhóm, không lặp spec. Nhóm: Chính tả và câu chữ · Màu và token · Layer và style · Thiết kế còn thiếu hoặc cần xác nhận · Hành vi cần chốt trước khi bàn giao.

## Kiểm tra cuối (`scripts/finish-check.js`)
Xếp lại Section; kiểm tra: tên Section, có Card spec và rộng đúng, khoảng cách = 240, có REVIEW, marker khớp danh sách phần tử, mọi note có giờ Posted on và giữ Assigned By gốc, không còn text mẫu Note spec, không có từ khóa giọng "máy" trong spec, ≤ 1 bảng, ≤ 4 trang, nguồn còn nguyên, không node lạc trên trang.
