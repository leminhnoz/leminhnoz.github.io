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
  // ==========================================
  // STAGE 1: SỐ HỌC OLYMPIC (NUMBER THEORY)
  // ==========================================
  {
    id: 1,
    name: "Giai đoạn 1: Số Học Olympic",
    subtitle: "Olympiad Number Theory (NT)",
    description: "Từ nền tảng chia hết, thuật toán Euclid đến đồng dư thức, bổ đề LTE, thặng dư bậc hai và phương pháp Vieta Jumping đỉnh cao IMO.",
    icon: "fa6-solid:infinity",
    nodes: [
      {
        id: "nt-divisibility-euclid",
        title: "Tính Chia Hết & Định Lý Cơ Bản Của Số Học",
        vietnameseTitle: "Ước số, Thuật toán Euclid & Bổ đề Bézout",
        description: "Quan hệ chia hết, ước chung lớn nhất gcd(a, b), bổ đề Bézout tìm nghiệm nguyên ax + by = gcd(a, b), phân tích thừa số nguyên tố duy nhất, hàm số ước d(n) và hàm tổng ước σ(n).",
        status: "completed",
        difficulty: "Cơ bản Olympic",
        prerequisites: ["Phép chia có dư", "Quan hệ thứ tự"],
        keyTheorems: [
          "Bổ đề Bézout: Luôn tồn tại x, y ∈ Z sao cho ax + by = gcd(a, b)",
          "Định lý cơ bản của số học: Mọi số n > 1 phân tích duy nhất thành tích thừa số nguyên tố",
          "gcd(a, b) * lcm(a, b) = a * b"
        ],
        latexFormula: "a \\cdot x + b \\cdot y = \\gcd(a, b), \\quad n = \\prod_{i=1}^k p_i^{\\alpha_i}",
        applications: ["Giải phương trình Diophantine tuyến tính", "Xác định ước nguyên tố", "Rút gọn phân số đại số"],
        practiceProblems: [
          { title: "VMO 2021 Bài 3: Chia hết và ước nguyên tố", judge: "VMO", url: "https://artofproblemsolving.com/community/c3417_vietnam_national_olympiad", difficulty: "Medium" },
          { title: "USAMO 2003 Problem 1: Tính chất số nguyên", judge: "USAMO", url: "https://artofproblemsolving.com/community/c3413_usamo", difficulty: "Easy" }
        ],
        blogSlug: "2026-04-02-extended-euclidean-algorithm"
      },
      {
        id: "nt-congruence-euler-fermat",
        title: "Đồng Dư Thức, Hàm Phi Euler & Định Lý Fermat Nhỏ",
        vietnameseTitle: "Vành Z/mZ & Chu kỳ đồng dư thức",
        description: "Lý thuyết đồng dư modulo m, nghịch đảo modulo, hàm phi Euler φ(n) đếm số số nguyên tố cùng nhau, định lý Fermat nhỏ và định lý Euler tổng quát.",
        status: "completed",
        difficulty: "Cơ bản Olympic",
        prerequisites: ["Thuật toán Euclid", "Phân tích thừa số nguyên tố"],
        keyTheorems: [
          "Định lý Fermat nhỏ: a^(p-1) ≡ 1 (mod p) với gcd(a, p) = 1",
          "Định lý Euler: a^φ(n) ≡ 1 (mod n) với gcd(a, n) = 1",
          "Hàm phi Euler: φ(n) = n ∏ (1 - 1/p) với p là các ước nguyên tố của n"
        ],
        latexFormula: "a^{\\phi(n)} \\equiv 1 \\pmod{n}, \\quad \\phi(n) = n \\prod_{p \\mid n} \\left(1 - \\frac{1}{p}\\right)",
        applications: ["Tính số dư lũy thừa cực lớn", "Tìm chữ số tận cùng", "Xử lý đồng dư trong các đề thi HSG"],
        practiceProblems: [
          { title: "IMO 2005 Problem 4: Dãy số và ước đồng dư", judge: "IMO", url: "https://artofproblemsolving.com/community/c3158_imo", difficulty: "Medium" },
          { title: "USAMO 2018 Problem 2: Ước nguyên tố phân biệt", judge: "USAMO", url: "https://artofproblemsolving.com/community/c3413_usamo", difficulty: "Hard" }
        ],
        blogSlug: "2026-03-08-binary-exponentiation"
      },
      {
        id: "nt-wilson-crt",
        title: "Định Lý Wilson & Định Lý Thặng Dư Trung Hoa (CRT)",
        vietnameseTitle: "Tiêu chuẩn số nguyên tố Wilson & Hệ phương trình đồng dư",
        description: "Định lý Wilson (p-1)! ≡ -1 (mod p) và ứng dụng nhận diện số nguyên tố. Định lý thặng dư Trung Hoa (Chinese Remainder Theorem) giải hệ đồng dư bậc nhất một ẩn.",
        status: "completed",
        difficulty: "Chuyên sâu VMO",
        prerequisites: ["Nghịch đảo modulo", "Định lý Euler"],
        keyTheorems: [
          "Định lý Wilson: (p-1)! ≡ -1 (mod p) ⇔ p là số nguyên tố",
          "CRT: Hệ x ≡ a_i (mod m_i) có nghiệm duy nhất modulo M = m_1 * ... * m_k khi gcd(m_i, m_j) = 1"
        ],
        latexFormula: "(p-1)! \\equiv -1 \\pmod{p}, \\quad x \\equiv \\sum_{i=1}^k a_i M_i M_i^{-1} \\pmod{M}",
        applications: ["Giải hệ phương trình đồng dư", "Phân tích cấu trúc giai thừa modulo p", "Cấu trúc nhóm hữu hạn"],
        practiceProblems: [
          { title: "Vietnam TST 2021 Bài 6: Đồng dư và CRT", judge: "VMO", url: "https://artofproblemsolving.com/community/c3417_vietnam_national_olympiad", difficulty: "Hard" },
          { title: "RMM 2018 Problem 1: Ước chung đa thức", judge: "RMM", url: "https://artofproblemsolving.com/community/c3158_imo", difficulty: "Medium" }
        ],
        blogSlug: null
      },
      {
        id: "nt-order-primitive-roots",
        title: "Cấp Của Phần Tử & Căn Nguyên Thủy",
        vietnameseTitle: "Order of Elements & Primitive Roots",
        description: "Cấp ord_m(a) là số nguyên dương nhỏ nhất sao cho a^k ≡ 1 (mod m). Căn nguyên thủy g mod m sinh ra toàn bộ nhóm nhân (Z/mZ)* và điều kiện tồn tại căn nguyên thủy.",
        status: "completed",
        difficulty: "Chuyên sâu VMO",
        prerequisites: ["Định lý Euler"],
        keyTheorems: [
          "ord_m(a) | φ(m) và a^h ≡ 1 (mod m) ⇔ ord_m(a) | h",
          "Căn nguyên thủy tồn tại khi và chỉ khi m ∈ {2, 4, p^k, 2p^k} với p lẻ nguyên tố",
          "Nếu g là căn nguyên thủy thì ord_m(g^k) = φ(m) / gcd(k, φ(m))"
        ],
        latexFormula: "a^k \\equiv 1 \\pmod{m} \\iff \\text{ord}_m(a) \\mid k",
        applications: ["Xác định chu kỳ tuần hoàn", "Chứng minh một số không có ước nguyên tố dạng đặc biệt", "Logarithm rời rạc"],
        practiceProblems: [
          { title: "IMO Shortlist 2006 N5: Cấp của số nguyên", judge: "IMO", url: "https://artofproblemsolving.com/community/c3158_imo", difficulty: "Hard" },
          { title: "VMO 2021 Bài 3: Cấp của số nguyên", judge: "VMO", url: "https://artofproblemsolving.com/community/c3417_vietnam_national_olympiad", difficulty: "Medium" }
        ],
        blogSlug: null
      },
      {
        id: "nt-lte-lemma",
        title: "Bổ Đề Nâng Bậc Số Mũ LTE (Lifting The Exponent Lemma)",
        vietnameseTitle: "Vũ khí tối thượng cho phương trình số mũ và định giá p-adic v_p(n)",
        description: "Tính số mũ đúng v_p(a^n ± b^n) theo v_p(a ± b) và v_p(n). Công cụ giải quyết hàng loạt bài toán số học mũ trong đề thi TST và IMO.",
        status: "completed",
        difficulty: "Nâng cao TST",
        prerequisites: ["Đồng dư thức", "Nhị thức Newton", "Căn nguyên thủy"],
        keyTheorems: [
          "Với p lẻ, p | a - b, p ∤ a, p ∤ b: v_p(a^n - b^n) = v_p(a - b) + v_p(n)",
          "Với p lẻ, n lẻ, p | a + b: v_p(a^n + b^n) = v_p(a + b) + v_p(n)",
          "Với p = 2, n chẵn, 4 | a - b: v_2(a^n - b^n) = v_2(a - b) + v_2(a + b) + v_2(n) - 1"
        ],
        latexFormula: "v_p(a^n - b^n) = v_p(a - b) + v_p(n) \\quad (p \\ge 3, \\, p \\mid a - b)",
        applications: ["Giải phương trình Diophantine dạng a^x + b^y = c^z", "Đánh giá ước nguyên tố của a^n - 1"],
        practiceProblems: [
          { title: "USA TST 2018 Problem 5: Ứng dụng LTE", judge: "USAMO", url: "https://artofproblemsolving.com/community/c3413_usamo", difficulty: "Hard" },
          { title: "IMO Shortlist 2007 N5: Chia hết số mũ", judge: "IMO", url: "https://artofproblemsolving.com/community/c3158_imo", difficulty: "Hard" }
        ],
        blogSlug: null
      },
      {
        id: "nt-quadratic-reciprocity",
        title: "Thặng Dư Bậc Hai & Luật Thuận Nghịch Bình Phương Gauss",
        vietnameseTitle: "Ký hiệu Legendre, Tiêu chuẩn Euler & Phương trình Pell",
        description: "Xác định xem x^2 ≡ a (mod p) có nghiệm hay không thông qua ký hiệu Legendre (a/p), tiêu chuẩn Euler và định lý vàng của Gauss về luật thuận nghịch bình phương.",
        status: "in_progress",
        difficulty: "Nâng cao TST",
        prerequisites: ["Căn nguyên thủy", "Định lý Wilson"],
        keyTheorems: [
          "Tiêu chuẩn Euler: (a/p) ≡ a^((p-1)/2) (mod p)",
          "Luật thuận nghịch Gauss: (p/q)(q/p) = (-1)^(((p-1)/2) * ((q-1)/2))",
          "Phương trình Pell: x^2 - d*y^2 = 1 luôn có vô số nghiệm nguyên dương"
        ],
        latexFormula: "\\left(\\frac{p}{q}\\right) \\left(\\frac{q}{p}\\right) = (-1)^{\\frac{p-1}{2} \\cdot \\frac{q-1}{2}}",
        applications: ["Xét ước nguyên tố của biểu thức bậc hai x^2 + dy^2", "Giải phương trình Pell trong IMO"],
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
        id: "nt-zsigmondy-cyclotomic",
        title: "Định Lý Zsigmondy & Đa Thức Cyclotomic",
        vietnameseTitle: "Ước nguyên tố nguyên thủy của a^n - b^n & Bổ đề Hensel",
        description: "Với mọi a > b ≥ 1 nguyên tố cùng nhau, a^n - b^n luôn có ít nhất một ước nguyên tố nguyên thủy không chia hết bất kỳ a^k - b^k nào với k < n (trừ các ngoại lệ cụ thể). Bổ đề Hensel nâng nghiệm.",
        status: "in_progress",
        difficulty: "Đỉnh cao IMO",
        prerequisites: ["LTE", "Căn nguyên thủy"],
        keyTheorems: [
          "Định lý Zsigmondy: Tồn tại ước nguyên tố nguyên thủy cho mọi n > 1 ngoại trừ a=2, b=1, n=6 và a+b=2^k với n=2",
          "Bổ đề Hensel: Nâng nghiệm f(x) ≡ 0 (mod p) lên mod p^k khi f'(x) ≢ 0 (mod p)"
        ],
        latexFormula: "\\exists p \\mid (a^n - b^n) \\quad \\text{sao cho} \\quad \\forall k < n, \\, p \\nmid (a^k - b^k)",
        applications: ["Giải triệt để các phương trình Diophantine lũy thừa IMO", "Phân tích đa thức chia đường tròn"],
        practiceProblems: [
          { title: "IMO 2012 Problem 3: Ứng dụng Zsigmondy", judge: "IMO", url: "https://artofproblemsolving.com/community/c3158_imo", difficulty: "Hard" },
          { title: "USA TST 2014 Problem 1: Ước nguyên tố nguyên thủy", judge: "USAMO", url: "https://artofproblemsolving.com/community/c3413_usamo", difficulty: "Hard" }
        ],
        blogSlug: null
      }
    ]
  },

  // ==========================================
  // STAGE 2: ĐẠI SỐ & PHƯƠNG TRÌNH HÀM (ALGEBRA & FE)
  // ==========================================
  {
    id: 2,
    name: "Giai đoạn 2: Đại Số & Phương Trình Hàm",
    subtitle: "Olympiad Algebra & Functional Equations",
    description: "Từ đa thức cơ bản, hệ thức Viète đến tiêu chuẩn Eisenstein, dãy số truy hồi, phương trình hàm Cauchy và các kỹ thuật song ánh đỉnh cao IMO.",
    icon: "fa6-solid:square-root-variable",
    nodes: [
      {
        id: "alg-polynomial-vieta",
        title: "Đa Thức Cơ Bản, Phép Chia Có Dư & Hệ Thức Viète",
        vietnameseTitle: "Định lý Bézout & Đa thức đối xứng sơ cấp",
        description: "Đa thức một biến, phép chia có dư, định lý Bézout P(x) = (x - c)Q(x) + P(c), hệ thức Viète cho đa thức bậc n, công thức Newton cho tổng lũy thừa S_k = ∑ x_i^k.",
        status: "completed",
        difficulty: "Cơ bản Olympic",
        prerequisites: ["Đại số sơ cấp"],
        keyTheorems: [
          "Định lý Bézout: c là nghiệm của P(x) ⇔ (x - c) | P(x)",
          "Hệ thức Viète: e_k = (-1)^k * a_{n-k} / a_n",
          "Công thức Newton liên hệ tổng lũy thừa và đa thức đối xứng"
        ],
        latexFormula: "P(x) = (x - c)Q(x) + P(c), \\quad \\sum_{i=1}^n x_i = -\\frac{a_{n-1}}{a_n}",
        applications: ["Giải hệ phương trình đối xứng", "Tính tổng lũy thừa nghiệm", "Biến đổi đa thức"],
        practiceProblems: [
          { title: "USAMO 2003 Problem 1: Đa thức nguyên", judge: "USAMO", url: "https://artofproblemsolving.com/community/c3413_usamo", difficulty: "Easy" },
          { title: "VMO 2019 Bài 2: Đa thức nghiệm thực", judge: "VMO", url: "https://artofproblemsolving.com/community/c3417_vietnam_national_olympiad", difficulty: "Medium" }
        ],
        blogSlug: null
      },
      {
        id: "alg-roots-irreducibility-eisenstein",
        title: "Đa Thức Nguyên, Nghiệm Phức & Tiêu Chuẩn Eisenstein",
        vietnameseTitle: "Bổ đề Gauss, Tiêu chuẩn Eisenstein & Đa thức nội suy Lagrange",
        description: "Định lý nghiệm hữu tỉ, tính chất a - b | P(a) - P(b), Bổ đề Gauss, tiêu chuẩn Eisenstein chứng minh đa thức bất khả quy trên Q[x], công thức nội suy Lagrange.",
        status: "completed",
        difficulty: "Chuyên sâu VMO",
        prerequisites: ["Hệ thức Viète", "Số học modulo"],
        keyTheorems: [
          "Tính chất cơ bản: Với P(x) ∈ Z[x], ta có a - b | P(a) - P(b) với mọi a, b ∈ Z",
          "Tiêu chuẩn Eisenstein: Nếu p | a_i (i < n), p ∤ a_n, p^2 ∤ a_0 thì P(x) bất khả quy trên Q[x]",
          "Đa thức nội suy Lagrange: Khôi phục duy nhất đa thức bậc n qua n+1 điểm"
        ],
        latexFormula: "P(x) = \\sum_{i=0}^n y_i \\prod_{j \\ne i} \\frac{x - x_j}{x_i - x_j}, \\quad a - b \\mid P(a) - P(b)",
        applications: ["Chứng minh đa thức không có nghiệm hữu tỉ", "Xác định đa thức qua tập giá trị", "Phương trình nghiệm nguyên đa thức"],
        practiceProblems: [
          { title: "IMO Shortlist 2008 A1: Đa thức nguyên", judge: "IMO", url: "https://artofproblemsolving.com/community/c3158_imo", difficulty: "Medium" },
          { title: "Putnam 2020 Problem A1: Đa thức nhân tính", judge: "Putnam", url: "https://artofproblemsolving.com/community/c4380_putnam", difficulty: "Medium" }
        ],
        blogSlug: null
      },
      {
        id: "alg-sequences-limits-recurrence",
        title: "Dãy Số, Sai Phân Tuyến Tính & Giới Hạn Dãy Thực",
        vietnameseTitle: "Phương trình đặc trưng & Định lý Weierstrass",
        description: "Công thức tổng quát dãy truy hồi tuyến tính bằng phương trình đặc trưng. Khảo sát tính đơn điệu, bị chặn, chứng minh tồn tại giới hạn theo định lý Weierstrass và định lý kẹp.",
        status: "completed",
        difficulty: "Chuyên sâu VMO",
        prerequisites: ["Giới hạn dãy số", "Đạo hàm sơ cấp"],
        keyTheorems: [
          "Định lý Weierstrass: Mọi dãy số đơn điệu và bị chặn đều có giới hạn hữu hạn",
          "Nghiệm phương trình đặc trưng r^2 - a*r - b = 0 xác định dạng x_n = c1*r1^n + c2*r2^n",
          "Hàm co Banach: Nếu |f'(x)| ≤ q < 1 thì dãy x_{n+1} = f(x_n) hội tụ về điểm bất động duy nhất"
        ],
        latexFormula: "x_{n+1} = f(x_n), \\quad |f'(x)| < 1 \\implies \\lim_{n \\to \\infty} x_n = L",
        applications: ["Dạng bài 1 đề thi VMO hàng năm", "Đánh giá sai số hội tụ", "Dãy số nguyên Fibonacci"],
        practiceProblems: [
          { title: "VMO 2019 Bài 1: Giới hạn dãy số truy hồi", judge: "VMO", url: "https://artofproblemsolving.com/community/c3417_vietnam_national_olympiad", difficulty: "Medium" },
          { title: "VMO 2020 Bài 1: Dãy số hữu tỉ", judge: "VMO", url: "https://artofproblemsolving.com/community/c3417_vietnam_national_olympiad", difficulty: "Medium" }
        ],
        blogSlug: "2026-04-27-fibonacci-numbers-secrets"
      },
      {
        id: "alg-cauchy-jensen-fe",
        title: "Phương Trình Hàm Cơ Bản & Phương Trình Cauchy",
        vietnameseTitle: "Phương trình Cauchy trên Q và mở rộng lên R",
        description: "Giải phương trình hàm Cauchy f(x + y) = f(x) + f(y) qua các bước N -> Z -> Q -> R bằng điều kiện liên tục, đơn điệu hoặc bị chặn. Các biến thể Cauchy, Jensen và d'Alembert.",
        status: "completed",
        difficulty: "Chuyên sâu VMO",
        prerequisites: ["Tập hợp số", "Tính liên tục"],
        keyTheorems: [
          "Phương trình Cauchy: f(x+y) = f(x) + f(y) trên Q có nghiệm duy nhất f(x) = cx",
          "Nếu f liên tục hoặc đơn điệu hoặc bị chặn một phía trên một khoảng thì f(x) = cx trên toàn bộ R",
          "Phương trình Jensen: f((x+y)/2) = (f(x)+f(y))/2 ⇔ f(x) = ax + b"
        ],
        latexFormula: "f(x + y) = f(x) + f(y) \\implies f(x) = c \\cdot x \\quad (x \\in \\mathbb{R})",
        applications: ["Giải các bài phương trình hàm trong VMO", "Phương trình hàm logarit f(xy) = f(x) + f(y)"],
        practiceProblems: [
          { title: "VMO 2022 Bài 2: Phương trình hàm trên R", judge: "VMO", url: "https://artofproblemsolving.com/community/c3417_vietnam_national_olympiad", difficulty: "Medium" },
          { title: "USAMO 2019 Problem 4: PT hàm Cauchy", judge: "USAMO", url: "https://artofproblemsolving.com/community/c3413_usamo", difficulty: "Hard" }
        ],
        blogSlug: null
      },
      {
        id: "alg-advanced-fe-imo",
        title: "Kỹ Thuật Nâng Cao Giải Phương Trình Hàm IMO",
        vietnameseTitle: "Song ánh, Điểm bất động & Phương trình hàm tự lồng",
        description: "Khai thác tính đơn ánh, toàn ánh, song ánh; tìm điểm bất động f(c) = c và điểm triệt tiêu f(x0) = 0; phương pháp thế biến đối xứng; phương trình hàm tự lồng f(f(x)) và trên tập số nguyên Z.",
        status: "in_progress",
        difficulty: "Đỉnh cao IMO",
        prerequisites: ["Phương trình hàm Cauchy", "Lý thuyết ánh xạ"],
        keyTheorems: [
          "Tính đơn ánh: f(a) = f(b) ⇒ a = b (khử hàm ngoài)",
          "Toàn ánh: Luôn tồn tại t sao cho f(t) = 0 hoặc f(t) = y",
          "Kỹ thuật bất động điểm: Khảo sát f(c) = c để tìm dạng toàn thể"
        ],
        latexFormula: "f(f(x) + y) = 2x + f(f(y) - x) \\implies f \\text{ là song ánh}",
        applications: ["Giải bài 1 & bài 5 đề thi IMO", "Phương trình hàm số học trên tập số nguyên Z"],
        practiceProblems: [
          { title: "IMO 2019 Problem 1: PT hàm số học f(2a) + 2f(b) = f(f(a+b))", judge: "IMO", url: "https://artofproblemsolving.com/community/c3158_imo", difficulty: "Medium" },
          { title: "IMO 1977 Problem 6: f(f(n)) < f(n+1)", judge: "IMO", url: "https://artofproblemsolving.com/community/c3158_imo", difficulty: "Hard" }
        ],
        blogSlug: null
      }
    ]
  },

  // ==========================================
  // STAGE 3: HÌNH HỌC PHẲNG THUẦN TÚY (EUCLIDEAN GEOMETRY)
  // ==========================================
  {
    id: 3,
    name: "Giai đoạn 3: Hình Học Phẳng Thuần Túy",
    subtitle: "Olympiad Euclidean Geometry",
    description: "Từ định lý Ceva, Menelaus, phương tích đến hàng điểm điều hòa, định lý Pascal, Desargues và phép nghịch đảo đường tròn đỉnh cao IMO.",
    icon: "fa6-solid:shapes",
    nodes: [
      {
        id: "geo-collinearity-special-points",
        title: "Đồng Quy, Thẳng Hàng & Các Điểm Đặc Biệt Tam Giác",
        vietnameseTitle: "Định lý Ceva, Menelaus & Đường thẳng Euler",
        description: "Định lý Ceva và Menelaus (dạng đại số và lượng giác), các điểm đặc biệt: Trọng tâm G, Trực tâm H, Tâm ngoại tiếp O, Tâm nội tiếp I, Tâm bàng tiếp. Đường thẳng Euler và đường tròn Euler 9 điểm.",
        status: "completed",
        difficulty: "Cơ bản Olympic",
        prerequisites: ["Hình học phẳng THCS", "Tỉ số đoạn thẳng"],
        keyTheorems: [
          "Định lý Ceva: AD, BE, CF đồng quy ⇔ (AF/FB) * (BD/DC) * (CE/EA) = 1",
          "Định lý Menelaus: D, E, F thẳng hàng ⇔ (AF/FB) * (BD/DC) * (CE/EA) = -1",
          "Đường thẳng Euler: O, G, H thẳng hàng với GH = 2*OG"
        ],
        latexFormula: "\\frac{\\overline{AF}}{\\overline{FB}} \\cdot \\frac{\\overline{BD}}{\\overline{DC}} \\cdot \\frac{\\overline{CE}}{\\overline{EA}} = 1",
        applications: ["Chứng minh 3 đường thẳng đồng quy", "Chứng minh 3 điểm thẳng hàng", "Tính chất tâm nội tiếp"],
        practiceProblems: [
          { title: "IMO 2014 Problem 4: Điểm liên kết tam giác", judge: "IMO", url: "https://artofproblemsolving.com/community/c3158_imo", difficulty: "Medium" },
          { title: "VMO 2017 Bài 2: Cấu hình đồng quy", judge: "VMO", url: "https://artofproblemsolving.com/community/c3417_vietnam_national_olympiad", difficulty: "Medium" }
        ],
        blogSlug: null
      },
      {
        id: "geo-power-radical-axis",
        title: "Phương Tích, Trục Đẳng Phương & Tâm Đẳng Phương",
        vietnameseTitle: "Power of a Point, Radical Axis & Radical Center",
        description: "Phương tích của điểm M đối với đường tròn (O; R): P_M/(O) = MO^2 - R^2 = MA * MB. Tập hợp các điểm có cùng phương tích tạo thành trục đẳng phương vuông góc với đoạn nối tâm. Tâm đẳng phương của 3 đường tròn.",
        status: "completed",
        difficulty: "Cơ bản Olympic",
        prerequisites: ["Tứ giác nội tiếp", "Định lý Pythagore"],
        keyTheorems: [
          "Trục đẳng phương của hai đường tròn không đồng tâm luôn là một đường thẳng vuông góc với O1O2",
          "Tâm đẳng phương của 3 đường tròn có các trục đẳng phương đồng quy hoặc đôi một song song"
        ],
        latexFormula: "\\mathcal{P}_{M/(O)} = MO^2 - R^2 = \\overline{MA} \\cdot \\overline{MB}",
        applications: ["Chứng minh 3 điểm thẳng hàng qua tâm đẳng phương", "Chứng minh 4 điểm cùng thuộc một đường tròn", "Đường tròn đồng trục"],
        practiceProblems: [
          { title: "IMO 2008 Problem 4: Trục đẳng phương và tứ giác nội tiếp", judge: "IMO", url: "https://artofproblemsolving.com/community/c3158_imo", difficulty: "Medium" },
          { title: "USAMO 2014 Problem 1: Phương tích và tiếp tuyến", judge: "USAMO", url: "https://artofproblemsolving.com/community/c3413_usamo", difficulty: "Medium" }
        ],
        blogSlug: null
      },
      {
        id: "geo-harmonic-bundles",
        title: "Hàng Điểm Điều Hòa, Chùm Điều Hòa & Tứ Giác Toàn Phần",
        vietnameseTitle: "Tỉ số kép, Tứ giác toàn phần & Tứ giác điều hòa",
        description: "Định nghĩa tỉ số kép (A, B; C, D) = -1, các tính chất bảo toàn qua phép chiếu xuyên tâm (chùm điều hòa), hệ thức Newton, hệ thức Descartes, tứ giác toàn phần và tứ giác nội tiếp điều hòa.",
        status: "completed",
        difficulty: "Chuyên sâu VMO",
        prerequisites: ["Định lý Menelaus", "Phương tích"],
        keyTheorems: [
          "Hàng điểm điều hòa: (AB, CD) = (CA/CB) : (DA/DB) = -1",
          "Hệ thức Newton: IA^2 = IC * ID (với I là trung điểm AB)",
          "Tứ giác toàn phần: Ba đường chéo tạo thành các hàng điểm điều hòa",
          "Tứ giác điều hòa nội tiếp: AB * CD = AD * BC"
        ],
        latexFormula: "(A, B; C, D) = \\frac{\\overline{CA}}{\\overline{CB}} : \\frac{\\overline{DA}}{\\overline{DB}} = -1, \\quad IA^2 = \\overline{IC} \\cdot \\overline{ID}",
        applications: ["Chứng minh đường thẳng đi qua điểm cố định", "Chứng minh tiếp tuyến", "Bài 4 đề thi VMO hàng năm"],
        practiceProblems: [
          { title: "VMO 2020 Bài 4: Hàng điểm điều hòa và trực tâm", judge: "VMO", url: "https://artofproblemsolving.com/community/c3417_vietnam_national_olympiad", difficulty: "Hard" },
          { title: "IMO 2016 Problem 1: Tứ giác điều hòa", judge: "IMO", url: "https://artofproblemsolving.com/community/c3158_imo", difficulty: "Medium" }
        ],
        blogSlug: null
      },
      {
        id: "geo-projective-theorems",
        title: "Các Định Lý Xạ Ảnh: Pascal, Brianchon, Desargues",
        vietnameseTitle: "Lục giác nội tiếp conic & Lý thuyết Cực - Đối cực",
        description: "Định lý Pascal cho lục giác nội tiếp đường tròn (giao điểm 3 cặp cạnh đối thẳng hàng), định lý Brianchon cho lục giác ngoại tiếp, định lý Desargues cho 2 tam giác thấu xạ, định lý La Hire về cực và đối cực.",
        status: "in_progress",
        difficulty: "Nâng cao TST",
        prerequisites: ["Hàng điểm điều hòa", "Định lý Ceva/Menelaus"],
        keyTheorems: [
          "Định lý Pascal: Giao điểm của các cạnh đối của một lục giác nội tiếp đường tròn luôn thẳng hàng",
          "Định lý Desargues: Hai tam giác thấu xạ đỉnh khi và chỉ khi thấu xạ trục",
          "Định lý La Hire: Điểm A thuộc đối cực của B ⇔ B thuộc đối cực của A"
        ],
        latexFormula: "P = AB \\cap DE, \\, Q = BC \\cap EF, \\, R = CD \\cap FA \\implies P, Q, R \\text{ thẳng hàng}",
        applications: ["Giải các bài toán đồng quy - thẳng hàng phức tạp trong TST và IMO"],
        practiceProblems: [
          { title: "Vietnam TST 2018 Bài 2: Cấu hình Desargues và cực đối cực", judge: "VMO", url: "https://artofproblemsolving.com/community/c3417_vietnam_national_olympiad", difficulty: "Hard" },
          { title: "IMO Shortlist 2011 G4: Định lý Pascal", judge: "IMO", url: "https://artofproblemsolving.com/community/c3158_imo", difficulty: "Hard" }
        ],
        blogSlug: null
      },
      {
        id: "geo-inversion-spiral-similarity",
        title: "Phép Biến Hình: Phép Vị Tự Quay & Phép Nghịch Đảo",
        vietnameseTitle: "Spiral Similarity, Circle Inversion & Điểm Miquel",
        description: "Phép nghịch đảo cực O phương tích k biến đường tròn thành đường tròn hoặc đường thẳng, bảo toàn góc (ánh xạ bảo giác). Phép vị tự quay giải cấu hình điểm Miquel và tam giác đồng dạng định hướng.",
        status: "in_progress",
        difficulty: "Đỉnh cao IMO",
        prerequisites: ["Góc định hướng", "Hình học xạ ảnh"],
        keyTheorems: [
          "Phép nghịch đảo: OP * OP' = k. Đường tròn qua tâm biến thành đường thẳng không qua tâm",
          "Công thức khoảng cách nghịch đảo: P'Q' = |k| * PQ / (OP * OQ)",
          "Điểm Miquel: Bốn đường tròn ngoại tiếp các tam giác của một tứ giác toàn phần đồng quy tại điểm Miquel"
        ],
        latexFormula: "I_{(O, k)}: P \\mapsto P' \\quad \\text{sao cho} \\quad \\vec{OP'} = \\frac{k}{OP^2} \\vec{OP}, \\quad P'Q' = \\frac{|k| \\cdot PQ}{OP \\cdot OQ}",
        applications: ["Biến các cấu hình tiếp xúc phức tạp thành tiếp tuyến song song", "Tâm vị tự quay biến đoạn thẳng này thành đoạn khác"],
        practiceProblems: [
          { title: "IMO 2015 Problem 3: Nghịch đảo và đường tròn", judge: "IMO", url: "https://artofproblemsolving.com/community/c3158_imo", difficulty: "Hard" },
          { title: "RMM 2020 Problem 3: Điểm Miquel và vị tự quay", judge: "RMM", url: "https://artofproblemsolving.com/community/c3158_imo", difficulty: "Hard" }
        ],
        blogSlug: null
      }
    ]
  },

  // ==========================================
  // STAGE 4: TỔ HỢP & LÝ THUYẾT RỜI RẠC (COMBINATORICS)
  // ==========================================
  {
    id: 4,
    name: "Giai đoạn 4: Tổ Hợp & Lý Thuyết Rời Rạc",
    subtitle: "Olympiad Combinatorics & Discrete Mathematics",
    description: "Từ nguyên lý Dirichlet, cực hạn đến bất biến, đếm hai cách, lý thuyết đồ thị Turán - Ramsey và các trò chơi tổ hợp đỉnh cao IMO.",
    icon: "fa6-solid:dice-d20",
    nodes: [
      {
        id: "comb-pigeonhole-extremal",
        title: "Nguyên Lý Dirichlet & Nguyên Lý Cực Hạn",
        vietnameseTitle: "Pigeonhole Principle & Extremal Principle",
        description: "Nguyên lý Dirichlet dạng rời rạc và liên tục (phân chia độ dài, diện tích). Nguyên lý Cực hạn (Extremal Principle): xét phần tử có tính chất cực trị (nhỏ nhất, lớn nhất, góc nhọn nhất, bao lồi) để suy ra mâu thuẫn.",
        status: "completed",
        difficulty: "Cơ bản Olympic",
        prerequisites: ["Tập hợp hữu hạn", "Quan hệ thứ tự"],
        keyTheorems: [
          "Dirichlet tổng quát: Phân phối n vật vào k ngăn thì tồn tại ngăn có ít nhất ⌈n/k⌉ vật",
          "Mọi tập con hữu hạn khác rỗng của R luôn có phần tử nhỏ nhất và lớn nhất",
          "Bài toán Sylvester-Gallai: Tập hữu hạn điểm không thẳng hàng luôn có đường thẳng đi qua đúng 2 điểm"
        ],
        latexFormula: "\\exists c \\in S: \\quad c = \\min(S) \\quad \\text{hoặc} \\quad c = \\max(S), \\quad \\left\\lceil \\frac{n}{k} \\right\\rceil",
        applications: ["Hình học tổ hợp", "Chứng minh sự tồn tại cấu trúc", "Bài toán chia kẹo và xếp lịch"],
        practiceProblems: [
          { title: "USAMO 2015 Problem 1: Nguyên lý cực hạn lưới", judge: "USAMO", url: "https://artofproblemsolving.com/community/c3413_usamo", difficulty: "Medium" },
          { title: "IMO 2011 Problem 2: Windmill (Cối xay gió tổ hợp)", judge: "IMO", url: "https://artofproblemsolving.com/community/c3158_imo", difficulty: "Hard" }
        ],
        blogSlug: null
      },
      {
        id: "comb-invariants-monovariants-coloring",
        title: "Bất Biến, Đơn Biến & Kỹ Thuật Tô Màu",
        vietnameseTitle: "Invariants, Monovariants & Coloring Techniques",
        description: "Tìm đại lượng không đổi (bất biến) hoặc luôn tăng/giảm ngặt (đơn biến / hàm thế vị) qua từng trạng thái biến đổi. Kỹ thuật tô màu bàn cờ (checkerboard, mod k) để chứng minh tính không thể lát gạch.",
        status: "completed",
        difficulty: "Chuyên sâu VMO",
        prerequisites: ["Quy nạp toán học", "Đồng dư thức"],
        keyTheorems: [
          "Bất biến mod 2 hoặc mod k để chứng minh một trạng thái không thể đạt tới",
          "Hàm thế vị đơn biến bị chặn suy ra quá trình phải dừng lại sau hữu hạn bước",
          "Tô màu bàn cờ chứng minh điều kiện cần để phủ kín bởi các khối domino/tromino"
        ],
        latexFormula: "\\Phi(S_{t+1}) < \\Phi(S_t) \\implies \\text{Quá trình hữu hạn bước dừng}",
        applications: ["Trò chơi biến đổi số trên bảng", "Lát gạch bàn cờ", "Thuật toán lặp rời rạc"],
        practiceProblems: [
          { title: "VMO 2023 Bài 5: Bất biến phân hoạch", judge: "VMO", url: "https://artofproblemsolving.com/community/c3417_vietnam_national_olympiad", difficulty: "Medium" },
          { title: "IMO Shortlist 2014 C1: Trạng thái tiền xu", judge: "IMO", url: "https://artofproblemsolving.com/community/c3158_imo", difficulty: "Medium" }
        ],
        blogSlug: null
      },
      {
        id: "comb-double-counting-identities",
        title: "Phương Pháp Đếm Hai Cách & Đẳng Thức Tổ Hợp",
        vietnameseTitle: "Double Counting, Bổ đề bắt tay & Định lý Sperner",
        description: "Đếm số cặp (x, y) thỏa mãn quan hệ R theo hai chiều: theo hàng và theo cột. Bổ đề bắt tay cho đồ thị, bất đẳng thức Cauchy-Schwarz áp dụng cho ma trận liên thuộc, định lý Sperner về phản xích lớn nhất.",
        status: "completed",
        difficulty: "Chuyên sâu VMO",
        prerequisites: ["Tổ hợp nCr", "Ma trận nhị phân"],
        keyTheorems: [
          "Bổ đề bắt tay: Tổng bậc của tất cả các đỉnh bằng hai lần số cạnh: ∑ deg(v) = 2E",
          "Đếm hai cách: ∑_{x} deg(x) = |R| = ∑_{y} deg(y)",
          "Định lý Sperner: Kích thước của một phản xích lớn nhất trong tập n phần tử là C(n, ⌊n/2⌋)"
        ],
        latexFormula: "\\sum_{x \\in X} \\deg(x) = |\\mathcal{R}| = \\sum_{y \\in Y} \\deg(y), \\quad \\sum_{v \\in V} \\deg(v) = 2E",
        applications: ["Đánh giá số trận thắng trong thi đấu vòng tròn", "Định lý Erdős-Ko-Rado", "Bất đẳng thức tổ hợp"],
        practiceProblems: [
          { title: "IMO 1998 Problem 2: Đếm hai cách thi đấu", judge: "IMO", url: "https://artofproblemsolving.com/community/c3158_imo", difficulty: "Medium" },
          { title: "IMO 1989 Problem 3: Đếm số bộ ba điểm", judge: "IMO", url: "https://artofproblemsolving.com/community/c3158_imo", difficulty: "Hard" }
        ],
        blogSlug: null
      },
      {
        id: "comb-graph-theory-turan-ramsey",
        title: "Lý Thuyết Đồ Thị Olympic: Định Lý Turán & Ramsey",
        vietnameseTitle: "Đồ thị phẳng, Định lý Mantel, Turán & Số màu Ramsey",
        description: "Công thức Euler cho đồ thị phẳng V - E + F = 2. Cực trị số cạnh của đồ thị không chứa tam giác (Định lý Mantel) và không chứa K_{r+1} (Định lý Turán). Lý thuyết Ramsey R(k, l) và bài toán tô màu cạnh.",
        status: "in_progress",
        difficulty: "Nâng cao TST",
        prerequisites: ["Khái niệm đồ thị cơ bản", "Đếm hai cách"],
        keyTheorems: [
          "Định lý Mantel: Đồ thị không chứa tam giác có tối đa ⌊n^2 / 4⌋ cạnh",
          "Định lý Turán: Số cạnh tối đa của đồ thị n đỉnh không chứa K_{r+1} là (1 - 1/r) * n^2 / 2",
          "Công thức Euler đồ thị phẳng: V - E + F = 2",
          "Định lý Ramsey: R(3, 3) = 6, R(s, t) ≤ R(s-1, t) + R(s, t-1)"
        ],
        latexFormula: "e(G) \\le \\left(1 - \\frac{1}{r}\\right) \\frac{n^2}{2}, \\quad V - E + F = 2, \\quad R(3, 3) = 6",
        applications: ["Quan hệ quen biết trong nhóm người", "Cấu trúc mạng lưới cực trị", "Tô màu bản đồ"],
        practiceProblems: [
          { title: "Vietnam TST 2020 Bài 3: Định lý Ramsey và tô màu cạnh", judge: "VMO", url: "https://artofproblemsolving.com/community/c3417_vietnam_national_olympiad", difficulty: "Hard" },
          { title: "IMO 2017 Problem 3: Thỏ và thợ săn trên đồ thị", judge: "IMO", url: "https://artofproblemsolving.com/community/c3158_imo", difficulty: "Hard" }
        ],
        blogSlug: null
      },
      {
        id: "comb-games-windmill-imo",
        title: "Trò Chơi Tổ Hợp & Hình Học Tổ Hợp IMO",
        vietnameseTitle: "Chiến lược đối xứng, Định lý Sprague-Grundy & Cối xay gió",
        description: "Chiến lược đối xứng trong trò chơi hai người, trò chơi Nim và phép cộng Nim-sum, định lý Sprague-Grundy. Bài toán cối xay gió tổ hợp (Windmill - Terence Tao) bảo toàn phân chia nửa mặt phẳng.",
        status: "in_progress",
        difficulty: "Đỉnh cao IMO",
        prerequisites: ["Bất biến", "Nguyên lý cực hạn"],
        keyTheorems: [
          "Trò chơi Nim: Vị trí thua khi và chỉ khi Nim-sum xor = 0",
          "Định lý Sprague-Grundy: Mọi trò chơi không thiên vị đều tương đương một đống Nim kích thước g(v)",
          "Bài toán cối xay gió: Đường thẳng quay qua các điểm luôn quay đủ 180 độ và qua mọi điểm"
        ],
        latexFormula: "\\text{Nim-sum} = a_1 \\oplus a_2 \\oplus \\dots \\oplus a_k = 0",
        applications: ["Giải các bài toán trò chơi bốc sỏi", "Hình học tổ hợp điểm và đường thẳng trên mặt phẳng"],
        practiceProblems: [
          { title: "IMO 2011 Problem 2: The Windmill Problem (Terence Tao)", judge: "IMO", url: "https://artofproblemsolving.com/community/c3158_imo", difficulty: "Hard" },
          { title: "USAMO 2015 Problem 1: Trò chơi trên lưới", judge: "USAMO", url: "https://artofproblemsolving.com/community/c3413_usamo", difficulty: "Medium" }
        ],
        blogSlug: null
      }
    ]
  },

  // ==========================================
  // STAGE 5: BẤT ĐẲNG THỨC & CỰC TRỊ OLYMPIC (INEQUALITIES)
  // ==========================================
  {
    id: 5,
    name: "Giai đoạn 5: Bất Đẳng Thức & Cực Trị Olympic",
    subtitle: "Olympiad Inequalities & Optimization",
    description: "Từ AM-GM, Cauchy-Schwarz dạng Engel đến bất đẳng thức Schur, kỹ thuật đổi biến p, q, r, phân tích bình phương SOS và dồn biến EV/MV đỉnh cao IMO.",
    icon: "fa6-solid:scale-balanced",
    nodes: [
      {
        id: "ineq-classical-amgm-cauchy",
        title: "Bất Đẳng Thức Cổ Điển: AM-GM & Cauchy-Schwarz",
        vietnameseTitle: "Kỹ thuật chọn điểm rơi & BĐT Cauchy-Schwarz dạng Engel",
        description: "Bất đẳng thức AM-GM cho n số không âm, kỹ thuật chọn điểm rơi đối xứng và không đối xứng, kỹ thuật thêm bớt hạng tử, bất đẳng thức Cauchy-Schwarz dạng Engel (cộng mẫu Sedrakyan), kỹ thuật chuẩn hóa biến.",
        status: "completed",
        difficulty: "Cơ bản Olympic",
        prerequisites: ["Biến đổi đại số", "Đẳng thức đáng nhớ"],
        keyTheorems: [
          "BĐT AM-GM: (a1 + ... + an)/n ≥ (a1*...*an)^(1/n)",
          "BĐT Cauchy-Schwarz dạng Engel: ∑ (a_i^2 / b_i) ≥ (∑ a_i)^2 / ∑ b_i",
          "Kỹ thuật chuẩn hóa: Đặt a + b + c = 3 hoặc abc = 1 nhờ tính đồng bậc"
        ],
        latexFormula: "\\sum_{i=1}^n \\frac{a_i^2}{b_i} \\ge \\frac{\\left(\\sum_{i=1}^n a_i\\right)^2}{\\sum_{i=1}^n b_i}, \\quad \\frac{a_1 + \\dots + a_n}{n} \\ge \\sqrt[n]{a_1 \\dots a_n}",
        applications: ["Đánh giá cực trị phân thức 3 biến", "Tìm giá trị lớn nhất / nhỏ nhất"],
        practiceProblems: [
          { title: "VMO 2018 Bài 3: Bất đẳng thức 3 biến phân thức", judge: "VMO", url: "https://artofproblemsolving.com/community/c3417_vietnam_national_olympiad", difficulty: "Medium" },
          { title: "APMO 2021 Problem 2: BĐT 3 biến đối xứng", judge: "APMO", url: "https://artofproblemsolving.com/community/c3158_imo", difficulty: "Medium" }
        ],
        blogSlug: null
      },
      {
        id: "ineq-holder-minkowski-chebyshev",
        title: "Bất Đẳng Thức Nâng Cao: Hölder, Minkowski & Chebyshev",
        vietnameseTitle: "Bất đẳng thức hoán vị, tích phân & vector",
        description: "Bất đẳng thức Hölder cho 3 bộ số hoặc n bộ số, bất đẳng thức Minkowski (bất đẳng thức tam giác vector), bất đẳng thức Chebyshev cho các dãy số đơn điệu cùng chiều, bất đẳng thức hoán vị.",
        status: "completed",
        difficulty: "Chuyên sâu VMO",
        prerequisites: ["BĐT Cauchy-Schwarz", "AM-GM"],
        keyTheorems: [
          "BĐT Hölder: (∑ a_i^p)^(1/p) * (∑ b_i^q)^(1/q) ≥ ∑ a_i * b_i với 1/p + 1/q = 1",
          "BĐT Minkowski: √(∑ (a_i + b_i)^2) ≤ √(∑ a_i^2) + √(∑ b_i^2)",
          "BĐT Chebyshev: Nếu a1 ≤ ... ≤ an và b1 ≤ ... ≤ bn thì n ∑ a_i b_i ≥ (∑ a_i)(∑ b_i)"
        ],
        latexFormula: "\\left(\\sum_{i=1}^n a_i^3\\right)^{\\frac{1}{3}} \\left(\\sum_{i=1}^n b_i^3\\right)^{\\frac{1}{3}} \\left(\\sum_{i=1}^n c_i^3\\right)^{\\frac{1}{3}} \\ge \\sum_{i=1}^n a_i b_i c_i",
        applications: ["Khử căn thức bậc 3", "Đánh giá các tổng hoán vị đối xứng"],
        practiceProblems: [
          { title: "IMO 2001 Problem 2: BĐT hoán vị phân thức căn bậc hai", judge: "IMO", url: "https://artofproblemsolving.com/community/c3158_imo", difficulty: "Medium" },
          { title: "Putnam 2017 Problem B1: BĐT tích phân Cauchy-Schwarz", judge: "Putnam", url: "https://artofproblemsolving.com/community/c4380_putnam", difficulty: "Medium" }
        ],
        blogSlug: null
      },
      {
        id: "ineq-schur-pqr-method",
        title: "Bất Đẳng Thức Schur & Phương Pháp Đổi Biến p, q, r",
        vietnameseTitle: "Khảo sát hàm số đối xứng qua p = a+b+c, q = ab+bc+ca, r = abc",
        description: "Bất đẳng thức Schur bậc 3 và bậc 4, kỹ thuật biểu diễn các đa thức đối xứng qua p, q, r, các bất đẳng thức liên hệ cốt lõi giữa p, q, r và định lý dồn biến biên khi r đạt cực đại / cực tiểu.",
        status: "completed",
        difficulty: "Chuyên sâu VMO",
        prerequisites: ["Đa thức đối xứng 3 biến", "AM-GM"],
        keyTheorems: [
          "BĐT Schur bậc 3: x^t(x-y)(x-z) + y^t(y-z)(y-x) + z^t(z-x)(z-y) ≥ 0",
          "Dạng p, q, r của Schur bậc 3: p^3 - 4pq + 9r ≥ 0",
          "Hệ thức nền tảng: p^2 ≥ 3q, q^2 ≥ 3pr, p*q ≥ 9r, r ≥ max(0, (4pq - p^3)/9)"
        ],
        latexFormula: "x^t(x-y)(x-z) + y^t(y-z)(y-x) + z^t(z-x)(z-y) \\ge 0, \\quad p^3 - 4pq + 9r \\ge 0",
        applications: ["Giải các bài BĐT đối xứng 3 biến trong kỳ thi VMO và Olympic khu vực"],
        practiceProblems: [
          { title: "USA TST 2015 Problem 2: BĐT Schur và p, q, r", judge: "USAMO", url: "https://artofproblemsolving.com/community/c3413_usamo", difficulty: "Hard" },
          { title: "VMO 2018 Bài 3: Bất đẳng thức p, q, r", judge: "VMO", url: "https://artofproblemsolving.com/community/c3417_vietnam_national_olympiad", difficulty: "Medium" }
        ],
        blogSlug: null
      },
      {
        id: "ineq-sos-ev-karamata",
        title: "Phương Pháp SOS (Sum of Squares) & Kỹ Thuật Dồn Biến (EV/MV)",
        vietnameseTitle: "Phân tích bình phương SOS, Equal Variables & BĐT Karamata",
        description: "Đưa bất đẳng thức đối xứng 3 biến về dạng SOS: S_a(b-c)^2 + S_b(c-a)^2 + S_c(a-b)^2 ≥ 0 và kiểm tra các tiêu chuẩn hệ số. Phương pháp dồn biến EV (Equal Variables) chứng minh cực trị đạt tại b = c. BĐT Karamata với dãy trội.",
        status: "in_progress",
        difficulty: "Đỉnh cao IMO",
        prerequisites: ["BĐT Schur", "Đạo hàm khảo sát hàm số"],
        keyTheorems: [
          "Tiêu chuẩn SOS: Nếu S_a + S_b > 0, S_b + S_c > 0, S_c + S_a > 0 và S_a*S_b + S_b*S_c + S_c*S_a ≥ 0 thì biểu thức ≥ 0",
          "Định lý Equal Variables (EV): Cực trị của f(a, b, c) đối xứng đạt được khi có hai biến bằng nhau (b = c) hoặc tại biên",
          "Bất đẳng thức Karamata: Dãy x trội hơn y (x ≻ y) thì ∑ f(x_i) ≥ ∑ f(y_i) với f lồi"
        ],
        latexFormula: "S_a (b-c)^2 + S_b (c-a)^2 + S_c (a-b)^2 \\ge 0, \\quad x \\succ y \\implies \\sum f(x_i) \\ge \\sum f(y_i)",
        applications: ["Chứng minh các bất đẳng thức IMO khó có điểm biên hoặc điểm rơi tại biên"],
        practiceProblems: [
          { title: "IMO 2020 Problem 2: Bất đẳng thức 4 biến thực", judge: "IMO", url: "https://artofproblemsolving.com/community/c3158_imo", difficulty: "Hard" },
          { title: "IMO 2005 Problem 3: Bất đẳng thức phân thức IMO", judge: "IMO", url: "https://artofproblemsolving.com/community/c3158_imo", difficulty: "Hard" }
        ],
        blogSlug: null
      }
    ]
  }
];
