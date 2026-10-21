---
title: "Kỹ thuật Chia đôi tập (Meet in the Middle): Đột phá giới hạn từ O(2^N) sang O(2^(N/2))"
description: "Khám phá kỹ thuật Chia đôi tập (Meet in the Middle): Bí quyết giải quyết bài toán Subset Sum và 4-Sum với N = 40, biến 10^12 phép tính bất khả thi thành 10^6 phép tính chạy trong chớp mắt."
pubDate: "2025-05-24"
tags: ["Meet in the Middle", "Algorithms", "Binary Search", "C++", "Competitive Programming"]
categories: ["Competitive Programming"]
excerpt: "Khi giới hạn bài toán N = 40, nó quá lớn cho thuật toán vét cạn 2^N, nhưng lại quá nhỏ cho các thuật toán tuyến tính. Đây chính là dấu hiệu vàng của kỹ thuật Meet in the Middle."
---

> *"Nếu việc leo qua cả một ngọn núi cao 40 tầng quá nguy hiểm, hãy cho hai đội cứu hộ đào hầm từ hai chân núi và hẹn gặp nhau ở chính giữa."*

Hãy tưởng tượng bạn đang đối mặt với bài toán sau:
Cho một mảng gồm $N = 40$ số nguyên dương $A_1, A_2, \dots, A_N$ và một số nguyên $X$.
> *"Đếm số cách chọn một tập hợp con các phần tử có tổng đúng bằng $X$."*

### Nhìn vào giới hạn $N = 40$:
- Nếu $N \le 20$: Mỗi phần tử có 2 lựa chọn (chọn hoặc không chọn), tổng số tập con là $2^{20} \approx 10^6$. Duyệt bằng Bitmask hoặc đệ quy chỉ mất $0.02$ giây.
- Nhưng với $N = 40$: Tổng số tập con là:
$$2^{40} \approx 1.1 \times 10^{12} \text{ phép tính}$$
Như ta đã biết từ bài học [Độ phức tạp Big-O](/blog/2025-03-04-time-and-space-complexity-big-o), một giây máy tính chỉ chạy được $10^8$ phép tính. $10^{12}$ phép tính sẽ mất hơn **3 giờ đồng hồ** để chạy xong $\to$ Nhận **Time Limit Exceeded** tức thì!

Làm thế nào để đưa một bài toán $10^{12}$ bước về giải trong chưa đầy $0.2$ giây? Hãy cùng khám phá kỹ thuật **Chia đôi tập (Meet in the Middle)**!

---

## 1. Ý tưởng cốt lõi: Chia để trị không gian trạng thái

Điểm kỳ diệu của phép toán cộng là: Một tập con của cả mảng $40$ phần tử có thể phân rã thành:
> **(Một tập con của 20 phần tử đầu tiên) $+$ (Một tập con của 20 phần tử cuối cùng)**

Thay vì duyệt toàn bộ $2^{40}$ tập con cùng lúc:
1. **Nửa thứ nhất:** Chia mảng thành nửa đầu gồm $N_1 = 20$ phần tử. Ta sinh toàn bộ $2^{20} \approx 10^6$ tổng tập con của nửa này và lưu vào mảng `left_sums`.
2. **Nửa thứ hai:** Nửa sau gồm $N_2 = 20$ phần tử. Ta cũng sinh toàn bộ $2^{20} \approx 10^6$ tổng tập con của nửa sau và lưu vào mảng `right_sums`.
3. **Gặp nhau ở giữa (Meet in the Middle):**
   Với mỗi tổng $S$ nằm trong `left_sums`, ta cần tìm xem trong `right_sums` có bao nhiêu tổng bằng $X - S$!
   Để làm điều này siêu tốc:
   - Ta **sắp xếp** mảng `right_sums` tăng dần trong $O(2^{N_2} \log(2^{N_2}))$.
   - Dùng **Tìm kiếm nhị phân** (`std::equal_range` hoặc `upper_bound - lower_bound`) để đếm số phần tử có giá trị $X - S$ trong đúng $O(N_2)$ bước!

---

## 2. Phân tích độ phức tạp: Bước nhảy vọt kỳ diệu

- Sinh nửa trái: $O(2^{N/2}) \approx 2^{20} \approx 10^6$ bước.
- Sinh nửa phải: $O(2^{N/2}) \approx 10^6$ bước.
- Sắp xếp nửa phải: $O(2^{N/2} \cdot \frac{N}{2}) \approx 10^6 \times 20 \approx 2 \cdot 10^7$ bước.
- Ghép kết quả: $2^{N/2} \times \frac{N}{2} \approx 2 \cdot 10^7$ bước.

$$\text{Tổng số phép tính} \approx 4 \cdot 10^7 \ll 10^8$$

Từ một bài toán tưởng chừng bất khả thi với $10^{12}$ bước, thuật toán chỉ mất **$4 \cdot 10^7$ phép tính**, chạy vèo một cái trong **$0.15$ giây**!

---

## 3. Triển khai C++ mẫu mực

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

// Hàm sinh tất cả các tổng tập con của một mảng con
void getSubsetSums(const vector<long long>& arr, vector<long long>& sums) {
    int n = arr.size();
    int total_subsets = 1 << n; // 2^n
    sums.reserve(total_subsets);

    for (int mask = 0; mask < total_subsets; ++mask) {
        long long current_sum = 0;
        for (int i = 0; i < n; ++i) {
            if ((mask >> i) & 1) {
                current_sum += arr[i];
            }
        }
        sums.push_back(current_sum);
    }
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

    int n;
    long long target_x;
    if (!(cin >> n >> target_x)) return 0;

    vector<long long> a(n);
    for (int i = 0; i < n; ++i) {
        cin >> a[i];
    }

    // Chia mảng thành 2 nửa
    int mid = n / 2;
    vector<long long> left_half(a.begin(), a.begin() + mid);
    vector<long long> right_half(a.begin() + mid, a.end());

    // Sinh tất cả các tổng tập con cho từng nửa
    vector<long long> left_sums;
    vector<long long> right_sums;
    getSubsetSums(left_half, left_sums);
    getSubsetSums(right_half, right_sums);

    // Sắp xếp nửa phải để tìm kiếm nhị phân
    sort(right_sums.begin(), right_sums.end());

    long long total_ways = 0;

    // Gặp nhau ở giữa
    for (long long s : left_sums) {
        long long needed = target_x - s;
        // Đếm số lượng phần tử trong right_sums có giá trị đúng bằng needed
        auto [low, high] = equal_range(right_sums.begin(), right_sums.end(), needed);
        total_ways += (high - low);
    }

    cout << total_ways << "\n";
    return 0;
}
```

---

## 4. Dấu hiệu nhận biết bài toán Meet in the Middle

Khi đọc đề bài, hãy để ý hai tín hiệu then chốt:
1. Giới hạn $N$ nằm trong khoảng **$30 \le N \le 45$**.
2. Bài toán có bản chất là chọn các tập hợp con độc lập (hoặc hai đầu của một đồ thị) và kết quả của hai nửa có thể dễ dàng kết hợp với nhau bằng phép cộng, phép XOR, hoặc tìm kiếm nhị phân.

---

## 5. Bài tập rèn luyện thực tế

1. **CSES 1628 — Meet in the Middle**: Bài toán nguyên bản đếm số tập con có tổng bằng $X$ với $N = 40$.
2. **Codeforces 888E — Maximum Subsequence**: Tìm tổng tập con modulo $M$ lớn nhất với $N \le 35$.
3. **LeetCode 1755 — Closest Subsequence Sum**: Tìm tổng tập con gần với giá trị mục tiêu nhất.

Xem tiếp bài học tiếp theo trên [Roadmap](/roadmap/)!
