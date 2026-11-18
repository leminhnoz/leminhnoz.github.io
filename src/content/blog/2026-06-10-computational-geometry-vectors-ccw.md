---
title: "Hình học tính toán vỡ lòng: Vector 2D, Tích có hướng (Cross Product) và Phép rẽ CCW"
description: "Chinh phục hình học tính toán (Computational Geometry) từ con số 0: Tọa độ vector, tích vô hướng, tích có hướng, và tuyệt kỹ hàm CCW kiểm tra điểm rẽ trái/phải — giải thích trực quan, dễ hiểu kèm code C++ chuẩn thi đấu."
pubDate: "2026-06-10"
tags: ["Toán học", "Hình học", "Vector", "Cross Product", "Convex Hull", "C++", "Competitive Programming"]
categories: ["Toán học Olympic"]
excerpt: "Hình học trên máy tính không dùng thước kẻ hay compa. Mọi bài toán từ kiểm tra cắt nhau đến tìm bao lồi đều quy về một vũ khí duy nhất: Tích có hướng (Cross Product) và phép kiểm tra rẽ hướng CCW!"
---

> *"Trong hình học phẳng, bạn nhìn bằng mắt. Trong hình học máy tính, bạn nhìn bằng vector."*

Nhiều lập trình viên rất ngại các bài toán hình học vì sợ đụng phải phương trình đường thẳng $y = ax + b$ (dễ bị lỗi chia cho 0 khi đường thẳng thẳng đứng) hoặc hàm lượng giác `sin, cos, tan` (dễ bị sai số số thực `double`).

Tuy nhiên, trong hình học tính toán hiện đại, có một bí quyết giúp bạn **giải quyết $90\%$ bài toán chỉ bằng phép cộng và phép nhân số nguyên**: Đó chính là **Vector và Tích có hướng (Cross Product)**!

---

## 1. Điểm và Vector trong mặt phẳng 2D

### 1.1. Biểu diễn điểm & Vector
Một điểm $A(x, y)$ trên mặt phẳng tọa độ Descartes có thể biểu diễn như một struct đơn giản:
```cpp
struct Point {
    long long x, y;
    Point() : x(0), y(0) {}
    Point(long long _x, long long _y) : x(_x), y(_y) {}

    Point operator+(const Point& o) const { return Point(x + o.x, y + o.y); }
    Point operator-(const Point& o) const { return Point(x - o.x, y - o.y); }
};
```
Vector $\vec{AB}$ đi từ điểm $A$ đến điểm $B$ chính là:
$$\vec{AB} = B - A = (x_B - x_A, \, y_B - y_A)$$

---

## 2. Hai phép nhân Vector cốt lõi

### 2.1. Tích vô hướng (Dot Product — $\vec{u} \cdot \vec{v}$)
Tích vô hướng của $\vec{u}(x_1, y_1)$ và $\vec{v}(x_2, y_2)$ là một **số thực/nguyên**:
$$\vec{u} \cdot \vec{v} = x_1 x_2 + y_1 y_2 = |\vec{u}| \cdot |\vec{v}| \cdot \cos(\theta)$$
Trong đó $\theta$ là góc giữa hai vector.

*Ý nghĩa thực chiến:*
- Nếu $\vec{u} \cdot \vec{v} > 0$: Góc $\theta < 90^\circ$ (góc nhọn — hai vector cùng hướng tương đối).
- Nếu $\vec{u} \cdot \vec{v} = 0$: Góc $\theta = 90^\circ$ (**hai vector vuông góc nhau**).
- Nếu $\vec{u} \cdot \vec{v} < 0$: Góc $\theta > 90^\circ$ (góc tù — hai vector ngược hướng tương đối).

### 2.2. Tích có hướng 2D (Cross Product — $\vec{u} \times \vec{v}$)
Trong không gian 2D, tích có hướng (hay định thức 2x2) là một **giá trị có dấu**:
$$\vec{u} \times \vec{v} = x_1 y_2 - x_2 y_1 = |\vec{u}| \cdot |\vec{v}| \cdot \sin(\theta)$$

*Ý nghĩa hình học kinh điển:*
- **Về độ lớn:** $|\vec{u} \times \vec{v}|$ chính bằng **diện tích hình bình hành** tạo bởi hai vector $\vec{u}$ và $\vec{v}$.
- **Diện tích tam giác $ABC$:**
  $$S_{ABC} = \frac{1}{2} |\vec{AB} \times \vec{AC}|$$

---

## 3. Tuyệt kỹ kiểm tra hướng rẽ: Hàm CCW (Counter-Clockwise)

Đây là hàm quan trọng nhất trong toàn bộ hình học tính toán. Cho 3 điểm $A, B, C$, khi bạn đi từ $A \to B$ rồi sang $C$, bạn đang **rẽ trái, rẽ phải hay đi thẳng**?

Xét vector $\vec{u} = \vec{AB} = B - A$ và $\vec{v} = \vec{AC} = C - A$.  
Dấu của tích có hướng $\vec{u} \times \vec{v}$ cho ta biết chính xác hướng rẽ:

$$\text{cross}(\vec{AB}, \vec{AC}) = (x_B - x_A)(y_C - y_A) - (y_B - y_A)(x_C - x_A)$$

- **Nếu $> 0$**: Điểm $C$ nằm bên **trái** vector $\vec{AB}$ (ngược chiều kim đồng hồ — Counter-Clockwise).
- **Nếu $< 0$**: Điểm $C$ nằm bên **phải** vector $\vec{AB}$ (cùng chiều kim đồng hồ — Clockwise).
- **Nếu $= 0$**: Ba điểm $A, B, C$ **thẳng hàng** (collinear)!

```cpp
long long crossProduct(Point A, Point B, Point C) {
    return (B.x - A.x) * (C.y - A.y) - (B.y - A.y) * (C.x - A.x);
}

int ccw(Point A, Point B, Point C) {
    long long cp = crossProduct(A, B, C);
    if (cp > 0) return 1;   // Rẽ trái (Counter-Clockwise)
    if (cp < 0) return -1;  // Rẽ phải (Clockwise)
    return 0;               // Thẳng hàng
}
```

---

## 4. Ứng dụng 1: Kiểm tra hai đoạn thẳng $AB$ và $CD$ có cắt nhau không?

Hai đoạn thẳng $AB$ và $CD$ cắt nhau khi và chỉ khi:
1. $C$ và $D$ nằm về **hai phía khác nhau** của đường thẳng $AB$ $\iff \text{ccw}(A, B, C) \times \text{ccw}(A, B, D) \le 0$.
2. VÀ đồng thời $A$ và $B$ nằm về **hai phía khác nhau** của đường thẳng $CD$ $\iff \text{ccw}(C, D, A) \times \text{ccw}(C, D, B) \le 0$.

*(Trường hợp ngoại lệ khi 4 điểm thẳng hàng: chỉ cần kiểm tra hình chiếu trên trục $Ox, Oy$ có đè lên nhau hay không).*

Hoàn toàn không cần lập phương trình đường thẳng, không lo chia cho 0, tính toán $100\%$ bằng số nguyên chính xác tuyệt đối!

---

## 5. Ứng dụng 2: Bao lồi (Convex Hull) — Thuật toán Monotone Chain

**Bao lồi** của một tập hợp điểm là đa giác lồi nhỏ nhất chứa toàn bộ các điểm đó (tưởng tượng bạn đóng các cây đinh lên bảng gỗ và căng một sợi dây chun bọc ngoài cùng).

Thuật toán Monotone Chain ($O(N \log N)$):
1. Sắp xếp các điểm theo tọa độ $x$ tăng dần (nếu $x$ bằng nhau thì theo $y$).
2. Dựng **vỏ dưới (Lower Hull)**: Duyệt các điểm từ trái sang phải. Nếu thêm điểm mới mà làm đường đi bị rẽ phải (`ccw <= 0`), ta loại bỏ điểm cuối cùng trong vỏ cho đến khi chỉ còn rẽ trái!
3. Dựng **vỏ trên (Upper Hull)**: Tương tự nhưng duyệt từ phải sang trái.
4. Nối hai vỏ lại, ta thu được Bao lồi chuẩn mực.

```cpp
vector<Point> convexHull(vector<Point>& pts) {
    int n = pts.size(), k = 0;
    if (n <= 2) return pts;
    vector<Point> h(2 * n);

    sort(pts.begin(), pts.end(), [](const Point& a, const Point& b) {
        return a.x < b.x || (a.x == b.x && a.y < b.y);
    });

    // Dựng vỏ dưới
    for (int i = 0; i < n; ++i) {
        while (k >= 2 && ccw(h[k - 2], h[k - 1], pts[i]) <= 0) k--;
        h[k++] = pts[i];
    }
    // Dựng vỏ trên
    for (int i = n - 2, t = k + 1; i >= 0; i--) {
        while (k >= t && ccw(h[k - 2], h[k - 1], pts[i]) <= 0) k--;
        h[k++] = pts[i];
    }
    h.resize(k - 1);
    return h;
}
```

Nhờ có Tích có hướng và phép rẽ CCW, toàn bộ bài toán bao lồi phức tạp trở nên ngắn gọn và đẹp đẽ như một bài thơ thuật toán!
