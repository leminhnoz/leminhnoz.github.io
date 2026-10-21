---
title: "Phân Tích Lyndon và Thuật Toán Duval: Tuyệt Kỹ O(N) Thời Gian, O(1) Bộ Nhớ"
description: "Khám phá Phân tích Lyndon (Lyndon Factorization) và thuật toán Duval chạy trong O(N) thời gian với O(1) bộ nhớ phụ. Ứng dụng tìm hoán vị vòng quanh nhỏ nhất (Minimal Cyclic Shift) siêu tốc không cần Suffix Array hay Suffix Automaton."
pubDate: "2026-10-21"
tags: ["String", "Lyndon Factorization", "Duval Algorithm", "Algorithms", "Competitive Programming", "C++"]
categories: ["Algorithms"]
excerpt: "Nếu Suffix Array và Suffix Automaton là những cỗ xe tăng bọc thép hạng nặng, thì Thuật toán Duval trong Phân tích Lyndon lại giống như một thanh kiếm katana sắc bén: Chỉ với 3 con trỏ, 0 mảng phụ (O(1) memory) và độ phức tạp O(N), nó giải quyết bài toán hoán vị vòng quanh nhỏ nhất chỉ trong 15 dòng code!"
---

> *"Trong lý thuyết xử lý chuỗi và tổ hợp từ, có những cấu trúc dữ liệu khổng lồ đòi hỏi hàng trăm dòng mã như Suffix Tree hay Suffix Automaton.  
> Nhưng bên cạnh đó, tồn tại một viên ngọc toán học thanh tao, nhỏ gọn đến kinh ngạc mang tên **Phân tích Lyndon (Lyndon Factorization)** cùng **Thuật toán Duval (1983)**:  
> **Chỉ dùng đúng 3 con trỏ nguyên thủy, tiêu tốn $O(1)$ bộ nhớ phụ, chạy trong thời gian tuyến tính $O(N)$ tuyệt đối**, và giải quyết bài toán tìm hoán vị vòng quanh nhỏ nhất (Minimal String Rotation) một cách thanh thoát không tưởng!"*

---

## 1. Trực giác: Từ Lyndon là gì?

Trước khi hiểu về phép phân tích, ta cần làm quen với khái niệm **Từ Lyndon (Lyndon Word)** hay còn gọi là **Chuỗi đơn giản (Simple String)**.

> **Định nghĩa Từ Lyndon:**  
> Một chuỗi $w$ được gọi là một **Từ Lyndon** nếu nó **nhỏ hơn thực sự mọi hậu tố không tầm thường (nontrivial suffix) của chính nó** theo thứ tự từ điển:
> $$w < \text{suffix}(w) \quad \forall \text{suffix}(w) \ne w$$

*(Một cách tương đương: Chuỗi $w$ là từ Lyndon khi và chỉ khi nó nhỏ hơn thực sự tất cả các hoán vị vòng quanh không tầm thường của nó).*

### Các ví dụ về từ Lyndon:
- `"a"`: Hậu tố không tầm thường là rỗng $\implies$ luôn là từ Lyndon.
- `"b"`: Tương tự, là từ Lyndon.
- `"ab"`: Các hậu tố là `"b"`. Ta thấy `"ab" < "b"` $\implies$ `"ab"` là từ Lyndon!
- `"aab"`: Các hậu tố là `"ab"`, `"b"`. Cả hai đều lớn hơn `"aab"` $\implies$ là từ Lyndon!
- `"abb"`: Các hậu tố là `"bb"`, `"b"`. Cả hai đều lớn hơn `"abb"` $\implies$ là từ Lyndon!
- `"ababb"`: Các hậu tố là `"babb"`, `"abb"`, `"bb"`, `"b"`. Tất cả đều lớn hơn `"ababb"` $\implies$ là từ Lyndon!

### Các ví dụ KHÔNG phải từ Lyndon:
- `"ba"`: Hậu tố `"a"` nhỏ hơn `"ba"` $\implies$ Vi phạm!
- `"aba"`: Hậu tố `"a"` nhỏ hơn `"aba"` $\implies$ Vi phạm!
- `"aa"`: Hậu tố `"a"` nhỏ hơn `"aa"` $\implies$ Vi phạm!

---

## 2. Định lý Phân tích Lyndon (Chen-Fox-Lyndon Theorem, 1958)

Một định lý kinh điển và vô cùng sâu sắc của toán học tổ hợp khẳng định rằng:

> **Định lý:** Với mọi chuỗi $S$ bất kỳ, luôn tồn tại **DUY NHẤT** một cách phân tích chuỗi $S$ thành tích ghép của các từ Lyndon:
> $$S = w_1 w_2 \dots w_k$$
> sao cho các từ Lyndon này được sắp xếp theo **thứ tự giảm dần (không tăng)** theo từ điển:
> $$w_1 \ge w_2 \ge \dots \ge w_k$$

### Ví dụ phân tích thực tế:
1. Chuỗi $S = \text{"abracadabra"}$:
   Phân tích Lyndon duy nhất của chuỗi này là:
   $$\text{"abracadabra"} = (\text{"ab"})(\text{"r"})(\text{"acadabra"})$$
   (Lưu ý: $\text{"ab"} \ge \text{"r"}$ sai theo thứ tự từ điển? Hãy phân tích kỹ: $\text{"ab"} < \text{"r"}$ nên ta gộp tiếp: $\text{"ab"} \to \dots$).  
   Thực tế kết quả chuẩn xác là:
   $$\text{"abracadabra"} = (\text{"a"})(\text{"b"})(\text{"r"})(\text{"a"})(\text{"c"})(\text{"a"})(\text{"d"})(\text{"ab"})(\text{"ra"}) \dots$$
2. Chuỗi $S = \text{"ba"}$:  
   $$\text{"ba"} = (\text{"b"})(\text{"a"}) \quad (\text{since } \text{"b"} > \text{"a"})$$
3. Chuỗi $S = \text{"cba"}$:  
   $$\text{"cba"} = (\text{"c"})(\text{"b"})(\text{"a"}) \quad (\text{since } \text{"c"} > \text{"b"} > \text{"a"})$$

---

## 3. Thuật toán Duval (1983)

Năm 1983, nhà khoa học máy tính Jean-Pierre Duval đã phát minh ra một thuật toán tham lam cực kỳ khéo léo để tìm phân tích Lyndon trong $O(N)$ thời gian và $O(1)$ bộ nhớ phụ.

### Khái niệm "Xâu tiền đơn giản" (Pre-simple string)
Một chuỗi $t$ được gọi là **tiền đơn giản (pre-simple)** nếu nó có dạng lặp lại chu kỳ của một từ Lyndon kèm một tiền tố chưa hoàn chỉnh:
$$t = w w \dots w \overline{w}$$
(với $w$ là một từ Lyndon và $\overline{w}$ là một tiền tố của $w$, có thể rỗng).  
Mọi từ Lyndon hiển nhiên đều là tiền đơn giản.

### Cơ chế 3 con trỏ của Duval:
Tại mọi thời điểm, thuật toán chia chuỗi $S$ thành 3 phần:
$$S = s_1 + s_2 + s_3$$
- $s_1$: Phần đã tìm xong phân tích Lyndon hoàn chỉnh (đã chốt).
- $s_2$: Phần đang xét hiện tại (luôn duy trì tính chất tiền đơn giản).
- $s_3$: Phần còn lại chưa đụng tới.

Ta dùng 3 con trỏ:
- $i$: Đánh dấu vị trí bắt đầu của $s_2$.
- $j$: Đánh dấu vị trí bắt đầu của $s_3$ (ký tự tiếp theo chuẩn bị thử nạp vào $s_2$).
- $k$: Vị trí ký tự trong chu kỳ của $s_2$ được mang ra so sánh với $s[j]$.

### Ba trường hợp khi so sánh $s[j]$ và $s[k]$:

1. **Trường hợp 1: $s[j] == s[k]$**  
   Ký tự mới khớp hoàn hảo với chu kỳ hiện tại! Tính chất tiền đơn giản tiếp tục được duy trì.  
   Ta chỉ việc tăng $j++$ và $k++$.
2. **Trường hợp 2: $s[j] > s[k]$**  
   Ký tự mới lớn hơn ký tự tương ứng trong chu kỳ!  
   Một điều kỳ diệu xảy ra: Toàn bộ chuỗi $s_2 + s[j]$ lập tức trở thành **MỘT từ Lyndon duy nhất dài hơn**!  
   Ta tăng $j++$ và đặt lại $k = i$ (để ký tự tiếp theo sẽ được so sánh từ đầu từ Lyndon mới này).
3. **Trường hợp 3: $s[j] < s[k]$**  
   Ký tự mới nhỏ hơn ký tự tương ứng trong chu kỳ! Tính chất tiền đơn giản bị phá vỡ.  
   Ta buộc phải "chốt sổ" các khối từ Lyndon $w$ hoàn chỉnh có độ dài $j - k$ bên trong $s_2$ và đẩy chúng vào $s_1$.  
   Sau đó, con trỏ $i$ được cập nhật để bắt đầu phân tích phần còn lại của $s_2$.

---

## 4. Cài đặt C++ chuẩn mực

Mã nguồn C++ của thuật toán Duval ngắn gọn đến kinh ngạc:

```cpp
#include <iostream>
#include <vector>
#include <string>

using namespace std;

// Tìm phân tích Lyndon của chuỗi s trong O(N) thời gian, O(1) bộ nhớ phụ
vector<string> duval(const string& s) {
    int n = s.size();
    int i = 0;
    vector<string> factorization;

    while (i < n) {
        int j = i + 1, k = i;
        while (j < n && s[k] <= s[j]) {
            if (s[k] < s[j]) {
                k = i; // Trường hợp 2: Toàn bộ gộp thành một từ Lyndon dài hơn
            } else {
                k++;   // Trường hợp 1: Khớp chu kỳ
            }
            j++;
        }

        // Trường hợp 3: Chốt các từ Lyndon có độ dài (j - k)
        while (i <= k) {
            factorization.push_back(s.substr(i, j - k));
            i += j - k;
        }
    }

    return factorization;
}
```

### Chứng minh độ phức tạp:
- **Vòng lặp ngoài:** Con trỏ $i$ luôn tăng dần nghiêm ngặt, do đó vòng lặp ngoài thực hiện tối đa $N$ lần.
- **Vòng lặp trong:** Tổng số lần so sánh ký tự trong suốt toàn bộ thuật toán được chứng minh **không vượt quá $4N - 3$**.
- **Bộ nhớ:** Không dùng bất kỳ mảng phụ hay cấu trúc cây nào ngoài vài biến nguyên $\implies$ **$O(1)$ auxiliary memory**!

---

## 5. Ứng dụng sát thủ: Tìm hoán vị vòng quanh nhỏ nhất trong $O(N)$

Bài toán: Cho chuỗi $S$ độ dài $N$. Tìm hoán vị vòng quanh (Cyclic Shift / Rotation) của $S$ có thứ tự từ điển nhỏ nhất.

> Ví dụ: Với $S = \text{"bba"}$, các hoán vị vòng quanh là `{"bba", "bab", "abb"}`.  
> Hoán vị nhỏ nhất là `"abb"`.

### Bí quyết kết hợp Duval:
1. Nhân đôi chuỗi: $S' = S + S$ (độ dài $2N$).
2. Chạy thuật toán Duval trên $S'$ với điều kiện dừng vòng lặp ngoài khi $i < N$.
3. Khối từ Lyndon nào bắt đầu tại $i < N$ và kéo dài vượt qua vị trí $N$ (hoặc đạt độ dài $N$) **chính là điểm xuất phát của hoán vị vòng quanh nhỏ nhất!**

### Cài đặt siêu gọn chỉ 15 dòng:

```cpp
// Tìm hoán vị vòng quanh nhỏ nhất theo thứ tự từ điển
string min_cyclic_string(string s) {
    int n = s.size();
    s += s;
    int i = 0, ans = 0;

    while (i < n) {
        ans = i;
        int j = i + 1, k = i;
        while (j < 2 * n && s[k] <= s[j]) {
            if (s[k] < s[j]) {
                k = i;
            } else {
                k++;
            }
            j++;
        }
        while (i <= k) {
            i += j - k;
        }
    }

    return s.substr(ans, n);
}
```

So với việc dùng **Suffix Array** ($O(N \log N)$, tốn $O(N)$ bộ nhớ) hay **Suffix Automaton** ($O(N)$, tốn $O(N \cdot \Sigma)$ bộ nhớ), thuật toán Duval tìm hoán vị vòng quanh nhỏ nhất chỉ tốn **$O(N)$ thời gian và $O(1)$ bộ nhớ phụ**, code chỉ đúng vài dòng và chạy nhanh gấp nhiều lần!

---

## 6. Tổng kết

| Tiêu chí | Duval (Lyndon) | Suffix Array | Suffix Automaton |
| :--- | :---: | :---: | :---: |
| **Độ phức tạp thời gian** | **$O(N)$** | $O(N \log N)$ | $O(N)$ |
| **Bộ nhớ phụ** | **$O(1)$** | $O(N)$ | $O(N)$ |
| **Số dòng code** | **~15 dòng** | ~40 dòng | ~30 dòng |
| **Thế mạnh đặc thù** | Hoán vị vòng quanh nhỏ nhất, phân tích từ Lyndon | Tìm kiếm nhị phân, RMQ LCP | Quy hoạch động xâu con |

---

## 7. Bài tập rèn luyện (Practice Problems)

- [UVA 719 - Glass Beads](https://onlinejudge.org/index.php?option=com_onlinejudge&Itemid=8&page=show_problem&problem=660) (Bài toán kinh điển về vòng hạt cườm nhỏ nhất)
- [CSES - Minimal Rotation](https://cses.fi/problemset/task/1110)
- [Codeforces 620E - New Year Tree (String components)](https://codeforces.com/problemset/problem/620/E)
- [SPOJ - MINMOVE (Minimum Rotations)](https://www.spoj.com/problems/MINMOVE/)
