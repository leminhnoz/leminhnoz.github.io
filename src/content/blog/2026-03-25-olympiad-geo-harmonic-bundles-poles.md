---
title: "Chuyên đề Hình học Olympic: Hàng điểm điều hòa, Chùm điều hòa và Tứ giác toàn phần"
description: "Khảo sát chuyên sâu tỉ số kép, hàng điểm điều hòa, chùm điều hòa, hệ thức Newton, Descartes, tính chất điều hòa của tứ giác toàn phần và ứng dụng giải bài toán hình học trong VMO & IMO."
pubDate: "2026-03-25"
tags: ["Toán học", "Hình học", "Olympic", "VMO", "IMO", "Hàng điểm điều hòa", "Tỉ số kép"]
categories: ["Toán học Olympic"]
excerpt: "Hàng điểm điều hòa là chiếc cầu nối tuyệt mỹ giữa hình học xạ ảnh và hình học phẳng Euclid, biến các bài toán chứng minh thẳng hàng, đồng quy và điểm cố định trở nên trong sáng lạ kỳ."
---

> *"Hình học xạ ảnh nghiên cứu những tính chất hình học không thay đổi qua các phép chiếu. Và hàng điểm điều hòa chính là bất biến cao quý nhất."*

Trong các đề thi Học sinh giỏi Quốc gia (VMO) bài 4 và các kỳ thi IMO, cấu hình **Hàng điểm điều hòa** xuất hiện gần như thường trực. Việc nhìn ra tỉ số kép điều hòa $(-1)$ giúp người làm bài giải quyết nhanh chóng các bài toán chứng minh đường thẳng đi qua điểm cố định, tiếp tuyến hay chứng minh đồng quy.

---

## 1. Tỉ số kép và Hàng điểm điều hòa

### Định nghĩa Tỉ số kép
Cho bốn điểm phân biệt $A, B, C, D$ cùng nằm trên một đường thẳng định hướng. **Tỉ số kép** của bốn điểm đó, ký hiệu là $(A, B; C, D)$, được định nghĩa bằng:
$$(A, B; C, D) = \frac{\overline{CA}}{\overline{CB}} : \frac{\overline{DA}}{\overline{DB}} = \frac{\overline{CA}}{\overline{CB}} \cdot \frac{\overline{DB}}{\overline{DA}}$$

Trong đó $\overline{XY}$ là độ dài đại số của đoạn thẳng hướng từ $X$ đến $Y$.

### Định nghĩa Hàng điểm điều hòa
Nếu tỉ số kép $(A, B; C, D) = -1$, ta nói bốn điểm $A, B, C, D$ lập thành một **hàng điểm điều hòa**, ký hiệu là:
$$(A, B; C, D) = -1$$
Khi đó, hai điểm $C, D$ được gọi là **liên hợp điều hòa** đối với cặp điểm $A, B$.
Ý nghĩa hình học: Điểm $C$ chia trong đoạn $AB$ theo tỉ số bao nhiêu thì điểm $D$ chia ngoài đoạn $AB$ theo đúng tỉ số bấy nhiêu:
$$\frac{CA}{CB} = \frac{DA}{DB}$$

---

## 2. Các hệ thức tương đương kinh điển

Cho $(A, B; C, D) = -1$. Ta có các hệ thức tương đương đặc biệt hữu ích khi tính toán:

### 1. Hệ thức Newton (Gốc trung điểm)
Gọi $I$ là trung điểm của đoạn thẳng $AB$. Khi đó:
$$IA^2 = IB^2 = \overline{IC} \cdot \overline{ID}$$

*Chứng minh:*
Đặt $\overline{IA} = -a, \overline{IB} = a$.
Theo định nghĩa:
$$\frac{\overline{CA}}{\overline{CB}} = - \frac{\overline{DA}}{\overline{DB}} \iff \frac{-a - \overline{IC}}{a - \overline{IC}} = - \frac{-a - \overline{ID}}{a - \overline{ID}} \iff a^2 = \overline{IC} \cdot \overline{ID} \quad \blacksquare$$

### 2. Hệ thức Descartes (Gốc tại một mút)
Lấy gốc tại điểm $A$:
$$\frac{2}{\overline{AB}} = \frac{1}{\overline{AC}} + \frac{1}{\overline{AD}}$$

---

## 3. Chùm điều hòa (Harmonic Bundle)

### Định nghĩa
Tập hợp bốn đường thẳng $a, b, c, d$ cùng đi qua một điểm $O$ được gọi là một **chùm đường thẳng**, ký hiệu $O(a, b, c, d)$ hoặc $O(A, B, C, D)$ nếu trên các tia lần lượt lấy các điểm $A, B, C, D$.

### Định lý bảo toàn qua phép chiếu
Nếu một đường thẳng $d$ cắt chùm $O(A, B, C, D)$ lần lượt tại bốn điểm $A', B', C', D'$, thì tỉ số kép của bốn giao điểm này không phụ thuộc vào vị trí của cát tuyến $d$:
$$(A', B'; C', D') = (A, B; C, D)$$

Nếu $(A, B; C, D) = -1$, ta gọi chùm $O(A, B, C, D)$ là một **chùm điều hòa**, ký hiệu $O(A, B; C, D) = -1$.

### Dấu hiệu nhận biết chùm điều hòa vuông góc
Cho chùm điều hòa $O(A, B; C, D) = -1$.
Nếu hai tia $OC$ và $OD$ vuông góc với nhau ($OC \perp OD$), thì:
**$OC$ và $OD$ là hai đường phân giác trong và ngoài của góc $\angle AOB$**.

---

## 4. Tứ giác toàn phần và Tính chất điều hòa kinh điển

### Định nghĩa Tứ giác toàn phần
Một **tứ giác toàn phần** được tạo thành bởi bốn đường thẳng đôi một cắt nhau tại sáu giao điểm.
Sáu giao điểm này tạo thành ba cặp đỉnh đối diện, nối ba cặp đỉnh đối diện này ta được ba **đường chéo**.

### Định lý điều hòa của Tứ giác toàn phần
> *"Trên mỗi đường chéo của một tứ giác toàn phần, hai đỉnh của tứ giác và hai giao điểm với hai đường chéo còn lại tạo thành một hàng điểm điều hòa."*

Cụ thể, xét tứ giác $ABCD$ với:
- $E = AB \cap CD$
- $F = AD \cap BC$
- $I = AC \cap BD$
- $M = EF \cap AC$, $N = EF \cap BD$
Khi đó:
$$(A, C; I, M) = -1 \quad \text{và} \quad (B, D; I, N) = -1 \quad \text{và} \quad (E, F; M, N) = -1$$

Định lý này là công cụ mạnh nhất để tạo ra hàng điểm điều hòa từ các giao điểm thuần túy mà không cần phải tính toán độ dài!

---

## 5. Tứ giác điều hòa nội tiếp đường tròn

### Định nghĩa
Một tứ giác $ABCD$ nội tiếp đường tròn $(O)$ được gọi là **tứ giác điều hòa** nếu:
$$AB \cdot CD = AD \cdot BC$$

### Tính chất đặc trưng
Các mệnh đề sau tương đương đối với tứ giác $ABCD$ nội tiếp $(O)$:
1. Tứ giác $ABCD$ là tứ giác điều hòa.
2. Các tiếp tuyến của $(O)$ tại $A$ và $C$ cắt nhau tại một điểm nằm trên đường thẳng $BD$.
3. Các tiếp tuyến của $(O)$ tại $B$ và $D$ cắt nhau tại một điểm nằm trên đường thẳng $AC$.
4. $AC$ là đường đối trung của tam giác $ABD$ và tam giác $CBD$.

---

## 6. Bài toán Olympic ứng dụng (VMO)

### Đề bài
Cho tam giác $ABC$ có đường cao $AH$, trực tâm $H$. Gọi $M$ là trung điểm của $BC$. Đường thẳng qua $H$ vuông góc với $AM$ cắt $AB, AC$ lần lượt tại $P$ và $Q$. Chứng minh rằng $H$ là trung điểm của $PQ$.

**Lời giải bằng Chùm điều hòa:**
1. Dựng đường thẳng $d$ đi qua $A$ song song với $BC$.
2. Gọi $D$ là giao điểm của $AH$ với $BC$ ($D \equiv H$).
   Vì $M$ là trung điểm của $BC$ và $d \parallel BC$, theo định lý Thales chùm $A(d, AM, AB, AC)$ cắt $BC$ tạo thành:
   $$(d_\infty, M; B, C) = -1 \implies A(d, AM, AB, AC) \text{ là chùm điều hòa}$$
3. Đường thẳng $PQ$ vuông góc với $AM$, do đó tia $AM \perp PQ$.
   Cắt chùm điều hòa trên bởi cát tuyến $PQ$:
   Giao điểm của $AM$ với $PQ$ là điểm $H'$ (chính là hình chiếu).
   Kết hợp với tính chất phân giác vuông góc, suy ra $H$ phải là trung điểm của đoạn thẳng $PQ$. $\blacksquare$

---

## 7. Kết luận
Hàng điểm điều hòa giúp biến đổi góc nhìn từ hình học định lượng (tính độ dài, diện tích) sang hình học xạ ảnh định tính (vị trí tương đối, bảo toàn tỉ số kép). Đây là nền tảng cốt lõi để bước tiếp sang **Định lý Pascal, Brianchon và Desargues**.
