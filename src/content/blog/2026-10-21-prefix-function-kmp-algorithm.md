---
title: "Hàm tiền tố (Prefix Function) và Thuật toán KMP: Tuyệt tác tìm kiếm xâu O(N + M) tất định"
description: "Khám phá bản chất của Hàm tiền tố (Prefix Function Pi) và Thuật toán Knuth-Morris-Pratt (KMP). Giải mã bước nhảy j = pi[j-1], kỹ thuật xâu s + # + t, nén chuỗi theo chu kỳ, và xây dựng Automaton xử lý xâu có độ dài thiên văn."
pubDate: "2026-10-21"
tags: ["String", "Algorithms", "C++", "Competitive Programming"]
categories: ["Algorithms"]
excerpt: "Không cần ngẫu nhiên, không sợ va chạm băm, thuật toán KMP (1977) của Knuth, Morris và Pratt là đỉnh cao của sự chính xác tuyệt đối. Hãy cùng vén màn bí mật đằng sau mảng tiền tố pi và bước nhảy ma thuật giải quyết mọi bài toán chuỗi trong O(N)!"
---

> *"Nếu Rabin-Karp là một võ sĩ dùng tuyệt chiêu băm xác suất (Rolling Hash) — nhanh nhẹn nhưng luôn tiềm ẩn nỗi lo va chạm, thì **KMP (Knuth-Morris-Pratt)** lại là một kiếm khách ra đòn chuẩn xác 100%, tất định hoàn toàn không chút sai số.*  
>  
> *Được công bố vào năm 1977 bởi ba nhà khoa học máy tính huyền thoại Donald Knuth, James H. Morris và Vaughan Pratt, thuật toán KMP là một trong những thuật toán kinh điển nhất mọi thời đại.*  
>  
> *Trái tim của KMP không nằm ở phép tìm kiếm, mà nằm ở một cấu trúc dữ liệu thanh lịch đến khó tin: **Hàm tiền tố (Prefix Function)** — một mảng số nguyên nhỏ bé nhưng chứa đựng toàn bộ cấu trúc tự đối xứng của chuỗi ký tự!"*

---

## 1. Trực giác: Hàm tiền tố ($\pi$) là gì?

Cho một chuỗi $S$ gồm $N$ ký tự.  
**Mảng tiền tố $\pi$ (Prefix Function)** có độ dài $N$, trong đó $\pi[i]$ là:
> **Độ dài của tiền tố thực sự dài nhất của chuỗi con $S[0 \dots i]$ mà ĐỒNG THỜI cũng là hậu tố của chuỗi con này.**

*(Tiền tố thực sự nghĩa là tiền tố không được bằng chính chuỗi con đó. Theo định nghĩa, $\pi[0] = 0$).*

Công thức toán học:
$$\pi[i] = \max_{k = 0 \dots i} \{ k : S[0 \dots k - 1] = S[i - (k - 1) \dots i] \}$$

### Ví dụ trực quan:
Xét chuỗi $S = \text{"abcabcd"}$:
- $i = 0$: `"a"` $\implies \pi[0] = 0$.
- $i = 1$: `"ab"` $\implies$ các tiền tố: `"a"`, các hậu tố: `"b"`. Không trùng nhau $\implies \pi[1] = 0$.
- $i = 2$: `"abc"` $\implies \pi[2] = 0$.
- $i = 3$: `"abca"` $\implies$ tiền tố `"a"` trùng với hậu tố `"a"` (độ dài 1) $\implies \pi[3] = 1$.
- $i = 4$: `"abcab"` $\implies$ tiền tố `"ab"` trùng với hậu tố `"ab"` (độ dài 2) $\implies \pi[4] = 2$.
- $i = 5$: `"abcabc"` $\implies$ tiền tố `"abc"` trùng với hậu tố `"abc"` (độ dài 3) $\implies \pi[5] = 3$.
- $i = 6$: `"abcabcd"` $\implies$ chữ `'d'` phá vỡ cấu trúc lặp $\implies \pi[6] = 0$.

Kết quả mảng $\pi$: `[0, 0, 0, 1, 2, 3, 0]`.

---

## 2. Nghệ thuật tối ưu: Từ $O(N^3)$ xuống $O(N)$ trong nháy mắt

Thuật toán ngây thơ (duyệt mọi độ dài $k$ và cắt xâu so sánh) tốn $O(N^3)$ — hoàn toàn không thể dùng được khi $N \ge 2000$.

Làm sao Knuth, Morris và Pratt tính được toàn bộ mảng $\pi$ trong đúng **$O(N)$**? Họ đã dựa trên 2 quan sát mang tính đột phá:

### Quan sát 1: Giá trị $\pi$ mỗi bước chỉ có thể tăng tối đa là 1!
$$\pi[i + 1] \le \pi[i] + 1$$

*Tại sao?*  
Nếu ở vị trí $i+1$, ta tìm được một tiền tố-hậu tố dài hơn $\pi[i] + 1$, thì khi bỏ đi ký tự cuối cùng, ta sẽ thu được một tiền tố-hậu tố ở vị trí $i$ dài hơn $\pi[i]$ — điều này mâu thuẫn với giả thiết $\pi[i]$ là dài nhất!

Vì mỗi bước $\pi$ chỉ có thể tăng tối đa $1$, nên trong toàn bộ $N$ bước, tổng số lần $\pi$ tăng không vượt quá $N$. Kéo theo tổng số lần $\pi$ giảm cũng không thể vượt quá $N$!

---

### Quan sát 2: Bước nhảy ma thuật $j = \pi[j - 1]$
Giả sử ta đã biết $\pi[i - 1] = j$. Ta muốn tính $\pi[i]$:
- Ký tự tiếp theo cần so khớp với $S[i]$ chính là ký tự tại chỉ số $j$ (tức $S[j]$).
- **Trường hợp 1 (Khớp):** Nếu $S[i] == S[j]$, quá tuyệt vời! Tiền tố vừa được kéo dài thêm 1 ký tự:
  $$\pi[i] = j + 1$$
- **Trường hợp 2 (Lệch):** Nếu $S[i] \ne S[j]$, ta phải lùi về một tiền tố ngắn hơn.  
  *Nhưng lùi về đâu? Có phải lùi về $j - 1$ không?*  
  **Không!** Tiền tố ngắn hơn tiếp theo mà vẫn là hậu tố tại vị trí $i - 1$ chính là:
  $$j = \pi[j - 1]$$
  Ta chỉ cần lùi $j$ về $\pi[j - 1]$ và tiếp tục so sánh với $S[i]$ cho đến khi khớp hoặc $j = 0$!

```text
Chuỗi:      [a  b  c  a  b] ... [a  b  c  a  b]  X
Tiền tố:    [a  b  c  a  b]  Y
             |_____|  |_____|
                j     S[j]=Y
Nếu X != Y: Nhảy về j = pi[j-1] (chính là đoạn con "ab" nhỏ hơn bên trong)!
```

### Cài đặt C++ siêu ngắn gọn:

```cpp
#include <vector>
#include <string>

using namespace std;

vector<int> prefix_function(const string& s) {
    int n = s.length();
    vector<int> pi(n);
    for (int i = 1; i < n; i++) {
        int j = pi[i - 1];
        // Nhảy lùi j về tiền tố ngắn hơn khi ký tự không khớp
        while (j > 0 && s[i] != s[j]) {
            j = pi[j - 1];
        }
        // Nếu khớp ký tự thì kéo dài tiền tố thêm 1
        if (s[i] == s[j]) {
            j++;
        }
        pi[i] = j;
    }
    return pi;
}
```

> **Chứng minh độ phức tạp $O(N)$ bằng phương pháp thế năng:**  
> Nhìn vào vòng lặp `while`, nhiều người sợ nó chạy chậm. Nhưng hãy để ý: biến `j` chỉ tăng đúng $1$ đơn vị ở lệnh `j++` (tối đa $N$ lần trong toàn bộ chương trình).  
> Mỗi lần vòng lặp `while` thực hiện, `j` bị giảm đi ít nhất $1$ đơn vị (vì $\pi[j - 1] < j$). Do đó, vòng `while` không thể chạy quá $N$ lần trong suốt thời gian chạy!  
> Tổng thời gian tính mảng $\pi$: **$O(N)$** tuyệt đối!

---

## 3. Tìm kiếm xâu mẫu KMP bằng tuyệt chiêu: $S + \# + T$

Bây giờ ta quay lại bài toán chính: Tìm tất cả các vị trí xuất hiện của xâu mẫu $S$ trong văn bản $T$.

Thay vì phải viết code so khớp phức tạp, ta dùng một mẹo cực kỳ tao nhã:
1. Nối hai xâu lại với nhau qua một ký tự đặc biệt `#` không xuất hiện trong cả $S$ lẫn $T$:
   $$\text{String } = S + \text{"#"} + T$$
2. Tính mảng tiền tố $\pi$ cho chuỗi nối này!

### Điều kỳ diệu xảy ra:
- Vì có ký tự rào cản `#`, giá trị của $\pi[i]$ **không bao giờ vượt quá độ dài của $S$** ($|S|$).
- Nếu tại một vị trí $i$ nào đó thuộc phần của văn bản $T$ mà ta có:
  $$\pi[i] == |S|$$
  Điều này có nghĩa là gì? Hậu tố kết thúc tại vị trí $i$ trùng khớp hoàn toàn với tiền tố của chuỗi nối (chính là xâu mẫu $S$)!
- Ta đã tìm thấy một vị trí xuất hiện của $S$ trong $T$! Vị trí bắt đầu trong $T$ là:
  $$\text{pos} = i - 2 \cdot |S|$$

```cpp
vector<int> kmp_search(const string& s, const string& t) {
    string cur = s + '#' + t;
    int S = s.size(), T = t.size();
    vector<int> pi = prefix_function(cur);

    vector<int> occurrences;
    for (int i = S + 1; i < (int)cur.size(); i++) {
        if (pi[i] == S) {
            occurrences.push_back(i - 2 * S);
        }
    }
    return occurrences;
}
```

Thời gian: **$O(|S| + |T|)$**, bộ nhớ $O(|S| + |T|)$.  
*(Thậm chí ta có thể tối ưu bộ nhớ về $O(|S|)$ bằng cách chỉ lưu mảng $\pi$ của xâu $S + \#$ rồi duyệt từng ký tự của $T$ dạng Online Stream).*

---

## 4. Các ứng dụng thần sầu khác của Hàm tiền tố

Hàm tiền tố không chỉ để tìm kiếm xâu con, nó là một công cụ giải toán chuỗi toàn năng.

### 4.1. Nén chuỗi (Tìm chu kỳ nhỏ nhất của xâu)
Đề bài: *"Tìm xâu $t$ ngắn nhất sao cho chuỗi $s$ có thể tạo thành bằng cách lặp lại $t$ nhiều lần (ví dụ: `abcabcabc` được tạo từ `abc` lặp 3 lần)?"*

Nhìn vào giá trị cuối cùng $\pi[n - 1]$:
- Đặt $k = n - \pi[n - 1]$.
- Nếu $n$ chia hết cho $k$ ($n \% k == 0$), thì **$k$ chính là độ dài của chu kỳ nhỏ nhất**! Xâu có thể nén thành tiền tố độ dài $k$.
- Ngược lại, xâu không có chu kỳ hoàn hảo và câu trả lời là $n$.

---

### 4.2. Đếm số lần xuất hiện của mọi tiền tố trong xâu
Đề bài: *"Với mỗi tiền tố $S[0 \dots i]$, hãy đếm xem nó xuất hiện bao nhiêu lần trong chuỗi $S$?"*

Ta có thể giải quyết trong $O(N)$ bằng Quy hoạch động trên mảng $\pi$:
1. Đếm tần số xuất hiện của từng giá trị trong mảng $\pi$: `ans[pi[i]]++`.
2. Đi lùi từ $n$ về $1$: Một tiền tố độ dài $i$ xuất hiện $\implies$ tiền tố-hậu tố dài nhất của nó ($\pi[i - 1]$) cũng phải xuất hiện tại vị trí đó!
   ```cpp
   for (int i = n; i > 0; i--) {
       ans[pi[i - 1]] += ans[i];
   }
   for (int i = 0; i <= n; i++) {
       ans[i]++; // Cộng thêm chính lần xuất hiện ban đầu của tiền tố
   }
   ```

---

### 4.3. Xây dựng KMP Automaton (Máy trạng thái hữu hạn)
Khi văn bản $T$ quá khổng lồ (ví dụ chuỗi sinh theo quy luật đệ quy có độ dài $100^{100}$ hay chuỗi Gray), ta không thể duyệt từng ký tự được.

Ta xây dựng bảng chuyển trạng thái $\text{aut}[i][c]$ trong $O(26 \cdot N)$:
- Trạng thái hiện tại: giá trị của $\pi$ đang là $i$.
- Ký tự tiếp theo đọc vào: ký tự $c$.
- Trạng thái mới: $\text{aut}[i][c]$.

Bằng cách áp dụng quy hoạch động:
$$\text{aut}[i][c] = \begin{cases} i + 1 & \text{if } c = S[i] \\ \text{aut}[\pi[i - 1]][c] & \text{if } c \ne S[i] \text{ and } i > 0 \\ 0 & \text{otherwise} \end{cases}$$
*(nếu khớp ký tự thì tăng trạng thái lên $i+1$, nếu lệch thì kế thừa trạng thái từ $\pi[i-1]$)*

Nhờ bảng Automaton này, ta có thể nhân ma trận hoặc dùng quy hoạch động để đếm số lần xuất hiện của $S$ trong các chuỗi có độ dài thiên văn!

---

## 5. Luyện tập thực chiến

1. **[Codeforces 432D - Prefixes and Suffixes](https://codeforces.com/contest/432/problem/D):** Bài tập kinh điển ứng dụng hàm tiền tố và quy hoạch động đếm tần số xuất hiện của tiền tố.
2. **[Codeforces 471D - MUH and Cube Walls](https://codeforces.com/problemset/problem/471/D):** Áp dụng KMP trên mảng hiệu độ cao của các bức tường.
3. **[UVA 455 - Periodic Strings](http://uva.onlinejudge.org/index.php?option=onlinejudge&page=show_problem&problem=396):** Ứng dụng nén chuỗi tìm chu kỳ nhỏ nhất.
4. **[SPOJ - NHAY (A Needle in the Haystack)](https://www.spoj.com/problems/NHAY/):** Cài đặt KMP dạng Online Streaming tiết kiệm bộ nhớ khi văn bản cực dài.

---

## 6. Lời kết

Hàm tiền tố $\pi$ và thuật toán KMP là đại diện tiêu biểu cho vẻ đẹp của tư duy thuật toán cổ điển: **Không dựa vào may rủi, tận dụng triệt để thông tin đã tính toán từ quá khứ để đưa ra quyết định tối ưu cho tương lai.**

Nắm vững bước nhảy $j = \pi[j - 1]$ và kỹ thuật ghép xâu $S + \# + T$, bạn đã sở hữu trong tay một công cụ chuẩn mực để chinh phục mọi thử thách về xâu ký tự trong các kỳ thi học sinh giỏi và lập trình thi đấu!
