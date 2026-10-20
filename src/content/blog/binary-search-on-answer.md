---
title: "Tìm kiếm nhị phân trên đáp án: Nghĩ từ một bài toán đơn giản"
description: "Từ một bài toán tưởng chừng phải thử từng trường hợp, khám phá cách tìm kiếm nhị phân giúp tìm ra đáp án tối ưu nhanh và thông minh hơn."
pubDate: "2026-10-16"
tags: ["Competitive Programming", "Binary Search", "C++", "Algorithms"]
categories: ["Algorithms"]
excerpt: "Khi gặp một bài toán, đừng vội nghĩ đến thuật toán. Hãy thử giải nó theo cách đơn giản nhất, tìm ra điểm khiến cách đó chậm, rồi mới tối ưu."
---

# Tìm kiếm nhị phân trên đáp án: Nghĩ từ một bài toán đơn giản

> Ngừng học các thuật toán vô dụng, hãy luyện tập, học cách dùng tìm kiếm nhị phân - **Um_nik**

## 1. Khi gặp một vấn đề, mày sẽ làm gì đầu tiên?

Thử tưởng tượng có một nhóm công việc cần hoàn thành. Mỗi công việc mất một khoảng thời gian khác nhau, và chúng phải được thực hiện theo đúng thứ tự.

Mày có hai ngày để hoàn thành tất cả. Mày muốn biết một ngày cần được phép làm tối đa bao nhiêu đơn vị công việc để chắc chắn hoàn thành đúng hạn.

Nếu giới hạn thời gian mỗi ngày quá thấp, công việc sẽ bị chia thành quá nhiều ngày. Nếu giới hạn đủ lớn, mọi thứ sẽ dễ dàng hơn.

Vấn đề là: **giới hạn nhỏ nhất có thể là bao nhiêu?**

Đây là lúc nhiều người mới học lập trình thường nghĩ ngay đến việc tìm một công thức. Nhưng thật ra, chưa cần công thức gì cả.

Hãy bắt đầu bằng cách giải quyết vấn đề theo cách đơn giản nhất mà mình nghĩ ra.

## 2. Cách nghĩ ngây thơ: Thử từng đáp án

Giả sử có năm công việc, lần lượt mất:

\[
7,\ 2,\ 5,\ 10,\ 8
\]

Mày phải hoàn thành chúng trong không quá hai ngày, và không được đổi thứ tự công việc.

Nếu mỗi ngày chỉ được làm tối đa 10 đơn vị thời gian thì sao?

- Ngày đầu: làm công việc mất 7 và 2 đơn vị, tổng cộng 9.
- Ngày tiếp theo có thể làm công việc mất 5 và 10 đơn vị không? Không, vì tổng là 15, vượt quá 10.
- Công việc mất 10 và công việc mất 8 cũng không thể nằm cùng một ngày.

Rõ ràng, giới hạn 10 là quá thấp.

Vậy thử 11? 12? 13? Hay 14?

Ta có thể viết chương trình thử lần lượt từng giới hạn:

- Thử 10, kiểm tra xem có hoàn thành trong hai ngày không.
- Nếu không được, thử 11.
- Vẫn không được thì thử 12.
- Cứ tiếp tục cho đến khi tìm thấy giới hạn đầu tiên đáp ứng yêu cầu.

Đây là một cách giải hoàn toàn hợp lý. Nó đơn giản, dễ hiểu và có thể tìm được đáp án nếu ta kiểm tra đúng.

Nhưng có một câu hỏi: **nếu đáp án nằm trong hàng tỷ giá trị thì sao?**

Thử từng số một sẽ rất chậm. Ta cần một cách tìm kiếm thông minh hơn.

## 3. Nhận ra một điều rất quan trọng

Quay lại bài toán trên.

Giả sử ta đã kiểm tra giới hạn 18 và thấy rằng nó làm được. Nghĩa là với tối đa 18 đơn vị thời gian mỗi ngày, ta có thể hoàn thành công việc trong hai ngày.

Vậy giới hạn 19 có làm được không?

Có. Nếu mỗi ngày được phép làm tối đa 18 đơn vị mà đã hoàn thành được, thì tăng giới hạn lên 19 không thể khiến việc phân chia trở nên khó khăn hơn.

Tương tự, 20, 21, 22... đều làm được.

Ta có một nhận xét:

- Giới hạn quá nhỏ: không hoàn thành được.
- Đến một giới hạn nào đó: bắt đầu hoàn thành được.
- Từ giới hạn đó trở đi: tất cả các giới hạn lớn hơn đều làm được.

Hãy hình dung dãy kết quả:

| Giới hạn mỗi ngày | Có hoàn thành được không? |
|---:|:---|
| 10 | Không |
| 11 | Không |
| 12 | Không |
| 13 | Không |
| 14 | Không |
| 15 | Không |
| 16 | Không |
| 17 | Không |
| 18 | Có |
| 19 | Có |
| 20 | Có |
| 21 | Có |

Điểm thú vị là ta không cần biết trước đáp án. Chỉ cần kiểm tra một giới hạn bất kỳ, ta có thể biết nên tiếp tục tìm ở phía nào.

Đây chính là ý tưởng nền tảng của **tìm kiếm nhị phân trên đáp án**, hay *Binary Search on Answer*.

## 4. Thay vì thử từng số, hãy thử ở giữa

Giả sử ta biết đáp án nằm trong khoảng từ 10 đến 30.

Cách thông thường là thử 10, rồi 11, rồi 12... Nhưng ta có thể thử ngay số nằm giữa khoảng:

\[
mid = \left\lfloor \frac{10+30}{2} \right\rfloor = 20
\]

Giả sử 20 làm được.

Ta biết 20 là một giới hạn đủ tốt. Nhưng có thể còn một giới hạn nhỏ hơn cũng làm được, nên ta không cần tìm ở phía lớn hơn 20 nữa.

Ta chỉ giữ lại khoảng từ 10 đến 20.

Tiếp theo, thử chính giữa khoảng mới:

\[
mid = \left\lfloor \frac{10+20}{2} \right\rfloor = 15
\]

Nếu 15 không làm được, thì các giới hạn nhỏ hơn 15 cũng không làm được. Ta có thể bỏ toàn bộ đoạn từ 10 đến 15, rồi tìm tiếp trong đoạn còn lại.

Cứ như vậy, mỗi lần kiểm tra ta loại bỏ được khoảng một nửa số khả năng.

Đó là lý do tìm kiếm nhị phân nhanh hơn rất nhiều so với việc thử từng số.

## 5. Nhưng máy tính kiểm tra một đáp án như thế nào?

Ta cần dạy máy tính cách trả lời câu hỏi:

*Với giới hạn thời gian mỗi ngày là \(X\), có thể hoàn thành công việc trong không quá hai ngày không?*

Hãy lấy ví dụ \(X = 18\).

Các công việc là:

\[
[7,\ 2,\ 5,\ 10,\ 8]
\]

Ta lần lượt xếp công việc vào từng ngày, giữ nguyên thứ tự và không để tổng thời gian vượt quá 18.

- Ngày 1: \(7 + 2 + 5 = 14\). Thêm công việc 10 sẽ thành 24, quá giới hạn, nên dừng ngày đầu.
- Ngày 2: \(10 + 8 = 18\).

Ta hoàn thành trong đúng hai ngày. Vậy 18 là một giới hạn khả thi.

Bây giờ thử \(X = 17\):

- Ngày 1: \(7 + 2 + 5 = 14\).
- Ngày 2: chỉ làm được công việc 10.
- Ngày 3: làm công việc 8.

Cần ba ngày, nên giới hạn 17 không đáp ứng yêu cầu.

Từ đây, ta có thể viết một hàm tên `check(X)`. Nó chỉ cần trả lời `true` nếu giới hạn \(X\) dùng được, và `false` nếu không dùng được.

Tên hàm không quan trọng. Điều quan trọng là nó giúp ta kiểm tra một đáp án ứng viên mà không cần thử tất cả những đáp án khác.

## 6. Viết chương trình C++ từ những ý tưởng vừa rồi

Đây là toàn bộ chương trình cho bài toán chia công việc:

```cpp
#include <bits/stdc++.h>
using namespace std;

using ll = long long;

int main() {
    ios::sync_with_stdio(false);
    cin.tie(nullptr);

    int n, k;
    cin >> n >> k;

    vector<ll> a(n);
    ll L = 0, R = 0;

    for (ll &x : a) {
        cin >> x;
        L = max(L, x);
        R += x;
    }

    // Kiểm tra giới hạn thời gian limit
    // có đủ để hoàn thành trong không quá k ngày không.
    auto check = [&](ll limit) -> bool {
        int days = 1;
        ll current = 0;

        for (ll x : a) {
            if (current + x <= limit) {
                current += x;
            } else {
                ++days;
                current = x;
            }
        }

        return days <= k;
    };

    // Tìm giới hạn nhỏ nhất có thể sử dụng.
    while (L < R) {
        ll mid = L + (R - L) / 2;

        if (check(mid)) {
            R = mid;
        } else {
            L = mid + 1;
        }
    }

    cout << L << '\n';

    return 0;
}
```

Input:

```text
5 2
7 2 5 10 8
```

Output:

```text
18
```

### Đọc code theo cách dễ hiểu

**Bước 1: Tìm khoảng đáp án.**

```cpp
L = max(L, x);
R += x;
```

Một ngày không thể nhận ít thời gian hơn thời gian của công việc dài nhất, nên cận dưới là công việc lớn nhất.

Còn nếu một ngày có đủ thời gian bằng tổng thời gian của tất cả công việc, ta luôn có thể làm hết trong một ngày. Vì thế, tổng thời gian là cận trên hợp lệ.

**Bước 2: Kiểm tra một giới hạn.**

Hàm `check(limit)` lần lượt xếp các công việc vào ngày hiện tại. Nếu thêm công việc tiếp theo khiến tổng vượt quá giới hạn, nó chuyển sang ngày mới.

Cuối cùng, nếu số ngày cần dùng không vượt quá `k`, hàm trả về `true`.

**Bước 3: Thu hẹp khoảng đáp án.**

Nếu `check(mid)` trả về `true`, giới hạn `mid` đã đủ tốt, nhưng ta vẫn thử tìm một giới hạn nhỏ hơn. Vì vậy, ta đặt `R = mid`.

Nếu `check(mid)` trả về `false`, giới hạn đó quá nhỏ. Ta phải tìm một giá trị lớn hơn, nên đặt `L = mid + 1`.

Khi `L == R`, ta đã tìm được giới hạn nhỏ nhất có thể sử dụng.

## 7. Tại sao cách này nhanh hơn?

Với cách thử từng số, nếu đáp án nằm rất xa cận dưới, chương trình có thể phải kiểm tra hàng triệu hoặc hàng tỷ giá trị.

Với tìm kiếm nhị phân, mỗi lần kiểm tra ta loại bỏ gần một nửa khoảng đang tìm kiếm.

Ví dụ, một khoảng có 1.000.000 khả năng sẽ giảm còn khoảng:

- 500.000 sau lần đầu.
- 250.000 sau lần thứ hai.
- 125.000 sau lần thứ ba.

Ta không cần đi qua lần lượt từng giá trị để đến gần đáp án.

Nếu mỗi lần kiểm tra cần duyệt \(n\) công việc, chương trình có độ phức tạp:

\[
O(n\log S)
\]

Trong đó \(S\) là tổng thời gian của tất cả công việc.

Đừng quá bận tâm đến công thức này khi mới học. Điều cần nhớ là: **ta dùng một lần kiểm tra để loại bỏ rất nhiều khả năng, thay vì kiểm tra từng khả năng một.**

## 8. Khi nào nên nghĩ đến kỹ thuật này?

Không phải cứ bài toán có đáp án là có thể dùng tìm kiếm nhị phân trên đáp án.

Hãy chú ý khi đề bài yêu cầu:

- Tìm giá trị nhỏ nhất đủ để hoàn thành một nhiệm vụ.
- Tìm giới hạn lớn nhất mà vẫn đáp ứng điều kiện.
- Tìm thời gian tối thiểu, sức chứa tối thiểu hoặc một mức tài nguyên phù hợp.
- Kiểm tra một giá trị cụ thể khá dễ, nhưng thử tất cả các giá trị lại quá chậm.

Sau đó, hãy tự hỏi:

**Nếu một giá trị đã làm được, những giá trị lớn hơn hoặc nhỏ hơn có chắc chắn làm được theo một chiều nào đó không?**

Nếu có, mày có thể đang đứng trước một bài toán phù hợp với Binary Search on Answer.

Nếu không, đừng cố ép nó vào tìm kiếm nhị phân. Có thể bài toán cần một cách tiếp cận khác.

## 9. Điều nên rút ra khi luyện Competitive Programming

Khi mới gặp một bài khó, đừng vội mở template hoặc cố nhớ tên thuật toán.

Hãy thử đi theo trình tự:

1. Đọc đề và nói lại bằng lời của mình xem đề thực sự yêu cầu gì.
2. Nghĩ ra cách giải đơn giản nhất, kể cả khi nó chậm.
3. Xác định phần nào khiến cách giải đó tốn thời gian.
4. Tìm xem có thể bỏ qua nhiều khả năng cùng lúc hay không.
5. Chứng minh rằng cách loại bỏ ấy không làm mất đáp án đúng.
6. Cuối cùng mới chọn thuật toán và viết code.

Trong ví dụ này, cách ngây thơ là thử từng giới hạn thời gian. Bước cải tiến là nhận ra rằng khi một giới hạn đã đủ tốt, mọi giới hạn lớn hơn cũng đủ tốt. Từ nhận xét ấy, ta mới có cơ sở để dùng tìm kiếm nhị phân.

Đó là một cách học thuật toán bền vững hơn việc chỉ ghi nhớ những đoạn code có sẵn.

## Kết luận

Tìm kiếm nhị phân trên đáp án nghe có vẻ là một khái niệm khó, nhưng ý tưởng ban đầu khá gần gũi: thay vì thử mọi lựa chọn, hãy tìm cách xác định một lựa chọn có đủ tốt hay không, rồi dùng kết quả đó để loại bỏ những lựa chọn không cần thiết.

Code chỉ là phần cuối cùng của quá trình. Phần đáng học nhất là cách ta đi từ một lời giải đơn giản đến một lời giải nhanh hơn.

Khi luyện Codeforces, hãy tập trung vào quá trình suy nghĩ đó. Một khi hiểu được vì sao thuật toán hoạt động, việc nhớ và áp dụng code sẽ tự nhiên hơn rất nhiều.