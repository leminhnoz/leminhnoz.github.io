---
title: "Xác suất & Kỳ vọng toán học dễ hiểu cho lập trình viên: Từ tung đồng xu đến Linearity of Expectation"
description: "Hướng dẫn xác suất và kỳ vọng toán học (Expected Value) bằng trực giác bình dân nhất: Không gian mẫu, biến cố độc lập, công thức tính kỳ vọng và vũ khí tối thượng 'Tính tuyến tính của kỳ vọng' giải toán trong nháy mắt."
pubDate: "2026-05-15"
tags: ["Toán học", "Xác suất", "Kỳ vọng", "Expected Value", "Probability DP", "C++", "Competitive Programming"]
categories: ["Toán học Olympic"]
excerpt: "Đừng để các tích phân Lebesgue hay ký hiệu đo lường làm bạn sợ hãi. Kỳ vọng toán học thực chất chỉ là giá trị trung bình nếu bạn chơi một trò chơi cả triệu lần! Hãy khám phá vũ khí Linearity of Expectation thần thánh."
---

> *"Xác suất là chiếc la bàn giúp chúng ta đưa ra quyết định tối ưu trong một thế giới đầy bất định."*

Trong lập trình thi đấu và thực tế ngành công nghệ (từ AI/Machine Learning, Game Development, đến thị trường tài chính), **Xác suất (Probability)** và **Kỳ vọng (Expected Value)** là hai công cụ toán học xuất hiện với tần suất dày đặc.

Bài viết này sẽ giúp bạn hiểu sâu sắc bản chất của chúng mà không cần phải là một thiên tài toán học!

---

## 1. Không gian mẫu và Biến cố (Sample Spaces & Events)

### 1.1. Thí nghiệm ngẫu nhiên & Không gian mẫu ($\Omega$)
- **Thí nghiệm ngẫu nhiên:** Một hành động mà ta không biết trước kết quả cụ thể, nhưng biết tập hợp tất cả các kết quả có thể xảy ra.  
  *Ví dụ:* Tung một con xúc xắc 6 mặt.
- **Không gian mẫu $\Omega$:** Tập hợp tất cả các kết quả có thể.  
  Với con xúc xắc: $\Omega = \{1, 2, 3, 4, 5, 6\}$, số phần tử $|\Omega| = 6$.

### 1.2. Biến cố ($A$) và Xác suất $P(A)$
Một **biến cố** $A$ là một tập con của không gian mẫu $\Omega$.  
*Ví dụ:* Biến cố $A$: "Gieo được số chẵn". Khi đó $A = \{2, 4, 6\}$.

Xác suất cổ điển xảy ra biến cố $A$ là:
$$P(A) = \frac{|A|}{|\Omega|} = \frac{\text{Số kết quả thuận lợi cho } A}{\text{Tổng số kết quả có thể}}$$
Với con xúc xắc: $P(A) = \frac{3}{6} = \frac{1}{2} = 50\%$.

### 1.3. Biến cố độc lập (Independent Events)
Hai biến cố $A$ và $B$ được gọi là **độc lập** nếu việc $A$ xảy ra hoàn toàn không làm thay đổi xác suất xảy ra của $B$:
$$P(A \cap B) = P(A) \cdot P(B)$$
*Ví dụ:* Bạn tung đồng xu lần 1 ra ngửa. Lần tung thứ 2 ra ngửa vẫn có xác suất đúng $50\%$. Đồng xu không có "trí nhớ"!

---

## 2. Kỳ vọng toán học (Expected Value — $E[X]$) là gì?

### 2.1. Trực giác bình dân
Tưởng tượng bạn chơi một trò chơi rút thăm:
- Có $90\%$ cơ hội nhận $0$ đồng.
- Có $10\%$ cơ hội nhận $100.000$ đồng.

Nếu bạn chơi trò này $1.000$ lần:
- Khoảng $900$ lần bạn được $0$ đồng.
- Khoảng $100$ lần bạn được $100.000$ đồng.
- Tổng số tiền kiếm được: $100 \times 100.000 = 10.000.000$ đồng.
- Chia đều cho $1.000$ lần chơi: Trung bình mỗi lần bạn kiếm được **$10.000$ đồng**.

Con số $10.000$ đồng đó chính là **Kỳ vọng toán học (Expected Value)**!

### 2.2. Định nghĩa công thức
Cho biến ngẫu nhiên rời rạc $X$ nhận các giá trị $x_1, x_2, \dots, x_k$ với xác suất tương ứng $p_1, p_2, \dots, p_k$:
$$E[X] = \sum_{i=1}^k x_i \cdot P(X = x_i)$$
*Kỳ vọng thực chất chỉ là trung bình cộng có trọng số (weighted average) theo xác suất!*

*Ví dụ tung xúc xắc:* Giá trị kỳ vọng khi gieo xúc xắc 6 mặt:
$$E[X] = 1 \cdot \frac{1}{6} + 2 \cdot \frac{1}{6} + 3 \cdot \frac{1}{6} + 4 \cdot \frac{1}{6} + 5 \cdot \frac{1}{6} + 6 \cdot \frac{1}{6} = \frac{21}{6} = 3.5$$
(Dù không bao giờ bạn gieo ra số 3.5, nhưng nếu gieo hàng nghìn lần, điểm trung bình chắc chắn xấp xỉ 3.5).

---

## 3. "Vũ khí tối thượng": Tính tuyến tính của Kỳ vọng (Linearity of Expectation)

Đây là định lý quyền lực nhất trong toàn bộ xác suất rời rạc:

$$\mathbf{E}[X + Y] = \mathbf{E}[X] + \mathbf{E}[Y]$$

Và mở rộng cho $n$ biến ngẫu nhiên bất kỳ:
$$E[X_1 + X_2 + \dots + X_n] = E[X_1] + E[X_2] + \dots + E[X_n]$$

> **ĐIỀU KỲ DIỆU NHẤT:**  
> Công thức này luôn luôn đúng **BẤT CHẤP $X$ VÀ $Y$ CÓ ĐỘC LẬP VỚI NHAU HAY KHÔNG**!

### Kỹ thuật Biến chỉ thị (Indicator Random Variables):
Muốn đếm số lượng sự kiện xảy ra, ta đặt các biến chỉ thị:
$$I_i = \begin{cases} 1 & \text{nếu sự kiện } i \text{ xảy ra} \\ 0 & \text{nếu không xảy ra} \end{cases}$$
Khi đó:
$$E[I_i] = 1 \cdot P(I_i = 1) + 0 \cdot P(I_i = 0) = P(\text{sự kiện } i \text{ xảy ra})$$
Tổng số sự kiện xảy ra là $X = \sum I_i$. Kỳ vọng tổng bằng tổng kỳ vọng:
$$E[X] = \sum_{i=1}^n P(\text{sự kiện } i \text{ xảy ra})$$

#### Ví dụ kinh điển: Bài toán phát thư nhầm
Có $n$ lá thư gửi cho $n$ người khác nhau. Một người đưa thư say rượu phát ngẫu nhiên mỗi người một lá. Hỏi kỳ vọng có bao nhiêu người nhận đúng lá thư của mình?

- Gọi $I_i = 1$ nếu người thứ $i$ nhận đúng thư của mình.
- Xác suất người $i$ nhận đúng thư: Vì có $n$ lá thư phân phối ngẫu nhiên, xác suất nhận đúng là $P(I_i = 1) = \frac{1}{n}$.
- Kỳ vọng số người nhận đúng:
  $$E[X] = \sum_{i=1}^n E[I_i] = \sum_{i=1}^n \frac{1}{n} = n \cdot \frac{1}{n} = \mathbf{1}$$
  
Dù có $10$ người hay $1$ triệu người, trung bình luôn có **đúng 1 người nhận đúng thư**! Không cần dùng giải tích phức tạp, tính tuyến tính giải quyết bài toán chỉ trong 2 dòng suy luận!

---

## 4. Phương sai (Variance) & Độ lệch chuẩn

Kỳ vọng $E[X]$ chỉ cho biết giá trị trung bình, nhưng không cho biết các giá trị dao động xung quanh trung bình mạnh hay yếu.

- **Phương sai $\text{Var}(X)$**: Đo lường mức độ phân tán của biến ngẫu nhiên quanh giá trị kỳ vọng:
  $$\text{Var}(X) = E\left[(X - E[X])^2\right] = E[X^2] - (E[X])^2$$
- **Bất đẳng thức Chebyshev:**  
  Xác suất để một biến ngẫu nhiên lệch xa khỏi kỳ vọng quá $k$ lần độ lệch chuẩn $\sigma$ là rất nhỏ:
  $$P(|X - E[X]| \ge k\sigma) \le \frac{1}{k^2}$$

Nhờ đó, trong thiết kế hệ thống và thuật toán ngẫu nhiên (Randomized Algorithms như Quicksort, Miller-Rabin), ta luôn đảm bảo thuật toán chạy cực nhanh với xác suất gần như tuyệt đối $100\%$.
