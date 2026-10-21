---
title: "Suffix Array (Mảng Hậu Tố) và Mảng LCP: Vũ Khí Tối Thượng Trong Xử Lý Chuỗi"
description: "Giải mã bản chất Suffix Array (Mảng hậu tố) và thuật toán nhân đôi chu kỳ O(N log N), kết hợp thuật toán Kasai O(N) tính mảng LCP. Bí quyết giải quyết mọi bài toán xâu con, đếm chuỗi con phân biệt, tìm kiếm nhị phân và xâu con lặp lại dài nhất."
pubDate: "2026-10-07"
tags: ["String", "Suffix Array", "LCP", "Algorithms", "Competitive Programming", "C++"]
categories: ["Algorithms"]
excerpt: "Suffix Array được ví như chiếc chìa khóa vạn năng cho hầu hết mọi bài toán xử lý chuỗi hóc búa nhất: từ tìm kiếm xâu con, đếm số chuỗi con phân biệt, so sánh hai xâu con bất kỳ trong O(1), cho đến tìm chuỗi con chung dài nhất."
---

> *"Nếu Cây hậu tố (Suffix Tree) là một công trình kỳ vĩ nhưng việc cài đặt nó giống như bước vào mê cung đầy cạm bẫy với hàng trăm dòng con trỏ phức tạp, thì **Suffix Array (Mảng hậu tố)** chính là món quà kỳ diệu của cấu trúc dữ liệu: Cùng sức mạnh biểu diễn vô song, nhưng chỉ sử dụng các mảng số nguyên đơn giản, thân thiện với bộ nhớ cache và thanh thoát đến bất ngờ!"*

---

## 1. Trực giác: Suffix Array là gì?

Cho một chuỗi $S$ có độ dài $N$ (với các chỉ số từ $0$ đến $N - 1$).  
Một **hậu tố (Suffix)** thứ $i$ của $S$ là chuỗi con bắt đầu từ vị trí $i$ và kéo dài đến tận cùng của chuỗi:
$$S[i \dots N - 1]$$

Một chuỗi độ dài $N$ hiển nhiên có đúng $N$ hậu tố.

> **Định nghĩa:** **Suffix Array (Mảng hậu tố)** của chuỗi $S$ là một mảng hoán vị $P$ gồm $N$ số nguyên đại diện cho chỉ số bắt đầu của các hậu tố, sao cho **các hậu tố này được sắp xếp theo thứ tự từ điển (lexicographical order) tăng dần**.

### Ví dụ trực quan với chuỗi `s = "abaab"` ($N = 5$)

Hãy liệt kê toàn bộ $5$ hậu tố theo chỉ số ban đầu:
- Vị trí $0$: `abaab`
- Vị trí $1$: `baab`
- Vị trí $2$: `aab`
- Vị trí $3$: `ab`
- Vị trí $4$: `b`

Bây giờ, chúng ta sắp xếp $5$ chuỗi này theo thứ tự từ điển (như tra từ điển tiếng Anh):
1. `aab` (xuất phát từ vị trí $2$)
2. `ab` (xuất phát từ vị trí $3$)
3. `abaab` (xuất phát từ vị trí $0$)
4. `b` (xuất phát từ vị trí $4$)
5. `baab` (xuất phát từ vị trí $1$)

Khi ghi lại chỉ số gốc của các hậu tố sau khi đã sắp xếp, ta thu được mảng Suffix Array:
$$P = [2, 3, 0, 4, 1]$$

Chỉ với một mảng số nguyên ngắn gọn $[2, 3, 0, 4, 1]$, ta đã nắm giữ toàn bộ trật tự từ điển của tất cả các hậu tố trong chuỗi!

---

## 2. Các phương pháp xây dựng Suffix Array

### 2.1. Cách tiếp cận ngây thơ: $O(N^2 \log N)$

Cách đơn giản nhất là tạo ra một mảng chứa $N$ hậu tố kèm chỉ số của chúng, rồi gọi hàm `std::sort`:
- Có $N$ phần tử cần sắp xếp $\implies$ mất $O(N \log N)$ phép so sánh.
- Mỗi phép so sánh hai chuỗi hậu tố trong trường hợp xấu nhất mất $O(N)$ thời gian.
- Tổng thời gian: $O(N^2 \log N)$.

Với $N = 10^5$, $N^2 \log N \approx 1.7 \times 10^{11}$ thao tác, chắc chắn sẽ bị quá thời gian (TLE). Ta cần một thuật toán tinh vi hơn nhiều!

---

### 2.2. Thuật toán nhân đôi chu kỳ (Prefix Doubling): $O(N \log N)$

Ý tưởng đột phá ở đây là: Thay vì sắp xếp các hậu tố ngay lập tức, ta sẽ sắp xếp các **chuỗi con xoay vòng (cyclic shifts)** có độ dài tăng dần theo lũy thừa của $2$:
$$2^0 = 1 \implies 2^1 = 2 \implies 2^2 = 4 \implies \dots \implies 2^k \ge N$$

> **Mẹo kỹ thuật:** Để biến bài toán sắp xếp hậu tố thành bài toán sắp xếp chuỗi xoay vòng, ta chỉ cần **thêm một ký tự đặc biệt `$` vào cuối chuỗi** (ký tự `$` có mã ASCII nhỏ hơn mọi ký tự chữ cái trong bảng chữ cái).  
> Khi đó, thứ tự từ điển của các chuỗi xoay vòng của `s + "$"` hoàn toàn trùng khớp với thứ tự từ điển của các hậu tố của chuỗi gốc `s`!

#### Tại sao lại là lũy thừa của $2$?
Giả sử ta đã biết thứ tự sắp xếp của tất cả các chuỗi con xoay vòng độ dài $2^{k-1}$.  
Bây giờ, ta muốn so sánh hai chuỗi con xoay vòng độ dài $2^k$ bắt đầu tại vị trí $i$ và vị trí $j$.

Quan sát mấu chốt: Một chuỗi con độ dài $2^k$ bắt đầu tại $i$ chính là sự ghép lại của **hai chuỗi con độ dài $2^{k-1}$**:
- Nửa đầu: bắt đầu tại $i$, độ dài $2^{k-1}$.
- Nửa sau: bắt đầu tại $(i + 2^{k-1}) \pmod N$, độ dài $2^{k-1}$.

Tương tự cho chuỗi bắt đầu tại $j$.  
Do đó, để so sánh hai chuỗi con độ dài $2^k$, ta chỉ cần so sánh hai cặp số:
$$(c[i], c[(i + 2^{k-1}) \pmod N]) \quad \text{and} \quad (c[j], c[(j + 2^{k-1}) \pmod N])$$

Trong đó $c[x]$ là **nhãn lớp tương đương (equivalence class)** của chuỗi con độ dài $2^{k-1}$ bắt đầu tại $x$ (hai chuỗi giống nhau thì cùng lớp $c$, chuỗi nhỏ hơn theo từ điển thì có số hiệu lớp nhỏ hơn).

Thay vì so sánh chuỗi trong $O(2^k)$, ta chỉ cần so sánh hai cặp số nguyên trong **$O(1)$**!

#### Tăng tốc sắp xếp các cặp số bằng Radix Sort + Counting Sort
Nếu dùng `std::sort` để sắp xếp $N$ cặp số nguyên, mỗi bước mất $O(N \log N)$, sau $\log N$ bước ta mất $O(N \log^2 N)$.  
Nhưng ta có thể làm tốt hơn nữa để đạt **$O(N \log N)$ toàn cục**:

1. Các phần tử thứ hai của cặp số thực chất là $c[(i + 2^{k-1}) \pmod N]$. Nhưng thứ tự sắp xếp của các nửa sau này **đã có sẵn từ bước trước**!  
   Nếu chuỗi độ dài $2^{k-1}$ bắt đầu tại $pos$ có thứ tự là $p[k-1]$, thì chuỗi độ dài $2^k$ nhận nó làm nửa sau sẽ bắt đầu tại $(pos - 2^{k-1}) \pmod N$.  
   Ta chỉ việc trừ chỉ số đi $2^{k-1}$ là mảng tự động được sắp xếp theo phần tử thứ hai!
2. Khi đã sắp xếp xong theo phần tử thứ hai, ta dùng một lần **Counting Sort (Sắp xếp đếm phân phối ổn định - Stable Sort)** theo phần tử thứ nhất. Bước này chỉ mất $O(N)$.
3. Sau khi sắp xếp xong mảng hoán vị $p$, ta duyệt qua một lần để gán lại các lớp tương đương $c$ mới trong $O(N)$.

Tổng cộng mỗi bước nhân đôi chỉ mất $O(N)$.  
Có $\lceil \log_2 N \rceil$ bước nhân đôi $\implies$ Toàn bộ thuật toán chạy trong **$O(N \log N)$** với hằng số thực thi cực nhỏ!

---

## 3. Cài đặt C++ chuẩn mực và tối ưu

Dưới đây là mã nguồn C++ đầy đủ, ngắn gọn và chuẩn hóa của thuật toán xây dựng Suffix Array:

```cpp
#include <iostream>
#include <vector>
#include <string>
#include <algorithm>

using namespace std;

// Sắp xếp các hoán vị vòng quanh (cyclic shifts) của chuỗi s
vector<int> sort_cyclic_shifts(const string& s) {
    int n = s.size();
    const int alphabet = 256;
    vector<int> p(n), c(n), cnt(max(alphabet, n), 0);

    // Giai đoạn k = 0: Sắp xếp các chuỗi con độ dài 1 (ký tự đơn)
    for (int i = 0; i < n; i++) cnt[s[i]]++;
    for (int i = 1; i < alphabet; i++) cnt[i] += cnt[i - 1];
    for (int i = 0; i < n; i++) p[--cnt[s[i]]] = i;

    c[p[0]] = 0;
    int classes = 1;
    for (int i = 1; i < n; i++) {
        if (s[p[i]] != s[p[i - 1]]) classes++;
        c[p[i]] = classes - 1;
    }

    // Các giai đoạn nhân đôi k -> k + 1
    vector<int> pn(n), cn(n);
    for (int h = 0; (1 << h) < n; ++h) {
        // 1. Sắp xếp theo thành phần thứ hai (dời lùi 2^h)
        for (int i = 0; i < n; i++) {
            pn[i] = p[i] - (1 << h);
            if (pn[i] < 0) pn[i] += n;
        }

        // 2. Counting Sort ổn định theo thành phần thứ nhất
        fill(cnt.begin(), cnt.begin() + classes, 0);
        for (int i = 0; i < n; i++) cnt[c[pn[i]]]++;
        for (int i = 1; i < classes; i++) cnt[i] += cnt[i - 1];
        for (int i = n - 1; i >= 0; i--) p[--cnt[c[pn[i]]]] = pn[i];

        // 3. Cập nhật các lớp tương đương mới
        cn[p[0]] = 0;
        classes = 1;
        for (int i = 1; i < n; i++) {
            pair<int, int> cur = {c[p[i]], c[(p[i] + (1 << h)) % n]};
            pair<int, int> prev = {c[p[i - 1]], c[(p[i - 1] + (1 << h)) % n]};
            if (cur != prev) ++classes;
            cn[p[i]] = classes - 1;
        }
        c.swap(cn);
    }
    return p;
}

// Xây dựng mảng Suffix Array cho chuỗi s
vector<int> build_suffix_array(string s) {
    s += "$"; // Thêm ký tự kết thúc nhỏ hơn mọi ký tự khác
    vector<int> sa = sort_cyclic_shifts(s);
    sa.erase(sa.begin()); // Bỏ phần tử ứng với chính ký tự '$'
    return sa;
}
```

---

## 4. Mảng LCP (Longest Common Prefix) & Thuật toán Kasai $O(N)$

Nếu chỉ có riêng Suffix Array, ta mới giải quyết được bài toán trật tự. Nhưng sức mạnh thật sự của Suffix Array chỉ bộc lộ trọn vẹn khi nó kết hợp cùng **Mảng LCP**!

### 4.1. Mảng LCP là gì?

> **Mảng LCP (Longest Common Prefix)** là mảng có độ dài $N - 1$, trong đó:  
> **$LCP[i]$ là độ dài tiền tố chung dài nhất giữa hai hậu tố đứng cạnh nhau trong Suffix Array:**
> $$LCP[i] = \text{lcp}(S[SA[i] \dots N - 1], S[SA[i + 1] \dots N - 1])$$

#### Ví dụ với chuỗi `s = "abaab"`:
- $SA = [2, 3, 0, 4, 1]$
- Các hậu tố theo thứ tự:
  - $SA[0] = 2$: `aab`
  - $SA[1] = 3$: `ab` $\implies LCP[0] = \text{lcp}(\text{"aab"}, \text{"ab"}) = 1$ (chung chữ `a`)
  - $SA[2] = 0$: `abaab` $\implies LCP[1] = \text{lcp}(\text{"ab"}, \text{"abaab"}) = 2$ (chung `ab`)
  - $SA[3] = 4$: `b` $\implies LCP[2] = \text{lcp}(\text{"abaab"}, \text{"b"}) = 0$
  - $SA[4] = 1$: `baab` $\implies LCP[3] = \text{lcp}(\text{"b"}, \text{"baab"}) = 1$ (chung chữ `b`)

$\implies LCP = [1, 2, 0, 1]$.

### 4.2. Tính chất LCP của hai hậu tố bất kỳ (Quy về RMQ)
Một định lý nền tảng cực kỳ đẹp đẽ:
> Tiền tố chung dài nhất giữa hai hậu tố bất kỳ $SA[i]$ và $SA[j]$ ($i < j$) chính là **giá trị nhỏ nhất trên đoạn $[i \dots j - 1]$ của mảng LCP**:
> $$\text{LCP}(SA[i], SA[j]) = \min_{k = i}^{j - 1} LCP[k]$$

Nhờ tính chất này, nếu kết hợp mảng LCP với cấu trúc dữ liệu **Sparse Table (RMQ)**, ta có thể tìm tiền tố chung dài nhất của hai hậu tố bất kỳ trong thời gian **$O(1)$** sau khi tiền xử lý $O(N \log N)$!

---

### 4.3. Thuật toán Kasai tính mảng LCP trong $O(N)$

Tính LCP giữa các hậu tố kề nhau một cách ngây thơ mất $O(N^2)$. Nhưng năm 2001, nhóm tác giả Kasai đã công bố một thuật toán tuyến tính $O(N)$ cực kỳ trang nhã.

#### Ý tưởng cốt lõi của Kasai:
Xét hậu tố bắt đầu tại vị trí $i$. Giả sử trong danh sách sắp xếp của SA, hậu tố này đứng ngay trước hậu tố $j$, và chúng có tiền tố chung độ dài $k > 0$.  
Bây giờ, nếu ta bỏ ký tự đầu tiên của cả hai hậu tố (tức là chuyển sang xét hậu tố $i + 1$ và $j + 1$):
- Rõ ràng tiền tố chung của $i + 1$ và $j + 1$ có độ dài đúng bằng $k - 1$.
- Mặc dù trong Suffix Array, hậu tố đứng liền sau $i + 1$ có thể không phải là $j + 1$, nhưng theo tính chất giá trị nhỏ nhất của RMQ, tiền tố chung giữa $i + 1$ và hậu tố đứng ngay kề nó trong SA **chắc chắn phải $\ge k - 1$**!

Do đó: **Khi ta duyệt lần lượt các vị trí $i$ từ $0$ đến $N - 1$, giá trị $k$ chỉ có thể giảm đi tối đa $1$ sau mỗi bước!**

Vì $k$ chỉ giảm tối đa $N$ lần và giá trị $k$ không bao giờ vượt quá $N$, nên tổng số lần biến $k$ được tăng lên trong toàn bộ thuật toán không thể vượt quá $2N$.  
$\implies$ Toàn bộ thuật toán Kasai chạy trong đúng **$O(N)$**!

#### Cài đặt thuật toán Kasai trong C++:

```cpp
// Tính mảng LCP trong O(N) bằng thuật toán Kasai
vector<int> build_lcp(const string& s, const vector<int>& sa) {
    int n = s.size();
    vector<int> rank(n, 0);
    for (int i = 0; i < n; i++) rank[sa[i]] = i;

    int k = 0;
    vector<int> lcp(n - 1, 0);
    for (int i = 0; i < n; i++) {
        if (rank[i] == n - 1) {
            k = 0;
            continue;
        }
        int j = sa[rank[i] + 1];
        while (i + k < n && j + k < n && s[i + k] == s[j + k]) {
            k++;
        }
        lcp[rank[i]] = k;
        if (k > 0) k--;
    }
    return lcp;
}
```

---

## 5. Các ứng dụng thực chiến kinh điển

### 5.1. Tìm kiếm xâu mẫu $P$ trong văn bản $T$ trong $O(|P| \log |T|)$

Bất kỳ lần xuất hiện nào của xâu mẫu $P$ trong văn bản $T$ đều là **tiền tố của một hậu tố nào đó** trong $T$.  
Vì mảng Suffix Array của $T$ đã sắp xếp mọi hậu tố theo thứ tự từ điển, tất cả các hậu tố có chứa tiền tố $P$ sẽ nằm trong một **đoạn liên tiếp** trên mảng SA!

Ta chỉ cần dùng **Tìm kiếm nhị phân (Binary Search)** trên mảng Suffix Array:
- Dùng `lower_bound` tìm vị trí đầu tiên mà hậu tố $\ge P$.
- Dùng `upper_bound` tìm vị trí cuối cùng mà hậu tố có tiền tố $P$.
- Số lần xuất hiện chính là độ dài đoạn tìm được, và các chỉ số xuất hiện chính là giá trị $SA[idx]$.
- Độ phức tạp: $O(|P| \log |T|)$. Nếu kết hợp mảng LCP và Sparse Table, có thể giảm xuống $O(|P| + \log |T|)$.

---

### 5.2. Đếm số lượng chuỗi con phân biệt của một xâu

Một chuỗi độ dài $N$ có tổng cộng $\frac{N(N + 1)}{2}$ chuỗi con (tính cả trùng lặp). Có bao nhiêu chuỗi con là độc nhất vô nhị?

Hãy duyệt qua các hậu tố theo thứ tự sắp xếp trong Suffix Array:
- Hậu tố $SA[i]$ có độ dài là $N - SA[i]$, do đó nó đóng góp $N - SA[i]$ tiền tố mới.
- Tuy nhiên, hậu tố này có chung tiền tố dài $LCP[i - 1]$ với hậu tố đứng ngay trước nó $SA[i - 1]$. Tất cả các tiền tố có độ dài $\le LCP[i - 1]$ này **đều đã được đếm ở các hậu tố trước**!
- Do đó, số chuỗi con mới tinh mà hậu tố $SA[i]$ đóng góp thêm đúng bằng:
$$(N - SA[i]) - LCP[i - 1]$$

Lấy tổng trên toàn bộ các hậu tố, ta có công thức tuyệt đẹp:
$$\text{Distinct Substrings} = \frac{N(N + 1)}{2} - \sum_{i = 0}^{N - 2} LCP[i]$$

Tính toán chỉ trong $O(1)$ sau khi đã có SA và LCP!

---

### 5.3. Tìm xâu con lặp lại dài nhất (Longest Repeated Substring)

Một chuỗi con xuất hiện ít nhất $2$ lần trong $S$ khi và chỉ khi nó là tiền tố chung của ít nhất hai hậu tố khác nhau.  
Để độ dài là lớn nhất, hai hậu tố đó phải có LCP lớn nhất.  
Vì LCP giữa hai hậu tố bất kỳ bằng giá trị nhỏ nhất của một đoạn trên mảng $LCP$, nên giá trị LCP lớn nhất chắc chắn nằm ở một cặp hậu tố kề nhau trong Suffix Array!

Do đó:
$$\text{Max Repeated Length} = \max_{0 \le i < N - 1} LCP[i]$$

Độ phức tạp: Duyệt tìm max mảng $LCP$ trong $O(N)$!

---

### 5.4. Xâu con chung dài nhất của hai chuỗi $S_1$ và $S_2$ (LCS)

Cho hai chuỗi $S_1$ và $S_2$, tìm xâu con có độ dài lớn nhất xuất hiện ở cả hai chuỗi:
1. Ghép hai chuỗi lại với nhau bằng một ký tự đặc biệt ở giữa:
   $$S = S_1 + \text{"#"} + S_2$$
2. Xây dựng Suffix Array và mảng LCP cho chuỗi ghép $S$.
3. Duyệt qua mảng LCP. Nếu hai hậu tố kề nhau $SA[i]$ và $SA[i + 1]$ thuộc về hai chuỗi ban đầu khác nhau (một hậu tố bắt đầu trước dấu `#`, một hậu tố bắt đầu sau dấu `#`):  
   Cập nhật kết quả với $LCP[i]$.
4. Giá trị lớn nhất tìm được chính là độ dài xâu con chung dài nhất!

Thời gian thực hiện: $O((|S_1| + |S_2|) \log (|S_1| + |S_2|))$, tối ưu vượt trội so với Quy hoạch động $O(|S_1| \cdot |S_2|)$ truyền thống khi độ dài xâu lên tới $10^5$!

---

## 6. Tổng kết và So sánh

| Cấu trúc dữ liệu | Thời gian xây dựng | Bộ nhớ | Độ phức tạp cài đặt | Thế mạnh đặc trưng |
| :--- | :---: | :---: | :---: | :--- |
| **Suffix Tree** | $O(N)$ | Lớn (nhiều con trỏ) | Cực kỳ phức tạp | Mẫu mực lý thuyết |
| **Suffix Automaton (SAM)** | $O(N)$ | Vừa phải | Ngắn gọn nhưng trừu tượng | Đếm đường đi, Online matching |
| **Suffix Array + LCP** | $O(N \log N)$ | Rất nhỏ ($O(N)$ mảng `int`) | Trực quan, dễ debug | RMQ, tìm kiếm nhị phân, xâu con phân biệt |

Suffix Array kết hợp cùng mảng LCP là cặp bài trùng mạnh mẽ bậc nhất trong kho vũ khí thuật toán xử lý chuỗi. Hiểu rõ cơ chế nhân đôi chu kỳ và thuật toán Kasai sẽ giúp bạn tự tin giải quyết từ những bài toán cơ bản đến những thử thách đỉnh cao trong Competitive Programming!

---

## 7. Bài tập rèn luyện (Practice Problems)

Hãy áp dụng các kỹ thuật trên để chinh phục danh sách bài tập kinh điển này:
- [SPOJ - SARRAY (Suffix Array $O(N \log N)$ chuẩn mực)](https://www.spoj.com/problems/SARRAY/)
- [SPOJ - SUBLEX (Lexicographical Substring Search)](https://www.spoj.com/problems/SUBLEX/)
- [SPOJ - LCS / LONGCS (Longest Common Substring)](https://www.spoj.com/problems/LCS/)
- [Codeforces 149E - Martian Strings](https://codeforces.com/problemset/problem/149/E)
- [Codeforces 802I - Fake News (hard)](https://codeforces.com/contest/802/problem/I)
- [Codeforces 873F - Forbidden Indices](https://codeforces.com/contest/873/problem/F)
- [CSES - String Algorithms (Suffix Array, Finding Substrings)](https://cses.fi/problemset/)
