---
title: "Mảng cộng dồn (Prefix Sum) và Mảng hiệu (Difference Array): Cội nguồn của xử lý mảng"
description: "Khám phá kỹ thuật Mảng cộng dồn 1D, 2D và Mảng hiệu: Bí quyết biến truy vấn tổng đoạn từ O(N) thành O(1) và cập nhật đoạn trong O(1)."
pubDate: "2026-10-21"
tags: ["Algorithms", "Data Structures", "C++", "Competitive Programming"]
categories: ["Competitive Programming"]
excerpt: "Trước khi vội vã học Fenwick Tree hay Segment Tree phức tạp, hãy làm chủ Prefix Sum và Difference Array — hai nền tảng kinh điển giải quyết trọn vẹn các bài toán truy vấn tổng và cập nhật đoạn tĩnh."
---

> *"Mọi cấu trúc dữ liệu truy vấn đoạn siêu việt — từ Sparse Table, Fenwick Tree đến Segment Tree — đều bắt đầu từ một ý niệm nguyên thủy: tiền xử lý thông tin để trả lời câu hỏi tương lai trong $O(1)$."*

Hãy tưởng tượng bạn đang đối mặt với bài toán sau:
Cho một mảng số nguyên $A$ gồm $N = 10^5$ phần tử. Bạn nhận được $Q = 10^5$ câu hỏi dạng:
> *"Tính tổng các phần tử từ chỉ số $L$ đến $R$?"*

### Cách giải ngây thơ (Naive Approach)
Với mỗi truy vấn, bạn dùng một vòng lặp chạy từ $L$ đến $R$ để cộng dồn:

```cpp
long long total = 0;
for (int i = L; i <= R; ++i) {
    total += A[i];
}
```

Mỗi truy vấn trong trường hợp xấu nhất tốn $O(N)$ thời gian. Với $Q = 10^5$ truy vấn, tổng số phép tính sẽ là $O(N \times Q) = 10^5 \times 10^5 = 10^{10}$ phép tính. Như ta đã biết từ bài học [Độ phức tạp Big-O](/blog/2026-10-21-time-and-space-complexity-big-o), $10^{10}$ phép tính sẽ khiến chương trình chạy mất 100 giây $\to$ Nhận **Time Limit Exceeded** tức thì!

Làm thế nào để trả lời mỗi câu hỏi trong đúng **1 phép tính duy nhất** ($O(1)$)? Chào mừng bạn đến với **Mảng cộng dồn (Prefix Sum)**.

---

## 1. Mảng cộng dồn 1D: Nguyên lý bù trừ

Ý tưởng trực quan: Thay vì chờ người ta hỏi rồi mới lật đật đi cộng, ta hãy **chuẩn bị trước một mảng tổng từ đầu đến từng vị trí**.

Định nghĩa mảng $P$ (1-indexed) với:
- $P[0] = 0$
- $P[i] = A[1] + A[2] + \dots + A[i] = P[i-1] + A[i]$

Ví dụ với mảng $A$:

| Chỉ số $i$ | 1 | 2 | 3 | 4 | 5 |
|:---|:---:|:---:|:---:|:---:|:---:|
| $A[i]$ | 3 | 1 | 4 | 1 | 5 |
| $P[i]$ | 3 | 4 | 8 | 9 | 14 |

Bây giờ, nếu muốn tính tổng đoạn từ $L = 2$ đến $R = 4$ (tức là $A[2] + A[3] + A[4]$):
- Ta biết tổng từ $1 \to 4$ là $P[4] = A[1] + A[2] + A[3] + A[4] = 9$.
- Phần thừa ra từ $1 \to (L - 1) = 1$ là $P[1] = A[1] = 3$.
- Vậy tổng đoạn $[L, R]$ chỉ đơn giản là:
$$\text{Sum}(L, R) = P[R] - P[L - 1] = 9 - 3 = 6$$

Chính xác: $1 + 4 + 1 = 6$! Chỉ tốn đúng **một phép trừ duy nhất** thời gian $O(1)$!

```cpp
#include <iostream>
#include <vector>

using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n, q;
    if (!(cin >> n >> q)) return 0;

    vector<long long> a(n + 1);
    vector<long long> pref(n + 1, 0);

    for (int i = 1; i <= n; ++i) {
        cin >> a[i];
        pref[i] = pref[i - 1] + a[i]; // Tiền xử lý trong O(N)
    }

    while (q--) {
        int l, r;
        cin >> l >> r;
        // Trả lời mỗi truy vấn trong O(1)
        cout << (pref[r] - pref[l - 1]) << "\n";
    }

    return 0;
}
```

> [!TIP]
> **Quy tắc 1-indexed:** Khi làm việc với Prefix Sum, hãy luôn sử dụng mảng đánh số từ $1$ đến $N$ với $P[0] = 0$. Điều này giúp công thức $P[R] - P[L-1]$ luôn đúng ngay cả khi $L = 1$ mà không cần phải viết thêm câu lệnh `if (L == 0)`.

---

## 2. Mảng cộng dồn 2D: Truy vấn hình chữ nhật trên ma trận

Bây giờ bài toán nâng cấp lên ma trận 2 chiều kích thước $N \times M$. Ta cần tính tổng các số trong một hình chữ nhật con từ ô $(r_1, c_1)$ đến ô $(r_2, c_2)$.

Định nghĩa $P[i][j]$ là tổng các ô trong hình chữ nhật từ góc trên-trái $(1, 1)$ đến $(i, j)$.

### Công thức xây dựng $P[i][j]$ (Nguyên lý Bao hàm - Loại trừ):
$$P[i][j] = P[i-1][j] + P[i][j-1] - P[i-1][j-1] + A[i][j]$$

- Ta lấy tổng hình chữ nhật phía trên $P[i-1][j]$ cộng với hình chữ nhật bên trái $P[i][j-1]$.
- Do phần giao nhau ở góc trên-trái $P[i-1][j-1]$ bị tính 2 lần, ta phải trừ nó ra một lần.
- Cuối cùng cộng thêm giá trị của chính ô $A[i][j]$.

### Công thức truy vấn hình chữ nhật $[r_1 \dots r_2][c_1 \dots c_2]$:
$$\text{Sum} = P[r_2][c_2] - P[r_1 - 1][c_2] - P[r_2][c_1 - 1] + P[r_1 - 1][c_1 - 1]$$

```cpp
// Tính tổng ma trận con trong O(1)
long long query2D(int r1, int c1, int r2, int c2, const vector<vector<long long>>& P) {
    return P[r2][c2] 
         - P[r1 - 1][c2] 
         - P[r2][c1 - 1] 
         + P[r1 - 1][c1 - 1];
}
```

---

## 3. Mảng hiệu (Difference Array): Cập nhật đoạn thần tốc $O(1)$

Hãy đảo ngược bài toán:
Giả sử ta có mảng $A$ ban đầu gồm toàn số 0. Người ta cho bạn $Q = 10^5$ thao tác:
> *"Cộng thêm một giá trị $V$ vào tất cả các phần tử trong đoạn từ $L$ đến $R$."*
> Cuối cùng, in ra giá trị của mảng $A$.

Nếu mỗi thao tác ta duyệt một vòng lặp `for (int i = L; i <= R; ++i) A[i] += V;`, ta lại mất $O(N \times Q) = 10^{10}$ thao tác $\to$ TLE.

**Mảng hiệu (Difference Array)** ra đời để giải quyết việc này trong $O(1)$ cho mỗi cập nhật!

### Ý tưởng cốt lõi
Định nghĩa mảng hiệu $D$ với $D[i] = A[i] - A[i-1]$ (coi $A[0] = 0$).
Nhận xét kỳ diệu: **Mảng ban đầu $A$ chính là mảng cộng dồn của mảng hiệu $D$!**
$$A[i] = D[1] + D[2] + \dots + D[i]$$

Khi ta cộng $V$ vào tất cả các phần tử từ $L$ đến $R$:
- Hiệu giữa $A[L]$ và $A[L-1]$ tăng thêm $V$ $\to$ Ta thực hiện: `D[L] += V;`
- Hiệu giữa các phần tử bên trong đoạn $[L, R]$ không hề thay đổi!
- Hiệu giữa $A[R+1]$ và $A[R]$ giảm đi $V$ (vì $A[R]$ đã được cộng thêm $V$ còn $A[R+1]$ thì không) $\to$ Ta thực hiện: `D[R + 1] -= V;`

Chỉ với **2 phép gán duy nhất**, ta đã ghi nhận thao tác cộng cả đoạn $[L, R]$!

```cpp
#include <iostream>
#include <vector>

using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n, q;
    if (!(cin >> n >> q)) return 0;

    vector<long long> diff(n + 2, 0);

    while (q--) {
        int l, r;
        long long v;
        cin >> l >> r >> v;
        diff[l] += v;
        diff[r + 1] -= v; // O(1) cho mỗi thao tác cập nhật
    }

    // Khôi phục lại mảng kết quả bằng Prefix Sum trong O(N)
    vector<long long> a(n + 1, 0);
    for (int i = 1; i <= n; ++i) {
        a[i] = a[i - 1] + diff[i];
        cout << a[i] << " ";
    }
    cout << "\n";

    return 0;
}
```

---

## 4. Khi nào dùng Prefix Sum, khi nào cần Tree?

| Tình huống bài toán | Kỹ thuật phù hợp | Độ phức tạp |
|:---|:---|:---|
| Mảng **tĩnh** (không thay đổi), chỉ truy vấn tổng liên tục | **Prefix Sum** | Chuẩn bị $O(N)$, truy vấn $O(1)$ |
| Toàn bộ cập nhật đoạn diễn ra **trước**, chỉ cần in kết quả cuối cùng | **Difference Array** | Cập nhật $O(1)$, khôi phục $O(N)$ |
| Vừa cập nhật điểm, vừa truy vấn tổng xen kẽ | [Fenwick Tree](/blog/2026-10-21-fenwick-tree-binary-indexed-tree) hoặc [Segment Tree](/blog/2026-10-21-segment-tree) | $O(\log N)$ mỗi thao tác |
| Cập nhật đoạn xen kẽ truy vấn đoạn thời gian thực | [Segment Tree với Lazy Propagation](/blog/2026-10-21-segment-tree) | $O(\log N)$ mỗi thao tác |

---

## 5. Bài tập rèn luyện thực chiến

1. **CSES 1646 — Static Range Sum Queries**: Bài tập kinh điển rèn luyện Prefix Sum 1D. (Xem trong [Hệ thống bài tập](/problems/)).
2. **CSES 1652 — Forest Queries**: Truy vấn tổng số cây trong hình chữ nhật 2D bằng 2D Prefix Sum.
3. **MarisaOJ 203 — Cập nhật đoạn, truy vấn tổng**: Làm quen với bài toán cập nhật đoạn.

Hãy quay lại [Roadmap](/roadmap/) để bước sang bài học tiếp theo: **Kỹ thuật Hai con trỏ (Two Pointers) và Cửa sổ trượt (Sliding Window)**!
