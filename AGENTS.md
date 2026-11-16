# SmartAds Design System (SDS)

Đây là file `AGENTS.md` duy nhất trong dự án: điểm vào theo quy ước để Codex, Claude Code và mọi AI khác tự đọc (Claude Code nạp qua `CLAUDE.md` chỉ chứa `@AGENTS.md`), không phải tên một agent cần gọi. Đọc hết file này trước, rồi chỉ mở thêm file được liệt kê ở mục 2 cho đúng việc. Mọi đường dẫn tính từ **thư mục gốc repo** (nơi có file này, bất kể tên thư mục trên máy).

## 1. Dự án là gì
SmartAds (smartads.tech) là nền tảng AdTech self-serve ads manager + analytics/reporting. SDS là design system của nó: **Figma là nguồn gốc (root)**, repo này chứa bản chụp token, quy tắc, báo cáo audit và website tài liệu. Chi tiết sản phẩm và người dùng: `SDS-docs/content/guides/about-smartads.md`.

## 2. Việc nào → đọc file nào
| Việc | Đọc (theo thứ tự) |
|---|---|
| Bất kỳ việc nào trong `SDS-docs/` | `SDS-docs/content/rules/SDS-rules.md` (quy tắc chung) → `SDS-docs/content/guides/workspace-guide.md` (cấu trúc thư mục, chọn quy trình và lệnh kiểm tra) |
| Cần giá trị token, style, component, tên chuẩn | `SDS-docs/docs/_audit/SDS-CONTEXT.md` (bản nén, **chỉ nội dung qua quality gate**, có ngày đọc) → khi cần chi tiết: `SDS-docs/tokens/generated/tokens.json` (sinh bằng `node scripts/build-tokens.mjs`) hoặc `SDS-docs/variable-figma-export/` |
| Hỏi "token/component nào tốt, nên sửa gì" | `SDS-docs/docs/_audit/SDS-AUDIT.md` (vấn đề, đề xuất, mapping đổi tên, lộ trình, câu hỏi chờ quyết) và `SDS-docs/docs/_audit/SDS-RECONCILIATION.md` (đối chiếu Figma ↔ repo, nhóm A–E) |
| Đặt tên / đổi tên token | skill `SDS-docs/.agents/skills/ds-conventions/` (+ `references/`) và `SDS-docs/tokens/rename-map.json` |
| Đồng bộ, audit, lint token từ Figma | skill `SDS-docs/.agents/skills/figma-token-workflow/` |
| Spacing / radius | skill `SDS-docs/.agents/skills/sds-spacing-foundation/` + `references/spacing-radius.md` |
| Build / sửa UI website tài liệu | `SDS-docs/content/rules/website-ui-rules.md` + skill `.agents/skills/sds-fe-website-builder/SKILL.md` + `SDS-docs/website/README.md` |
| Viết bài tài liệu | `SDS-docs/content/guides/content-guide.md` (đường dẫn từng bài) |
| Viết / mô tả **component sản phẩm** (code bàn giao) | `SDS-docs/content/rules/component-code-rules.md` |
| Chia việc theo vai (tokens / components / kho tri thức) | `SDS-docs/docs/_audit/agents/*.md` (phạm vi và quy trình từng vai); tra cứu nhanh: `SDS-docs/docs/_knowledge/INDEX.md` |

## 3. Bản đồ cấu trúc
```text
<thư-mục-gốc-repo>/
├─ AGENTS.md                      ← file này (CLAUDE.md = `@AGENTS.md`; .gitattributes = LF)
├─ .agents/skills/                sds-fe-website-builder (FE docs) · external-design-system (liên kết tới thư mục ngoài repo; hỏng thì báo, không thay nguồn khác)
└─ SDS-docs/
   ├─ ds.config.json              file key Figma · prefix CSS `sa` · themes · tên collection
   ├─ variable-figma-export/      bản chụp Figma (02/11/2026, đối chiếu live 14/11/2026, cập nhật 16/11/2026: 660 variable) + usage.json (token/style nào được component dùng)
   ├─ tokens/rename-map.json      đề xuất đổi tên (chưa mục nào `approved`)
   ├─ tokens/generated/           OUTPUT sinh bằng build-tokens.mjs — không sửa tay, không commit
   ├─ scripts/                    ds-tokens.mjs (lint/suggest) · build-tokens.mjs · css-name.mjs · dump-*.figma.js (mã chạy trong Figma Plugin API, chỉ đọc)
   ├─ tests/                      run-tests.mjs (+ fixtures: dữ liệu mẫu, không phải token thật)
   ├─ content/{rules,guides,pages}  quy tắc · hướng dẫn · bài hiển thị trên website
   ├─ docs/_audit/                SDS-CONTEXT · SDS-AUDIT · SDS-RECONCILIATION (báo cáo audit) · FIGMA-CHANGELOG (Figma đã đổi gì, đọc trước khi dùng số liệu) · NEUTRAL-MERGE · UNUSED-TOKENS · agents/ (mô tả vai trò sub agent: tokens, components, knowledge — mô tả công việc, không phụ thuộc công cụ)
   ├─ docs/_knowledge/            kho tri thức PHÁI SINH (chỉ mục, quyết định, câu hỏi mở, glossary) — không phải nguồn; mâu thuẫn thì file nguồn thắng
   ├─ .agents/skills/             ds-conventions · figma-token-workflow · sds-spacing-foundation
   └─ website/                    Next.js + React (JS, CSS thuần) — website tài liệu
```

## 4. Nguồn sự thật và độ ưu tiên
1. **Figma** (file key trong `SDS-docs/ds.config.json`) thắng mọi nguồn khi mâu thuẫn.
2. `variable-figma-export/` = bản chụp có ngày; dùng khi chưa cần đọc lại Figma, luôn ghi ngày. `usage.json` cho biết token nào được component dùng.
3. `docs/_audit/*` = báo cáo suy ra từ (1)–(2), có ngày; **cập nhật lại khi Figma đổi**, không coi là nguồn gốc.
4. Code repo (CSS website, script) là tham khảo phụ; nội dung chỉ dùng cho website docs (`--sa-docs-*`, `--sa-resource-*`, `--sa-space-*`) **không** phải token sản phẩm.
5. Thứ không xác minh được ghi `[UNVERIFIED]`; không có thì ghi `[NOT FOUND]`; thiếu giá trị ghi `needs-value`. Không bịa token/component/giá trị.
6. Đề xuất đổi tên chỉ nằm trong `tokens/rename-map.json` (`proposed`/`needs-decision`); chỉ người dùng được duyệt (`approved`). Không coi đề xuất là tên đã duyệt.

## 5. Quyết định đã chốt (đừng đảo ngược khi chưa được yêu cầu)
- **D1** (02/11/2026): prefix code/CSS là `sa`; tên viết tắt dự án là `SDS`.
- **D9** (14/11/2026): token sản phẩm **chỉ Light mode** (`ds.config.json` `themes: ["light"]`). Mode Dark của `Alias` và `Shadow/elevation-dark/*` vẫn còn trong Figma nhưng ngoài phạm vi (xóa/ẩn chờ người dùng duyệt). Theme dark của **website tài liệu** vẫn giữ (tách biệt với token sản phẩm).
- **D10** (12/11/2026, xác nhận 14/11/2026): component thực tế, ví dụ cho Dev copy và code handoff dùng **HTML/CSS/JavaScript thuần**, chạy độc lập framework (`SDS-docs/content/rules/component-code-rules.md`). Website tài liệu giữ Next.js/React và cách trình bày hiện tại; React/JSX của shell, viewer, công cụ tài liệu không phải code component bàn giao. Không chuyển website sang stack khác vì quy tắc này. Skill/hướng dẫn nào nhắc Bootstrap/jQuery/Tailwind cho component bàn giao là không áp dụng.
- **D3 — trung tính** (16/11/2026, đã áp dụng trong Figma): một thang `color/neutral/{50…950}` 13 bậc, gộp từ `color/gray` + `color/secondary dark`. Không dùng lại tên `color/gray/*`; 9 token `color/secondary dark/*` còn lại là `DEPRECATED`. Chi tiết: `SDS-docs/docs/_audit/NEUTRAL-MERGE.md`.
- **Đã xóa khỏi Figma** (16/11/2026, người dùng xóa): `color/secondary light/*`, `color/red dark/*`, `color/orange/*`. Không tạo lại, không tham chiếu. Nhật ký thay đổi Figma: `SDS-docs/docs/_audit/FIGMA-CHANGELOG.md`.
- **D4** thang cỡ chữ dùng số px · **D11** spacing giữ t-shirt · **D12** mode Dark tạm ẩn, không xóa (16/11/2026; D4 và D12 chưa áp dụng vào Figma).
- D2, D5–D8 và phần còn lại của D3: còn mở — xem `SDS-docs/.agents/skills/ds-conventions/references/open-decisions.md` và `SDS-docs/docs/_audit/SDS-AUDIT.md` §6.

## 6. Quy tắc đặt tên và tên CSS
- Mọi tên CSS của token theo **một** quy tắc trong `SDS-docs/scripts/css-name.mjs`: `--sa-` + tên Figma chữ thường, bỏ ngoặc, khoảng trắng và `/` → `-` (vd `color/red light/500` → `--sa-color-red-light-500`). Không tự nghĩ tên CSS khác.
- Giữ nguyên tên gốc trong Figma (đúng chữ hoa/thường, kể cả lỗi chính tả) khi liệt kê; chuẩn hóa chỉ là đề xuất trong rename-map.
- Phân loại token/component (báo cáo audit): **A** khớp Figma + repo · **B** chỉ Figma, qua gate, chưa có code · **C** chỉ repo · **D** cùng khái niệm khác tên/giá trị · **E** không qua gate (kèm lý do: orphan, naming, tier, hardcode, value-named, duplicate, scale-order, a11y…). Chi tiết: `SDS-RECONCILIATION.md` §3.
- Mọi file sinh tự động phải được sửa từ đầu vào hoặc script sinh, không sửa trực tiếp output (`tokens/generated/`, `website/src/styles/figma.generated.css`, `*.generated.json`, `out/`, `.next/`).

## 7. Lệnh kiểm tra (chạy từ `SDS-docs/`; chi tiết theo loại task ở workspace-guide)
```bash
node tests/run-tests.mjs                               # sau khi sửa script/token
node scripts/ds-tokens.mjs lint variable-figma-export/
node scripts/build-tokens.mjs                          # sinh tokens/generated/tokens.json
# trong website/: npm ci · npm run build · npm run test:e2e (cần Chrome)
```

## 8. Giữ thông tin liền mạch (làm sau mỗi thay đổi)
- Khi Figma đổi: đồng bộ lại `variable-figma-export/` (dump), cập nhật `usage.json`, chạy `build-tokens.mjs` và test, rồi cập nhật `docs/_audit/*` (số liệu, ngày) và `tokens/rename-map.json`.
- Sau **mọi** thay đổi trong `SDS-docs/`: kiểm tra `content/pages/`, `website/README.md` và `content/guides/workspace-guide.md` có còn đúng không (tên file, quy tắc, số liệu, lệnh, trạng thái); sửa, cập nhật `updated` trong frontmatter của trang đã sửa, rồi build. Quy trình đầy đủ: `SDS-rules.md`.
- Báo rõ nguồn, ngày dữ liệu, file đã sửa, kết quả kiểm tra và phần còn là bản nháp.

## 9. Công nghệ
- **Component bàn giao:** HTML/CSS/JS thuần (mục 5, D10). Icon sản phẩm: MingCute SVG đã khóa phiên bản, dán inline; logo/asset từ Figma.
- **Website tài liệu:** Next.js + React (JavaScript, CSS thuần), `marked`, Playwright; icon chức năng Tabler qua `website/src/components/Icon.js`. Đọc `website-ui-rules.md` khi build UI.

## 10. Truy cập Figma (bắt buộc, chỉ đọc)
- Tài khoản hợp lệ duy nhất là **`info@smartads.tech`**. Gọi `whoami` để xác minh **trước khi đọc**; không dùng phiên của bất kỳ tài khoản nào khác (kể cả tài khoản cá nhân) để kết luận về SmartAds. URL có `?m=dev` chỉ mô tả chế độ, không xác nhận tài khoản hay quyền Dev Mode.
- Ưu tiên plugin cục bộ **`figma-local@figma-local-workspace`**: dùng công cụ đọc metadata, design context, screenshot hoặc export, không điều khiển giao diện máy. Nếu plugin chưa có, được dùng **Figma MCP connector** (`get_metadata`, `get_variable_defs`, `get_design_context`, `get_screenshot`) **chỉ khi** `whoami` trả `info@smartads.tech`. Không tự chuyển sang plugin marketplace, app desktop hoặc Chrome khi người dùng chưa yêu cầu. Nếu sau này được giao dùng app desktop, chuyển sang Dev Mode ngay khi mở đúng file và xác minh panel Inspect.
- Danh sách đầy đủ token/component không lấy được bằng `get_variable_defs` (chỉ trả variable bind trong một node). Muốn đọc lại danh sách đầy đủ hoặc quét usage, chạy script **chỉ đọc** (`SDS-docs/scripts/dump-variables.figma.js`, `dump-styles.figma.js`, `dump-usage.figma.js`) qua công cụ chạy Plugin API — công cụ này về kỹ thuật có thể ghi, nên **chỉ dùng cho script đọc và chỉ khi người dùng đã cho phép rõ trong task**.
- Nếu công cụ chưa cấp, chưa xác thực đúng email, thiếu quyền đọc/Inspect hoặc bị rate limit: ghi rõ giới hạn, không kết luận từ nguồn khác như thể đã xác minh.
- Chỉ truy cập **đúng file Figma được người dùng chỉ định cho task hiện tại**: kiểm tra file key trong URL trước khi gọi; không duyệt Recents, file khác hoặc thư viện liên kết để lấy thêm dữ liệu khi chưa được giao. Nếu chưa xác định được file, hỏi rõ thay vì tự chọn.
- **Không tạo, sửa, đổi tên, di chuyển, xóa, publish hoặc thay đổi bất kỳ nội dung/cài đặt nào trong Figma** (kể cả đổi tên token/prop, xóa mode, rebind, thêm token) nếu người dùng chưa cho phép rõ ràng đúng hành động đó trên đúng file. Quyền chỉnh sửa website hoặc tài liệu SDS không đồng nghĩa quyền chỉnh sửa Figma. Đề xuất sửa Figma chỉ được ghi vào `rename-map.json` / `SDS-AUDIT.md`.

## 11. Dùng nhiều AI song song (Claude Code + Codex + khác)
- Mọi AI đọc **cùng** `AGENTS.md`; không có quy tắc riêng cho một công cụ. Thông tin cần cho việc phải nằm trong repo (file Markdown/JSON), không nằm trong trí nhớ hay phiên của một AI.
- Skill nằm ở `.agents/skills/` và `SDS-docs/.agents/skills/` (định dạng `SKILL.md` dùng được cho cả hai). Claude Code không tự nạp thư mục này: mở đúng skill theo bảng mục 2.
- Không dựa vào tính năng chỉ một công cụ có (nhắn tin giữa phiên, hook, mã phiên). Phân vai trong `docs/_audit/agents/` là mô tả công việc, ai nhận cũng làm được.
- Trước khi sửa: xem `git status`; không sửa cùng một file khi AI khác đang sửa. Không commit/push khi chưa được yêu cầu.
- **Thông báo khi cập nhật (yêu cầu của người dùng 16/11/2026):** mọi thay đổi liên quan sub agent (file vai trò trong `docs/_audit/agents/`, quyết định, trạng thái Figma, quy ước, cấu trúc repo) phải kèm bước: (1) AI điều phối (Agent Core) báo cho từng sub agent bị ảnh hưởng — nội dung đổi, file nào, ngày, việc họ cần làm; (2) **Knowledge Keeper gửi recap** kiến thức mới/đã sửa (thêm/sửa gì, file, nguồn, ngày, còn gì treo) về người dùng; (3) ghi một dòng vào `docs/_knowledge/CHANGELOG.md`. Không coi việc cập nhật là xong khi chưa báo và chưa có recap. Quy trình đầy đủ: `docs/_audit/agents/knowledge-keeper.md`.
- Một kiểu xuống dòng (LF, `.gitattributes`). File sinh ra (mục 6) chỉ tạo lại bằng script, không sửa tay.
