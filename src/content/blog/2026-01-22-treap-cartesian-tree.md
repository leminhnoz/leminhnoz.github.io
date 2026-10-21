---
title: "Treap (Cartesian Tree): Sự kết hợp hoàn hảo giữa Cây và Heap thay đổi cuộc chơi"
description: "Giải mã cấu trúc dữ liệu Treap (Tree + Heap) - Cây tìm kiếm nhị phân ngẫu nhiên hóa (Randomized BST) tự cân bằng trong O(log n). Khám phá cặp bài trùng Split & Merge, cấu trúc Implicit Treap biến Treap thành siêu mảng động hỗ trợ đảo ngược đoạn trong O(log n)."
pubDate: "2026-01-22"
tags: ["Data Structures", "Algorithms", "C++", "Competitive Programming"]
categories: ["Algorithms"]
excerpt: "Sợ hãi trước hàng chục phép xoay và đổi màu phức tạp của Red-Black Tree hay AVL Tree? Hãy làm quen với Treap (Tree + Heap): chỉ với 2 thao tác Split & Merge siêu thanh lịch, bạn có một cây tự cân bằng và một siêu mảng động có thể đảo ngược đoạn trong O(log n)!"
---

> *"Nếu bạn từng thử cài đặt Cây Đỏ-Đen (Red-Black Tree) hay Cây AVL trong phòng thi lập trình, khả năng cao bạn đã phải trải qua cơn ác mộng debug: xoay trái, xoay phải, kiểm tra 4-5 trường hợp đổi màu với hàng trăm dòng code rối như tơ vò.*  
>  
> *Có cách nào để một Cây tìm kiếm nhị phân (BST) tự động giữ được độ cao cân bằng $O(\log N)$ mà code lại ngắn gọn, trong sáng và không cần bất kỳ phép xoay phức tạp nào không?*  
>  
> *Năm 1989, Raimund Seidel và Cecilia Aragon đã mang đến câu trả lời chấn động: **Treap** — sự kết hợp tài tình giữa **Tree** và **Heap**!"*

---

## 1. Trực giác: Nỗi đau của cây tìm kiếm nhị phân và phép màu ngẫu nhiên

### Cơn ác mộng thoái hóa của BST
Một cây tìm kiếm nhị phân thông thường (BST) rất nhanh khi dữ liệu vào ngẫu nhiên. Nhưng nếu mảng đưa vào đã được sắp xếp tăng dần: $[1, 2, 3, 4, 5]$, mỗi phần tử mới luôn rơi vào con phải của phần tử trước. Cây sẽ bị kéo dài thành một **danh sách liên kết** đơn lẻ!

Khi đó, chiều cao cây vọt lên $O(N)$. Mọi thao tác tìm kiếm, chèn, xóa đều chậm như rùa bò.

```text
Thoái hóa: 1
            \
             2
              \
               3
                \
                 4
                  \
                   5  --> O(N) tìm kiếm!
```

### Ý tưởng Treap: Tree + Heap = Treap
Để giải quyết bài toán trên, mỗi nút trong Treap sẽ không chỉ lưu một giá trị mà lưu một cặp $(X, Y)$:

1. **Khóa $X$ (Key):** Tuân thủ tính chất của **Cây tìm kiếm nhị phân (BST)**:
   - Mọi nút ở cây con bên trái đều có $X_{left} \le X_0$.
   - Mọi nút ở cây con bên phải đều có $X_{right} \ge X_0$.
2. **Độ ưu tiên $Y$ (Priority):** Tuân thủ tính chất của **Đống (Max-Heap)**:
   - Nút cha luôn có độ ưu tiên lớn hơn hoặc bằng các nút con của nó: $Y_0 \ge Y_{child}$.

> **Phép màu ngẫu nhiên hóa:**  
> Điều vi diệu là: nếu ta gán độ ưu tiên $Y$ hoàn toàn **ngẫu nhiên** bằng hàm `rand()` khi tạo nút, thì xác suất để cây bị lệch là cực kỳ nhỏ. Chiều cao kỳ vọng của cây luôn được chứng minh toán học là **$O(\log N)$**!  
> Ta không cần phải xoay cây mệt mỏi theo các luật màu khắt khe, tính ngẫu nhiên tự nhiên sẽ giữ cho cây luôn cân bằng tuyệt đẹp.

---

## 2. Vì sao còn gọi là Cây Descartes (Cartesian Tree)?

Treap còn có một tên gọi hình học rất sang trọng: **Cây Descartes (Cartesian Tree)**. Bởi vì nếu ta biểu diễn mỗi nút như một tọa độ $(X, Y)$ trên mặt phẳng Descartes hai chiều:

![Biểu diễn Treap trên mặt phẳng tọa độ Descartes](/images/treap-cartesian-plane.png)

Hãy quan sát bức hình trên:
- **Chiếu xuống trục hoành $X$:** Các nút từ trái sang phải tạo thành thứ tự duyệt trung thứ tự (In-order traversal) tăng dần của một cây BST: $1 \to 2 \to 2 \to 5 \to 6 \to 10 \to 14 \to 18 \to 18 \to 19$.
- **Chiếu lên trục tung $Y$:** Nút có tung độ $Y$ lớn nhất ($6, 15$) chễm chệ nằm ở đỉnh cao nhất làm gốc cây. Càng đi xuống các nhánh con, tung độ $Y$ càng giảm dần ($14 \to 9 \to 6 \to 2 \dots$), đúng như cấu trúc của một Max-Heap!

Mỗi tập hợp các điểm $(X, Y)$ với $X$ và $Y$ đôi một khác nhau sẽ xác định **duy nhất một cây Descartes**!

---

## 3. Cặp bài trùng vạn năng: Split và Merge

Hầu hết sách giáo khoa cổ điển dạy Treap bằng các phép xoay cây (Tree Rotations) tương tự AVL. Nhưng trong Competitive Programming hiện đại, chúng ta **vứt bỏ hoàn toàn phép xoay**!

Tất cả mọi thao tác trên đời của Treap — từ chèn, xóa, tìm kiếm, đến cắt ghép đoạn — đều được xây dựng từ đúng hai hàm đệ quy siêu ngắn: **Split (Cắt cây)** và **Merge (Gộp cây)**.

### Định nghĩa cấu trúc Nút (Node):

```cpp
#include <iostream>
#include <cstdlib>

using namespace std;

struct Node {
    int key;       // Khóa X (BST)
    int prior;     // Độ ưu tiên Y (Heap)
    Node *l, *r;

    Node(int key) : key(key), prior(rand()), l(nullptr), r(nullptr) {}
    Node(int key, int prior) : key(key), prior(prior), l(nullptr), r(nullptr) {}
};

typedef Node* pnode;
```

---

### 3.1. Thao tác Cắt: `split(t, key, l, r)`

Hàm `split` nhận vào cây $T$ và một giá trị $key$, rồi xẻ đôi $T$ thành hai cây con riêng biệt:
- Cây $L$: Chứa tất cả các nút có khóa $\le key$.
- Cây $R$: Chứa tất cả các nút có khóa $> key$.

![Thao tác Split trên Treap](/images/treap-split.png)

Cơ chế đệ quy:
1. Nếu cây rỗng: Cả $L$ và $R$ đều là `nullptr`.
2. Nếu khóa tại gốc `t->key <= key`: Toàn bộ cây con trái `t->l` và chính nút `t` chắc chắn thuộc về cây $L$. Ta chỉ cần đệ quy xẻ đôi cây con phải `t->r` để tìm phần còn lại bổ sung vào $L$ và $R$.
3. Ngược lại (`t->key > key`): Toàn bộ cây con phải `t->r` và nút `t` thuộc về cây $R$. Ta đệ quy xẻ đôi cây con trái `t->l`.

```cpp
void split(pnode t, int key, pnode &l, pnode &r) {
    if (!t) {
        l = r = nullptr;
    } else if (t->key <= key) {
        // Cây con phải t->r sẽ tiếp tục bị chia đôi
        split(t->r, key, t->r, r);
        l = t; // Nút t cùng toàn bộ nhánh trái thuộc về l
    } else {
        // Cây con trái t->l sẽ tiếp tục bị chia đôi
        split(t->l, key, l, t->l);
        r = t; // Nút t cùng toàn bộ nhánh phải thuộc về r
    }
}
```

> **Lưu ý cú pháp:** Tham số `pnode &l, pnode &r` là tham chiếu con trỏ (pointer reference). Nhờ cơ chế này, kết quả của các hàm con được nối trực tiếp vào nhánh của cha mà không cần viết lệnh gán phức tạp!

---

### 3.2. Thao tác Gộp: `merge(t, l, r)`

Hàm `merge` nhận vào hai cây $L$ và $R$ với điều kiện tiên quyết: **Tất cả các khóa trong $L$ đều nhỏ hơn mọi khóa trong $R$** ($X_L < X_R$). Nhiệm vụ là gộp chúng lại thành cây $T$ duy nhất mà không phá vỡ tính chất Heap của $Y$.

![Thao tác Merge trên Treap](/images/treap-merge.png)

Cơ chế đệ quy:
1. Nếu một trong hai cây rỗng: Cây kết quả chính là cây còn lại.
2. So sánh độ ưu tiên tại gốc:
   - Nếu `l->prior > r->prior`: Nút gốc của $L$ có độ ưu tiên cao hơn, nên nó sẽ làm cha! Nhánh trái của nó giữ nguyên, còn nhánh phải `l->r` sẽ được gộp tiếp với toàn bộ cây $R$.
   - Ngược lại (`r->prior >= l->prior`): Gốc của $R$ sẽ làm cha, nhánh trái `r->l` sẽ được gộp với cây $L$.

```cpp
void merge(pnode &t, pnode l, pnode r) {
    if (!l || !r) {
        t = l ? l : r;
    } else if (l->prior > r->prior) {
        merge(l->r, l->r, r);
        t = l;
    } else {
        merge(r->l, l, r->l);
        t = r;
    }
}
```

Cả `split` và `merge` đều lần theo chiều cao của cây, do đó thời gian chạy của cả hai đều chỉ là **$O(\log N)$**!

---

## 4. Chèn và Xóa: Đỉnh cao của sự thanh lịch

Khi đã có `split` và `merge` trong tay, việc chèn và xóa nút không còn cần bất cứ dòng code dò tìm phức tạp nào.

### 4.1. Thao tác Chèn: `insert(x)`

Muốn chèn một giá trị $X$ vào cây $T$:
1. Dùng `split(T, X, T1, T2)` để chia cây thành hai nửa: $T_1$ chứa các phần tử $\le X$, và $T_2$ chứa các phần tử $> X$.
2. Tạo nút mới `new_node = new Node(X)`.
3. Gộp $T_1$ với `new_node`: `merge(T1, T1, new_node)`.
4. Gộp kết quả đó với $T_2$: `merge(T, T1, T2)`.

![Thao tác Insert bằng Split và Merge](/images/treap-insert.png)

Chỉ 3 dòng code để chèn một phần tử vào cây tự cân bằng:

```cpp
void insert(pnode &t, int x) {
    pnode t1, t2;
    split(t, x, t1, t2);
    merge(t1, t1, new Node(x));
    merge(t, t1, t2);
}
```

---

### 4.2. Thao tác Xóa: `erase(x)`

Muốn xóa giá trị $X$ khỏi cây:
1. Dùng `split(T, X - 1, T1, T2)`: Tách ra phần tử $< X$ vào $T_1$.
2. Dùng `split(T2, X, Target, T3)`: Tách riêng các phần tử bằng $X$ vào `Target`, còn lại các phần tử $> X$ vào $T_3$.
3. Gộp lại $T_1$ và $T_3$ (bỏ qua `Target`): `merge(T, T1, T3)`.
4. Giải phóng bộ nhớ của `Target`!

![Thao tác Erase bằng Split và Merge](/images/treap-erase.png)

```cpp
void erase(pnode &t, int x) {
    pnode t1, t2, target;
    split(t, x - 1, t1, t2);
    split(t2, x, target, t2);
    // target chứa nút có giá trị đúng bằng x
    delete target;
    merge(t, t1, t2);
}
```

Bạn có thấy vẻ đẹp thuần khiết ở đây không? Không cần xét các trường hợp nút có 0 con, 1 con hay 2 con như trong giáo trình Cấu trúc dữ liệu! Cặp bài trùng `split` và `merge` đã làm sạch toàn bộ các chi tiết phiền toái.

---

## 5. Quản lý kích thước cây con: Tìm phần tử thứ $K$ trong $O(\log N)$

Muốn tìm phần tử lớn thứ $K$ hoặc tìm vị trí xếp hạng (Rank) của một phần tử, ta chỉ cần thêm một trường `cnt` (kích thước cây con) vào cấu trúc `Node`:

```cpp
struct Node {
    int key, prior;
    int cnt; // Số nút trong cây con có gốc tại nút này
    Node *l, *r;
    Node(int key) : key(key), prior(rand()), cnt(1), l(nullptr), r(nullptr) {}
};

int get_cnt(pnode t) {
    return t ? t->cnt : 0;
}

void upd_cnt(pnode t) {
    if (t) {
        t->cnt = 1 + get_cnt(t->l) + get_cnt(t->r);
    }
}
```

Chỉ cần nhớ gọi `upd_cnt(t)` ở cuối mỗi hàm `split` và `merge`, trường `cnt` sẽ luôn luôn chính xác 100%!

---

## 6. Xây dựng Treap trong $O(N)$ bằng Monotonic Stack

Nếu ta đã có sẵn danh sách các khóa $X$ đã được sắp xếp và độ ưu tiên $Y$, việc chèn từng phần tử sẽ mất $O(N \log N)$. Nhưng ta hoàn toàn có thể xây dựng Cây Descartes hoàn chỉnh trong đúng **$O(N)$** bằng cách sử dụng **Ngăn xếp đơn điệu (Monotonic Stack)**!

Thuật toán hoạt động như sau:
- Duyệt qua từng phần tử $i$ từ trái sang phải.
- Duy trì một Stack chứa đường đi bên phải nhất của cây (các nút có độ ưu tiên giảm dần).
- Với mỗi phần tử mới: Loại bỏ các phần tử trong Stack có độ ưu tiên nhỏ hơn phần tử hiện tại. Phần tử cuối cùng bị pop ra sẽ trở thành con trái của nút mới, còn nút mới sẽ trở thành con phải của phần tử còn lại trên đỉnh Stack!

Kỹ thuật này cực kỳ thông dụng khi giải bài toán tìm Range Minimum Query (RMQ) chuyển về tổ tiên chung gần nhất (LCA) trên cây Descartes.

---

## 7. Vũ khí tối thượng: Implicit Treap (Treap với chỉ số ngầm định)

Nếu Treap thông thường đã ấn tượng, thì **Implicit Treap (Cây Treap ngầm định)** chính là đỉnh cao đưa Treap trở thành một trong những cấu trúc dữ liệu uy lực nhất từng được phát minh.

### Ý tưởng: Mảng động biết làm xiếc!
Trong mảng thông thường, các phần tử có chỉ số cố định $0, 1, 2, \dots, N-1$. Nếu bạn chèn thêm 1 phần tử vào vị trí số $2$, bạn phải dịch chuyển tất cả các phần tử phía sau sang phải $1$ bước, tốn $O(N)$.

Trong **Implicit Treap**:
- Ta **không lưu bất kỳ khóa $X$ nào** trong nút!
- Khóa $X$ của mỗi nút chính là **vị trí ngầm định (index)** của nó trong mảng, được tính bằng:
  $$\text{index} = \text{cnt}(T \to L) + \sum (\text{cnt}(P \to L) + 1)$$
  *(tức bằng số lượng phần tử thuộc cây con bên trái cộng với phần đóng góp từ các nút tổ tiên khi rẽ phải)*
- Khi bạn chèn một phần tử vào giữa, chỉ số của hàng triệu phần tử phía sau tự động dịch chuyển trong $O(\log N)$ mà không cần cập nhật từng nút!

### Cắt cây theo chỉ số (Split by Size):
Cắt cây thành hai nửa: $L$ chứa $k$ phần tử đầu tiên (chỉ số $< k$), và $R$ chứa các phần tử còn lại:

```cpp
void split(pnode t, int key, pnode &l, pnode &r, int add = 0) {
    if (!t) {
        l = r = nullptr;
        return;
    }
    push(t); // Đẩy cờ lazy nếu có
    int cur_key = add + get_cnt(t->l); // Chỉ số thực tế của nút t
    if (key <= cur_key) {
        split(t->l, key, l, t->l, add);
        r = t;
    } else {
        split(t->r, key, t->r, r, add + 1 + get_cnt(t->l));
        l = t;
    }
    upd_cnt(t);
}
```

---

### "Đặc sản" của Implicit Treap: Đảo ngược đoạn $[L, R]$ trong $O(\log N)$

Hãy tưởng tượng bài toán: *"Cho mảng $N$ phần tử, thực hiện $Q$ thao tác lật ngược một đoạn con bất kỳ từ chỉ số $L$ đến $R$ (Reverse array $[L, R]$)."*

Mọi cấu trúc như Segment Tree hay Fenwick Tree đều "bó tay" toàn tập trước bài toán này. Nhưng với Implicit Treap, nó dễ như trở bàn tay nhờ cơ chế **Lazy Propagation**:

1. Cắt cây làm 3 phần: $T_1$ (trước $L$), $T_2$ (đoạn $[L, R]$), và $T_3$ (sau $R$).
2. Đoạn $T_2$ giờ đây chính là toàn bộ đoạn $[L, R]$ cần đảo ngược. Ta chỉ cần **gắn cờ** `t2->rev ^= true`!
3. Khi hàm `push(t)` được gọi, ta chỉ việc hoán đổi hai con trái phải của nó (`swap(t->l, t->r)`) và truyền cờ đảo xuống cho hai con!
4. Gộp lại $T_1, T_2, T_3$ như cũ.

```cpp
void push(pnode it) {
    if (it && it->rev) {
        it->rev = false;
        swap(it->l, it->r); // Đảo ngược cây con trái và phải
        if (it->l) it->l->rev ^= true;
        if (it->r) it->r->rev ^= true;
    }
}

void reverse(pnode &t, int l, int r) {
    pnode t1, t2, t3;
    split(t, l, t1, t2);
    split(t2, r - l + 1, t2, t3);
    t2->rev ^= true; // Đảo ngược thần tốc!
    merge(t2, t2, t3);
    merge(t, t1, t2);
}
```

Độ phức tạp cho mỗi lần đảo ngược toàn bộ một dãy hàng triệu phần tử: **chỉ $O(\log N)$**!

---

## 8. Bảng so sánh toàn cảnh: Treap và các đối thủ

| Tiêu chí | Treap (Randomized BST) | Cây Đỏ-Đen (std::set) | Segment Tree | Fenwick Tree (BIT) |
| :--- | :--- | :--- | :--- | :--- |
| **Độ phức tạp trung bình** | $O(\log N)$ | $O(\log N)$ | $O(\log N)$ | $O(\log N)$ |
| **Độ khó cài đặt** | Cực kỳ dễ (chỉ split & merge) | Cực khó (ác mộng xoay cây) | Trung bình | Cực dễ |
| **Chèn/Xóa phần tử vào giữa mảng** | **Hỗ trợ tuyệt vời trong $O(\log N)$** | Không làm được | Không làm được | Không làm được |
| **Cắt/Ghép hai mảng (Split/Merge)** | **$O(\log N)$** | $O(N)$ | $O(N)$ | $O(N)$ |
| **Đảo ngược một đoạn mảng** | **$O(\log N)$ (Vô địch)** | Bó tay | Bó tay | Bó tay |
| **Tốc độ thực tế** | Rất nhanh (hằng số nhỏ) | Nhanh | Siêu nhanh | Vô địch tốc độ |

---

## 9. Bài tập thực chiến kinh điển

Nếu bạn muốn làm chủ hoàn toàn Treap, đây là lộ trình các bài tập không thể bỏ qua:

1. **[SPOJ - ADAAPHID](http://www.spoj.com/problems/ADAAPHID/):** Bài tập cơ bản luyện tập các thao tác chèn và tính tổng trên Treap.
2. **[SPOJ - TWIST](http://www.spoj.com/problems/TWIST/):** Đảo ngược các đoạn con liên tiếp — bài toán kinh điển để kiểm tra trình độ Implicit Treap.
3. **[Codeforces 863D - Yet Another Array Queries Problem](https://codeforces.com/contest/863/problem/D):** Các thao tác dịch vòng (cyclic shift) và đảo ngược mảng.
4. **[Codeforces 702F - T-Shirts](https://codeforces.com/contest/702/problem/F):** Bài toán mức độ Master sử dụng kỹ thuật gộp cây Treap (`unite`).
5. **[acmsguru 155 - Cartesian Tree](https://codeforces.com/problemsets/acmsguru/problem/99999/155):** Xây dựng cây Descartes trong thời gian tuyến tính $O(N)$ với ngăn xếp đơn điệu.

---

## 10. Lời kết

Treap là minh chứng rực rỡ nhất cho triết lý: **"Sự đơn giản là đỉnh cao của sự tinh tế"**. Bằng cách mượn tính ngẫu nhiên của tự nhiên để giải bài toán cân bằng, Treap loại bỏ đi hàng tá quy tắc xoay cây phức tạp và thay thế bằng cặp hàm đệ quy `split` & `merge` đẹp như thơ.

Lần tới khi gặp một bài toán đòi hỏi vừa chèn phần tử vào giữa mảng, vừa đảo ngược đoạn, vừa tính tổng trong chớp mắt, bạn đã biết vũ khí bí mật nào cần rút ra rồi đấy!
