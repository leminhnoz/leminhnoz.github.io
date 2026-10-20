---
title: 'DeMen Blog #4: Wavelet Tree - Khi Segment Tree được đảo nhãn'
description: "Giới thiệu Wavelet Tree qua góc nhìn Segment Tree đảo nhãn, từ P-Tree đến xử lý truy vấn thứ tự trên đoạn."
pubDate: "2023-01-01"
categories: ["Competitive Programming"]
tags: ["DeMen Blog", "Segment Tree", "Data Structure"]
excerpt: "Giới thiệu Wavelet Tree qua góc nhìn Segment Tree đảo nhãn, từ P-Tree đến xử lý truy vấn thứ tự trên đoạn."
author: "Võ Khắc Triệu (DeMen100ns)"
---

# DeMen Blog #4: Wavelet Tree - Khi Segment Tree được đảo nhãn

**Tác giả: Võ Khắc Triệu (DeMen100ns)**

Khi làm các bài quy hoạch động, ta sẽ các lưu các trạng thái với một số tính chất. Tuy nhiên, đôi khi ta cần thay đổi cách lưu các trạng thái sao cho số trạng thái cần duyệt qua được giảm xuống. Chúng ta gọi đó là quy hoạch động **đảo nhãn** (Các bạn có thể đọc thêm tại [**đây**](https://vnoi.info/wiki/algo/dp/Mot-so-ky-thuat-toi-uu-hoa-thuat-toan-Quy-Hoach-Dong.md#1-%C4%91%E1%BB%95i-bi%E1%BA%BFn)).

Trong bài viết này, chúng ta sẽ cùng tìm hiểu về một cấu trúc dữ liệu hay và hữu dụng: **Wavelet Tree**, hay mình thường gọi là Segment Tree đảo nhãn.

## Kiến thức cần biết
- [Segment Tree](https://vnoi.info/wiki/algo/data-structures/segment-tree-basic.md)
- [Merge Sort Tree](https://vnoi.info/wiki/algo/data-structures/segment-tree-basic.md#v%C3%AD-d%E1%BB%A5-3)

## Đặt vấn đề 

Xét bài toán sau:

> Xét mảng $a$ gồm $n$ phần tử nguyên dương, trả lời $q$ truy vấn thuộc hai loại sau:
> - $1\ l\ r\ v$: Đếm số phần tử có giá trị $\le v$ trong đoạn $[l .. r]$ của mảng $a$.
> - $2\ l\ r\ k$: Trả về phần tử lớn thứ $k$ trong đoạn $[l .. r]$ của mảng $a$.
> 
> Giới hạn: $1 \le n, q, a_i \le 5 \times 10^5$

Ta có thể thấy hai loại truy vấn trên đều là các truy vấn liên quan đến thứ tự của giá trị trong đoạn. Merge Sort Tree và Wavelet Tree chính là các cấu trúc dữ liệu được dùng để xử lý các dạng truy vấn như trên.

Tuy nhiên, với bài toán trên, Merge Sort Tree sẽ trả lời mỗi truy vấn $1$ và $2$ với độ phức tạp là $O(\log(n)^2)$ và sẽ dễ bị chạy quá thời gian khi $n, q$ đủ lớn.

Wavelet Tree được tạo ra để giải quyết các truy vấn này chỉ trong $O(\log(a_i))$ với mỗi truy vấn.

## Ý tưởng

Thông thường, khi chúng ta xây dựng cây Merge Sort Tree, mỗi nút trên cây sẽ là một vector hoặc multiset chứa thông tin giá trị của một đoạn **vị trí** trên mảng và được sắp xếp tăng dần.

Ví dụ: Với mảng $A = [2, 1, 1, 3, 1, 4, 3, 2]$, ta có cây Merge Sort Tree đại diện cho mảng $A$ như sau:

![](https://hackmd.io/_uploads/B1xUfS86h.png)


Tuy nhiên, với Wavelet Tree, chúng ta sẽ dùng tư duy đảo nhãn để giải quyết. Trong đó, mỗi nút sẽ quản lý thông tin vị trí của một đoạn **giá trị** trên mảng. Chúng ta sẽ đi qua hai cải tiến để hiểu cách Wavelet Tree hoạt động.

### Cải tiến 1: P-Tree

Mình sẽ gọi cải tiến này là **P-Tree**.

Gọi mảng $P$ là mảng vị trí của mảng $A$, trong đó, $P_i$ là một tập các index có giá trị là $i$ trên mảng $A$.

Ví dụ:
$A = [2, 1, 1, 3, 1, 4, 3, 2]$
$P = [\{2, 3, 5\}, \{1, 8\}, \{4, 7\}, \{6\}]$ (Vì $max(A) = 4$, nên $|P| = 4$)

Ta sẽ dựng một cây Merge Sort Tree của mảng $P$, đây chính là P-Tree của mảng $A$.

Với mảng $A$ và $P$ như trên, ta sẽ có cây P-Tree như sau:

![](https://hackmd.io/_uploads/rJbZZS8an.png)


Ta thấy được, mỗi nút của cây P-Tree là tập các vị trí tương ứng với giá trị trên mảng $A$ nằm trong giá trị mà nút đó quản lý.

Với P-Tree, ta có thể xử lý các truy vấn $1$ và $2$ trong $O(\log(n) \times \log(a_i))$ với mỗi truy vấn (Cách xử lý xin nhường lại cho độc giả tự nghiệm).

Ta thấy thuật toán có độ phức tạp bằng với Merge Sort Tree nhưng dễ cài đặt hơn. Tuy nhiên, chúng ta vẫn có thể cải tiến hơn nữa.

### Cải tiến 2: Wavelet Tree

Trong cải tiến này, ta sẽ xử lý lại thông tin có được từ cây P-Tree.

Giả sử nút $u$ quản lý đoạn giá trị $[l .. r]$. Gọi $mid = \frac{l + r}{2}$. 

Gọi nút $ul, ur$ lần lượt là nút con bên trái và nút con bên bên phải của nút $u$.

Ta biết rằng, $ul$ sẽ quản lý đoạn giá trị $[l .. mid]$ và $ur$ sẽ quản lý đoạn giá trị $[mid + 1 .. r]$.

Ta sẽ dựng cây Wavelet Tree như sau:
Mỗi nút của cây Wavelet Tree sẽ có một dãy bit. Trong đó, nếu một giá trị xuất hiện trên nút $u$ của cây P-Tree và cũng xuất hiện trên nút $ul$ của cây P-Tree thì bit tương ứng với giá trị đó trên nút $u$ của cây Wavelet Tree sẽ là $1$, ngược lại thì là $0$.

Ví dụ:
Với mảng $A = [2, 1, 1, 3, 1, 4, 3, 2]$, ta sẽ có Wavelet Tree như sau:

![](https://hackmd.io/_uploads/SJ3LQSIp2.png)

Lưu ý rằng các nút lá không có nút con nên ta không cần lưu thông tin gì trong đó.

Gọi $pre_u$ là tổng tiền tố (**Prefix sum**) của dãy bit của nút $u$ trên Wavelet Tree.

Gọi $pos_{u_v}$ là vị trí của giá trị lớn nhất $\le v$ trong nút $u$ của P-Tree. Ta sẽ gọi $pos_{u_v}$ là vị trí tương đối của $v$ trên nút $u$.

Thông thường, nếu ta cần tìm vị trí tương đối của giá trị trên một nút trên P-Tree, ta cần phải dùng chặt nhị phân. Như vậy ta sẽ phải tốn độ phức tạp $O(log(n))$ cho với mỗi giá trị trên một nút. Với cách tổ chức dữ liệu trên cây Wavelet Tree, chúng ta sẽ làm được điều trên trong $O(1)$. Thật vậy, chúng ta sẽ thực hiện như sau:

Với nút gốc (root) của cây thì $pos_{{root}_v} = v$.

Khi duyệt cây Wavelet Tree, ta có thể đi từ $u$ xuống $ul$ hoặc $u$ xuống $ur$ nên ta sẽ chia ra $2$ trường hợp để xử lý:

#### TH1: $u$ -> $ul$
Như định nghĩa ở trên, chỉ có các giá trị $1$ trên $u$ sẽ xuất hiện trong $ul$.
$\rightarrow pos_{{ul}_v}$ chính là số bit $1$ nằm trong đoạn $[1 .. pos_{u_v}]$ hay $pos_{{ul}_v} = pre_{u_{pos_{u_v}}}$.

#### TH2: $u$ -> $ur$
Tương tự, chỉ có các giá trị $0$ trên $u$ sẽ xuất hiện trong $ur$.
$\rightarrow pos_{{ur}_v}$ chính là số bit $0$ nằm trong đoạn $[1 .. pos_{u_v}]$ hay $pos_{{ur}_v} = pos_{u_v} - pre_{u_{pos_{u_v}}}$.

Từ các thông tin này, chúng ta sẽ dễ dàng trả lời các truy vấn của bài toán trên. Chúng ta sẽ đi cụ thể vào từng truy vấn.

### Truy vấn $1$: Đếm số phần tử có giá trị $\le v$ trong đoạn $[l .. r]$ của mảng $a$.

Xét một nút $u$ quản lý đoạn giá trị $[x .. y]$. Ta có, $pre_{u_{pos_r}} - pre_{u_{pos_{l - 1}}}$ là số số có giá trị trong đoạn giá trị $[x .. y]$ nằm trong đoạn vị trí $[l .. r]$ của mảng $a$.

Như vậy đáp án sẽ là $\sum_{u \in g} pre_{u_{pos_r}} - pre_{u_{pos_{l - 1}}}$ với $g$ là tập hợp ít nút nhất sao cho tổng tất cả các phạm vi mà các nút đó quản lí đúng bằng đoạn giá trị $[1 .. v]$.

Vì chỉ có $\log(n)$ nút được thăm và mỗi nút xử lý trong $O(1)$ nên độ phức tạp cho truy vấn này là $O(\log(n))$.

### Truy vấn $2$: Trả về phần tử lớn thứ $k$ trong đoạn $[l .. r]$ của mảng $a$.

Ta sẽ sử dụng kỹ thuật [Segment Tree Walk](https://leduythuccs.github.io/2020-07-10-Binary-Search-on-Segment-Tree/) cho bài này và chúng ta sẽ bắt đầu từ gốc của cây Wavelet Tree.

Giả sử chúng ta đang ở đỉnh $u$ (quản lý đoạn giá trị $[x .. y]$) và cần tìm phần tử lớn thứ $k$ của nút $u$, ta sẽ xét ba trường hợp sau:

#### TH1: $x = y$ (và $k = 1$)

Hiển nhiên, $x$ chính là đáp án cần tìm.

#### TH2: Số giá trị của nút $ul$ nằm trong đoạn vị trí $[l .. r]$ $\ge k$.

Lúc này, ta thấy được phần tử lớn thứ $k$ của nút $u$ cũng chính là phần tử lớn thứ $k$ của nút $ul$. Như vậy, ta đi xuống nút $ul$ và tiếp tục giải quyết bài toán.

#### TH3: Số giá trị của nút $ul$ nằm trong đoạn vị trí $[l .. r]$ $< k$.

Lúc này, phần tử lớn thứ $k$ của nút $u$ sẽ là phần tử lớn thứ $k - (pre_{ul_{pos_r}} - pre_{ul_{pos_{l - 1}}})$ của nút $ur$, ta cũng đi xuống nút $ur$ và tiếp tục giải quyết bài toán.

Vì chỉ có $\log(n)$ nút được thăm và mỗi nút xử lý trong $O(1)$ nên độ phức tạp cho truy vấn này là $O(\log(n))$.
