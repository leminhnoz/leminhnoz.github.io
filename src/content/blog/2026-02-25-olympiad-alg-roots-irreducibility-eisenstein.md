---
title: "Chuyên đề Đại số Olympic: Đa Thức Nguyên, Tính Bất Khả Quy & Tiêu Chuẩn Eisenstein"
description: "Chinh phục đa thức hệ số nguyên Z[x] — Tính chất chia hết a - b | P(a) - P(b), Bổ đề Gauss, Tiêu chuẩn Eisenstein chứng minh đa thức bất khả quy và Công thức nội suy Lagrange trong VMO & IMO."
pubDate: "2026-02-25"
tags: ["Toán học", "Đại số", "Olympic", "VMO", "IMO", "Eisenstein", "Irreducibility", "Lagrange Interpolation"]
categories: ["Toán học Olympic"]
excerpt: "Đa thức với hệ số nguyên là giao điểm huyền diệu giữa Số học và Đại số. Tính bất khả quy trên vành số hữu tỉ Q[x] mở ra chiều sâu cấu trúc của các trường số đại số."
---

> *"Tính chia hết trên vành đa thức nguyên $\mathbb{Z}[x]$ mang linh hồn của số học, nơi mỗi phép trừ $a - b$ đều để lại dấu vết chia hết lên giá trị đa thức."*

Trong cấu trúc đề thi học sinh giỏi quốc gia VMO và quốc tế IMO, các bài toán về **Đa thức với hệ số nguyên** $\mathbb{Z}[x]$ đòi hỏi tư duy kết hợp nhuần nhuyễn giữa đại số trừu tượng và số học modulo. Tiêu biểu nhất là bài toán chứng minh **tính bất khả quy** thông qua **Tiêu chuẩn Eisenstein** và kỹ thuật khôi phục đa thức qua **Công thức nội suy Lagrange**.

---

## 1. Tính Chất Cốt Lõi Của Đa Thức Hệ Số Nguyên

### Tính chất chia hết cơ bản
> Cho $P(x) \in \mathbb{Z}[x]$. Với mọi số nguyên phân biệt $a, b \in \mathbb{Z}$, ta luôn có:
> $$a - b \mid P(a) - P(b)$$

*Chứng minh:*
Giả sử $P(x) = \sum_{k=0}^n c_k x^k$ với $c_k \in \mathbb{Z}$.
Khi đó:
$$P(a) - P(b) = \sum_{k=1}^n c_k (a^k - b^k)$$
Vì với mọi $k \ge 1$, ta luôn có hằng đẳng thức $a^k - b^k = (a - b)(a^{k-1} + a^{k-2}b + \dots + b^{k-1})$, suy ra $(a - b) \mid (a^k - b^k)$.
Do các hệ số $c_k \in \mathbb{Z}$, mỗi hạng tử đều chia hết cho $a - b$. Vậy $(a - b) \mid (P(a) - P(b))$. $\blacksquare$

---

### Định lý Nghiệm Hữu Tỉ (Rational Root Theorem)
Cho đa thức $P(x) = a_n x^n + a_{n-1} x^{n-1} + \dots + a_1 x + a_0 \in \mathbb{Z}[x]$ với $a_n \ne 0, a_0 \ne 0$.
Nếu phân số tối giản $\frac{p}{q}$ ($\gcd(p, q) = 1$) là một nghiệm của $P(x)$, thì:
$$p \mid a_0 \quad \text{và} \quad q \mid a_n$$
Đặc biệt, nếu $P(x)$ là đa thức monic ($a_n = 1$), mọi nghiệm hữu tỉ của $P(x)$ bắt buộc phải là **số nguyên**.

---

## 2. Bổ Đề Gauss & Đa Thức Bất Khả Quy

### Khái niệm Đa thức nguyên thủy (Primitive Polynomial)
Một đa thức $P(x) \in \mathbb{Z}[x]$ được gọi là **nguyên thủy** nếu ước chung lớn nhất của tất cả các hệ số của nó bằng $1$:
$$\gcd(a_n, a_{n-1}, \dots, a_0) = 1$$

### Bổ đề Gauss (Gauss's Lemma)
1. Tích của hai đa thức nguyên thủy là một đa thức nguyên thủy.
2. Một đa thức $P(x) \in \mathbb{Z}[x]$ phân tích được thành tích của hai đa thức với hệ số hữu tỉ trên $\mathbb{Q}[x]$ khi và chỉ khi nó phân tích được thành tích của hai đa thức với hệ số nguyên trên $\mathbb{Z}[x]$ có cùng bậc.

---

## 3. Tiêu Chuẩn Eisenstein (Eisenstein's Criterion)

### Phát biểu định lý
Cho đa thức $P(x) = a_n x^n + a_{n-1} x^{n-1} + \dots + a_1 x + a_0 \in \mathbb{Z}[x]$.
Nếu tồn tại một số nguyên tố $p$ thỏa mãn ba điều kiện sau:
1. $p \nmid a_n$
2. $p \mid a_i$ với mọi $i \in \{0, 1, \dots, n - 1\}$
3. $p^2 \nmid a_0$

Khi đó, đa thức $P(x)$ **bất khả quy trên trường số hữu tỉ $\mathbb{Q}[x]$** (nghĩa là không thể phân tích thành tích của hai đa thức bậc nhỏ hơn với hệ số hữu tỉ).

### Kỹ thuật tịnh tiến biến $x \mapsto x + c$
Nhiều đa thức không thỏa mãn tiêu chuẩn Eisenstein ở dạng ban đầu, nhưng sau khi đổi biến $x = y + c$, đa thức mới $Q(y) = P(y + c)$ lại thỏa mãn. Vì $P(x)$ bất khả quy khi và chỉ khi $Q(y)$ bất khả quy, đây là một kỹ thuật cực mạnh.

**Ứng dụng kinh điển: Đa thức Cyclotomic bậc $p$ (với $p$ nguyên tố)**
Xét $\Phi_p(x) = x^{p-1} + x^{p-2} + \dots + x + 1 = \frac{x^p - 1}{x - 1}$.
Đặt $x = y + 1$:
$$\Phi_p(y + 1) = \frac{(y + 1)^p - 1}{y} = y^{p-1} + \binom{p}{1} y^{p-2} + \binom{p}{2} y^{p-3} + \dots + \binom{p}{p-1}$$
Nhận xét:
- Hệ số cao nhất là $1$ (không chia hết cho $p$).
- Mọi hệ số tự do đến bậc $p-2$ đều là các số tổ hợp $\binom{p}{k}$ với $1 \le k \le p - 1$, do đó đều chia hết cho $p$.
- Hệ số tự do bằng $\binom{p}{1} = p$, chia hết cho $p$ nhưng không chia hết cho $p^2$.
Theo Tiêu chuẩn Eisenstein, $\Phi_p(y+1)$ bất khả quy trên $\mathbb{Q}[y]$, suy ra $\Phi_p(x)$ bất khả quy trên $\mathbb{Q}[x]$. $\blacksquare$

---

## 4. Công Thức Nội Suy Lagrange (Lagrange Interpolation)

### Định lý
Cho $n+1$ cặp điểm phân biệt $(x_0, y_0), (x_1, y_1), \dots, (x_n, y_n)$ với $x_i \ne x_j$ khi $i \ne j$.
Khi đó tồn tại **duy nhất** một đa thức $P(x)$ có bậc không vượt quá $n$ thỏa mãn $P(x_i) = y_i$ với mọi $i = 0, \dots, n$, xác định bởi công thức:
$$P(x) = \sum_{i=0}^n y_i \prod_{\substack{0 \le j \le n \\ j \ne i}} \frac{x - x_j}{x_i - x_j}$$

---

## 5. Bài toán Olympic chọn lọc & Lời giải chi tiết

### Bài toán 1 (IMO Shortlist 2008 A1)
> **Đề bài:** Cho đa thức $P(x) \in \mathbb{Z}[x]$ có bậc $n \ge 2$. Chứng minh rằng không thể có đồng thời các số nguyên $a_1, a_2, \dots, a_k$ thỏa mãn $P(a_1) = a_2, P(a_2) = a_3, \dots, P(a_k) = a_1$ với $k \ge 3$ và các số $a_1, \dots, a_k$ đôi một phân biệt.

**Lời giải:**
Áp dụng tính chất cơ bản $a - b \mid P(a) - P(b)$ cho các cặp số liên tiếp:
$$\begin{cases}
a_1 - a_2 \mid P(a_1) - P(a_2) = a_2 - a_3 \\
a_2 - a_3 \mid P(a_2) - P(a_3) = a_3 - a_4 \\
\quad \vdots \\
a_{k-1} - a_k \mid P(a_{k-1}) - P(a_k) = a_k - a_1 \\
a_k - a_1 \mid P(a_k) - P(a_1) = a_1 - a_2
\end{cases}$$
Xét dãy các giá trị tuyệt đối của hiệu:
$$|a_1 - a_2| \le |a_2 - a_3| \le \dots \le |a_k - a_1| \le |a_1 - a_2|$$
Do đó, tất cả các dấu bất đẳng thức phải đồng thời trở thành dấu bằng:
$$|a_1 - a_2| = |a_2 - a_3| = \dots = |a_k - a_1| = d > 0$$
Vì các số $a_i$ đôi một phân biệt, nên $d > 0$.
Xét tổng đại số:
$$(a_1 - a_2) + (a_2 - a_3) + \dots + (a_k - a_1) = 0$$
Đặt $\delta_i = a_i - a_{i+1}$ (với quy ước $a_{k+1} = a_1$). Ta có $|\delta_i| = d$, tức $\delta_i \in \{d, -d\}$.
Để tổng các số $\pm d$ bằng $0$, số lượng số $d$ phải bằng số lượng số $-d$.
Đặc biệt, phải tồn tại hai hiệu liên tiếp đổi dấu: giả sử $\delta_1 = d$ và $\delta_2 = -d$.
Khi đó:
$$a_1 - a_2 = d \quad \text{và} \quad a_2 - a_3 = -d \implies a_1 - a_3 = 0 \implies a_1 = a_3$$
Điều này mâu thuẫn trực tiếp với giả thiết các số $a_i$ đôi một phân biệt!
Vậy chu trình phân biệt có độ dài $k \ge 3$ không thể tồn tại. $\blacksquare$

---

## 6. Bài tập rèn luyện

1. **(Eisenstein):** Chứng minh rằng đa thức $P(x) = x^5 + 5x^4 + 10x^3 + 10x^2 + 35x + 30$ bất khả quy trên $\mathbb{Q}[x]$.
2. **(Nghiệm hữu tỉ):** Cho $P(x) = x^n + a_{n-1}x^{n-1} + \dots + a_0 \in \mathbb{Z}[x]$. Giả sử $|P(0)|$ là một số nguyên tố và $\sum |a_i| < 2|P(0)|$. Chứng minh rằng $P(x)$ không có nghiệm hữu tỉ.
3. **(Putnam):** Cho đa thức $P(x) \in \mathbb{Z}[x]$ thỏa mãn $P(a) = b, P(b) = c, P(c) = a$. Chứng minh rằng $a = b = c$.
