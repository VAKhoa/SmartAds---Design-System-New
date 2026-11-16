# Câu hỏi mở, mâu thuẫn và mục chờ duyệt

> Cập nhật: 2026-11-15 (tổng hợp ban đầu). Nguồn gốc thắng; kho không tự sửa file nguồn — đề xuất gửi agent sở hữu qua Agent Core.

## 1. Câu hỏi chờ người dùng quyết
Nguồn: `SDS-docs/docs/_audit/SDS-AUDIT.md` §6 (14/11/2026) + `open-decisions.md`.
| # | Câu hỏi | Liên quan |
|---|---|---|
| Q1 | Thang cỡ chữ: số (`typography/size/14`) hay t-shirt đơn điệu? `Microscope`/`Tini` đổi thành gì? | D4, D2, TK-02 |
| Q2 | Trung tính: gộp `color/gray` + `color/secondary dark` thành `color/neutral`? Giữ/xóa `color/secondary light`, `color/red dark`, `color/orange` (không dùng)? | D3 |
| Q3 | Spacing: giữ t-shirt (`spacing/lg`) hay numeric như docs (`spacing/4`=16)? | TK-04, D-01, D7 |
| Q4 | Cho phép **xóa** mode Dark và `Shadow/elevation-dark/*` khỏi Figma (không hoàn tác) hay chỉ ẩn? | D9, TK-14 |
| Q5 | Palette data-viz: 8 hay 10 màu series? Cần bộ màu riêng Advertiser/Publisher? | AT-01 |
| Q6 | Danh sách trạng thái lifecycle chính thức (11) và màu từng trạng thái? | AT-03 |
| Q7 | Format số/tiền vi-VN ("1,2 Tr/3,4 Tỷ" hay "1.2M/3.4B"); timezone mặc định `Asia/Ho_Chi_Minh`? | AT-08 |
| Q8 | Density: 3 mode hay 2? | AT-04 |
| Q9 | Ai duyệt và khi nào áp dụng `rename-map.json` (0 `approved`)? | P5 |
| Q10 | D2, D5, D6, D8 (chưa có câu riêng trong Audit §6) | `open-decisions.md` |

## 2. Việc treo từ phiên Agent Core (hỏi người dùng nhưng chưa thấy trả lời trong transcript)
| # | Việc | Ghi chú |
|---|---|---|
| W1 | Thêm `docs/_audit/agents/` (và `docs/_knowledge/`) vào bản đồ `AGENTS.md` + `workspace-guide.md` | Agent Core hỏi 2026-11-15 11:55; chưa duyệt |
| W2 | Tạo `CLAUDE.md` chỉ chứa `@AGENTS.md` | Agent Core đề xuất; chưa tạo |
| W3 | Soạn danh sách component ưu tiên + API Button giao Components Handler. Lưu ý: Button bind variable remote `Text/text-white-on-color` và 2 set chồng (3.040 variant) → nên chốt tên prop/state trước | Agent Core 11:55 |
| W4 | Chạy Playwright (`npm run test:e2e`) chưa làm; chưa commit toàn bộ công việc 14–15/11 | Chat Agent Core 11:40 |

## 3. Mâu thuẫn / lệch thông tin phát hiện (rà soát 2026-11-15)
| ID | Mô tả | Bằng chứng | Nguồn đúng / đề xuất | Chủ sở hữu |
|---|---|---|---|---|
| X1 | Số mục `rename-map`: Reconciliation ghi "16 mục (11 proposed, 5 needs-decision)"; thực tế **85 (64/21)** | `SDS-RECONCILIATION.md` §2.1 dòng 21 vs `rename-map.json` (đếm 2026-11-15) và `workspace-guide.md` dòng 137 | Sửa Reconciliation §2.1 | Tokens Handler |
| X2 | Typo `SSDS-RECONCILIATION.md` trong tiêu đề ghi chú | `SDS-AUDIT.md` dòng 3; `SDS-CONTEXT.md` dòng 3 | Sửa thành `SDS-RECONCILIATION.md` | Tokens Handler |
| X3 | Số nhóm A/B: chat Agent Core ghi A 10 · B 225; docs hiện A **16** · B **219** | Chat 11:19 vs 11:40; `SDS-RECONCILIATION.md` §3.2 | Dùng 16/219 (sau khi đưa 6 màu vào theme) | — (chỉ nhắc) |
| X4 | `content/rules/`: workspace-guide ghi "Hai quy tắc" và cây thư mục chỉ có `SDS-rules.md`, `website-ui-rules.md`; thực tế có **3** (thêm `component-code-rules.md`) | `workspace-guide.md` dòng 103, 126 | Cập nhật workspace-guide | Agent Core |
| X5 | `about-smartads.md` (`updated: 03/11/2026`, in-review) nói website chỉ có "7 trang Introduction, Resource và bài Colors" và "snapshot 02/11"; hiện đã có 6 bài Foundation, đã đối chiếu live 14/11 | `about-smartads.md` dòng 39, 67 vs `SDS-rules.md` dòng 11 | Cập nhật bài + `updated` | Agent Core / phiên website |
| X6 | Tên thư mục gốc: tài liệu dùng `SmartAds - SDS/`; thư mục thực tế `SDS-design-system---claude` | `AGENTS.md` dòng 3; `SDS-rules.md`; đường dẫn làm việc | Quy ước tên logic; ghi chú để agent không tìm theo tên cũ | Agent Core |
| X7 | `workspace-guide.md` mô tả `docs/_audit/.gitkeep` "file rỗng giữ thư mục"; thư mục nay có 3 báo cáo + `agents/` | `workspace-guide.md` dòng 188 | Bỏ dòng hoặc nêu `agents/` | Agent Core |
| X8 | Skill `external-design-system` trỏ `E:\Test-Codex\design-system\SKILL.md` (ngoài repo, phụ thuộc máy); không xác minh được tồn tại | `.agents/skills/external-design-system/skill-design-system.md` | `[UNVERIFIED]` đường dẫn; `AGENTS.md` đã dặn "hỏng thì báo" | — |
| X9 | Skill `sds-fe-website-builder` nhắc file `gemini-code-1793846041373.md` (không có trong repo) và "Agent Core's task scope" | `.agents/skills/sds-fe-website-builder/SKILL.md` dòng 8–10 | `[NOT FOUND]` file đó | Agent Core |
| X10 | `content-guide.md` nói Logo "chưa xác minh được email qua whoami", trong khi Audit/Context ghi đọc live 14/11 bằng `info@smartads.tech` | `content-guide.md` dòng 58 vs `SDS-CONTEXT.md` dòng 12 | Hai việc đọc khác nhau (Logo export trước đó vs audit); cần ghi rõ phạm vi | Phiên website |
| X11 | Định dạng ngày: repo dùng `dd/mm/yyyy`; kho này dùng `YYYY-MM-DD` (theo yêu cầu) | `content-guide.md` dòng 64 | Chỉ nhắc khi trích | — |
| X12 | `SDS-CONTEXT.md` §1 ghi "Next.js 16 + React 19" | Chưa đối chiếu `website/package.json` | `[UNVERIFIED]` | Tokens Handler |

## 4. `[UNVERIFIED]` / `[NOT FOUND]` còn lại (từ `SDS-CONTEXT.md` §11)
`[UNVERIFIED]`: quyền Dev Mode/Inspect; cơ chế variable stale; nội dung trang Example/Application UI; code syntax/publish; Code Connect.
`[NOT FOUND]`: palette data-viz, token delta/status, density, z-index, motion, border-width, timezone, quy tắc format số/tiền, targeting selector, compare date range.
Logo: 174/177 bản lấy từ SVG tổng, chưa đối chiếu từng frame; Icons: chưa đối chiếu subset dùng trong Figma; Layout: chưa có breakpoint duyệt (`SDS-rules.md` dòng 11).

## 5. Mục `pending-approval`
*(Chưa có. Thông tin mới chỉ vào đây khi Agent Core chuyển, chờ lời duyệt của người dùng.)*
