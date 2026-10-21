---
title: "Tính Định Thức Bằng Phương Pháp Crout (Kraut) & Phân Rã LU Trong O(N^3)"
description: "Khám phá phương pháp Crout (Kraut) và kỹ thuật phân rã ma trận A = LU giải bài toán tính định thức trong O(N^3). Hướng dẫn chi tiết công thức tích luỹ in-place, kỹ thuật chọn phần tử trụ ngầm định (Implicit Pivoting) chống sai số số thực."
pubDate: "2026-07-18"
tags: ["Math", "Linear Algebra", "Determinant", "LU Decomposition", "Crout Method", "Algorithms", "Competitive Programming", "C++"]
categories: ["Algorithms"]
excerpt: "Bên cạnh phương pháp khử Gauss truyền thống, Phân rã LU (LU Decomposition) bằng thuật toán Crout/Kraut là một tượng đài khác của đại số tuyến tính tính toán: Tách ma trận thành hai nửa tam giác A = LU, biến việc tính định thức thành tích đường chéo thanh thoát trong O(N^3)!"
---

> *"Nếu phương pháp khử Gauss truyền thống làm thay đổi trực tiếp toàn bộ các phần tử của ma trận qua từng bước biến đổi dòng, thì **Phân rã LU (LU Decomposition)** lại tiếp cận bài toán theo một triết lý thanh lịch và cấu trúc hơn rất nhiều: Phân tách ma trận $A$ thành tích của hai ma trận tam giác $A = L \cdot U$.  
>  
> Một khi đã có $L$ (tam giác dưới) và $U$ (tam giác trên), bài toán tính định thức $\det(A)$ lập tức được giải quyết chỉ bằng một tích đường chéo đơn giản. Trong số các thuật toán phân rã LU, **Phương pháp Crout (hay Kraut)** nổi bật nhờ khả năng tính toán trực tiếp từng cột tại chỗ (in-place) với độ phức tạp $O(N^3)$ và độ ổn định số học đáng kinh ngạc!"*

---

## 1. Bản chất toán học: Phân rã LU là gì?

Cho một ma trận vuông $A$ kích thước $N \times N$.  
Mục tiêu của phân rã LU là tìm hai ma trận:
- **$L$ (Lower Triangular Matrix):** Ma trận tam giác dưới, trong đó mọi phần tử nằm phía trên đường chéo chính đều bằng $0$.
- **$U$ (Upper Triangular Matrix):** Ma trận tam giác trên, trong đó mọi phần tử nằm phía dưới đường chéo chính đều bằng $0$.

sao cho tích của chúng khôi phục lại đúng ma trận $A$:
$$A = L \cdot U$$

$$\begin{bmatrix}
a_{11} & a_{12} & \dots & a_{1N} \\
a_{21} & a_{22} & \dots & a_{2N} \\
\vdots & \vdots & \ddots & \vdots \\
a_{N1} & a_{N2} & \dots & a_{NN}
\end{bmatrix} = \begin{bmatrix}
L_{11} & 0 & \dots & 0 \\
L_{21} & L_{22} & \dots & 0 \\
\vdots & \vdots & \ddots & \vdots \\
L_{N1} & L_{N2} & \dots & L_{NN}
\end{bmatrix} \begin{bmatrix}
U_{11} & U_{12} & \dots & U_{1N} \\
0 & U_{22} & \dots & U_{2N} \\
\vdots & \vdots & \ddots & \vdots \\
0 & 0 & \dots & U_{NN}
\end{bmatrix}$$

### Định lý về tính duy nhất của Phân rã Doolittle / Crout
Hệ phương trình ma trận trên có $N^2$ phương trình nhưng có tới $N^2 + N$ ẩn số (vì mỗi ma trận tam giác có $\frac{N(N + 1)}{2}$ phần tử).  
Để hệ có nghiệm duy nhất, ta cần cố định $N$ phần tử trên đường chéo:
- Ta quy ước đặt tất cả các phần tử trên đường chéo chính của $L$ bằng $1$:
  $$L_{ii} = 1 \quad (\forall i = 1 \dots N)$$
- Khi đó, nếu mọi định thức con chính (principal minors) của $A$ đều khác $0$, thì phân rã $A = L \cdot U$ là **tồn tại và duy nhất**!

---

## 2. Vì sao Phân rã LU giúp tính Định thức siêu tốc?

Theo tính chất nhân tính của định thức:
$$\det(A) = \det(L \cdot U) = \det(L) \cdot \det(U)$$

Vì $L$ là ma trận tam giác dưới có đường chéo chính toàn số $1$:
$$\det(L) = \prod_{i=1}^N L_{ii} = 1 \cdot 1 \cdots 1 = 1$$

Vì $U$ là ma trận tam giác trên:
$$\det(U) = \prod_{i=1}^N U_{ii}$$

Do đó, định thức của ma trận ban đầu $A$ chính là:
$$\det(A) = \prod_{i=1}^N U_{ii} = U_{11} \cdot U_{22} \cdots U_{NN}$$

Chỉ cần tìm được ma trận $U$, ta tính được định thức trong nháy mắt!

---

## 3. Thuật toán Crout (Kraut Algorithm)

Thuật toán Crout giải quyết các phần tử của $L$ và $U$ lần lượt theo từng cột $j$ từ $1$ đến $N$:

### Bước 1: Tính các phần tử của $U$ trên cột $j$ (hàng $i \le j$)
Từ định nghĩa phép nhân ma trận $A_{ij} = \sum_{k=1}^N L_{ik} U_{kj} = \sum_{k=1}^i L_{ik} U_{kj}$ (do $L$ là tam giác dưới):
$$A_{ij} = \sum_{k=1}^{i-1} L_{ik} U_{kj} + L_{ii} U_{ij}$$

Vì $L_{ii} = 1$, ta rút ra ngay công thức tính $U_{ij}$:
$$U_{ij} = A_{ij} - \sum_{k=1}^{i-1} L_{ik} \cdot U_{kj} \quad (i = 1, 2, \dots, j)$$

### Bước 2: Tính các phần tử của $L$ trên cột $j$ (hàng $i > j$)
Tương tự, từ $A_{ij} = \sum_{k=1}^{j} L_{ik} U_{kj} = \sum_{k=1}^{j-1} L_{ik} U_{kj} + L_{ij} U_{jj}$:
$$L_{ij} = \frac{1}{U_{jj}} \left( A_{ij} - \sum_{k=1}^{j-1} L_{ik} \cdot U_{kj} \right) \quad (i = j + 1, \dots, N)$$

Hai công thức trên phụ thuộc lẫn nhau một cách tuần tự tuyệt đẹp: Để tính cột $j$, ta chỉ cần các phần tử ở các cột trước đó ($k < j$) đã được tính xong!

---

## 4. Kỹ thuật chọn phần tử trụ ngầm định (Implicit Pivoting)

Nếu $U_{jj} = 0$ hoặc có giá trị cực nhỏ, phép chia $\frac{1}{U_{jj}}$ sẽ dẫn đến chia cho $0$ hoặc gây sai số dấu phẩy động khổng lồ.  
Để thuật toán ổn định tuyệt đối trong thực tế, ta sử dụng kỹ thuật **Chọn phần tử trụ theo tỉ lệ (Implicit Pivoting)** (được mô tả kinh điển trong bộ sách *Numerical Recipes*):

1. **Chuẩn hóa ban đầu (Scaling):**  
   Với mỗi hàng $i$, tìm phần tử có giá trị tuyệt đối lớn nhất:
   $$\text{scale}[i] = \frac{1}{\max_{0 \le j < N} |A_{i, j}|}$$
2. **Chọn hàng hoán vị (Pivoting):**  
   Tại cột $j$, xét tất cả các hàng $i \ge j$. Ta chọn hàng $imax$ sao cho đại lượng sau đạt cực đại:
   $$|U_{ij}| \times \text{scale}[i]$$
3. **Đổi chỗ hàng:**  
   Nếu $imax \ne j$, ta đổi chỗ toàn bộ hàng $j$ và hàng $imax$, đồng thời đảo dấu biến tích lũy:
   $$\text{sign} \leftarrow -\text{sign}$$

---

## 5. Cài đặt C++ chuẩn mực và tối ưu

Dưới đây là mã nguồn C++ hoàn chỉnh của thuật toán Crout tính định thức trong $O(N^3)$, hỗ trợ chọn phần tử trụ và kiểm soát sai số:

```cpp
#include <iostream>
#include <vector>
#include <cmath>
#include <algorithm>

using namespace std;

const double EPS = 1e-12;

// Tính định thức ma trận vuông A kích thước N x N bằng phương pháp Crout
double determinant_crout(vector<vector<double>> a) {
    int n = a.size();
    vector<double> scaling(n, 0.0);

    // 1. Tính hệ số co giãn cho từng hàng
    for (int i = 0; i < n; ++i) {
        double max_val = 0.0;
        for (int j = 0; j < n; ++j) {
            max_val = max(max_val, abs(a[i][j]));
        }
        if (max_val < EPS) {
            return 0.0; // Hàng toàn số 0 -> det = 0
        }
        scaling[i] = 1.0 / max_val;
    }

    int sign = 1;

    // 2. Phân rã theo từng cột
    for (int j = 0; j < n; ++j) {
        // Nửa trên: Tính các phần tử của U (i < j)
        for (int i = 0; i < j; ++i) {
            double sum = a[i][j];
            for (int k = 0; k < i; ++k) {
                sum -= a[i][k] * a[k][j];
            }
            a[i][j] = sum;
        }

        // Nửa dưới: Tìm phần tử trụ tối ưu trong các hàng i >= j
        double max_pivot = 0.0;
        int imax = j;

        for (int i = j; i < n; ++i) {
            double sum = a[i][j];
            for (int k = 0; k < j; ++k) {
                sum -= a[i][k] * a[k][j];
            }
            a[i][j] = sum;

            double cur = abs(sum) * scaling[i];
            if (cur > max_pivot) {
                max_pivot = cur;
                imax = i;
            }
        }

        // Hoán vị hàng nếu cần thiết
        if (j != imax) {
            for (int k = 0; k < n; ++k) {
                swap(a[j][k], a[imax][k]);
            }
            swap(scaling[j], scaling[imax]);
            sign = -sign; // Đổi dấu định thức
        }

        // Nếu phần tử trụ trên đường chéo bằng 0 -> det = 0
        if (abs(a[j][j]) < EPS) {
            return 0.0;
        }

        // Chia cho phần tử chéo để hoàn tất các phần tử của L
        if (j != n - 1) {
            double inv = 1.0 / a[j][j];
            for (int i = j + 1; i < n; ++i) {
                a[i][j] *= inv;
            }
        }
    }

    // 3. Tính tích các phần tử trên đường chéo chính của U
    double det = sign;
    for (int i = 0; i < n; ++i) {
        det *= a[i][i];
    }

    return det;
}
```

---

## 6. So sánh: Phân rã LU Crout vs. Khử Gauss truyền thống

| Tiêu chí | Khử Gauss (Gaussian Elimination) | Phân rã LU (Crout Method) |
| :--- | :---: | :---: |
| **Độ phức tạp** | $O(N^3)$ | $O(N^3)$ |
| **Bản chất biến đổi** | Triệt tiêu trực tiếp các hàng | Tách ma trận thành tích $A = L \cdot U$ |
| **Bộ nhớ phụ** | $O(1)$ (in-place) | $O(1)$ (in-place, lưu $L$ và $U$ chung ma trận) |
| **Độ ổn định số học** | Tốt khi dùng Partial Pivoting | Rất cao khi dùng Implicit Pivoting |
| **Thế mạnh vượt trội** | Dễ nhớ, linh hoạt trên modulo $\mathbb{Z}_2$ | **Cực mạnh khi giải hệ $Ax = b$ nhiều lần với các $b$ khác nhau** |

> **Ưu thế tuyệt đối của LU:**  
> Nếu bạn cần giải hệ phương trình $Ax = b$ với $1000$ vector vế phải $b$ khác nhau:
> - Khử Gauss phải chạy lại từ đầu $1000$ lần: tốn $1000 \times O(N^3)$ thời gian.
> - Phân rã LU chỉ cần phân rã **ĐÚNG 1 LẦN** trong $O(N^3)$, sau đó với mỗi vector $b$, ta giải hệ tam giác qua hai bước thế xuôi ($Ly = b$) và thế ngược ($Ux = y$) chỉ tốn **$O(N^2)$**!

---

## 7. Bài tập rèn luyện (Practice Problems)

- [Codeforces 167E - Wizards and Bets](https://codeforces.com/contest/167/problem/E)
- [SPOJ - MATRIX (Determinant of a Matrix)](https://www.spoj.com/problems/MATRIX/)
- [CSES - System of Linear Equations](https://cses.fi/problemset/)
- [UVA 684 - Integral Determinant](https://onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=625)
