---
title: "Thuật toán Aho-Corasick: Đỉnh Cao Khớp Mẫu Đa Chuỗi Trong Thời Gian Tuyến Tính"
description: "Khám phá toàn diện thuật toán Aho-Corasick: Từ cấu trúc Cây Trie cơ bản, liên kết hậu tố Suffix Links đến Ôtômat hữu hạn trạng thái (DFA). Tuyệt kỹ tìm kiếm đa từ khóa trong O(Text + Ans) và các bài toán quy hoạch động trên xâu mẫu."
pubDate: "2026-10-02"
tags: ["String", "Aho-Corasick", "Trie", "Automaton", "Algorithms", "Competitive Programming", "C++"]
categories: ["Algorithms"]
excerpt: "Nếu KMP được sinh ra để tìm 1 xâu mẫu trong văn bản, thì Aho-Corasick chính là phiên bản tối thượng giúp bạn tìm kiếm hàng ngàn từ khóa cùng một lúc trong thời gian tuyến tính O(|Text| + |Ans|). Khám phá cơ chế kết hợp giữa Trie và Automaton!"
---

> *"Hãy tưởng tượng bạn đang xây dựng một bộ lọc nội dung tự động cho mạng xã hội với $10.000$ từ khóa nhạy cảm, và bạn cần kiểm tra một bài viết dài $1.000.000$ ký tự.  
> Nếu sử dụng KMP hay Rabin-Karp lần lượt cho từng từ khóa, bạn sẽ mất $10.000 \times 1.000.000 = 10^{10}$ phép tính — máy chủ chắc chắn sẽ quá tải ngay lập tức!  
> Năm 1975, Alfred Aho và Margaret Corasick đã công bố một thuật toán huyền thoại mang tên chính họ: **Chỉ cần duyệt văn bản đúng một lần duy nhất**, tìm thấy toàn bộ mọi lần xuất hiện của tất cả $10.000$ từ khóa trong thời gian tuyến tính **$O(|Text| + |Ans|)$**!"*

---

## 1. Bản chất bài toán: Từ KMP đơn chuỗi đến Aho-Corasick đa chuỗi

Trong bài toán khớp mẫu đơn (Single-pattern Matching), thuật toán KMP xây dựng mảng tiền tố $\pi$ để khi gặp ký tự không khớp, ta "rút lui" thông minh về hậu tố thực sự dài nhất của đoạn đã khớp.

Trong bài toán khớp mẫu đa chuỗi (Multi-pattern Matching):
- Ta có một tập hợp $K$ chuỗi mẫu (từ điển) với tổng độ dài là $M$.
- Ta cần tìm tất cả các vị trí xuất hiện của bất kỳ chuỗi mẫu nào trong văn bản $T$ có độ dài $N$.

Để làm được điều này cho hàng ngàn chuỗi cùng lúc, ta cần hai thành phần cấu tạo:
1. **Cây tiền tố (Trie):** Gom toàn bộ tập từ điển vào một cây thống nhất để chia sẻ các tiền tố chung.
2. **Ôtômat hữu hạn trạng thái (Deterministic Finite Automaton - DFA):** Bổ sung các "đường hầm rút lui" gọi là **Suffix Links (Liên kết hậu tố)** tương tự như mảng $\pi$ của KMP, biến cây Trie thành một cỗ máy trạng thái hoàn hảo.

---

## 2. Nền tảng 1: Cây tiền tố (Trie)

Mỗi nút trên cây Trie đại diện cho một tiền tố của một hoặc nhiều từ trong từ điển.  
Gốc của cây (Root) tương ứng với chuỗi rỗng `""`.  
Mỗi cạnh đi xuống được gán một ký tự.

Các đỉnh kết thúc của mỗi từ khóa sẽ được đánh dấu bằng cờ `output = true` (hoặc lưu luôn chỉ số ID của từ khóa đó).

![Cây tiền tố Trie minh họa cho tập từ khóa Java, Rad, Rand, Rau, Raum, Rose](/images/aho-corasick-trie.png)

Ví dụ với tập từ khóa `{"Java", "Rad", "Rand", "Rau", "Raum", "Rose"}` như hình trên:
- Các đỉnh có hai vòng tròn lồng nhau chính là các đỉnh kết thúc (`output`).
- Đi từ gốc theo các cạnh chữ cái `R` $\to$ `a` $\to$ `n` $\to$ `d` sẽ dẫn tới đỉnh kết thúc đại diện cho từ `"Rand"`.

Thời gian xây dựng Trie cho tập từ điển có tổng độ dài $M$ chỉ mất $O(M \cdot \Sigma)$, trong đó $\Sigma$ là kích thước bảng chữ cái.

---

## 3. Nền tảng 2: Suffix Links và Ôtômat Aho-Corasick

Khi duyệt qua văn bản $T$, giả sử chúng ta đang đứng ở đỉnh $u$ trên cây Trie (đại diện cho chuỗi $S_u$). Ký tự tiếp theo trong văn bản là $c$.
- **Trường hợp 1:** Đỉnh $u$ có cạnh đi theo ký tự $c$. Ta chỉ việc bước xuống đỉnh con đó. Độ dài đoạn khớp tăng thêm $1$.
- **Trường hợp 2:** Đỉnh $u$ **không có** cạnh tương ứng với ký tự $c$. Khi này ta phải "rút lui" về đâu mà không phải quay lại từ đầu?

> **Khái niệm then chốt — Suffix Link (Liên kết hậu tố):**  
> Suffix Link của một đỉnh $u$ (ký hiệu là $\text{link}[u]$) là một con trỏ trỏ đến đỉnh $v$ trên Trie đại diện cho **hậu tố thực sự dài nhất của chuỗi $S_u$ có mặt trong Trie**.

### Quy tắc xác định Suffix Links:
1. Gốc (Root) và các con trực tiếp của Gốc: Suffix Link trỏ về chính Gốc ($0$).
2. Với mọi đỉnh $v$ khác: Giả sử $v$ được tạo ra từ cha $p$ qua cạnh mang ký tự $c$. Ta tìm Suffix Link của $v$ bằng cách:
   - Đi tới $\text{link}[p]$ (hậu tố dài nhất của cha).
   - Kiểm tra xem từ $\text{link}[p]$ có bước chuyển tiếp theo ký tự $c$ hay không.
   - Nếu có, đó chính là $\text{link}[v]$!
   - Nếu không, tiếp tục lần theo Suffix Link của nó cho tới khi tìm thấy hoặc về tới Gốc.

$$\text{link}[v] = \text{go}(\text{link}[p], c)$$

![Ôtômat Aho-Corasick với Suffix Links (mũi tên xanh dương) và Terminal Links (mũi tên xanh lá)](/images/aho-corasick-automaton.png)

### Giải thích các loại liên kết trong hình trên:
- **Mũi tên đen:** Cạnh chính trên cây Trie (chuyển trạng thái khi ký tự khớp tiếp theo).
- **Mũi tên xanh dương (Suffix Links):** Liên kết rút lui về hậu tố dài nhất còn khớp trong Trie. Ví dụ từ đỉnh `bca`, hậu tố dài nhất có trong Trie là `ca`, do đó suffix link trỏ tới `ca`.
- **Mũi tên xanh lá (Terminal Links / Exit Links):** Giúp nhảy nhanh đến đỉnh kết thúc gần nhất trên chuỗi Suffix Links!
  - Giả sử ta đang ở đỉnh `bca`. Dù bản thân `bca` là một từ, nhưng hậu tố của nó `ca` không phải là từ, nhưng hậu tố tiếp theo `a` lại là một từ khóa! Mũi tên xanh lá từ `bca` trỏ thẳng tới `a` giúp ta lập tức ghi nhận từ `"a"` cũng xuất hiện tại vị trí hiện tại mà không cần duyệt thủ công từng bước.

---

## 4. Thuật toán xây dựng bằng BFS (Breadth-First Search)

Phương pháp xây dựng toàn bộ Suffix Links và mảng chuyển trạng thái $\text{go}[u][c]$ chuẩn mực và phổ biến nhất trong Competitive Programming là duyệt theo chiều rộng (BFS):

1. Đưa Gốc vào hàng đợi. Thiết lập $\text{link}[\text{root}] = 0$.
2. Với các con trực tiếp $v$ của Gốc: $\text{link}[v] = 0$.
3. Duyệt BFS lần lượt từng đỉnh $u$:
   - Với mỗi ký tự $c \in [0 \dots \Sigma - 1]$:
     - Nếu $u$ có cạnh đi theo $c$ tới đỉnh con $v$:  
       Ta gán $\text{link}[v] = \text{go}[\text{link}[u]][c]$.  
       Đồng thời kế thừa thông tin kết thúc (Exit Link hoặc đếm số từ khớp). Sau đó đẩy $v$ vào queue.
     - Nếu $u$ **không có** cạnh đi theo $c$:  
       Ta gán thẳng bước chuyển hoàn chỉnh: $\text{go}[u][c] = \text{go}[\text{link}[u]][c]$.

Nhờ cách xây dựng BFS này, khi đứng ở đỉnh $u$ với ký tự $c$, ta **luôn luôn biết trước bước chuyển tiếp theo chỉ trong $O(1)$** mà không cần đệ quy lần mò!

---

## 5. Cài đặt C++ hoàn chỉnh và tối ưu

Dưới đây là template chuẩn của thuật toán Aho-Corasick sử dụng BFS:

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <queue>

using namespace std;

const int ALPHABET_SIZE = 26;

struct Vertex {
    int next_node[ALPHABET_SIZE]; // Cạnh thực tế trên cây Trie
    int go[ALPHABET_SIZE];        // Bước chuyển trạng thái trong Automaton
    int link = 0;                 // Suffix link
    int exit_link = 0;            // Nhảy tới đỉnh output gần nhất
    vector<int> pattern_ids;      // Danh sách id của các từ kết thúc tại đây

    Vertex() {
        fill(begin(next_node), end(next_node), -1);
        fill(begin(go), end(go), -1);
    }
};

class AhoCorasick {
public:
    vector<Vertex> t;

    AhoCorasick() {
        t.emplace_back(); // Tạo gốc (Root = 0)
    }

    // Thêm một từ khóa vào cây Trie
    void insert(const string& s, int id) {
        int v = 0;
        for (char ch : s) {
            int c = ch - 'a';
            if (t[v].next_node[c] == -1) {
                t[v].next_node[c] = t.size();
                t.emplace_back();
            }
            v = t[v].next_node[c];
        }
        t[v].pattern_ids.push_back(id);
    }

    // Xây dựng các liên kết Automaton bằng BFS
    void build() {
        queue<int> q;

        // Khởi tạo cho Gốc (0)
        for (int c = 0; c < ALPHABET_SIZE; c++) {
            if (t[0].next_node[c] != -1) {
                int child = t[0].next_node[c];
                t[0].go[c] = child;
                t[child].link = 0;
                q.push(child);
            } else {
                t[0].go[c] = 0;
            }
        }

        // Lan truyền BFS theo độ dài tăng dần
        while (!q.empty()) {
            int u = q.front();
            q.pop();

            // Cập nhật exit_link (nhảy nhanh đến đỉnh output gần nhất)
            int l = t[u].link;
            if (!t[l].pattern_ids.empty()) {
                t[u].exit_link = l;
            } else {
                t[u].exit_link = t[l].exit_link;
            }

            for (int c = 0; c < ALPHABET_SIZE; c++) {
                if (t[u].next_node[c] != -1) {
                    int child = t[u].next_node[c];
                    t[child].link = t[t[u].link].go[c];
                    t[u].go[c] = child;
                    q.push(child);
                } else {
                    t[u].go[c] = t[t[u].link].go[c];
                }
            }
        }
    }

    // Khớp mẫu trên văn bản Text
    void match(const string& text) {
        int v = 0;
        for (int i = 0; i < (int)text.size(); i++) {
            v = t[v].go[text[i] - 'a'];

            // Thu hoạch mọi mẫu kết thúc tại vị trí i
            int cur = v;
            while (cur > 0) {
                for (int id : t[cur].pattern_ids) {
                    cout << "Tu khoa #" << id 
                         << " ket thuc tai vi tri " << i << "\n";
                }
                cur = t[cur].exit_link;
            }
        }
    }
};
```

---

## 6. Các ứng dụng thực chiến kinh điển

### 6.1. Đếm số lần xuất hiện của tất cả các từ trong văn bản trong $O(|Text| + M)$
Nếu duyệt qua từng `exit_link` như hàm `match` ở trên, khi có rất nhiều từ trùng lặp lồng nhau (ví dụ: `a`, `aa`, `aaa`, `aaaa`), số lần nhảy có thể lên đến $O(|Text| \cdot \sqrt{M})$.

**Tuyệt chiêu tối ưu bằng Cây liên kết hậu tố (Suffix Link Tree):**
1. Duyệt qua văn bản $T$, tại mỗi bước di chuyển tới trạng thái $v$, ta chỉ đơn giản tăng biến đếm `cnt[v]++`.
2. Quan sát: Các cạnh Suffix Link thực chất tạo thành một cây có gốc là $0$ hướng từ con về cha. Nếu một chuỗi kết thúc tại $u$ xuất hiện, thì toàn bộ các hậu tố của nó (nằm trên đường đi của Suffix Link về gốc) cũng xuất hiện!
3. Ta chỉ cần duyệt topo ngược từ các lá về gốc của cây Suffix Link (bằng cách duyệt mảng các đỉnh theo thứ tự giảm dần của độ dài / thứ tự BFS ngược):
   $$\text{cnt}[\text{link}[u]] += \text{cnt}[u]$$
4. Sau bước cộng dồn này, số lần xuất hiện của từ khóa thứ $k$ chính là $\text{cnt}[\text{node}_k]$. Toàn bộ quá trình chỉ mất **$O(|Text| + M)$**!

---

### 6.2. Tìm xâu có độ dài $L$ nhỏ nhất theo thứ tự từ điển không chứa bất kỳ từ cấm nào
- Xây dựng Ôtômat Aho-Corasick từ tập các từ cấm.
- Đánh dấu tất cả các đỉnh "nguy hiểm": Đỉnh có `pattern_ids` không rỗng, hoặc đỉnh có `exit_link` dẫn tới một đỉnh nguy hiểm.
- Xem đồ thị Ôtômat như một đồ thị có hướng (loại bỏ toàn bộ các đỉnh nguy hiểm).
- Tìm đường đi có độ dài $L$ xuất phát từ Gốc $0$ sao cho thứ tự các ký tự trên cạnh là nhỏ nhất theo từ điển (dùng BFS / Dijkstra hoặc DFS có thứ tự).

---

### 6.3. Quy hoạch động trên Ôtômat (DP on Automaton)
Đây là dạng bài "đặc sản" xuất hiện rất nhiều trong các kỳ thi học sinh giỏi quốc gia và Codeforces Div 1:

> **Bài toán:** Có bao nhiêu xâu độ dài $L$ chỉ gồm các chữ cái thường sao cho nó chứa ít nhất một từ khóa trong từ điển?

**Mô hình hóa DP:**
- Gọi $DP(i, u)$ là số lượng chuỗi độ dài $i$ sao cho sau khi nạp $i$ ký tự vào Automaton, ta đang đứng tại trạng thái $u$.
- Trạng thái bắt đầu: $DP(0, 0) = 1$.
- Công thức chuyển trạng thái với mỗi ký tự $c \in ['a' \dots 'z']$:
  $$v = \text{go}[u][c]$$
  $$DP(i + 1, v) = (DP(i + 1, v) + DP(i, u)) \pmod{MOD}$$
- Nếu bài toán yêu cầu **không được chứa** từ cấm: Ta chỉ chuyển sang $v$ nếu $v$ không phải là trạng thái nguy hiểm.
- Nếu $L$ rất lớn ($L \le 10^{18}$): Ôtômat có số lượng trạng thái nhỏ ($V \le 200$), ta có thể dựng **Ma trận chuyển trạng thái** và dùng **Nhân ma trận nhị phân (Matrix Exponentiation)** để giải trong $O(V^3 \log L)$!

---

## 7. Tổng kết: Bức tranh toàn cảnh về khớp mẫu chuỗi

| Thuật toán | Số lượng mẫu ($K$) | Tiền xử lý | Thời gian tìm kiếm | Bản chất cốt lõi |
| :--- | :---: | :---: | :---: | :--- |
| **KMP** | $1$ | $O(M)$ | $O(N)$ | Mảng tiền tố $\pi$, rút lui trên chuỗi đơn |
| **Z-Algorithm** | $1$ | $O(M)$ | $O(N)$ | Đoạn gương $Z$-box $[l, r]$ |
| **Rabin-Karp** | $1$ hoặc nhiều | $O(M)$ | $O(N + \text{Ans})$ | Rolling Hash (có xác suất va chạm) |
| **Suffix Array** | Mọi xâu con | $O(N \log N)$ | $O(M \log N)$ | Sắp xếp toàn bộ hậu tố của văn bản |
| **Aho-Corasick** | Hàng ngàn mẫu ($K \ge 1$) | $O(M \cdot \Sigma)$ | $O(N + \text{Ans})$ | Trie + Suffix Link Automaton (tất định, tuyến tính) |

Aho-Corasick là sự kết tinh hoàn mỹ giữa cấu trúc dữ liệu cây và lý thuyết ôtômat hữu hạn trạng thái. Nắm vững thuật toán này không chỉ giúp bạn giải quyết gọn gàng các bài toán tìm kiếm từ khóa mà còn mở ra cánh cửa chinh phục các bài toán Quy hoạch động trên xâu mẫu đỉnh cao!

---

## 8. Bài tập rèn luyện (Practice Problems)

- [Codeforces 963D - Frequency of String](https://codeforces.com/problemset/problem/963/D)
- [Codeforces 1400F - x-prime Substrings](https://codeforces.com/problemset/problem/1400/F)
- [UVA 10679 - I Love Strings!!](https://uva.onlinejudge.org/index.php?option=onlinejudge&page=show_problem&problem=1620)
- [UVA 11590 - Prefix Lookup](https://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=2637)
- [CodeChef - TWOSTRS](https://www.codechef.com/MAY20A/problems/TWOSTRS)
- [CSES - Word Combinations](https://cses.fi/problemset/task/1731)
