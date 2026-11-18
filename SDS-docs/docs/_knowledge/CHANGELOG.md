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

## 2026-11-17 — Agent Core có file vai trò; thêm 5 vai kỹ năng và bản cài Claude Code
- **Thêm:** `docs/_audit/agents/agent-core.md` (quy trình làm rõ prompt → brief → xác nhận; bản đồ giao việc; ma trận kiểm chứng chéo người làm ≠ người kiểm; ranh giới "thiết kế mới không đồng bộ sang FE website"); `.claude/agents/` (agent-core + tokens-handler, components-handler, knowledge-keeper, website-builder, ui-qa-auditor, board-designer, ad-format-builder, rules-verifier); `.claude/settings.json` (`agent: agent-core`).
- **Sửa:** `agents.md` (bảng 9 agent, cách giao việc mới), `INDEX.md` (dòng Hệ thống agent); ngoài kho: `AGENTS.md` §2, §3, §11; `content/guides/workspace-guide.md`; `content/pages/introduction/ai-agents.md`.
- **Nguồn:** yêu cầu người dùng trong phiên Claude Code 2026-11-17; các file vai trò hiện có trong `docs/_audit/agents/`; skill trong `.agents/skills/`, `SDS-docs/.agents/skills/`, `skill-dist/`.
- **Duyệt:** người dùng ("Có, đăng ký") 2026-11-17.
- **Còn treo:** chưa chạy thử phiên Agent Core thật; skill `sma-ad-format` nằm ngoài repo `[UNVERIFIED]`; ad format chưa có thư mục output cố định.

## 2026-11-17 (2) — Liên kết skill và chạy được từ thư mục cha
- **Thêm:** `.claude/skills/` (junction tới `ds-conventions`, `figma-token-workflow`, `sds-spacing-foundation`, `sds-fe-website-builder`, `ui-qa-figma-vs-code`, `sds-ui-ux-board-designer`); trường `skills:` trong frontmatter agent; ghi chú "Thư mục gốc repo SDS" trong mỗi agent; thư mục cha `Docs-SMA-27102026/.claude/{agents,skills}` (junction) + `settings.json`.
- **Nguồn:** người dùng báo `claude --agent agent-core` không tìm thấy agent khi chạy ở thư mục cha (2026-11-17). Đã thử lại bằng `claude -p --agent` từ thư mục cha: `agent-core`, `rules-verifier` nạp được; 6 skill hiện trong danh sách skill.
- **Duyệt:** yêu cầu của người dùng 2026-11-17.
- **Còn treo:** khi agent chạy làm agent chính, `skills:` chỉ đưa mô tả skill, chưa nạp toàn văn — agent vẫn đọc `SKILL.md` theo hướng dẫn trong file; junction chỉ có trên máy này (không theo git).

## 2026-11-17 (3) — Hướng dẫn mở/dựng lại bộ chat agent trên máy khác
- **Thêm:** `docs/_audit/agents/SESSIONS.md` (bảng 6 chat: Agent Core, tokens-handler, website-builder, ui-qa-auditor, board-designer, rules-verifier; quy trình dựng lại; lời mở đầu mẫu) và `docs/_audit/agents/setup-agents.ps1` (tạo lại junction skill; `-Parent` cho thư mục cha). `AGENTS.md` §2 trỏ tới `SESSIONS.md`.
- **Nguồn:** yêu cầu người dùng 2026-11-17 (dùng được trên máy khác/Codex, AI hiểu và dựng lại được bộ chat).
- **Duyệt:** yêu cầu của người dùng 2026-11-17.
- **Còn treo:** chỉ file trong repo được mang theo, lịch sử chat thì không; `setup-agents.ps1` chưa chạy thử trên máy mới (chỉ viết theo các junction đã tạo ở máy này); `components-handler`, `knowledge-keeper`, `ad-format-builder` chưa có chat riêng.

## 2026-11-17 (4) — Loại skill QA UI trùng
- **Xóa:** `Docs-SMA-27102026/.agents/skills/sds-ui-qa-design-auditor/` (SKILL.md 10 KB, ngoài repo SDS, không agent/tài liệu nào tham chiếu; trùng chức năng với `sds-ui-qa-figma-vs-code`). Kiểm trước khi xóa: không file nào nhắc tên skill này; thư mục chưa nằm trong git nên không khôi phục được từ lịch sử.
- **Nguồn/Duyệt:** người dùng 2026-11-17 ("loại bỏ skill sds-ui-qa-design-auditor không được gọi đến").

## 2026-11-17 (5) — Gom file thật của mọi skill về `skills-source/`
- **Đổi:** chuyển `.agents/skills/*`, `SDS-docs/.agents/skills/*`, `skill-dist/*` vào `skills-source/` (nguồn thật duy nhất). Đổi tên thư mục cho khớp `name:` trong SKILL.md: `sds-ui-qa-figma-vs-code` → `ui-qa-figma-vs-code`, `sds-external-design-system` → `external-design-system`. Gói `.skill` → `skills-source/_packages/`. `.claude/skills` và `.agents/skills` giờ là lối tắt (junction) tới `skills-source/`, không nằm trong git (`.gitignore` mới ở gốc repo). Xóa thư mục rỗng `SDS-docs/.agents/`, `skill-dist/`.
- **Cập nhật đường dẫn:** `AGENTS.md`, `.claude/agents/*`, `content/{README,rules,guides,pages}`, `docs/_audit/agents/*`, `docs/_knowledge/*` (trừ các mục CHANGELOG cũ: chúng ghi đường dẫn tại thời điểm đó), `website/README.md`, `setup-agents.ps1`, `SESSIONS.md`.
- **Nguồn/Duyệt:** người dùng 2026-11-17 ("Hãy làm nhưng cần đặt tên lại cho rõ ràng hơn").
- **Lưu ý:** các mục CHANGELOG trước ngày này còn nhắc `.agents/skills/` và `skill-dist/` là lịch sử, không phải đường dẫn hiện hành. `website/public/source/*` và `src/data/docs.generated.json` là file sinh — cập nhật bằng build, không sửa tay.

## 2026-11-17 (6) — Thêm vùng `SDS-workspace/` cho việc hằng ngày
- **Thêm:** `SDS-workspace/` (README luật, `_template/brief.md`, `ad-formats/`, `ui-builds/`, `qa-reports/`, `_scratch/`); `.gitignore` bỏ qua `SDS-workspace/_scratch/*` và `SDS-workspace/**/node_modules/`. Cập nhật `AGENTS.md` (§2 bảng việc, §3 bản đồ, §11 ranh giới), `docs/_audit/agents/agent-core.md` (mục "Vùng làm việc hằng ngày"; brief có "Thư mục task"), `.claude/agents/{ad-format-builder,ui-qa-auditor}.md` (thư mục output), `workspace-guide.md`, `_knowledge/agents.md`.
- **Giải quyết:** ad format đã có thư mục output cố định (`SDS-workspace/ad-formats/<task>/out/`) — gỡ mục "còn treo" của mục 2026-11-17 (1).
- **Nguồn/Duyệt:** người dùng 2026-11-17 ("Làm theo đề xuất").
- **Còn treo:** quy ước commit tiền tố `SDS-workspace:` chỉ là hướng dẫn, chưa có hook ép; chưa có task thật nào trong `SDS-workspace/`.

## 2026-11-17 (7) — Đổi tên `workspace/` → `SDS-workspace/`
- **Đổi:** người dùng đổi tên thư mục trên đĩa; đã cập nhật mọi đường dẫn và `.gitignore` sang `SDS-workspace/` (AGENTS.md, agent-core.md, `.claude/agents/*`, README/khuôn, skill QA, docs). Tiền tố commit đổi thành `SDS-workspace:`. Mục (6) đã được đổi theo tên mới (tên ban đầu là `workspace/`).
- **Nguồn/Duyệt:** người dùng 2026-11-17.

## 2026-11-17 (8) — Brief có bảng Nguồn Figma theo task + script `check-tokens`
- **Thêm:** `SDS-workspace/_tools/check-tokens.mjs` + `check-tokens.test.mjs` (21 test): quét `SDS-workspace/**/out/` (html/css/js, `--svg` tùy chọn) tìm màu và cỡ chữ không theo token SDS (NOT-IN-TOKEN / HARDCODED / UNKNOWN-VAR / DEPRECATED); ngoại lệ qua `allow-tokens.json` có `reason`. Dùng lại `token-index.mjs` của skill QA, chỉ đọc snapshot trong `SDS-docs/variable-figma-export/`, không gọi Figma.
- **Đổi:** `_template/brief.md` có bảng "Nguồn Figma" (nhiều link/node-id/ngày đọc/whoami theo từng task), "Nguồn token SDS" (ngày snapshot) và điều kiện hoàn tất có check-tokens; `SDS-workspace/README.md` luật 8–9; `agent-core.md`, `ad-format-builder.md`, `components-handler.md`, `AGENTS.md` §3.
- **Nguồn/Duyệt:** người dùng 2026-11-17 ("Hãy thực hiện với 2 mục tiêu"; mỗi task dùng link Figma khác nhau, không giống SDS-docs).
- **Kiểm:** `rules-verifier` PASS có điều kiện; đã sửa các ca sót nó nêu (thuộc tính `fill="#.."`, biến `--x: #..`, JS `{color:'#..'}`/`style.fontSize`/`setProperty`/`rgb()` trần, comment `//` sau code, gợi ý ưu tiên semantic, đếm `clamp()`).
- **Còn treo:** script so với **snapshot** token (ngày đọc 02/11/2026 theo `readDate` trong `variables.*.json`, không phải mtime), token mới chưa đồng bộ có thể bị báo nhầm; không kiểm cỡ chữ tương đối (em/%/clamp, chỉ đếm), spacing/radius/shadow chưa kiểm; chuỗi màu gọi qua hàm tùy ý (vd `setColor('#fff')`) không bắt; ad format theo quy ước `sma-` có thể cần `allow-tokens.json` (`[UNVERIFIED]`).
