---
title: "Chuyên đề Số học & Tổ hợp: Nghịch đảo Modulo — Từ Euclid mở rộng đến Tiền xử lý Tổ hợp O(N)"
description: "Khảo sát toàn diện về Nghịch đảo Modulo (Modular Multiplicative Inverse): Thuật toán Euclid mở rộng, Định lý Fermat nhỏ, kỹ thuật tính nghịch đảo tuyến tính O(N) và ứng dụng tính tổ hợp C(n, k) trong O(1)."
pubDate: "2026-01-18"
tags: ["Toán học", "Số học", "Tổ hợp", "Olympic", "VMO", "Nghịch đảo modulo", "Number Theory", "Competitive Programming"]
categories: ["Toán học Olympic"]
excerpt: "Trong số học modulo, phép chia thông thường không tồn tại. Để thực hiện phép chia a / b mod m, ta bắt buộc phải tìm nghịch đảo modulo của b. Đây là cầu nối then chốt giữa Số học lý thuyết và Đại số tổ hợp thực hành."
---

> *"Trong vành Z/mZ, không có phép trừ — chỉ có cộng với số đối; không có phép chia — chỉ có nhân với phần tử nghịch đảo."*

Khi giải các bài toán đếm tổ hợp hoặc giải hệ phương trình đồng dư trong các kỳ thi học sinh giỏi (VMO, IMO) và lập trình thi đấu (ICPC, Codeforces), ta liên tục gặp các biểu thức phân số dạng $\frac{A}{B} \pmod M$. Để tính giá trị này, ta phải sử dụng **Nghịch đảo Modulo (Modular Multiplicative Inverse)**.

---

## 1. Định nghĩa và Điều kiện tồn tại

### 1.1. Định nghĩa
Cho hai số nguyên $a$ và $m > 1$. Một số nguyên $x$ được gọi là **nghịch đảo modulo $m$** của $a$ (ký hiệu $a^{-1}$ hoặc $a^\dagger \pmod m$) nếu:
$$a \cdot x \equiv 1 \pmod m$$

Nếu $x$ là một nghiệm thì $x + k \cdot m$ ($k \in \mathbb{Z}$) cũng là nghiệm. Thông thường ta chọn nghiệm duy nhất trong khoảng $[0, m - 1]$.

Khi tồn tại $x$, phép chia modulo được định nghĩa qua phép nhân:
$$\frac{b}{a} \equiv b \cdot a^{-1} \pmod m$$

### 1.2. Điều kiện tồn tại (Định lý then chốt)
Nghịch đảo modulo $m$ của $a$ **tồn tại khi và chỉ khi $a$ và $m$ nguyên tố cùng nhau**:
$$\gcd(a, m) = 1$$

*Chứng minh:*  
Đồng dư thức $a \cdot x \equiv 1 \pmod m$ tương đương với phương trình Diophantine tuyến tính:
$$a \cdot x - m \cdot y = 1$$
Theo Bổ đề Bézout, phương trình này có nghiệm nguyên $(x, y)$ khi và chỉ khi $\gcd(a, m) \mid 1$, tức là $\gcd(a, m) = 1$. $\blacksquare$

---

## 2. Các phương pháp tìm Nghịch đảo Modulo

### 2.1. Phương pháp 1: Thuật toán Euclid mở rộng (Extended Euclidean Algorithm)
Đây là phương pháp tổng quát nhất, áp dụng cho **mọi modulo $m$** (kể cả hợp số), miễn là $\gcd(a, m) = 1$.

Thuật toán Euclid mở rộng tìm cặp số nguyên $(x, y)$ thỏa mãn:
$$a \cdot x + m \cdot y = \gcd(a, m)$$
Khi $\gcd(a, m) = 1$, ta có $a \cdot x \equiv 1 \pmod m$. Do đó $a^{-1} = (x \pmod m + m) \pmod m$.

```cpp
// Thuật toán Euclid mở rộng tìm g = gcd(a, b) và nghiệm x, y
long long extgcd(long long a, long long b, long long &x, long long &y) {
    if (b == 0) {
        x = 1;
        y = 0;
        return a;
    }
    long long x1, y1;
    long long g = extgcd(b, a % b, x1, y1);
    x = y1;
    y = x1 - y1 * (a / b);
    return g;
}

long long modInverse(long long a, long long m) {
    long long x, y;
    long long g = extgcd(a, m, x, y);
    if (g != 1) return -1; // Không tồn tại nghịch đảo
    return (x % m + m) % m;
}
```
*Độ phức tạp:* $O(\log(\min(a, m)))$.

---

### 2.2. Phương pháp 2: Định lý Fermat nhỏ (Khi modulo $p$ là số nguyên tố)
Trong hầu hết các bài toán tổ hợp và lập trình thi đấu, modulo là một số nguyên tố lớn (ví dụ $p = 10^9 + 7$ hoặc $998244353$).

Theo Định lý Fermat nhỏ, nếu $\gcd(a, p) = 1$ thì:
$$a^{p - 1} \equiv 1 \pmod p$$
Tách một thừa số $a$:
$$a \cdot a^{p - 2} \equiv 1 \pmod p$$
Suy ra:
$$a^{-1} \equiv a^{p - 2} \pmod p$$

Ta tính $a^{p - 2} \pmod p$ bằng thuật toán Lũy thừa nhị phân (Binary Exponentiation) trong $O(\log p)$:

```cpp
long long binpow(long long a, long long b, long long mod) {
    long long res = 1;
    a %= mod;
    while (b > 0) {
        if (b & 1) res = (__int128)res * a % mod;
        a = (__int128)a * a % mod;
        b >>= 1;
    }
    return res;
}

long long modInversePrime(long long a, long long p) {
    return binpow(a, p - 2, p);
}
```

---

### 2.3. Phương pháp 3: Tính nghịch đảo tuyến tính cho mọi số $1 \le i \le n$ trong $O(n)$
Nếu cần tìm nghịch đảo modulo $p$ của **tất cả** các số từ $1$ đến $n$ với $p$ là số nguyên tố ($n < p$), việc tính từng số mất $O(n \log p)$ sẽ bị quá thời gian khi $n = 10^6$.

Ta có công thức thần kỳ sau đây để tính trong đúng **$O(n)$**:
$$inv[i] = \left(p - \left\lfloor \frac{p}{i} \right\rfloor\right) \cdot inv[p \pmod i] \pmod p$$

#### Chứng minh công thức:
Thực hiện phép chia Euclid cho $p$ và $i$:
$$p = k \cdot i + r \quad \text{với} \quad k = \lfloor p/i \rfloor, \, r = p \pmod i$$
Vì $p \equiv 0 \pmod p$, ta có:
$$k \cdot i + r \equiv 0 \pmod p \implies r \equiv -k \cdot i \pmod p$$
Nhân cả hai vế với $i^{-1} \cdot r^{-1}$:
$$r \cdot i^{-1} \cdot r^{-1} \equiv -k \cdot i \cdot i^{-1} \cdot r^{-1} \pmod p$$
$$i^{-1} \equiv -k \cdot r^{-1} \pmod p$$
Thay $k = \lfloor p/i \rfloor$ và $r = p \pmod i$:
$$i^{-1} \equiv -\lfloor p/i \rfloor \cdot (p \pmod i)^{-1} \pmod p$$
Vì $p \pmod i < i$, giá trị nghịch đảo của $p \pmod i$ đã được tính trước đó! Để kết quả luôn dương trong khoảng $[0, p - 1]$, ta cộng thêm $p$:
$$inv[i] = (p - \lfloor p/i \rfloor) \cdot inv[p \pmod i] \pmod p \quad \blacksquare$$

```cpp
vector<long long> precomputeInverses(int n, int p) {
    vector<long long> inv(n + 1);
    inv[1] = 1;
    for (int i = 2; i <= n; i++) {
        inv[i] = (long long)(p - p / i) * inv[p % i] % p;
    }
    return inv;
}
```

---

## 3. Ứng dụng tối thượng: Tính Tổ hợp $\binom{n}{k} \pmod p$ trong $O(1)$

Công thức tổ hợp là:
$$\binom{n}{k} = \frac{n!}{k!(n - k)!}$$

Ta tiền xử lý:
1. Mảng giai thừa: $fact[i] = fact[i - 1] \cdot i \pmod p$.
2. Tính $invFact[N] = (fact[N])^{p - 2} \pmod p$.
3. Đi lùi từ $N - 1$ về $0$ để tìm toàn bộ nghịch đảo giai thừa:
   $$invFact[i] = invFact[i + 1] \cdot (i + 1) \pmod p$$
   *(Vì $\frac{1}{i!} = \frac{1}{(i+1)!} \cdot (i + 1)$)*.

Khi đó mỗi truy vấn $\binom{n}{k} \pmod p$ chỉ mất đúng $O(1)$ phép tính:
$$\binom{n}{k} \equiv fact[n] \cdot invFact[k] \cdot invFact[n - k] \pmod p$$

Kỹ thuật này là vũ khí chuẩn mực không thể thiếu trong mọi bài toán đếm cấu hình, xác suất và nhị thức từ VMO đến ICPC.
