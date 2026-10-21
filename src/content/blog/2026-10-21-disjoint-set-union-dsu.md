---
title: "Disjoint Set Union (DSU): Cấu trúc dữ liệu 'kết bạn' thần thánh với tốc độ O(α(n))"
description: "Làm chủ cấu trúc dữ liệu DSU (Disjoint Set Union / Union-Find) từ con số 0. Đi từ mô hình bang hội kết nạp đệ tử, tối ưu nén đường đi (Path Compression), gộp theo kích thước (Union by size) đến thuật toán Kruskal và kiểm tra đồ thị hai phía."
pubDate: "2026-10-21"
tags: ["Data Structures", "Algorithms", "C++", "Competitive Programming"]
categories: ["Algorithms"]
excerpt: "Một thuật toán chạy nhanh đến mức với mọi số lượng dữ liệu trong vũ trụ, thời gian mỗi truy vấn không bao giờ vượt quá 4 phép tính! Khám phá DSU - cấu trúc dữ liệu thú vị nhất bạn từng học."
---

> *"Hãy tưởng tượng một thế giới kiếm hiệp nơi mỗi người sinh ra đều tự lập cho mình một môn phái riêng. Khi hai người bạn bắt tay nhau, hai môn phái sẽ sáp nhập lại làm một. Bất kỳ lúc nào, bạn chỉ cần hỏi hai người bất kỳ: 'Hai người có cùng một bang phái hay không?' — và nhận được câu trả lời chỉ trong chưa đầy 4 nhịp xung nhịp CPU!"*

Đó chính là mô hình hoạt động của **Disjoint Set Union (DSU)** — hay còn gọi là **Union-Find**.

DSU là một trong những cấu trúc dữ liệu được yêu thích nhất trong thế giới lập trình thi đấu:
- Code cực kỳ ngắn (chỉ khoảng 15–20 dòng).
- Trực giác vô cùng tự nhiên và sinh động.
- Tốc độ chạy đạt mức **$O(\alpha(n))$** — một độ phức tạp tăng chậm đến mức trong mọi bài toán thực tế, nó tương đương với **$O(1)$**!

Hôm nay, hãy cùng mình đi từ những ngày đầu bỡ ngỡ đến khi làm chủ hoàn toàn vũ khí siêu hạng này nhé!

---

## 1. DSU giải quyết bài toán gì?

DSU quản lý một tập hợp các phần tử được chia thành các **nhóm (tập hợp) rời nhau**. Cấu trúc này chỉ cần hỗ trợ 3 thao tác cơ bản:

1. **`make_set(v)`:** Khởi tạo một phần tử $v$ mới toanh, tự nó tạo thành một nhóm riêng lẻ có kích thước là $1$.
2. **`find_set(v)`:** Tìm và trả về **người đại diện (bang chủ / leader)** của nhóm chứa phần tử $v$. Nếu hai người có cùng bang chủ, họ chắc chắn thuộc cùng một nhóm!
3. **`union_sets(a, b)`:** Sáp nhập nhóm chứa $a$ và nhóm chứa $b$ lại thành một nhóm duy nhất.

```
Ban đầu:     (1)   (2)   (3)   (4)
Sau union:   (1 - 2)     (3 - 4)
Sau cùng:    (1 - 2 - 3 - 4) -> Tất cả chung một mái nhà!
```

![Mô hình các cây trong DSU](/images/dsu-forest.png)

---

## 2. Cách tiếp cận ngây thơ: Cây gia phả (Và cái bẫy chết người)

Để quản lý nhóm, cách tự nhiên nhất là biểu diễn mỗi nhóm dưới dạng **một cái cây**:
- Mỗi phần tử sẽ có một con trỏ `parent[v]` trỏ về cha của nó.
- **Gốc của cây (Root)** chính là người đại diện tối cao của nhóm. Đặc điểm nhận dạng gốc: `parent[root] == root` (nó tự trỏ vào chính nó).

### Code sơ khai:
```cpp
const int MAXN = 100005;
int parent[MAXN];

void make_set(int v) {
    parent[v] = v; // Tự mình làm cha của chính mình
}

int find_set(int v) {
    if (v == parent[v]) return v;
    return find_set(parent[v]); // Leo ngược lên cha cho đến khi gặp gốc
}

void union_sets(int a, int b) {
    a = find_set(a);
    b = find_set(b);
    if (a != b) {
        parent[b] = a; // Cho bang chủ b nhận bang chủ a làm sếp
    }
}
```

### Cái bẫy chết người: "Cây tre trăm đốt"
Nếu ta cứ nối bừa bãi: $1$ nối vào $2$, $2$ nối vào $3$, $3$ nối vào $4 \dots$, cây sẽ bị thoái hóa thành một **sợi dây xích dài ngoằng** độ sâu $O(N)$!  
Mỗi lần gọi `find_set` ở đáy, máy tính phải còng lưng leo qua $10^5$ nút $\implies$ Mất $O(N)$ thời gian, ăn ngay TLE.

Làm sao để cây luôn nông và phẳng? Hai vị cứu tinh xuất hiện!

---

## 3. Tối ưu 1: Nén đường đi (Path Compression) - Tuyệt kỹ nối tắt

Hãy quan sát: Khi bạn gọi `find_set(7)`, bạn phải đi qua $7 \to 5 \to 3 \to 2 \to 1$ để biết bang chủ tối cao là số $1$.

Vậy tại sao sau khi biết bang chủ là $1$ rồi, ta không **cắm luôn một đường dây nóng trực tiếp từ $7, 5, 3$ thẳng vào $1$**?

![Nén đường đi trong DSU](/images/dsu-path-compression.png)

Sau cú gọi này, cây từ một cành cao ngoằng bỗng chốc phẳng lì như một chiếc quạt xòe! Lần sau khi hỏi lại `find_set(7)` hay `find_set(5)`, bạn chỉ mất đúng **1 bước** là chạm tới gốc!

### Cài đặt chỉ với đúng 1 dòng code thần thánh:
```cpp
int find_set(int v) {
    if (v == parent[v]) return v;
    return parent[v] = find_set(parent[v]); // Vừa tìm vừa gán lại cha!
}
```

Chỉ một phép gán `parent[v] = ...`, độ phức tạp trung bình của mỗi thao tác đã giảm ngoạn mục từ $O(N)$ xuống còn **$O(\log N)$**!

---

## 4. Tối ưu 2: Gộp theo kích thước / Thứ hạng (Union by Size / Rank)

Ở hàm `union_sets`, ta không nên nối bừa bãi kẻ nào vào kẻ nào. Hãy áp dụng triết lý thực tế: **Bang phái nhỏ hơn phải sáp nhập vào bang phái lớn hơn!**

- Ta duy trì mảng `size[v]` lưu số lượng thành viên trong cây có gốc là $v$.
- Khi gộp hai cây $a$ và $b$:
  - Nếu `size[a] < size[b]`, ta tráo đổi để đảm bảo cây $a$ luôn đông dân hơn.
  - Sau đó gán `parent[b] = a` (gắn cây bé $b$ làm con của cây lớn $a$).
  - Cập nhật dân số: `size[a] += size[b]`.

```cpp
int parent[MAXN];
int sz[MAXN];

void make_set(int v) {
    parent[v] = v;
    sz[v] = 1; // Ban đầu mỗi bang có 1 người
}

void union_sets(int a, int b) {
    a = find_set(a);
    b = find_set(b);
    if (a != b) {
        if (sz[a] < sz[b]) std::swap(a, b); // a luôn là bang lớn hơn
        parent[b] = a;
        sz[a] += sz[b];
    }
}
```

---

## 5. Khi hai tinh hoa hội tụ: Độ phức tạp $O(\alpha(n))$ vi diệu

Chuyện gì sẽ xảy ra nếu ta **kết hợp cả Nén đường đi VÀ Gộp theo kích thước**?

Nhà khoa học máy tính huyền thoại Robert Tarjan đã chứng minh: Thời gian trung bình của mỗi thao tác trong DSU lúc này là:
$$O(\alpha(n))$$

Trong đó $\alpha(n)$ là **hàm nghịch đảo Ackermann (Inverse Ackermann Function)**. Đây là một trong những hàm số kỳ dị nhất của toán học: nó tăng chậm đến mức không thể tưởng tượng nổi!

$$\alpha(10^{600}) \le 4$$

Số lượng nguyên tử trong toàn bộ vũ trụ quan sát được chỉ rơi vào khoảng $10^{80}$. Con số $10^{600}$ đã vượt xa mọi giới hạn vật lý!  
Điều đó có nghĩa là: **Trong mọi bài toán lập trình trên Trái Đất, $\alpha(n)$ không bao giờ vượt quá $4$.**

Nói cách khác: **DSU chạy nhanh như $O(1)$!**

---

## 6. Code C++ mẫu dạng Struct hoàn chỉnh

```cpp
#include <vector>
#include <numeric>

struct DSU {
    std::vector<int> parent;
    std::vector<int> sz;

    DSU(int n) {
        parent.resize(n + 1);
        std::iota(parent.begin(), parent.end(), 0); // parent[i] = i
        sz.assign(n + 1, 1);
    }

    int find(int v) {
        if (v == parent[v]) return v;
        return parent[v] = find(parent[v]); // Path compression
    }

    bool unite(int a, int b) {
        a = find(a);
        b = find(b);
        if (a == b) return false; // Đã cùng nhóm từ trước
        
        if (sz[a] < sz[b]) std::swap(a, b); // Union by size
        parent[b] = a;
        sz[a] += sz[b];
        return true; // Gộp thành công
    }

    bool same(int a, int b) {
        return find(a) == find(b);
    }

    int size(int v) {
        return sz[find(v)];
    }
};
```

---

## 7. Những ứng dụng đỉnh cao của DSU

Đừng tưởng DSU chỉ để kiểm tra "hai đứa có quen nhau không". Trong thi đấu, nó có thể biến hình thành những vũ khí cực kỳ lợi hại:

### 1. Thuật toán Kruskal tìm cây khung nhỏ nhất (MST)
Thuật toán Kruskal sắp xếp tất cả các cạnh theo trọng số tăng dần, sau đó duyệt qua từng cạnh:
- Dùng DSU kiểm tra: Nếu 2 đỉnh của cạnh đã thuộc cùng một thành phần liên thông $\to$ Bỏ qua (để tránh tạo chu trình).
- Nếu khác thành phần liên thông $\to$ Nối chúng lại bằng `unite(u, v)`.  
Nhờ DSU, thuật toán Kruskal chạy cực nhanh trong $O(M \log M)$!

### 2. Kỹ thuật tô màu đoạn thẳng Offline (Painting subarrays)
Cho $M$ thao tác tô màu đoạn $[L, R]$ bằng màu $C$. Ta xử lý ngược từ truy vấn cuối cùng về đầu tiên:
- Dùng DSU quản lý: `parent[i]` trỏ tới **ô tiếp theo chưa được tô màu**.
- Khi một ô đã được tô, ta chỉ cần gán `parent[i] = i + 1`. Nhờ đó, thuật toán sẽ "nhảy cóc" qua toàn bộ các ô đã tô màu mà không cần duyệt lại!

### 3. Kiểm tra đồ thị hai phía Online (Bipartite Graph Checking)
Ta lưu thêm tính chẵn lẻ của độ dài khoảng cách từ mỗi đỉnh tới gốc bằng phép XOR (`^ 1`). Mỗi khi thêm một cạnh $(u, v)$:
- Nếu $u$ và $v$ đã cùng nhóm và có khoảng cách cùng tính chẵn lẻ tới gốc $\implies$ Xuất hiện chu trình có độ dài lẻ $\implies$ Đồ thị không còn là đồ thị hai phía!

---

## 8. Bảng tổng kết

| Thuật toán | Độ phức tạp mỗi truy vấn | Đánh giá |
| :--- | :--- | :--- |
| **Ngây thơ (Không tối ưu)** | $O(N)$ | Dễ bị suy biến thành cây xích, dễ TLE. |
| **Chỉ dùng Nén đường đi** | $O(\log N)$ | Code 1 dòng, rất dễ nhớ. |
| **Chỉ dùng Gộp theo kích thước** | $O(\log N)$ | Đảm bảo độ sâu cây $\le \log_2 N$. |
| **Kết hợp cả hai (Chuẩn mực)** | **$O(\alpha(N)) \approx O(1)$** | **Tiêu chuẩn vàng trong Competitive Programming.** |

---

## 9. Bài tập thực hành có link trực tiếp

Hãy luyện tập ngay để nhuần nhuyễn phản xạ cài đặt DSU:

1. [Codeforces 25D - Roads not only in Berland](http://codeforces.com/contest/25/problem/D): Bài toán kinh điển ứng dụng DSU tìm cạnh thừa và xây dựng cầu kết nối các thành phần.
2. [SPOJ - COLORFUL ARRAY](https://www.spoj.com/problems/CLFLARR/): Bài toán tô màu đoạn thẳng ứng dụng kỹ thuật nhảy cóc DSU.
3. [TIMUS 1671 - Anansi's Cobweb](http://acm.timus.ru/problem.aspx?space=1&num=1671): Bài toán phá mạng nhện đảo ngược thời gian (xử lý truy vấn Offline).

---

## Lời kết

DSU là một trong những minh chứng đẹp đẽ nhất cho câu nói: *"Đôi khi ý tưởng đơn giản nhất lại là ý tưởng mạnh mẽ nhất"*. Chỉ với một mảng `parent` và một dòng đệ quy nén đường đi, bạn đã nắm trong tay một cấu trúc dữ liệu có tốc độ tiệm cận sự tức thời. Chúc các bạn code mượt mà và chinh phục thật nhiều bài toán đồ thị thú vị!
