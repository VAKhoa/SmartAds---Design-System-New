# Hệ thống sub agent

> Cập nhật 2026-11-17. Người dùng chỉ làm việc với **Agent Core**; các agent còn lại nhận việc và báo kết quả qua Agent Core. Nguồn: `docs/_audit/agents/*.md` (mô tả không phụ thuộc công cụ). Bản cài cho Claude Code: `.claude/agents/<tên>.md` ở gốc repo, `.claude/settings.json` đặt `agent-core` làm agent chính `[UNVERIFIED: chưa chạy thử phiên thật]`.

| Agent | Tên trong Claude Code | Phạm vi | Không sở hữu | File vai trò / skill |
|---|---|---|---|---|
| **Agent Core** (leader/manager) | `agent-core` | Làm rõ prompt (brief + câu hỏi xác nhận), giao việc, điều phối kiểm chứng chéo, cổng duyệt, báo cáo | Tự làm thay, tự kiểm | `docs/_audit/agents/agent-core.md` |
| **Tokens Handler** | `tokens-handler` | `variable-figma-export/`(+`usage.json`), `tokens/`, `scripts/`, `tests/`, `docs/_audit/*`, `ds.config.json`; đặt tên, lint, build tokens, đồng bộ/audit từ Figma | Code component, UI website | `docs/_audit/agents/tokens-handler.md` |
| **Components Handler** | `components-handler` | Spec + code HTML/CSS/JS thuần, bài `content/pages/components/*` và patterns, bảng component↔token | Token/scripts/rename-map, website, ghi Figma | `docs/_audit/agents/components-handler.md` |
| **Knowledge Keeper** | `knowledge-keeper` | Kho `docs/_knowledge/`: chỉ mục, bằng chứng, nhật ký, recap | Sửa file nguồn, quyết định thay người dùng | `docs/_audit/agents/knowledge-keeper.md` |
| **Website Builder** | `website-builder` | `SDS-docs/website/` — chỉ khi người dùng giao rõ việc website | Đồng bộ thiết kế mới lên website | `skills-source/sds-fe-website-builder/SKILL.md` |
| **UI QA Auditor** | `ui-qa-auditor` | So Figma ↔ code (chỉ đọc) | Sửa code, kiểm code mình viết | `skills-source/ui-qa-figma-vs-code/SKILL.md` |
| **Board Designer** | `board-designer` | Dựng board UI/UX trong Figma (ghi khi có lời duyệt) | Website, code bàn giao, token repo | `skills-source/sds-ui-ux-board-designer/SKILL.md` |
| **Ad Format Builder** | `ad-format-builder` | Ad format HTML/CSS/JS `sma-` trong thư mục được chỉ định | `SDS-docs/website/`, `content/` | skill `sma-ad-format` (ngoài repo) `[UNVERIFIED]` |
| **Rules Verifier** | `rules-verifier` | Kiểm tuân thủ rule và phạm vi brief (chỉ đọc) | Sửa file | `docs/_audit/agents/agent-core.md` (checklist ở `.claude/agents/rules-verifier.md`) |

## Cách giao việc
1. Người dùng → Agent Core. Agent Core gửi **Brief đề xuất** (hiểu là gì, điểm mơ hồ, brief viết lại, câu hỏi) và chờ người dùng xác nhận.
2. Agent Core giao người làm theo bản đồ trong `agent-core.md`, brief tự đứng được (đầu ra, nguồn/node Figma, phạm vi được/không được sửa, điều kiện hoàn tất, lời duyệt nguyên văn).
3. Agent Core giao **agent khác** kiểm chứng (chế độ VERIFY, chỉ đọc) theo ma trận; FAIL → sửa, tối đa 2 vòng rồi hỏi người dùng.
4. Agent cần context → hỏi Knowledge Keeper qua Agent Core. Component cần token mới → Tokens Handler qua Agent Core.
5. Thông tin mới muốn vào kho → Agent Core chuyển kèm lời duyệt; chưa duyệt = `pending-approval` ([open-questions.md](open-questions.md)).

## Vùng làm việc hằng ngày
Build UI, ad format, báo cáo QA, thử nghiệm làm trong `SDS-workspace/<loại>/<năm-tháng>-<slug>/` (luật `SDS-workspace/README.md`), không trong `SDS-docs/`, không sang website. Agent Core ghi thư mục task vào brief.

## Quy tắc chung mọi agent
Figma chỉ đọc (`whoami`=`info@smartads.tech`, đúng file được giao); giữ D1/D9/D10; thiết kế mới không đồng bộ sang website (2026-11-17); không commit/push khi chưa được yêu cầu; không bịa (`[UNVERIFIED]`/`[NOT FOUND]`/`needs-value`).

## Mở bộ chat trên máy khác
Xem `docs/_audit/agents/SESSIONS.md` (bảng chat, cách dựng lại, script `setup-agents.ps1`).
