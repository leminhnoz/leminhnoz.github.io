---
title: "Tìm Hạng Của Ma Trận (Matrix Rank) Bằng Khử Gauss & Ứng Dụng XOR Basis"
description: "Khám phá bản chất hạng của ma trận (Matrix Rank) và thuật toán tìm hạng bằng phương pháp khử Gauss O(N^3). Mở rộng sang định lý Rouché-Capelli phân loại nghiệm hệ phương trình và vũ khí Cơ sở tuyến tính XOR (XOR Basis) trong Competitive Programming."
pubDate: "2026-10-21"
tags: ["Math", "Linear Algebra", "Matrix Rank", "Gaussian Elimination", "Bitset", "XOR Basis", "Algorithms", "Competitive Programming", "C++"]
categories: ["Algorithms"]
excerpt: "Hạng của ma trận (Matrix Rank) là thước đo tối thượng về lượng thông tin độc lập tuyến tính trong không gian đa chiều. Khám phá cách tìm hạng bằng khử Gauss trong O(N^3) và bí quyết ứng dụng sang Cơ sở tuyến tính XOR (XOR Basis) thống trị các bài toán truy vấn tập con!"
---

> *"Trong một ma trận khổng lồ chứa hàng trăm phương trình hay hàng ngàn dữ liệu đo đạc, có bao nhiêu hàng thực sự cung cấp thông tin mới, và có bao nhiêu hàng chỉ là 'bản sao thừa thãi' được sinh ra từ việc cộng trừ nhân chia các hàng khác?  
>  
> Câu trả lời nằm ở một đại lượng cốt lõi của đại số tuyến tính: **Hạng của ma trận (Matrix Rank)**. Không chỉ đóng vai trò xương sống trong việc phân loại nghiệm hệ phương trình qua định lý Rouché-Capelli, khái niệm hạng ma trận trên trường nhị phân $\mathbb{Z}_2$ còn chính là cội nguồn của **Cơ sở tuyến tính XOR (XOR Basis / Linear Basis)** — một trong những chủ đề thú vị và xuất hiện thường xuyên nhất trong các kỳ thi Competitive Programming đỉnh cao!"*

---

## 1. Trực giác: Hạng của Ma trận (Matrix Rank) là gì?

Cho một ma trận chữ nhật $A$ kích thước $N \times M$ ($N$ hàng, $M$ cột).

> **Định nghĩa 1 (Độc lập tuyến tính):**  
> **Hạng của ma trận $A$**, ký hiệu là $\text{rank}(A)$, là **số lượng lớn nhất các hàng (hoặc cột) độc lập tuyến tính** có trong ma trận đó.

Nói một cách nôm na: Nếu có một hàng nào đó có thể biểu diễn thành một tổ hợp tuyến tính của các hàng khác (ví dụ: $\text{row}_3 = 2 \times \text{row}_1 - \text{row}_2$), thì hàng đó là "thừa thãi" và không đóng góp gì vào việc tăng hạng của ma trận.

> **Định nghĩa 2 (Định thức con - Minor):**  
> Hạng của ma trận $A$ bằng **cấp lớn nhất của một định thức con (minor) khác $0$** trích xuất từ ma trận $A$.

### Các tính chất nền tảng của Hạng:
1. **Hạng theo hàng luôn bằng hạng theo cột:**  
   $$\text{row rank}(A) = \text{column rank}(A) = \text{rank}(A)$$
   Dù ma trận có $1000$ hàng và chỉ có $3$ cột, thì số hàng độc lập tuyến tính tối đa cũng chỉ là $3$!
2. **Chặn trên kích thước:**  
   $$\text{rank}(A) \le \min(N, M)$$
3. **Đối với ma trận vuông $N \times N$:**  
   - Ma trận có **đầy đủ hạng (Full Rank)** khi $\text{rank}(A) = N$.
   - Điều này tương đương với: $\det(A) \ne 0 \iff$ Ma trận khả nghịch ($A^{-1}$ tồn tại).
   - Nếu $\det(A) = 0$, ma trận bị suy biến và $\text{rank}(A) < N$.

---

## 2. Thuật toán tìm Hạng bằng Khử Gauss

Nguyên lý cốt lõi: **Các phép biến đổi sơ cấp trên dòng không làm thay đổi không gian sinh của các vector dòng**, do đó nó **bảo toàn hoàn toàn hạng của ma trận**!

Khi ta dùng phương pháp khử Gauss để đưa ma trận $A$ về **Dạng bậc thang (Row Echelon Form - REF)**:
- Tất cả các hàng phụ thuộc tuyến tính (thừa thãi) sẽ bị triệt tiêu thành các hàng toàn số $0$.
- Các hàng còn lại có phần tử trụ khác $0$ chính là các vector độc lập tuyến tính.

> **Kết luận:** **Hạng của ma trận đúng bằng số lượng phần tử trụ (Pivots) tìm được, hay chính là số lượng hàng khác $0$ trong dạng bậc thang!**

### Các bước thuật toán:
1. Khởi tạo `rank = 0`, mảng đánh dấu `row_selected` gồm $N$ phần tử `false`.
2. Duyệt qua từng cột $col$ từ $0$ đến $M - 1$:
   - Tìm một hàng $row$ chưa được chọn (`!row_selected[row]`) có $|A_{row, col}| > \text{EPS}$.
   - Nếu không tìm thấy hàng nào: Cột này phụ thuộc tuyến tính vào các cột trước, ta bỏ qua và tiếp tục xét cột tiếp theo.
   - Nếu tìm thấy hàng $row$:
     - Tăng `rank++`.
     - Đánh dấu `row_selected[row] = true`.
     - Chuẩn hóa hàng $row$ (chia cho phần tử trụ $A_{row, col}$).
     - Khử toàn bộ các hàng khác $k \ne row$ để cột $col$ tại các hàng đó trở về $0$:
       $$A_{k, p} \leftarrow A_{k, p} - A_{k, col} \cdot A_{row, p} \quad (\forall p > col)$$
3. Sau khi duyệt hết tất cả các cột, giá trị `rank` chính là hạng của ma trận!

- **Độ phức tạp thời gian:** $O(N \cdot M \cdot \min(N, M))$ (hay $O(N^3)$ với ma trận vuông).
- **Bộ nhớ phụ:** $O(N)$ cho mảng đánh dấu.

---

## 3. Cài đặt C++ số thực chuẩn mực

```cpp
#include <iostream>
#include <vector>
#include <cmath>
#include <algorithm>

using namespace std;

const double EPS = 1e-9;

// Tính hạng của ma trận A kích thước N x M
int compute_rank(vector<vector<double>> a) {
    int n = a.size();
    int m = a[0].size();
    int rank = 0;
    vector<bool> row_selected(n, false);

    for (int col = 0; col < m; ++col) {
        // Tìm hàng chưa chọn có phần tử khác 0 tại cột col
        int pivot_row = -1;
        for (int row = 0; row < n; ++row) {
            if (!row_selected[row] && abs(a[row][col]) > EPS) {
                pivot_row = row;
                break;
            }
        }

        // Nếu tìm thấy phần tử trụ
        if (pivot_row != -1) {
            ++rank;
            row_selected[pivot_row] = true;

            // Chuẩn hóa dòng pivot
            double pivot_val = a[pivot_row][col];
            for (int p = col; p < m; ++p) {
                a[pivot_row][p] /= pivot_val;
            }

            // Khử các dòng khác về 0 trên cột col
            for (int row = 0; row < n; ++row) {
                if (row != pivot_row && abs(a[row][col]) > EPS) {
                    double factor = a[row][col];
                    for (int p = col; p < m; ++p) {
                        a[row][p] -= factor * a[pivot_row][p];
                    }
                }
            }
        }
    }

    return rank;
}
```

---

## 4. Ứng dụng 1: Định lý Rouché–Capelli phân loại nghiệm hệ $Ax = b$

Xét hệ phương trình đại số tuyến tính $A x = b$ với $n$ phương trình và $m$ ẩn số:
- Gọi $[A \mid b]$ là ma trận mở rộng kích thước $n \times (m + 1)$.

Định lý kinh điển **Rouché–Capelli** phân loại chính xác số nghiệm của hệ phương trình chỉ dựa trên việc so sánh hai hạng:

1. **Hệ vô nghiệm (Inconsistent):**
   $$\text{rank}(A) < \text{rank}([A \mid b])$$
   *(Điều này xảy ra khi có một hàng biến đổi về dạng $[0, 0, \dots, 0 \mid c]$ với $c \ne 0$)*.
2. **Hệ có nghiệm duy nhất (Unique Solution):**
   $$\text{rank}(A) = \text{rank}([A \mid b]) = m$$
   *(Hạng bằng đúng số ẩn số $m$)*.
3. **Hệ có vô số nghiệm (Infinite Solutions):**
   $$\text{rank}(A) = \text{rank}([A \mid b]) = k < m$$
   *(Hệ có $m - k$ biến tự do (bậc tự do). Mọi nghiệm được biểu diễn dưới dạng không gian affine chiều $m - k$)*.

---

## 5. Ứng dụng 2 trong CP: Cơ sở tuyến tính XOR (XOR Basis)

Đây là ứng dụng đỉnh cao và phổ biến nhất của khái niệm hạng ma trận trong Competitive Programming!

### Bài toán kinh điển:
> Cho một mảng số nguyên $A = [a_1, a_2, \dots, a_N]$ ($a_i < 2^D$, ví dụ $D = 60$).  
> Hãy tìm giá trị XOR lớn nhất có thể tạo ra từ một tập con bất kỳ của $A$.

### Bản chất đại số tuyến tính:
- Mỗi số nguyên $a_i$ có thể xem như một vector gồm $D$ bit trên trường nhị phân $\mathbb{Z}_2$:
  $$a_i = (b_{D-1}, b_{D-2}, \dots, b_0) \in \mathbb{Z}_2^D$$
- Phép XOR hai số chính là **phép cộng vector trong không gian $\mathbb{Z}_2^D$**.
- Tập hợp tất cả các giá trị XOR có thể tạo ra chính là **Không gian sinh (Span)** của $N$ vector đó.
- Không gian này có chiều đúng bằng **Hạng của ma trận $N \times D$ trên trường $\mathbb{Z}_2$**:
  $$\text{Distinct XOR values} = 2^{\text{rank}}$$
  *(tức là có đúng $2^{\text{rank}}$ giá trị XOR phân biệt có thể tạo ra)*

### Cài đặt Cơ sở tuyến tính XOR siêu gọn (~20 dòng):

```cpp
#include <iostream>
#include <vector>

using namespace std;

struct XorBasis {
    static const int BITS = 60;
    long long basis[BITS];
    int rank = 0;

    XorBasis() {
        fill(begin(basis), end(basis), 0);
    }

    // Chèn một vector (số nguyên x) vào cơ sở
    bool insert(long long x) {
        for (int i = BITS - 1; i >= 0; --i) {
            if ((x >> i) & 1) {
                if (!basis[i]) {
                    basis[i] = x; // Tìm thấy phần tử trụ mới tại bit i
                    rank++;
                    return true;
                }
                x ^= basis[i]; // Khử bit i
            }
        }
        return false; // Vector phụ thuộc tuyến tính
    }

    // Tìm giá trị XOR lớn nhất có thể tạo thành
    long long max_xor() const {
        long long ans = 0;
        for (int i = BITS - 1; i >= 0; --i) {
            if ((ans ^ basis[i]) > ans) {
                ans ^= basis[i];
            }
        }
        return ans;
    }
};
```

---

## 6. Tổng kết

Hạng của ma trận là cầu nối quan trọng giữa lý thuyết không gian vector và các thuật toán tính toán cụ thể. Việc nắm vững phương pháp khử Gauss tìm hạng giúp bạn giải quyết trọn vẹn từ các bài toán hình học, giải hệ phương trình số thực đến việc làm chủ cấu trúc Cơ sở tuyến tính XOR (XOR Basis) trong các kỳ thi lập trình đỉnh cao!

---

## 7. Bài tập rèn luyện (Practice Problems)

- [TIMUS 1041 - Nikifor (Matroid Greedy + Gaussian Rank)](https://acm.timus.ru/problem.aspx?space=1&num=1041)
- [SPOJ - XMAX (XOR Maximization)](https://www.spoj.com/problems/XMAX/)
- [Codeforces 1100F - Ivan and Burgers (XOR Basis trên đoạn)](https://codeforces.com/problemset/problem/1100/F)
- [CSES - Maximum XOR Subarray / Subsets](https://cses.fi/problemset/)
