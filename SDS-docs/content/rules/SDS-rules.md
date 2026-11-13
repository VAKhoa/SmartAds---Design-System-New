# SmartAds Design System Docs

Mục tiêu: xây tài liệu và dữ liệu máy đọc cho SmartAds Design System. Nguồn thiết kế là file Figma `cRZ5kIi4kD6j9lh1dbh5mh`; mọi giá trị token phải truy được về Figma. Tài liệu VDS trong `../../Prompt Docs VNE (DON'T TOUCH)/` chỉ là mẫu cấu trúc, không phải quy tắc thương hiệu SmartAds.

Đọc `content/guides/about-smartads.md` khi cần hiểu sản phẩm, đối tượng dùng và phạm vi SDS. Đọc `content/guides/workspace-guide.md` khi cần biết cấu trúc thư mục hoặc quy trình vận hành.

## Trạng thái

Website SDS đã triển khai tại https://smart-ads-design-system-new.vercel.app/. URL này là địa chỉ để xem tài liệu; source và quy tắc vẫn nằm trong repository.

Dự án có website Next.js + React (JavaScript và CSS thuần) trong `website/`, gồm 7 trang Introduction, trang Resource / Figma, sáu bài Colors, Typography, Spacing, Layout, Icons và Logo trong Foundation và 14 route Foundation/Components/Patterns còn chờ bài Markdown. Nội dung Introduction, Colors và Typography vẫn đang chờ duyệt; Logo là bản nháp với 177 SVG/PNG: ba vector vnEgo đã đối chiếu trực tiếp node Figma, 174 bản còn lại lấy từ SVG tổng và chưa đối chiếu từng frame component; Layout là bản nháp dựa trên snapshot viewport/grid và node Figma, chưa có breakpoint sản phẩm được duyệt; Icons là bản nháp dùng gói public `@mingcute/svg@3.1.0` với 2.263 tên icon trong hai style, chưa đối chiếu subset icon đang dùng theo node Figma; Spacing là trang beta đã được duyệt build với bộ tên numeric `--sa-space-*` riêng cho website docs. Chưa có thư viện component sản phẩm hoặc gói token phát hành. Theme website lấy một tập con từ `variable-figma-export/`, giữ nguyên tên nguồn và dùng prefix `sa`; lớp numeric của Spacing là quy ước tài liệu, không phải tên Figma gốc. `variable-figma-export/` có bản chụp 690 variables và 132 styles đọc ngày 02/11/2026; khi cần giá trị mới hoặc khẳng định hiện trạng, đối chiếu lại với Figma. Không coi dữ liệu trong `tests/fixtures/` là token thật.

## Quy tắc làm việc

- Component thực tế từ Figma, code copy và handoff phải dùng **HTML/CSS/JavaScript thuần** theo [component-code-rules.md](component-code-rules.md). Website tài liệu giữ Next.js/React và UI hiện tại; phân biệt component của docs shell với component sản phẩm. Đọc quy tắc này cả khi viết spec hoặc ví dụ, không chỉ khi build.
- Đọc `ds.config.json` để lấy Figma file key và prefix CSS `sa` đã duyệt. Các quyết định còn mở nằm ở `.agents/skills/ds-conventions/references/open-decisions.md`.
- Với mỗi task Figma, chỉ đọc file key được người dùng chỉ định; không tự mở file khác, Recents hay thư viện liên kết. Nếu thiếu file nguồn, xác nhận lại trước khi truy cập. Ưu tiên `figma-local@figma-local-workspace`, xác minh `info@smartads.tech` bằng `whoami`, rồi dùng công cụ chỉ đọc theo `SmartAds - SDS/AGENTS.md`. Không tự chuyển sang app/Chrome hoặc plugin marketplace. Nếu sau này được yêu cầu dùng app, chuyển ngay sang Dev Mode. Chỉ sửa Figma khi người dùng cho phép rõ hành động trên đúng file.
- Khi đặt tên hoặc sửa token, đọc skill `ds-conventions`. Mọi đề xuất đổi tên đi qua `tokens/rename-map.json`; chỉ áp dụng các mục đã được người dùng duyệt (`approved`).
- Không bịa giá trị hay tự thay giá trị trong Figma. Thiếu dữ liệu ghi `needs-value`. File trong `tokens/generated/` là output, không sửa tay.
- Ưu tiên Semantic token cho UI; component dùng token riêng khi có. Các ngoại lệ hiện có trong Figma cần được audit trước khi coi là quy tắc.
- Viết tiếng Việt, giữ thuật ngữ tiếng Anh. Trang docs có frontmatter `title`, `section`, `updated`, `status` (`draft`, `in-review`, `beta`, `stable`). Trang chưa được duyệt phải ghi rõ trạng thái và nguồn. Ví dụ code và bảng token phải dùng dữ liệu đã kiểm chứng.
- Đọc skill `figma-token-workflow` khi đồng bộ, audit hoặc chuẩn hóa dữ liệu Figma. Chỉ sửa Figma khi người dùng yêu cầu rõ.
- Chọn quy trình theo `content/guides/workspace-guide.md`: UI website đọc node Figma cụ thể và kiểm tra light/dark, hover/focus, responsive; token và tên gọi dùng các skill trong `.agents/skills/`; nội dung dùng nguồn và trạng thái đã kiểm chứng. Skill chỉ áp dụng cho task liên quan, không thay thế nguồn Figma hoặc quy tắc dự án.
- Khi build UI website, đọc `content/rules/website-ui-rules.md` để dùng đúng quy tắc font, màu, layout, responsive và trạng thái. Website dùng Public Sans; body content có line-height 200%, header/sidebar giữ 120%; cỡ chữ body content chọn trong dãy `11, 12, 13, 14, 16, 18, 20, 24, 28, 32px`. Đây là quy ước trình bày docs, không phải thang typography sản phẩm đã phát hành. Primary website dùng `#048845` ở light mode; dark mode dùng `#8CC8A9` cho chữ/link/focus và `#57AF82` cho nền nút đầy, với chữ `#09090A`. Các màu dark này lấy từ Figma primitive `color/primary/200` và `color/primary/300` nhưng chỉ là vai trò của website docs, không thay token sản phẩm. Icon chức năng từ Tabler qua `website/src/components/Icon.js`, sidebar không có icon. Giữ logo/asset gốc Figma tại `website/public/brand/`. CSS riêng của website được sửa trong `website/src/styles/`; không sửa tay `figma.generated.css`, `docs.generated.json`, `site.generated.json`, `out/` hoặc `.next/`.
- Mọi trang website đã có nội dung dùng chung khối “Tài liệu nguồn” ngay sau title/subtitle; shell tự hiển thị link Markdown chính. Route trống không tạo nguồn giả. Trang AI Agents có thêm ba file tham chiếu; Resource / Figma có Markdown chính riêng, còn danh sách file thiết kế vẫn đọc JSON. Không đặt một link Markdown thứ hai ở vị trí tùy ý trong body.
- Khi sửa website, chạy `npm run build` trong `website/`, kiểm tra route và các mode/kích thước liên quan. Chạy Playwright khi thay đổi hành vi, điều hướng hoặc layout có rủi ro. Khi sửa script token, chạy `node tests/run-tests.mjs`. Báo rõ nguồn, file đã sửa, kết quả kiểm tra và phần vẫn là bản nháp.
- Sau **mọi thay đổi trong `SmartAds - SDS/`**, kiểm tra xem nội dung website có trở nên cũ hoặc sai không. Trước khi kết thúc task, tra các tên file, quy tắc, số liệu, lệnh và trạng thái vừa đổi trong `content/pages/` và `website/README.md`; sửa các trang bị ảnh hưởng, cập nhật `updated` trong frontmatter của trang đã sửa, rồi build và xem route liên quan. Chỉ nhắc tên file mới trên trang chưa đủ: hướng dẫn, bảng chọn việc và prompt mẫu cũng phải phản ánh cách dùng mới. Nếu không có trang nào cần đổi, báo rõ những trang đã kiểm tra và vì sao vẫn đúng. Xem bảng tác động trong `content/guides/workspace-guide.md`.

## Lệnh hiện có

Chạy từ thư mục `SDS-docs`:

```bash
node tests/run-tests.mjs
node scripts/ds-tokens.mjs lint variable-figma-export/
node scripts/ds-tokens.mjs suggest variable-figma-export/
```

Lệnh `suggest` chỉ tạo đề xuất; không tự áp dụng vào Figma.

## Website

- Chạy trong `website/`: `npm ci`, `npm run dev`, `npm run build`; `npm run preview` để xem bản build có tìm kiếm. Khuyến nghị Node.js 24.
- `website/src/lib/navigation.js` giữ tên, thứ tự, route và đường dẫn Markdown của từng mục sidebar; `content/pages/` chứa bài viết, `website/src/components/` chứa khung React và `website/src/styles/globals.css` chứa bố cục. Xem `content/guides/content-guide.md` trước khi tạo bài mới.
- `scripts/generate-theme.mjs` sinh `src/styles/figma.generated.css` qua `scripts/prepare.mjs` trước dev/build. Không sửa tay file sinh ra. Đây là theme cục bộ của website, không phải bản phát hành token SDS.
- `npm run test:e2e` kiểm tra bản build bằng Chrome qua Playwright; cần build trước và Chrome đã cài.
- Phạm vi đã có 7 trang Introduction, Resource / Figma tại `/resource/figma/` và sáu bài Foundation: Colors tại `/foundation/colors/`, Typography tại `/foundation/typography/`, Spacing tại `/foundation/spacing/`, Layout tại `/foundation/layout/` (draft), Icons tại `/foundation/icons/` (draft), Logo tại `/foundation/logo/` (draft). Danh sách file thiết kế nằm trong `website/src/data/figma-files.json`. 20 mục Foundation, Components, Patterns có đường dẫn Markdown cố định theo `content/guides/content-guide.md`; 14 route còn lại giữ trống khi chưa có file chính. `Foundation / Overview` đã bỏ; `Introduction / Overview` ở trang chủ vẫn giữ. Nội dung mới vẫn cần nguồn, trạng thái và review theo các quy tắc trên.

## Icon website

Icon chức năng của **website tài liệu** tiếp tục dùng Tabler qua `@tabler/icons-react` và `website/src/components/Icon.js`; sidebar không có icon. **Thư viện icon sản phẩm SmartAds** được tra cứu tại `/foundation/icons/` từ gói SVG public MingCute, giữ nguyên vector và tên nguồn. Không thay logo thương hiệu hoặc asset Publisher/Partner bằng icon MingCute; logo giữ asset Figma gốc. Các alias CSS `--sa-icon-*` ở trang Icons đang là đề xuất đối chiếu snapshot, không phải token sản phẩm đã phát hành.
