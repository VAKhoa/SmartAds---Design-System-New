# UX Checklist cho SmartAds (adtech self-serve)

Dùng ở Bước 2. Chỉ lấy mục áp dụng; không điền cho đủ.

## A. Hiểu bài toán
- Người dùng là ai (advertiser, agency, publisher, admin)? Tần suất dùng, mức hiểu biết adtech?
- Việc họ cần hoàn thành (job-to-be-done) và tín hiệu thành công (ít bước hơn, ít lỗi hơn, quyết định nhanh hơn)?
- Rủi ro khi sai: tốn tiền (ngân sách, bid), hiển thị sai, mất dữ liệu → cần xác nhận/undo ở đâu?

## B. Flow & cấu trúc thông tin
- Điểm vào (menu, deep link, CTA) và điểm ra; có quay lại được không, có lưu nháp không?
- Chia bước hợp lý (wizard) hay một trang? Tiến độ có hiển thị không?
- Thông tin chính/phụ: cái gì phải thấy ngay, cái gì ẩn trong chi tiết/drawer?
- Quyền hạn & vai trò: người xem chỉ-đọc thấy gì?

## C. Mẫu thường gặp (ưu tiên pattern SDS có sẵn)
- **Danh sách/bảng dữ liệu**: cột quan trọng bên trái, số liệu căn phải, sắp xếp, filter, chọn cột, chọn nhiều + hành động hàng loạt, phân trang/cuộn, dòng tổng.
- **Biểu đồ/báo cáo**: chọn khoảng ngày + so sánh, chú giải, tooltip, trạng thái dữ liệu trống/đang cập nhật, xuất file.
- **Form tạo/sửa**: nhóm theo nghĩa, validation inline, mặc định hợp lý, tóm tắt trước khi gửi, lỗi chỉ rõ cách sửa.
- **Xác nhận hành động nguy hiểm**: nêu hậu quả cụ thể, nút phá hủy tách biệt, có đường hủy.

## D. Ma trận trạng thái (mỗi vùng dữ liệu/tương tác)
default · loading (skeleton/spinner) · empty (lần đầu / sau lọc) · error (mạng / quyền / validation) · success · disabled · partial · nội dung dài/tràn · hover/focus/pressed (nếu thiết kế có).

## E. Copy & nhãn
- Nhãn động từ + đối tượng ("Tạo chiến dịch", không "Submit"); cùng thuật ngữ với glossary SDS.
- Thông báo lỗi: chuyện gì xảy ra + cách khắc phục. Không đổ lỗi người dùng.
- Số, tiền, ngày: định dạng theo ngôn ngữ brief, nhất quán toàn board.

## F. Responsive & truy cập
- Desktop/tablet/mobile: cái gì thu gọn, cái gì chuyển drawer/stack? Bảng ở mobile xử lý thế nào?
- Tương phản, vùng chạm, thứ tự tab, nhãn cho icon-only, không chỉ dùng màu để báo trạng thái.
