---
title: "Cây Hậu Tố (Suffix Tree) và Thuật Toán Ukkonen: Kỳ Quan Tuyến Tính O(N) Online"
description: "Giải mã Suffix Tree và thuật toán huyền thoại Ukkonen xây dựng cây hậu tố trong thời gian O(N) tuyến tính online. Phân tích trực quan Active Point, Suffix Links, 3 quy tắc mở rộng và mẹo biên lá toàn cục."
pubDate: "2026-10-12"
tags: ["String", "Suffix Tree", "Ukkonen", "Algorithms", "Competitive Programming", "C++"]
categories: ["Algorithms"]
excerpt: "Được giáo sư Dan Gusfield mệnh danh là 'con dao Thụy Sĩ' của xử lý chuỗi, Suffix Tree có thể giải quyết hầu hết mọi bài toán xâu con trong thời gian kỷ lục. Khám phá thuật toán Ukkonen - tuyệt tác online O(N) biến những điều phức tạp trở nên thanh thoát!"
---

> *"Trong cuốn sách kinh điển 'Algorithms on Strings, Trees, and Sequences', Giáo sư Dan Gusfield đã từng gọi **Cây Hậu Tố (Suffix Tree)** là 'con dao Thụy Sĩ' (Swiss Army knife) vĩ đại nhất của lĩnh vực xử lý chuỗi.  
> Mọi bài toán hóc búa nhất: từ tìm kiếm xâu con, đếm số chuỗi con phân biệt, tìm chuỗi lặp lại dài nhất, đến tìm xâu con chung của hàng chục văn bản sinh học ADN... đều có thể được giải quyết triệt để trên Suffix Tree trong thời gian tuyến tính!  
> Trước năm 1995, việc xây dựng Suffix Tree trong $O(N)$ là một thử thách toán học cực kỳ nặng nề (thuật toán Weiner 1973, McCreight 1976 phải duyệt ngược từ phải sang trái). Cho đến khi **Esko Ukkonen** công bố thuật toán của mình: **Xây dựng Suffix Tree trực tuyến (Online), duyệt từ trái sang phải, vừa mượt mà vừa đạt độ phức tạp $O(N)$ tuyệt đối!**"*

---

## 1. Cây Hậu Tố (Suffix Tree) là gì?

Nếu bạn đã quen thuộc với [Cây Trie (Cây tiền tố)](/blog/2026-10-02-aho-corasick-algorithm): một cây Trie lưu trữ tất cả các hậu tố của một chuỗi $S$ có độ dài $N$ sẽ có $O(N^2)$ nút trong trường hợp xấu nhất (ví dụ với chuỗi `aaaaa`).

**Suffix Tree (Cây Hậu Tố)** thực chất là một **Cây Trie nén (Compressed Trie)** chứa toàn bộ các hậu tố của chuỗi $S$:
1. Mọi đường đi đơn từ một nút chỉ có một con sẽ được gộp lại thành một cạnh duy nhất.
2. Trên mỗi cạnh của cây, thay vì lưu toàn bộ chuỗi ký tự dài dòng, ta chỉ lưu một cặp chỉ số $[l, r)$ đại diện cho đoạn con $S[l \dots r - 1]$.
3. Mỗi nút phân nhánh đều có ít nhất $2$ nút con.

> **Định lý số lượng nút:**  
> Vì cây có đúng $N$ lá (tương ứng với $N$ hậu tố) và mỗi nút trong (internal node) đều có ít nhất $2$ con, nên một Cây Hậu Tố có **tối đa $2N$ nút và $2N - 1$ cạnh**!  
> Điều này đảm bảo bộ nhớ của Suffix Tree luôn là **tuyến tính $O(N)$**.

### Ký tự kết thúc đặc biệt `$`
Để đảm bảo **không có hậu tố nào là tiền tố của một hậu tố khác** (điều này có thể khiến một hậu tố bị 'chìm' vào giữa thân cây mà không kết thúc ở một nút lá riêng), ta luôn thêm một ký tự kết thúc đặc biệt (thường là `$`) vào cuối chuỗi $S$. Ký tự này không xuất hiện ở bất kỳ đâu trong chuỗi gốc.

Ví dụ với chuỗi `s = "abc$"`:
- Hậu tố `abc$` kết thúc ở lá 1.
- Hậu tố `bc$` kết thúc ở lá 2.
- Hậu tố `c$` kết thúc ở lá 3.
- Hậu tố `$` kết thúc ở lá 4.

---

## 2. Ý tưởng lớn của Thuật toán Ukkonen

Thuật toán Ukkonen là một thuật toán **Online (trực tuyến)**:  
Ta duyệt chuỗi $S$ từ trái sang phải, ký tự theo từng ký tự:
$$S[0] \implies S[0 \dots 1] \implies S[0 \dots 2] \implies \dots \implies S[0 \dots N - 1]$$

Tại bước thứ $i$ (khi thêm ký tự $S[i]$): Ta biến đổi cây hiện tại (đang biểu diễn mọi hậu tố của tiền tố $S[0 \dots i-1]$) thành cây mới biểu diễn mọi hậu tố của tiền tố $S[0 \dots i]$.

Một cách ngây thơ, ở bước $i$, ta phải chèn $i + 1$ hậu tố mới:
- $S[0 \dots i]$
- $S[1 \dots i]$
- $S[2 \dots i]$
- $\dots$
- $S[i \dots i]$

Nếu làm ngây thơ, ta sẽ mất $O(N^2)$ hoặc $O(N^3)$. Ukkonen đã sử dụng **3 bảo bối tối thượng** để giảm toàn bộ thời gian xuống chỉ còn **$O(N)$**!

---

## 3. Ba "Bảo Bối" làm nên độ phức tạp Tuyến tính $O(N)$

### Bảo bối 1: Cạnh lá tự động dài ra (Global End Pointer)

Hãy quan sát: Một khi một nút lá được tạo ra, cạnh dẫn tới lá đó sẽ đại diện cho một hậu tố kéo dài đến tận cùng của chuỗi hiện tại.  
Thay vì lưu cận phải $r$ của cạnh lá là một số cố định, ta gán cận phải của tất cả các cạnh lá trỏ tới **một biến toàn cục duy nhất `global_end`**!

*(Cạnh dẫn tới lá: $[l, \text{global\_end}]$)*

Khi ta xét ký tự tiếp theo $S[i]$:  
Ta chỉ cần thực hiện đúng một phép gán:
$$\text{global\_end} = i + 1$$
**Ngay lập tức, tất cả hàng ngàn nút lá hiện có trong cây đều tự động được kéo dài thêm ký tự $S[i]$ trong thời gian $O(1)$!**  
Phép màu này giải quyết toàn bộ các trường hợp mở rộng lá mà không tốn một chút chi phí nào!

---

### Bảo bối 2: Điểm hoạt động (Active Point)

Trong khi duyệt, ta không quay lại gốc để tìm kiếm từ đầu, mà duy trì một con trỏ gọi là **Active Point** đại diện cho vị trí hiện tại đang đứng trong cây:
$$\text{Active Point} = (\text{active\_node}, \text{active\_edge}, \text{active\_length})$$

- `active_node`: Nút gốc hoặc nút trong gần nhất mà ta đang đứng.
- `active_edge`: Ký tự đầu tiên xác định cạnh mà ta đang di chuyển dọc theo.
- `active_length`: Ta đã đi sâu vào trong cạnh đó được bao nhiêu ký tự.

---

### Bảo bối 3: Suffix Links trên các nút trong

Tương tự như liên kết hậu tố trong KMP và Aho-Corasick:  
Nếu một nút trong $u$ đại diện cho chuỗi $x\alpha$ (với $x$ là ký tự đơn, $\alpha$ là một chuỗi), thì **Suffix Link** của $u$ sẽ trỏ tới nút $v$ đại diện cho chuỗi $\alpha$.

Khi ta phải tách một cạnh để tạo nút mới tại vị trí tương ứng với $x\alpha$, ở bước chèn hậu tố tiếp theo (ngắn hơn $1$ ký tự là $\alpha$), ta không cần đi lại từ gốc mà chỉ việc **nhảy theo Suffix Link** sang nút $v$ trong $O(1)$!

---

## 4. Ba quy tắc mở rộng (Suffix Extension Rules)

Khi đứng tại Active Point và muốn thêm ký tự tiếp theo $S[i]$:

1. **Quy tắc 1 (Mở rộng lá):** Đường đi kết thúc tại một nút lá. Nhờ biến `global_end`, quy tắc này tự động thỏa mãn trong $O(1)$.
2. **Quy tắc 2 (Tách cạnh & tạo lá mới):**  
   Đường đi dừng lại ở giữa một cạnh, và ký tự tiếp theo trên cạnh đó **khác** với $S[i]$.  
   $\implies$ Ta cắt đôi cạnh này ra, chèn vào một nút trung gian mới, và từ nút trung gian đó mọc ra một nhánh lá mới mang ký tự $S[i]$.
3. **Quy tắc 3 (Ký tự đã tồn tại - Showstopper):**  
   Ký tự tiếp theo trên cạnh đúng bằng ký tự $S[i]$!  
   $\implies$ Chuỗi hậu tố cần chèn **đã có sẵn trong cây**! Ta không cần chèn thêm gì cả, chỉ việc tăng `active_length++` và **dừng ngay bước lặp hiện tại lại**.  
   Bởi vì nếu hậu tố này đã tồn tại, thì mọi hậu tố ngắn hơn sau nó chắc chắn cũng đã tồn tại sẵn trong cây!

---

## 5. Cài đặt C++ của Thuật toán Ukkonen

Dưới đây là mã nguồn C++ chuẩn hóa thuật toán Ukkonen với cấu trúc rõ ràng:

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <map>

using namespace std;

const int MAXN = 200005;

struct Node {
    int l, r, par, link;
    map<char, int> next_node;

    Node(int l = 0, int r = 0, int par = -1) 
        : l(l), r(r), par(par), link(-1) {}

    int len() const { return r - l; }

    int& get(char c) {
        if (!next_node.count(c)) next_node[c] = -1;
        return next_node[c];
    }
};

string s;
int n;
Node t[MAXN * 2];
int sz = 1;

struct State {
    int v, pos;
    State(int v, int pos) : v(v), pos(pos) {}
};

State ptr(0, 0);

// Di chuyển trạng thái theo đoạn chuỗi s[l ... r - 1]
State go(State st, int l, int r) {
    while (l < r) {
        if (st.pos == t[st.v].len()) {
            st = State(t[st.v].get(s[l]), 0);
            if (st.v == -1) return st;
        } else {
            if (s[t[st.v].l + st.pos] != s[l]) return State(-1, -1);
            if (r - l < t[st.v].len() - st.pos) return State(st.v, st.pos + r - l);
            l += t[st.v].len() - st.pos;
            st.pos = t[st.v].len();
        }
    }
    return st;
}

// Tách cạnh tại vị trí st và trả về chỉ số nút mới
int split(State st) {
    if (st.pos == t[st.v].len()) return st.v;
    if (st.pos == 0) return t[st.v].par;

    Node v = t[st.v];
    int id = sz++;
    t[id] = Node(v.l, v.l + st.pos, v.par);
    t[v.par].get(s[v.l]) = id;
    t[id].get(s[v.l + st.pos]) = st.v;
    t[st.v].par = id;
    t[st.v].l += st.pos;
    return id;
}

// Lấy suffix link của đỉnh v
int get_link(int v) {
    if (t[v].link != -1) return t[v].link;
    if (t[v].par == -1) return 0;
    int to = get_link(t[v].par);
    return t[v].link = split(go(State(to, t[to].len()), t[v].l + (t[v].par == 0), t[v].r));
}

// Mở rộng cây với ký tự tại vị trí pos
void tree_extend(int pos) {
    while (true) {
        State nptr = go(ptr, pos, pos + 1);
        if (nptr.v != -1) {
            ptr = nptr;
            return; // Quy tắc 3: Đã tồn tại, dừng bước lặp
        }

        int mid = split(ptr);
        int leaf = sz++;
        t[leaf] = Node(pos, n, mid);
        t[mid].get(s[pos]) = leaf; // Quy tắc 2: Tách cạnh và tạo lá mới

        ptr.v = get_link(mid);
        ptr.pos = t[ptr.v].len();
        if (!mid) break;
    }
}

// Xây dựng Suffix Tree cho chuỗi s
void build_tree() {
    sz = 1;
    t[0] = Node(0, 0, -1);
    for (int i = 0; i < n; ++i) {
        tree_extend(i);
    }
}
```

---

## 6. Các ứng dụng kinh điển của Suffix Tree

### 6.1. Khớp chuỗi mẫu trong thời gian $O(|Pattern|)$
Sau khi cây hậu tố được xây dựng, để kiểm tra xem một mẫu $P$ có xuất hiện trong văn bản $S$ hay không:
- Xuất phát từ gốc, đi dọc theo các cạnh tương ứng với các ký tự của $P$.
- Nếu so khớp hết chuỗi $P$: Mẫu $P$ có xuất hiện!
- Số lần xuất hiện chính là **số lượng nút lá trong cây con** của điểm dừng.
- Thời gian tìm kiếm độc lập với độ dài văn bản, chỉ mất đúng **$O(|P|)$**!

---

### 6.2. Đếm số chuỗi con phân biệt trong $O(N)$
Mỗi chuỗi con của $S$ đều tương ứng với một tiền tố của một hậu tố nào đó, tức là tương ứng với **một đoạn đường đi bắt đầu từ gốc** trên Suffix Tree.  
Do đó, tổng số chuỗi con phân biệt của $S$ chính là **tổng độ dài của tất cả các cạnh trên cây**:
$$\text{Distinct Substrings} = \sum_{v \in \text{Nodes}, v \ne \text{root}} (t[v].r - t[v].l)$$

Duyệt cây một lần là có ngay kết quả trong $O(N)$!

---

### 6.3. Xâu con chung dài nhất của hai chuỗi (LCS) trong $O(N_1 + N_2)$
Bằng cách xây dựng **Generalized Suffix Tree** cho chuỗi `s_1 + "#" + s_2 + "$"`:
- Đánh dấu mỗi nút lá thuộc về chuỗi $S_1$ hay $S_2$.
- Dùng DFS tính toán xem mỗi nút trong có chứa các lá từ cả hai chuỗi hay không.
- Độ sâu lớn nhất của một nút chứa cả hai màu lá chính là độ dài xâu con chung dài nhất!

---

## 7. Tổng kết

| Tiêu chí | Suffix Tree (Ukkonen) | Suffix Array + LCP | Suffix Automaton (SAM) |
| :--- | :---: | :---: | :---: |
| **Thời gian xây dựng** | $O(N)$ | $O(N \log N)$ hoặc $O(N)$ | $O(N)$ |
| **Bộ nhớ** | Lớn (nhiều nút & con trỏ) | Rất nhỏ ($O(N)$ mảng số) | Vừa phải (tối đa $2N$ trạng thái) |
| **Đặc điểm cài đặt** | Cực kỳ tinh vi, nhiều trạng thái | Dễ nhớ, thân thiện phòng thi | Cực ngắn gọn và thanh thoát |
| **Tính chất Online** | **Có (trực tuyến)** | Không (phải có toàn bộ chuỗi) | **Có (trực tuyến)** |

Mặc dù trong các kỳ thi Competitive Programming hiện đại, Suffix Array và Suffix Automaton (SAM) thường được ưu tiên hơn do code ngắn gọn và ít tốn bộ nhớ cache, nhưng **Suffix Tree và thuật toán Ukkonen** vẫn mãi là tượng đài kinh điển về tư duy cấu trúc dữ liệu tuyến tính trong khoa học máy tính!

---

## 8. Bài tập rèn luyện (Practice Problems)

- [UVA 10679 - I Love Strings!!](https://uva.onlinejudge.org/index.php?option=onlinejudge&page=show_problem&problem=1620)
- [SPOJ - SUBST1 (New Distinct Substrings)](https://www.spoj.com/problems/SUBST1/)
- [SPOJ - LCS (Longest Common Substring)](https://www.spoj.com/problems/LCS/)
- [Codeforces 427D - Match & Catch](https://codeforces.com/problemset/problem/427/D)
- [CSES - Finding Patterns](https://cses.fi/problemset/task/2102)
