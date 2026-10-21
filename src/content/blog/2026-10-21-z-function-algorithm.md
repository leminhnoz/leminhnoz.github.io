---
title: "Hàm Z (Z-Function) và Thuật toán Z-Algorithm: Tìm kiếm xâu O(N) trực quan hơn cả KMP"
description: "Khám phá bản chất của Hàm Z (Z-Function) và thuật toán Z-Algorithm chạy trong O(N). Giải mã kỹ thuật đoạn an toàn [l, r), so sánh trực quan với KMP, nén chuỗi theo chu kỳ và tìm kiếm xâu con siêu tốc."
pubDate: "2026-10-21"
tags: ["String", "Algorithms", "C++", "Competitive Programming"]
categories: ["Algorithms"]
excerpt: "Nếu thuật toán KMP với mảng tiền tố pi và bước nhảy j = pi[j-1] khiến bạn cảm thấy trừu tượng và khó nhớ, thì Z-Algorithm chính là 'vị cứu tinh': định nghĩa trực quan hơn, ý tưởng đoạn gương [l, r) dễ hiểu hơn, và code chỉ vỏn vẹn 15 dòng!"
---

> *"Trong thế giới xử lý chuỗi (String Processing), khi nhắc đến bài toán tìm kiếm xâu con trong thời gian tuyến tính $O(N + M)$ tất định, hầu hết sách giáo khoa đều tôn vinh thuật toán KMP (Knuth-Morris-Pratt).*  
>  
> *Thế nhưng, bất kỳ ai từng học qua KMP đều phải thừa nhận một sự thật: Mảng tiền tố $\pi$ (Prefix Function) và bước nhảy đệ quy $j = \pi[j - 1]$ khá trừu tượng và rất dễ nhầm lẫn khi cài đặt trong phòng thi.*  
>  
> *Có một thuật toán khác làm được mọi thứ KMP làm được, cùng độ phức tạp $O(N + M)$, nhưng định nghĩa trực quan hơn gấp mười lần và ý tưởng thuật toán đẹp như một bức tranh phản chiếu qua gương: Chào mừng bạn đến với **Hàm Z (Z-Function) và Z-Algorithm**!"*

---

## 1. Trực giác: Hàm Z là gì?

Cho một chuỗi $S$ có độ dài $N$ (chỉ số đánh từ $0$ đến $N - 1$).  
**Hàm Z** của chuỗi này là một mảng $Z$ gồm $N$ phần tử, trong đó:

> **$Z[i]$ là độ dài của tiền tố chung dài nhất (Longest Common Prefix - LCP) giữa toàn bộ chuỗi $S$ và hậu tố bắt đầu từ vị trí $i$ của $S$.**

Nói một cách nôm na, dễ hiểu nhất:  
**Bắt đầu từ vị trí $i$, có bao nhiêu ký tự liên tiếp giống hệt với phần đầu của chuỗi $S$?**

*(Quy ước chuẩn: $Z[0] = 0$ để tránh trường hợp tầm thường là chuỗi so với chính nó).*

### Các ví dụ soi gương:
1. **$S = \text{"aaaaa"}$:**
   - $i = 1$: `"aaaa"` so với `"aaaaa"` $\implies$ giống nhau $4$ ký tự $\implies Z[1] = 4$.
   - $i = 2$: `"aaa"` so với `"aaaaa"` $\implies Z[2] = 3$.
   - $i = 3$: `"aa"` $\implies Z[3] = 2$.
   - $i = 4$: `"a"` $\implies Z[4] = 1$.
   - Mảng $Z$: `[0, 4, 3, 2, 1]`.

2. **$S = \text{"abacaba"}$:**
   - $i = 1$: `"bacaba"` bắt đầu bằng `'b'` $\ne S[0] =$ `'a'` $\implies Z[1] = 0$.
   - $i = 2$: `"acaba"` bắt đầu bằng `"a"` $\implies$ giống $1$ ký tự $\implies Z[2] = 1$.
   - $i = 3$: `"caba"` $\implies Z[3] = 0$.
   - $i = 4$: `"aba"` trùng khớp với `"aba"` ở đầu chuỗi $\implies Z[4] = 3$.
   - $i = 5$: `"ba"` $\implies Z[5] = 0$.
   - $i = 6$: `"a"` $\implies Z[6] = 1$.
   - Mảng $Z$: `[0, 0, 1, 0, 3, 0, 1]`.

---

## 2. Ý tưởng tối ưu: Đoạn khớp bên phải nhất $[l, r)$

Thuật toán ngây thơ duyệt từng vị trí $i$ và so từng ký tự sẽ tốn $O(N^2)$ — quá chậm khi $N = 10^5$.

Để đưa về **$O(N)$**, Z-Algorithm sử dụng một kỹ thuật mang tên: **Duy trì đoạn khớp xa nhất về bên phải $[l, r)$**:
- Ta gọi một đoạn $[l, r)$ là một đoạn khớp nếu chuỗi con $S[l \dots r - 1]$ trùng khớp hoàn toàn với tiền tố $S[0 \dots r - l - 1]$.
- Trong quá trình duyệt từ trái sang phải, ta luôn ghi nhớ đoạn khớp $[l, r)$ có **biên phải $r$ lớn nhất**.
- Biên $r$ chính là "giới hạn tầm nhìn" mà ta đã khám phá được trên chuỗi $S$. Tất cả các ký tự từ $r$ trở đi là "vùng đất chưa biết".

### Khi đứng tại vị trí $i$, ta đối mặt với 2 kịch bản:

#### Kịch bản 1: $i \ge r$ (Vị trí $i$ nằm ngoài vùng an toàn)
Ta chưa biết gì về các ký tự bắt đầu từ $i$. Ta đành phải duyệt trâu: so sánh $S[0]$ với $S[i]$, $S[1]$ với $S[i+1], \dots$ để tính $Z[i]$.  
Sau khi tính xong, nếu $Z[i] > 0$, ta cập nhật lại đoạn an toàn mới: $l = i, r = i + Z[i]$.

#### Kịch bản 2: $i < r$ (Vị trí $i$ nằm lọt trong vùng an toàn $[l, r)$)
Đây chính là lúc phép màu xảy ra!  
Vì $S[l \dots r - 1]$ giống hệt tiền tố $S[0 \dots r - l - 1]$, nên:
> **Vị trí $i$ trong đoạn $[l, r)$ tương ứng một-một với vị trí $i - l$ ở phần đầu chuỗi!**

```text
Chuỗi S:   [0 .................... r - l - 1] ... [l ......... i ......... r - 1]
                      ^                                        ^
                   i - l                                       i
           (Đoạn này giống hệt nhau, ta kế thừa ngay giá trị Z[i - l]!)
```

Ta có thể **sao chép ngay giá trị $Z[i - l]$ đã tính từ trước**!  
Tuy nhiên, ta không thể lấy giá trị vượt quá biên $r$, vì những gì nằm sau $r$ ta chưa kiểm tra. Do đó, giá trị khởi tạo an toàn là:

$$Z_0[i] = \min(r - i, \; Z[i - l])$$

Sau khi đã khởi tạo $Z[i] = Z_0[i]$, ta chỉ việc dùng vòng lặp `while` để mở rộng thêm nếu còn khớp tiếp vượt qua biên $r$!

---

## 3. Cài đặt C++ siêu gọn gàng (15 dòng code)

Cấu trúc code của Z-Algorithm cực kỳ ngắn gọn, dễ nhớ và hầu như không thể viết sai:

```cpp
#include <vector>
#include <string>
#include <algorithm>
#include <iostream>

using namespace std;

vector<int> z_function(const string& s) {
    int n = s.size();
    vector<int> z(n, 0);
    int l = 0, r = 0;

    for (int i = 1; i < n; i++) {
        // 1. Kế thừa giá trị từ vị trí tương ứng nếu nằm trong vùng an toàn
        if (i < r) {
            z[i] = min(r - i, z[i - l]);
        }
        // 2. Mở rộng duyệt trâu từ biên
        while (i + z[i] < n && s[z[i]] == s[i + z[i]]) {
            z[i]++;
        }
        // 3. Cập nhật biên phải xa nhất
        if (i + z[i] > r) {
            l = i;
            r = i + z[i];
        }
    }

    return z;
}
```

---

## 4. Chứng minh độ phức tạp $O(N)$ bằng "Con trỏ một chiều"

Nhiều bạn nhìn thấy vòng lặp `while` lồng bên trong vòng lặp `for` sẽ có cảm giác thuật toán chạy trong $O(N^2)$.  
Nhưng hãy quan sát cách con trỏ $r$ di chuyển:

1. Mỗi khi vòng lặp `while` thực hiện so sánh thành công: Ký tự được so sánh chắc chắn nằm ở vị trí $\ge r$. Sau khi vòng `while` kết thúc, biên $r$ **bắt buộc phải tăng lên** ít nhất đúng bằng số lần so sánh thành công đó!
2. Vì $r$ xuất phát từ $0$ và chỉ có thể tăng tối đa lên đến $N$, nên **tổng số lần vòng `while` so sánh thành công trên toàn bộ chuỗi không bao giờ vượt quá $N$**!
3. Còn số lần so sánh thất bại (dẫn đến việc dừng vòng `while`) tối đa chỉ là $1$ lần cho mỗi vị trí $i$ (tổng cộng không quá $N$ lần).

$$\text{Total Steps} \le N + N + N = O(N)$$
*(trong đó gồm tối đa $N$ bước lặp vòng for, $N$ lần so sánh khớp và $N$ lần so sánh lệch)*

Thuật toán đảm bảo chạy trong thời gian tuyến tính **$O(N)$** tuyệt đối!

---

## 5. Các ứng dụng thực chiến kinh điển

### 5.1. Tìm kiếm xâu mẫu (Pattern Matching) bằng tuyệt chiêu $P + \diamond + T$
Cho xâu mẫu $P$ và văn bản $T$. Cần tìm mọi vị trí xuất hiện của $P$ trong $T$:
1. Ghép chuỗi: $S = P + \text{"#"} + T$ (với `#` là ký tự phân tách không thuộc $P$ hay $T$).
2. Tính hàm $Z$ cho chuỗi $S$.
3. Tại bất kỳ vị trí $i$ nào thuộc phần văn bản $T$ (tức $i > |P|$):
   Nếu **$Z[i] == |P|$**, nghĩa là đoạn văn bản bắt đầu tại $i$ trùng khớp hoàn toàn với toàn bộ xâu mẫu $P$!

```cpp
vector<int> match(const string& p, const string& t) {
    string s = p + '#' + t;
    vector<int> z = z_function(s);
    vector<int> matches;
    int P = p.size();

    for (int i = P + 1; i < (int)s.size(); i++) {
        if (z[i] == P) {
            matches.push_back(i - P - 1); // Vị trí xuất hiện trong t (0-based)
        }
    }
    return matches;
}
```

Thời gian: **$O(|P| + |T|)$** — ngắn gọn và dễ hiểu hơn KMP rất nhiều!

---

### 5.2. Nén chuỗi (Tìm chu kỳ nhỏ nhất)
Đề bài: *"Tìm xâu $t$ ngắn nhất sao cho chuỗi $s$ độ dài $n$ có thể tạo thành từ việc lặp lại $t$ nhiều lần?"*

Thuật toán với Hàm Z:
- Tính hàm $Z$ của $s$.
- Duyệt qua các ước số $i$ của $n$ (độ dài chu kỳ tiềm năng):
  Nếu **$i + Z[i] == n$**, điều đó có nghĩa là từ vị trí $i$ trở đi đến hết chuỗi đều trùng khớp với tiền tố $\implies$ **$i$ chính là chu kỳ nhỏ nhất của xâu!**
- Dừng lại ở vị trí $i$ đầu tiên tìm thấy.

---

### 5.3. Đếm số xâu con phân biệt trong $O(N^2)$
Thay vì dùng Suffix Automaton phức tạp:
- Ta thêm từng ký tự vào cuối chuỗi.
- Để đếm có bao nhiêu xâu con mới xuất hiện khi thêm ký tự $c$: Lật ngược chuỗi $t = \text{reverse}(s + c)$, tính $Z_{\max}$ của $t$.
- Số xâu con mới toanh chính là: $|t| - Z_{\max}$!

---

## 6. Bảng so sánh toàn diện: Z-Algorithm vs KMP vs String Hashing

| Tiêu chí | Z-Algorithm | KMP (Prefix Function) | String Hashing |
| :--- | :--- | :--- | :--- |
| **Bản chất toán học** | LCP giữa chuỗi và các hậu tố | Tiền tố dài nhất trùng hậu tố | Đại số đa thức theo modulo |
| **Độ phức tạp** | Tuyến tính $O(N)$ | Tuyến tính $O(N)$ | $O(N)$ tiền xử lý, $O(1)$ truy vấn |
| **Độ tin cậy** | **100% Tất định (Không sai số)** | **100% Tất định (Không sai số)** | Xác suất (có thể va chạm) |
| **Độ dễ hiểu / Trực quan** | **Rất cao (Soi gương đoạn an toàn)** | Trung bình (Khó nhớ bước nhảy) | Rất cao |
| **Độ dài code** | **Khoảng 15 dòng** | Khoảng 15 dòng | Khoảng 25 dòng (Double Hash) |
| **So sánh đoạn con bất kỳ** | Không trực tiếp | Không trực tiếp | **Vô địch (bất kỳ đoạn con nào trong $O(1)$)** |

---

## 7. Bài tập rèn luyện thực chiến

1. **[CSES - Finding Borders](https://cses.fi/problemset/task/1732):** Tìm tất cả các xâu vừa là tiền tố vừa là hậu tố.
2. **[Codeforces 126B - Password](http://codeforces.com/problemset/problem/126/B):** Tìm xâu vừa là tiền tố, vừa là hậu tố, vừa xuất hiện ở giữa (bài toán kinh điển ứng dụng Hàm Z).
3. **[UVa 455 - Periodic Strings](http://uva.onlinejudge.org/index.php?option=onlinejudge&page=show_problem&problem=396):** Nén chuỗi tìm chu kỳ nhỏ nhất.
4. **[UVa 11475 - Extend to Palindrome](http://uva.onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&category=24&page=show_problem&problem=2470):** Thêm ít ký tự nhất vào đuôi để tạo thành xâu đối xứng.

---

## 8. Lời kết

Nếu KMP là một tượng đài kinh điển nhưng mang vẻ đẹp có phần bí ẩn, thì **Z-Algorithm** lại là một tuyệt phẩm hiện đại: trong sáng, tự nhiên và cực kỳ dễ tiếp thu.

Nắm vững cơ chế sao chép trong đoạn an toàn $Z_0[i] = \min(r - i, Z[i - l])$, bạn sẽ có thêm một vũ khí sắc bén để giải quyết mọi bài toán so khớp chuỗi một cách tự tin và chính xác nhất!
