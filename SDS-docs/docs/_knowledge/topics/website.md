# Website tài liệu

> Tổng hợp 2026-11-15 · Nguồn: `content/rules/SDS-rules.md`, `website-ui-rules.md`, `content/guides/content-guide.md`, `website/README.md`, frontmatter `content/pages/*` · Tin cậy: High.

- Next.js + React (JS, CSS thuần), `marked`, Playwright; triển khai: https://smart-ads-design-system-new.vercel.app/ . Chạy trong `website/`: `npm ci`, `npm run dev|build|preview|test:e2e` (cổng 4321 dev/preview, 4322 e2e). Khuyến nghị Node 24. Không mở `out/index.html` bằng `file://`.
- **Phạm vi bài (frontmatter, đọc 2026-11-15):** Introduction 7 (index, design-system, principles, getting-started, ai-agents, faq, glossary: đều `draft`) · Resource/Figma (draft) · Foundation 6: Colors (draft, 2026-11-09), Typography (draft, 2026-11-05), **Spacing (beta, 2026-11-12)**, Layout (draft), Icons (draft), Logo (draft, 2026-11-13) · 14 route trống (11 Components + 3 Patterns).
- Quy ước UI docs (không phải token sản phẩm): Public Sans; weight 400/500/600/700; body line-height 200%, header/sidebar 120%; cỡ chữ body trong 11…32px; primary light `#048845`, dark `#8CC8A9` (chữ/link) / `#57AF82` (nền nút); icon shell Tabler, sidebar không icon; header 64px, sidebar 240px.
- Mọi trang có nội dung dùng khối "Tài liệu nguồn" ngay sau title; AI Agents thêm 3 file tham chiếu (`ai-source-files.js`).
- Theme: `generate-theme.mjs` + `theme-tokens.mjs` sinh `figma.generated.css` (16 token A + 7 primitive màu), không sửa tay.
- Sau mọi thay đổi trong `SDS-docs/`: rà `content/pages/`, `website/README.md`, `workspace-guide.md` (bảng tác động ở workspace-guide), cập nhật `updated`, build.
- Logo: 177 SVG/PNG (3 vnEgo đối chiếu node, 174 từ SVG tổng chưa đối chiếu); Icons: `@mingcute/svg@3.1.0`, 2.263 tên × 2 style; Layout: chưa có breakpoint duyệt (Drawer 40%/480px, sidebar collapsed 84px vs 60px ở frame).
