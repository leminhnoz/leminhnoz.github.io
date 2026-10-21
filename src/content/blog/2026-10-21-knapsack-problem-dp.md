---
title: "Toàn diện về Bài toán cái túi (Knapsack Problem): Từ Balo 0-1 đến tối ưu hàng đợi đơn điệu"
description: "Phân tích chi tiết và dễ hiểu toàn bộ các dạng bài toán cái túi trong Quy hoạch động: Balo 0-1, Balo không giới hạn, Balo bội số (tối ưu nhị phân & hàng đợi đơn điệu) và Balo hỗn hợp."
pubDate: "2026-10-21"
tags: ["Dynamic Programming", "Knapsack", "Algorithms", "C++", "Competitive Programming"]
categories: ["Competitive Programming"]
excerpt: "Chỉ một thay đổi nhỏ ở chiều duyệt for (từ W về w[i] hay từ w[i] đến W) có thể biến Balo 0-1 thành Balo không giới hạn. Tìm hiểu bản chất và các kỹ thuật tối ưu kinh điển của Knapsack DP."
---

> *"Nếu có một bài toán xuất hiện trong hầu hết mọi giáo trình thuật toán và kỳ thi Competitive Programming, đó chắc chắn là Bài toán cái túi (Knapsack Problem)."*

Ở bài viết trước, chúng ta đã tìm hiểu bản chất của Quy hoạch động qua dãy số Fibonacci. Hôm nay, chúng ta sẽ bước sang một trong những mô hình ứng dụng thực tế và kinh điển nhất: **Knapsack Problem**.

Tưởng tượng bạn có một chiếc balo với sức chứa tối đa là $W$. Trước mặt bạn là $N$ món đồ, mỗi món đồ có trọng lượng $w_i$ và giá trị $v_i$. Làm sao để chọn các món đồ bỏ vào balo sao cho tổng trọng lượng không vượt quá $W$ mà **tổng giá trị thu được là lớn nhất**?

Tùy vào số lượng của mỗi món đồ bạn được phép chọn, bài toán cái túi được chia thành 4 biến thể chính:
1. **0-1 Knapsack:** Mỗi món đồ chỉ được chọn tối đa **1 lần** (hoặc chọn - 1, hoặc bỏ qua - 0).
2. **Complete Knapsack (Unbounded):** Mỗi món đồ có thể chọn **vô hạn lần**.
3. **Multiple Knapsack (Bounded):** Mỗi món đồ có số lượng giới hạn $k_i$.
4. **Mixed Knapsack:** Hỗn hợp cả 3 loại trên.

Hãy cùng đi qua từng dạng bài từ trực giác toán học, công thức chuyển trạng thái đến mã nguồn C++ tối ưu.

---

## 1. Balo 0-1 (0-1 Knapsack Problem)

### Đặt bài toán
- Có $N$ đồ vật. Đồ vật thứ $i$ có trọng lượng $w_i$ và giá trị $v_i$.
- Sức chứa balo là $W$.
- Mỗi đồ vật chỉ được lấy tối đa **1 lần**.

### Thiết kế trạng thái (State Design)
Gọi $f[i][j]$ là **giá trị lớn nhất** có thể đạt được khi chỉ xét trong số $i$ đồ vật đầu tiên ($1 \le i \le N$) với sức chứa balo là $j$ ($0 \le j \le W$).

Khi xét đến đồ vật thứ $i$, ta chỉ có đúng 2 lựa chọn:
1. **Không chọn đồ vật $i$:** Balo không tốn thêm trọng lượng, giá trị không đổi. Kết quả chính là kết quả tốt nhất khi xét $i-1$ đồ vật trước đó:
   $$\text{val}_1 = f[i-1][j]$$
2. **Có chọn đồ vật $i$ (chỉ khi $j \ge w_i$):** Ta phải bớt ra $w_i$ sức chứa từ trước đó và nhận về giá trị $v_i$:
   $$\text{val}_2 = f[i-1][j - w_i] + v_i$$

Kết hợp cả hai trường hợp, ta có công thức quy hoạch động:
$$f[i][j] = \max(f[i-1][j], f[i-1][j - w_i] + v_i)$$

Độ phức tạp thời gian và không gian: $O(N \cdot W)$.

---

### Tối ưu không gian: Nén mảng từ 2D xuống 1D

Nhìn vào công thức, bạn sẽ nhận thấy một điều quan trọng: **hàng $f[i]$ chỉ phụ thuộc duy nhất vào hàng liền trước $f[i-1]$**. Ta hoàn toàn có thể bỏ đi chiều thứ nhất và chỉ dùng mảng một chiều $f[j]$.

Công thức nén thành:
$$f[j] = \max(f[j], f[j - w_i] + v_i)$$

Nhưng có một cái bẫy chết người ở đây: **Chiều duyệt của vòng lặp $j$!**

```cpp
// Cài đặt chuẩn xác cho Balo 0-1
for (int i = 1; i <= n; i++) {
    for (int j = W; j >= w[i]; j--) { // BẮT BUỘC duyệt ngược từ W về w[i]
        f[j] = max(f[j], f[j - w[i]] + v[i]);
    }
}
```

### Tại sao Balo 0-1 bắt buộc phải duyệt ngược ($j: W \to w_i$)?

Hãy phân tích cơ chế cập nhật:
- Ta muốn giá trị $f[j - w_i]$ ở vế phải phải là giá trị của **bước $i-1$ (chưa bị đồ vật $i$ tác động)**.
- Nếu bạn duyệt ngược từ $W$ xuống $w_i$, khi bạn đang tính $f[j]$, các ô nhỏ hơn như $f[j - w_i]$ **vẫn chưa bị ghi đè**, nghĩa là chúng vẫn giữ nguyên giá trị từ bước $i-1$.
- Ngược lại, nếu bạn duyệt xuôi ($j$ từ $w_i$ lên $W$), ô $f[j - w_i]$ đã bị cập nhật bởi đồ vật $i$ từ trước đó. Khi đó bạn lấy nó cộng thêm $v_i$ một lần nữa, đồ vật $i$ sẽ bị bỏ vào balo **nhiều lần**!

---

## 2. Balo không giới hạn (Complete / Unbounded Knapsack)

### Đặt bài toán
Hoàn toàn giống Balo 0-1, chỉ khác một điều duy nhất: **mỗi đồ vật có thể chọn số lần tùy ý (không giới hạn)**.

### Công thức chuyển trạng thái
Vì có thể chọn vật $i$ nhiều lần, nên sau khi chọn vật $i$, ta vẫn có quyền chọn tiếp vật $i$ ở trạng thái hiện tại. Công thức 2 chiều là:
$$f[i][j] = \max(f[i-1][j], f[i][j - w_i] + v_i)$$

*(Chú ý: ở vế chọn đồ vật, ta lấy từ $f[i][\dots]$ chứ không phải $f[i-1][\dots]$).*

### Cài đặt 1D: Phép màu của việc đổi chiều vòng lặp

Khi nén xuống mảng 1D, công thức nhìn y hệt Balo 0-1:
$$f[j] = \max(f[j], f[j - w_i] + v_i)$$

Nhưng bây giờ, ta **duyệt xuôi từ $w_i$ đến $W$**:

```cpp
// Cài đặt cho Balo không giới hạn
for (int i = 1; i <= n; i++) {
    for (int j = w[i]; j <= W; j++) { // Duyệt xuôi từ w[i] đến W
        f[j] = max(f[j], f[j - w[i]] + v[i]);
    }
}
```

Khi duyệt xuôi:
1. Tại $j = w_i$, ta chọn vật $i$ lần 1.
2. Tại $j = 2w_i$, $f[j - w_i] = f[w_i]$ đã chứa vật $i$, ta cộng thêm $v_i$ thành chứa vật $i$ lần 2.
3. Cứ thế, vật $i$ tự động được cộng dồn nhiều lần nếu điều đó mang lại giá trị tối ưu hơn.

| Loại bài toán | Chiều duyệt vòng lặp $j$ | Ý nghĩa |
| :--- | :--- | :--- |
| **0-1 Knapsack** | $j: W \to w_i$ (Duyệt ngược) | Mỗi vật lấy tối đa 1 lần |
| **Complete Knapsack** | $j: w_i \to W$ (Duyệt xuôi) | Mỗi vật lấy không giới hạn |

---

## 3. Balo bội số (Multiple / Bounded Knapsack)

### Đặt bài toán
Mỗi đồ vật thứ $i$ có số lượng giới hạn là $k_i$ cái ($0 \le k_i$).

### Cách tiếp cận ngây thơ
Ý tưởng đơn giản nhất: coi $k_i$ đồ vật giống nhau này như $k_i$ món đồ riêng biệt rồi áp dụng thuật toán Balo 0-1.
- Công thức: $f[i][j] = \max_{k=0}^{k_i} (f[i-1][j - k \cdot w_i] + k \cdot v_i)$
- Độ phức tạp thời gian: $O(W \sum_{i=1}^n k_i)$. Nếu $k_i$ lên tới $10^5$, cách này chắc chắn sẽ bị quá thời gian (TLE).

### Kỹ thuật 1: Tối ưu chia nhị phân (Binary Grouping Optimization)

Thay vì chia $k_i$ thành $k_i$ vật phẩm có trọng số 1, ta chia $k_i$ thành các nhóm có kích thước là **lũy thừa của 2**:
$$1, 2, 4, 8, \dots, 2^m \quad \text{và phần dư } R$$

**Tại sao lại là lũy thừa của 2?**
Theo hệ nhị phân, mọi số nguyên từ $0$ đến $2^{m+1}-1$ đều có thể biểu diễn duy nhất dưới dạng tổng của một tập hợp con các lũy thừa của 2. Bằng cách thêm phần dư $R = k_i - (2^{m+1}-1)$, ta đảm bảo **mọi số nguyên từ $0$ đến $k_i$ đều có thể tạo thành từ tổng của các nhóm này**.

*Ví dụ:* Nếu $k_i = 13$:
- Các lũy thừa của 2: $1, 2, 4$ (tổng là 7).
- Phần dư còn lại: $13 - 7 = 6$.
- Ta có 4 bó vật phẩm với kích thước: $\{1, 2, 4, 6\}$.
- Bất kỳ số nào từ $1 \dots 13$ đều lập được từ 4 số trên:
  - $3 = 1 + 2$
  - $5 = 1 + 4$
  - $9 = 1 + 2 + 6$
  - $13 = 1 + 2 + 4 + 6$

Số lượng vật phẩm sau khi phân tách chỉ còn $O(\log k_i)$. Độ phức tạp giảm từ $O(W \sum k_i)$ xuống:
$$O(W \sum_{i=1}^n \log k_i)$$

```cpp
struct Item {
    int w, v;
};

vector<Item> items;

// Bước 1: Tách nhị phân
for (int i = 1; i <= n; i++) {
    int weight, value, count;
    cin >> weight >> value >> count;
    
    int c = 1;
    while (count >= c) {
        items.push_back({c * weight, c * value});
        count -= c;
        c *= 2;
    }
    if (count > 0) {
        items.push_back({count * weight, count * value});
    }
}

// Bước 2: Chạy Balo 0-1 thông thường trên tập items đã tách
for (auto& item : items) {
    for (int j = W; j >= item.w; j--) {
        f[j] = max(f[j], f[j - item.w] + item.v);
    }
}
```

---

### Kỹ thuật 2: Tối ưu bằng Hàng đợi đơn điệu (Monotone Queue Optimization)

Chia nhị phân đưa độ phức tạp về $O(N \cdot W \log K)$. Nhưng ta hoàn toàn có thể giải quyết Balo bội số trong thời gian tối ưu tuyệt đối:
$$O(N \cdot W)$$

#### Ý tưởng cốt lõi
Khi xét một vật có trọng lượng $w_i$, các trạng thái $j$ chỉ có thể chuyển đổi cho nhau nếu chúng **có cùng số dư khi chia cho $w_i$**.

Do đó, ta có thể chia $W$ trạng thái thành $w_i$ nhóm độc lập dựa trên số dư $r = j \pmod{w_i}$ với $0 \le r < w_i$:
- Nhóm $r$: $r, r + w_i, r + 2w_i, \dots, r + x \cdot w_i$

Đặt $j = x \cdot w_i + r$. Biến đổi công thức chuyển trạng thái:
$$f[x \cdot w_i + r] = \max_{0 \le k \le k_i} \left( f_{i-1}[(x - k) \cdot w_i + r] + k \cdot v_i \right)$$

Trừ hai vế cho $x \cdot v_i$:
$$f[x \cdot w_i + r] - x \cdot v_i = \max_{0 \le k \le k_i} \left( f_{i-1}[(x - k) \cdot w_i + r] - (x - k) \cdot v_i \right)$$

Nếu đặt $G(t) = f_{i-1}[t \cdot w_i + r] - t \cdot v_i$, bài toán trở thành:
**Tìm giá trị lớn nhất của $G(t)$ trong cửa sổ trượt $x - k_i \le t \le x$**.

Đây chính là bài toán tìm Max trên cửa sổ trượt (Sliding Window Maximum) quen thuộc, có thể giải trong thời gian trung bình $O(1)$ mỗi bước bằng **Monotonic Deque (Hàng đợi đơn điệu)**!

---

## 4. Balo hỗn hợp (Mixed Knapsack)

Trong thực tế thi đấu, bạn có thể gặp bài toán kết hợp cả 3 loại:
- Món đồ loại 1: Chỉ được chọn 1 lần.
- Món đồ loại 2: Được chọn vô hạn lần.
- Món đồ loại 3: Được chọn tối đa $k_i$ lần.

### Hướng giải quyết
Không cần thuật toán mới! Hãy duyệt qua từng đồ vật và áp dụng đúng đoạn code tương ứng:

```cpp
for (int i = 1; i <= n; i++) {
    if (is_01_knapsack(i)) {
        // Duyệt ngược
        for (int j = W; j >= w[i]; j--)
            f[j] = max(f[j], f[j - w[i]] + v[i]);
    } 
    else if (is_complete_knapsack(i)) {
        // Duyệt xuôi
        for (int j = w[i]; j <= W; j++)
            f[j] = max(f[j], f[j - w[i]] + v[i]);
    } 
    else if (is_multiple_knapsack(i)) {
        // Dùng chia nhị phân để tách thành các vật 0-1 rồi duyệt ngược
        // Hoặc dùng Monotonic Queue nếu W lớn
    }
}
```

---

## 5. Bảng tổng kết nhanh các dạng Knapsack

| Dạng bài | Số lượng mỗi vật | Chiều duyệt $j$ | Độ phức tạp thời gian | Độ phức tạp bộ nhớ |
| :--- | :--- | :--- | :--- | :--- |
| **0-1 Knapsack** | 1 | $W \to w_i$ (Ngược) | $O(N \cdot W)$ | $O(W)$ |
| **Complete Knapsack** | Vô hạn | $w_i \to W$ (Xuôi) | $O(N \cdot W)$ | $O(W)$ |
| **Multiple (Nhị phân)** | $k_i$ | $W \to w_i$ (Ngược) | $O(W \sum \log k_i)$ | $O(W)$ |
| **Multiple (Queue)** | $k_i$ | Khử theo số dư | $O(N \cdot W)$ | $O(W)$ |
| **Mixed Knapsack** | Hỗn hợp | Linh hoạt theo loại | $O(N \cdot W)$ | $O(W)$ |

---

## Lời kết

Bài toán cái túi là cánh cửa tuyệt vời để hiểu sâu về cách tối ưu hóa Quy hoạch động:
1. Từ việc phân tích bài toán con để đưa ra công thức 2D.
2. Nén không gian từ $O(NW)$ xuống $O(W)$ bằng mảng 1D.
3. Nhận ra sự khác biệt vi diệu giữa chiều duyệt xuôi và duyệt ngược.
4. Áp dụng toán học (chia nhị phân) và cấu trúc dữ liệu (hàng đợi đơn điệu) để tối ưu thời gian chạy.

Nắm chắc các kỹ thuật trên, bạn đã sẵn sàng giải quyết phần lớn các bài toán liên quan đến Knapsack và tổng tập con trong các kỳ thi học sinh giỏi cũng như trên Codeforces, AtCoder!
