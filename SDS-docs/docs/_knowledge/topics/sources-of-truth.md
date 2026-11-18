# Nguồn sự thật & thứ tự ưu tiên

> Tổng hợp 2026-11-15 · Nguồn: `AGENTS.md` §3–4 · Tin cậy: High.

1. **Figma** (file key `cRZ5kIi4kD6j9lh1dbh5mh`, `ds.config.json`) thắng mọi nguồn.
2. `variable-figma-export/` = snapshot có ngày (2026-11-02; live 2026-11-14 khớp 100%: hash 6/6 collection, 77/43 style — `SDS-CONTEXT.md` §1). `usage.json` = token/style được component dùng.
3. `docs/_audit/*` = báo cáo suy ra, có ngày; cập nhật khi Figma đổi.
4. Code repo (CSS website, script): tham khảo phụ; `--sa-docs-*`, `--sa-resource-*`, `--sa-space-*` không phải token sản phẩm.
5. **Kho tri thức này** (`docs/_knowledge/`): chỉ mục + tổng hợp, thấp nhất.
- Không xác minh được → `[UNVERIFIED]`; không có → `[NOT FOUND]`; thiếu giá trị → `needs-value`.
- Đề xuất đổi tên chỉ trong `tokens/rename-map.json`; chỉ người dùng đặt `approved`.
- File sinh tự động (`tokens/generated/`, `figma.generated.css`, `*.generated.json`, `out/`, `.next/`) không sửa tay.

## Bản đồ thư mục (rút gọn)
`AGENTS.md` (điểm vào) · `skills-source/` (sds-fe-website-builder; external-design-system → ngoài repo) · `SDS-docs/`: `ds.config.json`, `variable-figma-export/`, `tokens/`, `scripts/`, `tests/`, `content/{rules,guides,pages}`, `docs/_audit/`, `docs/_knowledge/` (mới), `skills-source/{ds-conventions,figma-token-workflow,sds-spacing-foundation}`, `website/`.
