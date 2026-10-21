---
title: "Chiến thuật phòng thi Competitive Programming và Tuyệt kỹ Stress Testing bắt bug test sai"
description: "Cẩm nang chiến thuật thực chiến phòng thi HSG và ICPC: Nghệ thuật phân bổ 5 tiếng thi đấu, quản lý tâm lý khi dính WA và tuyệt kỹ Stress Testing tự động tìm bộ test sai nhỏ nhất."
pubDate: "2025-02-12"
tags: ["Contest Strategy", "Stress Testing", "ICPC", "C++", "Competitive Programming"]
categories: ["Competitive Programming"]
excerpt: "Một cuộc thi lập trình không chỉ kiểm tra ai thuộc nhiều thuật toán hơn, mà kiểm tra ai giữ được cái đầu lạnh trong 5 tiếng căng thẳng. Khi dính WA test ẩn, người khôn ngoan không đoán mò — họ cho máy tính tự tìm ra bộ test sai."
---

> *"Sự khác biệt giữa một đội tuyển ICPC có huy chương và một đội ra về tay trắng thường không nằm ở trình độ giải thuật, mà nằm ở chiến thuật làm bài và kỹ năng sửa lỗi (Debugging) trong phòng thi."*

Có bao giờ bạn rơi vào tình cảnh này:
Bạn ngồi trong phòng thi suốt 3 tiếng đồng hồ, nộp một bài toán và nhận kết quả cay đắng: **Wrong Answer on Test 23**.
Bạn không được xem test ẩn của ban giám khảo. Bạn nhìn chằm chằm vào 100 dòng code của mình, bắt đầu suy đoán lung tung, đổi dấu `<`, `>` thành `<=`, `>=`, nộp lại và tiếp tục dính **Wrong Answer on Test 27**! Tâm lý bạn bắt đầu hoảng loạn, và cả buổi thi hôm đó đổ sông đổ biển.

Các tuyển thủ kỳ cựu không bao giờ debug bằng cách "đoán mò". Họ có một vũ khí bí mật gọi là **Stress Testing (Kiểm thử tự động)**.

Bài viết này sẽ chia sẻ chiến thuật quản lý 5 tiếng phòng thi và cách dựng hệ thống Stress Testing chỉ trong 3 phút.

---

## 1. Chiến thuật 5 tiếng trong phòng thi ICPC / HSG

Một kỳ thi lập trình thi đấu thường kéo dài từ 3 đến 5 tiếng. Hãy chia cuộc thi thành 3 giai đoạn rõ rệt:

### Giai đoạn 1: 20 phút đầu — Săn "Bài Bánh Mì" (First Blood)
- **Đừng vội đâm đầu vào code ngay.** Hãy cùng đồng đội chia nhau đọc lướt qua toàn bộ đề thi từ bài A đến bài cuối cùng.
- Nhìn vào bảng xếp hạng (Scoreboard): Bài nào đang có nhiều người AC nhất? Đó chính là bài dễ nhất (bài "bánh mì").
- Giải quyết bài dễ này nhanh nhất có thể để lấy quả bóng đầu tiên, giải tỏa hoàn toàn áp lực tâm lý cho cả đội!

### Giai đoạn 2: Giữa trận — Phân loại và Phối hợp
- Nhóm các bài còn lại theo chủ đề: Bài nào là Cấu trúc dữ liệu? Bài nào là Đồ thị? Bài nào là Quy hoạch động?
- Luôn kiểm tra kỹ giới hạn $N$ trước khi viết code (áp dụng [Quy tắc 1 Giây và bảng Big-O](/blog/2025-03-04-time-and-space-complexity-big-o)).
- **Luôn viết giải thuật ra giấy nháp trước khi chạm vào bàn phím.** Viết code trên máy chỉ nên là công đoạn chuyển ngữ từ ý tưởng trên giấy sang C++.

### Giai đoạn 3: Giờ cuối (Frozen Board) — Không bao giờ bỏ cuộc
- Khi bảng điểm bị đóng băng (1 tiếng cuối), sự tập trung và tỉnh táo là quan trọng nhất. Nếu một bài bị kẹt quá 45 phút mà không tìm ra lỗi, hãy tạm thời rời bàn phím, đi rửa mặt hoặc đổi bài cho đồng đội đọc lại đề từ đầu.

---

## 2. Tuyệt kỹ Stress Testing: Tìm bộ test sai trong 3 phút

Khi bạn nộp bài và nhận **Wrong Answer**, đừng cố đọc code để tìm lỗi bằng mắt thường. Mắt của bạn sẽ có xu hướng "bỏ qua" chính cái bẫy logic do não bạn vừa tạo ra!

Hãy dựng một hệ thống **Stress Testing** gồm 3 file đơn giản:

```text
[generator.cpp] ---> (Tự động sinh test ngẫu nhiên NHỎ)
        |
        +-----> [brute.cpp]  ---> (Lời giải trâu 100% đúng)  ---> ket_qua_dung.txt
        |
        +-----> [sol.cpp]    ---> (Code tối ưu của bạn)    ---> ket_qua_sai.txt
                                                                     |
                                                        So sánh 2 kết quả (diff)
```

### 1. `sol.cpp`: File code tối ưu của bạn (đang bị WA)

### 2. `brute.cpp`: File giải trâu ngây thơ (chắc chắn đúng 100%)
Code bằng thuật toán duyệt $O(N^2)$ hoặc $O(2^N)$ đơn giản nhất. Dù chậm nhưng ta chắc chắn nó không bao giờ sai!

### 3. `gen.cpp`: Trình sinh test ngẫu nhiên CỰC NHỎ
> [!IMPORTANT]
> **Bí quyết vàng:** Hãy sinh các bộ test **CỰC KỲ NHỎ** (ví dụ $N = 4$ hoặc $5$, các số từ $1$ đến $10$).
> Đừng sinh test lớn! Nếu test có $10^5$ số thì dù tìm ra test sai bạn cũng không thể đọc nổi. Nhưng với test chỉ có 4 số, bạn chỉ cần 30 giây đặt bút tính tay là phát hiện ra ngay dòng code bị lỗi!

```cpp
// gen.cpp: Sinh test nhỏ
#include <iostream>
#include <random>

using namespace std;

mt19937 rng(random_device{}());

int randInt(int a, int b) {
    return uniform_int_distribution<int>(a, b)(rng);
}

int main() {
    int n = randInt(2, 6);
    int k = randInt(1, 10);
    cout << n << " " << k << "\n";
    for (int i = 0; i < n; ++i) {
        cout << randInt(1, 15) << " ";
    }
    cout << "\n";
    return 0;
}
```

---

## 3. Script tự động chạy kiểm thử trong Terminal (PowerShell / Bash)

Trên máy thi chạy Windows (PowerShell):

```powershell
# Chạy vòng lặp kiểm thử
g++ -O2 sol.cpp -o sol.exe
g++ -O2 brute.cpp -o brute.exe
g++ -O2 gen.cpp -o gen.exe

for ($i = 1; $i -le 10000; $i++) {
    ./gen.exe > input.txt
    ./sol.exe < input.txt > my_ans.txt
    ./brute.exe < input.txt > correct_ans.txt

    $diff = Compare-Object (Get-Content my_ans.txt) (Get-Content correct_ans.txt)
    if ($diff) {
        Write-Host ">>> TIM THAY TEST SAI TAI LAN LAP $i! <<<" -ForegroundColor Red
        Write-Host "Input:"
        Get-Content input.txt
        Write-Host "Dap an cua ban:"
        Get-Content my_ans.txt
        Write-Host "Dap an dung:"
        Get-Content correct_ans.txt
        break
    }
}
```

Sau khoảng 5 đến 10 giây chạy hàng ngàn test ngẫu nhiên, chương trình sẽ dừng lại và hiển thị cho bạn một bộ test siêu nhỏ (chỉ 3-4 phần tử) mà code của bạn ra kết quả sai. Nhìn vào bộ test này, bạn sẽ lập tức nhận ra ngay trường hợp biên (Corner case) mà mình đã bỏ sót!

---

## 4. Lời kết

Thi đấu lập trình là một hành trình dài đòi hỏi cả tri thức lẫn kỹ năng thực chiến. Hãy trang bị cho mình tư duy bình tĩnh, chuẩn bị sẵn sàng template Stress Testing và tự tin bước vào phòng thi.

Khám phá toàn bộ hệ thống kiến thức tại [Roadmap Competitive Programming](/roadmap/)!
