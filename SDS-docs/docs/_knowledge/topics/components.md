# Component

> Tổng hợp 2026-11-15 · Nguồn: `content/rules/component-code-rules.md` (quyết định 2026-11-12), `docs/_audit/SDS-CONTEXT.md` §6–8, `SDS-RECONCILIATION.md` §2.2, §3.4, `SDS-AUDIT.md` §2.2 · Tin cậy: High/Med.

## Hiện trạng
- Figma: **143 component set + 2 đơn** (~7.530 variant) trên 42 trang + 13 set asset (Logo 8, File Icon 1, File Illustrator 4). **77 qua gate (nhóm B, chỉ Figma)**, **68 không qua (E)**.
- Repo: **0 component sản phẩm**; 20 component React chỉ dựng docs shell (không bàn giao). `content/pages/components/` trống (11 bài chờ: button, badge, card, input, dialog, select, checkbox, switch, alert, avatar, tooltips) + 3 patterns (forms, data-tables, navigation).

## Quy tắc code bàn giao (D10)
HTML/CSS/JS thuần; class `sa-<component>` + modifier; state → `:hover`, `:focus-visible`, `[aria-*]`; nhiều instance; không React/Vue/TS/SCSS/Tailwind/Bootstrap/jQuery; icon MingCute SVG inline (khóa phiên bản); logo từ Figma; preview dùng cùng source bàn giao; token `var(--sa-*)` semantic/component, không dùng primitive trực tiếp. Skill `smartads-design-system` (Bootstrap+jQuery) **không áp dụng**.

## Vấn đề chính (Audit CP-*)
CP-01 variant explosion (`Badge` 1.201; `button-main-system` 1.440 + `button-state` 1.600; `_chips` 312; `_text-input-main` 278) · CP-02 typo trong prop (`Waring`, `Retangle`, `Sucess`…) · CP-04 từ vựng state lệch · CP-07 ~1.240 fill hard-code · A11Y-04 target < 24×24.
**Button** bind variable remote và gồm hai set chồng → nên chốt tên prop/state trước khi code (W3).

## Anatomy ngắn
Set public `_name` → nguyên tử `primitive-name`; auto-layout; spacing/radius bind token; text luôn qua style `Brand/*`; control: Button 48/40, Input 40, Table row 56, Checkbox/Radio 20; nội dung linh hoạt bằng SLOT/BOOLEAN.
