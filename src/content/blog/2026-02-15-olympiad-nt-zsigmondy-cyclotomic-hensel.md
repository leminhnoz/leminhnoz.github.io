---
title: "Chuyên đề Số học Olympic: Định Lý Zsigmondy, Đa Thức Cyclotomic & Bổ Đề Hensel"
description: "Vũ khí hạt nhân của Số học đỉnh cao IMO — Định lý Zsigmondy về ước nguyên tố nguyên thủy, cấu trúc đa thức chia đường tròn Cyclotomic và Bổ đề Hensel nâng nghiệm đồng dư."
pubDate: "2026-02-15"
tags: ["Toán học", "Số học", "Olympic", "VMO", "IMO", "Zsigmondy", "Cyclotomic", "Hensel", "Advanced NT"]
categories: ["Toán học Olympic"]
excerpt: "Định lý Zsigmondy giải quyết triệt để vấn đề tồn tại ước nguyên tố mới trong dãy lũy thừa a^n - b^n, biến những bài toán số mũ hóc búa nhất của kỳ thi IMO thành các phép kiểm tra ngoại lệ đơn giản."
---

> *"Nếu Bổ đề LTE là khẩu đại bác, thì Định lý Zsigmondy chính là vũ khí hạt nhân của Số học Olympic — một khi đã kích hoạt, hầu hết các phương trình Diophantine chứa lũy thừa n đều sụp đổ."*

Tại các kỳ thi đỉnh cao như IMO hay TST, các bài toán yêu cầu tìm nghiệm nguyên của phương trình chứa $a^n \pm b^n$ hoặc xét quan hệ chia hết giữa các lũy thừa lớn thường có thể được "hạ gục" nhanh chóng nếu thí sinh nắm vững **Định lý Zsigmondy** và bản chất của **Đa thức Cyclotomic (Đa thức chia đường tròn)**.

---

## 1. Định Lý Zsigmondy (Zsigmondy's Theorem)

### Khái niệm Ước Nguyên Tố Nguyên Thủy (Primitive Prime Divisor)
Cho $a > b \ge 1$ là hai số nguyên dương nguyên tố cùng nhau ($\gcd(a, b) = 1$) và $n \ge 1$.
Một số nguyên tố $p$ được gọi là **ước nguyên tố nguyên thủy** của $a^n - b^n$ nếu:
$$p \mid (a^n - b^n) \quad \text{và} \quad \forall k \in \{1, 2, \dots, n-1\}, \, p \nmid (a^k - b^k)$$
Nói cách khác, $p$ chia hết cho $a^n - b^n$ nhưng không chia hết cho bất kỳ số nào đi trước trong dãy lũy thừa. Điều này tương đương với:
$$\text{ord}_p\left(\frac{a}{b}\right) = n \implies p \equiv 1 \pmod n$$

---

### Phát biểu Định lý Zsigmondy cho $a^n - b^n$
> Cho $a > b \ge 1$ là các số nguyên dương nguyên tố cùng nhau.
> Khi đó $a^n - b^n$ luôn có **ít nhất một ước nguyên tố nguyên thủy**, ngoại trừ đúng hai trường hợp sau:
> 1. $a = 2, b = 1$ và $n = 6$: Khi đó $2^6 - 1 = 63 = 3^2 \cdot 7$. Các ước nguyên tố là $3$ (chia hết $2^2 - 1$) và $7$ (chia hết $2^3 - 1$), không có ước nguyên tố mới.
> 2. $n = 2$ và $a + b$ là một lũy thừa của $2$: Khi đó $a^2 - b^2 = (a - b)(a + b)$. Mọi ước nguyên tố của $a+b$ đều là $2$, và nếu $a - b = 1$ thì không sinh ra ước nguyên tố lẻ mới nào.

---

### Phát biểu Định lý Zsigmondy cho tổng $a^n + b^n$
Áp dụng định lý trên cho $a^{2n} - b^{2n}$, ta có hệ quả cho tổng $a^n + b^n$:
> Cho $a > b \ge 1$ nguyên tố cùng nhau. Khi đó $a^n + b^n$ luôn có ít nhất một ước nguyên tố nguyên thủy (tức là ước nguyên tố của $a^n + b^n$ nhưng không chia hết $a^k + b^k$ với mọi $k < n$), ngoại trừ duy nhất một trường hợp:
> $$2^3 + 1^3 = 9 = 3^2 \quad (\text{ngoại lệ duy nhất } a = 2, b = 1, n = 3)$$

---

## 2. Đa Thức Cyclotomic (Đa thức chia đường tròn)

### Định nghĩa
Đa thức Cyclotomic thứ $n$, ký hiệu là $\Phi_n(x)$, là đa thức monic có các nghiệm chính là các căn nguyên thủy bậc $n$ của đơn vị trên trường số phức $\mathbb{C}$:
$$\Phi_n(x) = \prod_{\substack{1 \le k \le n \\ \gcd(k, n) = 1}} \left(x - e^{\frac{2\pi i k}{n}}\right)$$
Bậc của $\Phi_n(x)$ đúng bằng giá trị hàm phi Euler $\varphi(n)$.

### Tính chất cơ bản
1. **Phân tích $x^n - 1$:**
   $$x^n - 1 = \prod_{d \mid n} \Phi_d(x)$$
2. **Công thức nghịch đảo Möbius:**
   $$\Phi_n(x) = \prod_{d \mid n} (x^d - 1)^{\mu(n/d)}$$
3. Mọi hệ số của $\Phi_n(x)$ đều là số nguyên ($\Phi_n(x) \in \mathbb{Z}[x]$) và $\Phi_n(x)$ là đa thức **bất khả quy trên $\mathbb{Q}[x]$**.

---

## 3. Bổ Đề Hensel (Hensel's Lemma)

Trong các bài toán số học chuyên sâu liên quan đến nghiệm của đa thức modulo $p^k$, **Bổ đề Hensel** cho phép ta "nâng" (lift) một nghiệm từ modulo $p$ lên modulo $p^k$.

### Phát biểu Bổ đề Hensel
> Cho $P(x) \in \mathbb{Z}[x]$ và $p$ là số nguyên tố. Giả sử $r \in \mathbb{Z}$ là một nghiệm của $P(x) \pmod p$, tức:
> $$P(r) \equiv 0 \pmod p$$
> Nếu đạo hàm $P'(r) \not\equiv 0 \pmod p$, thì với mọi số nguyên dương $k \ge 1$, tồn tại **duy nhất** một số nguyên $r_k \pmod{p^k}$ sao cho:
> $$P(r_k) \equiv 0 \pmod{p^k} \quad \text{và} \quad r_k \equiv r \pmod p$$

Công thức truy hồi nâng nghiệm từng bước từ $r_k$ lên $r_{k+1}$:
$$r_{k+1} = r_k - P(r_k) \cdot [P'(r_k)]^{-1} \pmod{p^{k+1}}$$
*(Đây chính là phiên bản p-adic của phương pháp tiếp tuyến Newton trong giải tích!)*

---

## 4. Bài toán Olympic chọn lọc & Lời giải đỉnh cao

### Bài toán 1 (IMO 2012 Problem 3)
> **Đề bài:** Tìm tất cả các số nguyên dương $n$ sao cho tồn tại các số nguyên $a_1, a_2, \dots, a_k$ thỏa mãn:
> $$a_1 + a_2 + \dots + a_k = 0 \quad \text{và} \quad a_1^n + a_2^n + \dots + a_k^n = 1$$

---

### Bài toán 2 (Ứng dụng Zsigmondy giải Phương trình Diophantine)
> **Đề bài:** Tìm tất cả các bộ số nguyên dương $(a, b, n)$ với $a > b$ và $\gcd(a, b) = 1$ sao cho:
> $$a^n - b^n = 3^n$$

**Lời giải:**
- Nếu $n = 1$: Ta có $a - b = 3$. Vì $\gcd(a, b) = 1$, vô số nghiệm $(b + 3, b, 1)$ với $\gcd(b, 3) = 1$.
- Xét $n \ge 2$:
  Theo Định lý Zsigmondy:
  - Nếu $(a, b, n) = (2, 1, 6)$: Khi đó $a^n - b^n = 2^6 - 1 = 63 \ne 3^6 = 729$ (loại).
  - Nếu $n = 2$ và $a + b = 2^k$: Phương trình trở thành $(a - b)(a + b) = 9$.
    Vì $a > b \ge 1$, ta có các phân tích của $9$:
    Hoặc $a - b = 1, a + b = 9 \implies a = 5, b = 4$. Khi đó $a + b = 9$ không phải lũy thừa của $2$.
    Thử lại: $5^2 - 4^2 = 25 - 16 = 9 = 3^2$. Nghiệm thỏa mãn!
  - Trong mọi trường hợp khác, theo Định lý Zsigmondy, $a^n - b^n$ phải có ít nhất một ước nguyên tố nguyên thủy $p$.
    Nghĩa là $p \mid (a^n - b^n)$ và $p \nmid (a^k - b^k)$ với mọi $k < n$.
    Đặc biệt, $p \equiv 1 \pmod n$, suy ra $p \ge n + 1 > 1$.
    Mặt khác, do $a^n - b^n = 3^n$, ước nguyên tố duy nhất của vế phải là $3$.
    Do đó bắt buộc $p = 3$.
    Suy ra $3 \equiv 1 \pmod n \implies n \mid (3 - 1) = 2 \implies n = 2$.
    Với $n = 2$, ta đã xét và tìm được nghiệm $(a, b) = (5, 4)$.
Vậy với $n \ge 2$, phương trình có nghiệm duy nhất là $(a, b, n) = (5, 4, 2)$. $\blacksquare$

---

## 5. Bài tập rèn luyện

1. **(USA TST):** Tìm tất cả các cặp số nguyên dương $(a, b)$ sao cho $a^b - 1$ chia hết cho $b^a - 1$.
2. **(Phương trình mũ):** Tìm tất cả các số nguyên dương $x, y, z$ thỏa mãn $2^x + 3^y = z^2$.
3. **(Đa thức Cyclotomic):** Chứng minh rằng với mọi số nguyên dương $n$, đa thức $\Phi_n(x)$ nhận giá trị dương với mọi số thực $x > 1$.
