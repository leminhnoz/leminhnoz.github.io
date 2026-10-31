---
title: "Chuyên đề Số học Olympic: Lý thuyết Đồng dư thức, Hàm phi Euler và Định lý Fermat nhỏ"
description: "Khảo sát đại số vành Z/mZ, hệ thặng dư đầy đủ và thu gọn, chứng minh định lý Fermat nhỏ, định lý Euler tổng quát và ứng dụng giải các bài toán chu kỳ đồng dư trong IMO & VMO."
pubDate: "2026-01-15"
tags: ["Toán học", "Số học", "Olympic", "VMO", "IMO", "Định lý Euler", "Fermat", "Number Theory"]
categories: ["Toán học Olympic"]
excerpt: "Đồng dư thức không chỉ là phép lấy phần dư — đó là một phép đồng cấu cấu trúc biến trục số vô hạn thành những chu kỳ tuần hoàn hữu hạn tuyệt mỹ."
---

> *"Quan hệ đồng dư thức là một trong những phát kiến vĩ đại nhất của Gauss, đặt nền móng cho toàn bộ số học hiện đại."*

Trong số học Olympic, kỹ thuật xét số dư theo modulo thích hợp thường biến một bài toán dường như bất khả thi thành một bài toán đếm trạng thái hữu hạn. Bài viết này sẽ phân tích từ bản chất đại số của **Hệ thặng dư** đến hai định lý trụ cột: **Fermat nhỏ** và **Euler**.

---

## 1. Bản chất Đại số của Đồng dư thức

### Định nghĩa
Cho số nguyên dương $m \ge 1$. Hai số nguyên $a, b$ được gọi là **đồng dư với nhau theo modulo $m$**, ký hiệu:
$$a \equiv b \pmod m \iff m \mid (a - b)$$

### Các tính chất tương thích đại số
Nếu $a \equiv b \pmod m$ và $c \equiv d \pmod m$, thì:
1. $a \pm c \equiv b \pm d \pmod m$
2. $a \cdot c \equiv b \cdot d \pmod m$
3. $a^k \equiv b^k \pmod m \quad (\forall k \in \mathbb{N}^*)$

> **Cảnh báo về phép chia:** Phép chia trong đồng dư thức không diễn ra tùy tiện.
> Nếu $a \cdot c \equiv b \cdot c \pmod m$ thì ta chỉ có thể suy ra:
> $$a \equiv b \pmod{\frac{m}{\gcd(c, m)}}$$
> Đặc biệt, nếu $\gcd(c, m) = 1$ thì ta được phép giản ước $c$: $a \equiv b \pmod m$.

---

## 2. Hệ thặng dư đầy đủ và Hệ thặng dư thu gọn

### Hệ thặng dư đầy đủ
Tập hợp $S = \{x_1, x_2, \dots, x_m\}$ được gọi là một **hệ thặng dư đầy đủ modulo $m$** nếu mỗi số nguyên bất kỳ đều đồng dư với đúng một phần tử thuộc $S$.
Hệ thặng dư đầy đủ chính tắc đơn giản nhất là $\{0, 1, 2, \dots, m - 1\}$.

### Hệ thặng dư thu gọn & Hàm phi Euler $\phi(m)$
Tập hợp các phần tử trong hệ thặng dư đầy đủ nguyên tố cùng nhau với $m$ tạo thành **hệ thặng dư thu gọn modulo $m$**.
Số lượng phần tử của hệ thặng dư thu gọn được ký hiệu là $\phi(m)$ (**Hàm phi Euler**):
$$\phi(m) = |\{ k \in \mathbb{Z} \mid 1 \le k \le m, \, \gcd(k, m) = 1 \}|$$

### Công thức tính hàm phi Euler
Nếu phân tích tiêu chuẩn của $m$ thành thừa số nguyên tố là $m = p_1^{\alpha_1} p_2^{\alpha_2} \dots p_k^{\alpha_k}$, thì:
$$\phi(m) = m \cdot \left(1 - \frac{1}{p_1}\right) \left(1 - \frac{1}{p_2}\right) \dots \left(1 - \frac{1}{p_k}\right)$$

---

## 3. Định lý Fermat nhỏ và Định lý Euler

### Định lý Euler
Với mọi số nguyên $a$ và số nguyên dương $m$ thỏa mãn $\gcd(a, m) = 1$, ta luôn có:
$$a^{\phi(m)} \equiv 1 \pmod m$$

### Chứng minh bằng Phương pháp Hoán vị Hệ thặng dư
Gọi $\{r_1, r_2, \dots, r_{\phi(m)}\}$ là một hệ thặng dư thu gọn modulo $m$.
Xét tập hợp các tích:
$$A = \{ a \cdot r_1, \, a \cdot r_2, \, \dots, \, a \cdot r_{\phi(m)} \}$$

1. **Các phần tử của $A$ đều nguyên tố cùng nhau với $m$:** Do $\gcd(a, m) = 1$ và $\gcd(r_i, m) = 1 \implies \gcd(a r_i, m) = 1$.
2. **Các phần tử đôi một không đồng dư modulo $m$:** Giả sử $a r_i \equiv a r_j \pmod m$. Vì $\gcd(a, m) = 1$, ta giản ước được $a$, suy ra $r_i \equiv r_j \pmod m \implies i = j$.
3. Do đó, $A$ chính là một hoán vị của hệ thặng dư thu gọn ban đầu modulo $m$. Nhân tất cả các phần tử lại:
   $$\prod_{i=1}^{\phi(m)} (a \cdot r_i) \equiv \prod_{i=1}^{\phi(m)} r_i \pmod m$$
   $$a^{\phi(m)} \cdot \prod_{i=1}^{\phi(m)} r_i \equiv \prod_{i=1}^{\phi(m)} r_i \pmod m$$
4. Đặt $P = \prod r_i$. Do $\gcd(P, m) = 1$, ta giản ước $P$ ở hai vế, thu được:
   $$a^{\phi(m)} \equiv 1 \pmod m \quad \blacksquare$$

### Hệ quả: Định lý Fermat nhỏ (Fermat's Little Theorem)
Khi $m = p$ là một số nguyên tố, ta có $\phi(p) = p - 1$. Với mọi $a$ không chia hết cho $p$:
$$a^{p-1} \equiv 1 \pmod p$$
Dạng tổng quát với mọi số nguyên $a$:
$$a^p \equiv a \pmod p$$

---

## 4. Ứng dụng giải bài toán Olympic

### Bài toán (IMO Shortlist)
Chứng minh rằng với mọi số nguyên tố $p > 3$, tử số của phân số sau khi rút gọn luôn chia hết cho $p^2$:
$$S = 1 + \frac{1}{2} + \frac{1}{3} + \dots + \frac{1}{p-1}$$
*(Định lý Wolstenholme sơ cấp)*

**Lời giải:**
Ta nhóm các phân số đối xứng từ hai đầu:
$$S = \sum_{k=1}^{\frac{p-1}{2}} \left( \frac{1}{k} + \frac{1}{p - k} \right) = \sum_{k=1}^{\frac{p-1}{2}} \frac{p}{k(p - k)} = p \cdot \sum_{k=1}^{\frac{p-1}{2}} \frac{1}{k(p - k)}$$
Quy đồng mẫu số: mẫu số chung là $(p-1)!$, tử số có thừa số $p$:
$$\sum_{k=1}^{\frac{p-1}{2}} \frac{1}{k(p - k)} \equiv \sum_{k=1}^{\frac{p-1}{2}} \frac{1}{-k^2} \equiv - \sum_{k=1}^{\frac{p-1}{2}} (k^{-1})^2 \pmod p$$
Khi $k$ chạy từ $1$ đến $\frac{p-1}{2}$, các nghịch đảo $(k^{-1})^2$ phủ kín tập các thặng dư chính phương modulo $p$.
Tổng các bình phương của hệ thặng dư modulo $p$ chia hết cho $p$ khi $p > 3$:
$$\sum_{k=1}^{p-1} k^2 = \frac{(p-1)p(2p-1)}{6} \equiv 0 \pmod p$$
Do đó tổng trên chia hết cho $p$, kết hợp với thừa số $p$ đặt ra ngoài ban đầu, tử số chia hết cho $p^2$. $\blacksquare$

---

## 5. Tổng kết
Định lý Euler và Fermat nhỏ là nền móng để xác định chu kỳ lũy thừa. Ở bài viết kế tiếp, chúng ta sẽ mở rộng sang **Định lý Wilson và Định lý Thặng Dư Trung Hoa (CRT)**.
