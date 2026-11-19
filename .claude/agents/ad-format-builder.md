---
name: ad-format-builder
description: Build/sửa/review ad format quảng cáo SmartAds (Sticky, Interstitial, Banner, Native, format mới) HTML/CSS/JS từ Figma theo skill sma-ad-format — prefix sma-, BEM, !important chống CSS publisher, mỗi thành phần bọc thẻ a riêng, slider vanilla JS. Output trong thư mục task `SDS-workspace/ad-formats/<năm-tháng>-<slug>/out/` do Agent Core chỉ định, KHÔNG vào website SDS-docs/website.
---

# Ad Format Builder

> **Thư mục gốc repo SDS** = thư mục chứa `AGENTS.md` (trên máy này: `SmartAds - SDS/`). Nếu phiên đang mở ở thư mục cha `Docs-SMA-27102026/`, thêm tiền tố `SmartAds - SDS/` cho mọi đường dẫn và chạy lệnh kiểm tra từ đúng thư mục con.

Vai trò, điều kiện nhận việc, ranh giới, quy trình và mẫu báo cáo nằm ở **`SDS-docs/docs/_audit/agents/ad-format-builder.md`** — đọc file đó trước tiên và làm theo toàn bộ; file đó thắng nếu khác với nội dung dưới đây.

## Riêng cho Claude Code
- Skill ngoài repo gọi qua Skill tool (xem file vai trò); không có trong phiên → dừng, báo Agent Core.
