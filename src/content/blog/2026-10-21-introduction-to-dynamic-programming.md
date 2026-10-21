---
title: "Nhập môn Quy hoạch động (Dynamic Programming): Từ đệ quy ngây thơ đến tối ưu hóa"
description: "Hướng dẫn nhập môn Quy hoạch động (DP) dễ hiểu nhất: bản chất của việc không tính lại bài toán cũ, kỹ thuật Memoization (Top-down), Bottom-up và các dạng bài kinh điển."
pubDate: "2026-10-21"
tags: ["Dynamic Programming", "Algorithms", "C++", "Competitive Programming"]
categories: ["Competitive Programming"]
excerpt: "Bản chất của quy hoạch động gói gọn trong một câu: Đừng bao giờ tính lại những gì bạn đã giải xong. Tìm hiểu cách tối ưu hàm Fibonacci từ số mũ O(2^n) xuống tuyến tính O(n) và hằng số O(1)."
---

> *"Bản chất của Quy hoạch động chỉ gói gọn trong một câu: Đừng bao giờ làm lại những việc bạn đã giải quyết xong."*

Nếu bạn từng nghe đến cụm từ **Quy hoạch động (Dynamic Programming - DP)** và cảm thấy nó có vẻ đáng sợ, phức tạp hay đậm chất toán học cao cấp, thì đừng quá lo lắng. Thuật ngữ này do nhà toán học Richard Bellman đặt ra vào những năm 1950, và thực chất nó đơn giản là một **phương pháp giải quyết bài toán thông minh**: chia bài toán lớn thành các bài toán con nhỏ hơn, giải từng bài toán con **đúng một lần**, rồi lưu kết quả lại để dùng cho những lần sau.

Trong bài viết này, chúng ta sẽ cùng mổ xẻ bản chất của DP qua ví dụ kinh điển nhất: **Dãy số Fibonacci**.

---

## 1. Bản chất cốt lõi: Đừng tính toán lặp lại

Hãy tưởng tượng bạn đang tính:
$$1 + 1 + 1 + 1 + 1 = 5$$

Bây giờ, nếu tôi viết thêm `+ 1` vào bên phải:
$$1 + 1 + 1 + 1 + 1 + 1 = ?$$

Làm sao bạn biết ngay kết quả là **6**? Bạn có đếm lại từ đầu 6 con số 1 không? Chắc chắn là không. Bạn nhớ rằng dãy trước đó có giá trị là 5, và bạn chỉ cần cộng thêm 1.

Đó chính là tư tưởng của Quy hoạch động: **ghi nhớ kết quả của quá khứ để trả lời câu hỏi của hiện tại trong chớp mắt**.

---

## 2. Điểm xuất phát: Đệ quy ngây thơ (Naive Recursion)

Dãy số Fibonacci được định nghĩa như sau:
- $f(0) = 0$
- $f(1) = 1$
- $f(n) = f(n - 1) + f(n - 2)$ với mọi $n \ge 2$

Cách trực quan nhất để chuyển đổi công thức toán học này sang mã nguồn C++ là dùng hàm đệ quy:

```cpp
int f(int n) {
    if (n == 0) return 0;
    if (n == 1) return 1;
    return f(n - 1) + f(n - 2);
}
```

### Tại sao cách này lại cực kỳ tệ?

Hàm trên nhìn rất ngắn gọn và thanh lịch, nhưng độ phức tạp thời gian của nó lên tới **$O(2^n)$** (chính xác xấp xỉ tỉ lệ vàng $O(1.618^n)$). 

Mỗi khi bạn gọi $f(n)$, nó lại sinh ra 2 lời gọi hàm con $f(n-1)$ và $f(n-2)$. Cây đệ quy sẽ phình to gấp đôi sau mỗi tầng:

```text
                     f(5)
              /                \
          f(4)                  f(3)
         /    \                /    \
      f(3)    f(2)          f(2)    f(1)
     /   \    /   \        /   \
   f(2) f(1) f(1) f(0)   f(1) f(0)
```

Hãy nhìn vào sơ đồ trên:
- $f(3)$ bị tính lại **2 lần**.
- $f(2)$ bị tính lại **3 lần**.
- $f(1)$ và $f(0)$ bị gọi lại vô số lần ở đáy cây.

Chỉ với $n = 29$, hàm đệ quy ngây thơ này phải thực hiện **hơn 1 triệu lời gọi hàm**! Với $n = 50$, máy tính hiện đại có thể mất hàng chục phút mới chạy xong.

---

## 3. Top-down DP: Kỹ thuật ghi nhớ (Memoization)

Để giải quyết sự lãng phí trên, hãy để ý: **tổng số bài toán con thực sự chỉ là $O(n)$**. Để tính $f(n)$, ta chỉ thực sự cần biết kết quả của đúng $n+1$ giá trị: $f(0), f(1), f(2), \dots, f(n)$.

Giải pháp tự nhiên nhất: **Gặp bài toán nào đã tính rồi thì lấy kết quả ra dùng luôn, chưa tính thì mới tính rồi ghi lại vào sổ tay**.

Kỹ thuật này gọi là **Top-down Dynamic Programming with Memoization** (đọc là *memo-ization*, bắt nguồn từ "memo" - mẩu giấy ghi nhớ, không phải *memorization* - học vẹt).

### Cài đặt với mảng (Array Lookup Table)

```cpp
#include <iostream>
using namespace std;

const int MAXN = 100;
bool found[MAXN]; // Đánh dấu bài toán đã được giải chưa
int memo[MAXN];   // Lưu kết quả của bài toán

int f(int n) {
    // 1. Nếu đã tính rồi, trả về ngay lập tức trong O(1)
    if (found[n]) return memo[n];

    // 2. Trường hợp cơ sở (Base cases)
    if (n == 0) return 0;
    if (n == 1) return 1;

    // 3. Tính toán lần đầu, lưu lại vào bảng rồi trả về
    found[n] = true;
    return memo[n] = f(n - 1) + f(n - 2);
}
```

### Hiệu quả đáng kinh ngạc

- Với $n = 29$, thay vì hơn **1.000.000** lượt gọi hàm, thuật toán có nhớ chỉ tốn đúng **57 lời gọi hàm** — giảm gần **20.000 lần**!
- Độ phức tạp thời gian giảm từ hàm mũ $O(2^n)$ xuống **tuyến tính $O(n)$**.

*(Lưu ý nhỏ: $f(46) = 1.836.311.903$ là số Fibonacci lớn nhất vừa khít kiểu số nguyên 32-bit có dấu `int`. Với $n \ge 47$, bạn cần đổi sang `long long` để tránh tràn số).*

### Công thức tính độ phức tạp cho Top-down DP

Một mẹo thực tế để ước lượng độ phức tạp của hàm đệ quy có nhớ:
$$\text{Total Time} = (\text{Number of Subproblems}) \times (\text{Work per Subproblem})$$

*(Nói một cách dễ hiểu: Tổng thời gian = Số lượng bài toán con duy nhất $\times$ Chi phí xử lý một bài toán con)*

Với Fibonacci:
- Có $O(n)$ trạng thái từ $0$ đến $n$.
- Mỗi trạng thái chỉ mất $O(1)$ phép cộng để tính.
- Tổng độ phức tạp: $O(n) \times O(1) = O(n)$.

### Lưu trạng thái bằng Hash Table hoặc Map

Nếu không gian trạng thái không phải là số nguyên liên tục từ $0 \dots N$ (ví dụ: trạng thái là chuỗi xâu ký tự, vector hoặc số nguyên rất thưa), ta có thể dùng `std::unordered_map` hoặc `std::map`:

```cpp
#include <unordered_map>
using namespace std;

unordered_map<int, int> memo;

int f(int n) {
    if (memo.count(n)) return memo[n];
    if (n == 0) return 0;
    if (n == 1) return 1;
    return memo[n] = f(n - 1) + f(n - 2);
}
```

> **Lưu ý:** Mảng tĩnh (`array/vector`) luôn chạy nhanh hơn `map` hay `unordered_map` rất nhiều nhờ chi phí hằng số cực nhỏ và cơ chế tối ưu bộ nhớ đệm (Cache Locality). Hãy luôn ưu tiên dùng mảng khi chỉ số trạng thái là số nguyên nằm trong giới hạn cho phép.

---

## 4. Bottom-up DP: Quy hoạch động từ dưới lên

Cách tiếp cận **Top-down** đi từ bài toán lớn $f(n)$ gọi dần xuống bài toán cơ sở $f(0), f(1)$.

Ngược lại, **Bottom-up** bắt đầu từ những bài toán nhỏ nhất đã biết trước đáp án ($f(0) = 0, f(1) = 1$), sau đó dùng vòng lặp để xây dựng dần lên đáp án của bài toán lớn hơn:

```cpp
const int MAXN = 100;
int fib[MAXN];

int f(int n) {
    fib[0] = 0;
    fib[1] = 1;
    for (int i = 2; i <= n; i++) {
        fib[i] = fib[i - 1] + fib[i - 2];
    }
    return fib[n];
}
```

### Tối ưu không gian bộ nhớ: Từ $O(n)$ xuống $O(1)$

Quan sát công thức $fib[i] = fib[i - 1] + fib[i - 2]$, ta thấy để tính phần tử hiện tại, **ta chỉ cần duy nhất 2 phần tử liền trước nó**. Giữ lại toàn bộ mảng $N$ phần tử là không cần thiết.

Ta có thể tối ưu không gian bộ nhớ về **$O(1)$** bằng mảng cuốn chiếu (hoặc 3 biến đơn giản):

```cpp
int f(int n) {
    if (n == 0) return 0;
    if (n == 1) return 1;

    int prev2 = 0; // f(i - 2)
    int prev1 = 1; // f(i - 1)
    int current = 0;

    for (int i = 2; i <= n; i++) {
        current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    return current;
}
```

Hoặc dùng kỹ thuật lấy dư (`%`) để tái sử dụng mảng cố định 3 phần tử:
```cpp
const int MAX_SAVE = 3;
int fib[MAX_SAVE];

int f(int n) {
    fib[0] = 0;
    fib[1] = 1;
    for (int i = 2; i <= n; i++) {
        fib[i % MAX_SAVE] = fib[(i - 1) % MAX_SAVE] + fib[(i - 2) % MAX_SAVE];
    }
    return fib[n % MAX_SAVE];
}
```

---

## 5. So sánh: Top-down vs Bottom-up

| Tiêu chí | Top-down (Memoization) | Bottom-up (Tabulation) |
| :--- | :--- | :--- |
| **Cách tiếp cận** | Từ đỉnh xuống đáy (gọi đệ quy khi cần) | Từ đáy lên đỉnh (dùng vòng lặp `for`) |
| **Dễ viết** | Rất tự nhiên, chỉ cần thêm mảng nhớ vào hàm đệ quy sẵn có | Đòi hỏi xác định trước thứ tự tính toán hợp lệ |
| **Trạng thái tính** | Chỉ tính các trạng thái **thực sự cần thiết** | Thường tính duyệt qua mọi trạng thái trong bảng |
| **Hiệu năng thực tế** | Chậm hơn một chút do chi phí gọi hàm (Call Stack Overhead) | Nhanh hơn, không bao giờ sợ tràn ngăn xếp (Stack Overflow) |
| **Tối ưu bộ nhớ** | Khó tối ưu kích thước bảng nhớ | Dễ dàng áp dụng mảng cuốn chiếu để đưa về $O(1)$ hoặc $O(W)$ |

---

## 6. Các bài toán Quy hoạch động kinh điển

Để thành thạo quy hoạch động, cách hiệu quả nhất là nắm chắc các mô hình bài toán kinh điển:

1. **0-1 Knapsack (Bài toán cái túi):** Chọn tập đồ vật sao cho tổng giá trị lớn nhất mà tổng trọng lượng không vượt quá giới hạn $W$.
2. **Subset Sum (Tổng tập con):** Kiểm tra xem có tồn tại một tập con các phần tử có tổng đúng bằng giá trị $T$ hay không.
3. **Longest Increasing Subsequence (LIS):** Tìm dãy con tăng dài nhất trong mảng $N$ phần tử.
4. **Counting Paths in a Grid:** Đếm số đường đi hợp lệ từ ô $(1, 1)$ đến $(N, M)$ trên lưới 2D, mỗi bước chỉ được đi sang phải hoặc đi xuống dưới.
5. **Longest Common Subsequence (LCS):** Tìm xâu con chung dài nhất của hai chuỗi ký tự $S$ và $T$.
6. **Edit Distance (Khoảng cách Levenshtein):** Số phép biến đổi tối thiểu (Thêm, Xóa, Thay thế) để chuyển chuỗi $A$ thành chuỗi $B$.
7. **Longest Palindromic Subsequence (LPS):** Tìm độ dài xâu con đối xứng dài nhất trong một chuỗi.
8. **Rod Cutting:** Cắt thanh kim loại thành các đoạn nhỏ để bán được tổng giá trị cao nhất.
9. **Longest Path in a DAG:** Tìm đường đi có độ dài lớn nhất trên đồ thị có hướng không chu trình.

---

## 7. Các chủ đề nâng cao cần khám phá tiếp theo

Khi đã quen với việc thiết kế trạng thái cơ bản, bạn có thể mở rộng sang các dạng DP nâng cao:
- **Bitmask DP:** Dùng từng bit của số nguyên để đại diện cho trạng thái của một tập hợp (thường dùng khi $N \le 20$, bài toán TSP).
- **Digit DP:** Quy hoạch động trên từng chữ số để đếm số lượng số trong đoạn $[L, R]$ thỏa mãn tính chất đặc biệt.
- **Tree DP:** Quy hoạch động trên cây con, kết hợp kỹ thuật DFS và đổi gốc (Rerooting).
- **DP Optimization:** Tối ưu hóa chuyển trạng thái bằng Chia để trị (Divide & Conquer), Convex Hull Trick (CHT) hoặc Monotonic Queue.

---

## 8. Luyện tập ở đâu?

Lập trình thi đấu không thể thiếu thực hành. Dưới đây là hai danh sách bài tập DP được cộng đồng competitive programming đánh giá cao nhất:

- **[AtCoder - Educational DP Contest](https://atcoder.jp/contests/dp/tasks):** Tuyển tập 26 bài toán từ A đến Z, bao phủ toàn bộ các dạng DP kinh điển từ cơ bản đến nâng cao.
- **[CSES Problem Set - Dynamic Programming](https://cses.fi/problemset/list/):** Bộ bài tập chuẩn mực, ngắn gọn và cực kỳ rèn luyện tư duy nền tảng.
- **LeetCode / Codeforces:** Bắt đầu với các bài như *Tribonacci Number*, *Pascal's Triangle*, *Divisor Game*, sau đó nâng lên *Vacations (CF 699C)* hay *Hard Problem (CF 706C)*.

---

## Lời kết

Quy hoạch động thực chất không hề có phép thuật cao siêu nào. Nó chỉ đơn giản là:
1. Nhận diện các bài toán con trùng lặp.
2. Thiết kế trạng thái lưu trữ thông tin tối thiểu cần thiết.
3. Chuyển trạng thái dựa trên các kết quả đã biết.

Hãy bắt đầu từ việc viết một hàm đệ quy tự nhiên, thêm mẩu giấy ghi nhớ (Memoization), rồi chuyển thành vòng lặp Bottom-up. Khi đã hình thành được phản xạ này, bạn sẽ thấy DP là một trong những công cụ đẹp đẽ và mạnh mẽ nhất của thế giới thuật toán.
