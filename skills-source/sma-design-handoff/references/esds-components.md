# Thành phần ESDS dùng trong handoff

Nguồn: file **SmartAds - ESDS Specs** (`4EOIROZR50dcaKc3xxZT1Q`), trang `❖ Component` (`1:413`). Xác minh ngày **2026-11-18** (`scripts/verify-esds.js` → ok). Khi nghi lệch hoặc người dùng báo đã sửa component: chạy lại `verify-esds.js` và cập nhật bảng này + `helpers.js` + `verify-esds.js`.

Gọi component theo **key của component set + tên variant** (chạy được ở mọi file đã bật thư viện). ID local chỉ để tham khảo trong file ESDS.

| Dùng cho | Component set | Key | Variant / property |
|---|---|---|---|
| Đầu mỗi trang | **Card spec** | `3cd5e013394c5bb28a1fa65cb8bea1bafaec6c70` | `Status=Pending · In Progress · Handed-off · Approved · …`. Không có text property → sửa text trong layer ("Title spec", "Value"). Badge thiết bị là instance `badge_specDocs` → ẩn cái không áp dụng. Resize rộng được (con tự fill). |
| Nhãn hình / nhóm | **Label spec** (mới) | `b10c30098c271ab7258cb47866aaad9fd57f9d94` | `Level=Item · Group`; property `Title`, `Meta`, `Meta?` |
| Ghi chú | **Note spec** | `0aa030d12537df425fd7745f36e6c3346aecff94` | `Arrow=No Arrow · ↑ Up · → Right · ↓ Down · ← Left` × `State=Default · Error`; property `Title`, `Date`, `Show Username`, `Show Badge` |
| Đánh số phần | **Spec marker** | `20d241e0f6127cc25071f8514d5581bae1767262` | `Direction=Left|Top|Right|Bottom, Type=Tail|Notch`; property `ID` (số). Tail: vòng tròn ở phía `Direction`, đường kéo sang phía đối diện; Notch: ghim trỏ về phía `Direction` |
| Tên phần tử | **Spec layer name** | `42fa2263b3d923b7680863c54801e25138da8a83` | `Type=Frame · Instance · Text · …`; text layer tên `Name` |
| Thuộc tính | **Spec attribute** | `1962dfedb327ceb561bfef2b6235858402a3346b` | `Type=Default · Dependency · Style`; text `Name`, `Value` |
| Số thứ tự | **number-spect-badge** | `aa79bb0252b487086ab2e163a857836d30eed204` | `Size=md (main), Color=Black` (đỏ dành cho số đo) |
| Đường đo + px | **Dimension px** (mới) | `83132110916ccbd2eee8d3b70be36fe160f471ca` | `Direction=Horizontal` (đo rộng, nhãn trên đường) · `Vertical` (đo cao, nhãn bên trái); property `Value`; kéo giãn instance để đổi độ dài |
| Padding / gap | **overlay-gaps-line** | `77296397597a15c8987d161ec5a75cd523276c42` | `Type=Ngang|Dọc, Color=Red|Blue`; Red = padding/margin, Blue = gap; resize tự do |
| Chi tiết token (khi có trang Tokens) | **Spec color token** | `6e1d5241459b8a0610660c9e9fcb929262c83394` | `Type=Light color · Dark color · Type · Line · Size · Space`; property tên có emoji → tìm theo tên (`pk`) |

## Điểm dễ sai (đã gặp)
- **Dimension line** gốc đặt tên ngược: `Dọc` là đường đo **ngang**, `Ngang` là đường đo **dọc**. Dùng **Dimension px** để khỏi nhầm.
- **Note spec:** variant có mũi tên không có property `Title`/`Date` hoạt động → `helpers.js` đặt text trực tiếp. Dấu chấm cuối đường chỉ phải căn bằng `aim()` (đường chỉ dài 180, nằm ở vector `Line`).
- **Success** chưa có state trong Note spec → ghi đè trên Default (viền `border/success`, nền tiêu đề `surface/success-muted`, chữ tiêu đề `text/success-on-surface`). Nếu người dùng thêm `State=Success` → đổi `note()` dùng thẳng.
- **Assigned By** nằm trong component (mặc định `khoava3`); **không** ghi đè.
- Trong frame `1:743` (ESDS) các thành phần xếp bằng auto layout: thêm node phải đặt đúng thứ tự (heading → component set).
- **Publish:** Note spec (State=Error), Label spec, Dimension px phải được publish thư viện ESDS Specs thì mới import được từ file khác (ngày 2026-11-18 các thành phần này chưa publish → `verify-esds.js` ở file khác báo thiếu).

## Token và style dùng cho chrome của spec (Design System)
`surface/neutral-white`, `border/gray-stronger`, `surface/gray` (nền artwork), `text/primary-black`, `text/secondary-black (main)`, `text/gray-on-surface`, `text/danger-on-surface`, `text/success-on-surface`, `border/success`, `surface/success-muted`; text style `Brand/Body-sm/Regular`, `Brand/Body-sm/Semi`, `Brand/Display-sm/Semi`. Key trong `helpers.js` (`VAR_KEYS`, `STYLE_KEYS`).
