---
title: "Thuật toán Heuristic và Luyện kim mô phỏng (Simulated Annealing): Vũ khí 'cứu cánh' cho bài toán NP-Hard"
description: "Khám phá thuật toán Heuristic và Luyện kim mô phỏng (Simulated Annealing): Cách thoát khỏi bẫy cực tiểu cục bộ bằng xác suất Metropolis và kỹ thuật vắt kiệt thời gian phòng thi."
pubDate: "2026-06-25"
tags: ["Heuristics", "Simulated Annealing", "Randomized", "C++", "Competitive Programming"]
categories: ["Competitive Programming"]
excerpt: "Khi một bài toán không có thuật toán tối ưu đa thức, không thể DP và N quá lớn để vét cạn, lập trình viên thông minh sẽ không bỏ cuộc. Họ dùng Simulated Annealing để 'thử vận may có tính toán' và giật trọn điểm số."
---

> *"Trong khoa học máy tính, hoàn hảo là kẻ thù của cái tốt. Khi bài toán quá khó để tìm ra đáp án tối ưu tuyệt đối, người tìm ra đáp án 'đủ tốt' nhanh nhất sẽ là người chiến thắng."*

Hãy tưởng tượng bạn bước vào một kỳ thi lập trình cấp cao (hoặc một kỳ thi Marathon / Heuristic như AtCoder Heuristic Contest) và gặp một bài toán hóc búa:
Cho $N = 1000$ điểm trên mặt phẳng. Tìm thứ tự đi qua tất cả các điểm sao cho tổng quãng đường ngắn nhất. Đề bài chấm điểm theo công thức: *Điểm của bạn càng cao nếu quãng đường tìm được càng ngắn*.

- Quy hoạch động Bitmask? Thất bại vì $N = 1000 \gg 20$.
- Quay lui vét cạn? Thất bại vì $1000!$ là một con số khổng lồ.
- Thuật toán tham lam thông thường (chọn điểm gần nhất)? Rất dễ bị rơi vào **bẫy cực tiểu cục bộ (Local Minimum)** — một lời giải trông có vẻ ổn ở bước đầu nhưng thực chất lại rất tệ về tổng thể.

Làm thế nào để máy tính tự động tìm kiếm lời giải tối ưu và biết cách "nhảy" ra khỏi hố bẫy cục bộ? Câu trả lời nằm ở **Luyện kim mô phỏng (Simulated Annealing)** — một trong những thuật toán ngẫu nhiên hóa (Randomized Heuristic) quyền năng nhất.

---

## 1. Trực giác từ Vật lý: Nghệ thuật rèn kiếm

Cái tên **Simulated Annealing (SA)** bắt nguồn từ kỹ thuật ủ nhiệt trong ngành luyện kim:
- Khi một thợ rèn muốn tạo ra thanh kiếm thép cứng cáp và hoàn hảo nhất, ông ta nung nóng thanh kim loại lên nhiệt độ cực cao.
- Ở **nhiệt độ cao**, các nguyên tử dao động dữ dội và di chuyển tự do, dễ dàng sắp xếp lại cấu trúc bên trong.
- Sau đó, người thợ **làm nguội từ từ** (chứ không làm nguội đột ngột). Khi nhiệt độ giảm dần, các nguyên tử dần ổn định và rơi vào trạng thái có **mức năng lượng thấp nhất** (trạng thái cấu trúc tinh thể bền vững nhất).

### Áp dụng vào Thuật toán:
- **Nhiệt độ $T$**: Đại diện cho mức độ "liều lĩnh" của thuật toán.
  - Khi $T$ còn cao: Thuật toán sẵn sàng chấp nhận cả những bước đi **khiến kết quả tạm thời tệ hơn**, nhằm mục đích khám phá toàn bộ không gian và **thoát khỏi các hố bẫy cục bộ**.
  - Khi $T$ nguội dần về $0$: Thuật toán trở nên khắt khe hơn, chỉ chấp nhận những bước đi làm kết quả tốt hơn, nhằm hội tụ về điểm cực trị toàn cục (Global Optimum)!

---

## 2. Tiêu chuẩn Metropolis: Chấp nhận bước đi tệ với xác suất $e^{-\Delta E / T}$

Tại mỗi bước của thuật toán:
1. Từ trạng thái hiện tại với chi phí $E_{curr}$, ta thử tạo ra một trạng thái lân cận mới có chi phí $E_{next}$.
2. Độ chênh lệch chi phí là $\Delta E = E_{next} - E_{curr}$.
3. **Quyết định chuyển trạng thái:**
   - Nếu $\Delta E < 0$ (trạng thái mới tốt hơn): **Chắc chắn chấp nhận!**
   - Nếu $\Delta E \ge 0$ (trạng thái mới tệ hơn): Ta vẫn chấp nhận nó với **xác suất**:
$$P = e^{-\frac{\Delta E}{T}}$$

### Quan sát công thức:
- Khi nhiệt độ $T$ rất lớn: $-\frac{\Delta E}{T} \approx 0 \implies P \approx e^0 = 1$. Thuật toán gần như sẵn sàng thử mọi nhánh dù tệ hơn để vượt qua các bức tường núi ngăn cách các thung lũng nghiệm.
- Khi nhiệt độ $T$ tiến về $0$: $-\frac{\Delta E}{T} \to -\infty \implies P \to 0$. Thuật toán hầu như không chấp nhận bước đi tệ nào nữa và khóa chặt vào đáy thung lũng sâu nhất.

---

## 3. Quản lý thời gian phòng thi: Kỹ thuật vắt kiệt Time Limit

Điểm mấu chốt khi viết Simulated Annealing trong các kỳ thi là: **Hãy để thuật toán chạy lặp đi lặp lại cho đến khi chỉ còn cách giới hạn thời gian (Time Limit) đúng $0.05$ giây!**

```cpp
#include <iostream>
#include <vector>
#include <cmath>
#include <random>
#include <ctime>

using namespace std;

// Bộ sinh số ngẫu nhiên chuẩn hiện đại của C++
mt19937 rng(1337);

double randomDouble() {
    return uniform_real_distribution<double>(0.0, 1.0)(rng);
}

int main() {
    // Thời điểm bắt đầu chạy chương trình
    clock_t start_time = clock();

    double start_temp = 10000.0;
    double end_temp = 0.001;
    double current_temp = start_temp;

    // Chi phí hiện tại và chi phí tốt nhất
    double best_cost = 1e18;

    // Vắt kiệt thời gian: Chạy đến khi đạt 0.95 giây (nếu Time Limit là 1.0s)
    while ((double)(clock() - start_time) / CLOCKS_PER_SEC < 0.95) {
        // Tỷ lệ thời gian đã trôi qua từ 0.0 đến 1.0
        double time_progress = (double)(clock() - start_time) / (0.95 * CLOCKS_PER_SEC);
        
        // Làm nguội nhiệt độ theo hàm mũ
        current_temp = start_temp * pow(end_temp / start_temp, time_progress);

        // Sinh trạng thái lân cận mới...
        // double delta = new_cost - current_cost;

        // Tiêu chuẩn Metropolis
        // if (delta < 0 || randomDouble() < exp(-delta / current_temp)) {
        //     current_cost = new_cost;
        //     best_cost = min(best_cost, current_cost);
        // }
    }

    return 0;
}
```

---

## 4. Khi nào nên dùng Simulated Annealing?

1. Các bài toán có đồ thị phẳng hoặc hình học mà đề bài yêu cầu tối ưu hóa hàm mục tiêu (quãng đường, diện tích, chênh lệch phân chia tập hợp).
2. Các kỳ thi theo thể thức cho điểm từng phần (Subtasks / Partial Scoring) hoặc Marathon Contests.
3. Khi bạn đã "hết cách" và bài toán là NP-hard mà không có thuật toán đa thức nào tồn tại.

Đón đọc các chuyên đề tiếp theo tại [Roadmap](/roadmap/)!
