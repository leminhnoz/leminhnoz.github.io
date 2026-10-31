---
title: "Chuyên đề Bất đẳng thức Olympic: Bất Đẳng Thức Cổ Điển — AM-GM & Cauchy-Schwarz Dạng Engel"
description: "Nền tảng của nghệ thuật ước lượng giải tích — Bất đẳng thức AM-GM, Kỹ thuật chọn điểm rơi, Bổ đề Cauchy-Schwarz dạng Engel (Sedrakyan) và Kỹ thuật chuẩn hóa biến trong VMO & APMO."
pubDate: "2026-05-05"
tags: ["Toán học", "Bất đẳng thức", "Olympic", "VMO", "IMO", "AM-GM", "Cauchy-Schwarz", "Engel Form", "Inequalities"]
categories: ["Toán học Olympic"]
excerpt: "AM-GM và Cauchy-Schwarz là hai cột trụ vững chắc nhất của thế giới bất đẳng thức. Nắm vững kỹ thuật chọn điểm rơi và cộng mẫu Engel biến các phân thức phức tạp thành những ước lượng giản đơn."
---

> *"Bất đẳng thức không đơn thuần là việc áp dụng một công thức có sẵn, mà là nghệ thuật cân bằng giữa dấu bằng và độ nhạy của các biến số."*

Trong các kỳ thi học sinh giỏi các cấp từ cấp Tỉnh đến VMO và IMO, **Bất đẳng thức cổ điển** luôn là bài toán đòi hỏi kỹ năng biến đổi đại số điêu luyện nhất. Hai công cụ nền tảng nhất nhưng có sức mạnh biến hóa vô cùng chính là **Bất đẳng thức AM-GM** (Arithmetic Mean - Geometric Mean) và **Bất đẳng thức Cauchy-Schwarz dạng Engel** (Bổ đề Sedrakyan).

---

## 1. Bất Đẳng Thức AM-GM (Trung Bình Cộng - Trung Bình Nhân)

### Phát biểu định lý
Cho $n$ số thực không âm $a_1, a_2, \dots, a_n \ge 0$. Khi đó:
$$\frac{a_1 + a_2 + \dots + a_n}{n} \ge \sqrt[n]{a_1 a_2 \dots a_n}$$
Dấu đẳng thức xảy ra khi và chỉ khi:
$$a_1 = a_2 = \dots = a_n$$

### Kỹ thuật Chọn Điểm Rơi (Equality Points)
Khi áp dụng AM-GM, các số hạng tham gia đánh giá **bắt buộc phải bằng nhau tại điểm cực trị**.
- **Điểm rơi đối xứng:** Các biến có vai trò như nhau, cực trị thường đạt tại $a = b = c = 1$ (hoặc hằng số tương ứng).
- **Điểm rơi không đối xứng:** Cần dùng hệ số bất định (tham số hóa $\alpha, \beta$) để ép dấu bằng xảy ra đồng thời.
  Ví dụ: Cho $a + b = 2$. Tìm GTNN của $P = a^2 + \frac{1}{b}$.
  Ta đánh giá $a^2 + \alpha \ge 2\sqrt{\alpha} a$ và $\frac{1}{b} + \beta b \ge 2\sqrt{\beta}$, sau đó chọn $\alpha, \beta$ sao cho đẳng thức xảy ra tại điểm rơi thực tế.

---

### Kỹ thuật Đảo Mẫu Số (Kỹ thuật AM-GM ngược dấu)
Để đánh giá phân thức mang dấu trừ hoặc chặn trên:
$$\frac{a^3}{a^2 + b^2} = a - \frac{ab^2}{a^2 + b^2} \ge a - \frac{ab^2}{2ab} = a - \frac{b}{2}$$
Biến đổi này giúp triệt tiêu mẫu số phức tạp và đưa về các biểu thức bậc nhất!

---

## 2. Bất Đẳng Thức Cauchy-Schwarz & Dạng Engel (Cộng Mẫu)

### Bất đẳng thức Cauchy-Schwarz tổng quát
Cho hai bộ $n$ số thực tùy ý $(a_1, \dots, a_n)$ và $(b_1, \dots, b_n)$. Khi đó:
$$\left( \sum_{i=1}^n a_i^2 \right) \left( \sum_{i=1}^n b_i^2 \right) \ge \left( \sum_{i=1}^n a_i b_i \right)^2$$
Dấu đẳng thức xảy ra khi và chỉ khi hai bộ số tỉ lệ với nhau: $\frac{a_1}{b_1} = \frac{a_2}{b_2} = \dots = \frac{a_n}{b_n}$.

---

### Bất đẳng thức Cauchy-Schwarz dạng Engel (Bổ đề Sedrakyan)
> Cho $a_1, \dots, a_n$ là các số thực và $b_1, \dots, b_n > 0$ là các số thực dương. Khi đó:
> $$\sum_{i=1}^n \frac{a_i^2}{b_i} \ge \frac{(a_1 + a_2 + \dots + a_n)^2}{b_1 + b_2 + \dots + b_n}$$
> Dấu đẳng thức xảy ra khi và chỉ khi:
> $$\frac{a_1}{b_1} = \frac{a_2}{b_2} = \dots = \frac{a_n}{b_n}$$

*Ý nghĩa thực chiến:*
Dạng Engel cho phép gộp các mẫu số phân thức khác nhau về một mẫu số duy nhất là **tổng của các mẫu số**, giúp rút gọn cực nhanh các biểu thức phân thức đối xứng trong bài thi.

---

## 3. Kỹ Thuật Chuẩn Hóa Biến (Normalization)

Một bất đẳng thức $f(a, b, c) \ge 0$ được gọi là **thuần nhất bậc $0$** nếu:
$$f(k \cdot a, k \cdot b, k \cdot c) = f(a, b, c) \quad (\forall k > 0)$$
Khi đó, ta được quyền tự do áp đặt thêm một điều kiện bổ sung (chuẩn hóa) mà không làm mất tính tổng quát:
- Chuẩn hóa tổng: Giả sử $a + b + c = 3$ (hoặc $a + b + c = 1$).
- Chuẩn hóa tích: Giả sử $abc = 1$.
- Chuẩn hóa tổng bình phương: Giả sử $a^2 + b^2 + c^2 = 3$.

---

## 4. Bài toán Olympic chọn lọc & Lời giải

### Bài toán 1 (Bất đẳng thức Nesbitt cho 3 biến)
> **Đề bài:** Cho các số thực dương $a, b, c > 0$. Chứng minh rằng:
> $$\frac{a}{b + c} + \frac{b}{c + a} + \frac{c}{a + b} \ge \frac{3}{2}$$

**Lời giải bằng Cauchy-Schwarz dạng Engel:**
Viết lại biểu thức ở dạng bình phương trên tử số:
$$P = \frac{a^2}{a(b + c)} + \frac{b^2}{b(c + a)} + \frac{c^2}{c(a + b)}$$
Áp dụng trực tiếp Bất đẳng thức Cauchy-Schwarz dạng Engel:
$$P \ge \frac{(a + b + c)^2}{a(b + c) + b(c + a) + c(a + b)} = \frac{(a + b + c)^2}{2(ab + bc + ca)}$$
Mặt khác, theo bất đẳng thức đại số quen thuộc:
$$(a + b + c)^2 = a^2 + b^2 + c^2 + 2(ab + bc + ca) \ge 3(ab + bc + ca)$$
Do đó:
$$P \ge \frac{3(ab + bc + ca)}{2(ab + bc + ca)} = \frac{3}{2}$$
Dấu đẳng thức xảy ra khi và chỉ khi $a = b = c$. Chứng minh hoàn tất. $\blacksquare$

---

### Bài toán 2 (VMO 2018 Bài 3)
> **Đề bài:** Cho các số thực dương $a, b, c$ thỏa mãn $a + b + c = 3$. Chứng minh rằng:
> $$\frac{a+1}{b^2 + 1} + \frac{b+1}{c^2 + 1} + \frac{c+1}{a^2 + 1} \ge 3$$

**Lời giải bằng Kỹ thuật AM-GM ngược dấu:**
Phân tích từng phân thức bằng AM-GM ngược dấu:
$$\frac{a + 1}{b^2 + 1} = (a + 1) \left( 1 - \frac{b^2}{b^2 + 1} \right) = (a + 1) - \frac{(a + 1)b^2}{b^2 + 1}$$
Áp dụng $b^2 + 1 \ge 2b$:
$$\frac{(a + 1)b^2}{b^2 + 1} \le \frac{(a + 1)b^2}{2b} = \frac{(a + 1)b}{2} = \frac{ab + b}{2}$$
Suy ra:
$$\frac{a + 1}{b^2 + 1} \ge (a + 1) - \frac{ab + b}{2}$$
Thiết lập hai bất đẳng thức tương tự cho hai phân thức còn lại rồi cộng vế theo vế:
$$VT \ge (a + b + c + 3) - \frac{(ab + bc + ca) + (a + b + c)}{2}$$
Vì $a + b + c = 3$, ta có:
$$VT \ge (3 + 3) - \frac{(ab + bc + ca) + 3}{2} = \frac{9 - (ab + bc + ca)}{2}$$
Mặt khác:
$$ab + bc + ca \le \frac{(a + b + c)^2}{3} = \frac{3^2}{3} = 3$$
Do đó:
$$VT \ge \frac{9 - 3}{2} = 3$$
Dấu đẳng thức xảy ra khi $a = b = c = 1$. $\blacksquare$

---

## 5. Bài tập rèn luyện

1. **(VMO):** Cho $a, b, c > 0$ thỏa $abc = 1$. Chứng minh $\frac{1}{a^3(b+c)} + \frac{1}{b^3(c+a)} + \frac{1}{c^3(a+b)} \ge \frac{3}{2}$.
2. **(APMO):** Cho $a, b, c > 0$ thỏa $a+b+c = 1$. Tìm giá trị nhỏ nhất của biểu thức $\frac{a}{1+b-c} + \frac{b}{1+c-a} + \frac{c}{1+a-b}$.
3. **(Cauchy-Schwarz):** Cho $a, b, c > 0$. Chứng minh $\sqrt{\frac{a}{b+c}} + \sqrt{\frac{b}{c+a}} + \sqrt{\frac{c}{a+b}} > 2$.
