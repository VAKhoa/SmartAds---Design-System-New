# SDS-RECONCILIATION — Đối chiếu Figma ↔ Repo · v3 (14/11/2026)

> Figma = root; repo = tham khảo phụ. Figma đọc live 14/11 bằng `info@smartads.tech` (script chỉ đọc), khớp 100% snapshot repo 02/11. Repo: `VAKhoa/SmartAds---Design-System-New`, `main`, commit `5571e94`. Phạm vi đã chốt 14/11/2026: **Light mode only** (dark mode loại khỏi phạm vi) và **component bàn giao = HTML/CSS/JS thuần**. Quality gate và cách tính: §3.

## 1. Quyết định đã chốt (ghi nhận)
| # | Quyết định | Hệ quả cho đối chiếu |
|---|---|---|
| Q1 | Bỏ dark mode | Chỉ xét mode `Accessible (Light Mode)` của `Alias`; `Shadow/elevation-dark/*` và mode Dark ngoài phạm vi; `tokens/generated/tokens.json` (sinh bằng `node scripts/build-tokens.mjs`) đã gỡ giá trị Dark. Repo vẫn có `ds.config.json themes: [light, dark]` và theme dark của website docs → D-02 |
| Q2 | Stack component = HTML/CSS/JS thuần (theo `component-code-rules.md`) | Skill Bootstrap 5 + jQuery không áp dụng cho component bàn giao; docs site giữ Next.js/React |

## 2. Phase 5 — Trích xuất repo (tóm tắt)

### 2.1 Token
| Mục | Hiện trạng repo |
|---|---|
| Nguồn token | `SDS-docs/variable-figma-export/*.json` (dump từ Figma bằng `scripts/dump-variables.figma.js`, `dump-styles.figma.js`) — không có file token tự định nghĩa |
| Cấu trúc tên | Giữ nguyên tên Figma; CSS var = `--sa-` + tên Figma thay `/` bằng `-` (`generate-theme.mjs`) |
| Pipeline | `website/scripts/prepare.mjs` → `generateTheme()` → `src/styles/figma.generated.css` (gitignored, sinh khi dev/build); `color.generated.json`, `typography.generated.json` cho trang docs |
| Output | **Chỉ CSS custom properties** (không Tailwind, không TS). 22 biến từ Figma: 14 màu `Alias` (2 mode) + `spacing/{xs,sm,md,xl}` + `radius/{sm,md,lg}` + `typography/family/display`; 7 biến `--sa-docs-*-size` lấy fontSize từ text style |
| Biến tự định nghĩa | 43 khai báo trong `website/src/styles/*.css`: `--sa-docs-*` (17), `--sa-resource-*` (10), `--sa-space-*` (13, numeric), `--sa-layout-inspect`, `--sa-spacing-inspect-pink`, `--sa-spacing-surface`; 160 hex literal rải trong CSS (`globals.css` 113) |
| Công cụ chất lượng | `scripts/ds-tokens.mjs lint|suggest` (rule R01–R08: khoảng trắng, case, ký tự, thứ tự thang, thuật ngữ, trùng, tầng, vị trí state) → trên snapshot: 810 token, 209 error, 314 warn; `tokens/rename-map.json` 85 mục (64 proposed, 21 needs-decision, 0 approved; trước 14/11 chỉ 16 mục); `tests/run-tests.mjs` chạy OK |

### 2.2 Component
| Mục | Hiện trạng |
|---|---|
| Component sản phẩm | **0** (không có thư viện HTML/CSS/JS nào; `content/pages/components/` trống) |
| Component docs shell (React, không bàn giao) | 20 file: `DocsShell`, `DocsPage`, `SourceFileLinks`, `Icon` (Tabler), `Logo`, `ColorShowcase`, `TypographyReference`, `SpacingExplorer`/`SpacingReference`/`SpacingValue`, `LayoutExplorer`/`LayoutReference`/`LayoutCapture`, `IconExplorer`/`IconReference`/`IconConnectionGuide`, `LogoExplorer`/`LogoReference`, `FigmaResources`, `AiSiteUsage` |
| Props/variant | Props React đơn giản (không hệ thống variant); quy tắc copy-button, `SpacingValue px mode copy` |
| Token usage | Dùng `var(--sa-*)` nhưng nhiều hex hard-code (`globals.css` 113) |
| Test/doc | 8 Playwright spec (`website/tests/*.spec.js`) cho trang docs; không có story |
| A11y | `aria-*` 120+ chỗ (DocsShell 34, SpacingExplorer 22, TypographyReference 17), keyboard handler ở DocsShell/SpacingExplorer, `aria-live` cho "Copied!" |

### 2.3 Quy ước code
- File: PascalCase cho component React (`SpacingExplorer.js`), kebab-case cho CSS (`spacing-reference.css`) và route; class CSS tiền tố `sa-` (`.sa-page-toolbar`).
- Thư mục: `content/pages/<section>/<slug>.md` (Markdown + frontmatter `title, section, updated, status`), `website/src/{app,components,lib,styles,data}`.
- Theming: `:root` + `:root[data-theme='dark']` cho docs (đi ngược Q1 nếu áp cho sản phẩm); không có density.
- i18n: `<html lang="vi">`; nội dung tiếng Việt; `toLocaleString('vi-VN')` một chỗ; không có hệ thống đa ngôn ngữ.
- Component bàn giao (quy tắc): `.html` + `.css` + `.js`, class `sa-…`, không framework, icon MingCute SVG inline, logo từ Figma.

## 3. Phase 6 — Phân loại

### 3.1 Quy tắc
- **Quality gate (Figma token):** E nếu có ít nhất một lỗi: `orphan` (không component nào dùng, kể cả qua alias Light/style), `naming` (khoảng trắng, ngoặc, chữ hoa, lỗi chính tả), `tier` (semantic ở primitive, boolean ở Primitives, `screen/*` & `typography/text/*` trong Spacing), `hardcode` (Alias không alias), `value-named` (semantic đặt theo màu), `duplicate` (cùng nhóm vai trò + cùng alias), `scale-order`, `value` sai, `a11y` (chữ < 4.5:1 trên trắng), `misleading`.
- **A** = qua gate + repo có biến cùng tên/giá trị. **B** = qua gate, chỉ Figma. **C** = chỉ repo (C-docs: hợp lệ cho docs; C-reject: hard-code/không có trong Figma). **D** = cùng khái niệm khác tên/giá trị/cấu trúc. **E** = không qua gate.
- Usage đo bằng quét toàn bộ 145 component + 13 asset set (mọi variant): bind trực tiếp + chuỗi alias Light + variable bind trong style được dùng.

### 3.2 Thống kê

| Nhóm | Token | Component | Ghi chú |
|---|---:|---:|---|
| A. Khớp cả hai | **16** | 0 | `background/neutral`, `border/primary`, `spacing/{xs,sm,md,xl}`, `radius/{sm,md,lg}`, `typography/family/display`, `color/{primary/200,primary/300,primary/500,gray/500,gray/800,base/white}` |
| B. Chỉ Figma (qua gate) | **219** | **77** (75 set + 2 component đơn) | chưa có code |
| C. Chỉ repo | **37** (25 C-docs · 12 C-reject) | 20 (docs shell) | không đề xuất đưa vào Figma, trừ ghi chú D-01 |
| D. Mâu thuẫn | **13** + 10 cấu trúc (§4) | — | `--sa-space-*` ↔ `spacing/*` |
| E. Không qua gate | **455** (121 đang dùng · 334 không dùng) | **68** | chi tiết ở Audit |
| Tổng | 690 Figma + 50 repo-only | 145 Figma + 13 asset + 20 repo | Token Figma: A+B = 235 = **34%**, E = **66%** |

Theo collection (A/B/E): Primitives 0/85/171 · Spacing 7/18/73 · Alias 2/122/169 · Text 1/0/20 · Viewport Desktop 0/0/19 · Viewport Mobile Tablet 0/0/3.
Lý do E (một token có thể nhiều lý do): orphan 334 · naming 188 · tier 63 · scale-order 15 · value-named 21 · a11y 19 · hardcode 17 · duplicate 15 · value 2 · misleading 1.
Style: 60/132 qua gate (đang dùng, không lỗi) · 70 không được component dùng · 1 sai chính tả (`pannel-left`) · 1 line-height AUTO (`Body-xl/Medium`); 36 style remote đang được dùng.

### 3.3 Chi tiết theo nhóm
**A (16):** xem bảng 3.2. 12 biến khác repo đang sinh ra lại thuộc **E**: `background/secondary`, `background/gray`, `background/primary-selected`, `border/primary-hover`, `border/secondary-hover`, `text/accent-hover` (orphan) · `text/primary-white`, `text/primary-green`, `text/on-primary-black-inverse`, `text/on-primary-black-weak`, `border/gray-muted` (value-named) · `text/secondary` (duplicate + 4.13:1).

**B (219):** toàn bộ liệt kê trong `SDS-CONTEXT.md` §4 và `tokens/generated/tokens.json` (sinh bằng `node scripts/build-tokens.mjs`) (`gate: "B"`): 85 primitive (primary, gray, green, blue, yellow, base, opacity đang dùng, `space/*` đang dùng), 18 Spacing (radius/spacing đang dùng, `component/table/cell/*`), 122 Alias.

**C (37):**
| Biến | Loại | Lý do |
|---|---|---|
| `--sa-docs-bg|panel|text|muted|border|link|selected`, `--sa-resource-surface|text|hover|pressed|action-bg|preview|divider|shadow`, `--sa-spacing-surface`, `--sa-docs-header-height` 64px, `--sa-docs-sidebar-width` 240px, 7 × `--sa-docs-*-size` | C-docs (25) | Vai trò riêng của docs, alias tới biến Figma hoặc số đo layout docs |
| `--sa-docs-primary`, `--sa-docs-primary-fill` (#048845), `--sa-docs-on-primary-fill` (#ffffff), `--sa-docs-heading` (#1f1f1f), `--sa-resource-border` (#dfe3e8), `--sa-resource-muted` (#7b7d80) | C-reject (6) | Hex trùng giá trị Figma (`color/primary/500`, `base/white`, `secondary dark/900`, `gray/500`, `gray/800`) → phải dùng `var(--sa-…)` |
| `--sa-docs-page-nav-bg` #f5f5f5, `-hover` #e7e7e7, `-active` #d9d9d9, `-text` #171717, `--sa-layout-inspect` #d026a2, `--sa-spacing-inspect-pink` #ba246d | C-reject (6) | Hex không có trong Figma |

**D (13 token):** `--sa-space-{0,05,1,15,2,3,4,5,6,8,10,12,16}` ↔ `spacing/{none,xxs,xs,xs-plus,sm,md,lg (Base),xl,2xl,3xl,4xl,5xl,7xl}` — giá trị khớp 13/13, tên khác. Figma thắng; giữ numeric chỉ là alias docs (hoặc chọn numeric làm tên đích khi tái cấu trúc — Audit TK-04).

**E (455):** bảng lý do ở 3.2; danh sách đầy đủ trong `tokens/generated/tokens.json` (sinh bằng `node scripts/build-tokens.mjs`) (`gate: "E"`, `gateReasons`).

### 3.4 Component (Figma) — phân loại
| Nhóm | Set |
|---|---|
| **B (77)** | Text input: `_action-text-area`, `_input-digital-otp-base`, `_input-digital-otp`, `_QR Code`, `_text-input-password`, `_unpublic-text-input` · Table: `primitive-table-body-cell`, `primitive-table-footer-cell`, `_metric-status-row` · Tags: `_tags`, `primitive-tags-counter` · Modal: `modal-backdrop fade show` · Dropdown: `_time`, `_menu-header`, `primitive_dropdown-list-item`, `_autocomplete-dropdown-input`, `_dropdown-list-item`, `_search-input-item`, `primitive-combox-input`, `_combox-select-multiple`, `_date-picker`, `primitive-data-picker` · `_notification-alert` · `Notification_Badge` · `primitive-media-tooltips` · `_tabs`, `_segmented-tabs` · `_pagination` · `_toggle-label`, `primitive-toggle` · `_input-radio-button`, `primitive-radio-button` · Avatar ×4 · `primitive-divider` · `_steps-progress-vertical`, `_steps-progress-horizontal`, `primitive-step-divider` · `_Breadcrumbs` · Accordion ×2 · `_range-input` · `primitive-skeleton`, `loading-item` · `_progress-indicator-bar` · Spinner ×2 · `_snackbar`, `_icon-close-snackbar` · Button Group ×8 · `input-inline-edit` · `_upload-img`, `_upload` · `_count-character`, `_password-strength` · `_statisticPanels` · `_intensity-chart` · Header: `_balance`, `_menu-header`, `_popup-balance-details`, `_name-account-header` · Sidebar: `_Nav-item-tab_base`, `_Nav-item-tab_dropdown`, `flag`, `_action-collapse-expand` · `Dot` · `state-layer` · `⇄ Leading Icon`, `⇄ Trailing Icon` |
| **E (68)** | Typo trong tên/prop: `Text Action` ×2 (`Sellect`), `_focus-ring`/`primitive-paging`/`primitive-control`/`_button-close` (`Retangle`), `_input-checkbox` (`Checbox`), `primitive-checkbox` (`Indeteriminate`), `inline-alert`/`_modal-dialogs`/`_text-input-main` (`Waring`,`Sucess`), `alert-plain-inline` (`alt_waring`), `toast-alert`, `_hint-text` (`Sucess`), `primitive-calendar-cell` (`Slected`,`moth`), `primitive-dialog-footer` (`Sudbed Desicion`,`Type10`), `primitive-info-tips` (`Show lcon`), `Breadcrumbs__Item` (`Lable`), `primitive-label` (`Weigh`), `primitive-range-dot` (`State9`), `_action-snackbar` (`State3`), `_primitives-single-button-delete ` (`backgroud`, khoảng trắng cuối), Sidebar V1/V2 (`Publiser`,`Laungue`), `__warp_icon_left/search` (`warp`), `_panel-add-a-creative` (`Containter`) · `Property 1`/`Variant2`: `Interaction`, `_enter-verification-code`, `Primitive / userInfo`, `primitive-indicator`, `_progress-indicator`, `Demographics`, `pagination-dots-hash-navigation` · Remote/stale binding: `button-main-system`, `button-state`, `_text-area`, `_editor-icon`, `primitive-table-header-cell`, `Table`, `primitive-dialogs-content`, `primitive-semantic-icons`, `_input-dropdown`, `_dropdown-trigger`, `_search-rich-suggestions`, `Badge`, `Status Badge`, `_tooltips`, `primitive-tabs`, `primitive-step`, `primitive - step text - horizontal`, `_banner-noti-system`, `_content-label`, `status_data`, `_donut-chart`, `section-chart`, `section-dashboard`, `_Nav-item`, `_primitive-scrollBar` · Hard-code/không style: `Statistic Chart - Dot`, `_Nav-item-studioCreatives`, `Coach mark` (61 text không style), `Dashboard` (Screen Layout), `pagination-dots`, `Icon bell`, `primitive - step text - vertical` · Chưa xong: `_chips` (NOT YET) |
| Asset (13) | Logo ×8, File Icon ×1, File Illustrator ×4 — ngoài gate token |

## 4. Mười mâu thuẫn quan trọng nhất (Figma thắng)
| # | Khái niệm | Figma | Repo | Đề xuất |
|---|---|---|---|---|
| D-01 | Tên spacing | `spacing/xs, sm, md, lg (Base)…` | `--sa-space-1…16` (numeric) | Giữ Figma làm nguồn; numeric là alias docs. Nếu tái cấu trúc, chuyển Figma sang numeric (Audit TK-04) |
| D-02 | Dark mode | Mode Dark tồn tại trong `Alias` | `themes: [light, dark]` + theme dark website | Theo Q1: ghi `themes: ["light"]` cho token sản phẩm; theme dark của website docs tách biệt (không sinh từ token sản phẩm) |
| D-03 | Biến CSS sinh từ tên có khoảng trắng | `color/red light/500`, `spacing/lg (Base)` | `replaceAll('/', '-')` → `--sa-color-red light-500` (không hợp lệ) | Áp slug chuẩn (SDS-CONTEXT §8) |
| D-04 | Màu docs hard-code trùng Figma | `color/primary/500`, `secondary dark/900`, `gray/500`, `gray/800` | `#048845`, `#1f1f1f`, `#dfe3e8`, `#7b7d80` | Đổi sang `var(--sa-…)` |
| D-05 | Rename-map tham chiếu tên không tồn tại | Không có `spacing/1 (1px)` (chỉ có `screen/1 (1px)`), không có `Alias/Primary - On Theme` local | 2 mục trong `rename-map.json` | Sửa/loại 2 mục |
| D-06 | Quy ước tên | 209 error lint | `naming.md` (lowercase kebab, state cuối) | Dùng naming spec trong Audit làm chuẩn; Figma đổi dần |
| D-07 | Typography docs | Body 120%, thang `Brand/*` | Docs body 200%, list 11–32px | Giữ là quy ước docs-only; không đưa vào token sản phẩm |
| D-08 | Icon | `icon/size` local (16) **không được dùng**; component dùng `icon/size` **remote**; icon frame 20×20 | MingCute 3.1.0 (2.263 icon), Tabler cho docs | Xác minh bộ icon Figma; rebind `icon/size` local |
| D-09 | Breakpoint | Viewport 1280/1366/1440/1536(=1563)/1920 + 390/428/843/1024; Modal backdrop 430/375 | Layout draft chưa duyệt breakpoint | Chốt breakpoint, sửa 1563 |
| D-10 | Stack component | — (Figma trung lập) | `component-code-rules.md` HTML/CSS/JS vs skill Bootstrap+jQuery | Đã chốt Q2: HTML/CSS/JS thuần |

## 5. Còn mở
- Duyệt mapping đổi tên Quick-wins (Audit §4) và D3–D8 trong `open-decisions.md`.
- `AGENTS.md` đã cập nhật 14/11/2026 (điểm vào duy nhất cho mọi AI); quy tắc Figma chỉ-đọc giữ nguyên, bỏ tên tài khoản cụ thể ngoài `info@smartads.tech`.
