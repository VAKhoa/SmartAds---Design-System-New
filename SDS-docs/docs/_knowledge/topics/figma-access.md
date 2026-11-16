# Truy cập Figma (chỉ đọc)

> Tổng hợp 2026-11-15 · Nguồn: `AGENTS.md` §10; `SDS-rules.md`; chat Agent Core 2026-11-15 11:32 (người dùng: không đổi gì trong Figma nếu chưa đồng ý) · Tin cậy: High.

- Tài khoản hợp lệ duy nhất: **`info@smartads.tech`**; gọi `whoami` trước khi đọc. URL `?m=dev` không xác nhận tài khoản/quyền.
- Ưu tiên plugin `figma-local@figma-local-workspace`; nếu thiếu, dùng Figma MCP connector (`get_metadata`, `get_variable_defs`, `get_design_context`, `get_screenshot`) **chỉ khi** `whoami` đúng. Không tự chuyển sang app desktop/Chrome/marketplace.
- Danh sách đầy đủ token/component: không lấy bằng `get_variable_defs`; dùng script chỉ-đọc `dump-*.figma.js` qua `use_figma` — công cụ này về kỹ thuật có thể ghi, **chỉ dùng cho script đọc và khi người dùng cho phép rõ trong task**.
- Chỉ đúng file/node người dùng chỉ định cho task; không duyệt Recents/file khác/thư viện liên kết. Chưa rõ file → hỏi.
- **Cấm** tạo/sửa/đổi tên/di chuyển/xóa/publish/đổi cài đặt (kể cả đổi tên token/prop, xóa mode, rebind, thêm token) khi chưa có cho phép rõ cho đúng hành động và file. Đề xuất sửa Figma chỉ ghi `rename-map.json`/`SDS-AUDIT.md`.
- Việc sẽ đổi Figma (chỉ liệt kê, chưa làm; Agent Core 2026-11-15): đổi tên token/prop (Audit §4), xóa mode Dark + `Shadow/elevation-dark/*`, gỡ thư viện cũ/rebind, thêm token mới (data-viz/delta/status/density), sửa contrast.
- Lần đọc live gần nhất: 2026-11-14 bằng `info@smartads.tech` (Full seat), chỉ API đọc (`SDS-CONTEXT.md` §1).
- Thiếu công cụ/quyền/rate limit → ghi giới hạn, không kết luận từ nguồn khác như đã xác minh.
