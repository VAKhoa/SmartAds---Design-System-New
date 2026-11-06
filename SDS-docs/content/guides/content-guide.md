# Sắp xếp bài Markdown cho SDS Docs

Mỗi mục nội dung trong sidebar có **một file Markdown chính** dưới `SDS-docs/content/pages/`. File này là nguồn bài và metadata của website; trang Typography dùng thêm snapshot Figma để dựng catalog specimen. Bản tại `public/source/docs/` và `out/source/docs/` được sinh từ Markdown để người đọc mở file `.md` gốc. Không viết hai bản nội dung cho cùng một mục và không sửa file trong hai thư mục output.

## Cây thư mục

```text
SDS-docs/content/pages/
├─ index.md                         # Introduction / Overview
├─ introduction/                    # 6 bài Introduction còn lại
├─ foundation/                      # Nền tảng thiết kế; đã có Colors và Typography
├─ components/                      # Một component = một file chính
└─ patterns/                        # Một pattern = một file chính
```

`AGENTS.md` ở gốc dự án và các file trong `SDS-docs/content/rules/`, `SDS-docs/content/guides/` là **quy tắc và hướng dẫn vận hành**, không phải bài Foundation/Component/Pattern. Trang AI Agents có các thẻ mở URL `.md` của ba file nguồn đã chọn; các trang Introduction khác có thẻ mở file bài viết gốc. `variable-figma-export/` là bản chụp dữ liệu Figma, không phải nơi viết bài. Resource / Figma dùng `SDS-docs/website/src/data/figma-files.json`, không dùng file Markdown.

## Tên file tương ứng với từng mục sidebar

Đường dẫn trong bảng tính từ `SDS-docs/content/pages/`. Tên file dùng chữ thường, dấu `-` thay cho khoảng trắng, giữ nguyên tên route hiện có.

| Nhóm | Mục sidebar | File Markdown chính |
| --- | --- | --- |
| Introduction | Overview | `index.md` |
| Introduction | Design System? | `introduction/design-system.md` |
| Introduction | Principles | `introduction/principles.md` |
| Introduction | Getting Started | `introduction/getting-started.md` |
| Introduction | AI Agents | `introduction/ai-agents.md` |
| Introduction | FAQ | `introduction/faq.md` |
| Introduction | Glossary | `introduction/glossary.md` |
| Foundation | Overview | `foundation/overview.md` |
| Foundation | Colors | `foundation/sds-color.md` |
| Foundation | Typography | `foundation/typography.md` |
| Foundation | Spacing | `foundation/spacing.md` |
| Foundation | Layout | `foundation/layout.md` |
| Foundation | Icons | `foundation/icons.md` |
| Foundation | Logo | `foundation/logo.md` |
| Components | Button | `components/button.md` |
| Components | Badge | `components/badge.md` |
| Components | Card | `components/card.md` |
| Components | Input | `components/input.md` |
| Components | Dialog | `components/dialog.md` |
| Components | Select | `components/select.md` |
| Components | Checkbox | `components/checkbox.md` |
| Components | Switch | `components/switch.md` |
| Components | Alert | `components/alert.md` |
| Components | Avatar | `components/avatar.md` |
| Components | Tooltips | `components/tooltips.md` |
| Patterns | Forms | `patterns/forms.md` |
| Patterns | Data Tables | `patterns/data-tables.md` |
| Patterns | Navigation | `patterns/navigation.md` |

`Layout` và `Logo` đã được thêm vào nhóm Foundation theo nhu cầu bạn nêu. **Colors** đã có `foundation/sds-color.md`; **Typography** đã có `foundation/typography.md`. Các mục Foundation, Components và Patterns khác giữ trang trống cho tới khi có file chính tương ứng. Thêm file đúng đường dẫn trong bảng rồi build để route hiển thị bài viết và card mở file `.md` gốc. Colors dùng route `/foundation/colors/`; Typography dùng `/foundation/typography/`, trình bày catalog từ snapshot Figma và liên kết `/source/docs/foundation/typography.md` trong bài.

## Tạo một bài mới

1. Chọn **một mục sidebar** và đúng tên file trong bảng. Nếu cần mục chưa có trong bảng, thêm nó vào `SDS-docs/website/src/lib/navigation.js` trước; không tự đặt URL khác cho cùng một chủ đề.
2. Đọc `SDS-docs/content/rules/SDS-rules.md`; với Foundation hoặc tên token, đọc skill `ds-conventions`. Lấy node/variable/style ID từ Figma được chỉ định trong `SDS-docs/ds.config.json`. Phân biệt dữ liệu đã quan sát với quy tắc đã duyệt.
3. Tạo file `.md` chính. Frontmatter cần `title`, `description`, `section`, `updated`, `status`, `sources`. `section` là `Foundation`, `Components` hoặc `Patterns` đúng với nhóm. `status` là `draft`, `in-review`, `beta` hoặc `stable`. Ngày dùng `dd/mm/yyyy` theo ngày sửa bài.
4. Viết nội dung bằng tiếng Việt, giữ thuật ngữ chuyên môn tiếng Anh. Bắt đầu phần thân từ `##`; tiêu đề `h1` đã do website hiển thị. Với component, ghi mục đích, anatomy, variant/state, hành vi, accessibility, cách dùng và nguồn Figma **chỉ khi có dữ liệu kiểm chứng**. Với Foundation, nêu collection/mode/alias hoặc style ID khi trình bày giá trị. Với Pattern, mô tả bối cảnh và luồng sử dụng dựa trên nguồn thực.
5. Chạy `npm run build` trong `website/`, mở route và URL `.md` gốc, kiểm tra light/dark, mobile, mục lục, link và trạng thái bài. Cập nhật các trang Introduction/README bị ảnh hưởng theo `SDS-docs/content/guides/workspace-guide.md`.

Khung frontmatter để **điền nguồn thật trước khi lưu thành bài**:

```md
---
title: Colors
description: Mô tả ngắn về nội dung đã được xác minh.
section: Foundation
updated: 04/11/2026
status: draft
sources:
  - label: Figma SmartAds Design System — node hoặc variable ID
    url: <URL_FIGMA_CỤ_THỂ>
---

## Mục đích

Viết nội dung có nguồn tại đây.
```

Không tạo bài chỉ có khung mẫu để lấp chỗ trống. Các mục đang chờ nội dung giữ trang trống. Khi viết bài đầu tiên, thay toàn bộ placeholder bằng dữ liệu thật.

## File nào điều khiển phần nào?

| File | Vai trò |
| --- | --- |
| `SDS-docs/website/src/lib/navigation.js` | Tên, thứ tự, URL và đường dẫn Markdown của từng mục sidebar. |
| `SDS-docs/content/pages/{nhóm}/{mục}.md` | Nội dung bài chính, nguồn duy nhất để sửa bài. |
| `SDS-docs/website/scripts/prepare.mjs` | Đọc các bài đã có, kiểm tra frontmatter, dựng HTML và sao chép Markdown gốc sang `public/source/docs/`. |
| `SDS-docs/website/src/app/[section]/[slug]/page.js` | Giữ trang trống nếu chưa có file; hiển thị bài và card file gốc khi có. |
| `SDS-docs/website/src/components/SourceFileLinks.js` | Card liên kết tới file Markdown gốc, dùng chung cho AI Agents và các bài mới. |
| `SDS-docs/website/src/data/ai-source-files.js` | Ba file quy tắc riêng của trang AI Agents. |

