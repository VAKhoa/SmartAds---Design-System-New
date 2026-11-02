# Website SmartAds Design System

Website dùng **Next.js + React, JavaScript/JSX và CSS thuần**, xuất HTML/CSS/JS tĩnh. Gồm đúng 7 trang Introduction với nội dung SmartAds ở trạng thái draft. MUI và shadcn chỉ là tham khảo bố cục.

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

## File và chức năng

| File / thư mục | Chức năng và cách dùng |
| --- | --- |
| `package.json` | Thư viện và lệnh chạy. |
| `package-lock.json` | Khóa phiên bản cho npm ci. |
| `next.config.mjs` | Cấu hình Next và static export. |
| `jsconfig.json` | Alias @/ tới src/. |
| `src/app/layout.js` | HTML gốc, font cục bộ, metadata, theme. |
| `src/app/page.js` | Route Overview. |
| `src/app/introduction/[slug]/page.js` | Sinh 6 route còn lại. |
| `src/app/[section]/[slug]/page.js` | Sinh 19 trang tr?ng cho Foundation, Components, Patterns; gi? header/sidebar. |
| `src/app/not-found.js` | Trang 404. |
| `src/lib/navigation.js` | Danh sách 7 mục sidebar và URL Figma. |
| `src/components/DocsPage.js` | Đọc dữ liệu bài và đưa vào khung. |
| `src/components/DocsShell.js` | Header, sidebar, search, theme, mục lục, copy Markdown, điều hướng, footer. |
| `src/components/Logo.js` | Ghép 4 SVG nguyên gốc theo tỷ lệ node Figma 123:497. |
| `src/components/Icon.js` | Icon chức năng UI. |
| `src/content/docs/index.md` | Nội dung Overview. |
| `src/content/docs/introduction/design-system.md` | Nội dung Design System?. |
| `src/content/docs/introduction/principles.md` | Nguyên tắc đề xuất, chờ review. |
| `src/content/docs/introduction/getting-started.md` | Hướng dẫn bắt đầu theo vai trò. |
| `src/content/docs/introduction/ai-agents.md` | Hướng dẫn Codex và skill hiện có. |
| `src/content/docs/introduction/faq.md` | Câu hỏi thường gặp. |
| `src/content/docs/introduction/glossary.md` | Thuật ngữ. |
| `src/styles/globals.css` | CSS thuần, responsive, trạng thái, theme sáng/tối. |
| `src/styles/figma.generated.css` | CSS sinh từ snapshot Figma; không sửa tay. |
| `src/data/docs.generated.json` | HTML, Markdown, mục lục và search index tự sinh; không sửa tay. |
| `scripts/prepare.mjs` | Kiểm tra frontmatter, chuyển Markdown, gọi sinh theme. |
| `scripts/generate-theme.mjs` | Đọc tập con variables/styles từ ../variable-figma-export/. |
| `scripts/serve.mjs` | Server Node xem bản build tĩnh. |
| `public/brand/smartads-symbol.svg` | Biểu tượng SmartAds xanh gốc. |
| `public/brand/smartads-wordmark.svg` | Chữ SmartAds gốc. |
| `public/brand/smartads-powered-by.svg` | Chữ Powered by gốc. |
| `public/brand/smartads-fpt-online.svg` | Logo FPT Online gốc. |
| `public/brand/source.json` | Nguồn Figma, node, kích thước tài nguyên. |
| `public/brand/smartads-favicon.svg` | Biểu tượng SmartAds xanh không chữ, SVG nguyên gốc từ Figma node 123:499, dùng làm favicon. |
| `scripts/site-info.mjs` | Lấy thời gian sửa gần nhất của mã nguồn, cấu hình và assets; sinh phiên bản và mốc Last update UTC+7. |
| `scripts/dev.mjs` | Chạy Next dev cùng bộ theo dõi thời gian cập nhật mã nguồn. |
| `src/data/site.generated.json` | Dữ liệu footer tự sinh; không sửa tay. Phiên bản hiện tại là 0.0.1. |
| `playwright.config.js` | Chrome, server test cổng 4322. |
| `tests/introduction.spec.js` | Test trang, liên kết, logo, search, bàn phím, clipboard, theme, mobile. |
| `.gitignore` | Bỏ qua thư viện/output/cache khi dùng Git. |
| `node_modules/` | Thư viện npm; không sửa tay. |
| `.next/` | Cache/build Next, có thể sinh lại. |
| `out/` | HTML/CSS/JS và assets dùng cho static hosting. |
| `test-results/`, `playwright-report/` | Ảnh và kết quả kiểm tra tự sinh. |

## Ví dụ vận hành

Sửa FAQ: mở `src/content/docs/introduction/faq.md`, thay câu trả lời và updated, chạy `npm run prepare:content`, xem lại trang FAQ ở dev. Frontmatter bắt buộc gồm title, section, updated, status. Giữ draft cho nội dung chưa duyệt.

Sửa khoảng cách/độ rộng sidebar: sửa `src/styles/globals.css`. Sửa tìm kiếm/menu: sửa `src/components/DocsShell.js`. Không cần tạo agent mới; yêu cầu Codex sửa phần tương ứng và kiểm tra lại.

`../introduction/` là hướng dẫn vận hành dự án; `src/content/docs/` là nội dung trên website. Không tạo bản sao bài viết thủ công.

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

Sidebar tham chi?u file sQYYGDipDACa8UIqgdWWZq, node 319:375: nh?m Getting Started gi? 7 trang Introduction; Resource li?n k?t Figma; Foundation, Components v? Patterns l?y danh s?ch t? plannedNavigation trong src/lib/navigation.js. 19 m?c m?i c? ???ng d?n ri?ng v? v?ng n?i dung tr?ng, kh?ng chuy?n sang b?i Introduction. Resource / Figma file v?n m? t?i nguy?n Figma th?t. Menu kh?ng c? icon. Logo r?ng 110px; m?i ch? giao di?n, k? c? code v? ph?m t?t, d?ng Public Sans.

Kh?ng c?n Astro, Starlight, Pagefind ho?c c?u h?nh TypeScript trong m? ngu?n website. C?c th? m?c node_modules, .next, out v? test-results l? th? vi?n ho?c k?t qu? sinh t? ??ng c?a b? c?ng c? hi?n t?i; kh?ng ph?i c?ng ngh? c?. Ch? s?a src, public, scripts v? c?c file c?u h?nh khi ph?t tri?n.

## Icon

Icon ch?c n?ng ch? d?ng [Tabler Icons](https://tabler.io/icons) qua g?i ch?nh th?c @tabler/icons-react. src/components/Icon.js ?nh x? t?n ch?c n?ng sang named imports Tabler. Th?m icon t?i ??y; kh?ng t? v? SVG ho?c th?m b? icon kh?c. Markdown c? th? d?ng span data-icon v?i t?n ?? khai b?o, ???c scripts/prepare.mjs render th?nh SVG Tabler khi build. Logo SmartAds v?n d?ng SVG th??ng hi?u t? Figma; sidebar v?n kh?ng c? icon.

## Public Sans / primary

Font source: Google Fonts Public Sans. Local font files and license: public/fonts/public-sans/. CSS: src/styles/public-sans.css (400, 500, 600, 700; normal and italic). No Fontsource dependency. Primary: --sa-docs-primary = #048845 in src/styles/globals.css; secondary colors unchanged.

## Header

Header follows Figma node 319:785 (SmartAds Component Library Overview): 64px height, 110px logo, search, GitHub button and bordered theme toggle. GitHub href is intentionally empty until the repository exists; click is prevented. Set its href and remove aria-disabled/onClick prevention in src/components/DocsShell.js when ready.

Dark logo uses original SVG assets from SmartAds Design System node 15828:129796. Logo.js selects these assets for dark mode in header, mobile menu and footer; there is no white background panel. Functional icons remain Tabler.
