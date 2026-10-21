---
title: "Dãy con tăng dài nhất (LIS): Từ O(n^2) đến O(n log n) dễ hiểu đến bất ngờ"
description: "Làm chủ bài toán Dãy con tăng dài nhất (Longest Increasing Subsequence - LIS) từ con số 0. Đi từ ý tưởng Quy hoạch động O(n^2), trực giác xếp bài Patience Sorting đến bí quyết Binary Search O(n log n) và truy vết cực chuẩn."
pubDate: "2025-09-17"
tags: ["Dynamic Programming", "Binary Search", "Algorithms", "C++", "Competitive Programming"]
categories: ["Algorithms"]
excerpt: "Nếu bạn từng bối rối giữa Subsequence và Subarray, hay đau đầu khi chuyển từ O(n^2) sang O(n log n) với lower_bound, bài viết này sẽ giúp bạn 'thông suốt' toàn bộ chỉ trong 10 phút!"
---

> *"Trong mọi kỳ thi lập trình từ học sinh giỏi, ICPC cho đến phỏng vấn thuật toán tại các tập đoàn công nghệ lớn, có một bài toán xuất hiện nhiều đến mức trở thành kinh điển: **Tìm dãy con tăng dài nhất (Longest Increasing Subsequence - LIS)**."*

Nhưng đừng để cái tên dài dòng đó làm bạn sợ. Hãy tưởng tượng bạn đang chơi trò nhảy cóc qua một dòng sông với những hòn đá có độ cao khác nhau: Bạn chỉ được nhảy tiến về phía trước, và mỗi hòn đá bạn đặt chân lên sau bắt buộc phải cao hơn hòn đá trước đó. Làm sao để nhảy qua được nhiều hòn đá nhất?

Hôm nay, chúng mình sẽ cùng đi từ cách tiếp cận ngây thơ nhất $O(n^2)$ đến bước nhảy vọt $O(n \log n)$ bằng tìm kiếm nhị phân — bảo đảm đọc xong bạn sẽ thốt lên: *"Trời ơi, hóa ra nó tự nhiên và dễ hiểu đến thế!"*

---

## 1. Dãy con (Subsequence) khác gì Mảng con (Subarray)?

Trước khi viết dòng code đầu tiên, hãy làm rõ sự khác nhau giữa hai khái niệm mà người mới rất hay nhầm lẫn:

| Khái niệm | Định nghĩa | Ví dụ trong mảng `[8, 3, 4, 6, 5]` |
| :--- | :--- | :--- |
| **Mảng con (Subarray / Substring)** | Các phần tử phải **liền kề nhau liên tục**. | `[3, 4, 6]` là mảng con; nhưng `[3, 6, 5]` thì không. |
| **Dãy con (Subsequence)** | Chọn các phần tử theo thứ tự từ trái sang phải, **được phép bỏ qua (nhảy cóc)** các phần tử ở giữa. | `[3, 4, 6]`, `[3, 4, 5]`, `[8, 6, 5]` đều là dãy con! |

Mục tiêu của bài toán **LIS (Longest Increasing Subsequence)**:  
Tìm một dãy con có độ dài lớn nhất sao cho các phần tử **tăng nghiêm ngặt** ($a[i_1] < a[i_2] < \dots < a[i_k]$).

Ví dụ với mảng:
$$a = [8, 3, 4, 6, 5, 2, 0, 7, 9, 1]$$

Một số dãy con tăng hợp lệ:
- $[3, 4, 6, 7, 9]$ (độ dài $5$)
- $[3, 4, 5, 7, 9]$ (độ dài $5$)
- $[0, 7, 9]$ (độ dài $3$)

Dãy con tăng dài nhất ở đây có độ dài là **$5$**.

---

## 2. Bước 1: Quy hoạch động $O(n^2)$ - Dễ hiểu như leo cầu thang

Cách tự nhiên nhất để giải bài toán này là dùng Quy hoạch động (Dynamic Programming):

### Định nghĩa trạng thái:
Gọi $d[i]$ là **độ dài của dãy con tăng dài nhất KẾT THÚC tại vị trí $i$** ($a[i]$ là phần tử cuối cùng).

### Công thức truy hồi:
Khi đứng tại $a[i]$, ta nhìn lại tất cả các phần tử $a[j]$ đứng trước nó ($j < i$):
- Nếu $a[j] < a[i]$: Số $a[i]$ hoàn toàn có thể "nối đuôi" vào sau dãy con kết thúc tại $a[j]$. Độ dài mới sẽ là $d[j] + 1$.
- Ta chỉ cần chọn vị trí $j$ nào cho ta dãy dài nhất:
$$d[i] = 1 + \max_{\substack{j < i \\ a[j] < a[i]}} d[j]$$

*(Nếu không có phần tử $j$ nào nhỏ hơn $a[i]$, thì $d[i] = 1$ — chính nó tự tạo thành dãy con độ dài 1).*

### Cài đặt C++:
```cpp
#include <vector>
#include <algorithm>

int lis_n2(const std::vector<int>& a) {
    int n = a.size();
    if (n == 0) return 0;
    
    // Mỗi phần tử ban đầu tự nó tạo thành dãy con độ dài 1
    std::vector<int> d(n, 1);
    int ans = 1;

    for (int i = 0; i < n; i++) {
        for (int j = 0; j < i; j++) {
            if (a[j] < a[i]) {
                d[i] = std::max(d[i], d[j] + 1);
            }
        }
        ans = std::max(ans, d[i]);
    }
    return ans;
}
```

### Làm sao để in ra chính xác các phần tử của dãy LIS? (Truy vết - Traceback)
Để in ra các phần tử, ta chỉ cần một mảng lưu vết `p[i]` (parent / ancestor pointer) ghi lại xem $a[i]$ đã nối đuôi sau phần tử nào:

```cpp
std::vector<int> restore_lis_n2(const std::vector<int>& a) {
    int n = a.size();
    std::vector<int> d(n, 1), p(n, -1);
    int max_len = 0, best_end = 0;

    for (int i = 0; i < n; i++) {
        for (int j = 0; j < i; j++) {
            if (a[j] < a[i] && d[i] < d[j] + 1) {
                d[i] = d[j] + 1;
                p[i] = j; // Ghi nhớ: i đã nối đuôi sau j
            }
        }
        if (d[i] > max_len) {
            max_len = d[i];
            best_end = i;
        }
    }

    // Lần ngược từ phần tử cuối cùng về đầu
    std::vector<int> result;
    for (int cur = best_end; cur != -1; cur = p[cur]) {
        result.push_back(a[cur]);
    }
    std::reverse(result.begin(), result.end());
    return result;
}
```

*Đánh giá:* Cách này cực kỳ trực quan và dễ nhớ, nhưng độ phức tạp $O(n^2)$ chỉ chạy được khi $n \le 5.000$. Nếu $n = 2 \cdot 10^5$, code sẽ bị quá thời gian (TLE) ngay!

---

## 3. Bước nhảy vọt: $O(n \log n)$ bằng Tìm kiếm nhị phân

Làm thế nào để tăng tốc từ $O(n^2)$ xuống $O(n \log n)$? Ta cần thay đổi hoàn toàn góc nhìn về mảng quy hoạch động:

> **Ý tưởng thiên tài:**  
> Thay vì hỏi *"Dãy kết thúc tại vị trí $i$ dài bao nhiêu?"*, hãy hỏi:  
> *"Để tạo ra một dãy con tăng có độ dài $L$, con số kết thúc nhỏ nhất có thể là bao nhiêu?"*

Gọi mảng $d[L]$ là **giá trị kết thúc NHỎ NHẤT của một dãy con tăng có độ dài $L$** đã tìm thấy cho đến nay.

### Tại sao lại cần "kết thúc nhỏ nhất"?
Hãy tưởng tượng bạn đang chọn người đi tiếp sức:
- Bạn A lập được một dãy tăng độ dài $3$ kết thúc bằng số **$10$**.
- Bạn B lập được một dãy tăng độ dài $3$ kết thúc bằng số **$5$**.

Bạn thích bạn nào hơn? Đương nhiên là bạn B! Vì số $5$ nhỏ hơn nhiều so với $10$, nên khi có số mới đến (ví dụ số $7$), bạn B dễ dàng nối thêm vào thành dãy dài $4$ ($5 < 7$), còn bạn A thì chịu chết ($10 > 7$).  
**Số kết thúc càng nhỏ thì tiềm năng mở rộng trong tương lai càng lớn!**

### Hai quan sát mang tính bước ngoặt:
1. **Mảng $d$ luôn luôn được sắp xếp tăng dần:**  
   Muốn có dãy độ dài $3$ thì số kết thúc chắc chắn phải lớn hơn số kết thúc của dãy độ dài $2$. Do đó $d[1] < d[2] < d[3] < \dots$
2. **Vì $d$ đã sắp xếp, ta có thể dùng TÌM KIẾM NHỊ PHÂN (`std::lower_bound`) trong $O(\log n)$!**

### Khi một số mới $x$ xuất hiện, ta làm gì?
Dùng `std::lower_bound` tìm vị trí đầu tiên trong mảng $d$ có giá trị $\ge x$:
- **Nếu $x$ lớn hơn mọi số trong $d$:** Nghĩa là $x$ nối đuôi được vào dãy dài nhất hiện tại $\to$ Đẩy $x$ vào cuối mảng (`d.push_back(x)`), độ dài LIS tăng thêm $1$!
- **Nếu tìm thấy vị trí $d[k] \ge x$:** Ta thay thế $d[k] = x$. Việc thay thế này giúp giảm giá trị kết thúc của dãy độ dài $(k+1)$ xuống một con số nhỏ hơn và triển vọng hơn!

### Code C++ siêu ngắn chỉ với vài dòng:
```cpp
#include <vector>
#include <algorithm>

int lis_fast(const std::vector<int>& a) {
    std::vector<int> d; // d[len - 1] lưu phần tử kết thúc nhỏ nhất của dãy độ dài len

    for (int x : a) {
        // Tìm phần tử đầu tiên >= x trong d
        auto it = std::lower_bound(d.begin(), d.end(), x);

        if (it == d.end()) {
            // x lớn hơn tất cả -> tạo thành dãy con mới dài hơn
            d.push_back(x);
        } else {
            // Thay thế để có phần tử kết thúc nhỏ hơn, tối ưu hơn
            *it = x;
        }
    }
    return d.size(); // Kích thước của d chính là độ dài LIS!
}
```

*Độ phức tạp:* Duyệt $n$ phần tử, mỗi phần tử tìm kiếm nhị phân mất $O(\log n)$. Tổng thời gian chạy là **$O(n \log n)$**! Với $n = 2 \cdot 10^5$, máy tính xử lý chỉ mất **$0.02$ giây**.

> **Cảnh báo cực kỳ quan trọng:** Mảng `d` ở cuối thuật toán **KHÔNG PHẢI** là các phần tử của dãy LIS! Mảng `d` chỉ lưu các "kỷ lục đuôi nhỏ nhất". Muốn in ra dãy LIS chuẩn xác ở mức $O(n \log n)$, xem ngay mục tiếp theo!

---

## 4. Truy vết LIS trong $O(n \log n)$ siêu gọn gàng

Để khôi phục chính xác dãy con trong $O(n \log n)$, ta chỉ cần một mảng phụ `p[i]` lưu lại: *Khi $a[i]$ được xử lý, nó đã đứng ở vị trí thứ mấy trong mảng $d$?*

Nói cách khác, độ dài LIS dài nhất kết thúc tại $a[i]$ chính là `p[i] + 1`.

Sau đó, ta chỉ cần **duyệt ngược từ cuối mảng về đầu**, bốc dần các phần tử có độ dài giảm dần từ $(L - 1)$ về $0$:

```cpp
std::vector<int> restore_lis_fast(const std::vector<int>& a) {
    int n = a.size();
    if (n == 0) return {};

    std::vector<int> d;
    std::vector<int> p(n); // p[i] lưu vị trí của a[i] trong mảng d

    for (int i = 0; i < n; i++) {
        auto it = std::lower_bound(d.begin(), d.end(), a[i]);
        p[i] = it - d.begin(); // Chỉ số 0-based trong d

        if (it == d.end()) {
            d.push_back(a[i]);
        } else {
            *it = a[i];
        }
    }

    int cur_len = d.size() - 1;
    std::vector<int> subseq;

    // Duyệt ngược từ phải sang trái tìm lại các phần tử
    for (int i = n - 1; i >= 0 && cur_len >= 0; i--) {
        if (p[i] == cur_len) {
            subseq.push_back(a[i]);
            cur_len--;
        }
    }

    std::reverse(subseq.begin(), subseq.end());
    return subseq;
}
```

---

## 5. Những bài toán biến thể kinh điển của LIS

Khi đi thi, đề bài sẽ ít khi nói thẳng *"Hãy tìm LIS đi"*, mà sẽ được bọc trong các lớp áo thú vị:

### Biến thể 1: Dãy con KHÔNG GIẢM dài nhất (Non-decreasing Subsequence)
- Điều kiện đổi thành: $a[i_1] \le a[i_2] \le \dots \le a[i_k]$ (các số bằng nhau vẫn được chấp nhận).
- **Cách sửa code:** Chỉ cần đổi `std::lower_bound` thành `std::upper_bound`!

### Biến thể 2: Định lý Dilworth (Phủ mảng bằng số dãy con không tăng ít nhất)
> *Định lý Dilworth phát biểu rằng: Số lượng dãy con không tăng ít nhất cần dùng để phủ kín toàn bộ mảng đúng bằng độ dài của **Dãy con tăng dài nhất (LIS)**!*

Đây là bài toán kinh điển như: *"Hệ thống phòng thủ tên lửa chỉ có thể bắn các tên lửa có độ cao không tăng. Cần ít nhất bao nhiêu hệ thống để bắn hạ toàn bộ tên lửa bay tới?"* $\implies$ Đáp án chính là độ dài LIS của dãy độ cao tên lửa!

---

## 6. Bảng tổng kết bỏ túi

| Thuật toán | Độ phức tạp thời gian | Bộ nhớ phụ | Khi nào nên dùng? |
| :--- | :--- | :--- | :--- |
| **Quy hoạch động $O(n^2)$** | $O(n^2)$ | $O(n)$ | Khi $n \le 5.000$, code nhanh, dễ nhớ, dễ biến tấu điều kiện phức tạp. |
| **Binary Search $O(n \log n)$** | $O(n \log n)$ | $O(n)$ | **Tiêu chuẩn vàng**: Khi $n \le 10^6$, cần tốc độ bàn thờ. |
| **Cây Fenwick / Segment Tree** | $O(n \log n)$ | $O(n)$ | Khi bài toán yêu cầu **đếm số lượng** dãy LIS hoặc cập nhật giá trị động. |

---

## 7. Bài tập rèn luyện kỹ năng

Hãy mở máy lên và nộp thử những bài tập kinh điển này để ghi nhớ sâu sắc nhé:

1. [SPOJ - ELIS (Easy Longest Increasing Subsequence)](https://www.spoj.com/problems/ELIS/): Bài tập khởi động cơ bản nhất.
2. [Codeforces 10D - LCIS (Longest Common Increasing Subsequence)](http://codeforces.com/problemset/problem/10/D): Kết hợp giữa Dãy con chung dài nhất (LCS) và LIS.
3. [SPOJ - SUPPER (Supernumbers in a sequence)](http://www.spoj.com/problems/SUPPER/): Tìm các phần tử có thể thuộc vào một dãy LIS bất kỳ.

---

## Lời kết

LIS không hề khó như vẻ ngoài hào nhoáng của nó. Chỉ cần bạn nhớ được trực giác cốt lõi: **luôn muốn phần tử kết thúc của dãy con là nhỏ nhất có thể**, thì thuật toán $O(n \log n)$ sẽ tự động hiện lên trong đầu bạn một cách cực kỳ tự nhiên. Chúc bạn code trơn tru và chinh phục thật nhiều bài toán quy hoạch động thú vị!
