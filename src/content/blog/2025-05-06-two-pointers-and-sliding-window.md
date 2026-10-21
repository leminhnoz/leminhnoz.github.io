---
title: "Kỹ thuật Hai con trỏ (Two Pointers) và Cửa sổ trượt (Sliding Window): Biến O(N^2) thành O(N)"
description: "Làm chủ kỹ thuật Hai con trỏ (Two Pointers) và Sliding Window: Khám phá cách tính đơn điệu giúp loại bỏ vòng lặp thừa và đưa độ phức tạp về tuyến tính O(N)."
pubDate: "2025-05-06"
tags: ["Algorithms", "Two Pointers", "C++", "Competitive Programming"]
categories: ["Competitive Programming"]
excerpt: "Bí quyết của Two Pointers không nằm ở con trỏ, mà nằm ở việc nhận ra tính đơn điệu: khi con trỏ phải tiến tới, con trỏ trái không bao giờ phải quay lùi lại quá khứ."
---

> *"Nếu bạn thấy mình đang duyệt hai vòng lặp lồng nhau $O(N^2)$ để tìm một đoạn con thỏa mãn điều kiện, hãy dừng lại 10 giây và tự hỏi: Liệu con trỏ trái có bao giờ thực sự cần phải quay đầu lại hay không?"*

Hãy xem xét một bài toán rất phổ biến:
Cho một mảng $A$ gồm $N = 2 \cdot 10^5$ số nguyên **dương** và một số nguyên $K$.
> *"Tìm độ dài lớn nhất của một đoạn con liên tiếp có tổng các phần tử không vượt quá $K$."*

---

## 1. Cách tiếp cận tự nhiên: Hai vòng lặp ngây thơ

Cách đơn giản nhất mà ai cũng nghĩ ra đầu tiên:
Thử mọi điểm bắt đầu $L$ từ $1$ đến $N$, rồi kéo dài điểm kết thúc $R$ từ $L$ đến $N$ để kiểm tra tổng:

```cpp
int max_len = 0;
for (int L = 1; L <= n; ++L) {
    long long current_sum = 0;
    for (int R = L; R <= n; ++R) {
        current_sum += A[R];
        if (current_sum <= K) {
            max_len = max(max_len, R - L + 1);
        } else {
            break; // Vượt quá K thì không cần thử R lớn hơn nữa
        }
    }
}
```

Thuật toán này trong trường hợp xấu nhất (mọi số đều nhỏ) sẽ chạy qua $\frac{N(N+1)}{2}$ cặp $(L, R)$. Với $N = 2 \cdot 10^5$, số phép tính là $2 \cdot 10^{10} \to$ **Time Limit Exceeded**.

### Nhìn lại: Ta đang lãng phí điều gì?
Giả sử với $L = 1$, ta kéo dài $R$ đến vị trí $5$ thì tổng vẫn $\le K$, nhưng sang vị trí $6$ thì tổng vượt quá $K$.
Vòng lặp ngoài sau đó tăng $L$ lên $2$.
Thuật toán ngây thơ sẽ đặt $R = 2$ và **bắt đầu cộng lại từ đầu**: $A[2], A[2]+A[3], \dots$

Nhưng hãy nhớ: **Tất cả các số trong mảng đều là số dương!**
Khi ta bỏ bớt phần tử $A[1]$ đi, tổng của đoạn $[2, 5]$ chắc chắn nhỏ hơn tổng của đoạn $[1, 5]$. Do đó, đoạn $[2, 5]$ **chắc chắn hợp lệ mà không cần kiểm tra lại**!
$R$ hoàn toàn có thể tiếp tục tiến lên từ vị trí $5$ chứ **không bao giờ cần lùi về $2$**!

---

## 2. Bản chất của Hai con trỏ: Con trỏ không bao giờ quay đầu

Đây chính là chìa khóa của kỹ thuật **Hai con trỏ (Two Pointers)**:
- Ta duy trì hai chỉ số $L$ và $R$ (ban đầu cùng ở đầu mảng).
- Mở rộng cửa sổ: Tăng $R$ lên và cộng thêm $A[R]$ vào tổng hiện tại.
- Thu hẹp cửa sổ: Nếu tổng vượt quá $K$, ta tăng $L$ lên và trừ bớt $A[L]$ cho đến khi tổng $\le K$.

```text
Mảng: [2, 1, 3, 2, 4], K = 6

Bước 1: L=0, R=0 -> [2]        Tổng = 2 <= 6 (len = 1)
Bước 2: L=0, R=1 -> [2, 1]     Tổng = 3 <= 6 (len = 2)
Bước 3: L=0, R=2 -> [2, 1, 3]  Tổng = 6 <= 6 (len = 3)
Bước 4: L=0, R=3 -> [2, 1, 3, 2] Tổng = 8 > 6!
        -> Thu hẹp L: Trừ A[0]=2, L=1 -> [1, 3, 2] Tổng = 6 <= 6 (len = 3)
Bước 5: L=1, R=4 -> [1, 3, 2, 4] Tổng = 10 > 6!
        -> Thu hẹp L: Trừ A[1]=1, L=2 -> [3, 2, 4] Tổng = 9 > 6!
        -> Thu hẹp L: Trừ A[2]=3, L=3 -> [2, 4] Tổng = 6 <= 6 (len = 2)
```

### Tại sao độ phức tạp là $O(N)$?
Hãy quan sát hành trình của hai biến $L$ và $R$:
- Con trỏ $R$ chỉ di chuyển từ $0$ đến $N - 1$: Tối đa $N$ bước.
- Con trỏ $L$ cũng chỉ di chuyển từ $0$ đến $N - 1$: Tối đa $N$ bước.
- Cả hai con trỏ đều **chỉ tiến lên, không bao giờ lùi lại**.

Tổng số thao tác dịch chuyển của cả hai con trỏ tối đa là $N + N = 2N$ thao tác.
Độ phức tạp tổng thể giảm ngoạn mục từ $O(N^2)$ xuống **$O(N)$**!

---

## 3. Mã nguồn C++ chuẩn mực

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    long long k;
    if (!(cin >> n >> k)) return 0;

    vector<long long> a(n);
    for (int i = 0; i < n; ++i) {
        cin >> a[i];
    }

    int max_len = 0;
    long long current_sum = 0;
    int L = 0;

    for (int R = 0; R < n; ++R) {
        current_sum += a[R];

        // Thu hẹp cửa sổ khi điều kiện bị vi phạm
        while (current_sum > k && L <= R) {
            current_sum -= a[L];
            L++;
        }

        // Cập nhật kết quả khi cửa sổ hợp lệ
        max_len = max(max_len, R - L + 1);
    }

    cout << max_len << "\n";
    return 0;
}
```

---

## 4. Hai dạng biến thể kinh điển của Two Pointers

### Dạng 1: Cùng chiều (Sliding Window - Cửa sổ trượt)
Hai con trỏ $L$ và $R$ cùng xuất phát từ bên trái và cùng trượt dần sang bên phải.
- **Ứng dụng**: Tìm đoạn con liên tiếp ngắn nhất/dài nhất thỏa mãn tính chất (tổng $\le K$, chứa tối đa $M$ ký tự khác nhau, chứa tất cả các phần tử phân biệt).

### Dạng 2: Ngược chiều (Opposite Direction)
Một con trỏ đặt ở đầu mảng ($L = 0$), một con trỏ đặt ở cuối mảng ($R = N - 1$). Cả hai cùng tiến về phía nhau.
- **Bài toán kinh điển: 2-Sum trên mảng đã sắp xếp**
  Tìm hai số trong mảng có tổng đúng bằng $X$.
  - Nếu $A[L] + A[R] == X$: Đã tìm thấy!
  - Nếu $A[L] + A[R] < X$: Tổng đang quá nhỏ $\to$ cần tăng tổng $\to$ tăng $L++$.
  - Nếu $A[L] + A[R] > X$: Tổng đang quá lớn $\to$ cần giảm tổng $\to$ giảm $R--$.

```cpp
bool hasTwoSum(const vector<int>& a, int target) {
    int L = 0, R = (int)a.size() - 1;
    while (L < R) {
        int sum = a[L] + a[R];
        if (sum == target) return true;
        if (sum < target) L++;
        else R--;
    }
    return false;
}
```

---

## 5. Cái bẫy chết người: Khi nào Two Pointers THẤT BẠI?

> [!CAUTION]
> Two Pointers chỉ hoạt động khi bài toán có **TÍNH ĐƠN ĐIỆU (Monotonicity)**:
> Khi mở rộng $R$, điều kiện chỉ có thể chuyển dịch theo một chiều (ví dụ: tổng chỉ có thể tăng lên).
> Khi tăng $L$, điều kiện chuyển dịch theo chiều ngược lại (ví dụ: tổng chỉ có thể giảm đi).

Nếu mảng $A$ có chứa **cả số âm lẫn số dương**:
Khi $R$ tăng, tổng có thể vừa tăng vừa giảm bất thường. Lúc này, tính đơn điệu bị phá vỡ hoàn toàn $\to$ Two Pointers sẽ cho kết quả sai!
Để xử lý mảng có số âm, bạn bắt buộc phải dùng **Prefix Sum kết hợp với `std::map`** hoặc thuật toán khác.

---

## 6. Bài tập thực hành đề xuất

1. **CSES 1660 — Subarray Sums I**: Đếm số lượng đoạn con có tổng bằng $X$ trên mảng số nguyên dương.
2. **Codeforces 279B — Books**: Chọn số lượng sách nhiều nhất có thể đọc trong thời gian giới hạn $T$.
3. **CSES 1640 — Sum of Two Values**: Bài toán 2-Sum kinh điển dùng Two Pointers ngược chiều sau khi sắp xếp.

Khám phá tiếp bài học quan trọng tiếp theo trên [Roadmap](/roadmap/): **Tìm kiếm nhị phân căn bản (Binary Search Fundamentals)**!
