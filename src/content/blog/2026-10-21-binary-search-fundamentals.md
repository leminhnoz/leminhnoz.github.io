---
title: "Tìm kiếm nhị phân căn bản: Bất biến vòng lặp và nghệ thuật không bao giờ lặp vô tận"
description: "Làm chủ thuật toán Tìm kiếm nhị phân (Binary Search): Bất biến vòng lặp, cách tránh lỗi tràn số và lặp vô tận (off-by-one), cùng cơ chế của std::lower_bound và upper_bound."
pubDate: "2026-10-21"
tags: ["Binary Search", "Algorithms", "C++", "Competitive Programming"]
categories: ["Competitive Programming"]
excerpt: "Tìm kiếm nhị phân là thuật toán mà ai cũng nghĩ mình đã hiểu, nhưng hơn 80% lập trình viên từng viết sai điều kiện biên. Khám phá cách cài đặt chuẩn mực không bao giờ dính bug lặp vô tận."
---

> *"Dù ý tưởng cơ bản của tìm kiếm nhị phân cực kỳ đơn giản, nhưng chi tiết cài đặt lại khiến ngay cả những lập trình viên hàng đầu cũng có thể mắc lỗi."* — Donald Knuth

Tìm kiếm nhị phân (Binary Search) là một trong những thuật toán thanh lịch và quyền năng nhất của khoa học máy tính. Nếu bạn có một danh bạ điện thoại gồm $1$ triệu cái tên đã sắp xếp theo thứ tự bảng chữ cái, thay vì lật từng trang từ đầu đến cuối ($10^6$ bước), bạn chỉ cần **tối đa 20 lần lật sách** để tìm thấy người mình cần:
$$\log_2(1\,000\,000) \approx 19.93$$

Tuy nhiên, trong các kỳ thi lập trình, Binary Search là một trong những nơi sinh ra nhiều bug ngớ ngẩn nhất:
- Vòng lặp `while` chạy mãi mãi không bao giờ dừng (Infinite Loop).
- Tràn số nguyên `(low + high) / 2` khi giá trị vượt quá $2 \cdot 10^9$.
- Nhầm lẫn giữa `lower_bound` và `upper_bound`.
- Tìm lệch đúng $1$ vị trí (Off-by-one error).

Bài viết này sẽ giúp bạn hiểu tường tận bản chất của Binary Search và cách viết code chuẩn xác đến từng bit.

---

## 1. Trực giác: Trò chơi đoán số bí mật

Hãy tưởng tượng tôi chọn một số bí mật từ $1$ đến $100$. Mỗi lần bạn đoán, tôi chỉ trả lời:
- *"Lớn hơn rồi!"*
- *"Nhỏ hơn rồi!"*
- *"Chính xác!"*

Chiến lược thông minh nhất của bạn là gì? Bạn sẽ luôn đoán số ở **chính giữa**:
1. Lần 1: Bạn đoán $50$. Tôi nói *"Lớn hơn rồi"*. Bạn loại bỏ ngay $50$ số đầu tiên $(1 \to 50)$, vùng tìm kiếm chỉ còn $[51, 100]$.
2. Lần 2: Bạn đoán $\frac{51 + 100}{2} = 75$. Tôi nói *"Nhỏ hơn rồi"*. Bạn loại bỏ $[75, 100]$, vùng tìm kiếm còn $[51, 74]$.
3. Cứ sau mỗi câu trả lời, không gian tìm kiếm **bị cưa đôi một nửa**.

Điều kiện tiên quyết duy nhất để làm được điều này: **Tập dữ liệu phải có tính đơn điệu (đã sắp xếp)**.

---

## 2. Cái bẫy tràn số (Integer Overflow)

Cách tính chỉ số giữa ngây thơ mà người mới thường viết:

```cpp
int mid = (low + high) / 2; // NGUY HIỂM!
```

Nếu $low$ và $high$ là các số nguyên lớn gần $2 \cdot 10^9$ (ví dụ trong bài toán tìm kiếm trên tập kết quả), tổng `low + high` sẽ vượt quá giới hạn $2^{31} - 1$ của kiểu `int`, dẫn tới **tràn số nguyên** thành số âm, kéo theo việc truy cập chỉ số âm gây crash chương trình!

### Cách viết an toàn tuyệt đối:
```cpp
int mid = low + (high - low) / 2;
```
Biểu thức này hoàn toàn tương đương về mặt toán học nhưng hiệu `high - low` luôn không âm và không bao giờ vượt quá dung lượng kiểu dữ liệu.

---

## 3. Bản chất của Bất biến vòng lặp (Loop Invariant)

Có nhiều cách viết Binary Search, nhưng cách an toàn và dễ nhớ nhất dựa trên nguyên tắc **giữ chặt không gian tìm kiếm**:

```cpp
#include <vector>
#include <iostream>

using namespace std;

// Tìm vị trí của giá trị target trong mảng a đã sắp xếp tăng dần
// Trả về chỉ số (0-indexed) nếu tìm thấy, ngược lại trả về -1
int binarySearch(const vector<int>& a, int target) {
    int low = 0;
    int high = (int)a.size() - 1;

    while (low <= high) {
        int mid = low + (high - low) / 2;

        if (a[mid] == target) {
            return mid; // Tìm thấy!
        }
        if (a[mid] < target) {
            low = mid + 1; // target phải nằm ở nửa bên phải
        } else {
            high = mid - 1; // target phải nằm ở nửa bên trái
        }
    }

    return -1; // Không tìm thấy
}
```

### Tại sao đoạn code trên không bao giờ bị lặp vô tận?
1. Điều kiện dừng là `low <= high`.
2. Trong mỗi nhánh:
   - Nếu `a[mid] < target`, ta gán `low = mid + 1`. Khoảng cách từ `low` đến `high` chắc chắn giảm ít nhất 1.
   - Nếu `a[mid] > target`, ta gán `high = mid - 1`. Khoảng cách từ `low` đến `high` chắc chắn giảm ít nhất 1.
3. Vì thế, độ dài khoảng cách $[low, high]$ liên tục thu hẹp về 0, đảm bảo vòng lặp **bắt buộc phải kết thúc** sau tối đa $\lfloor \log_2 N \rfloor + 1$ bước!

---

## 4. `std::lower_bound` và `std::upper_bound`: Hai trợ thủ đắc lực

Trong các kỳ thi Competitive Programming, chúng ta rất hiếm khi chỉ cần tìm chính xác một phần tử. Thường đề bài sẽ yêu cầu:
- *"Tìm phần tử đầu tiên $\ge X$."* $\to$ **`std::lower_bound`**
- *"Tìm phần tử đầu tiên $> X$."* $\to$ **`std::upper_bound`**

Cả hai hàm này đều có sẵn trong thư viện `<algorithm>` của C++ và chạy trong thời gian $O(\log N)$.

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

using namespace std;

int main() {
    // Mảng đã sắp xếp
    vector<int> a = {1, 2, 4, 4, 4, 7, 9};

    // 1. lower_bound(4): Tìm phần tử đầu tiên >= 4
    auto it1 = lower_bound(a.begin(), a.end(), 4);
    int idx1 = it1 - a.begin();
    cout << "Vi tri dau tien >= 4: " << idx1 << " (Gia tri: " << *it1 << ")\n"; // idx1 = 2

    // 2. upper_bound(4): Tìm phần tử đầu tiên > 4
    auto it2 = upper_bound(a.begin(), a.end(), 4);
    int idx2 = it2 - a.begin();
    cout << "Vi tri dau tien > 4: " << idx2 << " (Gia tri: " << *it2 << ")\n"; // idx2 = 5 (giá trị 7)

    // 3. Đếm số lần xuất hiện của số 4 trong O(log N)
    int count_4 = it2 - it1;
    cout << "So luong phan tu co gia tri 4 la: " << count_4 << "\n"; // 3 phần tử

    return 0;
}
```

---

## 5. Từ Tìm kiếm trên Mảng đến Tìm kiếm trên Tập kết quả

Tìm kiếm nhị phân trên mảng đã sắp xếp chỉ là mức độ cơ bản nhất. Sức mạnh tối thượng của Binary Search trong Competitive Programming bùng nổ khi ta áp dụng nó lên **không gian đáp án** (Binary Search on Answer).

Khi một bài toán có dạng:
> *"Tìm giá trị $X$ nhỏ nhất sao cho thỏa mãn điều kiện $P(X)$."*
> Nếu với $X$ hợp lệ thì mọi $X' > X$ cũng hợp lệ (hàm kiểm tra có tính đơn điệu `false, false, ..., false, true, true`).

Lúc đó, ta không cần mảng nào cả! Ta chỉ cần nhị phân trực tiếp trên khoảng giá trị $[0, 10^{18}]$ của $X$. Bạn có thể đọc bài viết chuyên sâu về kỹ thuật này tại: [Chặt nhị phân kết quả (Binary Search on Answer)](/blog/binary-search-on-answer).

---

## 6. Bài tập rèn luyện trên hệ thống

1. **MarisaOJ #76 — Tìm kiếm nhị phân 2**: Luyện tập tìm vị trí xuất hiện đầu tiên của phần tử. (Xem chi tiết tại [Trang Problems](/problems/)).
2. **MarisaOJ #79 — Truy vấn đếm**: Đếm số phần tử trong đoạn $[L, R]$ bằng cách kết hợp `lower_bound` và `upper_bound`.
3. **Codeforces 706B — Interesting drink**: Ứng dụng `upper_bound` để đếm số quán bán nước có giá hợp lý.

Tiếp tục hành trình học tập tại [Roadmap](/roadmap/) với **Stage 4: Nhập môn Lý thuyết Đồ thị (DFS & BFS)**!
