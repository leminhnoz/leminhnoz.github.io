---
title: "String Hashing (Băm chuỗi): Tuyệt kỹ so sánh chuỗi O(1) và Nghệ thuật chống 'Hack' trong Lập trình thi đấu"
description: "Làm chủ thuật toán Băm chuỗi (Polynomial Rolling Hash): từ công thức tính hash tiền tố, so sánh chuỗi con trong O(1), giải mã Nghịch lý ngày sinh nhật (Birthday Paradox), vì sao không nên dùng unsigned long long, đến kỹ thuật Băm đôi (Double Hash) bất tử."
pubDate: "2026-08-10"
tags: ["String", "Algorithms", "C++", "Competitive Programming"]
categories: ["Algorithms"]
excerpt: "So sánh hai chuỗi dài hàng vạn ký tự chỉ trong 1 nano-giây? Đó chính là phép thuật của String Hashing. Hãy cùng khám phá công thức Rolling Hash, bí kíp lấy mã băm chuỗi con trong O(1) và kỹ thuật Double Hash đánh bại mọi bài test hack trên Codeforces!"
---

> *"Trong xử lý chuỗi (String Processing), thao tác cơ bản nhất nhưng cũng 'ngốn' thời gian nhất chính là: **So sánh hai chuỗi $S_1$ và $S_2$ xem chúng có giống nhau hay không?**  
>  
> *Thuật toán ngây thơ nhất là so từng ký tự: mất $O(\min(|S_1|, |S_2|))$.  
> Nếu bạn có một văn bản $10^5$ ký tự và cần trả lời $10^5$ câu hỏi kiểu 'Đoạn từ $L_1 \dots R_1$ có giống đoạn $L_2 \dots R_2$ không?', tổng thời gian sẽ là $10^5 \times 10^5 = 10^{10}$ thao tác — máy chủ sẽ chấm TLE ngay lập tức.*  
>  
> *Làm sao để nén cả một chuỗi dài dằng dặc thành một con số nguyên duy nhất, để mỗi phép so sánh chuỗi chỉ còn là một phép so sánh hai số nguyên $A == B$ trong đúng **$O(1)$**? Câu trả lời chính là **String Hashing (Băm chuỗi)**!"*

---

## 1. Trực giác: Biến chuỗi ký tự thành một con số nguyên

Ý tưởng của hàm băm (Hash Function) là ánh xạ một chuỗi ký tự $S$ có độ dài bất kỳ thành một số nguyên duy nhất trong đoạn $[0, M - 1]$.

Quy tắc bất di bất dịch của hàm băm:
$$\text{Nếu } S_1 = S_2 \implies \text{hash}(S_1) = \text{hash}(S_2)$$

*Chiều ngược lại có đúng không?*  
Nếu $\text{hash}(S_1) = \text{hash}(S_2)$, liệu $S_1$ có chắc chắn bằng $S_2$?  
**Không chắc 100%!** Vì số lượng chuỗi là vô hạn, trong khi tập giá trị băm chỉ nằm trong khoảng $[0, M - 1]$. Chắc chắn sẽ có lúc hai chuỗi hoàn toàn khác nhau bị trùng mã băm — hiện tượng này gọi là **Đụng độ (Collision)**.

Tuy nhiên, nếu ta thiết kế hàm băm đủ khéo léo, xác suất xảy ra đụng độ sẽ nhỏ đến mức tiệm cận $0$!

---

## 2. Hàm băm đa thức (Polynomial Rolling Hash)

Phương pháp băm chuỗi tiêu chuẩn và mạnh mẽ nhất được sử dụng trong Competitive Programming là **Hàm băm đa thức**:

$$\text{hash}(S) = \sum_{i=0}^{n-1} S[i] \cdot P^{n - 1 - i} \pmod M$$
*(Dạng băm xuôi: $S[0] \cdot P^{n-1} + S[1] \cdot P^{n-2} + \dots + S[n-1] \cdot P^0 \pmod M$)*

hoặc dạng băm ngược:
$$\text{hash}(S) = \sum_{i=0}^{n-1} S[i] \cdot P^i \pmod M$$

### Chọn cơ số $P$ và modulo $M$ như thế nào?
1. **Cơ số $P$:** Nên chọn là một số nguyên tố lớn hơn kích thước bảng chữ cái của bài toán:
   - Nếu chỉ gồm các chữ cái tiếng Anh thường `a-z` (26 ký tự): Chọn $P = 31$ hoặc $P = 37$.
   - Nếu gồm cả chữ hoa và chữ thường `a-z, A-Z` (52 ký tự): Chọn $P = 53$.
   - **Lưu ý quy đổi:** Gán `'a' \to 1`, `'b' \to 2`, $\dots$, `'z' \to 26$. **Tuyệt đối không gán `'a' \to 0`**, vì khi đó mã băm của `a`, `aa`, `aaa` sẽ đều bằng $0$!
2. **Modulo $M$:** Nên chọn là một số nguyên tố rất lớn (ví dụ $M = 10^9 + 7$ hoặc $10^9 + 9$). Khi đó phép nhân giữa hai số vẫn vừa vặn trong kiểu số 64-bit (`long long`).

```cpp
long long compute_hash(const string& s) {
    const int p = 31;
    const int m = 1e9 + 9;
    long long hash_value = 0;
    for (char c : s) {
        hash_value = (hash_value * p + (c - 'a' + 1)) % m;
    }
    return hash_value;
}
```

---

## 3. Bí kíp thượng thừa: Lấy Hash chuỗi con trong $O(1)$

Giả sử ta có chuỗi $S$ độ dài $N$. Làm thế nào để tính mã băm của một chuỗi con bất kỳ $S[L \dots R]$ trong thời gian $O(1)$?

Tư duy hoàn toàn tương tự kỹ thuật **Mảng cộng dồn (Prefix Sum)**!

### 1. Tiền xử lý mảng băm tiền tố $H$:
Ta xây dựng mảng $H$ và mảng lũy thừa $P^{\text{pow}}$ trong $O(N)$:
- $H[0] = 0$
- $H[i] = (H[i - 1] \cdot P + S[i]) \pmod M$ (với $i$ từ $1$ đến $N$).

### 2. Rút mã băm đoạn con $S[L \dots R]$:
Mã băm của tiền tố $R$ chứa thông tin của cả đoạn $[1 \dots R]$.  
Mã băm của tiền tố $L - 1$ chứa thông tin của đoạn $[1 \dots L - 1]$.  
Để "cắt bỏ" phần đầu $[1 \dots L - 1]$, ta dịch chuyển $H[L - 1]$ sang trái thêm $R - L + 1$ bậc (tương đương nhân với $P^{R - L + 1}$):

$$\text{hash}(S[L \dots R]) = \left( H[R] - H[L - 1] \cdot P^{R - L + 1} \right) \pmod M$$

*(Nếu kết quả bị âm, chỉ cần cộng thêm $M$ trước khi lấy dư).*

```cpp
const int MAXN = 1000005;
const int P = 31;
const int MOD = 1e9 + 7;

long long H[MAXN];
long long P_pow[MAXN];

void buildHash(const string& s) {
    int n = s.size();
    P_pow[0] = 1;
    H[0] = 0;
    for (int i = 0; i < n; i++) {
        P_pow[i + 1] = (P_pow[i] * P) % MOD;
        H[i + 1] = (H[i] * P + (s[i] - 'a' + 1)) % MOD;
    }
}

// Lấy hash của chuỗi con s[l..r] (0-based) trong O(1)
long long getHash(int l, int r) {
    long long res = (H[r + 1] - H[l] * P_pow[r - l + 1]) % MOD;
    if (res < 0) res += MOD;
    return res;
}
```

Nhờ công thức này, việc so sánh hai đoạn con bất kỳ $S[L_1 \dots R_1]$ và $S[L_2 \dots R_2]$ chỉ mất đúng **$O(1)$**!

---

## 4. Hiểm họa ngầm: Nghịch lý ngày sinh nhật và Cạm bẫy $2^{64}$

Rất nhiều bạn thi đấu thuật toán bị "ăn gậy" Wrong Answer một cách oan ức mà không hiểu vì sao. Dưới đây là 2 sai lầm chết người:

### Sai lầm 1: Dùng `unsigned long long` (tự động modulo $2^{64}$)
Nhiều coder thích dùng `unsigned long long` vì nó tự động tràn số mà không cần viết `% MOD`, giúp code chạy nhanh gấp 2 lần.

> [!WARNING]
> **ĐỪNG BAO GIỜ DÙNG $2^{64}$ TRÊN CODEFORCES!**  
> Các tác giả bài tập và người đi "hack" trên Codeforces luôn có sẵn các bộ test sinh chuỗi đặc biệt (dựa trên dãy Thue-Morse) có khả năng tạo ra **hai chuỗi khác nhau nhưng trùng mã băm modulo $2^{64}$ 100% với MỌI cơ số $P$ lẻ**!

### Sai lầm 2: Chủ quan với Nghịch lý ngày sinh nhật (Birthday Paradox)
Với $M \approx 10^9$, xác suất hai chuỗi ngẫu nhiên bị trùng mã băm là $\approx 10^{-9}$ — cực kỳ an toàn nếu bạn chỉ so sánh đúng một cặp chuỗi.

Nhưng nếu bài toán yêu cầu: *"Đếm số lượng chuỗi con phân biệt của một chuỗi độ dài $N = 10^5$"*?  
Khi đó bạn phải so sánh $K \approx 10^5$ chuỗi với nhau. Số cặp so sánh tiềm năng là:
$$\frac{K \times (K - 1)}{2} \approx 5 \times 10^9$$

Theo **Nghịch lý ngày sinh nhật**, xác suất để có **ít nhất một vụ va chạm (Collision)** xảy ra giữa $5 \times 10^9$ cặp so sánh với $M = 10^9$ là xấp xỉ **$100\%$**! Thuật toán của bạn chắc chắn sẽ cho kết quả sai!

---

## 5. Áo giáp bất tử: Kỹ thuật Băm đôi (Double Hashing)

Làm sao để triệt tiêu hoàn toàn nguy cơ đụng độ?  
Giải pháp chuẩn quốc tế là **Double Hashing (Băm đôi)**:

Thay vì chỉ băm với một bộ $(P, M)$, ta băm đồng thời với **hai bộ độc lập**:
- Bộ 1: $P_1 = 31, M_1 = 10^9 + 7$.
- Bộ 2: $P_2 = 37, M_2 = 10^9 + 9$.

Mỗi chuỗi con bây giờ được đại diện bởi một cặp số `pair<long long, long long>`:
$$\text{Hash} = (\text{hash}_1, \text{hash}_2)$$

Hai chuỗi chỉ được coi là bằng nhau khi và chỉ khi **CẢ HAI mã băm đều trùng nhau**!

```cpp
struct HashVal {
    long long h1, h2;
    bool operator==(const HashVal& other) const {
        return h1 == other.h1 && h2 == other.h2;
    }
};

HashVal getDoubleHash(int l, int r) {
    long long res1 = (H1[r + 1] - H1[l] * P1_pow[r - l + 1]) % MOD1;
    if (res1 < 0) res1 += MOD1;

    long long res2 = (H2[r + 1] - H2[l] * P2_pow[r - l + 1]) % MOD2;
    if (res2 < 0) res2 += MOD2;

    return {res1, res2};
}
```

Không gian trạng thái lúc này tương đương:
$$M_1 \times M_2 \approx 10^9 \times 10^9 = 10^{18}$$
Xác suất để xảy ra va chạm trên cả hai bộ băm là $10^{-18}$ — tỷ lệ này còn thấp hơn xác suất bạn bị một thiên thạch rơi trúng máy tính khi đang gõ code! An toàn tuyệt đối trước mọi bộ test.

---

## 6. Các ứng dụng thực chiến kinh điển

### 1. Thuật toán tìm kiếm xâu con Rabin-Karp trong $O(N + M)$
Muốn tìm vị trí xâu mẫu $P$ trong xâu văn bản $T$:
- Tính mã băm của mẫu $P$.
- Trượt cửa sổ độ dài $|P|$ trên $T$, lấy hash của từng đoạn con $T[i \dots i + |P| - 1]$ trong $O(1)$ và so sánh với hash của $P$.

### 2. Kiểm tra chuỗi Palindrome (Đối xứng) trên đoạn $[L, R]$ trong $O(1)$
- Dựng mảng băm tiền tố xuôi $H_{\text{forward}}$ và mảng băm tiền tố ngược $H_{\text{backward}}$.
- Một đoạn $[L, R]$ là đối xứng khi và chỉ khi:
  $$\text{hash}_{\text{forward}}(L, R) == \text{hash}_{\text{backward}}(L, R)$$

### 3. Tìm tiền tố chung dài nhất (Longest Common Prefix - LCP) bằng Chặt nhị phân
Cho hai vị trí $i$ và $j$, tìm độ dài chuỗi con chung dài nhất bắt đầu từ hai vị trí này:
- Chặt nhị phân độ dài $len \in [1, \min(N - i, N - j)]$.
- Kiểm tra `getHash(i, i + len - 1) == getHash(j, j + len - 1)` trong $O(1)$.
- Tổng thời gian tìm LCP: **$O(\log N)$**!

---

## 7. Bài tập rèn luyện

1. **[Codeforces 271D - Good Substrings](https://codeforces.com/contest/271/problem/D):** Đếm số lượng chuỗi con tốt phân biệt (bài tập nhập môn tuyệt vời cho Double Hashing).
2. **[SPOJ - NHAY (A Needle in the Haystack)](http://www.spoj.com/problems/NHAY/):** Cài đặt thuật toán Rabin-Karp tìm kiếm mẫu.
3. **[Codeforces 126B - Password](http://codeforces.com/problemset/problem/126/B):** Tìm xâu vừa là tiền tố, vừa là hậu tố, vừa xuất hiện ở giữa.
4. **[Codeforces 835D - Palindromic Characteristics](http://codeforces.com/contest/835/problem/D):** Đếm số lượng chuỗi con đối xứng bậc $k$ kết hợp Hashing và DP.

---

## 8. Lời kết

String Hashing là một "con dao pha" vô cùng tiện lợi trong xử lý chuỗi: cài đặt siêu ngắn gọn (chỉ 15-20 dòng), linh hoạt và đủ sức giải quyết phần lớn các bài toán chuỗi mà không cần phải dựng các cấu trúc phức tạp như Suffix Array hay Suffix Automaton.

Chỉ cần khắc ghi hai nguyên tắc vàng: **Không dùng $2^{64}$** và **Luôn dùng Double Hash khi số phép so sánh lớn**, bạn sẽ sở hữu một thứ vũ khí bất khả chiến bại trong mọi cuộc thi lập trình!
