# Cách mở và dùng các chat Agent (công cụ nào cũng đọc được)

> Cập nhật: 17/11/2026 · Trạng thái: draft. Nguồn quy tắc vẫn là `AGENTS.md`; vai trò chi tiết ở `agent-core.md` và các file vai trò cùng thư mục.

## 1. Nguyên tắc
- Người dùng chỉ nói chuyện với **Agent Core**. Các chat sub agent chỉ nhận việc từ Agent Core (người dùng dán brief đã xác nhận sang, hoặc Agent Core tự gọi sub agent bằng Agent tool).
- Agent Core không tự làm, không tự kiểm. Việc kiểm do sub agent KHÁC (xem ma trận ở `agent-core.md`).
- Thiết kế SmartAds mới không đồng bộ sang `SDS-docs/website/` trừ khi được giao rõ.

## 2. Bộ chat
| Chat | Vai trò | Skill đọc trước khi làm |
|---|---|---|
| `SDS · Agent Core` | Làm rõ prompt, giao việc, tổng hợp | (không có skill riêng; đọc `agent-core.md`) |
| `SDS · tokens-handler` | Token | `ds-conventions`, `figma-token-workflow`, `sds-spacing-foundation` |
| `SDS · website-builder` | FE website docs | `sds-fe-website-builder` |
| `SDS · ui-qa-auditor` | So Figma với code | `ui-qa-figma-vs-code` |
| `SDS · board-designer` | Dựng board Figma | `sds-ui-ux-board-designer` |
| `SDS · rules-verifier` | Kiểm quy tắc (chỉ đọc) | `ds-conventions` |

Chưa có chat riêng: `components-handler`, `knowledge-keeper`, `ad-format-builder` (gọi qua Agent Core khi cần).

## 3. Mở chat mới trên Claude Code (máy nào cũng làm được)
1. Mở thư mục repo (`SmartAds - SDS/`, hoặc thư mục cha `Docs-SMA-27102026/`).
2. Chạy `claude --agent agent-core` (hoặc mở phiên mới: `.claude/settings.json` đã đặt agent-core mặc định).
3. Với chat sub agent: `claude --agent <tên>` (ví dụ `tokens-handler`).
4. Máy mới: chạy `SDS-docs/docs/_audit/agents/setup-agents.ps1` (thêm `-Parent` nếu mở từ thư mục cha) để tạo lối tắt `.claude/skills` và `.agents/skills`. Lối tắt không nằm trong git; `skills-source/` thì có.

## 4. Dùng với Codex hoặc công cụ khác
Không có `.claude/`? Dán lời mở đầu sau vào chat đầu tiên:

> Đọc `AGENTS.md`, rồi `SDS-docs/docs/_audit/agents/agent-core.md` và `SESSIONS.md`. Bạn là Agent Core: làm rõ prompt, giao việc theo bảng vai trò, giao kiểm cho vai trò khác. Với vai trò X, đọc file `SDS-docs/docs/_audit/agents/<X>.md` và `SKILL.md` ghi trong đó.

Vị trí `SKILL.md`: tất cả nằm trong `skills-source/<tên-skill>/SKILL.md` (nguồn thật duy nhất; `.claude/skills` và `.agents/skills` chỉ là lối tắt tới đó).

## 5. Quy trình một task
1. Người dùng nhắn Agent Core.
2. Agent Core viết lại brief + hỏi xác nhận.
3. Giao sub agent làm (BUILD).
4. Giao sub agent khác kiểm (VERIFY) → PASS/FAIL, tối đa 2 vòng.
5. Agent Core báo kết quả; Knowledge Keeper ghi CHANGELOG nếu có thay đổi.

## 6. Dựng lại bộ chat trên máy mới (AI làm khi người dùng yêu cầu)
Khi người dùng nói "tạo lại bộ chat/agent như máy kia", AI làm theo thứ tự:
1. Đọc `AGENTS.md` → `agent-core.md` → file này. Hiểu: Agent Core là chat duy nhất người dùng nói chuyện; sub agent chỉ nhận brief đã xác nhận; kiểm chéo bằng vai trò khác; không đồng bộ thiết kế mới sang `SDS-docs/website/`.
2. Dựng lối tắt skill: chạy `SDS-docs/docs/_audit/agents/setup-agents.ps1` (thêm `-Parent` nếu mở ở thư mục cha). macOS/Linux: `ln -s` cùng cặp nguồn–đích như trong script.
3. Tạo 6 chat theo bảng §2, mỗi chat một lời mở đầu (cùng khuôn):
   > Bạn là vai trò `<tên>` của SmartAds SDS. Đọc `AGENTS.md`, `SDS-docs/docs/_audit/agents/<tên>.md` (hoặc `.claude/agents/<tên>.md`) và `SKILL.md` của các skill ở bảng §2. Chỉ nhận brief đã xác nhận; Figma chỉ đọc; không bịa giá trị; không commit; không đồng bộ sang website khi chưa được giao. Đọc xong trả lời ngắn là đã sẵn sàng rồi chờ.

   Riêng `SDS · Agent Core`: đọc `agent-core.md` + file này, làm rõ prompt → hỏi xác nhận → giao → giao kiểm chéo. Tên chat: `SDS · <tên vai trò>`.
4. Không tạo chat cho vai trò chưa có trong bảng §2 trừ khi người dùng yêu cầu.
5. Báo lại người dùng: chat nào đã tạo, junction nào thiếu, và ghi một dòng vào `docs/_knowledge/CHANGELOG.md` (§11) nếu repo có thay đổi.

Bộ chat gốc được tạo ngày 17/11/2026 trên máy của người dùng (6 chat như §2). Lịch sử chat không nằm trong repo; chỉ file này và các file vai trò là thứ mang theo.

## 7. Vì sao thấy "trùng" (kiểm ngày 17/11/2026: không có file nào bị chép đôi)
- `Docs-SMA-27102026/.claude/{agents,skills}` là **junction** trỏ về `SmartAds - SDS/.claude/...`: một bản duy nhất, chỉ hiện ở hai chỗ. Sửa một nơi là đổi cả hai.
- `.claude/agents/*.md` (vai trò: AI là ai, làm gì, báo cáo thế nào) khác skill (cách làm: quy trình/kiến thức). Skill thật chỉ ở `skills-source/`; `.claude/skills` (Claude Code) và `.agents/skills` (Codex) là **lối tắt** tới đó, tên bắt buộc theo từng công cụ.
- `.claude/agents/*.md` là vỏ mỏng trỏ về `docs/_audit/agents/*.md` (nguồn); không chép nội dung.
- `skills-source/_packages/sds-ui-ux-board-designer.skill` là gói nén của thư mục cùng tên (giống từng byte khi kiểm); sửa thư mục thì phải đóng gói lại.
- Trùng chức năng đã loại bỏ (17/11/2026): skill `sds-ui-qa-design-auditor` (ngoài repo SDS, không file nào tham chiếu) đã xóa; skill QA UI chính thức là `skills-source/ui-qa-figma-vs-code`.

## 8. Lưu ý
- Lịch sử chat nằm trên từng máy; thứ chuyển được là repo. Trạng thái việc đang làm phải ghi vào `docs/_knowledge/CHANGELOG.md` hoặc file brief, không dựa vào chat.
