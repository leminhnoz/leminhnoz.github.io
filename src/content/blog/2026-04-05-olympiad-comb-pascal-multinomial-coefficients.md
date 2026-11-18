---
title: "Chuyên đề Tổ hợp: Tam giác Pascal, Nhị thức Newton & Hệ số Đa thức (Multinomial Coefficient)"
description: "Khám phá chiều sâu của Tam giác Pascal, các đồng nhất thức tổ hợp kinh điển (Chu-Vandermonde, Hockey-stick), Khai triển Nhị thức Newton và mở rộng toàn diện lên Hệ số Đa thức (Multinomial Coefficient)."
pubDate: "2026-04-05"
tags: ["Toán học", "Tổ hợp", "Olympic", "VMO", "Tam giác Pascal", "Nhị thức Newton", "Multinomial", "Combinatorics"]
categories: ["Toán học Olympic"]
excerpt: "Từ hệ thức truy hồi giản dị của Tam giác Pascal đến Định lý Khai triển Đa thức (Multinomial Theorem), chúng ta chứng kiến sự giao thoa tuyệt đẹp giữa Đại số và Tổ hợp — nơi mỗi hệ số đều mang một ý nghĩa đếm sâu sắc."
---

> *"Tam giác Pascal chứa đựng toàn bộ cấu trúc của xác suất, đại số và hình học fractal chỉ bằng phép cộng hai số liền kề."*

Nếu như Hoán vị và Tổ hợp cung cấp công thức định lượng, thì **Tam giác Pascal** và **Hệ số Đa thức (Multinomial Coefficient)** chính là bức tranh toàn cảnh mô tả cách các phần tử kết hợp với nhau trong không gian đại số.

---

## 1. Tam giác Pascal và Hệ thức truy hồi

### 1.1. Công thức cộng Pascal
Mỗi phần tử trong tam giác Pascal được tạo thành bằng tổng của hai phần tử nằm ngay phía trên nó:
$$\binom{n}{k} = \binom{n - 1}{k - 1} + \binom{n - 1}{k} \quad (1 \le k \le n - 1)$$

*Chứng minh tổ hợp:*  
Giả sử ta cần chọn $k$ người từ nhóm $n$ người gồm một người đặc biệt tên là $A$ và $n - 1$ người còn lại:
- **Trường hợp 1 (chọn $A$):** Cần chọn thêm $k - 1$ người từ $n - 1$ người còn lại $\implies$ có $\binom{n - 1}{k - 1}$ cách.
- **Trường hợp 2 (không chọn $A$):** Cần chọn đủ $k$ người từ $n - 1$ người còn lại $\implies$ có $\binom{n - 1}{k}$ cách.  
Theo quy tắc cộng, ta có điều phải chứng minh. $\blacksquare$

### 1.2. Biểu diễn Tam giác Pascal
```text
n=0:        1
n=1:       1   1
n=2:      1   2   1
n=3:     1   3   3   1
n=4:    1   4   6   4   1
n=5:   1   5  10  10   5   1
```

### 1.3. Các tính chất hình học kỳ diệu của Tam giác Pascal
1. **Tính đối xứng trục:** Đường trục chính giữa chia tam giác làm hai nửa đối xứng:
   $$\binom{n}{k} = \binom{n}{n - k}$$
2. **Tổng các đường chéo nông — Dãy số Fibonacci:**
   $$\binom{n}{0} + \binom{n-1}{1} + \binom{n-2}{2} + \binom{n-3}{3} + \dots = F_{n+1}$$
3. **Đồng nhất thức Gậy khúc côn cầu (Hockey-stick Identity):**
   Bắt đầu từ số $1$ ở một đường chéo và đi thẳng xuống, tổng tất cả các số trên đoạn đó bằng số nằm ở hàng dưới bẻ sang phải:
   $$\sum_{i=r}^n \binom{i}{r} = \binom{r}{r} + \binom{r+1}{r} + \dots + \binom{n}{r} = \binom{n+1}{r+1}$$

---

## 2. Nhị thức Newton & Các Đồng nhất thức Tổ hợp

### 2.1. Định lý Khai triển Nhị thức Newton
Với mọi số thực $x, y$ và số nguyên dương $n$:
$$(x + y)^n = \sum_{k=0}^n \binom{n}{k} x^{n - k} y^k$$

*Các hệ quả then chốt:*
- Cho $x = 1, y = 1$:
  $$\sum_{k=0}^n \binom{n}{k} = \binom{n}{0} + \binom{n}{1} + \dots + \binom{n}{n} = 2^n$$
- Cho $x = 1, y = -1$:
  $$\sum_{k=0}^n (-1)^k \binom{n}{k} = 0 \implies \sum_{k \text{ chẵn}} \binom{n}{k} = \sum_{k \text{ lẻ}} \binom{n}{k} = 2^{n - 1}$$
- Đạo hàm hai vế theo $x$ rồi cho $x = 1, y = 1$:
  $$\sum_{k=1}^n k \binom{n}{k} = n \cdot 2^{n - 1}$$

### 2.2. Đồng nhất thức Chu-Vandermonde
Với mọi số nguyên $m, n, k \ge 0$:
$$\sum_{i=0}^k \binom{m}{i} \binom{n}{k - i} = \binom{m + n}{k}$$

*Ý nghĩa tổ hợp:* Chọn $k$ người từ một hội đồng gồm $m$ nam và $n$ nữ. Ta có thể chọn $i$ nam và $k - i$ nữ, cho $i$ chạy từ $0$ đến $k$.

---

## 3. Hệ số Đa thức (Multinomial Coefficient)

Hệ số nhị thức $\binom{n}{k}$ chỉ phân chia tập hợp thành 2 nhóm: nhóm được chọn và nhóm không được chọn. Khi cần phân chia thành $m$ nhóm ($m \ge 3$), ta bước vào thế giới của **Hệ số Đa thức (Multinomial Coefficient)**.

### 3.1. Định nghĩa
Cho số nguyên dương $n$ và các số nguyên không âm $k_1, k_2, \dots, k_m$ thỏa mãn:
$$k_1 + k_2 + \dots + k_m = n$$

**Hệ số đa thức** được định nghĩa là:
$$\binom{n}{k_1, k_2, \dots, k_m} = \frac{n!}{k_1! \, k_2! \dots k_m!}$$

Khi $m = 2$, đặt $k_1 = k$ và $k_2 = n - k$, hệ số đa thức trở về đúng hệ số nhị thức quen thuộc:
$$\binom{n}{k, n - k} = \frac{n!}{k!(n - k)!} = \binom{n}{k}$$

### 3.2. Định lý Khai triển Đa thức (Multinomial Theorem)
Với mọi số thực $x_1, x_2, \dots, x_m$ và số nguyên dương $n$:
$$(x_1 + x_2 + \dots + x_m)^n = \sum_{\substack{k_1 + k_2 + \dots + k_m = n \\ k_i \ge 0}} \binom{n}{k_1, k_2, \dots, k_m} x_1^{k_1} x_2^{k_2} \dots x_m^{k_m}$$

*Số lượng số hạng trong khai triển:*
Chính bằng số nghiệm nguyên không âm của phương trình $k_1 + k_2 + \dots + k_m = n$ (Bài toán chia kẹo Euler):
$$\binom{n + m - 1}{m - 1}$$

### 3.3. Các ý nghĩa tổ hợp cốt lõi của Multinomial Coefficient
1. **Bài toán phân phối vào các hộp phân biệt:**
   Số cách phân phối $n$ đồ vật phân biệt vào $m$ hộp phân biệt sao cho hộp thứ $i$ chứa đúng $k_i$ đồ vật là:
   $$\binom{n}{k_1, k_2, \dots, k_m} = \frac{n!}{k_1! \, k_2! \dots k_m!}$$

2. **Phân tích thành tích liên tiếp các tổ hợp:**
   $$\binom{n}{k_1, k_2, \dots, k_m} = \binom{n}{k_1} \binom{n - k_1}{k_2} \binom{n - k_1 - k_2}{k_3} \dots \binom{k_m}{k_m}$$
   *(Chọn $k_1$ vật cho hộp 1 từ $n$ vật, sau đó chọn $k_2$ vật cho hộp 2 từ $n - k_1$ vật còn lại, v.v.).*

3. **Tính chất đối xứng toàn phần:**
   Hệ số đa thức không đổi khi hoán vị bất kỳ hai chỉ số $k_i$ và $k_j$.

4. **Hệ thức truy hồi Pascal tổng quát:**
   $$\binom{n}{k_1, k_2, \dots, k_m} = \sum_{i=1}^m \binom{n - 1}{k_1, \dots, k_i - 1, \dots, k_m}$$

---

## 4. Kỹ thuật tính toán trong Lập trình thi đấu (Modulo $10^9 + 7$)

Để tính hệ số đa thức $\binom{n}{k_1, \dots, k_m} \pmod{10^9 + 7}$:
1. Tiền xử lý mảng giai thừa `fact[n]` và nghịch đảo giai thừa `invFact[n]` trong $O(N)$.
2. Truy vấn tính toán trong thời gian $O(m)$:
   $$\binom{n}{k_1, \dots, k_m} \equiv fact[n] \cdot \prod_{i=1}^m invFact[k_i] \pmod{10^9 + 7}$$

```cpp
#include <bits/stdc++.h>
using namespace std;

const int MAXN = 1000000;
const int MOD = 1e9 + 7;

long long fact[MAXN + 1], invFact[MAXN + 1];

long long binpow(long long a, long long b) {
    long long res = 1; a %= MOD;
    while (b > 0) {
        if (b & 1) res = res * a % MOD;
        a = a * a % MOD;
        b >>= 1;
    }
    return res;
}

void precompute() {
    fact[0] = 1;
    for (int i = 1; i <= MAXN; i++) fact[i] = fact[i - 1] * i % MOD;
    invFact[MAXN] = binpow(fact[MAXN], MOD - 2);
    for (int i = MAXN - 1; i >= 0; i--) invFact[i] = invFact[i + 1] * (i + 1) % MOD;
}

// Tính Multinomial Coefficient trong O(m)
long long multinomial(int n, const vector<int>& k) {
    int sum = 0;
    for (int x : k) {
        if (x < 0) return 0;
        sum += x;
    }
    if (sum != n) return 0;

    long long res = fact[n];
    for (int x : k) {
        res = (res * invFact[x]) % MOD;
    }
    return res;
}
```
