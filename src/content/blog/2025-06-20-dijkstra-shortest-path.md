---
title: "Thuật toán Dijkstra: Tìm đường đi ngắn nhất bằng chiến lược tham lam và Hàng đợi ưu tiên"
description: "Hướng dẫn toàn diện về thuật toán Dijkstra: Bản chất Tham lam (Greedy), vì sao BFS thất bại trên đồ thị có trọng số, cách cài đặt Min-Heap O((V + E) log V) và cái bẫy cạnh âm."
pubDate: "2025-06-20"
tags: ["Graph", "Dijkstra", "Shortest Path", "Algorithms", "C++", "Competitive Programming"]
categories: ["Competitive Programming"]
excerpt: "Được nhà khoa học Edsger Dijkstra nghĩ ra chỉ trong 20 phút khi ngồi uống cà phê cùng hôn thê, thuật toán Dijkstra đến nay vẫn là trái tim của mọi hệ thống định vị GPS và mạng máy tính toàn cầu."
---

> *"Tôi đã thiết kế thuật toán này trong 20 phút mà không cần giấy bút khi đang đi mua sắm cùng vợ chưa cưới tại Amsterdam."* — Edsger W. Dijkstra (1956)

Trong bài học trước về [Duyệt đồ thị BFS](/blog/2025-06-08-graph-traversal-bfs-dfs), ta đã biết BFS luôn tìm ra đường đi ngắn nhất khi mọi cạnh đều có trọng số bằng nhau là $1$.

Nhưng ngoài đời thực, con đường từ Hà Nội đến Hải Phòng ($100\text{ km}$) không thể ngắn bằng con đường từ ngõ ra đầu phố ($100\text{ m}$). Khi mỗi cạnh có một **chi phí (độ dài, thời gian)** khác nhau, BFS sẽ hoàn toàn bất lực.

Làm thế nào để tìm đường đi ngắn nhất từ một điểm xuất phát tới mọi địa điểm khác trên bản đồ giao thông? Thuật toán **Dijkstra** chính là câu trả lời kinh điển và mạnh mẽ nhất.

---

## 1. Vì sao BFS thất bại khi có trọng số?

Hãy xét đồ thị đơn giản gồm 3 đỉnh $A, B, C$:
- Cạnh trực tiếp $A \to C$ có trọng số là **100**.
- Cạnh $A \to B$ có trọng số là **2**.
- Cạnh $B \to C$ có trọng số là **3**.

```text
       100
   A --------> C
    \         ^
   2 \       / 3
      v     /
         B
```

Nếu chạy BFS thông thường:
- Từ $A$, BFS đẩy cả $B$ và $C$ vào hàng đợi.
- Đỉnh $C$ được thăm ngay ở bước 1 với khoảng cách là **100**.
- Nhưng trên thực tế, đi vòng qua đường $A \to B \to C$ chỉ tốn chi phí $2 + 3 = \mathbf{5}$!

BFS thất bại vì nó đo khoảng cách bằng **số lượng cạnh**, chứ không phải **tổng trọng số của các cạnh**.

---

## 2. Ý tưởng cốt lõi của Dijkstra: Tham lam thông minh (Greedy)

Dijkstra đưa ra một giải pháp cực kỳ trực quan:
> *"Tại mỗi bước, trong số tất cả các đỉnh chưa được chốt kết quả, hãy chọn đỉnh có khoảng cách tạm thời nhỏ nhất hiện tại. Khoảng cách tới đỉnh đó chắc chắn đã là tối ưu nhất và không bao giờ có thể rút ngắn thêm được nữa!"*

### Tại sao điều này luôn đúng? (Điều kiện: Không có cạnh âm)
Giả sử đỉnh $u$ đang có khoảng cách tạm thời nhỏ nhất là $d[u] = 10$.
Có con đường vòng nào khác từ nguồn qua một đỉnh $v$ nào đó rồi mới tới $u$ mà ngắn hơn $10$ không?
- Vì $u$ là đỉnh có khoảng cách nhỏ nhất hiện tại, nên mọi đỉnh chưa thăm $v$ khác đều đã có $d[v] \ge 10$.
- Vì **mọi cạnh đều có trọng số không âm ($\ge 0$)**, nên việc đi tiếp từ $v$ tới $u$ chỉ có thể làm tăng thêm chi phí:
$$d[v] + \text{weight}(v, u) \ge 10 + 0 = 10 \ge d[u]$$
Do đó, con đường trực tiếp tới $u$ đã là con đường ngắn nhất tuyệt đối! Ta có thể **chốt khoảng cách** của $u$ mà không cần bận tâm về sau nữa.

> [!CAUTION]
> **Cái bẫy cạnh âm:** Nếu đồ thị có cạnh mang trọng số âm (ví dụ: đi qua cạnh này bạn được "thưởng" 20 điểm), lý luận trên sẽ sụp đổ hoàn toàn. Dijkstra **không thể chạy đúng trên đồ thị có cạnh âm**. Khi đó bạn phải sử dụng thuật toán **Bellman-Ford** hoặc **SPFA**.

---

## 3. Cài đặt tối ưu bằng Min-Heap: $O((V + E) \log V)$

Nếu mỗi bước ta duyệt tuần tự toàn bộ các đỉnh để tìm đỉnh nhỏ nhất, thời gian chạy sẽ là $O(V^2)$ (chỉ chạy được khi $V \le 2000$).
Để giải bài toán với $V, E \le 2 \cdot 10^5$, ta sử dụng **Hàng đợi ưu tiên (`std::priority_queue`)** lưu cặp `(khoảng cách, đỉnh)` để lấy ra đỉnh nhỏ nhất trong $O(\log V)$.

```cpp
#include <iostream>
#include <vector>
#include <queue>

using namespace std;

const long long INF = 1e18; // Dùng vô cùng lớn cho kiểu long long

struct Edge {
    int to;
    long long weight;
};

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n, m;
    if (!(cin >> n >> m)) return 0;

    vector<vector<Edge>> adj(n + 1);
    for (int i = 0; i < m; ++i) {
        int u, v;
        long long w;
        cin >> u >> v >> w;
        adj[u].push_back({v, w}); // Đồ thị có hướng (hoặc push 2 chiều nếu vô hướng)
    }

    int start_node = 1;
    vector<long long> dist(n + 1, INF);
    vector<int> parent(n + 1, -1); // Dùng để truy vết đường đi nếu cần

    // Min-heap lưu {khoảng cách, đỉnh}
    priority_queue<pair<long long, int>, 
                   vector<pair<long long, int>>, 
                   greater<pair<long long, int>>> pq;

    dist[start_node] = 0;
    pq.push({0, start_node});

    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();

        // Kỹ thuật bỏ qua bản ghi lỗi thời (Lazy Deletion)
        if (d > dist[u]) continue;

        // Thử nới lỏng (Relaxation) các cạnh kề với u
        for (const auto& edge : adj[u]) {
            int v = edge.to;
            long long w = edge.weight;

            if (dist[u] + w < dist[v]) {
                dist[v] = dist[u] + w;
                parent[v] = u;
                pq.push({dist[v], v});
            }
        }
    }

    // In ra khoảng cách ngắn nhất từ đỉnh 1 tới mọi đỉnh
    for (int i = 1; i <= n; ++i) {
        if (dist[i] == INF) cout << -1 << " ";
        else cout << dist[i] << " ";
    }
    cout << "\n";

    return 0;
}
```

---

## 4. Kỹ thuật bỏ qua bản ghi cũ: `if (d > dist[u]) continue;`

Trong C++, `std::priority_queue` không hỗ trợ thao tác giảm khóa (`decrease_key`). Do đó, mỗi khi tìm thấy đường đi ngắn hơn tới đỉnh $v$, ta chỉ đơn giản đẩy một cặp mới `{dist[v], v}` vào heap.

Điều này dẫn đến việc một đỉnh $v$ có thể xuất hiện nhiều lần trong hàng đợi với các khoảng cách khác nhau. Dòng lệnh:
```cpp
if (d > dist[u]) continue;
```
chính là chiếc khiên bảo vệ thuật toán: Nếu khoảng cách $d$ lấy ra từ heap đã lớn hơn khoảng cách tối ưu hiện tại `dist[u]`, nghĩa là bản ghi này là rác từ quá khứ, ta lập tức bỏ qua và không duyệt tiếp!

---

## 5. Truy vết đường đi ngắn nhất (Path Reconstruction)

Nếu đề bài không chỉ hỏi độ dài mà yêu cầu: *"Hãy in ra danh sách các thành phố trên lộ trình từ $1$ đến $N$?"*

Ta chỉ cần dùng mảng `parent[v]` lưu lại đỉnh cha đã giúp cải thiện khoảng cách tới $v$. Khi thuật toán kết thúc, ta lần ngược từ $N$ về $1$:

```cpp
vector<int> getPath(int target, const vector<int>& parent) {
    vector<int> path;
    for (int v = target; v != -1; v = parent[v]) {
        path.push_back(v);
    }
    reverse(path.begin(), path.end());
    return path;
}
```

---

## 6. Bài tập rèn luyện kinh điển

1. **CSES 1671 — Shortest Routes I**: Cài đặt Dijkstra chuẩn với $N, M \le 10^5$.
2. **Codeforces 20C — Dijkstra?**: Tìm đường đi ngắn nhất và in ra đường đi (Path reconstruction).
3. **CSES 1195 — Flight Discount**: Kết hợp Dijkstra trên đồ thị nhiều tầng (State-space graph).

Hãy tiếp tục lộ trình trên [Roadmap](/roadmap/) với chủ đề: **Sắp xếp Tô-pô (Topological Sort) trên Đồ thị có hướng không chu trình (DAG)**!
