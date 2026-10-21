---
title: "Suffix Automaton (SAM): Cỗ Máy Trạng Thái Tối Thượng Nén Toàn Bộ Xâu Con Trong O(N)"
description: "Khám phá Suffix Automaton (SAM) - cấu trúc dữ liệu đỉnh cao nén toàn bộ O(N^2) xâu con chỉ với 2N trạng thái và 3N bước chuyển trong thời gian tuyến tính O(N). Giải mã endpos, suffix link, thuật toán nhân bản trạng thái (clone) và các bài toán quy hoạch động kinh điển."
pubDate: "2026-10-21"
tags: ["String", "Suffix Automaton", "SAM", "Automaton", "Algorithms", "Competitive Programming", "C++"]
categories: ["Algorithms"]
excerpt: "Được mệnh danh là 'cảnh giới tối cao' của xử lý chuỗi trong Competitive Programming, Suffix Automaton (SAM) có khả năng nén trọn vẹn toàn bộ O(N^2) xâu con vào một đồ thị DAG nhỏ gọn chỉ gồm tối đa 2N đỉnh trong O(N) thời gian và bộ nhớ. Code vỏn vẹn 30 dòng nhưng sức mạnh vô biên!"
---

> *"Nếu bạn từng choáng ngợp trước sự đồ sộ của [Cây Hậu Tố (Suffix Tree)](/blog/2026-10-21-suffix-tree-ukkonen) hay sự khéo léo của [Suffix Array](/blog/2026-10-21-suffix-array-lcp), thì **Suffix Automaton (SAM - Máy trạng thái hữu hạn của các hậu tố)** chính là đỉnh cao cảnh giới tiếp theo mà bất kỳ đấu thủ Competitive Programming nào cũng khao khát chinh phục.  
> Một chuỗi độ dài $N$ có thể chứa tới $\frac{N(N + 1)}{2} = O(N^2)$ xâu con khác nhau. Làm thế nào để lưu trữ, truy vấn và thực hiện quy hoạch động trên TOÀN BỘ tập hợp khổng lồ này mà chỉ tốn đúng **$O(N)$ bộ nhớ và $O(N)$ thời gian**?  
> Câu trả lời nằm ở Suffix Automaton: Chỉ với tối đa $2N - 1$ trạng thái và $3N - 4$ bước chuyển, cài đặt gói gọn trong vỏn vẹn $30$ dòng lệnh!"*

---

## 1. Trực giác: Suffix Automaton là gì?

> **Định nghĩa:** **Suffix Automaton (SAM)** của chuỗi $S$ là một **Ôtômat hữu hạn đơn định cực tiểu (Minimal DFA - Deterministic Finite Automaton)** chấp nhận tất cả các hậu tố của chuỗi $S$.

Nói bằng ngôn ngữ đồ thị trực quan:
- SAM là một **Đồ thị có hướng không chu trình (DAG - Directed Acyclic Graph)**.
- Các đỉnh của đồ thị gọi là các **trạng thái (states)**.
- Các cạnh có hướng gọi là các **bước chuyển (transitions)**, mỗi cạnh được gán một ký tự.
- Có một trạng thái xuất phát duy nhất ký hiệu là $t_0$ (gốc của đồ thị).
- Một số trạng thái được đánh dấu là **trạng thái kết thúc (terminal states)**. Bất kỳ đường đi nào xuất phát từ $t_0$ kết thúc tại một trạng thái terminal đều tạo thành một **hậu tố (Suffix)** của chuỗi $S$.

### Tính chất xâu con thần thánh (The Substring Property)
Đây là đặc tính quan trọng bậc nhất giúp SAM thống trị thế giới xử lý chuỗi:
> **Mọi đường đi xuất phát từ gốc $t_0$, khi ghép các ký tự trên các cạnh lại, đều tạo thành một XÂU CON (Substring) của $S$.**  
> **Và ngược lại: BẤT KỲ xâu con nào của $S$ cũng đều tương ứng với một đường đi xuất phát từ $t_0$ trong SAM!**

Do đó, bài toán tìm kiếm, đếm hoặc tối ưu hóa trên mọi xâu con của $S$ được chuyển đổi hoàn toàn thành **bài toán duyệt đường đi và Quy hoạch động trên đồ thị DAG**!

---

## 2. Các ví dụ trực quan về Suffix Automaton

Dưới đây là hình ảnh cấu trúc SAM cho một số chuỗi đơn giản. Trong đó:
- **Đỉnh màu xanh dương:** Trạng thái xuất phát $t_0$.
- **Đỉnh màu xanh lá:** Trạng thái kết thúc (Terminal states).
- **Đỉnh màu xám:** Trạng thái trung gian.

### Chuỗi rỗng `""`
Chỉ gồm duy nhất trạng thái ban đầu $t_0$:
![SAM cho chuỗi rỗng](/images/sam-empty.png)

### Chuỗi `"a"`
Có một bước chuyển chữ `a` tới trạng thái kết thúc:
![SAM cho chuỗi a](/images/sam-a.png)

### Chuỗi `"aa"`
![SAM cho chuỗi aa](/images/sam-aa.png)

### Chuỗi `"ab"`
Từ $t_0$ có hai nhánh: đi theo `a` $\to$ `b` tạo thành `"ab"`, hoặc đi tắt theo cạnh `b` tạo thành hậu tố `"b"`:
![SAM cho chuỗi ab](/images/sam-ab.png)

### Chuỗi `"aba"`
![SAM cho chuỗi aba](/images/sam-aba.png)

---

## 3. Lý thuyết nền tảng: Tập vị trí kết thúc ($endpos$) và Suffix Link

Làm sao để nén $O(N^2)$ xâu con vào trong $O(N)$ đỉnh? Bí mật nằm ở khái niệm **lớp tương đương $endpos$**.

### 3.1. Tập vị trí kết thúc $endpos$

Cho một xâu con $t$ của chuỗi $S$.  
Ta định nghĩa **$endpos(t)$** là tập hợp tất cả các chỉ số kết thúc của các lần xuất hiện của $t$ trong $S$.

> **Ví dụ với chuỗi $S = \text{"abcbc"}$:**  
> - Xâu `"bc"` xuất hiện ở vị trí $[1 \dots 2]$ và $[3 \dots 4] \implies endpos(\text{"bc"}) = \{2, 4\}$.  
> - Xâu `"c"` cũng xuất hiện kết thúc tại vị trí $2$ và $4 \implies endpos(\text{"c"}) = \{2, 4\}$.

Vì $endpos(\text{"bc"}) = endpos(\text{"c"})$ nên ta nói hai xâu con `"bc"` và `"c"` là **$endpos$-tương đương**.  
**Trong Suffix Automaton, tất cả các xâu con có cùng tập $endpos$ sẽ được gộp chung vào đúng MỘT trạng thái duy nhất!**

### 3.2. Ba Bổ đề then chốt về $endpos$

- **Bổ đề 1:** Hai xâu con $u$ và $w$ ($|u| \le |w|$) có cùng tập $endpos$ khi và chỉ khi $u$ là một hậu tố của $w$, và mọi lần $u$ xuất hiện trong $S$ đều nằm ở đuôi của $w$.
- **Bổ đề 2:** Với hai xâu con bất kỳ $u$ và $w$ ($|u| \le |w|$), tập $endpos$ của chúng **hoặc hoàn toàn không giao nhau, hoặc $endpos(w)$ là tập con thực sự của $endpos(u)$**:
$$endpos(w) \subseteq endpos(u) \quad \text{or} \quad endpos(w) \cap endpos(u) = \emptyset$$
- **Bổ đề 3:** Trong cùng một trạng thái $v$ (cùng một lớp tương đương $endpos$), nếu sắp xếp các xâu con theo độ dài giảm dần, xâu ngắn hơn sẽ là hậu tố của xâu dài hơn liền trước. Độ dài của các xâu con trong trạng thái $v$ lấp đầy một khoảng nguyên liên tiếp:
$$[minlen(v), len(v)]$$

### 3.3. Suffix Link (Liên kết hậu tố)

Xét một trạng thái $v$. Gọi $w$ là xâu dài nhất thuộc trạng thái $v$ (có độ dài $len(v)$).  
Các hậu tố ngắn dần của $w$ sẽ thuộc về trạng thái $v$ cho đến khi độ dài giảm xuống dưới $minlen(v)$. Khi độ dài rơi xuống $minlen(v) - 1$, xâu hậu tố đó sẽ xuất hiện ở nhiều vị trí hơn trong $S$, tức là có một tập $endpos$ rộng hơn!

> **Định nghĩa Suffix Link:**  
> **Suffix Link của trạng thái $v$ (ký hiệu $link(v)$)** trỏ tới trạng thái tương ứng với hậu tố dài nhất của $w$ thuộc về một lớp tương đương $endpos$ khác.

Từ đây ta có hệ thức vàng:
$$minlen(v) = len(link(v)) + 1$$

Các liên kết Suffix Link nối từ các đỉnh về gốc tạo thành một **Cây liên kết hậu tố (Suffix Link Tree)** hoàn chỉnh, phản ánh quan hệ bao hàm giữa các tập $endpos$!

![Cấu trúc SAM và Cây Suffix Links (mũi tên đỏ) tương ứng cho chuỗi "abcbc"](/images/sam-abcbc-suffix-links.png)

*Hình minh họa: Bên trái là đồ thị chuyển trạng thái SAM của chuỗi `"abcbc"` (mỗi đỉnh được gán nhãn bằng xâu dài nhất trong lớp tương đương). Bên phải là Cây Suffix Link Tree tương ứng với các mũi tên đỏ trỏ ngược về gốc $t_0$.*

---

## 4. Thuật toán xây dựng Online trong $O(N)$

Thuật toán Blumer & Crochemore (1985) xây dựng SAM một cách trực tuyến (Online): Bắt đầu từ $t_0$, ta lần lượt nạp từng ký tự $c$ của chuỗi $S$.

### Các bước nạp ký tự $c$ (`sa_extend(c)`):

1. **Tạo trạng thái mới $cur$:** Đại diện cho toàn bộ chuỗi mới $s + c$.  
   Đặt $len(cur) = len(last) + 1$.
2. **Duyệt ngược theo Suffix Link từ $last$:**  
   Bắt đầu từ $p = last$, chừng nào $p$ chưa có bước chuyển theo ký tự $c$, ta thêm bước chuyển $p \xrightarrow{c} cur$, sau đó lùi về $p = link(p)$.
3. **Nếu đi về đến trạng thái ảo $-1$ (chưa từng thấy $c$):**  
   Gán $link(cur) = 0$ và kết thúc.
4. **Nếu gặp một đỉnh $p$ đã có bước chuyển theo $c$ tới đỉnh $q$:**
   - **Trường hợp 1 (Bước chuyển liên tục - Continuous):**  
     Nếu $len(p) + 1 == len(q)$, điều này có nghĩa là xâu dài nhất trong $q$ chính là xâu dài nhất trong $p$ ghép thêm ký tự $c$. Khi đó chỉ cần gán:
     $$link(cur) = q$$
   - **Trường hợp 2 (Bước chuyển không liên tục - Non-continuous):**  
     Nếu $len(q) > len(p) + 1$, trạng thái $q$ chứa cả những xâu dài hơn không phải là hậu tố của chuỗi mới. Ta phải **nhân bản (clone)** trạng thái $q$ thành một trạng thái mới tên là $clone$:
     - Gán $len(clone) = len(p) + 1$.
     - Sao chép toàn bộ các bước chuyển của $q$ sang $clone$.
     - Gán $link(clone) = link(q)$.
     - Cập nhật $link(q) = clone$ và $link(cur) = clone$.
     - Duyệt ngược tiếp từ $p$ theo Suffix Link: Chừng nào bước chuyển theo $c$ còn trỏ tới $q$, ta chuyển hướng nó trỏ sang $clone$.
5. **Cập nhật $last = cur$.**

### Định lý về kích thước cực tiểu của SAM:
- Với chuỗi độ dài $N \ge 2$, số lượng trạng thái không bao giờ vượt quá **$2N - 1$**.
- Số lượng bước chuyển không bao giờ vượt quá **$3N - 4$**.
- Thời gian xây dựng là **$O(N)$** đối với bảng chữ cái cố định!

---

## 5. Cài đặt C++ siêu tinh gọn (Template chuẩn phòng thi)

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <map>
#include <algorithm>

using namespace std;

const int MAXLEN = 100005;

struct State {
    int len, link;
    map<char, int> next_node; // Hoặc dùng mảng int next_node[26] nếu chữ cái cố định
};

State st[MAXLEN * 2];
int sz, last;

// Khởi tạo Suffix Automaton
void sa_init() {
    st[0].len = 0;
    st[0].link = -1;
    st[0].next_node.clear();
    sz = 1;
    last = 0;
}

// Thêm một ký tự c vào SAM
void sa_extend(char c) {
    int cur = sz++;
    st[cur].len = st[last].len + 1;
    st[cur].next_node.clear();

    int p = last;
    while (p != -1 && !st[p].next_node.count(c)) {
        st[p].next_node[c] = cur;
        p = st[p].link;
    }

    if (p == -1) {
        st[cur].link = 0;
    } else {
        int q = st[p].next_node[c];
        if (st[p].len + 1 == st[q].len) {
            st[cur].link = q;
        } else {
            int clone = sz++;
            st[clone].len = st[p].len + 1;
            st[clone].next_node = st[q].next_node;
            st[clone].link = st[q].link;

            while (p != -1 && st[p].next_node[c] == q) {
                st[p].next_node[c] = clone;
                p = st[p].link;
            }
            st[q].link = st[cur].link = clone;
        }
    }
    last = cur;
}
```

---

## 6. Các bài toán ứng dụng đỉnh cao của SAM

### 6.1. Kiểm tra xâu con trong $O(|Pattern|)$
Để kiểm tra xem xâu mẫu $P$ có phải là xâu con của $S$ hay không:
- Xuất phát từ $t_0$, lần theo các bước chuyển tương ứng với các ký tự trong $P$.
- Nếu tại bất kỳ bước nào không tồn tại bước chuyển $\implies P$ không xuất hiện trong $S$.
- Nếu duyệt hết chuỗi $P$ thành công $\implies P$ là xâu con của $S$!
- Thời gian kiểm tra: Đúng **$O(|P|)$**, hoàn toàn độc lập với độ dài của $S$!

---

### 6.2. Đếm số lượng xâu con phân biệt trong $O(N)$

Mỗi trạng thái $v$ ($v \ne 0$) đại diện cho các xâu con có độ dài nằm trong đoạn $[minlen(v), len(v)]$.  
Số lượng xâu con khác nhau trong trạng thái $v$ đúng bằng:
$$len(v) - minlen(v) + 1 = len(v) - len(link(v))$$

Do đó, tổng số xâu con phân biệt của toàn bộ chuỗi $S$ chỉ đơn giản là:
$$\text{Total Distinct Substrings} = \sum_{v = 1}^{sz - 1} (len(v) - len(link(v)))$$

```cpp
long long count_distinct_substrings() {
    long long ans = 0;
    for (int i = 1; i < sz; i++) {
        ans += st[i].len - st[st[i].link].len;
    }
    return ans;
}
```
Không cần đệ quy, không tốn bộ nhớ phụ, chạy trong nháy mắt với thời gian $O(N)$!

---

### 6.3. Tổng độ dài của tất cả các xâu con phân biệt
Các xâu con tại trạng thái $v$ có độ dài từ $len(link(v)) + 1$ đến $len(v)$.  
Theo công thức tổng cấp số cộng:
$$\text{Sum} = \text{Count} \times \frac{\text{Shortest} + \text{Longest}}{2}$$

```cpp
long long total_length_of_distinct_substrings() {
    long long tot = 0;
    for (int i = 1; i < sz; i++) {
        long long shortest = st[st[i].link].len + 1;
        long long longest = st[i].len;
        long long count = longest - shortest + 1;
        tot += count * (shortest + longest) / 2;
    }
    return tot;
}
```

---

### 6.4. Đếm số lần xuất hiện của một mẫu $P$ trong $T$
Số lần xuất hiện của mẫu $P$ chính là kích thước của tập hợp $|endpos(v)|$ (với $v$ là trạng thái kết thúc khi duyệt $P$ trên SAM).

1. Gán trọng số ban đầu:
   - Các đỉnh được tạo trực tiếp từ bước thêm ký tự (không phải clone): `cnt[v] = 1`.
   - Các đỉnh clone: `cnt[clone] = 0`.
2. Sắp xếp các đỉnh theo độ dài $len$ giảm dần (hoặc duyệt mảng theo $len$ bằng Counting Sort trong $O(N)$).
3. Đẩy giá trị lên cha trên Cây Suffix Link:
   $$cnt[link(v)] += cnt[v]$$
4. Sau bước cộng dồn, `cnt[v]` chính là số lần xuất hiện của mọi xâu con thuộc trạng thái $v$!

---

### 6.5. Tìm xâu con chung dài nhất của hai chuỗi (LCS) trong $O(|S| + |T|)$

Xây dựng SAM cho chuỗi $S$. Duyệt qua từng ký tự của chuỗi $T$ trên SAM:
- Duy trì trạng thái hiện tại $v$ và độ dài khớp hiện tại $l$.
- Nếu có bước chuyển với $T[i]$: $v = st[v].next[T[i]], l++$.
- Nếu không có bước chuyển: Nhảy lùi theo Suffix Link $v = st[v].link, l = st[v].len$ cho tới khi có bước chuyển hoặc về tới $0$.
- Cập nhật độ dài cực đại sau mỗi bước.

```cpp
string longest_common_substring(const string& s, const string& t) {
    sa_init();
    for (char c : s) sa_extend(c);

    int v = 0, l = 0, best_len = 0, best_pos = 0;
    for (int i = 0; i < (int)t.size(); i++) {
        while (v != 0 && !st[v].next_node.count(t[i])) {
            v = st[v].link;
            l = st[v].len;
        }
        if (st[v].next_node.count(t[i])) {
            v = st[v].next_node[t[i]];
            l++;
        }
        if (l > best_len) {
            best_len = l;
            best_pos = i;
        }
    }
    return t.substr(best_pos - best_len + 1, best_len);
}
```

---

## 7. Bảng so sánh toàn diện

| Cấu trúc dữ liệu | Bộ nhớ | Thời gian xây dựng | Độ dài code | Khả năng Online | Thế mạnh đặc thù |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **KMP / Z-Algo** | $O(N)$ | $O(N)$ | ~15 dòng | Có | Khớp mẫu đơn chuỗi |
| **Aho-Corasick** | $O(M \cdot \Sigma)$ | $O(M \cdot \Sigma)$ | ~50 dòng | Không | Khớp đa mẫu từ điển |
| **Suffix Array** | $O(N)$ | $O(N \log N)$ | ~40 dòng | Không | Sắp xếp từ điển, RMQ LCP |
| **Suffix Tree** | $O(N)$ (lớn) | $O(N)$ | ~80 dòng | Có | Mô hình lý thuyết xâu |
| **Suffix Automaton**| **$O(N)$ (nhỏ)** | **$O(N)$** | **~30 dòng** | **Có** | **DP xâu con, nén đồ thị DAG, tìm kiếm tối ưu** |

---

## 8. Bài tập rèn luyện (Practice Problems)

- [CSES - Distinct Substrings](https://cses.fi/problemset/task/2105)
- [CSES - Counting Patterns](https://cses.fi/problemset/task/2103)
- [CSES - Patterns Positions](https://cses.fi/problemset/task/2104)
- [SPOJ - SUBLEX (Lexicographical Substring Search)](https://www.spoj.com/problems/SUBLEX/)
- [Codeforces 235C - Cyclical Quest](https://codeforces.com/problemset/problem/235/C)
- [Codeforces 128B - String](https://codeforces.com/contest/128/problem/B)
- [AtCoder - K-th Substring](https://atcoder.jp/contests/abc097/tasks/arc097_a)
