---
name: figma-token-workflow
description: Đồng bộ variables và styles từ SmartAds Figma, audit hiện trạng và quản lý đề xuất đổi tên token. Dùng khi cần import, kiểm kê, lint hoặc chuẩn hóa token; không dùng để tự sửa Figma.
---

# Figma token workflow

Đọc `AGENTS.md`, `ds.config.json` và skill `ds-conventions` khi công việc liên quan đến đặt tên. Figma là nguồn của giá trị. Các file export và báo cáo phải ghi ngày lấy dữ liệu và file key.

## Đồng bộ

- Dùng Figma MCP hoặc Figma Plugin API ở chế độ chỉ đọc. `scripts/dump-variables.figma.js` và `scripts/dump-styles.figma.js` là mã tham khảo để xuất dữ liệu. Script variables chạy một lần để lấy overview, rồi từng collection bằng cách đặt `COLLECTION`. Script styles hiện chỉ xuất text/effect; đọc paint/grid styles riêng trước khi gọi snapshot là đầy đủ.
- Lưu snapshot có nguồn và ngày đọc trong `variable-figma-export/`: `overview.json`, `variables.<collection>.json`, `styles.json`. Giữ ID và alias; có thể thêm giá trị đã giải alias để kiểm tra. Nếu kết quả quá lớn, chia thành nhiều phần nhưng phải kiểm đếm lại tổng số ID, tránh thiếu hoặc trùng.
- Với mỗi variable, giữ collection, tên, kiểu, mode, giá trị hoặc alias, scope và description. Không sửa tay giá trị export; muốn cập nhật thì đồng bộ lại.

## Audit và đổi tên

1. Chạy `node scripts/ds-tokens.mjs lint variable-figma-export/ --json`. Ghi số lượng collection, variable theo loại, style, alias, giá trị trực tiếp và các vấn đề vào `docs/_audit/` khi cần báo cáo. Kiểm tra scope, description, tầng Base/Semantic/Component, thang kích thước và khác biệt Light/Dark; so docs với dữ liệu khi đã có docs.
2. Đối chiếu các phát hiện với Figma và `.agents/skills/ds-conventions/references/`; không coi gợi ý từ script là quyết định đã duyệt.
3. Chạy `node scripts/ds-tokens.mjs suggest variable-figma-export/` để lấy đề xuất. Gộp vào `tokens/rename-map.json` mà không ghi đè mục đã `approved` hoặc `rejected`. Mục mơ hồ để `needs-decision`, kèm lý do.
4. Chỉ đổi tên trong Figma khi người dùng yêu cầu rõ và đã duyệt mục tương ứng. Sau thay đổi, đồng bộ lại và kiểm tra alias/binding.

Fixture trong `tests/fixtures/` và mẫu trong `tokens/observed/` không dùng để kết luận gate trên toàn file Figma. Chạy `node tests/run-tests.mjs` khi sửa script.
