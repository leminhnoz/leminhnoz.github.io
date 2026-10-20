---
title: "Testing Markdown and Code Blocks"
description: "Bài viết kiểm thử toàn diện khả năng render cú pháp Markdown, Shiki syntax highlighting, bảng biểu và công thức toán học."
pubDate: "2026-10-16"
tags: ["Markdown", "Testing", "Dev"]
categories: ["Development"]
excerpt: "Kiểm tra hiển thị của tất cả các phần tử nội dung: tiêu đề h1-h4, danh sách, khối code đa ngôn ngữ, bảng dữ liệu và trích dẫn."
---

Bài viết này được tạo ra nhằm mục đích kiểm thử hiển thị các thành phần giao diện trong blog Astro.

## 1. Kiểm thử khối mã nguồn (Code Blocks)

Dưới đây là một đoạn mã Python tính dãy Fibonacci bằng kỹ thuật quy hoạch động:

```python
def fibonacci(n: int) -> int:
    """Tính số Fibonacci thứ n sử dụng không gian O(1)."""
    if n <= 0:
        return 0
    elif n == 1:
        return 1
    
    prev, curr = 0, 1
    for _ in range(2, n + 1):
        prev, curr = curr, prev + curr
    return curr

print([fibonacci(i) for i in range(10)])
```

Và đây là một đoạn mã TypeScript minh họa việc quản lý trạng thái:

```typescript
interface ThemeState {
  isDark: boolean;
  accentColor: string;
}

const defaultTheme: ThemeState = {
  isDark: false,
  accentColor: "#8CCEF0",
};

export function updateAccentColor(state: ThemeState, color: string): ThemeState {
  return { ...state, accentColor: color };
}
```

## 2. Kiểm thử trích dẫn và định dạng văn bản

> Sự đơn giản là điều kiện tiên quyết cho sự tin cậy. Khi hệ thống đơn giản, bạn có thể dễ dàng hiểu rõ nó và dự đoán được hành vi của nó.
> 
> — Edsger W. Dijkstra

Bạn có thể viết chữ **in đậm**, *in nghiêng*, `inline code` hoặc tạo liên kết [Trang chủ Astro](https://astro.build).

## 3. Kiểm thử danh sách và nhiệm vụ

- [x] Cài đặt dependencies với pnpm
- [x] Thiết lập bảng màu pastel light blue
- [x] Cập nhật hiệu ứng pháo hoa ánh sáng
- [ ] Triển khai giai đoạn Cinnamoroll tiếp theo

## 4. Kiểm thử bảng dữ liệu (Table)

| Thuộc tính | Kiểu dữ liệu | Mô tả |
| :--- | :--- | :--- |
| `title` | `string` | Tiêu đề của bài viết |
| `pubDate` | `Date` | Ngày xuất bản chính thức |
| `tags` | `string[]` | Danh sách các nhãn liên quan |
| `categories`| `string[]` | Danh mục bài viết |

## 5. Công thức toán học (KaTeX)

Đẳng thức Euler nổi tiếng:

$$e^{i\pi} + 1 = 0$$

Công thức nhị thức Newton:

$$(a + b)^n = \sum_{k=0}^n \binom{n}{k} a^{n-k} b^k$$
