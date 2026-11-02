# SmartAds Design System Docs

Mục tiêu: xây tài liệu và dữ liệu máy đọc cho SmartAds Design System. Nguồn thiết kế là file Figma `cRZ5kIi4kD6j9lh1dbh5mh`; mọi giá trị token phải truy được về Figma. Tài liệu VDS trong `../../Prompt Docs VNE/` chỉ là mẫu cấu trúc, không phải quy tắc thương hiệu SmartAds.

Đọc `introduction/about-smartads.md` khi cần hiểu sản phẩm, đối tượng dùng và phạm vi SDS. Đọc `introduction/workspace-guide.md` khi cần biết cấu trúc thư mục hoặc quy trình vận hành.

## Trạng thái

Dự án có khung website Next.js + React (JavaScript và CSS thuần) trong `website/`, gồm đúng 7 trang Introduction. Nội dung đang ở trạng thái `draft`; chưa có thư viện component sản phẩm hoặc gói token phát hành. Theme website lấy một tập con từ `variable-figma-export/`, giữ nguyên tên nguồn và dùng prefix `sa`. `variable-figma-export/` có bản chụp 690 variables và 132 styles đọc ngày 02/11/2026; hãy kiểm tra lại với Figma trước khi sinh CSS hoặc viết bảng giá trị nếu file đã thay đổi. Không coi mẫu trong `tokens/observed/` và `tests/fixtures/` là dữ liệu đầy đủ.

## Quy tắc làm việc

- Đọc `ds.config.json` để lấy Figma file key và prefix CSS `sa` đã duyệt. Các quyết định còn mở nằm ở `.agents/skills/ds-conventions/references/open-decisions.md`.
- Khi đặt tên hoặc sửa token, đọc skill `ds-conventions`. Mọi đề xuất đổi tên đi qua `tokens/rename-map.json`; chỉ áp dụng các mục đã được người dùng duyệt (`approved`).
- Không bịa giá trị hay tự thay giá trị trong Figma. Thiếu dữ liệu ghi `needs-value`. File trong `tokens/generated/` là output, không sửa tay.
- Ưu tiên Semantic token cho UI; component dùng token riêng khi có. Các ngoại lệ hiện có trong Figma cần được audit trước khi coi là quy tắc.
- Viết tiếng Việt, giữ thuật ngữ tiếng Anh. Trang docs có frontmatter `title`, `section`, `updated`, `status` (`draft`, `in-review`, `beta`, `stable`). Trang chưa được duyệt phải ghi rõ trạng thái và nguồn. Ví dụ code và bảng token phải dùng dữ liệu đã kiểm chứng.
- Đọc skill `figma-token-workflow` khi đồng bộ, audit hoặc chuẩn hóa dữ liệu Figma. Chỉ sửa Figma khi người dùng yêu cầu rõ.

## Lệnh hiện có

Chạy từ thư mục `SDS-docs`:

```bash
node tests/run-tests.mjs
node scripts/ds-tokens.mjs lint variable-figma-export/
node scripts/ds-tokens.mjs suggest variable-figma-export/
```

Lệnh `suggest` chỉ tạo đề xuất; không tự áp dụng vào Figma.

## Website Introduction

- Chạy trong `website/`: `npm ci`, `npm run dev`, `npm run build`; `npm run preview` để xem bản build có tìm kiếm. Khuyến nghị Node.js 24.
- `src/lib/navigation.js` giữ danh sách 7 mục sidebar; `src/content/docs/` chứa nội dung, `src/components/` chứa khung React và `src/styles/globals.css` chứa bố cục.
- `scripts/generate-theme.mjs` sinh `src/styles/figma.generated.css` qua `scripts/prepare.mjs` trước dev/build. Không sửa tay file sinh ra. Đây là theme cục bộ của website, không phải bản phát hành token SDS.
- `npm run test:e2e` kiểm tra bản build bằng Chrome qua Playwright; cần build trước và Chrome đã cài.
- Phạm vi hiện tại chỉ Introduction. Trang mới ngoài nhóm này cần yêu cầu mở rộng của người dùng.

## Icon website

Ch? d?ng Tabler Icons qua @tabler/icons-react v? component website/src/components/Icon.js. Kh?ng t? v? SVG icon ho?c th?m th? vi?n icon kh?c. Logo th??ng hi?u SmartAds gi? asset Figma g?c. Sidebar kh?ng c? icon.
