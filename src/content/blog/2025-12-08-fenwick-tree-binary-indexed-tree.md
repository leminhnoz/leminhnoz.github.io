---
title: "Fenwick Tree (BIT): Cấu trúc dữ liệu 10 dòng code thay đổi cuộc chơi"
description: "Khám phá cây Fenwick (Binary Indexed Tree - BIT) - cấu trúc dữ liệu tính tổng và cập nhật mảng trong O(log n) với mã nguồn siêu ngắn. Đi từ phép toán thần thánh i & (-i), xây dựng cây trong O(n) đến cập nhật đoạn Range Update và BIT 2D."
pubDate: "2025-12-08"
tags: ["Data Structures", "Algorithms", "C++", "Competitive Programming"]
categories: ["Algorithms"]
excerpt: "Segment Tree mất 60 dòng code, nhưng Fenwick Tree chỉ cần đúng 10 dòng với phép toán i & (-i) ma thuật! Hãy cùng vén màn bí mật của cấu trúc dữ liệu gọn gàng và tốc độ nhất làng thuật toán."
---

> *"Có bao giờ bạn rơi vào tình thế tiến thoái lưỡng nan này chưa?*  
> 1. *Nếu dùng mảng thông thường: Sửa 1 phần tử mất $O(1)$, nhưng tính tổng đoạn $[L, R]$ mất $O(N)$.*  
> 2. *Nếu dùng Mảng cộng dồn (Prefix Sum): Tính tổng đoạn $[L, R]$ mất $O(1)$, nhưng hễ sửa 1 phần tử là phải tính lại toàn bộ mảng cộng dồn mất $O(N)$!*  
>  
> *Một bên sửa nhanh tính chậm, một bên tính nhanh sửa chậm. Làm sao để CẢ HAI thao tác Cập nhật và Tính tổng đều chạy vùn vụt trong $O(\log N)$ mà code chỉ vẻn vẹn đúng 10 dòng?"*

Câu trả lời hoàn hảo cho bài toán này chính là **Fenwick Tree** (hay còn gọi là **Binary Indexed Tree - BIT**), được nhà khoa học máy tính Peter M. Fenwick công bố vào năm 1994.

Nếu Segment Tree là một cỗ xe tăng bọc thép hầm hố (mạnh mẽ nhưng cồng kềnh, tốn bộ nhớ gấp 4 lần và code dài 50-60 dòng), thì Fenwick Tree giống như một chiếc xe đua F1 siêu nhẹ: **Chỉ dùng đúng một mảng 1 chiều, bộ nhớ $O(N)$, chạy nhanh gấp 2-3 lần Segment Tree nhờ tận dụng tối đa CPU Cache, và code thì ngắn đến mức bạn có thể gõ thuộc lòng trong 1 phút!**

---

## 1. Trực giác: Mỗi vị trí chịu trách nhiệm một đoạn bao nhiêu?

Ý tưởng thiên tài của Fenwick Tree là: **Không để một phần tử phải gánh vác toàn bộ mảng (như Prefix Sum), cũng không để mỗi phần tử đứng cô độc một mình (như mảng thường). Mỗi vị trí sẽ quản lý một đoạn con có độ dài vừa phải!**

Nhưng độ dài "vừa phải" đó là bao nhiêu? Peter Fenwick đã nhìn vào hệ nhị phân của chỉ số $i$:

> **Độ dài đoạn mà vị trí $i$ quản lý đúng bằng giá trị của BIT 1 NHỎ NHẤT (Least Significant Bit - LSB) trong biểu diễn nhị phân của $i$.**

![Mô hình các đoạn quản lý trong Fenwick Tree](/images/fenwick-tree.png)

Ví dụ với chỉ số (1-based indexing):
- Số $1 = (0001)_2$: Bit 1 cuối cùng là $1 \implies$ Quản lý đoạn độ dài $1$: $[1, 1]$.
- Số $2 = (0010)_2$: Bit 1 cuối cùng là $2 \implies$ Quản lý đoạn độ dài $2$: $[1, 2]$.
- Số $3 = (0011)_2$: Bit 1 cuối cùng là $1 \implies$ Quản lý đoạn độ dài $1$: $[3, 3]$.
- Số $4 = (0100)_2$: Bit 1 cuối cùng là $4 \implies$ Quản lý đoạn độ dài $4$: $[1, 4]$.
- Số $6 = (0110)_2$: Bit 1 cuối cùng là $2 \implies$ Quản lý đoạn độ dài $2$: $[5, 6]$.
- Số $8 = (1000)_2$: Bit 1 cuối cùng là $8 \implies$ Quản lý đoạn độ dài $8$: $[1, 8]$.

*Quy luật thú vị:*
- Các vị trí **lẻ** luôn có bit 1 cuối cùng là $1$, nên chúng chỉ quản lý đúng chính nó.
- Các vị trí là **lũy thừa của 2** ($2, 4, 8, 16 \dots$) quản lý toàn bộ đoạn từ $1$ đến chính nó!

---

## 2. Phép toán ma thuật: `i & (-i)` là gì?

Làm sao để máy tính rút ra được bit 1 nhỏ nhất của một số nguyên $i$?  
Không cần vòng lặp, không cần đếm bit, câu trả lời nằm ở phép toán bitwise vi diệu:

```cpp
int lsb = i & (-i);
```

### Tại sao công thức này lại đúng?
Máy tính lưu số âm theo quy tắc **Bù 2 (Two's Complement)**: Để tạo ra $-i$, máy tính đảo toàn bộ các bit của $i$ rồi cộng thêm $1$:
- Giả sử $i = 12 = (1100)_2$.
- Đảo bit: $\sim i = (0011)_2$.
- Cộng thêm $1$: $-i = (0011)_2 + 1 = (0100)_2$.
- Khi lấy $i \ \& \ (-i)$:
  $$\begin{array}{r@{\quad}l}
  i  &= 1100_2 \\
  -i &= 0100_2 \\
  \hline
  i \ \& \ (-i) &= 0100_2 = 4
  \end{array}$$

Tất cả các bit bên trái bị triệt tiêu, chỉ còn lại **duy nhất bit 1 ở vị trí thấp nhất**!

---

## 3. Hai thao tác cốt lõi: Nhảy lùi để tính tổng, nhảy tiến để cập nhật

Fenwick Tree hoạt động mượt mà nhờ sự đối xứng tuyệt đẹp của hai thao tác:

### Thao tác 1: Tính tổng tiền tố từ $1$ đến $p$ (`sum(p)`)
Để tính tổng các số từ $1$ đến $p$, ta lấy giá trị tại `bit[p]`, sau đó **nhảy lùi** bằng cách bóc đi bit 1 nhỏ nhất:
$$p = p - (p \ \& \ (-p))$$

*Ví dụ tính tổng đến $7$:*
- $7 = (0111)_2$: Cộng `bit[7]` (quản lý $[7, 7]$), nhảy lùi: $7 - 1 = 6$.
- $6 = (0110)_2$: Cộng `bit[6]` (quản lý $[5, 6]$), nhảy lùi: $6 - 2 = 4$.
- $4 = (0100)_2$: Cộng `bit[4]` (quản lý $[1, 4]$), nhảy lùi: $4 - 4 = 0$ (Dừng lại!).

Tổng cộng: $[1, 4] + [5, 6] + [7, 7] = [1, 7]$ phủ kín trọn vẹn đoạn từ $1$ đến $7$ mà chỉ mất **đúng 3 bước nhảy**!

### Thao tác 2: Cộng thêm `val` vào vị trí $p$ (`add(p, val)`)
Khi giá trị tại $A[p]$ tăng thêm `val`, ta phải cập nhật tất cả các vị trí đang quản lý $p$. Ta làm ngược lại: **nhảy tiến** bằng cách cộng thêm bit 1 nhỏ nhất:
$$p = p + (p \ \& \ (-p))$$

---

## 4. Cài đặt C++ siêu tinh gọn (10 dòng code)

Dưới đây là phiên bản Fenwick Tree chuẩn mực (1-based indexing) mà bạn có thể dùng trong mọi kỳ thi:

```cpp
#include <vector>

struct FenwickTree {
    int n;
    std::vector<long long> bit;

    FenwickTree(int n) : n(n), bit(n + 1, 0) {}

    // Cộng thêm val vào vị trí idx (1-based)
    void add(int idx, long long val) {
        for (; idx <= n; idx += idx & -idx) {
            bit[idx] += val;
        }
    }

    // Tính tổng tiền tố từ 1 đến idx
    long long query(int idx) {
        long long sum = 0;
        for (; idx > 0; idx -= idx & -idx) {
            sum += bit[idx];
        }
        return sum;
    }

    // Tính tổng đoạn [L, R]
    long long query(int l, int r) {
        if (l > r) return 0;
        return query(r) - query(l - 1);
    }
};
```

---

## 5. Xây dựng cây trong thời gian tuyến tính $O(N)$

Thông thường, ta gọi $N$ lần hàm `add` để nạp dữ liệu ban đầu, mất $O(N \log N)$.  
Nhưng có một mẹo thông minh giúp khởi tạo Fenwick Tree trong **đúng $O(N)$**: Mỗi nút chỉ cần đẩy giá trị của nó sang cho **nút cha trực tiếp** của nó (`idx + (idx & -idx)`):

```cpp
FenwickTree(const std::vector<long long>& a) {
    n = a.size();
    bit.assign(n + 1, 0);
    for (int i = 1; i <= n; i++) {
        bit[i] += a[i - 1];
        int parent = i + (i & -i);
        if (parent <= n) {
            bit[parent] += bit[i]; // Đẩy tổng sang cha trực tiếp
        }
    }
}
```

---

## 6. Các biến thể "biến hóa khôn lường" của Fenwick Tree

Fenwick Tree không chỉ biết tính tổng điểm và cập nhật điểm. Nó có thể biến hóa linh hoạt sang các dạng bài toán khác:

### 1. Cộng trên đoạn, hỏi giá trị 1 điểm (Range Update, Point Query)
Nếu bài toán yêu cầu: Cộng thêm `x` vào tất cả các phần tử trong đoạn $[L, R]$, rồi hỏi giá trị tại vị trí $p$?
- Ta áp dụng kỹ thuật **Mảng hiệu (Difference Array)** trên BIT:
  - Khi cộng đoạn $[L, R]$ với `x`: Gọi `add(L, x)` và `add(R + 1, -x)`.
  - Khi hỏi giá trị tại điểm $p$: Đơn giản chỉ cần gọi `query(p)`!

### 2. Cộng trên đoạn, hỏi tổng trên đoạn (Range Update, Range Query)
Bằng cách dùng **hai cây BIT song song** ($B_1$ và $B_2$), ta có thể vừa cập nhật đoạn $[L, R]$ trong $O(\log N)$, vừa tính tổng đoạn $[L, R]$ trong $O(\log N)$ mà không cần đến Lazy Propagation phức tạp của Segment Tree!

```cpp
struct RangeUpdateRangeQueryBIT {
    FenwickTree b1, b2;
    RangeUpdateRangeQueryBIT(int n) : b1(n), b2(n) {}

    void range_add(int l, int r, long long x) {
        b1.add(l, x);
        b1.add(r + 1, -x);
        b2.add(l, x * (l - 1));
        b2.add(r + 1, -x * r);
    }

    long long prefix_sum(int idx) {
        return b1.query(idx) * idx - b2.query(idx);
    }

    long long range_sum(int l, int r) {
        return prefix_sum(r) - prefix_sum(l - 1);
    }
};
```

### 3. Fenwick Tree 2 chiều (2D BIT)
Cần quản lý bảng chữ nhật $N \times M$, cộng điểm và tính tổng hình chữ nhật con? Chỉ cần lồng 2 vòng lặp:
```cpp
void add2D(int x, int y, long long val) {
    for (int i = x; i <= n; i += i & -i)
        for (int j = y; j <= m; j += j & -j)
            bit[i][j] += val;
}
```

---

## 7. Bảng so sánh: Fenwick Tree vs Segment Tree

| Tiêu chí | Fenwick Tree (BIT) | Segment Tree |
| :--- | :--- | :--- |
| **Độ dài code** | **Cực ngắn (~15 dòng)** | Dài (~60–80 dòng) |
| **Bộ nhớ phụ** | **$1N$ (Đúng bằng kích thước mảng)** | $4N$ |
| **Tốc độ thực tế** | **Nhanh hơn 2–3 lần** (Ăn đứt về Cache Locality) | Chậm hơn do đệ quy và nhảy bộ nhớ |
| **Tính linh hoạt** | Rất mạnh cho phép toán có tính nghịch đảo ($+$, $-$, $\oplus$). Khó hỗ trợ Min/Max đoạn bất kỳ. | Vạn năng: Hỗ trợ mọi phép toán kết hợp (Min, Max, GCD, Matrix...). |

---

## 8. Bài tập thực hành có link trực tiếp

Luyện tập ngay những bài toán kinh điển dưới đây để làm chủ Fenwick Tree:

1. [CSES - Forest Queries II](https://cses.fi/problemset/task/1739/): Áp dụng BIT 2D giải bài toán truy vấn hình chữ nhật có cập nhật điểm.
2. [SPOJ - DQUERY](http://www.spoj.com/problems/DQUERY/): Đếm số lượng phần tử phân biệt trên đoạn bằng kỹ thuật Offline + Fenwick Tree.
3. [SPOJ - YODANESS](http://www.spoj.com/problems/YODANESS/): Đếm số cặp nghịch thế (Inversion Count) kinh điển bằng BIT.
4. [Codeforces 597C - Subsequences](http://codeforces.com/contest/597/problem/C): Quy hoạch động kết hợp Fenwick Tree đếm dãy con tăng độ dài $K$.

---

## Lời kết

Nếu một ngày nào đó trong phòng thi bạn gặp một bài toán cần cập nhật và tính tổng trên đoạn, hãy nhớ tới phép toán `i & (-i)` của Peter Fenwick. Đôi khi sự đơn giản, gọn gàng và tinh tế lại chính là đỉnh cao của vẻ đẹp thuật toán!
