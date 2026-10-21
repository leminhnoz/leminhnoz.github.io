---
title: "Tính Định Thức Ma Trận Bằng Khử Gauss: Từ O(N!) Xuống O(N^3) & Ứng Dụng Modulo"
description: "Hướng dẫn toàn diện thuật toán tính định thức (Determinant) ma trận bằng phương pháp khử Gauss O(N^3). Khám phá các tính chất biến đổi dòng, kỹ thuật chọn phần tử trụ chống sai số thực, thuật toán tính định thức modulo hợp số bất kỳ, và ứng dụng đếm cây khung Kirchhoff."
pubDate: "2026-10-21"
tags: ["Math", "Linear Algebra", "Determinant", "Gaussian Elimination", "Algorithms", "Competitive Programming", "C++"]
categories: ["Algorithms"]
excerpt: "Định thức (Determinant) là một trong những đại lượng đẹp nhất của đại số tuyến tính: Từ việc đo thể tích không gian đa chiều đến đếm số cây khung đồ thị qua định lý Kirchhoff. Khám phá cách phương pháp khử Gauss biến bài toán từ O(N!) thành O(N^3) chỉ trong chớp mắt!"
---

> *"Nếu tính định thức của một ma trận $N \times N$ bằng công thức hoán vị Leibniz hay khai triển Laplace truyền thống, bạn sẽ phải thực hiện $O(N!)$ phép tính. Với $N = 20$, con số $20! \approx 2.4 \times 10^{18}$ sẽ khiến siêu máy tính phải chạy trong hàng chục năm!  
> Thế nhưng, nhờ các tính chất đối xứng tuyệt mỹ của định thức dưới các phép biến đổi dòng, **Phương pháp khử Gauss** biến bài toán phức tạp ấy thành việc đưa ma trận về dạng tam giác, cho phép tính chính xác định thức chỉ trong **$O(N^3)$** — chưa đầy $0.01$ giây trong mọi bài thi Competitive Programming!"*

---

## 1. Trực giác: Định thức (Determinant) là gì?

Cho một ma trận vuông $A$ kích thước $N \times N$.  
Định thức của $A$, ký hiệu là $\det(A)$ hoặc $|A|$, là một giá trị số vô hướng đại diện cho các tính chất hình học và đại số cốt lõi của ma trận:
- **Ý nghĩa hình học:** Trong không gian $2$ chiều, $|\det(A)|$ là diện tích hình bình hành tạo bởi các vector cột. Trong không gian $3$ chiều, $|\det(A)|$ là thể tích của khối hộp mắt cáo (parallelepiped). Trong không gian $N$ chiều, nó đo hệ số giãn nở thể tích đa chiều!
- **Tính khả nghịch:** Ma trận $A$ khả nghịch (có ma trận nghịch đảo $A^{-1}$) khi và chỉ khi $\det(A) \ne 0$.

---

## 2. Các tính chất "Vàng" của Định thức khi biến đổi dòng

Phương pháp khử Gauss hoạt động được là nhờ $4$ định lý nền tảng sau:

1. **Cộng một bội số của hàng này vào hàng khác:**  
   Định thức hoàn toàn **giữ nguyên giá trị**: $\det(A') = \det(A)$.
   Ví dụ: Thay thế $row_i \leftarrow row_i - c \cdot row_k$ thì định thức hoàn toàn giữ nguyên giá trị.
2. **Đổi chỗ hai hàng bất kỳ cho nhau:**  
   $$\det(A') = -\det(A)$$
   Mỗi lần hoán vị hai hàng, định thức sẽ **đổi dấu**. Do đó ta chỉ cần theo dõi số lần đổi chỗ (nếu số lần đổi chỗ là số lẻ thì nhân kết quả với $-1$).
3. **Nhân một hàng với một hằng số $c$:**  
   $$\det(A') = c \cdot \det(A)$$
4. **Định thức của Ma trận Tam giác (hoặc Ma trận đường chéo):**  
   Nếu một ma trận có dạng tam giác trên (mọi phần tử dưới đường chéo chính đều bằng $0$), định thức của nó chính là **tích của tất cả các phần tử trên đường chéo chính**:
   $$\det(A) = \prod_{i=0}^{N-1} a_{ii} = a_{00} \cdot a_{11} \cdots a_{N-1, N-1}$$

> **Chiến lược tổng quát:**  
> Dùng các phép biến đổi cộng dòng để khử ma trận $A$ về dạng **Ma trận tam giác trên**, đồng thời đếm số lần đổi dòng để xác định dấu. Cuối cùng, chỉ việc nhân tất cả các phần tử trên đường chéo chính lại với nhau!

---

## 3. Thuật toán khử Gauss tính Định thức trên số thực

Tại mỗi bước $i$ (xét cột thứ $i$ từ hàng $i$ trở đi):
1. **Chọn phần tử trụ (Pivoting):** Tìm hàng $k \ge i$ có $|a_{ki}|$ lớn nhất.
2. **Kiểm tra suy biến:** Nếu $|a_{ki}| < \text{EPS}$ (toàn bộ cột $i$ đều xấp xỉ $0$), ma trận bị suy biến (các vector phụ thuộc tuyến tính). Khi đó:
   $$\det(A) = 0$$
   Ta dừng thuật toán ngay lập tức!
3. **Đổi chỗ hàng $i$ và hàng $k$:** Nếu $k \ne i$, hoán vị hai hàng và đảo dấu của biến tích lũy:
   $$\text{sign} \leftarrow -\text{sign}$$
4. **Khử các hàng phía dưới:** Với mỗi hàng $j > i$:
   Tính tỉ số $c = \frac{a_{ji}}{a_{ii}}$, rồi lấy:
   $$row_j \leftarrow row_j - c \cdot row_i$$
5. Lặp lại cho đến hết ma trận.  
   Sau khi hoàn tất, kết quả là:
   $$\det(A) = \text{sign} \times \prod_{i=0}^{N-1} a_{ii}$$

---

## 4. Cài đặt C++ số thực chuẩn mực

```cpp
#include <iostream>
#include <vector>
#include <cmath>
#include <algorithm>

using namespace std;

const double EPS = 1e-9;

// Tính định thức ma trận vuông A kích thước N x N
double determinant(vector<vector<double>> a) {
    int n = a.size();
    double det = 1.0;

    for (int i = 0; i < n; ++i) {
        // 1. Chọn hàng có phần tử trụ lớn nhất về độ lớn
        int k = i;
        for (int j = i + 1; j < n; ++j) {
            if (abs(a[j][i]) > abs(a[k][i])) {
                k = j;
            }
        }

        // Nếu cột hiện tại toàn số 0 -> det = 0
        if (abs(a[k][i]) < EPS) {
            return 0.0;
        }

        // 2. Đổi chỗ hàng i và hàng k
        if (i != k) {
            swap(a[i], a[k]);
            det = -det; // Đổi dấu định thức khi hoán vị dòng
        }

        det *= a[i][i];

        // 3. Khử các hàng bên dưới i
        for (int j = i + 1; j < n; ++j) {
            double factor = a[j][i] / a[i][i];
            for (int col = i + 1; col < n; ++col) {
                a[j][col] -= factor * a[i][col];
            }
        }
    }

    return det;
}
```

- **Độ phức tạp thời gian:** $O(N^3)$.
- **Bộ nhớ phụ:** $O(1)$ (nếu biến đổi trực tiếp trên ma trận truyền vào).

---

## 5. Tính Định Thức Modulo Hợp Số Bất Kỳ (Euclidean-like Elimination)

Trong Competitive Programming, các bài toán thường yêu cầu tính $\det(A) \pmod M$.
- Nếu $M$ là số nguyên tố: Ta dùng nghịch đảo modulo (Fermat nhỏ) để chia tương tự số thực.
- **Thách thức:** Nếu $M$ là **hợp số bất kỳ** (ví dụ $M = 10^9$ hay $M = 10^6 + 3$ không nguyên tố), phép chia không khả thi vì nhiều số không có nghịch đảo modulo!

### Tuyệt chiêu biến đổi Euclid giữa hai hàng:
Để triệt tiêu $a_{ji}$ bằng $a_{ii}$ mà không cần phép chia modulo, ta áp dụng thuật toán tương tự như **Tìm ước chung lớn nhất (Euclid GCD)** trên hai hàng:
- Chừng nào $a_{ji} \ne 0$:
  - Tính thương $q = a_{ii} / a_{ji}$.
  - Lấy hàng $i$ trừ đi $q$ lần hàng $j$: $a_{ii} \leftarrow a_{ii} - q \cdot a_{ji}$.
  - Đổi chỗ hai hàng $i$ và $j$ (và đổi dấu $\det = -\det$).
- Quá trình này đảm bảo đưa một trong hai phần tử về $0$ trong thời gian logarit tương tự Euclid!

```cpp
// Tính định thức ma trận nguyên modulo M bất kỳ (kể cả hợp số)
long long determinant_modulo(vector<vector<long long>> a, long long mod) {
    int n = a.size();
    long long det = 1;

    for (int i = 0; i < n; ++i) {
        for (int j = i + 1; j < n; ++j) {
            while (a[j][i] != 0) {
                long long q = a[i][i] / a[j][i];
                for (int col = i; col < n; ++col) {
                    a[i][col] = (a[i][col] - q * a[j][col]) % mod;
                }
                swap(a[i], a[j]);
                det = -det;
            }
        }
        if (a[i][i] == 0) return 0;
        det = (det * a[i][i]) % mod;
    }

    return (det % mod + mod) % mod;
}
```

Thuật toán Euclid kết hợp khử Gauss này chạy trong $O(N^3 + N^2 \log M)$, cực kỳ mạnh mẽ và an toàn tuyệt đối với mọi giá trị $M$!

---

## 6. Các ứng dụng đỉnh cao trong Competitive Programming

### 6.1. Định lý Ma trận Cây của Kirchhoff (Matrix Tree Theorem)
> **Bài toán:** Cho một đồ thị vô hướng $G = (V, E)$, hãy đếm số lượng cây khung (Spanning Trees) khác nhau của đồ thị.

1. Xây dựng **Ma trận Laplacian** $L$ kích thước $V \times V$:
   - $L_{i, i} = \text{deg}(i)$ (bậc của đỉnh $i$).
   - $L_{i, j} = -1$ nếu có cạnh nối giữa đỉnh $i$ và $j$ ($i \ne j$), ngược lại bằng $0$.
2. Bỏ đi một hàng bất kỳ và một cột bất kỳ (thường bỏ hàng $0$, cột $0$) để thu được ma trận rút gọn $L^*$ kích thước $(V - 1) \times (V - 1)$.
3. **Số lượng cây khung chính là $\det(L^*)$!**  
   Chỉ cần một lần khử Gauss $O(V^3)$, ta đếm được số cây khung của mọi đồ thị tùy ý!

---

### 6.2. Bổ đề Lindström–Gessel–Viennot (LGV Lemma)
> Cho một đồ thị có hướng không chu trình (DAG). Ta có $K$ đỉnh xuất phát $A_1, \dots, A_K$ và $K$ đỉnh đích $B_1, \dots, B_K$.  
> Cần đếm số bộ $K$ đường đi từ $A_i$ tới $B_{\pi(i)}$ sao cho **không có hai đường đi nào giao nhau tại bất kỳ đỉnh nào**.

Bổ đề LGV khẳng định rằng số bộ đường đi không giao nhau chính là định thức của ma trận $M$ kích thước $K \times K$:
$$M_{i, j} = \text{paths}(A_i \to B_j)$$
*(trong đó $M_{i, j}$ là số đường đi từ $A_i \to B_j$, và số bộ đường đi không giao nhau chính là $\det(M)$)*

---

## 7. Tổng kết

Khử Gauss tính định thức là một trong những công cụ toán học đẹp mắt và có tính ứng dụng thực chiến sâu rộng nhất trong lập trình thi đấu. Không chỉ giải quyết các bài toán đại số thuần túy, nó còn là "cầu nối" đưa những bài toán đếm tổ hợp đồ thị phức tạp về việc nhân các phần tử trên đường chéo chính!

---

## 8. Bài tập rèn luyện (Practice Problems)

- [Codeforces 167E - Wizards and Bets (LGV Lemma + Gauss Determinant)](https://codeforces.com/contest/167/problem/E)
- [CSES - Counting Spanning Trees (Kirchhoff Matrix Tree)](https://cses.fi/problemset/)
- [SPOJ - MATRIX (Determinant of a Matrix)](https://www.spoj.com/problems/MATRIX/)
- [CodeChef - CGRAPH (Counting Graphs)](https://www.codechef.com/)
