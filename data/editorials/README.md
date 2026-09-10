# Editorial Database

Mỗi Editorial là một file JSON riêng trong thư mục này.

## Thêm bài mới

1. Copy một file `cf-*.json`.
2. Đổi tên file, ví dụ `cf-279b-books.json`.
3. Đổi `id` thành `editorial-cf-279b` và giữ `problemCode` trùng mã bài trong `js/data.js`.
4. Điền các phần có comment tương ứng bên dưới.
5. Thêm tên file vào `index.json` trong mảng `files`.
6. Reload trang.

## Các vùng nội dung

- `statement`: Tóm tắt đề bài.
- `sampleInput`, `sampleOutput`: Test mẫu.
- `hint`: Gợi ý, mặc định ẩn; người đọc bấm để hiện.
- `analysis`: Ý tưởng thuật toán và chứng minh ngắn.
- `complexity`: Độ phức tạp, ví dụ `O(N log N)`.
- `dryRun`: Chạy tay từng bước trên test mẫu.
- `code`: Code C++ hoàn chỉnh; mặc định ẩn và có Copy Code.

Tên thuật toán dùng tiếng Anh chuẩn CP, phần giải thích viết tiếng Việt.
