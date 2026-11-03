# SmartAds Design System Docs

Mục tiêu: xây tài liệu và dữ liệu máy đọc cho SmartAds Design System. Nguồn thiết kế là file Figma `cRZ5kIi4kD6j9lh1dbh5mh`; mọi giá trị token phải truy được về Figma. Tài liệu VDS trong `../../Prompt Docs VNE (DON'T TOUCH)/` chỉ là mẫu cấu trúc, không phải quy tắc thương hiệu SmartAds.

Đọc `introduction/about-smartads.md` khi cần hiểu sản phẩm, đối tượng dùng và phạm vi SDS. Đọc `introduction/workspace-guide.md` khi cần biết cấu trúc thư mục hoặc quy trình vận hành.

## Trạng thái

Dự án có website Next.js + React (JavaScript và CSS thuần) trong `website/`, gồm 7 trang Introduction, trang Resource / Figma và các route Foundation/Components/Patterns còn trống. Nội dung Introduction vẫn đang chờ duyệt; chưa có thư viện component sản phẩm hoặc gói token phát hành. Theme website lấy một tập con từ `variable-figma-export/`, giữ nguyên tên nguồn và dùng prefix `sa`. `variable-figma-export/` có bản chụp 690 variables và 132 styles đọc ngày 02/11/2026; khi cần giá trị mới hoặc khẳng định hiện trạng, đối chiếu lại với Figma. Không coi dữ liệu trong `tests/fixtures/` là token thật.

## Quy tắc làm việc

- Đọc `ds.config.json` để lấy Figma file key và prefix CSS `sa` đã duyệt. Các quyết định còn mở nằm ở `.agents/skills/ds-conventions/references/open-decisions.md`.
- Khi đặt tên hoặc sửa token, đọc skill `ds-conventions`. Mọi đề xuất đổi tên đi qua `tokens/rename-map.json`; chỉ áp dụng các mục đã được người dùng duyệt (`approved`).
- Không bịa giá trị hay tự thay giá trị trong Figma. Thiếu dữ liệu ghi `needs-value`. File trong `tokens/generated/` là output, không sửa tay.
- Ưu tiên Semantic token cho UI; component dùng token riêng khi có. Các ngoại lệ hiện có trong Figma cần được audit trước khi coi là quy tắc.
- Viết tiếng Việt, giữ thuật ngữ tiếng Anh. Trang docs có frontmatter `title`, `section`, `updated`, `status` (`draft`, `in-review`, `beta`, `stable`). Trang chưa được duyệt phải ghi rõ trạng thái và nguồn. Ví dụ code và bảng token phải dùng dữ liệu đã kiểm chứng.
- Đọc skill `figma-token-workflow` khi đồng bộ, audit hoặc chuẩn hóa dữ liệu Figma. Chỉ sửa Figma khi người dùng yêu cầu rõ.
- Chọn quy trình theo `introduction/workspace-guide.md`: UI website đọc node Figma cụ thể và kiểm tra light/dark, hover/focus, responsive; token và tên gọi dùng các skill trong `.agents/skills/`; nội dung dùng nguồn và trạng thái đã kiểm chứng. Skill chỉ áp dụng cho task liên quan, không thay thế nguồn Figma hoặc quy tắc dự án.
- Khi build UI website, đọc `website/WEBSITE-UI-RULES.md` để dùng đúng quy tắc font, màu, layout, responsive và trạng thái. Website dùng Public Sans; body content có line-height 200%, header/sidebar giữ 120%; cỡ chữ body content chọn trong dãy `11, 12, 13, 14, 16, 18, 20, 24, 28, 32px`. Đây là quy ước trình bày docs, không phải thang typography sản phẩm đã phát hành. Primary `#048845`, icon chức năng từ Tabler qua `website/src/components/Icon.js`, sidebar không có icon. Giữ logo/asset gốc Figma tại `website/public/brand/`. CSS riêng của website được sửa trong `website/src/styles/`; không sửa tay `figma.generated.css`, `docs.generated.json`, `site.generated.json`, `out/` hoặc `.next/`.
- Khi sửa website, chạy `npm run build` trong `website/`, kiểm tra route và các mode/kích thước liên quan. Chạy Playwright khi thay đổi hành vi, điều hướng hoặc layout có rủi ro. Khi sửa script token, chạy `node tests/run-tests.mjs`. Báo rõ nguồn, file đã sửa, kết quả kiểm tra và phần vẫn là bản nháp.
- Sau **mọi thay đổi trong `SmartAds - SDS/`**, kiểm tra xem nội dung website có trở nên cũ hoặc sai không. Trước khi kết thúc task, tra các tên file, quy tắc, số liệu, lệnh và trạng thái vừa đổi trong `website/src/content/docs/` và `website/README.md`; sửa các trang bị ảnh hưởng, cập nhật `updated` trong frontmatter của trang đã sửa, rồi build và xem route liên quan. Chỉ nhắc tên file mới trên trang chưa đủ: hướng dẫn, bảng chọn việc và prompt mẫu cũng phải phản ánh cách dùng mới. Nếu không có trang nào cần đổi, báo rõ những trang đã kiểm tra và vì sao vẫn đúng. Xem bảng tác động trong `introduction/workspace-guide.md`.

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
- `src/lib/navigation.js` giữ danh sách 7 mục sidebar; `src/content/docs/` chứa nội dung, `src/components/` chứa khung React và `src/styles/globals.css` chứa bố cục.
- `scripts/generate-theme.mjs` sinh `src/styles/figma.generated.css` qua `scripts/prepare.mjs` trước dev/build. Không sửa tay file sinh ra. Đây là theme cục bộ của website, không phải bản phát hành token SDS.
- `npm run test:e2e` kiểm tra bản build bằng Chrome qua Playwright; cần build trước và Chrome đã cài.
- Phạm vi đã được người dùng mở rộng gồm 7 trang Introduction và Resource / Figma tại `/resource/figma/`. Danh sách file thiết kế nằm trong `website/src/data/figma-files.json`; hướng dẫn thêm file ở `website/README.md`. Các mục Foundation, Components, Patterns vẫn là trang trống. Trang mới ngoài phạm vi này cần yêu cầu mở rộng của người dùng.

## Icon website

Chỉ dùng Tabler Icons qua `@tabler/icons-react` và `website/src/components/Icon.js` cho icon chức năng. Không tự vẽ SVG icon hoặc thêm thư viện icon khác. Logo thương hiệu SmartAds giữ asset Figma gốc. Sidebar không có icon.
