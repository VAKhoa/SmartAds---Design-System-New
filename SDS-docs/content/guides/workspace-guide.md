---
title: Hướng dẫn thư mục và vận hành SDS Docs
section: Introduction
updated: 04/11/2026
status: beta
---

# Hướng dẫn thư mục và vận hành SDS Docs

Website SDS đã triển khai: [smart-ads-design-system-new.vercel.app](https://smart-ads-design-system-new.vercel.app/). Dùng URL này khi cần cho AI agent tham khảo tài liệu trực tuyến; vẫn gửi node Figma cụ thể cho task UI.

Tài liệu này giải thích **các file trong thư mục xây SDS và cách vận hành chúng**. Để hiểu SmartAds là sản phẩm gì, ai dùng và vì sao xây SDS, đọc [SmartAds và SDS là gì?](about-smartads.md) trước. Website hiện có 7 trang Introduction, trang Resource / Figma và hai bài [Colors](/foundation/colors/) và [Typography](/foundation/typography/) trong Foundation; 19 route Foundation/Components/Patterns còn lại đang chờ bài Markdown. SDS chưa có gói CSS token phát hành hoặc thư viện component code dành cho sản phẩm. [Bảng tên file cho từng mục sidebar](content-guide.md) chỉ rõ nơi tạo bài. Nguồn thiết kế: [SmartAds - Design System](https://www.figma.com/design/cRZ5kIi4kD6j9lh1dbh5mh/SmartAds---Design-System).

## Bắt đầu một task như thế nào?

Mở thư mục **`SmartAds - SDS/`** trong Codex. File `AGENTS.md` ở gốc là điểm vào tự động và dẫn tới `SDS-docs/content/rules/SDS-rules.md`, nơi chứa quy tắc chi tiết. Khi giao task, bạn chỉ cần nhắc **`SDS-docs/content/rules/SDS-rules.md`**; không cần gọi `AGENTS.md` như tên một agent. Giao việc cho **Codex chính**, mô tả kết quả mong muốn và gửi link Figma đúng node nếu task liên quan UI. Skill là hướng dẫn theo chuyên môn mà Codex đọc khi task phù hợp; nó không phải một agent chạy độc lập và không tự sinh ra nội dung được duyệt.

Mỗi yêu cầu nên có bốn thông tin: **đầu ra** (trang/tài liệu/token nào), **nguồn** (node Figma/file/link nào), **phạm vi** (light/dark, desktop/mobile, state nào), và **điều kiện hoàn tất** (build, kiểm tra tương tác, báo phần chưa có nguồn). Nếu thiếu một phần, Codex cần đọc những gì đã có trong repo trước, nêu giả định, rồi mới sửa.

### Phân biệt file quy tắc và file hướng dẫn

Bốn file dưới đây có nhiệm vụ riêng. Bạn chỉ cần mở file phù hợp với việc đang làm:

| File | Vai trò | Bạn cần mở khi nào? |
| --- | --- | --- |
| `SmartAds - SDS/AGENTS.md` | Điểm vào tự động theo quy ước của Codex; dẫn tới file quy tắc chi tiết. | Codex tự đọc khi bắt đầu; bạn không cần gọi file này. |
| `SDS-docs/content/rules/SDS-rules.md` | Quy tắc bắt buộc cho dữ liệu Figma, token, nội dung và website. | Đây là file bạn nhắc trong prompt hoặc mở khi muốn đổi quy tắc chung. |
| `SDS-docs/README.md` | Trang dẫn nhập cho người mới, chỉ dẫn đến hai tài liệu `content/guides/` và bản đồ `content/README.md`. | Bạn mở khi lần đầu vào `SDS-docs/`. |
| `SDS-docs/website/README.md` | Cách chạy website, danh mục file code và cách thêm file Figma. | Mở khi sửa hoặc chạy website. |

Tài liệu bạn đang đọc là **quy trình làm việc chung**, còn website README là **hướng dẫn kỹ thuật của website**. Không chép toàn bộ quy tắc vào prompt mỗi lần: chỉ cần giao đầu ra, nguồn, phạm vi và điều kiện hoàn tất như bảng trên.

| Bạn muốn làm | Gọi Codex và skill nào | Nguồn và file thường sửa | Điều kiện hoàn tất |
| --- | --- | --- | --- |
| Sửa layout, màu, nút, icon website | Codex chính; đọc `content/rules/website-ui-rules.md`; với link Figma dùng skill Figma design-to-code của môi trường. Nếu cần định nghĩa trạng thái component, đọc thêm `external-design-system` như tài liệu tham khảo. | Node Figma được gửi, `website/src/components/`, `website/src/styles/`, `website/public/brand/`. | Đối chiếu screenshot Figma, light/dark, hover/active/focus, desktop/mobile; build và kiểm tra route/asset. |
| Viết hoặc sửa bài cho sidebar | Codex chính; đọc `SDS-rules.md`, `content/guides/content-guide.md`, thêm `ds-conventions` nếu bài nêu quy tắc token. | File chính trong `content/pages/` theo mục sidebar, Figma/snapshot hoặc nguồn SmartAds được dẫn. | Frontmatter, nguồn, trạng thái, route và link `.md` đúng; build, xem trang. |
| Thêm file vào Resource / Figma | Codex chính; không cần skill token. | `website/src/data/figma-files.json` và link Figma thật. | Thẻ mới có link/tiêu đề đúng, mở tab mới, layout không tràn; build. |
| Làm mới bản chụp variables/styles | Codex chính + `figma-token-workflow`. | File key trong `ds.config.json`, Figma hiện tại; đầu ra `variable-figma-export/`. | Đếm ID, collection, mode, style; lưu ngày và nguồn; đối chiếu chênh lệch với bản cũ. |
| Kiểm kê, đề xuất tên token hoặc viết Foundation | Codex chính + `ds-conventions`; dùng thêm `figma-token-workflow` khi cần đối chiếu dữ liệu mới. | Figma/snapshot, references theo loại, `tokens/rename-map.json`, `docs/_audit/`. | Có ID và giá trị nguồn; tách quy tắc đã duyệt với đề xuất; không tự áp dụng rename. |
| Chỉnh script xuất/kiểm tra token | Codex chính + `figma-token-workflow` nếu liên quan Figma. | `scripts/`, `tests/`. | `node tests/run-tests.mjs` đạt; báo giới hạn của dữ liệu mẫu. |
| Phát hành token hoặc component sản phẩm | Codex chính + `ds-conventions` và `figma-token-workflow`; chỉ bắt đầu sau khi phạm vi và quyết định liên quan được chốt. | Figma, rename map, token/source được kiểm chứng. | Mỗi giá trị truy được nguồn; alias/mode và state đúng; có kiểm tra đầu ra riêng. |

`external-design-system` ở `../../.agents/skills/external-design-system/skill-design-system.md` trỏ tới `E:\Test-Codex\design-system\SKILL.md`. Nó hữu ích cho cấu trúc token và state, nhưng đường dẫn này phụ thuộc máy đang dùng; nếu chuyển máy, cần cài lại hoặc cập nhật đường dẫn. Ví dụ màu trong skill là ví dụ chung, **không phải** giá trị SmartAds. Các skill `ds-conventions` và `figma-token-workflow` nằm ngay trong repo nên có thể chỉ đích danh bằng đường dẫn nếu lệnh `$...` không được môi trường nhận diện.

### Prompt mẫu để Codex làm đúng ngay từ đầu

**UI từ Figma:** “Trong `SmartAds - SDS/SDS-docs/website`, đọc `SDS-docs/content/rules/SDS-rules.md` và `SDS-docs/content/rules/website-ui-rules.md`. Dùng node Figma [URL] để sửa [trang/component]. Giữ Public Sans, line-height 200% cho body content và 120% cho header/sidebar, icon Tabler, prefix `sa`; triển khai light/dark, hover/active/focus và responsive [các độ rộng]. Dùng token/asset có nguồn; ghi phần Figma chưa xác định. Rà các trang docs bị ảnh hưởng, build, kiểm tra trên trình duyệt và báo file đã sửa.”

**Tài liệu Foundation:** “Đọc `SDS-docs/content/rules/SDS-rules.md`, `content/guides/content-guide.md`, `$ds-conventions` (hoặc file `SKILL.md` tương ứng) và snapshot/Figma mới nhất. Chọn đúng file cho mục sidebar [tên], viết bài dựa trên [node/variable ID]; ghi nguồn, ngày, trạng thái `draft`/`in-review`. Không biến đề xuất D2–D8 thành quy tắc đã duyệt. Chạy build, kiểm tra route và URL `.md` gốc.”

**Audit token:** “Đọc `SDS-docs/content/rules/SDS-rules.md`, `$figma-token-workflow` và `$ds-conventions`; kiểm kê collection [tên] từ Figma, đối chiếu `variable-figma-export/`, chạy lint/suggest, ghi báo cáo có ID và mức độ chắc chắn. Giữ rename ở trạng thái đề xuất; không sửa Figma khi chưa có yêu cầu áp dụng.”

**Thêm file Figma:** “Thêm file [URL], tên [tên], mô tả [mô tả] vào `website/src/data/figma-files.json`, kiểm tra trang Resource / Figma ở light/dark và build.”

### Luồng thực hiện và điểm kiểm tra

1. **Xác định loại việc và đọc quy tắc:** `SDS-docs/content/rules/SDS-rules.md`, `ds.config.json`, rồi chỉ mở skill/reference liên quan trong bảng trên. File Figma gốc cho token nằm trong `ds.config.json`; node Component Library dùng cho UI website chỉ là nguồn của màn hình được giao.
2. **Lấy nguồn đúng:** với UI, đọc node Figma và asset; với token, đọc variable/style ID và mode; với nội dung, dẫn nguồn và phân biệt thông tin xác nhận với đề xuất. Snapshot trong `variable-figma-export/` là dữ liệu ngày 02/11/2026, không tự đồng bộ.
3. **Sửa đúng lớp:** nội dung bài trong Markdown đúng đường dẫn ở `content/guides/content-guide.md`; danh sách file Figma trong JSON; UI trong component/CSS; quy tắc token trong skill/rename map sau khi có quyết định. Sửa đầu vào hoặc script để sinh lại file tự động, không sửa tay `*.generated.*`, `website/public/source/`, `.next/` hay `out/`.
4. **Tự kiểm trước build:** xem trang liên quan ở light/dark, kích thước lớn và nhỏ; kiểm tra link, trạng thái hover/focus/active, icon/font, asset tải được. Không thêm dữ liệu giả để lấp chỗ trống.
5. **Đồng bộ tài liệu website:** dùng bảng tác động dưới đây để rà các trang Introduction và README. Sửa nội dung, ví dụ và prompt đã cũ; cập nhật `updated` của trang đã sửa. Không chỉ thêm tên file mới vào một bảng rồi bỏ qua cách sử dụng ở các đoạn khác.
6. **Build và bàn giao:** chạy lệnh đúng trong mục dưới, xem các route đã sửa. Lỗi build là việc cần sửa; lint token có thể báo tên Figma chưa chuẩn và không đồng nghĩa công cụ hỏng. Báo nguồn, phạm vi đã kiểm, các quyết định còn chờ, trang đã đồng bộ và trang đã kiểm tra nhưng không cần đổi.

### Bảng kiểm tra tác động khi folder thay đổi

Build chỉ chuyển nội dung Markdown thành website; nó **không tự sửa bài viết** khi quy tắc, skill, Figma snapshot hoặc code đổi. Trước khi kết thúc mỗi task, tìm các tham chiếu cũ trong toàn bộ `content/pages/`, chọn các trang liên quan theo bảng và kiểm tra cả `website/README.md`. Bảng là điểm bắt đầu để rà soát, không phải danh sách cố định giới hạn những trang có thể bị ảnh hưởng.

| Thay đổi ở đâu | Trang cần mở để đối chiếu |
| --- | --- |
| `AGENTS.md`, `SDS-rules.md`, `website-ui-rules.md`, `.agents/skills/`, `content/guides/workspace-guide.md` | **AI Agents**: cách gọi file/skill, flow, prompt, checklist; **Getting Started**: điểm bắt đầu theo vai trò; **FAQ**: câu trả lời vận hành; **Glossary** nếu thuật ngữ đổi. |
| `ds.config.json`, `variable-figma-export/`, `tokens/rename-map.json`, quyết định D1–D8 | **Overview**: số liệu và trạng thái; **Design System?**, **Getting Started**, **AI Agents**, **FAQ**, **Glossary**: tên, nguồn, mode, mức đã duyệt. Chỉ đổi số liệu sau khi đối chiếu dữ liệu thật. |
| `website/package.json`, script, cấu trúc thư mục, lệnh chạy hoặc quy trình build | **AI Agents**: lệnh/prompt/kiểm tra; **Getting Started**, **FAQ** khi người đọc cần thao tác; `website/README.md` và hướng dẫn này. |
| `website/src/lib/navigation.js`, route, bài Introduction, `website/src/data/figma-files.json` | **Overview** và **FAQ**: phạm vi trang; **Getting Started**, **AI Agents**: đường dẫn và cách dùng; kiểm tra link/sidebar/trang Resource. |
| Font, màu, spacing, layout, icon, logo, state hoặc responsive của website | `website-ui-rules.md`; **AI Agents** nếu quy tắc hoặc cách kiểm tra đổi; các trang có ví dụ/ảnh/mô tả UI liên quan và `website/README.md`. |

Đầu ra của bước này phải ghi một trong hai kết quả cho từng trang liên quan: **đã cập nhật** (nêu file và phần đổi) hoặc **đã kiểm tra, còn đúng** (nêu lý do). Sau đó chạy `npm run build` và xem route bị ảnh hưởng. Nếu đổi hành vi, theme, layout hoặc điều hướng, chạy thêm `npm run test:e2e`.

### Khi nào chạy lệnh nào?

Trong `SDS-docs/website/`, cài thư viện **một lần** bằng `npm ci`, rồi chạy `npm run dev` để chỉnh giao diện tại `http://127.0.0.1:4321/`. CSS/component/JSON cập nhật trong dev; khi sửa Markdown, chạy `npm run prepare:content` trong terminal khác hoặc khởi động lại dev. Khi muốn kiểm tra bản sẽ xuất bản, chạy `npm run build` (lệnh này tự chạy `prepare:content`), sau đó `npm run preview` để mở bản trong `out/`. Dev và preview cùng dùng cổng 4321 nên dừng tiến trình cũ trước. **Không mở `out/index.html` bằng `file://` hoặc Live Server** vì route và asset của Next static export cần được phục vụ từ root bằng server phù hợp.

Sau khi sửa hành vi điều hướng, theme, layout có nhiều breakpoint hoặc trang mới, chạy `npm run test:e2e` trong `website/` (cần build trước; Playwright tự mở preview trên cổng 4322). Với thay đổi nhỏ chỉ về chữ/màu, build và kiểm tra trực tiếp đúng màn có thể đủ. Khi sửa `SDS-docs/scripts/`, chạy `node tests/run-tests.mjs` từ `SDS-docs/`. Để audit token từ snapshot, chạy `node scripts/ds-tokens.mjs lint variable-figma-export/` và `node scripts/ds-tokens.mjs suggest variable-figma-export/`; lint hiện có lỗi tên từ Figma và có thể trả mã khác 0, vì vậy hãy đọc báo cáo thay vì coi đó là lỗi build website.

## Cấu trúc hiện tại

```text
SmartAds - SDS/
├─ AGENTS.md, .agents/skills/external-design-system/skill-design-system.md
└─ SDS-docs/
   ├─ README.md, ds.config.json, .gitignore
   ├─ content/
   │  ├─ README.md                 (bản đồ tài liệu Markdown)
   │  ├─ rules/{SDS-rules.md,website-ui-rules.md}
   │  ├─ guides/{about-smartads.md,workspace-guide.md,content-guide.md}
   │  └─ pages/{index.md,introduction/,foundation/,components/,patterns/}
   ├─ .agents/skills/
   │  ├─ ds-conventions/SKILL.md
   │  ├─ ds-conventions/references/{naming,color,typography,spacing-radius,effects,open-decisions}.md
   │  └─ figma-token-workflow/SKILL.md
   ├─ scripts/{ds-tokens.mjs,dump-variables.figma.js,dump-styles.figma.js}
   ├─ tests/{run-tests.mjs,fixtures/observed-sample.json}
   ├─ tokens/rename-map.json
   ├─ variable-figma-export/{overview.json,styles.json,variables.*.json}
   ├─ website/               (Next.js + React, Introduction + Resource / Figma + Colors)
   └─ docs/_audit/.gitkeep    (chưa có báo cáo)
```

| Nhóm | Ý nghĩa và cách dùng |
| --- | --- |
| `README.md` | Trang dẫn nhập ngắn, dẫn tới tài liệu sản phẩm, hướng dẫn vận hành và bản đồ Markdown trong `content/`. |
| `../AGENTS.md`, `../.agents/skills/external-design-system/` | Quy tắc vào dự án từ thư mục gốc và skill dùng chung phụ thuộc đường dẫn ngoài repo. |
| `content/guides/about-smartads.md` | Giải thích sản phẩm SmartAds, mục tiêu SDS, đối tượng sử dụng và nguồn thông tin. |
| `content/guides/workspace-guide.md` | Tài liệu bạn đang đọc: cấu trúc thư mục và cách vận hành. |
| `content/README.md` | Bản đồ duy nhất để tìm quy tắc, hướng dẫn và bài website. |
| `content/rules/` | Hai quy tắc: toàn dự án và UI website. |
| `content/guides/` | Giới thiệu SmartAds, cách vận hành và bảng file theo sidebar. |
| `content/pages/` | Bài Markdown hiển thị trên website; thêm file ở đây để tạo nội dung cho route tương ứng. |
| `ds.config.json` | Tên viết tắt `SDS`, file Figma, tên collection đang có và prefix CSS `sa` đã duyệt; cấu trúc collection đích chưa được duyệt. |
| `.gitignore` | Bỏ qua file sinh ra, file tạm và `node_modules` trong repository Git. |
| `.agents/skills/ds-conventions/` | Skill đặt tên token. Sáu file `references/` chứa chi tiết theo từng loại và quyết định D1–D8 (D1 đã chốt); chỉ mở mục liên quan. |
| `.agents/skills/figma-token-workflow/` | Skill đồng bộ, audit và quản lý đề xuất đổi tên từ Figma. |
| `scripts/dump-variables.figma.js` | Mã chạy trong Figma Plugin API để đọc collections và variables. |
| `scripts/dump-styles.figma.js` | Mã đọc text/effect styles; paint/grid styles cần đọc bổ sung khi làm snapshot đầy đủ. |
| `scripts/ds-tokens.mjs` | Lệnh `lint` kiểm tra tên và `suggest` gợi ý đổi tên từ JSON export. Không tự sửa Figma. |
| `tests/run-tests.mjs`, `tests/fixtures/` | Kiểm tra script bằng dữ liệu cố ý có lỗi; không dùng fixture làm token thật. |
| `tokens/rename-map.json` | Danh sách đề xuất đổi tên, còn chờ duyệt và cần đối chiếu lại với Figma hiện tại. |
| `variable-figma-export/` | Bản chụp toàn bộ tên và giá trị token Figma ngày 02/11/2026: `overview.json`, 6 file variables theo collection, `styles.json`. Đây là dữ liệu đầu vào để xử lý tiếp, không phải CSS phát hành. |
| `docs/_audit/` | Nơi sẽ lưu báo cáo audit. `.gitkeep` chỉ giữ thư mục rỗng. |
| `website/` | Mã website hiển thị cho người đọc. Đọc `content/rules/website-ui-rules.md` khi build UI; xem [hướng dẫn website](../../website/README.md) để biết từng file, trang Resource / Figma và cách chạy. |

## Mở file nào khi cần tra một việc cụ thể?

### Sáu reference của quy ước token

Các file dưới đây là **quy tắc và ghi chép audit ban đầu**, không phải bản export mới nhất từ Figma. Codex chỉ cần mở file liên quan đến việc đang làm.

| File trong `.agents/skills/ds-conventions/references/` | Mở khi cần |
| --- | --- |
| `naming.md` | Xét tên Base/Semantic/Component, trạng thái, ký tự hợp lệ và cách ánh xạ sang `--sa-*`. |
| `color.md` | Xét thang màu, vai trò màu, Light/Dark và tương phản. Bảng giá trị ở đây chỉ là mẫu đã quan sát trước khi có export đầy đủ. |
| `spacing-radius.md` | Xét thang spacing, radius và đề xuất tách collection. Những dòng `needs-value` cũ cần đối chiếu với snapshot mới. |
| `typography.md` | Xét font, size, text style và các tên cỡ chữ đang ngược ý nghĩa. |
| `effects.md` | Xét shadow/elevation và vai trò của từng mức. |
| `open-decisions.md` | Biết quyết định nào đã chốt (D1: `sa`) và D2–D8 còn cần người dùng quyết. |

### Tám file dữ liệu Figma đã lưu

Mở `overview.json` trước để biết tổng quan; sau đó chỉ mở collection cần tra. Tất cả file trong `variable-figma-export/` là **bản chụp ngày 02/11/2026**, không tự cập nhật theo Figma.

| File | Nội dung | Ví dụ cần tra |
| --- | --- | --- |
| `overview.json` | Sáu collection, mode, số variable từng loại và số style. | “Có bao nhiêu variable màu?” |
| `variables.primitives.json` | 256 variable gốc: màu, số và boolean. | Giá trị `color/primary/500`. |
| `variables.spacing.json` | 98 variable số; collection hiện còn chứa radius, screen, icon và typography. | `spacing/md`, `radius/md`. |
| `variables.alias.json` | 293 variable màu theo Light/Dark, gồm semantic và token component hiện đặt chung. | Màu `background/neutral` ở hai mode. |
| `variables.text.json` | 21 variable về family, weight và size chữ. | `typography/size/fs-sm`. |
| `variables.viewport-desktop.json` | 19 variable theo năm mode desktop. | Chiều rộng một vùng ở 1280 so với 1440. |
| `variables.viewport-mobile-tablet.json` | 3 variable theo bốn mode mobile/tablet, gồm hai boolean. | Nút tạo campaign có hiển thị ở 1024 hay không. |
| `styles.json` | 77 text, 43 effect, 7 paint và 5 grid styles. | Font/line-height của một text style hoặc lớp shadow của elevation. |

Trong mỗi variable, `name` là tên Figma hiện tại, `values` giữ giá trị hoặc đường alias theo mode, còn `resolvedValues` là giá trị sau khi lần theo alias. Ví dụ `background/neutral` trỏ tới `color/base/white` ở Light (`#ffffff`) và `color/base/black` ở Dark (`#000000`). `id` giúp nhận ra cùng một variable ngay cả khi tên thay đổi.

### Công cụ, dữ liệu chờ duyệt và file rỗng

| File | Ý nghĩa thực tế |
| --- | --- |
| `scripts/ds-tokens.mjs` | Chạy được bằng Node; `lint` tìm tên lệch quy ước, `suggest` in đề xuất. Không sửa Figma. |
| `scripts/dump-variables.figma.js` | Mã tham khảo chạy trong Figma Plugin API/MCP để đọc collection và variable; không chạy trực tiếp bằng Node. |
| `scripts/dump-styles.figma.js` | Mã tham khảo đọc text/effect style trong Figma; khi làm snapshot đầy đủ phải đọc paint/grid thêm. |
| `tests/run-tests.mjs` | Kiểm tra logic script. Kết quả “OK” nghĩa là công cụ chạy đúng với fixture, không có nghĩa Figma đã sạch lỗi. |
| `tests/fixtures/observed-sample.json` | 19 token mẫu cố ý có tên sai để kiểm thử. Không dùng làm nguồn thiết kế. |
| `tokens/rename-map.json` | Đề xuất từ tên cũ sang tên mới; hiện 11 mục `proposed`, 5 mục `needs-decision`, chưa có mục được duyệt. |
| `docs/_audit/.gitkeep` | File rỗng để giữ thư mục báo cáo. Chưa có báo cáo audit chính thức. |

`.gitignore` ở gốc SDS-docs quy định file Git sẽ bỏ qua. Repository Git nằm tại `SmartAds - SDS/`, thư mục cha của `SDS-docs/`. `ds.config.json` là nơi lấy file key Figma và tiền tố `sa`, còn `SDS-rules.md` là quy tắc Codex phải theo.

## Ví dụ: xử lý một tên token chưa chuẩn

Giả sử snapshot cho thấy tên Figma `color/red light/500`, còn quy ước trong `naming.md` đề xuất `color/red-light/500`:

1. **Tra dữ liệu:** tìm tên hiện tại trong `variables.primitives.json`; đọc ID và giá trị để biết đang xét đúng variable.
2. **Kiểm tra:** `lint` báo tên có khoảng trắng; `suggest` chỉ đưa ra tên đề xuất.
3. **Ghi đề xuất:** xem dòng tương ứng trong `tokens/rename-map.json`, lý do và trạng thái `proposed`.
4. **Bạn duyệt:** chỉ định rõ mục hoặc nhóm tên được phép đổi. Codex chuyển đúng mục đó thành `approved` và áp dụng khi bạn yêu cầu.
5. **Đồng bộ lại:** đọc Figma lần nữa để xác nhận tên mới, ID, alias và binding vẫn đúng; cập nhật snapshot. Sau đó tài liệu/code mới dùng tên đã duyệt.

Hiện lệnh lint đọc 810 mục (690 variables, 77 text và 43 effect styles) và báo 209 lỗi, 314 cảnh báo. Một mục có thể bị báo nhiều lần; kết quả này là danh sách cần phân loại, không phải lệnh tự động sửa 523 token. Paint/grid styles có trong snapshot nhưng chưa được script lint tên.

## Lưu ý về dữ liệu cũ

`tokens/rename-map.json` được lập từ audit ban đầu nên có thể không khớp collection hoặc tên hiện nay trong Figma. Không tự động áp dụng đổi tên theo file này. Bản ghi màu một phần cũ trong `tokens/observed/` đã được bỏ vì bản export đầy đủ nằm ở `variable-figma-export/`. `Prompt Docs VNE (DON'T TOUCH)` ở thư mục cha chỉ là tài liệu tham khảo về cách tổ chức website và dữ liệu cho AI.

## Script dump và file export khác nhau thế nào?

`scripts/dump-variables.figma.js` và `scripts/dump-styles.figma.js` là **mã để đọc Figma**, không phải dữ liệu đã xuất. Chúng được chạy trong môi trường Figma Plugin API, không chạy trực tiếp bằng `node`. Các file JSON trong `variable-figma-export/` mới là **kết quả đã lưu**. Snapshot hiện tại có đủ 690 variables (giữ ID, tên, collection, mode, giá trị, alias và giá trị đã giải alias) cùng 77 text, 43 effect, 7 paint và 5 grid styles. Script styles mẫu chỉ xuất text/effect; paint/grid trong snapshot hiện tại được đọc bổ sung trực tiếp qua Figma MCP.
