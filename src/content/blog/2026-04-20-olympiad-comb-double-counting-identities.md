---
title: "Chuyên đề Tổ hợp Olympic: Phương Pháp Đếm Hai Cách, Đẳng Thức Tổ Hợp & Định Lý Sperner"
description: "Sức mạnh của tư duy đếm đối ngẫu — Phương pháp Đếm hai cách (Double Counting), Bổ đề Bắt tay cho đồ thị, Bất đẳng thức ma trận liên thuộc, Bổ đề LYM và Định lý Sperner về phản xích trong VMO & IMO."
pubDate: "2026-04-20"
tags: ["Toán học", "Tổ hợp", "Olympic", "VMO", "IMO", "Double Counting", "Sperner", "LYM Inequality", "Combinatorics"]
categories: ["Toán học Olympic"]
excerpt: "Đếm một đại lượng theo hai góc nhìn khác nhau và đặt dấu bằng ở giữa — nguyên lý đơn giản này đã sản sinh ra những định lý tổ hợp sâu sắc nhất của thế kỷ 20."
---

> *"Nếu bạn muốn chứng minh hai biểu thức đại số bằng nhau, hãy chỉ ra rằng chúng cùng đếm một tập hợp. Nếu muốn chứng minh bất đẳng thức, hãy đếm hai cách và dùng Cauchy-Schwarz."*

Trong các đề thi chọn học sinh giỏi quốc gia và quốc tế, **Phương pháp Đếm hai cách (Double Counting)** là kỹ thuật thanh lịch bậc nhất của Tổ hợp. Bằng việc biểu diễn một mối quan hệ hai ngôi dưới dạng ma trận liên thuộc nhị phân, người giải toán có thể thiết lập các đẳng thức và bất đẳng thức tổ hợp tinh tế một cách hoàn toàn tự nhiên.

---

## 1. Bản Chất Của Phương Pháp Đếm Hai Cách

### Mô hình tập hợp & Quan hệ hai ngôi
Cho hai tập hữu hạn $X$ và $Y$. Xét một quan hệ hai ngôi $\mathcal{R} \subseteq X \times Y$.
Ta có thể đếm số cặp $(x, y) \in \mathcal{R}$ theo hai cách:
1. **Gom theo từng phần tử của $X$:**
   $$|\mathcal{R}| = \sum_{x \in X} \deg(x) \quad \text{với } \deg(x) = |\{y \in Y : (x, y) \in \mathcal{R}\}|$$
2. **Gom theo từng phần tử của $Y$:**
   $$|\mathcal{R}| = \sum_{y \in Y} \deg(y) \quad \text{với } \deg(y) = |\{x \in X : (x, y) \in \mathcal{R}\}|$$

Từ đó ta thu được **Đồng nhất thức đếm hai cách**:
$$\sum_{x \in X} \deg(x) = \sum_{y \in Y} \deg(y)$$

---

### Bổ đề Bắt tay (Handshaking Lemma)
Cho đơn đồ thị $G = (V, E)$. Xét quan hệ liên thuộc giữa đỉnh $v \in V$ và cạnh $e \in E$:
$$|\mathcal{R}| = \sum_{v \in V} \deg(v) = \sum_{e \in E} 2 = 2|E|$$
> **Hệ quả:** Tổng bậc của tất cả các đỉnh trong một đồ thị luôn bằng hai lần số cạnh. Đặc biệt, số đỉnh có bậc lẻ luôn là một số chẵn!

---

## 2. Kết Hợp Đếm Hai Cách Với Bất Đẳng Thức Đại Số

Khi gán ma trận liên thuộc $A = (a_{ij})$ với $a_{ij} \in \{0, 1\}$:
- Tổng hàng thứ $i$ là $r_i = \sum_{j} a_{ij}$.
- Tổng cột thứ $j$ là $c_j = \sum_{i} a_{ij}$.
Theo bất đẳng thức Cauchy-Schwarz:
$$\left( \sum_{i=1}^m r_i \right)^2 \le m \sum_{i=1}^m r_i^2$$
Kỹ thuật này cho phép chuyển từ việc đếm các phần tử sang việc đếm **số cặp phần tử cùng chia sẻ chung một tính chất** $\sum \binom{r_i}{2}$.

---

## 3. Định Lý Sperner & Bổ Đề LYM (Lubell-Yamamoto-Meshalkin)

### Khái niệm Phản xích (Antichain)
Cho tập hữu hạn $S$ có $n$ phần tử. Một họ các tập con $\mathcal{F} \subseteq \mathcal{P}(S)$ được gọi là một **phản xích (antichain)** nếu không có hai tập hợp nào trong $\mathcal{F}$ chứa nhau:
$$\forall A, B \in \mathcal{F}, \, A \ne B \implies A \not\subseteq B$$

### Bổ đề Bất đẳng thức LYM
> Cho $\mathcal{F}$ là một phản xích của tập hợp $n$ phần tử. Khi đó:
> $$\sum_{A \in \mathcal{F}} \frac{1}{\binom{n}{|A|}} \le 1$$

*Chứng minh bằng Đếm hai cách:*
Xét tập hợp tất cả $n!$ hoán vị của $n$ phần tử. Một hoán vị $(\pi_1, \dots, \pi_n)$ được gọi là "chứa" tập con $A$ kích thước $k$ nếu $A = \{\pi_1, \pi_2, \dots, \pi_k\}$.
Mỗi tập $A$ kích thước $k$ xuất hiện trong đúng $k! (n - k)!$ hoán vị.
Vì $\mathcal{F}$ là một phản xích, không có hoán vị nào có thể chứa hai tập hợp khác nhau của $\mathcal{F}$.
Do đó tổng số hoán vị chứa các tập hợp trong $\mathcal{F}$ không vượt quá tổng số hoán vị $n!$:
$$\sum_{A \in \mathcal{F}} |A|! (n - |A|)! \le n! \iff \sum_{A \in \mathcal{F}} \frac{1}{\binom{n}{|A|}} \le 1 \quad \blacksquare$$

### Định lý Sperner (1928)
> Kích thước lớn nhất của một phản xích trong tập hợp $n$ phần tử đúng bằng hệ số nhị thức cực đại ở giữa:
> $$|\mathcal{F}| \le \binom{n}{\lfloor n/2 \rfloor}$$

---

## 4. Bài toán Olympic chọn lọc & Lời giải

### Bài toán 1 (IMO 1998 Problem 2)
> **Đề bài:** Trong một cuộc thi có $a$ thí sinh và $b$ giám khảo, với $b \ge 3$ là một số nguyên lẻ. Mỗi giám khảo đánh giá từng thí sinh là "đạt" hoặc "không đạt". Giả sử mỗi cặp giám khảo đồng ý với nhau về kết quả của tối đa $k$ thí sinh. Chứng minh rằng:
> $$\frac{k}{a} \ge \frac{b - 1}{2b}$$

**Lời giải bằng Đếm hai cách:**
Gọi tập các thí sinh là $X$ ($|X| = a$) và tập các giám khảo là $Y$ ($|Y| = b$).
Với mỗi thí sinh $i \in X$, giả sử có $x_i$ giám khảo cho "đạt" và $b - x_i$ giám khảo cho "không đạt".
Khi đó số cặp giám khảo đồng ý với nhau về thí sinh $i$ là:
$$N_i = \binom{x_i}{2} + \binom{b - x_i}{2} = \frac{x_i(x_i - 1) + (b - x_i)(b - x_i - 1)}{2} = \frac{x_i^2 + (b - x_i)^2 - b}{2}$$
Vì $b$ là số lẻ, hai số nguyên $x_i$ và $b - x_i$ có tổng bằng $b$ lẻ, do đó chúng có hiệu ít nhất là $1$.
Giá trị nhỏ nhất của $x_i^2 + (b - x_i)^2$ đạt được khi $x_i = \frac{b \pm 1}{2}$, khi đó:
$$x_i^2 + (b - x_i)^2 \ge \left(\frac{b-1}{2}\right)^2 + \left(\frac{b+1}{2}\right)^2 = \frac{b^2 + 1}{2}$$
Thay vào biểu thức của $N_i$:
$$N_i \ge \frac{\frac{b^2 + 1}{2} - b}{2} = \frac{(b - 1)^2}{4}$$
Bây giờ, ta đếm tổng số cặp $( \{J_1, J_2\}, i )$ sao cho hai giám khảo $J_1, J_2$ cùng đồng ý về thí sinh $i$ theo hai cách:
1. **Đếm theo từng thí sinh $i$:**
   $$\text{Tổng} = \sum_{i=1}^a N_i \ge a \cdot \frac{(b - 1)^2}{4}$$
2. **Đếm theo từng cặp giám khảo $\{J_1, J_2\}$:**
   Số cặp giám khảo là $\binom{b}{2} = \frac{b(b-1)}{2}$. Mỗi cặp đồng ý về tối đa $k$ thí sinh.
   $$\text{Tổng} \le \binom{b}{2} \cdot k = \frac{b(b - 1)}{2} \cdot k$$
Kết hợp hai bất đẳng thức:
$$a \cdot \frac{(b - 1)^2}{4} \le \frac{b(b - 1)}{2} \cdot k$$
Chia cả hai vế cho số dương $\frac{a \cdot b(b - 1)}{2}$:
$$\frac{k}{a} \ge \frac{b - 1}{2b} \quad \blacksquare$$

---

## 5. Bài tập rèn luyện

1. **(Đẳng thức Vandermonde):** Dùng phương pháp đếm hai cách chứng minh $\sum_{k=0}^r \binom{m}{k}\binom{n}{r-k} = \binom{m+n}{r}$.
2. **(IMO 1989 P3):** Cho $n$ điểm trên mặt phẳng sao cho không có 3 điểm nào thẳng hàng và không có 4 điểm nào cùng thuộc một đường tròn. Chứng minh tồn tại ít nhất $\binom{n-3}{2}$ đường tròn chứa đúng 3 điểm của tập đã cho.
3. **(Định lý Erdős-Ko-Rado):** Cho $\mathcal{F}$ là họ các tập con $k$ phần tử của tập $n$ phần tử ($n \ge 2k$) sao cho hai tập bất kỳ trong họ đều giao nhau khác rỗng. Chứng minh $|\mathcal{F}| \le \binom{n-1}{k-1}$.
