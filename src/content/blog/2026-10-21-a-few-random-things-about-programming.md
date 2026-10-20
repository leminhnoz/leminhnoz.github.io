---
title: "A Few Random Things About Programming"
description: "Một vài suy nghĩ và kinh nghiệm ngẫu nhiên tích lũy được trong quá trình học lập trình và giải quyết bài toán."
pubDate: "2026-10-21"
tags: ["Programming", "Thoughts", "Engineering"]
categories: ["Technology"]
excerpt: "Một vài quan sát thú vị về việc viết mã, tư duy thuật toán và sự khác biệt giữa code chạy được với code dễ bảo trì."
---

Lập trình là một hành trình thú vị nơi chúng ta liên tục chuyển đổi ý tưởng trừu tượng thành những dòng lệnh có thể thực thi. Dưới đây là một vài suy nghĩ và bài học nhỏ được đúc kết lại.

## 1. Đọc code nhiều hơn viết code

Phần lớn thời gian của một lập trình viên thực ra không phải là gõ phím liên tục, mà là đọc hiểu những gì đã tồn tại:

- Đọc tài liệu API và các thư viện mã nguồn mở.
- Tìm hiểu luồng hoạt động của hệ thống hiện tại.
- Đọc lại code của chính mình từ 3 tháng trước để nhận ra mình đã tiến bộ (hoặc tự hỏi tại sao ngày xưa lại viết như vậy).

Khi viết code rõ ràng và đặt tên biến có ý nghĩa, bạn đang gửi một món quà tri ân tới chính bản thân trong tương lai.

## 2. Sự cân bằng giữa tốc độ và độ bền vững

Một giải pháp tạm thời thường có xu hướng trở thành giải pháp vĩnh viễn nếu không được refactor kịp thời. Hãy luôn đặt câu hỏi:

> "Nếu hệ thống này cần mở rộng thêm 5 tính năng nữa vào tuần tới, kiến trúc hiện tại có đáp ứng được không?"

Tất nhiên, đừng rơi vào bẫy **over-engineering** quá sớm. Viết code vừa đủ đơn giản để giải quyết vấn đề trước mắt, nhưng đủ tách bạch để thay thế khi cần.

```typescript
// Một ví dụ nhỏ về tính rõ ràng
function calculateProcessingTime(startTimeMs: number): string {
  const elapsed = Date.now() - startTimeMs;
  return `${elapsed} ms`;
}
```

Chúc các bạn có những giờ phút coding hiệu quả và nhiều niềm vui!
