---
title: "A Tiny Guide to Organizing Code"
description: "Một hướng dẫn ngắn gọn giúp bạn sắp xếp cấu trúc thư mục, đặt tên module và giữ codebase luôn sạch đẹp."
pubDate: "2025-03-24"
tags: ["Coding", "Architecture", "CleanCode"]
categories: ["Guide"]
excerpt: "Quy tắc cấu trúc dự án từ mức tổng quan đến chi tiết, giúp đội ngũ làm việc ăn ý và giảm thiểu nợ kỹ thuật."
---

Một dự án phần mềm có cấu trúc tốt sẽ giúp lập trình viên mới làm quen nhanh chóng và giảm bớt căng thẳng khi bảo trì code sau này.

## Quy tắc gom nhóm theo tính năng (Feature-based)

Khi dự án lớn lên, thay vì gom tất cả components vào một thư mục và tất cả services vào một thư mục khác, hãy cân nhắc gom nhóm theo ngữ cảnh nghiệp vụ:

- `src/features/auth/`
  - `components/`
  - `hooks/`
  - `authService.ts`
- `src/features/blog/`
  - `components/`
  - `utils/`

## Tách biệt ranh giới trách nhiệm (Separation of Concerns)

Một hàm hoặc module chỉ nên làm một việc duy nhất và làm nó thật tốt (Single Responsibility Principle).

```javascript
// Thay vì nhồi nhét cả kiểm tra logic lẫn gọi mạng vào một nơi:
async function submitUserForm(formData) {
  validateFormData(formData);
  return await postUserData(formData);
}
```

Việc phân tách này giúp bạn viết unit test dễ dàng hơn rất nhiều.
