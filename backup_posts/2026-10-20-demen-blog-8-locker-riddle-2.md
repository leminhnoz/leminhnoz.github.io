---
title: "DeMen Blog #8: Lời giải bài K - ICPC miền Nam 2026"
description: "DeMen Blog #8"
pubDate: "2026-10-20"
categories: ["Competitive Programming"]
tags: ["DeMen Blog", "ICPC", "Generating Function", "Math"]
excerpt: "Locker Riddle 2"
author: "Võ Khắc Triệu (DeMen100ns)"
---

# DeMen Blog #8: Lời giải bài K - ICPC miền Nam 2026

**Tác giả:** Võ Khắc Triệu (*DeMen100ns*)

Hello ae, cũng được một thời gian rồi nhỉ. Dạo này học hành nhiều cũng hơi chán nên cũng muốn ngồi viết blog algo cho ae đọc xíu. Kỳ thi miền Nam vừa mới trôi quá với quả bộ đề khó kinh khủng, nên mình cũng muốn showcase ae lời giải của bài khó nhất đề (chắc thế?).

## Đề bài ([Locker Riddle 2](https://oj.vnoi.info/problem/icpc26_mn_k))

> Cho xâu nhị phân $A$ độ dài $n$. Mỗi bước, có xác suất $p_i / S$ là các bit là bội của $i$ sẽ được flip ($\sum p_i=S$, chỉ có một $i$ được chọn).
>
> Tính expected số bước để xâu nhị phân $A$ lần đầu tiên full $0$.

## Kiến thức cần biết
- Hàm sinh (Generating Function)


## Lời giải

### Biến đổi bài toán

Nếu các bạn đã đọc bài **[Locker Riddle 1](https://oj.vnoi.info/problem/icpc26_mn_f)** trong cùng đề, bạn sẽ nhận ra, sequence of operation (unordered) cần làm, nếu tối ưu độ dài, là duy nhất và độc lập.
$\rightarrow$ Tồn tại song ánh giữa xâu $A$ và min-length sequence of operation (unordered).

Từ đó, ta có thể biến đổi lại bài toán như sau:

> Cho xâu nhị phân $B$ độ dài $n$, Mỗi bước, có xác suất $p_i / S$ bit thứ $i$ sẽ được flip ($\sum p_i=S$, chỉ có một $i$ được chọn).
>
> Tính expected số bước để xâu nhị phân $B$ lần đầu tiên full $0$.
>
> Với các bit bật của $B$ hiện tại thuộc min-length sequence of operation  để biến $A$ thành full $0$.
>
> **Ví dụ:** $A = 101 \rightarrow B = 110$, do ta có thể thực hiện operation flip bội của 1 và bội của 2 để tắt hết các bit trên xâu nhị phân $A$.

### Generating Fun (tạo niềm vui)

Để dễ làm việc, ta sẽ gọi $r_i=p_i/S$.

Gọi $f_k$ là xác suất để xâu $B$ là full $0$ **lần đầu tiên** sau đúng $k$ bước. Vậy đáp án sẽ là $\sum k f_k$. Nhưng mà đáng tiếc $f_k$ không trivial để tính như vậy.

Giờ làm bài toán dễ hơn một chút nha. Gọi $h_k$ là xác suất để một xâu full $0$ vẫn là full $0$ sau đúng $k$ bước **(không nhất thiết phải là lần đầu).** Nếu đã học về hàm sinh, ta có thể dựng hàm sinh của $h_k$ là EGF $H(x)$:

$$
\begin{aligned}
H(x) &= \prod_{i=1}^n \left( \frac{(r_ix)^0}{0!} + \frac{(r_ix)^2}{2!} + \dots \right) \\
     &= \prod_{i=1}^n \frac{e^{r_ix} + e^{-r_ix}}{2}
\end{aligned}
$$

Tiếp theo, nâng cấp một chút, gọi $g_k$ là xác suất để xâu $B$ trở thành xâu full $0$ sau đúng $k$ bước **(không nhất thiết phải là lần đầu).** Thay đổi chỉ diễn ra nếu có bit của $B$ bật thì thay vì flip chẵn lần thì sẽ là lẻ lần, vì:

$$
\frac{(r_ix)^1}{1!} + \frac{(r_ix)^3}{3!} + \dots = \frac{e^{r_ix} - e^{-r_ix}}{2}
$$

Từ đó, ta có hàm sinh của $g_k$ là EGF $G(x)$:

$$
\begin{aligned}
G(x) &= \prod_{i=1}^n \frac{e^{r_ix} + (-1)^{B_i}e^{-r_ix}}{2}
\end{aligned}
$$

Với $B_i$ là $1$ nếu bit $i$ của $B$ bật, là $0$ nếu bit $i$ đang tắt.

### Nhưng còn $f_k$ thì sao?

Thật ra nếu bạn để ý, sự kiện mà $g_k$ biểu diễn sẽ xảy ra như sau:
- Trong $i\ (0 \le i \le k)$ bước đầu, xâu B sẽ trở thành xâu $0$ lần đầu tiên $(f_i)$
- Trong $k-i$ bước sau, xâu $0$ sẽ quay trở lại xâu $0$ $(h_{k-i})$.

Như vậy, $g_k=\sum_{i=0}^k f_i h_{k-i}$. Trông quen không? Nó chính là tích chập (convolution) trong OGF đấy!

Gọi $F_o(x), G_o(x), H_o(x)$ là **OGF** của $f, g, h$, ta có:

$$
G_o(x) = F_o(x)H_o(x) \rightarrow F_o(x) = \frac{G_o(x)}{H_o(x)}
$$

Quay lại với đáp án, ta biết đáp án cần tìm là $\sum k f_k$, nếu biến đổi lại, nó sẽ là $F_o'(1)$!! Vì ta biết $F_o=G_o/H_o$, ta có:

$$
F_o'(1) = \frac{G'_o(1)H_o(1) - H'_o(1)G_o(1)}{H_o(1)^2}
$$

Ok hay đấy, nma mình mới có $G(x)$ với $H(x)$ thôi mà?

### EGF -> OGF

Từ EGF sang OGF, thật ra chỉ cần nhân $j!$ trên hệ số của $x^j$ là được. Giờ ta thử làm với $G(x)$. Để $G(x)$ như vậy hơi khó mà lấy hệ số nên ta cần biến đổi lại một chút.

Ta có:

$$
\begin{aligned}
G(x) &= \prod_{i=1}^n \frac{e^{r_ix} + (-1)^{B_i}e^{-r_ix}}{2} \\
     &= \prod_{i=1}^n \frac{e^{\frac{p_i}{S}x} + (-1)^{B_i}e^{\frac{-p_i}{S}x}}{2} \\
     &= \prod_{i=1}^n \left( \frac{1}{2}e^{\frac{p_i}{S}x} + \frac{(-1)^{B_i}}{2} e^{\frac{-p_i}{S}x} \right) \\
\end{aligned}
$$

Nếu để ý, ta có thể biểu diễn $G(x)$ dưới dạng:

$$
\sum_{i=-S}^S a_i e^{\frac{ix}{S}}
$$

Với hệ số $a_i$ có thể được tính bằng DP (tự nghĩ công thức DP nhé ^^).

Ta có:

$$
e^{\frac{ix}{S}} = \sum_{j \ge 0} \left(\frac{i}{S}\right)^j \frac{x^j}{j!}
$$

Khi chuyển sang OGF (nhân $j!$ vào hệ số của $x^j$), $e^{\frac{ix}{S}}$ trở thành:

$$
\sum_{j \ge 0} \left(\frac{i}{S}\right)^j x^j = \frac{1}{1 - \frac{i}{S}x}
$$

Vậy:

$$
G_o(x) = \sum_{i=-S}^{S} \frac{a_i}{1 - \frac{i}{S}x}
$$

Tương tự, $H(x)$ chính là $G(x)$ với $B = 0$ (mọi $B_i = 0$), nên cũng biểu diễn được dưới dạng $\sum_{i=-S}^{S} b_i e^{\frac{ix}{S}}$ và

$$
H_o(x) = \sum_{i=-S}^{S} \frac{b_i}{1 - \frac{i}{S}x}
$$

### Edge case

Vấn đề còn lại là, khi consider tổng của $G_o(x)$ và $H_o(x)$ tại $x=1$ và $i=S$ thì sẽ xảy ra trường hợp chia cho $0$, nên ta phải khử đi bằng cách nhân cả hai cho $1-x$. Đặt:

$$
\tilde{G_o}(x) = (1-x)G_o(x) = a_S + \sum_{i \ne S} a_i \frac{1-x}{1 - \frac{i}{S}x}
$$

$$
\tilde{H_o}(x) = (1-x)H_o(x) = b_S + \sum_{i \ne S} b_i \frac{1-x}{1 - \frac{i}{S}x}
$$

Vậy giờ:

$$
F_o(x) = \frac{G_o(x)}{H_o(x)} = \frac{\tilde{G_o}(x)}{\tilde{H_o}(x)}
$$

$$
\rightarrow F_o'(1) = \frac{\tilde{G_o}'(1)\tilde{H_o}(1) - \tilde{H_o}'(1)\tilde{G_o}(1)}{\tilde{H_o}(1)^2}
$$

Ta có:

$$
\tilde{G_o}(1) = a_S + \sum_{i \ne S} a_i \frac{1-1}{1 - \frac{i}{S}} = a_S
$$

$$
\tilde{H_o}(1) = b_S + \sum_{i \ne S} b_i \frac{1-1}{1 - \frac{i}{S}} = b_S
$$

$$
\tilde{G_o}'(1) = \sum_{i \ne S} a_i \cdot \frac{\frac{i}{S} - 1}{\left(1 - \frac{i}{S}\right)^2} = -\sum_{i \ne S} \frac{S \cdot a_i}{S - i}
$$

$$
\tilde{H_o}'(1) = \sum_{i \ne S} b_i \cdot \frac{\frac{i}{S} - 1}{\left(1 - \frac{i}{S}\right)^2} = -\sum_{i \ne S} \frac{S \cdot b_i}{S - i}
$$

Vậy ta chỉ cần tính $a_i, b_i$ và thế số vào là có thể tính được $F_o'(1)$ trong $O(S)$.

## Conclusion:

Độ phức tạp là $O(n \log n + nS)$, chủ yếu do phải DP đoạn tính $a_i, b_i$.

Bài này còn một lời giải thuần xác suất nữa, cũng tương đối khó nghĩ (bài tập cho người đọc `<("))`

## Implementation

```cpp
/*
Author : DeMen100ns (Vo Khac Trieu)
School: National University of Singapore
Aim:
- International Grandmaster Codeforces (2600)
*/

#include <bits/stdc++.h>

using namespace std;

const long long INF = numeric_limits<long long>::max() / 2;
const int INF_int = 1e9 + 7;

const int mod = 998244353;

struct mint {
    int a;

    mint() : a(0) {}
    mint(long long x) : a(int(x % mod)) {
        if (a < 0) a += mod;
    }
    static mint raw(int x) {
        mint r;
        r.a = x;
        return r;
    }
    mint I() const { return raw(1); }
    mint operator-() const { return raw(a ? mod - a : 0); }

    friend mint operator+(mint x, mint y) {
        int s = x.a + y.a;
        return raw(s >= mod ? s - mod : s);
    }
    friend mint operator-(mint x, mint y) {
        int s = x.a - y.a;
        return raw(s < 0 ? s + mod : s);
    }
    friend mint operator*(mint x, mint y) {
        return raw(int(1ll * x.a * y.a % mod));
    }
    friend mint operator/(mint x, mint y) {
        return x * y.bpow(mod - 2);
    }

    mint &operator+=(mint t) { return *this = *this + t; }
    mint &operator-=(mint t) { return *this = *this - t; }
    mint &operator*=(mint t) { return *this = *this * t; }
    mint &operator/=(mint t) { return *this = *this / t; }

    friend bool operator==(mint x, mint y) { return x.a == y.a; }
    friend bool operator!=(mint x, mint y) { return x.a != y.a; }

    explicit operator int() const { return a; }

    mint bpow(long long n) const {
        mint r = raw(1), p = *this;
        for (; n; n >>= 1, p = p * p)
            if (n & 1) r = r * p;
        return r;
    }
    mint inv() const { return bpow(mod - 2); }
};

vector<mint> coefficients(const vector<int>& p, const vector<int>& B, int S) {
    const mint inv2 = mint::raw((mod + 1) / 2);

    vector<mint> dp(2 * S + 1);
    dp[S] = 1;
    int sum = 0;

    for (int i = 0; i < (int)p.size(); ++i) {
        vector<mint> next(2 * S + 1);

        for (int j = -sum; j <= sum; ++j) {
            mint value = dp[j + S] * inv2;

            next[j + p[i] + S] += value;
            next[j - p[i] + S] += B[i] ? -value : value;
        }

        sum += p[i];
        dp.swap(next);
    }

    return dp;
}

vector <int> transform(vector <int> A, int n){
    for (int i = 1; i <= n; ++i) {
        if (A[i - 1]) {
            for (int j = 2 * i; j <= n; j += i) {
                A[j - 1] ^= 1;
            }
        }
    }

    return A;
}

mint ans(const vector <mint> &a, const vector <mint> &b, int S){
    //Note that a_i = a[i - S]

    mint G1 = a[2 * S]; // G(1) = a_S
    mint H1 = b[2 * S]; // H(1) = b_S

    mint dG = 0, dH = 0; //G'(1) and H'(1)

    for (int j = -S; j < S; ++j) {
        mint factor = mint(S) / (S - j);

        dG -= a[j + S] * factor;
        dH -= b[j + S] * factor;
    }

    mint answer = (dG * H1 - dH * G1) / (H1 * H1);
    return answer;
}

void solve() {
    int n, S;
    cin >> n >> S;

    vector<int> A(n), p(n), B;
    for (int& x : A) cin >> x;
    for (int& x : p) cin >> x;

    B = transform(A, n);

    vector<mint> a = coefficients(p, B, S);
    vector<mint> b = coefficients(p, vector<int>(n, 0), S);

    cout << (int)ans(a, b, S) << '\n';
}

signed main(){
    ios_base::sync_with_stdio(0); cin.tie(0);

    int t = 1; cin >> t;
    for(int test = 1; test <= t; ++test){
        solve();
    }
}
```
