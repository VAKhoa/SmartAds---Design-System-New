# SDS-AUDIT — Audit & đề xuất · v3 (14/11/2026)

> Suy luận từ `SDS-CONTEXT.md` + `SDS-RECONCILIATION.md` (không đọc lại nguồn). Figma = root; mọi đề xuất **chưa áp dụng** vào Figma hay repo; đổi tên chỉ áp dụng sau khi được duyệt trong `tokens/rename-map.json`. Phạm vi: Light mode only; component bàn giao HTML/CSS/JS thuần. Mức độ: **High / Med / Low**.

## 1. Tóm tắt
- Token Figma: **34% qua gate** (A 16 · B 219), **66% không qua** (455: 334 không được dùng, 121 đang dùng nhưng lỗi). Component: 77/145 qua gate.
- 5 vấn đề lớn nhất: (1) ~90 variable remote/stale đang bind trong component (`Text/text-white-on-color` ×1.074 lần dùng); (2) thang cỡ chữ không đơn điệu; (3) chữ semantic chính không đạt AA (`text/secondary` 4.13, `text/link` 3.48, `text/success` 3.68, `text/warning` 1.90); (4) không có token data-viz/delta/status/density; (5) đặt tên theo giá trị + lỗi chính tả lan sang prop component.

## 2. Bảng vấn đề

### 2.1 Token naming & architecture
| ID | Mức | Hạng mục | Hiện trạng (nguồn) | Vấn đề | Đề xuất | Lý do | Rủi ro khi đổi |
|---|---|---|---|---|---|---|---|
| TK-01 | High | Binding ngoài thư viện | ~90 tên non-local bind trong component: remote `Text/text-white-on-color` (1.074), `Typography/*`, `icon/size`, `component/icon/common/*`; stale `radius/4 (4px)` (848), `padding/none` (504), `margin/4` (477), `text/black-inverse` (218) (F) | Token đích không tồn tại trong 6 collection; xuất token sẽ thiếu; phụ thuộc thư viện cũ | Rebind sang local (`text/on-primary-white`/`text/inverse`, `icon/size`, `spacing/*`, `radius/*`), publish lại, gỡ thư viện cũ | Một nguồn sự thật | Trung bình: đổi binding nhiều variant; cần kiểm tra trực quan |
| TK-02 | High | Thang cỡ chữ | `typography/size/fs-sm 10 … fs-xs 16 … fs-body 40, fs-display 60, fs-display 2 48` (F) | Không đơn điệu, tên sai nghĩa; 6/15 không dùng | Đổi sang số: `typography/size/{10,11,12,13,14,16,18,20,24,28,32,40,48,60,80}` | Dự đoán được, map CSS ổn định | Thấp trong Figma (ID giữ nguyên); code cần map mới |
| TK-03 | High | Semantic theo giá trị | `text/gray-on-surface`, `text/secondary-black (main)`, `text/primary-white`, `text/primary-green`, `surface/neutral-white`, `border/gray-stronger`, `border/white`… (19 đang dùng) (F, 5 có ở R) | Vi phạm tầng semantic; không có `text/primary` | Bộ vai trò: `text/{primary,secondary,tertiary,disabled,inverse,on-primary,link,brand}`, `surface/{default,subtle,raised,inverse,brand}`, `border/{default,subtle,strong,focus,brand}` | Đổi theme/brand không phải đổi tên | Trung bình: đổi nghĩa token; cập nhật 5 biến docs |
| TK-04 | Med | Spacing | `spacing/lg (Base)`=16 và `spacing/lg`=18; `odd-7`, `xs-plus`, `md-plus`; repo `--sa-space-*` numeric (F/R, D-01) | Tên trùng gốc, hậu tố không quy luật, 2 hệ tên | Ngắn hạn: `lg`→`lg-plus`, rồi `lg (Base)`→`lg`; dài hạn: thang numeric ×4 (`spacing/1`=4…) thống nhất với repo | Một tên/khái niệm | Thấp (Figma); docs đang dùng numeric |
| TK-05 | Med | Collection lẫn tầng | `Spacing` chứa `screen/*` (42) + `typography/text/*` (13) trùng Primitives; `Alias` chứa 147 token `component/*`; boolean `Action Add`, `Subtitble` ở Primitives (F) | Sai tầng, trùng; 70/98 token Spacing không được dùng | Xoá `screen/*`, `typography/text/*` (Spacing); tách collection `Component`; chuyển boolean sang `Config` | Kiến trúc rõ Base → Semantic → Component | Thấp: các token này không được dùng |
| TK-06 | Med | Token không dùng | 334 token (137 Primitives, 70 Spacing, 103 Alias, 6 Text, 18 Viewport) (F) | Nhiễu khi chọn token, tăng chi phí docs | Đánh dấu `deprecated` (description) 1 vòng phát hành rồi xoá; giữ thang màu 50–900 nếu cần cho data-viz | Gọn thư viện | Thấp; kiểm các trang Application UI trước khi xoá |
| TK-07 | Med | Trùng lặp | `surface/info`=`surface/accent` (blue/500); `background/default`=`surface/primary-disable`=`surface/primary-default` (gray/100); `typography/family/text`=`display` (F) | Hai tên một nghĩa | Giữ một: `surface/info`, `surface/subtle`, `typography/family/base` | Giảm nhầm lẫn | Thấp |
| TK-08 | Med | Hard-code trong Alias | 17 token Light không alias (15 đang dùng: logo bên thứ ba, `component/icon/file/*`, `component/table/surface/tab-header` #f6f8fa, `sematic/dashboard/*`) (F) | Không truy về primitive | Thêm primitive `color/brand/<partner>/*`, `color/gray/25`; alias lại | Toàn vẹn chuỗi alias | Thấp |
| TK-09 | Med | Primitive mang nghĩa / khó đọc | `color/semantic tokens/color-ai-*`, `color/brand/fpt/{F,P,T}`, `color/red light|red dark`, `color/secondary dark|light` (F) | Sai tầng; "light/dark" dễ nhầm theme | `color/ai/*`, `color/brand/fpt/{blue,orange,green}`, `color/red-light|red-dark/*` (naming.md; gộp họ đỏ nếu bạn đồng ý), `color/neutral/*` (chờ D3) | Đọc được, không nhầm mode | Thấp (ID giữ) |
| TK-10 | Med | Scope & code syntax | `ALL_SCOPES` 690/690; code syntax 0/690; description 6 (F) | Dễ gán nhầm trong Figma; Dev Mode không hiện tên code | Scope theo loại; code syntax WEB `var(--sa-…)` theo quy tắc §3 | Handoff chính xác | Thấp |
| TK-11 | Low | Casing | Viewport PascalCase (`Width/wd-xs`, `Screen/Container/…`); `typography/weight/Regular`; khoảng trắng ở 27 tên Alias (F) | Lệch quy ước đa số | Chữ thường kebab: `layout/width/xs`, `typography/weight/regular` | Slug ổn định | Thấp |
| TK-12 | Med | Map sang code | `generate-theme.mjs` chỉ thay `/`→`-` (R) | Tên có khoảng trắng/ngoặc sinh CSS var không hợp lệ | Quy tắc slug duy nhất (§3) + test kiểm tên hợp lệ, không trùng | Build ổn định | Thấp |
| TK-13 | Low | Giá trị sai | `space/1536`=1563; `Screen/Container/size-screen-width`@`1536-lg`=1563; mode `1536-lg` trùng nhãn `1440-lg` (F) | Sai số liệu | Sửa 1536; đổi nhãn mode | Đúng breakpoint | Thấp |
| TK-14 | Low | Dark mode còn trong Figma | Mode `Accessible (Dark Mode)`, `Shadow/elevation-dark/*` (F); `themes: [light, dark]` (R) | Ngoài phạm vi theo quyết định 14/11 | Ẩn hoặc xoá mode Dark và style dark; `ds.config.json` → `themes: ["light"]` (không áp cho theme docs) | Tránh sinh nhầm | Thấp; xoá mode trong Figma không hoàn tác được — cần bạn duyệt |
| TK-15 | Low | Docs hard-code trùng token | `--sa-docs-primary #048845`, `--sa-docs-heading #1f1f1f`, `--sa-resource-border #dfe3e8`, `--sa-resource-muted #7b7d80` (R) | Lệch khi token đổi | `var(--sa-…)` | Nhất quán | Thấp |

### 2.2 Component & structure
| ID | Mức | Hạng mục | Hiện trạng | Vấn đề | Đề xuất | Lý do | Rủi ro |
|---|---|---|---|---|---|---|---|
| CP-01 | High | Variant explosion | `Badge` 1.201, `button-main-system` 1.440 + `button-state` 1.600, `_chips` 312, `_text-input-main` 278 (F) | Khó bảo trì, khó sinh docs/code | `Intent` × `Appearance` × `Size` + `State` (gộp 2 set Button); nội dung → SLOT/instance-swap/BOOLEAN | API gọn, map 1-1 sang class/attr | Cao: thay set ảnh hưởng instance; làm set mới song song |
| CP-02 | High | Typo trong prop/giá trị | `Retangle`, `Waring`, `Sucess`, `Errror`, `Sellect`, `Checbox Only`, `Indeteriminate`, `Laungue`, `Publiser`, `backgroud`, `Weigh`, `Dissmissible`, `Containter`, `Slected`, `moth`, `Sudbed Desicion`, `Show lcon`, `Lable`, `warp` (F) | Lan sang API code | Sửa theo bảng §4 | Prop code đúng chính tả | Thấp (Figma giữ override khi đổi tên) |
| CP-03 | Med | Tên mặc định | `Property 1`, `Variant2…6`, `State3`, `State9`, `Type10`, `Frame 1618873153` (F) | Không tự mô tả | Đặt tên thật hoặc xoá variant thừa | Sinh docs tự động | Thấp |
| CP-04 | Med | Từ vựng state | `Default/Hover/Focus/Press/Disable` vs `Pressed/Focused` vs `Enable/Typing/Hover Empty/Disable Data` (F) | Không nhất quán | Chuẩn (theo naming.md): `Rest, Hover, Focus, Pressed, Disabled, Selected`; lỗi/nội dung tách prop (`Status`={Default,Error,Warning,Success}, `Filled`, `Empty`) | Map ARIA/CSS rõ | Thấp–TB |
| CP-05 | Med | Button thiếu TEXT/instance-swap | Nhãn và icon chỉnh tay trong layer (F) | Không map được prop `label`, `icon` | Thêm TEXT `Label`, INSTANCE_SWAP `Icon leading/trailing` | API = code | Thấp |
| CP-06 | Med | Base naming | `_name` vs `primitive-name` vs `primitive - step text - vertical` vs `Primitive / userInfo`; version trong tên (`Sidebar Navigation V1-011205`) (F) | Không phân biệt public/private | `_` = base private; tên public không tiền tố; version bằng page/branch | Sinh catalog | Thấp |
| CP-07 | Med | Hard-code & thiếu style | ~1.240 fill hard-code (712 ở trang Button), 227 text không style (Step 126, Tour 61, Screen Layout 20) (F) | Không theo token | Bind fill/text style; ưu tiên Button, Chart, Sidebar | Đổi theme an toàn | Thấp |
| CP-08 | Med | Description | Chỉ 3 set có description (F) | Docs phải viết tay | Description + link docs cho mọi set public | Sinh docs | Thấp |
| CP-09 | Low | Trạng thái trong tên trang | `(Process)`, `(NOT YET)`, `**********`, emoji (F) | Máy không đọc được | Status trong description/Dev Mode + page `Deprecated` | Tự động hoá | Thấp |
| CP-10 | Med | Figma ↔ code | Repo 0 component sản phẩm (R) | Chưa có API code để đối chiếu | Khi build: class `sa-<component>`, modifier từ variant đã chuẩn hoá, `State` → pseudo-class/ARIA | Map 1-1 | — |

### 2.3 Kiểm tra AdTech
| ID | Mức | Hạng mục | Hiện trạng | Vấn đề | Đề xuất | Lý do | Rủi ro |
|---|---|---|---|---|---|---|---|
| AT-01 | High | Data-viz palette | Chỉ `chart/heatmap-level-0..5` (sequential từ primary); series hard-code trong `Statistic Chart - Dot` (11 fill) (F) | Không có categorical/diverging, chưa kiểm mù màu | `chart/categorical/{1..10}` (an toàn mù màu, tách brand), `chart/sequential/*`, `chart/diverging/{neg-3..pos-3}`, `chart/{axis,grid,label}` | Biểu đồ nhất quán, UI ≥3:1 | Thấp (thêm mới) |
| AT-02 | High | Delta / metric | `status_data` dùng `text/success` + remote `Boolean`; không có token (F) | Gắn cứng xanh = tăng | `delta/{positive,negative,neutral}/{text,surface,icon}` + prop `Polarity` (higher-is-better / lower-is-better: CPA, CPC, CPM giảm là tốt; CTR, ROAS tăng là tốt) | Đúng ngữ nghĩa nghiệp vụ | Thấp |
| AT-03 | High | Lifecycle status | `Status Badge`: info, Completed, Failed, Waiting, Forbid; màu mượn alert (F) | Thiếu 8/11 trạng thái | `status/{draft,pending-review,active,paused,scheduled,learning,limited,rejected,completed,archived,error}/{text,surface,border,icon}` + `Status Badge` `State` tương ứng | Đủ vòng đời chiến dịch | Thấp |
| AT-04 | High | Density | Không có token; Table `Size` lg/md (F) | Bảng dày đặc không có compact | Collection `Density` 3 mode: `density/row-height`, `density/cell-padding-x|y`, `density/control-height` | Một nguồn cho bảng/form | TB: bind lại table/input |
| AT-05 | Med | Data table | Có Row Selection, Checkbox, Radio, Expandable, Tree data, Fixed Columns, Empty, Skeleton (F) | Thiếu sticky header, sort/filter state, column picker, inline edit trong bảng, số căn phải/tabular | Variant `Sort`={none,asc,desc}, `Align`={start,end}; style số tabular; pattern column picker | Data-heavy | Thấp |
| AT-06 | Med | Typography số | Không có style KPI/số bảng (F) | Số lệch cột, KPI không nổi bật | `Brand/Numeric-*` (`font-feature-settings: "tnum"`), `Brand/KPI-lg|md` | Đọc số nhanh | Thấp |
| AT-07 | Med | Component đặc thù | Có: KPI card, date picker/range, stepper, breadcrumb, chart section, balance. Thiếu: compare period, filter bar tổng hợp, targeting/audience selector, budget/bid input đa tiền tệ, chart legend/tooltip chuẩn; creative preview theo placement chưa xác minh | Thiếu khối nghiệp vụ | Bổ sung theo lộ trình trung hạn | Phủ use case chính | — |
| AT-08 | Med | Tiền tệ & locale | Input `Money`/`Payment`, BOOLEAN `Show VND`, `Value đ`; cell `Price` (F) | Chưa có USD, chưa có quy tắc format vi-VN, chưa kiểm nhãn tiếng Việt dài | Pattern "Number & currency" + prop `Currency`={VND,USD}; test nhãn VI dài hơn 30–40% | Đúng locale | Thấp |
| AT-09 | Low | Dark mode cho chart/status | Ngoài phạm vi | — | Nếu mở lại dark mode: mọi `chart/*`, `status/*`, `delta/*` phải có giá trị Dark | — | — |

### 2.4 Accessibility
| ID | Mức | Hạng mục | Hiện trạng | Vấn đề | Đề xuất | Lý do | Rủi ro |
|---|---|---|---|---|---|---|---|
| A11Y-01 | High | Contrast chữ | Trên trắng: `text/secondary` 4.13, `text/gray-on-surface` 4.13, `text/link` 3.48, `text/success` 3.68, `text/danger` 4.20, `text/warning` 1.90, `text/warning-on-surface` 2.30, `text/success-on-surface` 4.36, `text/gray` 2.59; `text/on-primary-white` trên primary 4.44 (F) | Dưới AA 4.5 | `text/secondary`→gray/900 (6.39); `text/link`→blue/500 (4.95); `text/success`→green/700 (6.49); `text/warning`→yellow/800 (5.64); `text/danger`→red/600 (4.93) | WCAG AA | Thấp; kiểm lại màn hình |
| A11Y-02 | Med | Nút trạng thái | Trắng trên success 3.68, danger 4.20, warning 1.90 (F) | Nút chữ trắng không đạt | Fill 600/700 hoặc chữ tối cho warning | AA | Thấp |
| A11Y-03 | Med | Viền & focus | `border/gray-*` 1.12–1.57; focus `#8cc8a9` 1.92 trên trắng (F) | Viền control < 3:1 | `border/strong` ≥3:1; focus ring primary/500 2px + offset | WCAG 1.4.11, 2.4.7 | Thấp |
| A11Y-04 | Med | Target size | `_button-close` 12×12, Toggle 32×18, Tag 20–25, Badge 16–24 (F) | < 24×24 | Vùng bấm tối thiểu 24×24 (2.5.8) | Touch/tablet | Thấp |

## 3. Quy ước naming đề xuất (spec ngắn)
1. Ký tự: `a-z 0-9 -` trong segment, `/` giữa segment; **không** khoảng trắng, ngoặc, chữ hoa, `_`, dấu tiếng Việt.
2. Thứ tự: `<category>/<property>/<variant>/<state>`; danh từ số ít (`color`, `border`); hạn chế viết tắt.
3. Tầng: Base `color/<hue>/<step>`, `space/<px>`, `font-size/<px>`; Semantic `<role>/<variant>[/<state>]`; Component `component/<name>/<property>/<variant>/<state>`.
4. State luôn là segment cuối, từ vựng cố định theo `ds-conventions/references/naming.md`: `rest, hover, pressed, focus, disabled, selected`; mức độ: `info, success, warning, danger`; mức nhấn: `default, subtle` (không dùng `sub`/`muted`/`weak` song song).
5. Thang: t-shirt đơn điệu `3xs, 2xs, xs, sm, md, lg, xl, 2xl, 3xl…` (không dùng `xxs`, `xxl`) **hoặc** số (D4/D7); không trộn.
6. Code: `--sa-` + slug (lowercase, bỏ ngoặc, khoảng trắng và `/` → `-`); JS (nếu cần) dùng camelCase của slug.

| Sai | Đúng |
|---|---|
| `color/red light/500` | `color/red-light/500` |
| `text/gray-on-surface` | `text/secondary` |
| `component/toast alert/surface-rest` | `component/toast-alert/surface/default/rest` |
| `spacing/lg (Base)` | `spacing/lg` (sau khi `spacing/lg` 18 đổi thành `lg-plus`) |
| `spacing/xxs` | `spacing/2xs` |
| `typography/size/fs-xs` (16) | `typography/size/16` |
| `Width/wd-xs` | `layout/width/xs` |
| Variant `State=Waring` | `State=Warning` |

## 4. Mapping đổi tên — Quick wins (không phá vỡ binding trong Figma vì ID giữ nguyên)
| old_name | new_name |
|---|---|
| `color/red light/*` · `color/red dark/*` | `color/red-light/*` · `color/red-dark/*` (theo naming.md; gộp một họ đỏ là câu hỏi 2) |
| `color/green light/{50,100,200}` | `color/green-light/{50,100,200}` |
| `color/brand/fpt/F` · `P` · `T` | `color/brand/fpt/blue` · `orange` · `green` |
| `color/brand/fpt/Color-F-20%` (P, T) | `color/brand/fpt/blue-alpha-20` (orange, green) |
| `color/semantic tokens/color-ai-*` | `color/ai/*` (`color-ai-2light-blue` → `light-blue-2`) |
| `Subtitble` | `subtitle` (hoặc xoá — không dùng) |
| `sematic/ai/ai-gradient-mesh-*` | `ai/gradient-mesh/*` |
| `sematic/dina/border-mess` | `ai/dina/border-message` |
| `sematic/dashboard/surface-demographics` · `icon-demographics` | `chart/demographics/surface` · `icon` |
| `background/sucess` | `background/success` |
| `component/badge/sucess/surface-success` | `component/badge/success/surface` |
| `component/toast alert/*` | `component/toast-alert/*` |
| `component/state layers/*` | `component/state-layer/*` |
| `component/text input/*` · `component/digital verify code/*` | `component/text-input/*` · `component/otp-input/*` |
| `component/button group/*` · `component/segmented control/*` | `component/button-group/*` · `component/segmented-control/*` |
| `component/inline editable/*` · `component/creative assets/*` | `component/inline-edit/*` · `component/creative-asset/*` |
| `component/button/split button/*` | `component/button/split/*` |
| `border/primary-opacity-haf` | `border/primary-alpha-30` |
| `spacing/lg` (18), sau đó `spacing/lg (Base)` (16) | `spacing/lg-plus`, sau đó `spacing/lg` (đúng thứ tự để tránh trùng) |
| `spacing/xxs` | `spacing/2xs` |
| `typography/size/fs-base 1` · `2` · `3` · `fs-display 2` | `fs-base-1` · `-2` · `-3` · `fs-display-2` (tạm, trước TK-02) |
| `typography/text/<N> (size <N>)` | `typography/text/<N>` |
| `typography/weight/{Regular,Medium,Semi,Bold}` · `Brand/*/Semi` | `typography/weight/{regular,medium,semibold,bold}` · `brand/*/semibold` |
| `Screen/Navigation/btn-create-campagin` | `layout/navigation/show-create-campaign` |
| `Focus/ring-sucess-sm` | `Focus/ring-success-sm` |
| `Shadow/semantic/element/pannel-left|right` | `…/panel-left|right` |
| `Gradient/gradient-linear-siver` | `Gradient/gradient-linear-silver` |
| `Brand/Tini/*` | `Brand/Tiny/*` (D2) |
| Giá trị prop `Retangle` · `Waring` · `Sucess` · `Errror` · `Sellect All` · `alt_waring` · `alt_sucess` | `Rectangle` · `Warning` · `Success` · `Error` · `Select All` · `alt_warning` · `alt_success` |
| Tên prop `Checbox Only` · `Indeteriminate` · `Laungue` · `Publiser` · `backgroud` · `Weigh` · `Dissmissible` · `Show lcon` · `Lable` | `Checkbox Only` · `Indeterminate` · `Language` · `Publisher` · `background` · `Weight` · `Dismissible` · `Show Icon` · `Label` |
| Giá trị `Slected…` · `…last moth` · `Sudbed Desicion` · `Sudbed Confirm` · `Containter body` | `Selected…` · `…last month` · `Subdued Decision` · `Subdued Confirm` · `Container body` |
| Component `__warp_icon_left|search` · `_primitives-single-button-delete ` | `__wrap_icon_left|search` · `_primitives-single-button-delete` (bỏ khoảng trắng cuối) |

Các mục trên được ghi thành `proposed` trong `tokens/rename-map.json` (không có mục nào được áp dụng). Repo (sau khi Figma đổi): cập nhật `generate-theme.mjs` (slug), `rename-map.json` (thêm các mục trên; xoá `spacing/1 (1px)` và `Alias/Primary - On Theme` vì không tồn tại), đổi `--sa-docs-*`/`--sa-resource-*` hard-code sang `var()`.

## 5. Lộ trình
| Mức | Việc | Ảnh hưởng |
|---|---|---|
| **Quick wins** (không phá vỡ) | Đổi tên §4; sửa `space/1536`; scope + code syntax (TK-10); description cho set public; slug chuẩn trong `generate-theme.mjs` + test tên CSS; docs hex → `var()`; `ds.config.json themes: ["light"]`; đánh dấu 334 token không dùng là deprecated | Không đổi giao diện |
| **Trung hạn** | Rebind remote/stale (TK-01); semantic text/surface/border theo vai trò + fix contrast (TK-03, A11Y-01..03); thang cỡ chữ số (TK-02); thêm `chart/*`, `delta/*`, `status/*`, `Density` (AT-01..04); style số tabular/KPI; xoá `screen/*`, `typography/text/*` khỏi Spacing; chuẩn hoá từ vựng state; TEXT/instance-swap cho Button | Đổi màu một số chữ; cần QA trực quan |
| **Tái cấu trúc** | Tách collection Base/Semantic/Component/Density/Layout; gộp `button-main-system` + `button-state`, rút gọn Badge/Chips/Input bằng SLOT; xoá token deprecated và mode Dark; bắt đầu thư viện HTML/CSS/JS `sa-*` theo API đã chuẩn hoá | Thay set component; cần kế hoạch migrate instance |

## 6. Câu hỏi cần bạn quyết định
1. Thang cỡ chữ (D4): dùng số (`typography/size/14`) hay t-shirt đơn điệu? Đổi `Microscope`/`Tini` thành gì?
2. Trung tính (D3): gộp `color/gray` + `color/secondary dark` thành `color/neutral`? Giữ hay xoá `color/secondary light`, `color/red dark`, `color/orange` (không được dùng)?
3. Spacing (TK-04): giữ t-shirt (`spacing/lg`) hay chuyển sang numeric như docs (`spacing/4`=16)?
4. Cho phép **xoá** mode Dark và `Shadow/elevation-dark/*` khỏi Figma (không hoàn tác được) hay chỉ ẩn khỏi publish?
5. Palette data-viz: 8 hay 10 màu series? Có cần bộ màu riêng cho Advertiser/Publisher?
6. Danh sách trạng thái lifecycle chính thức (11 trạng thái trong brief) và màu cho từng trạng thái?
7. Format số/tiền vi-VN: viết tắt "1,2 Tr / 3,4 Tỷ" hay "1.2M / 3.4B"? Timezone mặc định `Asia/Ho_Chi_Minh`?
8. Density: 3 mode (compact/default/comfortable) hay 2?
9. Ai duyệt và khi nào áp dụng `rename-map.json` (hiện 0 mục `approved`)?
