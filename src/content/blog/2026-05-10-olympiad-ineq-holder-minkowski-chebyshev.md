---
title: "Chuyên đề Bất đẳng thức Olympic: Hölder, Minkowski, Chebyshev & Bất Đẳng Thức Hoán Vị"
description: "Vũ khí khử căn thức và sắp xếp thứ tự — Bất đẳng thức Hölder cho nhiều bộ số, Bất đẳng thức tam giác Minkowski, Bất đẳng thức Chebyshev cho dãy đơn điệu và Bất đẳng thức Hoán vị trong VMO & IMO."
pubDate: "2026-05-10"
tags: ["Toán học", "Bất đẳng thức", "Olympic", "VMO", "IMO", "Holder", "Minkowski", "Chebyshev", "Rearrangement"]
categories: ["Toán học Olympic"]
excerpt: "Bất đẳng thức Hölder là phiên bản mở rộng phi thường của Cauchy-Schwarz, cho phép triệt tiêu căn thức bậc ba và phân thức lũy thừa cao chỉ trong một bước đánh giá duy nhất."
---

> *"Khi bài toán xuất hiện căn thức bậc ba hoặc lũy thừa chéo phức tạp, Cauchy-Schwarz thường chịu bó tay. Đó chính là thời khắc của Bất đẳng thức Hölder."*

Trong các đề thi VMO và Olympic khu vực, các bài toán bất đẳng thức đối xứng thường xuyên chứa căn bậc ba hoặc tích nhiều biểu thức phi tuyến. Các bất đẳng thức cổ điển nâng cao gồm **Bất đẳng thức Hölder**, **Bất đẳng thức Minkowski (bất đẳng thức tam giác)**, **Bất đẳng thức Chebyshev** và **Bất đẳng thức Hoán vị** tạo nên hệ thống công cụ đánh giá toàn diện.

---

## 1. Bất Đẳng Thức Hölder (Hölder's Inequality)

### Dạng tổng quát cho hai bộ số
Cho hai bộ số thực không âm $(a_1, \dots, a_n)$ và $(b_1, \dots, b_n)$, và hai số thực $p, q > 1$ thỏa mãn điều kiện liên hợp:
$$\frac{1}{p} + \frac{1}{q} = 1$$
Khi đó:
$$\sum_{i=1}^n a_i b_i \le \left( \sum_{i=1}^n a_i^p \right)^{\frac{1}{p}} \left( \sum_{i=1}^n b_i^q \right)^{\frac{1}{q}}$$

---

### Dạng mở rộng cho 3 bộ số (Khử căn thức bậc 3)
Cho 3 bộ số thực dương $(a_1, a_2, a_3), (b_1, b_2, b_3), (c_1, c_2, c_3)$. Khi đó:
$$\left( \sum_{i=1}^3 a_i^3 \right) \left( \sum_{i=1}^3 b_i^3 \right) \left( \sum_{i=1}^3 c_i^3 \right) \ge \left( \sum_{i=1}^3 a_i b_i c_i \right)^3$$

*Dạng phân thức thực chiến:*
$$\sum_{i=1}^3 \frac{x_i^3}{y_i} \ge \frac{(x_1 + x_2 + x_3)^3}{3(y_1 + y_2 + y_3)}$$
Đặc biệt, để đánh giá tổng $\sum \frac{a}{\sqrt[3]{x}}$, ta nhân thêm hai bộ số phụ thích hợp để khử hoàn toàn căn thức ở mẫu số!

---

## 2. Bất Đẳng Thức Minkowski (Tam Giác Vector)

### Phát biểu định lý
Cho hai bộ $n$ số thực $(a_1, \dots, a_n)$ và $(b_1, \dots, b_n)$. Khi đó:
$$\sqrt{\sum_{i=1}^n (a_i + b_i)^2} \le \sqrt{\sum_{i=1}^n a_i^2} + \sqrt{\sum_{i=1}^n b_i^2}$$
Dấu đẳng thức xảy ra khi và chỉ khi hai vector $\vec{u} = (a_1, \dots, a_n)$ và $\vec{v} = (b_1, \dots, b_n)$ cùng hướng: $\frac{a_1}{b_1} = \dots = \frac{a_n}{b_n} > 0$.

*(Hình học: Độ dài cạnh thứ ba trong tam giác không vượt quá tổng độ dài hai cạnh còn lại).*

---

## 3. Bất Đẳng Thức Chebyshev & Bất Đẳng Thức Hoán Vị

### Bất đẳng thức Hoán vị (Rearrangement Inequality)
Cho hai dãy số thực sắp thứ tự cùng chiều:
$$a_1 \le a_2 \le \dots \le a_n \quad \text{và} \quad b_1 \le b_2 \le \dots \le b_n$$
Với mọi hoán vị $(\pi(1), \dots, \pi(n))$ của tập $\{1, 2, \dots, n\}$, ta luôn có:
$$\sum_{i=1}^n a_i b_{n-i+1} \le \sum_{i=1}^n a_i b_{\pi(i)} \le \sum_{i=1}^n a_i b_i$$
> **Nguyên tắc vàng:**
> - Tích sắp cùng chiều cho giá trị **Lớn nhất** (thứ tự thuận).
> - Tích sắp ngược chiều cho giá trị **Nhỏ nhất** (thứ tự nghịch).

---

### Bất đẳng thức Chebyshev
Nếu hai dãy số $a_1 \le a_2 \le \dots \le a_n$ và $b_1 \le b_2 \le \dots \le b_n$ đơn điệu cùng chiều:
$$n \sum_{i=1}^n a_i b_i \ge \left( \sum_{i=1}^n a_i \right) \left( \sum_{i=1}^n b_i \right)$$
Nếu hai dãy đơn điệu ngược chiều, bất đẳng thức đổi chiều.

---

## 4. Bài toán Olympic chọn lọc & Lời giải

### Bài toán 1 (IMO 2001 Problem 2)
> **Đề bài:** Cho các số thực dương $a, b, c$. Chứng minh rằng:
> $$\frac{a}{\sqrt{a^2 + 8bc}} + \frac{b}{\sqrt{b^2 + 8ca}} + \frac{c}{\sqrt{c^2 + 8ab}} \ge 1$$

**Lời giải bằng Bất đẳng thức Hölder:**
Đặt $S = \sum_{\text{cyc}} \frac{a}{\sqrt{a^2 + 8bc}}$.
Để khử căn bậc hai ở mẫu, ta áp dụng Bất đẳng thức Hölder cho 3 bộ số với số mũ $(1, 1, 1)$:
$$\left( \sum_{\text{cyc}} \frac{a}{\sqrt{a^2 + 8bc}} \right)^2 \cdot \left( \sum_{\text{cyc}} a(a^2 + 8bc) \right) \ge (a + b + c)^3$$
Suy ra:
$$S^2 \ge \frac{(a + b + c)^3}{\sum_{\text{cyc}} a(a^2 + 8bc)} = \frac{(a + b + c)^3}{a^3 + b^3 + c^3 + 24abc}$$
Như vậy, ta chỉ cần chứng minh:
$$(a + b + c)^3 \ge a^3 + b^3 + c^3 + 24abc$$
Khai triển hằng đẳng thức lũy thừa 3:
$$(a + b + c)^3 = a^3 + b^3 + c^3 + 3(a + b)(b + c)(c + a)$$
Mặt khác:
$$(a + b)(b + c)(c + a) = (a + b + c)(ab + bc + ca) - abc$$
Theo AM-GM:
$$(a + b)(b + c)(c + a) \ge 2\sqrt{ab} \cdot 2\sqrt{bc} \cdot 2\sqrt{ca} = 8abc$$
Do đó:
$$(a + b + c)^3 = a^3 + b^3 + c^3 + 3(a + b)(b + c)(c + a) \ge a^3 + b^3 + c^3 + 3(8abc) = a^3 + b^3 + c^3 + 24abc$$
Bất đẳng thức được chứng minh hoàn toàn!
Dấu đẳng thức xảy ra khi và chỉ khi $a = b = c$. $\blacksquare$

---

## 5. Bài tập rèn luyện

1. **(Hölder):** Cho $a, b, c > 0$ thỏa $abc = 1$. Chứng minh $\frac{a}{(a+1)(b+1)} + \frac{b}{(b+1)(c+1)} + \frac{c}{(c+1)(a+1)} \ge \frac{3}{4}$.
2. **(Minkowski):** Cho $a, b, c > 0$ thỏa $a+b+c = 1$. Tìm GTNN của $\sqrt{a^2 + \frac{1}{b^2}} + \sqrt{b^2 + \frac{1}{c^2}} + \sqrt{c^2 + \frac{1}{a^2}}$.
3. **(Chebyshev):** Cho $a, b, c > 0$. Chứng minh $\frac{a^3}{b+c} + \frac{b^3}{c+a} + \frac{c^3}{a+b} \ge \frac{a^2 + b^2 + c^2}{2}$.
