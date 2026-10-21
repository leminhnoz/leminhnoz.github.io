---
title: "Phương trình Diophantine tuyến tính: Giải mã ax + by = c từ góc nhìn đời thường"
description: "Hướng dẫn giải phương trình nghiệm nguyên ax + by = c một cách mộc mạc và dễ hiểu nhất. Đi từ bài toán mua bán tiền lẻ, cách tìm nghiệm riêng bằng Euclid mở rộng đến kỹ thuật đếm số nghiệm trong đoạn [L, R] và tối ưu tổng x + y."
pubDate: "2026-04-15"
tags: ["Math", "Algorithms", "C++", "Competitive Programming"]
categories: ["Algorithms"]
excerpt: "Đừng để cái tên 'Diophantine' làm bạn sợ hãi. Thực chất nó chỉ là bài toán đi chợ trả tiền lẻ: làm sao để trả đúng c đồng bằng các tờ tiền mệnh giá a và b mà không cần thối lại?"
---

> *"Nghe cái tên 'Phương trình Diophantine tuyến tính' có vẻ hàn lâm và đáng sợ, nhưng thực chất bạn đã gặp nó từ những ngày đầu tiên biết đi chợ mua đồ rồi đấy!"*

Nếu bạn vừa nhìn thấy tiêu đề và có cảm giác muốn lùi bước vì nghĩ rằng đây là môn toán cao cấp dành riêng cho học sinh chuyên toán, hãy yên tâm. Trong bài viết này, chúng mình sẽ bóc tách toàn bộ phương trình $ax + by = c$ bằng những hình ảnh đời thường nhất: từ câu chuyện đổi tiền lẻ, chiếc thước kẻ nguyên vẹn cho đến cách đếm nghiệm trong một khoảng cho trước.

---

## 1. Phương trình Diophantine thực ra là gì?

Nói một cách dân dã nhất: **Phương trình Diophantine chỉ đơn giản là phương trình mà ta BẮT BUỘC phải tìm nghiệm là SỐ NGUYÊN ($\mathbb{Z}$)**. 

Không chơi số thập phân $1.5$ hay $0.75$, tất cả đều phải là số nguyên tròn trĩnh ($... -2, -1, 0, 1, 2 ...$).

Dạng tuyến tính 2 ẩn số quen thuộc nhất:
$$a \cdot x + b \cdot y = c$$
Trong đó $a, b, c$ là các số nguyên cho trước, và bạn cần tìm cặp số nguyên $(x, y)$.

### Ví dụ chuyện trả tiền đi chợ
Tưởng tượng trong ví bạn chỉ có 2 loại tiền: tờ **$5\text{ nghìn}$** và tờ **$2\text{ nghìn}$**.  
Bạn muốn mua một món đồ giá **$11\text{ nghìn}$**. Liệu bạn có thể trả đúng số tiền mà không cần thối lại không?

Phương trình tương ứng:
$$5x + 2y = 11$$

Bạn nhẩm ngay ra trong đầu: Đưa $1$ tờ $5$ nghìn ($x = 1$) và $3$ tờ $2$ nghìn ($y = 3$):
$$5 \cdot 1 + 2 \cdot 3 = 5 + 6 = 11$$

Nhưng nếu món hàng giá **$11\text{ nghìn}$** mà bạn chỉ có tờ **$6\text{ nghìn}$** và tờ **$4\text{ nghìn}$** ($6x + 4y = 11$) thì sao?  
Cả $6$ và $4$ đều là số chẵn, đưa bao nhiêu tờ đi nữa thì tổng tiền bạn đưa ra vĩnh viễn là một số chẵn! Làm sao gom lại thành số lẻ $11$ được? $\implies$ **Vô nghiệm!**

---

## 2. Khi nào thì phương trình CÓ NGHIỆM?

Quan sát ở ví dụ tiền lẻ dẫn chúng ta đến định lý mấu chốt đầu tiên:

> **Điều kiện cần và đủ để phương trình $ax + by = c$ có nghiệm nguyên:**  
> Số $c$ phải **chia hết** cho ước chung lớn nhất của $a$ và $b$:
> $$c \pmod{\gcd(a, b)} == 0$$

- Nếu $c$ không chia hết cho $\gcd(a, b)$: Kết luận ngay là **VÔ NGHIỆM**.
- Nếu $c$ chia hết cho $\gcd(a, b)$: Phương trình chắc chắn có nghiệm, và thậm chí là **vô số nghiệm**!

*Trường hợp đặc biệt:* Nếu cả $a = 0$ và $b = 0$:
- Nếu $c = 0$: Mọi cặp $(x, y)$ đều là nghiệm.
- Nếu $c \neq 0$: Vô nghiệm hoàn toàn.

---

## 3. Cách tìm MỘT NGHIỆM bất kỳ (Nghiệm riêng $x_0, y_0$)

Ở bài viết trước, chúng ta đã nắm trong tay bảo bối **Thuật toán Euclid mở rộng (Extended Euclidean Algorithm)**. Thuật toán này giúp ta tìm được cặp $(x_g, y_g)$ thỏa mãn:
$$a \cdot x_g + b \cdot y_g = g \quad (\text{where } g = \gcd(a, b))$$

Nhưng mục tiêu của chúng ta là giải phương trình bằng $c$, chứ không phải bằng $g$!

Đừng lo, hãy làm một phép nhân cực kỳ tự nhiên: nhân cả hai vế với tỉ lệ $\frac{c}{g}$:
$$a \cdot \left(x_g \cdot \frac{c}{g}\right) + b \cdot \left(y_g \cdot \frac{c}{g}\right) = g \cdot \frac{c}{g} = c$$

Thế là xong! Một nghiệm riêng $(x_0, y_0)$ của phương trình chính là:
$$\begin{cases} x_0 = x_g \cdot \frac{c}{g} \\ y_0 = y_g \cdot \frac{c}{g} \end{cases}$$

### Cài đặt C++ tìm một nghiệm:
```cpp
#include <iostream>
#include <cmath>

long long extgcd(long long a, long long b, long long &x, long long &y) {
    if (b == 0) {
        x = 1;
        y = 0;
        return a;
    }
    long long x1, y1;
    long long d = extgcd(b, a % b, x1, y1);
    x = y1;
    y = x1 - y1 * (a / b);
    return d;
}

bool find_any_solution(long long a, long long b, long long c, 
                       long long &x0, long long &y0, long long &g) {
    g = extgcd(std::abs(a), std::abs(b), x0, y0);
    if (c % g != 0) {
        return false; // Vô nghiệm vì c không chia hết cho gcd(a, b)
    }

    x0 *= c / g;
    y0 *= c / g;
    if (a < 0) x0 = -x0;
    if (b < 0) y0 = -y0;
    return true; // Tìm thấy nghiệm
}
```

---

## 4. Từ một nghiệm, làm sao tìm TẤT CẢ các nghiệm?

Hãy tưởng tượng bạn đang chơi bập bênh: nếu bạn tăng bên này lên bao nhiêu thì phải hạ bên kia xuống một lượng tương ứng để bập bênh giữ thăng bằng.

Giả sử ta đã có nghiệm $(x_0, y_0)$ thỏa mãn $a \cdot x_0 + b \cdot y_0 = c$.  
Nếu ta cộng thêm một lượng vào $x_0$, ta phải trừ bớt một lượng ở $y_0$:
$$a \cdot \left(x_0 + k \cdot \frac{b}{g}\right) + b \cdot \left(y_0 - k \cdot \frac{a}{g}\right) = a \cdot x_0 + b \cdot y_0 + \underbrace{k \cdot \frac{ab}{g} - k \cdot \frac{ab}{g}}_{= 0} = c$$

Phần bù trừ triệt tiêu nhau hoàn hảo! Do đó, **họ tất cả các nghiệm nguyên** của phương trình có dạng:
$$\begin{cases} x = x_0 + k \cdot \frac{b}{g} \\ y = y_0 - k \cdot \frac{a}{g} \end{cases} \quad (k \in \mathbb{Z})$$

Cứ mỗi số nguyên $k$ bất kỳ ($\dots, -2, -1, 0, 1, 2, \dots$), bạn lại có thêm một nghiệm nguyên mới.

---

## 5. Đếm số nghiệm trong một đoạn $[x_{\min}, x_{\max}]$ và $[y_{\min}, y_{\max}]$

Trong các kỳ thi lập trình, đề bài hiếm khi chỉ hỏi "tìm một nghiệm" mà thường hỏi:  
> *"Có bao nhiêu cặp nghiệm nguyên $(x, y)$ thỏa mãn $x \in [x_{\min}, x_{\max}]$ và $y \in [y_{\min}, y_{\max}]$?"*

Vì nghiệm phụ thuộc tuyến tính vào số nguyên $k$, nên điều kiện khoảng của $x$ và $y$ thực chất chỉ là giới hạn giá trị của $k$:
$$x_{\min} \le x_0 + k \cdot \frac{b}{g} \le x_{\max}$$
$$y_{\min} \le y_0 - k \cdot \frac{a}{g} \le y_{\max}$$

### Kỹ thuật tịnh tiến (Shift Solution):
Thay vì giải bất phương trình kẹp phân số dễ nhầm dấu, ta có thể viết một hàm nhỏ để dịch chuyển nghiệm theo bội số của bước nhảy:

```cpp
void shift_solution(long long &x, long long &y, long long a, long long b, long long cnt) {
    x += cnt * b;
    y -= cnt * a;
}

long long count_all_solutions(long long a, long long b, long long c, 
                              long long minx, long long maxx, 
                              long long miny, long long maxy) {
    long long x, y, g;
    if (!find_any_solution(a, b, c, x, y, g)) return 0;
    a /= g; 
    b /= g;

    long long sign_a = a > 0 ? +1 : -1;
    long long sign_b = b > 0 ? +1 : -1;

    // Tìm x nhỏ nhất thỏa mãn x >= minx
    shift_solution(x, y, a, b, (minx - x) / b);
    if (x < minx) shift_solution(x, y, a, b, sign_b);
    if (x > maxx) return 0;
    long long lx1 = x;

    // Tìm x lớn nhất thỏa mãn x <= maxx
    shift_solution(x, y, a, b, (maxx - x) / b);
    if (x > maxx) shift_solution(x, y, a, b, -sign_b);
    long long rx1 = x;

    // Tương tự, kẹp theo điều kiện của y
    shift_solution(x, y, a, b, -(miny - y) / a);
    if (y < miny) shift_solution(x, y, a, b, -sign_a);
    if (y > maxy) return 0;
    long long lx2 = x;

    shift_solution(x, y, a, b, -(maxy - y) / a);
    if (y > maxy) shift_solution(x, y, a, b, sign_a);
    long long rx2 = x;

    if (lx2 > rx2) std::swap(lx2, rx2);
    long long lx = std::max(lx1, lx2);
    long long rx = std::min(rx1, rx2);

    if (lx > rx) return 0;
    return (rx - lx) / std::abs(b) + 1;
}
```

---

## 6. Tìm nghiệm sao cho $(x + y)$ đạt giá trị nhỏ nhất

Một biến thể rất hay gặp khác là tìm nghiệm nguyên sao cho tổng chi phí $x + y$ là nhỏ nhất (ví dụ: dùng ít tờ tiền nhất, đóng gói ít kiện hàng nhất).

Xem xét tổng $x + y$ thay đổi như thế nào theo bước nhảy $k$:
$$x' + y' = \left(x + k \cdot \frac{b}{g}\right) + \left(y - k \cdot \frac{a}{g}\right) = (x + y) + k \cdot \frac{b - a}{g}$$

Quy luật cực kỳ rõ ràng:
- **Nếu $a < b$:** Hệ số $\frac{b - a}{g} > 0$. Để tổng nhỏ nhất, ta cần chọn $k$ **nhỏ nhất có thể**.
- **Nếu $a > b$:** Hệ số $\frac{b - a}{g} < 0$. Để tổng nhỏ nhất, ta cần chọn $k$ **lớn nhất có thể**.
- **Nếu $a = b$:** Mọi nghiệm đều có cùng một tổng $x + y$, chọn nghiệm nào cũng như nhau!

---

## 7. Bảng tổng kết bí kíp bỏ túi

| Bước xử lý | Hành động | Điểm cốt lõi cần nhớ |
| :--- | :--- | :--- |
| **Kiểm tra nghiệm** | Tính $g = \gcd(a, b)$ | Nếu $c \pmod g \neq 0 \implies$ Vô nghiệm. |
| **Nghiệm ban đầu** | Dùng Euclid mở rộng | $(x_0, y_0) = (x_g \cdot \frac{c}{g}, y_g \cdot \frac{c}{g})$. |
| **Dạng tổng quát** | Tịnh tiến theo $k$ | $x = x_0 + k(b/g)$, $y = y_0 - k(a/g)$. |
| **Đếm trong đoạn** | Giao hai đoạn nghiệm $k$ | Tìm đoạn $[l_x, r_x]$ giao nhau, số nghiệm $= (r_x - l_x)/\|b\| + 1$. |

---

## 8. Thử sức với các bài tập kinh điển

Lý thuyết số học sẽ trở nên dễ nhớ gấp mười lần khi bạn tự tay nộp bài và nhận về pháo hoa xanh (Accepted):

1. [SPOJ - Crucial Equation](https://www.spoj.com/problems/CEQU/): Kiểm tra xem phương trình có nghiệm nguyên hay không (Level khởi động cực dễ).
2. [Codeforces 633A - Ebony and Ivory](https://codeforces.com/contest/633/problem/A): Tìm xem có nghiệm nguyên **không âm** ($x \ge 0, y \ge 0$) hay không.
3. [AtCoder ABC340 F - $S = 1$](https://atcoder.jp/contests/abc340/tasks/abc340_f): Ứng dụng phương trình Diophantine tính tọa độ điểm nguyên sao cho diện tích tam giác bằng 1.

---

## Lời kết

Hy vọng bài viết này đã giúp bạn gạt bỏ cảm giác sợ hãi mỗi khi nhìn thấy cái tên **Phương trình Diophantine**. Thực chất, vẻ ngoài phức tạp chỉ là lớp vỏ ngôn ngữ; bên trong nó luôn là những nguyên lý số học giản dị, hài hòa và đẹp đẽ mà bất cứ ai cũng có thể làm chủ được!
