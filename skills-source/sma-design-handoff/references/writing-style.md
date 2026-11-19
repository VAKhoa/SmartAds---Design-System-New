# Giọng viết spec, Do/Don't và REVIEW

## Giọng: Product Designer khẳng định
- Viết như người **sở hữu thiết kế**: câu khẳng định, chủ động, ngắn, tiếng Việt thông thường; thuật ngữ kỹ thuật và tên token giữ nguyên.
- **Câu đầu = điều quan trọng nhất**, được in đậm tự động (tới dấu `.` hoặc `:` đầu tiên). Mỗi note ≤ 3 đoạn ngắn.
- Mô tả: giao diện thay đổi gì → token nào → hệ quả hành vi tất yếu của state (Disable thì không nhập được).
- **Cấm trong spec:** "Thấy trong Figma", "Chưa rõ", "Cần quyết định", "OBSERVED/DERIVED/PROPOSED/UNVERIFIED/NOT FOUND", "needs-value", "DEBT", "delta", mọi giọng "máy kiểm tra". Cũng không đưa lỗi thiết kế, lỗi content, điều thiếu vào spec.
- Điều spec **không khẳng định được** (hành vi chưa thiết kế, trigger, giới hạn, thiết kế còn thiếu) → **không viết vào spec**, đưa vào REVIEW. Không bịa hành vi để cho spec "đầy".
- Tên tiếng Việt cho phần tử + tên layer thật: `Ô tìm kiếm · _search-rich-suggestions`.

### Trước → sau
| Không dùng | Dùng |
|---|---|
| "Thấy trong Figma: viền chuyển xanh. Chưa rõ trigger." | "Ô tìm kiếm khi người dùng nhập chữ. Viền chuyển sang màu xanh (border/primary)…" |
| "Lỗi thiết kế: viền Disable dùng border/gray-hover" | (spec ghi đúng token đang dùng, không bình luận) — lỗi vào REVIEW |
| "OBSERVED: root 709 → 617" | "Chiều cao component giảm từ 709 xuống 617 px." |

## Note spec
- **Default** (xanh dương): mô tả / quy tắc. **Error** (`State=Error`, đỏ): chỉ cho **KHÔNG ĐƯỢC**. **Success** (Default ghi đè xanh): chỉ cho **NÊN LÀM**.
- Tiêu đề note: cụm danh từ rõ nghĩa ("Disable — ô khóa"), không "Note", không "delta".
- Đặt cạnh hình (trang 02) hoặc dùng mũi tên trỏ vào phần tử (trang 03); không đặt note xa phần tử nó nói về. Rộng 560–720.
- **Assigned By không đổi**; **Posted on** `HH:mm - MMM D, YYYY`.
- `KHÔNG ĐƯỢC:` luôn in đậm đỏ ở đầu thân note Error.

## Do và Don't (trang 03)
Chọn **3–4** trường hợp **dễ gây lỗi thật** cho dev hoặc designer khác. Ưu tiên theo thứ tự:
1. Hiển thị nội dung biến đổi (chữ dài, rỗng, nhiều/ít mục) — có hình, Do (cắt gọn "…") rồi Don't (tràn/đè).
2. Chiều rộng / breakpoint đã thiết kế — Do: dùng đúng các giá trị; Don't: tự co/giãn.
3. Tổ hợp thuộc tính ngoài thiết kế — Do: chỉ dùng tổ hợp trong bảng; Don't: tự ghép.
4. Giá trị gõ cứng thay token / detach instance.
Ví dụ khác khi hợp ngữ cảnh: dùng đúng biến thể trạng thái; không dùng màu làm tín hiệu duy nhất.
- Mẫu: Do "Dùng token cho màu và khoảng cách" / Don't "KHÔNG ĐƯỢC: gõ cứng mã màu hoặc số px thay cho token…".
- Nếu "Do" là **đề xuất của bạn** mà Figma chưa quyết (ví dụ cắt "…" thay vì xuống dòng) → ghi một dòng vào REVIEW để Designer xác nhận.

## Section REVIEW — phản hồi cho Designer
- **Một note chữ**, đặt ngoài cột spec, tiêu đề "Các điểm cần rà soát", đánh số nhóm (in đậm) và gạch đầu dòng.
- **Gom cụm lỗi giống nhau** thành một dòng (ví dụ "Availble" × 4). **Không lặp** thông tin đã nằm trong spec; không viết bảng.
- Nhóm theo nguyên nhân: 1) Chính tả và câu chữ · 2) Màu và token (token sai ngữ nghĩa, token cũ, contrast < 4.5:1 kèm tỉ lệ đã tính) · 3) Layer và style (tên layer, style lệch) · 4) Thiết kế còn thiếu hoặc cần xác nhận (state trùng nhau, thiếu focus ring, thiếu thiết bị, rộng tối thiểu/tối đa, đề xuất Do cần xác nhận) · 5) Hành vi cần chốt trước khi bàn giao (trigger, giới hạn, tương tác chưa thiết kế).
- Mỗi dòng nói **cần làm gì** (→ …), không chỉ nêu lỗi.
- Card spec giữ `Pending` cho tới khi người dùng xử lý REVIEW.
