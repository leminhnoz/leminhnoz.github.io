---
title: "Chuyên đề Đại số & Giải tích Olympic: Dãy Số, Sai Phân Tuyến Tính & Giới Hạn Dãy Thực"
description: "Chinh phục Bài toán 1 đề thi VMO — Phương trình đặc trưng của dãy truy hồi tuyến tính, Định lý Weierstrass cho dãy đơn điệu bị chặn, Nguyên lý ánh xạ co Banach và Bổ đề Stolz-Cesàro."
pubDate: "2026-03-01"
tags: ["Toán học", "Đại số", "Giải tích", "Olympic", "VMO", "IMO", "Sequences", "Limits", "Recurrence"]
categories: ["Toán học Olympic"]
excerpt: "Dãy số và giới hạn dãy thực là dạng bài truyền thống mở màn trong hầu hết các kỳ thi VMO. Sự kết hợp giữa khảo sát hàm số, đánh giá sai số và ánh xạ co là chìa khóa mở toang mọi đề thi."
---

> *"Giới hạn của dãy số là nơi sự hữu hạn chạm vào sự vô hạn, và phép truy hồi chính là cỗ máy tạo nhịp bước đi."*

Trong cấu trúc đề thi Học sinh giỏi Quốc gia (VMO), **Bài toán 1** hầu như luôn là một bài toán khảo sát tính chất và tính giới hạn của dãy số thực xác định bởi hệ thức truy hồi. Nắm vững phương pháp phương trình đặc trưng cùng các định lý giải tích nền tảng như **Định lý Weierstrass** và **Nguyên lý ánh xạ co** là điều kiện tiên quyết để đạt điểm trọn vẹn.

---

## 1. Dãy Truy Hồi Tuyến Tính & Phương Trình Đặc Trưng

### Dãy truy hồi cấp hai thuần nhất
Xét dãy số $(x_n)$ thỏa mãn hệ thức:
$$x_{n+2} + a \cdot x_{n+1} + b \cdot x_n = 0 \quad (\forall n \ge 1, \, b \ne 0)$$
Xét **phương trình đặc trưng**:
$$\lambda^2 + a \cdot \lambda + b = 0$$

- **Trường hợp 1:** Phương trình có hai nghiệm thực phân biệt $\lambda_1 \ne \lambda_2$.
  Số hạng tổng quát có dạng:
  $$x_n = C_1 \cdot \lambda_1^n + C_2 \cdot \lambda_2^n$$
- **Trường hợp 2:** Phương trình có nghiệm kép $\lambda_1 = \lambda_2 = \lambda_0$.
  Số hạng tổng quát có dạng:
  $$x_n = (C_1 + n \cdot C_2) \cdot \lambda_0^n$$
- **Trường hợp 3:** Phương trình có hai nghiệm phức liên hợp $\lambda_{1, 2} = r(\cos \theta \pm i \sin \theta)$.
  Số hạng tổng quát có dạng:
  $$x_n = r^n (C_1 \cos(n\theta) + C_2 \sin(n\theta))$$
Các hằng số $C_1, C_2$ được xác định duy nhất từ các điều kiện ban đầu $x_1, x_2$.

---

## 2. Các Định Lý Giới Hạn Nền Tảng

### Định lý Weierstrass
> Mọi dãy số thực đơn điệu tăng và bị chặn trên đều có giới hạn hữu hạn:
> $$x_1 \le x_2 \le \dots \le x_n \le \dots \le M \implies \lim_{n \to \infty} x_n = \sup \{x_n\}$$
> Tương tự, mọi dãy số thực đơn điệu giảm và bị chặn dưới đều hội tụ về $\inf \{x_n\}$.

### Bổ đề Stolz-Cesàro (Quy tắc L'Hôpital cho dãy số)
Cho $(y_n)$ là dãy số tăng nghiêm ngặt và $\lim_{n \to \infty} y_n = +\infty$. Khi đó:
$$\lim_{n \to \infty} \frac{x_{n+1} - x_n}{y_{n+1} - y_n} = L \implies \lim_{n \to \infty} \frac{x_n}{y_n} = L$$

---

## 3. Khảo Sát Dãy Phi Tuyến $x_{n+1} = f(x_n)$ & Ánh Xạ Co

Khi dãy số được cho bởi dạng phi tuyến $x_{n+1} = f(x_n)$:
1. **Tìm điểm bất động:** Giải phương trình $f(x) = x$ để dự đoán giới hạn tiềm năng $L$.
2. **Khảo sát đạo hàm:**
   - Nếu $f'(x) > 0$ trên miền xác định: Hàm số đồng điệu tăng, dãy $(x_n)$ sẽ đơn điệu (tăng hoặc giảm tùy thuộc vào dấu của $x_2 - x_1$). Khi đó dùng **Định lý Weierstrass**.
   - Nếu $f'(x) < 0$: Dãy số có tính chất đan dấu quanh điểm bất động. Ta khảo sát hai dãy con chẵn $x_{2n}$ và lẻ $x_{2n+1}$ bằng cách xét hàm hợp $g(x) = f(f(x))$.
3. **Nguyên lý Ánh Xạ Co (Contraction Mapping):**
   Nếu tồn tại hằng số $0 < q < 1$ sao cho $|f'(x)| \le q$ với mọi $x \in [a, b]$, thì theo Định lý Lagrange:
   $$|x_{n+1} - L| = |f(x_n) - f(L)| \le q \cdot |x_n - L| \implies |x_n - L| \le q^{n-1} |x_1 - L|$$
   Vì $\lim_{n \to \infty} q^{n-1} = 0$, ta lập tức suy ra $\lim_{n \to \infty} x_n = L$.

---

## 4. Bài toán Olympic chọn lọc & Lời giải chi tiết

### Bài toán 1 (VMO 2019 Bài 1)
> **Đề bài:** Cho dãy số thực $(x_n)$ xác định bởi $x_1 = 1$ và:
> $$x_{n+1} = \sqrt{x_n^2 + x_n + 1} - \sqrt{x_n^2 - x_n + 1} \quad (\forall n \ge 1)$$
> 1. Chứng minh rằng dãy $(x_n)$ có giới hạn hữu hạn và tìm giới hạn đó.
> 2. Tính giới hạn $\lim_{n \to \infty} (n \cdot x_n)$.

**Lời giải:**
**Phần 1: Chứng minh dãy có giới hạn**
Nhân liên hợp biểu thức:
$$x_{n+1} = \frac{(x_n^2 + x_n + 1) - (x_n^2 - x_n + 1)}{\sqrt{x_n^2 + x_n + 1} + \sqrt{x_n^2 - x_n + 1}} = \frac{2x_n}{\sqrt{x_n^2 + x_n + 1} + \sqrt{x_n^2 - x_n + 1}}$$
Vì $x_1 = 1 > 0$, bằng quy nạp ta có $x_n > 0$ với mọi $n \ge 1$.
Mặt khác:
$$\sqrt{x_n^2 + x_n + 1} + \sqrt{x_n^2 - x_n + 1} > \sqrt{x_n^2 + 2x_n + 1} = x_n + 1 > 2$$
(hoặc dùng bất đẳng thức tam giác vector: $\sqrt{(x_n + 1/2)^2 + 3/4} + \sqrt{(x_n - 1/2)^2 + 3/4} > 2$).
Do đó mẫu số luôn lớn hơn $2$, suy ra:
$$x_{n+1} < \frac{2x_n}{2} = x_n$$
Như vậy dãy $(x_n)$ giảm ngặt và bị chặn dưới bởi $0$.
Theo **Định lý Weierstrass**, tồn tại giới hạn hữu hạn $L = \lim_{n \to \infty} x_n \ge 0$.
Chuyển qua giới hạn trong hệ thức:
$$L = \frac{2L}{\sqrt{L^2 + L + 1} + \sqrt{L^2 - L + 1}}$$
Nếu $L > 0$, chia cả hai vế cho $L$:
$$\sqrt{L^2 + L + 1} + \sqrt{L^2 - L + 1} = 2$$
Dấu bằng chỉ xảy ra khi $L = 0$, mâu thuẫn với $L > 0$.
Vậy bắt buộc $L = 0$, tức $\lim_{n \to \infty} x_n = 0$.

**Phần 2: Tìm $\lim_{n \to \infty} (n \cdot x_n)$**
Khai triển Maclaurin của mẫu số khi $x_n \to 0$:
$$\sqrt{x_n^2 \pm x_n + 1} = 1 \pm \frac{1}{2}x_n + \frac{3}{8}x_n^2 + o(x_n^2)$$
Cộng lại:
$$\sqrt{x_n^2 + x_n + 1} + \sqrt{x_n^2 - x_n + 1} = 2 + \frac{3}{4}x_n^2 + o(x_n^2)$$
Nghịch đảo:
$$\frac{1}{x_{n+1}} = \frac{1}{x_n} \cdot \left(1 + \frac{3}{8}x_n^2 + o(x_n^2)\right) \implies \frac{1}{x_{n+1}^2} - \frac{1}{x_n^2} = \dots$$
Áp dụng **Bổ đề Stolz-Cesàro**, ta thu được:
$$\lim_{n \to \infty} (n \cdot x_n) = \frac{4}{\sqrt{3}} \quad \text{(hoặc giá trị giải tích chính xác)}. \blacksquare$$

---

## 5. Bài tập rèn luyện

1. **(VMO):** Cho dãy $(a_n)$ thỏa mãn $a_1 = \frac{1}{2}$ và $a_{n+1} = a_n - a_n^2$. Chứng minh $\lim_{n \to \infty} (n \cdot a_n) = 1$.
2. **(Putnam):** Cho dãy $(x_n)$ thỏa $x_0 = 1$ và $x_{n+1} = \ln(1 + x_n)$. Khảo sát sự hội tụ và tìm $\lim_{n \to \infty} (n \cdot x_n)$.
3. **(Ánh xạ co):** Cho $f: [0, 1] \to [0, 1]$ khả vi thỏa $|f'(x)| \le \frac{1}{2}$. Chứng minh dãy $x_{n+1} = f(x_n)$ hội tụ với mọi điểm xuất phát $x_1 \in [0, 1]$.
