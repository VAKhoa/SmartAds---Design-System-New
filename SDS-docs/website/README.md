# Website SmartAds Design System

Website dùng **Next.js + React, JavaScript/JSX và CSS thuần**, xuất HTML/CSS/JS tĩnh. Gồm 7 trang Introduction, trang Resource / Figma tổng hợp file thiết kế và hai bài Colors, Typography ở trạng thái draft. MUI và shadcn chỉ là tham khảo bố cục.

Khi sửa giao diện, đọc [quy tắc UI của website](../content/rules/website-ui-rules.md) cùng `SDS-docs/content/rules/SDS-rules.md`. File đó ghi nguồn giá trị, màu, typography, layout, state và cách kiểm tra; các quy tắc này chỉ áp dụng cho website docs.

Khi tạo bài cho một mục sidebar, đọc [content-guide.md](../content/guides/content-guide.md) để chọn đúng thư mục, tên file Markdown, frontmatter và nguồn Figma. Một mục có một file bài chính; file `.md` để người đọc mở được sinh từ bài đó khi build.

Bản đã triển khai: https://smart-ads-design-system-new.vercel.app/. Trang AI Agents có khối **Cách sử dụng** để sao chép URL này cho AI agent. Nút **Sao chép trang** trong toolbar sao chép Markdown của trang đang xem.

## Chạy website

Khuyến nghị Node.js 24 và npm. Mở terminal trong `SDS-docs/website`:

```powershell
npm ci
npm run dev
```

Mở http://127.0.0.1:4321/. Ctrl+C để dừng. Component và CSS cập nhật trong dev. Sau khi sửa Markdown, chạy `npm run prepare:content` trong terminal khác hoặc khởi động lại dev.

```powershell
npm run build
npm run preview
```

Build tự chuẩn bị nội dung/theme và xuất vào `out/`. Dừng dev trước khi chạy preview vì cùng cổng 4321. Không mở HTML bằng file://. Tìm kiếm hoạt động ở cả dev và preview.

## Đồng bộ nội dung khi nguồn thay đổi

`npm run build` chỉ render Markdown hiện có; nó không biết một quy tắc, skill, snapshot Figma, lệnh hoặc route vừa đổi có làm bài trên website lỗi thời hay không. Với **mọi thay đổi trong repo**, rà `../content/pages/` theo [bảng tác động](../content/guides/workspace-guide.md#bảng-kiểm-tra-tác-động-khi-folder-thay-đổi), tìm tên/giá trị/lệnh cũ, cập nhật bài liên quan và `updated` trong frontmatter. Với quy tắc UI hoặc quy trình AI, kiểm tra trang AI Agents, Getting Started và FAQ; đồng thời xem các trang khác nếu nội dung của chúng phụ thuộc thay đổi đó. Sau đó build, mở route bị ảnh hưởng và báo trang đã sửa hoặc đã kiểm tra nhưng vẫn đúng.

## File và chức năng

| File / thư mục | Chức năng và cách dùng |
| --- | --- |
| `package.json` | Thư viện và lệnh chạy. |
| `package-lock.json` | Khóa phiên bản cho npm ci. |
| `../content/rules/website-ui-rules.md` | Quy tắc UI riêng của website docs; đọc trước khi sửa font, màu, layout hoặc state. |
| `../content/guides/content-guide.md` | Bảng ánh xạ từng mục sidebar tới file Markdown và quy trình tạo bài. |
| `next.config.mjs` | Cấu hình Next, static export và tắt tự sinh `website/AGENTS.md` để giữ một điểm vào Codex ở gốc dự án. |
| `jsconfig.json` | Alias @/ tới src/. |
| `src/app/layout.js` | HTML gốc, font cục bộ, metadata, theme. |
| `src/app/page.js` | Route Overview. |
| `src/app/introduction/[slug]/page.js` | Sinh 6 route còn lại. |
| `src/app/[section]/[slug]/page.js` | Hiển thị Colors và Typography; giữ trống 19 route Foundation, Components, Patterns chưa có bài. Typography dùng giao diện tham chiếu riêng; Markdown gốc vẫn mở qua liên kết trong bài. |
| `src/app/resource/figma/page.js` | Trang tổng hợp file Figma, dùng chung header/sidebar. |
| `src/app/not-found.js` | Trang 404. |
| `src/lib/navigation.js` | Danh sách 7 mục Introduction, 21 mục sidebar và ánh xạ Colors tới `foundation/sds-color.md`; Typography dùng đường dẫn chuẩn `foundation/typography.md`. |
| `src/lib/figma-resources.js` | Metadata Resource và kiểm tra URL Figma. |
| `src/components/DocsPage.js` | Đọc dữ liệu bài và đưa vào khung. |
| `src/components/DocsShell.js` | Header, sidebar, search, theme, mục lục, copy Markdown, điều hướng, footer. |
| `src/components/SourceFileLinks.js` | Card liên kết Markdown gốc dùng chung cho các trang, gồm ba file quy tắc của AI Agents. |
| `src/components/AiSiteUsage.js` | Khối URL website đã triển khai và nút sao chép trên trang AI Agents. |
| `src/components/Logo.js` | Ghép 4 SVG nguyên gốc theo tỷ lệ node Figma 123:497. |
| `src/components/Icon.js` | Icon chức năng UI. |
| `src/components/FigmaResources.js` | Thẻ file Figma và các trạng thái hiển thị. |
| `src/components/ColorShowcase.js` | Swatch Primitives và giá trị Alias Light/Dark của trang Colors, đọc dữ liệu được sinh từ snapshot. |
| `src/components/TypographyReference.js` | Trang Typography với 77 specimen, 21 Text variables, thông số và binding ID đọc từ snapshot Figma lúc build. |
| `src/data/figma-files.json` | Danh sách các file Figma; sửa file này khi thêm tài nguyên. |
| `../content/pages/index.md` | Nội dung Overview. |
| `../content/pages/introduction/design-system.md` | Nội dung Design System?. |
| `../content/pages/introduction/principles.md` | Nguyên tắc đề xuất, chờ review. |
| `../content/pages/introduction/getting-started.md` | Hướng dẫn bắt đầu theo vai trò. |
| `../content/pages/introduction/ai-agents.md` | Hướng dẫn Codex và skill hiện có. |
| `../content/pages/introduction/faq.md` | Câu hỏi thường gặp. |
| `../content/pages/introduction/glossary.md` | Thuật ngữ. |
| `../content/pages/foundation/` | Bài Colors nằm tại `sds-color.md`, Typography tại `typography.md`; các bài khác xem bảng trong `content-guide.md`. |
| `../content/pages/components/` | Mỗi component có một file Markdown chính; hiện chờ nội dung. |
| `../content/pages/patterns/` | Mỗi pattern có một file Markdown chính; hiện chờ nội dung. |
| `src/styles/globals.css` | CSS thuần, responsive, trạng thái, theme sáng/tối. |
| `src/styles/figma-resources.css` | Giao diện thẻ Resource / Figma ở light và dark mode. |
| `src/styles/color-showcase.css` | Giao diện bảng swatch Colors, responsive và light/dark. |
| `src/styles/typography-reference.css` | Giao diện trang Typography, responsive và light/dark. |
| `src/styles/figma.generated.css` | CSS sinh từ snapshot Figma; không sửa tay. |
| `src/data/docs.generated.json` | HTML, Markdown, mục lục và search index tự sinh; không sửa tay. |
| `src/data/color.generated.json` | Danh mục color rút từ `variable-figma-export/` khi prepare; không sửa tay. |
| `src/data/ai-source-files.js` | Danh sách ba file nguồn, mô tả và URL của từng thẻ trên trang AI Agents. |
| `public/source/` | Bản sao `.md` nguyên văn được sinh khi prepare/build để URL file hoạt động; không sửa tay. |
| `scripts/prepare.mjs` | Kiểm tra frontmatter, chuyển bài Markdown hiện có, sinh danh mục color, sao chép file gốc và ba file quy tắc để mở bằng URL, gọi sinh theme. |
| `tests/typography-reference.spec.js` | Kiểm tra đủ 77 styles và 21 variables trên route Typography, responsive và dark mode. |
| `public/source/docs/` | Bản sao tự sinh của các bài Markdown; không sửa tay. |
| `scripts/generate-theme.mjs` | Đọc tập con variables/styles từ ../variable-figma-export/. |
| `scripts/serve.mjs` | Server Node xem bản build tĩnh. |
| `public/brand/smartads-symbol.svg` | Biểu tượng SmartAds xanh gốc. |
| `public/brand/ai-file-*.svg` | Các lớp icon file Markdown ở hai mode, tải từ Figma `361:864` và `361:2170`. |
| `public/brand/smartads-wordmark.svg` | Chữ SmartAds gốc. |
| `public/brand/smartads-powered-by.svg` | Chữ Powered by gốc. |
| `public/brand/smartads-fpt-online.svg` | Logo FPT Online gốc, dùng chung cho light và dark vì hai bản xuất giống hệt nhau. |
| `public/brand/source.json` | Nguồn Figma, node, kích thước tài nguyên. |
| `public/brand/smartads-favicon.svg` | Biểu tượng SmartAds xanh không chữ, SVG nguyên gốc từ Figma node 123:499, dùng làm favicon. |
| `scripts/site-info.mjs` | Lấy thời gian sửa gần nhất của mã nguồn, cấu hình và assets; sinh phiên bản và mốc Last update UTC+7. |
| `scripts/dev.mjs` | Chạy Next dev cùng bộ theo dõi thời gian cập nhật mã nguồn. |
| `src/data/site.generated.json` | Dữ liệu footer tự sinh; không sửa tay. Phiên bản hiện tại là 0.0.1. |
| `playwright.config.js` | Chrome, server test cổng 4322. |
| `tests/introduction.spec.js` | Test trang, liên kết, logo, search, bàn phím, clipboard, theme, mobile. |
| `tests/figma-resources.spec.js` | Test trang Resource / Figma và giao diện ở nhiều kích thước. |
| `.gitignore` | Bỏ qua thư viện/output/cache khi dùng Git. |
| `node_modules/` | Thư viện npm; không sửa tay. |
| `.next/` | Cache/build Next, có thể sinh lại. |
| `out/` | HTML/CSS/JS và assets dùng cho static hosting. |
| `test-results/`, `playwright-report/` | Ảnh và kết quả kiểm tra tự sinh. |

## Ví dụ vận hành

### Mở file quy trình từ AI Agents

Mở `/introduction/ai-agents/`, chọn một trong ba thẻ `AGENTS.md`, `SDS-docs/content/rules/SDS-rules.md` hoặc `SDS-docs/content/guides/workspace-guide.md`. Trình duyệt mở URL `.md` tương ứng, hiển thị file gốc thay vì một viewer trong trang AI Agents. Dùng Back của trình duyệt để quay lại. Khi sửa các file nguồn, chạy lại `npm run prepare:content` trong lúc dev hoặc `npm run build` cho bản preview/export. Danh sách file được khai báo tại `src/data/ai-source-files.js`.

### Thêm file vào Resource / Figma

Menu **Resource → Figma file** mở trang nội bộ `/resource/figma/`. Các thẻ mở file Figma trong tab mới. Danh sách hiện có hai file SmartAds đã được cung cấp; không tự đồng bộ toàn bộ tài khoản Figma. Quyền xem hoặc duplicate do chủ file thiết lập trong Figma.

Chỉ cần sửa `src/data/figma-files.json` để thêm, sửa, xóa hoặc đổi thứ tự thẻ. Mỗi phần tử có dạng:

```json
{
  "id": "ten-file-duy-nhat",
  "title": "Tên file hiển thị",
  "description": "Mô tả ngắn về mục đích sử dụng.",
  "url": "https://www.figma.com/design/FILE_KEY/TEN_FILE",
  "thumbnail": ""
}
```

- `id`: duy nhất, không trùng file khác. Thứ tự trong mảng là thứ tự hiển thị.
- `url`: dán link HTTPS thật của Figma. Để trống nếu chưa có link: thẻ hiện “Chưa có liên kết” và không thể mở. Link không phải Figma cũng được vô hiệu hóa.
- `thumbnail`: để trống để dùng logo Figma như mẫu. Nếu có ảnh bìa, đặt ảnh trong `public/resources/` và dùng đường dẫn `/resources/ten-anh.png`. Ảnh đang tải hoặc bị lỗi sẽ hiển thị logo dự phòng.
- Mảng rỗng `[]`: trang hiển thị “Chưa có file Figma”. Không cần API, database hay thao tác import trên trình duyệt.

Ví dụ prompt: **“Thêm file Figma [URL] tên [Tên file], mô tả [Mô tả] vào Resource / Figma của SDS; cập nhật figma-files.json và kiểm tra link.”**

Ở chế độ dev, lưu JSON để xem thay đổi. Với bản static/Live Server, chạy `npm run build` rồi tải lại trang để cập nhật thư mục `out/`.

| File | Vai trò |
| --- | --- |
| `src/data/figma-files.json` | Nguồn danh sách file do bạn quản lý. |
| `src/app/resource/figma/page.js` | Route trang tổng hợp. |
| `src/components/FigmaResources.js` | Lưới thẻ, ảnh dự phòng, trạng thái rỗng và không có link. |
| `src/lib/figma-resources.js` | Metadata trang, tìm kiếm, kiểm tra URL Figma. |
| `src/styles/figma-resources.css` | Token màu riêng của trang, light/dark, hover, active, focus, responsive. |
| `public/brand/figma/` | Các mảnh logo Figma gốc và nguồn asset. |
| `tests/figma-resources.spec.js` | Kiểm tra điều hướng, màu, focus, ảnh, tìm kiếm và responsive. |

Mẫu thẻ lấy từ Figma `sQYYGDipDACa8UIqgdWWZq`, node `9:4767`: preview 140px, khoảng cách lưới 24px, bo góc 10px. Lưới tự giảm số cột theo không gian còn lại. Hover/focus hiện “Open in Figma”; thiết bị cảm ứng luôn hiện nhãn hành động. Chữ dùng Public Sans; text trong body content có line-height 200%.

Sửa FAQ: mở `../content/pages/introduction/faq.md`, thay câu trả lời và updated, chạy `npm run prepare:content`, xem lại trang FAQ ở dev. Frontmatter bắt buộc gồm title, section, updated, status. Giữ draft cho nội dung chưa duyệt.

Sửa khoảng cách/độ rộng sidebar: sửa `src/styles/globals.css`. Sửa tìm kiếm/menu: sửa `src/components/DocsShell.js`. Codex chính hoặc chat SDS — FE Website Builder đọc `.agents/skills/sds-fe-website-builder/SKILL.md` ở gốc repo, sửa phần tương ứng và kiểm tra lại.

`../content/guides/` là hướng dẫn vận hành dự án; `../content/pages/` là nội dung trên website. Không tạo bản sao bài viết thủ công.

## Figma và theme

Nguồn Figma cRZ5kIi4kD6j9lh1dbh5mh, snapshot 02/11/2026. Header dùng logo đầy đủ của node 123:497, ghép SVG nguyên gốc đúng tỷ lệ, giữ màu và lưu cục bộ.

Theme dùng màu SmartAds #048845 và Public Sans. Script giữ tên nguồn, đổi / thành -, thêm prefix --sa- và ghi ID Figma trong CSS. Biến --sa-docs-* và kích thước bố cục là quyết định riêng cho website, không phải token sản phẩm đã phát hành. Không tự sửa Figma hoặc áp dụng rename map.

## Kiểm tra

```powershell
npm run build
npm run test:e2e
```

Test cần Chrome cài trên máy; tự chạy server preview riêng. Website đang review cục bộ, có noindex/nofollow, chưa triển khai hosting. Khi xuất bản dùng out/, cấu hình domain và xem lại metadata trong src/app/layout.js.

## Sidebar theo Figma

Sidebar tham chiếu file sQYYGDipDACa8UIqgdWWZq, node 319:375: nhóm Getting Started giữ 7 trang Introduction; Resource / Figma file mở trang tổng hợp `/resource/figma/`. Foundation, Components và Patterns lấy danh sách từ `plannedNavigation` trong `src/lib/navigation.js`; 21 mục có đường dẫn riêng, trong đó Layout và Logo được bổ sung theo yêu cầu mới. Mục chưa có file Markdown chính giữ trang trống; xem `content-guide.md` trước khi tạo bài. Menu không có icon. Logo rộng 110px; mọi chữ giao diện, kể cả code và phím tắt, dùng Public Sans.

Kh?ng c?n Astro, Starlight, Pagefind ho?c c?u h?nh TypeScript trong m? ngu?n website. C?c th? m?c node_modules, .next, out v? test-results l? th? vi?n ho?c k?t qu? sinh t? ??ng c?a b? c?ng c? hi?n t?i; kh?ng ph?i c?ng ngh? c?. Ch? s?a src, public, scripts v? c?c file c?u h?nh khi ph?t tri?n.

## Icon

Icon ch?c n?ng ch? d?ng [Tabler Icons](https://tabler.io/icons) qua g?i ch?nh th?c @tabler/icons-react. src/components/Icon.js ?nh x? t?n ch?c n?ng sang named imports Tabler. Th?m icon t?i ??y; kh?ng t? v? SVG ho?c th?m b? icon kh?c. Markdown c? th? d?ng span data-icon v?i t?n ?? khai b?o, ???c scripts/prepare.mjs render th?nh SVG Tabler khi build. Logo SmartAds v?n d?ng SVG th??ng hi?u t? Figma; sidebar v?n kh?ng c? icon.

## Public Sans / primary

Font source: Google Fonts Public Sans. Local font files and license: public/fonts/public-sans/. CSS: src/styles/public-sans.css (400, 500, 600, 700; normal and italic). No Fontsource dependency. Primary: --sa-docs-primary = #048845 in src/styles/globals.css; secondary colors unchanged.

## Header

Header theo Figma node 319:785 (light) và 326:1497 (dark): logo 110px, các nút tìm kiếm/GitHub/chuyển giao diện cao 36px. Icon tìm kiếm và vòng tròn chuyển chế độ dùng Tabler. Nút GitHub mở repository SmartAds trên GitHub trong tab mới; icon trắng và đen 20×20px lấy đúng từ node Figma 325:1491 và 326:1909, lưu cục bộ trong `public/brand/`. GitHub đổi từ nền đen chữ trắng sang nền trắng chữ đen, có trạng thái hover, active và focus.

Vùng bài viết dùng padding trái/phải 320px từ màn hình 1920px. Padding giảm theo các mốc 1600px (240px), 1440px (160px), 1200px (96px), 960px (64px), rồi giảm tiếp trên tablet/mobile để giữ nội dung đọc được. Sidebar rộng 240px; ở màn nhỏ hơn 768px, menu chuyển vào nút mở menu trên header.

Tiêu đề nhóm sidebar dùng Public Sans 12px, đậm 600, màu `#737373` ở light mode và `#A1A1A1` ở dark mode. Chữ trong mục menu lần lượt là `#1F1F1F` và `#FAFAFA`. Toàn bộ chữ trên website dùng Public Sans; body content có line-height 200%, còn header/sidebar giữ 120%. Cỡ chữ body content dùng dãy `11, 12, 13, 14, 16, 18, 20, 24, 28, 32px` cho website docs, chưa phải thang typography sản phẩm SDS. Chữ đen chính dùng `#1F1F1F`, còn các màu chữ phụ giữ theo ngữ cảnh. Nền trang và sidebar ở dark mode là `#09090A`; mục sidebar đang chọn hoặc hover là `#1F1F22`. Hai nút chuyển trang cuối bài cao 36px, bo góc 8px theo Figma node 331:3390.

Các nút chuyển trang trong vùng nội dung (cặp nút nhỏ trên thanh công cụ và cặp nút cuối bài) dùng nền `#F5F5F5` / chữ `#171717` ở light mode theo Figma node 323:1461; nền `#262626` / chữ `#FAFAFA` ở dark mode theo node 333:3494. Header lấy cùng màu nền với body ở cả hai mode.

Trong dark mode, đường viền dưới header và bên phải sidebar là `#222222`. Thanh cuộn riêng của sidebar dùng bản mảnh, rộng 8px trên trình duyệt WebKit/Chromium và `thin` trên Firefox, cho cả light và dark mode.

Dark logo dùng các SVG gốc từ SmartAds Design System node 15828:129796 trong header, mobile menu và footer, không có nền trắng. Phần FPT Online dùng chung asset với light mode vì hai SVG gốc giống hệt nhau. Các icon chức năng dùng Tabler, riêng icon GitHub của nút header dùng hai SVG gốc từ Figma theo yêu cầu thiết kế.
