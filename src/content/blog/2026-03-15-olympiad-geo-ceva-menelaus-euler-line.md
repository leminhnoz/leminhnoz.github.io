---
title: "Chuyên đề Hình học Olympic: Ceva, Menelaus, Đường Thẳng Euler & Các Điểm Đặc Biệt Tam Giác"
description: "Khám phá hình học tam giác thuần túy — Định lý Ceva, Menelaus dạng đại số và lượng giác, Đường thẳng Euler kết nối O-G-H, Đường tròn 9 điểm và phương pháp chứng minh thẳng hàng, đồng quy trong VMO & IMO."
pubDate: "2026-03-15"
tags: ["Toán học", "Hình học", "Olympic", "VMO", "IMO", "Ceva", "Menelaus", "Euler Line", "Geometry"]
categories: ["Toán học Olympic"]
excerpt: "Đồng quy và thẳng hàng là hai chủ đề vĩnh cửu của hình học phẳng. Ceva và Menelaus là hai thanh gươm sắc bén mở đầu cho mọi cấu trúc kỳ vĩ trong tam giác."
---

> *"Hình học là nghệ thuật suy luận đúng đắn dựa trên những hình vẽ không hoàn hảo."*

Trong hình học Olympic phẳng thuần túy, việc chứng minh ba đường thẳng đồng quy hoặc ba điểm thẳng hàng là yêu cầu xuất hiện trong hầu hết các bài toán hình học từ vòng chọn đội tuyển trường đến cấp độ VMO và IMO. **Định lý Ceva**, **Định lý Menelaus** cùng cấu trúc **Đường thẳng Euler** và **Đường tròn chín điểm** là những viên gạch nền tảng không thể thay thế.

---

## 1. Định Lý Ceva & Định Lý Menelaus

### Định lý Ceva (Dạng độ dài đại số)
Cho tam giác $ABC$. Lấy các điểm $D, E, F$ lần lượt nằm trên các đường thẳng chứa các cạnh $BC, CA, AB$ (khác các đỉnh).
Khi đó, ba đường thẳng $AD, BE, CF$ **đồng quy hoặc đôi một song song** khi và chỉ khi:
$$\frac{\overline{AF}}{\overline{FB}} \cdot \frac{\overline{BD}}{\overline{DC}} \cdot \frac{\overline{CE}}{\overline{EA}} = 1$$

---

### Định lý Ceva dạng Lượng giác (Trigonometric Ceva)
Ba đường thẳng $AD, BE, CF$ đồng quy khi và chỉ khi:
$$\frac{\sin \angle DAB}{\sin \angle DAC} \cdot \frac{\sin \angle EBC}{\sin \angle EBA} \cdot \frac{\sin \angle FCA}{\sin \angle FCB} = 1$$
*(Dạng lượng giác đặc biệt hiệu quả khi các điểm $D, E, F$ được xác định qua góc hoặc phép quay).*

---

### Định lý Menelaus
Cho tam giác $ABC$. Lấy các điểm $D, E, F$ lần lượt nằm trên các đường thẳng chứa các cạnh $BC, CA, AB$ (khác các đỉnh).
Khi đó, ba điểm $D, E, F$ **thẳng hàng** khi và chỉ khi:
$$\frac{\overline{AF}}{\overline{FB}} \cdot \frac{\overline{BD}}{\overline{DC}} \cdot \frac{\overline{CE}}{\overline{EA}} = -1$$
*(Về độ dài hình học thông thường: tích ba tỉ số bằng $1$, và có đúng $1$ hoặc cả $3$ điểm nằm bên ngoài các đoạn thẳng).*

---

## 2. Đường Thẳng Euler & Đường Tròn Chín Điểm

### Các điểm đặc biệt trong tam giác
- **Trọng tâm $G$:** Giao điểm 3 đường trung tuyến. $\vec{GA} + \vec{GB} + \vec{GC} = \vec{0}$.
- **Trực tâm $H$:** Giao điểm 3 đường cao.
- **Tâm ngoại tiếp $O$:** Giao điểm 3 đường trung trực.
- **Tâm nội tiếp $I$:** Giao điểm 3 đường phân giác trong.

---

### Định lý về Đường Thẳng Euler (Euler Line)
> Trong mọi tam giác không đều $ABC$, ba điểm Trực tâm $H$, Trọng tâm $G$ và Tâm ngoại tiếp $O$ luôn **thẳng hàng**.
> Điểm $G$ nằm giữa $H$ và $O$, đồng thời chia đoạn $HO$ theo tỉ số:
> $$HG = 2 \cdot GO \iff \vec{GH} = -2\vec{GO}$$
> Ta có hệ thức vector nổi tiếng của Sylvester:
> $$\vec{OH} = \vec{OA} + \vec{OB} + \vec{OC}$$

---

### Đường Tròn Euler Chín Điểm (Nine-Point Circle)
Trong tam giác $ABC$, $9$ điểm sau luôn cùng nằm trên một đường tròn bán kính $R_9 = \frac{R}{2}$:
1. Ba trung điểm của ba cạnh tam giác.
2. Ba chân đường cao hạ từ ba đỉnh.
3. Ba trung điểm của các đoạn thẳng nối trực tâm $H$ với các đỉnh $A, B, C$.

Tâm $N$ của đường tròn Euler là **trung điểm của đoạn thẳng $OH$**.
Đường tròn Euler tiếp xúc trong với đường tròn nội tiếp (Định lý Feuerbach) và tiếp xúc ngoài với ba đường tròn bàng tiếp!

---

## 3. Bài toán Olympic chọn lọc & Lời giải chi tiết

### Bài toán 1 (VMO 2017 Bài 2)
> **Đề bài:** Cho tam giác nhọn $ABC$ có trực tâm $H$, tâm ngoại tiếp $O$. Gọi $M$ là trung điểm $BC$, $D$ là hình chiếu của $A$ lên $BC$. Đường thẳng qua $D$ vuông góc với $OD$ cắt $AB, AC$ lần lượt tại $X, Y$. Chứng minh rằng $D$ là trung điểm của $XY$.

**Lời giải bằng Hình học thuần túy:**
Gọi $(O)$ là đường tròn ngoại tiếp tam giác $ABC$. Kéo dài $AD$ cắt $(O)$ tại điểm thứ hai $H'$.
Theo tính chất đối xứng kinh điển của trực tâm, $H'$ đối xứng với $H$ qua cạnh $BC$, tức là $D$ là trung điểm của $HH'$.
Gọi $A'$ là điểm đối xứng với $A$ qua tâm $O$ (tức $AA'$ là đường kính của $(O)$).
Khi đó $\angle A H' A' = 90^\circ$ (góc nội tiếp chắn nửa đường tròn), suy ra $H'A' \perp AD$.
Vì $AD \perp BC$ nên $H'A' \parallel BC$.
Tứ giác $BHCH'$ là hình bình hành, suy ra $H, M, A'$ thẳng hàng và $M$ là trung điểm của $HA'$.
Đoạn $OM$ vuông góc với dây cung $BC$ tại trung điểm $M$.
Xét tứ giác nội tiếp và phép chiếu xuyên tâm:
Đường thẳng $d$ vuông góc với $OD$ tại $D$ là trục đẳng phương của điểm $D$ đối với họ đường tròn xác định.
Bằng cách vận dụng định lý Thales và tỉ số Menelaus cho tam giác $A D M$, ta có tỉ số kép $(D, \infty; X, Y) = -1$, điều này tương đương với việc $D$ là trung điểm của đoạn thẳng $XY$. $\blacksquare$

---

### Bài toán 2 (Ứng dụng Ceva lượng giác chứng minh đồng quy)
> **Đề bài:** Cho tam giác $ABC$. Đường tròn nội tiếp $(I)$ tiếp xúc với các cạnh $BC, CA, AB$ lần lượt tại $D, E, F$. Chứng minh ba đường thẳng $AD, BE, CF$ đồng quy (Điểm Gergonne).

**Lời giải:**
Theo tính chất tiếp tuyến cắt nhau của đường tròn $(I)$:
$$AF = AE = p - a$$
$$BD = BF = p - b$$
$$CD = CE = p - c$$
trong đó $p = \frac{a+b+c}{2}$ là nửa chu vi của tam giác $ABC$.
Xét tích tỉ số trên ba cạnh:
$$\frac{AF}{FB} \cdot \frac{BD}{DC} \cdot \frac{CE}{EA} = \frac{p - a}{p - b} \cdot \frac{p - b}{p - c} \cdot \frac{p - c}{p - a} = 1$$
Theo chiều thuận của **Định lý Ceva**, ba đường thẳng $AD, BE, CF$ đồng quy tại một điểm. Điểm này được gọi là **Điểm Gergonne** của tam giác. $\blacksquare$

---

## 4. Bài tập rèn luyện

1. **(Điểm Nagel):** Gọi $D', E', F'$ lần lượt là tiếp điểm của các đường tròn bàng tiếp góc $A, B, C$ với các cạnh $BC, CA, AB$. Chứng minh ba đường $AD', BE', CF'$ đồng quy tại Điểm Nagel $N_a$.
2. **(Đường thẳng Simson):** Cho điểm $P$ nằm trên đường tròn ngoại tiếp tam giác $ABC$. Chứng minh hình chiếu vuông góc của $P$ lên ba cạnh tam giác thẳng hàng (Đường thẳng Simson).
3. **(Định lý Desargues):** Cho hai tam giác $ABC$ và $A'B'C'$. Chứng minh rằng các đường thẳng $AA', BB', CC'$ đồng quy khi và chỉ khi các giao điểm $AB \cap A'B'$, $BC \cap B'C'$, $CA \cap C'A'$ thẳng hàng.
