# skills-source — NGUỒN THẬT của mọi skill

Mỗi thư mục con = một skill (tên thư mục trùng `name:` trong `SKILL.md`). **Sửa skill ở đây, không sửa qua `.claude/skills` hay `.agents/skills`.**

| Thư mục | Dùng cho | Vai trò agent dùng |
|---|---|---|
| `ds-conventions/` | Quy ước đặt tên token + `references/` | tokens-handler, components-handler, rules-verifier |
| `figma-token-workflow/` | Đồng bộ/audit/lint token từ Figma | tokens-handler |
| `sds-spacing-foundation/` | Foundation Spacing/Radius | tokens-handler |
| `sds-fe-website-builder/` | Build/sửa UI website docs | website-builder |
| `ui-qa-figma-vs-code/` | QA so Figma với code | ui-qa-auditor |
| `sds-ui-ux-board-designer/` | Dựng board UI/UX trong Figma | board-designer |
| `sma-design-handoff/` | Dựng handoff spec + UI cho developer trong Figma bằng bộ SmartAds - ESDS Specs (SKILL.md, references/, scripts/ chạy trong `use_figma`) | design-handoff |
| `external-design-system/` | Con trỏ tới thư mục ngoài repo (tùy chọn, `[UNVERIFIED]`) | — |
| `_packages/` | Gói `.skill` dẫn xuất (đóng lại từ thư mục tương ứng sau khi sửa) | — |

`.claude/skills` (Claude Code) và `.agents/skills` (Codex) là **lối tắt** tới thư mục này, tạo bằng `SDS-docs/docs/_audit/agents/setup-agents.ps1`; chúng không nằm trong git (xem `.gitignore`).
