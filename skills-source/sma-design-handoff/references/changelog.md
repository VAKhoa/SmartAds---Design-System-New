# Changelog · sma-design-handoff

Ghi mỗi thay đổi: **ngày · phân loại · lời người dùng (nguyên văn, ngắn) · file đổi · cách kiểm**. Skill sinh từ 7 vòng test với người dùng trên bài chuẩn (`golden-test.md`).

## Khi cần sửa skill (quy trình bắt buộc)
1. **Nhắc lại yêu cầu** 1–2 câu để người dùng sửa sớm; chỉ sửa đúng phạm vi được yêu cầu.
2. **Phân loại** để biết file cần chạm:
   | Loại thay đổi | File |
   |---|---|
   | Quy tắc / "từ nay…" | `SKILL.md` (Quy tắc cứng) + `references/writing-style.md` nếu liên quan giọng/note |
   | Bố cục, khoảng cách, nội dung trang | `scripts/page-0N-*.js` (+ `references/page-templates.md`) |
   | Giọng viết, Do/Don't, REVIEW | `references/writing-style.md` (+ CONFIG mẫu trong script) |
   | Thành phần ESDS đổi (key, variant, property, thêm component) | `references/esds-components.md` + `scripts/helpers.js` (`ESDS`, `note()`…) + `scripts/verify-esds.js` (`EXPECT`) |
   | Thêm loại trang / bỏ trang | script trang mới + bảng trong `SKILL.md` và `page-templates.md` + `finish-check.js` (`order`, `maxPages`) |
   | Kiểm tra cuối | `scripts/finish-check.js` |
3. **Sửa ở nguồn thật:** `skills-source/sma-design-handoff/` (không sửa qua `.claude/skills` hay `.agents/skills`; chúng là lối tắt).
4. **Kiểm cú pháp** script (không cần Figma): ghép `helpers.js` + từng script vào `AsyncFunction` (xem `golden-test.md` hoặc đoạn lệnh trong changelog này: `node` + `new AsyncFunction(code)`).
5. **Chạy lại bài chuẩn** với `prefix:'TST'`, `originX:20000`; chụp ảnh; so với kỳ vọng; xóa Section thử. Nếu sửa ESDS: chạy `verify-esds.js` ở file ESDS và (nếu có thể) ở một file thiết kế.
6. **Ghi changelog** (mục bên dưới) kèm lời người dùng.
7. **Đóng gói lại** `.skill` vào `skills-source/_packages/sma-design-handoff.skill` (zip thư mục skill, đường dẫn dùng `/`) và cập nhật các nơi liệt kê skill nếu tên/vai trò đổi (`skills-source/README.md`, `AGENTS.md`).
8. **Báo cáo ngắn:** đã đổi gì, ở file nào, đã kiểm thế nào, còn gì chưa kiểm.
- Xung đột giữa yêu cầu mới và Quy tắc cứng → hỏi lại, không tự chọn. Không hoàn nguyên quy tắc đã chốt khi chưa được yêu cầu.
- Người dùng chỉ phản hồi bằng "cần chỉnh" mà không nói rõ → hỏi muốn chỉnh phần nào (component, giao diện trang, giọng viết, quy tắc/phạm vi) trước khi sửa.
- Lệnh kiểm cú pháp (từ thư mục `scripts/`):
  ```bash
  node -e "const fs=require('fs');const AF=Object.getPrototypeOf(async function(){}).constructor;const h=fs.readFileSync('helpers.js','utf8');for(const f of ['page-01-anatomy-layout.js','page-02-variants-states.js','page-03-interaction-dodont.js','review-section.js','finish-check.js']){new AF(h+'\n'+fs.readFileSync(f,'utf8'));console.log('OK',f)}new AF(fs.readFileSync('verify-esds.js','utf8'));console.log('OK verify-esds.js')"
  ```

## Lịch sử
### 2026-11-19 — v1.1 (liên kết repo SDS)
- Phân loại: tham chiếu / vị trí file (không đổi quy tắc cứng, không đổi script).
- Lời người dùng: "Bạn đã link skill này và điều chỉnh phù hợp để các file có thể gọi tới chưa với @SDS-docs/ và @SDS-workspace/ chưa hãy xử lý".
- File đổi: `SKILL.md` (thêm mục "Trong repo SDS": `ds.config.json`, `SDS-CONTEXT.md`, `variable-figma-export/`, `FIGMA-CHANGELOG.md`, `css-name.mjs`, thư mục task `SDS-workspace/ui-builds/`, vai trò `.claude/agents/design-handoff.md`; ranh giới website/SDS-docs. Mô tả: tên skill liên quan đổi sang tên trong repo `sds-ui-ux-board-designer`, `ui-qa-figma-vs-code`). Đóng gói lại `_packages/sma-design-handoff.skill`.
- Bổ sung cùng ngày: vai trò trỏ về file vai trò `SDS-docs/docs/_audit/agents/design-handoff.md` (vỏ Claude Code vẫn ở `.claude/agents/`).
- Kiểm: mọi đường dẫn mới tồn tại; lệnh kiểm cú pháp script ở trên chạy OK (script không đổi). Chưa chạy lại bài chuẩn trong Figma (không cần: không đổi script/quy tắc).

### 2026-11-18 — v1.0 (tạo skill)
Tổng hợp từ 7 vòng thử với người dùng. Quyết định chính (lời người dùng, rút gọn):
- Vòng 1–2: handoff dùng đúng bộ ESDS; Card spec đầu mỗi thành phần; Spec element/attribute/color token; Note spec; hỏi rõ SPEC / UI / cả hai.
- Vòng 3: "Bỏ Accessibility & Acceptance, Content & Copy, Developer notes, Overview trừ khi được yêu cầu"; state không tách riêng, chỉ copy phần cần (vd chỉ ô search); bảng làm lại có viền; Card spec kéo dài; note vừa phải, đặt gần thành phần.
- Vòng 4: Note DON'T dùng đỏ; chữ Note spec lớn hơn; note dễ hiểu cho Product + Dev; gộp Layout vào Anatomy; **Dimension px** (nhãn đỏ) tạo trong ESDS; tối đa 3–4 trang, giảm bảng.
- Vòng 5: **Label spec** (cấp thấp hơn Card spec) cho mọi hình/nhóm; không spec thanh cuộn; lỗi tách khỏi spec sang một note REVIEW gom nhóm; giọng Product Designer khẳng định, bỏ "Thấy trong Figma/Chưa rõ"; Note spec thêm State=Error.
- Vòng 6: **Do/Don't** cho các trường hợp quan trọng (Do = Note xanh Success, Don't = đỏ); **Assigned By giữ giá trị gốc `khoava3` từ nay về sau**; **Posted on có giờ** (`HH:mm - MMM D, YYYY`).
- Kỹ thuật: gọi component theo key + tên variant (chạy được ở file ngoài ESDS); `aim()` căn dấu chấm note mũi tên; `finish-check.js` xếp lại + kiểm tra; `verify-esds.js` phát hiện lệch.
- Ghi chú vận hành: sau khi tạo, Note spec (State=Error), Label spec, Dimension px **chưa publish** thư viện ESDS → file ngoài ESDS chưa import được cho tới khi người dùng publish.
