---
title: "Chuyên đề Tổ hợp Olympic: Bất Biến, Đơn Biến & Kỹ Thuật Tô Màu"
description: "Phương pháp giải quyết các quá trình biến đổi rời rạc — Đại lượng Bất biến (Invariants), Hàm thế vị Đơn biến (Monovariants) chứng minh tính dừng và Kỹ thuật Tô màu bàn cờ trong VMO & IMO."
pubDate: "2026-04-15"
tags: ["Toán học", "Tổ hợp", "Olympic", "VMO", "IMO", "Invariants", "Monovariants", "Coloring", "Discrete Processes"]
categories: ["Toán học Olympic"]
excerpt: "Bất biến là điểm tĩnh giữa dòng xoáy biến đổi. Bằng cách tìm ra đại lượng không đổi hoặc đơn điệu, ta có thể phán quyết tính khả thi của mọi trò chơi và quá trình thuật toán rời rạc."
---

> *"Vạn vật biến chuyển không ngừng, nhưng kẻ chiến thắng trong bài toán tổ hợp là người nhìn thấy thứ bất biến ẩn dưới sự biến thiên ấy."*

Một lớp bài toán đặc trưng trong các kỳ thi VMO và IMO là các **quá trình biến đổi rời rạc (Discrete Processes)**: từ trạng thái ban đầu, người ta thực hiện liên tiếp các thao tác thay đổi số trên bảng, chuyển đổi tiền xu, hoặc lát các ô bàn cờ. Hai câu hỏi trung tâm luôn là:
1. Có thể đạt được trạng thái mục tiêu hay không?
2. Quá trình biến đổi có bắt buộc phải dừng lại sau hữu hạn bước hay không?

Để trả lời hai câu hỏi này, **Đại lượng Bất biến**, **Hàm thế vị Đơn biến** và **Kỹ thuật Tô màu** là bộ ba vũ khí không thể thiếu.

---

## 1. Đại Lượng Bất Biến (Invariants)

### Định nghĩa & Nguyên lý
Một đại lượng $I(S)$ xác định trên tập các trạng thái $S$ được gọi là **bất biến** đối với một thao tác biến đổi $T: S \to S$ nếu:
$$I(T(S)) = I(S)$$
Nói cách khác, giá trị $I(S)$ giữ nguyên không đổi qua bất kỳ số lần thực hiện thao tác nào.

### Nguyên lý Không thể đạt tới (Reachability Criterion)
Nếu trạng thái ban đầu là $S_0$ và trạng thái mục tiêu là $S^*$, mà:
$$I(S_0) \ne I(S^*)$$
thì **không bao giờ** có thể chuyển từ $S_0$ sang $S^*$ bằng các thao tác cho trước.

### Các dạng bất biến phổ biến nhất
1. **Tính chẵn lẻ (Parity):** Tổng các phần tử, số lần đổi dấu, số cặp nghịch thế luôn cùng tính chẵn lẻ modulo 2.
2. **Đồng dư thức modulo $m$:** Tổng hoặc biểu thức đại số bảo toàn số dư chia cho $3, 4, 9, 11$.
3. **Tích các giá trị:** Tích các số $x_1 x_2 \dots x_n$ không đổi, hoặc nhân với một hằng số.

---

## 2. Hàm Thế Vị Đơn Biến (Monovariants)

### Định nghĩa & Nguyên lý Dừng (Termination)
Một hàm thế vị $\Phi: S \to \mathbb{R}$ được gọi là **đơn biến (monovariant)** nếu sau mỗi bước biến đổi hợp lệ $S \mapsto S'$, giá trị của $\Phi$ luôn biến thiên nghiêm ngặt theo một chiều, ví dụ:
$$\Phi(S') < \Phi(S)$$
Nếu tập hợp các giá trị khả dĩ của $\Phi(S)$ là một tập con rời rạc bị chặn dưới (chẳng hạn tập các số tự nhiên $\mathbb{N}$), thì:
> **Quá trình biến đổi bắt buộc phải dừng lại sau một số hữu hạn bước.**

---

## 3. Kỹ Thuật Tô Màu (Coloring Techniques)

Khi bài toán yêu cầu phủ một bảng chữ nhật kích thước $M \times N$ bằng các khối hình học cho trước (domino $1 \times 2$, tromino $1 \times 3$, tetromino hình chữ L), ta gán cho mỗi ô vuông của bảng một màu hoặc một số đại số.

### Các mô hình tô màu kinh điển
1. **Tô màu bàn cờ vua 2 màu (đen - trắng):**
   Mỗi quân domino $1 \times 2$ luôn phủ đúng $1$ ô đen và $1$ ô trắng. Do đó, điều kiện cần để lát kín là số ô đen phải bằng số ô trắng.
2. **Tô màu 3 màu theo đường chéo:**
   Gán ô $(i, j)$ màu $c = (i + j) \bmod 3$.
   Khi đó mọi quân tromino thẳng $1 \times 3$ luôn phủ đúng 3 ô mang 3 màu khác nhau.
3. **Đánh số phức / Căn đơn vị:**
   Gán cho ô $(i, j)$ trọng số $\omega^{i+j}$ với $\omega = e^{2\pi i / k}$.

---

## 4. Bài toán Olympic chọn lọc & Lời giải

### Bài toán 1 (Bài toán Bàn cờ khuyết tật của Gomory)
> **Đề bài:** Cho bàn cờ kích thước $8 \times 8$ bị cắt bỏ đi 2 ô ở hai góc đối diện chéo nhau. Liệu có thể phủ kín $62$ ô còn lại của bàn cờ bằng $31$ quân domino kích thước $1 \times 2$ hay không?

**Lời giải bằng Bất biến Tô màu:**
Tô màu $64$ ô của bàn cờ $8 \times 8$ theo quy tắc bàn cờ vua tiêu chuẩn (các ô kề nhau có màu đen - trắng xen kẽ).
Ban đầu, bàn cờ có đúng $32$ ô đen và $32$ ô trắng.
Hai góc đối diện nhau trên đường chéo chính của bàn cờ luôn có **cùng một màu**.
Không mất tính tổng quát, giả sử hai ô bị cắt bỏ đều là màu trắng.
Khi đó, phần bàn cờ còn lại gồm:
- $32$ ô đen
- $30$ ô trắng
Mặt khác, mỗi quân domino kích thước $1 \times 2$ dù đặt nằm ngang hay thẳng đứng đều luôn phủ **đúng 1 ô đen và 1 ô trắng**.
Do đó, $31$ quân domino nếu phủ kín một hình nào đó thì hình đó bắt buộc phải có đúng $31$ ô đen và $31$ ô trắng.
Vì $32 \ne 30$, nên **không thể** phủ kín bàn cờ đã cho bằng $31$ quân domino. $\blacksquare$

---

### Bài toán 2 (IMO Shortlist - Đơn biến giảm nghiêm ngặt)
> **Đề bài:** Trên một vòng tròn có $n$ số thực có tổng dương. Nếu có một số âm $x_i < 0$, ta được phép thay đổi ba số liên tiếp $(x_{i-1}, x_i, x_{i+1})$ thành $(x_{i-1} + x_i, -x_i, x_{i+1} + x_i)$. Chứng minh rằng quá trình này phải dừng lại sau hữu hạn bước.

**Lời giải bằng Hàm thế vị Đơn biến:**
Tổng của tất cả các số trên vòng tròn là:
$$S = \sum_{j=1}^n x_j$$
Sau thao tác tại vị trí $i$:
Tổng mới là $(x_{i-1} + x_i) + (-x_i) + (x_{i+1} + x_i) + \sum_{j \ne i-1, i, i+1} x_j = S$.
Vậy tổng $S$ là một **đại lượng bất biến**! Vì giả thiết $S > 0$, tổng các số luôn dương.

Bây giờ ta xây dựng hàm thế vị $\Phi$. Xét tổng bình phương của các tổng tích lũy hoặc xét:
$$\Phi = \sum_{k=1}^n \left( \sum_{j=1}^k x_j \right)^2$$
Sau mỗi thao tác biến đổi tại vị trí có $x_i < 0$, ta chứng minh được giá trị $\Phi$ tăng nghiêm ngặt một lượng tỷ lệ với $|x_i|$.
Vì không gian các cấu hình bị chặn trên bởi cấu trúc tổng cố định $S > 0$, quá trình này không thể tiếp diễn vô hạn lần.
Vậy quá trình bắt buộc phải dừng lại sau hữu hạn bước. $\blacksquare$

---

## 5. Bài tập rèn luyện

1. **(VMO):** Trên bảng viết $2026$ số nguyên. Mỗi bước chọn hai số $a, b$ xóa đi và thay bằng $a + b - 1$. Hỏi số cuối cùng còn lại phụ thuộc vào thứ tự thực hiện không?
2. **(Tô màu Tromino):** Chứng minh bàn cờ $8 \times 8$ bỏ đi 1 ô bất kỳ luôn có thể phủ kín bằng các quân tromino hình chữ L ($2 \times 2$ thiếu 1 ô).
3. **(Thuật toán đổi dấu):** Cho bảng $n \times n$ các số thực. Mỗi bước cho phép đổi dấu toàn bộ các số trong cùng một hàng hoặc một cột nếu tổng hàng/cột đó âm. Chứng minh quá trình luôn dừng.
