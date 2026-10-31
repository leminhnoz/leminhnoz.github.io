---
title: "Chuyên đề Đại số Olympic: Kỹ Thuật Nâng Cao Giải Phương Trình Hàm IMO"
description: "Làm chủ các bài toán Phương trình hàm đỉnh cao IMO — Khai thác tính đơn ánh, toàn ánh, song ánh, kỹ thuật điểm bất động, phương trình hàm tự lồng f(f(x)) và phương trình hàm rời rạc trên Z."
pubDate: "2026-03-10"
tags: ["Toán học", "Đại số", "Olympic", "VMO", "IMO", "Functional Equations", "Bijectivity", "Fixed Points"]
categories: ["Toán học Olympic"]
excerpt: "Phương trình hàm IMO là một bài kiểm tra sắc bén về tư duy logic thuần khiết, nơi việc khám phá các tính chất ánh xạ và điểm bất động sẽ bẻ gãy cấu trúc bí ẩn của hàm số."
---

> *"Giải một phương trình hàm Olympic giống như gỡ một quả bom hẹn giờ: bạn không được phép đoán mò, mỗi phép thế biến phải bóc tách chính xác từng lớp vỏ bọc ánh xạ."*

Trong kỳ thi Olympic Toán học Quốc tế (IMO), **Phương trình hàm (Functional Equations - FE)** thường xuyên xuất hiện ở các vị trí chiến lược (Bài 1 hoặc Bài 5). Khác với các phương trình Cauchy cơ bản có sẵn điều kiện liên tục, phương trình hàm IMO đòi hỏi việc tự trích xuất các tính chất topo và ánh xạ nội tại: **Đơn ánh, Toàn ánh, Điểm bất động** và xử lý hàm tự lồng $f(f(x))$.

---

## 1. Khai Thác Các Tính Chất Ánh Xạ

### 1. Tính Đơn Ánh (Injectivity)
Ánh xạ $f: S \to S$ được gọi là **đơn ánh** nếu:
$$f(a) = f(b) \implies a = b$$
**Giá trị thực chiến:** Nếu $f$ là đơn ánh, ta có thể "khử" lớp hàm $f$ ở ngoài cùng hai vế:
$$f(A) = f(B) \implies A = B$$

*Dấu hiệu nhận biết đơn ánh:*
Biểu thức có dạng $f(f(x) + g(y)) = x + h(y)$.
Nếu $f(a) = f(b)$, cho $x = a$ và $x = b$, vế trái bằng nhau dẫn tới $a + h(y) = b + h(y) \implies a = b$.

---

### 2. Tính Toàn Ánh (Surjectivity)
Ánh xạ $f: S \to S$ được gọi là **toàn ánh** nếu với mọi $y \in S$, luôn tồn tại $x \in S$ sao cho $f(x) = y$.
**Giá trị thực chiến:**
- Luôn tồn tại điểm triệt tiêu $x_0$ sao cho $f(x_0) = 0$.
- Có thể thay một biến tự do $t$ bằng $f(u)$ để đơn giản hóa các biểu thức tự lồng.

*Dấu hiệu nhận biết toàn ánh:*
Biểu thức có một biến đứng độc lập bên ngoài hàm ở một vế, ví dụ $f(A(x, y)) = f(B(x, y)) + y$. Khi $y$ chạy trên toàn miền xác định, vế phải vét cạn toàn bộ tập số, suy ra $f$ toàn ánh.

---

### 3. Tính Song Ánh (Bijectivity)
Một hàm vừa đơn ánh vừa toàn ánh là một **song ánh**. Song ánh cho phép đổi biến tự do $y = f(t)$ và bảo toàn cấu trúc đại số.

---

## 2. Kỹ Thuật Điểm Bất Động & Điểm Triệt Tiêu

### Điểm triệt tiêu $f(x_0) = 0$
Điểm $x_0$ thỏa mãn $f(x_0) = 0$ là chiếc đòn bẩy cực mạnh. Thế $x = x_0$ thường làm biến mất hàng loạt số hạng phức tạp, từ đó xác định giá trị của $f(0)$ hoặc rút ra dạng tuyến tính $f(x) = cx$.

### Điểm bất động (Fixed Point)
Điểm $c$ thỏa mãn $f(c) = c$.
Nếu hàm số thỏa mãn $f(f(x)) = x$ (hàm tự đối hợp - involution), đồ thị của $f$ đối xứng qua đường phân giác $y = x$.

---

## 3. Bài toán Olympic chọn lọc & Lời giải đỉnh cao

### Bài toán 1 (IMO 2019 Problem 1)
> **Đề bài:** Tìm tất cả các hàm số $f: \mathbb{Z} \to \mathbb{Z}$ thỏa mãn phương trình:
> $$f(2a) + 2f(b) = f(f(a + b)) \quad (\forall a, b \in \mathbb{Z})$$

**Lời giải chi tiết:**
Ký hiệu $P(a, b)$ là phép thế cặp $(a, b)$ vào phương trình ban đầu.
- $P(0, 0) \implies f(0) + 2f(0) = f(f(0)) \implies f(f(0)) = 3f(0)$.
- Xét $P(0, b) \implies f(0) + 2f(b) = f(f(b))$.
  Đặt $c = f(0)$. Khi đó với mọi $b \in \mathbb{Z}$:
  $$f(f(b)) = 2f(b) + c \quad \text{(*)}$$
- Thay (*) vào phương trình ban đầu:
  $$f(2a) + 2f(b) = 2f(a + b) + c \quad (\forall a, b \in \mathbb{Z})$$
- Đặt $b = 0$:
  $$f(2a) + 2f(0) = 2f(a) + c \implies f(2a) = 2f(a) - c$$
- Thay ngược biểu thức $f(2a)$ vào phương trình trên:
  $$(2f(a) - c) + 2f(b) = 2f(a + b) + c$$
  $$\iff 2f(a) + 2f(b) = 2f(a + b) + 2c \iff f(a + b) = f(a) + f(b) - c$$
- Đặt hàm phụ $g(x) = f(x) - c$. Khi đó:
  $$g(a + b) + c = (g(a) + c) + (g(b) + c) - c \iff g(a + b) = g(a) + g(b)$$
  Đây chính là **phương trình hàm cộng tính Cauchy trên $\mathbb{Z}$**.
  Do đó, tồn tại hằng số nguyên $k$ sao cho:
  $$g(x) = k \cdot x \implies f(x) = k \cdot x + c$$
- Bây giờ ta kiểm tra lại vào hệ thức (*): $f(f(x)) = 2f(x) + c$:
  Vế trái:
  $$f(f(x)) = f(kx + c) = k(kx + c) + c = k^2 x + kc + c$$
  Vế phải:
  $$2f(x) + c = 2(kx + c) + c = 2kx + 3c$$
  Đồng nhất hệ số với mọi $x \in \mathbb{Z}$:
  $$\begin{cases} k^2 = 2k \\ kc + c = 3c \end{cases} \iff \begin{cases} k(k - 2) = 0 \\ c(k - 2) = 0 \end{cases}$$
  - **Khả năng 1:** $k = 2$.
    Khi đó phương trình thứ hai $c(2 - 2) = 0$ luôn đúng với mọi số nguyên $c$.
    Ta thu được họ nghiệm: $f(x) = 2x + c$ với $c \in \mathbb{Z}$ tùy ý.
  - **Khả năng 2:** $k = 0$.
    Khi đó phương trình thứ hai cho $c(0 - 2) = 0 \implies -2c = 0 \implies c = 0$.
    Ta thu được nghiệm: $f(x) = 0 \cdot x + 0 = 0$ với mọi $x \in \mathbb{Z}$.

**Thử lại:**
- Với $f(x) = 0$: Vế trái $0 + 0 = 0$, vế phải $f(0) = 0$ (thỏa mãn).
- Với $f(x) = 2x + c$:
  $$VT = f(2a) + 2f(b) = (4a + c) + 2(2b + c) = 4a + 4b + 3c$$
  $$VP = f(f(a + b)) = f(2(a+b) + c) = 2(2a + 2b + c) + c = 4a + 4b + 3c$$
  Hai vế đồng nhất với mọi $a, b \in \mathbb{Z}$.

**Kết luận:** Tập tất cả các nghiệm là $f(x) = 0$ và $f(x) = 2x + c$ (với $c \in \mathbb{Z}$ tùy ý). $\blacksquare$

---

### Bài toán 2 (Kỹ thuật đối hợp và song ánh)
> **Đề bài:** Tìm tất cả các hàm số $f: \mathbb{R} \to \mathbb{R}$ thỏa mãn:
> $$f(x + f(y)) = f(x) + y \quad (\forall x, y \in \mathbb{R})$$

**Lời giải:**
Ký hiệu $P(x, y)$ là phép thế vào phương trình.
- Vì vế phải chứa $+y$ tự do nên khi cho $x = 0$, $f(f(y)) = f(0) + y$. Khi $y$ chạy trên $\mathbb{R}$, vế phải nhận mọi giá trị thực, do đó $f$ là **toàn ánh**.
- Giả sử $f(y_1) = f(y_2)$.
  Khi đó $f(x) + y_1 = f(x + f(y_1)) = f(x + f(y_2)) = f(x) + y_2 \implies y_1 = y_2$.
  Vậy $f$ là **đơn ánh**.
  Do đó $f$ là một **song ánh**.
- Vì $f$ toàn ánh, tồn tại số thực $c$ sao cho $f(c) = 0$.
  $P(0, c) \implies f(f(c)) = f(0) + c \implies f(0) = f(0) + c \implies c = 0$.
  Vậy $f(0) = 0$.
- Thay $x = 0$: $f(f(y)) = f(0) + y = y$. Vậy $f$ là một ánh xạ tự đối hợp ($f = f^{-1}$).
- Thay $y = 0$: $f(x + f(0)) = f(x) + 0 \implies f(x) = f(x)$ (hiển nhiên).
- Đặt $y = f(t)$. Vì $f$ tự đối hợp nên $f(y) = f(f(t)) = t$.
  Phương trình trở thành:
  $$f(x + t) = f(x) + f(t)$$
  Đây là **phương trình hàm Cauchy**.
  Vì $f(f(y)) = y$ nên $f$ bị chặn một phía (hoặc đơn điệu), từ đó suy ra $f(x) = kx$.
  Thay lại: $f(f(x)) = k^2 x = x \implies k^2 = 1 \implies k = \pm 1$.
  - Nếu $f(x) = x$: $VT = x + y$, $VP = x + y$ (thỏa mãn).
  - Nếu $f(x) = -x$: $VT = f(x - y) = -(x - y) = -x + y$; $VP = -x + y$ (thỏa mãn).
Vậy có hai nghiệm: $f(x) = x$ và $f(x) = -x$. $\blacksquare$

---

## 4. Bài tập rèn luyện

1. **(IMO 2015 P5):** Tìm tất cả các hàm số $f: \mathbb{R} \to \mathbb{R}$ thỏa $f(x + f(x + y)) + f(xy) = x + f(x + y) + yf(x)$.
2. **(VMO):** Tìm tất cả các hàm liên tục $f: \mathbb{R} \to \mathbb{R}$ thỏa mãn $f(x + y) + f(x - y) = 2f(x)\cos y$.
3. **(Bất động điểm):** Cho hàm số $f: \mathbb{R} \to \mathbb{R}$ thỏa $f(f(x)) = x^2 - x + 1$. Chứng minh rằng không tồn tại hàm $f$ như vậy.
