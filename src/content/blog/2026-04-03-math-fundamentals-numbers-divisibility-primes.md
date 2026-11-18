---
title: "Số học nền tảng cho người bắt đầu: Từ Phép chia có dư đến Số nguyên tố và Sàng Eratosthenes"
description: "Hướng dẫn số học từ con số 0 dành cho người học lập trình: Tập số, quy tắc chia hết, tìm ƯCLN (GCD), sàng nguyên tố Eratosthenes và lũy thừa nhị phân — giải thích bình dân, dễ hiểu, kèm code C++."
pubDate: "2026-04-03"
tags: ["Toán học", "Số học", "Nhập môn", "GCD", "Số nguyên tố", "C++", "Competitive Programming"]
categories: ["Toán học Olympic"]
excerpt: "Đừng sợ toán! Bài viết này giải thích số học theo cách trực quan và đời thường nhất: từ quả táo chia đều, đến cách tìm ước chung lớn nhất chỉ bằng một vòng lặp siêu nhanh."
---

> *"Toán học trong lập trình thi đấu không đòi hỏi bạn phải là thiên tài bẩm sinh. Nó chỉ đòi hỏi bạn hiểu rõ bản chất từng bước chạy của con số."*

Nhiều bạn khi mới bắt đầu học thuật toán hay lập trình thi đấu (CP) thường bị "ngợp" trước hàng loạt công thức toán học phủ đầy ký hiệu Hy Lạp phức tạp. Nhưng thực ra, toàn bộ thế giới số học máy tính đều được xây dựng từ những khái niệm hết sức quen thuộc mà bạn đã gặp từ cấp 2.

Hãy cùng bẻ nhỏ từng khái niệm để hiểu bản chất một cách tự nhiên nhất nhé!

---

## 1. Số nguyên ($\mathbb{Z}$) và Số thực ($\mathbb{R}$) trong máy tính

Trong toán học:
- **Tập số nguyên $\mathbb{Z}$**: $\{\dots, -3, -2, -1, 0, 1, 2, 3, \dots\}$ — không có phần thập phân.
- **Tập số thực $\mathbb{R}$**: bao gồm cả số nguyên, phân số và các số vô tỉ như $\sqrt{2}, \pi$.

Trong lập trình C++:
- Kiểu số nguyên: `int` (tối đa $\approx 2 \cdot 10^9$) và `long long` (tối đa $\approx 9 \cdot 10^{18}$).
- Kiểu số thực: `double` (khoảng 15-17 chữ số chính xác).
- **Lưu ý sống còn:** Số thực trên máy tính luôn có sai số làm tròn (Floating-point error). Vì vậy, trong các bài toán đếm hoặc chia hết, ta **luôn luôn dùng số nguyên** để đảm bảo độ chính xác tuyệt đối $100\%$.

---

## 2. Phép chia có dư và Quan hệ chia hết

### 2.1. Bản chất trực quan
Tưởng tượng bạn có $14$ cái kẹo đem chia đều cho $4$ đứa trẻ:
- Mỗi đứa được $3$ cái.
- Còn thừa lại đúng $2$ cái kẹo (vì không đủ chia tiếp cho 4 đứa).

Toán học viết lại điều này thành:
$$14 = 4 \times 3 + 2$$
Tổng quát, với hai số nguyên bất kỳ $a$ và $b > 0$, luôn tồn tại duy nhất cặp số $(q, r)$ sao cho:
$$a = b \cdot q + r \quad \text{với} \quad 0 \le r < b$$
- $q = \lfloor a / b \rfloor$: thương số nguyên (trong C++ là phép toán `a / b`).
- $r = a \pmod b$: số dư (trong C++ là phép toán `a % b`).

### 2.2. Khi nào thì "chia hết"?
Khi phần dư $r = 0$, ta nói **$a$ chia hết cho $b$** (ký hiệu $b \mid a$). Lúc này $b$ là **ước** của $a$, còn $a$ là **bội** của $b$.

*Mẹo nhớ:*
- Bất kỳ số nguyên nào cũng chia hết cho $1$ và chính nó.
- Số $0$ chia hết cho mọi số nguyên khác $0$ (vì $0 = b \times 0 + 0$).

---

## 3. Số nguyên tố (Prime Numbers) — "Nguyên tử" của Toán học

### 3.1. Số nguyên tố là gì?
Một số nguyên $p > 1$ được gọi là **số nguyên tố** nếu nó chỉ có đúng 2 ước dương là $1$ và chính nó.  
*Ví dụ:* $2, 3, 5, 7, 11, 13, 17, 19, 23, \dots$  
Số $2$ là số nguyên tố chẵn duy nhất (và cũng là số nguyên tố nhỏ nhất).

Số lớn hơn $1$ mà không phải số nguyên tố thì được gọi là **hợp số** (composite number), vì nó được "hợp thành" từ tích các số nguyên tố nhỏ hơn.

### 3.2. Định lý cơ bản của Số học
Mọi số nguyên dương $n > 1$ đều phân tích được thành tích các thừa số nguyên tố một cách **duy nhất** (không kể thứ tự nhân):
$$n = p_1^{\alpha_1} \cdot p_2^{\alpha_2} \dots p_k^{\alpha_k}$$
*Ví dụ:* $360 = 2^3 \cdot 3^2 \cdot 5^1$.

### 3.3. Kiểm tra số nguyên tố trong $O(\sqrt{n})$
Để kiểm tra $n$ có nguyên tố không, ta không cần thử chia từ $2$ đến $n - 1$. Chỉ cần thử đến $\sqrt{n}$! Vì nếu $n$ có ước lớn hơn $\sqrt{n}$, ước còn lại bắt buộc phải nhỏ hơn $\sqrt{n}$.

```cpp
bool isPrime(long long n) {
    if (n < 2) return false;
    if (n == 2 || n == 3) return true;
    if (n % 2 == 0 || n % 3 == 0) return false;
    for (long long i = 5; i * i <= n; i += 6) {
        if (n % i == 0 || n % (i + 2) == 0) return false;
    }
    return true;
}
```

### 3.4. Sàng Eratosthenes — Tìm toàn bộ số nguyên tố $\le N$
Nếu cần tìm tất cả các số nguyên tố từ $1$ đến $N = 10^7$:
- Ban đầu coi mọi số đều là nguyên tố.
- Bắt đầu từ $i = 2$: đánh dấu tất cả các bội số của $2$ ($4, 6, 8, \dots$) là hợp số.
- Tiếp tục với $i = 3$: gạch các bội của $3$ ($9, 12, 15, \dots$).
- Cứ thế tiếp tục đến $\sqrt{N}$.

```cpp
const int MAXN = 10000000;
bool is_prime[MAXN + 1];

void sieve() {
    fill(is_prime, is_prime + MAXN + 1, true);
    is_prime[0] = is_prime[1] = false;
    for (int p = 2; p * p <= MAXN; p++) {
        if (is_prime[p]) {
            for (int i = p * p; i <= MAXN; i += p)
                is_prime[i] = false;
        }
    }
}
```
*Độ phức tạp:* $O(N \log \log N)$ — chạy trong chớp mắt chỉ $\approx 0.1$ giây cho $N = 10^7$!

---

## 4. Ước chung lớn nhất (GCD) & Thuật toán Euclid

### 4.1. Khái niệm
- **$\gcd(a, b)$**: Số nguyên dương lớn nhất vừa chia hết $a$, vừa chia hết $b$.
- **$\text{lcm}(a, b)$**: Bội chung nhỏ nhất.  
Mối liên hệ thần kỳ:
$$a \cdot b = \gcd(a, b) \cdot \text{lcm}(a, b) \implies \text{lcm}(a, b) = \frac{a \cdot b}{\gcd(a, b)}$$

### 4.2. Thuật toán Euclid — 1 dòng code giải quyết tất cả
Thay vì tìm ước của cả hai số rồi so sánh, nhà toán học Hy Lạp cổ đại Euclid đã phát hiện ra rằng:
$$\gcd(a, b) = \gcd(b, a \pmod b)$$
Ta cứ lấy phần dư liên tục cho đến khi số dư bằng $0$:

```cpp
long long gcd(long long a, long long b) {
    while (b != 0) {
        long long r = a % b;
        a = b;
        b = r;
    }
    return a;
}
```
*(Trong C++17 trở lên, bạn có thể gọi trực tiếp hàm có sẵn `std::gcd(a, b)` trong thư viện `<numeric>`!)*

---

## 5. Lũy thừa nhị phân (Binary Exponentiation)

Tính $a^b \pmod m$ với $b = 10^{18}$: nếu nhân $b$ lần vòng `for` sẽ chạy mất hàng triệu năm.
Ta nhận xét:
- Nếu $b$ chẵn: $a^b = (a^2)^{b / 2}$.
- Nếu $b$ lẻ: $a^b = a \cdot a^{b - 1}$.

Mỗi bước ta giảm $b$ đi một nửa, chỉ tốn khoảng $60$ phép nhân cho $b = 10^{18}$!

```cpp
long long power(long long a, long long b, long long mod) {
    long long res = 1;
    a %= mod;
    while (b > 0) {
        if (b & 1) res = (__int128)res * a % mod;
        a = (__int128)a * a % mod;
        b >>= 1;
    }
    return res;
}
```

Thấy không? Mọi thuật toán số học đỉnh cao đều bắt nguồn từ những phép toán chia có dư và nhân lũy thừa cực kỳ mạch lạc này!
