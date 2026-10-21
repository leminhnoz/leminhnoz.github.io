---
title: "Hiểu sâu về Độ phức tạp Thời gian và Không gian (Big-O) trong Competitive Programming"
description: "Hướng dẫn thực chiến về độ phức tạp thuật toán Big-O: Quy tắc 1 giây (10^8 phép tính), cách nhìn vào giới hạn N để chọn thuật toán phù hợp, và quản lý bộ nhớ 256MB."
pubDate: "2026-10-21"
tags: ["Competitive Programming", "Algorithms", "C++", "Foundations"]
categories: ["Competitive Programming"]
excerpt: "Đừng bao giờ bắt tay vào viết code khi chưa biết thuật toán của mình sẽ chạy trong bao lâu. Nắm vững quy tắc ước lượng 10^8 phép tính/giây và tương quan giữa giới hạn dữ liệu N với độ phức tạp Big-O."
---

> *"Lập trình thi đấu (Competitive Programming) khác với phát triển phần mềm thông thường ở một điểm chí mạng: Code của bạn không chỉ phải đúng, mà còn phải chạy xong trước khi trọng tài bấm còi — thường là đúng 1.0 giây."*

Khi mới bắt đầu học lập trình, hầu hết chúng ta chỉ quan tâm: *"Làm sao để chương trình in ra kết quả đúng?"*. Nhưng khi nộp bài lên Codeforces, CSES hay VNOJ, màn hình đột ngột đỏ rực với dòng chữ: **Time Limit Exceeded (TLE)** hoặc **Memory Limit Exceeded (MLE)**.

Tại sao máy tính của bạn chạy thử với $N = 10$ mượt mà như gió, nhưng khi chấm với test ẩn lại "chết đứng"? Làm sao các tuyển thủ ICPC chỉ cần nhìn vào đề bài 30 giây là biết ngay bài này phải dùng Dijkstra, Quy hoạch động hay chỉ cần Hai con trỏ?

Câu trả lời nằm ở: **Độ phức tạp thuật toán (Big-O Notation)** và **Quy tắc ước tính thời gian thực tế**.

---

## 1. Bản chất của Big-O: Không phải đo bằng mili-giây

Máy tính của bạn có thể là chip Intel i9 thế hệ mới nhất, còn máy chấm của ban tổ chức có thể là máy chủ Linux dùng chip Xeon đời cũ. Nếu đo tốc độ bằng giây thực tế, kết quả sẽ hoàn toàn phụ thuộc vào phần cứng.

**Ký pháp Big-O ($O$)** ra đời để đo **tốc độ tăng trưởng** của số bước tính toán khi kích thước đầu vào $N$ tăng lên vô hạn.

- Big-O bỏ qua các hằng số nhân: $O(2N)$ hay $O(5N + 100)$ đều được xem là $O(N)$.
- Big-O chỉ giữ lại số hạng bậc cao nhất: $O(N^2 + 1000N)$ được rút gọn thành $O(N^2)$, vì khi $N = 10^6$, $N^2 = 10^{12}$ lấn át hoàn toàn $1000N = 10^9$.

### Ba thước đo bạn cần phân biệt:
1. **$O(f(n))$ (Big-O)**: Chặn trên (Worst-case) — trong trường hợp tồi tệ nhất, số bước tính toán không vượt quá hằng số nhân với $f(n)$. Đây là chỉ số quan trọng nhất trong Competitive Programming vì máy chấm luôn chuẩn bị sẵn các test-case "hiểm ác" nhất để bắt bẻ code của bạn.
2. **$\Omega(f(n))$ (Big-Omega)**: Chặn dưới (Best-case) — số bước tính toán ít nhất có thể.
3. **$\Theta(f(n))$ (Big-Theta)**: Chặn chặt (Tight-bound) — khi chặn trên và chặn dưới đồng quy.

---

## 2. Quy tắc vàng của Competitive Programming: 1 Giây $\approx 10^8$ Phép tính

Trong hầu hết các nền tảng thi đấu hiện đại (Codeforces, AtCoder, CSES, SPOJ), thời gian giới hạn (Time Limit) cho một bài thường là **1.0 giây** đến **2.0 giây**.

> [!IMPORTANT]
> **Quy tắc bỏ túi:** Một bộ xử lý hiện đại có thể thực hiện khoảng **$10^8$ (100 triệu) phép toán cơ bản** (phép cộng, trừ, gán, so sánh) trong vòng **1 giây**.

Nếu số phép tính lý thuyết của thuật toán:
- $\le 10^7$: Yên tâm chạy trong khoảng $0.05 - 0.2$ giây (AC mượt mà).
- $\approx 10^8$: Nằm ở ranh giới an toàn, cần hạn chế phép toán nặng như chia số thực, modulo `%` hoặc cấp phát bộ nhớ động liên tục.
- $\ge 10^9$: Chắc chắn nhận **TLE** (Time Limit Exceeded).

---

## 3. "Đọc đề đoán thuật toán": Bảng tra cứu giới hạn $N$

Trước khi gõ một dòng code nào, hãy nhìn ngay vào dòng **Constraints (Giới hạn dữ liệu)** ở cuối đề bài. Kích thước của $N$ sẽ trực tiếp "tiết lộ" độ phức tạp mà tác giả đề bài kỳ vọng:

| Giới hạn $N$ | Độ phức tạp kỳ vọng | Thuật toán thường gặp |
|:---|:---|:---|
| $N \le 10 - 11$ | $O(N!)$ hoặc $O(N^2 \cdot 2^N)$ | Sinh hoán vị (`std::next_permutation`), TSP Brute-force |
| $N \le 20 - 22$ | $O(2^N)$ hoặc $O(N \cdot 2^N)$ | Quay lui (Backtracking), Bitmask DP, Meet in the middle |
| $N \le 100$ | $O(N^4)$ | Quy hoạch động 4 chiều, kiểm tra hình học đa giác |
| $N \le 400 - 500$ | $O(N^3)$ | Floyd-Warshall, Khử Gauss, Matrix Multiplication, DP 3 chiều |
| $N \le 2\,000 - 5\,000$ | $O(N^2)$ | Duyệt 2 vòng lặp lồng nhau, DP trên bảng vuông, Bubble/Insertion sort |
| $N \le 10^5 - 2 \cdot 10^5$ | $O(N \log N)$ hoặc $O(N \sqrt{N})$ | Sắp xếp (`std::sort`), Segment Tree, Fenwick, DSU + Sort, Mo's Algorithm |
| $N \le 10^6 - 10^7$ | $O(N)$ hoặc $O(N \log \log N)$ | Prefix Sum, Two Pointers, Sàng Eratosthenes, KMP, BFS/DFS |
| $N \le 10^9$ | $O(\sqrt{N})$ hoặc $O(\log N)$ | Kiểm tra số nguyên tố, Phân tích thừa số, Lũy thừa nhị phân, Tìm kiếm nhị phân |
| $N \ge 10^{18}$ | $O(1)$ hoặc $O(\log N)$ | Công thức toán học trực tiếp, Nhân ma trận tính Fibonacci |

Ví dụ: Nếu đề bài cho $N \le 2 \cdot 10^5$, một thuật toán $O(N^2)$ sẽ thực hiện $(2 \cdot 10^5)^2 = 4 \cdot 10^{10}$ phép tính $\to$ gấp 400 lần giới hạn 1 giây $\to$ TLE 100%. Bạn bắt buộc phải tìm thuật toán $O(N \log N)$ hoặc $O(N)$.

---

## 4. Hằng số ẩn (Hidden Constant Factor): Kẻ giết người thầm lặng

Hai thuật toán cùng có độ phức tạp $O(N)$, nhưng thời gian thực thi có thể chênh lệch nhau tới **10 đến 50 lần**:

1. **Phép toán số học cơ bản**: Phép cộng (`+`), trừ (`-`), phép thao tác bit (`&`, `|`, `^`, `<<`) chỉ tốn **1 chu kỳ CPU**. Trong khi đó, phép chia nguyên (`/`) và lấy dư (`%`) có thể tốn từ **10 đến 20 chu kỳ CPU**. Lặp lại $10^8$ phép `%` sẽ chậm hơn đáng kể so với $10^8$ phép `+`.
2. **Truy cập bộ nhớ (Cache locality)**: Duyệt mảng tuần tự liên tục theo hàng `a[i][j]` cực kỳ nhanh nhờ CPU Cache L1/L2. Nếu bạn duyệt theo cột `a[j][i]` trên mảng lớn, CPU liên tục gặp hiện tượng *Cache Miss*, khiến tốc độ giảm 5-10 lần dù Big-O không đổi.
3. **Cấu trúc dữ liệu liên kết**: `std::vector` lưu trữ dữ liệu liền kề trong bộ nhớ nên cực kỳ thân thiện với bộ nhớ cache. Ngược lại, `std::set` và `std::map` triển khai bằng Cây đỏ-đen (Red-Black Tree), mỗi node nằm rải rác trong RAM, đi kèm chi phí con trỏ lớn khiến $10^6$ thao tác trên `std::set` có thể mất gần 1 giây.

---

## 5. Độ phức tạp không gian (Space Complexity) & Giới hạn 256MB

Hầu hết các bài thi cấp giới hạn bộ nhớ là **256 MB** (hoặc 512 MB). Hãy nhớ quy đổi đơn vị bộ nhớ trong C++:

- `bool`, `char`: 1 byte.
- `int`, `float`: 4 bytes.
- `long long`, `double`: 8 bytes.

$$1 \text{ MB} = 1024 \text{ KB} = 1024 \times 1024 \text{ bytes} \approx 10^6 \text{ bytes}$$

Do đó:
- Một mảng `int a[10000000]` ($10^7$ phần tử): Tốn $10^7 \times 4 \text{ bytes} \approx 40 \text{ MB}$ $\to$ Thoải mái.
- Một mảng `long long a[20000000]` ($2 \cdot 10^7$ phần tử): Tốn $2 \cdot 10^7 \times 8 \text{ bytes} \approx 160 \text{ MB}$ $\to$ Vẫn an toàn.
- Một ma trận `int dp[5000][5000]`: Số phần tử là $2.5 \cdot 10^7 \times 4 \text{ bytes} = 100 \text{ MB}$ $\to$ Ổn.
- Nhưng `int dp[10000][10000]`: Cần $10^8 \times 4 \text{ bytes} = 400 \text{ MB} > 256 \text{ MB}$ $\to$ **Memory Limit Exceeded (MLE)** ngay lập tức!

> [!TIP]
> **Tránh Stack Overflow:** Các mảng lớn từ $10^5$ phần tử trở lên **không bao giờ** khai báo cục bộ bên trong hàm `main()`, vì ngăn xếp (Stack) của C++ mặc định chỉ có vài Megabytes. Hãy khai báo mảng toàn cục (Global) hoặc dùng `std::vector`.

---

## 6. Đo lường trong C++: Template thực hành

```cpp
#include <iostream>
#include <chrono>
#include <vector>

using namespace std;

// Fast I/O giúp tăng tốc cin/cout tương đương scanf/printf
void setIO() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);
}

int main() {
    setIO();
    
    int n = 10000000; // 10^7 phần tử
    vector<int> a(n, 1);
    
    auto start = chrono::high_resolution_clock::now();
    
    long long sum = 0;
    for (int i = 0; i < n; i++) {
        sum += a[i];
    }
    
    auto end = chrono::high_resolution_clock::now();
    chrono::duration<double> elapsed = end - start;
    
    cout << "Tong: " << sum << "\n";
    cout << "Thoi gian thuc thi: " << elapsed.count() << " giay\n";
    
    return 0;
}
```

---

## 7. Lời kết và Bước tiếp theo trên Roadmap

Hiểu về Big-O là bước đi đầu tiên giúp bạn chuyển từ một người "viết code theo cảm tính" thành một lập trình viên có tư duy phân tích sắc bén. Mỗi khi đọc một đề bài, hãy tập thói quen:
1. Đọc giới hạn $N$ trước tiên.
2. Suy ra ngưỡng Big-O tối đa được phép.
3. Chọn cấu trúc dữ liệu và thuật toán thỏa mãn ngưỡng đó.

Trên [Roadmap tổng thể](/roadmap/), chủ đề tiếp theo bạn cần chinh phục trong Stage 1 chính là **Làm chủ C++ STL** để biết cách tận dụng các cấu trúc dữ liệu có sẵn với độ phức tạp tối ưu nhất!
