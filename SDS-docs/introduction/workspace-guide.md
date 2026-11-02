---
title: Hướng dẫn thư mục và vận hành SDS Docs
section: Introduction
updated: 02/11/2026
status: beta
---

# Hướng dẫn thư mục và vận hành SDS Docs

Tài liệu này giải thích **các file trong thư mục xây SDS và cách vận hành chúng**. Để hiểu SmartAds là sản phẩm gì, ai dùng và vì sao xây SDS, đọc [SmartAds và SDS là gì?](about-smartads.md) trước. Dự án có khung website Introduction trong `website/`, đồng thời tiếp tục kiểm kê và chuẩn hóa token; chưa có gói CSS token phát hành hoặc thư viện component code dành cho sản phẩm. Nguồn thiết kế: [SmartAds - Design System](https://www.figma.com/design/cRZ5kIi4kD6j9lh1dbh5mh/SmartAds---Design-System).

## Cấu trúc hiện tại

```text
SDS-docs/
├─ README.md, AGENTS.md, ds.config.json, .gitignore
├─ introduction/{about-smartads.md,workspace-guide.md}
├─ .agents/skills/
│  ├─ ds-conventions/SKILL.md
│  ├─ ds-conventions/references/{naming,color,typography,spacing-radius,effects,open-decisions}.md
│  └─ figma-token-workflow/SKILL.md
├─ scripts/{ds-tokens.mjs,dump-variables.figma.js,dump-styles.figma.js}
├─ tests/{run-tests.mjs,fixtures/observed-sample.json}
├─ tokens/{rename-map.json,observed/figma-primitives-color.json}
├─ variable-figma-export/{overview.json,styles.json,variables.*.json}
├─ website/                  (Next.js + React (JavaScript và CSS thuần), 7 trang Introduction)
└─ docs/_audit/.gitkeep       (chưa có báo cáo)
```

| Nhóm | Ý nghĩa và cách dùng |
| --- | --- |
| `README.md` | Trang dẫn nhập ngắn, dẫn tới đúng hai tài liệu trong `introduction/`. |
| `introduction/about-smartads.md` | Giải thích sản phẩm SmartAds, mục tiêu SDS, đối tượng sử dụng và nguồn thông tin. |
| `introduction/workspace-guide.md` | Tài liệu bạn đang đọc: cấu trúc thư mục và cách vận hành. |
| `AGENTS.md` | Quy tắc ngắn Codex đọc khi làm trong thư mục này. |
| `ds.config.json` | Tên viết tắt `SDS`, file Figma, tên collection đang có và prefix CSS `sa` đã duyệt; cấu trúc collection đích chưa được duyệt. |
| `.gitignore` | Bỏ qua file sinh ra, file tạm và `node_modules` khi dự án dùng Git. |
| `.agents/skills/ds-conventions/` | Skill đặt tên token. Sáu file `references/` chứa chi tiết theo từng loại và quyết định D1–D8 (D1 đã chốt); chỉ mở mục liên quan. |
| `.agents/skills/figma-token-workflow/` | Skill đồng bộ, audit và quản lý đề xuất đổi tên từ Figma. |
| `scripts/dump-variables.figma.js` | Mã chạy trong Figma Plugin API để đọc collections và variables. |
| `scripts/dump-styles.figma.js` | Mã đọc text/effect styles; paint/grid styles cần đọc bổ sung khi làm snapshot đầy đủ. |
| `scripts/ds-tokens.mjs` | Lệnh `lint` kiểm tra tên và `suggest` gợi ý đổi tên từ JSON export. Không tự sửa Figma. |
| `tests/run-tests.mjs`, `tests/fixtures/` | Kiểm tra script bằng dữ liệu cố ý có lỗi; không dùng fixture làm token thật. |
| `tokens/rename-map.json` | Danh sách đề xuất đổi tên, còn chờ duyệt và cần đối chiếu lại với Figma hiện tại. |
| `tokens/observed/` | Ghi chép một phần màu và typography từ lần quan sát đầu; không thay thế export đầy đủ. |
| `variable-figma-export/` | Bản chụp toàn bộ tên và giá trị token Figma ngày 02/11/2026: `overview.json`, 6 file variables theo collection, `styles.json`. Đây là dữ liệu đầu vào để xử lý tiếp, không phải CSS phát hành. |
| `docs/_audit/` | Nơi sẽ lưu báo cáo audit. `.gitkeep` chỉ giữ thư mục rỗng. |
| `website/` | Mã website và nội dung hiển thị cho người đọc. Xem [hướng dẫn website](../website/README.md) để biết từng file và cách chạy. |

## Mở file nào khi cần tra một việc cụ thể?

### Sáu reference của quy ước token

Các file dưới đây là **quy tắc và ghi chép audit ban đầu**, không phải bản export mới nhất từ Figma. Codex chỉ cần mở file liên quan đến việc đang làm.

| File trong `.agents/skills/ds-conventions/references/` | Mở khi cần |
| --- | --- |
| `naming.md` | Xét tên Base/Semantic/Component, trạng thái, ký tự hợp lệ và cách ánh xạ sang `--sa-*`. |
| `color.md` | Xét thang màu, vai trò màu, Light/Dark và tương phản. Bảng giá trị ở đây chỉ là mẫu đã quan sát trước khi có export đầy đủ. |
| `spacing-radius.md` | Xét thang spacing, radius và đề xuất tách collection. Những dòng `needs-value` cũ cần đối chiếu với snapshot mới. |
| `typography.md` | Xét font, size, text style và các tên cỡ chữ đang ngược ý nghĩa. |
| `effects.md` | Xét shadow/elevation và vai trò của từng mức. |
| `open-decisions.md` | Biết quyết định nào đã chốt (D1: `sa`) và D2–D8 còn cần người dùng quyết. |

### Tám file dữ liệu Figma đã lưu

Mở `overview.json` trước để biết tổng quan; sau đó chỉ mở collection cần tra. Tất cả file trong `variable-figma-export/` là **bản chụp ngày 02/11/2026**, không tự cập nhật theo Figma.

| File | Nội dung | Ví dụ cần tra |
| --- | --- | --- |
| `overview.json` | Sáu collection, mode, số variable từng loại và số style. | “Có bao nhiêu variable màu?” |
| `variables.primitives.json` | 256 variable gốc: màu, số và boolean. | Giá trị `color/primary/500`. |
| `variables.spacing.json` | 98 variable số; collection hiện còn chứa radius, screen, icon và typography. | `spacing/md`, `radius/md`. |
| `variables.alias.json` | 293 variable màu theo Light/Dark, gồm semantic và token component hiện đặt chung. | Màu `background/neutral` ở hai mode. |
| `variables.text.json` | 21 variable về family, weight và size chữ. | `typography/size/fs-sm`. |
| `variables.viewport-desktop.json` | 19 variable theo năm mode desktop. | Chiều rộng một vùng ở 1280 so với 1440. |
| `variables.viewport-mobile-tablet.json` | 3 variable theo bốn mode mobile/tablet, gồm hai boolean. | Nút tạo campaign có hiển thị ở 1024 hay không. |
| `styles.json` | 77 text, 43 effect, 7 paint và 5 grid styles. | Font/line-height của một text style hoặc lớp shadow của elevation. |

Trong mỗi variable, `name` là tên Figma hiện tại, `values` giữ giá trị hoặc đường alias theo mode, còn `resolvedValues` là giá trị sau khi lần theo alias. Ví dụ `background/neutral` trỏ tới `color/base/white` ở Light (`#ffffff`) và `color/base/black` ở Dark (`#000000`). `id` giúp nhận ra cùng một variable ngay cả khi tên thay đổi.

### Công cụ, dữ liệu chờ duyệt và file rỗng

| File | Ý nghĩa thực tế |
| --- | --- |
| `scripts/ds-tokens.mjs` | Chạy được bằng Node; `lint` tìm tên lệch quy ước, `suggest` in đề xuất. Không sửa Figma. |
| `scripts/dump-variables.figma.js` | Mã tham khảo chạy trong Figma Plugin API/MCP để đọc collection và variable; không chạy trực tiếp bằng Node. |
| `scripts/dump-styles.figma.js` | Mã tham khảo đọc text/effect style trong Figma; khi làm snapshot đầy đủ phải đọc paint/grid thêm. |
| `tests/run-tests.mjs` | Kiểm tra logic script. Kết quả “OK” nghĩa là công cụ chạy đúng với fixture, không có nghĩa Figma đã sạch lỗi. |
| `tests/fixtures/observed-sample.json` | 19 token mẫu cố ý có tên sai để kiểm thử. Không dùng làm nguồn thiết kế. |
| `tokens/rename-map.json` | Đề xuất từ tên cũ sang tên mới; hiện 11 mục `proposed`, 5 mục `needs-decision`, chưa có mục được duyệt. |
| `tokens/observed/figma-primitives-color.json` | Ghi chép màu và chữ một phần từ audit ban đầu; dùng đối chiếu lịch sử. |
| `docs/_audit/.gitkeep` | File rỗng để giữ thư mục báo cáo. Chưa có báo cáo audit chính thức. |

`.gitignore` ở gốc dự án quy định file Git sẽ bỏ qua; hiện thư mục chưa có Git. `ds.config.json` là nơi lấy file key Figma và tiền tố `sa`, còn `AGENTS.md` là quy tắc Codex phải theo.

## Dùng Codex như thế nào?

Mở **chính thư mục `SDS-docs`** làm thư mục làm việc. Giao việc cho Codex chính; bạn không cần gọi nhiều agent cho một bước phụ thuộc nhau. Hai skill được chọn tự động theo việc hoặc gọi rõ bằng `$ds-conventions` và `$figma-token-workflow` trong Codex CLI/IDE.

| Bạn muốn làm | Hãy yêu cầu Codex | Kết quả cần kiểm tra |
| --- | --- | --- |
| Làm mới Figma | “Dùng `$figma-token-workflow`, đọc lại variables và styles của file trong `ds.config.json`, cập nhật `variable-figma-export/`, báo chênh lệch với bản ngày 02/11/2026.” | Tổng số ID, collection, mode và style; nguồn và ngày lấy dữ liệu. |
| Audit token | “Dùng `$figma-token-workflow` và `$ds-conventions`, audit snapshot, chạy lint, ghi báo cáo vào `docs/_audit/`.” | Lỗi có dẫn token cụ thể; tách lỗi khỏi quyết định chưa chốt. |
| Đề xuất tên | “Dùng `$ds-conventions` đề xuất rename map từ snapshot mới; không áp dụng vào Figma.” | Bảng từ → sang, lý do, trạng thái `proposed` hoặc `needs-decision`. |
| Duyệt và áp dụng | Nêu rõ mã/mục được duyệt, sau đó yêu cầu Codex áp dụng đúng các mục đó và đồng bộ lại. | Alias và binding còn đúng; không có đổi tên ngoài danh sách. |
| Sửa website Introduction | “Cập nhật trang trong `website/src/content/docs/`, giữ đúng phạm vi Introduction và kiểm tra build.” | Nội dung đúng nguồn, có trạng thái; điều hướng và responsive hoạt động. |
| Sinh CSS token hoặc mở rộng component | Giao sau khi dữ liệu và quy ước tương ứng đã chốt. | Mỗi giá trị trong output truy được về snapshot Figma. |

Nếu muốn chia việc song song, có thể yêu cầu Codex dùng agent **`explorer`** cho kiểm kê chỉ đọc và **`worker`** cho một việc triển khai độc lập. Đây là agent dựng sẵn của Codex; dự án hiện **không có custom agent**. Codex chính nên giữ quyết định, tổng hợp kết quả và kiểm tra cuối cùng. Không cần tạo một agent riêng cho mỗi file Markdown.

Chạy kiểm thử script từ `SDS-docs` bằng `node tests/run-tests.mjs` (Node.js 18 trở lên). Chạy `node scripts/ds-tokens.mjs lint variable-figma-export/` để audit tên từ snapshot; lệnh hiện trả mã lỗi khi Figma còn tên chưa đạt quy ước.

## Ví dụ: xử lý một tên token chưa chuẩn

Giả sử snapshot cho thấy tên Figma `color/red light/500`, còn quy ước trong `naming.md` đề xuất `color/red-light/500`:

1. **Tra dữ liệu:** tìm tên hiện tại trong `variables.primitives.json`; đọc ID và giá trị để biết đang xét đúng variable.
2. **Kiểm tra:** `lint` báo tên có khoảng trắng; `suggest` chỉ đưa ra tên đề xuất.
3. **Ghi đề xuất:** xem dòng tương ứng trong `tokens/rename-map.json`, lý do và trạng thái `proposed`.
4. **Bạn duyệt:** chỉ định rõ mục hoặc nhóm tên được phép đổi. Codex chuyển đúng mục đó thành `approved` và áp dụng khi bạn yêu cầu.
5. **Đồng bộ lại:** đọc Figma lần nữa để xác nhận tên mới, ID, alias và binding vẫn đúng; cập nhật snapshot. Sau đó tài liệu/code mới dùng tên đã duyệt.

Hiện lệnh lint đọc 810 mục (690 variables, 77 text và 43 effect styles) và báo 209 lỗi, 314 cảnh báo. Một mục có thể bị báo nhiều lần; kết quả này là danh sách cần phân loại, không phải lệnh tự động sửa 523 token. Paint/grid styles có trong snapshot nhưng chưa được script lint tên.

## Lưu ý về dữ liệu cũ

`tokens/observed/` và `tokens/rename-map.json` được lập từ audit ban đầu nên có thể không khớp collection hoặc tên hiện nay trong Figma. Không tự động áp dụng đổi tên theo các file này. `Prompt Docs VNE` ở thư mục cha chỉ là tài liệu tham khảo về cách tổ chức website và dữ liệu cho AI.

## Script dump và file export khác nhau thế nào?

`scripts/dump-variables.figma.js` và `scripts/dump-styles.figma.js` là **mã để đọc Figma**, không phải dữ liệu đã xuất. Chúng được chạy trong môi trường Figma Plugin API, không chạy trực tiếp bằng `node`. Các file JSON trong `variable-figma-export/` mới là **kết quả đã lưu**. Snapshot hiện tại có đủ 690 variables (giữ ID, tên, collection, mode, giá trị, alias và giá trị đã giải alias) cùng 77 text, 43 effect, 7 paint và 5 grid styles. Script styles mẫu chỉ xuất text/effect; paint/grid trong snapshot hiện tại được đọc bổ sung trực tiếp qua Figma MCP.
