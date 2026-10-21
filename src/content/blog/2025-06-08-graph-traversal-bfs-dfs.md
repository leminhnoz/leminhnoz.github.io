---
title: "Nhập môn Lý thuyết Đồ thị: Biểu diễn đồ thị và Chinh phục DFS / BFS toàn diện"
description: "Khám phá thế giới đồ thị: Từ danh sách kề (Adjacency List) đến hai thuật toán duyệt kinh điển DFS và BFS, ứng dụng tìm đường đi ngắn nhất không trọng số và duyệt mê cung 2D."
pubDate: "2025-06-08"
tags: ["Graph", "BFS", "DFS", "Algorithms", "C++", "Competitive Programming"]
categories: ["Competitive Programming"]
excerpt: "Mọi mạng xã hội, bản đồ giao thông hay mê cung máy tính đều là đồ thị. Nắm vững bản chất duyệt theo chiều sâu (DFS) và chiều rộng (BFS) là bước ngoặt lớn nhất trên con đường Competitive Programming."
---

> *"Thế giới thực không sắp xếp theo các mảng số tuyến tính; nó liên kết với nhau như một mạng nhện khổng lồ. Và đồ thị chính là tấm bản đồ dẫn lối qua mạng nhện đó."*

Khi bạn kết bạn trên Facebook, tìm đường đi ngắn nhất trên Google Maps, hoặc giải bài toán thoát khỏi mê cung, bạn đều đang làm việc với **Đồ thị (Graph)**.

Trong Competitive Programming, đồ thị chiếm tới 25% - 35% các bài thi từ cấp độ học sinh giỏi quốc gia đến ICPC. Nếu bạn cảm thấy sợ đồ thị vì có quá nhiều khái niệm (đỉnh, cạnh, bậc, chu trình, liên thông), đừng lo lắng. Bài viết này sẽ đưa bạn đi từ trực giác đời thường nhất đến hai thuật toán nền tảng: **DFS (Duyệt theo chiều sâu)** và **BFS (Duyệt theo chiều rộng)**.

---

## 1. Biểu diễn đồ thị trong C++: Danh sách kề (Adjacency List)

Một đồ thị $G = (V, E)$ gồm:
- Tập đỉnh $V$ (Vertices): Các đối tượng (thành phố, giao lộ, con người).
- Tập cạnh $E$ (Edges): Các kết nối giữa các đỉnh (đường đi, quan hệ bạn bè).

Trong C++, cách lưu trữ tối ưu nhất về cả thời gian $O(V + E)$ lẫn bộ nhớ là **Danh sách kề (`vector<vector<int>>`)**:

```cpp
#include <iostream>
#include <vector>

using namespace std;

int main() {
    int n, m; // n đỉnh, m cạnh
    cin >> n >> m;

    vector<vector<int>> adj(n + 1);

    for (int i = 0; i < m; ++i) {
        int u, v;
        cin >> u >> v;
        // Đồ thị vô hướng: có đường từ u sang v thì cũng có đường từ v sang u
        adj[u].push_back(v);
        adj[v].push_back(u);
    }

    // Duyệt qua tất cả các đỉnh kề với đỉnh 1
    for (int neighbor : adj[1]) {
        cout << neighbor << " ";
    }
    cout << "\n";

    return 0;
}
```

> [!TIP]
> **Tại sao không dùng Ma trận kề `adj[N][N]`?**
> Nếu $N = 10^5$, một ma trận $10^5 \times 10^5$ sẽ cần tới $10^{10} \times 4 \text{ bytes} = 40 \text{ GB}$ bộ nhớ $\to$ Nhận lỗi Memory Limit Exceeded ngay. Danh sách kề chỉ tốn bộ nhớ đúng bằng số lượng cạnh thực tế $O(V + E)$.

---

## 2. DFS (Depth-First Search): Đi sâu đến tận cùng

Trực giác của DFS giống như một người thám hiểm đi vào một hang động phức tạp:
- Bạn chọn một ngã rẽ và **tiến sâu mãi mãi** cho đến khi gặp ngõ cụt.
- Khi gặp ngõ cụt, bạn **lùi lại (Backtrack)** ngã rẽ trước đó để thử con đường tiếp theo.
- Để không đi lòng vòng trong chu trình vô tận, bạn đánh dấu một vết sơn lên những hang đã đi qua (`visited[u] = true`).

### Triển khai đệ quy thanh lịch:
```cpp
#include <vector>
#include <iostream>

using namespace std;

const int MAXN = 100005;
vector<int> adj[MAXN];
bool visited[MAXN];

void dfs(int u) {
    visited[u] = true;
    cout << u << " "; // Thăm đỉnh u

    for (int v : adj[u]) {
        if (!visited[v]) {
            dfs(v); // Đi sâu xuống đỉnh con chưa thăm
        }
    }
}
```

- **Độ phức tạp thời gian:** $O(V + E)$ (mỗi đỉnh và mỗi cạnh được duyệt đúng 1 lần).
- **Ứng dụng của DFS:** Đếm số thành phần liên thông, phát hiện chu trình trên đồ thị, kiểm tra tính 2 phía (Bipartite graph), sắp xếp tô-pô.

---

## 3. BFS (Breadth-First Search): Lan tỏa như sóng nước

Nếu DFS tiến sâu theo từng nhánh, thì BFS lại lan tỏa đều ra xung quanh như gợn sóng khi bạn ném một hòn sỏi xuống mặt hồ tĩnh lặng:
- Đầu tiên, thăm đỉnh xuất phát (khoảng cách 0).
- Tiếp theo, thăm tất cả các đỉnh cách đỉnh xuất phát đúng $1$ bước.
- Tiếp theo, thăm tất cả các đỉnh cách đúng $2$ bước, rồi $3$ bước,...

Để làm được điều này, BFS sử dụng **Hàng đợi (`std::queue`)** theo nguyên lý FIFO (Vào trước - Ra trước).

```cpp
#include <vector>
#include <queue>
#include <iostream>

using namespace std;

const int MAXN = 100005;
vector<int> adj[MAXN];
int dist[MAXN]; // dist[u] lưu khoảng cách ngắn nhất từ nguồn đến u

void bfs(int start_node, int n) {
    for (int i = 1; i <= n; ++i) dist[i] = -1; // -1 nghĩa là chưa thăm

    queue<int> q;
    q.push(start_node);
    dist[start_node] = 0;

    while (!q.empty()) {
        int u = q.front();
        q.pop();

        for (int v : adj[u]) {
            if (dist[v] == -1) { // Nếu đỉnh v chưa được thăm
                dist[v] = dist[u] + 1;
                q.push(v);
            }
        }
    }
}
```

> [!IMPORTANT]
> **Định lý tối thượng của BFS:**
> Trên đồ thị **không có trọng số** (hoặc mọi cạnh có trọng số bằng nhau là 1), BFS **luôn tìm ra đường đi ngắn nhất** từ đỉnh nguồn tới mọi đỉnh khác. Lần đầu tiên BFS chạm tới một đỉnh $u$, khoảng cách ghi nhận chắc chắn là khoảng cách nhỏ nhất có thể!

---

## 4. Tuyệt chiêu thực chiến: Duyệt lưới 2D (Grid Traversal)

Một dạng bài cực kỳ phổ biến: Cho một bản đồ ma trận $N \times M$ gồm các ô đất trống `.` và chướng ngại vật `#`. Tìm đường đi ngắn nhất từ ô $(x_1, y_1)$ đến ô $(x_2, y_2)$.

Thay vì dựng danh sách kề, ta xem **mỗi ô $(r, c)$ là một đỉnh**, và cạnh nối tới $4$ ô xung quanh (trên, dưới, trái, phải).

### Kỹ thuật mảng hướng $dx, dy$:
```cpp
#include <queue>
#include <vector>
#include <string>
#include <iostream>

using namespace std;

const int dx[4] = {-1, 1, 0, 0};
const int dy[4] = {0, 0, -1, 1};

int n, m;
vector<string> grid;

bool isValid(int r, int c) {
    return (r >= 0 && r < n && c >= 0 && c < m && grid[r][c] != '#');
}

int bfsGrid(int start_r, int start_c, int target_r, int target_c) {
    vector<vector<int>> dist(n, vector<int>(m, -1));
    queue<pair<int, int>> q;

    q.push({start_r, start_c});
    dist[start_r][start_c] = 0;

    while (!q.empty()) {
        auto [r, c] = q.front();
        q.pop();

        if (r == target_r && c == target_c) {
            return dist[r][c];
        }

        for (int i = 0; i < 4; ++i) {
            int nr = r + dx[i];
            int nc = c + dy[i];

            if (isValid(nr, nc) && dist[nr][nc] == -1) {
                dist[nr][nc] = dist[r][c] + 1;
                q.push({nr, nc});
            }
        }
    }

    return -1; // Không có đường đi
}
```

---

## 5. Bảng so sánh DFS và BFS

| Tiêu chí | DFS (Depth-First) | BFS (Breadth-First) |
|:---|:---|:---|
| Cấu trúc dữ liệu | Ngăn xếp (`Stack` hoặc Đệ quy) | Hàng đợi (`std::queue`) |
| Độ phức tạp thời gian | $O(V + E)$ | $O(V + E)$ |
| Bộ nhớ | $O(\text{chiều cao cây})$ — rất tiết kiệm | $O(\text{chiều rộng lớn nhất})$ |
| Tìm đường ngắn nhất? | **Không** (chỉ tìm đường đi bất kỳ) | **Có** (đối với đồ thị trọng số 1) |
| Phù hợp nhất cho | Duyệt sâu, Tô-pô, Thành phần liên thông mạnh | Tìm đường ngắn nhất, tìm khoảng cách theo tầng |

---

## 6. Bài tập rèn luyện đề xuất

1. **CSES 1192 — Counting Rooms**: Đếm số phòng trong tòa nhà (Đếm thành phần liên thông trên lưới 2D bằng DFS).
2. **CSES 1193 — Labyrinth**: Tìm đường đi ngắn nhất và in ra lộ trình di chuyển (BFS + truy vết đường đi).
3. **CSES 1666 — Building Roads**: Tìm số lượng đường tối thiểu cần xây để kết nối toàn bộ thành phố (DFS + DSU).

Đã hiểu đường đi ngắn nhất không trọng số, hãy sẵn sàng bước sang bài toán nâng cao khi các con đường có độ dài khác nhau: [Thuật toán Dijkstra](/blog/2025-06-20-dijkstra-shortest-path)!
