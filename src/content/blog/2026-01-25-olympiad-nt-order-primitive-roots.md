---
title: "Chuyên đề Số học Olympic: Cấp Của Phần Tử & Căn Nguyên Thủy"
description: "Nắm vững lý thuyết Cấp (Order of Elements) và Căn nguyên thủy (Primitive Roots) — chìa khóa phân tích cấu trúc nhóm nhân (Z/mZ)*, tìm ước nguyên tố và giải các bài toán số học chuyên sâu VMO và IMO."
pubDate: "2026-01-25"
tags: ["Toán học", "Số học", "Olympic", "VMO", "IMO", "Order", "Primitive Roots", "Number Theory"]
categories: ["Toán học Olympic"]
excerpt: "Cấp của phần tử và căn nguyên thủy mở ra bức tranh toàn cảnh về chu kỳ nhân modulo m, biến các bài toán lũy thừa phức tạp thành các phương trình chia hết trên bậc số mũ."
---

> *"Nắm vững khái niệm Cấp là bạn đã sở hữu chiếc la bàn để định hướng trong mê cung của số học mod m."*

Trong lý thuyết số học hiện đại và các kỳ thi VMO / IMO, **Cấp của một số nguyên modulo $m$** ($\text{ord}_m(a)$) và sự tồn tại của **Căn nguyên thủy** đóng vai trò hạt nhân để biến đổi các quan hệ đồng dư lũy thừa $a^k \equiv 1 \pmod m$ thành các bài toán chia hết thông thường trên số mũ.

---

## 1. Cấp của một số nguyên (Order of an Element)

### Định nghĩa
Cho $m$ là số nguyên dương lớn hơn $1$ và $a$ là số nguyên thỏa mãn $\gcd(a, m) = 1$.
Theo Định lý Euler, ta luôn có $a^{\varphi(m)} \equiv 1 \pmod m$. Do đó, tập hợp các số nguyên dương $k$ thỏa mãn $a^k \equiv 1 \pmod m$ là một tập con khác rỗng của $\mathbb{N}^*$.
Theo nguyên lý thứ tự tốt, luôn tồn tại số nguyên dương nhỏ nhất trong tập này. Ta gọi số đó là **cấp của $a$ modulo $m$**, ký hiệu là:
$$\text{ord}_m(a) \quad \text{hoặc} \quad d = \text{ord}_m(a)$$

### Các định lý và tính chất cốt lõi

#### Định lý 1 (Điều kiện tương đương cơ bản)
Cho $\gcd(a, m) = 1$ và $d = \text{ord}_m(a)$. Khi đó với mọi $k \in \mathbb{N}^*$:
$$a^k \equiv 1 \pmod m \iff d \mid k$$

*Chứng minh:*
- Chiều đảo: Nếu $d \mid k$, ta có $k = q \cdot d$. Khi đó $a^k = (a^d)^q \equiv 1^q = 1 \pmod m$.
- Chiều thuận: Giả sử $a^k \equiv 1 \pmod m$. Thực hiện phép chia có dư $k$ cho $d$:
  $$k = q \cdot d + r \quad (0 \le r < d)$$
  Khi đó:
  $$1 \equiv a^k = a^{q \cdot d + r} = (a^d)^q \cdot a^r \equiv 1^q \cdot a^r \equiv a^r \pmod m$$
  Nếu $r > 0$, ta có $a^r \equiv 1 \pmod m$ với $0 < r < d$, mâu thuẫn với tính nhỏ nhất của $d = \text{ord}_m(a)$.
  Do đó bắt buộc $r = 0$, tức là $d \mid k$. $\blacksquare$

#### Định lý 2 (Liên hệ với hàm Phi Euler)
Với mọi $a$ nguyên tố cùng nhau với $m$:
$$\text{ord}_m(a) \mid \varphi(m)$$

#### Định lý 3 (Cấp của lũy thừa)
Nếu $\text{ord}_m(a) = d$, thì với mọi số nguyên dương $k$:
$$\text{ord}_m(a^k) = \frac{d}{\gcd(k, d)}$$

---

## 2. Căn Nguyên Thủy (Primitive Roots)

### Định nghĩa
Một số nguyên $g$ được gọi là **căn nguyên thủy modulo $m$** nếu:
$$\text{ord}_m(g) = \varphi(m)$$
Khi đó, tập hợp các lũy thừa $\{g^1, g^2, \dots, g^{\varphi(m)}\}$ lập thành một hệ thặng dư thu gọn đầy đủ modulo $m$. Tức là nhóm nhân $(\mathbb{Z}/m\mathbb{Z})^\times$ là một **nhóm cyclic** sinh bởi $g$.

### Định lý tồn tại Căn Nguyên Thủy (Gauss)
> Căn nguyên thủy modulo $m$ tồn tại khi và chỉ khi $m$ có một trong các dạng sau:
> $$m \in \{2, 4, p^k, 2p^k\}$$
> trong đó $p$ là một số nguyên tố lẻ và $k \ge 1$.

### Số lượng căn nguyên thủy
Nếu modulo $m$ có căn nguyên thủy, thì số lượng căn nguyên thủy không đồng dư modulo $m$ đúng bằng:
$$\varphi(\varphi(m))$$

---

## 3. Các ứng dụng kinh điển trong bài thi Olympic

### Dạng 1: Xác định dạng ước nguyên tố của $a^n - 1$
Nếu $p$ là ước nguyên tố của $a^n - 1$ và $p$ không chia hết $a^k - 1$ với mọi $k < n$, thì:
$$\text{ord}_p(a) = n \implies n \mid \varphi(p) = p - 1 \implies p \equiv 1 \pmod n$$
Tính chất này là chìa khóa chứng minh có vô số số nguyên tố dạng $k \cdot n + 1$.

---

## 4. Bài toán Olympic chọn lọc & Lời giải

### Bài toán 1 (VMO 2021)
> **Đề bài:** Cho số nguyên $a > 1$. Giả sử $p$ là một số nguyên tố lẻ sao cho $p \mid \frac{a^p - 1}{a - 1}$. Chứng minh rằng $p \mid a - 1$ hoặc tồn tại ước nguyên tố $q$ của $a^p - 1$ thỏa mãn $q \equiv 1 \pmod p$.

**Lời giải:**
Ta xét hai khả năng của $\gcd(a - 1, p)$:
- **Khả năng 1:** Nếu $p \mid (a - 1)$, kết luận của đề bài được thỏa mãn trực tiếp.
- **Khả năng 2:** Nếu $p \nmid (a - 1)$.
  Từ giả thiết $p \mid \frac{a^p - 1}{a - 1}$, ta có $p \mid (a^p - 1)$, do đó:
  $$a^p \equiv 1 \pmod p$$
  Mặt khác, theo định lý Fermat nhỏ: $a^{p-1} \equiv 1 \pmod p$.
  Gọi $d = \text{ord}_p(a)$. Theo tính chất của cấp:
  $$d \mid p \quad \text{và} \quad d \mid (p - 1)$$
  Suy ra $d \mid \gcd(p, p - 1) = 1 \implies d = 1$.
  Nhưng $d = 1$ nghĩa là $a^1 \equiv 1 \pmod p \implies p \mid (a - 1)$, mâu thuẫn với giả sử của khả năng 2.
  
  Do đó, xét một ước nguyên tố bất kỳ $q$ của $\frac{a^p - 1}{a - 1}$.
  Ta có $a^p \equiv 1 \pmod q$.
  Gọi $k = \text{ord}_q(a)$. Khi đó $k \mid p$.
  Vì $p$ là số nguyên tố, nên $k = 1$ hoặc $k = p$.
  - Nếu $k = 1$, thì $a \equiv 1 \pmod q \implies q \mid (a - 1)$.
    Nhưng ta có đồng nhất thức:
    $$\frac{a^p - 1}{a - 1} = a^{p-1} + a^{p-2} + \dots + a + 1 \equiv \underbrace{1 + 1 + \dots + 1}_{p \text{ số hạng}} = p \pmod q$$
    Do $q \mid \frac{a^p - 1}{a - 1}$, suy ra $p \equiv 0 \pmod q \implies q = p$.
    Điều này dẫn tới $p \mid (a - 1)$, đưa ta về Khả năng 1.
  - Nếu $k = p$, thì theo định lý Fermat nhỏ cho $q$:
    $$k \mid (q - 1) \implies p \mid (q - 1) \implies q \equiv 1 \pmod p$$
    Ước nguyên tố $q$ này chính là số thỏa mãn yêu cầu bài toán. $\blacksquare$

---

### Bài toán 2 (IMO Shortlist 2006 N5)
> **Đề bài:** Tìm tất cả các cặp số nguyên dương $(x, y)$ sao cho:
> $$\frac{x^7 - 1}{x - 1} = y^5 - 1$$

**Phân tích & Hướng dẫn bằng lý thuyết Cấp:**
Biểu thức vế trái là $\Phi_7(x) = x^6 + x^5 + \dots + x + 1$.
Mọi ước nguyên tố $p$ của vế trái hoặc chia hết cho $7$, hoặc thỏa mãn $\text{ord}_p(x) = 7$, từ đó kéo theo $p \equiv 1 \pmod 7$.
Bằng việc phân tích cấp của $y$ modulo các ước nguyên tố này kết hợp với bất đẳng thức kích thước, ta chứng minh được phương trình không có nghiệm nguyên dương nào ngoài các nghiệm tầm thường.

---

## 5. Bài tập rèn luyện

1. **(Căn nguyên thủy mod $p^2$):** Chứng minh rằng nếu $g$ là căn nguyên thủy modulo $p$ ($p$ lẻ), thì hoặc $g$ hoặc $g + p$ là căn nguyên thủy modulo $p^2$.
2. **(Định lý Fermat):** Chứng minh rằng mọi ước nguyên tố của số Fermat $F_n = 2^{2^n} + 1$ đều có dạng $k \cdot 2^{n+1} + 1$.
3. **(IMO Shortlist):** Cho $a, b$ là các số nguyên dương thỏa mãn $a^n + n \mid b^n + n$ với mọi số nguyên dương $n$. Chứng minh rằng $a = b$.
