---
title: "Chuyên đề Đại số Olympic: Đa Thức Cơ Bản, Phép Chia Có Dư & Hệ Thức Viète"
description: "Nền tảng Đại số Olympic — Phép chia có dư Euclid, Định lý Bézout, Hệ thức Viète bậc n, Công thức tổng lũy thừa Newton và ứng dụng giải hệ phương trình đối xứng trong VMO & USAMO."
pubDate: "2026-02-20"
tags: ["Toán học", "Đại số", "Olympic", "VMO", "IMO", "Polynomials", "Vieta", "Newton Sums"]
categories: ["Toán học Olympic"]
excerpt: "Đa thức là ngôn ngữ cốt lõi của đại số. Nắm vững mối liên hệ giữa các nghiệm và hệ số qua hệ thức Viète và công thức Newton mở đường cho việc giải quyết các bài toán đại số hóc búa nhất."
---

> *"Nghiệm của đa thức chứa đựng toàn bộ cấu trúc của nó, và hệ thức Viète chính là cây cầu nối liền thế giới nghiệm với thế giới hệ số."*

Trong các đề thi học sinh giỏi các cấp từ cấp Tỉnh đến VMO và IMO, **Đa thức** luôn chiếm vị trí trọng yếu. Bài viết này xây dựng nền tảng lý thuyết đại số chuẩn mực: từ thuật toán chia có dư, định lý Bézout, hệ thức Viète tổng quát bậc $n$ đến công thức tổng lũy thừa Newton (Newton's Sums).

---

## 1. Phép Chia Có Dư & Định Lý Bézout

### Định lý về Phép chia có dư
Cho $A(x), B(x) \in \mathbb{R}[x]$ với $B(x) \ne 0$. Khi đó tồn tại duy nhất cặp đa thức thương $Q(x)$ và đa thức dư $R(x)$ sao cho:
$$A(x) = B(x) \cdot Q(x) + R(x)$$
trong đó hoặc $R(x) \equiv 0$, hoặc $\deg R(x) < \deg B(x)$.

### Định lý Bézout
> Số dư trong phép chia đa thức $P(x)$ cho nhị thức $x - c$ đúng bằng giá trị $P(c)$.
> $$P(x) = (x - c) Q(x) + P(c)$$
> Do đó, $c$ là một nghiệm của $P(x)$ khi và chỉ khi $(x - c) \mid P(x)$.

### Bậc và Số nghiệm (Định lý cơ bản của Đại số)
- Một đa thức bậc $n \ge 1$ với hệ số phức có đúng $n$ nghiệm phức (tính cả bội).
- Nếu hai đa thức bậc không vượt quá $n$ trùng nhau tại $n+1$ điểm phân biệt, thì hai đa thức đó đồng nhất bằng nhau:
  $$P(x_i) = Q(x_i) \quad (\forall i = 1, 2, \dots, n+1) \implies P(x) \equiv Q(x)$$

---

## 2. Hệ Thức Viète Cho Đa Thức Bậc $n$

### Định lý Viète tổng quát
Xét đa thức monic bậc $n$:
$$P(x) = x^n + a_{n-1} x^{n-1} + a_{n-2} x^{n-2} + \dots + a_1 x + a_0$$
Giả sử $x_1, x_2, \dots, x_n$ là $n$ nghiệm (thực hoặc phức) của $P(x)$. Khai triển tích:
$$P(x) = (x - x_1)(x - x_2) \cdots (x - x_n)$$
Cân bằng hệ số hai vế, ta thu được hệ thức Viète:
$$\begin{cases}
e_1 = x_1 + x_2 + \dots + x_n = -a_{n-1} \\
e_2 = \sum_{1 \le i < j \le n} x_i x_j = a_{n-2} \\
e_3 = \sum_{1 \le i < j < k \le n} x_i x_j x_k = -a_{n-3} \\
\quad \vdots \\
e_k = \sum_{1 \le i_1 < \dots < i_k \le n} x_{i_1} \dots x_{i_k} = (-1)^k a_{n-k} \\
\quad \vdots \\
e_n = x_1 x_2 \cdots x_n = (-1)^n a_0
\end{cases}$$
Các đại lượng $e_1, e_2, \dots, e_n$ được gọi là **các đa thức đối xứng sơ cấp**.

---

## 3. Công Thức Tổng Lũy Thừa Newton (Newton's Sums)

Trong nhiều bài toán, ta cần tính tổng các lũy thừa cùng bậc của các nghiệm:
$$S_k = x_1^k + x_2^k + \dots + x_n^k \quad (k \ge 0)$$

### Công thức truy hồi Newton
Với đa thức $P(x) = x^n + a_{n-1} x^{n-1} + \dots + a_1 x + a_0$:
- Với $1 \le k \le n$:
  $$S_k + a_{n-1} S_{k-1} + a_{n-2} S_{k-2} + \dots + a_{n-k+1} S_1 + k \cdot a_{n-k} = 0$$
- Với $k > n$:
  $$S_k + a_{n-1} S_{k-1} + a_{n-2} S_{k-2} + \dots + a_0 S_{k-n} = 0$$

Công thức này cho phép tính nhanh $S_1, S_2, S_3, S_4, \dots$ bằng phép đệ quy tuyến tính mà không cần phải giải nghiệm tường minh.

---

## 4. Bài toán Olympic chọn lọc & Lời giải

### Bài toán 1 (VMO 2019 Bài 2)
> **Đề bài:** Cho đa thức $P(x) = x^3 - 3x + 1$. Chứng minh rằng $P(x)$ có 3 nghiệm thực phân biệt $x_1, x_2, x_3$ và tính giá trị của biểu thức:
> $$T = x_1^8 + x_2^8 + x_3^8$$

**Lời giải:**
Xét hàm số $f(x) = x^3 - 3x + 1$ trên $\mathbb{R}$:
$f'(x) = 3x^2 - 3 = 3(x - 1)(x + 1)$. Cực trị tại $x = -1$ ($f(-1) = 3 > 0$) và $x = 1$ ($f(1) = -1 < 0$).
Vì $\lim_{x \to -\infty} f(x) = -\infty$, $f(-1) > 0$, $f(1) < 0$ và $\lim_{x \to +\infty} f(x) = +\infty$, theo định lý Bolzano-Cauchy, $P(x)$ có 3 nghiệm thực phân biệt nằm trong các khoảng $(-\infty, -1)$, $(-1, 1)$, $(1, +\infty)$.

Đa thức có các hệ số: $a_2 = 0, a_1 = -3, a_0 = 1$.
Theo công thức Viète:
$$e_1 = x_1 + x_2 + x_3 = 0, \quad e_2 = x_1 x_2 + x_2 x_3 + x_3 x_1 = -3, \quad e_3 = x_1 x_2 x_3 = -1$$
Ta tính dãy tổng lũy thừa $S_k = x_1^k + x_2^k + x_3^k$:
- $S_0 = 1 + 1 + 1 = 3$
- $S_1 = e_1 = 0$
- $S_2 = e_1^2 - 2e_2 = 0^2 - 2(-3) = 6$
- Áp dụng hệ thức Newton $S_3 - 3S_1 + 3a_0 = 0 \implies S_3 - 3(0) + 3(1) = 0 \implies S_3 = -3$
- Với mọi $k \ge 3$, vì $x_i^3 - 3x_i + 1 = 0$, nhân với $x_i^{k-3}$:
  $$S_k = 3 S_{k-2} - S_{k-3}$$
Áp dụng công thức truy hồi:
- $S_4 = 3 S_2 - S_1 = 3(6) - 0 = 18$
- $S_5 = 3 S_3 - S_2 = 3(-3) - 6 = -15$
- $S_6 = 3 S_4 - S_3 = 3(18) - (-3) = 54 + 3 = 57$
- $S_7 = 3 S_5 - S_4 = 3(-15) - 18 = -45 - 18 = -63$
- $S_8 = 3 S_6 - S_5 = 3(57) - (-15) = 171 + 15 = 186$

Vậy giá trị cần tìm là $T = 186$. $\blacksquare$

---

### Bài toán 2 (USAMO 2003 Problem 1)
> **Đề bài:** Cho $P(x)$ là một đa thức có hệ số nguyên. Chứng minh rằng nếu $a, b, c, d$ là các số nguyên phân biệt thỏa mãn $P(a) = P(b) = P(c) = P(d) = 5$, thì không tồn tại số nguyên $k$ nào sao cho $P(k) = 8$.

**Lời giải:**
Xét đa thức phụ $Q(x) = P(x) - 5$.
Vì $a, b, c, d$ là các số nguyên phân biệt và $Q(a) = Q(b) = Q(c) = Q(d) = 0$, nên theo Định lý Bézout, đa thức $Q(x)$ chia hết cho tích $(x - a)(x - b)(x - c)(x - d)$:
$$Q(x) = (x - a)(x - b)(x - c)(x - d) \cdot R(x)$$
trong đó $R(x)$ là một đa thức có hệ số nguyên (theo bổ đề Gauss).
Suy ra:
$$P(x) = (x - a)(x - b)(x - c)(x - d) \cdot R(x) + 5$$
Giả sử tồn tại số nguyên $k$ sao cho $P(k) = 8$. Thay $x = k$ vào biểu thức:
$$(k - a)(k - b)(k - c)(k - d) \cdot R(k) + 5 = 8$$
$$\iff (k - a)(k - b)(k - c)(k - d) \cdot R(k) = 3$$
Vì $a, b, c, d$ là các số nguyên phân biệt, các thừa số $k - a, k - b, k - c, k - d$ phải là 4 số nguyên phân biệt.
Tuy nhiên, số $3$ chỉ có thể phân tích thành tích của tối đa 3 số nguyên phân biệt (ví dụ: $1 \cdot (-1) \cdot (-3) = 3$). Bốn số nguyên phân biệt nhỏ nhất về trị tuyệt đối là $1, -1, 2, -2$, nhưng tích của chúng đã là:
$$1 \cdot (-1) \cdot 2 \cdot (-2) = 4 > 3$$
Do đó không thể phân tích số nguyên $3$ thành tích của bốn số nguyên phân biệt.
Mâu thuẫn này chứng minh rằng không tồn tại số nguyên $k$ nào thỏa mãn $P(k) = 8$. $\blacksquare$

---

## 5. Bài tập rèn luyện

1. **(VMO):** Tìm tất cả các đa thức $P(x) \in \mathbb{R}[x]$ thỏa mãn $P(x^2) = [P(x)]^2$ với mọi $x \in \mathbb{R}$.
2. **(Phương trình bậc 3):** Cho phương trình $x^3 - x - 1 = 0$ có 3 nghiệm $a, b, c$. Tính giá trị của $\frac{1+a}{1-a} + \frac{1+b}{1-b} + \frac{1+c}{1-c}$.
3. **(Đa thức nguyên):** Cho đa thức $P(x) \in \mathbb{Z}[x]$ thỏa mãn $P(0)$ và $P(1)$ đều là các số lẻ. Chứng minh rằng $P(x)$ không thể có nghiệm nguyên.
