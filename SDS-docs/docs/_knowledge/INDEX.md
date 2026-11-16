# SDS Knowledge Base — INDEX

> Kho tri thức của Knowledge Keeper. **Không phải nguồn gốc**: Figma > `variable-figma-export/` > `docs/_audit/*` > kho này. Khi mâu thuẫn, nguồn gốc thắng và mâu thuẫn được ghi ở [open-questions.md](open-questions.md).
> Tổng hợp ban đầu: **2026-11-15** · Dữ liệu repo: commit `5571e94` (2026-11-13) + thay đổi chưa commit đến 2026-11-15 · Snapshot Figma 2026-11-02, đối chiếu live 2026-11-14.
> Độ tin cậy: **High** = đọc trực tiếp ở file nguồn, còn nguyên; **Med** = suy ra từ báo cáo có ngày; **Low** = từ chat/chưa xác minh.

## Mục lục theo chủ đề

| Chủ đề | Tóm tắt | Tổng hợp | Nguồn gốc | Dữ liệu | Tin cậy |
|---|---|---|---|---|---|
| Sản phẩm & người dùng | SmartAds = nền tảng AdTech (Advertiser/Publisher/Reader); SDS = nguồn tham chiếu thiết kế chung | [topics/product.md](topics/product.md) | `SDS-docs/content/guides/about-smartads.md` | 2026-11-03 | High |
| Nguồn sự thật & thứ tự ưu tiên | Figma > snapshot > audit > code repo > kho | [topics/sources-of-truth.md](topics/sources-of-truth.md) | `AGENTS.md` §4 | 2026-11-15 | High |
| Quyết định D1–D10 | D1, D9, D10 đã chốt; D2–D8 mở | [decisions.md](decisions.md) | `AGENTS.md` §5; `open-decisions.md` | 2026-11-15 | High |
| Token | 690 variable/6 collection, 132 style; gate A16/B219/E455; Light-only | [topics/tokens.md](topics/tokens.md) | `SDS-CONTEXT.md`, `SDS-RECONCILIATION.md`, `SDS-AUDIT.md`, `rename-map.json` | 2026-11-14 | High/Med |
| Component | 145 Figma (77 qua gate, nhóm B), 0 component sản phẩm trong repo; code bàn giao HTML/CSS/JS thuần | [topics/components.md](topics/components.md) | `component-code-rules.md`, `SDS-CONTEXT.md` §6–8 | 2026-11-14 | High/Med |
| Website docs | Next.js + React; 7 Introduction + Resource + 6 Foundation; 14 route trống | [topics/website.md](topics/website.md) | `SDS-rules.md`, `website-ui-rules.md`, `website/README.md`, `content-guide.md` | 2026-11-14 | High |
| Quy trình & lệnh kiểm tra | Chọn việc → file; lệnh test/build; checklist đồng bộ sau mỗi thay đổi | [topics/workflow.md](topics/workflow.md) | `workspace-guide.md`, `AGENTS.md` §7–8 | 2026-11-13 | High |
| Truy cập Figma | Chỉ đọc; `whoami` = `info@smartads.tech`; chỉ đúng file được giao | [topics/figma-access.md](topics/figma-access.md) | `AGENTS.md` §10 | 2026-11-15 | High |
| Hệ thống agent | Agent Core + Tokens/Components Handler + Knowledge Keeper | [agents.md](agents.md) | `docs/_audit/agents/*` | 2026-11-15 | High |
| Thuật ngữ | A–E, gate, Light-only, handoff… | [glossary.md](glossary.md) | nhiều file | 2026-11-15 | High |
| Việc/câu hỏi chờ quyết + mâu thuẫn phát hiện | 9 câu Audit §6, D2–D8, lệch thông tin giữa file | [open-questions.md](open-questions.md) | `SDS-AUDIT.md` §6 + rà soát | 2026-11-15 | High |
| Nhật ký kho | Ai duyệt, thêm/sửa gì | [CHANGELOG.md](CHANGELOG.md) | — | 2026-11-15 | — |

## Lịch sử thay đổi repo (git, 8 commit)
`5472736` 2026-11-02 first commit · `839c88e` 2026-11-03 Cm · `777c422` 2026-11-03 AI Agents page từ Figma · `8335e94` 2026-11-04 Update-04-11-2026 · `10eabbc` 2026-11-06 docs + typography UI · `31400ca` 2026-11-09 Spacing · `4e35567` 2026-11-12 Logo · `5571e94` 2026-11-13 Icon. Remote: `VAKhoa/SmartAds---Design-System-New`, nhánh `main` (theo `SDS-RECONCILIATION.md`).
Công việc 2026-11-14/15 (audit, `build-tokens`, rename-map 85 mục, viết lại `AGENTS.md`, thư mục `_audit/agents/`, kho này) **chưa commit** tại thời điểm ghi.

## Bản đồ nhanh "cần gì → mở file nào"
- Giá trị token/component có ngày: `SDS-docs/docs/_audit/SDS-CONTEXT.md`.
- Vấn đề + đề xuất sửa: `SDS-AUDIT.md`; đối chiếu Figma↔repo: `SDS-RECONCILIATION.md`.
- Tên chuẩn: skill `ds-conventions/references/naming.md` + `tokens/rename-map.json`.
- Code component: `content/rules/component-code-rules.md`.
- Chủ đề ngoài danh sách: hỏi Knowledge Keeper qua Agent Core.
