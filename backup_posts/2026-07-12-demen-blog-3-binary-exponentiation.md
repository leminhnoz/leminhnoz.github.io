---
title: 'DeMen Blog #3: Lũy thừa nhanh và hơn thế nữa!'
description: "Nhắc lại lũy thừa nhanh và mở rộng ý tưởng binary lifting sang các bài toán quy hoạch động và cấu trúc hàm."
pubDate: "2023-01-01"
categories: ["Competitive Programming"]
tags: ["DP", "Math", "DeMen Blog"]
excerpt: "Nhắc lại lũy thừa nhanh và mở rộng ý tưởng binary lifting sang các bài toán quy hoạch động và cấu trúc hàm."
author: "Võ Khắc Triệu (DeMen100ns)"
---

# DeMen Blog #3: Lũy thừa nhanh và hơn thế nữa!

**Tác giả: Võ Khắc Triệu (DeMen100ns)**

## Kiến thức cần biết

- [Lũy thừa nhanh](https://vnoi.info/wiki/translate/he/Number-Theory-3.md) (Bài viết sẽ nhắc lại cách tính lũy thừa nhanh)
- [Quy hoạch động](https://vnoi.info/wiki/algo/dp/basic-dynamic-programming-1.md)

## Đặt vấn đề

Xét bài toán sau:

## Bài toán

Tính: $(a^b)\ modulo\ m$ $(0 \le a < m \le 10^9, 0 \le b \le 10^{18})$

## Thuật toán ngây thơ

Đơn giản, ta sẽ vét cạn, khá dễ dàng nhưng cực kỳ chậm.

**Độ phức tạp:** $O(b)$.

**Code:**

```cpp
int ans = 1;
for(int i = 1; i <= b; ++i){
    ans = (ans * 1ll * a) % m; //nhớ chuyển thành long long để không bị tràn số.
}
cout << ans;
```

## Thuật toán lũy thừa nhanh 1 (Dùng chia để trị)

**Nhận xét:** 
- Với $n$ chẵn: $a^b = (a^{\lfloor \frac{b}{2} \rfloor})^2$
- Với $n$ lẻ: $a^b = (a^{\lfloor \frac{b}{2} \rfloor})^2 \times a$

Như vậy ta chỉ cần tính $a^b$ bằng $a^{\lfloor \frac{b}{2} \rfloor}$, và $b$ sẽ giảm một nửa liên tục cho đến khi còn $b = 1$ vì $a^1 = a$.
Dễ thấy $b$ chỉ giảm $\log_2{b}$ lần.

**Độ phức tạp:** $O(\log_2{b})$

**Code:**

```cpp
int f(int a, int b, int m){
    if (b == 0) return 1;
    if (b == 1) return a;
    
    int f2 = f(a, b / 2, m);
    int ans = (f2 * 1ll * f2) % m;
    if (b % 2 == 1){
        ans = (ans * 1ll * a) % m;
    }
    
    return ans;
}

int ans = f(a, b, m);
cout << ans;
```

## Thuật toán lũy thừa nhanh 2 (Dùng biểu diễn nhị phân)

**Nhận xét:** Ta có thể tính $a^1, a^2, a^4, a^8, \dots, a^{(2^k)}$ trong $O(k)$, vì: 
$a^{(2^k)} = (a^{(2^{k-1})})^2$. $(1)$

Ta cũng biết rằng, mỗi số tự nhiên $n$ có thể được phân tách dưới dạng: $2^{p_1} + 2^{p_2} + \dots + 2^{p_k} (p_1 < p_2 < \dots < p_k)$, với $k \le \log_2{n}$. Ta dễ dàng xác định các biến $p_i$ thông qua biểu diễn nhị phân của $n$.

Như vậy, ta có thể tính $a^b$ nhanh bằng cách tách $b$ thành các $p_i$ theo biểu diễn nhị phân như trên rồi nhân các $a^{p_i}$ vào với nhau. Các $a^{p_i}$ đã được tính ở bước $(1)$ trong $O(k)$.

**Ví dụ:** Tính $a^b$ với $b = 13$.
Xét biểu diễn nhị phân của $b = 13: 1101$.
$\rightarrow b = 13 = 2^3 + 2^2 + 2^0 = 8 + 4 + 1$.
$\rightarrow a^b = a^{13} = a^8 \times a^4 \times a^1$.

**Độ phức tạp:** $O(\log_2{b})$

```cpp
int ans = 1, pw = a;
for(int i = 0; i < 30; ++i){
    if (b >> i & 1){ //bit i cua b bat
        ans = (ans * 1ll * pw) % m;
    }
    pw = (pw * 1ll * pw) % m;
}
cout << ans;
```

## Mở rộng

Thực tế là, với mọi hàm $f$ thỏa: 
- $f(a + b) = f(a) \circ f(b)$, với $\circ$ là một phép toán tử bất kỳ nào đó.

Thì bạn luôn tính được $f(n)$ trong $O(T\log_2{n})$, với $O(T)$ là độ phức tạp của phép toán tử $\circ$.

Cụ thể, tương tự với lũy thừa nhanh, bạn có thể tính $f(n)$ bằng cách tính trước $f(1), f(2), f(4), \dots, f(2^k)$, rồi tính $f(n)$ bằng cách biểu diễn $n$ thành dạng nhị phân rồi gộp vào.

Thực tế, nếu ta coi $f(i) = a^i$ thì bài toán sẽ trở thành bài toán tính lũy thừa nhanh.

Có một số blog gọi đây là **x2 +1 trick**, thường dùng để tối ưu các hàm **quy hoạch động**.

## Áp dụng

**Bài:** [**Olympic Sinh Viên 2022 - Chuyên tin - Khôi phục dữ liệu**](https://oj.vnoi.info/problem/olp_ct22_restore)

**Tóm tắt:** Đếm số cách chọn ba xâu nhị phân $A, B, C$ độ dài $m$ thỏa:
- Có ít nhất một xâu có bit được bật.
- Tổng số bit bật của ba xâu chia hết cho $k$.
- Không tồn tại vị trí nào bật bit trên cả ba xâu.

In ra đáp án $modulo\ 10^9 + 7.$

**Limit:** $1 \le m \le 5 \times 10^8, 1 \le k \le 100$.

**Lời giải quy hoạch động:**

Gọi $dp_{i, j}$ là số cách chọn ba xâu nhị phân $A, B, C$ thỏa điều kiện và có tổng bit bật $mod\ k$ là $j$.
Ta dễ suy ra công thức truy hồi sau:
- $dp_{0, 0} = 1$
- $dp_{i, j} = dp_{i - 1, j} + 3 dp_{i - 1, (j - 1 + k)\ mod\ k} + 3dp_{i - 1, (j - 2 + k) \ mod\ k}$

Đáp án sẽ là $dp_{m, 0} - 1$ (vì ta cần loại trường hợp không có xâu nào có bit bật).

Cách này sẽ có độ phức tạp là $O(mk)$, đủ ăn subtask 2, nhưng chưa đủ nhanh để qua subtask cuối.

**Nhận xét:**
- Dễ tính được $dp_1$.
- $dp_{i, j} = \sum_{t = 0}^{k - 1} dp_{a, t} \times dp_{i - a, (j - t + k)\ mod\ k}$, đúng với mọi $a \in [0, i]$.

Vậy nếu ta coi $f(i) = dp_i$ và toán tử $f(a + b) = f(a) \circ f(b)$ là $\sum dp_{a, t} \times dp_{b, (j - t + k)\ mod\ k}$ với mọi $j \in [0, k)$ cần tính thì ta có thể làm bài này trong $O(k^2\log_2{m})$, với $k^2$ là độ phức tạp của toán tử.

Code:
```cpp
const int MOD = 1e9 + 7;
inline void add(int &x, int y, int mod = MOD) { x += y; while (x >= mod) x -= mod; while (x < 0) x += mod;}
inline void mul(int &x, int y, int mod = MOD) { x = (x * 1LL * y) % mod;}
inline int prod(int x, int y, int mod = MOD) { return mul(x, y, mod), x;}
inline int sum(int x, int y, int mod = MOD) { return add(x, y, mod), x;}
inline int bpow(int x, int y, int mod = MOD) { int ans = 1; while (y) { if (y & 1) mul(ans, x, mod); mul(x, x, mod); y >>= 1;} return ans;}
inline int Inv(int x, int mod = MOD) { return bpow(x, mod - 2, mod);}
inline int Div(int x, int y, int mod = MOD) { return prod(x, Inv(y, mod), mod);}

const int N = 2e5 + 5;
const long long INF = 1e18 + 7;
const int MAXA = 1e9;
const int B = sqrt(N) + 5;

int n, k;
int pw[32][101], dp[32][101];

void solve()
{
    int n, k; cin >> n >> k;

    pw[0][0]++; pw[0][1 % k] += 3; pw[0][2 % k] += 3;
    for(int i = 1; i < 32; ++i){
        for(int s1 = 0; s1 < k; ++s1){
            for(int s2 = 0; s2 < k; ++s2){
                add(pw[i][(s1 + s2) % k], prod(pw[i - 1][s1], pw[i - 1][s2])); 
                //pw[i] = f(2^i) = dp[2 ^ i][]
            }
        }
    }
    dp[0][0] = 1;
    for(int i = 0; i < 30; ++i){
        if (!(n >> i & 1)) {
            for(int s = 0; s < k; ++s) dp[i + 1][s] = dp[i][s];
            continue;
        }

        for(int s1 = 0; s1 < k; ++s1){
            for(int s2 = 0; s2 < k; ++s2){
                add(dp[i + 1][(s1 + s2) % k], prod(dp[i][s1], pw[i][s2]));
            }
        }
    }
    cout << sum(dp[30][0], -1);
}
```

Ngoài ra bài còn có một cách dùng nhân ma trận trong $O(k^3 \times log_2{n})$ (về bản chất thì nhân ma trận cũng dùng lũy thừa nhanh để tính $matrix^k$).

## Bài tập
- [CSES - Exponentiation](https://cses.fi/problemset/task/1095)
- [Hackerearth - Perfect Permutations, Subtask 4](https://www.hackerearth.com/problem/algorithm/perfect-permutations-september-clash/)
- [Codeforces - 1808E2](https://codeforces.com/contest/1808/problem/E2)
- [Codeforces - 1808E3](https://codeforces.com/contest/1808/problem/E3)
