---
title: "Hệ số nhị thức (Tổ hợp C(n, k)): Từ Tam giác Pascal đến Định lý Lucas và Modulo kỳ dị"
description: "Khám phá toàn diện Hệ số nhị thức (Binomial Coefficients) trong Lập trình thi đấu: từ công thức Newton, Tam giác Pascal, tính modulo số nguyên tố lớn trong O(1), xử lý lũy thừa nguyên tố, đến Định lý Lucas cho N siêu lớn."
pubDate: "2026-10-21"
tags: ["Math", "Combinatorics", "Number Theory", "Algorithms", "C++", "Competitive Programming"]
categories: ["Algorithms"]
excerpt: "Tính tổ hợp C(n, k) thoạt nghe như kiến thức cấp 3, nhưng trong lập trình thi đấu, nó là cả một bầu trời kỹ thuật: tiền xử lý O(1) với nghịch đảo modulo, xử lý modulo hợp số với CRT, và chinh phục N = 10^18 bằng Định lý Lucas!"
---

> *"Hệ số nhị thức $\binom{n}{k}$ (hay còn gọi là tổ hợp $C_n^k$) là một trong những khái niệm toán học xuất hiện nhiều nhất trong thế giới lập trình. Từ bài toán đếm đường đi trên lưới, xếp hàng, chia kẹo Euler, đến xác suất và quy hoạch động — đâu đâu ta cũng thấy bóng dáng của nó.*  
>  
> *Thế nhưng, tính toán $\binom{n}{k}$ trong máy tính không đơn giản như bấm máy tính cầm tay Casio:*  
> - *Tính bằng giai thừa $n! / (k!(n-k)!)$ thì tràn số ngay khi $n \ge 21$.*  
> - *Tính bằng Tam giác Pascal $O(n^2)$ thì quá chậm khi $n = 10^6$.*  
> - *Tính modulo số nguyên tố lớn $10^9 + 7$ trong $O(1)$ như thế nào?*  
> - *Và nếu $n$ khổng lồ cỡ $10^{18}$ hay modulo là một hợp số bất kỳ thì giải quyết ra sao?*  
>  
> *Hãy cùng khám phá toàn bộ kho tàng bí kíp tính Tổ hợp từ vỡ lòng đến Master trong bài viết này!"*

---

## 1. Trực giác: Hệ số nhị thức là gì?

Hệ số nhị thức $\binom{n}{k}$ (đọc là *"n chọn k"*) biểu thị **số cách chọn ra $k$ phần tử từ một tập hợp gồm $n$ phần tử khác nhau mà không quan tâm đến thứ tự**.

Nó còn là hệ số của các số hạng trong khai triển lũy thừa của một nhị thức (Nhị thức Newton):

$$(a + b)^n = \sum_{k=0}^n \binom{n}{k} a^{n-k} b^k = \binom{n}{0} a^n + \binom{n}{1} a^{n-1} b + \dots + \binom{n}{n} b^n$$

### Công thức giải tích:
$$\binom{n}{k} = \frac{n!}{k!(n - k)!}$$

*Vì sao lại có công thức này?*
- Để chọn $k$ phần tử có phân biệt thứ tự từ $n$ phần tử: Có $n$ cách chọn phần tử 1, $n - 1$ cách chọn phần tử 2, $\dots$, $n - k + 1$ cách chọn phần tử $k$. Tích này bằng $\frac{n!}{(n - k)!}$.
- Nhưng vì ta không quan tâm thứ tự, mà $k$ phần tử bất kỳ có đúng $k!$ cách hoán vị, nên ta phải chia cho $k!$ để loại bỏ sự trùng lặp:
  $$\binom{n}{k} = \frac{n!}{k!(n - k)!}$$

---

## 2. Những đẳng thức tổ hợp "thần thánh"

Các hệ số nhị thức sở hữu những tính chất toán học vô cùng thanh lịch:

1. **Tính chất đối xứng:**
   $$\binom{n}{k} = \binom{n}{n - k}$$
   *(Chọn $k$ người đi du lịch cũng giống như chọn $n - k$ người ở lại nhà).*

2. **Công thức truy hồi Tam giác Pascal:**
   $$\binom{n}{k} = \binom{n - 1}{k - 1} + \binom{n - 1}{k}$$
   *(Xét một người cụ thể $X$: hoặc $X$ được chọn [cần chọn $k - 1$ người từ $n - 1$ người còn lại], hoặc $X$ không được chọn [cần chọn $k$ người từ $n - 1$ người còn lại]).*

3. **Tổng một hàng (Tổng số tập con):**
   $$\sum_{k=0}^n \binom{n}{k} = \binom{n}{0} + \binom{n}{1} + \dots + \binom{n}{n} = 2^n$$
   *(Mỗi phần tử có 2 lựa chọn: nằm trong tập con hoặc không).*

4. **Đồng nhất thức Gậy khúc côn cầu (Hockey-stick Identity):**
   $$\sum_{i=0}^n \binom{i}{k} = \binom{n + 1}{k + 1}$$

5. **Đồng nhất thức Chuỗi bình phương Vandermonde:**
   $$\sum_{k=0}^n \binom{n}{k}^2 = \binom{2n}{n}$$

6. **Mối liên hệ kỳ diệu với Dãy Fibonacci:**
   $$\binom{n}{0} + \binom{n-1}{1} + \binom{n-2}{2} + \dots = F_{n+1}$$
   *(Tổng các đường chéo nông trong Tam giác Pascal chính là dãy số Fibonacci!)*

---

## 3. Ba phương pháp tính cơ bản

### Cách 1: Tính trực tiếp bằng số học (Nhân chia xen kẽ)
Nếu chỉ cần tính một giá trị đơn lẻ với $n, k$ vừa phải sao cho đáp án vừa trong kiểu `long long`:  
Ta biểu diễn:
$$\binom{n}{k} = \prod_{i=1}^k \frac{n - k + i}{i} = \frac{n - k + 1}{1} \times \frac{n - k + 2}{2} \times \dots \times \frac{n}{k}$$

Ta thực hiện phép nhân và chia xen kẽ ở từng bước:

```cpp
long long nCr(int n, int k) {
    if (k < 0 || k > n) return 0;
    if (k == 0 || k == n) return 1;
    if (k > n - k) k = n - k; // Tận dụng tính đối xứng

    long long res = 1;
    for (int i = 1; i <= k; i++) {
        res = res * (n - k + i) / i; // Luôn đảm bảo chia hết tại mỗi bước!
    }
    return res;
}
```

*Độ phức tạp:* $O(k)$ thời gian, $O(1)$ bộ nhớ.

---

### Cách 2: Tam giác Pascal (Quy hoạch động $O(n^2)$)
Thích hợp khi bạn cần tra cứu nhiều giá trị $\binom{n}{k}$ với $n \le 2000$.  
Đặc biệt: **Phương pháp này hoạt động với BẤT KỲ modulo $m$ nào (kể cả hợp số)**, vì toàn bộ bảng chỉ dùng **phép cộng**, hoàn toàn không cần phép chia hay nghịch đảo modulo!

```cpp
const int MAXN = 2000;
int C[MAXN + 1][MAXN + 1];

void buildPascal(int mod) {
    for (int i = 0; i <= MAXN; i++) {
        C[i][0] = 1;
        for (int j = 1; j <= i; j++) {
            C[i][j] = (C[i - 1][j - 1] + C[i - 1][j]) % mod;
        }
    }
}
```

---

### Cách 3: Nghịch đảo Modulo số nguyên tố lớn — Truy vấn $O(1)$
Trong Competitive Programming, 90% bài toán yêu cầu tính $\binom{n}{k} \pmod{10^9 + 7}$ với $n \le 10^6$ và có tới $10^5$ truy vấn.

Áp dụng công thức:
$$\binom{n}{k} \equiv n! \cdot (k!)^{-1} \cdot ((n - k)!)^{-1} \pmod{MOD}$$

### Bí quyết tiền xử lý $O(N)$ bằng nghịch đảo dồn dập:
Nhiều bạn dùng lũy thừa nhị phân `binpow` để tính nghịch đảo cho từng giai thừa mất $O(N \log MOD)$. Nhưng ta có thể làm trong **đúng $O(N)$** nhờ quan sát:
$$( (i - 1)! )^{-1} \equiv (i!)^{-1} \cdot i \pmod{MOD}$$

```cpp
const int MAXN = 1000000;
const int MOD = 1e9 + 7;

long long fact[MAXN + 1];
long long invFact[MAXN + 1];

long long binpow(long long a, long long b) {
    long long res = 1;
    a %= MOD;
    while (b > 0) {
        if (b & 1) res = res * a % MOD;
        a = a * a % MOD;
        b >>= 1;
    }
    return res;
}

void precompute() {
    fact[0] = 1;
    for (int i = 1; i <= MAXN; i++) {
        fact[i] = fact[i - 1] * i % MOD;
    }

    // Tính nghịch đảo của MAXN! bằng Định lý Fermat nhỏ
    invFact[MAXN] = binpow(fact[MAXN], MOD - 2);

    // Đi lùi để tính toàn bộ nghịch đảo giai thừa còn lại trong O(N)
    for (int i = MAXN - 1; i >= 0; i--) {
        invFact[i] = invFact[i + 1] * (i + 1) % MOD;
    }
}

long long nCr(int n, int k) {
    if (k < 0 || k > n) return 0;
    return fact[n] * invFact[k] % MOD * invFact[n - k] % MOD;
}
```

Sau khi tiền xử lý mất $O(N)$, mỗi truy vấn $\binom{n}{k}$ chỉ tốn đúng **$O(1)$**!

---

## 4. Nâng cấp thượng thừa 1: Khi Modulo là Lũy thừa số nguyên tố ($m = p^b$)

Điều gì xảy ra nếu modulo là $m = 2^3 = 8$ hoặc $3^2 = 9$?  
Lúc này $m$ không phải số nguyên tố, và nếu $p \le \max(k, n - k)$ thì $k!$ có thể chia hết cho $p$, nghĩa là $\gcd(k!, m) > 1$ $\implies$ **Nghịch đảo modulo không tồn tại!**

### Giải pháp: Rút sạch thừa số $p$ ra ngoài!
1. Mỗi số giai thừa $x!$ được phân tách thành hai phần:
   $$x! = p^{c(x)} \cdot g(x)$$
   - $c(x)$ là số mũ lớn nhất của $p$ chia hết $x!$ (tính bằng **Công thức Legendre**).
   - $g(x) = \frac{x!}{p^{c(x)}}$ là phần còn lại sau khi đã "vắt kiệt" hết thừa số $p$.
2. Khi đó:
   $$\binom{n}{k} = \frac{g(n)}{g(k) \cdot g(n - k)} \cdot p^{c(n) - c(k) - c(n - k)}$$
3. Vì $g(k)$ và $g(n - k)$ không còn chứa thừa số $p$ nào, nên $\gcd(g, m) = 1$ $\implies$ **Ta hoàn toàn có thể tính nghịch đảo modulo của $g$ bằng thuật toán Euclid mở rộng!**
4. Nếu số mũ dôi dư $c(n) - c(k) - c(n - k) \ge b$, thì $p^b \mid \binom{n}{k} \implies \binom{n}{k} \equiv 0 \pmod{p^b}$.

---

## 5. Nâng cấp thượng thừa 2: Modulo là HỢP SỐ BẤT KỲ (Áp dụng CRT)

Giả sử cần tính $\binom{n}{k} \pmod{m}$ với $m$ là một hợp số bất kỳ (ví dụ $m = 1000 = 2^3 \times 5^3$):

1. Phân tích $m$ ra thừa số nguyên tố:
   $$m = p_1^{e_1} \cdot p_2^{e_2} \dots p_h^{e_h}$$
2. Với mỗi thành phần $p_i^{e_i}$, ta áp dụng phương pháp ở Mục 4 để tính:
   $$r_i = \binom{n}{k} \pmod{p_i^{e_i}}$$
3. Ta thu được một hệ phương trình đồng dư:
   $$\begin{cases} x \equiv r_1 \pmod{p_1^{e_1}} \\ x \equiv r_2 \pmod{p_2^{e_2}} \\ \dots \\ x \equiv r_h \pmod{p_h^{e_h}} \end{cases}$$
4. Vì các modulo $p_i^{e_i}$ đôi một nguyên tố cùng nhau, ta dùng **Định lý Thặng dư Trung Hoa (Chinese Remainder Theorem - CRT)** để tìm nghiệm duy nhất $x \pmod m$!

---

## 6. Vũ khí tối thượng: Định lý Lucas khi $N$ siêu lớn ($N \le 10^{18}$)

Bạn gặp đề bài: *"Tính $\binom{N}{K} \pmod p$ với $N, K \le 10^{18}$ và $p$ là số nguyên tố nhỏ ($p \le 10^5$)"*.  
Với $N = 10^{18}$, ta không thể tạo mảng giai thừa kích thước $10^{18}$ được!

Nhà toán học Édouard Lucas đã chứng minh một định lý chấn động:

> **Định lý Lucas (Lucas' Theorem):**  
> Viết $N$ và $K$ trong **hệ cơ số $p$**:
> $$N = (n_m n_{m-1} \dots n_1 n_0)_p = n_m p^m + \dots + n_1 p + n_0$$
> $$K = (k_m k_{m-1} \dots k_1 k_0)_p = k_m p^m + \dots + k_1 p + k_0$$
> Khi đó:
> $$\binom{N}{K} \equiv \prod_{i=0}^m \binom{n_i}{k_i} \pmod p$$
> *(Quy ước: Nếu có bất kỳ chữ số nào mà $n_i < k_i$ thì $\binom{n_i}{k_i} = 0$).*

### Ý nghĩa đột phá:
Một bài toán tổ hợp với các số $10^{18}$ khổng lồ đã được bẻ gãy thành **tích của khoảng $\log_p N$ tổ hợp nhỏ với các số $< p$**!  
Mỗi tổ hợp nhỏ $\binom{n_i}{k_i}$ được tính trong $O(1)$ bằng mảng giai thừa đã tiền xử lý đến $p$.

### Cài đặt C++ Định lý Lucas siêu gọn:

```cpp
// Tính nCr(n, k) % p với n, k < p
long long nCr_small(long long n, long long k, long long p) {
    if (k < 0 || k > n) return 0;
    return fact[n] * invFact[k] % p * invFact[n - k] % p;
}

// Định lý Lucas cho N, K bất kỳ (lên tới 10^18)
long long lucas(long long n, long long k, long long p) {
    if (k == 0) return 1;
    long long ni = n % p;
    long long ki = k % p;
    if (ni < ki) return 0; // Chữ số của n nhỏ hơn chữ số của k
    return lucas(n / p, k / p, p) * nCr_small(ni, ki, p) % p;
}
```

Độ phức tạp: **$O(p + \log_p N)$**, chạy trong chưa đầy $0.005$ giây!

---

## 7. Bảng tổng kết: Chọn thuật toán nào khi lâm trận?

| Trường hợp | Ràng buộc | Thuật toán tối ưu | Độ phức tạp |
| :--- | :--- | :--- | :--- |
| **Giá trị đơn lẻ, $n, k$ nhỏ** | $n \le 60$, không mod | Nhân chia xen kẽ | $O(k)$ |
| **Nhiều truy vấn, $n$ nhỏ** | $n \le 2000$, modulo bất kỳ | Tam giác Pascal DP | Tiền xử lý $O(n^2)$, truy vấn $O(1)$ |
| **Modulo nguyên tố lớn** | $n \le 10^6, MOD \approx 10^9+7$ | Giai thừa + Nghịch đảo Fermat | Tiền xử lý $O(n)$, truy vấn $O(1)$ |
| **$N$ siêu lớn, $p$ nguyên tố nhỏ** | $N \le 10^{18}, p \le 10^5$ | **Định lý Lucas** | $O(p + \log_p N)$ |
| **Modulo hợp số $m = p^b$** | $n \le 10^6, m = p^b$ | Legendre rút $p$ + Euclid mở rộng | $O(n \log m)$ |
| **Modulo hợp số bất kỳ** | $n \le 10^5, m$ bất kỳ | Phân rã nguyên tố + CRT | Tùy thuộc vào các thừa số |

---

## 8. Lời kết

Từ công thức khai triển cấp 3 đơn giản, việc tính Hệ số nhị thức $\binom{n}{k}$ trong khoa học máy tính đã mở ra một chân trời kỹ thuật số học rực rỡ: từ nghịch đảo modulo, công thức Legendre rút thừa số, đến Định lý Thặng dư Trung Hoa và Định lý Lucas.

Nắm trọn các vũ khí này trong tay, bạn đã sẵn sàng làm chủ mọi bài toán tổ hợp và đếm cấu trúc từ những bài cơ bản trên Codeforces đến những câu hỏi hóc búa của các kỳ thi ICPC!
