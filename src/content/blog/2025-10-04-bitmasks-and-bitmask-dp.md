---
title: "Làm chủ Bitmask và Quy hoạch động Mặt nạ bit (Bitmask DP)"
description: "Khám phá kỹ thuật Bitmask và Bitmask DP: Từ các phép toán bit thần thánh đến bài toán Người du lịch TSP O(2^N * N^2) và bí quyết duyệt tập con."
pubDate: "2025-10-04"
tags: ["Bitmask", "Dynamic Programming", "Algorithms", "C++", "Competitive Programming"]
categories: ["Competitive Programming"]
excerpt: "Một số nguyên 32 bit không chỉ là một con số; nó là một tập hợp chứa tối đa 32 phần tử với tốc độ kiểm tra và thao tác chỉ tốn đúng 1 chu kỳ CPU."
---

> *"Khi bạn nhìn thấy giới hạn $N \le 20$ trong một bài toán tưởng chừng như phải xét tất cả các hoán vị $N!$, hãy nghĩ ngay đến Bitmask. Đó là nơi phép toán nhị phân biến điều không thể thành có thể."*

Trong lập trình thi đấu, có những bài toán yêu cầu ta phải theo dõi trạng thái của một tập hợp các đối tượng:
- Những thành phố nào đã được ghé thăm?
- Những quân cờ nào đã được đặt lên bàn?
- Những người nào đã được ghép cặp?

Nếu dùng `std::vector<bool>` hay `std::set<int>`, mỗi lần sao chép hay so sánh trạng thái sẽ tốn $O(N)$ thời gian và cấp phát bộ nhớ rất nặng nề.

Nhưng hãy nhớ rằng: máy tính lưu trữ số nguyên dưới dạng các dãy bit nhị phân `0` và `1`. Một số nguyên kiểu `int` có 32 bit, đủ để đại diện cho một tập hợp gồm 32 phần tử!
- Bit thứ $i$ bằng `1`: Phần tử $i$ **có mặt** trong tập hợp.
- Bit thứ $i$ bằng `0`: Phần tử $i$ **không có mặt**.

Con số nguyên này được gọi là một **Mặt nạ bit (Bitmask)**.

---

## 1. Bảng tra cứu các phép toán Bit thần thánh

Tất cả các thao tác trên Bitmask đều thực hiện trực tiếp trên thanh ghi của CPU và chỉ tốn **đúng 1 chu kỳ máy ($O(1)$)**:

| Thao tác | Cú pháp C++ | Ý nghĩa |
|:---|:---|:---|
| Lấy tập rỗng $\emptyset$ | `0` | Không có phần tử nào được chọn |
| Lấy tập đầy đủ $\{0, 1, \dots, N-1\}$ | `(1 << N) - 1` | Bật $N$ bit đầu tiên thành `1` |
| Kiểm tra phần tử $i$ có trong tập | `(mask >> i) & 1` | Trả về `1` nếu có, `0` nếu không |
| Thêm phần tử $i$ vào tập | `mask | (1 << i)` | Bật bit thứ $i$ lên `1` |
| Xóa phần tử $i$ khỏi tập | `mask & ~(1 << i)` | Tắt bit thứ $i$ về `0` |
| Đảo trạng thái phần tử $i$ | `mask ^ (1 << i)` | Nếu đang có thì xóa, chưa có thì thêm |
| Đếm số lượng phần tử trong tập | `__builtin_popcount(mask)` | Đếm số lượng bit `1` (hàm tích hợp của GCC) |
| Lấy bit `1` nhỏ nhất (Lowest set bit) | `mask & (-mask)` | Cực kỳ hữu dụng trong Fenwick Tree |

### Tuyệt chiêu: Duyệt qua tất cả các tập con của một Mask
Nếu bạn có một `mask` (ví dụ `1101` nhị phân) và muốn duyệt qua tất cả các tập con của nó:

```cpp
for (int sub = mask; sub > 0; sub = (sub - 1) & mask) {
    // sub là một tập con hợp lệ của mask
}
```
Phép toán `(sub - 1) & mask` sẽ tự động nhảy đến tập con tiếp theo mà bỏ qua tất cả các số không phải tập con. Tổng số bước duyệt qua tất cả tập con của mọi mask từ $0$ đến $2^N - 1$ chỉ là **$3^N$**, nhanh hơn rất nhiều so với duyệt $4^N$ ngây thơ!

---

## 2. Bản chất của Bitmask DP: Bài toán Người du lịch (TSP)

Bài toán kinh điển nhất của Bitmask DP là **Travelling Salesperson Problem (TSP)**:
Cho $N$ thành phố và ma trận khoảng cách $dist[u][v]$ giữa mọi cặp thành phố. Một người bán hàng xuất phát từ thành phố $0$, muốn đi qua **tất cả** các thành phố khác đúng một lần rồi quay trở lại thành phố $0$.
> *"Tìm tổng quãng đường ngắn nhất có thể."*

### Vì sao cách ngây thơ thất bại?
Nếu thử mọi thứ tự ghé thăm các thành phố, số hoán vị là $(N-1)!$.
- Với $N = 20$, $19! \approx 1.2 \times 10^{17} \to$ Máy tính hiện đại phải chạy mất hàng ngàn năm!

### Xây dựng trạng thái Quy hoạch động:
Hãy tự hỏi: Tại một thời điểm bất kỳ trong chuyến hành trình, ta cần biết những thông tin gì để đưa ra quyết định tiếp theo?
1. Ta **đang đứng ở thành phố nào**? (Giả sử là đỉnh $u$).
2. Ta **đã ghé thăm những thành phố nào rồi**? (Được biểu diễn trọn vẹn bằng một con số `mask`).

Ta không cần biết *thứ tự cụ thể* ta đã đi qua các thành phố trong quá khứ, chỉ cần biết *tập hợp những thành phố đã qua* và *vị trí hiện tại*!

Định nghĩa:
> **$dp[mask][u]$**: Quãng đường ngắn nhất để ghé thăm tập các thành phố trong `mask` và hiện đang dừng chân tại thành phố $u$.

### Công thức chuyển trạng thái:
Từ thành phố $u$, ta có thể đi tiếp sang một thành phố $v$ chưa ghé thăm (tức là bit thứ $v$ trong `mask` đang bằng `0`):

$$dp[mask \mid (1 \ll v)][v] = \min\big(dp[mask \mid (1 \ll v)][v], \, dp[mask][u] + dist[u][v]\big)$$

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

const int INF = 1e9;
int n;
int dist[20][20];
int dp[1 << 20][20];

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    cin >> n;
    for (int i = 0; i < n; ++i) {
        for (int j = 0; j < n; ++j) {
            cin >> dist[i][j];
        }
    }

    // Khởi tạo bảng DP với giá trị vô cùng lớn
    for (int mask = 0; mask < (1 << n); ++mask) {
        for (int u = 0; u < n; ++u) {
            dp[mask][u] = INF;
        }
    }

    // Xuất phát từ thành phố 0: mask chỉ chứa bit 0
    dp[1 << 0][0] = 0;

    // Duyệt qua tất cả các tập hợp con từ nhỏ đến lớn
    for (int mask = 1; mask < (1 << n); ++mask) {
        for (int u = 0; u < n; ++u) {
            if (dp[mask][u] == INF) continue;

            // Thử đi sang thành phố v tiếp theo
            for (int v = 0; v < n; ++v) {
                // Nếu thành phố v chưa có trong mask
                if (!((mask >> v) & 1)) {
                    int next_mask = mask | (1 << v);
                    dp[next_mask][v] = min(dp[next_mask][v], dp[mask][u] + dist[u][v]);
                }
            }
        }
    }

    // Kết quả: đi qua tất cả n thành phố và quay về 0
    int full_mask = (1 << n) - 1;
    int ans = INF;
    for (int u = 0; u < n; ++u) {
        ans = min(ans, dp[full_mask][u] + dist[u][0]);
    }

    cout << "Chi phi ngan nhat: " << ans << "\n";
    return 0;
}
```

### Độ phức tạp thời gian:
- Số lượng trạng thái: $2^N \times N$.
- Mỗi trạng thái xét $N$ bước chuyển.
- Tổng thời gian: $O(2^N \cdot N^2)$.
Với $N = 20$: $2^{20} \times 20^2 \approx 10^6 \times 400 \approx 4 \cdot 10^8$ phép tính $\to$ **Chạy hoàn thành trong chưa đầy 1 giây**!
So sánh với $19! \approx 10^{17}$, đây là một bước nhảy vọt không tưởng!

---

## 3. Các dạng bài Bitmask DP thường gặp

1. **Bài toán Ghép cặp hoàn hảo (Max Weight Matching on Small Graph):**
   Cho $2N$ người ($N \le 15$). Chia họ thành $N$ cặp sao cho tổng độ hòa hợp lớn nhất.
   - $dp[mask]$: Độ hòa hợp lớn nhất khi đã ghép cặp xong tập người trong `mask`.
2. **Đếm số cách phân việc (Assignment Problem):**
   Có $N$ công việc và $N$ người. Mỗi người có thể làm một số việc. Đếm số cách phân công hợp lệ.
3. **Hamiltonian Path / Cycle trên đồ thị có hướng:**
   Kiểm tra xem có tồn tại đường đi qua tất cả các đỉnh đúng một lần hay không.

---

## 4. Bài tập rèn luyện thực tế

1. **CSES 1690 — Hamiltonian Flights**: Đếm số đường bay đi từ thành phố $1$ đến thành phố $N$ qua mọi thành phố đúng 1 lần bằng Bitmask DP.
2. **AtCoder dp_o — Matching**: Bài toán ghép cặp nam nữ kinh điển bằng Bitmask DP.
3. **Codeforces 1102E — Monotonic Renaming**: Thao tác bit và mảng.

Tiếp tục lộ trình tại [Roadmap Competitive Programming](/roadmap/)!
