---
title: "Tổ tiên chung gần nhất (LCA) và Kỹ thuật Nhảy nhị phân (Binary Lifting) trên cây"
description: "Làm chủ kỹ thuật Nhảy nhị phân (Binary Lifting) trên cây: Tiền xử lý O(N log N) và tìm Tổ tiên chung gần nhất (LCA) trong O(log N), tính khoảng cách giữa hai đỉnh bất kỳ."
pubDate: "2026-10-21"
tags: ["Tree", "LCA", "Binary Lifting", "Algorithms", "C++", "Competitive Programming"]
categories: ["Competitive Programming"]
excerpt: "Mọi số nguyên dương đều có thể phân tích thành tổng các lũy thừa của 2. Áp dụng ý tưởng nhị phân này lên cây sẽ biến những bước nhảy một bậc chậm chạp thành những cú nhảy vọt siêu tốc O(log N)."
---

> *"Nếu bạn muốn nhảy lên tầng thứ 100 của một tòa nhà, bạn sẽ leo từng bậc thang một, hay dùng thang máy bấm các nút nhảy tầng 64, 32 và 4?"*

Trên một cây có gốc (Rooted Tree) gồm $N = 2 \cdot 10^5$ đỉnh, bài toán kinh điển nhất mà mọi lập trình viên thi đấu đều phải đối mặt là:
Cho $Q = 2 \cdot 10^5$ truy vấn, mỗi truy vấn hỏi:
> *"Tìm **Tổ tiên chung gần nhất (Lowest Common Ancestor - LCA)** của hai đỉnh $u$ và $v$?"*

LCA của $u$ và $v$ là đỉnh nằm xa gốc nhất mà vừa là tổ tiên của $u$, vừa là tổ tiên của $v$. Đây là "ngã ba đường" nơi hai nhánh cây gặp nhau.

Nếu tìm được LCA, bạn có thể giải hàng loạt bài toán khác trong chớp mắt:
- **Tính khoảng cách giữa hai đỉnh bất kỳ trên cây:**
$$\text{dist}(u, v) = \text{depth}[u] + \text{depth}[v] - 2 \cdot \text{depth}[\text{LCA}(u, v)]$$
- Tìm giá trị lớn nhất/nhỏ nhất trên đường đi giữa hai đỉnh.
- Kiểm tra xem đỉnh $w$ có nằm trên đường đi từ $u$ tới $v$ hay không.

Làm thế nào để trả lời mỗi câu hỏi LCA trong thời gian **$O(\log N)$**? Chào mừng bạn đến với **Nhảy nhị phân (Binary Lifting)**!

---

## 1. Cách ngây thơ: Leo từng bậc một ($O(N)$)

Thuật toán tự nhiên nhất mà ai cũng nghĩ ra:
1. So sánh độ sâu: Giả sử đỉnh $u$ đang ở sâu hơn đỉnh $v$.
2. Ta cho $u$ nhảy từng bước lên đỉnh cha `u = parent[u]` cho tới khi độ sâu của $u$ bằng độ sâu của $v$.
3. Sau khi hai đỉnh cùng độ sâu, ta cho cả hai đỉnh cùng nhảy lên đỉnh cha từng bước một: `u = parent[u]; v = parent[v];` cho đến khi chúng gặp nhau tại cùng một đỉnh.

```text
               1 (Gốc)
              / \
             2   3
            /     \
           4       5
          /
         6
(Đỉnh 6 nhảy lên 4, rồi lên 2; đỉnh 5 nhảy lên 3... Cực kỳ chậm!)
```

Trong trường hợp cây bị suy biến thành một đường thẳng dài (Cây tre), chiều cao cây là $N$. Mỗi truy vấn có thể mất $O(N)$ bước. Với $Q = 2 \cdot 10^5$ câu hỏi, tổng thời gian là $2 \cdot 10^5 \times 2 \cdot 10^5 = 4 \cdot 10^{10}$ phép tính $\to$ **TLE**.

---

## 2. Ý tưởng Binary Lifting: Nhảy theo lũy thừa của 2

Mọi số nguyên dương đều có thể biểu diễn duy nhất dưới dạng nhị phân (tổng các lũy thừa của 2):
Ví dụ: $13 = 8 + 4 + 1 = 2^3 + 2^2 + 2^0$.

Thay vì nhảy từng bước $1$, tại sao ta không chuẩn bị trước các bước nhảy có độ dài:
$$2^0 = 1, \quad 2^1 = 2, \quad 2^2 = 4, \quad 2^3 = 8, \quad \dots, \quad 2^{19} \approx 5 \cdot 10^5$$

Nếu muốn nhảy lên $13$ tầng:
Ta chỉ cần thực hiện đúng **3 cú nhảy**: nhảy một bước $8$, nhảy một bước $4$, và nhảy một bước $1$!
Số bước nhảy từ $N$ giảm ngoạn mục xuống còn tối đa $\lceil \log_2 N \rceil \approx \mathbf{18}$ bước!

---

## 3. Bảng Quy hoạch động `up[u][i]`

Định nghĩa:
`up[u][i]` là **tổ tiên thứ $2^i$ của đỉnh $u$**.

Công thức chuyển trạng thái cực kỳ thanh lịch:
> *"Tổ tiên thứ $2^i$ của đỉnh $u$ chính là tổ tiên thứ $2^{i-1}$ của (tổ tiên thứ $2^{i-1}$ của $u$)."*

Vì: $2^i = 2^{i-1} + 2^{i-1}$.

$$\text{up}[u][i] = \text{up}\big[\text{up}[u][i - 1]\big][i - 1]$$

- Bước cơ sở: `up[u][0] = parent[u]` (tổ tiên thứ $2^0 = 1$ chính là cha trực tiếp).
- Ta chỉ cần duyệt một hàm DFS từ gốc để tính độ sâu và cha trực tiếp, sau đó chạy hai vòng lặp lồng nhau để hoàn thiện toàn bộ bảng `up`:

```cpp
const int MAXN = 200005;
const int LOGN = 19; // 2^18 > 200,000

vector<int> adj[MAXN];
int up[MAXN][LOGN];
int depth[MAXN];

void dfs(int u, int p, int d) {
    depth[u] = d;
    up[u][0] = p; // Cha trực tiếp

    // Tính toán các bước nhảy lũy thừa 2
    for (int i = 1; i < LOGN; ++i) {
        up[u][i] = up[up[u][i - 1]][i - 1];
    }

    for (int v : adj[u]) {
        if (v != p) {
            dfs(v, u, d + 1);
        }
    }
}
```

Thời gian tiền xử lý: $O(N \log N)$. Bộ nhớ: $O(N \log N)$.

---

## 4. Thuật toán tìm LCA trong $O(\log N)$

Khi cần tìm LCA của hai đỉnh $u$ và $v$:

### Bước 1: Đưa hai đỉnh về cùng độ sâu
Giả sử $\text{depth}[u] > \text{depth}[v]$. Ta cần cho $u$ nhảy lên một khoảng chênh lệch $k = \text{depth}[u] - \text{depth}[v]$.
Ta duyệt từ bit $i = \text{LOGN} - 1$ xuống $0$: Nếu bit thứ $i$ của $k$ bằng 1, ta cho $u = \text{up}[u][i]$.

### Bước 2: Kiểm tra trùng nhau
Sau khi cùng độ sâu, nếu $u == v$, thì chính đỉnh này là LCA! Trả về $u$.

### Bước 3: Cùng nhảy vọt lên cao
Nếu $u \neq v$, ta duyệt từ $i = \text{LOGN} - 1$ xuống $0$:
- Nếu `up[u][i] != up[v][i]`: Nghĩa là bước nhảy $2^i$ vẫn chưa vượt quá LCA, cả hai vẫn là hai nhánh riêng biệt $\to$ Cho cả hai cùng nhảy: `u = up[u][i]; v = up[v][i];`.
- Nếu `up[u][i] == up[v][i]`: Bước nhảy này quá cao (đã vượt qua hoặc đúng vào tổ tiên chung) $\to$ Giữ nguyên, không nhảy, thử bước nhảy nhỏ hơn.

Sau khi vòng lặp kết thúc, $u$ và $v$ sẽ nằm ngay sát dưới chân của LCA.
Vậy LCA chính là cha trực tiếp: `up[u][0]`!

```cpp
int getLCA(int u, int v) {
    if (depth[u] < depth[v]) swap(u, v);

    // 1. Đưa u lên cùng độ sâu với v
    int diff = depth[u] - depth[v];
    for (int i = 0; i < LOGN; ++i) {
        if ((diff >> i) & 1) {
            u = up[u][i];
        }
    }

    if (u == v) return u;

    // 2. Cùng nhảy lên sát dưới chân LCA
    for (int i = LOGN - 1; i >= 0; --i) {
        if (up[u][i] != up[v][i]) {
            u = up[u][i];
            v = up[v][i];
        }
    }

    return up[u][0];
}
```

---

## 5. Tính khoảng cách giữa hai đỉnh bất kỳ trên cây

Với hàm `getLCA` trong tay, khoảng cách giữa đỉnh $u$ và $v$ được tính trong $O(\log N)$:

```cpp
int getDistance(int u, int v) {
    return depth[u] + depth[v] - 2 * depth[getLCA(u, v)];
}
```

---

## 6. Bài tập rèn luyện thực chiến

1. **CSES 1687 — Company Queries I**: Cho một nhân viên và số nguyên $K$, tìm sếp cấp cao thứ $K$ của họ bằng Binary Lifting.
2. **CSES 1688 — Company Queries II**: Tìm giám đốc chung cấp thấp nhất (LCA) của hai nhân viên.
3. **CSES 1135 — Distance Queries**: Trả lời $Q$ câu hỏi tính khoảng cách giữa hai đỉnh trên cây.

Xem toàn bộ lộ trình và các chủ đề nâng cao tiếp theo tại [Roadmap Competitive Programming](/roadmap/)!
