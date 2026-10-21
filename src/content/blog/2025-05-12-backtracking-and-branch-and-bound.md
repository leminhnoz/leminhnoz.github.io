---
title: "Vét cạn và Quay lui (Backtracking): Từ cây đệ quy đến nghệ thuật Cắt tỉa Nhánh cận"
description: "Làm chủ thuật toán Vét cạn và Quay lui (Backtracking): Bản chất cây không gian trạng thái, kỹ thuật hoàn tác, bài toán N quân hậu và phương pháp Cắt tỉa nhánh cận (Branch and Bound)."
pubDate: "2025-05-12"
tags: ["Backtracking", "Brute Force", "Algorithms", "C++", "Competitive Programming"]
categories: ["Competitive Programming"]
excerpt: "Khi không có thuật toán đa thức nào để tìm ra đáp án tối ưu, vũ khí duy nhất của bạn là duyệt tất cả các khả năng. Nhưng sự khác biệt giữa một lập trình viên nghiệp dư và một tuyển thủ giỏi nằm ở nghệ thuật: biết từ bỏ sớm những con đường không dẫn tới đích."
---

> *"Quay lui không phải là đi mò mẫm trong bóng tối; nó là việc dũng cảm bước vào từng ngã rẽ của mê cung, và thông minh quay lại ngã ba ngay khi phát hiện phía trước là ngõ cụt."*

Trong lý thuyết độ phức tạp, có rất nhiều bài toán thuộc lớp **NP-Hard** (như giải bảng Sudoku, xếp lịch thi, bài toán $N$ quân hậu, hay bài toán người du lịch TSP). Với những bài toán này, các nhà toán học hàng đầu thế giới vẫn chưa tìm ra cách giải nào nhanh hơn việc **thử tất cả các trường hợp có thể xảy ra**.

Tuy nhiên, thử tất cả các trường hợp theo kiểu "ngây thơ" sẽ khiến chương trình của bạn bùng nổ số phép tính theo hàm giai thừa $O(N!)$ hoặc hàm mũ $O(2^N)$.

**Thuật toán Quay lui (Backtracking)** kết hợp với **Kỹ thuật Nhánh cận (Branch and Bound)** chính là chiếc kéo thần kỳ giúp bạn cắt bỏ hàng triệu nhánh tính toán vô ích ngay từ trong trứng nước!

---

## 1. Cấu trúc 3 bước của một hàm Quay lui chuẩn mực

Mọi hàm quay lui trong khoa học máy tính đều tuân theo đúng một cấu trúc mẫu thanh lịch gồm 3 bước:

```cpp
void backtrack(int step) {
    // 1. ĐIỀU KIỆN DỪNG (Base Case)
    // Nếu đã hoàn thành tất cả các bước, ghi nhận kết quả và quay về
    if (step == N) {
        processSolution();
        return;
    }

    // 2. THỬ MỌI LỰA CHỌN HỢP LỆ (Choices)
    for (auto choice : candidate_choices) {
        if (isValid(choice)) {
            makeChoice(choice);    // Thực hiện lựa chọn (ghi nhận trạng thái)
            
            backtrack(step + 1);   // Đi sâu xuống bước tiếp theo

            undoChoice(choice);    // 3. HOÀN TÁC (Backtrack / Khôi phục lại trạng thái cũ)
        }
    }
}
```

> [!IMPORTANT]
> **Điểm chí mạng:** Bước thứ 3 (**Hoàn tác - Undo Choice**) là linh hồn của thuật toán. Nếu bạn quên khôi phục lại mảng đánh dấu hoặc biến đếm về trạng thái cũ sau khi gọi đệ quy, các nhánh rẽ sau đó sẽ bị tính toán sai hoàn toàn!

---

## 2. Bài toán kinh điển: Xếp $N$ Quân Hậu (N-Queens)

Đề bài: Đặt $N$ quân hậu lên bàn cờ vua kích thước $N \times N$ sao cho không có hai quân hậu nào có thể tấn công lẫn nhau (tức là không cùng hàng, không cùng cột, và không cùng đường chéo).

### Cách tiếp cận theo từng hàng:
Vì mỗi hàng chỉ có thể đặt đúng 1 quân hậu, ta duyệt lần lượt từng hàng từ hàng $0$ đến hàng $N - 1$:
Tại hàng $row$, ta thử đặt quân hậu vào cột $col$ từ $0$ đến $N - 1$.
Điều kiện hợp lệ:
1. Cột $col$ chưa có quân hậu nào.
2. Đường chéo chính đi qua ô $(row, col)$ chưa có quân hậu nào. (Đặc trưng bởi giá trị `row - col + N`).
3. Đường chéo phụ đi qua ô $(row, col)$ chưa có quân hậu nào. (Đặc trưng bởi giá trị `row + col`).

```cpp
#include <iostream>
#include <vector>

using namespace std;

int n;
int solutions_count = 0;
bool col_used[30];
bool diag1_used[60]; // row - col + n
bool diag2_used[60]; // row + col

void solveQueens(int row) {
    // Đã đặt thành công N quân hậu trên N hàng
    if (row == n) {
        solutions_count++;
        return;
    }

    for (int col = 0; col < n; ++col) {
        int d1 = row - col + n;
        int d2 = row + col;

        // Nếu vị trí này không bị tấn công bởi bất kỳ quân hậu nào trước đó
        if (!col_used[col] && !diag1_used[d1] && !diag2_used[d2]) {
            // Đặt quân hậu và đánh dấu
            col_used[col] = diag1_used[d1] = diag2_used[d2] = true;

            // Tiến sang hàng tiếp theo
            solveQueens(row + 1);

            // HOÀN TÁC: gỡ quân hậu ra để thử vị trí khác
            col_used[col] = diag1_used[d1] = diag2_used[d2] = false;
        }
    }
}

int main() {
    cin >> n;
    solveQueens(0);
    cout << "So cach xep hop le: " << solutions_count << "\n";
    return 0;
}
```

---

## 3. Cắt tỉa Nhánh cận (Branch and Bound)

Giả sử bạn đang giải bài toán tối ưu: *"Tìm cách chọn các đồ vật sao cho tổng chi phí nhỏ nhất"*.
Trong quá trình quay lui, bạn đã tìm thấy một nghiệm hợp lệ với tổng chi phí tốt nhất hiện tại là `best_ans = 50`.

Bây giờ, tại một nhánh rẽ ở độ sâu thứ 3:
- Chi phí hiện tại bạn đã tích lũy là `current_cost = 45`.
- Bạn có một hàm ước lượng lạc quan (Lower Bound): *"Trong trường hợp may mắn nhất, các bước còn lại sẽ tốn thêm ít nhất 10 đồng nữa"*.
- Vậy chi phí kỳ vọng nhỏ nhất của nhánh này là $45 + 10 = 55$.

Vì $55 > 50$ (đã tệ hơn nghiệm tốt nhất hiện tại), bạn **hoàn toàn chắc chắn rằng việc đi sâu vào nhánh này là vô nghĩa**!
Bạn lập tức dừng lại và quay lui ngay (`return;`):

```cpp
void backtrack(int step, int current_cost) {
    // CẮT TỈA NHÁNH CẬN:
    if (current_cost + estimateRemainingCost(step) >= best_ans) {
        return; // Cắt bỏ cả cây đệ quy bên dưới!
    }
    ...
}
```

Nhờ một dòng lệnh kiểm tra điều kiện nhánh cận đơn giản, cây đệ quy có thể bị chặt đứt từ hàng tỷ nhánh xuống còn vài ngàn nhánh, giúp chương trình chạy nhanh hơn gấp hàng ngàn lần!

---

## 4. Bài tập rèn luyện thực tế

1. **CSES 1622 — Creating Strings**: Sinh tất cả các hoán vị phân biệt của một chuỗi ký tự bằng quay lui.
2. **CSES 1624 — Chessboard and Queens**: Bài toán $N$ quân hậu có thêm các ô bị cấm đặt trên bàn cờ.
3. **CSES 1623 — Apple Division**: Chia tập quả táo thành hai phần có chênh lệch khối lượng nhỏ nhất (Vét cạn $2^N$ với $N \le 20$).

Hãy tiếp tục lộ trình tại [Roadmap Competitive Programming](/roadmap/)!
