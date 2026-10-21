---
title: "Tìm kiếm nhị phân trên đáp án: Bí kíp biến bài toán hóc búa thành trò chơi đoán số"
description: "Làm chủ kỹ thuật Tìm kiếm nhị phân trên đáp án (Binary Search on Answer) từ con số 0. Đi từ tính đơn điệu của hàm kiểm tra, thuật toán tham lam check(mid) đến template C++ bất bại tránh lặp vô tận và kỹ thuật nhị phân trên số thực."
pubDate: "2026-10-16"
tags: ["Competitive Programming", "Binary Search", "C++", "Algorithms"]
categories: ["Algorithms"]
excerpt: "Nếu bạn chỉ biết dùng Binary Search để tìm một số trong mảng đã sắp xếp, bạn đã bỏ lỡ 90% sức mạnh của nó! Khám phá cách chuyển đổi bài toán tối ưu thành bài toán đoán số siêu tốc."
---

> *"Ngừng học các thuật toán vô dụng. Hãy luyện tập và học cách dùng tìm kiếm nhị phân!"*  
> — **Um_nik** (World Champion ICPC & Legendary Grandmaster)

Hầu hết chúng ta khi mới học lập trình đều biết đến **Tìm kiếm nhị phân (Binary Search)** qua một bài toán quen thuộc: *Cho một mảng số đã được sắp xếp tăng dần, hãy tìm xem số $X$ có nằm trong mảng hay không.*

Nhưng nếu chỉ dùng nhị phân để tìm một phần tử trong mảng, bạn mới chỉ đang sử dụng **10% công lực** của thuật toán này.

Sức mạnh thực sự khiến các cao thủ Competitive Programming "nghiện" tìm kiếm nhị phân nằm ở một đẳng cấp cao hơn: **Tìm kiếm nhị phân trên không gian đáp án (Binary Search on Answer)**. 

Hôm nay, hãy cùng mình biến kỹ thuật tưởng chừng cao siêu này thành một trò chơi đoán số cực kỳ tự nhiên, dễ hiểu đến mức bạn sẽ tự hỏi: *"Tại sao ngày xưa mình lại thấy nó khó nhỉ?!"*

---

## 1. Trò chơi đoán số năm lên 7 tuổi

Hãy nhớ lại trò chơi tuổi thơ:
> Bạn mình bí mật nghĩ trong đầu một số nguyên từ **$1$ đến $100$**.  
> Bạn được quyền đoán một số, và người bạn chỉ được trả lời 1 trong 3 câu: *"Lớn hơn rồi"*, *"Nhỏ hơn rồi"*, hoặc *"Đoán đúng rồi!"*.

Bạn sẽ đoán thế nào?
- Đoán lần lượt $1, 2, 3, 4 \dots$? Quá ngây thơ, lỡ bạn ấy nghĩ số $99$ thì bạn mất $99$ lượt đoán!
- Cách thông minh nhất: **Luôn đoán số chính giữa!**
  - Lượt 1: Đoán $50$. Bạn bảo: *"Nhỏ hơn rồi"* $\implies$ Loại phăng toàn bộ đoạn $[1, 50]$, chỉ còn $[51, 100]$.
  - Lượt 2: Đoán số giữa của đoạn còn lại: $75$. Bạn bảo: *"Lớn hơn rồi"* $\implies$ Loại đoạn $[75, 100]$, chỉ còn $[51, 74]$.
  - Lượt 3: Đoán giữa: $62 \dots$

Chỉ sau tối đa **$\approx 7$ lần đoán** ($\log_2 100 \approx 7$), bạn chắc chắn tìm ra con số bí mật. Nếu khoảng từ $1$ đến $10^{18}$? Cũng chỉ mất đúng **$60$ lần đoán**!

**Tìm kiếm nhị phân trên đáp án bản chất chính là trò chơi này!** Ta không có sẵn mảng nào cả. "Mảng" ở đây chính là toàn bộ các đáp án tiềm năng đang nằm trong đầu chúng ta.

---

## 2. Bài toán thực tế: Chia việc cho công nhân

Hãy đến với một bài toán thực chiến kinh điển (xuất hiện trong cả phỏng vấn Google, LeetCode 410 và Codeforces):

> Bạn có $N = 5$ kiện hàng cần vận chuyển theo đúng thứ tự:
> $$[7, 2, 5, 10, 8]$$
> Bạn có $K = 2$ ngày để chở hết số hàng này (không được đổi thứ tự các kiện hàng).  
> **Câu hỏi:** Tải trọng tối thiểu của xe tải mỗi ngày phải là bao nhiêu để chở hết hàng trong không quá 2 ngày?

### Cách nghĩ ngây thơ: Thử từng mức tải trọng
Ta thử đoán từng mức tải trọng $X$:
- Thử tải trọng $X = 10$:
  - Ngày 1: Chở kiện $7$ và $2$ (tổng $9 \le 10$). Kiện tiếp theo là $5$, cộng vào thành $14 > 10$, xe không chở nổi!
  - Ngày 2: Kiện $5$ (tổng $5$). Kiện tiếp theo là $10$, cộng vào thành $15 > 10$, chịu!
  - Hết 2 ngày mà mới chở được 3 kiện hàng $\implies$ Tải trọng $10$ **KHÔNG ĐƯỢC**.
- Thử $X = 11, 12, 13, 14, 15, 16, 17$: Xe vẫn không chở kịp trong 2 ngày $\implies$ **KHÔNG ĐƯỢC**.
- Thử $X = 18$:
  - Ngày 1: $7 + 2 + 5 = 14 \le 18$.
  - Ngày 2: $10 + 8 = 18 \le 18$.
  - Xong vừa vặn trong đúng 2 ngày! $\implies$ **ĐƯỢC!**

Đáp án nhỏ nhất chính là **$18$**.

Nhưng nếu tổng trọng lượng hàng lên tới $10^{14}$ thì sao? Thử từng số từ $1$ đến $10^{14}$ thì máy tính chạy đến thiên thu cũng không xong!

---

## 3. Khám phá bí mật: Tính đơn điệu (Monotonicity)

Hãy nhìn vào bảng kết quả khi ta kiểm tra từng mức tải trọng:

| Tải trọng xe ($X$) | Có chở kịp trong 2 ngày không? |
| :---: | :---: |
| 10 | **KHÔNG** (false) |
| 12 | **KHÔNG** (false) |
| 15 | **KHÔNG** (false) |
| 17 | **KHÔNG** (false) |
| **18** | **CÓ** (true) $\to$ *Ngưỡng nhỏ nhất cần tìm!* |
| 19 | **CÓ** (true) |
| 20 | **CÓ** (true) |
| 100 | **CÓ** (true) |

Bạn có nhận ra điều gì đặc biệt không?

Một khi xe tải trọng **$18$** đã chở kịp, thì bất kỳ mức tải trọng nào **lớn hơn 18** ($19, 20, 100 \dots$) **CHẮC CHẮN CŨNG SẼ CHỞ KỊP**! Xe càng to thì việc chở hàng chỉ có dễ hơn chứ không thể khó hơn được!

Chuỗi kết quả của chúng ta có dạng phân chia ranh giới rõ ràng:
$$[\text{false}, \text{false}, \text{false}, \dots, \text{false}, \;\mathbf{true}, \text{true}, \text{true}, \dots, \text{true}]$$

Đặc tính này trong toán học gọi là **Tính đơn điệu (Monotonicity)**.  
Và một khi hàm kiểm tra đã có tính đơn điệu: **Ta hoàn toàn có thể dùng Tìm kiếm nhị phân để nhảy cóc tìm ra điểm giao nhau giữa `false` và `true`!**

---

## 4. Ba bước vàng cài đặt Binary Search on Answer

### Bước 1: Xác định không gian tìm kiếm $[L, R]$
Đáp án nằm trong khoảng nào?
- **Cận dưới $L$:** Xe bắt buộc phải chở được kiện hàng nặng nhất. Kiện nặng nhất là $10$, nên ít nhất tải trọng xe phải là:
  $$L = \max(A) = 10$$
- **Cận trên $R$:** Trường hợp dư dả nhất là chở toàn bộ kiện hàng trong đúng $1$ ngày:
  $$R = \sum A = 7 + 2 + 5 + 10 + 8 = 32$$

Vậy đáp án chắc chắn nằm trong đoạn $[10, 32]$.

---

### Bước 2: Viết hàm kiểm tra `check(mid)` (Dễ hơn bạn nghĩ!)
Thay vì phải tìm công thức tính toán phức tạp, ta chỉ cần viết một hàm thẩm định:  
*"Nếu cho xe tải trọng `mid`, liệu có chở hết hàng trong không quá $K$ ngày không?"*

Ta dùng thuật toán Tham lam (Greedy): Cứ nhét hàng vào ngày hiện tại cho đến khi không nhét nổi nữa thì sang ngày mới:

```cpp
bool check(long long limit, const std::vector<long long>& a, int k) {
    int days = 1;
    long long current_weight = 0;

    for (long long x : a) {
        if (current_weight + x <= limit) {
            current_weight += x;
        } else {
            days++; // Sang ngày mới
            current_weight = x;
        }
    }
    return days <= k;
}
```

---

### Bước 3: Template vòng lặp nhị phân bất bại (Không bao giờ lặp vô tận)

Rất nhiều bạn bị ám ảnh bởi lỗi vòng lặp vô tận khi viết `while (L <= R)`. Dưới đây là template chuẩn mực và an toàn nhất:

```cpp
long long L = max_element_val;
long long R = sum_all_val;
long long ans = R;

while (L <= R) {
    long long mid = L + (R - L) / 2; // Tránh tràn số thay vì (L + R) / 2

    if (check(mid, a, k)) {
        ans = mid;      // mid khả thi! Ghi nhận kỷ lục tạm thời
        R = mid - 1;    // Thử tìm xem có tải trọng nào NHỎ HƠN nữa mà vẫn được không
    } else {
        L = mid + 1;    // mid quá bé, bắt buộc phải tăng tải trọng lên!
    }
}

std::cout << ans << "\n";
```

---

## 5. Mở rộng đỉnh cao: Nhị phân trên số thực (Real Numbers)

Nếu đề bài yêu cầu tìm một giá trị số thực $X$ (ví dụ: vận tốc nhỏ nhất, tỉ số lớn nhất) với độ chính xác $10^{-6}$ thì sao?

Rất nhiều người viết `while (R - L > 1e-7)` và bị dính TLE do hiện tượng trôi dấu phẩy động của số thực (`double`).

### Bí kíp của dân chuyên: Cố định 100 vòng lặp!
Mỗi lần chia đôi, khoảng cách giảm đi một nửa. Sau $100$ lần chia đôi:
$$\frac{R - L}{2^{100}} \approx \frac{R - L}{10^{30}}$$
Sai số sau 100 vòng lặp nhỏ hơn $10^{-15}$ — chính xác tuyệt đối và không bao giờ lo TLE!

```cpp
double L = 0.0, R = 1e9;
for (int iter = 0; iter < 100; iter++) {
    double mid = L + (R - L) / 2.0;
    if (check(mid)) {
        L = mid; // hoặc R = mid tùy bài toán
    } else {
        R = mid;
    }
}
std::cout << std::fixed << std::setprecision(9) << L << "\n";
```

---

## 6. Dấu hiệu nhận biết bài toán trong đề thi

Làm sao để khi đọc một đề bài lạ hoắc, bạn nhận ra ngay: *"À, bài này dùng Binary Search on Answer!"*?

Hãy tìm những cụm từ "chìa khóa" sau:
1. **"Tìm giá trị nhỏ nhất sao cho..."** (Minimize the maximum / Min của Max)
2. **"Tìm giá trị lớn nhất thỏa mãn điều kiện..."** (Maximize the minimum / Max của Min)
3. **Bài toán xuôi thì cực khó, nhưng bài toán ngược thì siêu dễ:**  
   - *Bài toán xuôi:* Tìm tải trọng xe tối ưu để chở xong trong $K$ ngày $\to$ Rất khó nghĩ công thức trực tiếp.
   - *Bài toán ngược:* Cho trước xe tải trọng $X$, hỏi chở mất mấy ngày $\to$ Duyệt qua mảng mất $O(N)$ là biết ngay!

Khi thấy bài toán ngược dễ giải $\implies$ **Hãy nhị phân để đoán đáp án của bài toán xuôi!**

---

## 7. Bài tập thực hành có link trực tiếp

Hãy bắt tay vào luyện tập ngay với 4 bài toán kinh điển từ dễ đến nâng cao:

1. [CSES - Factory Machines](https://cses.fi/problemset/task/1620): Tính thời gian tối thiểu để $K$ máy sản xuất đủ $T$ sản phẩm.
2. [CSES - Array Division](https://cses.fi/problemset/task/1088): Chia mảng thành $K$ đoạn con sao cho tổng lớn nhất là nhỏ nhất (giống hệt bài chở hàng ở trên).
3. [Codeforces 1201C - Maximum Median](https://codeforces.com/contest/1201/problem/C): Tăng tối đa số trung vị của mảng với không quá $K$ thao tác.
4. [LeetCode 1011 - Capacity To Ship Packages Within D Days](https://leetcode.com/problems/capacity-to-ship-packages-within-d-days/): Bài toán chuyển hàng kinh điển.

---

## Lời kết

Tìm kiếm nhị phân trên đáp án là một bước chuyển tư duy quan trọng từ người mới bắt đầu sang một lập trình viên thi đấu thực thụ: **Biến bài toán tối ưu hóa phức tạp thành một chuỗi các câu hỏi Đúng/Sai đơn giản.**

Chỉ cần rèn luyện phản xạ nhận diện tính đơn điệu, bạn sẽ thấy hàng loạt bài toán hóc búa bỗng chốc trở nên dễ dàng đến bất ngờ. Chúc các bạn làm chủ trọn vẹn kỹ thuật này!
