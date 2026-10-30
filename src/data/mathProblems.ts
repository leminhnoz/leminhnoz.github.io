export interface MathProblem {
  id: string;
  code: string;
  title: string;
  category: string;
  source: "IMO" | "USAMO" | "VMO" | "Putnam" | "RMM" | "APMO";
  year: number;
  url: string;
  difficulty: "Cơ bản Olympic" | "Chuyên sâu VMO" | "Nâng cao TST" | "Đỉnh cao IMO";
  theorems: string[];
  latexDescription: string;
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
  // --- Category: Số học Olympic ---
  {
    id: "mp-imo-1988-p6",
    code: "IMO 1988 P6",
    title: "Huyền Thoại Vieta Jumping (The Root Flipping Problem)",
    category: "Số học Olympic (Number Theory)",
    source: "IMO",
    year: 1988,
    url: "https://artofproblemsolving.com/community/c3158_imo",
    difficulty: "Đỉnh cao IMO",
    theorems: ["Vieta Jumping", "Nguyên lý Cực hạn", "Phương trình bậc hai"],
    latexDescription: "Cho $a, b$ là các số nguyên dương sao cho $a b + 1 \\mid a^2 + b^2$. Chứng minh rằng biểu thức $\\frac{a^2 + b^2}{a b + 1}$ luôn là một số chính phương."
  },
  {
    id: "mp-imo-2012-p3",
    code: "IMO 2012 P3",
    title: "Ước Nguyên Tố Nguyên Thủy & Bổ Đề Zsigmondy",
    category: "Số học Olympic (Number Theory)",
    source: "IMO",
    year: 2012,
    url: "https://artofproblemsolving.com/community/c3158_imo",
    difficulty: "Đỉnh cao IMO",
    theorems: ["Định lý Zsigmondy", "Cấp số nguyên", "Bổ đề LTE"],
    latexDescription: "Cho số nguyên $n \\ge 2$. Chứng minh rằng tồn tại các số nguyên dương $a_1, a_2, \\dots, a_n$ đôi một phân biệt sao cho tích $\\prod_{i < j} (a_i - a_j)$ chia hết cho tích $\\prod_{i=1}^n a_i$."
  },
  {
    id: "mp-vmo-2021-p3",
    code: "VMO 2021 Bài 3",
    title: "Cấp Của Số Nguyên & Hệ Thặng Dư Thu Gọn",
    category: "Số học Olympic (Number Theory)",
    source: "VMO",
    year: 2021,
    url: "https://artofproblemsolving.com/community/c3417_vietnam_national_olympiad",
    difficulty: "Chuyên sâu VMO",
    theorems: ["Cấp ord_m(a)", "Định lý Euler", "Ước nguyên tố"],
    latexDescription: "Tìm tất cả các cặp số nguyên dương $(a, p)$ với $p$ là số nguyên tố sao cho $a^{p-1} - 1$ chia hết cho $p$ và không chia hết cho $p^2$, đồng thời thỏa mãn hệ thức đồng dư bậc cao."
  },
  {
    id: "mp-usamo-2018-p2",
    code: "USAMO 2018 P2",
    title: "Dãy Số Nguyên & Ước Nguyên Tố Phân Biệt",
    category: "Số học Olympic (Number Theory)",
    source: "USAMO",
    year: 2018,
    url: "https://artofproblemsolving.com/community/c3413_usamo",
    difficulty: "Nâng cao TST",
    theorems: ["Bổ đề Bézout", "Sự tồn tại ước nguyên tố", "Quy nạp mạnh"],
    latexDescription: "Cho dãy số nguyên dương $(a_n)$ thỏa mãn $\\gcd(a_m, a_n) = a_{\\gcd(m, n)}$. Chứng minh rằng tồn tại vô số số nguyên dương $n$ sao cho $a_n$ có ít nhất $k$ ước nguyên tố phân biệt."
  },
  {
    id: "mp-usa-tst-2018-p5",
    code: "USA TST 2018 P5",
    title: "Ứng Dụng Bổ Đề Nâng Bậc LTE (Lifting The Exponent)",
    category: "Số học Olympic (Number Theory)",
    source: "USAMO",
    year: 2018,
    url: "https://artofproblemsolving.com/community/c3413_usamo",
    difficulty: "Nâng cao TST",
    theorems: ["Bổ đề LTE", "Số mũ đúng v_p(n)", "Phương trình Diophantine mũ"],
    latexDescription: "Tìm tất cả các bộ ba số nguyên dương $(a, b, n)$ sao cho $a^n + b^n = (a + b)^2$ và xác định điều kiện để $v_p(a^n + b^n) = v_p(a+b) + v_p(n)$."
  },
  {
    id: "mp-rmm-2018-p1",
    code: "RMM 2018 P1",
    title: "Ước Chung Lớn Nhất & Đa Thức Nguyên Thủy",
    category: "Số học Olympic (Number Theory)",
    source: "RMM",
    year: 2018,
    url: "https://artofproblemsolving.com/community/c3158_imo",
    difficulty: "Nâng cao TST",
    theorems: ["Thuật toán Euclid đa thức", "Định lý Gauss", "Đồng dư thức"],
    latexDescription: "Xác định tất cả các đa thức $P(x)$ với hệ số nguyên sao cho với mọi cặp số nguyên dương $a, b$, ta luôn có $\\gcd(P(a), P(b)) \\mid P(\\gcd(a, b))$."
  },

  // --- Category: Đại số & Phương trình hàm ---
  {
    id: "mp-imo-2019-p1",
    code: "IMO 2019 P1",
    title: "Phương Trình Hàm Số Học Trên Tập Số Nguyên",
    category: "Đại số & Phương trình hàm (Algebra & FE)",
    source: "IMO",
    year: 2019,
    url: "https://artofproblemsolving.com/community/c3158_imo",
    difficulty: "Chuyên sâu VMO",
    theorems: ["Tính cộng tính", "Điểm bất động", "Phép thế đối xứng"],
    latexDescription: "Tìm tất cả các hàm số $f: \\mathbb{Z} \\to \\mathbb{Z}$ thỏa mãn phương trình: $f(2a) + 2f(b) = f(f(a + b))$ với mọi số nguyên $a, b$."
  },
  {
    id: "mp-imo-1977-p6",
    code: "IMO 1977 P6",
    title: "Phương Trình Hàm Tự Lồng Nhau f(f(n)) < f(n+1)",
    category: "Đại số & Phương trình hàm (Algebra & FE)",
    source: "IMO",
    year: 1977,
    url: "https://artofproblemsolving.com/community/c3158_imo",
    difficulty: "Đỉnh cao IMO",
    theorems: ["Nguyên lý thứ tự tốt", "Tính đơn điệu ngặt", "Quy nạp toán học"],
    latexDescription: "Cho hàm số $f: \\mathbb{N}^* \\to \\mathbb{N}^*$ thỏa mãn $f(f(n)) < f(n + 1)$ với mọi $n \\in \\mathbb{N}^*$. Chứng minh rằng $f(n) = n$ với mọi $n$."
  },
  {
    id: "mp-vmo-2022-p2",
    code: "VMO 2022 Bài 2",
    title: "Phương Trình Hàm Toàn Ánh Trên Tập Số Thực",
    category: "Đại số & Phương trình hàm (Algebra & FE)",
    source: "VMO",
    year: 2022,
    url: "https://artofproblemsolving.com/community/c3417_vietnam_national_olympiad",
    difficulty: "Chuyên sâu VMO",
    theorems: ["Toàn ánh", "Đơn ánh", "Phương trình hàm Cauchy"],
    latexDescription: "Tìm tất cả các hàm số $f: \\mathbb{R} \\to \\mathbb{R}$ thỏa mãn $f(x + yf(x)) = f(x) + x f(y)$ với mọi số thực $x, y$."
  },
  {
    id: "mp-usamo-2003-p1",
    code: "USAMO 2003 P1",
    title: "Đa Thức Hệ Số Nguyên & Giá Trị Chính Phương",
    category: "Đại số & Phương trình hàm (Algebra & FE)",
    source: "USAMO",
    year: 2003,
    url: "https://artofproblemsolving.com/community/c3413_usamo",
    difficulty: "Cơ bản Olympic",
    theorems: ["Định lý Bézout", "Nghiệm đa thức", "Đạo hàm đa thức"],
    latexDescription: "Chứng minh rằng với mọi đa thức $P(x)$ có hệ số nguyên và bậc $n \\ge 1$, luôn tồn tại một số nguyên $k$ sao cho $P(k)$ không là một lũy thừa bậc $r$ với bất kỳ $r \\ge 2$."
  },
  {
    id: "mp-vmo-2019-p1",
    code: "VMO 2019 Bài 1",
    title: "Giới Hạn Dãy Số Thực & Dãy Truy Hồi Tuyến Tính",
    category: "Đại số & Phương trình hàm (Algebra & FE)",
    source: "VMO",
    year: 2019,
    url: "https://artofproblemsolving.com/community/c3417_vietnam_national_olympiad",
    difficulty: "Chuyên sâu VMO",
    theorems: ["Định lý kẹp", "Dãy đơn điệu bị chặn", "Hàm co Banach"],
    latexDescription: "Cho dãy số $(x_n)$ xác định bởi $x_1 = a > 0$ và $x_{n+1} = \\ln(1 + x_n) + \\frac{1}{n^2}$. Khảo sát sự hội tụ và tìm giới hạn của dãy số."
  },
  {
    id: "mp-usamo-2019-p4",
    code: "USAMO 2019 P4",
    title: "Phương Trình Hàm Cauchy & Tính Đơn Điệu Trên R",
    category: "Đại số & Phương trình hàm (Algebra & FE)",
    source: "USAMO",
    year: 2019,
    url: "https://artofproblemsolving.com/community/c3413_usamo",
    difficulty: "Nâng cao TST",
    theorems: ["Phương trình hàm Cauchy", "Tập trù mật", "Tính liên tục"],
    latexDescription: "Tìm tất cả các hàm số $f: \\mathbb{R} \\to \\mathbb{R}$ thỏa mãn $f(x y + f(x)) = x f(y) + f(x)$ và $f$ không đồng nhất bằng $0$."
  },

  // --- Category: Hình học phẳng ---
  {
    id: "mp-imo-2008-p4",
    code: "IMO 2008 P4",
    title: "Trục Đẳng Phương & Cấu Hình Tứ Giác Nội Tiếp",
    category: "Hình học phẳng (Geometry)",
    source: "IMO",
    year: 2008,
    url: "https://artofproblemsolving.com/community/c3158_imo",
    difficulty: "Chuyên sâu VMO",
    theorems: ["Trục đẳng phương", "Tâm đẳng phương", "Phương tích"],
    latexDescription: "Cho tam giác $ABC$ nhọn với trực tâm $H$. Đường tròn qua $B, C$ có tâm trên đoạn $BC$ cắt các đường thẳng $AB, AC$. Chứng minh các trục đẳng phương đồng quy tại trung điểm đoạn nối."
  },
  {
    id: "mp-vmo-2020-p4",
    code: "VMO 2020 Bài 4",
    title: "Hàng Điểm Điều Hòa & Trực Tâm Tam Giác",
    category: "Hình học phẳng (Geometry)",
    source: "VMO",
    year: 2020,
    url: "https://artofproblemsolving.com/community/c3417_vietnam_national_olympiad",
    difficulty: "Nâng cao TST",
    theorems: ["Hàng điểm điều hòa", "Chùm điều hòa", "Định lý Ceva/Menelaus"],
    latexDescription: "Cho tam giác nhọn $ABC$ nội tiếp $(O)$ với trực tâm $H$. Điểm $P$ di động trên cung nhỏ $BC$. Chứng minh một đường thẳng xác định luôn đi qua một điểm cố định nhờ tỉ số kép điều hòa."
  },
  {
    id: "mp-imo-2014-p4",
    code: "IMO 2014 P4",
    title: "Đường Tròn Nội Tiếp & Điểm Tiếp Xúc Điều Hòa",
    category: "Hình học phẳng (Geometry)",
    source: "IMO",
    year: 2014,
    url: "https://artofproblemsolving.com/community/c3158_imo",
    difficulty: "Chuyên sâu VMO",
    theorems: ["Góc định hướng", "Tam giác đồng dạng", "Tứ giác điều hòa"],
    latexDescription: "Cho các điểm $P, Q$ nằm trên cạnh $BC$ của tam giác nhọn $ABC$ sao cho $\\angle PAB = \\angle BCA$ và $\\angle QAC = \\angle ABC$. Chứng minh tâm đường tròn ngoại tiếp của các tam giác liên kết cùng thuộc một đường thẳng."
  },
  {
    id: "mp-usamo-2014-p1",
    code: "USAMO 2014 P1",
    title: "Hàng Điểm Điều Hòa & Đường Tròn Apollonius",
    category: "Hình học phẳng (Geometry)",
    source: "USAMO",
    year: 2014,
    url: "https://artofproblemsolving.com/community/c3413_usamo",
    difficulty: "Chuyên sâu VMO",
    theorems: ["Đường tròn Apollonius", "Hàng điều hòa", "Phương tích"],
    latexDescription: "Cho tam giác $ABC$ và điểm $D$ trên cạnh $BC$. Dựng các đường tròn ngoại tiếp thỏa mãn điều kiện tiếp xúc. Chứng minh rằng tiếp tuyến chung đi qua một điểm cố định."
  },
  {
    id: "mp-rmm-2020-p3",
    code: "RMM 2020 P3",
    title: "Cấu Hình Điểm Miquel & Phép Vị Tự Quay",
    category: "Hình học phẳng (Geometry)",
    source: "RMM",
    year: 2020,
    url: "https://artofproblemsolving.com/community/c3158_imo",
    difficulty: "Đỉnh cao IMO",
    theorems: ["Điểm Miquel", "Phép vị tự quay (Spiral Similarity)", "Đường đối trung"],
    latexDescription: "Cho tứ giác toàn phần $ABCD$. Chứng minh rằng bốn đường tròn Miquel cùng đi qua một điểm và tâm vị tự quay biến tam giác này thành tam giác kia nằm trên đường thẳng Euler."
  },
  {
    id: "mp-vietnam-tst-2018-p2",
    code: "Vietnam TST 2018 Bài 2",
    title: "Cực & Đối Cực Kết Hợp Định Lý Desargues",
    category: "Hình học phẳng (Geometry)",
    source: "VMO",
    year: 2018,
    url: "https://artofproblemsolving.com/community/c3417_vietnam_national_olympiad",
    difficulty: "Đỉnh cao IMO",
    theorems: ["Định lý Desargues", "Lý thuyết Cực & Đối cực", "Định lý Pascal"],
    latexDescription: "Cho tam giác $ABC$ nội tiếp $(O)$. Dựng các tiếp tuyến tại các đỉnh và xét các giao điểm thấu xạ. Chứng minh ba đường thẳng xác định đồng quy qua định lý Desargues."
  },

  // --- Category: Tổ hợp & Đồ thị ---
  {
    id: "mp-imo-2011-p2",
    code: "IMO 2011 P2",
    title: "Cối Xay Gió Tổ Hợp (The Windmill Problem)",
    category: "Tổ hợp & Đồ thị (Combinatorics)",
    source: "IMO",
    year: 2011,
    url: "https://artofproblemsolving.com/community/c3158_imo",
    difficulty: "Đỉnh cao IMO",
    theorems: ["Nguyên lý Bất biến", "Hình học tổ hợp", "Phép quay liên tục"],
    latexDescription: "Cho tập $S$ gồm $n$ điểm trên mặt phẳng ở vị trí tổng quát. Một cối xay gió quay một đường thẳng qua một điểm và chuyển trục quay sang điểm khác khi gặp. Chứng minh đường thẳng này sẽ quay đủ $180^\\circ$ và đi qua mọi điểm."
  },
  {
    id: "mp-usamo-2015-p1",
    code: "USAMO 2015 P1",
    title: "Trò Chơi Lưới Ô Vuông & Nguyên Lý Cực Hạn",
    category: "Tổ hợp & Đồ thị (Combinatorics)",
    source: "USAMO",
    year: 2015,
    url: "https://artofproblemsolving.com/community/c3413_usamo",
    difficulty: "Chuyên sâu VMO",
    theorems: ["Nguyên lý cực hạn", "Bất biến parity", "Phân hoạch"],
    latexDescription: "Một bàn cờ kích thước $n \\times n$ được điền các số nguyên. Mỗi bước cho phép chọn một ô và tăng tất cả các ô kề cạnh. Tìm điều kiện để có thể đưa mọi ô về cùng một giá trị."
  },
  {
    id: "mp-vmo-2023-p5",
    code: "VMO 2023 Bài 5",
    title: "Bất Biến & Đơn Biến Trên Tập Hợp Phân Hoạch",
    category: "Tổ hợp & Đồ thị (Combinatorics)",
    source: "VMO",
    year: 2023,
    url: "https://artofproblemsolving.com/community/c3417_vietnam_national_olympiad",
    difficulty: "Chuyên sâu VMO",
    theorems: ["Bất biến số dư", "Hàm thế vị đơn biến", "Quy tắc dừng"],
    latexDescription: "Trên bảng viết $n$ số nguyên dương. Mỗi lần thực hiện thay thế một cặp số $(a, b)$ bằng $(a-b, 2b)$. Chứng minh rằng sau một số hữu hạn bước, trên bảng luôn xuất hiện số $0$."
  },
  {
    id: "mp-vietnam-tst-2020-p3",
    code: "Vietnam TST 2020 Bài 3",
    title: "Định Lý Ramsey & Bài Toán Tô Màu Cạnh Đồ Thị",
    category: "Tổ hợp & Đồ thị (Combinatorics)",
    source: "VMO",
    year: 2020,
    url: "https://artofproblemsolving.com/community/c3417_vietnam_national_olympiad",
    difficulty: "Đỉnh cao IMO",
    theorems: ["Định lý Ramsey R(k, l)", "Định lý Turán", "Đếm hai cách"],
    latexDescription: "Cho đồ thị đầy đủ $K_n$ với các cạnh được tô bằng 2 màu đỏ và xanh. Chứng minh rằng nếu $n \\ge R(s, t)$ thì luôn tồn tại một đồ thị con đơn sắc kích thước mong muốn."
  },
  {
    id: "mp-imo-2017-p3",
    code: "IMO 2017 P3",
    title: "Thợ Săn Và Thỏ Trên Đồ Thị Lưới (Hunter & Rabbit)",
    category: "Tổ hợp & Đồ thị (Combinatorics)",
    source: "IMO",
    year: 2017,
    url: "https://artofproblemsolving.com/community/c3158_imo",
    difficulty: "Đỉnh cao IMO",
    theorems: ["Lý thuyết trò chơi", "Đồ thị song phần", "Chiến lược tối ưu"],
    latexDescription: "Một con thỏ và thợ săn chơi trò chơi trên một đồ thị $G$. Tại mỗi lượt, thỏ nhảy sang đỉnh kề và thợ săn chọn bắn một đỉnh với thiết bị định vị. Xác định điều kiện đồ thị để thợ săn luôn bắt được thỏ."
  },

  // --- Category: Bất đẳng thức & Cực trị ---
  {
    id: "mp-imo-2020-p2",
    code: "IMO 2020 P2",
    title: "Bất Đẳng Thức 4 Biến Thực (The Real 4-Variable Inequality)",
    category: "Bất đẳng thức & Cực trị (Inequalities)",
    source: "IMO",
    year: 2020,
    url: "https://artofproblemsolving.com/community/c3158_imo",
    difficulty: "Đỉnh cao IMO",
    theorems: ["BĐT Cauchy-Schwarz", "Phép đổi biến đối xứng", "Kỹ thuật dồn biến"],
    latexDescription: "Cho các số thực $a, b, c, d$ thỏa mãn $a \\ge b \\ge c \\ge d > 0$ và $a + b + c + d = 1$. Chứng minh rằng: $(a + 2b + 3c + 4d) a^a b^b c^c d^d < 1$."
  },
  {
    id: "mp-imo-2001-p2",
    code: "IMO 2001 P2",
    title: "Bất Đẳng Thức Hoán Vị Phân Thức Căn Bậc Hai",
    category: "Bất đẳng thức & Cực trị (Inequalities)",
    source: "IMO",
    year: 2001,
    url: "https://artofproblemsolving.com/community/c3158_imo",
    difficulty: "Chuyên sâu VMO",
    theorems: ["BĐT Hölder", "AM-GM", "Đổi biến chuẩn hóa"],
    latexDescription: "Cho các số thực dương $a, b, c$. Chứng minh bất đẳng thức: $\\frac{a}{\\sqrt{a^2 + 8bc}} + \\frac{b}{\\sqrt{b^2 + 8ca}} + \\frac{c}{\\sqrt{c^2 + 8ab}} \\ge 1$."
  },
  {
    id: "mp-vmo-2018-p3",
    code: "VMO 2018 Bài 3",
    title: "Bất Đẳng Thức Đối Xứng Phân Thức & Đổi Biến p, q, r",
    category: "Bất đẳng thức & Cực trị (Inequalities)",
    source: "VMO",
    year: 2018,
    url: "https://artofproblemsolving.com/community/c3417_vietnam_national_olympiad",
    difficulty: "Chuyên sâu VMO",
    theorems: ["Phương pháp p, q, r", "BĐT Schur", "Đạo hàm một biến"],
    latexDescription: "Cho các số thực dương $a, b, c$ thỏa mãn $a b c = 1$. Tìm giá trị nhỏ nhất của biểu thức phân thức đối xứng $P = \\frac{1}{a^2 - a + 1} + \\frac{1}{b^2 - b + 1} + \\frac{1}{c^2 - c + 1}$."
  },
  {
    id: "mp-usa-tst-2015-p2",
    code: "USA TST 2015 P2",
    title: "Bất Đẳng Thức Schur & Kỹ Thuật Phân Tích Bình Phương SOS",
    category: "Bất đẳng thức & Cực trị (Inequalities)",
    source: "USAMO",
    year: 2015,
    url: "https://artofproblemsolving.com/community/c3413_usamo",
    difficulty: "Nâng cao TST",
    theorems: ["Phương pháp SOS", "BĐT Schur bậc 4", "Dồn biến Equal Variables"],
    latexDescription: "Cho các số thực dương $a, b, c$. Chứng minh: $a^4 + b^4 + c^4 + a b c (a + b + c) \\ge 2 (a^2 b^2 + b^2 c^2 + c^2 a^2)$ bằng cách phân tích về dạng tổng bình phương SOS."
  },
  {
    id: "mp-apmo-2021-p2",
    code: "APMO 2021 P2",
    title: "Bất Đẳng Thức 3 Biến Với Điều Kiện abc = 1",
    category: "Bất đẳng thức & Cực trị (Inequalities)",
    source: "APMO",
    year: 2021,
    url: "https://artofproblemsolving.com/community/c3158_imo",
    difficulty: "Chuyên sâu VMO",
    theorems: ["AM-GM", "Cauchy-Schwarz dạng Engel", "Đổi biến $a = x/y$"],
    latexDescription: "Cho các số thực dương $a, b, c$ thỏa mãn $a b c = 1$. Chứng minh rằng: $\\frac{a^2 + 1}{b + c} + \\frac{b^2 + 1}{c + a} + \\frac{c^2 + 1}{a + b} \\ge 3$."
  },

  // --- Category: Giải tích & Đại số Putnam ---
  {
    id: "mp-putnam-2019-a2",
    code: "Putnam 2019 A2",
    title: "Định Thức Ma Trận Giao Hoán det(AB - BA)",
    category: "Giải tích & Đại số Putnam (Putnam & Higher Math)",
    source: "Putnam",
    year: 2019,
    url: "https://artofproblemsolving.com/community/c4380_putnam",
    difficulty: "Nâng cao TST",
    theorems: ["Đại số tuyến tính", "Vết ma trận tr(AB)", "Đa thức đặc trưng"],
    latexDescription: "Cho $A, B$ là hai ma trận vuông cấp $n$ thỏa mãn $A B - B A = A$. Chứng minh rằng $\\det(A) = 0$ và tất cả các giá trị riêng của $A$ đều bằng $0$."
  },
  {
    id: "mp-putnam-2020-a1",
    code: "Putnam 2020 A1",
    title: "Đa Thức Nhân Tính & Điểm Bất Động",
    category: "Giải tích & Đại số Putnam (Putnam & Higher Math)",
    source: "Putnam",
    year: 2020,
    url: "https://artofproblemsolving.com/community/c4380_putnam",
    difficulty: "Chuyên sâu VMO",
    theorems: ["Bổ đề Gauss", "Phương trình hàm đa thức", "Nghiệm phức"],
    latexDescription: "Tìm tất cả các đa thức $P(x)$ với hệ số thực thỏa mãn đẳng thức $P(x^2 + 1) = [P(x)]^2 + 1$ với mọi số thực $x$."
  },
  {
    id: "mp-putnam-2017-b1",
    code: "Putnam 2017 B1",
    title: "Bất Đẳng Thức Tích Phân Xác Định & Đạo Hàm Bậc Hai",
    category: "Giải tích & Đại số Putnam (Putnam & Higher Math)",
    source: "Putnam",
    year: 2017,
    url: "https://artofproblemsolving.com/community/c4380_putnam",
    difficulty: "Chuyên sâu VMO",
    theorems: ["BĐT Cauchy-Schwarz tích phân", "Công thức tích phân từng phần", "Định lý giá trị trung bình"],
    latexDescription: "Cho hàm số $f$ khả vi liên tục hai lần trên $[0, 1]$ thỏa mãn $f(0) = f(1) = 0$. Chứng minh rằng: $\\int_0^1 [f'(x)]^2 \\, dx \\le \\frac{1}{\\pi^2} \\int_0^1 [f''(x)]^2 \\, dx$."
  },
  {
    id: "mp-putnam-2018-b2",
    code: "Putnam 2018 B2",
    title: "Chuỗi Hội Tụ & Khai Triển Taylor Cổ Điển",
    category: "Giải tích & Đại số Putnam (Putnam & Higher Math)",
    source: "Putnam",
    year: 2018,
    url: "https://artofproblemsolving.com/community/c4380_putnam",
    difficulty: "Nâng cao TST",
    theorems: ["Chuỗi số thực", "Tiêu chuẩn hội tụ d'Alembert", "Hàm Gamma"],
    latexDescription: "Tính tổng của chuỗi số vô hạn $\\sum_{n=1}^\\infty \\frac{n}{(2n+1)!}$ và chứng minh tính siêu việt của kết quả thu được."
  }
];
