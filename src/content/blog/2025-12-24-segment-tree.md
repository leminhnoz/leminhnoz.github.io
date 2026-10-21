---
title: "Segment Tree (Cây phân đoạn): 'Vũ khí tối thượng' của các bài toán Range Query và Cập nhật đoạn"
description: "Khám phá toàn diện Segment Tree (Cây phân đoạn) từ trực giác chia để trị O(log n), biểu diễn mảng 4N thanh lịch, kỹ thuật Lazy Propagation cập nhật đoạn, cho đến Persistent Segment Tree tìm phần tử nhỏ thứ k."
pubDate: "2025-12-24"
tags: ["Data Structures", "Algorithms", "C++", "Competitive Programming"]
categories: ["Algorithms"]
excerpt: "Nếu Fenwick Tree là con dao găm nhỏ gọn, thì Segment Tree chính là 'con dao Thụy Sĩ' toàn năng: tính tổng, tìm min/max, GCD, tổng đoạn con lớn nhất và cập nhật hàng loạt trong O(log n)!"
---

> *"Trong thế giới cấu trúc dữ liệu thi đấu (Competitive Programming), nếu có một 'ông hoàng' ngự trị trên đỉnh cao của các bài toán truy vấn đoạn (Range Queries), thì đó chắc chắn là **Segment Tree** (Cây phân đoạn).*  
>  
> *Mảng cộng dồn bó tay trước cập nhật giá trị. Sparse Table tê liệt khi mảng bị biến đổi. Fenwick Tree siêu gọn nhẹ nhưng lại bất lực trước bài toán tìm giá trị lớn nhất đoạn (Range Maximum) khi có phép gán hoặc các phép toán không có tính nghịch đảo. Segment Tree bước ra sân khấu như một lời giải trọn vẹn: linh hoạt vô đối, biểu diễn tự nhiên, và giải quyết hầu như mọi biến thể từ cơ bản đến thượng thừa chỉ trong $O(\log N)$!"*

---

## 1. Trực giác: Khi cả thế giới đều bó tay trước sự thay đổi

Hãy tưởng tượng bạn đang điều hành một hệ thống quản lý chuỗi cung ứng với mảng $A$ gồm $N$ kho hàng. Bạn liên tục nhận được 2 yêu cầu đan xen nhau:
1. **Truy vấn:** "Hãy tính tổng số hàng hóa (hoặc tìm kho chứa nhiều hàng nhất) trong các kho từ vị trí $L$ đến $R$."
2. **Cập nhật:** "Vừa nhập thêm $X$ kiện hàng vào kho thứ $i$ (hoặc nhập vào cả dải kho từ $L$ đến $R$)."

Hãy điểm mặt những công cụ quen thuộc xem chúng phản ứng ra sao:

| Cấu trúc dữ liệu | Thời gian Truy vấn đoạn $[L, R]$ | Thời gian Cập nhật 1 điểm | Thời gian Cập nhật cả đoạn $[L, R]$ |
| :--- | :--- | :--- | :--- |
| **Mảng thường** | $O(N)$ (quá chậm khi $Q = 10^5$) | $O(1)$ | $O(N)$ |
| **Mảng cộng dồn (Prefix Sum)** | $O(1)$ | $O(N)$ (phải tính lại mảng) | $O(N)$ |
| **Sparse Table** | $O(1)$ cho RMQ | $O(N \log N)$ (bó tay khi có update) | Bó tay |
| **Fenwick Tree (BIT)** | $O(\log N)$ | $O(\log N)$ | Khó mở rộng với Min/Max |
| **Segment Tree** | **$O(\log N)$** | **$O(\log N)$** | **$O(\log N)$ (với Lazy Propagation)** |

Segment Tree cân bằng hoàn hảo giữa hai thái cực: **cả hỏi lẫn sửa đều chỉ mất thời gian tỉ lệ thuận với chiều cao của một cây nhị phân: $\approx \log_2 N$.**

---

## 2. Bản chất hình học: Chia để trị trên cây nhị phân

Cơ chế của Segment Tree vô cùng tự nhiên, kế thừa trực tiếp tư duy **Chia để trị (Divide and Conquer)**:

- **Nút gốc (Root):** Quản lý toàn bộ mảng từ chỉ số $0$ đến $N - 1$.
- **Hai nút con:** Nút gốc chia đôi đoạn làm hai nửa:
  - Con trái quản lý nửa đầu: $[0, \text{mid}]$.
  - Con phải quản lý nửa sau: $[\text{mid} + 1, N - 1]$.
- **Quá trình phân chia tiếp diễn:** Cứ mỗi nút lại chia đôi đoạn nó phụ trách cho đến khi đoạn chỉ còn đúng $1$ phần tử duy nhất $[i, i]$ — đó chính là **Nút lá (Leaf)**, lưu trực tiếp giá trị của phần tử $A[i]$.

Giả sử ta có mảng $A = [1, 3, -2, 8, -7]$ gồm $5$ phần tử (đánh số từ $0$ đến $4$). Cây phân đoạn tính tổng của mảng sẽ trông như sau:

![Cấu trúc cây Segment Tree](/images/segtree-structure.png)

Hãy nhìn vào bức hình trên:
- Gốc quản lý đoạn $[0 \dots 4]$ với tổng là $3$ ($1 + 3 - 2 + 8 - 7 = 3$).
- Nút con trái quản lý đoạn $[0 \dots 2]$ với tổng là $2$ ($1 + 3 - 2 = 2$).
- Nút con phải quản lý đoạn $[3 \dots 4]$ với tổng là $1$ ($8 - 7 = 1$).
- Các nút lá ở dưới cùng (màu đỏ) lưu trữ từng phần tử đơn lẻ: $A[0]=1, A[1]=3, A[2]=-2, A[3]=8, A[4]=-7$.

> **Định lý then chốt:** Chiều cao của Segment Tree xây dựng trên mảng kích thước $N$ luôn không vượt quá $\lceil \log_2 N \rceil + 1$. Với $N = 10^5$, chiều cao cây chỉ khoảng $18$ tầng! Mọi chuyến đi từ gốc xuống lá đều kết thúc trong chớp mắt.

---

## 3. Vì sao lại là mảng kích thước $4N$?

Nhiều bạn mới học Segment Tree thường thắc mắc: *"Mảng ban đầu có $N$ phần tử, tại sao người ta lại cấp phát mảng cây `tree[4 * N]`? Số $4$ ở đâu ra?"*

Hãy cùng làm một phép tính nhỏ:
1. Nếu $N$ là một lũy thừa của $2$ (ví dụ $N = 8 = 2^3$), cây Segment Tree là một **cây nhị phân đầy đủ** (full binary tree):
   - Tầng lá có $N$ nút.
   - Tổng số nút trên toàn bộ cây là:
     $$1 + 2 + 4 + \dots + N = 2N - 1 < 2N$$
   Trong trường hợp này, chỉ cần mảng $2N$ là đủ!
2. Nhưng nếu $N$ **không phải** lũy thừa của $2$ (ví dụ $N = 5$ như hình vẽ trên), ta phải làm tròn lên lũy thừa của $2$ gần nhất lớn hơn $N$, kí hiệu là $2^{\lceil \log_2 N \rceil}$. Trong trường hợp xấu nhất, số này có thể đạt tới $2N - 1$.
   - Khi đó, tổng số nút của cây đầy đủ bao quanh nó có thể lên tới:
     $$2 \times (2N - 1) - 1 < 4N$$

Vì vậy, khai báo mảng kích thước **$4N$** là con số an toàn tuyệt đối, đảm bảo không bao giờ bị tràn chỉ số (Index Out of Bounds) mà không cần phải dùng con trỏ hay cấp phát động phức tạp!

### Cách lưu cây phẳng cực gọn:
Ta đánh số nút gốc là $1$:
- Con trái của nút $v$ nằm ở chỉ số: $2v$ (hoặc dịch bit `v << 1`).
- Con phải của nút $v$ nằm ở chỉ số: $2v + 1$ (hoặc `(v << 1) | 1`).
- Cha của nút $v$ là: $\lfloor v / 2 \rfloor$ (hoặc `v >> 1`).

---

## 4. Ba thao tác cơ bản: Xây dựng, Truy vấn và Cập nhật

### 4.1. Khởi tạo cây: `build` trong $O(N)$

Ta dùng đệ quy đi từ gốc xuống các lá, gán giá trị tại lá, rồi khi đệ quy quay lui (backtrack), ta gộp kết quả từ 2 con để tính giá trị cho nút cha:

```cpp
const int MAXN = 100005;
int tree[4 * MAXN];
int a[MAXN];

// Xây dựng cây tại nút v quản lý đoạn [tl, tr]
void build(int v, int tl, int tr) {
    if (tl == tr) {
        tree[v] = a[tl]; // Đã chạm tới nút lá
    } else {
        int tm = (tl + tr) / 2;
        build(2 * v, tl, tm);         // Xây dựng cây con trái
        build(2 * v + 1, tm + 1, tr); // Xây dựng cây con phải
        tree[v] = tree[2 * v] + tree[2 * v + 1]; // Gộp kết quả
    }
}
```

*Độ phức tạp:* Mặc dù mỗi bước chia đôi, nhưng tổng số nút được thăm đúng bằng số nút của cây ($< 4N$). Do đó thời gian khởi tạo chỉ là **$O(N)$**, hoàn toàn không có $\log N$ nào ở đây cả!

---

### 4.2. Truy vấn đoạn: `query` trong $O(\log N)$

Khi cần tính tổng đoạn $[L, R]$, ta đứng ở nút gốc (quản lý $[tl, tr]$) và đối mặt với 3 trường hợp:
1. **Đoạn cần tìm nằm hoàn toàn ngoài phạm vi của nút:** (tức $L > tr$ hoặc $R < tl$) $\implies$ Trả về giá trị trung hòa (với phép cộng là $0$, với tìm min là $+\infty$).
2. **Đoạn của nút nằm trọn trong đoạn cần tìm:** (tức $L \le tl$ và $tr \le R$) $\implies$ Trả về ngay `tree[v]` mà không cần đào sâu thêm nữa!
3. **Giao nhau một phần:** Chia làm hai nhánh gọi đệ quy xuống con trái và con phải, sau đó cộng kết quả lại.

Hãy xem hình ảnh minh họa cho truy vấn tính tổng đoạn $[2, 4]$ (tức là $A[2] + A[3] + A[4] = -2 + 8 + (-7) = -1$):

![Truy vấn tổng đoạn trên Segment Tree](/images/segtree-query.png)

Nhìn vào cây:
- Đoạn $[0 \dots 2]$ bị cắt đôi: nửa bên trái $[0 \dots 1]$ nằm ngoài phạm vi truy vấn (màu xám) nên bị bỏ qua; nửa bên phải $[2 \dots 2]$ nằm trọn trong khoảng cần tìm nên được chọn ngay (màu xanh lá: giá trị $-2$).
- Đoạn $[3 \dots 4]$ nằm trọn hoàn toàn trong $[2, 4]$ nên được chọn ngay lập tức (màu xanh lá: giá trị $1$).
- Kết quả cuối cùng: $(-2) + 1 = -1$. Ta chỉ cần ghé thăm vài nút thay vì duyệt cả mảng!

```cpp
int query(int v, int tl, int tr, int l, int r) {
    if (l > r) 
        return 0; // Trường hợp rỗng
    if (l <= tl && tr <= r) {
        return tree[v]; // Đoạn [tl, tr] nằm trọn vẹn trong [l, r]
    }
    int tm = (tl + tr) / 2;
    // Giao với con trái: [l, min(r, tm)]
    // Giao với con phải: [max(l, tm + 1), r]
    return query(2 * v, tl, tm, l, min(r, tm))
         + query(2 * v + 1, tm + 1, tr, max(l, tm + 1), r);
}
```

> **Vì sao độ phức tạp chỉ là $O(\log N)$?**  
> Ở mỗi tầng của cây, ta ghé thăm tối đa **4 nút**! Vì vậy, tổng số nút được duyệt qua không bao giờ vượt quá $4 \times \text{chiều cao cây} \approx 4 \log_2 N$. Thời gian đáp ứng cực kỳ nhanh.

---

### 4.3. Cập nhật 1 phần tử: `update` trong $O(\log N)$

Khi ta thay đổi giá trị tại một vị trí $pos$ (ví dụ: gán $A[2] = 3$ thay vì $-2$), ta chỉ cần đi từ gốc lần theo nhánh chứa $pos$ xuống tận cùng nút lá, cập nhật giá trị nút lá, rồi đi ngược lên gốc cập nhật lại các tổ tiên trực tiếp của nó:

![Cập nhật điểm trên Segment Tree](/images/segtree-update.png)

Trong hình trên:
- Nút lá $[2 \dots 2]$ đổi từ $-2$ thành $3$.
- Cha của nó $[0 \dots 2]$ cập nhật lại tổng: $1 + 3 + 3 = 7$.
- Gốc $[0 \dots 4]$ cập nhật lại tổng: $7 + 1 = 8$.
- Tất cả các nút con khác (nhánh màu xám) hoàn toàn không bị ảnh hưởng!

```cpp
void update(int v, int tl, int tr, int pos, int new_val) {
    if (tl == tr) {
        tree[v] = new_val; // Đã tới lá cần sửa
    } else {
        int tm = (tl + tr) / 2;
        if (pos <= tm)
            update(2 * v, tl, tm, pos, new_val); // Đi sang nhánh trái
        else
            update(2 * v + 1, tm + 1, tr, pos, new_val); // Đi sang nhánh phải
        
        tree[v] = tree[2 * v] + tree[2 * v + 1]; // Kéo cập nhật lên cha
    }
}
```

Chỉ mất đúng 1 đường đi từ gốc đến lá, tương đương $\approx \log_2 N$ thao tác!

---

## 5. Những "phép màu" biến hóa của Segment Tree

Nếu chỉ để tính tổng và cập nhật 1 điểm, Fenwick Tree đã làm rất tốt. Sức mạnh vô song thực sự của Segment Tree bộc lộ khi bạn gặp những bài toán "kỳ quái" mà không cấu trúc dữ liệu nào khác kham nổi.

### 5.1. Tìm Giá Trị Lớn Nhất và Đếm Số Lần Xuất Hiện

Đề bài: *"Tìm giá trị lớn nhất trên đoạn $[L, R]$ và cho biết giá trị đó xuất hiện bao nhiêu lần trong đoạn?"*

Thay vì lưu một số nguyên tại mỗi nút, ta lưu một cặp `pair<int, int>` gồm `{max_val, count}`:

```cpp
pair<int, int> combine(pair<int, int> a, pair<int, int> b) {
    if (a.first > b.first) return a;
    if (b.first > a.first) return b;
    return {a.first, a.second + b.second}; // Cùng max thì cộng dồn số lần xuất hiện
}
```

Hàm gộp (`combine`) này tuân thủ trọn vẹn cấu trúc cây, giải quyết bài toán chỉ với đúng vài dòng thêm vào!

---

### 5.2. Chặt nhị phân trực tiếp trên cây (Binary Search on Segment Tree)

Giả sử bạn có mảng toàn số $0$ và $1$. Truy vấn: *"Tìm vị trí của số 0 thứ $k$ trong mảng?"*

Cách tiếp cận thông thường:
- Dùng Segment Tree tính tổng số lượng số 0 trên đoạn.
- Chặt nhị phân vị trí $idx \in [1, N]$: kiểm tra `query(1, idx) >= k`.
- Độ phức tạp: $O(\log N)$ lần chặt $\times O(\log N)$ mỗi lần query $= O(\log^2 N)$.

Nhưng ta có thể làm trực tiếp trên Segment Tree trong **$O(\log N)$** như sau:
1. Đứng ở nút cha, nhìn vào nút con trái: xem con trái có bao nhiêu số $0$ (gọi là $cnt_{left}$).
2. Nếu $k \le cnt_{left}$, chắc chắn số $0$ thứ $k$ nằm bên cây con trái $\implies$ Đệ quy sang trái tìm tiếp số thứ $k$.
3. Nếu $k > cnt_{left}$, chắc chắn số $0$ thứ $k$ nằm bên cây con phải $\implies$ Đệ quy sang phải tìm số thứ $(k - cnt_{left})$!

```cpp
int find_kth_zero(int v, int tl, int tr, int k) {
    if (k > tree[v]) // Không đủ k số 0 trong đoạn này
        return -1;
    if (tl == tr)
        return tl; // Đã tìm thấy vị trí
    int tm = (tl + tr) / 2;
    int zeros_in_left = (tm - tl + 1) - tree[2 * v]; // tree lưu số lượng số 1
    if (zeros_in_left >= k)
        return find_kth_zero(2 * v, tl, tm, k);
    else
        return find_kth_zero(2 * v + 1, tm + 1, tr, k - zeros_in_left);
}
```

---

### 5.3. Bài toán kinh điển: Tìm dãy con có tổng lớn nhất (Maximum Subsegment Sum)

*(Bài toán nổi tiếng trên SPOJ: GSS1 / GSS3)*

Cho mảng có cả số âm lẫn dương. Hãy tìm đoạn con liên tiếp trong $[L, R]$ có tổng lớn nhất.

Để giải quyết, tại mỗi nút ta lưu một cấu trúc (Struct) gồm $4$ giá trị:
1. `sum`: Tổng tất cả phần tử trong đoạn.
2. `pref`: Tổng tiền tố lớn nhất bắt đầu từ đầu đoạn.
3. `suff`: Tổng hậu tố lớn nhất kết thúc tại cuối đoạn.
4. `ans`: Tổng đoạn con liên tiếp lớn nhất nằm trọn trong đoạn này.

Khi gộp hai nút con trái ($L$) và phải ($R$) để tạo thành nút cha:
```cpp
struct Node {
    long long sum, pref, suff, ans;
};

Node combine(Node L, Node R) {
    Node res;
    res.sum = L.sum + R.sum;
    res.pref = max(L.pref, L.sum + R.pref);
    res.suff = max(R.suff, R.sum + L.suff);
    res.ans = max({L.ans, R.ans, L.suff + R.pref});
    return res;
}
```

Một bài toán quy hoạch động phức tạp đã được đưa về Segment Tree để trả lời truy vấn và cập nhật điểm cực kỳ êm ái!

---

## 6. Nâng cấp thượng thừa 1: Cập nhật đoạn với Lazy Propagation

Bài toán: *"Cộng thêm giá trị $X$ vào TẤT CẢ các phần tử từ chỉ số $L$ đến $R$."*

Nếu ta duyệt và gọi hàm `update` cho từng phần tử một, độ phức tạp sẽ là $(R - L + 1) \times O(\log N) \approx O(N \log N)$ — chậm không khác gì duyệt trâu!

Làm sao để cập nhật cả đoạn chỉ trong $O(\log N)$? Câu trả lời là kỹ thuật **Lazy Propagation (Lan truyền lười biếng)**:

> **Triết lý Lazy:** *"Việc gì hôm nay chưa cần làm, thì đừng làm vội. Hãy ghi chú lại đó, khi nào có ai thật sự cần hỏi đến thì mới làm tiếp!"*

### Cơ chế hoạt động:
1. Khi một đoạn $[tl, tr]$ của nút nằm trọn trong khoảng cần cập nhật $[L, R]$:
   - Ta cộng ngay giá trị mới vào `tree[v]`.
   - Ta gán một "khoản nợ" vào mảng `lazy[v]` của nút đó để nhắc nhở: *"Hai đứa con bên dưới của ta chưa được cộng đâu nhé!"*
   - Dừng lại, quay lui lên cha ngay lập tức mà **không đi sâu xuống hai con**!
2. Bất cứ khi nào trong tương lai ta phải đi qua nút này để truy vấn hoặc cập nhật con cháu, ta gọi hàm `push(v)`:
   - Đẩy khoản nợ từ `lazy[v]` xuống hai con `lazy[2*v]` và `lazy[2*v+1]`.
   - Cập nhật giá trị hiển thị cho hai con.
   - Xóa nợ tại nút cha `lazy[v] = 0`.

### Cài đặt C++ Lazy Propagation chuẩn:

```cpp
long long tree[4 * MAXN], lazy[4 * MAXN];

void push(int v, int tl, int tr) {
    if (lazy[v] != 0) {
        int tm = (tl + tr) / 2;
        // Đẩy xuống con trái
        lazy[2 * v] += lazy[v];
        tree[2 * v] += lazy[v] * (tm - tl + 1);
        // Đẩy xuống con phải
        lazy[2 * v + 1] += lazy[v];
        tree[2 * v + 1] += lazy[v] * (tr - tm);
        // Nút cha đã trả hết nợ
        lazy[v] = 0;
    }
}

void update_range(int v, int tl, int tr, int l, int r, long long add_val) {
    if (l > r) return;
    if (l <= tl && tr <= r) {
        tree[v] += add_val * (tr - tl + 1);
        lazy[v] += add_val;
        return;
    }
    push(v, tl, tr); // Đẩy nợ cũ xuống trước khi đi tiếp
    int tm = (tl + tr) / 2;
    update_range(2 * v, tl, tm, l, min(r, tm), add_val);
    update_range(2 * v + 1, tm + 1, tr, max(l, tm + 1), r, add_val);
    tree[v] = tree[2 * v] + tree[2 * v + 1];
}

long long query_range(int v, int tl, int tr, int l, int r) {
    if (l > r) return 0;
    if (l <= tl && tr <= r) {
        return tree[v];
    }
    push(v, tl, tr); // Phải đẩy nợ xuống để con có số liệu chính xác!
    int tm = (tl + tr) / 2;
    return query_range(2 * v, tl, tm, l, min(r, tm))
         + query_range(2 * v + 1, tm + 1, tr, max(l, tm + 1), r);
}
```

Nhờ có Lazy Propagation, thao tác cập nhật cả đoạn $10^5$ phần tử giờ đây chỉ tốn đúng **$O(\log N)$**!

---

## 7. Nâng cấp thượng thừa 2: Persistent Segment Tree (Cây phân đoạn bất biến)

Bạn đã bao giờ tự hỏi: *"Làm sao để lưu lại toàn bộ lịch sử của cây sau mỗi lần cập nhật mà không làm bùng nổ bộ nhớ?"*

Nếu sau mỗi thao tác cập nhật ta sao chép nguyên cả cây, ta sẽ tốn $O(N)$ bộ nhớ cho mỗi bước, với $Q = 10^5$ thì RAM máy tính sẽ cạn kiệt ngay lập tức.

Nhưng hãy để ý: **Mỗi lần cập nhật 1 điểm, chỉ có đúng $\lceil \log_2 N \rceil + 1$ nút bị thay đổi giá trị (chính là đường đi từ nút lá lên đến gốc). Tất cả các nút còn lại trên cây hoàn toàn giữ nguyên!**

Ý tưởng của **Persistent Segment Tree**:
- Ta tạo một phiên bản gốc mới `root[version]`.
- Thay vì sao chép toàn bộ, ta chỉ tạo mới đúng các nút nằm trên đường đi bị sửa đổi ($\approx \log_2 N$ nút).
- Các nhánh không bị ảnh hưởng sẽ được trỏ thẳng sang nút tương ứng của phiên bản cũ!

### Ứng dụng đỉnh cao: Tìm số nhỏ thứ $k$ trên đoạn bất kỳ $[L, R]$ (K-th Order Statistic)
1. Rời rạc hóa (Coordinate Compression) các giá trị trong mảng.
2. Xây dựng $N$ phiên bản cây: phiên bản thứ $i$ được tạo bằng cách chèn phần tử $A[i]$ vào phiên bản $i - 1$. Nút của cây quản lý số lượng phần tử thuộc khoảng giá trị $[val_{min}, val_{max}]$.
3. Để tìm số nhỏ thứ $k$ trên đoạn $[L, R]$, ta lấy cây ở phiên bản $R$ trừ đi cây ở phiên bản $L - 1$ (`count = root[R]->left->val - root[L - 1]->left->val`), sau đó đi xuống nhánh trái hoặc phải như bài toán tìm số $0$ thứ $k$!
4. Thời gian trả lời truy vấn: **$O(\log N)$**, bộ nhớ $O(N \log N)$!

---

## 8. Bảng so sánh toàn cảnh: Chọn vũ khí nào khi lâm trận?

| Tiêu chí | Fenwick Tree (BIT) | Segment Tree Thường | Segment Tree + Lazy | Sparse Table | Sqrt Decomposition |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Độ dài code** | 10 - 15 dòng | 40 - 50 dòng | 70 - 90 dòng | 25 - 30 dòng | 35 - 45 dòng |
| **Bộ nhớ** | $1N$ | $4N$ | $4N$ + lazy | $N \log N$ | $N$ |
| **Thời gian tiền xử lý** | $O(N)$ | $O(N)$ | $O(N)$ | $O(N \log N)$ | $O(N)$ |
| **Truy vấn đoạn** | $O(\log N)$ | $O(\log N)$ | $O(\log N)$ | **$O(1)$** | $O(\sqrt{N})$ |
| **Cập nhật 1 điểm** | $O(\log N)$ | $O(\log N)$ | $O(\log N)$ | Không hỗ trợ | $O(1)$ |
| **Cập nhật cả đoạn** | Hạn chế | $O(N \log N)$ | **$O(\log N)$** | Không hỗ trợ | $O(\sqrt{N})$ |
| **Độ linh hoạt phép toán** | Trung bình (cần nghịch đảo) | Cực cao (bất kỳ phép gộp associative) | Vô địch | Chỉ phép idempotent | Rất cao |

---

## 9. Bài tập thực chiến đề xuất

Hãy bắt tay vào cài đặt ngay để biến kiến thức này thành phản xạ tự nhiên:

1. **[CSES - Static Range Sum Queries](https://cses.fi/problemset/task/1646):** Bài tập khởi động làm quen với thao tác build và query.
2. **[CSES - Dynamic Range Minimum Queries](https://cses.fi/problemset/task/1649):** Bài tập chuẩn mực cập nhật điểm và tìm Min trên đoạn.
3. **[CSES - Range Update Queries](https://cses.fi/problemset/task/1651):** Cài đặt Lazy Propagation cộng đoạn.
4. **[SPOJ - GSS1 & GSS3 (Can you answer these queries)](https://www.spoj.com/problems/GSS3/):** Đỉnh cao của bài toán Maximum Subsegment Sum với cập nhật điểm.
5. **[Codeforces 380C - Sereja and Brackets](https://codeforces.com/problemset/problem/380/C):** Đếm chuỗi ngoặc đúng dài nhất trên đoạn bằng cách lưu số ngoặc mở/đóng dư thừa tại mỗi nút.
6. **[SPOJ - MKTHNUM](https://www.spoj.com/problems/MKTHNUM/):** Tìm phần tử nhỏ thứ $k$ trên đoạn bằng Persistent Segment Tree.

---

## 10. Lời kết

Segment Tree thoạt nhìn có vẻ đáng sợ vì số dòng code dài gấp ba bốn lần Fenwick Tree hay Sparse Table. Nhưng một khi bạn đã thấu suốt triết lý **"Chia đôi khoảng phụ trách và lưu thông tin tại nút cha"**, bạn sẽ thấy nó trong sáng và logic đến kỳ lạ.

Nó giống như một khung sườn vạn năng: chỉ cần thay đổi hàm `combine` và định nghĩa lại nút, bạn đã có ngay một cấu trúc dữ liệu mới toanh cho bài toán riêng của mình. Hãy thử tự tay gõ lại hàm `build`, `query`, `update` từ con số không — đó là bước ngoặt đưa trình độ thuật toán của bạn lên một tầm cao mới!
