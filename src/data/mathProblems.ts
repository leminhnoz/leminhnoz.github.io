export interface MathProblem {
  id: string;
  code: string;
  title: string;
  category: string;
  source: "IMO" | "USAMO" | "VMO" | "Putnam" | "RMM" | "APMO";
  year: number;
  difficulty: "Cơ bản Olympic" | "Chuyên sâu VMO" | "Nâng cao TST" | "Đỉnh cao IMO";
  theorems: string[];
  latexDescription: string;
  hint: string;
}

export const mathCategories = [
  "Tất cả",
  "Số học Olympic (Number Theory)",
  "Đại số & Phương trình hàm (Algebra & FE)",
  "Hình học phẳng (Geometry)",
  "Tổ hợp & Đồ thị (Combinatorics)",
  "Bất đẳng thức & Cực trị (Inequalities)",
  "Giải tích & Đại số Putnam (Putnam & Higher Math)"
];

export const mathProblems: MathProblem[] = [
  // ==========================================
  // CATEGORY 1: SỐ HỌC OLYMPIC (NUMBER THEORY)
  // ==========================================
  {
    id: "mp-imo-1988-p6",
    code: "IMO 1988 P6",
    title: "Huyền Thoại Vieta Jumping (The Root Flipping Problem)",
    category: "Số học Olympic (Number Theory)",
    source: "IMO",
    year: 1988,
    difficulty: "Đỉnh cao IMO",
    theorems: ["Vieta Jumping", "Nguyên lý Cực hạn", "Hệ thức Viète bậc hai"],
    latexDescription: "Cho $a, b$ là các số nguyên dương sao cho $a b + 1 \\mid a^2 + b^2$. Chứng minh rằng biểu thức $k = \\frac{a^2 + b^2}{a b + 1}$ luôn là một số chính phương.",
    hint: "Giả sử phản chứng tồn tại cặp nghiệm nguyên dương $(a, b)$ sao cho $k$ không phải là số chính phương. Chọn cặp nghiệm $(A, B)$ có tổng $A + B$ nhỏ nhất. Xét phương trình bậc hai $x^2 - (k B) x + (B^2 - k) = 0$. Theo hệ thức Viète, tồn tại nghiệm thứ hai $x_2 = k B - A = \\frac{B^2 - k}{A}$. Chứng minh $x_2$ là số nguyên dương và $x_2 < A$, dẫn tới $x_2 + B < A + B$, mâu thuẫn với tính nhỏ nhất của $A + B$."
  },
  {
    id: "mp-imo-2012-p3",
    code: "IMO 2012 P3",
    title: "Ước Nguyên Tố Nguyên Thủy & Bổ Đề Zsigmondy",
    category: "Số học Olympic (Number Theory)",
    source: "IMO",
    year: 2012,
    difficulty: "Đỉnh cao IMO",
    theorems: ["Định lý Zsigmondy", "Cấp số nguyên", "Bổ đề LTE"],
    latexDescription: "Cho số nguyên $n \\ge 2$. Chứng minh rằng tồn tại các số nguyên dương $a_1, a_2, \\dots, a_n$ đôi một phân biệt sao cho tích $\\prod_{1 \\le i < j \\le n} (a_i - a_j)$ chia hết cho tích $\\prod_{i=1}^n a_i$.",
    hint: "Xây dựng dãy các số dạng lũy thừa $a_i = 2^{3^{k_i}}$ hoặc sử dụng định lý Zsigmondy để đảm bảo mọi ước nguyên tố của từng số hạng $a_i$ đều xuất hiện với số mũ đủ lớn trong tích các hiệu $\\prod (a_i - a_j)$."
  },
  {
    id: "mp-vmo-2021-p3",
    code: "VMO 2021 Bài 3",
    title: "Cấp Của Số Nguyên & Hệ Thặng Dư Thu Gọn",
    category: "Số học Olympic (Number Theory)",
    source: "VMO",
    year: 2021,
    difficulty: "Chuyên sâu VMO",
    theorems: ["Cấp ord_m(a)", "Định lý Euler", "Hệ số nhị thức mod p"],
    latexDescription: "Tìm tất cả các cặp số nguyên dương $(a, p)$ với $p$ là số nguyên tố sao cho $\\frac{a^p - 1}{a - 1}$ có một ước nguyên tố $q$ thỏa mãn $q \\equiv 1 \\pmod p$, đồng thời phân tích cấu trúc cấp của $a \\pmod q$.",
    hint: "Xét cấp $d = \\text{ord}_q(a)$. Vì $q \\mid (a^p - 1)$, ta có $d \\mid p$. Do $p$ nguyên tố, hoặc $d = 1$ hoặc $d = p$. Nếu $d = 1$, chứng minh $q = p$. Nếu $d = p$, theo định lý Fermat nhỏ cho $q$, ta có $d \\mid (q - 1) \\implies p \\mid (q - 1) \\implies q \\equiv 1 \\pmod p$."
  },
  {
    id: "mp-usamo-2018-p2",
    code: "USAMO 2018 P2",
    title: "Dãy Số Nguyên & Ước Nguyên Tố Phân Biệt",
    category: "Số học Olympic (Number Theory)",
    source: "USAMO",
    year: 2018,
    difficulty: "Nâng cao TST",
    theorems: ["Bổ đề Bézout", "Sự tồn tại ước nguyên tố", "Quy nạp mạnh"],
    latexDescription: "Cho dãy số nguyên dương $(a_n)$ thỏa mãn $\\gcd(a_m, a_n) = a_{\\gcd(m, n)}$ với mọi $m, n \\ge 1$. Chứng minh rằng với mọi số nguyên dương $k$, luôn tồn tại số nguyên dương $n$ sao cho $a_n$ có ít nhất $k$ ước nguyên tố phân biệt.",
    hint: "Sử dụng tính chất phân tích nguyên tố của dãy phân phối GCD (strong divisibility sequence). Chọn các chỉ số $n_i$ nguyên tố cùng nhau đôi một và áp dụng nguyên lý Dirichlet trên tập các ước nguyên tố."
  },
  {
    id: "mp-usa-tst-2018-p5",
    code: "USA TST 2018 P5",
    title: "Ứng Dụng Bổ Đề Nâng Bậc LTE (Lifting The Exponent)",
    category: "Số học Olympic (Number Theory)",
    source: "USAMO",
    year: 2018,
    difficulty: "Nâng cao TST",
    theorems: ["Bổ đề LTE", "Số mũ đúng v_p(n)", "Phương trình Diophantine mũ"],
    latexDescription: "Tìm tất cả các bộ ba số nguyên dương $(a, b, n)$ với $a, b \\ge 2$ sao cho $a^n + b^n = (a + b)^k$ với một số nguyên dương $k$, và chứng minh rằng điều kiện cần để $v_p(a^n + b^n) = v_p(a+b) + v_p(n)$ là $n$ lẻ hoặc $p = 2$.",
    hint: "Áp dụng bổ đề LTE cho $p \\mid (a + b)$. Khi $n$ lẻ, $v_p(a^n + b^n) = v_p(a+b) + v_p(n)$. Đánh giá bất đẳng thức giữa $a^n + b^n$ và $(a+b)^k$ bằng khai triển nhị thức Newton để chặn miền giá trị của $n$."
  },
  {
    id: "mp-rmm-2018-p1",
    code: "RMM 2018 P1",
    title: "Ước Chung Lớn Nhất & Đa Thức Nguyên Thủy",
    category: "Số học Olympic (Number Theory)",
    source: "RMM",
    year: 2018,
    difficulty: "Nâng cao TST",
    theorems: ["Thuật toán Euclid đa thức", "Bổ đề Gauss", "Đồng dư thức"],
    latexDescription: "Xác định tất cả các đa thức $P(x) \\in \\mathbb{Z}[x]$ sao cho với mọi cặp số nguyên dương $a, b$, ta luôn có $\\gcd(P(a), P(b)) \\mid P(\\gcd(a, b))$.",
    hint: "Xét các số nguyên tố $p$. Từ $P(a) \\equiv 0 \\pmod p$ và $P(b) \\equiv 0 \\pmod p$, ta suy ra $P(\\gcd(a, b)) \\equiv 0 \\pmod p$. Chứng minh rằng $P(x)$ phải có dạng đơn thức $c \\cdot x^n$ hoặc đa thức hằng số."
  },
  {
    id: "mp-imo-1999-p4",
    code: "IMO 1999 P4",
    title: "Cặp Số Nguyên n Chia Hết Cho a^2 + 2",
    category: "Số học Olympic (Number Theory)",
    source: "IMO",
    year: 1999,
    difficulty: "Chuyên sâu VMO",
    theorems: ["Thặng dư bậc hai mod 4", "Bổ đề lùi vô hạn", "Phân tích nhân tử"],
    latexDescription: "Tìm tất cả các cặp số nguyên dương $(n, p)$ sao cho $p$ là số nguyên tố, $n \\le 2p$ và số $n^{p-1}$ chia hết cho $(p-1)^n + 1$.",
    hint: "Nếu $p = 2$, kiểm tra trực tiếp $n = 1, 2$. Với $p > 2$ lẻ, gọi $q$ là ước nguyên tố nhỏ nhất của $(p-1)^n + 1$. Sử dụng cấp $\\text{ord}_q(p-1) = 2n$ để chỉ ra mâu thuẫn giữa $q$ và $p$."
  },
  {
    id: "mp-imo-2003-p2",
    code: "IMO 2003 P2",
    title: "Phương Trình Diophantine Phân Thức & Vieta Flipping",
    category: "Số học Olympic (Number Theory)",
    source: "IMO",
    year: 2003,
    difficulty: "Đỉnh cao IMO",
    theorems: ["Vieta Jumping", "Đánh giá nghiệm phương trình bậc 2", "Nguyên lý cực hạn"],
    latexDescription: "Tìm tất cả các cặp số nguyên dương $(a, b)$ sao cho biểu thức $\\frac{a^2}{2ab^2 - b^3 + 1}$ là một số nguyên dương.",
    hint: "Đặt giá trị phân thức bằng $k \\in \\mathbb{Z}^+$. Biến đổi thành phương trình bậc hai theo $a$: $a^2 - 2k b^2 a + k(b^3 - 1) = 0$. Dùng bước nhảy Viète để chứng minh các họ nghiệm $(a, b) = (2b, b)$ hoặc $(a, 1)$."
  },
  {
    id: "mp-vmo-2016-p3",
    code: "VMO 2016 Bài 3",
    title: "Dãy Số Nguyên & Ước Chung Lớn Nhất Fibonacci",
    category: "Số học Olympic (Number Theory)",
    source: "VMO",
    year: 2016,
    difficulty: "Chuyên sâu VMO",
    theorems: ["Định lý Euclid", "Bổ đề Bézout", "Dãy truy hồi nguyên"],
    latexDescription: "Cho dãy số nguyên $(x_n)$ xác định bởi $x_0 = 2, x_1 = 3$ và $x_{n+1} = 3x_n - 2x_{n-1}$ với mọi $n \\ge 1$. Chứng minh rằng với mọi $m, n \\ge 1$, ta có $\\gcd(x_m, x_n) = x_{\\gcd(m, n)}$ khi và chỉ khi một điều kiện đồng dư thỏa mãn.",
    hint: "Tìm công thức tổng quát của $x_n = 2^n + 1$. Áp dụng tính chất $\\gcd(2^m + 1, 2^n + 1)$ liên hệ với số mũ đúng của $2$ trong phân tích của $m$ và $n$."
  },
  {
    id: "mp-usamo-2001-p2",
    code: "USAMO 2001 P2",
    title: "Định Lý Fermat Nhỏ & Chu Kỳ Modulo p",
    category: "Số học Olympic (Number Theory)",
    source: "USAMO",
    year: 2001,
    difficulty: "Cơ bản Olympic",
    theorems: ["Định lý Fermat nhỏ", "Hàm Euler", "Chu kỳ tuần hoàn"],
    latexDescription: "Cho $a, b$ là các số nguyên dương nguyên tố cùng nhau. Chứng minh rằng tồn tại vô số số nguyên dương $n$ sao cho $a^n + b^n$ không chia hết cho bất kỳ số chính phương nào lớn hơn $1$.",
    hint: "Sử dụng định lý Thặng dư Trung Hoa (CRT) để chọn số mũ $n$ sao cho $n \\not\\equiv 0 \\pmod p$ với các ước nguyên tố của $a+b$, kết hợp với tính chất của căn nguyên thủy."
  },
  {
    id: "mp-putnam-2001-a5",
    code: "Putnam 2001 A5",
    title: "Tính Chia Hết Của Tích Nhị Thức & Công Thức Legendre",
    category: "Số học Olympic (Number Theory)",
    source: "Putnam",
    year: 2001,
    difficulty: "Chuyên sâu VMO",
    theorems: ["Công thức Legendre", "Hệ số nhị thức", "Định giá p-adic"],
    latexDescription: "Chứng minh rằng với mọi số nguyên dương $a_1, a_2, \\dots, a_n$, số $\\frac{(a_1 + a_2 + \\dots + a_n)!}{a_1! \\, a_2! \\cdots a_n!}$ luôn là một số nguyên.",
    hint: "Áp dụng công thức Legendre tính định giá $v_p(m!) = \\sum_{k=1}^\\infty \\lfloor \\frac{m}{p^k} \\rfloor$. Sử dụng bất đẳng thức phần nguyên $\\sum_{i=1}^n \\lfloor x_i \\rfloor \\le \\lfloor \\sum_{i=1}^n x_i \\rfloor$."
  },
  {
    id: "mp-imo-2019-p4",
    code: "IMO 2019 P4",
    title: "Phương Trình Chia Hết Giai Thừa & Lũy Thừa Của 2",
    category: "Số học Olympic (Number Theory)",
    source: "IMO",
    year: 2019,
    difficulty: "Đỉnh cao IMO",
    theorems: ["Công thức Legendre cho v_2(k!)", "Định giá p-adic", "Kẹp bất đẳng thức"],
    latexDescription: "Tìm tất cả các cặp số nguyên dương $(k, n)$ sao cho: $k! = (2^n - 1)(2^n - 2)(2^n - 4) \\cdots (2^n - 2^{n-1})$.",
    hint: "Tách $k! = 2^{n(n-1)/2} \\prod_{i=1}^n (2^i - 1)$. Tính định giá $v_2(k!) = k - S_2(k)$. So sánh $k - S_2(k) = \\frac{n(n-1)}{2}$ và chặn giá trị của $k$ thông qua công thức xấp xỉ Stirling hoặc bất đẳng thức kích thước."
  },

  // ==========================================
  // CATEGORY 2: ĐẠI SỐ & PHƯƠNG TRÌNH HÀM
  // ==========================================
  {
    id: "mp-imo-2019-p1",
    code: "IMO 2019 P1",
    title: "Phương Trình Hàm Số Học Trên Tập Số Nguyên Z",
    category: "Đại số & Phương trình hàm (Algebra & FE)",
    source: "IMO",
    year: 2019,
    difficulty: "Chuyên sâu VMO",
    theorems: ["Tính cộng tính Cauchy", "Điểm bất động", "Phép thế đối xứng"],
    latexDescription: "Tìm tất cả các hàm số $f: \\mathbb{Z} \\to \\mathbb{Z}$ thỏa mãn phương trình: $f(2a) + 2f(b) = f(f(a + b))$ với mọi số nguyên $a, b$.",
    hint: "Cho $a = 0$, rút ra $f(f(b)) = 2f(b) + f(0)$. Thế ngược lại để thu được phương trình hàm cộng tính dạng Cauchy $f(a+b) + f(0) = f(a) + f(b)$. Suy ra $f(x) = kx + c$, sau đó thử lại để tìm $k = 0$ hoặc $k = 2$."
  },
  {
    id: "mp-imo-1977-p6",
    code: "IMO 1977 P6",
    title: "Phương Trình Hàm Tự Lồng Nhau f(f(n)) < f(n+1)",
    category: "Đại số & Phương trình hàm (Algebra & FE)",
    source: "IMO",
    year: 1977,
    difficulty: "Đỉnh cao IMO",
    theorems: ["Nguyên lý thứ tự tốt", "Tính đơn điệu ngặt", "Quy nạp toán học"],
    latexDescription: "Cho hàm số $f: \\mathbb{N}^* \\to \\mathbb{N}^*$ thỏa mãn $f(f(n)) < f(n + 1)$ với mọi $n \\in \\mathbb{N}^*$. Chứng minh rằng $f(n) = n$ với mọi $n$.",
    hint: "Chứng minh bằng phản chứng hoặc quy nạp rằng $f(n) \\ge n$ với mọi $n$. Sau đó dùng nguyên lý thứ tự tốt trên tập con các giá trị nhỏ nhất để kết luận tính đơn điệu tăng nghiêm ngặt của $f$, từ đó ép $f(n) = n$."
  },
  {
    id: "mp-vmo-2022-p2",
    code: "VMO 2022 Bài 2",
    title: "Phương Trình Hàm Toàn Ánh Trên Tập Số Thực R",
    category: "Đại số & Phương trình hàm (Algebra & FE)",
    source: "VMO",
    year: 2022,
    difficulty: "Chuyên sâu VMO",
    theorems: ["Toàn ánh", "Đơn ánh", "Phương trình hàm Cauchy"],
    latexDescription: "Tìm tất cả các hàm số $f: \\mathbb{R} \\to \\mathbb{R}$ thỏa mãn $f(x + y f(x)) = f(x) + x f(y)$ với mọi số thực $x, y$.",
    hint: "Nếu $f(x) \\equiv 0$, thỏa mãn. Nếu $f$ không đồng nhất bằng $0$, chứng minh $f(0) = 0$ và $f$ là đơn ánh. Thay $y = -1$ để tìm nghiệm duy nhất $f(x) = x$."
  },
  {
    id: "mp-usamo-2003-p1",
    code: "USAMO 2003 P1",
    title: "Đa Thức Hệ Số Nguyên & Giá Trị Chính Phương",
    category: "Đại số & Phương trình hàm (Algebra & FE)",
    source: "USAMO",
    year: 2003,
    difficulty: "Cơ bản Olympic",
    theorems: ["Định lý Bézout", "Nghiệm đa thức", "Tính chất chia hết a - b | P(a) - P(b)"],
    latexDescription: "Cho $P(x)$ là một đa thức có hệ số nguyên. Chứng minh rằng nếu $a, b, c, d$ là các số nguyên phân biệt thỏa mãn $P(a) = P(b) = P(c) = P(d) = 5$, thì không tồn tại số nguyên $k$ nào sao cho $P(k) = 8$.",
    hint: "Xét $Q(x) = P(x) - 5$. Ta có $Q(x) = (x-a)(x-b)(x-c)(x-d) R(x)$ với $R(x) \\in \\mathbb{Z}[x]$. Giả sử $P(k) = 8 \\implies (k-a)(k-b)(k-c)(k-d) R(k) = 3$. Chỉ ra số $3$ không thể phân tích thành tích của 4 số nguyên phân biệt."
  },
  {
    id: "mp-vmo-2019-p1",
    code: "VMO 2019 Bài 1",
    title: "Giới Hạn Dãy Số Thực Truy Hồi & Bổ Đề Stolz-Cesaro",
    category: "Đại số & Phương trình hàm (Algebra & FE)",
    source: "VMO",
    year: 2019,
    difficulty: "Chuyên sâu VMO",
    theorems: ["Định lý kẹp", "Dãy đơn điệu bị chặn", "Định lý Weierstrass"],
    latexDescription: "Cho dãy số thực $(x_n)$ xác định bởi $x_1 = 1$ và $x_{n+1} = \\sqrt{x_n^2 + x_n + 1} - \\sqrt{x_n^2 - x_n + 1}$ với mọi $n \\ge 1$. Chứng minh rằng dãy $(x_n)$ hội tụ về $0$ và tính giới hạn $\\lim_{n \\to \\infty} (n \\cdot x_n)$.",
    hint: "Nhân liên hợp biểu thức: $x_{n+1} = \\frac{2x_n}{\\sqrt{x_n^2+x_n+1} + \\sqrt{x_n^2-x_n+1}} < x_n$. Dãy giảm và bị chặn dưới bởi 0 nên có giới hạn $L = 0$. Sử dụng khai triển Maclaurin của căn thức và bổ đề Stolz-Cesaro để tìm giới hạn bậc 1."
  },
  {
    id: "mp-usamo-2019-p4",
    code: "USAMO 2019 P4",
    title: "Phương Trình Hàm Tự Đối Hợp & Điểm Triệt Tiêu",
    category: "Đại số & Phương trình hàm (Algebra & FE)",
    source: "USAMO",
    year: 2019,
    difficulty: "Nâng cao TST",
    theorems: ["Phương trình hàm Cauchy", "Song ánh", "Đối hợp f(f(x)) = x"],
    latexDescription: "Tìm tất cả các hàm số $f: \\mathbb{R} \\to \\mathbb{R}$ thỏa mãn $f(x + f(y)) = f(x) + y$ với mọi số thực $x, y$.",
    hint: "Chứng minh $f$ toàn ánh nhờ biến $+y$ tự do, sau đó chứng minh $f$ đơn ánh. Suy ra $f$ song ánh. Chứng minh $f(0) = 0$ và $f(f(y)) = y$ (tự đối hợp). Đổi biến đưa về phương trình Cauchy cộng tính $f(x+t) = f(x) + f(t)$."
  },
  {
    id: "mp-imo-2015-p5",
    code: "IMO 2015 P5",
    title: "Phương Trình Hàm Tuyến Tính & Đơn Điệu Trên R",
    category: "Đại số & Phương trình hàm (Algebra & FE)",
    source: "IMO",
    year: 2015,
    difficulty: "Đỉnh cao IMO",
    theorems: ["Đơn ánh", "Điểm bất động", "Triệt tiêu số hạng"],
    latexDescription: "Tìm tất cả các hàm số $f: \\mathbb{R} \\to \\mathbb{R}$ thỏa mãn phương trình: $f(x + f(x + y)) + f(x y) = x + f(x + y) + y f(x)$ với mọi số thực $x, y$.",
    hint: "Đặt $x = 0$ để khảo sát $f(f(y))$. Khai thác triệt để tính chất đơn vị và chứng minh nghiệm duy nhất là $f(x) = x$ và $f(x) = 2 - x$."
  },
  {
    id: "mp-vmo-2023-p1",
    code: "VMO 2023 Bài 1",
    title: "Dãy Số Phân Thức Truy Hồi & Điểm Bất Động Kép",
    category: "Đại số & Phương trình hàm (Algebra & FE)",
    source: "VMO",
    year: 2023,
    difficulty: "Chuyên sâu VMO",
    theorems: ["Ánh xạ co Banach", "Điểm bất động f(x) = x", "Sai phân tỉ số"],
    latexDescription: "Cho dãy số $(u_n)$ xác định bởi $u_1 = 2$ và $u_{n+1} = \\frac{u_n^2 + 2}{2u_n - 1}$ với mọi $n \\ge 1$. Chứng minh dãy số có giới hạn hữu hạn và tìm giới hạn đó.",
    hint: "Giải phương trình điểm bất động $x = \\frac{x^2+2}{2x-1} \\iff x^2 - x - 2 = 0 \\implies x = 2$ hoặc $x = -1$. Khảo sát hiệu $u_{n+1} - 2 = \\frac{(u_n - 2)^2}{2u_n - 1}$ để chứng minh tốc độ hội tụ siêu nhanh."
  },

  // ==========================================
  // CATEGORY 3: HÌNH HỌC PHẲNG (GEOMETRY)
  // ==========================================
  {
    id: "mp-imo-2008-p4",
    code: "IMO 2008 P4",
    title: "Trục Đẳng Phương & Cấu Hình Tứ Giác Nội Tiếp",
    category: "Hình học phẳng (Geometry)",
    source: "IMO",
    year: 2008,
    difficulty: "Chuyên sâu VMO",
    theorems: ["Trục đẳng phương", "Tâm đẳng phương", "Phương tích điểm"],
    latexDescription: "Cho tam giác nhọn $ABC$ có trực tâm $H$. Gọi $\\omega_1$ là đường tròn đường kính $AH$, $\\omega_2$ là đường tròn đường kính $BC$. Giả sử một đường tròn $\\omega_3$ đi qua $B, C$ cắt $\\omega_1$ tại $P$ và $Q$. Chứng minh rằng đường thẳng $PQ$ đi qua chân đường cao hạ từ $A$.",
    hint: "Xét ba đường tròn $\\omega_1, \\omega_2, \\omega_3$. Trục đẳng phương của $\\omega_1$ và $\\omega_2$ là đường thẳng nối hai chân đường cao $EF$. Trục đẳng phương của $\\omega_2$ và $\\omega_3$ là $BC$. Trục đẳng phương của $\\omega_1$ và $\\omega_3$ là $PQ$. Áp dụng định lý Tâm đẳng phương, ba trục này đồng quy tại giao điểm của $EF$ và $BC$."
  },
  {
    id: "mp-vmo-2020-p4",
    code: "VMO 2020 Bài 4",
    title: "Hàng Điểm Điều Hòa & Trực Tâm Tam Giác",
    category: "Hình học phẳng (Geometry)",
    source: "VMO",
    year: 2020,
    difficulty: "Nâng cao TST",
    theorems: ["Hàng điểm điều hòa", "Chùm điều hòa", "Hệ thức Newton"],
    latexDescription: "Cho tam giác nhọn $ABC$ nội tiếp đường tròn $(O)$ có trực tâm $H$ và đường cao $AD$. Điểm $P$ di chuyển trên cung nhỏ $BC$ của $(O)$. Đường thẳng qua $D$ vuông góc với $OP$ cắt $AB, AC$ lần lượt tại $X, Y$. Chứng minh rằng $D$ luôn là trung điểm của $XY$.",
    hint: "Kẻ đường kính $AA'$ của $(O)$. Kéo dài $AD$ cắt $(O)$ tại $H'$ (đối xứng của $H$ qua $BC$). Dùng phép chiếu xuyên tâm lên các cạnh và tính chất tỉ số kép $(D, \\infty; X, Y) = -1$ để kết luận $D$ là trung điểm."
  },
  {
    id: "mp-imo-2014-p4",
    code: "IMO 2014 P4",
    title: "Đường Tròn Nội Tiếp & Điểm Tiếp Xúc Điều Hòa",
    category: "Hình học phẳng (Geometry)",
    source: "IMO",
    year: 2014,
    difficulty: "Chuyên sâu VMO",
    theorems: ["Tam giác đồng dạng", "Tứ giác điều hòa", "Phương tích"],
    latexDescription: "Cho các điểm $P, Q$ nằm trên cạnh $BC$ của tam giác nhọn $ABC$ sao cho $\\angle PAB = \\angle BCA$ và $\\angle QAC = \\angle ABC$. Điểm $M$ và $N$ lần lượt nằm trên các tia $AP$ và $AQ$ sao cho $P$ là trung điểm $AM$, $Q$ là trung điểm $AN$. Chứng minh rằng giao điểm của $BM$ và $CN$ nằm trên đường tròn ngoại tiếp tam giác $ABC$.",
    hint: "Chứng minh tam giác $ABP$ đồng dạng với tam giác $CBA$, và tam giác $ACQ$ đồng dạng với tam giác $BCA$. Suy ra hệ thức tỉ số $AP^2 = BP \\cdot CP$. Sử dụng phép biến đổi góc định hướng để chứng minh 4 điểm cùng thuộc đường tròn."
  },
  {
    id: "mp-usamo-2014-p1",
    code: "USAMO 2014 P1",
    title: "Hàng Điểm Điều Hòa & Tiếp Tuyến Chung Cố Định",
    category: "Hình học phẳng (Geometry)",
    source: "USAMO",
    year: 2014,
    difficulty: "Chuyên sâu VMO",
    theorems: ["Đường tròn Apollonius", "Hàng điều hòa", "Cực và đối cực"],
    latexDescription: "Cho tam giác $ABC$ và phân giác trong $AD$. Điểm $M$ thuộc đoạn thẳng $AD$. Đường tròn ngoại tiếp tam giác $BMD$ cắt cạnh $AB$ tại $P$, đường tròn ngoại tiếp tam giác $CMD$ cắt cạnh $AC$ tại $Q$. Chứng minh rằng khi $M$ thay đổi, tiếp tuyến chung của hai đường tròn luôn đi qua một điểm cố định.",
    hint: "Sử dụng tính chất phương tích từ $A$: $AP \\cdot AB = AM \\cdot AD = AQ \\cdot AC$. Chứng minh tứ giác $BPQC$ nội tiếp, suy ra tâm đẳng phương và tính chất điều hòa của chùm phân giác."
  },
  {
    id: "mp-rmm-2020-p3",
    code: "RMM 2020 P3",
    title: "Cấu Hình Điểm Miquel & Phép Vị Tự Quay",
    category: "Hình học phẳng (Geometry)",
    source: "RMM",
    year: 2020,
    difficulty: "Đỉnh cao IMO",
    theorems: ["Điểm Miquel", "Phép vị tự quay (Spiral Similarity)", "Đường thẳng Euler"],
    latexDescription: "Cho tứ giác toàn phần tạo bởi bốn đường thẳng. Chứng minh rằng bốn đường tròn ngoại tiếp của bốn tam giác cùng đi qua một điểm duy nhất $M$ (Điểm Miquel) và tâm của bốn đường tròn này cùng nằm trên một đường tròn đi qua $M$.",
    hint: "Sử dụng góc định hướng giữa các đường thẳng để chứng minh giao điểm của hai đường tròn bất kỳ luôn nằm trên hai đường tròn còn lại. Dùng định lý vị tự quay biến hai đoạn thẳng thành nhau để chỉ ra tâm vị tự quay chính là điểm Miquel."
  },
  {
    id: "mp-vietnam-tst-2018-p2",
    code: "Vietnam TST 2018 Bài 2",
    title: "Cực & Đối Cực Kết Hợp Định Lý Desargues",
    category: "Hình học phẳng (Geometry)",
    source: "VMO",
    year: 2018,
    difficulty: "Đỉnh cao IMO",
    theorems: ["Định lý Desargues", "Lý thuyết Cực & Đối cực", "Định lý La Hire"],
    latexDescription: "Cho tứ giác $ABCD$ nội tiếp đường tròn $(O)$. Gọi $P = AB \\cap CD, Q = AD \\cap BC$. Tiếp tuyến tại $A$ và $C$ của $(O)$ cắt nhau tại $T$. Chứng minh rằng ba điểm $P, Q, T$ thẳng hàng.",
    hint: "Đường đối cực của $T$ là $AC$. Đường đối cực của $P$ là $QI$ với $I = AC \\cap BD$. Theo định lý La Hire, vì $I \\in \\text{polar}(T)$ nên $T \\in \\text{polar}(I)$. Suy ra $P, Q, T$ cùng nằm trên đường đối cực của điểm $I$."
  },
  {
    id: "mp-imo-2016-p1",
    code: "IMO 2016 P1",
    title: "Tứ Giác Điều Hòa & Tiếp Tuyến Đường Tròn Ngoại Tiếp",
    category: "Hình học phẳng (Geometry)",
    source: "IMO",
    year: 2016,
    difficulty: "Chuyên sâu VMO",
    theorems: ["Tứ giác điều hòa", "Tiếp tuyến cắt nhau", "Phương tích"],
    latexDescription: "Cho tam giác $ABC$ có $AB < AC$. Đường tròn nội tiếp $(I)$ tiếp xúc $BC, CA, AB$ tại $D, E, F$. Kẻ tiếp tuyến thứ hai từ $D$ đến đường tròn ngoại tiếp tam giác $AEF$ cắt $EF$ tại $K$. Chứng minh rằng $AK \\parallel BC$.",
    hint: "Sử dụng tính chất của tứ giác điều hòa: tiếp tuyến tại các đỉnh đối diện cắt nhau trên đường chéo nối hai đỉnh còn lại. Kết hợp với tính chất đối xứng của tâm nội tiếp $I$."
  },
  {
    id: "mp-imo-2018-p1",
    code: "IMO 2018 P1",
    title: "Tam Giác Nội Tiếp & Điểm Cố Định Trên Đường Tròn",
    category: "Hình học phẳng (Geometry)",
    source: "IMO",
    year: 2018,
    difficulty: "Chuyên sâu VMO",
    theorems: ["Đường tròn Euler", "Góc chắn cung", "Định lý Carnot"],
    latexDescription: "Cho tam giác nhọn $ABC$ nội tiếp $(O)$. Lấy điểm $D$ trên cạnh $BC$. Dựng các đường tròn ngoại tiếp tam giác $ABD$ và $ACD$. Kẻ các tiếp tuyến tại $A$ đến hai đường tròn này. Chứng minh rằng giao điểm thứ hai của hai tiếp tuyến với các đường tròn luôn nằm trên một đường tròn cố định.",
    hint: "Chứng minh tam giác đồng dạng từ hai góc tạo bởi tia tiếp tuyến và dây cung. Sử dụng phép biến hình vị tự quay tâm $A$ để xác định quỹ tích."
  },

  // ==========================================
  // CATEGORY 4: TỔ HỢP & ĐỒ THỊ (COMBINATORICS)
  // ==========================================
  {
    id: "mp-imo-2011-p2",
    code: "IMO 2011 P2",
    title: "Cối Xay Gió Tổ Hợp (The Windmill Problem - Terence Tao)",
    category: "Tổ hợp & Đồ thị (Combinatorics)",
    source: "IMO",
    year: 2011,
    difficulty: "Đỉnh cao IMO",
    theorems: ["Nguyên lý Bất biến", "Hình học tổ hợp", "Phân chia nửa mặt phẳng"],
    latexDescription: "Cho tập $S$ gồm $n$ điểm trên mặt phẳng ở vị trí tổng quát (không có 3 điểm nào thẳng hàng). Một cối xay gió quay một đường thẳng $\\ell$ có định hướng qua một điểm xoay $P \\in S$. Khi $\\ell$ chạm điểm $Q \\in S$ tiếp theo, trục xoay chuyển sang $Q$. Chứng minh rằng luôn có thể chọn $\\ell$ ban đầu sao cho cối xay gió này sẽ làm điểm xoay tại mọi điểm của $S$ vô hạn lần.",
    hint: "Thiết lập bất biến: Số lượng điểm nằm ở nửa mặt phẳng bên trái của đường thẳng có định hướng $\\ell$ không thay đổi khi chuyển trục xoay! Sau khi quay đủ $180^\\circ$, hai nửa mặt phẳng đổi chỗ cho nhau, buộc đường thẳng phải quét qua toàn bộ tất cả các điểm của tập hợp."
  },
  {
    id: "mp-usamo-2015-p1",
    code: "USAMO 2015 P1",
    title: "Trò Chơi Bàn Cờ Lưới Ô Vuông & Hàm Thế Vị",
    category: "Tổ hợp & Đồ thị (Combinatorics)",
    source: "USAMO",
    year: 2015,
    difficulty: "Chuyên sâu VMO",
    theorems: ["Nguyên lý cực hạn", "Bất biến parity", "Phân hoạch"],
    latexDescription: "Một bàn cờ kích thước $n \\times n$ được điền các số nguyên. Mỗi bước cho phép chọn một ô vuông và tăng tất cả các ô có chung cạnh với nó lên $1$ đơn vị. Tìm điều kiện của $n$ để từ mọi trạng thái ban đầu, ta luôn có thể đưa tất cả các ô trên bàn cờ về cùng một giá trị.",
    hint: "Xây dựng hệ phương trình tuyến tính trên trường $\\mathbb{Z}/2\\mathbb{Z}$ hoặc sử dụng kỹ thuật tô màu bàn cờ quân cờ vua. Kiểm tra tính khả nghịch của ma trận kề lưới để xác định điều kiện chẵn/lẻ của $n$."
  },
  {
    id: "mp-vmo-2023-p5",
    code: "VMO 2023 Bài 5",
    title: "Bất Biến & Đơn Biến Trên Tập Hợp Phân Hoạch",
    category: "Tổ hợp & Đồ thị (Combinatorics)",
    source: "VMO",
    year: 2023,
    difficulty: "Chuyên sâu VMO",
    theorems: ["Bất biến số dư", "Hàm thế vị đơn biến", "Quy tắc dừng"],
    latexDescription: "Trên bảng viết $n$ số nguyên dương. Mỗi lần thực hiện thay thế một cặp số $(a, b)$ với $a > b$ bằng $(a - b, 2b)$. Chứng minh rằng sau một số hữu hạn bước, trên bảng luôn xuất hiện số $0$.",
    hint: "Xét tổng $S = \\sum x_i$ là bất biến. Với mỗi số $x_i$, xét định giá $v_2(x_i)$. Thiết lập hàm thế vị $\\Phi = \\sum 2^{-v_2(x_i)}$ và chứng minh $\\Phi$ giảm nghiêm ngặt sau mỗi thao tác."
  },
  {
    id: "mp-vietnam-tst-2020-p3",
    code: "Vietnam TST 2020 Bài 3",
    title: "Định Lý Ramsey & Bài Toán Tô Màu Cạnh Đồ Thị",
    category: "Tổ hợp & Đồ thị (Combinatorics)",
    source: "VMO",
    year: 2020,
    difficulty: "Đỉnh cao IMO",
    theorems: ["Định lý Ramsey R(k, l)", "Định lý Turán", "Đếm hai cách"],
    latexDescription: "Cho đồ thị đầy đủ $K_n$ với các cạnh được tô bằng 2 màu đỏ và xanh. Giả sử trong mọi đồ thị con $4$ đỉnh đều có ít nhất một tam giác đơn sắc. Chứng minh rằng $n$ có thể phân hoạch thành các khối liên thông thỏa mãn điều kiện cực đại.",
    hint: "Áp dụng định lý Ramsey $R(3, 3) = 6$. Sử dụng phương pháp đếm hai cách số lượng tam giác đơn sắc trong đồ thị và thiết lập bất đẳng thức giữa bậc đỏ và bậc xanh của từng đỉnh."
  },
  {
    id: "mp-imo-2017-p3",
    code: "IMO 2017 P3",
    title: "Thợ Săn Và Thỏ Trên Đồ Thị Lưới (Hunter & Rabbit)",
    category: "Tổ hợp & Đồ thị (Combinatorics)",
    source: "IMO",
    year: 2017,
    difficulty: "Đỉnh cao IMO",
    theorems: ["Lý thuyết trò chơi", "Đồ thị song phần", "Chiến lược minimax"],
    latexDescription: "Một con thỏ và một thợ săn chơi trò chơi trên một đồ thị liên thông $G$. Ban đầu thỏ ở một đỉnh và thợ săn không biết vị trí của thỏ. Mỗi lượt, thợ săn chọn một đỉnh $v$ và thiết bị định vị cho biết khoảng cách ngắn nhất $d(v, \\text{thỏ})$. Sau đó thỏ nhảy sang một đỉnh kề. Tìm điều kiện cần và đủ của đồ thị để thợ săn luôn có chiến lược bắt được thỏ sau hữu hạn bước.",
    hint: "Khảo sát tính hai phía (bipartite) của đồ thị. Nếu đồ thị không hai phía, thỏ có thể đổi tính chẵn lẻ của chu trình. Xây dựng tập hợp các đỉnh khả dĩ thỏ có thể đứng tại mỗi bước và chứng minh kích thước tập này co dần về 1."
  },
  {
    id: "mp-imo-1989-p3",
    code: "IMO 1989 P3",
    title: "Đếm Hai Cách Số Bộ Ba Điểm & Góc Nhọn",
    category: "Tổ hợp & Đồ thị (Combinatorics)",
    source: "IMO",
    year: 1989,
    difficulty: "Đỉnh cao IMO",
    theorems: ["Đếm hai cách", "Bất đẳng thức Cauchy-Schwarz", "Tổ hợp hình học"],
    latexDescription: "Cho tập $S$ gồm $n$ điểm trên mặt phẳng sao cho không có 3 điểm nào thẳng hàng. Chứng minh rằng tồn tại ít nhất $\\binom{n-3}{2}$ bộ ba điểm tạo thành tam giác có ít nhất một góc tù.",
    hint: "Đếm số góc tù bằng cách đếm theo từng điểm: với mỗi điểm $P$, xét các tia nối tới $n-1$ điểm còn lại. Vì tổng các góc quanh một điểm bằng $360^\\circ$, số góc tù đỉnh $P$ có thể được chặn dưới bằng Cauchy-Schwarz."
  },
  {
    id: "mp-imo-2014-p2",
    code: "IMO 2014 P2",
    title: "Phủ Bàn Cờ Bằng Khối Domino & Kỹ Thuật Đồ Thị",
    category: "Tổ hợp & Đồ thị (Combinatorics)",
    source: "IMO",
    year: 2014,
    difficulty: "Chuyên sâu VMO",
    theorems: ["Định lý Hall về hôn nhân", "Đồ thị hai phía", "Tô màu ô"],
    latexDescription: "Cho bàn cờ kích thước $n \\times n$. Một tập hợp các quân domino được đặt lên bàn cờ sao cho không có hai quân nào đè lên nhau. Xác định số quân domino tối đa có thể đặt sao cho mọi ô trống đều kề với ít nhất một ô trống khác.",
    hint: "Mô hình hóa tập các ô trống thành đồ thị cảm ứng. Sử dụng kỹ thuật tô màu bàn cờ vua hai màu để đánh giá mối liên hệ giữa số ô đen và số ô trắng còn lại."
  },

  // ==========================================
  // CATEGORY 5: BẤT ĐẲNG THỨC & CỰC TRỊ
  // ==========================================
  {
    id: "mp-imo-2020-p2",
    code: "IMO 2020 P2",
    title: "Bất Đẳng Thức 4 Biến Thực Trọng Số Lũy Thừa",
    category: "Bất đẳng thức & Cực trị (Inequalities)",
    source: "IMO",
    year: 2020,
    difficulty: "Đỉnh cao IMO",
    theorems: ["BĐT Cauchy-Schwarz", "Hàm lồi logarit", "Kỹ thuật dồn biến"],
    latexDescription: "Cho các số thực $a, b, c, d$ thỏa mãn $a \\ge b \\ge c \\ge d > 0$ và $a + b + c + d = 1$. Chứng minh rằng: $(a + 2b + 3c + 4d) a^a b^b c^c d^d < 1$.",
    hint: "Áp dụng bất đẳng thức AM-GM có trọng số (hoặc Jensen cho hàm logarit). Chú ý rằng $a^a b^b c^c d^d \\le a^a a^b a^c a^d = a^{a+b+c+d} = a$. Đánh giá đại lượng $a + 2b + 3c + 4d \\le 4(a+b+c+d) - 3a = 4 - 3a$ để triệt tiêu biến."
  },
  {
    id: "mp-imo-2001-p2",
    code: "IMO 2001 P2",
    title: "Bất Đẳng Thức Hoán Vị Phân Thức Căn Bậc Hai",
    category: "Bất đẳng thức & Cực trị (Inequalities)",
    source: "IMO",
    year: 2001,
    difficulty: "Chuyên sâu VMO",
    theorems: ["BĐT Hölder", "AM-GM", "Đổi biến chuẩn hóa"],
    latexDescription: "Cho các số thực dương $a, b, c$. Chứng minh bất đẳng thức: $\\frac{a}{\\sqrt{a^2 + 8bc}} + \\frac{b}{\\sqrt{b^2 + 8ca}} + \\frac{c}{\\sqrt{c^2 + 8ab}} \\ge 1$.",
    hint: "Áp dụng Bất đẳng thức Hölder cho 3 bộ số với số mũ $(1, 1, 1)$: $(\\sum \\frac{a}{\\sqrt{a^2+8bc}})^2 \\cdot \\sum a(a^2+8bc) \\ge (a+b+c)^3$. Khai triển $(a+b+c)^3 - (a^3+b^3+c^3+24abc) = 3(a+b)(b+c)(c+a) - 24abc \\ge 0$ nhờ AM-GM."
  },
  {
    id: "mp-vmo-2018-p3",
    code: "VMO 2018 Bài 3",
    title: "Bất Đẳng Thức Đối Xứng Phân Thức & Đổi Biến p, q, r",
    category: "Bất đẳng thức & Cực trị (Inequalities)",
    source: "VMO",
    year: 2018,
    difficulty: "Chuyên sâu VMO",
    theorems: ["Phương pháp p, q, r", "BĐT Schur", "Đạo hàm một biến"],
    latexDescription: "Cho các số thực dương $a, b, c$ thỏa mãn $a b c = 1$. Tìm giá trị nhỏ nhất của biểu thức phân thức đối xứng: $P = \\frac{1}{a^2 - a + 1} + \\frac{1}{b^2 - b + 1} + \\frac{1}{c^2 - c + 1}$.",
    hint: "Quy đồng và biểu diễn biểu thức qua $p = a+b+c, q = ab+bc+ca$ và $r = abc = 1$. Dùng tính chất hàm bậc nhất theo biến $r$ để dồn biến về trường hợp có hai biến bằng nhau $a = b$."
  },
  {
    id: "mp-usa-tst-2015-p2",
    code: "USA TST 2015 P2",
    title: "Bất Đẳng Thức Schur & Kỹ Thuật Phân Tích Bình Phương SOS",
    category: "Bất đẳng thức & Cực trị (Inequalities)",
    source: "USAMO",
    year: 2015,
    difficulty: "Nâng cao TST",
    theorems: ["Phương pháp SOS", "BĐT Schur bậc 4", "Dồn biến Equal Variables"],
    latexDescription: "Cho các số thực dương $a, b, c$. Chứng minh rằng: $a^4 + b^4 + c^4 + a b c (a + b + c) \\ge 2 (a^2 b^2 + b^2 c^2 + c^2 a^2)$.",
    hint: "Biến đổi bất đẳng thức về dạng chính tắc SOS: $S_a (b-c)^2 + S_b (c-a)^2 + S_c (a-b)^2 \\ge 0$. Với giả sử $a \\ge b \\ge c$, kiểm tra tiêu chuẩn $S_b \\ge 0$ và $S_b + S_a \\ge 0$."
  },
  {
    id: "mp-apmo-2021-p2",
    code: "APMO 2021 P2",
    title: "Bất Đẳng Thức 3 Biến Với Điều Kiện abc = 1",
    category: "Bất đẳng thức & Cực trị (Inequalities)",
    source: "APMO",
    year: 2021,
    difficulty: "Chuyên sâu VMO",
    theorems: ["AM-GM", "Cauchy-Schwarz dạng Engel", "Đổi biến chuẩn hóa"],
    latexDescription: "Cho các số thực dương $a, b, c$ thỏa mãn $a b c = 1$. Chứng minh rằng: $\\frac{a^2 + 1}{b + c} + \\frac{b^2 + 1}{c + a} + \\frac{c^2 + 1}{a + b} \\ge 3$.",
    hint: "Tách biểu thức thành $\\sum \\frac{a^2}{b+c} + \\sum \\frac{1}{b+c}$. Áp dụng Cauchy-Schwarz dạng Engel: $\\sum \\frac{a^2}{b+c} \\ge \\frac{(a+b+c)^2}{2(a+b+c)} = \\frac{a+b+c}{2} \\ge \\frac{3}{2}$. Phần còn lại dùng AM-GM cho mẫu số."
  },
  {
    id: "mp-imo-2005-p3",
    code: "IMO 2005 P3",
    title: "Bất Đẳng Thức Phân Thức Huyền Thoại IMO 2005",
    category: "Bất đẳng thức & Cực trị (Inequalities)",
    source: "IMO",
    year: 2005,
    difficulty: "Đỉnh cao IMO",
    theorems: ["Cauchy-Schwarz đảo", "SOS phân thức", "AM-GM ngược dấu"],
    latexDescription: "Cho các số thực dương $x, y, z$ thỏa mãn $x y z \\ge 1$. Chứng minh rằng: $\\frac{x^5 - x^2}{x^5 + y^2 + z^2} + \\frac{y^5 - y^2}{y^5 + z^2 + x^2} + \\frac{z^5 - z^2}{z^5 + x^2 + y^2} \\ge 0$.",
    hint: "Viết lại từng phân thức thành $1 - \\frac{x^2+y^2+z^2}{x^5+y^2+z^2}$. Sử dụng Cauchy-Schwarz đánh giá $(x^5+y^2+z^2)(1/x + y^2+z^2) \\ge (x^2+y^2+z^2)^2$. Quy bất đẳng thức về việc chứng minh $x^2+y^2+z^2 \\ge xy+yz+zx$."
  },
  {
    id: "mp-vmo-2015-p3",
    code: "VMO 2015 Bài 3",
    title: "Bất Đẳng Thức Đối Xứng Dồn Biến Về Hai Biến Bằng Nhau",
    category: "Bất đẳng thức & Cực trị (Inequalities)",
    source: "VMO",
    year: 2015,
    difficulty: "Chuyên sâu VMO",
    theorems: ["Phương pháp Equal Variables (EV)", "Đạo hàm một biến", "AM-GM"],
    latexDescription: "Cho các số thực không âm $a, b, c$ có tổng $a + b + c = 3$. Tìm giá trị lớn nhất của biểu thức: $P = (a^2 - ab + b^2)(b^2 - bc + c^2)(c^2 - ca + a^2)$.",
    hint: "Chứng minh rằng khi dồn hai biến về bằng nhau $b = c = t = \\frac{3-a}{2}$, giá trị của biểu thức tăng lên. Khảo sát hàm số một biến $g(a) = P(a, t, t)$ trên đoạn $[0, 3]$ bằng đạo hàm để tìm GTLN tại biên hoặc tâm."
  },

  // ==========================================
  // CATEGORY 6: GIẢI TÍCH & ĐẠI SỐ PUTNAM
  // ==========================================
  {
    id: "mp-putnam-2019-a2",
    code: "Putnam 2019 A2",
    title: "Định Thức Ma Trận Giao Hoán det(AB - BA)",
    category: "Giải tích & Đại số Putnam (Putnam & Higher Math)",
    source: "Putnam",
    year: 2019,
    difficulty: "Nâng cao TST",
    theorems: ["Đại số tuyến tính", "Vết ma trận tr(M)", "Đa thức đặc trưng"],
    latexDescription: "Cho $A, B$ là hai ma trận vuông cấp $n$ thỏa mãn $A B - B A = A$. Chứng minh rằng $\\det(A) = 0$ và tất cả các giá trị riêng của $A$ đều bằng $0$.",
    hint: "Quy nạp theo $k$: Chứng minh $A^k B - B A^k = k A^k$. Lấy vết hai vế: $\\text{tr}(A^k B - B A^k) = 0 \\implies k \\cdot \\text{tr}(A^k) = 0 \\implies \\text{tr}(A^k) = 0$ với mọi $k \\ge 1$. Theo công thức Newton cho vết, đa thức đặc trưng của $A$ là $\\lambda^n = 0$."
  },
  {
    id: "mp-putnam-2020-a1",
    code: "Putnam 2020 A1",
    title: "Đa Thức Nhân Tính & Điểm Bất Động",
    category: "Giải tích & Đại số Putnam (Putnam & Higher Math)",
    source: "Putnam",
    year: 2020,
    difficulty: "Chuyên sâu VMO",
    theorems: ["Bổ đề Gauss", "Phương trình hàm đa thức", "Nghiệm phức"],
    latexDescription: "Tìm tất cả các đa thức $P(x)$ với hệ số thực thỏa mãn đẳng thức $P(x^2 + 1) = [P(x)]^2 + 1$ với mọi số thực $x$.",
    hint: "Đặt dãy $x_0 = c, x_{n+1} = x_n^2 + 1$. Nếu $P(x) \\ne x$, số nghiệm của $P(x) - x$ là hữu hạn. Sử dụng tính phân kỳ của dãy $x_n$ để suy ra nghiệm duy nhất là $P(x) = x$."
  },
  {
    id: "mp-putnam-2017-b1",
    code: "Putnam 2017 B1",
    title: "Bất Đẳng Thức Tích Phân Xác Định & Đạo Hàm Bậc Hai",
    category: "Giải tích & Đại số Putnam (Putnam & Higher Math)",
    source: "Putnam",
    year: 2017,
    difficulty: "Chuyên sâu VMO",
    theorems: ["BĐT Cauchy-Schwarz tích phân", "Công thức tích phân từng phần", "Định lý Wirtinger"],
    latexDescription: "Cho hàm số $f$ khả vi liên tục hai lần trên đoạn $[0, 1]$ thỏa mãn $f(0) = f(1) = 0$. Chứng minh rằng: $\\int_0^1 [f'(x)]^2 \\, dx \\le \\frac{1}{\\pi^2} \\int_0^1 [f''(x)]^2 \\, dx$.",
    hint: "Khai triển chuỗi Fourier sin của $f(x) = \\sum_{n=1}^\\infty b_n \\sin(n\\pi x)$. Tính đạo hàm từng cấp và áp dụng đẳng thức Parseval: $\\int [f']^2 = \\frac{\\pi^2}{2} \\sum n^2 b_n^2$ và $\\int [f'']^2 = \\frac{\\pi^4}{2} \\sum n^4 b_n^2$. Do $n^2 \\le n^4$, bất đẳng thức hiển nhiên đúng."
  },
  {
    id: "mp-putnam-2018-b2",
    code: "Putnam 2018 B2",
    title: "Chuỗi Hội Tụ & Khai Triển Taylor Cổ Điển",
    category: "Giải tích & Đại số Putnam (Putnam & Higher Math)",
    source: "Putnam",
    year: 2018,
    difficulty: "Nâng cao TST",
    theorems: ["Chuỗi số thực", "Hàm hyperbolic $\\sinh, \\cosh$", "Khai triển Taylor"],
    latexDescription: "Tính tổng chính xác của chuỗi số vô hạn: $S = \\sum_{n=1}^\\infty \\frac{n}{(2n+1)!}$.",
    hint: "Viết tử số thành $n = \\frac{1}{2}( (2n+1) - 1 )$. Tách chuỗi thành $S = \\frac{1}{2} \\sum_{n=1}^\\infty \\frac{1}{(2n)!} - \\frac{1}{2} \\sum_{n=1}^\\infty \\frac{1}{(2n+1)!}$. Sử dụng khai triển Taylor của hàm số $e^x$ và $e^{-x}$ tại $x = 1$ để rút ra kết quả $S = \\frac{1}{2e}$."
  }
];
