# Sổ quyết định SDS

> Cập nhật: 2026-11-15. Chỉ ghi quyết định có bằng chứng. "Duyệt" = người dùng (chủ dự án); không ghi tên cá nhân.

## A. Quyết định thiết kế (D1–D10)
| ID | Nội dung | Ngày | Duyệt | Trạng thái | Nguồn |
|---|---|---|---|---|---|
| D1 | Prefix code/CSS = `sa`; tên viết tắt = `SDS` | 2026-11-02 | Người dùng | **Đã chốt** | `ds-conventions/references/open-decisions.md` (dòng 7, 16); `ds.config.json` |
| D2 | "Tini" có phải "Tiny"? (đề xuất ⭐ đổi `tiny`) | — | — | Mở (đề xuất `proposed`) | `open-decisions.md` |
| D3 | Neutral vs gray; "Secondary option 1/2"; `Alias/Primary - On Theme` | — | — | Mở, cần xác nhận | `open-decisions.md`; `SDS-AUDIT.md` §6 câu 2 |
| D4 | Thang cỡ chữ: t-shirt (⭐) hay số px | — | — | Mở | `open-decisions.md`; Audit TK-02 đề xuất số |
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
- 85 mục `rename-map.json` (64 proposed, 21 needs-decision) và lộ trình `SDS-AUDIT.md` §5.
- Thêm `docs/_audit/agents/` vào `AGENTS.md` + `workspace-guide.md`; tạo `CLAUDE.md` chứa `@AGENTS.md`.
Chi tiết ở [open-questions.md](open-questions.md).
