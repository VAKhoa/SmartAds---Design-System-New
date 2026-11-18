# Template báo cáo UI QA

`compare.mjs` sinh sẵn mục 1, 2, 3, 7 và khung mục 4–6. AI chỉ **bổ sung** những phần cần phán đoán (đánh dấu `<!-- AI bổ sung -->`) và rà lại gợi ý sửa. Giữ nguyên thứ tự mục.

```markdown
# Báo cáo UI QA — <Screen> (<viewport>)

Figma: <file key · node id · ngày đọc / snapshot> · Code: <file/URL> · Viewport: <w×h> · Snapshot token: <ngày>

## 1. Tóm tắt
| Component | Thuộc tính đã so | 🔴 Critical | 🟠 Major | 🟡 Minor | 📝 Ghi chú | Điểm khớp |
|---|---:|---:|---:|---:|---:|---:|
| **N** | … | … | … | … | … | **xx%** |

Nhận định 2–3 câu: điểm nghẽn chính (vd "hầu hết lệch đến từ dev override Bootstrap thay vì dùng --sa-*"), có ship được không.

## 2. Chi tiết theo component
### <Component> — <mức cao nhất>
Figma: `<node id>` (<tên layer>) ↔ Code: `<selector>` · Ghép bằng: <cách> · Độ chắc chắn: cao/trung bình/thấp
> Ghi chú class (nếu class khác nhưng giá trị đúng)

| Thuộc tính | Figma (root) | Code | Chênh lệch | Token đúng? | Mức độ | Gợi ý sửa |
|---|---|---|---|---|---|---|
| background-color | #048845<br>`surface/primary` | #048845<br>`#048845` | — | ❌ hard-code | 🟠 Major | `background-color: var(--sa-surface-primary)` |

## 3. Lỗi token/variable (Dev)
| Component | Selector / file | Thuộc tính | Đang viết | Loại | Token đúng cần dùng |

## 4. Góp ý cho Product Designer (Figma)
Bảng giá trị Figma chưa bind token (tự sinh) + AI bổ sung: token gate E/DEPRECATED đang bind, giá trị lệch thang, style detached, thiếu variant/state, thiếu nhất quán giữa instance. Mỗi dòng: node · vấn đề · đề xuất (token/style đã qua gate).

## 5. Không xác định được
Thuộc tính/phần tử không so được và lý do (stylesheet cross-origin, Figma HUG/FILL ở viewport khác, chart canvas, nội dung động, thiếu quyền Figma…).

## 6. Giả định đã dùng
Viewport, state đã kích hoạt thế nào, font đã load chưa, nguồn Figma (live hay snapshot ngày nào), cách quy đổi (stroke OUTSIDE → outline…), ghép component độ chắc chắn thấp.

## 7. Danh sách việc cần sửa (theo mức độ)
1. 🔴 Critical **<Component>** — <prop>: <chênh lệch> → <gợi ý>
2. …
```

## Cách viết "Gợi ý sửa"
- Dev: đưa dòng CSS cụ thể, ưu tiên token: `padding: var(--sa-spacing-md) var(--sa-spacing-lg)`; nếu cấu trúc sai thì nêu cấu trúc đúng (vd "đổi `.toolbar` sang `display:flex; gap: var(--sa-spacing-sm)`").
- Không đề xuất token gate E làm đích sửa cho Dev; nếu Figma bind token gate E, vẫn để Dev dùng đúng token đó (Figma là gốc) và ghi góp ý Designer song song.
- Gom lỗi lặp: cùng một nguyên nhân (vd thiếu nạp file token `:root`) → một dòng gốc rễ ở đầu mục 7, liệt kê các chỗ bị ảnh hưởng.

## Nơi lưu
Mặc định `ui-qa/<screen-slug>/` trong project code được kiểm tra (`pairs.json`, `report.md`, `result.json`, ảnh chụp nếu có). Không lưu vào `SDS-docs/` trừ khi người dùng yêu cầu.
