---
title: "Tối ưu Quy hoạch động Chia để trị (Divide and Conquer DP): Biến O(m n^2) thành O(m n log n)"
description: "Làm chủ kỹ thuật Tối ưu Quy hoạch động Chia để trị (Divide and Conquer DP Optimization). Khám phá tính đơn điệu của điểm cắt tối ưu opt, Bất đẳng thức Tứ giác (Quadrangle Inequality), và kỹ thuật hai con trỏ kiểu Mo giải bài toán đỉnh cao Codeforces 868F."
pubDate: "2025-10-12"
tags: ["Dynamic Programming", "Algorithms", "C++", "Competitive Programming"]
categories: ["Algorithms"]
excerpt: "Khi công thức quy hoạch động phân đoạn có dạng dp[i][j] = min(dp[i-1][k] + C(k, j)) khiến bạn sa lầy vào độ phức tạp O(m n^2) quá chậm, hãy để kỹ thuật Chia để trị cứu rỗi: biến hàng tỷ phép tính thành O(m n log n) chỉ với tính đơn điệu của điểm cắt opt!"
---

> *"Có những bài toán quy hoạch động nhìn công thức thì ngắn như một bài thơ, nhưng khi đem nộp bài thì nhận về một chữ TLE đỏ chói:*  
> *Đề bài yêu cầu: 'Chia mảng $N$ phần tử thành $M$ đoạn con liên tiếp sao cho tổng chi phí là nhỏ nhất'.*  
>  
> *Bạn hăm hở viết ra công thức chuẩn mực: $dp[i][j] = \min_{k} \{ dp[i - 1][k] + C(k + 1, j) \}$.*  
> *Nhưng với $N = 50\,000$ và $M = 100$, độ phức tạp $O(M \times N^2)$ tương đương hơn $2.5 \times 10^9$ phép tính — máy tính sẽ cháy trước khi chạy xong!*  
>  
> *Làm sao để 'chém đẹp' độ phức tạp từ $O(M N^2)$ xuống còn $O(M N \log N)$ (chỉ còn khoảng $8 \times 10^7$ thao tác, chạy êm ru trong 0.2 giây)? Chào mừng bạn đến với **Divide and Conquer DP Optimization (Tối ưu Quy hoạch động Chia để trị)**!"*

---

## 1. Dấu hiệu nhận biết bài toán: Khi nào dùng được D&C DP?

Kỹ thuật này áp dụng cho các bài toán quy hoạch động có dạng chuyển trạng thái quen thuộc sau:

$$dp(i, j) = \min_{0 \le k \le j} \{ dp(i - 1, k - 1) + C(k, j) \}$$

Ý nghĩa thực tế:
- $dp(i, j)$: Chi phí tối ưu khi chia $j$ phần tử đầu tiên thành $i$ đoạn.
- $k$: Vị trí bắt đầu của đoạn thứ $i$ (tức là đoạn cuối cùng bao gồm các phần tử từ $k$ đến $j$).
- $C(k, j)$: Chi phí để gộp các phần tử từ $k$ đến $j$ thành một đoạn duy nhất.

Nếu tính theo cách thông thường:
- Có $M$ hàng (từ $1$ đến $M$) và $N$ cột (từ $1$ đến $N$) $\implies M \times N$ trạng thái.
- Để tính mỗi ô $dp(i, j)$, ta phải duyệt $k$ từ $0$ đến $j$ $\implies O(N)$ bước chuyển.
- Tổng độ phức tạp: **$O(M N^2)$**. Quá chậm!

---

## 2. Trực giác cốt lõi: Tính đơn điệu của "Điểm cắt tối ưu"

Gọi $opt(i, j)$ là chỉ số $k$ tốt nhất mang lại giá trị nhỏ nhất cho $dp(i, j)$.

Bí mật nằm ở câu hỏi: **Khi $j$ dịch sang phải (tức mảng cần chia dài thêm), thì điểm cắt tối ưu $k$ sẽ đi về đâu?**

Hãy suy nghĩ bằng trực giác đời thường:
- Nếu bạn có một mảng dài hơn, điểm bắt đầu của đoạn cuối cùng chắc chắn sẽ **đứng yên hoặc dịch sang phải**, nó không có lý do gì lại lùi ngược về bên trái cả!
- Điều đó tạo nên **Tính đơn điệu của điểm cắt tối ưu (Monotonicity of Optimal Split)**:
  $$opt(i, j) \le opt(i, j + 1) \quad (\forall j)$$
  *(với mọi $j$)*

> **Bất đẳng thức Tứ giác (Quadrangle Inequality):**  
> Điều kiện toán học đủ để $opt(i, j) \le opt(i, j + 1)$ được thỏa mãn là hàm chi phí $C(a, b)$ phải tuân theo bất đẳng thức tứ giác:
> $$C(a, c) + C(b, d) \le C(a, d) + C(b, c) \quad (\forall a \le b \le c \le d)$$
> *(với mọi $a \le b \le c \le d$)*
> *(Trực giác: Chi phí của hai đoạn lồng nhau $[a, d]$ và $[b, c]$ luôn 'đắt' hơn hoặc bằng tổng chi phí của hai đoạn đan xen nhau $[a, c]$ và $[b, d]$).*

---

## 3. Vì sao duyệt tuần tự vẫn chết, và vì sao Chia để trị lại thắng?

Nhiều bạn nghĩ: *"Nếu $opt(i, j) \le opt(i, j + 1)$, ta cứ duyệt từ $j = 1 \to N$ và chỉ tìm $k$ bắt đầu từ $opt(i, j - 1)$ là xong chứ gì?"*

**Không ổn!** Trong trường hợp xấu nhất, $opt(i, j)$ có thể đứng yên tại $1$ suốt một đoạn dài, rồi đột ngột nhảy vọt lên $N$. Bạn vẫn có thể bị ép vào độ phức tạp $O(N^2)$!

Để phân bổ đều công việc và ép độ phức tạp về $O(N \log N)$, ta áp dụng **Chia để trị (Divide and Conquer)**:

### Chiến lược Chia để trị:
Xét một hàng $i$ cố định (ta đã có toàn bộ kết quả của hàng $i - 1$):
Giả sử ta cần tính các ô $dp[mid]$ với $mid \in [l, r]$, và ta biết chắc chắn điểm tối ưu của chúng nằm trong đoạn $[optl, optr]$:

1. **Chọn điểm chính giữa:** $mid = \lfloor (l + r) / 2 \rfloor$.
2. **Tìm $opt(i, mid)$:** Duyệt trâu $k$ trong đoạn $[optl, \min(mid, optr)]$ để tìm ra giá trị $dp(i, mid)$ nhỏ nhất và lưu lại vị trí tối ưu đó là $opt_{mid}$.
3. **Chia đôi phạm vi dựa vào tính đơn điệu:**
   - Với mọi $j < mid$: Điểm tối ưu $opt(j)$ chắc chắn $\le opt_{mid} \implies$ Đệ quy sang nửa bên trái: `compute(l, mid - 1, optl, opt_mid)`.
   - Với mọi $j > mid$: Điểm tối ưu $opt(j)$ chắc chắn $\ge opt_{mid} \implies$ Đệ quy sang nửa bên phải: `compute(mid + 1, r, opt_mid, optr)`.

```text
Tầng 0:                     mid = N/2 (duyệt k trong [0, N])
                           /         \
Tầng 1:          mid = N/4            mid = 3N/4
             k in [0, opt_mid]    k in [opt_mid, N]
```

### Chứng minh độ phức tạp $O(M N \log N)$:
- Cây đệ quy trên đoạn $[l, r]$ chia đôi mỗi lần, nên chiều cao cây đúng bằng $\lceil \log_2 N \rceil$.
- Ở mỗi tầng đệ quy: Các khoảng tìm kiếm $[optl, optr]$ của các nhánh con gộp lại có tổng độ dài không vượt quá $N + 2^{\text{tầng}} = O(N)$.
- Do đó, tại mỗi tầng của cây, tổng số thao tác duyệt $k$ chỉ là **$O(N)$**.
- Có $\log_2 N$ tầng $\implies$ Thời gian tính xong $1$ hàng là **$O(N \log N)$**!
- Nhân với $M$ hàng $\implies$ Tổng độ phức tạp toàn bộ thuật toán: **$O(M N \log N)$**!

---

## 4. Mã nguồn C++ chuẩn mực (Template D&C DP)

Dưới đây là khung cài đặt chuẩn mực, áp dụng kỹ thuật mảng lăn (Rolling Array) để tối ưu bộ nhớ từ $O(M \times N)$ xuống chỉ còn $O(N)$:

```cpp
#include <vector>
#include <algorithm>
#include <climits>
#include <iostream>

using namespace std;

int m, n;
vector<long long> dp_before, dp_cur;

// Hàm tính chi phí gộp đoạn từ i đến j
long long C(int i, int j) {
    // Tùy theo đề bài (ví dụ: mảng cộng dồn, độ lệch chuẩn, v.v.)
    return 0; 
}

// Tính dp_cur cho các cột trong đoạn [l, r], 
// biết điểm tối ưu chắc chắn nằm trong [optl, optr]
void compute(int l, int r, int optl, int optr) {
    if (l > r) return;

    int mid = (l + r) / 2;
    pair<long long, int> best = {LLONG_MAX, -1};

    // Duyệt tìm điểm cắt k tối ưu cho cột mid
    for (int k = optl; k <= min(mid, optr); k++) {
        long long current_cost = (k > 0 ? dp_before[k - 1] : 0) + C(k, mid);
        if (current_cost < best.first) {
            best = {current_cost, k};
        }
    }

    dp_cur[mid] = best.first;
    int opt = best.second;

    // Đệ quy giải quyết nửa trái và nửa phải
    compute(l, mid - 1, optl, opt);
    compute(mid + 1, r, opt, optr);
}

long long solve() {
    dp_before.assign(n, 0);
    dp_cur.assign(n, 0);

    // Khởi tạo hàng đầu tiên (i = 0, tức chia làm 1 đoạn)
    for (int i = 0; i < n; i++) {
        dp_before[i] = C(0, i);
    }

    // Tính các hàng từ 1 đến m - 1
    for (int i = 1; i < m; i++) {
        compute(0, n - 1, 0, n - 1);
        dp_before = dp_cur; // Cuộn mảng tiết kiệm RAM
    }

    return dp_before[n - 1];
}
```

---

## 5. Nâng cấp thượng thừa: D&C kết hợp con trỏ hai đầu kiểu Mo (Two Pointers)

Một câu hỏi hóc búa được đặt ra:  
> *"Nếu hàm chi phí $C(k, j)$ **không thể tính trong $O(1)$** mà cần duyệt mảng thì sao?"*  
> *(Ví dụ bài toán Codeforces 868F: $C(k, j)$ là số cặp phần tử có giá trị bằng nhau trong đoạn $[k, j]$).*

Nếu mỗi lần gọi $C(k, mid)$ lại mất thời gian duyệt đoạn, thuật toán sẽ bị TLE ngay lập tức.

### Tuyệt kỹ: Dùng con trỏ trượt hai đầu kiểu Thuật toán Mo!
Ta duy trì hai con trỏ toàn cục `currL` và `currR` cùng biến `current_cost`.
Khi cần tính chi phí cho đoạn $[k, mid]$, ta chỉ cần dịch chuyển `currL` tới $k$ và `currR` tới $mid$ từng bước một bằng hai hàm `add()` và `remove()`:

```cpp
int currL = 0, currR = -1;
long long cost = 0;

void add(int idx) { /* Thêm phần tử idx và cập nhật cost */ }
void remove(int idx) { /* Xóa phần tử idx và cập nhật cost */ }

void move_range(int l, int r) {
    while (currL > l) add(--currL);
    while (currR < r) add(++currR);
    while (currL < l) remove(currL++);
    while (currR > r) remove(currR--);
}
```

**Vì sao cách này vẫn chạy trong $O(N \log N)$?**  
Bởi vì trong quá trình Chia để trị:
- Con trỏ `currR` chỉ di chuyển tới các điểm `mid`, tổng quãng đường ở mỗi tầng chỉ là $O(N)$.
- Con trỏ `currL` chỉ di chuyển trong phạm vi $[optl, optr]$, tổng quãng đường ở mỗi tầng cũng chỉ là $O(N)$.
- Tổng quãng đường di chuyển của hai con trỏ trên toàn bộ cây vẫn giữ trọn vẹn **$O(N \log N)$**!

---

## 6. Phân biệt: Divide & Conquer DP vs Convex Hull Trick vs Knuth DP

Rất nhiều bạn bị nhầm lẫn giữa 3 phương pháp tối ưu DP phổ biến này. Bảng dưới đây sẽ giúp bạn chọn đúng công cụ trong nháy mắt:

| Tiêu chí | Divide & Conquer DP | Convex Hull Trick (CHT) | Knuth's Optimization |
| :--- | :--- | :--- | :--- |
| **Dạng công thức** | $dp[i][j] = \min (dp[i-1][k] + C(k, j))$ | $dp[i] = \min (dp[j] + A[j] \cdot B[i])$ | $dp[i][j] = \min (dp[i][k] + dp[k+1][j]) + C(i, j)$ |
| **Điều kiện tối ưu** | $opt(i, j) \le opt(i, j + 1)$ | Hàm bậc nhất đường thẳng $y = mx + b$ | $opt(i, j - 1) \le opt(i, j) \le opt(i + 1, j)$ |
| **Đặc điểm bài toán** | Chia $N$ phần tử thành $M$ đoạn | Chi phí có tích của hai đại lượng $A[j] \times B[i]$ | Gom đoạn từ trong ra ngoài (như nhân ma trận) |
| **Độ phức tạp** | $O(M N^2) \to O(M N \log N)$ | $O(N^2) \to O(N)$ hoặc $O(N \log N)$ | $O(N^3) \to O(N^2)$ |

---

## 7. Bài tập thực chiến kinh điển

Hãy luyện tập theo lộ trình từ cơ bản đến nâng cao sau để thành thạo D&C DP:

1. **[Codeforces 321E - Ciel and Gondolas](https://codeforces.com/contest/321/problem/E):** Bài tập mẫu mực nhất về D&C DP. Cẩn thận phần Fast I/O vì dữ liệu đầu vào rất lớn.
2. **[HackerRank - Guardians of the Lunatics](https://www.hackerrank.com/contests/ioi-2014-practice-contest-2/challenges/guardians-lunatics-ioi14):** Bài tập kinh điển từ kỳ thi IOI 2014 Practice.
3. **[Codeforces 868F - Yet Another Minimization Problem](https://codeforces.com/contest/868/problem/F):** Đỉnh cao của sự kết hợp giữa D&C DP và con trỏ Mo.
4. **[Codeforces 1527E - Partition Game](https://codeforces.com/contest/1527/problem/E):** Bài toán phân hoạch dãy số, có thể giải bằng cả D&C DP lẫn Segment Tree DP.

---

## 8. Lời kết

Divide and Conquer DP là một trong những kỹ thuật tối ưu đẹp nhất trong lập trình thi đấu. Nó không đòi hỏi cấu trúc dữ liệu cồng kềnh, không cần cây nhị phân hay hàm toán học phức tạp — tất cả sức mạnh đều bắt nguồn từ một quan sát tự nhiên: **"Khi bài toán lớn hơn, điểm cắt tối ưu không bao giờ thụt lùi"**.

Nắm vững được tư duy này, bạn sẽ tự tin đối đầu và bẻ gãy mọi bài toán phân hoạch đoạn con trong các kỳ thi học sinh giỏi quốc gia, VNOI và Codeforces Div 1!
