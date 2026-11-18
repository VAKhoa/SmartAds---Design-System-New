# Schema file pairs (đầu vào `compare.mjs`)

Một file cho **một screen / một frame / một viewport**. AI điền sau Bước 3, rồi chạy:

```bash
node <skill>/scripts/compare.mjs ui-qa/<screen>/pairs.json --out ui-qa/<screen>/report.md --json ui-qa/<screen>/result.json
```

```jsonc
{
  "screen": "Campaign list — Desktop 1440",
  "figma": "cRZ5kIi4kD6j9lh1dbh5mh · node 1234:5678",   // file key + node id
  "code": "src/campaign/list.html (+ list.css)",       // hoặc URL local đã mở
  "viewport": "1440×900",
  "brandColors": ["#048845"],        // tuỳ chọn; mặc định = mọi color/primary/* trong snapshot
  "components": [
    {
      "name": "Button / Primary / md",              // tên hiển thị trong báo cáo
      "figmaNode": "1234:5690", "figmaName": "_button primary md",
      "codeSelector": ".campaign-toolbar .btn-create",
      "match": { "method": "text 'Tạo chiến dịch' + vị trí toolbar + cấu trúc icon+label", "confidence": "cao" },
      "classNote": "Dev dùng class Bootstrap `.btn.btn-success` thay vì `sa-button--primary`; giá trị đúng vẫn Pass.",
      "fontSize": 14,                               // tuỳ chọn; dùng quy line-height/letter-spacing %
      "props": [
        { "prop": "background-color", "figma": "#048845", "figmaToken": "component/button/surface/primary-accent/default",
          "code": "rgb(4, 136, 69)", "codeAuthored": "var(--bs-success)", "selector": ".btn-success", "file": "vendor-override.css" },
        { "prop": "padding-left", "figma": 16, "figmaToken": "spacing/lg (Base)", "code": "15px", "codeAuthored": "15px" },
        { "prop": "line-height", "figma": { "unit": "PERCENT", "value": 120 }, "code": "16.8px", "codeAuthored": null },
        { "prop": "background-color", "state": "hover", "figma": "#047c3f", "figmaToken": "surface/primary-hover",
          "code": "#047c3f", "codeAuthored": "#047c3f" },
        { "prop": "state", "state": "disabled", "figma": "State=Disable", "code": "missing" },
        { "prop": "element", "figma": "Icon leading (plus)", "code": "missing" },
        { "prop": "flex-direction", "figma": "row", "code": "column" }
      ]
    }
  ]
}
```

## Trường của mỗi prop

| Trường | Bắt buộc | Ý nghĩa |
|---|---|---|
| `prop` | ✓ | Tên CSS (`padding-left`, `border-top-left-radius`, `box-shadow`…) hoặc đặc biệt: `element` (có/thiếu phần tử), `state` (có/thiếu state), `child-order`, `icon`/`asset`. |
| `figma` | ✓ | Giá trị Figma (root). Màu: hex hoặc `{r,g,b,a}` 0–1. Số: px. Line-height/letter-spacing: px hoặc `{unit, value}` của Figma. Shadow: chuỗi CSS hoặc mảng effect Figma. |
| `figmaToken` | nên có | Tên variable Figma đã bind (đúng chữ hoa/thường). Bỏ trống khi Figma để giá trị trần → script ghi góp ý Designer. |
| `figmaStyle` | | Tên text/effect style Figma (`Brand/Body-xs/Semi`, `Shadow/elevation-light/100`) khi thuộc tính đến từ style thay vì variable. SDS chưa có quy ước biến CSS cho style, nên script không phạt hard-code ở các dòng này. |
| `code` | ✓ | Computed style (từ `__uiqa.inspect`). `"missing"` cho element/state không có. `null` nếu không đọc được. |
| `codeAuthored` | nên có | Giá trị dev **viết** trong CSS (`src` của `__uiqa.inspect`), giữ `var()`. Thuộc tính kế thừa (`color`, `font-*`) không có ở `src` của phần tử → inspect phần tử cha đã khai báo và lấy giá trị đó. `null` = không đọc được (cross-origin, UA default…) → cột Token ghi ❔. |
| `state` | | `hover`, `focus`, `active`, `disabled`, `error`, `selected`… (mặc định = default). |
| `group` | | Ép nhóm so sánh: `color`, `dim`, `weight`, `family`, `shadow`, `opacity`, `layout`, `enum`, `presence`, `asset`. Thường tự suy. |
| `brand` | | `true`/`false` ép coi là màu thương hiệu. |
| `selector`, `file` | | Vị trí sửa, hiện trong mục Lỗi token. |
| `fix` | | Ghi đè gợi ý sửa tự sinh. |
| `note` | | Ghi chú thêm vào cột Gợi ý. |

Mẹo giữ file nhỏ: chỉ đưa prop Figma có định nghĩa; gom prop 4 cạnh bằng nhau thành một (`padding`, `border-radius`) khi cả hai phía đều đồng nhất; không lặp prop không đổi giữa các state.
