---
title: "Chuyên đề Số học Olympic: Phương pháp bước nhảy Vieta (Vieta Jumping) và Kỹ thuật lùi vô hạn"
description: "Khám phá câu chuyện lịch sử của bài toán khó nhất IMO 1988 Problem 6, nguyên lý thiết lập phương trình bậc 2 theo một biến, kỹ thuật lùi vô hạn Fermat và cấu trúc tổng quát của Vieta Jumping."
pubDate: "2026-02-10"
tags: ["Toán học", "Số học", "Olympic", "IMO", "Vieta Jumping", "Root Flipping", "Number Theory"]
categories: ["Toán học Olympic"]
excerpt: "Được mệnh danh là bài toán đã đánh gục cả hội đồng giám khảo IMO 1988, phương pháp bước nhảy Vieta (Vieta Jumping) là sự kết hợp siêu việt giữa định lý Viète và nguyên lý lùi vô hạn."
---

> *"Năm 1988, tại kỳ thi IMO ở Úc, có một bài toán được đưa ra khiến 6 nhà toán học hàng đầu thế giới trong hội đồng ra đề không thể giải được trong 6 giờ thảo luận. Bài toán đó sau này được trao số hiệu IMO 1988 Problem 6."*

Phương pháp **Bước nhảy Vieta** (còn được gọi là *Vieta Jumping* hay *Root Flipping*) là một kỹ thuật chứng minh số học đỉnh cao. Về bản chất, nó là một biến thể tinh tế của phương pháp **Lùi vô hạn Fermat (Infinite Descent)**, dựa trên cấu trúc đối xứng của phương trình bậc hai.

---

## 1. Bài toán huyền thoại IMO 1988 Problem 6

### Đề bài
Cho $a, b$ là hai số nguyên dương sao cho $a b + 1$ chia hết $a^2 + b^2$. Chứng minh rằng biểu thức:
$$k = \frac{a^2 + b^2}{a b + 1}$$
luôn là một số chính phương.

---

## 2. Ý tưởng cốt lõi của Bước nhảy Vieta

Thông thường, khi gặp một bài toán yêu cầu chứng minh $k$ là số chính phương, bản năng đầu tiên là tìm cách phân tích $k = m^2$ hoặc chặn khoảng giữa hai số chính phương liên tiếp. Nhưng ở đây, biểu thức phân thức đối xứng khiến mọi đánh giá thông thường đều thất bại.

Ý tưởng đột phá của Bước nhảy Vieta gồm 3 bước:
1. **Phản chứng:** Giả sử tồn tại cặp nghiệm $(a, b)$ sao cho $k$ không phải là số chính phương.
2. **Cực hạn:** Trong tất cả các cặp nghiệm nguyên dương sinh ra cùng giá trị $k$ đó, chọn cặp $(A, B)$ có tổng $A + B$ nhỏ nhất (hoặc $\max(A, B)$ nhỏ nhất).
3. **Bước nhảy (Root Flipping):** Cố định một biến (ví dụ $B$), coi phương trình là phương trình bậc hai theo biến còn lại. Sử dụng hệ thức Viète để tìm nghiệm thứ hai $A'$. Chứng minh $A'$ là số nguyên dương và $A' < A$, dẫn đến $A' + B < A + B$, tạo nên mâu thuẫn trực tiếp với giả thiết cực tiểu!

---

## 3. Chứng minh chi tiết bài toán IMO 1988 P6

Giả sử phản chứng rằng tồn tại cặp số nguyên dương $(a, b)$ sao cho:
$$\frac{a^2 + b^2}{a b + 1} = k \quad \text{với } k \text{ không là số chính phương}$$

Phương trình tương đương với:
$$a^2 - (k b) a + (b^2 - k) = 0 \tag{1}$$

Trong tất cả các cặp số nguyên dương $(a, b)$ thỏa mãn (1) với cùng số nguyên $k$, ta chọn cặp $(A, B)$ sao cho $A + B$ đạt giá trị nhỏ nhất.
Không mất tính tổng quát, do tính đối xứng của $a$ và $b$, ta có thể giả sử $A \ge B \ge 1$.

Coi (1) là phương trình bậc hai ẩn $x$:
$$x^2 - (k B) x + (B^2 - k) = 0 \tag{2}$$
Phương trình (2) có một nghiệm nguyên dương là $x_1 = A$.
Gọi $x_2$ là nghiệm còn lại của (2). Theo định lý Viète:
$$\begin{cases} x_1 + x_2 = k B \tag{3} \\ x_1 x_2 = B^2 - k \tag{4} \end{cases}$$

Từ (3), ta có $x_2 = k B - A \in \mathbb{Z}$ (vì $k, B, A$ đều là các số nguyên).

### Bước 1: Chứng minh $x_2 \ne 0$
Nếu $x_2 = 0$, thay vào (4):
$$0 = B^2 - k \implies k = B^2$$
Điều này mâu thuẫn với giả thiết ban đầu rằng $k$ không phải là số chính phương. Vậy $x_2 \ne 0$.

### Bước 2: Chứng minh $x_2 > 0$
Giả sử phản chứng $x_2 < 0$, tức là $x_2 \le -1$.
Khi đó từ (2), thay $x = x_2$:
$$x_2^2 - (k B) x_2 + (B^2 - k) = 0 \implies x_2^2 + B^2 - k = k B x_2$$
Vì $x_2 \le -1$ và $B \ge 1, k \ge 1$, vế trái:
$$x_2^2 + B^2 - k \ge 1 + B^2 - k$$
Nhưng từ phương trình ban đầu với cặp $(A, B)$:
$$k = \frac{A^2 + B^2}{A B + 1} \implies A^2 - k A B + B^2 - k = 0$$
Mặt khác, nếu $x_2 \le -1$:
$$x_2^2 - k B x_2 + B^2 - k = 0 \implies k = \frac{x_2^2 + B^2}{x_2 B + 1}$$
Vì $x_2 \le -1$ và $B \ge 1$, mẫu số $x_2 B + 1 \le -1 \cdot 1 + 1 = 0$.
- Nếu $x_2 B + 1 = 0 \implies x_2 = -1, B = 1$. Thay vào: $k = \frac{(-1)^2 + 1^2}{(-1)(1) + 1} = \frac{2}{0}$ (vô lý).
- Nếu $x_2 B + 1 < 0$: tử số $x_2^2 + B^2 > 0$, dẫn tới $k < 0$, mâu thuẫn với $k = \frac{A^2 + B^2}{A B + 1} > 0$.
Do đó bắt buộc $x_2 > 0$, tức là $x_2 \in \mathbb{N}^*$.

### Bước 3: Chứng minh $x_2 < A$ (Tạo mâu thuẫn cực hạn)
Từ hệ thức Viète (4):
$$x_2 = \frac{B^2 - k}{A}$$
Vì $k > 0$, ta có:
$$x_2 = \frac{B^2 - k}{A} < \frac{B^2}{A}$$
Nhớ lại rằng ta đã giả thiết $A \ge B$.
- Nếu $A > B$, thì $\frac{B^2}{A} < \frac{A^2}{A} = A \implies x_2 < A$.
- Nếu $A = B$: thay vào (1): $A^2 - k A^2 + A^2 - k = 0 \implies 2 A^2 = k(A^2 + 1)$.
  Vì $\gcd(A^2, A^2 + 1) = 1$, nên $A^2 + 1 \mid 2 A^2 \implies A^2 + 1 \mid 2$.
  Do $A \ge 1 \implies A = 1 \implies k = 1 = 1^2$ là số chính phương (mâu thuẫn giả thiết $k$ không chính phương).

Vậy ta luôn có:
$$x_2 < A$$
Như vậy, cặp $(x_2, B)$ là một cặp số nguyên dương mới cũng thỏa mãn phương trình (1) với cùng giá trị $k$, nhưng có tổng:
$$x_2 + B < A + B$$
Điều này mâu thuẫn trực tiếp với tính nhỏ nhất của tổng $A + B$ trong giả thiết cực hạn!

Sự mâu thuẫn này chứng tỏ giả thiết phản chứng là sai. Vậy $k = \frac{a^2 + b^2}{a b + 1}$ **bắt buộc phải là một số chính phương**. $\blacksquare$

---

## 4. Mô hình tổng quát của Vieta Jumping

Khi giải một bài toán phương trình Diophantine dạng đối xứng:
$$F(x, y) = x^2 + y^2 - k \cdot G(x, y) = 0$$
Quy trình 4 bước luôn áp dụng chuẩn mực:
1. **Đặt điều kiện phản chứng** và gọi $(A, B)$ là nghiệm nguyên dương có $A + B$ nhỏ nhất (giả sử $A \ge B$).
2. **Coi phương trình là bậc hai theo $x$**: $x^2 - T(B) x + C(B) = 0$.
3. **Áp dụng Viète**: Nghiệm mới $x_2 = T(B) - A = \frac{C(B)}{A}$.
4. **Đánh giá dấu và chặn biên**: Chứng minh $x_2 \in \mathbb{N}^*$ và $x_2 < A$ để tạo mâu thuẫn $x_2 + B < A + B$.

---

## 5. Lời kết
Vieta Jumping là đỉnh cao của vẻ đẹp tư duy số học: không dùng công cụ cao cấp, chỉ dùng hệ thức Viète lớp 9 kết hợp với nguyên lý cực hạn sắc bén để giải quyết một bài toán tưởng chừng bất khả thi.
