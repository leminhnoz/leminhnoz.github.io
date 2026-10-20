---
title: 'DeMen Blog #7 - Trick: Baby step, giant step trên mảng hằng'
description: "Một trick chia mốc kiểu baby step, giant step để tăng tốc các hàm có thể tiền xử lý nhiều giá trị, minh họa qua bài toán tính n! modulo."
pubDate: "2023-01-01"
categories: ["Competitive Programming"]
tags: ["DeMen Blog", "Trick", "Baby Step Giant Step", "Math"]
excerpt: "Một trick chia mốc kiểu baby step, giant step để tăng tốc các hàm có thể tiền xử lý nhiều giá trị, minh họa qua bài toán tính n! modulo."
author: "Võ Khắc Triệu (DeMen100ns)"
---

# DeMen Blog #7 - Trick: Baby step, giant step trên mảng hằng

**Tác giả: Võ Khắc Triệu (DeMen100ns)**

## Đặt vấn đề

Xét bài toán:

> Nhập $n$ $(0 \le n < 10^9 + 7)$. Tính $n!$ $(mod\ 10^9+7)$.

Lời giải hiển nhiên ai cũng nghĩ ra chạy trong $O(n)$. Tuy nhiên, $n$ trong trường hợp này khá lớn và phép modulo tương đối chậm ($O(1)$ nhưng const to) nên rất dễ bị quá thời gian.

## Trick

Mình thử code $O(n)$ và chạy trên máy với input $10^9$ thì mất tầm $5$ giây. Rõ ràng là ta có thể sinh ra đáp án với mọi input có thể có, vậy ta sẽ dùng thông tin này một cách hữu ích.

### Mảng hằng độ dài $10^9$

Ý tưởng rất đơn giản: Dùng code để in ra đáp án cho tất cả các input, rồi lưu vào code bằng mảng hằng, sau đó ta chỉ cần trả lời trong $O(1)$. Code minh họa:

```cpp
#include <bits/stdc++.h>

using namespace std;

const int N = 1e9 + 1;
const int MOD = 1e9 + 7;
int fact[N] = {1, 1, 2, 6, 24, ...};

int main(){
    int n; cin >> n;
    cout << fact[n];
    
    return 0;
}

```

Tuy nhiên, lượng dữ liệu này là quá lớn, chưa nói đến tràn bộ nhớ (**Memory Limit Exceeded**) thì bạn có thể đã bị **Char/File Limit Exceeded** (vượt quá số ký tự cho phép trong code, thường là $32/64\ KB$).

Như vậy ta thấy, nếu dùng quá nhiều dữ liệu thì bị tràn bộ nhớ hoặc tràn ký tự, nhưng quá ít thì lại không đủ nhanh, thế thì ta sẽ chọn  **ở giữa**.

### Mảng hằng độ dài $B$

Ta đã biết: $n! = (n-1)! \times n$.

Như vậy, nếu ta biết $L!$ thì sẽ tính được $R!$ trong $O(R - L)$. Từ đây, ta có thể chọn ra các điểm cắt để tính toán nhanh hơn.

Gọi $M = \frac{10^9}{B}$. Ta sẽ lưu mảng hằng $F$ độ dài $B$, với $F_i = (iM)!\ (0 \le i < B)$. 

Lúc này, ta sẽ tính được $n!$ bằng cách sau:
Tìm $j$ lớn nhất sao cho $jM \le n$. Giờ ta chỉ cần tính:
$$jM! \times (jM + 1) \times \dots \times n$$

Trong đó: 
- Ta đã tính trước $jM!$ và có thể lấy ra nó trong $O(1)$.
- Ta tính $(jM + 1) \times \dots \times n$ trong $O(M)$.

$\rightarrow$ Độ phức tạp là $O(M)$.

Nếu ta chọn $B = 10^3$ và $M = 10^6$ thì ta chỉ cần khoảng $9000B = 9KB$ để lưu. 

## Vận dụng

Với bất kỳ hàm nào mà có thể tính được $N$ giá trị đầu tiên trong một khoảng thời gian hợp lý thì thuật toán này đều tỏ ra hiệu quả (Hàm đếm số nguyên tố, $\binom{n}{k}$, ...).

## Bài tập
- [VOI 22 Bài 6 - Xây dựng ma trận](https://oj.vnoi.info/problem/voi22_matrix)
- [Hệ số nhị thức
](https://lqdoj.edu.vn/problem/binomialcoefficient)
