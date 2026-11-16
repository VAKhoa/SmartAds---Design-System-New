# CHANGELOG — kho tri thức SDS

Mỗi mục: ngày · thêm/sửa/xóa · nguồn · ai duyệt. Chỉ cập nhật sau khi người dùng chấp thuận (Agent Core chuyển lời duyệt), trừ tổng hợp ban đầu.

## 2026-11-15 — Tổng hợp ban đầu (v1)
- **Thêm:** `INDEX.md`, `decisions.md`, `open-questions.md`, `glossary.md`, `agents.md`, `CHANGELOG.md`, `topics/{product,sources-of-truth,tokens,components,website,workflow,figma-access}.md`; `docs/_audit/agents/knowledge-keeper.md`.
- **Nguồn:** `AGENTS.md`; `SDS-docs/content/{rules,guides,pages}/`; `docs/_audit/*` (+`agents/`); `.agents/skills/*`; `ds.config.json`; `tokens/rename-map.json` (đếm 85 mục); `variable-figma-export/overview.json`+`usage.json` (siêu dữ liệu); `git log`; transcript phiên Agent Core (2026-11-14 → 2026-11-15, chỉ rút quyết định/lý do, không chép dữ liệu cá nhân).
- **Duyệt:** ngoại lệ "tổng hợp ban đầu từ tài liệu đã có trong repo" theo brief của Agent Core (không cần duyệt riêng). Nội dung từ chat gắn độ tin cậy Low/Med.
- **Phát hiện:** 12 lệch thông tin (X1–X12) trong `open-questions.md` §3; không sửa file nguồn.
- **Còn treo:** W1–W4 và Q1–Q10 ở `open-questions.md`; không có mục `pending-approval`.

## 2026-11-16 — Quy tắc thông báo và recap
- **Thêm:** quy tắc "thông báo khi cập nhật sub agent + Knowledge Keeper recap" vào `AGENTS.md` §11 và ba file vai trò. **Duyệt:** người dùng yêu cầu trực tiếp 2026-11-16.

## 2026-11-16 — Gộp màu trung tính, xóa ba họ màu, chốt D3/D4/D11/D12
- **Sửa:** `topics/tokens.md` (660 variable, gate A17/B219/E424, rename-map), `INDEX.md`, `glossary.md`, `decisions.md` (D3, D4, D11, D12), `open-questions.md` (Q2).
- **Nguồn:** Figma đọc lại 2026-11-16 (`info@smartads.tech`); `docs/_audit/FIGMA-CHANGELOG.md`, `NEUTRAL-MERGE.md`, `UNUSED-TOKENS.md`; `variable-figma-export/`; `tokens/rename-map.json`.
- **Duyệt:** người dùng duyệt trực tiếp trong phiên Agent Core ngày 2026-11-16 (chốt thang neutral 13 bậc; tự xóa `color/secondary light`, `color/red dark`, `color/orange`; yêu cầu cập nhật repo và sub agent).
- **Còn treo:** 3 alias mode Dark trỏ vào màu đã xóa; 9 token `color/secondary dark` deprecated chưa xóa; ~1.080 màu hard-code; D4 và D12 chưa áp dụng vào Figma.

## 2026-11-16 — Đối chiếu và sửa sau khi Agent Core tự sửa kho
- **Agent Core đã sửa trực tiếp:** `topics/tokens.md`, `INDEX.md`, `glossary.md`, `decisions.md`, `open-questions.md`, `CHANGELOG.md` (2 mục), `agents.md`, file vai trò.
- **Kiểm với nguồn gốc (chạy lại 2026-11-16):** `build-tokens.mjs` → A17/B219/E424 ✓; `ds-tokens.mjs lint` → 780 token/186 error/314 warn ✓; `rename-map.json` → 98 (13/4/60/21) ✓; `overview.json` → 660 variable, Primitives 226 ✓; `open-decisions.md` D3/D4/D11/D12 ✓.
- **Sửa:** `decisions.md` (bảng D3/D4/D11/D12 lệch cột → viết lại, tiêu đề D1–D12, mục đề xuất); `open-questions.md` (Q1/Q3/Q4/Q9 đã chốt, W1/W2, X1–X4/X12 xong, thêm X13–X15); `INDEX.md`, `glossary.md` (A=17, thêm `color/neutral`, DEPRECATED); `topics/tokens.md` (ghi chú X1/X15).
- **Duyệt:** lời duyệt của người dùng qua Agent Core 2026-11-16.
- **Còn treo:** W1, X5, X7, X9, X14, X15; 9 token `secondary dark` chờ cho phép xóa; D4/D12 chưa áp dụng vào Figma.

## 2026-11-16 (2) — Đóng các mâu thuẫn nguồn đã được xử lý
- **Đóng:** W1, X1 (dòng 23 Reconciliation), X5, X7; **sửa mô tả:** X9 (gemini đã bỏ; đường dẫn ngoài repo của `external-design-system` là cố ý, vẫn `[UNVERIFIED]`).
- **Nguồn:** Agent Core báo + tôi grep lại `workspace-guide.md`, `website/README.md`, `ai-agents.md`, `about-smartads.md`, `SDS-RECONCILIATION.md`, `.agents/skills` ngày 2026-11-16. Chưa tự chạy lại `npm run build` (30/30 trang là lời Agent Core).
- **Duyệt:** người dùng ("Hãy xử lý") qua Agent Core 2026-11-16.
- **Còn treo:** X14, X15, X9 (không đổi), W3, W4, 9 token `secondary dark`, D4/D12 chưa áp dụng Figma, D2/D5–D8 mở.
