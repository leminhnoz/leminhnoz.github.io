# Lesson Database

Mỗi bài học có thể nằm trong một file JSON riêng.

## Cách thêm hoặc sửa sâu

1. Copy một file trong thư mục này.
2. Đổi `id` trùng với bài trong `js/data.js`.
3. Sửa `concept`, `dryRun`, `code`, `exercises`.
4. Thêm tên file vào `index.json`.
5. Reload trang.

Các field:

- `concept`: Khái niệm và tư duy cốt lõi.
- `author`: Tên người viết hiển thị ở cuối bài; mặc định là `Le Minh` nếu bỏ trống.
- `dryRun`: Chạy tay từng vòng lặp.
- `code`: Code C++ mẫu.
- `exercises`: Mã bài để tự động nối tới Editorial.

Bài chưa có file riêng vẫn dùng dữ liệu fallback trong `js/data.js`, nên có thể tách dần mà không làm hỏng trang.
