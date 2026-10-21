---
title: "Lũy thừa nhị phân (Binary Exponentiation): Phép thuật tính lũy thừa trong O(log n)"
description: "Khám phá kỹ thuật Lũy thừa nhị phân (Binary Exponentiation) từ cơ bản đến nâng cao: tính a^n trong O(log n), lũy thừa modulo, nhân ma trận tính Fibonacci và các ứng dụng bất ngờ trong đồ thị, hình học."
pubDate: "2026-10-21"
tags: ["Binary Exponentiation", "Math", "Algorithms", "C++", "Competitive Programming"]
categories: ["Competitive Programming"]
excerpt: "Làm sao để tính 3^1000000000 trong chưa đầy một phần triệu giây? Tìm hiểu bản chất của phép bình phương liên tiếp và sức mạnh của tính kết hợp trong toán học thuật toán."
---

> *"Làm sao để máy tính tính được $3^{10^9} \pmod{10^9+7}$ trong chưa đầy 1 phần triệu giây, trong khi phép nhân lặp thông thường sẽ cần tới 1 tỷ phép tính và mất cả giây đồng hồ?"*

Câu trả lời nằm ở một trong những kỹ thuật số học đẹp đẽ và quan trọng nhất trong lập trình thi đấu: **Lũy thừa nhị phân (Binary Exponentiation)**, hay còn gọi là **Lũy thừa bằng cách bình phương liên tiếp (Exponentiation by Squaring)**.

Kỹ thuật này giúp bạn giảm số phép nhân để tính $a^n$ từ **$O(n)$** xuống chỉ còn **$O(\log n)$**. Không những thế, nhờ **tính chất kết hợp (associativity)**, nó còn mở rộng ra nhiều bài toán thú vị: nhân ma trận tìm số Fibonacci thứ $10^{18}$, áp dụng hoán vị $k$ lần, biến đổi hình học và đếm đường đi trên đồ thị.

---

## 1. Ý tưởng cốt lõi: Phân tích số mũ sang hệ nhị phân

Cách ngây thơ nhất để tính $a^n$ là nhân $a$ với chính nó $n$ lần:
$$a^n = \underbrace{a \cdot a \cdot \dots \cdot a}_{n \text{ lần}}$$

Cách này mất $O(n)$ phép tính. Khi $n = 10^9$ hay $10^{18}$, máy tính chắc chắn sẽ bị quá thời gian (TLE).

Thay vào đó, hãy nhớ lại tính chất lũy thừa:
$$a^{b + c} = a^b \cdot a^c \quad \text{và} \quad a^{2b} = (a^b)^2$$

### Ví dụ trực quan: Tính $3^{13}$

Hãy viết số mũ $13$ dưới dạng **hệ nhị phân (base 2)**:
$$13 = 1101_2 = 8 + 4 + 1 = 2^3 + 2^2 + 2^0$$

Do đó:
$$3^{13} = 3^8 \cdot 3^4 \cdot 3^1$$

Thay vì nhân 13 con số 3 với nhau, ta chỉ cần nhân **3 con số**: $3^8$, $3^4$ và $3^1$!

Và điều kỳ diệu là: các lũy thừa dạng $a^{2^k}$ ($a^1, a^2, a^4, a^8, a^{16}, \dots$) có thể sinh ra cực kỳ nhanh bằng cách **bình phương số đứng liền trước**:
- $3^1 = 3$
- $3^2 = (3^1)^2 = 3^2 = 9$
- $3^4 = (3^2)^2 = 9^2 = 81$
- $3^8 = (3^4)^2 = 81^2 = 6561$

Cuối cùng, gom các phần tử tương ứng với các bit 1 của số 13:
$$3^{13} = 3^8 \cdot 3^4 \cdot 3^1 = 6561 \cdot 81 \cdot 3 = 1.594.323$$

### Độ phức tạp
Vì một số nguyên $n$ chỉ có $\lfloor \log_2 n \rfloor + 1$ chữ số nhị phân, ta chỉ mất tối đa:
- $\log_2 n$ phép bình phương.
- $\log_2 n$ phép nhân kết quả.

Tổng độ phức tạp thời gian: **$O(\log n)$**! Với $n = 10^{18}$, $\log_2(10^{18}) \approx 60$, máy tính chỉ mất khoảng **60 phép tính** — thực thi trong tích tắc.

---

## 2. Cài đặt C++

### Cách 1: Đệ quy chia để trị (Recursive)

Ý tưởng quy nạp:
$$a^n = \begin{cases} 1 &\text{if } n = 0 \\ \left(a^{\frac{n}{2}}\right)^2 &\text{if } n \text{ is even} \\ \left(a^{\frac{n - 1}{2}}\right)^2 \cdot a &\text{if } n \text{ is odd} \end{cases}$$

```cpp
long long binpow_recursive(long long a, long long b) {
    if (b == 0) return 1;
    long long res = binpow_recursive(a, b / 2);
    if (b % 2 == 1) 
        return res * res * a;
    else 
        return res * res;
}
```

---

### Cách 2: Vòng lặp khử đệ quy (Iterative - Khuyên dùng)

Cách tiếp cận lặp trực tiếp duyệt qua từng bit của số mũ $b$ từ phải sang trái bằng các toán tử bitwise (`b & 1` và `b >>= 1`). Cách này chạy nhanh hơn cách đệ quy trong thực tế vì không tốn chi phí gọi hàm:

```cpp
long long binpow(long long a, long long b) {
    long long res = 1;
    while (b > 0) {
        // Nếu bit cuối cùng của b là 1, nhân a vào kết quả
        if (b & 1) res = res * a;
        // Bình phương a cho bước tiếp theo
        a = a * a;
        // Dịch phải b để kiểm tra bit tiếp theo
        b >>= 1;
    }
    return res;
}
```

---

## 3. Các ứng dụng thực chiến trong Competitive Programming

Sức mạnh của Lũy thừa nhị phân không chỉ dừng lại ở phép nhân số thông thường. Nó áp dụng được cho **mọi phép toán có tính chất kết hợp**:
$$(X \cdot Y) \cdot Z = X \cdot (Y \cdot Z)$$

### Ứng dụng 1: Lũy thừa lấy dư (Modular Exponentiation)

Trong các bài toán thi đấu, kết quả thường yêu cầu lấy dư cho một số nguyên tố lớn (thường là $10^9 + 7$ hoặc $998244353$). Vì phép nhân có tính chất phân phối qua phép lấy dư:
$$(a \cdot b) \pmod m = ((a \pmod m) \cdot (b \pmod m)) \pmod m$$

Ta chỉ việc thêm `% m` vào mỗi phép nhân:

```cpp
long long binpow(long long a, long long b, long long m) {
    a %= m;
    long long res = 1;
    while (b > 0) {
        if (b & 1) res = (res * a) % m;
        a = (a * a) % m;
        b >>= 1;
    }
    return res;
}
```

> **Ứng dụng cực kỳ quan trọng: Nghịch đảo Modulo (Modular Inverse)**  
> Theo Định lý nhỏ Fermat: Nếu $m$ là số nguyên tố và $\gcd(a, m) = 1$, thì $a^{m-1} \equiv 1 \pmod m$.  
> Do đó, nghịch đảo modulo của $a$ chính là:
> $$a^{-1} \equiv a^{m - 2} \pmod m$$
> Bạn chỉ cần gọi `binpow(a, m - 2, m)` là tính được phép chia modulo $\frac{x}{a} \pmod m$ trong $O(\log m)$!

---

### Ứng dụng 2: Nhân ma trận & Tìm số Fibonacci thứ $N$ trong $O(\log N)$

Dãy Fibonacci có công thức truy hồi: $F_n = F_{n-1} + F_{n-2}$. Ta có thể biểu diễn bước chuyển trạng thái dưới dạng nhân ma trận $2 \times 2$:

$$\begin{pmatrix} F_{n+1} \\ F_n \end{pmatrix} = \begin{pmatrix} 1 & 1 \\ 1 & 0 \end{pmatrix} \begin{pmatrix} F_n \\ F_{n-1} \end{pmatrix}$$

Quy nạp lên, ta có:
$$\begin{pmatrix} F_{n+1} \\ F_n \end{pmatrix} = \begin{pmatrix} 1 & 1 \\ 1 & 0 \end{pmatrix}^n \begin{pmatrix} F_1 \\ F_0 \end{pmatrix}$$

Bằng cách áp dụng lũy thừa nhị phân trên **ma trận**, ta có thể tính $\begin{pmatrix} 1 & 1 \\ 1 & 0 \end{pmatrix}^n$ chỉ mất $O(\log n)$ phép nhân ma trận! Kỹ thuật này giúp tìm $F_{10^{18}} \pmod{10^9+7}$ trong chưa tới 1 mili-giây.

---

### Ứng dụng 3: Áp dụng một hoán vị $k$ lần

**Bài toán:** Cho một dãy số và một hoán vị $P$. Áp dụng hoán vị này lên dãy liên tiếp $k$ lần (với $k$ có thể lên tới $10^{18}$).

**Giải pháp:**  
Phép hợp hai hoán vị $(P \circ Q)$ có tính chất kết hợp. Do đó, ta có thể nâng hoán vị $P$ lên lũy thừa $k$ bằng thuật toán Lũy thừa nhị phân trong thời gian $O(N \log k)$!

```cpp
vector<int> applyPermutation(const vector<int>& seq, const vector<int>& perm) {
    vector<int> newSeq(seq.size());
    for (size_t i = 0; i < seq.size(); i++) {
        newSeq[i] = seq[perm[i]];
    }
    return newSeq;
}

vector<int> permute(vector<int> seq, vector<int> perm, long long k) {
    while (k > 0) {
        if (k & 1) seq = applyPermutation(seq, perm);
        perm = applyPermutation(perm, perm);
        k >>= 1;
    }
    return seq;
}
```

---

### Ứng dụng 4: Đếm số đường đi độ dài $k$ trên đồ thị

**Bài toán:** Cho một đồ thị có hướng gồm $N$ đỉnh. Hãy đếm số đường đi có độ dài đúng bằng $k$ bước từ đỉnh $u$ đến đỉnh $v$.

**Giải pháp:**  
Gọi ma trận kề của đồ thị là $A$ (trong đó $A_{i, j} = 1$ nếu có cạnh từ $i \to j$, ngược lại $0$).  
Một tính chất đại số đẹp đẽ là: **Phần tử $(u, v)$ trong ma trận lũy thừa $A^k$ chính là số đường đi độ dài $k$ từ đỉnh $u$ đến đỉnh $v$!**

Ta dùng nhân ma trận kết hợp lũy thừa nhị phân để tính $A^k$ trong độ phức tạp:
$$O(N^3 \log k)$$

*(Mở rộng: Nếu cạnh có trọng số và cần tìm đường đi ngắn nhất có đúng $k$ cạnh, ta thay phép nhân đại số $(\times, +)$ bằng đại số nhiệt đới $(\min, +)$: $C_{i, j} = \min_k (A_{i, k} + B_{k, j})$).*

---

### Ứng dụng 5: Phép nhân nhị phân chống tràn số (Binary Multiplication)

**Bài toán:** Cần tính $(a \cdot b) \pmod m$ khi cả $a$ và $b$ đều nằm trong phạm vi số nguyên 64-bit (`long long`), nhưng tích $a \cdot b$ có thể lên tới $10^{36}$ (vượt quá giới hạn `long long`) và môi trường không hỗ trợ `__int128`.

**Giải pháp:**  
Tương tự như lũy thừa nhị phân dùng phép nhân để nhân đôi số mũ, ta có thể dùng **phép cộng** để nhân số nguyên:
$$a \cdot b = \begin{cases} 0 &\text{if } b = 0 \\ 2 \cdot (a \cdot \frac{b}{2}) &\text{if } b \text{ is even} \\ 2 \cdot (a \cdot \frac{b - 1}{2}) + a &\text{if } b \text{ is odd} \end{cases}$$

```cpp
long long mulmod(long long a, long long b, long long m) {
    long long res = 0;
    a %= m;
    while (b > 0) {
        if (b & 1) res = (res + a) % m;
        a = (a + a) % m;
        b >>= 1;
    }
    return res;
}
```
Thời gian chạy là $O(\log b)$, hoàn toàn an toàn trước nguy cơ tràn số!

---

## 4. Bảng tổng kết

| Ứng dụng | Đối tượng nhân | Độ phức tạp | Mục đích chính |
| :--- | :--- | :--- | :--- |
| **Tính $a^n \pmod m$** | Số nguyên | $O(\log n)$ | Lũy thừa, nghịch đảo modulo |
| **Fibonacci / Truy hồi tuyến tính** | Ma trận $K \times K$ | $O(K^3 \log n)$ | Tìm số thứ $10^{18}$ |
| **Lũy thừa hoán vị** | Mảng vị trí | $O(N \log k)$ | Nhảy vị trí $k$ lần |
| **Đường đi trên đồ thị** | Ma trận kề | $O(N^3 \log k)$ | Đếm đường đi độ dài $k$ |
| **Nhân chống tràn (`mulmod`)** | Số nguyên (dùng cộng) | $O(\log b)$ | Tính $(a \cdot b) \pmod m$ |

---

## Lời kết

Lũy thừa nhị phân là minh chứng kinh điển cho vẻ đẹp của tư duy thuật toán: **thay vì lặp lại các thao tác đơn lẻ, hãy gấp đôi quy mô bài toán sau mỗi bước**.

Chỉ từ một ý tưởng chia đôi số mũ giản dị, cánh cửa giải quyết hàng loạt bài toán từ số học, đại số ma trận đến đồ thị đã được mở ra. Hãy luyện tập cài đặt thuần thục đoạn code lặp 10 dòng của `binpow`, vì nó sẽ theo bạn trong suốt hành trình lập trình thi đấu!
