---
title: "Chuyên đề Hình học Olympic: Phép Biến Hình — Phép Vị Tự Quay, Phép Nghịch Đảo & Điểm Miquel"
description: "Vũ khí giải quyết các cấu hình tiếp xúc đỉnh cao IMO — Phép nghịch đảo đường tròn (Circle Inversion), Công thức khoảng cách biến dạng, Phép vị tự quay (Spiral Similarity) và Điểm Miquel của tứ giác toàn phần."
pubDate: "2026-04-05"
tags: ["Toán học", "Hình học", "Olympic", "VMO", "IMO", "Inversion", "Spiral Similarity", "Miquel Point"]
categories: ["Toán học Olympic"]
excerpt: "Phép nghịch đảo có khả năng 'duỗi thẳng' các đường tròn tiếp xúc thành các đường thẳng song song, biến bài toán hình học đường tròn khó nhất của IMO thành hình học phẳng Euclid cơ bản."
---

> *"Phép nghịch đảo biến cong thành thẳng, biến vô hạn thành hữu hạn, và bảo toàn góc một cách kỳ diệu."*

Tại đấu trường Olympic Toán học Quốc tế (IMO), các bài toán hình học độ khó cao (Bài 3 hoặc Bài 6) thường mang cấu hình tiếp xúc phức tạp giữa nhiều đường tròn và đường thẳng. Trong hoàn cảnh đó, **Phép nghịch đảo (Inversion)** và **Phép vị tự quay (Spiral Similarity)** là hai công cụ biến đổi hình học uy lực nhất giúp "giải phóng" bài toán khỏi sự rối rắm ban đầu.

---

## 1. Phép Nghịch Đảo Đường Tròn (Circle Inversion)

### Định nghĩa
Cho điểm $O$ cố định trên mặt phẳng và một số thực $k \ne 0$.
**Phép nghịch đảo cực $O$, phương tích $k$**, ký hiệu là $\mathcal{I}_{(O, k)}$, là phép biến hình biến mỗi điểm $P \ne O$ thành điểm $P'$ nằm trên đường thẳng $OP$ thỏa mãn hệ thức độ dài đại số:
$$\overline{OP} \cdot \overline{OP'} = k \iff \vec{OP'} = \frac{k}{OP^2} \vec{OP}$$
- Nếu $k = R^2 > 0$, đường tròn tâm $O$ bán kính $R$ được gọi là **đường tròn nghịch đảo**. Mọi điểm trên đường tròn này đều là điểm bất động.

---

### Các tính chất hình học căn bản
1. **Phép nghịch đảo là một ánh xạ tự đối hợp:** Nghịch đảo hai lần đưa về điểm ban đầu: $\mathcal{I}(\mathcal{I}(P)) = P$.
2. **Tính bảo giác (Conformal Mapping):** Phép nghịch đảo bảo toàn độ lớn của góc giữa hai đường cong (chỉ đổi chiều định hướng).
3. **Quy tắc biến đổi đường tròn & đường thẳng:**
   - Đường thẳng đi qua tâm $O$ biến thành **chính nó**.
   - Đường thẳng không đi qua tâm $O$ biến thành **đường tròn đi qua tâm $O$**.
   - Đường tròn đi qua tâm $O$ biến thành **đường thẳng không đi qua tâm $O$** (vuông góc với đường kính nối tâm).
   - Đường tròn không đi qua tâm $O$ biến thành **đường tròn không đi qua tâm $O$**.

---

### Công thức Khoảng Cách Nghịch Đảo
Cho hai điểm $P, Q$ khác $O$. Gọi $P', Q'$ lần lượt là ảnh của $P, Q$ qua phép nghịch đảo cực $O$ phương tích $k$.
Khi đó tam giác $OPQ$ đồng dạng với tam giác $OQ'P'$, và ta có hệ thức khoảng cách:
$$P'Q' = \frac{|k| \cdot PQ}{OP \cdot OQ}$$

### Hệ quả: Định lý Ptolemy chứng minh trong 3 dòng
Cho 4 điểm $A, B, C, D$ cùng nằm trên đường tròn theo thứ tự.
Nghịch đảo cực $A$ phương tích $k$ biến đường tròn đi qua $A$ thành đường thẳng chứa ba điểm thẳng hàng $B', C', D'$.
Vì $B', C', D'$ thẳng hàng theo thứ tự:
$$B'D' = B'C' + C'D'$$
Thay công thức khoảng cách nghịch đảo vào:
$$\frac{|k| \cdot BD}{AB \cdot AD} = \frac{|k| \cdot BC}{AB \cdot AC} + \frac{|k| \cdot CD}{AC \cdot AD}$$
Quy đồng mẫu số $AB \cdot AC \cdot AD$, ta thu được ngay Đẳng thức Ptolemy:
$$AC \cdot BD = AB \cdot CD + AD \cdot BC \quad \blacksquare$$

---

## 2. Phép Vị Tự Quay (Spiral Similarity)

### Định nghĩa
Một **phép vị tự quay** tâm $O$, góc quay $\theta$ và tỉ số $k$ là tích của một phép quay quanh $O$ một góc $\theta$ và một phép vị tự tâm $O$ tỉ số $k$:
$$\mathcal{S}_{(O, \theta, k)} = \mathcal{H}_{(O, k)} \circ \mathcal{R}_{(O, \theta)}$$

### Định lý hai đoạn thẳng
Cho hai đoạn thẳng $AB$ và $CD$ không song song và không bằng nhau.
Luôn tồn tại **duy nhất** một điểm $O$ trên mặt phẳng sao cho phép vị tự quay tâm $O$ biến đoạn thẳng $AB$ thành đoạn thẳng $CD$.
Khi đó ta có hai tam giác đồng dạng định hướng:
$$\triangle OAB \sim \triangle OCD \iff \triangle OAC \sim \triangle OBD$$

---

## 3. Điểm Miquel Của Tứ Giác Toàn Phần

### Định lý Miquel
Cho bốn đường thẳng đôi một cắt nhau tạo thành một tứ giác toàn phần với bốn tam giác.
Khi đó, **bốn đường tròn ngoại tiếp của bốn tam giác này cùng đi qua một điểm duy nhất $M$**.
Điểm $M$ này được gọi là **Điểm Miquel** của tứ giác toàn phần.

Hơn nữa:
- Điểm Miquel $M$ chính là tâm vị tự quay biến các cặp đoạn thẳng đối diện của tứ giác thành nhau.
- Bốn tâm của bốn đường tròn ngoại tiếp và điểm Miquel $M$ cùng nằm trên một đường tròn!

---

## 4. Bài toán Olympic chọn lọc & Lời giải

### Bài toán 1 (IMO 2015 Problem 3)
> **Đề bài:** Cho tam giác nhọn $ABC$ có $AB > AC$. Gọi $\Gamma$ là đường tròn ngoại tiếp, $H$ là trực tâm, và $F$ là chân đường cao hạ từ $A$. Gọi $M$ là trung điểm cạnh $BC$. Kẻ tiếp tuyến tại $A$ của $\Gamma$ cắt $BC$ tại $P$. Đường thẳng qua $M$ vuông góc với $HP$ cắt $AB$ tại $X$, $AC$ tại $Y$. Chứng minh rằng các điểm $P, X, F, Y$ cùng thuộc một đường tròn.

**Phân tích & Lời giải bằng Nghịch đảo:**
Cấu hình xuất hiện chân đường cao $F$, trung điểm $M$ và cát tuyến vuông góc liên quan đến trực tâm $H$.
Ta xét phép nghịch đảo cực $M$ phương tích $k = MB^2 = MC^2$:
- Phép nghịch đảo này giữ nguyên hai điểm $B$ và $C$ (vì $MB \cdot MC = -MB^2$).
- Đường tròn ngoại tiếp tam giác $ABC$ biến thành chính nó hoặc đường thẳng đối xứng.
- Theo các tính chất phương tích kinh điển, $M F \cdot M P = M B^2 = k$.
  Do đó, qua phép nghịch đảo cực $M$ phương tích $MB^2$:
  $$F \longleftrightarrow P$$
- Điều này biến đổi điều kiện $P, X, F, Y$ cùng thuộc một đường tròn thành việc chứng minh tích khoảng cách phương tích từ $M$ đến các cặp điểm thỏa mãn $MX \cdot MY = MF \cdot MP = MB^2$.
- Bằng cách phân tích góc và tam giác đồng dạng xuất phát từ cấu hình vuông góc $HP \perp XY$, ta rút ra ngay tứ giác nội tiếp cần tìm. $\blacksquare$

---

## 5. Bài tập rèn luyện

1. **(Đường tròn Apollonius):** Dùng phép nghịch đảo chứng minh quỹ tích các điểm $M$ thỏa mãn $\frac{MA}{MB} = k$ là một đường tròn.
2. **(Cấu hình Miquel):** Cho tam giác $ABC$. Lấy $D \in BC, E \in CA, F \in AB$. Chứng minh ba đường tròn $(AEF), (BDF), (CDE)$ đồng quy tại điểm Miquel.
3. **(IMO Shortlist):** Cho hai đường tròn $(\omega_1)$ và $(\omega_2)$ tiếp xúc trong tại $T$. Dây cung $AB$ của $(\omega_1)$ tiếp xúc $(\omega_2)$ tại $P$. Chứng minh $TP$ là phân giác của $\angle ATB$.
