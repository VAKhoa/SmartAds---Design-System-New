# Token

> Tổng hợp 2026-11-15, đối chiếu 2026-11-16 · Nguồn: `docs/_audit/SDS-CONTEXT.md`, `SDS-RECONCILIATION.md`, `SDS-AUDIT.md` (14/11/2026), `variable-figma-export/overview.json`, `tokens/rename-map.json`, `ds.config.json` · Tin cậy: High (số liệu gốc), Med (đề xuất).

## Quy mô (Figma, đọc 2026-11-14; cập nhật 2026-11-16)
- **660 variable / 6 collection** (2026-11-16; trước đó 690): Primitives (226: 161 COLOR, 63 FLOAT, 2 BOOLEAN), Spacing (98), Alias (293, 2 mode Light/Dark), Text (21), Viewport Desktop (19; 5 mode 1280/1366/1440/1536/1920), Viewport Mobile Tablet (3; 4 mode). Nguồn: `overview.json` (đọc 2026-11-02, cập nhật 2026-11-16).
- **Thay đổi 2026-11-16:** `color/gray` + `color/secondary dark` → `color/neutral` 13 bậc (9 token `secondary dark` còn lại là DEPRECATED); người dùng xóa `color/secondary light`, `color/red dark`, `color/orange` (30 token). 3 alias mode Dark đang treo. Nguồn: `docs/_audit/FIGMA-CHANGELOG.md`.
- **132 style**: 77 text, 43 effect, 7 paint, 5 grid. Qua gate 60/132; 70 không được dùng.
- Scope `ALL_SCOPES` và code syntax: số 690/690 và 0/690 là của 2026-11-14, chưa đọc lại (Audit TK-10).

## Gate (Reconciliation §3.2)
A 17 · B 219 (=236, **36%**) · E 424 (**64%**: 309 orphan + 115 đang dùng nhưng lỗi) — tính lại 2026-11-16 bằng `build-tokens.mjs`. C 37 · D 13 (2026-11-14). Theo collection A/B/E: Primitives 7/80/139 · Spacing 7/18/73 · Alias 2/121/170 · Text 1/0/20 · Viewport 0/0/22.
Lý do E (2026-11-16): orphan 309 · naming 165 · tier 63 · value-named 21 · a11y 19 · duplicate 18 · hardcode 17 · scale-order 15 · value 2 · misleading 1.

## Kiến trúc & quy ước
- Chuỗi alias: `component/…` → semantic → `color/*`/`space/*` primitive (vd `spacing/sm → space/8`). Token component nằm chung `Alias` (147), chưa có collection riêng.
- Tên CSS: `--sa-` + slug (`scripts/css-name.mjs`); đã có code 17 token A (`--sa-background-neutral`, `--sa-spacing-{xs,sm,md,xl}`, `--sa-radius-{sm,md,lg}`…). Sinh bằng `node scripts/build-tokens.mjs` → `tokens/generated/tokens.json` (gitignored).
- Light-only (D9). Primary `#048845` (`color/primary/500`).

## Top vấn đề (Audit, 14/11/2026)
TK-01 ~90 variable remote/stale đang bind (`Text/text-white-on-color` ×1.074) · TK-02 thang cỡ chữ không đơn điệu · TK-03 semantic đặt theo giá trị · A11Y-01 chữ semantic < 4.5:1 (`text/secondary` 4.13, `text/link` 3.48, `text/success` 3.68, `text/warning` 1.90) · AT-01..04 thiếu data-viz/delta/status/density. Lộ trình: quick wins → trung hạn → tái cấu trúc (Audit §5). **Đã áp dụng vào Figma: gộp `color/neutral` (2026-11-16). Các đề xuất còn lại chưa áp dụng.**

## Rename-map (đếm 2026-11-16)
98 mục: 60 `proposed`, 21 `needs-decision`, **13 `approved`** (13 mục neutral, đã áp dụng), 4 `rejected`. (Reconciliation hiện ghi 85 — cần cập nhật, X1.) Từng lý do E: chưa tự kiểm (X15).

## Công cụ
`ds-tokens.mjs lint|suggest` (780 mục → 186 error, 314 warn trên snapshot 2026-11-16) · `build-tokens.mjs` · `css-name.mjs` · `dump-{variables,styles,usage}.figma.js` (chỉ đọc, chạy trong Plugin API) · `tests/run-tests.mjs`.
Skill: `ds-conventions` (+references color/effects/naming/open-decisions/spacing-radius/typography), `figma-token-workflow`, `sds-spacing-foundation`.
Spacing trên website dùng numeric `--sa-space-*` (13 giá trị khớp 13/13 với Figma, D-01) — quy ước docs, không phải tên Figma.
