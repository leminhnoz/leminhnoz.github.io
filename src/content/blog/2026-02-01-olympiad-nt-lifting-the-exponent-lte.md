---
title: "Chuyên đề Số học Olympic: Bổ đề nâng bậc số mũ LTE (Lifting The Exponent Lemma)"
description: "Phân tích trọn vẹn Bổ đề LTE — vũ khí tối thượng xử lý số mũ đúng v_p(a^n ± b^n), kỹ thuật tách định giá p-adic và giải các bài toán số mũ chia hết kinh điển trong TST và IMO."
pubDate: "2026-02-01"
tags: ["Toán học", "Số học", "Olympic", "VMO", "IMO", "LTE", "Number Theory", "Diophantine"]
categories: ["Toán học Olympic"]
excerpt: "Bổ đề LTE (Lifting The Exponent Lemma) được mệnh danh là 'khẩu đại bác' của hình học số học Olympic, biến các biểu thức số mũ khổng lồ thành phép cộng tuyến tính giản đơn."
---

> *"Nếu bạn bước vào phòng thi IMO mà chưa nắm vững Bổ đề LTE, bạn đang tự tước đi vũ khí lợi hại nhất trước các phương trình số học mũ."*

Trong các đề thi TST (Team Selection Test) và IMO, dạng bài toán tìm nghiệm nguyên của phương trình chứa lũy thừa $a^n \pm b^n$ hoặc xét quan hệ chia hết $p^k \mid (a^n \pm b^n)$ xuất hiện với tần suất dày đặc. **Bổ đề Nâng Bậc Số Mũ LTE** (Lifting The Exponent Lemma) chính là chìa khóa vạn năng cho lớp bài toán này.

---

## 1. Khái niệm Định giá $p$-adic ($v_p(n)$)

### Định nghĩa
Cho $p$ là một số nguyên tố và $n$ là một số nguyên khác $0$. **Định giá $p$-adic** của $n$, ký hiệu là $v_p(n)$, là số nguyên không âm $k$ lớn nhất sao cho $p^k \mid n$.
Nói cách khác:
$$n = p^{v_p(n)} \cdot m \quad \text{với} \quad \gcd(p, m) = 1$$

### Các tính chất cơ bản
1. $v_p(a \cdot b) = v_p(a) + v_p(b)$
2. $v_p(a^n) = n \cdot v_p(a)$
3. $v_p(a + b) \ge \min\{v_p(a), v_p(b)\}$
4. **Tính chất nghiêm ngặt:** Nếu $v_p(a) \ne v_p(b)$, thì đẳng thức xảy ra:
   $$v_p(a + b) = \min\{v_p(a), v_p(b)\}$$

---

## 2. Bổ đề LTE trường hợp $p$ lẻ ($p \ge 3$)

### Định lý (LTE cho hiệu $a^n - b^n$)
Cho $p$ là số nguyên tố lẻ. Giả sử $a, b$ là các số nguyên thỏa mãn:
$$p \mid (a - b) \quad \text{và} \quad p \nmid a, \, p \nmid b$$
Khi đó, với mọi số nguyên dương $n$, ta luôn có:
$$v_p(a^n - b^n) = v_p(a - b) + v_p(n)$$

### Chứng minh chặt chẽ
Ta phân tích hằng đẳng thức:
$$a^n - b^n = (a - b) \cdot \left( a^{n-1} + a^{n-2}b + \dots + a b^{n-2} + b^{n-1} \right)$$
Do đó:
$$v_p(a^n - b^n) = v_p(a - b) + v_p\left( \sum_{i=0}^{n-1} a^{n-1-i} b^i \right)$$
Đặt $S = \sum_{i=0}^{n-1} a^{n-1-i} b^i$. Ta cần chứng minh $v_p(S) = v_p(n)$.

**Bước 1: Giả sử $\gcd(n, p) = 1$**
Vì $a \equiv b \pmod p$, nên mọi hạng tử $a^{n-1-i} b^i \equiv a^{n-1} \pmod p$.
Tổng $S$ có đúng $n$ hạng tử, do đó:
$$S \equiv n \cdot a^{n-1} \pmod p$$
Vì $p \nmid n$ và $p \nmid a$, ta có $S \not\equiv 0 \pmod p \implies v_p(S) = 0 = v_p(n)$.
Đẳng thức đúng cho trường hợp $p \nmid n$.

**Bước 2: Trường hợp $n = p$**
Đặt $b = a + k \cdot p^m$ với $m = v_p(a - b) \ge 1$ và $p \nmid k$.
Theo khai triển nhị thức Newton:
$$b^p = (a + k p^m)^p = a^p + p \cdot a^{p-1} (k p^m) + \sum_{j=2}^p \binom{p}{j} a^{p-j} (k p^m)^j$$
Biến đổi hiệu:
$$b^p - a^p = k p^{m+1} a^{p-1} + \sum_{j=2}^p \binom{p}{j} a^{p-j} k^j p^{m j}$$
Xét số mũ của $p$ trong từng hạng tử tổng:
- Với hạng tử đầu: $v_p(k p^{m+1} a^{p-1}) = m + 1$.
- Với các hạng tử $j \ge 2$: số mũ của $p$ là $v_p(\binom{p}{j}) + m j \ge 1 + 2m > m + 1$ (do $p \ge 3$ và $m \ge 1$).
Vì hạng tử đầu có số mũ bé nhất nghiêm ngặt, theo tính chất định giá:
$$v_p(b^p - a^p) = m + 1 = v_p(b - a) + 1 = v_p(b - a) + v_p(p)$$

**Bước 3: Quy nạp hoàn tất**
Phân tích $n = p^\alpha \cdot u$ với $\gcd(u, p) = 1$. Kết hợp Bước 1 và áp dụng Bước 2 lặp lại $\alpha$ lần:
$$v_p(a^n - b^n) = v_p(a - b) + \alpha = v_p(a - b) + v_p(n) \quad \blacksquare$$

### Hệ quả: LTE cho tổng $a^n + b^n$
Cho $p$ lẻ, $p \mid (a + b)$ và $p \nmid a, b$. Với **$n$ là số nguyên dương lẻ**:
$$v_p(a^n + b^n) = v_p(a + b) + v_p(n)$$
*(Suy ra trực tiếp từ định lý trên bằng cách thay $b$ bởi $-b$).*

---

## 3. Bổ đề LTE trường hợp $p = 2$

Trường hợp $p = 2$ đòi hỏi sự cẩn trọng đặc biệt do khai triển nhị thức bậc 2 không triệt tiêu hệ số thừa.

### Định lý
Cho $a, b$ là các số nguyên lẻ.
1. **Khi $n$ chẵn:**
   $$v_2(a^n - b^n) = v_2(a - b) + v_2(a + b) + v_2(n) - 1$$
2. **Khi $n$ lẻ:**
   $$v_2(a^n - b^n) = v_2(a - b)$$
3. **Đối với tổng $a^n + b^n$ ($n$ chẵn):**
   Nếu $a, b$ lẻ thì $a^n + b^n \equiv 1 + 1 = 2 \pmod 4$, do đó:
   $$v_2(a^n + b^n) = 1$$

---

## 4. Bài toán thực chiến: USA TST 2018 Problem 5

### Đề bài
Tìm tất cả các bộ ba số nguyên dương $(a, b, n)$ sao cho:
$$a^n + b^n = (a + b)^2$$

**Lời giải bằng LTE:**
- Nếu $n = 1$: $a + b = (a + b)^2 \implies a + b = 1$, vô nghiệm nguyên dương.
- Nếu $n = 2$: $a^2 + b^2 = a^2 + 2ab + b^2 \implies 2ab = 0$, vô nghiệm nguyên dương.
- Xét $n \ge 3$:
  Không mất tính tổng quát, giả sử $a \ge b$.
  Nếu $a = b$ thì $2 a^n = 4 a^2 \implies a^{n-2} = 2$.
  Do $a \ge 1$: ta có nghiệm duy nhất $a = 2, n - 2 = 1 \implies n = 3$.
  Thử lại: $(a, b, n) = (2, 2, 3) \implies 2^3 + 2^3 = 16 = (2 + 2)^2$ (thỏa mãn!).

  Giả sử $a > b$. Gọi $p$ là một ước nguyên tố lẻ bất kỳ của $a + b$.
  Áp dụng bổ đề LTE cho $a^n + b^n$:
  Nếu $n$ lẻ:
  $$v_p(a^n + b^n) = v_p(a + b) + v_p(n)$$
  Mặt khác từ phương trình:
  $$v_p((a + b)^2) = 2 v_p(a + b)$$
  Suy ra:
  $$v_p(n) = v_p(a + b)$$
  Điều này đúng với mọi ước nguyên tố lẻ $p$ của $a + b$, do đó $a + b \mid 2n$ hoặc $a + b \le 2n$.
  Tuy nhiên, khi $n \ge 3$ và $a > b \ge 1$:
  $$a^n + b^n > a^2 \cdot a \ge a^2 \cdot 3 > (a + b)^2$$
  dẫn tới mâu thuẫn đánh giá bất đẳng thức.
  
Vậy nghiệm nguyên dương duy nhất của bài toán là $(a, b, n) = (2, 2, 3)$ và hoán vị. $\blacksquare$

---

## 5. Kết luận
Bổ đề LTE là cầu nối thần kỳ giữa số học chia hết và hàm số mũ. Hãy luôn nhớ điều kiện kiểm tra trước khi dùng: **$p$ phải chia hết cho $a \pm b$** và **$p$ không được chia hết cho $a, b$**!
