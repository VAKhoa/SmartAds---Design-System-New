# SDS-workspace/ — việc hằng ngày (UI, ad format, QA, thử nghiệm)

Vùng làm việc **tách khỏi** `SDS-docs/` (nguồn sự thật design system). Ở đây được nháp, thử, build; không phải nguồn tri thức.

## Cấu trúc
| Thư mục | Chứa | Người ghi (qua Agent Core) |
|---|---|---|
| `ad-formats/<năm-tháng>-<slug>/` | Ad format HTML/CSS/JS (prefix `sma-`) | ad-format-builder |
| `ui-builds/<năm-tháng>-<slug>/` | Build UI/handoff theo task | components-handler (board-designer chỉ ghi Figma, không ghi file ở đây) |
| `qa-reports/<năm-tháng>-<slug>/` | `pairs.json`, `report.md`, ảnh — kết quả QA Figma ↔ code | ui-qa-auditor |
| `_template/` | Khuôn một task (chép ra, đổi tên) | — |
| `_tools/` | `check-tokens.mjs` (+ test): quét `out/` tìm màu/cỡ chữ không theo token SDS | — |
| `_scratch/` | Nháp/file tạm. **Không theo dõi bằng git** | ai cũng được |

Mỗi task = một thư mục `<năm-tháng>-<slug>/` (ví dụ `2026-11-sticky-ads`) có `brief.md` (yêu cầu đã duyệt, node Figma, phạm vi, trạng thái) và `out/` (kết quả).

## Luật
1. **Đọc được, không ghi** vào `SDS-docs/` (token, luật, snapshot Figma). Cần đổi design system → qua Agent Core, xin duyệt, giao tokens-handler/components-handler.
2. **Không bao giờ** đồng bộ hay đưa sang `SDS-docs/website/` trừ khi người dùng giao rõ việc website.
3. Dùng token `--sa-*` đã có; không hard-code. Giá trị chưa có → ghi `needs-value`, không bịa.
4. Thứ đáng thành chuẩn (component/token mới) chỉ ở dạng **đề xuất** trong `brief.md`; được duyệt mới chuyển vào `SDS-docs/`.
5. Figma chỉ đọc (`whoami` = `info@smartads.tech`, đúng file/node được giao).
6. Agent Core luôn ghi **thư mục task** vào brief giao sub agent; không có thư mục task → hỏi lại, không tự chọn.
7. Git: theo dõi `brief.md` và `out/` của task xong; không theo dõi `_scratch/`, `node_modules/`. Commit của vùng này đặt tiền tố `SDS-workspace:`. Không commit/push khi chưa được yêu cầu.
8. **Link Figma theo từng task:** mỗi task dùng link Figma riêng (không nhất thiết file design system). Mọi link + node-id ghi trong bảng "Nguồn Figma" của `brief.md`; agent chỉ đọc đúng các link đó, thêm link phải cập nhật brief và xin đồng ý. Link không phải file design system thì token SDS vẫn là chuẩn đối chiếu; chỗ khác biệt ghi vào "Đề xuất chờ duyệt", không tự chỉnh.
9. **Kiểm token trước khi giao verifier:** `node SDS-workspace/_tools/check-tokens.mjs <thư mục task>` (chỉ đọc file trên máy, không gọi Figma). Giá trị hợp lệ ngoài token (vd ad format theo quy ước publisher) ghi vào `allow-tokens.json` cạnh `brief.md`, mỗi mục bắt buộc có `reason`. Script so với **snapshot** token có ngày, không phải Figma trực tiếp.
10. Việc xong → ghi một dòng vào `SDS-docs/docs/_knowledge/CHANGELOG.md` chỉ khi ảnh hưởng quy ước/quyết định; việc thường nhật không cần.
