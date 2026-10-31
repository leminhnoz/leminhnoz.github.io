---
title: "Chuyên đề Số học Olympic: Thặng Dư Bậc Hai & Luật Thuận Nghịch Bình Phương Gauss"
description: "Khám phá 'Định lý vàng' của Carl Friedrich Gauss — Ký hiệu Legendre, Tiêu chuẩn Euler, Bổ đề Gauss, Luật thuận nghịch bình phương và ứng dụng triệt hạ các phương trình Diophantine bậc hai trong VMO, USAMO và IMO."
pubDate: "2026-02-05"
tags: ["Toán học", "Số học", "Olympic", "VMO", "IMO", "Quadratic Reciprocity", "Legendre", "Gauss"]
categories: ["Toán học Olympic"]
excerpt: "Luật thuận nghịch bậc hai Gauss là một trong những viên ngọc đẹp nhất của toán học nhân loại, mở ra câu trả lời toàn diện cho câu hỏi: khi nào một số là số chính phương modulo p?"
---

> *"Theorema Aureum (Định lý Vàng) — Carl Friedrich Gauss đã dành trọn vẹn cả thanh xuân để tìm ra không dưới 8 cách chứng minh khác nhau cho định lý này."*

Trong số học Olympic, câu hỏi: *"Liệu phương trình đồng dư bậc hai $x^2 \equiv a \pmod p$ có nghiệm hay không?"* là một câu hỏi trung tâm. **Luật thuận nghịch bình phương Gauss** cùng với **Ký hiệu Legendre** cung cấp một thuật toán giải tích tinh tế để trả lời trọn vẹn câu hỏi đó mà không cần phải thực hiện phép thử nghiệm kiệt sức.

---

## 1. Thặng Dư Bậc Hai & Ký Hiệu Legendre

### Định nghĩa
Cho $p$ là một số nguyên tố lẻ và $a$ là một số nguyên thỏa mãn $\gcd(a, p) = 1$.
- Ta gọi $a$ là một **thặng dư bậc hai (Quadratic Residue - QR)** modulo $p$ nếu tồn tại số nguyên $x$ sao cho:
  $$x^2 \equiv a \pmod p$$
- Nếu không tồn tại số nguyên $x$ như vậy, ta gọi $a$ là một **bất thặng dư bậc hai (Quadratic Non-Residue - NR)** modulo $p$.

### Ký hiệu Legendre
Ký hiệu Legendre $\left(\frac{a}{p}\right)$ được định nghĩa như sau:
$$\left(\frac{a}{p}\right) = \begin{cases}
1 & \text{nếu } a \text{ là thặng dư bậc hai mod } p \\
-1 & \text{nếu } a \text{ là bất thặng dư bậc hai mod } p \\
0 & \text{nếu } p \mid a
\end{cases}$$

### Tiêu chuẩn Euler (Euler's Criterion)
> Với mọi số nguyên tố lẻ $p$ và số nguyên $a$:
> $$\left(\frac{a}{p}\right) \equiv a^{\frac{p-1}{2}} \pmod p$$

*Chứng minh:*
- Nếu $p \mid a$, hai vế đều bằng $0 \pmod p$.
- Nếu $\left(\frac{a}{p}\right) = 1$, tồn tại $x$ sao cho $x^2 \equiv a \pmod p$. Theo Định lý Fermat nhỏ:
  $$a^{\frac{p-1}{2}} \equiv (x^2)^{\frac{p-1}{2}} = x^{p-1} \equiv 1 \pmod p$$
- Nếu $\left(\frac{a}{p}\right) = -1$, với mỗi $i \in \{1, 2, \dots, p - 1\}$, tồn tại duy nhất $j$ sao cho $i \cdot j \equiv a \pmod p$. Vì $a$ không là số chính phương mod $p$, nên $i \ne j$.
  Ta ghép được $\frac{p - 1}{2}$ cặp $(i, j)$ có tích đồng dư với $a$.
  Nhân tất cả lại và áp dụng Định lý Wilson:
  $$(p - 1)! \equiv a^{\frac{p-1}{2}} \pmod p \implies -1 \equiv a^{\frac{p-1}{2}} \pmod p$$
Chứng minh hoàn tất. $\blacksquare$

### Các tính chất của Ký hiệu Legendre
1. **Tính nhân tính:** $\left(\frac{a \cdot b}{p}\right) = \left(\frac{a}{p}\right) \left(\frac{b}{p}\right)$
2. **Tính chu kỳ:** Nếu $a \equiv b \pmod p$ thì $\left(\frac{a}{p}\right) = \left(\frac{b}{p}\right)$
3. **Bình phương luôn là thặng dư:** $\left(\frac{a^2}{p}\right) = 1$ với mọi $p \nmid a$

---

## 2. Các Bổ Đề Bổ Sung (First & Second Supplements)

### Bổ đề bổ sung thứ nhất (Tính chất của $-1$)
$$\left(\frac{-1}{p}\right) = (-1)^{\frac{p-1}{2}} = \begin{cases}
1 & \text{nếu } p \equiv 1 \pmod 4 \\
-1 & \text{nếu } p \equiv 3 \pmod 4
\end{cases}$$

### Bổ đề bổ sung thứ hai (Tính chất của $2$)
$$\left(\frac{2}{p}\right) = (-1)^{\frac{p^2-1}{8}} = \begin{cases}
1 & \text{nếu } p \equiv \pm 1 \pmod 8 \\
-1 & \text{nếu } p \equiv \pm 3 \pmod 8
\end{cases}$$

---

## 3. Luật Thuận Nghịch Bình Phương Gauss (Law of Quadratic Reciprocity)

### Phát biểu định lý
Cho $p$ và $q$ là hai số nguyên tố lẻ phân biệt. Khi đó:
$$\left(\frac{p}{q}\right) \left(\frac{q}{p}\right) = (-1)^{\frac{p-1}{2} \cdot \frac{q-1}{2}}$$
Nói cách khác:
- Nếu ít nhất một trong hai số $p, q$ có dạng $4k + 1$:
  $$\left(\frac{p}{q}\right) = \left(\frac{q}{p}\right)$$
- Nếu cả hai số $p, q$ đều có dạng $4k + 3$:
  $$\left(\frac{p}{q}\right) = -\left(\frac{q}{p}\right)$$

Định lý này cho phép "lật ngược" tử số và mẫu số trong ký hiệu Legendre, kết hợp với phép chia có dư modulo, giúp việc tính toán $\left(\frac{a}{p}\right)$ diễn ra tương tự như thuật toán Euclid với tốc độ cực nhanh!

---

## 4. Bài toán Olympic chọn lọc & Lời giải chi tiết

### Bài toán 1 (USAMO 2008 Problem 1)
> **Đề bài:** Chứng minh rằng với mọi số nguyên dương $n$, số $A_n = 4^{2^n} + 2^{2^n} + 1$ có ít nhất một ước nguyên tố không phải là ước của bất kỳ số $A_k$ nào với $k < n$.

**Lời giải bằng Thặng dư bậc hai:**
Đặt $N = 2^n$. Ta có:
$$A_n = 4^N + 2^N + 1 = (2^N - 1)^2 + 3 \cdot 2^N$$
Mặt khác:
$$(2^N - 1) A_n = (2^N - 1)(4^N + 2^N + 1) = 8^N - 1 = 2^{3N} - 1$$
Gọi $p$ là một ước nguyên tố bất kỳ của $A_n$.
Khi đó $2^{3N} \equiv 1 \pmod p$, nhưng $2^N - 1 \not\equiv 0 \pmod p$ (vì nếu $2^N \equiv 1 \pmod p$ thì $A_n \equiv 1 + 1 + 1 = 3 \pmod p$, mà $A_n > 3$ với $n \ge 1$ và không chia hết cho 3).
Do đó cấp $\text{ord}_p(2) = 3N = 3 \cdot 2^n$.
Suy ra $3 \cdot 2^n \mid (p - 1) \implies p \equiv 1 \pmod{2^{n+1}}$.
Đặc biệt, $p \equiv 1 \pmod 8$.
Theo Bổ đề bổ sung thứ hai của Gauss:
$$\left(\frac{2}{p}\right) = 1$$
Điều này xác nhận rằng $2$ luôn là thặng dư bậc hai modulo mọi ước nguyên tố $p$ của $A_n$. Kết hợp tính chất cấp của các ước nguyên tố, không có ước nguyên tố nào của $A_n$ có thể chia hết $A_k$ với $k < n$ vì $\text{ord}_p(2) = 3 \cdot 2^n > 3 \cdot 2^k$. $\blacksquare$

---

### Bài toán 2 (Ứng dụng giải phương trình Diophantine)
> **Đề bài:** Tìm tất cả các số nguyên $x, y$ thỏa mãn phương trình:
> $$y^2 = x^3 - 5$$

**Lời giải:**
- Nếu $x$ chẵn, thì $x^3 \equiv 0 \pmod 8 \implies y^2 \equiv -5 \equiv 3 \pmod 8$.
  Nhưng số chính phương chỉ có thể đồng dư với $0, 1, 4 \pmod 8$, vô lý.
- Do đó $x$ phải là số lẻ.
  Ta viết lại phương trình thành:
  $$y^2 + 4 = x^3 - 1 = (x - 1)(x^2 + x + 1)$$
  Vì $x$ lẻ nên $x^2 + x + 1$ cũng lẻ, và:
  $$x^2 + x + 1 = x(x + 1) + 1 \equiv 0 + 1 = 1 \pmod 2$$
  Xét mod 4: $x^2 + x + 1 \equiv 1 + x + 1 = x + 2 \pmod 4$.
  Nếu $x \equiv 3 \pmod 4$, thì $x^2 + x + 1 \equiv 3 + 2 \equiv 1 \pmod 4$.
  Nếu $x \equiv 1 \pmod 4$, thì $x - 1 \equiv 0 \pmod 4 \implies y^2 + 4 \equiv 0 \pmod 4 \implies y$ chẵn.
  Tuy nhiên, biểu thức $x^2 + x + 1 = (x - 1/2)^2 + 3/4 > 0$.
  Ta thấy $x^2 + x + 1$ luôn có ít nhất một ước nguyên tố $p \equiv 3 \pmod 4$.
  Khi đó từ $p \mid (x^2 + x + 1) \mid (y^2 + 4)$, ta suy ra:
  $$y^2 \equiv -4 \pmod p \implies \left(\frac{-4}{p}\right) = 1 \implies \left(\frac{-1}{p}\right) = 1$$
  Theo Bổ đề bổ sung thứ nhất: $p \equiv 1 \pmod 4$.
  Điều này mâu thuẫn hoàn toàn với việc $p \equiv 3 \pmod 4$!
Vậy phương trình đã cho vô nghiệm nguyên. $\blacksquare$

---

## 5. Bài tập rèn luyện

1. **(Ký hiệu Legendre):** Tính giá trị của $\left(\frac{105}{227}\right)$ bằng Luật thuận nghịch Gauss.
2. **(Phương trình Diophantine):** Chứng minh phương trình $x^2 - 3y^2 = 17$ không có nghiệm nguyên.
3. **(VMO):** Cho $p$ là số nguyên tố dạng $8k + 7$. Chứng minh rằng $\sum_{i=1}^{p-1} i \cdot \left(\frac{i}{p}\right) < 0$.
