# SDS-CONTEXT — SmartAds Design System · v3 (14/11/2026)

> Nguồn sự thật nén cho docs site và sinh code UI. **Chỉ chứa nội dung đã qua Quality Gate** (nhóm A/B trong `SDS-RECONCILIATION.md`). Mục không qua gate nằm ở `SDS-AUDIT.md`; §11 chỉ liệt kê tên để tra cứu. Tên giữ nguyên chữ hoa/thường như Figma. Phạm vi: **Light mode only** (dark mode đã loại, quyết định 14/11/2026); component bàn giao bằng **HTML/CSS/JS thuần**.

## 1. Overview

| Mục | Giá trị |
|---|---|
| Design system | SmartAds Design System (SDS) · prefix code `sa` · thumbnail Figma "ver2.2 - 2026" |
| Figma (root) | `cRZ5kIi4kD6j9lh1dbh5mh` — https://www.figma.com/design/cRZ5kIi4kD6j9lh1dbh5mh/SmartAds---Design-System · 128 page |
| Repo (phụ) | `VAKhoa/SmartAds---Design-System-New` · nhánh `main` · commit `5571e94` (13/11/2026) · thư mục `SDS-docs/` |
| Ngày đọc / cách đọc | 14/11/2026 · tài khoản `info@smartads.tech` (Full seat) · `get_metadata`, `get_variable_defs` + script **chỉ đọc** (`use_figma`). Snapshot repo 02/11 khớp Figma live 100% (hash 6/6 collection, 77/43 style). |
| Quy mô Figma | 690 variable / 6 collection · 132 style (77 text, 43 effect, 7 paint, 5 grid) · **143 component set + 2 component đơn** trên 42 trang (~7.530 variant) + 13 set asset (Logo, File Icon, File Illustrator) |
| Quy mô qua gate | Token: **A 16 · B 219** (235/690 = 34%) · Style: **60/132** · Component: **77** (B) |
| Repo | Docs site Next.js 16 + React 19 (JS, CSS thuần); **0 component sản phẩm**; 22 biến CSS sinh từ Figma; 50 biến CSS chỉ có ở repo |

## 2. Naming conventions đang dùng (đã xác minh, chỉ mô tả hiện trạng)
- Variable: phân cấp bằng `/`; đa số **chữ thường + kebab-case** trong từng segment (`surface/primary-hover`, `component/button/surface/primary-accent/default`). Thang kích cỡ t-shirt cho spacing/radius (`xxs, xs, xs-plus, sm, sm-plus, md, md-plus, lg, xl, 2xl…`). Primitive màu `color/<hue>/<50–900>`; primitive kích thước `space/<px>`.
- Semantic: `<vai-trò>/<biến-thể>[-<trạng-thái>]` với vai trò ∈ `text, surface, border, background, foreground, overlay`; trạng thái ở hậu tố `-hover, -press, -muted, -disable`.
- Component token: `component/<component>/<thuộc-tính>/<biến-thể>/<trạng-thái>` (vd `component/button/surface/info/subtle`) hoặc rút gọn `component/<component>/<tên>` (vd `component/chips/hover`).
- Text style: `Brand/<Role>-<size>/<Weight>` (`Brand/Body-xs/Regular`), weight ∈ `Bold, Semi, Medium, Regular`.
- Effect style: `Shadow/elevation-light/<100–700>`, `Shadow/semantic/<element|edge>/<tên>`, `Focus/ring-<màu>-<size>`, `Border/<màu>-line/border-width-<w>-<opacity%>`.
- Component: set cơ sở tiền tố `_` (`_tags`) hoặc `primitive-` (`primitive-checkbox`); variant property dạng `Size`, `State`, `Type` (PascalCase key, giá trị PascalCase hoặc t-shirt).

## 3. Token architecture

```
Primitives (1 mode "Value")        Spacing ("sm")        Text ("Mode 1")       Viewport Desktop / Mobile Tablet
 color/<hue>/<step>   space/<px>    spacing/*, radius/*    typography/size|       (5 + 4 mode — không có token
 color/opacity/<hue>/<α>             → alias space/*        family|weight          nào qua gate)
          ▲                              ▲                       ▲
          └──────── Alias (mode Light) ──┴── text/ surface/ border/ background/ overlay/ chart/ component/* ─┘
```
- Chuỗi alias chuẩn: `component/button/surface/primary-accent/default → color/primary/500 → #048845`; `spacing/sm → space/8 → 8`.
- 513/525 ô alias trỏ thẳng Primitives; không có alias vòng. Không có collection component riêng (token component nằm trong `Alias`).
- Scope: `ALL_SCOPES` cho mọi variable; chưa có code syntax (→ Audit).

## 4. Token tables (chỉ A/B; Source: F = Figma, F+R = Figma + repo)
Ghi chú: một số semantic hợp lệ alias tới primitive đang chờ đổi tên (`color/red light/*`, `color/secondary dark/*`) — giá trị đúng, tên primitive nằm ở Audit.

### 4.1 Color — primitive (`Primitives `)
| Scale | Bậc: hex (không `#`) | Source |
|---|---|---|
| `color/primary/*` (200, 300, 500: F+R) | 50:e6f3ec · 100:b1dac5 · 200:8cc8a9 · 300:57af82 · 400:36a06a · 500:048845 · 600:047c3f · 700:036131 · 800:024b26 | F |
| `color/base/*` | black:000000 · white:ffffff · black-weak:3c4043 | F |
| `color/gray/*` | 50:fcfcfd · 800:7b7d80 · 100:f7f7f8 · 200:f0f2f4 · 300:eaecf0 · 400:e5e9ed · 700:9ea1a5 · 600:cbcfd3 · 500:dfe3e8 · 900:5e5f61 | F |
| `color/green/*` | 50:ecffea · 100:bae0b7 · 200:99d194 · 600:1f8c14 · 500:229a16 | F |
| `color/blue/*` | 50:eceffe · 100:c3cffa · 200:a6b7f8 · 400:6482f3 · 600:385ada · 500:3d63f0 | F |
| `color/yellow/*` | 50:fff7e8 · 100:fde6b6 · 600:e49d12 · 200:fdd993 · 500:faad14 | F |
| `color/opacity/red/*` | 10:e33e321a · 8:e33e3214 | F |
| `color/opacity/primary/*` | 10:0488451a · 70:048845b2 · 8:04884514 · 4:0488450a | F |
| `color/opacity/gray/*` | 10:5e5f611a | F |
| `color/opacity/yellow/*` | 10:faad141a | F |
| `color/opacity/blue/*` | 8:3d63f014 · 10:3d63f01a | F |
| `color/brand/smartads/*` | text-logo:637381 · text-powered:919eab | F |
| `color/opacity/black/*` | 0:00000000 · 2:00000005 · 4:0000000a · 10:0000001a · 16:00000029 · 18:0000002e · 6:0000000f · 20:00000033 · 40:00000066 · 60:00000099 | F |
| `color/opacity/green/*` | 8:229a1614 | F |

### 4.2 Color — semantic (`Alias`, mode Light)
| Token | → Primitive | Light | Source |
|---|---|---|---|
| `background/neutral` | `color/base/white` | #ffffff | F+R |
| `text/info` | `color/blue/500` | #3d63f0 | F |
| `surface/elevation` | `color/gray/50` | #fcfcfd | F |
| `surface/accent` | `color/blue/500` | #3d63f0 | F |
| `surface/info-muted` | `color/blue/50` | #eceffe | F |
| `surface/success` | `color/green/500` | #229a16 | F |
| `surface/danger` | `color/red light/500` | #e33e32 | F |
| `surface/danger-muted` | `color/red light/50` | #fceceb | F |
| `surface/primary` | `color/primary/500` | #048845 | F |
| `surface/primary-hover` | `color/primary/600` | #047c3f | F |
| `surface/primary-press` | `color/primary/700` | #036131 | F |
| `surface/primary-disable` | `color/gray/100` | #f7f7f8 | F |
| `border/primary-muted` | `color/primary/200` | #8cc8a9 | F |
| `border/primary` | `color/primary/500` | #048845 | F+R |
| `border/error` | `color/red light/500` | #e33e32 | F |
| `border/success` | `color/green/500` | #229a16 | F |
| `border/warning` | `color/yellow/500` | #faad14 | F |
| `border/info` | `color/blue/500` | #3d63f0 | F |
| `border/info-muted` | `color/blue/200` | #a6b7f8 | F |
| `border/error-disable` | `color/red light/100` | #f6c3bf | F |
| `border/error-muted` | `color/red light/200` | #f2a6a1 | F |
| `surface/success-muted` | `color/green/50` | #ecffea | F |
| `border/success-muted` | `color/green/200` | #99d194 | F |
| `border/secondary-disable` | `color/secondary dark/200` | #e1e1e1 | F |
| `surface/sidebar-press` | `color/green light/200` | #dffcdd | F |
| `surface/warning` | `color/yellow/500` | #faad14 | F |
| `surface/warning-disable` | `color/yellow/100` | #fde6b6 | F |
| `surface/warning-muted` | `color/yellow/50` | #fff7e8 | F |
| `surface/box` | `color/green light/50` | #f4fff4 | F |
| `surface/sidebar-hover` | `color/green light/100` | #edfeec | F |
| `overlay/primary/10` | `color/opacity/primary/10` | #0488451a | F |
| `overlay/danger/10` | `color/opacity/red/10` | #e33e321a | F |
| `text/disable` | `color/secondary dark/300` | #cecece | F |
| `overlay/warning/10` | `color/opacity/yellow/10` | #faad141a | F |
| `overlay/info/10` | `color/opacity/blue/10` | #3d63f01a | F |
| `border/warning-muted` | `color/yellow/200` | #fdd993 | F |
| `text/danger-on-surface` | `color/red light/600` | #cf382e | F |
| `chart/heatmap-level-1` | `color/primary/50` | #e6f3ec | F |
| `chart/heatmap-level-2` | `color/primary/100` | #b1dac5 | F |
| `chart/heatmap-level-3` | `color/primary/200` | #8cc8a9 | F |
| `chart/heatmap-level-4` | `color/primary/300` | #57af82 | F |
| `chart/heatmap-level-5` | `color/primary/400` | #36a06a | F |
| `chart/heatmap-level-0` | `color/gray/100` | #f7f7f8 | F |
| `overlay/black/20` | `color/opacity/black/20` | #00000033 | F |
| `overlay/black/40` | `color/opacity/black/40` | #00000066 | F |
| `overlay/black/60` | `color/opacity/black/60` | #00000099 | F |

### 4.3 Color — component (`Alias` › `component/*`, mode Light)
| Nhóm | Token (→ giá trị Light) | Source |
|---|---|---|
| `component/icon/` | `common/primary-neutral` #ffffff · `common/primary-disable` #cbcfd3 · `common/primary-inverse` #000000 · `common/info` #3d63f0 · `common/success` #229a16 · `common/danger` #e33e32 · `common/white` #ffffff · `common/primary-green` #048845 · `common/secondary-muted` #cbcfd3 · `common/primary` #9ea1a5 · `common/danger-disable` #f6c3bf · `common/info-disable` #c3cffa · `common/on-primary` #7b7d80 · `common/warning-disable` #fde6b6 · `common/warning` #faad14 · `common/on-secondary` #3c3c3c · `common/success-disable` #bae0b7 | F |
| `component/checkbox/` | `enable` #048845 · `hover` #047c3f · `disable` #f7f7f8 · `default` #ffffff | F |
| `component/radio/` | `disable` #f7f7f8 · `default` #ffffff | F |
| `component/divider/` | `divider-default` #f0f2f4 · `divider-strong` #e5e9ed · `dashed-divider-default` #dfe3e8 · `dashed-divider-strong` #cbcfd3 | F |
| `component/button/` | `surface/primary-accent/default` #048845 · `surface/primary-subdued/select` #f4fff4 · `surface/integrity/tertiary-fg` #fdfdfd · `surface/primary-subdued/default` #dffcdd · `surface/secondary/default` #ffffff · `border/secondary/default` #dfe3e8 · `border/primary/default` #048845 · `border/primary/select` #b1dac5 · `border/secondary/sub` #cbcfd3 · `border/link/default` #3d63f0 · `surface/secondary/link-subtle` #f7f7f8 · `surface/info/default` #3d63f0 · `border/info/default` #3d63f0 · `surface/info/subtle` #eceffe · `surface/warning/default` #faad14 · `surface/warning/subtle` #fff7e8 · `surface/danger/default` #e33e32 · `surface/danger/subtle` #fceceb · `border/danger/default` #e33e32 · `border/warning/default` #faad14 · `border/focus/focus` #8cc8a9 · `border/info/subtle` #c3cffa · `border/warning/subtle` #fde6b6 · `border/danger/subtle` #f6c3bf · `border/success/default` #229a16 · `border/success/subtle` #bae0b7 | F |
| `component/badge/` | `info/border-rest` #c3cffa · `info/surface-rest` #eceffe · `info/surface-action` #3d63f0 · `info/border-action` #3d63f0 · `info/text-info` #3d63f0 | F |
| `component/logo/` | `3rd-party/fpt-green` #16b14b · `3rd-party/fpt-yellow` #f27227 · `3rd-party/fpt-blue` #1169b0 | F |
| `component/card/` | `card-default` #ffffff | F |
| `component/avatar/` | `border-contrast` #0000001a | F |
| `component/tooltip/` | `surface-bg-black` #1f1f1f · `text-sub` #cecece | F |
| `component/skeleton/` | `base` #e5e9ed | F |
| `component/chips/` | `hover` #f7f7f8 · `selected` #0488451a · `press` #eaecf0 · `border` #04884514 | F |
| `component/progress/` | `warning` #faad14 · `success` #229a16 · `error` #e33e32 | F |
| `component/table/` | `surface/row-press` #f7f7f8 · `cell/surface/default` #ffffff · `cell/surface/hover` #f7f7f8 · `cell/surface/selected` #f7f7f8 · `cell/border/default` #eaecf0 | F |

### 4.4 Spacing, radius, sizing
| Token | Giá trị (px) | Alias | Source |
|---|---:|---|---|
| `radius/lg` | 12 | `space/12` | F+R |
| `radius/md` | 8 | `space/8` | F+R |
| `radius/xs` | 2 | `space/2` | F |
| `radius/none` | 0 | `space/0` | F |
| `radius/lg-plus` | 14 | `space/14` | F |
| `radius/sm-plus` | 6 | `space/6` | F |
| `radius/sm` | 4 | `space/4` | F+R |
| `radius/md-plus` | 10 | `space/10` | F |
| `spacing/none` | 0 | `space/0` | F |
| `spacing/hairline` | 1 | `space/1` | F |
| `spacing/xxs` | 2 | `space/2` | F |
| `spacing/xs` | 4 | `space/4` | F+R |
| `spacing/xs-plus` | 6 | `space/6` | F |
| `spacing/sm` | 8 | `space/8` | F+R |
| `spacing/sm-plus` | 10 | `space/10` | F |
| `spacing/md` | 12 | `space/12` | F+R |
| `spacing/md-plus` | 14 | `space/14` | F |
| `spacing/xl` | 20 | `space/20` | F+R |
| `spacing/2xl` | 24 | `space/24` | F |
| `spacing/4xl` | 40 | `space/40` | F |
| `spacing/5xl` | 48 | `space/48` | F |
| `radius/full` | 999 | `space/full` | F |
| `component/table/cell/padding/x-default` | 12 | `spacing/md` | F |
| `component/table/cell/padding/y-default` | 8 | `spacing/sm` | F |
| `component/table/cell/gap/content` | 8 | `spacing/sm` | F |
| Primitive `space/*` (đang dùng) | 0=0 · 2=2 · 4=4 · 8=8 · 12=12 · 16=16 · 20=20 · 48=48 · 24=24 · 40=40 · 120=120 · 10=10 · 6=6 · 160=160 · 1280=1280 · 1440=1440 · 1366=1366 · 1920=1920 · 14=14 · 7=7 · 1=1 · full=999 · 18=18 · 248=248 | — | F |

### 4.5 Typography variable
`typography/family/display` = "Public Sans" (F+R)

### 4.6 Border, shadow, motion, z-index, breakpoint, data-viz
- **Border width / opacity / motion / z-index / density:** không có variable `[NOT FOUND]`. Viền đang biểu diễn bằng effect style `Border/*` (§5).
- **Breakpoint:** collection `Viewport Desktop` (1280/1366/1440/1536/1920) và `Viewport Mobile Tablet` (390/428/843/1024) tồn tại nhưng **không token nào qua gate** (tên PascalCase, giá trị 1536→1563, 18/22 không được component dùng) → xem Audit.
- **Data-viz:** chỉ `chart/heatmap-level-0..5` (→ `color/primary/50…`) qua gate; **không có palette series** `[NOT FOUND]`.

## 5. Styles (đang được component dùng, qua gate)

| Loại | Style (giá trị) | Ghi chú |
|---|---|---|
| Text — UI (Public Sans, line-height 120%, letter-spacing 0) | `Brand/Body-lg/*` 20 · `Brand/Body-md/*` 18 · `Brand/Body-sm/{Bold,Semi,Medium,Regular}` 16 · `Brand/Body-xs/*` 14 · `Brand/Microscope/{Bold,Semi,Medium,Regular}` 13 · `Brand/Body-caption/*` 12 · `Brand/Body-caption-sub/*` 11 (110%) · `Brand/Tini/{Bold,Semi,Regular}` 10 · `Brand/Display-sm/Medium` 32 | Bind `typography/size|weight|family`. Mặc định UI: `Brand/Body-xs/Regular` (14). Bảng nhiều dùng `Body-xs`, nhãn nhỏ `Body-caption` |
| Text — Ads creative | `Ads/Merriweather/ads-merri-headline-lg-bold` · `Ads/Arial/ads-arial-headline-sm-bold` | Chỉ cho mockup quảng cáo |
| Effect — elevation | `Shadow/elevation-light/100` (card tĩnh) … `/600` | 2-layer drop shadow, chưa bind variable |
| Effect — semantic | `Shadow/semantic/element/floating-tooltip` · `element/navigation-sticky-right` · `edge/top-sm` | (`element/pannel-left` đang dùng nhưng sai chính tả → Audit) |
| Effect — focus | `Focus/ring-primary-xs` · `Focus/ring-gray-lg` · `Focus/ring-danger-lg` · `Focus/ringShadow-primary-lg` | Button dùng thêm variable `component/button/border/focus/focus` |
| Effect — border | `Border/primary-line/border-width-1-70%` · `…-2-10%` · `…-4-10%` · `Border/warning-line/border-width-2-10%` | Bind variable màu |
| Paint | `Gradient/gradient-linear-avatar` · `-ai-dina` · `-neutral` · `-dark` | |
| Grid | `Grid/Body Layout` (12 cột, gutter 12, offset 20) · `Grid/Sidebar` · `Grid/Body Content` · `Grid/Chat Dina` · `Grid/Creative` | |

## 6. Component catalog (qua gate — nhóm B: chỉ có trong Figma, **chưa có code**)
Source = F. Trạng thái code: chưa có (repo không có component sản phẩm). 68 set còn lại không qua gate → §11 + Audit.

| Nhóm | Component set (số variant) · props chính | Token chính |
|---|---|---|
| Form | `_action-text-area` (8; State) · `_input-digital-otp-base` (21; State, Size sm/md/lg) · `_input-digital-otp` (6) · `_QR Code` (2) · `_text-input-password` (10; Show Pass, State) · `_unpublic-text-input` (20; TEXT Content/Caption/Input, 7 BOOLEAN) · `_time` (10; Range Picker) · `_menu-header` (2) · `primitive_dropdown-list-item` (58; Type, State, Size) · `_autocomplete-dropdown-input` (2) · `_dropdown-list-item` (17; SLOT Tabs/Separator) · `_search-input-item` (14) · `primitive-combox-input` (12; SLOT Chips Container) · `_combox-select-multiple` (8) · `_date-picker` (11; Devices PC/Mobile) · `primitive-data-picker` (10) · `_input-radio-button` (48) · `primitive-radio-button` (32; Size sm–xl) · `_toggle-label` (12) · `primitive-toggle` (6) · `_range-input` (6) · `input-inline-edit` (8) · `_upload-img` (73) · `_upload` (5) | `border/gray-stronger`, `radius/md(-plus)`, `spacing/*`, `component/digital verify code/*`, `component/checkbox/*`, `component/radio/*` |
| Action | `_tabs` (15) · `_segmented-tabs` (3) · `_pagination` (4) · `_Internal/Slot` · `_segmented-button-group` (10) · `_orientation-button-group` (8) · `_split-button-group` (18) · `_split-button-group-primary` (10) · `_button-group-sync-fetch` (19) · `_actions Button Group` (125) · `_border-on-surface` (2) | `component/button/*`, `component/button group/*` |
| Data display | `primitive-table-body-cell` (103; SLOT Trailing action/Primary badge/Secondary badge) · `primitive-table-footer-cell` (4; SLOT) · `_metric-status-row` (5; Status × Metric CTR/CPM) · `_tags` (28) · `primitive-tags-counter` (12) · `Notification_Badge` (24) · `primitive-avatar` (54) · `primitive-avatar-online-indicator` (12) · `_generic-avatar` (60) · `_avatar-group` (4) · `primitive-divider` (12) · `_accordion` (2) · `primitives-accordion` (18) · `_statisticPanels` (60; KPI: Click, Impressions, CTR, Avg.CPC, Expense, Avg.CPM, Revenue (VND)…) · `_intensity-chart` (11) · `primitive-media-tooltips` (16) | `component/table/*`, `text/secondary-black (main)` (Needs-fix), `chart/heatmap-*` |
| Feedback / status | `_notification-alert` (2) · `_snackbar` (8) · `_icon-close-snackbar` (3) · `primitive-skeleton` (12) · `loading-item` (4) · `_progress-indicator-bar` (90) · `_line-loader` (3) · `loading` (5) · `modal-backdrop fade show` (24) · `state-layer` (12) | `component/progress/*`, `component/toast alert/*`, `overlay/black/*` |
| Navigation | `_steps-progress-vertical` (6) · `_steps-progress-horizontal` (5) · `primitive-step-divider` (4) · `_Breadcrumbs` (3; SLOT) · `Dot` (90) · `_balance` (8) · `_menu-header` Header (25; Type Website/Tablet/Mobile) · `_popup-balance-details` (3) · `_name-account-header` (3) · `_Nav-item-tab_base` (12) · `_Nav-item-tab_dropdown` (5) · `flag` (4) · `_action-collapse-expand` (6) | `surface/neutral-white`, `component/icon/common/*` |
| Utility | `⇄ Leading Icon`, `⇄ Trailing Icon` (component đơn 20×20) | `component/icon/common/primary` |
| Asset (gate token không áp dụng) | Logo (8 set, 177 variant) · File Icon (1 set, 204) · File Illustrator (4 set, 38) | hard-code theo bản chất |

## 7. Component patterns & anatomy
- **Cấu trúc:** set public `_name` → nguyên tử `primitive-name`; layout auto-layout, khoảng cách bind `spacing/*`, bo góc `radius/*`; chữ luôn qua text style `Brand/*` (99%+ text node có style).
- **Kích thước control:** Button lg 48 / md 40; Input field 40 (khối có label + help 92); Table header 44/36, row 56; Tab 32–56; Pagination 32; Checkbox/Radio 20; Toggle 32×18; Avatar 14–48.
- **State:** variant property `State` (Default/Hover/Focus/Press/Disable…), `Size` ∈ {2xs,xs,sm,md,lg,xl}; focus = ring (variable border hoặc effect `Focus/*`).
- **Nội dung linh hoạt:** dùng **SLOT** property (Table, Modal, Dropdown, Button Group, Breadcrumbs, Drawers, Screen Layout) và BOOLEAN show/hide (icon trái/phải, label, help text).
- **Màu:** fill/stroke bind semantic (`surface/neutral-white`, `border/gray-stronger`…) hoặc `component/*`.

## 8. Mapping Figma ↔ code
- **Quy tắc tên CSS (đề xuất duy nhất, áp cho mọi token):** `--sa-` + slug(tên Figma), slug = chữ thường, bỏ `(` `)`, thay mọi chuỗi khoảng trắng hoặc `/` bằng `-`. Ví dụ: `surface/primary-hover` → `--sa-surface-primary-hover`; `component/table/cell/padding/x-default` → `--sa-component-table-cell-padding-x-default`. Script hiện tại (`generate-theme.mjs`) chỉ thay `/` → chưa an toàn với tên có khoảng trắng (Audit TK-12).
- **Cách consume:** component HTML/CSS/JS thuần dùng `var(--sa-…)` cho semantic/component token; không dùng primitive trực tiếp. Theme: chỉ `:root` (Light). Spacing có thể dùng thêm alias numeric docs `--sa-space-*` (repo) nhưng nguồn là `spacing/*`.
- **Đã có code (A, 16 token):** `--sa-background-neutral`, `--sa-border-primary`, `--sa-spacing-{xs,sm,md,xl}`, `--sa-radius-{sm,md,lg}`, `--sa-typography-family-display`, và primitive `--sa-color-{primary-200,primary-300,primary-500,gray-500,gray-800,base-white}` (sinh vào `website/src/styles/figma.generated.css`; danh sách ở `website/scripts/theme-tokens.mjs`). `color/secondary dark/900` có code nhưng không qua gate (tên có khoảng trắng).
- **Component:** class `sa-<component>` + modifier theo variant (vd `sa-button sa-button--primary sa-button--lg`); variant `State` ánh xạ sang pseudo-class/ARIA (`:hover`, `:focus-visible`, `[aria-disabled]`, `[aria-selected]`), không thành class trạng thái tĩnh khi có trạng thái native.

## 9. AdTech domain mapping

| Khái niệm nghiệp vụ | Đại diện hiện có (Figma) | Thiếu |
|---|---|---|
| KPI card / metric tile | `_statisticPanels` (10 metric, Color, Skeleton, Devices) | style số riêng cho KPI; token delta |
| Delta so kỳ trước | `status_data` (growth_Data, reduce_data, Infinity…) — **không qua gate** (remote `Boolean`) | `delta/positive|negative|neutral`, quy tắc đảo chiều (CPA↓ tốt, CTR↓ xấu) |
| Đánh giá hiệu suất metric | `_metric-status-row` (CTR, CPM × 5 mức) | thêm metric khác |
| Bảng dữ liệu lớn | `primitive-table-*-cell`, `Table` (Row Selection, Checkbox, Radio, Expandable, Tree data, Fixed Columns, Management Campaign, Empty) | density compact, tabular numbers, sort/filter state token, column picker |
| Hierarchy Account>Campaign>Ad group>Ad | Table `Tree data`, `Table Expandable Row`, Breadcrumbs | breadcrumb phân cấp chuyên biệt |
| Lifecycle (Draft…Archived, Error) | `Status Badge` (info, Completed, Failed, Waiting, Forbid) — không qua gate | 8/11 trạng thái + token `status/*` |
| Wizard tạo chiến dịch | Step (6 set), `primitive-dialog-footer` Type=Step | — |
| Budget/bid tiền tệ | `_text-input-main` Type Money/Payment, BOOLEAN `Show VND`, `Value đ` (không qua gate), cell `Price`/`Edit Price` | đa tiền tệ USD, quy tắc format vi-VN |
| Date range + compare + timezone | `_date-picker`, `_time` (Range Picker), `primitive-calendar-cell` | so sánh kỳ, timezone |
| Filter bar / chip | `_chips` (Filter Chips, Sort by Chips) — không qua gate; `_dropdown-trigger` Filter | filter bar tổng hợp |
| Chart | `section-chart`, `section-dashboard`, `_donut-chart`, `Statistic Chart - Dot`, `_intensity-chart` | palette series, legend/tooltip chuẩn |
| Creative preview theo placement | trang Format Ads, Mockup Ads Demo, `_upload-img` | chưa đọc chi tiết |
| Targeting/audience selector | `[NOT FOUND]` | toàn bộ |
| Balance / billing | Header `_balance`, `_popup-balance-details` | — |
| i18n VI/EN | Sidebar V2 `Laungue`={ENG,VN} | quy tắc text dài |

## 10. Docs-site hints
- **IA:** Introduction · Foundations (Color, Typography, Spacing & Radius, Elevation & Focus, Layout & Grid, Icons, Logo) · Components (Form, Action, Data display, Feedback, Navigation) · Patterns (Data table, KPI & delta, Campaign wizard, Filter & date range, Status lifecycle, Currency & number) · Resources (Figma, tokens.json).
- **Sinh tự động:** bảng token từ `tokens/generated/tokens.json` (sinh bằng `node scripts/build-tokens.mjs`) (lọc `gate` ∈ A/B); bảng style §5; bảng props component từ `componentPropertyDefinitions` (script chỉ đọc); trạng thái code từ cột Source; trang "Known gaps" từ §11.
- **Trang cần người viết:** usage/do-don't, AdTech patterns, quy tắc format số/tiền vi-VN, a11y.

## 11. Known gaps · `[UNVERIFIED]` · `[NOT FOUND]`
- **Đang dùng nhưng KHÔNG qua gate (121 token, chi tiết `SDS-AUDIT.md`):**
  - Tên (60): `color/red light/*`, `color/secondary dark/*`, `color/green light/*`, `color/brand/fpt/*`, `typography/text/* (size N)`, `spacing/lg (Base)`, `spacing/lg`, `spacing/odd-7`, `component/toast alert/*`, `component/badge/sucess/*`, `component/digital verify code/*`…
  - Đặt tên theo giá trị (19): `text/gray-on-surface`, `text/secondary-black (main)` (tên), `surface/neutral-white`, `border/gray-stronger`, `border/gray-muted`, `text/primary-green`, `text/on-primary-black-weak`, `surface/gray*`, `border/white`…
  - Contrast < 4.5 (12): `text/secondary`, `text/link`, `text/success`, `text/danger`, `text/warning`, `text/gray`, `text/warning-on-surface`, `text/success-on-surface`, `text/on-primary-white`…
  - Trùng lặp (12): `surface/info`=`surface/accent`, `background/default`, `text/info-on-surface`, `typography/family/text`…
  - Hard-code trong Alias (15 đang dùng / 17): logo bên thứ ba, `component/icon/file/*`, `component/table/surface/tab-header`, `sematic/dashboard/*`.
  - Thang cỡ chữ `typography/size/*` (9): không đơn điệu.
  - Giá trị sai: `space/1536`=1563, `Screen/Container/size-screen-width`@1536-lg.
- **Không được dùng (334 token)** và **70 style không được component dùng** → Audit (Deprecated-candidate).
- **Variable ngoài thư viện local bị bind:** ~90 tên (remote: `Text/text-white-on-color` ×1074, `icon/size`, `Typography/*`; stale: `radius/4 (4px)` ×848, `padding/none`, `margin/4`, `text/black-inverse`…).
- **68 component set không qua gate** (typo trong prop, remote/stale binding, hard-code, `Property 1`) → Audit CP-*.
- `[NOT FOUND]`: palette data-viz, token delta/status, density, z-index, motion, border-width, timezone, quy tắc format số/tiền, targeting selector, compare date range.
- `[UNVERIFIED]`: quyền Dev Mode/Inspect; cơ chế variable stale; nội dung trang Example/Application UI; code syntax/publish; Code Connect.
