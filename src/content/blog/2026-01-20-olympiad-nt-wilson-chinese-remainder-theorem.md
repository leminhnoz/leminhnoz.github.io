---
title: "Chuyên đề Số học Olympic: Định lý Wilson & Định lý Thặng dư Trung Hoa (CRT)"
description: "Chinh phục Định lý Wilson và Định lý Thặng dư Trung Hoa (Chinese Remainder Theorem) — phương pháp giải hệ đồng dư thức một ẩn, cấu trúc nghịch đảo modulo và các bài toán giai thừa đỉnh cao VMO & IMO."
pubDate: "2026-01-20"
tags: ["Toán học", "Số học", "Olympic", "VMO", "IMO", "Wilson", "CRT", "Congruence"]
categories: ["Toán học Olympic"]
excerpt: "Định lý Wilson và Định lý Thặng dư Trung Hoa (CRT) là hai trụ cột không thể thiếu của số học đồng dư, cho phép liên kết cấu trúc nhân của vành thương Z/mZ và giải quyết hệ đồng dư lớn."
---

> *"Số học là bà hoàng của Toán học, và lý thuyết đồng dư chính là chiếc vương miện lộng lẫy nhất của bà hoàng ấy."* — Carl Friedrich Gauss

Trong lý thuyết số học thi học sinh giỏi quốc gia (VMO) và quốc tế (IMO), sự kết hợp giữa **Định lý Wilson** và **Định lý Thặng dư Trung Hoa (CRT)** tạo ra công cụ mạnh mẽ để kiểm soát giai thừa modulo số nguyên tố và giải quyết các bài toán tồn tại nghiệm nguyên cho một hệ thống điều kiện đồng dư phức tạp.

---

## 1. Định lý Wilson (Wilson's Theorem)

### Định lý
Cho $p$ là một số nguyên dương lớn hơn $1$. Khi đó:
$$(p - 1)! \equiv -1 \pmod p \iff p \text{ là số nguyên tố}$$

### Chứng minh chiều thuận ($p$ là số nguyên tố $\implies (p-1)! \equiv -1 \pmod p$)
- Với $p = 2$: $(2 - 1)! = 1 \equiv -1 \pmod 2$ (đúng vì $1 \equiv -1 \pmod 2$).
- Với $p = 3$: $(3 - 1)! = 2 \equiv -1 \pmod 3$ (đúng).
- Với $p > 3$ là số nguyên tố:
  Xét tập các phần tử khả nghịch trong trường hữu hạn $\mathbb{F}_p = \mathbb{Z}/p\mathbb{Z}$:
  $$S = \{1, 2, 3, \dots, p - 1\}$$
  Với mỗi $a \in S$, do $\gcd(a, p) = 1$, tồn tại duy nhất một phần tử nghịch đảo $a^{-1} \in S$ sao cho:
  $$a \cdot a^{-1} \equiv 1 \pmod p$$
  Một phần tử tự nghịch đảo chính nó ($a \equiv a^{-1} \pmod p$) khi và chỉ khi:
  $$a^2 \equiv 1 \pmod p \iff p \mid (a^2 - 1) = (a - 1)(a + 1)$$
  Vì $p$ là số nguyên tố nên $p \mid (a - 1)$ hoặc $p \mid (a + 1)$, suy ra $a \equiv 1$ hoặc $a \equiv p - 1 \pmod p$.
  
  Do đó, trong tập hợp $\{2, 3, \dots, p - 2\}$, không có phần tử nào tự nghịch đảo. $p - 3$ phần tử này là một số chẵn các phần tử, và ta có thể ghép thành $\frac{p - 3}{2}$ cặp $(x, x^{-1})$ có tích đồng dư với $1$ theo modulo $p$.
  
  Nhân tất cả lại:
  $$(p - 1)! = 1 \cdot \left(\prod_{\text{cặp}} x \cdot x^{-1}\right) \cdot (p - 1) \equiv 1 \cdot 1^{\frac{p-3}{2}} \cdot (p - 1) \equiv -1 \pmod p$$
  Chứng minh hoàn tất. $\blacksquare$

### Hệ quả kinh điển
1. **Dạng rút gọn nửa giai thừa:** Nếu $p = 2k + 1$ là số nguyên tố lẻ:
   $$\left( \frac{p-1}{2} \right)!^2 \equiv (-1)^{\frac{p+1}{2}} \pmod p$$
2. Tồn tại $x$ sao cho $x^2 \equiv -1 \pmod p$ khi và chỉ khi $p = 2$ hoặc $p \equiv 1 \pmod 4$.

---

## 2. Định lý Thặng Dư Trung Hoa (Chinese Remainder Theorem - CRT)

### Phát biểu định lý
Cho $m_1, m_2, \dots, m_k$ là các số nguyên dương đôi một nguyên tố cùng nhau ($\gcd(m_i, m_j) = 1$ với mọi $i \ne j$), và $a_1, a_2, \dots, a_k$ là các số nguyên tùy ý. Khi đó hệ phương trình đồng dư:
$$\begin{cases}
x \equiv a_1 \pmod{m_1} \\
x \equiv a_2 \pmod{m_2} \\
\quad \vdots \\
x \equiv a_k \pmod{m_k}
\end{cases}$$
luôn có nghiệm nguyên $x$. Hơn nữa, nghiệm này là duy nhất theo modulo $M = m_1 \cdot m_2 \cdots m_k$.

### Công thức nghiệm giải tích
Đặt $M = \prod_{i=1}^k m_i$, và $M_i = \frac{M}{m_i}$ với mọi $i = 1, \dots, k$.
Vì $\gcd(M_i, m_i) = 1$, tồn tại nghịch đảo modulo $M_i^{-1} \in \mathbb{Z}$ sao cho:
$$M_i \cdot M_i^{-1} \equiv 1 \pmod{m_i}$$
Nghiệm tổng quát của hệ là:
$$x \equiv \sum_{i=1}^k a_i \cdot M_i \cdot M_i^{-1} \pmod M$$

### Trường hợp các modulo không nguyên tố cùng nhau
Hệ đồng dư:
$$\begin{cases} x \equiv a \pmod m \\ x \equiv b \pmod n \end{cases}$$
có nghiệm khi và chỉ khi $\gcd(m, n) \mid (a - b)$. Nếu điều kiện này thỏa mãn, nghiệm là duy nhất modulo $\text{lcm}(m, n)$.

---

## 3. Bài toán Olympic chọn lọc & Lời giải chi tiết

### Bài toán 1 (Vận dụng Định lý Wilson)
> **Đề bài:** Cho $p$ là một số nguyên tố có dạng $4k + 3$. Chứng minh rằng nếu $a^2 + b^2$ chia hết cho $p$ thì cả $a$ và $b$ đều phải chia hết cho $p$.

**Lời giải:**
Giả sử phản chứng rằng $a$ không chia hết cho $p$. Khi đó $\gcd(a, p) = 1$, do đó tồn tại nghịch đảo $a^{-1} \pmod p$.
Từ giả thiết $a^2 + b^2 \equiv 0 \pmod p$, ta nhân cả hai vế với $(a^{-1})^2$:
$$1 + (b \cdot a^{-1})^2 \equiv 0 \pmod p \implies (b \cdot a^{-1})^2 \equiv -1 \pmod p$$
Đặt $x = b \cdot a^{-1}$, ta có $x^2 \equiv -1 \pmod p$.
Lũy thừa hai vế bậc $\frac{p - 1}{2} = 2k + 1$:
$$x^{p - 1} = (x^2)^{\frac{p - 1}{2}} \equiv (-1)^{2k + 1} \equiv -1 \pmod p$$
Tuy nhiên, theo Định lý Fermat nhỏ, do $\gcd(x, p) = 1$, ta phải có:
$$x^{p - 1} \equiv 1 \pmod p$$
Từ đó suy ra $1 \equiv -1 \pmod p \implies p \mid 2$, điều này mâu thuẫn vì $p = 4k + 3 \ge 3$.
Vậy điều giả sử là sai, tức $a \mid p$. Suy ra $b^2 \equiv 0 \pmod p \implies p \mid b$. $\blacksquare$

---

### Bài toán 2 (Kỹ thuật xây dựng dãy số bằng CRT - IMO Shortlist)
> **Đề bài:** Chứng minh rằng với mọi số nguyên dương $n$, luôn tồn tại $n$ số nguyên dương liên tiếp sao cho mỗi số đều chia hết cho ít nhất một số chính phương lớn hơn $1$.

**Lời giải:**
Ta cần tìm số nguyên dương $x$ sao cho với mọi $i \in \{1, 2, \dots, n\}$, số $x + i$ chia hết cho một số chính phương.
Chọn $n$ số nguyên tố phân biệt: $p_1, p_2, \dots, p_n$.
Khi đó các số $p_1^2, p_2^2, \dots, p_n^2$ đôi một nguyên tố cùng nhau từng đôi một:
$$\gcd(p_i^2, p_j^2) = 1 \quad (\forall i \ne j)$$
Xét hệ phương trình đồng dư:
$$\begin{cases}
x \equiv -1 \pmod{p_1^2} \\
x \equiv -2 \pmod{p_2^2} \\
\quad \vdots \\
x \equiv -n \pmod{p_n^2}
\end{cases}$$
Theo **Định lý Thặng Dư Trung Hoa (CRT)**, do các modulo $p_i^2$ nguyên tố cùng nhau từng đôi một, hệ phương trình trên luôn có nghiệm nguyên $x_0$, và nghiệm tổng quát có dạng:
$$x = x_0 + k \cdot (p_1 p_2 \cdots p_n)^2 \quad (k \in \mathbb{Z})$$
Ta có thể chọn $k$ đủ lớn để $x > 0$.
Khi đó, với mọi $i \in \{1, 2, \dots, n\}$:
$$x + i \equiv 0 \pmod{p_i^2} \implies p_i^2 \mid (x + i)$$
Như vậy dãy $n$ số liên tiếp $\{x + 1, x + 2, \dots, x + n\}$ thỏa mãn điều kiện đề bài. $\blacksquare$

---

## 4. Bài tập tự rèn luyện

1. **(VMO)** Tìm tất cả các số nguyên tố $p$ sao cho $p \mid (p - 1)! + 1$ và $p^2 \mid (p - 1)! + 1$ (Số nguyên tố Wilson).
2. **(Putnam)** Chứng minh rằng không tồn tại đa thức $P(x)$ với hệ số nguyên sao cho $P(1) = 2, P(2) = 3, P(3) = 5$ và với mọi số nguyên $n$, $P(n)$ là số nguyên tố.
3. **(IMO)** Cho $n$ số nguyên dương $a_1, a_2, \dots, a_n$. Chứng minh tồn tại vô số số nguyên dương $x$ sao cho $\gcd(x + a_i, x + a_j) = 1$ với mọi $i \ne j$.
