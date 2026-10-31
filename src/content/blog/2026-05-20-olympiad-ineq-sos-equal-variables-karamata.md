---
title: "Chuyên đề Bất đẳng thức Olympic: Phương Pháp SOS, Dồn Biến (EV/MV) & BĐT Karamata"
description: "Đỉnh cao của nghệ thuật chứng minh Bất đẳng thức IMO — Phân tích tổng bình phương SOS (Sum of Squares), Phương pháp Dồn biến hai biến bằng nhau (Equal Variables) và Bất đẳng thức dãy trội Karamata."
pubDate: "2026-05-20"
tags: ["Toán học", "Bất đẳng thức", "Olympic", "VMO", "IMO", "SOS Method", "Equal Variables", "Karamata", "Majorization"]
categories: ["Toán học Olympic"]
excerpt: "Khi các phương pháp cổ điển bất lực trước các điểm rơi tại biên hoặc đa điểm rơi, SOS và Dồn biến EV là hai cỗ máy hủy diệt đưa bài toán về phép phân tích bình phương không âm."
---

> *"Một bài toán bất đẳng thức khó là một mê cung nhiều chiều. Phương pháp Dồn biến kéo nó về một chiều duy nhất, còn SOS phân rã nó thành các bình phương hiển nhiên."*

Trong kỷ nguyên vàng của Bất đẳng thức Olympic Việt Nam và thế giới, những phương pháp hiện đại xuất phát từ các nhà toán học trẻ như **Phương pháp Phân tích Bình phương SOS (Sum of Squares)** của Trần Phương - Võ Quốc Bá Cẩn, **Phương pháp Dồn biến EV (Equal Variables)** của Phạm Kim Hùng và **Bất đẳng thức Karamata** về dãy trội đã tạo nên bước ngoặt mang tính cách mạng.

---

## 1. Phương Pháp Phân Tích Bình Phương SOS (Sum of Squares)

### Dạng chính tắc SOS
Mọi bất đẳng thức đối xứng hoặc hoán vị ba biến bậc hai theo hiệu $(a-b, b-c, c-a)$ đều có thể đưa về dạng chính tắc:
$$S = S_a (b - c)^2 + S_b (c - a)^2 + S_c (a - b)^2 \ge 0$$
trong đó $S_a, S_b, S_c$ là các hàm số đối xứng của $a, b, c$.

---

### Tiêu Chuẩn Phán Quyết Dấu SOS
Giả sử các biến được sắp xếp theo thứ tự: $a \ge b \ge c$. Khi đó $S \ge 0$ nếu thỏa mãn một trong các tiêu chuẩn sau:

1. **Tiêu chuẩn 1 (Hiển nhiên):**
   $$S_a \ge 0, \quad S_b \ge 0, \quad S_c \ge 0$$
2. **Tiêu chuẩn 2 (Cơ bản):**
   $$S_b \ge 0, \quad S_b + S_a \ge 0, \quad S_b + S_c \ge 0$$
3. **Tiêu chuẩn 3 (Mạnh):**
   $$S_b \ge 0, \quad S_a + S_b \ge 0, \quad S_a S_b + S_b S_c + S_c S_a \ge 0$$
4. **Tiêu chuẩn 4 (Dành cho điểm rơi tại biên):**
   $$S_b \ge 0, \quad S_c \ge 0, \quad b^2 S_b + c^2 S_c \ge 0$$

*Ý nghĩa thực chiến:* Ta không cần cả ba hệ số $S_a, S_b, S_c$ đều dương! Ngay cả khi $S_a < 0$, đại lượng $S$ vẫn hoàn toàn không âm nếu hệ số $S_b, S_c$ đủ lớn để lấn át.

---

## 2. Phương Pháp Dồn Biến (Equal Variables - EV)

### Tư tưởng của Phạm Kim Hùng
Ý tưởng cốt lõi của phương pháp Dồn biến là chứng minh giá trị của hàm số $f(a, b, c)$ giảm (hoặc tăng) khi ta thay hai biến bất kỳ bằng giá trị trung bình cộng hoặc trung bình nhân của chúng:
$$f(a, b, c) \ge f\left(a, \frac{b+c}{2}, \frac{b+c}{2}\right) \quad \text{hoặc} \quad f(a, b, c) \ge f(a, \sqrt{bc}, \sqrt{bc})$$

### Định lý Equal Variables (EV)
> Cho hàm số đối xứng $f(x_1, x_2, \dots, x_n)$ liên tục trên một miền compact.
> Nếu với mọi bộ số $(x_1, \dots, x_n)$, giá trị nhỏ nhất của $f$ luôn giảm khi ta dồn hai biến bất kỳ về bằng nhau, thì:
> **Giá trị nhỏ nhất của $f$ đạt được khi $n - 1$ biến bằng nhau, hoặc tại biên của miền xác định.**

Sau khi dồn về trường hợp $n - 1$ biến bằng nhau, bài toán ban đầu từ không gian $n$ chiều được quy về một bài toán **khảo sát hàm số một biến duy nhất** bằng đạo hàm cấp 1!

---

## 3. Bất Đẳng Thức Dãy Trội Karamata (Majorization Inequality)

### Khái niệm Dãy trội (Majorization)
Cho hai dãy số thực $(x_1, x_2, \dots, x_n)$ và $(y_1, y_2, \dots, y_n)$ đã được sắp thứ tự giảm dần:
$$x_1 \ge x_2 \ge \dots \ge x_n \quad \text{và} \quad y_1 \ge y_2 \ge \dots \ge y_n$$
Ta nói dãy $x$ **trội hơn** dãy $y$, ký hiệu là:
$$x \succ y$$
nếu thỏa mãn các điều kiện sau:
$$\begin{cases}
x_1 \ge y_1 \\
x_1 + x_2 \ge y_1 + y_2 \\
\quad \vdots \\
x_1 + x_2 + \dots + x_k \ge y_1 + y_2 + \dots + y_k \quad (\forall 1 \le k \le n - 1) \\
x_1 + x_2 + \dots + x_n = y_1 + y_2 + \dots + y_n
\end{cases}$$

---

### Định lý Karamata
> Cho hàm số $f: [a, b] \to \mathbb{R}$ là một **hàm lồi (convex)**.
> Nếu $x \succ y$, thì:
> $$\sum_{i=1}^n f(x_i) \ge \sum_{i=1}^n f(y_i)$$
> Ngược lại, nếu $f$ là hàm lõm (concave), bất đẳng thức đổi chiều.

*Hệ quả:* Dãy đều nhất $( \bar{x}, \dots, \bar{x} )$ luôn bị mọi dãy khác trội hơn:
$$x \succ \left( \frac{\sum x_i}{n}, \dots, \frac{\sum x_i}{n} \right)$$
Do đó Bất đẳng thức Jensen chính là trường hợp riêng của Bất đẳng thức Karamata!

---

## 4. Bài toán Olympic chọn lọc & Lời giải

### Bài toán 1 (IMO 2005 Problem 3)
> **Đề bài:** Cho các số thực dương $x, y, z$ thỏa mãn $xyz \ge 1$. Chứng minh rằng:
> $$\frac{x^5 - x^2}{x^5 + y^2 + z^2} + \frac{y^5 - y^2}{y^5 + z^2 + x^2} + \frac{z^5 - z^2}{z^5 + x^2 + y^2} \ge 0$$

**Lời giải đỉnh cao bằng SOS:**
Đặt biểu thức là $P$. Ta biến đổi từng số hạng:
$$\frac{x^5 - x^2}{x^5 + y^2 + z^2} = 1 - \frac{x^2 + y^2 + z^2}{x^5 + y^2 + z^2}$$
Do đó $P \ge 0$ tương đương với:
$$\sum_{\text{cyc}} \frac{1}{x^5 + y^2 + z^2} \le \frac{3}{x^2 + y^2 + z^2}$$
Theo bất đẳng thức Cauchy-Schwarz:
$$(x^5 + y^2 + z^2)(1/x + y^2 + z^2) \ge (x^2 + y^2 + z^2)^2$$
Vì $xyz \ge 1$, ta có $1/x \le yz$. Do đó:
$$x^5 + y^2 + z^2 \ge \frac{(x^2 + y^2 + z^2)^2}{yz + y^2 + z^2}$$
Nghịch đảo lại:
$$\frac{1}{x^5 + y^2 + z^2} \le \frac{yz + y^2 + z^2}{(x^2 + y^2 + z^2)^2}$$
Lấy tổng cả ba phân thức:
$$\sum_{\text{cyc}} \frac{1}{x^5 + y^2 + z^2} \le \frac{2(x^2 + y^2 + z^2) + (xy + yz + zx)}{(x^2 + y^2 + z^2)^2}$$
Ta chỉ cần chứng minh:
$$\frac{2(x^2 + y^2 + z^2) + (xy + yz + zx)}{(x^2 + y^2 + z^2)^2} \le \frac{3}{x^2 + y^2 + z^2}$$
$$\iff 2(x^2 + y^2 + z^2) + (xy + yz + zx) \le 3(x^2 + y^2 + z^2)$$
$$\iff x^2 + y^2 + z^2 \ge xy + yz + zx$$
$$\iff \frac{1}{2}\left[ (x - y)^2 + (y - z)^2 + (z - x)^2 \right] \ge 0$$
Bất đẳng thức cuối cùng luôn đúng với mọi số thực!
Dấu đẳng thức xảy ra khi và chỉ khi $x = y = z = 1$. $\blacksquare$

---

## 5. Bài tập rèn luyện

1. **(SOS):** Cho $a, b, c > 0$. Dùng SOS chứng minh $\frac{a^2 + b^2 + c^2}{ab + bc + ca} + \frac{8abc}{(a+b)(b+c)(c+a)} \ge 2$.
2. **(Karamata):** Cho tam giác nhọn $ABC$. Dùng bất đẳng thức Karamata chứng minh $\cos A + \cos B + \cos C \le \frac{3}{2}$.
3. **(Dồn biến EV):** Cho $a, b, c \ge 0$ thỏa $a+b+c = 3$. Tìm giá trị lớn nhất của $P = (a^2 - ab + b^2)(b^2 - bc + c^2)(c^2 - ca + a^2)$.
