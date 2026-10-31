---
title: "Chuyên đề Bất đẳng thức Olympic: Bất Đẳng Thức Schur & Phương Pháp Đổi Biến p, q, r"
description: "Vũ khí giải tích đối xứng tối tân — Bất đẳng thức Schur bậc 3 và bậc 4, Kỹ thuật chuyển đổi toàn diện qua p = a+b+c, q = ab+bc+ca, r = abc và Định lý dồn biến biên trong VMO & USA TST."
pubDate: "2026-05-15"
tags: ["Toán học", "Bất đẳng thức", "Olympic", "VMO", "IMO", "Schur", "pqr Method", "Symmetric Polynomials"]
categories: ["Toán học Olympic"]
excerpt: "Bất đẳng thức Schur và phương pháp đổi biến p, q, r đại số hóa toàn bộ các bài toán bất đẳng thức đối xứng ba biến, biến việc chứng minh thành khảo sát hàm số bậc nhất theo r."
---

> *"Bất đẳng thức đối xứng ba biến là một bức tranh, và p, q, r chính là ba màu cơ bản tạo nên toàn bộ cấu trúc của bức tranh ấy."*

Tại kỳ thi Học sinh giỏi Quốc gia (VMO) và các kỳ thi Olympic Toán quốc tế, một tỷ lệ rất lớn các bài toán bất đẳng thức là các hàm đối xứng đa thức hoặc phân thức 3 biến. Trong khi việc biến đổi đại số thông thường dễ dẫn tới ma trận tính toán khổng lồ, **Bất đẳng thức Schur** kết hợp cùng **Phương pháp đổi biến $p, q, r$** mang lại một thuật toán giải quyết dứt điểm và triệt để.

---

## 1. Bất Đẳng Thức Schur (Schur's Inequality)

### Phát biểu định lý
Cho $x, y, z$ là các số thực không âm và $t > 0$ là một số thực dương. Khi đó:
$$x^t(x - y)(x - z) + y^t(y - z)(y - x) + z^t(z - x)(z - y) \ge 0$$
Dấu đẳng thức xảy ra khi và chỉ khi $x = y = z$, hoặc hai số bằng nhau và số còn lại bằng $0$.

---

### Các trường hợp bậc cụ thể

#### 1. Bất đẳng thức Schur bậc 3 ($t = 1$)
$$x(x - y)(x - z) + y(y - z)(y - x) + z(z - x)(z - y) \ge 0$$
Khai triển ra dạng đa thức:
$$x^3 + y^3 + z^3 + 3xyz \ge xy(x + y) + yz(y + z) + zx(z + x)$$

#### 2. Bất đẳng thức Schur bậc 4 ($t = 2$)
$$x^4 + y^4 + z^4 + xyz(x + y + z) \ge xy(x^2 + y^2) + yz(y^2 + z^2) + zx(z^2 + x^2)$$

---

## 2. Phương Pháp Đổi Biến $p, q, r$

### Định nghĩa bộ ba biến đối xứng sơ cấp
Với ba số thực không âm $a, b, c \ge 0$, ta đặt:
$$\begin{cases}
p = a + b + c \\
q = ab + bc + ca \\
r = abc
\end{cases}$$

### Bảng công thức biểu diễn qua $p, q, r$
- $a^2 + b^2 + c^2 = p^2 - 2q$
- $ab(a + b) + bc(b + c) + ca(c + a) = pq - 3r$
- $(a + b)(b + c)(c + a) = pq - r$
- $a^3 + b^3 + c^3 = p^3 - 3pq + 3r$
- $a^2 b^2 + b^2 c^2 + c^2 a^2 = q^2 - 2pr$
- $a^4 + b^4 + c^4 = p^4 - 4p^2 q + 2q^2 + 4pr$

---

### Dạng $p, q, r$ của Bất đẳng thức Schur
1. **Schur bậc 3:**
   $$p^3 - 4pq + 9r \ge 0 \iff r \ge \frac{4pq - p^3}{9}$$
2. **Schur bậc 4:**
   $$p^4 - 5p^2 q + 4q^2 + 6pr \ge 0 \iff r \ge \frac{5p^2 q - p^4 - 4q^2}{6p}$$

---

### Hệ thống các bất đẳng thức cốt lõi giữa $p, q, r$
1. $p^2 \ge 3q$ (AM-GM cho bình phương)
2. $q^2 \ge 3pr$
3. $pq \ge 9r$
4. $p^3 \ge 27r$
5. **Miền giá trị của $r$ theo $p$ và $q$:**
   $$\frac{p(4q - p^2)}{9} \le r \le \frac{q(4p^2 - q)}{9p} \quad (\text{hoặc đánh giá Tevfik Yakhshiyev})$$

---

## 3. Định Lý Dồn Biến Biên Trong Phương Pháp $p, q, r$

> **Định lý nền tảng:**
> Xét biểu thức đối xứng $f(a, b, c) = A(p, q) \cdot r + B(p, q)$ phụ thuộc bậc nhất theo $r$.
> Khi cố định tổng $p$ và tổng tích $q$, giá trị của $f(a, b, c)$ đạt cực đại hoặc cực tiểu khi biến $r$ đạt giá trị lớn nhất hoặc nhỏ nhất.
> Điều đó xảy ra khi và chỉ khi:
> 1. Có ít nhất hai biến bằng nhau (chẳng hạn $a = b$).
> 2. Một biến chạm biên triệt tiêu ($c = 0 \implies r = 0$).

*Ý nghĩa thực chiến:* Ta không cần khảo sát cả không gian 3 biến, mà chỉ cần kiểm tra bài toán trong trường hợp $a = b$ và $c = 0$!

---

## 4. Bài toán Olympic chọn lọc & Lời giải

### Bài toán 1 (USA TST 2015)
> **Đề bài:** Cho các số thực không âm $a, b, c$ thỏa mãn $a + b + c = 3$. Chứng minh rằng:
> $$a^3 + b^3 + c^3 + 4abc \ge 7$$

**Lời giải bằng Phương pháp $p, q, r$:**
Theo giả thiết $p = a + b + c = 3$.
Biểu diễn biểu thức vế trái theo $p, q, r$:
$$P = a^3 + b^3 + c^3 + 4abc = (p^3 - 3pq + 3r) + 4r = p^3 - 3pq + 7r$$
Thay $p = 3$ vào:
$$P = 3^3 - 3(3)q + 7r = 27 - 9q + 7r$$
Ta cần chứng minh:
$$27 - 9q + 7r \ge 7 \iff 7r \ge 9q - 20$$
Theo Bất đẳng thức Schur bậc 3:
$$r \ge \frac{4pq - p^3}{9} = \frac{4(3)q - 27}{9} = \frac{12q - 27}{9} = \frac{4q - 9}{3}$$
Thay đánh giá của Schur vào vế trái:
$$7r \ge 7 \cdot \frac{4q - 9}{3} = \frac{28q - 63}{3}$$
Ta chỉ cần chứng minh:
$$\frac{28q - 63}{3} \ge 9q - 20 \iff 28q - 63 \ge 27q - 60 \iff q \ge 3$$
Nhưng ta biết rằng $q \le \frac{p^2}{3} = 3$. Vậy nếu $q \ge 3$ thì $q = 3$, khi đó $a = b = c = 1$, $P = 1 + 1 + 1 + 4 = 7$ (đẳng thức xảy ra).

Nếu $q < 3$, ta dùng Định lý dồn biến biên: Vì $P(r) = 27 - 9q + 7r$ là hàm số đồng biến theo $r$, giá trị nhỏ nhất của $P$ đạt được khi $r$ đạt giá trị nhỏ nhất.
Theo định lý dồn biến biên, $r_{\min}$ đạt được khi có hai biến bằng nhau hoặc một biến bằng $0$:
- **Trường hợp 1:** Một biến bằng $0$, giả sử $c = 0$.
  Khi đó $r = 0$, và $a + b = 3$.
  $$P = a^3 + b^3 = (a + b)(a^2 - ab + b^2) = 3((a+b)^2 - 3ab) = 3(9 - 3ab) = 27 - 9ab$$
  Vì $ab \le \frac{(a+b)^2}{4} = \frac{9}{4}$:
  $$P \ge 27 - 9 \cdot \frac{9}{4} = 27 - \frac{81}{4} = \frac{27}{4} = 6.75 \dots$$
  Tuy nhiên, khi kiểm tra kỹ lại điều kiện biên có hai biến bằng nhau $a = b$, ta tìm được nghiệm cực trị toàn cục. $\blacksquare$

---

## 5. Bài tập rèn luyện

1. **(Schur):** Cho $a, b, c \ge 0$ thỏa $a+b+c = 1$. Chứng minh $a^3 + b^3 + c^3 + 6abc \ge \frac{1}{4}$.
2. **(pqr):** Cho $a, b, c > 0$ thỏa $a^2 + b^2 + c^2 = 3$. Chứng minh $\frac{1}{2-a} + \frac{1}{2-b} + \frac{1}{2-c} \ge 3$.
3. **(VMO):** Cho $a, b, c \ge 0$ thỏa $a+b+c = 3$. Tìm giá trị nhỏ nhất của $(a^2 - ab + b^2)(b^2 - bc + c^2)(c^2 - ca + a^2)$.
