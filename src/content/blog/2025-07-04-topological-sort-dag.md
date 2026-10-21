---
title: "Sắp xếp Tô-pô (Topological Sort) và Đồ thị có hướng không chu trình (DAG)"
description: "Khám phá thuật toán Sắp xếp Tô-pô (Topological Sort) bằng thuật toán Kahn và DFS: Giải quyết bài toán thứ tự môn học, phát hiện chu trình và Quy hoạch động trên DAG."
pubDate: "2025-07-04"
tags: ["Graph", "Topological Sort", "DAG", "Algorithms", "C++", "Competitive Programming"]
categories: ["Competitive Programming"]
excerpt: "Khi các công việc có mối quan hệ phụ thuộc lẫn nhau — việc A phải làm trước việc B — làm sao để tìm ra một thứ tự thực hiện hợp lệ? Sắp xếp Tô-pô chính là chìa khóa mở ra cánh cửa Quy hoạch động trên đồ thị."
---

> *"Bạn không thể học Giải tích 2 nếu chưa qua Giải tích 1. Bạn không thể cài đặt Segment Tree nếu chưa hiểu cây nhị phân. Cuộc sống và lập trình tràn ngập những mối quan hệ phụ thuộc tiên quyết."*

Hãy tưởng tượng bạn đang lên kế hoạch học tập tại trường đại học:
- Muốn học môn **Lập trình nâng cao ($C$)**, bạn phải hoàn thành môn **Nhập môn lập trình ($A$)**.
- Muốn học môn **Cấu trúc dữ liệu ($B$)**, bạn cũng phải học xong môn $A$.
- Muốn học môn **Thuật toán ứng dụng ($D$)**, bạn phải học xong cả $B$ và $C$.

Mỗi môn học là một đỉnh, và mỗi điều kiện tiên quyết là một cạnh có hướng: $A \to B$, $A \to C$, $B \to D$, $C \to D$.
Làm thế nào để máy tính xếp cho bạn một danh sách các môn học theo thứ tự tuyến tính sao cho **không bao giờ có môn nào xuất hiện trước môn tiên quyết của nó**?

Đó chính là bài toán **Sắp xếp Tô-pô (Topological Sort)**.

---

## 1. DAG (Directed Acyclic Graph): Điều kiện sống còn

Trước khi có thể sắp xếp tô-pô, đồ thị bắt buộc phải là một **DAG (Đồ thị có hướng không có chu trình)**:
- **Có hướng (Directed)**: Quan hệ phụ thuộc luôn có chiều (làm $A$ trước rồi mới làm $B$).
- **Không chu trình (Acyclic)**: Nếu đồ thị xuất hiện một chu trình (ví dụ: $A \to B \to C \to A$), ta sẽ rơi vào nghịch lý con gà và quả trứng: muốn học $A$ phải học $C$, muốn học $C$ phải học $B$, muốn học $B$ lại phải học $A$ $\to$ Bế tắc vĩnh viễn (Deadlock)!

> [!IMPORTANT]
> Một đồ thị có hướng có thể sắp xếp tô-pô **khi và chỉ khi** nó không chứa bất kỳ chu trình nào (tức là một DAG). Nếu thuật toán không thể sắp xếp đủ $N$ đỉnh, ta kết luận ngay đồ thị có chu trình!

---

## 2. Thuật toán Kahn (Tiếp cận bằng Bán bậc vào & BFS)

Thuật toán của Arthur Kahn (1962) hoạt động dựa trên một trực giác cực kỳ tự nhiên:
1. Những môn học nào **không có môn tiên quyết** (không có mũi tên nào trỏ vào nó)? Đó là những việc có thể làm ngay lập tức!
2. Hãy làm những việc đó trước, rồi "gạch bỏ" chúng khỏi danh sách cần làm.
3. Việc gạch bỏ này sẽ giải phóng các môn học tiếp theo. Ta lại tiếp tục chọn những môn vừa mới hết điều kiện ràng buộc.

### Khái niệm Bán bậc vào (In-degree):
- `in_degree[u]`: Số lượng cạnh trỏ trực tiếp vào đỉnh $u$.
- Một đỉnh có `in_degree[u] == 0` nghĩa là tất cả các điều kiện tiên quyết của nó đã được thỏa mãn!

### Các bước thực hiện:
1. Đếm `in_degree[u]` cho mọi đỉnh $u$ từ $1$ đến $N$.
2. Đẩy tất cả các đỉnh có `in_degree == 0` vào một hàng đợi `std::queue`.
3. Lặp lại khi hàng đợi chưa rỗng:
   - Lấy đỉnh $u$ ra khỏi hàng đợi và thêm vào danh sách kết quả tô-pô.
   - Duyệt qua tất cả các đỉnh con $v$ kề với $u$: Giảm `in_degree[v]--` (tượng trưng cho việc môn tiên quyết $u$ đã hoàn thành).
   - Nếu `in_degree[v] == 0`, đẩy ngay $v$ vào hàng đợi.
4. Nếu số phần tử trong danh sách kết quả đúng bằng $N$, ta có thứ tự hợp lệ. Nếu ít hơn $N$, đồ thị có chứa chu trình!

```cpp
#include <iostream>
#include <vector>
#include <queue>

using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n, m;
    if (!(cin >> n >> m)) return 0;

    vector<vector<int>> adj(n + 1);
    vector<int> in_degree(n + 1, 0);

    for (int i = 0; i < m; ++i) {
        int u, v;
        cin >> u >> v;
        adj[u].push_back(v); // Cạnh có hướng từ u sang v
        in_degree[v]++;      // Đỉnh v có thêm một cạnh trỏ vào
    }

    queue<int> q;
    for (int i = 1; i <= n; ++i) {
        if (in_degree[i] == 0) {
            q.push(i);
        }
    }

    vector<int> topo_order;

    while (!q.empty()) {
        int u = q.front();
        q.pop();
        topo_order.push_back(u);

        for (int v : adj[u]) {
            in_degree[v]--;
            if (in_degree[v] == 0) {
                q.push(v);
            }
        }
    }

    // Kiểm tra tính chu trình
    if ((int)topo_order.size() < n) {
        cout << "IMPOSSIBLE (Do thi co chu trinh!)\n";
    } else {
        for (int x : topo_order) {
            cout << x << " ";
        }
        cout << "\n";
    }

    return 0;
}
```

- **Độ phức tạp thời gian:** $O(V + E)$ — mỗi đỉnh và mỗi cạnh được duyệt đúng 1 lần.
- **Độ phức tạp không gian:** $O(V + E)$ để lưu danh sách kề và mảng bán bậc vào.

---

## 3. Ứng dụng tối thượng: Quy hoạch động trên DAG

Tại sao Sắp xếp Tô-pô lại là một trong những công cụ quan trọng nhất trong Competitive Programming?
Bởi vì: **Mọi bài toán Quy hoạch động (Dynamic Programming) thực chất đều là một đồ thị có hướng không chu trình!**
Các trạng thái DP chính là các đỉnh của đồ thị, và công thức chuyển trạng thái chính là các cạnh có hướng.

Khi bạn sắp xếp tô-pô các đỉnh của một DAG, bạn nhận được một thứ tự tuyến tính đảm bảo rằng: **Mọi trạng thái con luôn được tính toán xong xuôi trước khi ta cần dùng đến nó**!

### Bài toán kinh điển: Đường đi dài nhất trên DAG
Cho đồ thị có hướng không chu trình. Tìm độ dài đường đi dài nhất từ đỉnh $1$ đến đỉnh $N$.

Trên đồ thị tổng quát, bài toán đường đi dài nhất là NP-Hard (không có thuật toán đa thức). Nhưng trên **DAG**, ta chỉ cần duyệt theo thứ tự Tô-pô:

```cpp
vector<int> dp(n + 1, -1);
dp[1] = 0; // Đỉnh xuất phát

for (int u : topo_order) {
    if (dp[u] != -1) {
        for (int v : adj[u]) {
            dp[v] = max(dp[v], dp[u] + 1);
        }
    }
}

cout << "Do dai duong di dai nhat toi n: " << dp[n] << "\n";
```

Chỉ với vài dòng code dựa trên thứ tự tô-pô, bài toán NP-Hard đã được giải trong thời gian tuyến tính $O(V + E)$!

---

## 4. Bài tập rèn luyện thực chiến

1. **CSES 1679 — Course Schedule**: Bài toán mẫu mực về Topological Sort bằng thuật toán Kahn.
2. **CSES 1680 — Longest Flight Route**: Tìm đường bay dài nhất bằng cách kết hợp Topological Sort và Dynamic Programming trên DAG.
3. **CSES 1681 — Game Routes**: Đếm số lượng đường đi khác nhau từ đỉnh 1 đến đỉnh $N$ modulo $10^9 + 7$.

Tiếp tục hành trình học tập tại [Roadmap](/roadmap/) với cấu trúc dữ liệu xâu chuỗi đỉnh cao: [Cây tiền tố (Trie)](/blog/2026-09-22-trie-prefix-tree)!
