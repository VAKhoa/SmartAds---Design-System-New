# Token

> Tổng hợp 2026-11-15 · Nguồn: `docs/_audit/SDS-CONTEXT.md`, `SDS-RECONCILIATION.md`, `SDS-AUDIT.md` (14/11/2026), `variable-figma-export/overview.json`, `tokens/rename-map.json`, `ds.config.json` · Tin cậy: High (số liệu gốc), Med (đề xuất).

## Quy mô (Figma, đọc 2026-11-14)
- **690 variable / 6 collection**: Primitives (256: 191 COLOR, 63 FLOAT, 2 BOOLEAN), Spacing (98), Alias (293, 2 mode Light/Dark), Text (21), Viewport Desktop (19; 5 mode 1280/1366/1440/1536/1920), Viewport Mobile Tablet (3; 4 mode). Nguồn: `overview.json` (đọc 2026-11-02).
- **132 style**: 77 text, 43 effect, 7 paint, 5 grid. Qua gate 60/132; 70 không được dùng.
- Scope `ALL_SCOPES` 690/690; code syntax 0/690 (Audit TK-10).

## Gate (Reconciliation §3.2)
A 16 · B 219 (=235, **34%**) · E 455 (**66%**: 334 orphan + 121 đang dùng nhưng lỗi) · C 37 · D 13. Theo collection A/B/E: Primitives 0/85/171 · Spacing 7/18/73 · Alias 2/122/169 · Text 1/0/20 · Viewport 0/0/22.
Lý do E: orphan 334 · naming 188 · tier 63 · value-named 21 · a11y 19 · hardcode 17 · scale-order 15 · duplicate 15 · value 2 · misleading 1.

## Kiến trúc & quy ước
- Chuỗi alias: `component/…` → semantic → `color/*`/`space/*` primitive (vd `spacing/sm → space/8`). Token component nằm chung `Alias` (147), chưa có collection riêng.
- Tên CSS: `--sa-` + slug (`scripts/css-name.mjs`); đã có code 16 token A (`--sa-background-neutral`, `--sa-spacing-{xs,sm,md,xl}`, `--sa-radius-{sm,md,lg}`…). Sinh bằng `node scripts/build-tokens.mjs` → `tokens/generated/tokens.json` (gitignored).
- Light-only (D9). Primary `#048845` (`color/primary/500`).

## Top vấn đề (Audit, 14/11/2026)
TK-01 ~90 variable remote/stale đang bind (`Text/text-white-on-color` ×1.074) · TK-02 thang cỡ chữ không đơn điệu · TK-03 semantic đặt theo giá trị · A11Y-01 chữ semantic < 4.5:1 (`text/secondary` 4.13, `text/link` 3.48, `text/success` 3.68, `text/warning` 1.90) · AT-01..04 thiếu data-viz/delta/status/density. Lộ trình: quick wins → trung hạn → tái cấu trúc (Audit §5). **Tất cả đề xuất chưa áp dụng vào Figma.**

## Rename-map (đếm 2026-11-15)
85 mục: 64 `proposed`, 21 `needs-decision`, **0 `approved`**. (Reconciliation ghi 16 — lệch X1.)

## Công cụ
`ds-tokens.mjs lint|suggest` (810 mục → 209 error, 314 warn trên snapshot) · `build-tokens.mjs` · `css-name.mjs` · `dump-{variables,styles,usage}.figma.js` (chỉ đọc, chạy trong Plugin API) · `tests/run-tests.mjs`.
Skill: `ds-conventions` (+references color/effects/naming/open-decisions/spacing-radius/typography), `figma-token-workflow`, `sds-spacing-foundation`.
Spacing trên website dùng numeric `--sa-space-*` (13 giá trị khớp 13/13 với Figma, D-01) — quy ước docs, không phải tên Figma.
