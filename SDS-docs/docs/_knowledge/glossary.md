# Thuật ngữ & tên chuẩn

> Cập nhật 2026-11-15. Giữ nguyên tên gốc Figma khi liệt kê.

| Thuật ngữ | Nghĩa | Nguồn |
|---|---|---|
| SDS | SmartAds Design System; viết tắt đã chốt (D1) | `ds.config.json` |
| `sa` | Prefix code/CSS (`--sa-*`, class `sa-*`) | D1 |
| Figma root | File `cRZ5kIi4kD6j9lh1dbh5mh` (SmartAds - Design System) | `ds.config.json` |
| Snapshot | Bản chụp `variable-figma-export/` (2026-11-02; đối chiếu live 2026-11-14 khớp 100%) | `AGENTS.md` §3–4 |
| `usage.json` | Token/style nào được component dùng (đọc 2026-11-14) | `AGENTS.md` §4 |
| Tên CSS | `--sa-` + tên Figma chữ thường, bỏ ngoặc, khoảng trắng và `/` → `-`; chỉ theo `scripts/css-name.mjs` | `AGENTS.md` §6 |
| Quality gate | Bộ lọc token/component: E nếu có lỗi (orphan, naming, tier, hardcode, value-named, duplicate, scale-order, value, a11y, misleading) | `SDS-RECONCILIATION.md` §3.1 |
| Nhóm A | Qua gate + repo có biến cùng tên/giá trị (17 token, 2026-11-16) | Reconciliation §3; `FIGMA-CHANGELOG.md` |
| Nhóm B | Qua gate, chỉ Figma, chưa có code (219 token; 77 component) | — |
| Nhóm C | Chỉ có trong repo (37: 25 C-docs, 12 C-reject) | — |
| Nhóm D | Cùng khái niệm khác tên/giá trị (13 token `--sa-space-*`↔`spacing/*`) | — |
| Nhóm E | Không qua gate (424 token: 309 không dùng, 115 đang dùng nhưng lỗi — 2026-11-16; 68 component) | — |
| Orphan | Token không component nào dùng (kể cả qua alias Light/style) | Reconciliation §3.1 |
| Value-named | Semantic đặt theo giá trị màu (vd `text/primary-white`) | — |
| Base / Semantic / Component | Ba tầng token: Primitives → Alias (semantic) → `component/*` (hiện nằm chung `Alias`) | `SDS-CONTEXT.md` §3 |
| Collection | `Primitives ` (có dấu cách cuối), `Spacing`, `Alias`, `Text`, `Viewport Desktop`, `Viewport Mobile Tablet` (660 variable) | `overview.json` |
| `color/neutral` | Họ trung tính 13 bậc (50…950, có 350, 650) thay `color/gray` + `color/secondary dark` (D3, 2026-11-16); bậc số không trùng số cũ (vd `gray/500`→`neutral/400`) | `NEUTRAL-MERGE.md` §1 |
| DEPRECATED | Ghi trong description token chờ xóa (9 token `color/secondary dark/*`) | `FIGMA-CHANGELOG.md` |
| Light-only | Token sản phẩm chỉ mode `Accessible (Light Mode)` (D9) | `AGENTS.md` §5 |
| Component set `_x` / `primitive-x` | `_` = set cơ sở/private; `primitive-` = nguyên tử | `SDS-CONTEXT.md` §2, §7 |
| Handoff | Code bàn giao cho Dev: HTML/CSS/JS thuần (D10) | `component-code-rules.md` |
| Docs shell | Khung website tài liệu (React); không phải component sản phẩm | `component-code-rules.md` |
| `--sa-docs-*`, `--sa-resource-*`, `--sa-space-*` | Biến riêng website docs, **không** phải token sản phẩm | `AGENTS.md` §4 |
| State vocab (đề xuất) | `rest, hover, pressed, focus, disabled, selected`; mức độ `info, success, warning, danger`; thang `2xs` (không `xxs`) | `naming.md`; Audit §3 |
| `proposed` / `needs-decision` / `approved` | Trạng thái mục rename-map; chỉ người dùng được `approved` | `AGENTS.md` §4.6 |
| `[UNVERIFIED]` / `[NOT FOUND]` / `needs-value` | Nhãn: chưa xác minh / không có / thiếu giá trị | `AGENTS.md` §4.5 |
| Advertiser / Publisher / Reader | Nhà quảng cáo / nhà xuất bản / người đọc | `about-smartads.md` |
| Agent Core, Tokens Handler, Components Handler, Knowledge Keeper | Các sub agent | [agents.md](agents.md) |
| Dina | Tên trợ lý AI trong thiết kế (`ai/dina`, `Grid/Chat Dina`) — nghĩa sản phẩm `[UNVERIFIED]` | `SDS-CONTEXT.md` §5 |
