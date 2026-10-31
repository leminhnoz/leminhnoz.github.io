---
title: "Chuyên đề Tổ hợp Olympic: Nguyên Lý Dirichlet & Nguyên Lý Cực Hạn"
description: "Hai viên ngọc quý của tư duy Tổ hợp Olympic — Nguyên lý Dirichlet rời rạc và liên tục, Nguyên lý Cực hạn (Extremal Principle), Bài toán huyền thoại Sylvester-Gallai và kỹ thuật bao lồi trong VMO & IMO."
pubDate: "2026-04-10"
tags: ["Toán học", "Tổ hợp", "Olympic", "VMO", "IMO", "Dirichlet", "Pigeonhole", "Extremal Principle", "Combinatorics"]
categories: ["Toán học Olympic"]
excerpt: "Nguyên lý Dirichlet và Nguyên lý Cực hạn có vẻ hiển nhiên đến mức ngây thơ, nhưng khi được đặt vào tay một tuyển thủ Olympic tài năng, chúng có thể giải quyết những bài toán tồn tại phức tạp nhất."
---

> *"Xét phần tử cực đại hoặc cực tiểu không chỉ là một thủ thuật — đó là một triết lý tư duy: tìm kiếm sự ổn định tại những nơi khắc nghiệt nhất."*

Tổ hợp Olympic (Olympiad Combinatorics) là môn thi không có công thức rập khuôn. Trong số các phương pháp tiếp cận kinh điển, **Nguyên lý Dirichlet (Pigeonhole Principle)** và **Nguyên lý Cực hạn (Extremal Principle)** là hai công cụ chứng minh sự tồn tại mạnh mẽ nhất, biến những không gian rời rạc hỗn loạn thành các cấu trúc trật tự xác định.

---

## 1. Nguyên Lý Dirichlet (Pigeonhole Principle)

### Dạng cơ bản & Tổng quát
- **Dạng cơ bản:** Nếu nhốt $n + 1$ con thỏ vào $n$ cái lồng, thì luôn tồn tại ít nhất một cái lồng chứa từ $2$ con thỏ trở lên.
- **Dạng tổng quát:** Nếu chia $n$ đồ vật vào $k$ cái hộp, thì luôn tồn tại:
  - Ít nhất một hộp chứa không ít hơn $\left\lceil \frac{n}{k} \right\rceil$ đồ vật.
  - Ít nhất một hộp chứa không nhiều hơn $\left\lfloor \frac{n}{k} \right\rfloor$ đồ vật.

---

### Dạng hình học & Đo lường liên tục
Nếu một hình phẳng có diện tích $S$ được phủ bởi $k$ hình phẳng con có diện tích $S_1, S_2, \dots, S_k$ với:
$$\sum_{i=1}^k S_i > (m - 1) S$$
thì tồn tại ít nhất một điểm trên hình phẳng ban đầu bị phủ bởi ít nhất $m$ hình con.

---

## 2. Nguyên Lý Cực Hạn (Extremal Principle)

### Ý tưởng cốt lõi
Trong một tập hợp hữu hạn các đối tượng toán học $S \ne \emptyset$ (hoặc một tập hợp compact / bị chặn):
1. Luôn tồn tại phần tử nhỏ nhất $x_{\min}$ hoặc lớn nhất $x_{\max}$ theo một hàm mục tiêu xác định (độ dài ngắn nhất, diện tích lớn nhất, góc nhỏ nhất, số cạnh ít nhất, v.v.).
2. **Kỹ thuật chứng minh phản chứng:**
   - Chọn đối tượng cực trị $A^*$.
   - Giả sử mệnh đề bài toán không đúng.
   - Bằng các phép biến đổi hình học hoặc tổ hợp, ta chỉ ra sự tồn tại của một đối tượng $A'$ còn "cực trị hơn" cả $A^*$ (ví dụ: khoảng cách nhỏ hơn khoảng cách nhỏ nhất).
   - Mâu thuẫn này chứng minh mệnh đề ban đầu phải đúng!

---

## 3. Bài Toán Huyền Thoại Sylvester-Gallai

> **Định lý Sylvester-Gallai (1893):** Cho $S$ là một tập hợp hữu hạn gồm $n \ge 3$ điểm trên mặt phẳng, không cùng nằm trên một đường thẳng. Khi đó luôn tồn tại một đường thẳng đi qua **đúng hai điểm** của $S$.

### Lời giải kinh điển bằng Nguyên lý Cực hạn (L. M. Kelly - 1948)
Xét tập hợp $\mathcal{L}$ gồm tất cả các đường thẳng đi qua ít nhất 2 điểm của $S$. Vì $S$ hữu hạn và không thẳng hàng, tập hợp các khoảng cách từ một điểm $P \in S$ đến một đường thẳng $\ell \in \mathcal{L}$ (với $P \notin \ell$) là một tập hữu hạn các số thực dương.
Theo **Nguyên lý Cực hạn**, tập hợp này có phần tử nhỏ nhất:
Gọi khoảng cách nhỏ nhất này là $d(P_0, \ell_0) > 0$, đạt được tại điểm $P_0 \in S$ và đường thẳng $\ell_0 \in \mathcal{L}$.

Ta sẽ chứng minh $\ell_0$ đi qua đúng 2 điểm của $S$.
Giả sử phản chứng rằng $\ell_0$ đi qua ít nhất 3 điểm của $S$: gọi ba điểm đó là $A, B, C$.
Hạ đường vuông góc từ $P_0$ xuống $\ell_0$ tại điểm $H$.
Theo nguyên lý thứ tự trên đường thẳng, điểm $H$ chia đường thẳng $\ell_0$ thành hai nửa.
Theo nguyên lý Dirichlet, trong 3 điểm $A, B, C$ phải có ít nhất 2 điểm nằm về cùng một phía đối với $H$ (một điểm có thể trùng $H$).
Không mất tính tổng quát, giả sử $B$ và $C$ nằm cùng phía với $H$, và $B$ nằm giữa $H$ và $C$ (tức $HB < HC$).
Bây giờ, kẻ đường thẳng nối $P_0$ và $C$ (gọi là $\ell' = P_0 C$). Rõ ràng $\ell' \in \mathcal{L}$ vì đi qua 2 điểm của $S$.
Hạ đường vuông góc từ điểm $B \in S$ xuống đường thẳng $\ell'$ tại điểm $K$.
Xét tam giác vuông $P_0 H C$:
Vì $B$ nằm giữa $H$ và $C$, hình chiếu $K$ của $B$ lên cạnh huyền $P_0 C$ thỏa mãn:
$$BK = BC \cdot \sin \angle P_0 C H < HC \cdot \frac{P_0 H}{P_0 C} < P_0 H$$
Như vậy khoảng cách từ điểm $B \in S$ đến đường thẳng $\ell' \in \mathcal{L}$ là:
$$d(B, \ell') = BK < P_0 H = d(P_0, \ell_0)$$
Điều này mâu thuẫn hoàn toàn với việc $d(P_0, \ell_0)$ là khoảng cách nhỏ nhất!
Mâu thuẫn chứng tỏ $\ell_0$ không thể chứa 3 điểm của $S$.
Vậy $\ell_0$ phải đi qua đúng 2 điểm của $S$. $\blacksquare$

---

## 4. Bài toán Olympic chọn lọc & Lời giải

### Bài toán 1 (Nguyên lý Dirichlet trong Lý thuyết Đồ thị)
> **Đề bài:** Trong một bữa tiệc có $6$ người, chứng minh rằng luôn tìm được ít nhất 3 người đôi một quen nhau hoặc 3 người đôi một không quen nhau (Định lý Ramsey $R(3, 3) = 6$).

**Lời giải:**
Mô hình hóa bài toán thành đồ thị đầy đủ $K_6$ với 6 đỉnh đại diện cho 6 người. Nối hai đỉnh bằng cạnh màu đỏ nếu họ quen nhau, màu xanh nếu không quen nhau.
Chọn một đỉnh $A$ bất kỳ.
Đỉnh $A$ có $5$ cạnh nối tới $5$ đỉnh còn lại.
Theo **Nguyên lý Dirichlet**, chia $5$ cạnh vào $2$ màu (đỏ và xanh), tồn tại ít nhất:
$$\left\lceil \frac{5}{2} \right\rceil = 3 \text{ cạnh cùng màu}$$
Không mất tính tổng quát, giả sử có ít nhất 3 cạnh màu đỏ nối từ $A$ đến ba đỉnh $B, C, D$: $AB, AC, AD$ đều đỏ.
Bây giờ xét tam giác $BCD$:
- Nếu tồn tại một cạnh màu đỏ trong ba cạnh $BC, CD, DB$ (ví dụ cạnh $BC$ màu đỏ), thì cùng với hai cạnh $AB, AC$, ta có tam giác $ABC$ có 3 cạnh đều màu đỏ (3 người đôi một quen nhau).
- Nếu không có cạnh nào màu đỏ trong ba cạnh $BC, CD, DB$, thì bắt buộc cả ba cạnh $BC, CD, DB$ đều phải có màu xanh. Khi đó tam giác $BCD$ có 3 cạnh đều màu xanh (3 người đôi một không quen nhau).
Chứng minh hoàn tất. $\blacksquare$

---

## 5. Bài tập rèn luyện

1. **(Erdős-Szekeres):** Dùng nguyên lý Dirichlet chứng minh rằng mọi dãy số thực gồm $n^2 + 1$ số phân biệt luôn chứa một dãy con đơn điệu gồm $n + 1$ phần tử.
2. **(Bao lồi):** Cho tập hợp $S$ gồm $n$ điểm trên mặt phẳng sao cho diện tích tam giác tạo bởi bất kỳ 3 điểm nào cũng không vượt quá $1$. Chứng minh tồn tại tam giác có diện tích không quá $4$ chứa toàn bộ $S$.
3. **(USAMO):** Cho $2n$ điểm trên mặt phẳng, trong đó $n$ điểm màu đỏ và $n$ điểm màu xanh, không có 3 điểm nào thẳng hàng. Chứng minh luôn có thể nối $n$ cặp điểm (mỗi cặp gồm 1 đỏ, 1 xanh) bằng $n$ đoạn thẳng không cắt nhau.
