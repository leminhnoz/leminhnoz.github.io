---
title: "Thuật toán Rabin-Karp: Tìm kiếm xâu mẫu O(N + M) bằng Cửa sổ trượt Băm"
description: "Khám phá thuật toán tìm kiếm xâu mẫu kinh điển Rabin-Karp (1987) với độ phức tạp tuyến tính O(|S| + |T|). Giải mã kỹ thuật cửa sổ trượt Rolling Hash, so sánh với KMP và Z-Algorithm, cùng tuyệt chiêu Double Hash chống va chạm."
pubDate: "2026-08-22"
tags: ["String", "Algorithms", "C++", "Competitive Programming"]
categories: ["Algorithms"]
excerpt: "Thao tác Ctrl+F tìm từ khóa trong văn bản hoạt động như thế nào? Thay vì duyệt từng ký tự tốn O(N * M), hai nhà khoa học Rabin và Karp đã tạo nên một phép màu: dùng cửa sổ trượt cuốn chiếu mã băm để tìm kiếm xâu mẫu trong O(N + M) chỉ bằng vài dòng code!"
---

> *"Mỗi khi bạn nhấn tổ hợp phím **Ctrl + F** trên trình duyệt để tìm kiếm một từ khóa giữa hàng chục trang văn bản dài dằng dặc, kết quả hiện ra gần như tức thì. Bạn có bao giờ tự hỏi máy tính làm cách nào để lùng sục một xâu mẫu $S$ bên trong một văn bản $T$ nhanh đến thế?*  
>  
> *Cách đơn giản nhất là duyệt trâu (Brute Force): trượt xâu mẫu dọc theo văn bản và so từng ký tự. Nhưng nếu văn bản dài $10^5$ ký tự toàn chữ `a` và từ khóa là chuỗi `aaaa...ab`, thuật toán duyệt trâu sẽ tốn tới $10^{10}$ phép so sánh — đơ máy hoàn toàn!*  
>  
> *Năm 1987, hai nhà khoa học máy tính lỗi lạc Michael O. Rabin và Richard M. Karp đã giới thiệu một thuật toán mang tính cách mạng: **Rabin-Karp** — đưa thời gian tìm kiếm về đúng thời gian đọc dữ liệu **$O(|S| + |T|)$** nhờ kỹ thuật **Cửa sổ trượt mã băm (Rolling Hash)**!"*

---

## 1. Trực giác: Cửa sổ trượt và Phép so sánh $O(1)$

Bài toán đặt ra:
- Cho một xâu mẫu $S$ độ dài $m$ (ví dụ: `"cat"`).
- Cho một văn bản $T$ độ dài $n$ (ví dụ: `"the cat sat on the mat"`).
- Cần tìm tất cả các vị trí xuất hiện của $S$ trong $T$.

### Ý tưởng cốt lõi của Rabin-Karp:
Thay vì phải kiểm tra từng ký tự một ở mỗi vị trí:
1. Ta tính trước một con số nguyên đại diện cho xâu mẫu $S$: gọi là $\text{hash}(S)$.
2. Ta đặt một **cửa sổ trượt** có độ dài đúng bằng $m$ lên văn bản $T$.
3. Với mỗi vị trí của cửa sổ, ta tính mã băm của đoạn văn bản nằm trong cửa sổ đó.
4. **So sánh hai số nguyên:** Nếu $\text{hash}(T[i \dots i + m - 1]) == \text{hash}(S)$, ta đã tìm thấy xâu mẫu! Phép so sánh hai số nguyên chỉ tốn đúng **$O(1)$**!

```text
Văn bản T:  t  h  e     c  a  t     s  a  t
Cửa sổ 1:  [t  h  e] -> hash("the") != hash("cat") -> Bỏ qua
Cửa sổ 2:     [h  e  ] -> hash("he ") != hash("cat") -> Bỏ qua
...
Cửa sổ 5:           [c  a  t] -> hash("cat") == hash("cat") -> TÌM THẤY!
```

---

## 2. Kỹ thuật "Cuốn chiếu" Rolling Hash: Tính cửa sổ mới trong $O(1)$

Nếu ở mỗi vị trí của cửa sổ, ta lại mất $O(m)$ để tính lại mã băm từ đầu, thì tổng thời gian vẫn là $O(n \times m)$ — chẳng nhanh hơn duyệt trâu là bao!

Điểm thiên tài của Rabin và Karp là: **Mã băm của cửa sổ mới có thể được tính từ mã băm của cửa sổ cũ chỉ trong $O(1)$!**

Hãy hình dung hàm băm đa thức cơ số $P$ giống như một số trong hệ thập phân (cơ số 10):
- Giả sử số hiện tại là $432$.
- Bạn muốn trượt cửa sổ sang phải để lấy số tiếp theo $325$:
  1. **Bỏ chữ số đầu tiên:** $432 - 4 \times 10^2 = 32$.
  2. **Dịch sang trái một hàng:** $32 \times 10 = 320$.
  3. **Thêm chữ số mới vào đuôi:** $320 + 5 = 325$!

Tương tự như vậy trong hệ cơ số $P$ lấy dư theo modulo $M$:
$$h_{\text{new}} = \left( (h_{\text{old}} - T_{\text{out}} \cdot P^{m - 1}) \cdot P + T_{\text{in}} \right) \pmod M$$
*(trong đó $T_{\text{out}}$ là ký tự đầu bị trượt ra ngoài, $T_{\text{in}}$ là ký tự mới được nạp vào)*

Chỉ cần $1$ phép trừ, $1$ phép nhân và $1$ phép cộng — **mất đúng $O(1)$**! Cửa sổ trượt lướt qua cả văn bản dài triệu ký tự êm ái như một dòng nước.

---

## 3. Cài đặt C++ kinh điển bằng Mảng tiền tố Hash

Trong thực tế lập trình thi đấu, cách cài đặt thuận tiện và ít bị lỗi tính toán nhất là dùng **Mảng băm tiền tố (Prefix Hash)**.

Mã băm của đoạn con $T[i \dots i + m - 1]$ nhân với $P^i$ có thể tính ngay bằng:
$$(H[i + m] - H[i]) \pmod M$$

Ta chỉ việc so sánh giá trị này với $\text{hash}(S) \cdot P^i \pmod M$:

```cpp
#include <iostream>
#include <vector>
#include <string>

using namespace std;

vector<int> rabin_karp(const string& s, const string& t) {
    const int p = 31;
    const int m = 1e9 + 9;
    int S = s.size(), T = t.size();

    if (S > T) return {}; // Xâu mẫu dài hơn văn bản thì không thể xuất hiện

    // 1. Tiền xử lý các lũy thừa của p
    vector<long long> p_pow(max(S, T));
    p_pow[0] = 1;
    for (int i = 1; i < (int)p_pow.size(); i++) {
        p_pow[i] = (p_pow[i - 1] * p) % m;
    }

    // 2. Tính mảng băm tiền tố của văn bản t
    vector<long long> h(T + 1, 0);
    for (int i = 0; i < T; i++) {
        h[i + 1] = (h[i] + (t[i] - 'a' + 1) * p_pow[i]) % m;
    }

    // 3. Tính mã băm của xâu mẫu s
    long long h_s = 0;
    for (int i = 0; i < S; i++) {
        h_s = (h_s + (s[i] - 'a' + 1) * p_pow[i]) % m;
    }

    // 4. Trượt cửa sổ độ dài S trên văn bản t
    vector<int> occurrences;
    for (int i = 0; i + S - 1 < T; i++) {
        long long cur_h = (h[i + S] - h[i] + m) % m;
        // So sánh mã băm của đoạn con với mã băm của mẫu đã đồng bộ bậc P^i
        if (cur_h == (h_s * p_pow[i]) % m) {
            occurrences.push_back(i); // Tìm thấy tại chỉ số i (0-based)
        }
    }

    return occurrences;
}
```

### Phân tích độ phức tạp:
- Tiền xử lý lũy thừa: $O(\max(|S|, |T|))$.
- Tính băm tiền tố của $T$: $O(|T|)$.
- Tính băm của $S$: $O(|S|)$.
- Trượt cửa sổ: Duyệt $|T| - |S| + 1$ bước, mỗi bước so sánh trong $O(1) \implies O(|T|)$.
- **Tổng thời gian toàn bộ thuật toán:** **$O(|S| + |T|)$**! Tuyến tính tuyệt đối.
- **Bộ nhớ:** $O(|T|)$.

---

## 4. Xử lý va chạm (Collisions): Las Vegas vs Monte Carlo

Khi $\text{hash}(T[i \dots i + m - 1]) == \text{hash}(S)$, liệu ta có thể khẳng định chắc chắn hai xâu bằng nhau?  
Có một xác suất rất nhỏ xảy ra **va chạm (Collision)**: hai xâu khác nhau nhưng có cùng mã băm.

Trong khoa học máy tính, có 2 trường phái xử lý:

### 1. Trường phái Las Vegas (Chính xác tuyệt đối 100%)
Mỗi khi thấy mã băm trùng nhau, thuật toán chạy thêm một vòng lặp kiểm tra lại từng ký tự của xâu mẫu và xâu con.
- Ưu điểm: Không bao giờ trả về kết quả sai (Zero False Positives).
- Nhược điểm: Trong trường hợp bị đối phương cố tình tạo test xấu (anti-hash), thời gian có thể bị thoái hóa về $O(N \times M)$.

### 2. Trường phái Monte Carlo (Lập trình thi đấu Competitive Programming)
Trong phòng thi, ta không có thời gian duyệt lại từng ký tự. Thay vào đó, ta sử dụng **Double Hashing (Băm đôi)**:
- Tính đồng thời 2 mã băm với 2 modulo độc lập: $M_1 = 10^9 + 7$ và $M_2 = 10^9 + 9$.
- Xác suất đụng độ rơi xuống mức:
  $$\approx \frac{1}{M_1 \times M_2} \approx 10^{-18}$$
- Với tỷ lệ va chạm nhỏ hơn cả xác suất máy chủ bị sét đánh, ta hoàn toàn tin tưởng vào kết quả băm đôi mà không cần kiểm tra lại xâu!

---

## 5. So sánh đối đầu: Rabin-Karp vs KMP vs Z-Algorithm

| Tiêu chí | Rabin-Karp | KMP (Knuth-Morris-Pratt) | Z-Algorithm |
| :--- | :--- | :--- | :--- |
| **Độ phức tạp** | $O(N + M)$ | $O(N + M)$ | $O(N + M)$ |
| **Bản chất** | **Xác suất (Randomized)** | **Tất định (Deterministic)** | **Tất định (Deterministic)** |
| **Độ khó cài đặt** | Cực kỳ dễ (chỉ là phép cộng trừ nhân) | Khó nhớ (mảng tiền tố $\pi$) | Trung bình (mảng $Z$) |
| **Tìm nhiều xâu mẫu cùng độ dài** | **Vô địch (dùng Hash Table)** | Kém (phải chạy lại KMP nhiều lần) | Kém |
| **Mở rộng sang ma trận 2 chiều** | **Rất tự nhiên (Băm 2D)** | Cực kỳ phức tạp | Cực kỳ phức tạp |

> **Thế mạnh độc tôn của Rabin-Karp:**  
> Nếu bạn cần tìm **hàng nghìn xâu mẫu khác nhau** (nhưng có cùng độ dài $m$) trong một văn bản lớn, bạn chỉ cần ném mã băm của tất cả các mẫu vào một bảng băm `unordered_set<long long>`. Khi trượt cửa sổ qua $T$, mỗi bước chỉ mất $O(1)$ để tra cứu! Không một thuật toán nào khác có thể làm được điều này một cách tự nhiên như Rabin-Karp.

---

## 6. Luyện tập thực chiến

1. **[SPOJ - NAJPF (Pattern Find)](http://www.spoj.com/problems/NAJPF/):** Đề bài tìm kiếm xâu mẫu kinh điển để kiểm tra code mẫu Rabin-Karp.
2. **[Codeforces 271D - Good Substrings](https://codeforces.com/contest/271/problem/D):** Tìm kiếm và đếm các xâu con thỏa mãn điều kiện ký tự tốt/xấu.
3. **[LeetCode 1044 - Longest Duplicate Substring](https://leetcode.com/problems/longest-duplicate-substring/):** Kết hợp Chặt nhị phân độ dài + Rabin-Karp Rolling Hash để tìm xâu lặp lại dài nhất.
4. **[Codeforces 835D - Palindromic Characteristics](https://codeforces.com/problemset/problem/835/D):** Kiểm tra tính đối xứng của xâu con bằng Rolling Hash.

---

## 7. Lời kết

Thuật toán Rabin-Karp là minh chứng hoàn hảo cho việc: **Một ý tưởng toán học đơn giản (chuyển chuỗi thành số) khi kết hợp với cấu trúc dữ liệu khéo léo (cửa sổ trượt cuốn chiếu) có thể tạo ra một giải thuật vừa đẹp đẽ, vừa có tính ứng dụng thực tiễn khổng lồ.**

Từ phần mềm quét đạo văn, công cụ tìm kiếm đến các trình biên dịch mã nguồn, Rabin-Karp vẫn luôn là một trong những thuật toán kinh điển trường tồn cùng thời gian!
