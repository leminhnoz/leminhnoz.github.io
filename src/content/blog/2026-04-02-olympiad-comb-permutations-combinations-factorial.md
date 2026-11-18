---
title: "Chuyên đề Đại số Tổ hợp: Giai thừa, Các phép Hoán vị, Chỉnh hợp & Tổ hợp"
description: "Khảo sát toàn diện nền tảng Đại số Tổ hợp: Định nghĩa giai thừa, xấp xỉ Stirling, hoán vị lặp, hoán vị vòng quanh, chỉnh hợp A(n, k), tổ hợp C(n, k) và các bài toán phân phối kinh điển."
pubDate: "2026-04-02"
tags: ["Toán học", "Tổ hợp", "Olympic", "VMO", "Giai thừa", "Hoán vị", "Chỉnh hợp", "Combinatorics"]
categories: ["Toán học Olympic"]
excerpt: "Đại số tổ hợp bắt đầu từ câu hỏi sơ khai nhất của nhân loại: Có bao nhiêu cách xếp đặt các phần tử? Từ giai thừa, hoán vị đến chỉnh hợp và tổ hợp, một thế giới đếm toán học đầy trật tự và đối xứng mở ra."
---

> *"Nghệ thuật đếm không phải là liệt kê từng phần tử, mà là nhìn thấy cấu trúc bất biến của tập hợp."*

Trong toán học Olympic và khoa học máy tính, **Giai thừa, Hoán vị, Chỉnh hợp và Tổ hợp** là bốn viên gạch nền móng đầu tiên của Lý thuyết Rời rạc. Mọi bài toán xác suất, đồ thị hay lý thuyết trò chơi phức tạp đều quy về việc đếm chính xác số cấu hình thỏa mãn điều kiện.

---

## 1. Giai thừa và Công thức xấp xỉ Stirling

### 1.1. Định nghĩa
Với mọi số nguyên dương $n$, **giai thừa** của $n$ (ký hiệu $n!$) là tích của $n$ số nguyên dương đầu tiên:
$$n! = 1 \cdot 2 \cdot 3 \dots n = \prod_{i=1}^n i$$
Theo quy ước toán học để các công thức tổng quát luôn đúng:
$$0! = 1$$

Giai thừa thỏa mãn hệ thức đệ quy cơ bản:
$$n! = n \cdot (n - 1)! \quad (n \ge 1)$$

### 1.2. Tốc độ tăng trưởng và Xấp xỉ Stirling
Hàm giai thừa tăng trưởng nhanh hơn bất kỳ hàm số mũ $a^n$ nào. Khi $n$ đủ lớn, ta có công thức xấp xỉ Stirling kinh điển:
$$n! \sim \sqrt{2\pi n} \left(\frac{n}{e}\right)^n$$
Cụ thể hơn:
$$\sqrt{2\pi n} \left(\frac{n}{e}\right)^n e^{\frac{1}{12n+1}} < n! < \sqrt{2\pi n} \left(\frac{n}{e}\right)^n e^{\frac{1}{12n}}$$

---

## 2. Các phép Hoán vị (Permutations)

Một **hoán vị** của tập hợp $n$ phần tử là một cách sắp xếp có thứ tự $n$ phần tử đó.

### 2.1. Hoán vị không lặp
Số lượng hoán vị của một tập hợp gồm $n$ phần tử phân biệt ký hiệu là $P_n$:
$$P_n = n! = n(n - 1)(n - 2) \dots 1$$

*Ý nghĩa:* Có $n$ cách chọn phần tử ở vị trí thứ nhất, $n - 1$ cách chọn vị trí thứ hai, ..., và $1$ cách cho vị trí cuối cùng.

### 2.2. Hoán vị lặp (Multiset Permutations)
Nếu trong $n$ phần tử cần sắp xếp có:
- $n_1$ phần tử loại 1 giống nhau,
- $n_2$ phần tử loại 2 giống nhau,
- ...,
- $n_k$ phần tử loại $k$ giống nhau,
với $n_1 + n_2 + \dots + n_k = n$.

Khi đó, số hoán vị phân biệt ký hiệu là $P(n; n_1, n_2, \dots, n_k)$:
$$P(n; n_1, n_2, \dots, n_k) = \frac{n!}{n_1! \, n_2! \dots n_k!}$$

*Ví dụ kinh điển:* Có bao nhiêu cách sắp xếp các chữ cái trong từ **MISSISSIPPI**?
- Tổng số chữ cái: $n = 11$.
- Các chữ cái: 1 chữ M, 4 chữ I, 4 chữ S, 2 chữ P.
- Số cách xếp:
$$\frac{11!}{1! \, 4! \, 4! \, 2!} = \frac{39916800}{1 \cdot 24 \cdot 24 \cdot 2} = 34650$$

### 2.3. Hoán vị vòng quanh (Circular Permutations)
Số cách sắp xếp $n$ phần tử phân biệt ngồi quanh một bàn tròn (hai cách xếp được coi là như nhau nếu cách này thu được từ cách kia qua một phép quay bàn):
$$Q_n = \frac{n!}{n} = (n - 1)!$$

*Mở rộng:* Nếu bàn tròn có thể lật ngược lại (như xâu một chuỗi hạt cườm), chiều kim đồng hồ và ngược chiều kim đồng hồ trùng nhau, số cách xếp là:
$$\frac{(n - 1)!}{2}$$

### 2.4. Hoán vị không điểm bất động (Derangements)
Một hoán vị $(\pi_1, \pi_2, \dots, \pi_n)$ của $(1, 2, \dots, n)$ được gọi là **derangement** (số mất thứ tự) nếu không có phần tử nào ở đúng vị trí ban đầu của nó, tức $\pi_i \ne i$ với mọi $i$.

Số lượng derangement ký hiệu là $D_n$ hoặc $!n$:
$$D_n = (n - 1)(D_{n-1} + D_{n-2}) \quad (n \ge 3, \, D_1 = 0, D_2 = 1)$$
Công thức tổng quát theo Nguyên lý bù trừ (PIE):
$$D_n = n! \sum_{k=0}^n \frac{(-1)^k}{k!} = n! \left( 1 - \frac{1}{1!} + \frac{1}{2!} - \frac{1}{3!} + \dots + \frac{(-1)^n}{n!} \right)$$
Khi $n \to \infty$, xác suất một hoán vị ngẫu nhiên là derangement hội tụ về $\frac{1}{e} \approx 36.79\%$.

---

## 3. Chỉnh hợp (Arrangements / Partial Permutations)

### 3.1. Định nghĩa
Một **chỉnh hợp chập $k$ của $n$** phần tử ($0 \le k \le n$) là một cách chọn ra $k$ phần tử từ $n$ phần tử phân biệt và **sắp xếp chúng theo thứ tự**.

### 3.2. Công thức tính
Ký hiệu là $A_n^k$ (hoặc $P(n, k)$ trong tài liệu tiếng Anh):
$$A_n^k = n(n - 1)(n - 2) \dots (n - k + 1) = \frac{n!}{(n - k)!}$$

*Quy ước:* $A_n^0 = 1$, $A_n^n = P_n = n!$.

---

## 4. Tổ hợp (Combinations)

### 4.1. Định nghĩa
Một **tổ hợp chập $k$ của $n$** phần tử ($0 \le k \le n$) là một cách chọn ra $k$ phần tử từ $n$ phần tử phân biệt mà **không quan tâm đến thứ tự**.

### 4.2. Mối liên hệ cốt lõi giữa Chỉnh hợp và Tổ hợp
Vì mỗi tập hợp con gồm $k$ phần tử có đúng $k!$ cách hoán vị thứ tự, nên số chỉnh hợp gấp $k!$ lần số tổ hợp:
$$A_n^k = k! \cdot C_n^k \implies C_n^k = \binom{n}{k} = \frac{A_n^k}{k!} = \frac{n!}{k!(n - k)!}$$

### 4.3. Các tính chất đại số then chốt
1. **Tính chất đối xứng:**
   $$\binom{n}{k} = \binom{n}{n - k}$$
   *(Chọn $k$ phần tử lấy ra tương đương với chọn $n - k$ phần tử để lại).*

2. **Tính chất hấp thụ:**
   $$k \binom{n}{k} = n \binom{n - 1}{k - 1} \iff \binom{n}{k} = \frac{n}{k} \binom{n - 1}{k - 1}$$

3. **Tổng số tập con:**
   $$\sum_{k=0}^n \binom{n}{k} = \binom{n}{0} + \binom{n}{1} + \dots + \binom{n}{n} = 2^n$$

---

## 5. Bảng so sánh 4 mô hình đếm cơ bản

| Loại mô hình | Có thứ tự? | Cho phép lặp? | Công thức tính |
| :--- | :---: | :---: | :---: |
| **Hoán vị** | Có | Không | $P_n = n!$ |
| **Chỉnh hợp** | Có | Không | $A_n^k = \frac{n!}{(n-k)!}$ |
| **Chỉnh hợp lặp** | Có | Có | $n^k$ |
| **Tổ hợp** | Không | Không | $C_n^k = \binom{n}{k} = \frac{n!}{k!(n-k)!}$ |
| **Tổ hợp lặp** | Không | Có | $\overline{C}_n^k = \binom{n + k - 1}{k}$ |
