---
title: "Chuyên đề Hình học Olympic: Các Định Lý Xạ Ảnh Pascal, Brianchon, Desargues & Cực - Đối Cực"
description: "Vũ khí tối thượng của Hình học Olympic hiện đại — Định lý Pascal cho lục giác nội tiếp và các dạng suy biến, Định lý đối ngẫu Brianchon, Định lý thấu xạ Desargues và Lý thuyết Cực - Đối cực La Hire."
pubDate: "2026-04-01"
tags: ["Toán học", "Hình học", "Olympic", "VMO", "IMO", "Projective Geometry", "Pascal", "Desargues", "Poles and Polars"]
categories: ["Toán học Olympic"]
excerpt: "Hình học Xạ ảnh đưa các tiên đề song song và hội tụ về một khối thống nhất hoàn mỹ. Định lý Pascal và Desargues giải quyết tức thì những cấu hình thẳng hàng phức tạp nhất trong TST và IMO."
---

> *"Khi nhìn từ không gian xạ ảnh, điểm ở vô cực không còn là điều bí ẩn, và các đường thẳng song song chỉ là những đường thẳng cắt nhau tại chân trời."*

Trong các đề thi chọn đội tuyển quốc tế (TST) và IMO những năm gần đây, **Hình học Xạ ảnh (Projective Geometry)** đã trở thành một chuẩn mực tư duy không thể thiếu. Sự kết hợp giữa **Định lý Pascal**, **Định lý Desargues** và lý thuyết **Cực - Đối cực** cho phép người làm toán nhìn thấu cấu trúc đồng quy và thẳng hàng ẩn sau các hình vẽ rối rắm.

---

## 1. Định Lý Pascal (The Mystic Hexagram)

### Phát biểu định lý
Cho $6$ điểm $A, B, C, D, E, F$ cùng nằm trên một đường tròn (hoặc tổng quát hơn là trên một đường conic).
Gọi:
$$P = AB \cap DE$$
$$Q = BC \cap EF$$
$$R = CD \cap FA$$
Khi đó, ba giao điểm $P, Q, R$ **thẳng hàng**. Đường thẳng đi qua ba điểm này được gọi là **đường thẳng Pascal** của lục giác $ABCDEF$.

---

### Các dạng suy biến kinh điển của Định lý Pascal
Định lý Pascal vẫn hoàn toàn đúng khi một số đỉnh trùng nhau. Khi hai đỉnh liên tiếp trùng nhau (chẳng hạn $B \equiv A$), đường thẳng nối hai điểm $AB$ sẽ trở thành **tiếp tuyến của đường tròn tại điểm $A$**!

1. **Dạng suy biến cho 5 điểm (Ngũ giác $ABCDE$):**
   Tiếp tuyến tại $A$ cắt $CD$ tại $P$; $BC \cap DE = Q$; $AB \cap EA = R$. Khi đó $P, Q, R$ thẳng hàng.
2. **Dạng suy biến cho 4 điểm (Tứ giác $ABCD$ nội tiếp):**
   Gọi tiếp tuyến tại $A$ và $C$ cắt nhau tại $T$. Khi đó giao điểm $AB \cap CD$, $AD \cap BC$ và $T$ tạo thành cấu trúc đường đối cực và thẳng hàng.

---

## 2. Định Lý Brianchon (Đối ngẫu của Định lý Pascal)

### Phát biểu định lý
Cho lục giác $ABCDEF$ ngoại tiếp một đường tròn (hoặc conic).
Khi đó, ba đường chéo chính nối các đỉnh đối diện:
$$AD, \quad BE, \quad CF$$
**đồng quy tại một điểm**. Điểm này được gọi là **điểm Brianchon**.

*(Theo nguyên lý đối ngẫu xạ ảnh, Định lý Brianchon chính là hình ảnh đối ngẫu hoàn hảo của Định lý Pascal qua phép nghịch đảo cực - đối cực).*

---

## 3. Định Lý Desargues (Thấu Xạ Đỉnh & Thấu Xạ Trục)

### Phát biểu định lý
Cho hai tam giác $ABC$ và $A'B'C'$ nằm trong cùng một mặt phẳng.
Gọi $X = BC \cap B'C'$, $Y = CA \cap C'A'$, $Z = AB \cap A'B'$.
Khi đó:
> Ba đường thẳng $AA', BB', CC'$ đồng quy tại một điểm $S$ (thấu xạ đỉnh)
> **khi và chỉ khi**
> Ba giao điểm $X, Y, Z$ cùng nằm trên một đường thẳng (thấu xạ trục).

---

## 4. Lý Thuyết Cực Và Đối Cực (Poles and Polars)

### Định nghĩa
Cho đường tròn $(O; R)$ và điểm $P \ne O$.
- Nếu $P$ nằm ngoài $(O)$, kẻ hai tiếp tuyến $PA, PB$ đến $(O)$. Đường thẳng nối hai tiếp điểm $AB$ được gọi là **đường đối cực** của điểm $P$ đối với $(O)$, và $P$ được gọi là **cực** của đường thẳng $AB$.
- Định nghĩa giải tích: Đường đối cực của $P$ là đường thẳng vuông góc với $OP$ tại điểm $H$ nằm trên tia $OP$ sao cho $OP \cdot OH = R^2$.

### Định lý La Hire (Tính tương hỗ cực - đối cực)
> Điểm $A$ thuộc đường đối cực của điểm $B$ đối với $(O)$ **khi và chỉ khi** điểm $B$ thuộc đường đối cực của điểm $A$.
> $$A \in \text{polar}(B) \iff B \in \text{polar}(A)$$

---

## 5. Bài toán Olympic chọn lọc & Lời giải

### Bài toán 1 (Vietnam TST 2018 Bài 2)
> **Đề bài:** Cho tứ giác $ABCD$ nội tiếp đường tròn $(O)$. Gọi $P = AB \cap CD, Q = AD \cap BC$. Tiếp tuyến tại $A$ và $C$ của $(O)$ cắt nhau tại $T$. Chứng minh rằng ba điểm $P, Q, T$ thẳng hàng.

**Lời giải bằng Cực - Đối cực:**
Xét đường tròn $(O)$ ngoại tiếp tứ giác $ABCD$.
- Xét điểm $T$: Theo định nghĩa đường đối cực, vì $TA$ và $TC$ là hai tiếp tuyến đến $(O)$ tại $A$ và $C$, nên đường đối cực của $T$ đối với $(O)$ chính là **đường thẳng cát tuyến $AC$**:
  $$\text{polar}(T) = AC$$
- Xét điểm $P = AB \cap CD$ và $Q = AD \cap BC$:
  Theo tính chất kinh điển của tứ giác toàn phần nội tiếp đường tròn:
  Đường đối cực của giao điểm hai cạnh đối $P$ chính là đường thẳng nối giao điểm hai cạnh đối còn lại $Q$ với giao điểm hai đường chéo $I = AC \cap BD$:
  $$\text{polar}(P) = QI$$
  Đặc biệt, điều này kéo theo $I \in \text{polar}(P)$.
- Áp dụng Định lý tương hỗ La Hire:
  Vì $I \in \text{polar}(P)$ nên $P \in \text{polar}(I)$.
  Mặt khác, $I \in AC = \text{polar}(T)$, nên theo La Hire: $T \in \text{polar}(I)$.
  Từ đó suy ra cả $P$ và $T$ đều nằm trên đường đối cực của điểm $I$.
  Do đó, đường thẳng $PT$ chính là $\text{polar}(I)$.
  Mà ta đã biết $\text{polar}(I) = PQ$ (đối cực của giao điểm hai đường chéo là đường nối hai giao điểm của các cạnh đối).
  Suy ra đường thẳng $PT$ trùng với đường thẳng $PQ$.
Vậy ba điểm $P, Q, T$ thẳng hàng. $\blacksquare$

---

## 6. Bài tập rèn luyện

1. **(Pascal suy biến):** Cho tam giác $ABC$ nội tiếp $(O)$. Tiếp tuyến tại $A$ cắt $BC$ tại $D$, tiếp tuyến tại $B$ cắt $CA$ tại $E$, tiếp tuyến tại $C$ cắt $AB$ tại $F$. Chứng minh $D, E, F$ thẳng hàng.
2. **(Desargues):** Cho tam giác $ABC$ có trực tâm $H$. $D, E, F$ là hình chiếu của $H$ lên ba cạnh. Áp dụng định lý Desargues chứng minh sự thẳng hàng của các giao điểm tương ứng.
3. **(IMO Shortlist):** Cho đường tròn $(O)$ và điểm $S$ nằm ngoài $(O)$. Kẻ cát tuyến $SAB, SCD$. Tiếp tuyến tại $A, B$ cắt nhau tại $M$, tiếp tuyến tại $C, D$ cắt nhau tại $N$. Chứng minh $S, M, N$ thẳng hàng.
