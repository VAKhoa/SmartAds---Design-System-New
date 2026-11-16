# Quy trình & lệnh kiểm tra

> Tổng hợp 2026-11-15 · Nguồn: `AGENTS.md` §2, §7–8; `content/guides/workspace-guide.md` (updated 2026-11-13) · Tin cậy: High.

## Chọn việc → file
Mọi việc trong `SDS-docs/`: `SDS-rules.md` → `workspace-guide.md`. Token/giá trị: `SDS-CONTEXT.md` → `tokens.json`/`variable-figma-export/`. Đánh giá/sửa: `SDS-AUDIT.md`, `SDS-RECONCILIATION.md`. Tên token: skill `ds-conventions` + `rename-map.json`. Đồng bộ Figma: `figma-token-workflow`. Spacing: `sds-spacing-foundation`. UI website: `website-ui-rules.md` + `sds-fe-website-builder` + `website/README.md`. Bài viết: `content-guide.md`. Component: `component-code-rules.md`.

## Mỗi yêu cầu nên có 4 thông tin
Đầu ra · nguồn (node Figma/file) · phạm vi (mode/viewport/state) · điều kiện hoàn tất.

## Lệnh (từ `SDS-docs/`)
```
node tests/run-tests.mjs
node scripts/ds-tokens.mjs lint variable-figma-export/   # có thể trả mã ≠ 0 do lỗi tên Figma, không phải lỗi công cụ
node scripts/build-tokens.mjs
# trong website/: npm ci · npm run build · npm run test:e2e (cần Chrome, build trước)
```
Trạng thái kiểm tra gần nhất (Agent Core, 2026-11-15 11:40, theo chat): test pass, `npm run build` thành công, Playwright chưa chạy, chưa commit `[Low]`.

## Khi Figma đổi
Dump lại `variable-figma-export/` → cập nhật `usage.json` → `build-tokens` + test → cập nhật `docs/_audit/*` (số liệu, ngày) + `rename-map.json`.

## Checklist sau mỗi thay đổi
Với từng trang liên quan ghi "đã cập nhật" hoặc "đã kiểm tra, còn đúng" + lý do; cập nhật `updated`; build; báo nguồn, ngày, file đã sửa, kết quả, phần còn nháp. Bảng tác động: `workspace-guide.md` §"Bảng kiểm tra tác động".

## Ví dụ đổi tên token
Tra snapshot → lint/suggest → ghi `rename-map` (`proposed`) → người dùng duyệt → áp dụng khi yêu cầu → đọc lại Figma, cập nhật snapshot.
