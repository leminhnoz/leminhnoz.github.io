---
title: "Số Catalan: Dãy số kỳ diệu thống trị thế giới Tổ hợp và Cấu trúc dữ liệu"
description: "Khám phá toàn diện dãy số Catalan (Catalan Numbers): từ bài toán dãy ngoặc đúng, đường đi trên lưới không vượt đường chéo, tam giác hóa đa giác, nguyên lý phản xạ gương André, đến cách tính trong O(1) modulo nguyên tố lớn."
pubDate: "2026-05-22"
tags: ["Math", "Combinatorics", "Algorithms", "C++", "Competitive Programming"]
categories: ["Algorithms"]
excerpt: "Dãy ngoặc đúng, cây nhị phân, tam giác hóa đa giác lồi, nối dây cung trên đường tròn... Tưởng chừng là những bài toán hoàn toàn độc lập, nhưng chúng đều chung một đáp số duy nhất: Dãy số Catalan! Hãy cùng vén màn vẻ đẹp kinh điển của dãy số huyền thoại này."
---

> *"Trong toán học tổ hợp, nếu có một dãy số có thể 'biến hình' xuất hiện trong hàng chục bài toán khác nhau đến mức làm người ta giật mình, thì sau dãy số Fibonacci, vị trí số 1 chắc chắn thuộc về **Dãy số Catalan**.*  
>  
> *Các phần tử đầu tiên của dãy số (bắt đầu từ $n = 0$):*  
> $$1, 1, 2, 5, 14, 42, 132, 429, 1430, 4862, \ldots$$  
>  
> *Được đặt tên theo nhà toán học người Bỉ Eugène Charles Catalan (dù Leonhard Euler đã biết đến nó trước đó cả thế kỷ), dãy số này là câu trả lời thần kỳ cho vô số câu đố đếm cấu trúc. Hãy cùng xem tại sao dãy số này lại quyến rũ đến vậy!"*

---

## 1. Bảy "hiện thân" kinh điển của Số Catalan

Điều kỳ diệu nhất của số Catalan $C_n$ là nó xuất hiện ở khắp mọi nơi. Dưới đây là những bài toán nổi tiếng nhất mà đáp án của chúng đều chính là $C_n$:

### 1. Dãy ngoặc đúng (Correct Bracket Sequences)
Có bao nhiêu dãy ngoặc hợp lệ gồm đúng $n$ dấu mở ngoặc `(` và $n$ dấu đóng ngoặc `)`?
- Với $n = 1$: `()` $\implies 1$ cách ($C_1 = 1$).
- Với $n = 2$: `()()`, `(())` $\implies 2$ cách ($C_2 = 2$).
- Với $n = 3$: `()()()`, `()(())`, `(())()`, `(()())`, `((()))` $\implies 5$ cách ($C_3 = 5$).

### 2. Đường đi trên lưới không vượt đường chéo (Dyck Paths)
Trên lưới tọa độ kích thước $n \times n$, bạn xuất phát từ điểm $(0, 0)$ và muốn đi đến điểm $(n, n)$. Ở mỗi bước, bạn chỉ được phép **đi sang phải $(+1, 0)$** hoặc **đi lên trên $(0, +1)$**.  
Hỏi có bao nhiêu đường đi **không bao giờ vượt lên trên đường chéo chính $y = x$**?  
Đáp án: Đúng bằng **$C_n$**!

### 3. Đặt dấu ngoặc cho phép nhân (Matrix Chain Parenthesization)
Có bao nhiêu cách đặt dấu ngoặc để thực hiện phép nhân một chuỗi gồm $n + 1$ phần tử $A_1 \times A_2 \times \dots \times A_{n+1}$?  
Đáp án: Đúng bằng **$C_n$**!

### 4. Số cây nhị phân đầy đủ (Full Binary Trees)
Có bao nhiêu cây nhị phân đầy đủ (mỗi nút hoặc có đúng 2 con, hoặc là nút lá) có đúng $n + 1$ nút lá (tương đương với $n$ nút trong)?  
Đáp án: Đúng bằng **$C_n$**!

### 5. Tam giác hóa đa giác lồi (Polygon Triangulation)
Có bao nhiêu cách kẻ các đường chéo không giao nhau để chia một đa giác lồi gồm $n + 2$ đỉnh thành các hình tam giác rời nhau?  
- Đa giác 3 cạnh (tam giác, $n = 1$): $C_1 = 1$ cách (chính nó).
- Đa giác 4 cạnh (tứ giác, $n = 2$): $C_2 = 2$ cách (kẻ đường chéo 1 hoặc 2).
- Đa giác 5 cạnh (ngũ giác, $n = 3$): $C_3 = 5$ cách.

### 6. Nối $2n$ điểm trên đường tròn bằng $n$ dây cung không cắt nhau
Cho $2n$ điểm phân biệt nằm trên một đường tròn. Có bao nhiêu cách ghép cặp chúng thành $n$ đoạn thẳng (dây cung) sao cho không có hai dây cung nào cắt nhau?  
Đáp án: Đúng bằng **$C_n$**!

### 7. Hoán vị có thể sắp xếp bằng Ngăn xếp (Stack-sortable Permutations)
Có bao nhiêu hoán vị của tập hợp $\{1, 2, \dots, n\}$ có thể được sắp xếp tăng dần thông qua một ngăn xếp (Stack)?  
Đáp án: Đúng bằng **$C_n$**!

---

## 2. Công thức truy hồi: Phân rã dãy ngoặc

Làm sao để tìm ra công thức tính $C_n$? Cách tự nhiên nhất là nhìn vào bài toán **Dãy ngoặc đúng**.

Xét một dãy ngoặc đúng độ dài $2n$.
- Dấu mở ngoặc đầu tiên ở vị trí số $1$ chắc chắn phải khớp với một dấu đóng ngoặc tương ứng duy nhất nào đó ở vị trí $2k + 2$.
- Khi đó, toàn bộ dãy ngoặc được phân rã một cách duy nhất thành dạng:
  $$(\; A \;) \; B$$
  Trong đó:
  - $A$ là một dãy ngoặc đúng gồm $k$ cặp ngoặc ($0 \le k \le n - 1$).
  - $B$ là một dãy ngoặc đúng gồm $n - 1 - k$ cặp ngoặc còn lại phía sau.

Vì $A$ và $B$ độc lập nhau:
- Số cách tạo thành dãy ngoặc $A$ là $C_k$.
- Số cách tạo thành dãy ngoặc $B$ là $C_{n - 1 - k}$.

Lấy tổng trên mọi khả năng của $k$ từ $0$ đến $n - 1$, ta thu được **Công thức truy hồi Catalan**:

$$C_0 = 1, \quad C_1 = 1$$
$$C_n = \sum_{k=0}^{n-1} C_k \cdot C_{n - 1 - k} \quad (\forall n \ge 2)$$

```cpp
// Tính bảng số Catalan bằng Quy hoạch động O(n^2)
const int MAXN = 1000;
const int MOD = 1e9 + 7;
long long C[MAXN + 1];

void precomputeCatalan(int n) {
    C[0] = C[1] = 1;
    for (int i = 2; i <= n; i++) {
        C[i] = 0;
        for (int k = 0; k < i; k++) {
            C[i] = (C[i] + C[k] * C[i - 1 - k]) % MOD;
        }
    }
}
```

---

## 3. Công thức giải tích: Tuyệt chiêu Phản xạ gương của André (Reflection Principle)

Công thức truy hồi $O(n^2)$ rất tốt, nhưng các nhà toán học muốn tìm một công thức giải tích trực tiếp tính $C_n$ trong $O(1)$.

Năm 1887, nhà toán học người Pháp Désiré André đã đưa ra một chứng minh hình học đẹp đến mức được coi là một trong những viên ngọc của toán học tổ hợp.

### Bước 1: Đếm tổng số đường đi không điều kiện
Mỗi đường đi từ $(0, 0)$ đến $(n, n)$ gồm đúng:
- $n$ bước đi sang phải $(R)$.
- $n$ bước đi lên trên $(U)$.
Tổng cộng có $2n$ bước. Số cách chọn ra $n$ bước đi lên trong tổng số $2n$ bước là:
$$\text{Total} = \binom{2n}{n}$$

### Bước 2: Đếm số đường đi "phạm luật" (vượt qua đường chéo)
Đường đi hợp lệ là đường đi luôn nằm ở nửa dưới: $y \le x$.  
Đường đi phạm luật là đường đi có ít nhất một lần **chạm vào đường thẳng nguy hiểm $y = x + 1$**.

Hãy gọi $P$ là **điểm đầu tiên** mà đường đi chạm vào đường thẳng $y = x + 1$:
- Từ $(0, 0)$ đến điểm $P$: Ta giữ nguyên đường đi.
- **Từ điểm $P$ đến đích $(n, n)$:** Ta thực hiện **phản xạ gương toàn bộ phần đường đi này qua đường thẳng $y = x + 1$**!
  - Mỗi bước đi sang phải $(+1, 0)$ bị lật thành bước đi lên $(0, +1)$.
  - Mỗi bước đi lên $(0, +1)$ bị lật thành bước đi sang phải $(+1, 0)$.

```text
Điểm kết thúc ban đầu: (n, n)
Phản xạ qua đường thẳng y = x + 1:
Tọa độ mới: (n - 1, n + 1)
```

> **Bổ đề song ánh tuyệt mỹ:**  
> Mọi đường đi phạm luật từ $(0, 0)$ đến $(n, n)$ đều tương ứng một-một (Song ánh - Bijection) với **một đường đi bất kỳ từ $(0, 0)$ đến điểm $(n - 1, n + 1)$**!

Số đường đi từ $(0, 0)$ đến $(n - 1, n + 1)$ gồm $2n$ bước, trong đó có $n - 1$ bước sang phải và $n + 1$ bước đi lên. Số cách chọn là:
$$\text{Bad} = \binom{2n}{n - 1}$$

### Bước 3: Lấy tổng trừ đi phần phạm luật
Số đường đi hợp lệ chính là:
$$C_n = \text{Total} - \text{Bad} = \binom{2n}{n} - \binom{2n}{n - 1}$$

Biến đổi đại số:
$$\begin{aligned}
C_n &= \frac{(2n)!}{n! \, n!} - \frac{(2n)!}{(n - 1)! \, (n + 1)!} \\
    &= \frac{(2n)!}{n! \, n!} \left( 1 - \frac{n}{n + 1} \right) \\
    &= \frac{1}{n + 1} \binom{2n}{n}
\end{aligned}$$

Một công thức giải tích gọn gàng đến kinh ngạc:

$$C_n = \frac{1}{n + 1} \binom{2n}{n} = \frac{(2n)!}{(n + 1)! \, n!}$$

---

## 4. Công thức liên hệ liên tiếp

Từ công thức $\frac{1}{n + 1} \binom{2n}{n}$, ta có thể suy ra hệ thức liên hệ giữa hai số Catalan liên tiếp:

$$C_n = \frac{4n - 2}{n + 1} \cdot C_{n - 1}$$

Công thức này cực kỳ lợi hại khi cần tính dãy số Catalan từ $1$ đến $N$ trong thời gian $O(N)$ mà không cần tính giai thừa của $2N$!

---

## 5. Cài đặt C++ trong Lập trình thi đấu

### Cách 1: Tính $C_n \pmod{10^9 + 7}$ trong $O(1)$ sau tiền xử lý giai thừa
Đây là cách phổ biến nhất khi có nhiều truy vấn ($Q = 10^5$):

```cpp
#include <iostream>

using namespace std;

const int MAXN = 2000005; // Cần giai thừa đến 2*N
const int MOD = 1e9 + 7;

long long fact[MAXN], invFact[MAXN];

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
    for (int i = 1; i < MAXN; i++)
        fact[i] = fact[i - 1] * i % MOD;

    invFact[MAXN - 1] = binpow(fact[MAXN - 1], MOD - 2);
    for (int i = MAXN - 2; i >= 0; i--)
        invFact[i] = invFact[i + 1] * (i + 1) % MOD;
}

long long nCr(int n, int k) {
    if (k < 0 || k > n) return 0;
    return fact[n] * invFact[k] % MOD * invFact[n - k] % MOD;
}

// Tính số Catalan C_n trong O(1)
long long getCatalan(int n) {
    return nCr(2 * n, n) * binpow(n + 1, MOD - 2) % MOD;
}
```

---

### Cách 2: Tính mảng số Catalan trong $O(N)$ không cần tính $2N!$
Áp dụng công thức $C_i = C_{i - 1} \times (4i - 2) \times (i + 1)^{-1} \pmod{MOD}$:

```cpp
const int MAXN = 1000000;
long long cat[MAXN + 1];
long long inv[MAXN + 2];

void computeCatalanArray(int n) {
    // Tiền xử lý nghịch đảo modulo các số nguyên từ 1 đến n + 1 trong O(n)
    inv[1] = 1;
    for (int i = 2; i <= n + 1; i++) {
        inv[i] = MOD - (MOD / i) * inv[MOD % i] % MOD;
    }

    cat[0] = 1;
    for (int i = 1; i <= n; i++) {
        cat[i] = cat[i - 1] * (4 * i - 2) % MOD * inv[i + 1] % MOD;
    }
}
```

---

## 6. Bài tập thực chiến đề xuất

1. **[SPOJ - SKYLINE (Skyline)](http://www.spoj.com/problems/SKYLINE/):** Bài toán kinh điển nhận diện số Catalan.
2. **[UVA 992 - Safe Salutations](https://onlinejudge.org/external/9/992.pdf):** Nối $2n$ người bắt tay nhau qua bàn tròn không cắt nhau.
3. **[Codeforces 9D - How many trees?](https://codeforces.com/problemset/problem/9/D):** Đếm số cây BST có độ cao tối thiểu $h$, kết hợp tư duy phân rã kiểu Catalan với quy hoạch động.
4. **[SPOJ - FUNPROB](http://www.spoj.com/problems/FUNPROB/):** Bài toán người mua vé không có tiền thối — mở rộng của nguyên lý phản xạ André!

---

## 7. Tổng kết

Số Catalan không chỉ là một công thức khô khan, mà là sự giao thoa kỳ ảo giữa hình học, đại số và cấu trúc dữ liệu. Chỉ cần nhớ:
1. **Dấu hiệu:** Mọi bài toán có cấu trúc phân rã đệ quy dạng $(A)B$ hoặc không được vượt ngưỡng (như số ngoặc mở luôn $\ge$ số ngoặc đóng) đều có mùi vị của Catalan.
2. **Công thức giải tích:** $C_n = \frac{1}{n + 1} \binom{2n}{n}$.
3. **Ý tưởng phản xạ:** Kỹ thuật lật qua đường $y = x + 1$ là một trong những đòn bẩy tư duy mạnh mẽ nhất trong giải tích tổ hợp.
