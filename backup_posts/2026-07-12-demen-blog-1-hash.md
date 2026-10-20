---
title: 'DeMen Blog #1: "Bàn về Hash: Khi Hash không chỉ là so sánh hai xâu."'
description: "Một góc nhìn rộng hơn về Hash: từ XOR Hashing, tree hashing đến modulo hashing và xác suất va chạm."
pubDate: "2023-01-01"
categories: ["Competitive Programming"]
tags: ["Hash", "Math", "DeMen Blog"]
excerpt: "Một góc nhìn rộng hơn về Hash: từ XOR Hashing, tree hashing đến modulo hashing và xác suất va chạm."
author: "Võ Khắc Triệu (DeMen100ns)"
---

# DeMen Blog #1: "Bàn về Hash: Khi Hash không chỉ là so sánh hai xâu."

*Tác giả: Võ Khắc Triệu (DeMen100ns)*

~~Hash là một thuật toán để so sánh hai xâu trong O(1) với độ sai rất nhỏ~~. 
Không, Hash không phải như thế này.

## 0. Vậy rốt cuộc Hash là gì?

Wikipedia định nghĩa hàm băm (Hash function) như sau:
> A hash function is any function that can be used to map data of arbitrary size to fixed-size values.

Tạm dịch: Hàm băm (Hash function) là một [hàm ánh xạ](https://vi.wikipedia.org/wiki/%C3%81nh_x%E1%BA%A1), trong đó một giá trị sẽ được biểu diễn bằng một **giá trị hash** nằm trong một khoảng giá trị cố định.

![](https://upload.wikimedia.org/wikipedia/commons/a/a2/Hash_function_long.png)

*Ví dụ về hash function (Nguồn: Wikipedia)*

Mục đích của việc hash là để giảm chi phí hay độ phức tạp cho việc so sánh hai giá trị cụ thể nào đó. Tuy nhiên, có thể sẽ có một số cặp giá trị khác nhau có cùng giá trị hash giống nhau và chúng ta chấp nhận việc này như một **lỗi**, đồng thời cố gắng tạo ra hàm hash để giảm xác suất xảy ra lỗi.

Tính chất:
- Nếu hai biến có giá trị giống nhau thì sẽ có giá trị hash giống nhau.
- Nếu hai biến có giá trị hash giống nhau thì **khả năng cao** sẽ có giá trị giống nhau (Phụ thuộc vào hàm hash).

Với thuật toán dùng để so sánh 2 xâu giống nhau, tên đầy đủ của thuật toán là [**Rolling Hash**](https://vnoi.info/wiki/algo/string/hash.md#m%E1%BB%A5c-%C4%91%C3%ADch-b%C3%A0i-vi%E1%BA%BFt) với việc lấy số dư của các hàm đa thức cho một số $M$ lớn (thường là nguyên tố) để tính ra giá trị hash. 

Tuy nhiên, đây không phải là hàm hash duy nhất. Trên thực tế, có rất nhiều hàm hash khác nhau, mỗi hàm đều có một hoặc một vài ứng dụng khác nhau.

Trong bài viết này, chúng ta sẽ bàn về một số các hàm hash khác và các ứng dụng của nó.

## 1. XOR Hashing

### Ý tưởng

Trước khi đọc tiếp, các bạn có thể tìm hiểu về phép toán tử bitwise XOR tại [**đây**](https://en.wikipedia.org/wiki/Exclusive_or)

Ta tạo một hàm hash $H()$, với mỗi giá trị $x$ thì $H(x)$ tương ứng với một số $k-\text{bit}$ ngẫu nhiên (thường là $64-\text{bit}$ hoặc $128-\text{bit}$). 

Xét một tập $A$ gồm chứa $k$ phần tử. Ta gọi giá trị **Hash XOR** của tập $A$ hay $H_{XOR}(A)$ là tổng **XOR** của giá trị hash của các phần tử trong tập, hay:
$$H_{XOR}(A) = H(A_1) \oplus H(A_2) \oplus \dots \oplus H(A_k)$$

Thao tác **XOR** các giá trị hash của các phần tử trong một tập được gọi là **XOR Hashing.**

Ta sẽ xét một bài toán đơn giản để hiểu về cách XOR Hashing hoạt động.

### Bài toán

> Xét mảng $a$ gồm $n$ phần tử, trả lời $q$ truy vấn sau:
> - $l\ r$: Cho biết tất cả các giá trị từ $1$ đến $r - l + 1$ có xuất hiện trong đoạn $[l .. r]$ của mảng $a$ không?
> 
> Giới hạn: $1 \le n, q, a_i \le 10^6$

Ta thấy, trong bài toán này, thứ tự của các vị trí không quan trọng, chỉ có tập các giá trị của đoạn mới quan trọng. Như vậy, với mỗi truy vấn $l\ r$ ta sẽ kiểm tra xem tập $\{a_l, a_{l + 1}, \dots, a_r\}$ có giống với tập $\{1, 2, \dots, r - l + 1\}$ hay không.

### Lời giải

Giả sử $\{a_l, a_{l + 1}, \dots, a_r\}$ và $\{1, 2, \dots, r - l + 1\}$ là hai tập giống nhau. 
Khi này ta có:

$$H_{XOR}(\{a_l, a_{l + 1}, \dots, a_r\}) = H_{XOR}(\{1, 2, \dots, r - l + 1\})$$

$$\Leftrightarrow H(a_l) \oplus H(a_{l + 1}) \oplus \dots \oplus H(a_r) = H(1) \oplus H(2) \oplus \dots \oplus H(r - l + 1) (*)$$ 

Với $\oplus$ là phép bitwise **XOR**.

Khi này, ta chỉ cần kiểm tra điều kiện $(*)$ có thỏa hay không là được.

Ngạc nhiên thay, điều kiện nhìn tưởng chừng dễ sai này lại đúng một cách khó tin. 
Hãy cùng thử chứng minh lời giải này nhé. 

### Tính chất

Xét hai tập $A$ và $B$ độ dài $n$.
Vì XOR là một phép toán có tính chất giao hoán nên nếu $A$ và $B$ có cùng tập các phần tử thì:

$$H(A_1) \oplus H(A_2) \oplus \dots \oplus H(A_n) = H(B_1) \oplus H(B_2) \oplus \dots \oplus H(B_n)$$

$$\Leftrightarrow H_{XOR}(A) = H_{XOR}(B)$$

Với tính chất trên, ta thấy được nếu hai tập $A$ và $B$ có cùng tập giá trị thì giá trị **Hash XOR** của hai tập sẽ bằng nhau.

### Xác suất sai

Khi hai tập $A$ và $B$ khác nhau, ta chứng minh được xác suất trùng hash của hai tập sẽ là $\frac{1}{2^k}$, một xác suất rất bé khi $k$ đủ lớn. Thật vậy, ta chứng minh như sau:

Với mỗi bit giá trị, có $50\%$ khả năng bit đó sẽ là $0$ và $50\%$ bit đó sẽ là $1$. 
Tổng XOR của một dãy bit như vậy cũng sẽ có $50\%$ khả năng bit đó sẽ là $0$ và $50\%$ bit đó sẽ là $1$.

Trở lại bài toán, vì về phải của $(*)$ là một số $k-\text{bit}$ cố định và vế trái của $(*)$ là một số $k-\text{bit}$ ngẫu nhiên nên xác suất hai vế bằng nhau trong trường hợp tập $A$ và $B$ khác nhau sẽ là $50\%^k$ hay $\frac{1}{2^k}$.

### Cài đặt

```cpp
#include <bits/stdc++.h>

using namespace std;

const int N = 1e6 + 5;
const int MAXA = 1e6;

mt19937_64 rng(chrono::steady_clock::now().time_since_epoch().count());

long long a[N], HXOR[N];
long long pre[N], pre_a[N];

signed main(){
    ios_base::sync_with_stdio(0);
    cin.tie(0);

    int n, q; cin >> n >> q;
    for(int i = 1; i <= n; ++i){
        cin >> a[i];
    }

    for(int i = 1; i <= MAXA; ++i){
        HXOR[i] = rng();
    }

    for(int i = 1; i <= n; ++i){
        pre[i] = pre[i - 1] ^ HXOR[i];
        pre_a[i] = pre_a[i - 1] ^ HXOR[a[i]];
    }

    while (q--){
        int l, r; cin >> l >> r;
        if (pre[r - l + 1] == (pre_a[l - 1] ^ pre_a[r])){
            cout << "YES" << '\n';
        } else {
            cout << "NO" << '\n';
        }
    }
}
```

### Ứng dụng

Ưu điểm lớn nhất XOR Hashing là có thể tạo ra một khoảng giá trị hash rất lớn (thường tới $2^{64}$ hay $2^{128}$) và giá trị **Hash XOR** được rải đều nên khả năng sai là rất thấp và rất dễ cài đặt. 

XOR Hashing thường có hai ứng dụng chính:
- Kiểm tra các giá trị trong hai tập khác nhau có cùng số lần lặp lại $modulo\ 2$ hay không.
- Các bài toán liên quan đến phép bitwise XOR.

### Mở rộng
XOR Hashing thường sẽ gặp vấn đề khi giải các bài toán có các giá trị bị lặp lại do tính chất $a \oplus a = 0$. Mở rộng ra một chút, ta có thể dùng $k$$-$$nary$ XOR (phép XOR trên hệ cơ số $k$) để xử lý các bài toán với các giá trị bị lặp lại không quá $k - 1$ lần.

## 2. Sum Hashing

### Ý tưởng

Tương tự với XOR Hashing, ta tạo một hàm hash $H()$, với mỗi giá trị $x$ thì $H(x)$ tương ứng với một số ngẫu nhiên.

Xét tập $A$ gồm một số giá trị (có thể lặp lại). Ta gọi giá trị **Hash Sum** của tập $A$ hay $H_{SUM}(A)$ là tổng của giá trị hash của các phần tử trong tập, hay:
$$H_{SUM}(A) = \sum_{i \in A} H(i)$$

Thao tác cộng các giá trị hash của các phần tử trong một tập được gọi là **Sum Hashing.**

Ta cũng sẽ xét một bài toán đơn giản để hiểu về cách Sum Hashing hoạt động.

## Bài toán
> Xét mảng $a$ gồm $n$ phần tử, thực hiện $q$ truy vấn có dạng sau:
> - $l\ r\ k:$ Cho biết mỗi giá trị trong đoạn $l .. r$ của mảng $a$ có lặp lại số lần là bội số của $k$ hay không.
>
> Giới hạn: $1 \le n, q, a_i \le 10^6, 2 \le k \le n$.

### Lời giải

Với bài toán này thì XOR Hashing không phải một ý tưởng tốt vì tính lặp lại của giá trị và $k$ có thể rất lớn.

Tuy nhiên, ta có thể tận dụng tính chất sau:

### Tính chất
Nếu mỗi giá trị trong đoạn $l .. r$ của mảng $a$ có lặp lại số lần là bội số của $k$ thì 
$$H_{SUM}(\{a_l, a_{l + 1}, \dots, a_r\}) \equiv 0 \pmod k\ (**)$$

Như vậy, ta có thể sử dụng **Sum Hashing** để kiểm tra điều kiện $(**)$ có thỏa hay không.

### Xác suất sai
Dễ thấy xác suất sai đạt lớn nhất khi $k = 2$.

Giả sử tồn tại giá trị trong đoạn $l .. r$ của mảng $a$ lặp lại số lần không phải là bội số của $k$ thì xác suất để điều kiện $(**)$ thỏa là $\frac{1}{2}$. 

Xác suất sai lúc này còn khá lớn, tuy nhiên ta có thể tạo ra $t$ hàm hash khác nhau và kiểm tra điều kiện cho tất cả chúng. 

Xác suất sai khi sử dụng $t$ hàm hash khác nhau sẽ là $\frac{1}{2^t}$, với $t \ge 50$ sẽ đủ tốt.

### Cài đặt

```cpp
#include <bits/stdc++.h>

using namespace std;

const int N = 1e6 + 5;
const int MAXA = 1e6;

mt19937_64 rng(chrono::steady_clock::now().time_since_epoch().count());

long long a[N], H[51][N];
long long pre[51][N];

signed main()
{
    ios_base::sync_with_stdio(0);
    cin.tie(0);

    int n, q; cin >> n >> q;
    for(int i = 1; i <= n; ++i){
        cin >> a[i];
    }
    
    for(int t = 1; t <= 50; ++t){
        for(int i = 1; i <= MAXA; ++i){
            H[t][i] = rng() % (long long)(1e12);
        }
        for(int i = 1; i <= n; ++i){
            pre[t][i] = pre[t][i - 1] + H[t][a[i]]; 
        }
    }

    while (q--){
        int l, r, k; cin >> l >> r >> k;
        
        bool f = true;
        for(int t = 1; t <= 50; ++t){
            f &= ((pre[t][r] - pre[t][l - 1]) % k == 0);
        }

        if (f){
            cout << "YES" << '\n';
        } else{
            cout << "NO" << '\n';
        }
    }
}
```

### Ứng dụng
Hiển nhiên, với hai tập $A$ và $B$ giống nhau thì:
$$H_{SUM}(A) = H_{SUM}(B)$$

Ta có thể sử dụng tính chất này để so sánh hai tập mà không bị ràng buộc điều kiện như XOR Hashing. Tuy vậy, ta vẫn có thể kết hợp thêm XOR Hashing như một điều kiện phụ để giảm xác suất sai của thuật toán.

## 3. Modulo Hashing

### Ý tưởng

Xét một giá trị $A$ rất lớn nào đó. Ta có thể biểu diễn $A$ bằng số dư của nó khi chia cho một giá trị $M$ nào đó mà vẫn đảm bảo được các tính của giá trị gốc, hay:
$$H(A) \equiv A\ (mod\ M)$$

Xét bài toán sau:
### Bài toán
>Hãy cho biết $A = B$ hay không, biết rằng $A = p_1 \times p_2 \times \dots \times p_n$ và $B = q_1 \times q_2 \times \dots \times q_m$.
>
> Giới hạn: $1 \le n, m \le 10^5, 2 \le p_i, q_i \le 10^9$

### Lời giải

Trong bài toán này, việc tính trực tiếp $A, B$ sẽ tốn chi phí rất lớn và cài đặt rất khó do việc phải dùng Bignum.

Tuy nhiên, ta có thể sử dụng **Modulo Hashing**, trong đó, nếu $A = B$ thì:

$$H(A) = H(B)$$

$$\Leftrightarrow A \equiv B\ (mod\ M)$$

Ta có thể tính $H(A)$ và $H(B)$ một cách dễ dàng.

### Xác suất sai
Dễ thấy, nếu $A \neq B$ thì khả năng $H(A) = H(B)$ sẽ là $\frac{1}{M}$. 

Với $M$ đủ lớn $(M > 10^9)$ thì xác suất sai sẽ trở nên rất nhỏ.

### Cài đặt

```cpp
#include <bits/stdc++.h>

using namespace std;

const int MOD = 1e9 + 9;

signed main()
{
    ios_base::sync_with_stdio(0);
    cin.tie(0);
    
    int HA = 0, HB = 0;
    int n, m; cin >> n >> m;

    for(int i = 1; i <= n; ++i){
        int pi; cin >> pi;
        HA = (HA * 1LL * pi) % MOD;
    }

    for(int i = 1; i <= m; ++i){
        int qi; cin >> qi;
        HB = (HB * 1LL * qi) % MOD;
    }

    if (HA == HB){
        cout << "YES";
    } else {
        cout << "NO";
    }
}
```

### Ứng dụng

Ứng dụng chính của **Modulo Hashing** là việc so sánh bằng nhau giữa hai số rất lớn (có thể lên tới $10^{10^6}$ hoặc lớn hơn), với mỗi số được tính bằng một dãy các phép tính của các số nguyên nhỏ hơn (thường là $32-\text{bit}$ hoặc $64-\text{bit}$). Ví dụ điển hình của ứng dụng này chính [**Rolling Hash**](https://vnoi.info/wiki/algo/string/hash.md#m%E1%BB%A5c-%C4%91%C3%ADch-b%C3%A0i-vi%E1%BA%BFt).

### Chọn số mod phù hợp

- Số mod nên là số nguyên tố.
- Các bạn có thể kết hợp sử dụng nhiều số mod. 

Các bạn có thể xem thêm tại [**bài viết này**](http://rng-58.blogspot.com/2017/02/hashing-and-probability-of-collision.html) của **rng_58**.

## 4. Hash nhà làm

Tóm lại, bản chất của hash chính là một hàm ánh xạ. Với từng bài toán, các bạn có thể tự tạo ra hàm hash phù hợp để giải quyết bài toán đó. Hàm hash cần phải đảm bảo tính chất ánh xạ và có xác suất sai đủ thấp (chứng minh hoặc thực nghiệm). Ngoài ra ta có thể kết hợp nhiều hàm hash với nhau để giảm xác suất sai xuống.

## Bài tập
- [Toph - EP-Palindrome](https://toph.co/p/ep-palindromes)
- [Codeforces 1175F - The Number of Subpermutations](https://codeforces.com/problemset/problem/1175/F)
- [Codeforces 869E - The Untended Antiquity](https://codeforces.com/problemset/problem/869/E)
- [Codeforces 1418G - Three Occurrences](https://codeforces.com/problemset/problem/1418/G)
- [Codeforces 1622F - Quadratic Set](https://codeforces.com/contest/1622/problem/F)
- [Codeforces 1746F - Kazaee](https://codeforces.com/contest/1746/problem/F)
- [Meta Hacker Cup Round 2 - Problem A2](https://www.facebook.com/codingcompetitions/hacker-cup/2022/round-2/problems/A2)
- [Gym 101986F - Pizza Delivery](https://codeforces.com/gym/101986/problem/F)
- [CSES 1700 - Tree Isomorphism I](https://cses.fi/problemset/task/1700/)
- [CSES 1701 - Tree Isomorphism II](https://cses.fi/problemset/task/1701/)
- [CSES 1203 - Visiting Cities](https://cses.fi/problemset/task/1203)

## Tài liệu tham khảo
- [Hash - Wikipedia](https://vi.wikipedia.org/wiki/%C3%81nh_x%E1%BA%A1)
- [XOR Hashing - Codeforces](https://codeforces.com/blog/entry/85900)
- [Hashing and Probability of Collision - rng_58's Blog](http://rng-58.blogspot.com/2017/02/hashing-and-probability-of-collision.html)
