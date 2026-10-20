---
title: 'DeMen Blog #2: Bài toán Knapsack và các biến thể (Phần 1)'
description: "Tổng hợp các cách tiếp cận cho bài toán Knapsack và biến thể truy vấn tổng dãy con, từ vét cạn, DP, bitset đến hàm sinh."
pubDate: "2023-01-01"
categories: ["Competitive Programming"]
tags: ["DP", "Math", "Bitwise", "Generating Function", "DeMen Blog"]
excerpt: "Tổng hợp các cách tiếp cận cho bài toán Knapsack và biến thể truy vấn tổng dãy con, từ vét cạn, DP, bitset đến hàm sinh."
author: "Võ Khắc Triệu (DeMen100ns)"
---

# DeMen Blog #2: Bài toán Knapsack và các biến thể (Phần 1)

**Tác giả: Võ Khắc Triệu (DeMen100ns)**

## Kiến thức cần biết

- [Quy hoạch động](https://vnoi.info/wiki/algo/dp/basic-dynamic-programming-1.md)
- [Các kiến thức cơ bản về bit](https://codeforces.com/blog/entry/73490)

## Đặt vấn đề

Bài toán cái túi là một bài toán cổ điển nhưng rất thú vị. Bài toán dành cho các bạn làm quen với kỹ thuật quay lui và kỹ thuật quy hoạch động. Tuy nhiên, với các bài toán khó hơn, hoặc các bài toán biến thể có giới hạn cao thì có thể sẽ là thử thách cho các bạn. 

Trong series **Bài toán Knapsack và các biến thể**, mình sẽ giới thiệu một số bài toán knapsack và các bài toán biến thể liên quan. Ở **phần 1**, chúng ta sẽ nói về bài toán sau:

## Bài toán

Xét mảng $a$ gồm $n$ số nguyên dương $\le M$, sao cho $\sum a_i = C$. 

**Yêu cầu:** Với mỗi $x = 1 \dots R$, cho biết tồn tại một dãy con (không nhất thiết liên tiếp) của mảng $a$ có tổng bằng $x$ hay không?

Để đơn giản hóa bài toán, ta sẽ mặc định $R \le C$.

## Bảng tóm tắt thuật toán


|Thuật toán | Độ phức tạp | Đếm | Ưu điểm |
| -------- | -------- | - | - |
| Vét cạn     | $O(2^n + R)$ hoặc $O(2^n \times n + R)$ | Có | Có thể giải được với giới hạn $a_i$ bất kỳ | 
| Quy hoạch động     | $O(n \times C)$ | Có | Có thể đếm được và code đơn giản |
| Quy hoạch động tối ưu 1     | $O(\frac{n \times C}{64})$ | Không | Nhanh và code đơn giản | 
| Quy hoạch động tối ưu 2      | $O(\frac{n \times \sqrt{C}}{64})$ | Không | Rất nhanh và giải được $n \le 10^6$
| Hàm sinh     | $O(n \times log(M)^2)$ | Có | Nhanh và có thể đếm được

**Note**: Cột **Đếm** có ý nghĩa, có thể chuyển bài toán thành đếm số dãy con có tổng $=i$.

## Thuật toán: Vét cạn

Ta có thể duyệt qua tất cả $2^n$ tập con của mảng $a$ để kiểm tra điều kiện. (Có thể dùng **quay lui** hoặc **sinh nhị phân**).

**Độ phức tạp**: $O(2^n + R)$ hoặc $O(2^n \times n + R)$.

**Code** $(O(2^n \times n + R))$: 
```cpp
bool exist[R + 1];
memset(exist, 0, sizeof exist);

for(int i = 0; i < (1 << n); ++i){
    int sum = 0;
    for(int j = 0; j < n; ++j){
        if (i >> j & 1) sum += a[j + 1]; //do mảng a là 1-based
    }
    if (sum <= R) exist[sum] = true;
}
for(int i = 0; i <= R; ++i) cout << exist[i];
```

## Thuật toán: Quy hoạch động

Ta sẽ dùng **quy hoạch động**.

Ta sẽ lưu $dp_{i, j}$ cho biết có trong $i$ phần tử đầu tiên của mảng $a$ có tồn tại dãy con có tổng bằng $j$ hay không.

**Chuyển đổi trạng thái**: Nếu $dp_{i - 1, j} = true$ thì $dp_{i, j} = dp_{i, j + a_{i}} = true$ $(1)$.

**Độ phức tạp**: $O(n \times C)$.

**Code**: 
```cpp
bool dp[n + 1][R + 1];
memset(dp, 0, sizeof dp);

dp[0][0] = true;
for(int i = 1; i <= n; ++i){
    for(int j = 0; j + a[i] <= R; ++j){
        dp[i][j] |= dp[i - 1][j];
        dp[i][j + a[i]] |= dp[i - 1][j];
    }
}
for(int i = 0; i <= R; ++i) cout << dp[n - 1][i];
```

## Thuật toán: Quy hoạch động tối ưu 1

Ta thấy rằng, có thể tối ưu bài toán này bằng cách dùng [**bitset**](https://codeforces.com/blog/entry/73558).

Cụ thể hơn, ta lưu mảng $dp_i$ là một cái bitset độ lớn $R + 1$ bit.

Lúc này, công thức $(1)$ sẽ trở thành:
- $dp_{i} = dp_{i - 1}\ OR\ (dp_{i - 1} \times 2^{a_i})$
- Code: `dp[i] = dp[i - 1] | (dp[i - 1] << a[i])`

**Chứng minh**: Bài tập cho độc giả.

**Lưu ý**: Khi cài đặt, để tiết kiếm bộ nhớ, ta có thể lưu duy nhất một bitset $dp$, lúc này, công thức chuyển đổi trở thành: `dp |= (dp << a[i])`

**Độ phức tạp**: $O(\frac{n \times C}{64})$.

**Code**: 
```cpp
bitset <R + 1> dp;

dp.set(0);
for(int i = 1; i <= n; ++i){
    dp |= (dp << a[i]);
}
for(int i = 0; i <= R; ++i) cout << dp[i];
```

## Thuật toán: Quy hoạch động tối ưu 2

Từ thuật toán **tối ưu 1**, ta vẫn có thể tiếp tục tối ưu.

Ta có nhận xét sau: Với giá trị $w$ xuất hiện $3$ lần, ta có thể thay bằng $1$ phần tử $w$ và $1$ phần tử $2w$ mà **không** làm thay đổi kết quả bài toán.

Ví du: Với dãy $a = \{1, 1, 1, 2, 2\}$, ta có thể thay đổi dãy $a = \{1, 2, 2, 2\}$ và có thể tiếp tục thay thành $a = \{1, 2, 4\}$. Cả $3$ dãy trên đều có thể chỉ tạo ra các tổng thuộc tập $\{0, 1, 2, 3, 4, 5, 6, 7\}$.

**Chứng minh**: Dãy $\{w, w, w\}$ và $\{w, 2w\}$ đều có thể chỉ tạo được các tổng $0, w, 2w, 3w$.

Từ nhận xét trên, ta thực hiện thuật toán như sau: Nếu tồn tại giá trị $w$ nào xuất hiện $\ge 3$ lần, ta sẽ thay $3$ lần xuất hiện của $w$ thành $w$ và $2w$. Thực hiện cho đến khi không còn giá trị nào xuất hiện quá $3$ lần.

Sau khi thực hiện thuật toán trên, chúng ta sẽ còn một mảng gồm $O(\sqrt{C})$ phần tử! 

**Chứng minh**: Mỗi giá trị xuất hiện không quá $2$ lần, gọi $N'$ là giá trị lớn nhất của $B$ sao cho:
- $2 \times (1 + 2 + \dots + B) \le C$
$\rightarrow B \times (B + 1) \le C$
$\rightarrow B \le \sqrt{C}$
$\rightarrow$ Cận trên độ dài của mảng sau khi thực hiện thuật toán là $2N'$.

Vì mảng mới này có tập subset sum tương đương với mảng cũ, ta thực hiện quy hoạch động trên mảng mới và lấy đáp án.

**Độ phức tạp**: $O(\frac{n \times \sqrt{C}}{64})$.

**Code**: 
```cpp
int cnt[R + 1];
bitset <R + 1> dp;

for(int i = 1; i <= n; ++i){
    if (a[i] <= R) cnt[a[i]]++;
}

dp.set(0);
for(int i = 0; i <= R; ++i){
    while (cnt[i] >= 3){
        cnt[i] -= 3;                  //xóa 3 lần xuất hiện của i trong tập
        cnt[i]++;                     //thêm 1 lần xuất hiện của i trong tập
        if (2 * i <= R) cnt[2 * i]++; //thêm 1 lần xuất hiện của 2i trong tập
    }
    while (cnt[i]--){
        dp |= (dp << i);
    }
}

for(int i = 0; i <= R; ++i) cout << dp[i];
```

## Thuật toán: Hàm sinh

Các bạn có thể dùng kiến thức về **hàm sinh** để giải bài toán này, mình đã đề cập trong blog **[giải đề tuyển sinh 10 Đà Nẵng 2023-24](https://hackmd.io/@3O5VztIaTn2OMO1i3Q78hw/rJK-Wipd2)**.

**Độ phức tạp**: $O(n \times log(a_i)^2)$.

## Bàn luận

Các bạn cần nắm được cách vét cạn và quy hoạch động cơ bản khi làm bài toán này, đối với các cách tối ưu sau, nếu các bạn học được thì sẽ có thể giúp các bạn làm một số bài khó (hoặc full đề **tuyển sinh 10**).

## Bài tập

- [CSES - Money Sums](https://cses.fi/problemset/task/1745)
- [Codeforces - 755F](https://codeforces.com/contest/755/problem/F)
- [Codeforces - 1856E2](https://codeforces.com/problemset/problem/1856/E2)
- [Bài 4 TS 10 ĐN 2023-24](https://lqdoj.edu.vn/problem/23ts10dna4) (Cần join [**link này**](https://lqdoj.edu.vn/contest/23ts10dna) trước)
