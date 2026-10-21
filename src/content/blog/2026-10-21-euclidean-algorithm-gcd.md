---
title: "Thuật toán Euclid: Đừng sợ Ước chung lớn nhất (GCD), nó dễ hiểu hơn bạn tưởng!"
description: "Giải thích thuật toán Euclid tìm ước chung lớn nhất (GCD) và bội chung nhỏ nhất (LCM) bằng ngôn ngữ mộc mạc, gần gũi. Đi từ trực giác cắt bánh, phép chia lấy dư đến tối ưu Binary GCD và cạm bẫy tràn số."
pubDate: "2026-10-21"
tags: ["Math", "Algorithms", "C++", "Competitive Programming"]
categories: ["Algorithms"]
excerpt: "Nếu bạn từng toát mồ hôi mỗi khi nghe đến số học, ước chung lớn nhất hay các công thức toán rời rạc, hãy thả lỏng. Thuật toán Euclid thật ra chỉ là một trò chơi xếp hình cực kỳ thông minh từ 2300 năm trước."
---

> *"Toán học số học trong lập trình thi đấu có thực sự đáng sợ như người ta đồn không?"*

Nếu bạn là người mới bắt đầu học thuật toán, hoặc trước giờ mỗi lần nhìn thấy ký hiệu $\gcd(a, b)$, modun, đồng dư là trong đầu lại có một cảm giác "ngợp" và muốn bỏ cuộc — thì xin chúc mừng, bài viết này dành riêng cho bạn.

Hãy dẹp hết mớ định lý khô khan sang một bên. Hãy pha một cốc nước mát, thả lỏng vai, và cùng mình khám phá xem người xưa đã tìm ra **Ước chung lớn nhất (Greatest Common Divisor - GCD)** bằng một trò chơi thông minh như thế nào nhé!

---

## 1. Ước chung lớn nhất (GCD) thực ra là cái gì?

Đừng vội nhìn vào định nghĩa hình thức:
$$\gcd(a, b) = \max \{k > 0 : (k \mid a) \text{ and } (k \mid b) \}$$

*(Ký hiệu $k \mid a$ chỉ đơn giản có nghĩa là "$a$ chia hết cho $k$")*

### Hãy tưởng tượng câu chuyện lát nền nhà
Giả sử bạn có một căn phòng hình chữ nhật kích thước chiều dài **$24\text{ m}$** và chiều rộng **$18\text{ m}$**.

Bây giờ bạn muốn lát kín sàn nhà này bằng những viên gạch men **hình vuông** bằng nhau chằn chặn, không viên nào bị cắt xén hay đập vỡ. 

Rõ ràng, kích thước cạnh của viên gạch hình vuông đó phải:
1. Chia hết cho $18$ (để xếp vừa khít chiều rộng).
2. Chia hết cho $24$ (để xếp vừa khít chiều dài).

Viên gạch cạnh $1\text{ m}$ được không? Được ($18$ chia hết cho $1$, $24$ chia hết cho $1$).  
Cạnh $2\text{ m}$ được không? Được ($18$ và $24$ đều là số chẵn).  
Cạnh $3\text{ m}$ được không? Vẫn được ($18$ chia $3$ được $6$, $24$ chia $3$ được $8$).  
Cạnh $6\text{ m}$ được không? Được ($18$ chia $6$ được $3$, $24$ chia $6$ được $4$).  

Nhưng viên gạch lớn nhất có thể xếp vừa vặn mà không phải đập bỏ góc nào chính là viên có cạnh **$6\text{ m}$**. 

Số $6$ đó chính là **Ước chung lớn nhất** của $24$ và $18$:
$$\gcd(24, 18) = 6$$

Nói ngắn gọn: **GCD của hai số là số nguyên dương lớn nhất có thể chia hết cho cả hai số đó cùng một lúc.**

### Trường hợp số 0 thì sao?
Đôi khi gặp đề bài có số $0$, nhiều bạn hay bị hoang mang:
- Nếu một số là $0$ và số kia khác $0$, ví dụ $\gcd(0, 7)$: Mọi số đều là ước của $0$ (vì $0 \div k = 0$), do đó ước chung lớn nhất của $0$ và $7$ chính là $7$. Quy tắc đơn giản: **$\gcd(a, 0) = a$**.
- Nếu cả hai số đều bằng $0$: Toán học thuần túy coi $\gcd(0, 0)$ là vô định (vì bất kỳ số nguyên lớn đến mấy cũng chia hết cho $0$). Nhưng trong lập trình, ta quy ước luôn $\gcd(0, 0) = 0$ để các hàm toán học chạy trơn tru mà không bị văng lỗi.

---

## 2. Làm sao tìm GCD? Bước tiến từ "ngây thơ" đến Euclid

### Cách "ngây thơ" nhất
Cách tự nhiên nhất mà ai cũng nghĩ tới: Lấy số nhỏ hơn giữa hai số, ví dụ $18$, rồi kiểm tra lùi dần $18, 17, 16, \dots, 6$. Thấy số nào đầu tiên chia hết cho cả $18$ và $24$ thì chốt ngay!

```cpp
int gcd_naive(int a, int b) {
    for (int i = min(a, b); i >= 1; i--) {
        if (a % i == 0 && b % i == 0) return i;
    }
    return 1;
}
```

Cách này chạy tốt với số bé. Nhưng nếu đề bài cho hai số cỡ $10^{18}$, vòng lặp sẽ chạy đến hết tuổi thanh xuân của chiếc máy tính cũng chưa xong! Chúng ta cần một tư duy khác.

### Tư duy của Euclid: Trừ dần (Năm 300 trước Công Nguyên)
Cách đây hơn 2.300 năm, nhà toán học Hy Lạp cổ đại **Euclid** đã phát hiện ra một tính chất cực kỳ tự nhiên:

> *Nếu một thước đo $g$ đo vừa khít cả đoạn dài $a$ lẫn đoạn ngắn $b$, thì thước đo đó chắc chắn cũng đo vừa khít phần chênh lệch $(a - b)$.*

Nói cách khác:
$$\gcd(a, b) = \gcd(b, a - b)$$

Ví dụ với $(24, 18)$:
- $24 - 18 = 6 \implies \gcd(24, 18) = \gcd(18, 6)$
- $18 - 6 = 12 \implies \gcd(18, 6) = \gcd(12, 6)$
- $12 - 6 = 6 \implies \gcd(12, 6) = \gcd(6, 6)$
- $6 - 6 = 0 \implies \gcd(6, 6) = \gcd(6, 0) = 6$

Khi một trong hai số chạm mốc $0$, số còn lại chính là đáp án!

### Cú nhảy vọt: Phép chia lấy dư (`%`)
Nhưng bạn có để ý không? Ở bước trên, ta phải lấy $18 - 6$ rồi lại lấy $12 - 6$, tức là trừ số $6$ đi nhiều lần cho đến khi không trừ được nữa.

Trừ một số $b$ nhiều lần cho đến khi phần còn lại nhỏ hơn $b$... chẳng phải chính là **phép chia lấy dư** ($a \pmod b$) sao?

Thay vì trừ $18$ cho $6$ ba lần, ta tính luôn $18 \pmod 6 = 0$. Một bước là xong ngay!

Công thức Euclid kinh điển thu gọn lại đẹp như một bài thơ:
$$\gcd(a, b) = \begin{cases} a, &\text{if } b = 0 \\ \gcd(b, a \bmod b), &\text{otherwise} \end{cases}$$

---

## 3. Cài đặt C++: Ngắn, đẹp và bất bại

### Cách 1: Đệ quy 1 dòng (Dành cho người yêu cái đẹp)
Nhờ toán tử ba ngôi (`? :`), ta có thể viết hàm tính GCD trong một dòng duy nhất:

```cpp
long long gcd(long long a, long long b) {
    return b ? gcd(b, a % b) : a;
}
```

*Giải thích:*
- Nếu $b \neq 0$: tiếp tục gọi đệ quy `gcd(b, a % b)`.
- Nếu $b = 0$: dừng lại và trả về $a$.

### Cách 2: Vòng lặp `while` (Không sợ tràn bộ nhớ Stack)
Nếu bạn sợ đệ quy quá sâu gây tràn stack khi chạy dữ liệu lớn, hãy dùng vòng lặp:

```cpp
long long gcd(long long a, long long b) {
    while (b) {
        a %= b;
        swap(a, b);
    }
    return a;
}
```

Mỗi vòng lặp, ta lấy $a$ chia lấy dư cho $b$, rồi tráo đổi vai trò cho nhau. Đến khi $b = 0$, $a$ chính là ước chung lớn nhất. Rất gọn gàng và chạy cực nhanh!

> **Mách nhỏ:** Từ chuẩn **C++17**, bạn không cần tự viết hàm này nữa vì thư viện `<numeric>` đã tích hợp sẵn hàm `std::gcd(a, b)` tối ưu ở mức phần cứng. Tuy nhiên, việc hiểu bản chất thuật toán sẽ giúp bạn giải được vô số bài toán biến tấu khác.

---

## 4. Tại sao thuật toán này lại nhanh khủng khiếp đến thế?

Bạn có đoán được thuật toán Euclid mất bao nhiêu bước để tìm GCD của hai số lên tới **$10^{18}$** không?

Chỉ mất **chưa tới 90 bước**!

### Bản chất của tốc độ
Mỗi khi ta thực hiện $a \bmod b$ (với $a \ge b$), kết quả thu được luôn **nhỏ hơn một nửa** giá trị ban đầu của $a$:
- Nếu $b \le a / 2$, thì hiển nhiên số dư $a \bmod b < b \le a / 2$.
- Nếu $b > a / 2$, thì thương là $1$, và số dư $a \bmod b = a - b < a / 2$.

Nghĩa là cứ sau tối đa 2 bước lặp, số lớn hơn sẽ bị chia đôi ít nhất một lần. Đây chính là đặc trưng của độ phức tạp **$O(\log \min(a, b))$**.

### Mối duyên kỳ lạ với dãy Fibonacci (Định lý Lamé)
Nhà toán học Gabriel Lamé đã chứng minh một sự thật thú vị: **Trường hợp xấu nhất của thuật toán Euclid xảy ra khi hai số truyền vào là hai số Fibonacci liên tiếp** ($F_n$ và $F_{n-1}$).

Ví dụ với cặp $(8, 5)$:
- $8 \bmod 5 = 3 \implies (5, 3)$
- $5 \bmod 3 = 2 \implies (3, 2)$
- $3 \bmod 2 = 1 \implies (2, 1)$
- $2 \bmod 1 = 0 \implies (1, 0)$

Các số Fibonacci là chuỗi số có số dư luôn tụt chậm nhất. Nhưng vì các số Fibonacci tăng trưởng theo hàm mũ ($F_n \approx \phi^n$), nên kể cả trong trường hợp xấu nhất này, số lần gọi đệ quy cũng không bao giờ vượt quá $5$ lần số chữ số của số nhỏ hơn!

### Tính GCD của cả một dãy số
Nếu bạn có một mảng $n$ số nguyên $a_1, a_2, \dots, a_n \le C$, bạn chỉ cần gom dần:
$$\gcd(a_1, a_2, \dots, a_n) = \gcd(\dots \gcd(\gcd(a_1, a_2), a_3) \dots)$$

Độ phức tạp tổng cộng cho cả mảng không phải là $O(n \log C)$ đâu, mà thực chất chỉ là **$O(n + \log C)$**! Bởi vì mỗi lần giá trị GCD giảm đi đáng kể, nó sẽ không thể giảm mãi quá $\log C$ lần.

---

## 5. Người anh em sinh đôi: Bội chung nhỏ nhất (LCM)

Có GCD thì không thể không nhắc tới **LCM (Least Common Multiple)** — Bội chung nhỏ nhất.

Giữa GCD và LCM có một mối liên hệ tuyệt đẹp:
$$\gcd(a, b) \times \text{lcm}(a, b) = a \times b$$

Từ đó suy ra công thức tính LCM:
$$\text{lcm}(a, b) = \frac{a \times b}{\gcd(a, b)}$$

### Cạm bẫy "chết người" cần tránh: Tràn số!
Nhìn công thức trên, rất nhiều bạn viết code như sau:

```cpp
// NGUY HIỂM: Dễ bị tràn số (Overflow)
long long lcm_bad(long long a, long long b) {
    return (a * b) / gcd(a, b);
}
```

Giả sử $a = 10^9$ và $b = 10^9$. Kết quả LCM của chúng là $10^9$ (hoàn toàn nằm vừa trong kiểu số nguyên `long long`). Nhưng phép tính trung gian $a \times b = 10^{18}$ nếu nhân thêm một chút nữa có thể vượt ngưỡng $9 \times 10^{18}$ và gây tràn số âm!

**Cách khắc phục cực kỳ đơn giản: Hãy chia trước khi nhân!**

```cpp
// CHUẨN XÁC: Chia trước để thu nhỏ số, không bao giờ tràn
long long lcm(long long a, long long b) {
    if (a == 0 || b == 0) return 0;
    return (a / gcd(a, b)) * b;
}
```

Vì $\gcd(a, b)$ là ước của $a$, nên phép chia $a / \gcd(a, b)$ luôn là phép chia hết và an toàn tuyệt đối.

---

## 6. Cấp độ cao thủ: Binary GCD (Thuật toán Stein)

Trong các bài toán thông thường, `std::gcd` hay hàm Euclid ở trên đã quá đủ nhanh. Tuy nhiên, phép chia lấy dư (`%`) ở mức phần cứng máy tính vẫn là một phép tính tương đối tốn chu kỳ xung nhịp CPU so với phép cộng, trừ hay thao tác bit.

Thuật toán **Binary GCD (Thuật toán Stein)** ra đời để tìm GCD mà **hoàn toàn không dùng tới phép chia hay phép `%`**, chỉ dùng dịch bit (`>>`, `<<`) và trừ số:

### 3 quy tắc vàng:
1. **Nếu cả $a$ và $b$ đều chẵn:** $\gcd(a, b) = 2 \times \gcd(a / 2, b / 2)$.
2. **Nếu một số chẵn, một số lẻ:** Bỏ thừa số $2$ của số chẵn đi mà không làm đổi GCD. Ví dụ $a$ chẵn, $b$ lẻ: $\gcd(a, b) = \gcd(a / 2, b)$.
3. **Nếu cả hai số đều lẻ:** Trừ số nhỏ khỏi số lớn: $\gcd(a, b) = \gcd(b, a - b)$. Sau phép trừ, số lẻ trừ số lẻ sẽ thành số chẵn, ta lại quay về quy tắc số 2!

### Cài đặt C++ siêu tốc với hàm tích hợp GCC:
Hàm `__builtin_ctz(x)` đếm số lượng bit $0$ ở cuối của $x$ (tương đương tìm xem $x$ chia hết cho lũy thừa bậc mấy của $2$):

```cpp
int gcd_binary(int a, int b) {
    if (!a || !b) return a | b;
    // Tìm thừa số 2 chung lớn nhất của cả a và b
    unsigned shift = __builtin_ctz(a | b);
    
    // Loại bỏ hết các thừa số 2 của a
    a >>= __builtin_ctz(a);
    
    do {
        // Loại bỏ hết thừa số 2 của b
        b >>= __builtin_ctz(b);
        if (a > b) swap(a, b);
        b -= a; // b luôn là số chẵn sau bước này
    } while (b);
    
    return a << shift;
}
```

---

## 7. Bảng tóm tắt nhanh

| Khái niệm | Công thức / Bản chất | Độ phức tạp | Lưu ý cốt lõi |
| :--- | :--- | :--- | :--- |
| **GCD** | $\gcd(a, b) = \gcd(b, a \bmod b)$ | $O(\log \min(a, b))$ | Xấu nhất khi $a, b$ là 2 số Fibonacci liên tiếp. |
| **LCM** | $\text{lcm}(a, b) = (a / \gcd(a, b)) \times b$ | $O(\log \min(a, b))$ | Luôn **chia trước khi nhân** để chống tràn số. |
| **Binary GCD** | Dùng thao tác bit thay cho phép `%` | $O(\log \min(a, b))$ | Nhanh hơn phép modulo trên kiến trúc CPU cổ điển. |
| **Thư viện C++** | `#include <numeric>` $\to$ `std::gcd`, `std::lcm` | Chuẩn tối ưu | Hỗ trợ từ chuẩn C++17 trở lên. |

---

## 8. Bài tập thực hành

Đọc lý thuyết xong thì đừng để nó trôi đi mất, hãy thử sức ngay với 2 bài toán kinh điển sau đây để kiểm tra độ nhạy bén nhé:

1. [CSAcademy - Greatest Common Divisor](https://csacademy.com/contest/archive/task/gcd/): Bài toán kiểm tra trực tiếp khả năng cài đặt GCD cơ bản.
2. [Codeforces 1916B - Two Divisors](https://codeforces.com/contest/1916/problem/B): Một bài toán tư duy thú vị kết hợp giữa GCD, LCM và phân tích cấu trúc thừa số nguyên tố.

---

## Lời nhắn nhủ

Toán học trong lập trình thi đấu không sinh ra để làm khó bạn. Đằng sau những ký hiệu có vẻ phức tạp như $\gcd(a, b)$ thực chất chỉ là những quan sát rất đỗi đời thường: một thước đo chung, một mảnh gạch lát sàn, hay một phép trừ lặp đi lặp lại.

Mỗi khi gặp một thuật toán mới, đừng vội hoảng sợ. Hãy bẻ nhỏ nó ra, vẽ vài số cụ thể ra nháp, và bạn sẽ thấy: **mọi đỉnh núi cao đều bắt đầu từ những bước chân đơn giản nhất!**
