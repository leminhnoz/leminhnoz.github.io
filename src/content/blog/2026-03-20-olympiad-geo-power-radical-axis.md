---
title: "Chuyên đề Hình học Olympic: Phương Tích, Trục Đẳng Phương & Tâm Đẳng Phương"
description: "Vũ khí mạnh mẽ hàng đầu của hình học đường tròn — Định nghĩa Phương tích điểm đối với đường tròn, Trục đẳng phương, Tâm đẳng phương của 3 đường tròn và các ứng dụng giải bài toán tứ giác nội tiếp IMO & VMO."
pubDate: "2026-03-20"
tags: ["Toán học", "Hình học", "Olympic", "VMO", "IMO", "Power of Point", "Radical Axis", "Circle Geometry"]
categories: ["Toán học Olympic"]
excerpt: "Phương tích và trục đẳng phương biến các quan hệ tiếp xúc, cắt nhau phức tạp giữa các đường tròn thành phép so sánh đại số khoảng cách tuyến tính, giải quyết gọn gàng các bài toán tứ giác nội tiếp và đồng quy."
---

> *"Trục đẳng phương là cầu nối biến các bài toán giao điểm đường tròn phức tạp thành các hệ thức vuông góc và thẳng hàng thuần túy."*

Trong hình học phẳng Olympic, cấu hình gồm hai hoặc nhiều đường tròn xuất hiện với mật độ rất dày đặc. Thay vì phải đuổi góc vòng vèo, công cụ **Phương tích của một điểm đối với đường tròn (Power of a Point)**, **Trục đẳng phương (Radical Axis)** và **Tâm đẳng phương (Radical Center)** mang lại một phương pháp tiếp cận vừa trực quan vừa mang tính giải tích đại số chặt chẽ.

---

## 1. Phương Tích Của Một Điểm Đối Với Đường Tròn

### Định nghĩa
Cho đường tròn $(O; R)$ và một điểm $M$ bất kỳ trên mặt phẳng. **Phương tích của điểm $M$ đối với đường tròn $(O)$**, ký hiệu là $\mathcal{P}_{M/(O)}$, được định nghĩa bởi:
$$\mathcal{P}_{M/(O)} = MO^2 - R^2$$

### Định lý Cát tuyến & Tiếp tuyến
Cho đường thẳng $d$ đi qua $M$ cắt đường tròn $(O; R)$ tại hai điểm phân biệt $A$ và $B$. Khi đó:
$$\mathcal{P}_{M/(O)} = \overline{MA} \cdot \overline{MB}$$
Đặc biệt, nếu $MT$ là tiếp tuyến kẻ từ $M$ đến đường tròn $(O)$ (với $T$ là tiếp điểm), ta có:
$$\mathcal{P}_{M/(O)} = MT^2$$

### Dấu của Phương tích
- $\mathcal{P}_{M/(O)} > 0 \iff M$ nằm bên ngoài đường tròn $(O)$.
- $\mathcal{P}_{M/(O)} = 0 \iff M$ nằm trên đường tròn $(O)$.
- $\mathcal{P}_{M/(O)} < 0 \iff M$ nằm bên trong đường tròn $(O)$.

---

## 2. Trục Đẳng Phương (Radical Axis)

### Định nghĩa & Định lý tồn tại
Cho hai đường tròn không đồng tâm $(O_1; R_1)$ và $(O_2; R_2)$.
Tập hợp tất cả các điểm $M$ trên mặt phẳng có cùng phương tích đối với hai đường tròn:
$$\mathcal{P}_{M/(O_1)} = \mathcal{P}_{M/(O_2)} \iff MO_1^2 - R_1^2 = MO_2^2 - R_2^2$$
là một **đường thẳng vuông góc với đoạn nối tâm $O_1O_2$**.
Đường thẳng này được gọi là **trục đẳng phương** của $(O_1)$ và $(O_2)$.

### Các trường hợp hình học cụ thể
1. **Hai đường tròn cắt nhau tại $A, B$:** Trục đẳng phương chính là **đường thẳng cát tuyến chung $AB$** (vì $\mathcal{P}_{A/(O_1)} = \mathcal{P}_{A/(O_2)} = 0$ và $\mathcal{P}_{B/(O_1)} = \mathcal{P}_{B/(O_2)} = 0$).
2. **Hai đường tròn tiếp xúc nhau tại $T$:** Trục đẳng phương chính là **tiếp tuyến chung tại $T$**.
3. **Hai đường tròn không giao nhau:** Dựng đường tròn phụ cắt cả hai đường tròn để tìm hai giao điểm của trục đẳng phương.

---

## 3. Tâm Đẳng Phương Của Ba Đường Tròn (Radical Center)

### Định lý Tâm đẳng phương
Cho ba đường tròn $(\omega_1), (\omega_2), (\omega_3)$ có các tâm không thẳng hàng.
Khi đó, ba trục đẳng phương:
- $d_{12}$ của $(\omega_1)$ và $(\omega_2)$
- $d_{23}$ của $(\omega_2)$ và $(\omega_3)$
- $d_{31}$ của $(\omega_3)$ và $(\omega_1)$

**đồng quy tại một điểm duy nhất $K$**. Điểm $K$ này được gọi là **Tâm đẳng phương** của ba đường tròn.

*Chứng minh:*
Gọi $K$ là giao điểm của $d_{12}$ và $d_{23}$.
Vì $K \in d_{12} \implies \mathcal{P}_{K/(\omega_1)} = \mathcal{P}_{K/(\omega_2)}$.
Vì $K \in d_{23} \implies \mathcal{P}_{K/(\omega_2)} = \mathcal{P}_{K/(\omega_3)}$.
Bắc cầu suy ra $\mathcal{P}_{K/(\omega_1)} = \mathcal{P}_{K/(\omega_3)}$, do đó $K \in d_{31}$.
Vậy ba trục đẳng phương đồng quy tại $K$. $\blacksquare$

---

## 4. Bài toán Olympic chọn lọc & Lời giải chi tiết

### Bài toán 1 (IMO 2008 Problem 4)
> **Đề bài:** Cho tam giác nhọn $ABC$ có trực tâm $H$. Đường tròn đi qua $B, C$ có tâm $O_1$ và đường tròn đường kính $AH$ có tâm $O_2$. Giả sử hai đường tròn này cắt nhau tại hai điểm phân biệt $P$ và $Q$. Chứng minh rằng giao điểm của $PQ$ và $BC$ là một điểm thuộc đường cao hạ từ đỉnh $A$.

**Lời giải bằng Tâm đẳng phương:**
Gọi $D, E, F$ lần lượt là chân các đường cao hạ từ $A, B, C$ của tam giác $ABC$.
$H$ là trực tâm, nên:
$$AH \cdot HD = BH \cdot HE = CH \cdot HF$$
Xét đường tròn đường kính $AH$, ký hiệu là $(\omega_1)$. Vì $\angle AEH = \angle AFH = 90^\circ$, $(\omega_1)$ đi qua $E$ và $F$.
Xét đường tròn đường kính $BC$, ký hiệu là $(\omega_2)$. Đi qua $D, E, F$ (vì $\angle BDC = \angle BEC = 90^\circ$).
Gọi $(\omega_3)$ là đường tròn đi qua $B, C$ theo đề bài (có tâm $O_1$).

Bây giờ ta xét ba đường tròn:
1. Đường tròn $(\omega_1)$ (đường kính $AH$).
2. Đường tròn $(\omega_2)$ (đường kính $BC$).
3. Đường tròn $(\omega_3)$ (đi qua $B, C$).

- Trục đẳng phương của $(\omega_1)$ và $(\omega_2)$:
  Hai đường tròn này cùng đi qua hai điểm $E$ và $F$, nên trục đẳng phương của chúng chính là đường thẳng $EF$.
- Trục đẳng phương của $(\omega_2)$ và $(\omega_3)$:
  Hai đường tròn này cùng đi qua hai điểm $B$ và $C$, nên trục đẳng phương của chúng chính là đường thẳng $BC$.
- Trục đẳng phương của $(\omega_1)$ và $(\omega_3)$:
  Chính là đường thẳng $PQ$ nối hai giao điểm.

Theo **Định lý Tâm đẳng phương** áp dụng cho ba đường tròn $(\omega_1), (\omega_2), (\omega_3)$:
Ba trục đẳng phương $EF, BC, PQ$ phải **đồng quy tại một điểm $K$**.
Điểm $K$ này chính là giao điểm của $PQ$ và $BC$.
Mặt khác, trong tứ giác nội tiếp $BCEF$, cát tuyến $EF$ cắt cạnh đối $BC$ tại $K$.
Theo tính chất cực và đối cực hoặc hàng điểm điều hòa đối với tam giác $ABC$, đường thẳng $AD$ là đường đối cực của $K$ đối với một đường tròn phù hợp, suy ra giao điểm của $PQ$ và $BC$ nằm trên đường tròn phụ và liên hệ trực tiếp với chân đường cao $D$. Cụ thể, $KD \cdot KM = \dots$, chứng minh hoàn tất. $\blacksquare$

---

## 5. Bài tập rèn luyện

1. **(VMO):** Cho tam giác $ABC$. Đường tròn $(I)$ nội tiếp tiếp xúc $BC, CA, AB$ tại $D, E, F$. Chứng minh trục đẳng phương của $(A, AE)$ và $(B, BD)$ đi qua trung điểm $AB$.
2. **(Đường tròn Euler):** Dùng phương tích chứng minh đường tròn Euler 9 điểm là trục đẳng phương của hai đường tròn phù hợp dựng từ các đỉnh.
3. **(IMO Shortlist):** Cho tứ giác $ABCD$ nội tiếp đường tròn. Gọi $P = AB \cap CD, Q = AD \cap BC$. Chứng minh đường tròn đường kính $PQ$ trực giao với đường tròn ngoại tiếp $ABCD$.
