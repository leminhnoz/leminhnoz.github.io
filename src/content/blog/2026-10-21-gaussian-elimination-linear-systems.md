---
title: "Phương Pháp Khử Gauss (Gaussian Elimination): Giải Hệ Tuyến Tính & Vũ Khí Bitset Modulo 2"
description: "Làm chủ phương pháp khử Gauss và Gauss-Jordan giải hệ phương trình tuyến tính: Từ hệ số thực với kỹ thuật chọn phần tử trụ (pivoting), hệ nghiệm duy nhất/vô nghiệm/vô số nghiệm, đến kỹ thuật tối ưu hóa 64x với bitset trên modulo 2."
pubDate: "2026-10-21"
tags: ["Math", "Linear Algebra", "Gaussian Elimination", "Bitset", "Algorithms", "Competitive Programming", "C++"]
categories: ["Algorithms"]
excerpt: "Khử Gauss (Gaussian Elimination) không chỉ là bài học đại số tuyến tính kinh điển trên giảng đường mà còn là vũ khí giải toán cực mạnh trong Competitive Programming: Từ tính xác suất kỳ vọng Markov, định luật Kirchhoff, cho đến kỹ thuật bitset modulo 2 phá đảo các bài toán XOR!"
---

> *"Khi đối mặt với một mê cung các ràng buộc tuyến tính: từ bài toán tính xác suất bước đi ngẫu nhiên trên đồ thị, giải mạch điện, cho đến trò chơi bật tắt công tắc đèn (Lights Out) hay tìm tập con có tổng XOR lớn nhất... công cụ đầu tiên và đáng tin cậy nhất mà các lập trình viên nghĩ tới chính là **Phương pháp khử Gauss (Gaussian Elimination)**.*  
>  
> *Được đặt theo tên của 'hoàng tử toán học' Carl Friedrich Gauss và hoàn thiện bởi Wilhelm Jordan vào năm 1887, thuật toán Gauss-Jordan không chỉ giúp ta phân loại hệ phương trình (vô nghiệm, nghiệm duy nhất, hay vô số nghiệm) trong $O(N^3)$ mà còn có thể tăng tốc thần sầu tới $64$ lần khi làm việc trên trường nhị phân $\mathbb{Z}_2$ nhờ sức mạnh của `std::bitset`!"*

---

## 1. Mô hình toán học: Hệ phương trình đại số tuyến tính (SLAE)

Xét một hệ gồm $n$ phương trình đại số tuyến tính với $m$ ẩn số $x_1, x_2, \dots, x_m$:

$$\begin{aligned}
a_{11} x_1 + a_{12} x_2 + \dots + a_{1m} x_m &= b_1 \\
a_{21} x_1 + a_{22} x_2 + \dots + a_{2m} x_m &= b_2 \\
&\vdots \\
a_{n1} x_1 + a_{n2} x_2 + \dots + a_{nm} x_m &= b_n
\end{aligned}$$

Trong đó các hệ số $a_{ij}$ và vế phải $b_i$ là các số đã biết. Dưới dạng ma trận, hệ được biểu diễn gọn gàng là:
$$A x = b$$
với $A$ là ma trận hệ số kích thước $n \times m$, $x$ là vector ẩn kích thước $m \times 1$, và $b$ là vector vế phải kích thước $n \times 1$.

Để thuận tiện thao tác, ta ghép vector $b$ vào bên phải ma trận $A$ để tạo thành **Ma trận mở rộng (Augmented Matrix)** kích thước $n \times (m + 1)$:
$$[A \mid b] = \begin{bmatrix}
a_{11} & a_{12} & \dots & a_{1m} & b_1 \\
a_{21} & a_{22} & \dots & a_{2m} & b_2 \\
\vdots & \vdots & \ddots & \vdots & \vdots \\
a_{n1} & a_{n2} & \dots & a_{nm} & b_n
\end{bmatrix}$$

---

## 2. Các phép biến đổi sơ cấp trên dòng (Elementary Row Operations)

Thuật toán khử Gauss dựa trên một nguyên lý bất biến: **Tập nghiệm của hệ phương trình không thay đổi** khi ta thực hiện 3 phép biến đổi sơ cấp trên các dòng của ma trận mở rộng:
1. **Đổi chỗ hai hàng cho nhau:** Tương đương việc đổi thứ tự viết hai phương trình.
2. **Nhân một hàng với một hằng số khác $0$:** Tương đương việc nhân cả hai vế của phương trình với cùng một số.
3. **Cộng vào một hàng một bội số của hàng khác:** Tương đương việc cộng đại số hai phương trình để triệt tiêu bớt ẩn số.

Mục tiêu của phương pháp Gauss-Jordan là áp dụng các phép biến đổi này để biến ma trận $A$ về **Dạng bậc thang rút gọn (Reduced Row Echelon Form - RREF)**, lý tưởng nhất là ma trận đơn vị $I$. Khi đó, nghiệm của hệ sẽ hiển hiện ngay tại cột cuối cùng $b$!

---

## 3. Thuật toán Gauss-Jordan chi tiết

### 3.1. Kỹ thuật chọn phần tử trụ (Partial Pivoting)
Trong quá trình khử ẩn số thứ $col$ tại bước $row$, hệ số $a_{row, col}$ đóng vai trò là "chốt chặn" (pivot).
- Nếu $a_{row, col} = 0$, ta không thể chia cho nó! Ta buộc phải tìm một hàng $sel > row$ có $|a_{sel, col}| > 0$ và đổi chỗ hai hàng.
- **Mẹo giảm thiểu sai số dấu phẩy động (Heuristic Heuristic):** Ngay cả khi $a_{row, col} \ne 0$, trong tính toán số thực trên máy tính, ta vẫn nên **chọn hàng có $|a_{sel, col}|$ lớn nhất** trong toàn bộ các hàng từ $row$ đến $n - 1$. Điều này giúp hạn chế việc chia cho các số cực nhỏ gây sai số tràn số hoặc mất độ chính xác nghiêm trọng!

### 3.2. Quy trình khử ẩn
Khi đã có phần tử trụ tại hàng $row$:
1. Với mọi hàng $i \ne row$ ($i = 0 \dots n - 1$):
2. Tính tỉ số $c = \frac{a_{i, col}}{a_{row, col}}$.
3. Lấy dòng $i$ trừ đi dòng $row \times c$:
   $$a_{i, j} \leftarrow a_{i, j} - c \cdot a_{row, j} \quad (\forall j \ge col)$$
4. Kết quả là toàn bộ cột $col$ (ngoại trừ vị trí hàng $row$) đều biến thành $0$!

### 3.3. Xử lý các trường hợp suy biến (Degenerate Cases)
- **Cột toàn số $0$:** Nếu không tìm thấy phần tử trụ nào khác $0$ trên cột $col$, biến $x_{col}$ là một **biến tự do (independent variable)**. Ta bỏ qua cột này và tiếp tục xét cột tiếp theo mà không tăng $row$.
- **Hệ vô nghiệm (No Solution):** Sau khi biến đổi, nếu tồn tại một hàng có tất cả hệ số $a_{i, j} = 0$ ($j = 0 \dots m - 1$) nhưng vế phải $b_i \ne 0$ (phương trình có dạng $0 = b_i$), hệ chắc chắn **vô nghiệm**.
- **Hệ vô số nghiệm (Infinite Solutions):** Nếu hệ không vô nghiệm và có ít nhất một biến tự do, hệ có **vô số nghiệm**.

---

## 4. Cài đặt C++ hệ số thực chuẩn mực

Dưới đây là cài đặt chuẩn thuật toán Gauss-Jordan trên số thực, trả về:
- `0`: Hệ vô nghiệm.
- `1`: Hệ có nghiệm duy nhất (lưu trong `ans`).
- `2` (hoặc hằng số `INF`): Hệ có vô số nghiệm.

```cpp
#include <iostream>
#include <vector>
#include <cmath>
#include <algorithm>

using namespace std;

const double EPS = 1e-9;
const int INF = 2; // Đại diện cho vô số nghiệm

int gauss(vector<vector<double>> a, vector<double>& ans) {
    int n = a.size();
    int m = a[0].size() - 1; // Số lượng ẩn số

    vector<int> where(m, -1); // where[col] lưu hàng chứa pivot của biến col

    for (int col = 0, row = 0; col < m && row < n; ++col) {
        // 1. Tìm hàng có phần tử trụ lớn nhất về độ lớn
        int sel = row;
        for (int i = row; i < n; ++i) {
            if (abs(a[i][col]) > abs(a[sel][col])) {
                sel = i;
            }
        }

        // Nếu cột hiện tại toàn số 0 -> biến tự do, bỏ qua
        if (abs(a[sel][col]) < EPS) continue;

        // Đổi chỗ hàng sel và hàng row
        for (int i = col; i <= m; ++i) {
            swap(a[sel][i], a[row][i]);
        }
        where[col] = row;

        // 2. Khử các hàng khác về 0 trên cột col
        for (int i = 0; i < n; ++i) {
            if (i != row) {
                double c = a[i][col] / a[row][col];
                for (int j = col; j <= m; ++j) {
                    a[i][j] -= a[row][j] * c;
                }
            }
        }
        ++row;
    }

    // 3. Trích xuất nghiệm tạm thời
    ans.assign(m, 0);
    for (int i = 0; i < m; ++i) {
        if (where[i] != -1) {
            ans[i] = a[where[i]][m] / a[where[i]][i];
        }
    }

    // 4. Kiểm tra lại toàn bộ hệ phương trình để phát hiện vô nghiệm
    for (int i = 0; i < n; ++i) {
        double sum = 0;
        for (int j = 0; j < m; ++j) {
            sum += ans[j] * a[i][j];
        }
        if (abs(sum - a[i][m]) > EPS) {
            return 0; // Vô nghiệm
        }
    }

    // 5. Kiểm tra xem có biến tự do hay không
    for (int i = 0; i < m; ++i) {
        if (where[i] == -1) {
            return INF; // Vô số nghiệm
        }
    }

    return 1; // Nghiệm duy nhất
}
```

---

## 5. Vũ khí hủy diệt trong CP: Khử Gauss Modulo 2 tăng tốc 64x với `bitset`!

Trong các kỳ thi Competitive Programming, trường hợp hệ phương trình trên trường nhị phân modulo 2 ($\mathbb{Z}_2$) xuất hiện với tần suất dày đặc:
- Các bài toán bật/tắt công tắc (Lights Out / Switch Flipping).
- Cơ sở không gian vector XOR (XOR Basis / Vector Space).
- Tìm tập con có tích hoặc XOR thỏa mãn điều kiện.

### Tại sao Modulo 2 lại kỳ diệu?
1. Trên $\mathbb{Z}_2$, các số chỉ nhận giá trị $0$ hoặc $1$.
2. Phép cộng chính là **phép XOR (`^`)**: $1 + 1 \equiv 0$, $1 + 0 \equiv 1$.
3. Phép nhân chính là **phép AND (`&`)**.
4. Phép trừ trùng với phép cộng: $-1 \equiv 1 \pmod 2$.
5. Phép khử hàng $row_i \leftarrow row_i - c \cdot row_{pivot}$ chỉ đơn giản là: **Nếu hàng $i$ có bit $1$ ở cột đó, ta XOR toàn bộ hàng $i$ với hàng pivot (`a[i] ^= a[row]`)!**

Nhờ `std::bitset` trong C++, bộ xử lý thực hiện phép XOR $64$ bit cùng lúc trên thanh ghi máy tính, giúp thuật toán **chạy nhanh gấp 64 lần** và giải hệ có kích thước $N, M \le 2000$ chỉ trong chưa đầy $0.1$ giây!

### Cài đặt Gauss Modulo 2 siêu tốc:

```cpp
#include <iostream>
#include <vector>
#include <bitset>

using namespace std;

const int MAXM = 1005; // Số ẩn tối đa (+ 1 cho cột vế phải)

int gauss_mod2(vector<bitset<MAXM>>& a, int n, int m, bitset<MAXM>& ans) {
    vector<int> where(m, -1);

    for (int col = 0, row = 0; col < m && row < n; ++col) {
        // Tìm hàng có bit 1 tại cột col
        for (int i = row; i < n; ++i) {
            if (a[i][col]) {
                swap(a[i], a[row]);
                break;
            }
        }

        if (!a[row][col]) continue; // Cột toàn bit 0

        where[col] = row;

        // Khử toàn bộ các hàng khác bằng phép XOR bitset
        for (int i = 0; i < n; ++i) {
            if (i != row && a[i][col]) {
                a[i] ^= a[row]; // Tăng tốc 64 bit cùng lúc!
            }
        }
        ++row;
    }

    ans.reset();
    for (int i = 0; i < m; ++i) {
        if (where[i] != -1) {
            ans[i] = a[where[i]][m];
        }
    }

    // Kiểm tra tính mâu thuẫn (vô nghiệm: 0 = 1)
    for (int i = 0; i < n; ++i) {
        int sum = 0;
        for (int j = 0; j < m; ++j) {
            sum ^= (ans[j] & a[i][j]);
        }
        if (sum != a[i][m]) return 0; // Vô nghiệm
    }

    for (int i = 0; i < m; ++i) {
        if (where[i] == -1) return 2; // Vô số nghiệm
    }

    return 1; // Nghiệm duy nhất
}
```

---

## 6. Khử Gauss trên modulo số nguyên tố $P$ bất kỳ

Khi giải hệ trên trường số học $\mathbb{Z}_P$ ($P$ là số nguyên tố):
- Phép chia tỉ số $c = a_{i, col} / a_{row, col}$ được thay bằng phép nhân với **Nghịch đảo modulo (Modular Inverse)**:
  $$c = a_{i, col} \cdot (a_{row, col})^{P - 2} \pmod P$$
- Mọi phép cộng, trừ, nhân đều lấy phần dư theo modulo $P$.
- Không bao giờ gặp phải sai số làm tròn số thực, nghiệm hoàn toàn chính xác $100\%$!

---

## 7. Bảng so sánh các biến thể khử Gauss

| Biến thể | Kiểu dữ liệu | Thao tác khử cốt lõi | Tốc độ thực thi | Ứng dụng phổ biến |
| :--- | :---: | :---: | :---: | :--- |
| **Gauss số thực** | `double` / `long double` | Chọn pivot max, nhân trừ số thực | $O(N^3)$ | Xác suất Markov, mạch điện, hình học |
| **Gauss Modulo $P$** | `int` / `long long` | Nghịch đảo modulo qua Fermat nhỏ | $O(N^3 \log P)$ | Đại số tổ hợp, mật mã học |
| **Gauss Modulo 2 (Bitset)** | `std::bitset` | Phép XOR bitwise (`^`) | $O(N^3 / 64)$ | Bài toán đèn công tắc, XOR Basis, Nim |

---

## 8. Bài tập rèn luyện (Practice Problems)

- [SPOJ - XMAX (XOR Maximization)](https://www.spoj.com/problems/XMAX/)
- [LightOJ 1279 - Graph Coloring](https://lightoj.com/problem/graph-coloring)
- [UVA 12910 - Snakes and Ladders (Hệ xác suất Markov)](https://onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=4775)
- [TIMUS 1042 - Central Heating](https://acm.timus.ru/problem.aspx?space=1&num=1042)
- [Codeforces 1411G - No game no life](https://codeforces.com/problemset/problem/1411/G)
- [CodeChef - KNIGHTMOV (Knight Moving)](https://www.codechef.com/problems/KNGHTMOV)
