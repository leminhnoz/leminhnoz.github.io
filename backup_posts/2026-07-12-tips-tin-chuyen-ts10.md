---
title: 'Tips: Tin chuyên TS10'
description: "Một checklist ngắn cho Tin chuyên TS10: chiến thuật làm bài, lưu ý C++14, Pascal và các lỗi thường gặp."
pubDate: "2023-01-01"
categories: ["TS10"]
tags: ["TS10", "Tips", "Competitive Programming"]
excerpt: "Một checklist ngắn cho Tin chuyên TS10: chiến thuật làm bài, lưu ý C++14, Pascal và các lỗi thường gặp."
author: "Võ Khắc Triệu (DeMen100ns)"
---

# Tips: Tin chuyên TS10

## 1. Lời khuyên chung

- Đọc kỹ đề. Đọc kỹ đề. Đọc kỹ đề.
- **Quan trọng**: Vét cạn mọi bài có thể trước khi cài thuật chuẩn (Trust me bro, tips chiến thắng mọi thứ).
- Stress code: https://vnoi.info/wiki/algo/skill/viet-trinh-cham.md.
- Common mistake: https://codeforces.com/blog/entry/111217.

## 2. C++

- Chỉ dùng những gì được dùng trong **C++14**.
- Đôi khi máy các bạn thi setup là **C++98**, bạn có thể chỉnh lại compiler theo ý muốn của mình. Ví dụ trên Codeblock: Setting -> Compiler -> Bấm vào ver C++ bạn muốn dùng (ở đay nên là **C++11**/**C++14**).
- Luôn dùng '\n' thay vì endl (trừ khi đề yêu cầu).
- Dùng fastio (`scanf, printf` hoặc `ios_base::sync_with_stdio(0); cin.tie(0);`).
- Don't use rand(), use mt19937(C++): https://codeforces.com/blog/entry/61587
- Không dùng pragma.
- Không dùng policy based data structures (ordered_set, gp_hash_table, ...).

## 3. Pascal

- Nếu dùng quicksort thì chọn pivot random, còn không thì dùng các loại sort khác (mergesort, radixsort).

Chúc các bạn có một kỳ thi thật tốt. Mình chờ các bạn ở PTNK ^^.
