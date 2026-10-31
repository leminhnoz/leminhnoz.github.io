---
title: "Chuyên đề Tổ hợp Olympic: Trò Chơi Tổ Hợp, Định Lý Sprague-Grundy & Bài Toán Cối Xay Gió (Terence Tao)"
description: "Chinh phục đỉnh cao tư duy tổ hợp — Lý thuyết Trò chơi Nim, Định lý Sprague-Grundy với hàm Mex, Chiến lược đối xứng và Bài toán Cối xay gió huyền thoại (The Windmill Problem) của Terence Tao tại IMO 2011."
pubDate: "2026-05-01"
tags: ["Toán học", "Tổ hợp", "Olympic", "VMO", "IMO", "Combinatorial Games", "Sprague-Grundy", "Nim-Sum", "Windmill", "Terence Tao"]
categories: ["Toán học Olympic"]
excerpt: "Từ trò chơi bốc sỏi cổ xưa đến bài toán Cối xay gió chấn động đấu trường IMO 2011 của Terence Tao, vẻ đẹp của bất biến hình học và hàm thế vị đại số được thăng hoa trọn vẹn."
---

> *"Một bài toán tổ hợp đỉnh cao không yêu cầu tính toán trâu bò, mà đòi hỏi khả năng nhìn thấy một quy luật bảo toàn bất biến ẩn sâu trong một chuyển động tưởng chừng hỗn loạn."*

Trong kho tàng bài thi Olympic Toán học Quốc tế, bài thi IMO 2011 tại Amsterdam đã ghi dấu một trong những bài toán đẹp nhất lịch sử: **Bài toán Cối xay gió (The Windmill Problem)** do nhà toán học đoạt giải Fields **Terence Tao** đề xuất. Cùng với nền tảng **Lý thuyết Trò chơi Tổ hợp (Combinatorial Game Theory)** và **Định lý Sprague-Grundy**, đây là chuyên đề kết thúc hoàn hảo cho hành trình Tổ hợp Olympic.

---

## 1. Lý Thuyết Trò Chơi Tổ Hợp & Trò Chơi Nim

### Phân loại trạng thái P và N
Trong trò chơi hai người chơi đối kháng có thông tin hoàn hảo và kết thúc bình thường (người không đi được nước hợp lệ là người thua):
- **Trạng thái P (Previous-player-winning):** Người vừa đi trước đó có chiến lược thắng (vị trí thua của người đến lượt đi).
- **Trạng thái N (Next-player-winning):** Người đến lượt đi tiếp theo có chiến lược thắng.

**Ba tiên đề phân loại:**
1. Mọi vị trí kết thúc (không còn nước đi hợp lệ) đều là vị trí P.
2. Từ một vị trí N, luôn tồn tại ít nhất một nước đi dẫn tới một vị trí P.
3. Từ một vị trí P, mọi nước đi hợp lệ đều bắt buộc phải dẫn tới một vị trí N.

---

### Trò chơi Nim & Phép cộng Nim-sum (XOR)
Trò chơi gồm $k$ đống sỏi với số sỏi lần lượt là $a_1, a_2, \dots, a_k$. Mỗi lượt chơi, người chơi được chọn một đống tùy ý và bốc đi ít nhất một viên sỏi (có thể bốc hết cả đống).

> **Định lý Bouton (1901):**
> Một trạng thái $(a_1, a_2, \dots, a_k)$ là vị trí thua (vị trí P) **khi và chỉ khi** tổng Nim-sum của các đống sỏi bằng $0$:
> $$a_1 \oplus a_2 \oplus \dots \oplus a_k = 0$$
> trong đó $\oplus$ là phép cộng nhị phân không nhớ (bit-wise XOR).

---

## 2. Định Lý Sprague-Grundy & Hàm Mex

### Hàm Minimum Excluded (mex)
Với một tập con hữu hạn $S \subset \mathbb{N}$, $\text{mex}(S)$ là số tự nhiên nhỏ nhất không thuộc $S$:
$$\text{mex}(S) = \min (\mathbb{N} \setminus S)$$

### Giá trị Grundy (Nim-value)
Cho trò chơi không thiên vị biểu diễn bởi đồ thị có hướng không chu trình (DAG). Giá trị Grundy $g(v)$ của đỉnh $v$ được xác định đệ quy:
$$g(v) = \text{mex}(\{g(u) : v \to u\})$$

> **Định lý Sprague-Grundy:**
> Mọi trò chơi tổ hợp không thiên vị hữu hạn đều hoàn toàn tương đương với một đống sỏi Nim duy nhất có kích thước đúng bằng giá trị Grundy $g(v)$ của trạng thái hiện tại.
> Khi kết hợp nhiều trò chơi độc lập $G_1, G_2, \dots, G_m$, giá trị Grundy tổng bằng:
> $$g(G) = g_1(G_1) \oplus g_2(G_2) \oplus \dots \oplus g_m(G_m)$$

---

## 3. Kiệt Tác IMO 2011: Bài Toán Cối Xay Gió (Terence Tao)

### Đề bài (IMO 2011 Problem 2)
> Cho $S$ là một tập hữu hạn gồm ít nhất $3$ điểm trên mặt phẳng sao cho không có $3$ điểm nào thẳng hàng. Một *cối xay gió* là một quá trình bắt đầu với một đường thẳng $\ell$ đi qua một điểm duy nhất $P \in S$. Đường thẳng $\ell$ quay theo chiều kim đồng hồ quanh điểm xoay $P$ cho đến khi nó lần đầu tiên chạm vào một điểm khác $Q \in S$. Khi đó, điểm $Q$ trở thành điểm xoay mới, và đường thẳng $\ell$ tiếp tục quay theo chiều kim đồng hồ quanh điểm xoay $Q$.
> Chứng minh rằng ta luôn có thể chọn điểm xuất phát $P$ và đường thẳng ban đầu $\ell$ sao cho cối xay gió này sẽ quay quanh **mọi điểm** của $S$ vô hạn lần.

---

### Lời giải huyền thoại bằng Bất biến Phân chia Nửa mặt phẳng

**Bước 1: Thiết lập định hướng và bất biến tổ hợp**
Chọn đường thẳng $\ell$ có định hướng (đánh dấu một đầu là "mũi tên"). Khi đó, đường thẳng $\ell$ chia phần còn lại của mặt phẳng thành hai nửa mặt phẳng:
- Nửa mặt phẳng bên **trái** của $\ell$ (ký hiệu $L$).
- Nửa mặt phẳng bên **phải** của $\ell$ (ký hiệu $R$).

Giả sử tổng số điểm của $S$ là $n$. Vì không có 3 điểm nào thẳng hàng, ngoài điểm xoay $P$, $n - 1$ điểm còn lại sẽ nằm ở hai phía:
$$|L| + |R| = n - 1$$

**Bước 2: Phân tích sự bảo toàn khi đổi điểm xoay**
Hãy quan sát chính xác khoảnh khắc đường thẳng $\ell$ chuyển điểm xoay từ $P$ sang $Q$:
- Trước khi chạm $Q$, điểm $Q$ đang nằm ở nửa mặt phẳng $R$ (hoặc $L$).
- Ngay khi $\ell$ quay qua $Q$ và lấy $Q$ làm điểm xoay mới, điểm $P$ rời khỏi đường thẳng và chuyển sang nửa mặt phẳng đối diện!
- Mọi điểm khác trong $S \setminus \{P, Q\}$ không bị đường thẳng $\ell$ quét qua trong khoảnh khắc này, nên vị trí bên trái hay bên phải của chúng **hoàn toàn giữ nguyên**.

> **Khám phá bất biến then chốt:**
> Số lượng điểm nằm ở nửa mặt phẳng bên trái $|L|$ và số lượng điểm nằm ở nửa mặt phẳng bên phải $|R|$ **không đổi** trong suốt toàn bộ quá trình quay của cối xay gió!

**Bước 3: Chọn cấu hình ban đầu cân bằng**
Chọn số điểm hai phía cân bằng nhất có thể:
- Nếu $n$ lẻ: chọn $|L| = |R| = \frac{n - 1}{2}$.
- Nếu $n$ chẵn: chọn $|L| = \frac{n - 2}{2}, |R| = \frac{n}{2}$.

**Bước 4: Góc quay $180^\circ$ và tính bao phủ toàn bộ**
Khi đường thẳng $\ell$ quay được đúng một góc $180^\circ$, hướng của nó bị đảo ngược hoàn toàn (mũi tên quay ngược chiều).
Do đó, nửa mặt phẳng bên trái ban đầu trở thành nửa mặt phẳng bên phải, và ngược lại!
Để một điểm $A \in S$ từ nửa bên trái chuyển sang nửa bên phải sau nửa vòng quay $180^\circ$, đường thẳng $\ell$ **bắt buộc phải đi qua điểm $A$** và sử dụng $A$ làm điểm xoay ít nhất một lần.
Vì điều này đúng với mọi điểm trong $S$, sau mỗi chu kỳ quay $180^\circ$, cối xay gió đã quét qua và làm điểm xoay tại **tất cả mọi điểm** của tập hợp $S$.
Quá trình này tiếp diễn vô tận, do đó cối xay gió sẽ quay quanh mọi điểm vô số lần. $\blacksquare$

---

## 4. Bài tập rèn luyện

1. **(Trò chơi Wythoff):** Trò chơi gồm 2 đống sỏi, mỗi lượt được bốc số sỏi tùy ý từ 1 đống hoặc bốc cùng một số sỏi bằng nhau từ cả 2 đống. Tìm cấu trúc các vị trí thua (liên quan đến Tỉ lệ Vàng $\phi$).
2. **(Chiến lược đối xứng):** Hai người chơi lần lượt đặt đồng xu hình tròn đường kính $1$ lên một chiếc bàn tròn đường kính $10$ sao cho các đồng xu không đè lên nhau. Ai không đặt được là thua. Tìm chiến lược thắng cho người đi đầu.
3. **(VMO):** Cho một đồ thị và trò chơi tô màu các đỉnh sao cho không có hai đỉnh kề nhau cùng màu. Khảo sát số lượt đi và xác định người có chiến lược thắng.
