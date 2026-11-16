# Hệ thống sub agent

> Cập nhật 2026-11-15. Người dùng chỉ làm việc với **Agent Core**; các agent còn lại nhận việc qua Agent Core. Giao tiếp giữa phiên bằng SendMessage tới id phiên.

| Agent | Id phiên | Phạm vi | Không sở hữu | File vai trò |
|---|---|---|---|---|
| **Agent Core** (leader/manager) | — | Điều phối, làm việc với người dùng, cổng duyệt, `AGENTS.md`, workspace-guide, website (điều phối), UI shell | — | (chưa có file riêng) `[NOT FOUND]` |
| **Tokens Handler** | — | `variable-figma-export/`(+`usage.json`), `tokens/`, `scripts/`, `tests/`, `docs/_audit/*`, `ds.config.json`; đặt tên, lint, build tokens, đồng bộ/audit từ Figma | Code component, UI website | `docs/_audit/agents/tokens-handler.md` |
| **Components Handler** | — | Spec + code HTML/CSS/JS thuần, bài `content/pages/components/*` và patterns, bảng component↔token | Token/scripts/rename-map, shell website, ghi Figma | `docs/_audit/agents/components-handler.md` |
| **Knowledge Keeper** | — | Kho `docs/_knowledge/`: chỉ mục, tổng hợp, bằng chứng, nhật ký | Sửa file nguồn, quyết định thay người dùng | `docs/_audit/agents/knowledge-keeper.md` |

## Cách giao việc
1. Người dùng → Agent Core. Agent Core chọn agent theo phạm vi ở trên và gửi brief (đầu ra, nguồn/node Figma, phạm vi, điều kiện hoàn tất).
2. Agent cần context → hỏi Knowledge Keeper qua Agent Core; nhận lại trích dẫn kèm `file:dòng`, ngày, độ tin cậy.
3. Component cần token mới/đổi tên → Components Handler gửi yêu cầu cho Tokens Handler qua Agent Core.
4. Thông tin mới muốn vào kho → Agent Core chuyển kèm lời duyệt của người dùng; chưa duyệt = `pending-approval` ([open-questions.md](open-questions.md) §5).

## Quy tắc chung mọi agent
Figma chỉ đọc (`whoami`=`info@smartads.tech`, đúng file được giao); giữ D1/D9/D10; không commit/push khi chưa được yêu cầu; không bịa (`[UNVERIFIED]`/`[NOT FOUND]`/`needs-value`). Thư mục `_audit/agents/` và `_knowledge/` **chưa** nằm trong bản đồ `AGENTS.md`/`workspace-guide.md` (xem W1 ở open-questions).
