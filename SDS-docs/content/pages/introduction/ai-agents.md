---
title: AI Agents
description: Quy trình giao việc cho Codex trong SmartAds Design System, từ chọn nguồn và skill đến kiểm tra và bàn giao.
section: Introduction
updated: 13/11/2026
status: draft
sources:
  - label: Figma SmartAds Design System
    url: https://www.figma.com/design/cRZ5kIi4kD6j9lh1dbh5mh/SmartAds---Design-System
  - label: Website SDS đã triển khai
    url: https://smart-ads-design-system-new.vercel.app/
---

## Bắt đầu ở đây

Ngay dưới title/subtitle, khối “Tài liệu nguồn” mở `SDS-docs/content/pages/introduction/ai-agents.md` trước, sau đó đến ba file tham chiếu: `AGENTS.md`, `SDS-docs/content/rules/SDS-rules.md` và `SDS-docs/content/guides/workspace-guide.md`. Mọi trang đã có nội dung dùng cùng vị trí và giao diện nguồn này. Chọn một file để mở URL `.md` chứa nội dung gốc; nội dung file không được nhúng vào giao diện AI Agents. Dùng nút Back của trình duyệt để quay lại trang. Các URL này được tạo lại từ file trong folder khi build website, nên sau khi sửa file nguồn cần build lại để bản website phản ánh thay đổi.

Khối **Cách sử dụng** phía trên cung cấp [đường dẫn website SDS đã triển khai](https://smart-ads-design-system-new.vercel.app/) để gửi cho AI agent. Nút **Sao chép** chỉ sao chép URL đó. Nút **Sao chép trang** ở thanh công cụ sao chép nội dung Markdown của trang AI Agents. Khi giao việc cần nguồn thiết kế cụ thể, hãy gửi thêm link đúng node Figma và phạm vi cần sửa.

Trang này hướng dẫn bạn giao việc cho **Codex** trong thư mục `SmartAds - SDS/`. Quy trình được rút ra từ các file đang có trong dự án: `AGENTS.md`, `SDS-docs/content/rules/SDS-rules.md`, `SDS-docs/content/guides/workspace-guide.md`, các skill nội bộ và mã nguồn website. Chat chuyên trách **SDS — FE Website Builder** có thể nhận phần triển khai FE dưới sự điều phối của Codex chính; một Codex chính vẫn có thể nhận task, đọc nguồn, sửa file, kiểm tra và báo kết quả.

Khi đọc Figma SmartAds, Codex ưu tiên plugin **`figma-local@figma-local-workspace`**, gọi `whoami` để xác minh **`info@smartads.tech`** rồi dùng công cụ đọc đúng file. Nếu plugin thiếu công cụ, sai tài khoản hoặc thiếu quyền, ghi rõ giới hạn; không tự chuyển sang plugin marketplace, app desktop hoặc Chrome. Khi được giao mở app desktop riêng, chọn **Dev Mode** và kiểm tra panel Inspect; URL `?m=dev` không tự xác nhận tài khoản hay quyền. Không tự gửi yêu cầu cấp quyền.

Codex chỉ truy cập **file Figma được giao cho yêu cầu hiện tại**, đối chiếu file key trong link trước khi gọi plugin; không tự mở file khác, Recents hoặc thư viện liên kết. Nếu chưa rõ file, cần xác nhận nguồn. Plugin chỉ đọc qua API, còn app desktop chỉ dùng theo yêu cầu riêng và mặc định chuyển sang **Dev Mode**. Việc được giao sửa website hoặc tài liệu không cấp quyền chỉnh sửa Figma; chỉ thay đổi Figma khi bạn cho phép rõ thao tác và file tương ứng.

Để bắt đầu một việc mới:

1. Mở **`SmartAds - SDS/`** trong Codex. Codex đọc `AGENTS.md` ở gốc; file này dẫn tới `SDS-docs/content/rules/SDS-rules.md`. Nếu task sửa UI website, đọc thêm `SDS-docs/content/rules/website-ui-rules.md`.
2. Nói rõ **cần làm gì**, **nguồn nào phải đối chiếu**, **phạm vi được sửa** và **thế nào là xong**. Với UI, gửi đúng URL node Figma và nêu light/dark, trạng thái, kích thước màn hình cần kiểm tra.
3. Yêu cầu Codex chọn skill phù hợp theo bảng dưới, kiểm tra kết quả, rà các trang website có thể đã cũ và báo những điểm chưa có dữ liệu hoặc còn chờ quyết định.

Ví dụ ngắn:

```text
Đọc SDS-docs/content/rules/SDS-rules.md và, nếu sửa UI website,
SDS-docs/content/rules/website-ui-rules.md. Cập nhật [trang/component]
theo node Figma [URL]. Chỉ sửa [phạm vi]. Kiểm tra light/dark,
desktop/mobile và các trạng thái liên quan. Chạy build, xem trang
Rà các trang docs bị ảnh hưởng, rồi báo file đã sửa và phần thiếu nguồn.
```

## File nào làm việc gì?

`AGENTS.md` là **tên file theo quy ước để Codex tự đọc**, không phải tên một agent để bạn gọi. Khi viết prompt, bạn có thể nhắc trực tiếp `SDS-docs/content/rules/SDS-rules.md`. `website-ui-rules.md` là **file quy tắc UI của website, không phải một skill**; skill là hướng dẫn chuyên môn theo từng loại task. Figma và bản export là **nguồn dữ liệu thiết kế**; website là **đầu ra hiển thị**.

Các file Markdown do nhóm biên soạn tập trung trong `SDS-docs/content/`: `rules/` là quy tắc, `guides/` là hướng dẫn, `pages/` là bài đăng lên website. Bắt đầu từ `SDS-docs/content/README.md` nếu chưa biết file cần tìm nằm ở đâu. `AGENTS.md`, các `README.md` điểm vào và `SKILL.md` của skill giữ ở vị trí theo quy ước để Codex và người đọc tìm được chúng.

| File hoặc thư mục | Vai trò thực tế | Khi cần mở |
| --- | --- | --- |
| `AGENTS.md` ở gốc | Điểm vào tự động; chỉ đường đến quy tắc SDS. | Codex đọc khi mở dự án. |
| `SDS-docs/content/README.md` | Bản đồ quy tắc, hướng dẫn và bài website. | Khi chưa biết một file Markdown thuộc nhóm nào. |
| `SDS-docs/content/rules/SDS-rules.md` | Quy tắc về nguồn, nội dung, token, Figma và website. | Mọi task trong SDS; đây là file nên nhắc trong prompt. |
| `SDS-docs/ds.config.json` | File key Figma, tên viết tắt `SDS`, prefix CSS `sa`, collection và mode đã ghi nhận. | Task liên quan Figma, token hoặc tên CSS. |
| `SDS-docs/content/guides/workspace-guide.md` | Hướng dẫn cấu trúc repo, quy trình và lệnh chi tiết. | Khi chưa biết sửa file nào hoặc chạy lệnh nào. |
| `SDS-docs/variable-figma-export/` | Bản chụp variables và styles ngày 02/11/2026. | Tra ID, tên, mode, alias, giá trị đã xuất; đối chiếu Figma khi cần dữ liệu hiện tại. |
| `SDS-docs/content/rules/website-ui-rules.md` | Quy tắc font, màu, layout, responsive và state dành riêng cho website docs. | Mọi task build hoặc sửa UI website. |
| `SDS-docs/content/pages/` | Bài Markdown cho Introduction và nơi thêm Foundation/Components/Patterns. | Viết hoặc sửa file chính của mục sidebar. |
| `SDS-docs/content/guides/content-guide.md` | Bảng liên kết mục sidebar với tên file, mẫu frontmatter và quy trình thêm bài. | Trước khi tạo một bài Foundation, Component hoặc Pattern. |
| `SDS-docs/website/src/data/figma-files.json` | Danh sách file trên trang Resource / Figma. | Thêm hoặc sửa thẻ file Figma. |
| `SDS-docs/tokens/rename-map.json` | Các đề xuất đổi tên token và trạng thái review. | Audit tên; không coi đề xuất là tên đã duyệt. |

Bản export Figma **không tự đồng bộ**. Các file trong `tests/fixtures/` là dữ liệu cố ý có lỗi để thử script, không phải token thật. `figma.generated.css`, `docs.generated.json`, `site.generated.json`, `.next/` và `out/` là đầu ra được sinh lại; sửa file nguồn hoặc script thay vì sửa tay các đầu ra này.

## Chọn đúng skill theo task

Bạn giao task cho **Codex chính**. Chỉ định skill khi công việc thật sự cần chuyên môn đó; không cần gọi nhiều skill cho mọi yêu cầu.

| Việc cần làm | Skill hoặc hướng dẫn cần đọc | Nguồn chính | Kết quả cần kiểm tra |
| --- | --- | --- | --- |
| Sửa UI website theo node Figma | Đọc `SDS-rules.md`, `content/rules/website-ui-rules.md` và `.agents/skills/sds-fe-website-builder/SKILL.md` ở gốc repo; dùng skill Figma design-to-code của môi trường khi cần đọc node. `external-design-system` chỉ để tham khảo cấu trúc component/state khi cần. | Node Figma được giao, asset và mã website hiện tại. | Light/dark, hover/active/focus, responsive, route và asset; rà trang docs liên quan rồi build. |
| Build component sản phẩm từ Figma | Đọc `SDS-docs/content/rules/component-code-rules.md`; dùng hướng dẫn token/component/spec liên quan. | Node, state và token đã kiểm chứng; thư mục sản phẩm được giao. | HTML/CSS/JavaScript thuần chạy độc lập; preview cùng source; kiểm tra state, responsive, keyboard và nguồn. |
| Viết bài cho một mục sidebar | `SDS-rules.md`, `content/guides/content-guide.md`; thêm `ds-conventions` nếu bài nói về quy tắc token. | Tên file của mục, nguồn SmartAds/Figma và bài liên quan. | Frontmatter, trạng thái, nguồn, route và link `.md` gốc; build và xem trang. |
| Thêm file vào Resource / Figma | `SDS-rules.md`; không cần skill token. | URL Figma thật và `figma-files.json`. | Tên, link, thẻ và trạng thái hiển thị; build. |
| Đọc lại variables hoặc styles từ Figma | `figma-token-workflow`. | File Figma trong `ds.config.json` và bản export cũ. | Đếm collection, ID, mode, alias, style; ghi ngày đọc và chênh lệch. |
| Audit hoặc đề xuất tên token | `ds-conventions` và `figma-token-workflow`. | Figma, snapshot, references và rename map. | Ghi ID, tên hiện tại, lý do, trạng thái đề xuất; không tự đổi tên. |
| Viết Foundation về token | `ds-conventions`; đọc reference đúng loại và dữ liệu Figma. | Variable/style ID, mode và quyết định đã duyệt. | Tách dữ liệu quan sát với đề xuất; bài còn chờ duyệt phải ghi trạng thái. |
| Viết hoặc build Foundation / Spacing | `SDS-docs/.agents/skills/sds-spacing-foundation/SKILL.md`, `ds-conventions`; nếu build UI, đọc thêm skill FE và `website-ui-rules.md`. | `foundation/spacing.md`, snapshot collection `Spacing` và mã website. | Đủ đối chiếu ID, px/rem, ngoại lệ, light/dark, responsive và copy; không gọi API docs là token package sản phẩm. |
| Sửa script kiểm tra token | `figma-token-workflow` nếu cần dữ liệu Figma. | `SDS-docs/scripts/` và `SDS-docs/tests/`. | `node tests/run-tests.mjs` đạt. |

Skill FE của repo nằm ở `.agents/skills/sds-fe-website-builder/SKILL.md` tại gốc `SmartAds - SDS/`; các skill nội dung/token nằm ở `SDS-docs/.agents/skills/ds-conventions/SKILL.md`, `SDS-docs/.agents/skills/figma-token-workflow/SKILL.md` và `SDS-docs/.agents/skills/sds-spacing-foundation/SKILL.md`. Nếu Codex không nhận cú pháp `$tên-skill`, hãy chỉ thẳng đường dẫn `SKILL.md` trong prompt. `external-design-system` có file dẫn tại `.agents/skills/external-design-system/skill-design-system.md`; nội dung đầy đủ của nó nằm ở `E:\Test-Codex\design-system\SKILL.md` trên máy hiện tại. Đường dẫn đó cần kiểm tra lại nếu chuyển máy, và ví dụ trong skill không phải giá trị SmartAds.

## Một task đi qua những bước nào?

### 1. Xác định đầu ra và giới hạn

Nêu rõ trang, component, nhóm token hoặc script cần làm. Chỉ rõ phần nào được sửa; ví dụ “chỉ trang AI Agents” hoặc “chỉ button trên header”. Nếu chưa có nguồn cho một giá trị, yêu cầu ghi thiếu dữ liệu thay vì tự điền. Với Foundation hoặc token, xem `SDS-docs/.agents/skills/ds-conventions/references/open-decisions.md`: **D1 (`sa`) đã duyệt; D2–D8 còn mở**.

### 2. Đọc nguồn đúng với loại việc

- **UI:** đọc node Figma cụ thể, các state và asset liên quan; so với component/CSS hiện có. File Figma SmartAds Design System trong `ds.config.json` là nguồn token; node từ file Component Library được bạn gửi là nguồn cho UI cụ thể đó.
- **Token:** đọc variable/style ID, collection, mode, alias và giá trị trong Figma. Snapshot trong `variable-figma-export/` giúp kiểm tra dữ liệu đã lưu, nhưng có thể đã cũ.
- **Nội dung:** đối chiếu thông tin sản phẩm ở `SDS-docs/content/guides/about-smartads.md`, nguồn SmartAds/Figma và trạng thái tài liệu. Mẫu VDS chỉ dùng để tham khảo cách trình bày, không dùng làm dữ liệu SmartAds.

### 3. Sửa đúng file nguồn

Bài Introduction và các bài Foundation/Components/Patterns dùng một file chính dưới `content/pages/`; tên file cho từng mục nằm trong `content/guides/content-guide.md`. Danh sách file Figma ở `website/src/data/figma-files.json`. Layout và tương tác website ở `website/src/components/` và `website/src/styles/`. Đề xuất đổi tên token nằm trong `tokens/rename-map.json`; các quy ước và quyết định nằm trong skill `ds-conventions`. Không sửa trực tiếp file được sinh tự động hoặc coi theme CSS của website là gói token SDS đã phát hành.

### 4. Tự kiểm rồi build

Với UI, xem đúng route ở light/dark, màn lớn/nhỏ, kiểm tra hover, active, focus, link, font, icon và asset. Website dùng **Public Sans**, line-height **200% trong body content** và **120% ở header/sidebar**; cỡ chữ body content dùng dãy **11, 12, 13, 14, 16, 18, 20, 24, 28, 32px**. Primary light là **`#048845`**; dark dùng **`#8CC8A9`** cho chữ/link/focus và **`#57AF82`** cho nút đầy với chữ **`#09090A`** theo `website-ui-rules.md`. Prefix CSS **`sa`**, icon chức năng từ **Tabler**; sidebar không có icon. Với bài viết, kiểm tra nguồn, frontmatter `title`, `section`, `updated`, `status`, liên kết và điểm còn chờ duyệt. Với token, kiểm tra ID, alias và mode, không chỉ nhìn tên.

### 5. Bàn giao để người khác review được

Codex cần nêu **đã sửa file nào, dựa vào nguồn nào, đã chạy kiểm tra gì, trang website nào đã rà/cập nhật và còn điểm nào chưa được xác nhận**. Nếu gặp quyết định D2–D8 hoặc một tên token mơ hồ, để ở trạng thái đề xuất hoặc `needs-decision` cho tới khi bạn chốt. Việc sửa Figma chỉ thực hiện khi bạn yêu cầu rõ và mục đổi tên liên quan đã được duyệt.

## Quy trình cụ thể cho từng việc thường gặp

### Xây hoặc sửa UI website từ Figma

1. Gửi URL **đúng node** và nói phần cần triển khai: header, sidebar, trang hoặc component. Codex đọc `content/rules/website-ui-rules.md` trước khi sửa UI.
2. Nêu mode và state phải có. Codex đọc thiết kế, asset, mã hiện có, `SDS-rules.md` và `website-ui-rules.md`. File quy tắc UI ghi rõ font/weight/size, màu, spacing, breakpoint, state và bước kiểm tra của website docs; nó không phải token sản phẩm SDS.
3. Codex sửa component/CSS/asset nguồn, rồi chạy `npm run build` trong `SDS-docs/website/`. Khi đổi điều hướng, tương tác hoặc layout responsive, chạy thêm `npm run test:e2e`.
4. Mở route được sửa để kiểm tra bằng mắt, rồi rà các bài Introduction mô tả quy tắc hoặc UI vừa đổi. Nếu Figma không có một state hoặc kích thước cần thiết, Codex phải nói rõ phần suy luận hoặc phần chưa xác định.

### Đồng bộ và audit token Figma

1. Đọc `ds.config.json`, skill `figma-token-workflow` và collection cần làm. Dùng Figma MCP hoặc Figma Plugin API ở chế độ đọc để lấy variables/styles hiện tại.
2. Đối chiếu với `variable-figma-export/`, giữ ID, mode, alias và ngày đọc; kiểm đếm để phát hiện thiếu hoặc trùng. Hai script `dump-*.figma.js` là mã tham khảo cho môi trường Figma, **không chạy trực tiếp bằng Node**.
3. Từ `SDS-docs/`, chạy `node scripts/ds-tokens.mjs lint variable-figma-export/` để xem vấn đề và `node scripts/ds-tokens.mjs suggest variable-figma-export/` để xem gợi ý. Các lệnh này không sửa Figma; lint có thể báo lỗi tên hiện có và trả mã khác 0.
4. Ghi đề xuất vào `tokens/rename-map.json` với lý do và trạng thái phù hợp. Đối chiếu lại Figma trước khi áp dụng vì rename map được lập từ audit ban đầu.

### Viết bài cho một mục sidebar

1. Chọn mục sidebar và file chính đúng trong `content/guides/content-guide.md`. Xác định độc giả, câu hỏi bài cần giải đáp và nguồn; với Foundation, đọc thêm reference của `ds-conventions` đúng loại token.
2. Viết tiếng Việt, giữ thuật ngữ tiếng Anh khi cần. Ghi frontmatter, nguồn và trạng thái `draft`, `in-review`, `beta` hoặc `stable` theo mức đã được review; không trình bày đề xuất như quy tắc đã duyệt.
3. Chạy `npm run build` trong `website/`, xem route, mục lục, bảng, ví dụ và link mở file `.md` gốc. Mục Foundation/Components/Patterns chưa có file chính vẫn giữ route trống; thêm file đúng tên sẽ kích hoạt bài mà không cần viết route mới.

### Thêm một file vào Resource / Figma

1. Có URL Figma thật, tên và mô tả để người đọc nhận biết file.
2. Thêm mục vào `website/src/data/figma-files.json` theo cấu trúc đang có; không sửa tay trang HTML được xuất.
3. Build và mở `/resource/figma/` để kiểm tra thẻ, link, light/dark và màn nhỏ.

## Khi folder thay đổi, website được đồng bộ thế nào?

**Build không tự viết lại bài docs.** Nó chỉ chuyển Markdown hiện có thành HTML. Vì vậy một task chỉ hoàn tất sau khi Codex kiểm tra tác động lên các trang website, kể cả khi thay đổi ban đầu nằm ngoài `website/`.

| Nguồn vừa đổi | Trang cần rà trước tiên |
| --- | --- |
| `AGENTS.md`, `SDS-rules.md`, `website-ui-rules.md`, skill hoặc hướng dẫn vận hành | AI Agents: file cần đọc, bảng chọn việc, flow và prompt; Getting Started, FAQ và Glossary nếu cách dùng hoặc thuật ngữ đổi. |
| Figma snapshot, `ds.config.json`, rename map hoặc quyết định token | Overview: số liệu/trạng thái; Design System?, Getting Started, AI Agents, FAQ và Glossary: tên, nguồn, mode, phần đã duyệt. |
| Lệnh build, package, cấu trúc code hoặc route/sidebar | AI Agents, Getting Started, FAQ, Overview, Resource / Figma và README website theo nội dung bị ảnh hưởng. |
| Font, màu, layout, icon hoặc component website | Quy tắc UI website; AI Agents nếu quy trình build/kiểm tra đổi; trang nào có ví dụ hoặc mô tả UI đó. |

Thực hiện theo thứ tự:

1. **Tìm tham chiếu:** tìm tên file, giá trị, lệnh và trạng thái vừa đổi trong `content/pages/` và `website/README.md`; mở các trang trong bảng trên, không chỉ trang có chứa đúng một từ khóa.
2. **Sửa chỗ đã cũ:** cập nhật cả lời giải thích, bảng, ví dụ và prompt mẫu. Đổi `updated` trong frontmatter của từng trang đã sửa. Nếu không có trang nào cần sửa, ghi lại trang đã xem và lý do chúng còn đúng.
3. **Sinh lại và xem trang:** chạy `npm run build`, mở các route bị ảnh hưởng, kiểm tra link, mục lục và nội dung hiển thị. Với thay đổi layout, theme, điều hướng hoặc hành vi, chạy thêm `npm run test:e2e`.
4. **Bàn giao:** báo các file nguồn và trang website đã cập nhật, các trang đã kiểm tra nhưng giữ nguyên, kết quả build/test và phần còn chờ duyệt.

Ví dụ hiện tại: khi thêm `SDS-docs/content/rules/website-ui-rules.md`, Codex phải kiểm tra trang **AI Agents**. Chỉ thêm tên file vào bảng là chưa đủ; các bước sửa UI và prompt mẫu cũng cần yêu cầu đọc file này. **Getting Started** và **FAQ** đã được cập nhật để người mới biết mở hướng dẫn nào; **Overview** được sửa lời dẫn tới AI Agents, **Glossary** được bổ sung thuật ngữ. **Design System?** và **Principles** đã được rà, nội dung vẫn đúng vì hai trang đó nói về SDS của sản phẩm chứ không mô tả quy trình build website.

## Prompt có thể dùng ngay

**Component sản phẩm từ Figma:** “Đọc `SDS-docs/content/rules/SDS-rules.md` và `SDS-docs/content/rules/component-code-rules.md`. Triển khai component [tên] từ node [URL] bằng HTML/CSS/JavaScript thuần trong [thư mục đích]. Giao markup, CSS, JS khi có tương tác, token/asset phụ thuộc và hướng dẫn chạy độc lập. Kiểm tra [state/viewport], keyboard, focus và nhiều instance. Ghi nguồn và phần chưa xác minh; snippet, preview và code bàn giao dùng cùng source. Website docs giữ Next.js/React và cách trình bày hiện tại.”

**UI website tài liệu từ Figma**

```text
Trong SmartAds - SDS, đọc SDS-docs/content/rules/SDS-rules.md và
SDS-docs/content/rules/website-ui-rules.md. Sửa [trang/component]
trong website theo node Figma [URL]. Phạm vi: [light/dark,
state, desktop/mobile]. Giữ Public Sans, line-height 200% cho
body content và 120% cho header/sidebar; chọn cỡ chữ body
theo website-ui-rules.md. Giữ Tabler cho chức năng docs shell; icon sản phẩm
tra catalog MingCute tại Foundation / Icons. Giữ primary theo vai trò light/dark và prefix sa.
Rà các trang docs bị ảnh hưởng; chạy build, kiểm tra route và báo
nguồn cùng phần Figma chưa rõ.
```

**Catalog Icons từ MingCute:** “Đọc `content/pages/foundation/icons.md` và `content/rules/component-code-rules.md`. Dùng gói public `@mingcute/svg` đã khóa để sinh danh mục, không lấy asset Pro. Giữ tên file/style gốc, search/filter, copy SVG/HTML và tải SVG; sơ đồ kết nối thể hiện GitHub → gói SVG → asset SmartAds, nút GitHub MingCute cùng kiểu với header và mở đúng repository chính thức. Hướng dẫn cài gói đúng phiên bản cho HTML/CSS/JS thuần. Đối chiếu ID Figma của `icon/*` và `component/icon/common/*` từ snapshot; phân biệt alias đề xuất với token đã duyệt và gửi node nếu cần xác nhận subset đang dùng. Kiểm tra light/dark, mobile, keyboard và build.”

**Audit token**

```text
Đọc SDS-docs/content/rules/SDS-rules.md, skill figma-token-workflow và
ds-conventions. Audit collection [tên] trong file Figma SDS;
đối chiếu variable-figma-export/, ghi ID, mode, alias và ngày đọc.
Chạy lint/suggest; ghi đề xuất vào rename-map với trạng thái phù hợp.
Không đổi tên trong Figma khi chưa có quyết định được duyệt.
Rà các trang docs phụ thuộc vào tên, số liệu hoặc trạng thái vừa đổi.
```

**Viết tài liệu**

```text
Đọc SDS-docs/content/rules/SDS-rules.md, content/guides/content-guide.md và bài liên quan.
Chọn đúng mục sidebar và file chính cho trang [tên]. Viết cho
[đối tượng đọc] dựa trên [nguồn cụ thể]. Ghi rõ dữ liệu
đã xác nhận, đề xuất và quyết định còn mở. Cập nhật frontmatter,
build website, mở route và URL .md gốc để kiểm tra liên kết.
Rà các trang khác có nội dung phụ thuộc vào bài vừa đổi.
```

## Chạy và kiểm tra website

Mở terminal tại `SmartAds - SDS/SDS-docs/website/`. Cài thư viện một lần bằng `npm ci`:

```powershell
npm ci
npm run dev
```

Mở `http://127.0.0.1:4321/`. Khi sửa Markdown, chạy `npm run prepare:content` ở terminal khác hoặc khởi động lại dev để nội dung được sinh lại. Để xem bản xuất tĩnh:

```powershell
npm run build
npm run preview
```

Dev và preview dùng cùng cổng 4321, nên dừng tiến trình cũ trước khi chạy tiến trình mới. Không mở `out/index.html` bằng `file://` hoặc Live Server. Với thay đổi hành vi, route hoặc layout nhiều breakpoint, chạy `npm run test:e2e` **sau build**; lệnh này cần Chrome trên máy và mở server test riêng. Khi sửa script token, chạy `node tests/run-tests.mjs` từ `SDS-docs/`.

## Kiểm tra kết quả Codex trước khi chấp nhận

| Câu hỏi | Cách kiểm tra |
| --- | --- |
| Đúng nguồn SmartAds chưa? | Có link node Figma hoặc file/ID đã đối chiếu; không lấy giá trị từ website mẫu. |
| Đúng quy tắc dự án chưa? | Dùng `SDS`, prefix `sa`, font/icon/màu theo `SDS-rules.md`; phân biệt quyết định đã duyệt với D2–D8 còn mở. |
| Đúng file nguồn chưa? | Nội dung trong Markdown, UI trong component/CSS, danh sách Figma trong JSON; không sửa output sinh tự động. |
| Website docs đã đồng bộ chưa? | Tìm tham chiếu cũ, rà các trang liên quan; nêu trang đã cập nhật hoặc đã kiểm tra còn đúng. Prompt và ví dụ cũng phản ánh quy tắc mới. |
| Đã kiểm tra đủ chưa? | Build đạt; xem đúng route, mode, state, kích thước và liên kết theo phạm vi task. |
| Có thể tiếp tục từ kết quả này không? | Báo file đã sửa, nguồn, lệnh đã chạy, điểm còn thiếu dữ liệu hoặc chờ bạn quyết định. |

**Trạng thái hiện tại:** website có 7 trang Introduction, trang Resource / Figma và sáu bài Colors tại `/foundation/colors/`, Typography tại `/foundation/typography/`, Spacing tại `/foundation/spacing/`, Layout tại `/foundation/layout/` (draft), Icons tại `/foundation/icons/` (draft), Logo tại `/foundation/logo/` (draft); 14 route Foundation, Components, Patterns còn lại đang chờ file Markdown chính. Layout dùng snapshot viewport/grid và node Figma, chưa có breakpoint sản phẩm được duyệt. Icons lấy 2.263 tên icon × 2 style từ gói SVG public MingCute đã khóa, chưa xác minh subset/icon binding trong frame SmartAds; Tabler vẫn chỉ dùng cho chức năng của website tài liệu. `Foundation / Overview` đã bỏ; `Introduction / Overview` ở trang chủ vẫn là trang mở đầu. `variable-figma-export/` là snapshot; bộ tên numeric `--sa-space-*` của Spacing đã được duyệt cho website docs, không phải gói token sản phẩm. SDS chưa có gói token CSS hoặc thư viện component code dành cho sản phẩm để cài đặt như một thư viện phát hành.
