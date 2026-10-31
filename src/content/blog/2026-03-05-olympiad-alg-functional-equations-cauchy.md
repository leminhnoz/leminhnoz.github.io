---
title: "Chuyên đề Phương trình hàm Olympic: Phương trình Cauchy, Jensen và Kỹ thuật mở rộng tập xác định"
description: "Khảo sát toàn diện phương trình hàm Cauchy f(x+y) = f(x) + f(y) qua các tập số N -> Z -> Q -> R, các điều kiện đủ đảm bảo tính tuyến tính (liên tục, đơn điệu, bị chặn) và phương trình hàm Jensen."
pubDate: "2026-03-05"
tags: ["Toán học", "Đại số", "Olympic", "VMO", "IMO", "Phương trình hàm", "Cauchy"]
categories: ["Toán học Olympic"]
excerpt: "Phương trình hàm là một trong những phân môn trừu tượng nhất của Toán Olympic. Và mọi kỹ năng giải phương trình hàm đều bắt đầu từ một định lý nền tảng: Phương trình hàm Cauchy."
---

> *"Giải một phương trình hàm không phải là tìm một con số x, mà là tìm ra toàn bộ quy luật biến đổi f(x) thỏa mãn một mạng lưới các mối quan hệ logic ràng buộc."*

Trong các đề thi VMO, TST và IMO, bài toán phương trình hàm (Functional Equations) thường chiếm trọn một câu lớn. Để giải quyết được các bài toán hiện đại, người học phải hiểu sâu sắc xuất phát điểm của toàn bộ lý thuyết: **Phương trình hàm cộng tính Cauchy**.

---

## 1. Phương trình hàm Cauchy dạng cộng tính

### Bài toán
Tìm tất cả các hàm số $f: \mathbb{R} \to \mathbb{R}$ thỏa mãn:
$$f(x + y) = f(x) + f(y) \quad \forall x, y \in \mathbb{R} \tag{C}$$

Phương trình $(C)$ được gọi là **phương trình hàm Cauchy**.

---

## 2. Quá trình mở rộng tập xác định: $\mathbb{N} \to \mathbb{Z} \to \mathbb{Q}$

Nghiệm của $(C)$ trên tập số hữu tỉ $\mathbb{Q}$ hoàn toàn được xác định mà không cần thêm bất kỳ giả thiết nào về tính chất của hàm số.

### Bước 1: Xét trên tập số tự nhiên $\mathbb{N}$
1. Thay $x = y = 0$ vào $(C)$:
   $$f(0 + 0) = f(0) + f(0) \implies f(0) = 0$$
2. Thay $y = x$: $f(2x) = 2f(x)$.
3. Bằng quy nạp toán học theo $n \in \mathbb{N}^*$:
   $$f(n \cdot x) = n \cdot f(x) \quad \forall x \in \mathbb{R}$$
   Đặc biệt, chọn $x = 1$ và đặt $c = f(1)$, ta có:
   $$f(n) = c \cdot n \quad \forall n \in \mathbb{N}$$

### Bước 2: Mở rộng lên tập số nguyên $\mathbb{Z}$
Thay $y = -x$ vào $(C)$:
$$f(x + (-x)) = f(x) + f(-x) \implies f(0) = f(x) + f(-x) \implies f(-x) = -f(x)$$
Điều này chứng minh $f$ là **hàm số lẻ**.
Với $n$ nguyên âm, đặt $n = -k$ ($k \in \mathbb{N}^*$):
$$f(n) = f(-k) = -f(k) = -c \cdot k = c \cdot (-k) = c \cdot n$$
Vậy $f(n) = c \cdot n$ đúng với mọi $n \in \mathbb{Z}$.

### Bước 3: Mở rộng lên tập số hữu tỉ $\mathbb{Q}$
Cho $r = \frac{p}{q} \in \mathbb{Q}$ ($p \in \mathbb{Z}, q \in \mathbb{N}^*$).
Theo tính chất ở Bước 1:
$$f(p) = f\left( q \cdot \frac{p}{q} \right) = q \cdot f\left( \frac{p}{q} \right)$$
Mặt khác theo Bước 2, $f(p) = c \cdot p$. Do đó:
$$q \cdot f\left( \frac{p}{q} \right) = c \cdot p \implies f\left( \frac{p}{q} \right) = c \cdot \frac{p}{q}$$
Hay nói cách khác:
$$f(r) = c \cdot r \quad \forall r \in \mathbb{Q}$$

---

## 3. Bước nhảy vọt từ $\mathbb{Q}$ lên $\mathbb{R}$

Tập hữu tỉ $\mathbb{Q}$ là một tập trù mật trong $\mathbb{R}$, nghĩa là mọi số thực đều là giới hạn của một dãy số hữu tỉ. Tuy nhiên, nếu **không có thêm điều kiện giải tích**, phương trình Cauchy tồn tại vô số nghiệm "quái vật" không liên tục (dựa trên cơ sở Hamel và Tiên đề chọn).

Để khẳng định nghiệm duy nhất $f(x) = cx$ trên $\mathbb{R}$, ta cần một trong các điều kiện đủ sau:

### Điều kiện 1: Hàm số $f$ liên tục tại ít nhất một điểm
**Định lý:** Nếu $f$ thỏa mãn $(C)$ và $f$ liên tục tại một điểm $x_0 \in \mathbb{R}$, thì $f(x) = cx$ với mọi $x \in \mathbb{R}$.

*Chứng minh:*
Lấy dãy số hữu tỉ $(r_n)$ sao cho $\lim_{n \to \infty} r_n = x$.
Do tính liên tục và tính cộng tính:
$$f(x) = \lim_{n \to \infty} f(r_n) = \lim_{n \to \infty} (c \cdot r_n) = c \cdot x \quad \blacksquare$$

### Điều kiện 2: Hàm số $f$ đơn điệu
**Định lý:** Nếu $f$ thỏa mãn $(C)$ và $f$ đơn điệu (tăng hoặc giảm) trên $\mathbb{R}$, thì $f(x) = cx$.

*Chứng minh:*
Giả sử $f$ tăng. Với mọi số thực $x$, luôn tồn tại hai dãy số hữu tỉ $(r_n)$ và $(s_n)$ sao cho $r_n \le x \le s_n$ và $\lim r_n = \lim s_n = x$.
Vì $f$ tăng và $f(r) = cr$ trên $\mathbb{Q}$:
$$c \cdot r_n = f(r_n) \le f(x) \le f(s_n) = c \cdot s_n$$
Cho $n \to \infty$, theo định lý kẹp ta có $c \cdot x \le f(x) \le c \cdot x \implies f(x) = cx$. $\blacksquare$

### Điều kiện 3: Hàm số $f$ bị chặn một phía trên một khoảng
Nếu tồn tại một khoảng mở $(a, b)$ sao cho $f(x) \ge 0$ (hoặc $f(x) \le M$) với mọi $x \in (a, b)$, thì $f(x) = cx$.

---

## 4. Các biến thể kinh điển của Phương trình Cauchy

Bằng các phép đổi biến thích hợp ($x = e^u, f(x) = e^{g(u)}$), các phương trình sau đều quy về phương trình Cauchy:

1. **Phương trình Cauchy nhân tính:**
   $$f(x + y) = f(x) \cdot f(y) \implies f(x) = a^x \quad (a > 0)$$
2. **Phương trình Cauchy logarit:**
   $$f(x \cdot y) = f(x) + f(y) \quad (x, y > 0) \implies f(x) = c \cdot \ln(x)$$
3. **Phương trình Cauchy lũy thừa:**
   $$f(x \cdot y) = f(x) \cdot f(y) \quad (x, y > 0) \implies f(x) = x^k$$

---

## 5. Phương trình hàm Jensen

### Định nghĩa
Phương trình hàm có dạng:
$$f\left(\frac{x + y}{2}\right) = \frac{f(x) + f(y)}{2} \quad \forall x, y \in \mathbb{R} \tag{J}$$

### Cách giải
Đặt $g(x) = f(x) - f(0)$.
Thay vào $(J)$:
$$g\left(\frac{x+y}{2}\right) = \frac{g(x)+g(y)}{2}$$
Với $y = 0$, do $g(0) = 0$, ta có:
$$g\left(\frac{x}{2}\right) = \frac{g(x)}{2} \implies g(x + y) = 2 g\left(\frac{x+y}{2}\right) = g(x) + g(y)$$
Như vậy $g$ chính là hàm cộng tính Cauchy!
Suy ra $g(x) = cx$, do đó nghiệm tổng quát của phương trình Jensen là:
$$f(x) = c \cdot x + b$$

---

## 6. Tổng kết
Phương trình Cauchy là "mẫu DNA" của toàn bộ thế giới phương trình hàm. Nắm vững kỹ thuật mở rộng tập xác định từ $\mathbb{N} \to \mathbb{Z} \to \mathbb{Q} \to \mathbb{R}$ là tiền đề bắt buộc trước khi bước vào các kỹ thuật song ánh và phương trình hàm tự lồng phức tạp của đề thi IMO.
