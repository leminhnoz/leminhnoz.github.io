export interface MathRoadmapNode {
  id: string;
  title: string;
  vietnameseTitle: string;
  description: string;
  status: "completed" | "in_progress" | "planned";
  difficulty: "Cơ bản Olympic" | "Chuyên sâu VMO" | "Nâng cao TST" | "Đỉnh cao IMO";
  prerequisites: string[];
  keyTheorems: string[];
  latexFormula: string;
  applications: string[];
  practiceProblems: {
    title: string;
    judge: "IMO" | "USAMO" | "VMO" | "Putnam" | "AoPS" | "RMM" | "APMO";
    url: string;
    difficulty: "Easy" | "Medium" | "Hard";
  }[];
  blogSlug: string | null;
}

export interface MathRoadmapStage {
  id: number;
  name: string;
  subtitle: string;
  description: string;
  icon: string;
  nodes: MathRoadmapNode[];
}

export const mathRoadmapStages: MathRoadmapStage[] = [
  {
    id: 1,
    name: "Giai đoạn 1: Số Học Olympic",
    subtitle: "Olympiad Number Theory (NT)",
    description: "Đồng dư thức nâng cao, phương trình Diophantine, Bổ đề LTE, cấp của số nguyên, căn nguyên thủy và phương pháp Vieta Jumping.",
    icon: "fa6-solid:infinity",
    nodes: [
      {
        id: "nt-congruence-euler",
        title: "Đồng Dư Thức, Định Lý Euler & Định Lý Wilson",
        vietnameseTitle: "Lý thuyết chia hết & Hệ thặng dư đầy đủ / thu gọn",
        description: "Hệ thặng dư mod m, định lý Fermat nhỏ, hàm phi Euler φ(n), định lý Euler a^φ(n) ≡ 1 (mod n) và định lý Wilson (p-1)! ≡ -1 (mod p).",
        status: "completed",
        difficulty: "Cơ bản Olympic",
        prerequisites: ["Ước chung lớn nhất", "Thuật toán Euclid"],
        keyTheorems: [
          "Định lý Fermat nhỏ: a^(p-1) ≡ 1 (mod p) với gcd(a, p) = 1",
          "Định lý Euler: a^φ(n) ≡ 1 (mod n) với gcd(a, n) = 1",
          "Định lý Wilson: (p-1)! ≡ -1 (mod p) khi và chỉ khi p là số nguyên tố"
        ],
        latexFormula: "a^{\\phi(n)} \\equiv 1 \\pmod{n}, \\quad (p-1)! \\equiv -1 \\pmod{p}",
        applications: ["Tính số dư lũy thừa lớn", "Chứng minh tính nguyên tố", "Nghiệm phương trình đồng dư"],
        practiceProblems: [
          { title: "VMO 2021 Bài 3: Cấp của số nguyên và đồng dư thức", judge: "VMO", url: "https://artofproblemsolving.com/community/c3417_vietnam_national_olympiad", difficulty: "Medium" },
          { title: "IMO 2005 Problem 4: Dãy số và ước nguyên tố", judge: "IMO", url: "https://artofproblemsolving.com/community/c3158_imo", difficulty: "Medium" }
        ],
        blogSlug: "2026-04-02-extended-euclidean-algorithm"
      },
      {
        id: "nt-order-primitive-roots",
        title: "Cấp Của Số Nguyên & Căn Nguyên Thủy",
        vietnameseTitle: "Order of Elements & Primitive Roots",
        description: "Cấp ord_m(a) là số nguyên dương k nhỏ nhất sao cho a^k ≡ 1 (mod m). Căn nguyên thủy g mod p và ứng dụng trong việc giải phương trình mũ đồng dư.",
        status: "completed",
        difficulty: "Chuyên sâu VMO",
        prerequisites: ["Định lý Euler"],
        keyTheorems: [
          "ord_m(a) | φ(m) và a^h ≡ 1 (mod m) ⇔ ord_m(a) | h",
          "Căn nguyên thủy tồn tại khi và chỉ khi m ∈ {2, 4, p^k, 2p^k} với p lẻ nguyên tố"
        ],
        latexFormula: "a^k \\equiv 1 \\pmod{m} \\iff \\text{ord}_m(a) \\mid k",
        applications: ["Xác định chu kỳ đồng dư", "Phân tích ước nguyên tố của a^n - 1", "Mã hóa và nhóm cyclic"],
        practiceProblems: [
          { title: "Vietnam TST 2021 Bài 6: Căn nguyên thủy", judge: "VMO", url: "https://artofproblemsolving.com/community/c3417_vietnam_national_olympiad", difficulty: "Hard" },
          { title: "IMO Shortlist 2006 N5: Cấp của số nguyên", judge: "IMO", url: "https://artofproblemsolving.com/community/c3158_imo", difficulty: "Hard" }
        ],
        blogSlug: null
      },
      {
        id: "nt-lte-lemma",
        title: "Bổ Đề Nâng Bậc LTE (Lifting The Exponent Lemma)",
        vietnameseTitle: "Vũ khí tối thượng cho phương trình số mũ và số mũ đúng v_p(n)",
        description: "Tính số mũ đúng v_p(a^n ± b^n) theo v_p(a ± b) và v_p(n). Công cụ giải quyết hàng loạt bài toán số học mũ trong IMO và USAMO.",
        status: "completed",
        difficulty: "Nâng cao TST",
        prerequisites: ["Đồng dư thức", "Nhị thức Newton"],
        keyTheorems: [
          "Với p lẻ, p | a-b, p ∤ a, p ∤ b: v_p(a^n - b^n) = v_p(a - b) + v_p(n)",
          "Với p = 2, n chẵn, 4 | a-b: v_2(a^n - b^n) = v_2(a - b) + v_2(a + b) + v_2(n) - 1"
        ],
        latexFormula: "v_p(a^n - b^n) = v_p(a - b) + v_p(n) \\quad (p \\ge 3, \\, p \\mid a - b)",
        applications: ["Giải phương trình Diophantine mũ a^n + b^n = c^k", "Ước nguyên tố của lũy thừa", "Bài toán chia hết"],
        practiceProblems: [
          { title: "USA TST 2018 Problem 5: Ứng dụng LTE", judge: "USAMO", url: "https://artofproblemsolving.com/community/c3413_usamo", difficulty: "Hard" },
          { title: "IMO Shortlist 2007 N5: Chia hết số mũ", judge: "IMO", url: "https://artofproblemsolving.com/community/c3158_imo", difficulty: "Hard" }
        ],
        blogSlug: null
      },
      {
        id: "nt-quadratic-reciprocity",
        title: "Thặng Dư Bậc Hai & Luật Thuận Nghịch Bình Phương Gauss",
        vietnameseTitle: "Ký hiệu Legendre, Jacobi và Tiêu chuẩn Euler",
        description: "Xác định xem x^2 ≡ a (mod p) có nghiệm hay không thông qua ký hiệu Legendre (a/p) và định lý vàng của Gauss về luật thuận nghịch bình phương.",
        status: "in_progress",
        difficulty: "Chuyên sâu VMO",
        prerequisites: ["Căn nguyên thủy", "Định lý Wilson"],
        keyTheorems: [
          "Tiêu chuẩn Euler: (a/p) ≡ a^((p-1)/2) (mod p)",
          "Luật thuận nghịch Gauss: (p/q)(q/p) = (-1)^(((p-1)/2) * ((q-1)/2))"
        ],
        latexFormula: "\\left(\\frac{p}{q}\\right) \\left(\\frac{q}{p}\\right) = (-1)^{\\frac{p-1}{2} \\cdot \\frac{q-1}{2}}",
        applications: ["Xét ước nguyên tố của biểu thức bậc hai x^2 + dy^2", "Phương trình Diophantine bậc 2"],
        practiceProblems: [
          { title: "USAMO 2008 Problem 1: Thặng dư bậc hai", judge: "USAMO", url: "https://artofproblemsolving.com/community/c3413_usamo", difficulty: "Medium" },
          { title: "RMM 2018 Problem 1: Ký hiệu Legendre", judge: "RMM", url: "https://artofproblemsolving.com/community/c3158_imo", difficulty: "Hard" }
        ],
        blogSlug: null
      },
      {
        id: "nt-vieta-jumping",
        title: "Phương Pháp Bước Nhảy Vieta (Vieta Jumping / Root Flipping)",
        vietnameseTitle: "Kỹ thuật lùi vô hạn kết hợp hệ thức Viète trên phương trình bậc hai",
        description: "Phương pháp tạo ra nghiệm nguyên dương nhỏ hơn từ nghiệm đã cho bằng cách coi phương trình đối xứng như phương trình bậc 2 theo một biến. Xuất phát từ bài toán huyền thoại IMO 1988 P6.",
        status: "completed",
        difficulty: "Đỉnh cao IMO",
        prerequisites: ["Hệ thức Viète", "Nguyên lý cực hạn"],
        keyTheorems: [
          "Nếu (x1, y) là nghiệm thì x2 = k*y - x1 cũng là nghiệm của x^2 - k*x*y + y^2 = c",
          "Nếu x1 > y thì x2 = (y^2 - c)/x1 có thể tạo ra nghiệm nhỏ hơn vô hạn lần dẫn tới mâu thuẫn"
        ],
        latexFormula: "x^2 - k \\cdot x \\cdot y + y^2 = c \\implies x_1 + x_2 = k \\cdot y, \\quad x_1 \\cdot x_2 = y^2 - c",
        applications: ["Chứng minh một biểu thức luôn là số chính phương", "Giải phương trình Diophantine đối xứng 2 biến"],
        practiceProblems: [
          { title: "IMO 1988 Problem 6: Huyền thoại Vieta Jumping", judge: "IMO", url: "https://artofproblemsolving.com/community/c3158_imo", difficulty: "Hard" },
          { title: "IMO 2007 Problem 5: Bước nhảy Vieta nâng cao", judge: "IMO", url: "https://artofproblemsolving.com/community/c3158_imo", difficulty: "Hard" }
        ],
        blogSlug: null
      },
      {
        id: "nt-zsigmondy-theorem",
        title: "Định Lý Zsigmondy & Phương Trình Diophantine Hiện Đại",
        vietnameseTitle: "Ước nguyên tố nguyên thủy của a^n - b^n",
        description: "Với mọi a > b ≥ 1 nguyên tố cùng nhau, a^n - b^n luôn có ít nhất một ước nguyên tố không chia hết bất kỳ a^k - b^k nào với k < n (trừ một vài ngoại lệ cụ thể).",
        status: "in_progress",
        difficulty: "Đỉnh cao IMO",
        prerequisites: ["LTE", "Đa thức Cyclotomic"],
        keyTheorems: [
          "Zsigmondy: Tồn tại ước nguyên tố nguyên thủy cho mọi n > 1 ngoại trừ a=2, b=1, n=6 và a+b lũy thừa của 2 với n=2",
          "Ứng dụng phân tích dãy Mersenne 2^p - 1"
        ],
        latexFormula: "\\exists p \\mid (a^n - b^n) \\quad \\text{sao cho} \\quad \\forall k < n, \\, p \\nmid (a^k - b^k)",
        applications: ["Giải triệt để các phương trình Diophantine dạng a^x + b^y = c^z", "Cấu trúc nhóm hữu hạn"],
        practiceProblems: [
          { title: "IMO 2012 Problem 3: Ứng dụng Zsigmondy", judge: "IMO", url: "https://artofproblemsolving.com/community/c3158_imo", difficulty: "Hard" },
          { title: "USA TST 2014 Problem 1: Ước nguyên tố nguyên thủy", judge: "USAMO", url: "https://artofproblemsolving.com/community/c3413_usamo", difficulty: "Hard" }
        ],
        blogSlug: null
      }
    ]
  },
  {
    id: 2,
    name: "Giai đoạn 2: Đại Số & Phương Trình Hàm",
    subtitle: "Olympiad Algebra & Functional Equations",
    description: "Đa thức với hệ số nguyên, nghiệm phức, tiêu chuẩn Eisenstein, phương trình hàm trên R và Q, dãy số và giới hạn truy hồi.",
    icon: "fa6-solid:square-root-variable",
    nodes: [
      {
        id: "alg-polynomial-arithmetic",
        title: "Đa Thức Hệ Số Nguyên & Bất Khả Quy",
        vietnameseTitle: "Định lý Bézout, Bổ đề Gauss & Tiêu chuẩn Eisenstein",
        description: "Phép chia có dư đa thức, tính bất khả quy trên Z[x] và Q[x], định lý nghiệm hữu tỉ, và nghiệm phức liên hợp.",
        status: "completed",
        difficulty: "Cơ bản Olympic",
        prerequisites: ["Đại số sơ cấp", "Số phức"],
        keyTheorems: [
          "Bổ đề Gauss: Đa thức bất khả quy trên Z[x] thì bất khả quy trên Q[x]",
          "Tiêu chuẩn Eisenstein: Nếu p | a_i (i < n), p ∤ a_n, p^2 ∤ a_0 thì P(x) bất khả quy trên Q[x]"
        ],
        latexFormula: "P(x) = a_n x^n + \\dots + a_1 x + a_0, \\quad a - b \\mid P(a) - P(b)",
        applications: ["Chứng minh đa thức không có nghiệm hữu tỉ", "Đa thức đối xứng và công thức Newton"],
        practiceProblems: [
          { title: "USAMO 2003 Problem 1: Đa thức nguyên", judge: "USAMO", url: "https://artofproblemsolving.com/community/c3413_usamo", difficulty: "Medium" },
          { title: "VMO 2019 Bài 2: Đa thức nghiệm thực", judge: "VMO", url: "https://artofproblemsolving.com/community/c3417_vietnam_national_olympiad", difficulty: "Medium" }
        ],
        blogSlug: null
      },
      {
        id: "alg-functional-equations-cauchy",
        title: "Phương Trình Hàm Cauchy & Kỹ Thuật Cơ Bản",
        vietnameseTitle: "Phương trình hàm trên Q và mở rộng lên R",
        description: "Giải phương trình hàm Cauchy f(x + y) = f(x) + f(y) qua các bước N -> Z -> Q -> R bằng điều kiện liên tục, đơn điệu hoặc bị chặn.",
        status: "completed",
        difficulty: "Chuyên sâu VMO",
        prerequisites: ["Tập hợp số", "Tính liên tục"],
        keyTheorems: [
          "f(x + y) = f(x) + f(y) trên Q có nghiệm duy nhất f(x) = cx",
          "Nếu f liên tục hoặc đơn điệu hoặc bị chặn một phía trên một khoảng thì f(x) = cx trên R"
        ],
        latexFormula: "f(x + y) = f(x) + f(y) \\implies f(x) = c \\cdot x \\quad (x \\in \\mathbb{R})",
        applications: ["Phương trình hàm d'Alembert", "Phương trình hàm Jensen"],
        practiceProblems: [
          { title: "VMO 2022 Bài 2: Phương trình hàm trên R", judge: "VMO", url: "https://artofproblemsolving.com/community/c3417_vietnam_national_olympiad", difficulty: "Medium" },
          { title: "IMO 2019 Problem 1: PT hàm số học", judge: "IMO", url: "https://artofproblemsolving.com/community/c3158_imo", difficulty: "Medium" }
        ],
        blogSlug: null
      },
      {
        id: "alg-advanced-fe-techniques",
        title: "Kỹ Thuật Nâng Cao Trong Phương Trình Hàm",
        vietnameseTitle: "Đơn ánh, Toàn ánh, Điểm cố định và Phương trình hàm lồng",
        description: "Phương pháp thế biến khéo léo, khai thác tính chất song ánh f, tìm điểm cố định f(c) = c, khử biến lồng f(f(x)) và phương trình hàm đa thức.",
        status: "in_progress",
        difficulty: "Đỉnh cao IMO",
        prerequisites: ["Phương trình hàm Cauchy", "Ánh xạ"],
        keyTheorems: [
          "Tính đơn ánh: f(a) = f(b) ⇒ a = b",
          "Toàn ánh: Luôn tồn tại t sao cho f(t) = 0 hoặc f(t) = y",
          "Khai thác điểm bất động: f(x) = x"
        ],
        latexFormula: "f(f(x) + y) = 2x + f(f(y) - x) \\implies f(x) \\text{ là song ánh}",
        applications: ["Giải các bài toán phương trình hàm IMO Problem 1 & 5", "Phương trình hàm trên tập hữu hạn"],
        practiceProblems: [
          { title: "IMO 2010 Problem 1: Phương trình hàm toàn ánh", judge: "IMO", url: "https://artofproblemsolving.com/community/c3158_imo", difficulty: "Hard" },
          { title: "IMO 1977 Problem 6: f(f(n)) < f(n+1)", judge: "IMO", url: "https://artofproblemsolving.com/community/c3158_imo", difficulty: "Hard" }
        ],
        blogSlug: null
      },
      {
        id: "alg-sequences-recurrence-limits",
        title: "Dãy Số, Sai Phân Tuyến Tính & Giới Hạn Dãy Thực",
        vietnameseTitle: "Dãy số truy hồi tuyến tính, cấp số và định lý kẹp",
        description: "Giải công thức tổng quát của dãy truy hồi tuyến tính bằng phương trình đặc trưng, khảo sát tính đơn điệu, bị chặn và chứng minh tồn tại giới hạn.",
        status: "completed",
        difficulty: "Chuyên sâu VMO",
        prerequisites: ["Đại số sơ cấp", "Giới hạn"],
        keyTheorems: [
          "Định lý Weierstrass: Mọi dãy đơn điệu và bị chặn đều có giới hạn hữu hạn",
          "Nghiệm phương trình đặc trưng r^k - a_1 r^{k-1} - ... - a_k = 0"
        ],
        latexFormula: "x_{n+1} = f(x_n), \\quad |f'(x)| < 1 \\implies \\lim_{n \\to \\infty} x_n = L",
        applications: ["Bài toán 1 đề thi VMO hàng năm", "Đánh giá tốc độ hội tụ"],
        practiceProblems: [
          { title: "VMO 2019 Bài 1: Dãy số và giới hạn truy hồi", judge: "VMO", url: "https://artofproblemsolving.com/community/c3417_vietnam_national_olympiad", difficulty: "Medium" },
          { title: "VMO 2020 Bài 1: Dãy số hữu tỉ", judge: "VMO", url: "https://artofproblemsolving.com/community/c3417_vietnam_national_olympiad", difficulty: "Medium" }
        ],
        blogSlug: "2026-04-27-fibonacci-numbers-secrets"
      }
    ]
  },
  {
    id: 3,
    name: "Giai đoạn 3: Hình Học Phẳng Thuần Túy",
    subtitle: "Olympiad Euclidean Geometry",
    description: "Hàng điểm điều hòa, phương tích, trục đẳng phương, các định lý xạ ảnh Ceva, Menelaus, Pascal, Brianchon, phép biến hình và tọa độ tỉ cự.",
    icon: "fa6-solid:shapes",
    nodes: [
      {
        id: "geo-harmonic-bundles",
        title: "Hàng Điểm Điều Hòa & Chùm Điều Hòa",
        vietnameseTitle: "Tỉ số kép, Tứ giác toàn phần & Tứ giác điều hòa",
        description: "Định nghĩa tỉ số kép (A, B; C, D) = -1, các tính chất bảo toàn qua phép chiếu xuyên tâm (chùm điều hòa), tứ giác toàn phần và tứ giác nội tiếp điều hòa.",
        status: "completed",
        difficulty: "Chuyên sâu VMO",
        prerequisites: ["Định lý Thales", "Tỉ số khoảng cách đại số"],
        keyTheorems: [
          "Hàng điểm điều hòa: (AB, CD) = (CA/CB) : (DA/DB) = -1",
          "Hệ thức Newton: IA^2 = IC * ID (với I là trung điểm AB)",
          "Hệ thức Descartes: 2/AB = 1/AC + 1/AD"
        ],
        latexFormula: "(A, B; C, D) = \\frac{\\overline{CA}}{\\overline{CB}} : \\frac{\\overline{DA}}{\\overline{DB}} = -1",
        applications: ["Chứng minh thẳng hàng, đồng quy", "Chứng minh tiếp tuyến và điểm cố định"],
        practiceProblems: [
          { title: "VMO 2020 Bài 4: Hàng điểm điều hòa và trực tâm", judge: "VMO", url: "https://artofproblemsolving.com/community/c3417_vietnam_national_olympiad", difficulty: "Hard" },
          { title: "USAMO 2014 Problem 1: Hàng điều hòa và đường tròn", judge: "USAMO", url: "https://artofproblemsolving.com/community/c3413_usamo", difficulty: "Medium" }
        ],
        blogSlug: null
      },
      {
        id: "geo-power-radical-axis",
        title: "Phương Tích, Trục Đẳng Phương & Tâm Đẳng Phương",
        vietnameseTitle: "Power of a Point, Radical Axis & Radical Center",
        description: "Phương tích của điểm M đối với đường tròn (O; R): P_M/(O) = MO^2 - R^2 = MA * MB. Tập hợp các điểm có cùng phương tích tạo thành trục đẳng phương vuông góc với đoạn nối tâm.",
        status: "completed",
        difficulty: "Cơ bản Olympic",
        prerequisites: ["Tứ giác nội tiếp", "Định lý Pythagore"],
        keyTheorems: [
          "Trục đẳng phương của hai đường tròn không đồng tâm luôn là một đường thẳng vuông góc với O1O2",
          "Tâm đẳng phương của 3 đường tròn có các trục đẳng phương đồng quy hoặc đôi một song song"
        ],
        latexFormula: "\\mathcal{P}_{M/(O)} = MO^2 - R^2 = \\overline{MA} \\cdot \\overline{MB}",
        applications: ["Chứng minh 3 điểm thẳng hàng qua tâm đẳng phương", "Chứng minh 4 điểm cùng thuộc một đường tròn"],
        practiceProblems: [
          { title: "IMO 2008 Problem 4: Trục đẳng phương và tứ giác nội tiếp", judge: "IMO", url: "https://artofproblemsolving.com/community/c3158_imo", difficulty: "Medium" },
          { title: "VMO 2017 Bài 2: Cấu hình trục đẳng phương", judge: "VMO", url: "https://artofproblemsolving.com/community/c3417_vietnam_national_olympiad", difficulty: "Medium" }
        ],
        blogSlug: null
      },
      {
        id: "geo-projective-theorems",
        title: "Các Định Lý Xạ Ảnh: Pascal, Brianchon, Desargues",
        vietnameseTitle: "Lục giác nội tiếp conic và tam giác thấu xạ",
        description: "Định lý Pascal cho lục giác nội tiếp đường tròn (giao điểm 3 cặp cạnh đối thẳng hàng), định lý Brianchon cho lục giác ngoại tiếp, và định lý Desargues cho 2 tam giác thấu xạ.",
        status: "in_progress",
        difficulty: "Nâng cao TST",
        prerequisites: ["Định lý Menelaus", "Định lý Ceva"],
        keyTheorems: [
          "Định lý Pascal: Giao điểm của các cạnh đối của một lục giác nội tiếp conic luôn thẳng hàng",
          "Định lý Desargues: Hai tam giác thấu xạ đỉnh khi và chỉ khi thấu xạ trục"
        ],
        latexFormula: "P = AB \\cap DE, \\, Q = BC \\cap EF, \\, R = CD \\cap FA \\implies P, Q, R \\text{ thẳng hàng}",
        applications: ["Giải các bài toán đồng quy - thẳng hàng phức tạp trong TST và IMO"],
        practiceProblems: [
          { title: "IMO Shortlist 2011 G4: Định lý Pascal", judge: "IMO", url: "https://artofproblemsolving.com/community/c3158_imo", difficulty: "Hard" },
          { title: "Vietnam TST 2018 Bài 2: Cấu hình Desargues", judge: "VMO", url: "https://artofproblemsolving.com/community/c3417_vietnam_national_olympiad", difficulty: "Hard" }
        ],
        blogSlug: null
      },
      {
        id: "geo-geometric-transformations-inversion",
        title: "Phép Biến Hình: Phép Vị Tự Quay & Phép Nghịch Đảo",
        vietnameseTitle: "Spiral Similarity, Circle Inversion & Tọa độ tỉ cự",
        description: "Phép nghịch đảo cực O phương tích k biến đường tròn thành đường thẳng hoặc đường tròn, bảo toàn góc (ánh xạ bảo giác). Phép vị tự quay giải cấu hình điểm Miquel và tam giác đồng dạng.",
        status: "in_progress",
        difficulty: "Đỉnh cao IMO",
        prerequisites: ["Hình học phẳng", "Góc định hướng"],
        keyTheorems: [
          "Phép nghịch đảo: OP * OP' = k. Đường tròn qua tâm biến thành đường thẳng không qua tâm",
          "Công thức khoảng cách nghịch đảo: P'Q' = |k| * PQ / (OP * OQ)"
        ],
        latexFormula: "I_{(O, k)}: P \\mapsto P' \\quad \\text{sao cho} \\quad \\vec{OP'} = \\frac{k}{OP^2} \\vec{OP}",
        applications: ["Đưa các bài toán tiếp xúc đường tròn phức tạp về đường thẳng song song", "Điểm Miquel và tâm vị tự quay"],
        practiceProblems: [
          { title: "IMO 2015 Problem 3: Nghịch đảo và đường tròn", judge: "IMO", url: "https://artofproblemsolving.com/community/c3158_imo", difficulty: "Hard" },
          { title: "RMM 2020 Problem 3: Điểm Miquel và vị tự quay", judge: "RMM", url: "https://artofproblemsolving.com/community/c3158_imo", difficulty: "Hard" }
        ],
        blogSlug: null
      }
    ]
  },
  {
    id: 4,
    name: "Giai đoạn 4: Tổ Hợp & Lý Thuyết Rời Rạc",
    subtitle: "Olympiad Combinatorics & Discrete Mathematics",
    description: "Nguyên lý cực hạn, Dirichlet mở rộng, bất biến & đơn biến, lý thuyết đồ thị trong Olympic (Turán, Ramsey), đếm hai cách và trò chơi tổ hợp.",
    icon: "fa6-solid:dice-d20",
    nodes: [
      {
        id: "comb-extremal-pigeonhole",
        title: "Nguyên Lý Cực Hạn & Nguyên Lý Dirichlet Nâng Cao",
        vietnameseTitle: "Extremal Principle & Generalized Pigeonhole",
        description: "Xét phần tử có tính chất cực trị (nhỏ nhất, lớn nhất, nằm ở biên) để suy ra mâu thuẫn hoặc cấu trúc toàn thể. Nguyên lý Dirichlet chia lồng thỏ liên tục và rời rạc.",
        status: "completed",
        difficulty: "Cơ bản Olympic",
        prerequisites: ["Tập hợp hữu hạn", "Quan hệ thứ tự"],
        keyTheorems: [
          "Mọi tập con hữu hạn khác rỗng của R đều có phần tử nhỏ nhất và lớn nhất",
          "Dirichlet dạng tổng quát: Nếu xếp n vật vào k ngăn thì có ngăn chứa ít nhất ⌈n/k⌉ vật"
        ],
        latexFormula: "\\exists c \\in S: \\quad c = \\min(S) \\quad \\text{hoặc} \\quad c = \\max(S)",
        applications: ["Bài toán Sylvester về đường thẳng đi qua 2 điểm", "Hình học tổ hợp và bao lồi rời rạc"],
        practiceProblems: [
          { title: "USAMO 2015 Problem 1: Nguyên lý cực hạn lưới", judge: "USAMO", url: "https://artofproblemsolving.com/community/c3413_usamo", difficulty: "Medium" },
          { title: "IMO 2011 Problem 2: Windmill (Cối xay gió tổ hợp)", judge: "IMO", url: "https://artofproblemsolving.com/community/c3158_imo", difficulty: "Hard" }
        ],
        blogSlug: null
      },
      {
        id: "comb-invariants-monovariants",
        title: "Bất Biến, Đơn Biến & Kỹ Thuật Tô Màu",
        vietnameseTitle: "Invariants, Monovariants & Coloring",
        description: "Tìm đại lượng không đổi (bất biến) hoặc luôn tăng/giảm ngặt (đơn biến) qua từng trạng thái biến đổi. Kỹ thuật tô màu bàn cờ và phân hoạch tập hợp.",
        status: "completed",
        difficulty: "Chuyên sâu VMO",
        prerequisites: ["Quy nạp toán học", "Đồng dư thức"],
        keyTheorems: [
          "Bất biến mod 2 hoặc mod k để chứng minh một trạng thái không thể đạt tới",
          "Đơn biến bị chặn suy ra quá trình phải dừng lại sau hữu hạn bước"
        ],
        latexFormula: "\\Phi(S_{t+1}) < \\Phi(S_t) \\implies \\text{Quá trình hữu hạn bước dừng}",
        applications: ["Trò chơi biến đổi số trên bảng", "Lát gạch bàn cờ bằng các thanh domino/tromino"],
        practiceProblems: [
          { title: "VMO 2023 Bài 5: Bất biến phân hoạch", judge: "VMO", url: "https://artofproblemsolving.com/community/c3417_vietnam_national_olympiad", difficulty: "Medium" },
          { title: "IMO Shortlist 2014 C1: Trạng thái tiền xu", judge: "IMO", url: "https://artofproblemsolving.com/community/c3158_imo", difficulty: "Medium" }
        ],
        blogSlug: null
      },
      {
        id: "comb-double-counting",
        title: "Phương Pháp Đếm Hai Cách & Hệ Số Nhị Thức",
        vietnameseTitle: "Double Counting & Combinatorial Identities",
        description: "Đếm số cặp (x, y) thỏa mãn quan hệ R theo hai chiều: theo hàng và theo cột. Chứng minh các bất đẳng thức tổ hợp và đẳng thức nhị thức.",
        status: "completed",
        difficulty: "Chuyên sâu VMO",
        prerequisites: ["Tổ hợp nCr", "Ma trận nhị phân"],
        keyTheorems: [
          "Tổng bậc các đỉnh bằng hai lần số cạnh: ∑ deg(v) = 2E",
          "Bất đẳng thức Cauchy-Schwarz áp dụng cho số cặp đếm hai cách"
        ],
        latexFormula: "\\sum_{x \\in X} \\deg(x) = |\\mathcal{R}| = \\sum_{y \\in Y} \\deg(y)",
        applications: ["Định lý Sperner", "Định lý Erdős-Ko-Rado về họ tập giao nhau"],
        practiceProblems: [
          { title: "IMO 1998 Problem 2: Đếm hai cách thi đấu", judge: "IMO", url: "https://artofproblemsolving.com/community/c3158_imo", difficulty: "Medium" },
          { title: "IMO 1989 Problem 3: Đếm số bộ ba điểm", judge: "IMO", url: "https://artofproblemsolving.com/community/c3158_imo", difficulty: "Hard" }
        ],
        blogSlug: null
      },
      {
        id: "comb-graph-theory-olympiad",
        title: "Lý Thuyết Đồ Thị Olympic: Turán & Ramsey",
        vietnameseTitle: "Đồ thị phẳng, Định lý Turán & Số màu Ramsey R(k, l)",
        description: "Số cạnh tối đa của đồ thị không chứa tam giác (Định lý Mantel) và không chứa K_r (Định lý Turán). Định lý Ramsey R(3, 3) = 6 và công thức Euler cho đồ thị phẳng V - E + F = 2.",
        status: "in_progress",
        difficulty: "Đỉnh cao IMO",
        prerequisites: ["Khái niệm đồ thị cơ bản", "Đếm hai cách"],
        keyTheorems: [
          "Định lý Mantel: Đồ thị không chứa tam giác có tối đa ⌊n^2 / 4⌋ cạnh",
          "Định lý Turán: Cực trị số cạnh của đồ thị không chứa K_{r+1}",
          "Công thức Euler đồ thị phẳng: V - E + F = 1 + C"
        ],
        latexFormula: "e(G) \\le \\left(1 - \\frac{1}{r}\\right) \\frac{n^2}{2}, \\quad V - E + F = 2",
        applications: ["Giải các bài toán cấu trúc mạng lưới và quan hệ bạn bè trong IMO", "Tô màu bản đồ phẳng"],
        practiceProblems: [
          { title: "Vietnam TST 2020 Bài 3: Định lý Ramsey và tô màu cạnh", judge: "VMO", url: "https://artofproblemsolving.com/community/c3417_vietnam_national_olympiad", difficulty: "Hard" },
          { title: "IMO 2017 Problem 3: Thỏ và thợ săn trên đồ thị", judge: "IMO", url: "https://artofproblemsolving.com/community/c3158_imo", difficulty: "Hard" }
        ],
        blogSlug: null
      }
    ]
  },
  {
    id: 5,
    name: "Giai đoạn 5: Bất Đẳng Thức & Cực Trị Olympic",
    subtitle: "Olympiad Inequalities & Optimization",
    description: "AM-GM, Cauchy-Schwarz, Hölder, Minkowski, BĐT Schur, phương pháp đổi biến p, q, r, kỹ thuật dồn biến (EV/MV) và phân tích bình phương SOS.",
    icon: "fa6-solid:scale-balanced",
    nodes: [
      {
        id: "ineq-classical-foundations",
        title: "Các Bất Đẳng Thức Cổ Điển: AM-GM, Cauchy-Schwarz, Hölder",
        vietnameseTitle: "Nền tảng bất đẳng thức đại số & Điều kiện cân bằng điểm rơi",
        description: "Kỹ thuật chọn điểm rơi đối xứng và không đối xứng, thêm bớt hạng tử, bất đẳng thức Cauchy-Schwarz dạng Engel (Sedrakyan) và bất đẳng thức Hölder cho n dãy số.",
        status: "completed",
        difficulty: "Cơ bản Olympic",
        prerequisites: ["Biến đổi đại số", "Nhị thức"],
        keyTheorems: [
          "BĐT AM-GM: (a1 + ... + an)/n ≥ (a1*...*an)^(1/n)",
          "BĐT Cauchy-Schwarz dạng cộng mẫu (Engel): ∑ (a_i^2 / b_i) ≥ (∑ a_i)^2 / ∑ b_i",
          "BĐT Hölder: (∑ a_i^p)^(1/p) * (∑ b_i^q)^(1/q) ≥ ∑ a_i * b_i với 1/p + 1/q = 1"
        ],
        latexFormula: "\\sum_{i=1}^n \\frac{a_i^2}{b_i} \\ge \\frac{\\left(\\sum_{i=1}^n a_i\\right)^2}{\\sum_{i=1}^n b_i}",
        applications: ["Đánh giá cực trị phân thức 3 biến", "Chuẩn hóa a + b + c = 3 hoặc abc = 1"],
        practiceProblems: [
          { title: "VMO 2018 Bài 3: Bất đẳng thức 3 biến phân thức", judge: "VMO", url: "https://artofproblemsolving.com/community/c3417_vietnam_national_olympiad", difficulty: "Medium" },
          { title: "IMO 2001 Problem 2: BĐT đối xứng hoán vị", judge: "IMO", url: "https://artofproblemsolving.com/community/c3158_imo", difficulty: "Medium" }
        ],
        blogSlug: null
      },
      {
        id: "ineq-schur-pqr",
        title: "Bất Đẳng Thức Schur & Phương Pháp Đổi Biến p, q, r",
        vietnameseTitle: "Khảo sát hàm số đối xứng qua p = a+b+c, q = ab+bc+ca, r = abc",
        description: "Bất đẳng thức Schur bậc 3 và bậc 4, kỹ thuật biểu diễn các đa thức đối xứng qua p, q, r và định lý dồn biến biên khi r đạt cực đại / cực tiểu.",
        status: "completed",
        difficulty: "Chuyên sâu VMO",
        prerequisites: ["Đa thức đối xứng 3 biến", "AM-GM"],
        keyTheorems: [
          "BĐT Schur bậc 3: a^t(a-b)(a-c) + b^t(b-c)(b-a) + c^t(c-a)(c-b) ≥ 0",
          "Dạng p, q, r bậc 3: p^3 - 4pq + 9r ≥ 0 và p*q ≥ 9r"
        ],
        latexFormula: "x^r(x-y)(x-z) + y^r(y-z)(y-x) + z^r(z-x)(z-y) \\ge 0",
        applications: ["Giải các bài toán BĐT đối xứng 3 biến khó trong VMO và Olympic khu vực"],
        practiceProblems: [
          { title: "USA TST 2015 Problem 2: BĐT Schur và p, q, r", judge: "USAMO", url: "https://artofproblemsolving.com/community/c3413_usamo", difficulty: "Hard" },
          { title: "APMO 2021 Problem 2: BĐT 3 biến đối xứng", judge: "APMO", url: "https://artofproblemsolving.com/community/c3158_imo", difficulty: "Medium" }
        ],
        blogSlug: null
      },
      {
        id: "ineq-sos-ev-methods",
        title: "Phương Pháp SOS (Sum of Squares) & Kỹ Thuật Dồn Biến (EV/MV)",
        vietnameseTitle: "Biểu diễn S_a(b-c)^2 + S_b(c-a)^2 + S_c(a-b)^2 ≥ 0 và Equal Variables",
        description: "Đưa bất đẳng thức đối xứng 3 biến về dạng SOS với các hệ số S_a, S_b, S_c. Phương pháp dồn biến MV chứng minh cực trị đạt được khi hai biến bằng nhau (b = c).",
        status: "in_progress",
        difficulty: "Đỉnh cao IMO",
        prerequisites: ["BĐT Schur", "Đạo hàm khảo sát hàm số"],
        keyTheorems: [
          "Tiêu chuẩn SOS: Nếu S_a + S_b > 0, S_b + S_c > 0, S_c + S_a > 0 và S_a*S_b + S_b*S_c + S_c*S_a ≥ 0 thì biểu thức ≥ 0",
          "Định lý EV (Equal Variables): f(a, b, c) đạt cực trị khi a = b hoặc a = 0"
        ],
        latexFormula: "S_a (b-c)^2 + S_b (c-a)^2 + S_c (a-b)^2 \\ge 0",
        applications: ["Chứng minh các bất đẳng thức IMO khó có điểm biên"],
        practiceProblems: [
          { title: "IMO 2020 Problem 2: Bất đẳng thức 4 biến thực", judge: "IMO", url: "https://artofproblemsolving.com/community/c3158_imo", difficulty: "Hard" },
          { title: "IMO 2005 Problem 3: Bất đẳng thức 3 biến phân thức", judge: "IMO", url: "https://artofproblemsolving.com/community/c3158_imo", difficulty: "Hard" }
        ],
        blogSlug: null
      }
    ]
  },
  {
    id: 6,
    name: "Giai đoạn 6: Toán Cao Cấp & Olympic Sinh Viên",
    subtitle: "Putnam & University Math Olympiad",
    description: "Đại số tuyến tính trừu tượng, định lý Cayley-Hamilton, giải tích thực cổ điển, chuỗi và tích phân suy rộng, không gian metric sơ cấp.",
    icon: "fa6-solid:graduation-cap",
    nodes: [
      {
        id: "univ-linear-algebra-cayley",
        title: "Không Gian Vector & Định Lý Cayley-Hamilton",
        vietnameseTitle: "Đa thức đặc trưng, ma trận giao hoán và dạng chuẩn Jordan",
        description: "Đa thức đặc trưng p(λ) = det(λI - A), định lý Cayley-Hamilton p(A) = 0. Không gian con bất biến, giá trị riêng, vector riêng và ma trận luỹ linh.",
        status: "completed",
        difficulty: "Chuyên sâu VMO",
        prerequisites: ["Định thức", "Hệ phương trình"],
        keyTheorems: [
          "Định lý Cayley-Hamilton: Mọi ma trận vuông đều là nghiệm của đa thức đặc trưng của chính nó",
          "Vết của ma trận tr(AB) = tr(BA), định thức det(AB) = det(A)det(B)"
        ],
        latexFormula: "P_A(\\lambda) = \\det(\\lambda I - A) \\implies P_A(A) = \\mathbf{0}",
        applications: ["Tính lũy thừa ma trận cấp cao A^n", "Giải các bài toán ma trận Putnam"],
        practiceProblems: [
          { title: "Putnam 2019 Problem A2: Định thức ma trận AB - BA", judge: "Putnam", url: "https://artofproblemsolving.com/community/c4380_putnam", difficulty: "Hard" },
          { title: "Putnam 2021 Problem A2: Ma trận nghịch đảo", judge: "Putnam", url: "https://artofproblemsolving.com/community/c4380_putnam", difficulty: "Medium" }
        ],
        blogSlug: "2026-07-06-matrix-determinant-gauss"
      },
      {
        id: "univ-real-analysis-integrals",
        title: "Giải Tích Thực: Chuỗi Hội Tụ & Tích Phân Suy Rộng",
        vietnameseTitle: "Định lý giá trị trung bình Lagrange/Cauchy & Bất đẳng thức tích phân",
        description: "Khảo sát sự hội tụ của chuỗi số ∑ a_n, chuỗi đan dấu Leibniz, khai triển Taylor-Maclaurin, bất đẳng thức Cauchy-Schwarz và Hölder dạng tích phân.",
        status: "completed",
        difficulty: "Nâng cao TST",
        prerequisites: ["Đạo hàm", "Tích phân Riemann"],
        keyTheorems: [
          "Định lý Lagrange: f(b) - f(a) = f'(c)(b - a)",
          "BĐT Cauchy-Schwarz tích phân: (∫ f(x)g(x) dx)^2 ≤ (∫ f^2(x) dx) * (∫ g^2(x) dx)"
        ],
        latexFormula: "\\left(\\int_a^b f(x)g(x) \\, dx\\right)^2 \\le \\left(\\int_a^b f^2(x) \\, dx\\right) \\left(\\int_a^b g^2(x) \\, dx\\right)",
        applications: ["Ước lượng tổng Riemann", "Tính tích phân vô hạn và hàm Gamma"],
        practiceProblems: [
          { title: "Putnam 2017 Problem B1: Bất đẳng thức tích phân", judge: "Putnam", url: "https://artofproblemsolving.com/community/c4380_putnam", difficulty: "Medium" },
          { title: "Putnam 2018 Problem B2: Chuỗi số thực", judge: "Putnam", url: "https://artofproblemsolving.com/community/c4380_putnam", difficulty: "Hard" }
        ],
        blogSlug: null
      }
    ]
  }
];
