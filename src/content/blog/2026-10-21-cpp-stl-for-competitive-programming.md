---
title: "Làm chủ C++ STL trong Competitive Programming: Từ bản chất cấu trúc đến tốc độ thực thi"
description: "Cẩm nang toàn diện về C++ Standard Template Library (STL) trong lập trình thi đấu: vector, set, map, priority_queue, lambda comparator và cái bẫy O(N) của unordered_map."
pubDate: "2026-10-21"
tags: ["C++", "Competitive Programming", "Data Structures", "Foundations"]
categories: ["Competitive Programming"]
excerpt: "STL không chỉ là công cụ giúp bạn không phải tự viết lại cây nhị phân hay heap. Hiểu rõ cấu trúc bên dưới giúp bạn chọn đúng container, tránh TLE vì hằng số ẩn và không bao giờ bị hack O(N) trên Codeforces."
---

> *"Nếu C++ là thanh bảo kiếm của dân lập trình thi đấu, thì STL (Standard Template Library) chính là lưỡi kiếm sắc bén nhất."*

Khi mới bước vào Competitive Programming (CP), nhiều bạn thường có xu hướng tự viết lại mảng tĩnh, tự cài đặt hàm sắp xếp QuickSort hay tự dựng danh sách liên kết. Tuy nhiên, thời gian trong phòng thi là vàng bạc. Bộ thư viện tiêu chuẩn C++ STL cung cấp sẵn gần như toàn bộ cấu trúc dữ liệu kinh điển được tối ưu hóa đến từng chu kỳ CPU.

Nhưng dùng STL "nhắm mắt" rất dễ dẫn tới kết quả đau đớn: nộp bài nhận **TLE** mà không hiểu tại sao, hoặc bị đối thủ "hack" rớt đài trên Codeforces chỉ vì một chiếc `unordered_map`.

Bài viết này sẽ giúp bạn hiểu tường tận bản chất bên dưới của các container STL thiết yếu và cách sử dụng chúng một cách khôn ngoan nhất.

---

## 1. Mở đầu: Tăng tốc nhập xuất (Fast I/O)

Trước khi nói về STL, đây là 3 dòng lệnh bắt buộc phải có ở đầu hàm `main()` của mọi bài thi:

```cpp
ios_base::sync_with_stdio(false);
cin.tie(NULL);
```

- `ios_base::sync_with_stdio(false)`: Ngắt đồng bộ giữa luồng `cin/cout` của C++ với `scanf/printf` của ngôn ngữ C. Sau dòng này, tốc độ của `cin/cout` nhanh ngang ngửa, thậm chí vượt trội hơn `scanf/printf`.
- `cin.tie(NULL)`: Ngắt sự ràng buộc tự động xả bộ đệm (flush) của `cout` mỗi khi gọi `cin`.
- **Tránh dùng `std::endl`**: `endl` thực hiện hai thao tác: in dấu xuống dòng `\n` và gọi hàm `flush()`. Việc liên tục xả bộ đệm $10^5$ lần sẽ làm chậm chương trình gấp 10 lần. Luôn dùng `'\n'`.

---

## 2. `std::vector`: Vua của các Container

`vector` là mảng động có thể tự co giãn kích thước. Nhiều người sợ `vector` chậm hơn mảng tĩnh `int a[N]`, nhưng thực tế nhờ cơ chế lưu trữ liên tục trong bộ nhớ (*Cache Locality*), `vector` có tốc độ duyệt mảng nhanh gần như tương đương mảng tĩnh.

### Cơ chế phình to dung lượng (Capacity Doubling)
Khi bạn gọi `push_back()` và mảng đã đầy, `vector` sẽ cấp phát một vùng nhớ mới có dung lượng gấp đôi (hoặc gấp 1.5 lần), sao chép toàn bộ dữ liệu cũ sang và xóa vùng nhớ cũ. Vì thế:
- Thao tác `push_back()` có độ phức tạp trung bình (amortized) là **$O(1)$**.
- Nhưng nếu biết trước mảng có $N$ phần tử, hãy gọi `v.reserve(N)` để vector cấp phát một lần duy nhất, loại bỏ hoàn toàn chi phí sao chép nhiều lần!

```cpp
#include <vector>
#include <iostream>

using namespace std;

int main() {
    int n = 5;
    vector<int> a(n, 0); // Khởi tạo 5 phần tử giá trị 0
    
    // Thêm phần tử
    a.push_back(10);
    a.push_back(20);
    
    // Lấy kích thước
    cout << "Size: " << a.size() << "\n"; // 7
    
    // Duyệt bằng range-based for
    for (int x : a) {
        cout << x << " ";
    }
    cout << "\n";
    
    return 0;
}
```

---

## 3. `std::set` và `std::map`: Sức mạnh của Cây Đỏ-Đen (Red-Black Tree)

`std::set` và `std::map` được cài đặt bên dưới bằng **Cây tìm kiếm nhị phân tự cân bằng (Balanced BST - Red-Black Tree)**.

- **`std::set<T>`**: Tập hợp các phần tử **không trùng lặp** và **luôn được duy trì ở trạng thái có thứ tự tăng dần**.
- **`std::map<Key, Value>`**: Bảng ánh xạ từ khóa sang giá trị, các khóa cũng được sắp xếp tăng dần.
- Độ phức tạp cho mọi thao tác thêm (`insert`), xóa (`erase`), tìm kiếm (`find`, `count`, `lower_bound`): **$O(\log N)$**.

```cpp
#include <set>
#include <iostream>

using namespace std;

int main() {
    set<int> s;
    s.insert(5);
    s.insert(2);
    s.insert(8);
    s.insert(5); // Bị bỏ qua vì 5 đã tồn tại
    
    // In ra: 2 5 8 (tự động có thứ tự)
    for (int x : s) cout << x << " ";
    cout << "\n";
    
    // Tìm kiếm phần tử >= x trong O(log N)
    auto it = s.lower_bound(3);
    if (it != s.end()) {
        cout << "Phan tu nho nhat >= 3 la: " << *it << "\n"; // In ra 5
    }
    
    return 0;
}
```

> [!WARNING]
> Khi dùng `lower_bound` trên `std::set`, **bắt buộc** phải dùng phương thức thành viên `s.lower_bound(x)`. Nếu bạn gọi hàm toàn cục `std::lower_bound(s.begin(), s.end(), x)`, thời gian chạy sẽ biến thành **$O(N)$** vì iterator của `set` không phải Random-Access Iterator!

---

## 4. `std::unordered_map` và Cái bẫy $O(N)$ chống Hack trên Codeforces

Khác với `map` chạy trong $O(\log N)$, `unordered_map` sử dụng **Bảng băm (Hash Table)** với thời gian trung bình lý thuyết là **$O(1)$**.

Tuy nhiên, hàm băm mặc định của C++ (`std::hash<long long>`) trên các máy chấm GCC rất ngây thơ: nó lấy trực tiếp giá trị của số nguyên. Đối thủ có thể dễ dàng tạo ra một bộ test gồm toàn các số có giá trị modulo rơi vào cùng một bucket băm. Khi xảy ra va chạm băm hàng loạt (Hash Collision), bảng băm suy biến thành một danh sách liên kết đơn dài ngoằng, và độ phức tạp nhảy vọt từ **$O(1)$ lên $O(N)$** $\to$ Bài thi bị chấm TLE 100%!

### Cách khắc phục: Custom Hash an toàn
Sử dụng hàm băm tự tạo với số ngẫu nhiên thời gian thực (`chrono`) để không ai có thể đoán trước cách phân bố bucket:

```cpp
#include <chrono>
#include <unordered_map>
using namespace std;

struct custom_hash {
    static uint64_t splitmix64(uint64_t x) {
        // Thuật toán SplitMix64 xáo trộn bit siêu tốc
        x += 0x9e3779b97f4a7c15;
        x = (x ^ (x >> 30)) * 0xbf58476d1ce4e5b9;
        x = (x ^ (x >> 27)) * 0x94d049bb133111eb;
        return x ^ (x >> 31);
    }

    size_t operator()(uint64_t x) const {
        static const uint64_t FIXED_RANDOM = 
            chrono::steady_clock::now().time_since_epoch().count();
        return splitmix64(x + FIXED_RANDOM);
    }
};

// Khai báo an toàn tuyệt đối chống hack:
unordered_map<long long, int, custom_hash> safe_map;
```

---

## 5. `std::priority_queue`: Hàng đợi ưu tiên (Heap)

`priority_queue` được cài đặt dưới dạng **Max-Heap nhị phân**:
- Thao tác thêm `push()`: $O(\log N)$.
- Thao tác lấy phần tử lớn nhất `top()`: $O(1)$.
- Thao tác xóa đỉnh `pop()`: $O(\log N)$.

Mặc định, `priority_queue` lấy phần tử **lớn nhất** ra trước. Nếu muốn làm **Min-Heap** (lấy phần tử nhỏ nhất ra trước — rất phổ biến trong thuật toán Dijkstra), ta khai báo:

```cpp
#include <queue>
#include <vector>
#include <iostream>

using namespace std;

int main() {
    // Min-heap lưu các số nguyên
    priority_queue<int, vector<int>, greater<int>> min_pq;
    
    min_pq.push(10);
    min_pq.push(3);
    min_pq.push(25);
    
    while (!min_pq.empty()) {
        cout << min_pq.top() << " "; // In ra: 3 10 25
        min_pq.pop();
    }
    cout << "\n";
    return 0;
}
```

---

## 6. Sắp xếp tùy biến (`std::sort`) với Lambda Expression

`std::sort` trong C++ sử dụng thuật toán **Introsort** (kết hợp giữa QuickSort, HeapSort và InsertionSort), đảm bảo độ phức tạp luôn là **$O(N \log N)$** ngay cả trong trường hợp xấu nhất.

Thay vì phải viết struct so sánh cồng kềnh, C++11 cho phép viết hàm so sánh trực tiếp bằng **Lambda**:

```cpp
#include <algorithm>
#include <vector>
#include <iostream>

using namespace std;

struct Edge {
    int u, v, weight;
};

int main() {
    vector<Edge> edges = {
        {1, 2, 10},
        {2, 3, 5},
        {1, 3, 20}
    };
    
    // Sắp xếp các cạnh tăng dần theo trọng số weight
    sort(edges.begin(), edges.end(), [](const Edge& a, const Edge& b) {
        return a.weight < b.weight;
    });
    
    for (const auto& e : edges) {
        cout << e.u << " - " << e.v << " : " << e.weight << "\n";
    }
    
    return 0;
}
```

> [!CAUTION]
> Hàm so sánh tùy biến (Comparator) trong C++ bắt buộc phải tuân thủ tính chất **Strict Weak Ordering**: Nếu `a` bằng `b`, hàm so sánh **phải trả về `false`** (dùng `<` thay vì `<=`). Nếu bạn trả về `true` khi hai phần tử bằng nhau, `std::sort` có thể rơi vào tình trạng truy cập tràn bộ nhớ (Segmentation Fault / Runtime Error)!

---

## 7. Tổng kết và Bài học tiếp theo

Bảng tóm tắt lựa chọn container STL theo nhu cầu:

| Bạn cần làm gì? | Container tối ưu | Độ phức tạp |
|:---|:---|:---|
| Mảng động, truy cập ngẫu nhiên theo chỉ số | `std::vector` | $O(1)$ truy cập, $O(1)$ push_back |
| Loại bỏ trùng lặp, luôn giữ thứ tự | `std::set` | $O(\log N)$ |
| Bảng tra cứu tần suất, ánh xạ có thứ tự | `std::map` | $O(\log N)$ |
| Bảng tra cứu tốc độ cao, không cần thứ tự | `std::unordered_map` (kèm custom hash) | $O(1)$ trung bình |
| Luôn cần lấy ra phần tử lớn nhất/nhỏ nhất | `std::priority_queue` | $O(1)$ top, $O(\log N)$ push/pop |

Trên [Roadmap học tập](/roadmap/), hãy chuyển sang **Stage 2** để làm chủ hai vũ khí xử lý mảng đầu tiên: **Prefix Sum** và **Difference Array**!
