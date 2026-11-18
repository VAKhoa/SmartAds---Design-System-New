# Câu hỏi mở, mâu thuẫn và mục chờ duyệt

> Cập nhật: 2026-11-16 (đối chiếu sau thay đổi Figma/quyết định 16/11; ban đầu 2026-11-15). Nguồn gốc thắng; kho không tự sửa file nguồn — đề xuất gửi agent sở hữu qua Agent Core.

## 1. Câu hỏi chờ người dùng quyết
Nguồn: `SDS-docs/docs/_audit/SDS-AUDIT.md` §6 (14/11/2026) + `open-decisions.md`.
| # | Câu hỏi | Liên quan |
|---|---|---|
| Q1 | ~~Thang cỡ chữ~~ **Đã chốt D4 (số px) 2026-11-16.** Còn mở: xác nhận "phương án A" đúng là số px; `Microscope`/`Tini` đổi thành gì (D2) | D4, D2 |
| Q2 | (Phần gộp trung tính đã chốt 16/11/2026: `color/neutral` 13 bậc.) Ba họ `color/secondary light`, `color/red dark`, `color/orange` đã được người dùng xóa 16/11/2026. Còn mở: xóa hẳn 9 token `color/secondary dark` deprecated; trỏ lại 3 alias Dark đang treo. | D3 |
| Q3 | ~~Spacing~~ **Đã chốt D11: giữ t-shirt (2026-11-16).** Còn mở: docs đổi `--sa-space-*` theo t-shirt hay giữ numeric | D11, D-01 |
| Q4 | ~~Xóa hay ẩn Dark~~ **Đã chốt D12: tạm ẩn, không xóa (2026-11-16)**; chưa làm trong Figma, cần cho phép từng hành động. 3 alias Dark đang treo: người dùng quyết để nguyên (theo Agent Core 2026-11-16) | D9, D12, TK-14 |
| Q5 | Palette data-viz: 8 hay 10 màu series? Cần bộ màu riêng Advertiser/Publisher? | AT-01 |
| Q6 | Danh sách trạng thái lifecycle chính thức (11) và màu từng trạng thái? | AT-03 |
| Q7 | Format số/tiền vi-VN ("1,2 Tr/3,4 Tỷ" hay "1.2M/3.4B"); timezone mặc định `Asia/Ho_Chi_Minh`? | AT-08 |
| Q8 | Density: 3 mode hay 2? | AT-04 |
| Q9 | Duyệt tiếp `rename-map.json`: hiện 13 approved (neutral), 4 rejected, 60 proposed, 21 needs-decision (2026-11-16) | P5 |
| Q10 | D2, D5, D6, D8 (chưa có câu riêng trong Audit §6) | `open-decisions.md` |

## 2. Việc treo từ phiên Agent Core (hỏi người dùng nhưng chưa thấy trả lời trong transcript)
| # | Việc | Ghi chú |
|---|---|---|
| W1 | ~~Nhắc `_audit/agents/`, `_knowledge/` trong workspace-guide, website/README, ai-agents~~ Đã xong 2026-11-16 (grep: workspace-guide 2, website/README 1, ai-agents có dòng FIGMA-CHANGELOG) | Xong |
| W2 | ~~Tạo `CLAUDE.md`~~ Đã tạo (nội dung `@AGENTS.md`) | Xong |
| W3 | Soạn danh sách component ưu tiên + API Button giao Components Handler. Lưu ý: Button bind variable remote `Text/text-white-on-color` và 2 set chồng (3.040 variant) → nên chốt tên prop/state trước | Agent Core 11:55 |
| W4 | Chạy Playwright (`npm run test:e2e`) chưa làm; chưa commit toàn bộ công việc 14–16/11 (git status 2026-11-16: nhiều file M) | Chat Agent Core 11:40 |

## 3. Mâu thuẫn / lệch thông tin phát hiện (rà soát 2026-11-15)
| ID | Mô tả | Bằng chứng | Nguồn đúng / đề xuất | Chủ sở hữu |
|---|---|---|---|---|
| X1 | ~~rename-map trong Reconciliation~~ Đã sửa: dòng 23 ghi 98 mục (60/21/13/4), lint 780/186/314 (đọc 2026-11-16) | — | Xong | — |
| X2 | ~~Typo SSDS~~ Đã sửa (grep 2026-11-16: không còn) | — | Xong | — |
| X3 | Số gate: A16/B219/E455 (14/11) → **A17/B219/E424** (16/11; `build-tokens.mjs` chạy lại, khớp) | `FIGMA-CHANGELOG.md` | Dùng số mới | — |
| X4 | ~~workspace-guide thiếu component-code-rules~~ Đã sửa (cây thư mục dòng 103 có đủ 3 file) | — | Xong | — |
| X5 | ~~about-smartads lỗi thời~~ Đã sửa: dòng 39 nêu sáu bài Foundation (đọc 2026-11-16) | — | Xong | — |
| X6 | Tên thư mục gốc: tài liệu dùng `SmartAds - SDS/`; thư mục thực tế `SDS-design-system---claude` | `AGENTS.md` dòng 3; `SDS-rules.md`; đường dẫn làm việc | Quy ước tên logic; ghi chú để agent không tìm theo tên cũ | Agent Core |
| X7 | ~~Dòng .gitkeep trong workspace-guide~~ Đã bỏ (grep 2026-11-16) | — | Xong | — |
| X8 | Skill `external-design-system` trỏ `E:\Test-Codex\design-system\SKILL.md` (ngoài repo, phụ thuộc máy); không xác minh được tồn tại | `skills-source/external-design-system/skill-design-system.md` | `[UNVERIFIED]` đường dẫn; `AGENTS.md` đã dặn "hỏng thì báo" | — |
| X9 | `gemini-code-…md` đã bỏ khỏi skill (grep 2026-11-16). Skill `external-design-system` cố ý giữ đường dẫn ngoài repo (skill tùy chọn, theo Agent Core); không xác minh được tồn tại `[UNVERIFIED]` | `skills-source/external-design-system/skill-design-system.md` | Giữ nguyên | — |
| X10 | `content-guide.md` nói Logo "chưa xác minh được email qua whoami", trong khi Audit/Context ghi đọc live 14/11 bằng `info@smartads.tech` | `content-guide.md` dòng 58 vs `SDS-CONTEXT.md` dòng 12 | Hai việc đọc khác nhau (Logo export trước đó vs audit); cần ghi rõ phạm vi | Phiên website |
| X11 | Định dạng ngày: repo dùng `dd/mm/yyyy`; kho này dùng `YYYY-MM-DD` (theo yêu cầu) | `content-guide.md` dòng 64 | Chỉ nhắc khi trích | — |
| X12 | "Next.js 16 + React 19" **đã xác minh**: `website/package.json` next 16.4.3, react 19.3.1 (2026-11-16) | — | Xong | — |

| X13 | D9 (14/11) "xóa/ẩn chờ duyệt" vs D12 (16/11) "tạm ẩn, không xóa" — không mâu thuẫn, D12 bổ sung D9 | `open-decisions.md` | Dùng D12 | — |
| X14 | Quét usage của 30 token đã xóa chỉ trên 45 trang component (14/11); trang Application UI/Website UI chưa quét → có thể có bind trực tiếp bị mất `[UNVERIFIED]` | `FIGMA-CHANGELOG.md`; `UNUSED-TOKENS.md` | Quét lại cả file trước khi xóa tiếp | Tokens Handler |
| X15 | Từng lý do E (naming 165, duplicate 18…) và tách theo collection trong `topics/tokens.md` (Agent Core viết): tổng A/B/E và tổng mỗi collection khớp `build-tokens.mjs` (17/219/424), từng lý do **chưa tự kiểm** | `topics/tokens.md` | `[UNVERIFIED]` | — |

## 4. `[UNVERIFIED]` / `[NOT FOUND]` còn lại (từ `SDS-CONTEXT.md` §11)
`[UNVERIFIED]`: quyền Dev Mode/Inspect; cơ chế variable stale; nội dung trang Example/Application UI; code syntax/publish; Code Connect.
`[NOT FOUND]`: palette data-viz, token delta/status, density, z-index, motion, border-width, timezone, quy tắc format số/tiền, targeting selector, compare date range.
Logo: 174/177 bản lấy từ SVG tổng, chưa đối chiếu từng frame; Icons: chưa đối chiếu subset dùng trong Figma; Layout: chưa có breakpoint duyệt (`SDS-rules.md` dòng 11).

## 5. Mục `pending-approval`
*(Chưa có (2026-11-16). Thông tin mới chỉ vào đây khi Agent Core chuyển, chờ lời duyệt của người dùng.)*
