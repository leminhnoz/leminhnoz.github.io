---
title: "Cây tiền tố (Trie): Từ tra cứu từ điển siêu tốc đến phép thuật tìm XOR lớn nhất"
description: "Khám phá cấu trúc dữ liệu Cây tiền tố (Trie): Cơ chế lưu trữ tiền tố từ điển trong O(|S|) và ứng dụng vi diệu của Bitwise Trie giải bài toán tìm cặp XOR lớn nhất O(30N)."
pubDate: "2026-10-21"
tags: ["Trie", "String", "Data Structures", "Bitwise", "Algorithms", "C++", "Competitive Programming"]
categories: ["Competitive Programming"]
excerpt: "Làm thế nào để tính năng gợi ý tìm kiếm (Autocomplete) của Google có thể hiển thị kết quả ngay khi bạn mới gõ 3 chữ cái trong số hàng tỷ từ khóa? Bí mật nằm ở Trie — cấu trúc cây tiền tố thanh lịch."
---

> *"Thay vì lưu trữ từng từ ngữ một cách rời rạc, hãy ghép những phần chung của chúng lại với nhau. Tiết kiệm không gian cũng chính là tiết kiệm thời gian."*

Hãy tưởng tượng bạn đang xây dựng tính năng tìm kiếm cho một cuốn từ điển gồm $N = 10^5$ từ tiếng Anh, mỗi từ dài tối đa $30$ ký tự. Người dùng gõ một từ $S$ và bạn phải trả lời:
> *"Từ $S$ có nằm trong từ điển hay không?"*
> Hoặc: *"Có bao nhiêu từ trong từ điển bắt đầu bằng tiền tố $S$?"*

Nếu bạn lưu các từ trong một danh sách và so sánh tuần tự, mỗi lần tìm kiếm sẽ mất $O(N \times |S|) \approx 10^5 \times 30 = 3 \cdot 10^6$ phép so sánh. Nếu có $10^5$ truy vấn tra cứu, tổng thời gian sẽ là $3 \cdot 10^{11} \to$ TLE chắc chắn.

Kể cả dùng `std::map<string, bool>`, mỗi lần tra cứu vẫn mất $O(|S| \log N)$ kèm chi phí hằng số băm cây khá nặng nề.

**Cây tiền tố (Trie)** — bắt nguồn từ chữ *re**trie**val* (truy xuất) — ra đời để thực hiện việc tra cứu này trong đúng **$O(|S|)$**, hoàn toàn **không phụ thuộc vào số lượng từ trong từ điển**!

---

## 1. Cấu trúc của Trie: Chia sẻ tiền tố chung

Điểm cốt lõi của Trie: **Các từ có cùng phần đầu (tiền tố) sẽ cùng đi qua chung một nhánh trên cây**.

Ví dụ, khi ta thêm các từ `"cat"`, `"car"`, `"cart"`, `"dog"` vào Trie:
- Gốc cây đại diện cho chuỗi rỗng `""`.
- Từ gốc, có 2 nhánh rẽ: nhánh chữ `'c'` và nhánh chữ `'d'`.
- Đi theo nhánh `'c'`, ta đến chữ `'a'`. Từ `'a'`, cả `"cat"` và `"car"` cùng đi chung đường!
- Chỉ đến ký tự thứ 3, con đường mới tách ra: một nhánh rẽ sang `'t'` (thành `"cat"`), một nhánh rẽ sang `'r'` (thành `"car"`).
- Từ `'r'`, đi tiếp sang `'t'` ta có từ `"cart"`.

```text
         (root)
        /      \
      'c'      'd'
       |        |
      'a'      'o'
     /   \      |
   'r'*  't'*  'g'*
    |
   't'*
(* đánh dấu kết thúc một từ hợp lệ)
```

### Tại sao Trie tìm kiếm siêu tốc trong $O(|S|)$?
Khi kiểm tra xem từ `"car"` có tồn tại không:
- Bắt đầu từ gốc: Đi theo cạnh `'c'`. (1 bước)
- Đi tiếp theo cạnh `'a'`. (1 bước)
- Đi tiếp theo cạnh `'r'`. (1 bước)
- Kiểm tra xem node `'r'` có được đánh dấu là điểm kết thúc từ hay không.
Tổng số bước đúng bằng độ dài của từ $|S| = 3$, không cần biết từ điển có 10 từ hay 10 triệu từ!

---

## 2. Triển khai Trie chuẩn trong C++

Cách cài đặt phổ biến và trực quan nhất bằng mảng tĩnh hoặc con trỏ:

```cpp
#include <iostream>
#include <string>
#include <vector>

using namespace std;

struct TrieNode {
    TrieNode* children[26];
    int prefix_count; // Số lượng từ có tiền tố đi qua node này
    bool is_end;      // Đánh dấu đây là điểm kết thúc của một từ

    TrieNode() {
        for (int i = 0; i < 26; ++i) children[i] = nullptr;
        prefix_count = 0;
        is_end = false;
    }
};

class Trie {
private:
    TrieNode* root;

public:
    Trie() {
        root = new TrieNode();
    }

    // Thêm một từ vào Trie: O(|S|)
    void insert(const string& s) {
        TrieNode* curr = root;
        for (char c : s) {
            int idx = c - 'a';
            if (curr->children[idx] == nullptr) {
                curr->children[idx] = new TrieNode();
            }
            curr = curr->children[idx];
            curr->prefix_count++;
        }
        curr->is_end = true;
    }

    // Tìm kiếm xem từ có tồn tại hay không: O(|S|)
    bool search(const string& s) {
        TrieNode* curr = root;
        for (char c : s) {
            int idx = c - 'a';
            if (curr->children[idx] == nullptr) return false;
            curr = curr->children[idx];
        }
        return curr->is_end;
    }

    // Đếm số lượng từ bắt đầu bằng tiền tố prefix: O(|prefix|)
    int countPrefix(const string& prefix) {
        TrieNode* curr = root;
        for (char c : prefix) {
            int idx = c - 'a';
            if (curr->children[idx] == nullptr) return 0;
            curr = curr->children[idx];
        }
        return curr->prefix_count;
    }
};
```

---

## 3. Phép thuật của Bitwise Trie: Tìm cặp XOR lớn nhất

Trong Competitive Programming, ứng dụng kinh điển nhất của Trie không phải là từ điển chữ cái, mà là **Bitwise Trie (Trie trên các bit nhị phân 0 và 1)**.

### Bài toán:
Cho mảng gồm $N = 2 \cdot 10^5$ số nguyên dương ($A[i] \le 10^9$).
> *"Tìm giá trị lớn nhất của $A[i] \oplus A[j]$ (phép XOR) với $1 \le i, j \le N$."*

- Duyệt mọi cặp $(i, j)$: Tốn $O(N^2) \to$ TLE.
- Nhưng một số nguyên $10^9$ có thể biểu diễn dưới dạng chuỗi nhị phân **30 bit** (từ bit $29$ xuống bit $0$).

Mỗi số được nạp vào một Trie nhị phân, trong đó mỗi node chỉ có **2 nhánh rẽ**: nhánh `0` và nhánh `1`.

### Chiến lược Tham lam (Greedy) trên từng bit:
Ta biết rằng trong phép XOR, hai bit **khác nhau** sẽ cho ra kết quả là `1` ($1 \oplus 0 = 1$), còn hai bit giống nhau cho ra `0`.
Để số XOR lớn nhất có thể, ta muốn các bit cao nhất (từ bit 29, 28,...) có giá trị `1`!

Với mỗi số $X$, ta đi từ gốc cây Trie xuống:
- Tại bit thứ $b$ của $X$: Giả sử bit này là `b_val`.
- Ta **rất muốn** tìm một số có bit đối nghịch `1 - b_val` để khi XOR ra được `1`.
- Nếu trên Trie **có nhánh rẽ `1 - b_val`**: Ta lập tức rẽ sang nhánh đó, và cộng $2^b$ vào kết quả XOR!
- Nếu không có nhánh đối nghịch: Bắt buộc phải rẽ sang nhánh `b_val` (bit XOR ra 0).

```cpp
struct BitwiseTrie {
    struct Node {
        int next[2];
        Node() { next[0] = next[1] = -1; }
    };

    vector<Node> tree;

    BitwiseTrie() {
        tree.emplace_back(); // Node 0 là gốc
    }

    void insert(int val) {
        int u = 0;
        for (int b = 30; b >= 0; --b) {
            int bit = (val >> b) & 1;
            if (tree[u].next[bit] == -1) {
                tree[u].next[bit] = (int)tree.size();
                tree.emplace_back();
            }
            u = tree[u].next[bit];
        }
    }

    int getMaxXor(int val) {
        int u = 0;
        int max_xor = 0;
        for (int b = 30; b >= 0; --b) {
            int bit = (val >> b) & 1;
            int opposite = 1 - bit;

            // Ưu tiên rẽ sang nhánh đối nghịch để được bit 1
            if (tree[u].next[opposite] != -1) {
                max_xor |= (1 << b);
                u = tree[u].next[opposite];
            } else {
                u = tree[u].next[bit];
            }
        }
        return max_xor;
    }
};
```

Mỗi số chỉ mất $31$ bước duyệt. Với $N = 2 \cdot 10^5$, tổng thời gian chạy chỉ là $30 \times 2 \cdot 10^5 \approx 6 \cdot 10^6$ phép tính $\to$ **AC trong 0.05 giây**!

---

## 4. Bài tập rèn luyện thực tế

1. **CSES 1731 — Word Combinations**: Kết hợp Trie và Dynamic Programming để đếm số cách ghép từ.
2. **Codeforces 706D — Vasiliy's Multiset**: Ứng dụng Bitwise Trie hỗ trợ thêm, xóa và tìm XOR lớn nhất.
3. **CSES 1655 — Maximum XOR Subarray**: Tìm đoạn con có tổng XOR lớn nhất bằng Bitwise Trie kết hợp Prefix XOR.

Tiếp tục bài học tiếp theo trên [Roadmap](/roadmap/): [Tổ tiên chung gần nhất (LCA) và Binary Lifting trên cây](/blog/2026-10-21-lowest-common-ancestor-binary-lifting)!
