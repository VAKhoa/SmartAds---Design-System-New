---
name: ui-qa-figma-vs-code
description: QA/QC giao diện SmartAds — so sánh Figma (nguồn gốc) với code HTML/CSS/JS của dev theo từng component, đào tới design token (color, typography, spacing, border, radius, shadow, opacity, size, layout, state, responsive), phát hiện dev hard-code thay vì dùng biến `--sa-*`, chấm mức Critical/Major/Minor, xuất báo cáo bảng chuẩn kèm góp ý cho Product Designer khi chính Figma chưa chuẩn design system. Dùng skill này bất cứ khi nào người dùng nói "so sánh figma với code", "check UI", "QA giao diện", "QC UI", "design review", "dev code đúng design chưa", "soi pixel", "đối chiếu thiết kế", "UI có lệch Figma không", hoặc đưa link Figma kèm file/URL code để kiểm tra — kể cả khi không nhắc tên skill. Không dùng để tự build UI mới từ Figma.
---

# UI QA: Figma ↔ Code (SDS)

Mục đích: cho Product/Designer biết **dev có bám design không, lệch ở đâu, lệch vì token gì**, và cho Designer biết **chỗ nào trong Figma chưa chuẩn SDS**. Figma là gốc (root) — giá trị Figma là đáp án; nhưng Figma cũng được kiểm tra lại, và lỗi của Figma được báo riêng, không tính vào lỗi Dev.

Ba điều quan trọng hơn mọi thứ khác:
1. **Đánh giá chỉ số, không đánh giá tên class.** Class khác (Bootstrap `.btn-success` thay vì `sa-button--primary`) mà giá trị đúng → Pass, vẫn liệt kê.
2. **Giá trị đúng chưa đủ** — phải đi qua token. Hex đúng nhưng hard-code, hay dùng `--bs-*`, là lỗi token (Major).
3. **Không bịa.** Không đọc được thì ghi vào "Không xác định được", không đoán.

## Bước 0 — Kiểm tra đầu vào và chia phạm vi (bắt buộc trước khi làm)

Cần đủ 3 thứ. Thiếu thứ nào → **hỏi người dùng trước** (một lần, gộp các câu hỏi), không tự chọn:

| Đầu vào | Chấp nhận | Nếu thiếu |
|---|---|---|
| Figma | Link frame/node (có `node-id`) **hoặc** file JSON export node (REST/plugin) | Hỏi link node. Chỉ có link file, không node → hỏi frame nào. |
| Code | Đường dẫn HTML/CSS/JS (+ cách mở) **hoặc** URL đang chạy (localhost/staging) | Hỏi. Không đoán file. |
| Phạm vi | Screen/frame, viewport (breakpoint), state cần kiểm | Mặc định: viewport của frame Figma, state = các variant Figma có. Nêu giả định, không cần hỏi. |

Quy ước token: mặc định dùng snapshot SDS trong repo (`SDS-docs/variable-figma-export/`, Light mode, prefix `--sa-`). `scripts/token-index.mjs` tự tìm. Chỉ hỏi nếu không tìm thấy `SDS-docs/` hoặc người dùng nói dùng quy ước khác.

**Chia nhỏ khi lớn.** Một lần chạy = **một screen × một viewport**. Nếu đầu vào có nhiều screen/frame, nhiều breakpoint, hoặc một screen > ~15 component cấp cao: liệt kê các phần, ghi `ui-qa/PLAN.md` (checkbox mỗi screen), hỏi người dùng làm phần nào trước, rồi làm từng phần và báo cáo riêng. Lý do: dò cả loạt cùng lúc làm loãng ngữ cảnh, ghép nhầm component và báo cáo không kiểm soát được.

## Ngân sách token — làm sâu chỗ quan trọng, nhẹ chỗ ít quan trọng

Phân hạng component sau Bước 1, ghi hạng trong báo cáo:
- **Hạng 1 – đầy đủ checklist + mọi state:** component tương tác và thương hiệu (button, input, select, tab, toggle, checkbox, KPI card, header, table header/row mẫu, modal), mọi thứ dùng màu primary.
- **Hạng 2 – color, typography, spacing, size, radius:** khối nội dung, card tĩnh, badge, tag.
- **Hạng 3 – chỉ có mặt/kích thước/màu chính:** trang trí, divider, ảnh minh hoạ, phần tử lặp thứ N (20 dòng bảng → so kỹ 1 dòng đại diện, các dòng còn lại chỉ kiểm tra đồng nhất bằng `__uiqa.tree`).

Tiết kiệm mà không giảm chất lượng:
- Giá trị token lấy bằng `token-index.mjs` (local, miễn phí), **không** gọi Figma để hỏi lại giá trị token, **không** đọc cả `SDS-CONTEXT.md` (31KB).
- Figma: `get_metadata` (cây rẻ) trước; `get_design_context`/`get_variable_defs` chỉ cho từng component cần so, không cho cả screen lớn; **một** `get_screenshot` tổng. Không gọi lại node đã đọc — lưu bản rút gọn vào `ui-qa/<screen>/figma-tree.txt` để lần sau dùng lại.
- Code: nạp `scripts/extract-computed.js` **một lần**, sau đó gọi `__uiqa.tree()` / `__uiqa.inspect([...])` theo lô selector. Tránh `read_page`/screenshot lặp lại; chỉ chụp ảnh khi cần xác nhận một lệch khả nghi.
- Bảng báo cáo do `compare.mjs` sinh. Đừng tự viết tay bảng và tự tính chênh lệch.

## Bước 1 — Cây component/layer Figma

1. Truy cập Figma theo luật SDS (xem "Truy cập Figma" bên dưới). Có file JSON export thì chạy:
   `node <skill>/scripts/figma-node-extract.mjs <node.json> --depth 6` → cây gọn kèm token đã bind.
2. Liệt kê cây: `tên layer (TYPE #id) [w×h]` + auto-layout, ghi instance của component nào và variant (`State=…, Size=…`). Đánh dấu component cấp cao sẽ so và hạng 1/2/3.
3. Ghi nhận ngay vấn đề phía Figma (giá trị không bind, token gate E, layer detached) để đưa vào mục góp ý Designer.

## Bước 2 — Ghép Figma ↔ element code

Component SDS thường ghép từ nhiều atomic (vd `_actions Button Group` = nhiều `primitive-*`), nên ghép theo **cấu trúc**, không theo tên.
1. Lấy cây DOM: `__uiqa.tree('<root selector>', 5)` (tag.class "text" [w×h] flex gap).
2. Ghép từng component bằng tổ hợp tín hiệu, mạnh → yếu: text nội dung trùng · vị trí/thứ tự trong cha · kích thước gần bằng · cấu trúc con (icon + label…) · vai trò (button/input) · tên class gợi ý.
3. Ghi cho mỗi cặp: `method` (tín hiệu đã dùng) và `confidence` cao / trung bình / thấp. Độ chắc chắn thấp → vẫn so, nhưng ghi vào "Giả định". Không tìm thấy element → `prop: "element", code: "missing"` (Critical).
4. Atomic ghép thành component: so từng atomic là một component con (vd "Button › Icon", "Button › Label"), để biết lệch nằm ở phần nào.

## Bước 3 — Trích xuất thuộc tính hai phía

- **Figma:** từ `get_design_context` / `get_variable_defs` / JSON export. Lấy giá trị **và** tên variable/style đã bind. Text style `Brand/*` → `node <skill>/scripts/token-index.mjs style "Brand/Body-xs/Regular"`.
- **Code (computed style):** mở trang (built-in browser; file tĩnh thì chạy static server qua `preview_start` — trang `file://` không chạy được JS tool), set viewport đúng breakpoint Figma, dán `scripts/extract-computed.js` vào công cụ chạy JS (nếu bạn kiểm soát server, đặt file cạnh trang rồi `eval(await (await fetch('/extract-computed.js')).text())` để khỏi dán 9KB), rồi:
  1. `__uiqa.env()` — kiểm tra `fontsReady`, font đã load, `dpr`. Nếu `onePxBorder` ≠ `1px` (zoom/DPR, vd 1.25 → 0.8px) thì số đo border/outline bị lệch: so theo `src` hoặc ghi vào Giả định, đừng báo lỗi 0.2px.
  2. `__uiqa.inspect([selectors])` — trả `css` (computed), `src` (giá trị dev viết, giữ `var()`), `states` (rule `:hover`, `:focus`, `[disabled]`, `.is-error`…). Font fallback (vd `button` không kế thừa font → Arial) là lỗi thật, hay gặp.
- **State:** so giá trị trong `states` (resolve `var()` bằng `token-index.mjs css <var>`). Cần computed thật của state (disabled/error) → bật attribute/class trên DOM local rồi inspect lại, sau đó hoàn tác.
- Không có trình duyệt → đọc CSS tĩnh, ghi rõ "chưa có computed style" trong Giả định; vẫn so được phần token.

## Bước 4 — So sánh theo checklist

> Trong repo SDS: nếu Agent Core giao thư mục task, thay mọi `ui-qa/<screen>/` dưới đây bằng `<thư mục task>/<screen>/` (mặc định `SDS-workspace/qa-reports/<năm-tháng>-<slug>/<screen>/`).

Đọc `references/checklist.md` (checklist, ánh xạ Figma→CSS, luật đúng/sai, mức độ). Điền `ui-qa/<screen>/pairs.json` theo `references/pairs-schema.md` rồi chạy:

```bash
node <skill>/scripts/compare.mjs ui-qa/<screen>/pairs.json --out ui-qa/<screen>/report.md --json ui-qa/<screen>/result.json
```

Script tự chuẩn hoá (hex, rgb/rgba, rem/em, line-height %, weight chữ→số, shadow nhiều lớp), áp ngưỡng ≤1px ghi chú · 2–4px Minor · >4px Major · màu/weight/family khớp tuyệt đối, tính điểm khớp.

## Bước 5 — Phân tích token

Cột "Token đúng?" do script suy ra từ `figmaToken` + `codeAuthored` (bảng quyết định ở `checklist.md` §5): đúng token · token khác cùng giá trị · sai token · biến không tồn tại · biến ngoài SDS (`--bs-*`) · hard-code · Figma chưa bind. Sau khi chạy, AI đọc lại các dòng lỗi để:
- tìm **nguyên nhân gốc chung** (thiếu nạp file token `:root`, override Bootstrap toàn cục, copy giá trị từ Inspect thay vì token) và nêu thành một mục sửa gốc;
- tra token thay thế khi Figma chưa bind: `token-index.mjs value "<hex|px>"` (chỉ đề xuất token gate A/B);
- kiểm tra token Figma bind có gate E / DEPRECATED không: `token-index.mjs name "<token>"` → đưa vào góp ý Designer.

## Bước 6 — Báo cáo

Theo `references/report-template.md`. `compare.mjs` đã sinh mục 1, 2, 3, 7 và khung 4–6; AI bổ sung nhận định tóm tắt, góp ý Designer, "Không xác định được", "Giả định đã dùng", và gom lỗi lặp. Lưu ở `ui-qa/<screen-slug>/report.md` trong project code. Trả lời người dùng: tóm tắt số lỗi, điểm khớp, 3–5 lỗi nặng nhất, đường dẫn báo cáo, và phần chưa làm (screen tiếp theo trong PLAN.md nếu có).

## Truy cập Figma (luật SDS, chỉ đọc)

- Chỉ đọc. Không tạo/sửa/đổi tên/rebind gì trong Figma; góp ý chỉ nằm trong báo cáo.
- Với file SmartAds: gọi `whoami` trước, chỉ tiếp tục khi tài khoản là `info@smartads.tech`; sai tài khoản/thiếu quyền → dừng phần Figma, báo người dùng, dùng JSON export nếu họ cung cấp.
- Chỉ đọc đúng file key/node người dùng giao (file DS gốc: `SDS-docs/ds.config.json`). Không duyệt file khác hay thư viện liên kết.
- Ghi nguồn và ngày: Figma live (ngày đọc) hay snapshot (`readDate` trong export). Snapshot có thể cũ hơn Figma — xem `SDS-docs/docs/_audit/FIGMA-CHANGELOG.md` nếu số liệu lạ.
- Token sản phẩm chỉ Light mode (D9). Token đã xoá (`color/secondary light/*`, `color/red dark/*`, `color/orange/*`) và `color/gray/*` (đã gộp vào `color/neutral/*`) không được đề xuất.

## Scripts (Node ≥ 18, không cần cài gói)

| Script | Dùng khi |
|---|---|
| `scripts/token-index.mjs` | Tra token: `value "#048845"` · `value 12 --kind dim` · `name surface/primary` · `css --sa-surface-primary` · `id VariableID:…` · `style "Brand/…"` · `dump` |
| `scripts/extract-computed.js` | Dán vào trình duyệt: `__uiqa.env()`, `__uiqa.tree(sel, depth)`, `__uiqa.inspect([sel], {props, states, from, index})` |
| `scripts/figma-node-extract.mjs` | Làm phẳng JSON node Figma thành cây thuộc tính CSS + token đã bind |
| `scripts/compare.mjs` | So pairs.json → báo cáo Markdown + JSON kết quả |

Các script tự tìm `SDS-docs/` từ thư mục hiện tại đi lên; nếu chạy ngoài repo SDS, thêm `--sds <đường dẫn SDS-docs>`.
