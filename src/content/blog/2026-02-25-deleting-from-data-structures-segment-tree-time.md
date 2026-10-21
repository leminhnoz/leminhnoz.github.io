---
title: "Xóa phần tử khỏi cấu trúc dữ liệu trong O(T(n) log n): Kỹ thuật Segment Tree trên dòng thời gian"
description: "Khám phá kỹ thuật 'du hành thời gian' đỉnh cao biến cấu trúc dữ liệu chỉ hỗ trợ thêm phần tử (như DSU, Knapsack, Linear Basis) thành cấu trúc dữ liệu hỗ trợ xóa trong O(T(n) log n) offline nhờ Segment Tree kết hợp DSU Rollback."
pubDate: "2026-02-25"
tags: ["Data Structures", "Algorithms", "C++", "Competitive Programming"]
categories: ["Algorithms"]
excerpt: "Xóa một cạnh khỏi DSU hay rút một đồ vật khỏi Knapsack dường như là bất khả thi? Đừng tuyệt vọng! Hãy nhìn các truy vấn dưới góc độ dòng thời gian: chỉ với Segment Tree và ngăn xếp hoàn tác (Rollback), ta có thể xóa mọi thứ trong O(T(n) log n) mà không cần viết thuật toán xóa!"
---

> *"Trong thế giới cấu trúc dữ liệu, có những thứ thêm vào thì dễ như ăn kẹo, nhưng bảo xóa đi thì chẳng khác nào 'bắt nước chảy ngược':*  
> - ***DSU (Disjoint Set Union):** Thêm cạnh gộp hai tập hợp mất $O(\log N)$. Nhưng đố bạn xóa được một cạnh đã nối mà không phải xây lại toàn bộ đồ thị từ đầu!*  
> - ***Knapsack (Quy hoạch động Ba lô):** Thêm một món đồ mất $O(W)$. Nhưng rút một món đồ ra ngoài khi không có phép trừ thì phải tính lại cả bảng DP!*  
> - ***Linear Basis (Cơ sở tuyến tính XOR):** Thêm một vector mất $O(\log C)$, nhưng xóa một vector thì toàn bộ cơ sở bị đảo lộn.*  
>  
> *Đứng trước ngõ cụt đó, các cao thủ thuật toán đã phát minh ra một kỹ thuật được ví như **'Cỗ máy thời gian'**: Ta không cần học cách xóa phần tử! Chỉ cần dựng một **Segment Tree trên dòng thời gian** và kết hợp với **Ngăn xếp hoàn tác (Rollback)**, ta có thể giải quyết bài toán xóa phần tử trong $O(T(n) \log N)$ một cách thanh lịch đến ngỡ ngàng 💀."*

---

## 1. Trực giác: Đổi chiều không gian sang "Dòng thời gian"

Hãy tưởng tượng bạn đang xem một cuốn phim gồm $T$ khung hình (tương ứng với $T$ truy vấn từ thời điểm $0$ đến $T-1$).
Ở mỗi khung hình $t$, một trong 3 sự kiện xảy ra:
1. **Thêm phần tử $X$ vào hệ thống.**
2. **Xóa phần tử $X$ khỏi hệ thống.**
3. **Truy vấn:** "Trạng thái hiện tại của hệ thống như thế nào?" (Ví dụ: Đồ thị có bao nhiêu thành phần liên thông? Đỉnh $u$ và $v$ có nối với nhau không?)

### Khoảng sống (Lifespan) của một phần tử
Hãy thay đổi góc nhìn: Thay vì coi phần tử bị xóa đi, hãy coi mỗi phần tử có một **"tuổi thọ"** nhất định!
- Nếu phần tử $e$ được thêm vào ở thời điểm $t_{in}$ và bị xóa ở thời điểm $t_{out}$, thì phần tử $e$ **tồn tại liên tục** trong khoảng thời gian $[t_{in}, t_{out} - 1]$.
- Nếu phần tử $e$ được thêm vào ở thời điểm $t_{in}$ và không bao giờ bị xóa cho đến hết chương trình, nó tồn tại trong khoảng $[t_{in}, T - 1]$.

```text
Thời gian t:   0    1    2    3    4    5    6    7
Cạnh (u, v):        [======== tồn tại ========)
                    tin                       tout
```

Bây giờ, bài toán chuyển thành:  
> *"Tại mỗi thời điểm $t \in [0, T-1]$, hãy trả lời câu hỏi dựa trên TẤT CẢ các phần tử có khoảng sống bao trùm thời điểm $t$!"*

---

## 2. Segment Tree trên trục thời gian (Segment Tree over Time)

Nếu bạn đã quen với Segment Tree dùng để quản lý các đoạn mảng $[1 \dots N]$, thì ở đây, chúng ta dựng Segment Tree để **quản lý các mốc thời gian $[0 \dots T-1]$**:

- **Nút lá thứ $t$:** Đại diện cho thời điểm truy vấn thứ $t$.
- **Nút cha quản lý khoảng $[L, R]$:** Đại diện cho cả khoảng thời gian từ $L$ đến $R$.
- **Mỗi phần tử $e$ có khoảng sống $[t_{in}, t_{out} - 1]$:** Ta dùng hàm cập nhật đoạn (Range Update) quen thuộc để gán phần tử $e$ vào cây!
  - Khoảng sống $[t_{in}, t_{out} - 1]$ sẽ được phân rã thành tối đa **$O(\log T)$ nút** trên Segment Tree.
  - Tại mỗi nút trên cây, ta duy trì một danh sách (`vector`) lưu các phần tử bao trùm trọn vẹn khoảng thời gian của nút đó.

```text
Segment Tree thời gian [0..3]:
              [0..3]
             /      \
         [0..1]    [2..3]
         /    \    /    \
       [0]   [1]  [2]   [3]
```

Nếu một cạnh sống trong khoảng thời gian $[1, 3]$, nó sẽ được đặt vào nút lá $[1]$ và nút $[2..3]$. Tổng cộng chỉ nằm ở $O(\log T)$ nút!

---

## 3. Phép thuật DFS và Ngăn xếp hoàn tác (Rollback)

Bây giờ đến phần tinh hoa nhất của thuật toán: **Làm sao để trả lời câu hỏi tại các nút lá mà KHÔNG BAO GIỜ phải thực hiện phép xóa tùy ý?**

Ta duyệt cây Segment Tree bằng thuật toán **DFS (Duyệt theo chiều sâu)** đi từ gốc xuống lá:

1. **Khi đi vào (Enter) một nút $v$:**
   - Ta duyệt qua tất cả các phần tử được gán tại nút $v$.
   - Gọi thao tác `add(x)` để đưa từng phần tử vào cấu trúc dữ liệu.
   - **Ghi lại nhật ký:** Mỗi khi cấu trúc dữ liệu bị thay đổi, ta đẩy trạng thái cũ vào một **Ngăn xếp hoàn tác (Rollback Stack)**.
2. **Nếu chạm đến nút lá $[t, t]$:**
   - Lúc này, trên đường đi từ gốc xuống lá, tất cả các phần tử có khoảng sống bao trùm thời điểm $t$ đều đã được `add` vào cấu trúc dữ liệu!
   - Cấu trúc dữ liệu hiện tại phản ánh **CHÍNH XÁC 100% trạng thái tại thời điểm $t$**.
   - Ta chỉ việc tính toán và ghi lại đáp án cho truy vấn tại thời điểm $t$: `ans[t] = query()`.
3. **Khi rời khỏi (Exit/Backtrack) nút $v$:**
   - Trước khi quay ngược lên cha, ta phải dọn dẹp sạch sẽ những gì ta vừa thêm vào tại nút $v$!
   - Vì ta dùng **Ngăn xếp (Stack - LIFO)**, việc hoàn tác diễn ra theo thứ tự ngược lại hoàn toàn so với thứ tự thêm vào.
   - Thao tác `rollback()` khôi phục lại cấu trúc dữ liệu về trạng thái y hệt như trước khi bước vào nút $v$!

> **Mind Blown:**  
> Bạn có nhận ra điều kỳ diệu không?  
> Chúng ta **hoàn toàn không cần biết thuật toán xóa một phần tử**!  
> Thay vì "xóa một phần tử bất kỳ ở giữa", ta chỉ làm hai việc cực kỳ đơn giản:
> 1. `add(x)`: Thêm phần tử.
> 2. `rollback()`: Hủy bỏ thao tác vừa thêm gần nhất (Undo).

---

## 4. DSU with Rollbacks: Trái tim của bài toán Dynamic Connectivity

Bài toán kinh điển nhất ứng dụng kỹ thuật này là **Dynamic Connectivity (Đồ thị liên thông động)**:
- Thêm cạnh $(u, v)$.
- Xóa cạnh $(u, v)$.
- Hỏi số lượng thành phần liên thông tại thời điểm hiện tại.

### Cảnh báo chí mạng về DSU:
Thông thường khi code DSU, chúng ta dùng hai kỹ thuật tối ưu:
1. **Gộp theo kích thước/độ cao (Union by Rank / Size)**.
2. **Nén đường đi (Path Compression):** `p[v] = find_set(p[v])`.

> [!CAUTION]
> **TUYỆT ĐỐI KHÔNG DÙNG NÉN ĐƯỜNG ĐI KHI CẦN ROLLBACK!**  
> Vì nén đường đi làm thay đổi hàng loạt con trỏ cha của rất nhiều đỉnh trong một lần gọi `find_set`, khiến chi phí bộ nhớ để lưu lịch sử hoàn tác bị bùng nổ, phá vỡ tính chất rollback trong $O(1)$.

Ta **chỉ dùng Union by Rank**:
- Chiều cao cây luôn $\le \log_2 N$.
- Mỗi phép `find_set(v)` tốn thời gian đảm bảo $O(\log N)$ (Strict complexity, không phải Amortized).
- Mỗi phép `unite(u, v)` chỉ sửa đúng **hai biến**: cha của đỉnh (`p[v]`) và rank của đỉnh (`rnk[u]`).
- Việc `rollback()` chỉ tốn đúng $O(1)$: lấy từ Stack ra và trả lại giá trị ban đầu!

```cpp
struct DsuSave {
    int v, rnkv, u, rnku;
};

struct DsuWithRollbacks {
    vector<int> p, rnk;
    int comps; // Số lượng thành phần liên thông
    stack<DsuSave> op;

    DsuWithRollbacks(int n) : p(n), rnk(n, 0), comps(n) {
        for (int i = 0; i < n; i++) p[i] = i;
    }

    int find_set(int v) {
        return (v == p[v]) ? v : find_set(p[v]); // Không nén đường đi!
    }

    bool unite(int v, int u) {
        v = find_set(v);
        u = find_set(u);
        if (v == u) return false;
        if (rnk[v] > rnk[u]) swap(v, u);
        
        // Lưu lại trạng thái cũ vào ngăn xếp
        op.push({v, rnk[v], u, rnk[u]});
        
        p[v] = u;
        if (rnk[u] == rnk[v]) rnk[u]++;
        comps--;
        return true;
    }

    void rollback() {
        if (op.empty()) return;
        DsuSave x = op.top();
        op.pop();
        comps++;
        p[x.v] = x.v;
        rnk[x.v] = x.rnkv;
        p[x.u] = x.u;
        rnk[x.u] = x.rnku;
    }
};
```

---

## 5. Cài đặt toàn bộ khung giải thuật Segment Tree trên thời gian

Dưới đây là khung mẫu hoàn chỉnh giải bài toán Dynamic Connectivity:

```cpp
#include <vector>
#include <stack>
#include <algorithm>
#include <iostream>

using namespace std;

struct Query {
    int v, u;
    bool united; // Đánh dấu phép gộp có thực sự làm thay đổi DSU không
};

struct QueryTree {
    int T;
    vector<vector<Query>> tree;
    DsuWithRollbacks dsu;

    QueryTree(int T, int n) : T(T), tree(4 * T + 4), dsu(n) {}

    // Thêm một cạnh có khoảng sống [ul, ur] vào Segment Tree thời gian
    void add_to_tree(int v, int l, int r, int ul, int ur, const Query& q) {
        if (ul > ur) return;
        if (l == ul && r == ur) {
            tree[v].push_back(q);
            return;
        }
        int mid = (l + r) / 2;
        add_to_tree(2 * v, l, mid, ul, min(ur, mid), q);
        add_to_tree(2 * v + 1, mid + 1, r, max(ul, mid + 1), ur, q);
    }

    void add_edge(int u, int v, int start_time, int end_time) {
        Query q = {u, v, false};
        add_to_tree(1, 0, T - 1, start_time, end_time, q);
    }

    // Duyệt DFS trên cây thời gian
    void dfs(int v, int l, int r, vector<int>& ans) {
        // 1. Áp dụng tất cả các phần tử tại nút hiện tại
        for (Query& q : tree[v]) {
            q.united = dsu.unite(q.v, q.u);
        }

        // 2. Nếu là lá, ghi nhận kết quả tại thời điểm l
        if (l == r) {
            ans[l] = dsu.comps;
        } else {
            int mid = (l + r) / 2;
            dfs(2 * v, l, mid, ans);
            dfs(2 * v + 1, mid + 1, r, ans);
        }

        // 3. Rollback lại trạng thái trước khi rời khỏi nút (theo thứ tự ngược)
        for (int i = (int)tree[v].size() - 1; i >= 0; i--) {
            if (tree[v][i].united) {
                dsu.rollback();
            }
        }
    }

    vector<int> solve() {
        vector<int> ans(T);
        dfs(1, 0, T - 1, ans);
        return ans;
    }
};
```

---

## 6. Phân tích độ phức tạp

Giả sử mỗi thao tác thêm phần tử mất thời gian $O(T(n))$ và hoàn tác mất $O(T(n))$:
1. Mỗi phần tử chỉ sống trong một khoảng thời gian $[t_{in}, t_{out} - 1]$, do đó nó được chia vào tối đa **$2 \log_2 T$ nút** của Segment Tree.
2. Tại mỗi nút, phần tử được `add` đúng 1 lần khi DFS đi xuống và `rollback` đúng 1 lần khi DFS quay lui.
3. Tổng số lần gọi `add` và `rollback` trên toàn bộ cây là:
   $$O(Q \log T)$$
4. Do đó, tổng thời gian xử lý toàn bộ $Q$ truy vấn là:
   $$\text{Total Time} = O(Q \cdot T(n) \cdot \log T)$$

Với DSU có rollback ($T(n) = O(\log N)$):
$$\text{Total Time} = O(Q \log Q \log N)$$
Với $Q, N = 10^5$, thuật toán chạy êm ru trong vòng chưa tới $0.3$ giây!

---

## 7. Các ứng dụng biến hóa khôn lường

Kỹ thuật này là một **Meta-Algorithm** (thuật toán bao quát). Bất kỳ cấu trúc dữ liệu nào thỏa mãn:
- Hỗ trợ thêm phần tử trong $O(T(n))$.
- Có thể hoàn tác (Undo) theo thứ tự LIFO trong $O(T(n))$.

Đều có thể biến thành cấu trúc dữ liệu **hỗ trợ xóa phần tử**!

### 1. Offline Dynamic Knapsack (Ba lô động)
- Yêu cầu: Thêm đồ vật, xóa đồ vật, hỏi giá trị lớn nhất có thể đạt được với dung lượng $W$.
- Thêm đồ vật vào mảng DP một chiều: $dp[w] = \max(dp[w], dp[w - weight] + val)$ trong $O(W)$.
- Rollback: Lưu lại các ô $dp$ bị sửa đổi vào stack trong $O(W)$.
- Segment Tree trên thời gian giải quyết bài toán thêm/xóa đồ vật trong $O(Q \cdot W \log Q)$!

### 2. Offline Dynamic Linear Basis (Cơ sở tuyến tính XOR động)
- Yêu cầu: Thêm số nguyên, xóa số nguyên, hỏi giá trị XOR lớn nhất có thể tạo ra.
- Thêm số vào Basis mất $O(\text{Bits})$. Rollback mất $O(1)$.
- Giải quyết bài toán trong $O(Q \cdot \text{Bits} \log Q)$!

### 3. Kiểm tra đồ thị hai phía động (Dynamic Bipartite Checking)
- Dùng DSU mở rộng (DSU 2 màu với khoảng cách chẵn lẻ) kết hợp Rollback để kiểm tra xem đồ thị có xuất hiện chu trình lẻ hay không tại mỗi thời điểm.

---

## 8. Luyện tập thực chiến

1. **[Codeforces 100551A - Connect and Disconnect](https://codeforces.com/gym/100551/problem/A):** Đề bài chuẩn mực nhất cho Dynamic Connectivity.
2. **[Codeforces 981E - Addition on Segments](https://codeforces.com/contest/981/problem/E):** Ứng dụng Segment Tree thời gian với Knapsack/Bitset DP.
3. **[Codeforces 1140F - Extending Set of Points](https://codeforces.com/contest/1140/problem/F):** Bài toán duy trì số cặp điểm với DSU rollback.

---

## 9. Lời kết

Thay vì cố gắng bẻ gãy một cấu trúc dữ liệu để ép nó hỗ trợ phép xóa, các nhà khoa học máy tính đã lùi lại một bước, nhìn toàn bộ bài toán dưới dòng chảy của thời gian.

**Segment Tree trên thời gian + Rollback Stack** chính là minh chứng hùng hồn cho sức mạnh của tư duy Offline: *Biến điều không thể (Xóa phần tử) thành điều quen thuộc (Thêm và Hoàn tác)*. Đây là vũ khí tối thượng mà bất kỳ lập trình viên thi đấu nào muốn chinh phục các kỳ thi ICPC hay VNOI đều phải nằm lòng!
