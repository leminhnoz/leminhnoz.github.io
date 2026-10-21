---
title: "Hình học tính toán: Từ Vector, Tích có hướng (Cross Product) đến Bao lồi (Convex Hull)"
description: "Cẩm nang hình học tính toán trong lập trình thi đấu: Bản chất Tích có hướng (Cross Product), kiểm tra hướng rẽ CCW, công thức dây giày tính diện tích đa giác và thuật toán Bao lồi Monotone Chain O(N log N)."
pubDate: "2026-07-20"
tags: ["Geometry", "Convex Hull", "Algorithms", "C++", "Competitive Programming"]
categories: ["Competitive Programming"]
excerpt: "Hình học trong Competitive Programming không đáng sợ vì công thức toán, mà vì cái bẫy sai số số thực. Khám phá cách giải quyết mọi bài toán hình học 2D chỉ bằng số nguyên long long và tích có hướng kỳ diệu."
---

> *"Nếu bạn dùng kiểu `double` và phép chia để giải hình học trong Competitive Programming, sai số số thực (Precision Error) sẽ giết chết code của bạn trước khi thuật toán kịp hoàn thành."*

Rất nhiều bạn thi HSG và ICPC luôn chọn cách "bỏ qua" các bài hình học tính toán (Computational Geometry) vì sợ những phương trình đường thẳng $y = ax + b$ cồng kềnh, sợ chia cho 0 khi đường thẳng thẳng đứng, và sợ sai số số thực kiểu `0.0000000001 != 0`.

Nhưng các tuyển thủ quốc tế lại rất thích bài hình học, bởi vì **hầu hết các bài toán hình học 2D đều có thể giải quyết chính xác 100% bằng số nguyên `long long`** thông qua một công cụ tối thượng: **Tích có hướng (Cross Product)**.

Bài viết này sẽ trang bị cho bạn toàn bộ tư duy hình học hiện đại để tự tin giải quyết từ bài toán kiểm tra hướng rẽ đến thuật toán **Bao lồi (Convex Hull)** kinh điển.

---

## 1. Cấu trúc Điểm & Vector chuẩn mực: Nói không với số thực

Thay vì biểu diễn phương trình đường thẳng bằng hệ số góc $a$ và tung độ gốc $b$, ta định nghĩa một điểm $P(x, y)$ và các phép toán vector cơ bản:

```cpp
#include <iostream>
#include <vector>
#include <algorithm>

using namespace std;

struct Point {
    long long x, y;

    // So sánh thứ tự để sắp xếp các điểm
    bool operator<(const Point& other) const {
        if (x != other.x) return x < other.x;
        return y < other.y;
    }
};

// Phép trừ hai điểm tạo thành vector
Point operator-(const Point& a, const Point& b) {
    return {a.x - b.x, a.y - b.y};
}
```

---

## 2. Vũ khí tối thượng: Tích có hướng 2D (Cross Product)

Cho hai vector $\vec{u} = (u_x, u_y)$ và $\vec{v} = (v_x, v_y)$.
Tích có hướng của chúng được định nghĩa là định thức cấp 2:

$$\vec{u} \times \vec{v} = u_x \cdot v_y - u_y \cdot v_x$$

```cpp
long long crossProduct(Point a, Point b) {
    return a.x * b.y - a.y * b.x;
}
```

### Ý nghĩa vật lý và hình học của Tích có hướng:
1. **Diện tích hình bình hành:** Độ lớn $|\vec{u} \times \vec{v}|$ chính là diện tích của hình bình hành tạo bởi hai vector $\vec{u}$ và $\vec{v}$.
2. **Kiểm tra hướng rẽ (Orientation / CCW Test):**
   Giả sử bạn đang đi từ điểm $A$ đến điểm $B$, rồi rẽ sang điểm $C$. Hãy xét hai vector $\vec{AB} = B - A$ và $\vec{BC} = C - B$:
   $$cp = \vec{AB} \times \vec{BC} = (B.x - A.x)(C.y - A.y) - (B.y - A.y)(C.x - A.x)$$

   - **$cp > 0$**: Bạn đang **rẽ trái** (Counter-Clockwise - Ngược chiều kim đồng hồ).
   - **$cp < 0$**: Bạn đang **rẽ phải** (Clockwise - Cùng chiều kim đồng hồ).
   - **$cp = 0$**: Ba điểm $A, B, C$ **thẳng hàng (Collinear)**!

Chỉ bằng một phép nhân trừ số nguyên không hề có căn bậc hai hay lượng giác, bạn đã xác định được chính xác 100% hướng quay của 3 điểm trong không gian!

---

## 3. Công thức dây giày (Shoelace Formula): Tính diện tích đa giác

Cho một đa giác $N$ đỉnh $P_1, P_2, \dots, P_N$ được liệt kê theo thứ tự ngược chiều kim đồng hồ.
Diện tích của đa giác bằng một nửa tổng tích có hướng của tất cả các cạnh:

$$S = \frac{1}{2} \left| \sum_{i=1}^{N} (x_i y_{i+1} - x_{i+1} y_i) \right| \quad (\text{với } P_{N+1} = P_1)$$

```cpp
long long getDoubleArea(const vector<Point>& poly) {
    int n = poly.size();
    long long area2 = 0;
    for (int i = 0; i < n; ++i) {
        int next_i = (i + 1) % n;
        area2 += crossProduct(poly[i], poly[next_i]);
    }
    return abs(area2); // Trả về 2 lần diện tích để giữ số nguyên
}
```

---

## 4. Thuật toán Bao lồi (Convex Hull): Andrew's Monotone Chain $O(N \log N)$

Bao lồi (Convex Hull) của một tập hợp điểm giống như việc bạn đóng các cây đinh lên một tấm gỗ tại các tọa độ đó, rồi lấy một **sợi dây chun lớn** kéo căng bao quanh tất cả các cây đinh và thả tay ra. Sợi dây chun sẽ co lại và ôm sát các điểm ngoài cùng tạo thành một đa giác lồi nhỏ nhất chứa toàn bộ các điểm.

Thuật toán **Andrew's Monotone Chain** là thuật toán tìm bao lồi được ưa chuộng nhất trong CP vì cực kỳ dễ cài đặt và ổn định:
1. **Sắp xếp** tất cả các điểm theo tọa độ $x$ tăng dần (nếu $x$ bằng nhau thì theo $y$ tăng dần).
2. Dựng **nửa dưới của bao lồi (Lower Hull)**: Duyệt từ điểm đầu tiên đến điểm cuối cùng. Sử dụng ngăn xếp: chừng nào 3 điểm gần nhất không tạo thành một góc rẽ trái ($cp \le 0$), ta loại bỏ điểm ở giữa khỏi bao lồi.
3. Dựng **nửa trên của bao lồi (Upper Hull)**: Duyệt ngược lại từ điểm cuối cùng về điểm đầu tiên và thực hiện tương tự.
4. Gộp hai nửa lại thành bao lồi hoàn chỉnh!

```cpp
// Trả về danh sách các đỉnh của bao lồi theo thứ tự ngược chiều kim đồng hồ
vector<Point> convexHull(vector<Point>& pts) {
    int n = pts.size();
    if (n <= 2) return pts;

    // Bước 1: Sắp xếp các điểm
    sort(pts.begin(), pts.end());

    vector<Point> hull;

    // Bước 2: Dựng nửa dưới (Lower Hull)
    for (int i = 0; i < n; ++i) {
        while (hull.size() >= 2) {
            Point a = hull[hull.size() - 2];
            Point b = hull.back();
            Point c = pts[i];
            // Nếu không rẽ trái thì loại bỏ b
            if (crossProduct(b - a, c - b) <= 0) {
                hull.pop_back();
            } else {
                break;
            }
        }
        hull.push_back(pts[i]);
    }

    // Bước 3: Dựng nửa trên (Upper Hull)
    int lower_size = hull.size();
    for (int i = n - 2; i >= 0; --i) {
        while (hull.size() > lower_size) {
            Point a = hull[hull.size() - 2];
            Point b = hull.back();
            Point c = pts[i];
            if (crossProduct(b - a, c - b) <= 0) {
                hull.pop_back();
            } else {
                break;
            }
        }
        hull.push_back(pts[i]);
    }

    hull.pop_back(); // Điểm đầu tiên bị lặp lại ở cuối
    return hull;
}
```

- **Độ phức tạp thời gian:** $O(N \log N)$ (do bước sắp xếp các điểm; bước duyệt ngăn xếp chỉ tốn $O(N)$ vì mỗi điểm chỉ thêm vào và lấy ra tối đa 2 lần).
- **Độ an toàn:** $100\%$ số nguyên `long long`, không có bất kỳ rủi ro nào về sai số dấu phẩy động!

---

## 5. Bài tập rèn luyện thực tế

1. **CSES 2189 — Point Location Test**: Kiểm tra xem một điểm nằm bên trái, bên phải hay nằm trên một đường thẳng có hướng bằng Cross Product.
2. **CSES 2191 — Polygon Area**: Tính diện tích đa giác $N$ đỉnh bằng công thức dây giày Shoelace.
3. **CSES 2195 — Convex Hull**: Cài đặt thuật toán bao lồi Andrew's Monotone Chain.

Tiếp tục hành trình tại [Roadmap](/roadmap/)!
