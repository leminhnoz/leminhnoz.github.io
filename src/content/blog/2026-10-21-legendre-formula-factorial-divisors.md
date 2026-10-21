---
title: "Công thức Legendre: Bí mật đếm số mũ của ước trong n! chỉ với 4 dòng code"
description: "Khám phá Công thức Legendre (Legendre's Formula) tìm số mũ lớn nhất của một số nguyên k trong n! trong O(log n). Từ bài toán đếm chữ số 0 tận cùng quen thuộc, mở rộng cho hợp số bất kỳ, đến Định lý Kummer và góc nhìn hệ cơ số p."
pubDate: "2026-10-21"
tags: ["Math", "Number Theory", "Algorithms", "C++", "Competitive Programming"]
categories: ["Algorithms"]
excerpt: "Tính 100! trực tiếp là bất khả thi vì nó có hơn 150 chữ số. Nhưng làm sao để biết 100! chia hết cho 2^x hay 10^x với x lớn nhất là bao nhiêu chỉ trong 0.0001 giây? Câu trả lời nằm ở Công thức Legendre vỏn vẹn đúng 4 dòng code!"
---

> *"Thời còn học phổ thông, chắc hẳn bạn đã từng gặp câu đố kinh điển trong các đề thi học sinh giỏi toán:*  
> *'Tích $100! = 1 \times 2 \times 3 \times \dots \times 100$ có tận cùng bao nhiêu chữ số 0?'*  
>  
> *Lên đại học và bước chân vào lập trình thi đấu (Competitive Programming), bài toán đó được nâng tầm thành một câu hỏi tổng quát hơn:*  
> *'Cho hai số nguyên $N$ và $K$ ($N \le 10^{18}$). Tìm số nguyên $x$ lớn nhất sao cho $K^x$ chia hết cho $N!$?'*  
>  
> *Số $100!$ đã có hơn 150 chữ số, còn $10^{18}!$ thì số lượng chữ số nhiều hơn cả tổng số nguyên tử trong toàn bộ vũ trụ quan sát được! Nhưng nhà toán học người Pháp Adrien-Marie Legendre từ năm 1808 đã tìm ra một công thức kỳ diệu giúp máy tính giải bài toán này chỉ trong đúng **4 dòng code**!"*

---

## 1. Trường hợp 1: Khi $K$ là số nguyên tố $p$ (Công thức Legendre)

Hãy bắt đầu với trường hợp đơn giản nhất: $K$ là một số nguyên tố $p$ (ví dụ: tìm số mũ lớn nhất của $2$ hoặc $5$ trong $N!$).

Ta viết tường minh giai thừa:
$$N! = 1 \times 2 \times 3 \times \dots \times (N - 1) \times N$$

Để biết có bao nhiêu thừa số nguyên tố $p$ xuất hiện trong tích trên, hãy đếm từng lớp một:

1. **Lớp 1 - Các bội số của $p$:**
   Các số chia hết cho $p$ trong dãy là: $p, 2p, 3p, \dots$  
   Số lượng các số như vậy chính là:
   $$\left\lfloor \frac{N}{p} \right\rfloor$$
   Mỗi số này đóng góp ít nhất **1** thừa số $p$ vào tích.

2. **Lớp 2 - Các bội số của $p^2$:**
   Những số như $p^2, 2p^2, 3p^2, \dots$ không chỉ có một thừa số $p$, mà có ít nhất **hai** thừa số $p$.  
   Vì ở bước 1 ta mới chỉ đếm cho chúng $1$ lần, nên ở bước này ta cần cộng bù thêm $1$ thừa số $p$ nữa cho mỗi số:
   $$\left\lfloor \frac{N}{p^2} \right\rfloor$$

3. **Lớp 3, Lớp 4... Lớp $i$:**
   Cứ như vậy, các bội của $p^i$ sẽ đóng góp thêm một thừa số $p$ tiếp theo, số lượng là:
   $$\left\lfloor \frac{N}{p^i} \right\rfloor$$

### Công thức Legendre tổng quát:
Tổng số mũ của số nguyên tố $p$ trong phân tích thừa số nguyên tố của $N!$ (ký hiệu là $E_p(N!)$ hoặc $v_p(N!)$) là:

$$E_p(N!) = \sum_{i=1}^\infty \left\lfloor \frac{N}{p^i} \right\rfloor = \left\lfloor \frac{N}{p} \right\rfloor + \left\lfloor \frac{N}{p^2} \right\rfloor + \left\lfloor \frac{N}{p^3} \right\rfloor + \dots$$

Chuỗi này hoàn toàn hữu hạn, vì khi $p^i > N$ thì $\lfloor N / p^i \rfloor = 0$.  
Tổng số số hạng chỉ khoảng $\log_p N$.

---

### Ví dụ từng bước:
Tính số mũ của $2$ trong $10!$:
$$E_2(10!) = \left\lfloor \frac{10}{2} \right\rfloor + \left\lfloor \frac{10}{4} \right\rfloor + \left\lfloor \frac{10}{8} \right\rfloor = 5 + 2 + 1 = 8$$

Hãy kiểm tra thủ công các số từ $1$ đến $10$:
- Số chẵn ($2, 4, 6, 8, 10$): mỗi số có ít nhất một thừa số $2$ ($5$ số).
- Số chia hết cho $4$ ($4, 8$): có thêm một thừa số $2$ nữa ($2$ số).
- Số chia hết cho $8$ ($8$): có thêm một thừa số $2$ nữa ($1$ số).  
Tổng cộng: $5 + 2 + 1 = 8$ thừa số $2$. Chính xác 100%!

---

### Mã nguồn C++ "thần thánh" 4 dòng:
Thay vì tính lũy thừa $p^i$ có thể bị tràn số (Overflow), ta chia dần $N$ cho $p$:

```cpp
long long fact_pow(long long n, long long p) {
    long long res = 0;
    while (n > 0) {
        res += n / p;
        n /= p;
    }
    return res;
}
```

- **Độ phức tạp thời gian:** $O(\log_p N)$. Với $N = 10^{18}$ và $p = 2$, vòng lặp chạy tối đa $60$ bước — chưa tới một phần triệu giây!
- **Độ phức tạp bộ nhớ:** $O(1)$.

---

## 2. Góc nhìn ma thuật: Hệ cơ số $p$ và Định lý Kummer

Legendre còn phát hiện ra một dạng công thức tương đương đẹp đến ngỡ ngàng:

$$E_p(N!) = \frac{N - S_p(N)}{p - 1}$$

Trong đó $S_p(N)$ là **tổng các chữ số của $N$ khi biểu diễn trong hệ cơ số $p$**!

### Thử nghiệm:
Với $N = 10, p = 2$:
- Số $10$ đổi sang hệ nhị phân (cơ số 2) là: $(1010)_2$.
- Tổng các chữ số: $S_2(10) = 1 + 0 + 1 + 0 = 2$.
- Áp dụng công thức:
  $$E_2(10!) = \frac{10 - 2}{2 - 1} = 8$$
Kết quả ra đúng bằng $8$ mà không cần tính từng phép chia!

> **Định lý Kummer (Kummer's Theorem - 1852):**  
> Số mũ của số nguyên tố $p$ trong hệ số nhị thức $\binom{N}{K} = \frac{N!}{K!(N - K)!}$ đúng bằng **số lần nhớ (number of carries)** khi thực hiện phép cộng $K + (N - K)$ trong hệ cơ số $p$!

---

## 3. Trường hợp 2: Khi $K$ là HỢP SỐ (Composite $K$)

Nếu $K$ không phải số nguyên tố (ví dụ: $K = 10, 12, 24$), ta **không thể** áp dụng trực tiếp công thức $\lfloor N/K \rfloor + \lfloor N/K^2 \rfloor + \dots$ được!

*Tại sao?*  
Ví dụ với $K = 6$: Trong $4! = 1 \times 2 \times 3 \times 4 = 24$, không có số nào chia hết cho $6$ cả. Nếu áp dụng ngây thơ ta sẽ được $\lfloor 4/6 \rfloor = 0$. Nhưng thực tế $2 \times 3 = 6$, nên $4!$ vẫn chia hết cho $6^1$!

### Chiến thuật phân rã:
1. **Phân tích $K$ ra thừa số nguyên tố:**
   $$K = p_1^{a_1} \cdot p_2^{a_2} \cdots p_m^{a_m}$$
2. Với mỗi số nguyên tố $p_i$, dùng công thức Legendre để đếm xem $p_i$ xuất hiện bao nhiêu lần trong $N!$, gọi là $cnt_i = E_{p_i}(N!)$.
3. Để ghép thành một số $K$, ta cần $a_i$ thừa số $p_i$. Do đó, số lượng $K$ tối đa mà $p_i$ có thể cung cấp là:
   $$\left\lfloor \frac{cnt_i}{a_i} \right\rfloor$$
4. Vì mọi thành phần đều cần thiết để tạo nên $K$, kết quả cuối cùng bị giới hạn bởi **thành phần ít nhất (Nguyên lý Thùng gỗ / Bottleneck)**:
   $$x = \min_{i=1 \dots m} \left\lfloor \frac{cnt_i}{a_i} \right\rfloor$$

---

### Giải mã câu đố: Số chữ số 0 tận cùng của $N!$
Một chữ số 0 ở tận cùng được tạo thành từ tích $2 \times 5 = 10$.
- Phân tích $10 = 2^1 \times 5^1$.
- Trong tích $1 \times 2 \times \dots \times N$, cứ $2$ số lại có một số chẵn chia hết cho $2$, trong khi phải $5$ số mới có một số chia hết cho $5$.
- Do đó, số lượng thừa số $2$ luôn áp đảo số lượng thừa số $5$: $E_2(N!) > E_5(N!)$.
- Thừa số $5$ chính là "nút thắt cổ chai".
- Vì vậy, **số chữ số 0 tận cùng của $N!$ đơn giản chính là $E_5(N!)$**:

$$x = \left\lfloor \frac{N}{5} \right\rfloor + \left\lfloor \frac{N}{25} \right\rfloor + \left\lfloor \frac{N}{125} \right\rfloor + \dots$$

Với $100!$: $\lfloor 100/5 \rfloor + \lfloor 100/25 \rfloor = 20 + 4 = 24$ chữ số 0!

---

## 4. Cài đặt C++ hoàn chỉnh cho $K$ bất kỳ

```cpp
#include <iostream>
#include <algorithm>
#include <climits>

using namespace std;

// Đếm số lần xuất hiện của số nguyên tố p trong n!
long long legendre(long long n, long long p) {
    long long count = 0;
    while (n > 0) {
        count += n / p;
        n /= p;
    }
    return count;
}

// Tìm số mũ x lớn nhất sao cho k^x chia hết cho n!
long long maxPower(long long n, long long k) {
    long long ans = LLONG_MAX;

    // Phân tích k ra thừa số nguyên tố
    for (long long p = 2; p * p <= k; p++) {
        if (k % p == 0) {
            long long a = 0;
            while (k % p == 0) {
                a++;
                k /= p;
            }
            // p xuất hiện a lần trong k
            long long cnt = legendre(n, p);
            ans = min(ans, cnt / a);
        }
    }

    // Nếu còn lại một thừa số nguyên tố lớn hơn sqrt(k)
    if (k > 1) {
        long long cnt = legendre(n, k);
        ans = min(ans, cnt / 1);
    }

    return ans;
}

int main() {
    long long n = 100, k = 10;
    cout << "So mu cua " << k << " trong " << n << "! la: " 
         << maxPower(n, k) << endl; // Kết quả: 24
    return 0;
}
```

- **Độ phức tạp thời gian:** $O(\sqrt{K} + \log K \cdot \log N)$.
- Chạy siêu tốc trong chưa đầy $1$ phần nghìn giây kể cả khi $N, K \approx 10^{12}$!

---

## 5. Tổng kết

Công thức Legendre là viên ngọc quý của Số học sơ cấp và Lập trình thi đấu:
1. **Bản chất:** Đếm số lượng bội số theo từng tầng lũy thừa $p, p^2, p^3 \dots$
2. **Code:** Chỉ vẻn vẹn $4$ dòng vòng lặp chia nguyên.
3. **Mở rộng cho hợp số:** Phân tích nguyên tố và lấy giá trị nhỏ nhất của $\lfloor cnt_i / a_i \rfloor$.

Hãy ghi nhớ công thức ngắn gọn này, nó sẽ là trợ thủ đắc lực giúp bạn giải quyết gọn gàng các bài toán tổ hợp, lũy thừa và số học modulo trong mọi kỳ thi!
