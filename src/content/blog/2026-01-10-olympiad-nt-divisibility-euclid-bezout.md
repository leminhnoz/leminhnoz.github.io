---
title: "Chuyên đề Số học Olympic: Từ Quan hệ chia hết, Thuật toán Euclid đến Bổ đề Bézout & Phương trình Diophantine"
description: "Khảo sát toàn diện nền tảng số học Olympic: Quan hệ chia hết, thuật toán Euclid, chứng minh chặt chẽ Bổ đề Bézout và giải phương trình Diophantine tuyến tính ax + by = c."
pubDate: "2026-01-10"
tags: ["Toán học", "Số học", "Olympic", "VMO", "Bổ đề Bézout", "Diophantine", "Number Theory"]
categories: ["Toán học Olympic"]
excerpt: "Số học bắt đầu từ những phép toán giản dị nhất — phép chia có dư. Nhưng chính từ bổ đề Bézout và thuật toán Euclid, cả một cấu trúc đại số và phương trình nghiệm nguyên mở ra."
---

> *"Số học là bà chúa của Toán học, và lý thuyết số là bà chúa của Số học."* — Carl Friedrich Gauss

Trong các kỳ thi học sinh giỏi quốc gia (VMO) và quốc tế (IMO), các bài toán số học luôn đòi hỏi sự kết hợp giữa tính chặt chẽ của logic hình thức và sự biến đổi đại số khéo léo. Mọi lý thuyết số học hiện đại đều khởi nguồn từ một khái niệm nền tảng: **Phép chia có dư và quan hệ chia hết**.

---

## 1. Định lý phép chia có dư và Quan hệ chia hết

### Định lý (Phép chia Euclid)
Với mọi số nguyên $a$ và số nguyên dương $b$, luôn tồn tại duy nhất một cặp số nguyên $(q, r)$ sao cho:
$$a = b \cdot q + r \quad \text{với} \quad 0 \le r < b$$

Trong đó:
- $q$ được gọi là **thương số** (quotient), ký hiệu $q = \lfloor a/b \rfloor$.
- $r$ được gọi là **số dư** (remainder), ký hiệu $r = a \pmod b$.
- Khi $r = 0$, ta nói $a$ **chia hết** cho $b$, ký hiệu $b \mid a$.

### Các tính chất cơ bản của quan hệ chia hết
1. **Tính bắc cầu:** Nếu $a \mid b$ và $b \mid c$ thì $a \mid c$.
2. **Tính tổ hợp tuyến tính:** Nếu $a \mid b$ và $a \mid c$ thì với mọi số nguyên $x, y$, ta luôn có:
   $$a \mid (b \cdot x + c \cdot y)$$
3. **Tính bị chặn:** Nếu $a \mid b$ và $b \ne 0$ thì $|a| \le |b|$. Tính chất này đặc biệt hữu hiệu để giới hạn miền nghiệm trong các phương trình Diophantine.

---

## 2. Ước chung lớn nhất và Thuật toán Euclid

### Định nghĩa
Cho hai số nguyên $a, b$ không đồng thời bằng $0$. Số nguyên dương $d$ lớn nhất thỏa mãn $d \mid a$ và $d \mid b$ được gọi là **ước chung lớn nhất** của $a$ và $b$, ký hiệu là $\gcd(a, b)$ hoặc đơn giản là $(a, b)$.
Nếu $\gcd(a, b) = 1$, ta nói $a$ và $b$ **nguyên tố cùng nhau**.

### Mệnh đề then chốt của Euclid
Với mọi $a, b \in \mathbb{Z}$ ($b \ne 0$), nếu $a = b \cdot q + r$ thì:
$$\gcd(a, b) = \gcd(b, r) = \gcd(b, a \pmod b)$$

*Chứng minh:*
Đặt $d_1 = \gcd(a, b)$ và $d_2 = \gcd(b, r)$.
- Vì $d_1 \mid a$ và $d_1 \mid b$, nên $d_1 \mid (a - bq) = r$. Do đó $d_1$ là ước chung của $b$ và $r$, suy ra $d_1 \le d_2$.
- Ngược lại, vì $d_2 \mid b$ và $d_2 \mid r$, nên $d_2 \mid (bq + r) = a$. Do đó $d_2$ là ước chung của $a$ và $b$, suy ra $d_2 \le d_1$.
Từ hai điều trên, ta kết luận $d_1 = d_2$. $\blacksquare$

---

## 3. Bổ đề Bézout (Bézout's Identity)

### Định lý
Cho hai số nguyên $a, b$ không đồng thời bằng $0$. Khi đó luôn tồn tại các số nguyên $x, y$ sao cho:
$$a \cdot x + b \cdot y = \gcd(a, b)$$
Hơn nữa, $\gcd(a, b)$ là số nguyên dương nhỏ nhất có thể biểu diễn dưới dạng tổ hợp tuyến tính $ax + by$.

### Chứng minh bằng Nguyên lý Cực hạn
Xét tập hợp tất cả các tổ hợp tuyến tính nguyên dương của $a$ và $b$:
$$S = \{ a u + b v \mid u, v \in \mathbb{Z}, \, a u + b v > 0 \}$$

1. **Tập $S \ne \emptyset$:** Thật vậy, nếu chọn $u = a, v = b$ thì $a^2 + b^2 > 0 \in S$.
2. **Tồn tại phần tử cực tiểu:** Theo nguyên lý sắp thứ tự tốt của tập số tự nhiên $\mathbb{N}^*$, tập $S$ có phần tử nhỏ nhất, đặt là $d = a x_0 + b y_0 \in S$.
3. **Chứng minh $d \mid a$ và $d \mid b$:**
   Thực hiện phép chia $a$ cho $d$: $a = d \cdot q + r$ với $0 \le r < d$.
   Thay $d = a x_0 + b y_0$ vào:
   $$r = a - d \cdot q = a - (a x_0 + b y_0) q = a(1 - q x_0) + b(-q y_0)$$
   Nếu $r > 0$ thì $r \in S$, điều này mâu thuẫn với tính nhỏ nhất của $d$ trong $S$ vì $r < d$. Do đó bắt buộc $r = 0$, nghĩa là $d \mid a$.
   Chứng minh tương tự, ta có $d \mid b$. Vậy $d$ là ước chung của $a$ và $b$.
4. **Chứng minh $d = \gcd(a, b)$:**
   Gọi $g = \gcd(a, b)$. Vì $g \mid a$ và $g \mid b$, nên $g \mid (a x_0 + b y_0) = d \implies g \le d$.
   Mặt khác $d$ là ước chung của $a$ và $b$ nên $d \le g$. Vậy $d = g = \gcd(a, b)$. $\blacksquare$

---

## 4. Phương trình Diophantine tuyến tính $ax + by = c$

### Định lý về điều kiện có nghiệm
Phương trình $a x + b y = c$ ($a, b, c \in \mathbb{Z}$, $a, b \ne 0$) có nghiệm nguyên $(x, y)$ khi và chỉ khi:
$$\gcd(a, b) \mid c$$

### Cấu trúc tập nghiệm tổng quát
Nếu $(x_0, y_0)$ là một nghiệm riêng thỏa mãn $a x_0 + b y_0 = c$, thì toàn bộ tập nghiệm nguyên của phương trình được cho bởi:
$$\begin{cases} x = x_0 + k \cdot \dfrac{b}{\gcd(a, b)} \\ y = y_0 - k \cdot \dfrac{a}{\gcd(a, b)} \end{cases} \quad (k \in \mathbb{Z})$$

---

## 5. Bài toán Olympic thực chiến

### Bài toán 1 (VMO)
Tìm tất cả các số nguyên dương $n$ sao cho phân số sau tối giản với mọi số tự nhiên $k$:
$$P = \frac{n k + 1}{n + 2}$$

**Lời giải:**
Phân số $P$ tối giản với mọi $k$ khi và chỉ khi $\gcd(n k + 1, n + 2) = 1$ với mọi $k \in \mathbb{N}$.
Áp dụng tính chất tổ hợp tuyến tính của ước chung:
Gọi $d = \gcd(n k + 1, n + 2)$. Ta có:
$$d \mid (n + 2) \implies d \mid k(n + 2) = n k + 2k$$
Mặt khác $d \mid (n k + 1)$, suy ra:
$$d \mid [(n k + 2k) - (n k + 1)] = 2k - 1$$
Để $d = 1$ với mọi $k$, ta chọn các giá trị đặc biệt của $k$:
- Với $k = 1$: $d \mid (n + 2)$ và $d \mid (2 \cdot 1 - 1) = 1 \implies d = 1$.
- Để đảm bảo $\gcd(nk+1, n+2) = 1$ với mọi $k$, điều kiện cần và đủ là $\gcd(n, n+2) = \gcd(n, 2) = 1$.
Do đó $n$ phải là một số nguyên dương lẻ.
Thử lại với $n = 2m + 1$, ta có $\gcd((2m+1)k + 1, 2m + 3) = 1$ luôn thỏa mãn với mọi $k$. $\blacksquare$

---

## 6. Lời kết và Bài tập rèn luyện
Bổ đề Bézout và thuật toán Euclid là chiếc chìa khóa đầu tiên mở cánh cửa vào thế giới số học Olympic. Khi đã làm chủ cấu trúc nghiệm của phương trình tuyến tính, bạn sẽ có nền tảng vững vàng để tiến lên **Đồng dư thức và Định lý Fermat**.
