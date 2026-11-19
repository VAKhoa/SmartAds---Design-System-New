# Bài test chuẩn (golden test)

Dùng để kiểm skill sau mỗi lần sửa. **Đầu vào:** file ESDS Specs `4EOIROZR50dcaKc3xxZT1Q`, trang `Test Handoff` (`474:843`), node `474:22181` = instance `primitive-search-create-campaign` (16 variant: State × Tier × Search box × Type). Component nguồn **không được sửa**.

## Cách chạy an toàn
Chạy các script với `prefix: 'TST'` và `originX: 20000` (xem `figma-build-notes.md`), đối chiếu ảnh với bản đã duyệt rồi **xóa** các Section `TST*`. Không chạy với prefix thật nếu không muốn ghi đè bản đã duyệt.

## Kết quả kỳ vọng (bản đã duyệt 2026-11-18)
| Mục | Giá trị |
|---|---|
| Section | `SPEC · … · 01 Anatomy & Layout` (rộng 2600 × cao ≈ 2998), `SPEC · … · 02 Variants & States`, `UI · … · 03 Interaction & Responsive`, `REVIEW · … · Phản hồi cho Designer` (rộng 1400) |
| Trang 01 | 8 marker khớp 8 phần tử (+ khối style dùng chung 1·2·4·6); hình Dimension có nhãn px đỏ ở 7 đường đo; **không** có thanh cuộn |
| Trang 02 | đúng **1** bảng; 3 biến thể; nhóm "Ô tìm kiếm" (Enable, Disable, Typing, Search empty — crop 712×240) và nhóm "Panel Retargeting" (Press, Empty) kèm note cạnh hình |
| Trang 03 | 3 note mũi tên trỏ đúng (dấu chấm chạm cạnh phần tử); khối Do/Don't: 1 trường hợp có hình (Do ellipsis, Don't tràn) + 3 trường hợp chữ; note Do xanh, note Don't đỏ |
| Note | tất cả `Assigned By: khoava3`; `Posted on HH:mm - MMM D, YYYY`; không từ "Thấy trong Figma/Chưa rõ/OBSERVED"; không "Note Title" mẫu |
| REVIEW | 1 note, 5 nhóm đánh số in đậm; có dòng "Do / Don't tên audience dài cần xác nhận" |
| `finish-check.js` | `problems: []`, `gaps: [240,240]`, `tables: 1`, `markers: 8` |

## Điều đã biết là bình thường
- Typing và Search empty trông giống nhau (lỗi thiết kế nguồn, nằm trong REVIEW).
- Giờ Posted on theo đồng hồ máy chạy plugin.
