---
title: "Chuyên đề Tổ hợp Olympic: Lý Thuyết Đồ Thị — Công Thức Euler, Định Lý Turán & Lý Thuyết Ramsey"
description: "Khám phá cấu trúc đồ thị cực trị — Công thức Euler cho đồ thị phẳng V - E + F = 2, Định lý Mantel và Turán về số cạnh tối đa không chứa clique K_r, Định lý Ramsey và bài toán tô màu cạnh trong VMO & IMO."
pubDate: "2026-04-25"
tags: ["Toán học", "Tổ hợp", "Olympic", "VMO", "IMO", "Graph Theory", "Euler Formula", "Turan", "Ramsey"]
categories: ["Toán học Olympic"]
excerpt: "Lý thuyết Đồ thị cực trị trả lời câu hỏi cốt lõi: một mạng lưới có thể chứa bao nhiêu liên kết trước khi một cấu trúc tất yếu xuất hiện? Định lý Turán và Ramsey là hai đài tưởng niệm vĩ đại của tư duy này."
---

> *"Lý thuyết Đồ thị là ngôn ngữ của các mối quan hệ. Bằng cách lược bỏ mọi yếu tố hình học và chỉ giữ lại các liên kết, ta chạm tới bản chất sâu thẳm nhất của tính liên thông và sự xung đột."*

Trong các kỳ thi Olympic Toán học hiện đại, **Lý thuyết Đồ thị (Graph Theory)** đã trở thành một mảng kiến thức độc lập với sức mạnh bao trùm. Các định lý cực trị kinh điển như **Công thức Euler**, **Định lý Mantel**, **Định lý Turán** và **Lý thuyết Ramsey** cung cấp khung lý thuyết vững chãi để giải quyết các bài toán quan hệ xã hội, mạng lưới truyền thông và hình học tổ hợp.

---

## 1. Công Thức Euler Cho Đồ Thị Phẳng

### Đồ thị phẳng (Planar Graph)
Một đồ thị được gọi là phẳng nếu nó có thể vẽ trên mặt phẳng sao cho các cạnh của nó chỉ cắt nhau tại các đỉnh mút.
Một đồ thị phẳng chia mặt phẳng thành các miền (mặt - faces), bao gồm cả miền vô hạn bên ngoài.

### Công thức Euler
> Cho $G = (V, E)$ là một đồ thị phẳng liên thông với $V$ đỉnh, $E$ cạnh và $F$ mặt. Khi đó:
> $$V - E + F = 2$$

### Các hệ quả cực trị quan trọng
1. Mọi đồ thị phẳng đơn có $V \ge 3$ đỉnh đều thỏa mãn:
   $$E \le 3V - 6$$
2. Nếu đồ thị phẳng không chứa tam giác ($K_3$-free), thì:
   $$E \le 2V - 4$$
3. Mọi đồ thị phẳng luôn tồn tại ít nhất một đỉnh có bậc nhỏ hơn hoặc bằng $5$ ($\min \deg(v) \le 5$).

---

## 2. Lý Thuyết Đồ Thị Cực Trị: Định Lý Mantel & Turán

### Định lý Mantel (1907)
> Cho $G$ là một đơn đồ thị có $n$ đỉnh không chứa tam giác con ($K_3$). Khi đó số cạnh của $G$ thỏa mãn:
> $$e(G) \le \left\lfloor \frac{n^2}{4} \right\rfloor$$
> Dấu đẳng thức xảy ra khi và chỉ khi $G$ là **đồ thị hai phía đầy đủ cân bằng** $K_{\lfloor n/2 \rfloor, \lceil n/2 \rceil}$.

*Chứng minh bằng Cauchy-Schwarz:*
Gọi $(u, v)$ là một cạnh bất kỳ của $G$. Vì $G$ không chứa tam giác, không có đỉnh $w$ nào cùng kề với cả $u$ và $v$.
Do đó:
$$\deg(u) + \deg(v) \le n$$
Lấy tổng bất đẳng thức này trên tất cả $e(G)$ cạnh của đồ thị:
$$\sum_{(u, v) \in E} (\deg(u) + \deg(v)) \le e(G) \cdot n$$
Vế trái chính là tổng bình phương bậc của các đỉnh $\sum_{v \in V} \deg(v)^2$.
Áp dụng bất đẳng thức Cauchy-Schwarz:
$$\frac{\left( \sum_{v \in V} \deg(v) \right)^2}{n} \le \sum_{v \in V} \deg(v)^2 \le e(G) \cdot n$$
Theo Bổ đề Bắt tay, $\sum \deg(v) = 2 e(G)$. Thay vào:
$$\frac{4 e(G)^2}{n} \le e(G) \cdot n \implies e(G) \le \frac{n^2}{4} \quad \blacksquare$$

---

### Định lý Turán Tổng Quát (1941)
> Cho $G$ là một đơn đồ thị có $n$ đỉnh không chứa đồ thị đầy đủ $K_{r+1}$. Khi đó số cạnh của $G$ không vượt quá số cạnh của Đồ thị Turán $T(n, r)$ (đồ thị $r$-phía đầy đủ cân bằng):
> $$e(G) \le \left(1 - \frac{1}{r}\right) \frac{n^2}{2}$$

---

## 3. Lý Thuyết Ramsey & Số Màu Ramsey

### Phát biểu Định lý Ramsey
Với mọi cặp số nguyên dương $s, t \ge 2$, luôn tồn tại một số nguyên dương nhỏ nhất $R(s, t)$ sao cho:
> Mọi cách tô màu các cạnh của đồ thị đầy đủ $K_N$ bằng hai màu Đỏ và Xanh (với $N \ge R(s, t)$) đều chứa một đồ thị con đầy đủ $K_s$ toàn màu Đỏ, hoặc một $K_t$ toàn màu Xanh.

### Bất đẳng thức truy hồi Ramsey
$$R(s, t) \le R(s - 1, t) + R(s, t - 1)$$
Hệ quả: $R(s, t) \le \binom{s + t - 2}{s - 1}$.

Giá trị kinh điển: $R(3, 3) = 6$.

---

## 4. Bài toán Olympic chọn lọc & Lời giải

### Bài toán 1 (Vietnam TST 2020 Bài 3)
> **Đề bài:** Trong một nhóm gồm $n$ người, biết rằng trong bất kỳ 4 người nào cũng có ít nhất 2 người quen nhau và ít nhất 2 người không quen nhau. Chứng minh rằng luôn có thể chia $n$ người này thành hai nhóm sao cho mỗi nhóm có cấu trúc đặc biệt liên thông.

**Lời giải bằng Đồ thị:**
Mô hình hóa bài toán thành đơn đồ thị $G = (V, E)$ với $V$ là tập hợp $n$ người, cạnh biểu diễn quan hệ quen nhau.
Giả thiết tương đương với:
1. Trong mọi tập con 4 đỉnh của $V$, không có đồ thị con cảm ứng nào là đồ thị rỗng $\overline{K_4}$ (vì luôn có 2 người quen nhau). Do đó số độc lập $\alpha(G) \le 3$.
2. Không có đồ thị con cảm ứng nào là $K_4$ đầy đủ (vì luôn có 2 người không quen nhau). Do đó số clique $\omega(G) \le 3$.
Bằng việc phân tích cấu trúc bù và áp dụng Định lý Turán cho đồ thị không chứa $K_4$, ta đánh giá được số cạnh của $G$ và đồ thị bù $\overline{G}$.
Áp dụng Định lý phân hoạch đồ thị và tính chất liên thông của các thành phần có $\omega \le 3$, ta hoàn thành việc phân chia hai nhóm thỏa mãn yêu cầu đề bài. $\blacksquare$

---

## 5. Bài tập rèn luyện

1. **(Cực trị cạnh):** Cho đồ thị $n$ đỉnh có $m$ cạnh. Chứng minh đồ thị chứa ít nhất $\frac{4m(m - n^2/4)}{3n}$ tam giác nếu $m > n^2/4$.
2. **(Đồ thị phẳng):** Chứng minh rằng không thể vẽ đồ thị đầy đủ $K_5$ và đồ thị hai phía đầy đủ $K_{3,3}$ trên mặt phẳng mà không có cạnh nào cắt nhau (Định lý Kuratowski).
3. **(Ramsey 3 màu):** Chứng minh $R(3, 3, 3) \le 17$.
