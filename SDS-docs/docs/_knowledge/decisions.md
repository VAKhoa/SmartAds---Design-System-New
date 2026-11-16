# Sổ quyết định SDS

> Cập nhật: 2026-11-16 (đối chiếu lại với `open-decisions.md`). Chỉ ghi quyết định có bằng chứng. "Duyệt" = người dùng (chủ dự án); không ghi tên cá nhân.

## A. Quyết định thiết kế (D1–D12)
| ID | Nội dung | Ngày | Duyệt | Trạng thái | Nguồn |
|---|---|---|---|---|---|
| D1 | Prefix code/CSS = `sa`; tên viết tắt = `SDS` | 2026-11-02 | Người dùng | **Đã chốt** | `ds-conventions/references/open-decisions.md` (dòng 7, 16); `ds.config.json` |
| D2 | "Tini" có phải "Tiny"? (đề xuất ⭐ đổi `tiny`) | — | — | Mở (đề xuất `proposed`) | `open-decisions.md` |
| D3 | Màu trung tính: gộp `color/gray` + `color/secondary dark` → `color/neutral/{50,100,200,300,350,400,500,600,650,700,800,900,950}` (đã áp dụng trong Figma; 9 token `secondary dark` DEPRECATED, chưa xóa). Hai ý còn lại ("Secondary option 1/2", `Alias/Primary - On Theme`) vẫn mở | 2026-11-16 | Người dùng | Phần trung tính **đã chốt + áp dụng**; phần còn lại mở | `open-decisions.md`; `docs/_audit/NEUTRAL-MERGE.md`; `FIGMA-CHANGELOG.md` |
| D4 | Thang cỡ chữ dùng số px (`typography/size/{10,11,12,13,14,16,18,20,24,28,32,40,48,60,80}`). Người dùng ghi "thang cỡ chữ theo số hiện tại A" — hiểu là phương án A (số); cần xác nhận nếu ý khác | 2026-11-16 | Người dùng | **Đã chốt, chưa áp dụng vào Figma** | `open-decisions.md` |
| D11 | Spacing giữ t-shirt (`spacing/2xs…`); `--sa-space-*` numeric chỉ là quy ước docs (chưa quyết đổi docs hay giữ) | 2026-11-16 | Người dùng | **Đã chốt** | `open-decisions.md` |
| D12 | Mode Dark + `Shadow/elevation-dark/*` trong Figma: tạm ẩn, không xóa (bổ sung D9) | 2026-11-16 | Người dùng | **Đã chốt, chưa áp dụng vào Figma** | `open-decisions.md` |
| D5 | Thư viện chuẩn = "SmartAds - Design System"; "Design System 2" legacy | — | — | Mở (⭐ tạm) | `open-decisions.md` |
| D6 | Cấu trúc collection đích (Base·Semantic·Component·Spacing·Radius·Font) | — | — | Mở | `open-decisions.md`; `ds.config.json` note |
| D7 | Có Base `dimension/<px>` không | — | — | Mở (⭐ có) | `open-decisions.md` |
| D8 | Line-height đoạn văn dài (1.2 vs tăng) | — | — | Mở | `open-decisions.md` |
| D9 | Token sản phẩm **chỉ Light mode**; `themes:["light"]`. Mode Dark của `Alias` + `Shadow/elevation-dark/*` còn trong Figma (xóa/ẩn chờ duyệt). Theme dark của website docs giữ | 2026-11-14 | Người dùng (yêu cầu "loại bỏ các variable dark mode") | **Đã chốt** | `AGENTS.md` §5; `open-decisions.md` dòng 18; `ds.config.json`; chat Agent Core 2026-11-14T09:29 `[Low: từ transcript]` |
| D10 | Component thực tế/code handoff = **HTML/CSS/JS thuần**; website giữ Next.js/React | 2026-11-12, xác nhận 2026-11-14 | Người dùng | **Đã chốt** | `component-code-rules.md` dòng 3; `AGENTS.md` §5 |

Ghi chú nhãn: Audit gọi hai quyết định 14/11 là **Q1 (bỏ dark)** và **Q2 (stack thuần)** (`SDS-RECONCILIATION.md` §1) — chính là D9 và D10.

## B. Quyết định quy trình (rút từ chat Agent Core, chưa có ID trong repo)
| ID | Nội dung | Ngày | Duyệt | Nguồn | Tin cậy |
|---|---|---|---|---|---|
| P1 | Không thay đổi **bất cứ gì** trong Figma nếu chưa có đồng ý rõ cho đúng hành động/file | 2026-11-15 | Người dùng | Chat Agent Core 11:32; `AGENTS.md` §10 | Med |
| P2 | Gỡ thông tin các tài khoản Figma/Google khác khỏi tài liệu; chỉ `info@smartads.tech` hợp lệ | 2026-11-14/15 | Người dùng | Chat Agent Core 09:29; `AGENTS.md` §10 | Med |
| P3 | Thực hiện kế hoạch 1–5 (gọn `_audit/`, rename-map +69 mục, `build-tokens`+`usage.json`, viết lại references, sửa `ds.config.json`/`generate-theme.mjs`/CSS hex→`var()`) | 2026-11-15 | Người dùng ("Hãy thử hiện 1 - 5") | Chat Agent Core 11:33–11:40 | Med |
| P4 | `AGENTS.md` là điểm vào duy nhất cho mọi AI; được viết lại 10 mục | 2026-11-15 | Người dùng (yêu cầu) | Chat Agent Core 11:47–11:49; `AGENTS.md` | High |
| P5 | Đề xuất đổi tên chỉ ở `rename-map.json` (`proposed`/`needs-decision`); 0 `approved` | 2026-11-15 | Quy tắc dự án | `AGENTS.md` §4.6; `rename-map.json` | High |
| P6 | Đặt `SDS-RECONCILIATION.md` (thống nhất tiền tố `SDS-`) | 2026-11-15 | Agent Core, theo chat | Chat Agent Core 11:27 | Low |

## C. Đề xuất chưa duyệt (KHÔNG coi là quyết định)
- Thứ tự "sửa Figma trước, repo theo" (Agent Core đề xuất 2026-11-15 11:27) — chưa duyệt; mọi bước sửa Figma cần cho phép riêng.
- `rename-map.json` 98 mục: 13 `approved` (neutral, đã áp dụng), 4 `rejected`, 60 `proposed`, 21 `needs-decision` (đếm 2026-11-16); lộ trình `SDS-AUDIT.md` §5 còn lại chưa duyệt.
- Thêm `docs/_audit/agents/` + `docs/_knowledge/` vào `workspace-guide.md` (AGENTS.md và CLAUDE.md đã có, đọc 2026-11-16).
Chi tiết ở [open-questions.md](open-questions.md).
