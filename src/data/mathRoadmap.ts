export interface MathRoadmapNode {
  id: string;
  title: string;
  vietnameseTitle: string;
  description: string;
  status: "completed" | "in_progress" | "planned";
  difficulty: "Cơ bản" | "Trung cấp" | "Nâng cao" | "Đỉnh cao";
  prerequisites: string[];
  keyTheorems: string[];
  latexFormula: string;
  applications: string[];
  practiceProblems: {
    title: string;
    judge: "IMO" | "USAMO" | "VMO" | "Putnam" | "AoPS" | "RMM" | "APMO" | "CSES" | "Codeforces";
    url: string;
    difficulty: "Easy" | "Medium" | "Hard";
  }[];
  blogSlug: string | null;
}

export interface MathRoadmapGroup {
  id: string;
  stepNumber: number;
  title: string;
  level: "Cơ bản" | "Trung cấp" | "Nâng cao" | "Đỉnh cao";
  levelBadge: string;
  description: string;
  nodeIds: string[];
}

export interface MathRoadmapStage {
  id: number;
  name: string;
  subtitle: string;
  description: string;
  icon: string;
  groups: MathRoadmapGroup[];
  nodes: MathRoadmapNode[];
}

export const mathRoadmapStages: MathRoadmapStage[] = [
  // ==========================================
  // PILLAR 1: MATH FUNDAMENTALS
  // ==========================================
  {
    id: 1,
    name: "1. Số Học Nền Tảng",
    subtitle: "Math Fundamentals",
    description: "Nền móng toán học bắt buộc: Từ số nguyên, quan hệ chia hết, số nguyên tố, tìm ƯCLN (GCD), thuật toán Euclid mở rộng đến lũy thừa nhị phân và nghịch đảo modulo.",
    icon: "fa6-solid:calculator",
    groups: [
      {
        id: "fund-step-1",
        stepNumber: 1,
        title: "Tập số, Quan hệ chia hết & Số nguyên tố",
        level: "Cơ bản",
        levelBadge: "Level 1 • Cơ bản",
        description: "Bắt đầu với tập số nguyên Z và số thực R, phép chia có dư Euclid, khái niệm chia hết, ước số, bội số, số nguyên tố và Định lý cơ bản của Số học.",
        nodeIds: ["fund-numbers-divisibility", "fund-prime-factorization"]
      },
      {
        id: "fund-step-2",
        stepNumber: 2,
        title: "ƯCLN, BCNN & Thuật toán Euclid mở rộng",
        level: "Cơ bản",
        levelBadge: "Level 2 • Nền tảng cốt lõi",
        description: "Làm chủ thuật toán Euclid tìm ước chung lớn nhất gcd(a, b), mối liên hệ với bội chung nhỏ nhất lcm(a, b), và thuật toán Euclid mở rộng giải phương trình ax + by = gcd(a, b).",
        nodeIds: ["fund-gcd-lcm-euclid", "fund-ext-gcd-diophantine"]
      },
      {
        id: "fund-step-3",
        stepNumber: 3,
        title: "Đồng dư thức & Lũy thừa nhị phân",
        level: "Trung cấp",
        levelBadge: "Level 3 • Kỹ thuật tính toán",
        description: "Hiểu bản chất vành đồng dư Z/mZ, các phép cộng trừ nhân modulo, và thuật toán lũy thừa nhị phân tính a^b mod m trong O(log b) cực nhanh.",
        nodeIds: ["fund-modular-arithmetic", "fund-binary-exponentiation"]
      },
      {
        id: "fund-step-4",
        stepNumber: 4,
        title: "Nghịch đảo Modulo & Tiền xử lý O(N)",
        level: "Trung cấp",
        levelBadge: "Level 4 • Kỹ thuật thi đấu",
        description: "Định nghĩa nghịch đảo modulo ax ≡ 1 (mod m), điều kiện gcd(a, m) = 1, tìm nghịch đảo bằng Euclid mở rộng, Fermat nhỏ và kỹ thuật tính nghịch đảo tuyến tính O(N).",
        nodeIds: ["fund-modular-inverse"]
      }
    ],
    nodes: [
      {
        id: "fund-numbers-divisibility",
        title: "Số Nguyên, Số Thực & Phép Chia Có Dư",
        vietnameseTitle: "Integer and Real Numbers, Divisibility",
        description: "Tập số nguyên Z, số thực R và sai số dấu phẩy động. Bản chất của phép chia có dư a = b*q + r (0 <= r < b), thương nguyên a / b, số dư a % b và khái niệm quan hệ chia hết b | a.",
        status: "completed",
        difficulty: "Cơ bản",
        prerequisites: ["Số học cấp 2"],
        keyTheorems: [
          "Phép chia Euclid: Với b > 0, luôn tồn tại duy nhất (q, r) sao cho a = b*q + r (0 <= r < b)",
          "Tính bắc cầu: a | b và b | c suy ra a | c",
          "Tổ hợp tuyến tính: a | b và a | c suy ra a | (b*x + c*y) với mọi x, y nguyên"
        ],
        latexFormula: "a = b \\cdot q + r \\quad (0 \\le r < b), \\quad b \\mid a \\iff r = 0",
        applications: ["Kiểm tra tính chẵn lẻ", "Rút gọn phân số", "Phân chia công việc và tài nguyên trong thuật toán"],
        practiceProblems: [
          { title: "CSES 1083: Missing Number", judge: "CSES", url: "https://cses.fi/problemset/task/1083", difficulty: "Easy" },
          { title: "Codeforces 1389A: LCM Problem", judge: "Codeforces", url: "https://codeforces.com/problemset/problem/1389/A", difficulty: "Easy" }
        ],
        blogSlug: "2026-04-03-math-fundamentals-numbers-divisibility-primes"
      },
      {
        id: "fund-prime-factorization",
        title: "Số Nguyên Tố, Sàng Eratosthenes & Phân Tích Thừa Số",
        vietnameseTitle: "Prime Numbers, Sieve of Eratosthenes & Prime Factorization",
        description: "Định nghĩa số nguyên tố p > 1, kiểm tra số nguyên tố trong O(căn n), thuật toán sàng Eratosthenes tìm toàn bộ số nguyên tố đến N trong O(N log log N), và phân tích thừa số nguyên tố duy nhất.",
        status: "completed",
        difficulty: "Cơ bản",
        prerequisites: ["Phép chia có dư"],
        keyTheorems: [
          "Định lý cơ bản của Số học: Mọi n > 1 đều phân tích duy nhất thành n = p1^a1 * ... * pk^ak",
          "Ước nhỏ nhất của hợp số n luôn nhỏ hơn hoặc bằng căn bậc hai của n",
          "Số lượng ước số của n là d(n) = (a1 + 1)(a2 + 1)...(ak + 1)"
        ],
        latexFormula: "n = \\prod_{i=1}^k p_i^{\\alpha_i}, \\quad d(n) = \\prod_{i=1}^k (\\alpha_i + 1)",
        applications: ["Đếm số ước số của n", "Phân tích số thành tích nguyên tố", "Tối ưu hóa các bài toán toán học"],
        practiceProblems: [
          { title: "CSES 1713: Counting Divisors", judge: "CSES", url: "https://cses.fi/problemset/task/1713", difficulty: "Easy" },
          { title: "CSES 1081: Common Divisors", judge: "CSES", url: "https://cses.fi/problemset/task/1081", difficulty: "Medium" }
        ],
        blogSlug: "2026-04-03-math-fundamentals-numbers-divisibility-primes"
      },
      {
        id: "fund-gcd-lcm-euclid",
        title: "Ước Chung Lớn Nhất (GCD) & Bội Chung Nhỏ Nhất (LCM)",
        vietnameseTitle: "Greatest Common Divisor, Least Common Multiple & Thuật toán Euclid",
        description: "Khái niệm gcd(a, b) và lcm(a, b), mối liên hệ tích a * b = gcd * lcm. Thuật toán Euclid lấy phần dư liên tiếp gcd(a, b) = gcd(b, a % b) chạy trong thời gian logarit O(log(min(a, b))).",
        status: "completed",
        difficulty: "Cơ bản",
        prerequisites: ["Phép chia có dư"],
        keyTheorems: [
          "Mệnh đề Euclid: gcd(a, b) = gcd(b, a mod b) với b != 0",
          "Mối liên hệ: gcd(a, b) * lcm(a, b) = a * b",
          "gcd(a, b) là số nguyên dương nhỏ nhất có thể biểu diễn dưới dạng ax + by"
        ],
        latexFormula: "\\gcd(a, b) = \\gcd(b, a \\pmod{b}), \\quad \\text{lcm}(a, b) = \\frac{a \\cdot b}{\\gcd(a, b)}",
        applications: ["Rút gọn phân số", "Kiểm tra hai số nguyên tố cùng nhau", "Tính chu kỳ lặp lại"],
        practiceProblems: [
          { title: "CSES 1081: Common Divisors", judge: "CSES", url: "https://cses.fi/problemset/task/1081", difficulty: "Easy" },
          { title: "Codeforces 1324D: Pair of Topics", judge: "Codeforces", url: "https://codeforces.com/problemset/problem/1324/D", difficulty: "Easy" }
        ],
        blogSlug: "2026-03-20-euclidean-algorithm-gcd"
      },
      {
        id: "fund-ext-gcd-diophantine",
        title: "Thuật Toán Euclid Mở Rộng & Phương Trình Diophantine",
        vietnameseTitle: "Extended Euclidean Algorithm & Linear Diophantine Equations",
        description: "Bổ đề Bézout và thuật toán Euclid mở rộng tìm cặp nghiệm nguyên (x, y) thỏa mãn ax + by = gcd(a, b). Ứng dụng giải phương trình Diophantine tuyến tính ax + by = c và tìm nghiệm nhỏ nhất.",
        status: "completed",
        difficulty: "Cơ bản",
        prerequisites: ["Thuật toán Euclid GCD"],
        keyTheorems: [
          "Bổ đề Bézout: Luôn tồn tại x, y nguyên sao cho a*x + b*y = gcd(a, b)",
          "Phương trình ax + by = c có nghiệm nguyên khi và chỉ khi gcd(a, b) | c",
          "Nghiệm tổng quát: x = x0 + k*(b/g), y = y0 - k*(a/g) với g = gcd(a, b)"
        ],
        latexFormula: "a \\cdot x + b \\cdot y = \\gcd(a, b), \\quad \\gcd(a, b) \\mid c",
        applications: ["Giải bài toán chia tiền / đong nước", "Tìm nghiệm nguyên phương trình 2 ẩn", "Đặt nền móng cho nghịch đảo modulo"],
        practiceProblems: [
          { title: "Codeforces 1244C: The Football Season", judge: "Codeforces", url: "https://codeforces.com/problemset/problem/1244/C", difficulty: "Medium" },
          { title: "CSES 1095: Exponentiation", judge: "CSES", url: "https://cses.fi/problemset/task/1095", difficulty: "Easy" }
        ],
        blogSlug: "2026-04-02-extended-euclidean-algorithm"
      },
      {
        id: "fund-modular-arithmetic",
        title: "Số Học Đồng Dư (Modular Arithmetic) & Vành Z/mZ",
        vietnameseTitle: "Đồng dư thức, Vòng lặp tuần hoàn & Quy tắc cộng trừ nhân modulo",
        description: "Khái niệm đồng dư a ≡ b (mod m), ý nghĩa số dư trong đồng hồ và chu kỳ. Các quy tắc cơ bản: (a + b) % m, (a - b + m) % m, (a * b) % m. Tránh tràn số nguyên khi nhân số 64-bit.",
        status: "completed",
        difficulty: "Cơ bản",
        prerequisites: ["Phép chia có dư"],
        keyTheorems: [
          "a ≡ b (mod m) khi và chỉ khi m | (a - b)",
          "Bảo toàn phép cộng, trừ, nhân: Nếu a ≡ b và c ≡ d thì a+c ≡ b+d và a*c ≡ b*d (mod m)",
          "Lưu ý phép chia: a*c ≡ b*c (mod m) CHỈ suy ra a ≡ b khi gcd(c, m) = 1"
        ],
        latexFormula: "a \\equiv b \\pmod{m} \\iff m \\mid (a - b), \\quad (a \\cdot b) \\pmod{m} = ((a \\% m) \\cdot (b \\% m)) \\% m",
        applications: ["Giữ kết quả tính toán không bị tràn số với MOD 10^9 + 7", "Băm chuỗi ký tự (String Hashing)", "Mã hóa bảo mật RSA"],
        practiceProblems: [
          { title: "CSES 1712: Exponentiation II", judge: "CSES", url: "https://cses.fi/problemset/task/1712", difficulty: "Medium" },
          { title: "VMO 2019 Bài 3: Đồng dư và ước số", judge: "VMO", url: "https://artofproblemsolving.com/community/c3417_vietnam_national_olympiad", difficulty: "Medium" }
        ],
        blogSlug: "2026-01-15-olympiad-nt-congruence-euler-fermat"
      },
      {
        id: "fund-binary-exponentiation",
        title: "Lũy Thừa Nhị Phân (Binary Exponentiation)",
        vietnameseTitle: "Thuật toán tính a^b mod m trong O(log b)",
        description: "Phương pháp bình phương và nhân liên tiếp (Divide and Conquer) giúp giảm thời gian tính a^b từ O(b) xuống O(log b). Ứng dụng lũy thừa nhị phân cho số nguyên, ma trận và hoán vị k lần.",
        status: "completed",
        difficulty: "Cơ bản",
        prerequisites: ["Phép nhân modulo", "Hệ nhị phân"],
        keyTheorems: [
          "Nếu b chẵn: a^b = (a^2)^(b/2)",
          "Nếu b lẻ: a^b = a * a^(b-1)",
          "Số phép nhân tối đa cho b <= 10^18 chỉ khoảng 60 phép tính"
        ],
        latexFormula: "a^b = \\begin{cases} 1 & \\text{nếu } b = 0 \\\\ (a^2)^{\\frac{b}{2}} & \\text{nếu } b \\text{ chẵn} \\\\ a \\cdot a^{b-1} & \\text{nếu } b \\text{ lẻ} \\end{cases}",
        applications: ["Tính số dư lũy thừa cực lớn", "Lũy thừa ma trận giải quy hoạch động O(log N)", "Tìm nghịch đảo modulo"],
        practiceProblems: [
          { title: "CSES 1095: Exponentiation", judge: "CSES", url: "https://cses.fi/problemset/task/1095", difficulty: "Easy" },
          { title: "CSES 1712: Exponentiation II", judge: "CSES", url: "https://cses.fi/problemset/task/1712", difficulty: "Medium" }
        ],
        blogSlug: "2026-03-08-binary-exponentiation"
      },
      {
        id: "fund-modular-inverse",
        title: "Nghịch Đảo Modulo (Modular Multiplicative Inverse)",
        vietnameseTitle: "Phép chia modulo qua Euclid mở rộng, Fermat nhỏ & Thuật toán O(N)",
        description: "Phép chia trong modulo: a / b ≡ a * b^(-1) (mod m). Điều kiện tồn tại gcd(b, m) = 1. Tìm b^(-1) bằng Euclid mở rộng cho mọi m, bằng Fermat nhỏ b^(p-2) khi p nguyên tố, và tính nghịch đảo 1..N trong O(N).",
        status: "completed",
        difficulty: "Trung cấp",
        prerequisites: ["Euclid mở rộng", "Đồng dư thức Fermat nhỏ"],
        keyTheorems: [
          "a * x ≡ 1 (mod m) có nghiệm khi và chỉ khi gcd(a, m) = 1",
          "Định lý Fermat nhỏ: a^(-1) ≡ a^(p-2) (mod p) với p là số nguyên tố",
          "Tính tuyến tính O(N): inv[i] = (p - p/i) * inv[p % i] % p",
          "Tiền xử lý giai thừa và nghịch đảo giai thừa tính tổ hợp C(n, k) trong O(1)"
        ],
        latexFormula: "a \\cdot x \\equiv 1 \\pmod{m}, \\quad a^{-1} \\equiv a^{p-2} \\pmod{p}, \\quad \\text{inv}[i] = (p - \\lfloor p/i \\rfloor) \\cdot \\text{inv}[p \\% i] \\pmod{p}",
        applications: ["Thực hiện phép chia trong modulo", "Tính tổ hợp C(n, k) và Multinomial Coefficient", "Giải hệ phương trình đồng dư CRT"],
        practiceProblems: [
          { title: "CSES 1081: Binomial Coefficients", judge: "CSES", url: "https://cses.fi/problemset/task/1081", difficulty: "Easy" },
          { title: "CSES 1715: Creating Strings II", judge: "CSES", url: "https://cses.fi/problemset/task/1715", difficulty: "Medium" }
        ],
        blogSlug: "2026-01-18-olympiad-nt-modular-inverse-combinatorics"
      }
    ]
  },

  // ==========================================
  // PILLAR 2: COMBINATORICS
  // ==========================================
  {
    id: 2,
    name: "2. Đại Số Tổ Hợp & Đếm",
    subtitle: "Combinatorics & Discrete Counting",
    description: "Bộ công cụ đếm cấu hình toàn diện: Quy tắc cộng/nhân, Giai thừa, Hoán vị, Chỉnh hợp, Tổ hợp, Tam giác Pascal, Nhị thức Newton, Hệ số Đa thức, Nguyên lý bù trừ PIE, Dirichlet, Số Catalan và Bài toán chia kẹo Euler.",
    icon: "fa6-solid:dice-d20",
    groups: [
      {
        id: "comb-step-1",
        stepNumber: 1,
        title: "Quy tắc đếm cơ sở, Hoán vị & Chỉnh hợp - Tổ hợp",
        level: "Cơ bản",
        levelBadge: "Level 1 • Cơ bản",
        description: "Bắt đầu với quy tắc cộng, quy tắc nhân, định nghĩa giai thừa n!, hoán vị không lặp Pn, phân biệt có thứ tự (Chỉnh hợp A(n, k)) và không thứ tự (Tổ hợp C(n, k)).",
        nodeIds: ["comb-counting-rules", "comb-permutations-arrangements", "comb-combinations-core"]
      },
      {
        id: "comb-step-2",
        stepNumber: 2,
        title: "Tam giác Pascal, Nhị thức Newton & Hệ số Đa thức",
        level: "Trung cấp",
        levelBadge: "Level 2 • Nền tảng cốt lõi",
        description: "Hệ thức truy hồi Tam giác Pascal, khai triển Nhị thức Newton (x+y)^n, hoán vị lặp n!/(n1!...nk!), và mở rộng lên Hệ số Đa thức (Multinomial Coefficient).",
        nodeIds: ["comb-pascal-binomial", "comb-multinomial-coeffs"]
      },
      {
        id: "comb-step-3",
        stepNumber: 3,
        title: "Bù trừ (PIE), Chuồng bồ câu & Chia kẹo Euler",
        level: "Trung cấp",
        levelBadge: "Level 3 • Phương pháp kinh điển",
        description: "Nguyên lý bù trừ (Inclusion-Exclusion), nguyên lý chuồng bồ câu Dirichlet, bài toán chia kẹo Euler (Stars and Bars) và số mất thứ tự (Derangements !n).",
        nodeIds: ["comb-pie-derangements", "comb-pigeonhole-principle", "comb-stars-and-bars"]
      },
      {
        id: "comb-step-4",
        stepNumber: 4,
        title: "Dãy số Catalan & Cấu trúc ngoặc hợp lệ",
        level: "Nâng cao",
        levelBadge: "Level 4 • Cấu trúc nâng cao",
        description: "Khám phá dãy số kỳ diệu Catalan Cn = 1/(n+1) * C(2n, n): từ dãy ngoặc đúng, đường đi Dyck, cây nhị phân đến phân hoạch đa giác.",
        nodeIds: ["comb-catalan-numbers"]
      }
    ],
    nodes: [
      {
        id: "comb-counting-rules",
        title: "Quy Tắc Cộng & Quy Tắc Nhân (Addition & Multiplication)",
        vietnameseTitle: "Hai nguyên lý đếm cơ bản nhất của Lý thuyết Tổ hợp",
        description: "Quy tắc cộng cho các biến cố rời nhau (hợp các tập không giao nhau). Quy tắc nhân cho các hành động liên tiếp độc lập (tích Descartes). Phân biệt khi nào cộng, khi nào nhân.",
        status: "completed",
        difficulty: "Cơ bản",
        prerequisites: ["Tập hợp hữu hạn"],
        keyTheorems: [
          "Quy tắc cộng: Nếu A và B rời nhau thì |A ∪ B| = |A| + |B|",
          "Quy tắc nhân: Nếu công việc gồm 2 bước độc lập với m và n cách chọn, tổng số cách là m * n",
          "Quy tắc bù trừ sơ cấp: |A ∪ B| = |A| + |B| - |A ∩ B|"
        ],
        latexFormula: "|A \\cup B| = |A| + |B| \\quad (A \\cap B = \\emptyset), \\quad |A \\times B| = |A| \\cdot |B|",
        applications: ["Đếm số đường đi", "Đếm số mật khẩu thỏa mãn điều kiện", "Đếm số tự nhiên có các chữ số khác nhau"],
        practiceProblems: [
          { title: "CSES 1068: Weird Algorithm", judge: "CSES", url: "https://cses.fi/problemset/task/1068", difficulty: "Easy" },
          { title: "Codeforces 1328A: Divisibility Problem", judge: "Codeforces", url: "https://codeforces.com/problemset/problem/1328/A", difficulty: "Easy" }
        ],
        blogSlug: "2026-04-02-olympiad-comb-permutations-combinations-factorial"
      },
      {
        id: "comb-permutations-arrangements",
        title: "Giai Thừa, Các Phép Hoán Vị & Chỉnh Hợp (A(n, k))",
        vietnameseTitle: "Permutations, Arrangements & Hoán vị vòng quanh",
        description: "Giai thừa n! và xấp xỉ Stirling. Số hoán vị Pn = n!. Chỉnh hợp chập k của n là chọn k phần tử CÓ thứ tự A(n, k) = n! / (n - k)!. Hoán vị vòng quanh (n - 1)! quanh bàn tròn.",
        status: "completed",
        difficulty: "Cơ bản",
        prerequisites: ["Quy tắc nhân"],
        keyTheorems: [
          "Hoán vị không lặp: P_n = n!",
          "Chỉnh hợp: A_n^k = n! / (n - k)!",
          "Hoán vị vòng tròn n phần tử: (n - 1)!",
          "Xấp xỉ Stirling: n! ~ √(2πn) * (n/e)^n"
        ],
        latexFormula: "P_n = n!, \\quad A_n^k = \\frac{n!}{(n - k)!}, \\quad Q_n = (n - 1)!",
        applications: ["Xếp hàng người", "Bài toán mã pin / mật khẩu có thứ tự", "Tạo hoán vị std::next_permutation"],
        practiceProblems: [
          { title: "CSES 1622: Creating Strings", judge: "CSES", url: "https://cses.fi/problemset/task/1622", difficulty: "Easy" },
          { title: "Codeforces 131A: cAPS lOCK", judge: "Codeforces", url: "https://codeforces.com/problemset/problem/131/A", difficulty: "Easy" }
        ],
        blogSlug: "2026-04-02-olympiad-comb-permutations-combinations-factorial"
      },
      {
        id: "comb-combinations-core",
        title: "Tổ Hợp Chập K Của N (Combinations — C(n, k))",
        vietnameseTitle: "Số cách chọn k phần tử không quan tâm thứ tự",
        description: "Định nghĩa tổ hợp C(n, k) = n! / (k!(n - k)!). Mối liên hệ A(n, k) = k! * C(n, k). Các tính chất vàng: đối xứng C(n, k) = C(n, n - k), tính chất hấp thụ k*C(n, k) = n*C(n-1, k-1) và tổng tập con 2^n.",
        status: "completed",
        difficulty: "Cơ bản",
        prerequisites: ["Chỉnh hợp & Giai thừa"],
        keyTheorems: [
          "Công thức tổ hợp: C(n, k) = n! / (k! * (n - k)!)",
          "Tính chất đối xứng: C(n, k) = C(n, n - k)",
          "Tổng tất cả tập con: ∑ C(n, k) = 2^n",
          "Tổ hợp lặp: C_bar(n, k) = C(n + k - 1, k)"
        ],
        latexFormula: "\\binom{n}{k} = \\frac{n!}{k!(n - k)!}, \\quad \\binom{n}{k} = \\binom{n}{n - k}, \\quad \\sum_{k=0}^n \\binom{n}{k} = 2^n",
        applications: ["Chọn đội nhóm", "Đếm số tập con", "Xác suất tổ hợp cổ điển"],
        practiceProblems: [
          { title: "CSES 1081: Binomial Coefficients", judge: "CSES", url: "https://cses.fi/problemset/task/1081", difficulty: "Easy" },
          { title: "VMO 2018 Bài 5: Tập con tổ hợp", judge: "VMO", url: "https://artofproblemsolving.com/community/c3417_vietnam_national_olympiad", difficulty: "Medium" }
        ],
        blogSlug: "2026-04-02-olympiad-comb-permutations-combinations-factorial"
      },
      {
        id: "comb-pascal-binomial",
        title: "Tam Giác Pascal & Định Lý Nhị Thức Newton",
        vietnameseTitle: "Pascal's Triangle & Binomial Theorem (x + y)^n",
        description: "Hệ thức truy hồi C(n, k) = C(n-1, k-1) + C(n-1, k). Khai triển Nhị thức Newton (x+y)^n, các đồng nhất thức kinh điển như Chu-Vandermonde, Hockey-Stick và tính modulo hợp số không cần phép chia.",
        status: "completed",
        difficulty: "Trung cấp",
        prerequisites: ["Tổ hợp C(n, k)"],
        keyTheorems: [
          "Hệ thức Pascal: C(n, k) = C(n - 1, k - 1) + C(n - 1, k)",
          "Nhị thức Newton: (x + y)^n = ∑ C(n, k) x^(n-k) y^k",
          "Chu-Vandermonde: ∑ C(m, i) * C(n, k - i) = C(m + n, k)",
          "Hockey-stick: ∑_{i=r}^n C(i, r) = C(n + 1, r + 1)"
        ],
        latexFormula: "\\binom{n}{k} = \\binom{n-1}{k-1} + \\binom{n-1}{k}, \\quad (x + y)^n = \\sum_{k=0}^n \\binom{n}{k} x^{n-k} y^k",
        applications: ["Quy hoạch động tam giác Pascal O(N^2)", "Rút gọn các biểu thức nhị thức", "Đếm đường đi trên lưới 2D"],
        practiceProblems: [
          { title: "CSES 1715: Creating Strings II", judge: "CSES", url: "https://cses.fi/problemset/task/1715", difficulty: "Medium" },
          { title: "Putnam 2019 Problem A1: Đồng nhất thức Pascal", judge: "Putnam", url: "https://artofproblemsolving.com/community/c4380_putnam", difficulty: "Medium" }
        ],
        blogSlug: "2026-04-05-olympiad-comb-pascal-multinomial-coefficients"
      },
      {
        id: "comb-multinomial-coeffs",
        title: "Hoán Vị Lặp & Hệ Số Đa Thức (Multinomial Coefficients)",
        vietnameseTitle: "Permutations with Repetition & Khai triển (x1 + ... + xm)^n",
        description: "Mở rộng hệ số nhị thức sang m nhóm phân biệt: n! / (k1! * ... * km!). Khai triển đa thức (x1 + ... + xm)^n. Ý nghĩa bài toán xếp chữ lặp (Anagrams) và phân phối n vật vào m hộp phân biệt.",
        status: "completed",
        difficulty: "Trung cấp",
        prerequisites: ["Nhị thức Newton", "Nghịch đảo modulo"],
        keyTheorems: [
          "Hệ số đa thức: C(n; k1, ..., km) = n! / (k1! * ... * km!) với ∑ ki = n",
          "Khai triển đa thức: (x1 + ... + xm)^n = ∑ C(n; k1, ..., km) x1^k1 ... xm^km",
          "Số số hạng trong khai triển là C(n + m - 1, m - 1)",
          "Tích liên tiếp: C(n; k1, ..., km) = C(n, k1) * C(n - k1, k2) * ..."
        ],
        latexFormula: "\\binom{n}{k_1, k_2, \\dots, k_m} = \\frac{n!}{k_1! k_2! \\dots k_m!}, \\quad (x_1 + \\dots + x_m)^n = \\sum_{\\sum k_i = n} \\binom{n}{\\vec{k}} \\prod x_i^{k_i}",
        applications: ["Đếm số hoán vị từ ngữ có chữ cái lặp", "Bài toán phân phối đồ vật", "Tính xác suất đa thức"],
        practiceProblems: [
          { title: "CSES 1715: Creating Strings II", judge: "CSES", url: "https://cses.fi/problemset/task/1715", difficulty: "Medium" },
          { title: "Codeforces 1264B: Beautiful Sequence", judge: "Codeforces", url: "https://codeforces.com/problemset/problem/1264/B", difficulty: "Medium" }
        ],
        blogSlug: "2026-04-05-olympiad-comb-pascal-multinomial-coefficients"
      },
      {
        id: "comb-pie-derangements",
        title: "Nguyên Lý Bù Trừ (PIE) & Hoán Vị Không Điểm Bất Động (!n)",
        vietnameseTitle: "Inclusion-Exclusion Principle & Derangements",
        description: "Nguyên lý bù trừ: Hợp của nhiều tập hợp bằng tổng đơn trừ tổng đôi cộng tổng ba... Ứng dụng giải bài toán số mất thứ tự (Derangements !n): không có ai nhận đúng lá thư của mình.",
        status: "completed",
        difficulty: "Trung cấp",
        prerequisites: ["Quy tắc cộng bù trừ"],
        keyTheorems: [
          "Nguyên lý bù trừ PIE: |∪ Ai| = ∑ |Ai| - ∑ |Ai ∩ Aj| + ∑ |Ai ∩ Aj ∩ Ak| - ...",
          "Công thức Derangement: !n = (n - 1)(!(n-1) + !(n-2))",
          "Công thức giải tích: !n = n! * ∑_{k=0}^n (-1)^k / k! ~ n! / e"
        ],
        latexFormula: "\\left|\\bigcup_{i=1}^n A_i\\right| = \\sum (-1)^{|J|-1} \\left|\\bigcap_{j \\in J} A_j\\right|, \\quad D_n = n! \\sum_{k=0}^n \\frac{(-1)^k}{k!}",
        applications: ["Đếm số phần tử thỏa mãn ít nhất một điều kiện cấm", "Bài toán phát thư nhầm", "Hàm phi Euler và hàm Möbius"],
        practiceProblems: [
          { title: "CSES 2185: Prime Multiples", judge: "CSES", url: "https://cses.fi/problemset/task/2185", difficulty: "Medium" },
          { title: "Codeforces 1391D: 505", judge: "Codeforces", url: "https://codeforces.com/problemset/problem/1391/D", difficulty: "Hard" }
        ],
        blogSlug: "2026-04-12-olympiad-comb-counting-stars-and-bars-pie"
      },
      {
        id: "comb-pigeonhole-principle",
        title: "Nguyên Lý Chuồng Bồ Câu (Pigeonhole Principle / Dirichlet)",
        vietnameseTitle: "Nguyên lý Dirichlet rời rạc và liên tục",
        description: "Nếu nhốt n + 1 con bồ câu vào n cái chuồng thì có ít nhất 1 chuồng chứa >= 2 con. Dạng tổng quát: n vật vào k ngăn có ngăn chứa ít nhất ceil(n / k) vật. Ứng dụng chứng minh tồn tại cấu trúc.",
        status: "completed",
        difficulty: "Trung cấp",
        prerequisites: ["Tập hợp hữu hạn"],
        keyTheorems: [
          "Dirichlet cơ bản: n + 1 vật vào n chuồng => tồn tại chuồng >= 2 vật",
          "Dirichlet tổng quát: n vật vào k chuồng => tồn tại chuồng >= ceil(n / k) vật",
          "Dạng liên tục: Tích phân / diện tích / góc"
        ],
        latexFormula: "\\left\\lceil \\frac{n}{k} \\right\\rceil \\le \\max_{1 \\le i \\le k} |S_i|",
        applications: ["Chứng minh luôn tồn tại 2 người có cùng số bạn", "Hình học tổ hợp điểm trên mặt phẳng", "Xác định chu kỳ đồng dư thức"],
        practiceProblems: [
          { title: "USAMO 2015 Problem 1: Nguyên lý Dirichlet lưới", judge: "USAMO", url: "https://artofproblemsolving.com/community/c3413_usamo", difficulty: "Medium" },
          { title: "IMO 1972 Problem 1: Tập con đồng dư", judge: "IMO", url: "https://artofproblemsolving.com/community/c3158_imo", difficulty: "Medium" }
        ],
        blogSlug: "2026-04-10-olympiad-comb-pigeonhole-extremal-principle"
      },
      {
        id: "comb-stars-and-bars",
        title: "Bài Toán Chia Kẹo Euler (Stars and Bars)",
        vietnameseTitle: "Số nghiệm nguyên không âm của x1 + x2 + ... + xk = n",
        description: "Phương pháp đặt vách ngăn chia kẹo: Số nghiệm tự nhiên (không âm) của x1 + ... + xk = n là C(n + k - 1, k - 1). Số nghiệm nguyên dương là C(n - 1, k - 1). Ứng dụng giải bài toán phân phối đồ vật giống nhau.",
        status: "completed",
        difficulty: "Trung cấp",
        prerequisites: ["Tổ hợp C(n, k)"],
        keyTheorems: [
          "Số nghiệm nguyên không âm (xi >= 0): C(n + k - 1, k - 1)",
          "Số nghiệm nguyên dương (xi >= 1): C(n - 1, k - 1)",
          "Biến đổi chặn dưới: Đổi biến y_i = x_i - c_i đưa về dạng chuẩn"
        ],
        latexFormula: "x_1 + x_2 + \\dots + x_k = n \\quad (x_i \\ge 0) \\implies \\binom{n + k - 1}{k - 1}",
        applications: ["Chia n phần quà giống nhau cho k người", "Đếm số đa thức bậc n", "Bài toán phân phối tài nguyên"],
        practiceProblems: [
          { title: "CSES 1716: Distributing Apples", judge: "CSES", url: "https://cses.fi/problemset/task/1716", difficulty: "Easy" },
          { title: "VMO 2016 Bài 5: Phân phối kẹo và phân hoạch", judge: "VMO", url: "https://artofproblemsolving.com/community/c3417_vietnam_national_olympiad", difficulty: "Medium" }
        ],
        blogSlug: "2026-04-12-olympiad-comb-counting-stars-and-bars-pie"
      },
      {
        id: "comb-catalan-numbers",
        title: "Dãy Số Catalan (Catalan Numbers — C_n)",
        vietnameseTitle: "Dãy số kỳ diệu của cấu trúc ngoặc, cây nhị phân & đường đi Dyck",
        description: "Dãy số Catalan Cn = 1/(n+1) * C(2n, n): 1, 1, 2, 5, 14, 42, 132... Đếm số dãy ngoặc đúng n cặp, số cây nhị phân n nút, số đường đi từ (0,0) đến (n,n) không vượt qua đường chéo, và số cách tam giác hóa đa giác lồi n+2 cạnh.",
        status: "completed",
        difficulty: "Nâng cao",
        prerequisites: ["Tổ hợp C(n, k)", "Quy hoạch động"],
        keyTheorems: [
          "Công thức giải tích: C_n = 1/(n + 1) * C(2n, n) = C(2n, n) - C(2n, n - 1)",
          "Công thức truy hồi tích chập: C_0 = 1, C_{n+1} = ∑_{i=0}^n C_i * C_{n-i}",
          "Nguyên lý đối xứng phản xạ (Reflection Principle) của André"
        ],
        latexFormula: "C_n = \\frac{1}{n + 1} \\binom{2n}{n} = \\binom{2n}{n} - \\binom{2n}{n - 1}, \\quad C_{n+1} = \\sum_{i=0}^n C_i C_{n-i}",
        applications: ["Đếm số dãy ngoặc hợp lệ", "Đếm số cách chia đa giác lồi thành các tam giác", "Cấu trúc dữ liệu cây nhị phân tìm kiếm"],
        practiceProblems: [
          { title: "CSES 2181: Counting Tilings", judge: "CSES", url: "https://cses.fi/problemset/task/2181", difficulty: "Hard" },
          { title: "Codeforces 1204E: Natasha, Sasha and the Prefix Sums", judge: "Codeforces", url: "https://codeforces.com/problemset/problem/1204/E", difficulty: "Hard" }
        ],
        blogSlug: "2026-05-22-catalan-numbers-combinatorics"
      }
    ]
  },

  // ==========================================
  // PILLAR 3: ADVANCED NUMBER THEORY
  // ==========================================
  {
    id: 3,
    name: "3. Lý Thuyết Số Nâng Cao",
    subtitle: "Advanced Number Theory",
    description: "Khám phá chiều sâu của Số học: Định lý Fermat nhỏ, Euler, hàm phi Euler, Định lý Wilson, Thặng dư Trung Hoa (CRT), Logarithm rời rạc, Căn nguyên thủy, Hàm Möbius và Bổ đề LTE.",
    icon: "fa6-solid:infinity",
    groups: [
      {
        id: "ant-step-1",
        stepNumber: 1,
        title: "Định lý Fermat nhỏ, Euler & Hàm Phi Euler",
        level: "Trung cấp",
        levelBadge: "Level 1 • Nền tảng nâng cao",
        description: "Làm chủ định lý Fermat nhỏ a^(p-1) ≡ 1 mod p, hàm phi Euler phi(n) đếm số số nguyên tố cùng nhau, và định lý Euler tổng quát a^phi(m) ≡ 1 mod m.",
        nodeIds: ["ant-fermat-euler", "ant-wilson-theorem"]
      },
      {
        id: "ant-step-2",
        stepNumber: 2,
        title: "Thặng dư Trung Hoa (CRT) & Căn nguyên thủy",
        level: "Trung cấp",
        levelBadge: "Level 2 • Cấu trúc vành số",
        description: "Giải hệ phương trình đồng dư bậc nhất bằng Định lý Thặng Dư Trung Hoa (CRT), cấp của phần tử ord_m(a) và căn nguyên thủy sinh ra toàn bộ nhóm nhân modulo.",
        nodeIds: ["ant-crt-system", "ant-primitive-roots"]
      },
      {
        id: "ant-step-3",
        stepNumber: 3,
        title: "Logarithm rời rạc & Hàm nhân tính Möbius",
        level: "Nâng cao",
        levelBadge: "Level 3 • Chuyên sâu VMO",
        description: "Thuật toán Baby-Step Giant-Step giải phương trình a^x ≡ b (mod m), hàm nhân tính, hàm Möbius mu(n) và công thức đảo ngược Möbius thần thánh.",
        nodeIds: ["ant-discrete-log", "ant-mobius-inversion"]
      },
      {
        id: "ant-step-4",
        stepNumber: 4,
        title: "Bổ đề LTE & Tuyệt kỹ Vieta Jumping",
        level: "Đỉnh cao",
        levelBadge: "Level 4 • Đỉnh cao IMO",
        description: "Vũ khí định giá số mũ p-adic v_p(a^n ± b^n) bằng Bổ đề nâng bậc lũy thừa (LTE) và tuyệt kỹ bước nhảy Viète giải phương trình nghiệm nguyên IMO.",
        nodeIds: ["ant-lte-lemma", "ant-vieta-jumping"]
      }
    ],
    nodes: [
      {
        id: "ant-fermat-euler",
        title: "Định Lý Fermat Nhỏ, Hàm Phi Euler & Định Lý Euler",
        vietnameseTitle: "Fermat's Little Theorem, Euler's Totient Function phi(n)",
        description: "Hàm phi Euler phi(n) = n * ∏ (1 - 1/p). Định lý Euler a^phi(n) ≡ 1 (mod n) với gcd(a, n) = 1. Khi n = p nguyên tố, suy ra Định lý Fermat nhỏ a^(p-1) ≡ 1 (mod p).",
        status: "completed",
        difficulty: "Trung cấp",
        prerequisites: ["Đồng dư thức cơ bản"],
        keyTheorems: [
          "Fermat nhỏ: a^(p-1) ≡ 1 (mod p) với p nguyên tố và gcd(a, p) = 1",
          "Định lý Euler: a^phi(n) ≡ 1 (mod n) với gcd(a, n) = 1",
          "Công thức Euler: phi(n) = n * ∏_{p|n} (1 - 1/p)"
        ],
        latexFormula: "a^{\\phi(n)} \\equiv 1 \\pmod{n}, \\quad \\phi(n) = n \\prod_{p \\mid n} \\left(1 - \\frac{1}{p}\\right)",
        applications: ["Tính số dư lũy thừa khổng lồ", "Tìm nghịch đảo modulo", "Mã hóa khóa công khai RSA"],
        practiceProblems: [
          { title: "CSES 1712: Exponentiation II", judge: "CSES", url: "https://cses.fi/problemset/task/1712", difficulty: "Medium" },
          { title: "IMO 2005 Problem 4: Dãy số và ước đồng dư", judge: "IMO", url: "https://artofproblemsolving.com/community/c3158_imo", difficulty: "Medium" }
        ],
        blogSlug: "2026-01-15-olympiad-nt-congruence-euler-fermat"
      },
      {
        id: "ant-wilson-theorem",
        title: "Định Lý Wilson & Cấu Trúc Giai Thừa Modulo p",
        vietnameseTitle: "Wilson's Theorem: (p - 1)! ≡ -1 (mod p)",
        description: "Định lý Wilson: Số tự nhiên p > 1 là số nguyên tố khi và chỉ khi (p - 1)! ≡ -1 (mod p). Ý nghĩa ghép cặp nghịch đảo từng đôi một và tính giai thừa modulo p.",
        status: "completed",
        difficulty: "Trung cấp",
        prerequisites: ["Nghịch đảo modulo"],
        keyTheorems: [
          "Định lý Wilson: (p - 1)! ≡ -1 (mod p) <=> p là số nguyên tố",
          "Hệ quả cho p = 4k + 1: ((p-1)/2)!^2 ≡ -1 (mod p) (Tồn tại căn bậc hai của -1 mod p)"
        ],
        latexFormula: "(p - 1)! \\equiv -1 \\pmod{p} \\iff p \\in \\mathbb{P}",
        applications: ["Kiểm tra tính nguyên tố lý thuyết", "Tính giai thừa modulo số nguyên tố", "Xác định thặng dư bậc hai của -1"],
        practiceProblems: [
          { title: "Vietnam TST 2021 Bài 6: Đồng dư Wilson", judge: "VMO", url: "https://artofproblemsolving.com/community/c3417_vietnam_national_olympiad", difficulty: "Hard" },
          { title: "RMM 2018 Problem 1: Ước chung đa thức", judge: "RMM", url: "https://artofproblemsolving.com/community/c3158_imo", difficulty: "Medium" }
        ],
        blogSlug: "2026-01-20-olympiad-nt-wilson-chinese-remainder-theorem"
      },
      {
        id: "ant-crt-system",
        title: "Định Lý Thặng Dư Trung Hoa (Chinese Remainder Theorem — CRT)",
        vietnameseTitle: "Giải hệ phương trình đồng dư thức một ẩn x ≡ ai (mod mi)",
        description: "Nếu các số m1, m2, ..., mk đôi một nguyên tố cùng nhau thì hệ x ≡ ai (mod mi) luôn có nghiệm duy nhất modulo M = m1 * ... * mk. Thuật toán ghép từng phương trình bằng Euclid mở rộng.",
        status: "completed",
        difficulty: "Trung cấp",
        prerequisites: ["Euclid mở rộng"],
        keyTheorems: [
          "Định lý CRT: Hệ có nghiệm duy nhất modulo M khi gcd(mi, mj) = 1",
          "Công thức nghiệm giải tích: x = ∑ ai * Mi * inv(Mi, mi) (mod M) với Mi = M / mi"
        ],
        latexFormula: "x \\equiv \\sum_{i=1}^k a_i M_i \\left(M_i^{-1} \\pmod{m_i}\\right) \\pmod{M}, \\quad M = \\prod_{i=1}^k m_i",
        applications: ["Tính số dư modulo hợp số lớn bằng cách phân tích thừa số nguyên tố", "Thuật toán Garner", "Khôi phục dữ liệu nguyên"],
        practiceProblems: [
          { title: "Codeforces 687B: Remainders Game", judge: "Codeforces", url: "https://codeforces.com/problemset/problem/687/B", difficulty: "Medium" },
          { title: "CSES 2182: Divisor Analysis", judge: "CSES", url: "https://cses.fi/problemset/task/2182", difficulty: "Hard" }
        ],
        blogSlug: "2026-01-20-olympiad-nt-wilson-chinese-remainder-theorem"
      },
      {
        id: "ant-primitive-roots",
        title: "Căn Nguyên Thủy & Cấp Đồng Dư (Primitive Roots & Order)",
        vietnameseTitle: "Order of Elements & Primitive Roots",
        description: "Cấp ord_m(a) là số nguyên dương k nhỏ nhất để a^k ≡ 1 (mod m). Căn nguyên thủy g mod m sinh ra toàn bộ phi(m) phần tử của nhóm nhân (Z/mZ)*. Điều kiện tồn tại căn nguyên thủy.",
        status: "completed",
        difficulty: "Nâng cao",
        prerequisites: ["Định lý Euler"],
        keyTheorems: [
          "ord_m(a) | phi(m) và a^h ≡ 1 (mod m) <=> ord_m(a) | h",
          "Căn nguyên thủy tồn tại khi và chỉ khi m ∈ {2, 4, p^k, 2p^k} với p lẻ nguyên tố",
          "Nếu g là căn nguyên thủy thì ord_m(g^k) = phi(m) / gcd(k, phi(m))"
        ],
        latexFormula: "a^k \\equiv 1 \\pmod{m} \\iff \\text{ord}_m(a) \\mid k, \\quad \\text{ord}_m(g) = \\phi(m)",
        applications: ["Biến đổi Fourier số học NTT", "Tìm nghiệm logarithm rời rạc", "Xác định chu kỳ tuần hoàn"],
        practiceProblems: [
          { title: "CSES 1712: Exponentiation II", judge: "CSES", url: "https://cses.fi/problemset/task/1712", difficulty: "Medium" },
          { title: "IMO Shortlist 2006 N5: Cấp của số nguyên", judge: "IMO", url: "https://artofproblemsolving.com/community/c3158_imo", difficulty: "Hard" }
        ],
        blogSlug: "2026-01-25-olympiad-nt-order-primitive-roots"
      },
      {
        id: "ant-discrete-log",
        title: "Logarithm Rời Rạc & Thuật Toán Baby-step Giant-step",
        vietnameseTitle: "Giải phương trình a^x ≡ b (mod m) trong O(căn m)",
        description: "Tìm số nguyên x sao cho a^x ≡ b (mod m). Thuật toán Meet-in-the-middle của Shanks: Đặt x = i*m - j với m = ceil(căn N), lưu bảng băm tìm kiếm trong O(căn m).",
        status: "in_progress",
        difficulty: "Nâng cao",
        prerequisites: ["Căn nguyên thủy", "Lũy thừa nhị phân"],
        keyTheorems: [
          "Biến đổi Shanks: a^(i*m) ≡ b * a^j (mod p) với m = ceil(căn p)",
          "Độ phức tạp thuật toán: O(căn p) thời gian và bộ nhớ"
        ],
        latexFormula: "a^x \\equiv b \\pmod{m} \\implies a^{i \\cdot \\lceil\\sqrt{m}\\rceil} \\equiv b \\cdot a^j \\pmod{m}",
        applications: ["Phá mã trao đổi khóa Diffie-Hellman", "Tìm chu kỳ hệ mật mã", "Giải phương trình mũ modulo"],
        practiceProblems: [
          { title: "Codeforces 1106F: Lunar New Year and a Recursive Sequence", judge: "Codeforces", url: "https://codeforces.com/problemset/problem/1106/F", difficulty: "Hard" },
          { title: "SPOJ MOD: Easy Math", judge: "Codeforces", url: "https://www.spoj.com/problems/MOD/", difficulty: "Medium" }
        ],
        blogSlug: null
      },
      {
        id: "ant-mobius-inversion",
        title: "Hàm Nhân Tính & Công Thức Đảo Ngược Möbius",
        vietnameseTitle: "Möbius Function mu(n), Sàng tuyến tính & Đảo ngược Dirichlet",
        description: "Hàm nhân tính f(ab) = f(a)f(b) với gcd(a, b) = 1. Hàm Möbius mu(n). Tích chập Dirichlet và công thức đảo ngược Möbius: f(n) = ∑_{d|n} g(d) <=> g(n) = ∑_{d|n} mu(d) f(n/d).",
        status: "in_progress",
        difficulty: "Nâng cao",
        prerequisites: ["Sàng Eratosthenes", "Phân tích nguyên tố"],
        keyTheorems: [
          "Hàm Möbius: mu(1) = 1, mu(n) = (-1)^k nếu n là tích k số nguyên tố phân biệt, mu(n) = 0 nếu n có ước chính phương",
          "Tính chất cơ bản: ∑_{d|n} mu(d) = [n == 1]",
          "Đảo ngược Möbius: g(n) = ∑_{d|n} mu(d) * f(n/d)"
        ],
        latexFormula: "\\sum_{d \\mid n} \\mu(d) = [n = 1], \\quad g(n) = \\sum_{d \\mid n} \\mu(d) f\\left(\\frac{n}{d}\\right)",
        applications: ["Đếm số cặp (x, y) nguyên tố cùng nhau trong O(N)", "Tính tổng gcd(i, j) trong O(N)", "Sàng tuyến tính Euler"],
        practiceProblems: [
          { title: "Codeforces 803F: Coprime Subsequences", judge: "Codeforces", url: "https://codeforces.com/problemset/problem/803/F", difficulty: "Hard" },
          { title: "CSES 2417: Counting Coprime Pairs", judge: "CSES", url: "https://cses.fi/problemset/task/2417", difficulty: "Hard" }
        ],
        blogSlug: null
      },
      {
        id: "ant-lte-lemma",
        title: "Bổ Đề Nâng Bậc Số Mũ LTE (Lifting The Exponent Lemma)",
        vietnameseTitle: "Vũ khí định giá số mũ p-adic v_p(a^n ± b^n)",
        description: "Công thức xác định chính xác số mũ v_p(a^n - b^n) = v_p(a - b) + v_p(n). Vũ khí giải quyết hàng loạt bài toán phương trình số mũ khó nhất trong đề thi TST và IMO.",
        status: "completed",
        difficulty: "Đỉnh cao",
        prerequisites: ["Đồng dư thức", "Nhị thức Newton", "Căn nguyên thủy"],
        keyTheorems: [
          "Với p lẻ, p | a - b, p ∤ a, p ∤ b: v_p(a^n - b^n) = v_p(a - b) + v_p(n)",
          "Với p lẻ, n lẻ, p | a + b: v_p(a^n + b^n) = v_p(a + b) + v_p(n)",
          "Với p = 2, n chẵn, 4 | a - b: v_2(a^n - b^n) = v_2(a - b) + v_2(a + b) + v_2(n) - 1"
        ],
        latexFormula: "v_p(a^n - b^n) = v_p(a - b) + v_p(n) \\quad (p \\ge 3, \\, p \\mid a - b)",
        applications: ["Giải phương trình Diophantine mũ a^x + b^y = c^z", "Đánh giá ước nguyên tố của a^n - 1"],
        practiceProblems: [
          { title: "USA TST 2018 Problem 5: Ứng dụng LTE", judge: "USAMO", url: "https://artofproblemsolving.com/community/c3413_usamo", difficulty: "Hard" },
          { title: "IMO Shortlist 2007 N5: Chia hết số mũ", judge: "IMO", url: "https://artofproblemsolving.com/community/c3158_imo", difficulty: "Hard" }
        ],
        blogSlug: "2026-02-01-olympiad-nt-lifting-the-exponent-lte"
      },
      {
        id: "ant-vieta-jumping",
        title: "Phương Pháp Bước Nhảy Vieta (Vieta Jumping / Root Flipping)",
        vietnameseTitle: "Kỹ thuật lùi vô hạn kết hợp hệ thức Viète trên phương trình bậc hai",
        description: "Phương pháp tạo ra nghiệm nguyên dương nhỏ hơn từ nghiệm đã cho bằng cách coi phương trình đối xứng như phương trình bậc 2 theo một biến. Xuất phát từ bài toán huyền thoại IMO 1988 P6.",
        status: "completed",
        difficulty: "Đỉnh cao",
        prerequisites: ["Hệ thức Viète", "Nguyên lý cực hạn"],
        keyTheorems: [
          "Biểu thức đối xứng: (a^2 + b^2) / (ab + 1) = k => x^2 - k*b*x + (b^2 - k) = 0",
          "Nghiệm còn lại theo Viète: x1 + x2 = k*b và x1 * x2 = b^2 - k",
          "Nguyên lý cực hạn: Giả sử tồn tại nghiệm nhỏ nhất dẫn đến mâu thuẫn lùi vô hạn"
        ],
        latexFormula: "\\frac{a^2 + b^2}{ab + 1} = k \\implies x^2 - (kb)x + (b^2 - k) = 0, \\quad x_2 = kb - a",
        applications: ["Giải các bài toán số học huyền thoại IMO", "Chứng minh một số k bắt buộc phải là số chính phương"],
        practiceProblems: [
          { title: "IMO 1988 Problem 6: Huyền thoại Vieta Jumping", judge: "IMO", url: "https://artofproblemsolving.com/community/c3158_imo", difficulty: "Hard" },
          { title: "Vietnam TST 2002 Bài 6: Phương trình nghiệm nguyên", judge: "VMO", url: "https://artofproblemsolving.com/community/c3417_vietnam_national_olympiad", difficulty: "Hard" }
        ],
        blogSlug: "2026-02-10-olympiad-nt-vieta-jumping-infinite-descent"
      }
    ]
  },

  // ==========================================
  // PILLAR 4: ALGEBRA
  // ==========================================
  {
    id: 4,
    name: "4. Đại Số, Ma Trận & Đa Thức",
    subtitle: "Algebra, Polynomials & Matrices",
    description: "Từ đa thức, hệ thức Viète, phép nhân ma trận, khử Gauss giải hệ phương trình đến hàm sinh và biến đổi Fourier nhanh (FFT/NTT).",
    icon: "fa6-solid:square-root-variable",
    groups: [
      {
        id: "alg-step-1",
        stepNumber: 1,
        title: "Đa thức, Hệ thức Viète & Nội suy Lagrange",
        level: "Cơ bản",
        levelBadge: "Level 1 • Cơ bản",
        description: "Đa thức một biến, phép chia có dư, định lý Bézout, hệ thức Viète liên hệ nghiệm và hệ số, tiêu chuẩn bất khả quy Eisenstein và nội suy Lagrange.",
        nodeIds: ["alg-polynomial-vieta", "alg-roots-irreducibility"]
      },
      {
        id: "alg-step-2",
        stepNumber: 2,
        title: "Ma trận, Lũy thừa ma trận & Dãy số truy hồi",
        level: "Trung cấp",
        levelBadge: "Level 2 • Nền tảng thuật toán",
        description: "Các phép toán ma trận, phép nhân ma trận O(N^3), lũy thừa ma trận tính số Fibonacci thứ 10^18 trong O(log N) và giải dãy truy hồi tuyến tính.",
        nodeIds: ["alg-matrix-exponentiation"]
      },
      {
        id: "alg-step-3",
        stepNumber: 3,
        title: "Khử Gauss, Hệ phương trình & Định thức",
        level: "Nâng cao",
        levelBadge: "Level 3 • Tuyến tính nâng cao",
        description: "Phương pháp khử Gauss đưa ma trận về dạng bậc thang, giải hệ N phương trình N ẩn trong O(N^3) và tính định thức ma trận det(A).",
        nodeIds: ["alg-gaussian-elimination", "alg-matrix-determinants"]
      },
      {
        id: "alg-step-4",
        stepNumber: 4,
        title: "Hàm sinh & Biến đổi Fourier nhanh (FFT / NTT)",
        level: "Đỉnh cao",
        levelBadge: "Level 4 • Đỉnh cao CP & Math",
        description: "Hàm sinh (Generating Functions) đếm số cấu hình và thuật toán biến đổi Fourier nhanh FFT / NTT nhân hai đa thức bậc N trong O(N log N).",
        nodeIds: ["alg-generating-functions", "alg-fft-ntt"]
      }
    ],
    nodes: [
      {
        id: "alg-polynomial-vieta",
        title: "Đa Thức, Hệ Thức Viète & Phép Chia Có Dư",
        vietnameseTitle: "Polynomials, Bézout Theorem & Viète Relations",
        description: "Đa thức một biến P(x), định lý Bézout P(x) = (x - c)Q(x) + P(c), hệ thức Viète liên hệ tổng và tích các nghiệm, công thức Newton tính tổng lũy thừa Sk = ∑ xi^k.",
        status: "completed",
        difficulty: "Cơ bản",
        prerequisites: ["Đại số sơ cấp"],
        keyTheorems: [
          "Định lý Bézout: c là nghiệm của P(x) <=> (x - c) | P(x)",
          "Hệ thức Viète: e_k = (-1)^k * a_{n-k} / a_n",
          "Công thức Newton liên hệ tổng lũy thừa và đa thức đối xứng"
        ],
        latexFormula: "P(x) = (x - c)Q(x) + P(c), \\quad \\sum_{i=1}^n x_i = -\\frac{a_{n-1}}{a_n}, \\quad \\prod_{i=1}^n x_i = (-1)^n \\frac{a_0}{a_n}",
        applications: ["Giải hệ phương trình đối xứng", "Tính tổng lũy thừa nghiệm", "Xác định nghiệm đa thức"],
        practiceProblems: [
          { title: "USAMO 2003 Problem 1: Đa thức nguyên", judge: "USAMO", url: "https://artofproblemsolving.com/community/c3413_usamo", difficulty: "Easy" },
          { title: "VMO 2019 Bài 2: Đa thức nghiệm thực", judge: "VMO", url: "https://artofproblemsolving.com/community/c3417_vietnam_national_olympiad", difficulty: "Medium" }
        ],
        blogSlug: "2026-02-20-olympiad-alg-polynomial-foundations-vieta"
      },
      {
        id: "alg-roots-irreducibility",
        title: "Đa Thức Nguyên, Bổ Đề Gauss & Tiêu Chuẩn Eisenstein",
        vietnameseTitle: "Irreducibility Criteria & Lagrange Interpolation",
        description: "Tính chất cơ bản a - b | P(a) - P(b) cho đa thức hệ số nguyên. Tiêu chuẩn Eisenstein chứng minh đa thức bất khả quy trên Q[x]. Đa thức nội suy Lagrange khôi phục đa thức bậc n qua n+1 điểm.",
        status: "completed",
        difficulty: "Trung cấp",
        prerequisites: ["Hệ thức Viète"],
        keyTheorems: [
          "Tính chất cơ bản: Với P(x) ∈ Z[x], ta có a - b | P(a) - P(b) với mọi a != b nguyên",
          "Tiêu chuẩn Eisenstein: Nếu p | a_i (i < n), p ∤ a_n, p^2 ∤ a_0 thì P(x) bất khả quy trên Q[x]",
          "Nội suy Lagrange: P(x) = ∑ y_i * ∏_{j != i} (x - x_j) / (x_i - x_j)"
        ],
        latexFormula: "a - b \\mid P(a) - P(b), \\quad P(x) = \\sum_{i=0}^n y_i \\prod_{j \\ne i} \\frac{x - x_j}{x_i - x_j}",
        applications: ["Chứng minh phương trình đa thức không có nghiệm hữu tỉ", "Khôi phục đa thức bí mật (Shamir Secret Sharing)"],
        practiceProblems: [
          { title: "Putnam 2020 Problem A1: Đa thức nguyên", judge: "Putnam", url: "https://artofproblemsolving.com/community/c4380_putnam", difficulty: "Medium" },
          { title: "IMO Shortlist 2008 A1: Đa thức số học", judge: "IMO", url: "https://artofproblemsolving.com/community/c3158_imo", difficulty: "Medium" }
        ],
        blogSlug: "2026-02-25-olympiad-alg-roots-irreducibility-eisenstein"
      },
      {
        id: "alg-matrix-exponentiation",
        title: "Ma Trận, Phép Nhân Ma Trận & Lũy Thừa Ma Trận",
        vietnameseTitle: "Matrix Multiplication & Matrix Exponentiation for Recurrences",
        description: "Phép nhân ma trận kích thước N x N trong O(N^3). Biểu diễn dãy số truy hồi tuyến tính (Fibonacci, số đường đi) dưới dạng vector trạng thái và lũy thừa ma trận nhị phân trong O(N^3 log K).",
        status: "completed",
        difficulty: "Trung cấp",
        prerequisites: ["Lũy thừa nhị phân"],
        keyTheorems: [
          "Phép nhân ma trận có tính kết hợp (A*B)*C = A*(B*C) nhưng KHÔNG có tính giao hoán",
          "Biểu diễn Fibonacci: [[F_{n+1}, F_n], [F_n, F_{n-1}]] = [[1, 1], [1, 0]]^n",
          "Độ phức tạp: O(K^3 log N) cho ma trận cỡ K x K và số mũ N"
        ],
        latexFormula: "\\begin{bmatrix} F_{n+1} \\\\ F_n \\end{bmatrix} = \\begin{bmatrix} 1 & 1 \\\\ 1 & 0 \\end{bmatrix}^n \\begin{bmatrix} F_1 \\\\ F_0 \\end{bmatrix}",
        applications: ["Tìm số Fibonacci thứ 10^18 trong 0.001 giây", "Đếm số đường đi độ dài K trên đồ thị", "Tăng tốc quy hoạch động"],
        practiceProblems: [
          { title: "CSES 1722: Fibonacci Numbers", judge: "CSES", url: "https://cses.fi/problemset/task/1722", difficulty: "Easy" },
          { title: "CSES 1723: Graph Paths I", judge: "CSES", url: "https://cses.fi/problemset/task/1723", difficulty: "Medium" }
        ],
        blogSlug: "2026-04-27-fibonacci-numbers-secrets"
      },
      {
        id: "alg-gaussian-elimination",
        title: "Khử Gauss & Giải Hệ Phương Trình Tuyến Tính",
        vietnameseTitle: "Gaussian Elimination & Systems of Linear Equations",
        description: "Phương pháp biến đổi sơ cấp trên dòng đưa ma trận về dạng tam giác trên (bậc thang). Giải hệ N phương trình N ẩn trong O(N^3). Nhận diện hệ vô nghiệm, vô số nghiệm và nghiệm duy nhất.",
        status: "completed",
        difficulty: "Nâng cao",
        prerequisites: ["Phép nhân ma trận"],
        keyTheorems: [
          "Ba phép biến đổi sơ cấp dòng bảo toàn tập nghiệm: Đổi chỗ 2 dòng, nhân một dòng với hằng số khác 0, cộng một bội dòng này vào dòng khác",
          "Định lý Rouché-Capelli: Hệ có nghiệm khi và chỉ khi rank(A) = rank(A|b)"
        ],
        latexFormula: "A \\cdot \\mathbf{x} = \\mathbf{b} \\implies \\begin{bmatrix} A & \\mathbf{b} \\end{bmatrix} \\xrightarrow{\\text{Gauss}} \\begin{bmatrix} I & \\mathbf{x} \\end{bmatrix}",
        applications: ["Giải mạch điện Kirchhoff", "Cân bằng phương trình hóa học", "Tìm cơ sở XOR trong lập trình thi đấu"],
        practiceProblems: [
          { title: "Codeforces 1155E: Guess the Root", judge: "Codeforces", url: "https://codeforces.com/problemset/problem/1155/E", difficulty: "Hard" },
          { title: "CSES 2418: Grid Path Construction", judge: "CSES", url: "https://cses.fi/problemset/task/2418", difficulty: "Hard" }
        ],
        blogSlug: "2026-06-20-gaussian-elimination-linear-systems"
      },
      {
        id: "alg-matrix-determinants",
        title: "Định Thức Ma Trận (Matrix Determinants)",
        vietnameseTitle: "Định thức det(A), Phép khử Gauss & Bổ đề Cauchy-Binet",
        description: "Định nghĩa định thức ma trận vuông det(A). Tính định thức bằng phép khử Gauss trong O(N^3). Mối liên hệ định thức với diện tích/thể tích hình học và Định lý Kirchhoff đếm số cây khung trên đồ thị (Matrix Tree Theorem).",
        status: "completed",
        difficulty: "Nâng cao",
        prerequisites: ["Khử Gauss"],
        keyTheorems: [
          "det(A*B) = det(A) * det(B)",
          "Ma trận khả nghịch khi và chỉ khi det(A) != 0",
          "Định lý Kirchhoff (Matrix Tree Theorem): Số cây khung của đồ thị bằng định thức con bất kỳ của ma trận Laplacian"
        ],
        latexFormula: "\\det(A) = \\sum_{\\sigma \\in S_n} \\text{sgn}(\\sigma) \\prod_{i=1}^n A_{i, \\sigma(i)}, \\quad \\det(A) = \\prod_{i=1}^n A_{i, i} \\quad (\\text{ma trận tam giác})",
        applications: ["Tính số cây khung của đồ thị (Matrix Tree Theorem)", "Kiểm tra hệ độc lập tuyến tính", "Tính thể tích khối đa diện N chiều"],
        practiceProblems: [
          { title: "Codeforces 852E: Casinos and Cities", judge: "Codeforces", url: "https://codeforces.com/problemset/problem/852/E", difficulty: "Hard" },
          { title: "SPOJ DETER3: Find The Determinant III", judge: "Codeforces", url: "https://www.spoj.com/problems/DETER3/", difficulty: "Medium" }
        ],
        blogSlug: "2026-07-06-matrix-determinant-gauss"
      },
      {
        id: "alg-generating-functions",
        title: "Hàm Sinh (Generating Functions)",
        vietnameseTitle: "Chuỗi hình thức biểu diễn các dãy số đếm tổ hợp",
        description: "Hàm sinh thường (OGF) G(x) = ∑ an x^n và hàm sinh mũ (EGF). Biến các phép toán tổ hợp phức tạp thành các phép nhân, cộng, chia đa thức đại số đơn giản. Giải bài toán chia kẹo có giới hạn.",
        status: "in_progress",
        difficulty: "Đỉnh cao",
        prerequisites: ["Nhị thức Newton mở rộng", "Dãy số truy hồi"],
        keyTheorems: [
          "Hàm sinh chuỗi hình học: 1 / (1 - x) = 1 + x + x^2 + x^3 + ...",
          "Tích hai hàm sinh tương ứng với tích chập của hai dãy số: c_n = ∑ a_k * b_{n-k}"
        ],
        latexFormula: "G(x) = \\sum_{n=0}^\\infty a_n x^n = a_0 + a_1 x + a_2 x^2 + \\dots",
        applications: ["Đếm số phân hoạch số nguyên P(n)", "Giải phương trình truy hồi sai phân", "Phân tích cấu trúc đồ thị"],
        practiceProblems: [
          { title: "Codeforces 451E: Devu and Flowers", judge: "Codeforces", url: "https://codeforces.com/problemset/problem/451/E", difficulty: "Hard" },
          { title: "HackerRank: Generating Functions", judge: "Codeforces", url: "https://www.hackerrank.com", difficulty: "Medium" }
        ],
        blogSlug: null
      },
      {
        id: "alg-fft-ntt",
        title: "Biến Đổi Fourier Nhanh & Biến Đổi Số Học (FFT / NTT)",
        vietnameseTitle: "Fast Fourier Transform & Number Theoretic Transform O(N log N)",
        description: "Thuật toán nhân hai đa thức bậc N trong O(N log N) thay vì O(N^2) thông thường. Chuyển đổi giữa biểu diễn hệ số và biểu diễn điểm qua căn nguyên thủy của đơn vị (Root of Unity).",
        status: "in_progress",
        difficulty: "Đỉnh cao",
        prerequisites: ["Số phức", "Căn nguyên thủy", "Đa thức"],
        keyTheorems: [
          "Định lý tích chập: Tích chập trong miền thời gian tương đương với phép nhân từng điểm trong miền tần số",
          "NTT sử dụng căn nguyên thủy g mod (c * 2^k + 1) như MOD 998244353 thay cho số phức để tránh sai số thực"
        ],
        latexFormula: "A(x) \\cdot B(x) = \\text{IFFT}\\Big(\\text{FFT}(A) \\odot \\text{FFT}(B)\\Big) \\implies O(N \\log N)",
        applications: ["Nhân hai số nguyên lớn 10^6 chữ số trong 0.2s", "Đếm số tổng a + b = c", "Tìm khớp xâu ký tự có ký tự đại diện wildcard"],
        practiceProblems: [
          { title: "CSES 2111: Apples and Bananas", judge: "CSES", url: "https://cses.fi/problemset/task/2111", difficulty: "Hard" },
          { title: "Codeforces 1096G: Lucky Tickets", judge: "Codeforces", url: "https://codeforces.com/problemset/problem/1096/G", difficulty: "Hard" }
        ],
        blogSlug: null
      }
    ]
  },

  // ==========================================
  // PILLAR 5: PROBABILITY AND EXPECTED VALUE
  // ==========================================
  {
    id: 5,
    name: "5. Xác Suất & Kỳ Vọng Toán Học",
    subtitle: "Probability & Expected Value",
    description: "Từ không gian mẫu, xác suất có điều kiện, biến cố độc lập đến kỳ vọng toán học, vũ khí Linearity of Expectation, phương sai, bất đẳng thức Chebyshev và Quy hoạch động xác suất.",
    icon: "fa6-solid:chart-pie",
    groups: [
      {
        id: "prob-step-1",
        stepNumber: 1,
        title: "Không gian mẫu, Biến cố & Xác suất cơ bản",
        level: "Cơ bản",
        levelBadge: "Level 1 • Cơ bản",
        description: "Hiểu bản chất không gian mẫu Omega, biến cố A, công thức xác suất cổ điển P(A) = |A| / |Omega|, biến cố độc lập và xác suất có điều kiện P(A|B).",
        nodeIds: ["prob-sample-spaces-events"]
      },
      {
        id: "prob-step-2",
        stepNumber: 2,
        title: "Kỳ vọng toán học & Tính tuyến tính thần kỳ",
        level: "Trung cấp",
        levelBadge: "Level 2 • Vũ khí cốt lõi",
        description: "Định nghĩa kỳ vọng E[X] là giá trị trung bình theo trọng số xác suất, và vũ khí tối thượng Tính tuyến tính của kỳ vọng E[X + Y] = E[X] + E[Y] không cần độc lập.",
        nodeIds: ["prob-expectation-linearity"]
      },
      {
        id: "prob-step-3",
        stepNumber: 3,
        title: "Phương sai & Các bất đẳng thức xác suất",
        level: "Nâng cao",
        levelBadge: "Level 3 • Đánh giá phân tán",
        description: "Đo lường độ phân tán bằng phương sai Var(X) = E[X^2] - (E[X])^2, bất đẳng thức Markov đánh giá biến ngẫu nhiên không âm và bất đẳng thức Chebyshev.",
        nodeIds: ["prob-variance-chebyshev"]
      },
      {
        id: "prob-step-4",
        stepNumber: 4,
        title: "Quy hoạch động xác suất & Kỳ vọng trên đồ thị",
        level: "Đỉnh cao",
        levelBadge: "Level 4 • Lập trình thi đấu",
        description: "Thiết lập hệ phương trình trạng thái quy hoạch động tính xác suất thắng và kỳ vọng số bước đi trên đồ thị có chu trình bằng khử Gauss.",
        nodeIds: ["prob-dp-markov-chains"]
      }
    ],
    nodes: [
      {
        id: "prob-sample-spaces-events",
        title: "Không Gian Mẫu, Biến Cố & Xác Suất Có Điều Kiện",
        vietnameseTitle: "Sample Spaces, Events, Conditional Probability & Independence",
        description: "Không gian mẫu Omega, biến cố tập con A. Xác suất cổ điển P(A) = |A| / |Omega|. Biến cố độc lập P(A ∩ B) = P(A)*P(B). Xác suất có điều kiện P(A|B) = P(A ∩ B) / P(B) và Định lý Bayes.",
        status: "completed",
        difficulty: "Cơ bản",
        prerequisites: ["Tổ hợp cơ bản"],
        keyTheorems: [
          "Xác suất cổ điển: P(A) = |A| / |Ω| với các kết cục đồng khả năng",
          "Biến cố độc lập: P(A ∩ B) = P(A) * P(B)",
          "Định lý Bayes: P(A|B) = P(B|A) * P(A) / P(B)"
        ],
        latexFormula: "P(A) = \\frac{|A|}{|\\Omega|}, \\quad P(A \\mid B) = \\frac{P(A \\cap B)}{P(B)}, \\quad P(A \\cap B) = P(A) \\cdot P(B)",
        applications: ["Tính xác suất thắng trong trò chơi", "Phân tích rủi ro trong thuật toán ngẫu nhiên", "Bộ lọc thư rác Naive Bayes"],
        practiceProblems: [
          { title: "CSES 1728: Inversion Probability", judge: "CSES", url: "https://cses.fi/problemset/task/1728", difficulty: "Medium" },
          { title: "Codeforces 148D: Bag of mice", judge: "Codeforces", url: "https://codeforces.com/problemset/problem/148/D", difficulty: "Medium" }
        ],
        blogSlug: "2026-05-15-probability-expected-value-for-programmers"
      },
      {
        id: "prob-expectation-linearity",
        title: "Kỳ Vọng Toán Học & Tính Tuyến Tính (Linearity of Expectation)",
        vietnameseTitle: "Expected Value E[X] & Tuyệt kỹ biến chỉ thị Indicator Variables",
        description: "Kỳ vọng E[X] = ∑ x * P(X = x) là trung bình có trọng số. Tính tuyến tính thần kỳ E[X + Y] = E[X] + E[Y] luôn đúng bất chấp độc lập. Kỹ thuật biến chỉ thị I_i đếm số sự kiện xảy ra.",
        status: "completed",
        difficulty: "Trung cấp",
        prerequisites: ["Xác suất cơ bản"],
        keyTheorems: [
          "Công thức kỳ vọng rời rạc: E[X] = ∑ x_i * P(X = x_i)",
          "Tính tuyến tính của kỳ vọng: E[X1 + ... + Xn] = E[X1] + ... + E[Xn] (KHÔNG CẦN ĐỘC LẬP)",
          "Kỳ vọng của biến chỉ thị: E[I_A] = P(A)"
        ],
        latexFormula: "\\mathbf{E}[X] = \\sum x_i P(X = x_i), \\quad \\mathbf{E}\\left[\\sum_{i=1}^n X_i\\right] = \\sum_{i=1}^n \\mathbf{E}[X_i]",
        applications: ["Đếm số nghịch thế kỳ vọng trong mảng", "Bài toán phát thư nhầm", "Phân tích thời gian chạy trung bình của Randomized Quicksort"],
        practiceProblems: [
          { title: "CSES 1729: Moving Robots", judge: "CSES", url: "https://cses.fi/problemset/task/1729", difficulty: "Medium" },
          { title: "Codeforces 1042E: Vasya and Magic Matrix", judge: "Codeforces", url: "https://codeforces.com/problemset/problem/1042/E", difficulty: "Hard" }
        ],
        blogSlug: "2026-05-15-probability-expected-value-for-programmers"
      },
      {
        id: "prob-variance-chebyshev",
        title: "Phương Sai & Bất Đẳng Thức Chebyshev",
        vietnameseTitle: "Variance Var(X), Markov & Chebyshev Inequalities",
        description: "Đo lường mức độ dao động xung quanh kỳ vọng bằng phương sai Var(X) = E[X^2] - (E[X])^2. Bất đẳng thức Markov P(X >= a) <= E[X]/a cho biến không âm và Chebyshev P(|X - E[X]| >= k*sigma) <= 1/k^2.",
        status: "completed",
        difficulty: "Nâng cao",
        prerequisites: ["Kỳ vọng toán học"],
        keyTheorems: [
          "Công thức phương sai: Var(X) = E[(X - E[X])^2] = E[X^2] - (E[X])^2",
          "Bất đẳng thức Markov: Với X >= 0, P(X >= a) <= E[X] / a",
          "Bất đẳng thức Chebyshev: P(|X - E[X]| >= k*σ) <= 1 / k^2"
        ],
        latexFormula: "\\text{Var}(X) = \\mathbf{E}[X^2] - (\\mathbf{E}[X])^2, \\quad P(|X - \\mu| \\ge k\\sigma) \\le \\frac{1}{k^2}",
        applications: ["Đánh giá sai số thuật toán ngẫu nhiên", "Chứng minh luật số lớn", "Thiết kế thuật toán xấp xỉ"],
        practiceProblems: [
          { title: "Codeforces 1140F: Extending Set of Points", judge: "Codeforces", url: "https://codeforces.com/problemset/problem/1140/F", difficulty: "Hard" },
          { title: "Putnam 2017 Problem B1: Kỳ vọng và tích phân", judge: "Putnam", url: "https://artofproblemsolving.com/community/c4380_putnam", difficulty: "Hard" }
        ],
        blogSlug: "2026-05-15-probability-expected-value-for-programmers"
      },
      {
        id: "prob-dp-markov-chains",
        title: "Quy Hoạch Động Xác Suất & Xích Markov (Probability DP)",
        vietnameseTitle: "Thiết lập hệ phương trình trạng thái kỳ vọng trên đồ thị",
        description: "Mô hình xích Markov và quy hoạch động tính xác suất đạt đến trạng thái đích. Bài toán kỳ vọng số bước đi ngẫu nhiên trên đồ thị quy về hệ phương trình tuyến tính giải bằng khử Gauss.",
        status: "in_progress",
        difficulty: "Đỉnh cao",
        prerequisites: ["Khử Gauss", "Kỳ vọng toán học"],
        keyTheorems: [
          "Công thức chuyển trạng thái kỳ vọng: E[u] = 1 + ∑ P(u -> v) * E[v]",
          "Hấp thụ xích Markov: Ma trận P quy về giải hệ (I - Q) * E = 1"
        ],
        latexFormula: "E[u] = 1 + \\sum_{v \\in \\text{Adj}(u)} P(u \\to v) \\cdot E[v]",
        applications: ["Tính số lượt tung xúc xắc trung bình để thắng game cờ cá ngựa", "Bước đi ngẫu nhiên trên đồ thị Random Walk"],
        practiceProblems: [
          { title: "CSES 1729: Moving Robots", judge: "CSES", url: "https://cses.fi/problemset/task/1729", difficulty: "Hard" },
          { title: "Codeforces 24D: Broken robot", judge: "Codeforces", url: "https://codeforces.com/problemset/problem/24/D", difficulty: "Hard" }
        ],
        blogSlug: null
      }
    ]
  },

  // ==========================================
  // PILLAR 6: GEOMETRY
  // ==========================================
  {
    id: 6,
    name: "6. Hình Học Phẳng & Tính Toán",
    subtitle: "Geometry & Computational Geometry",
    description: "Bộ công cụ hình học máy tính thực chiến: Vector 2D/3D, Tích vô hướng (Dot), Tích có hướng (Cross), Phép rẽ CCW, Kiểm tra cắt nhau, Bao lồi (Convex Hull), Điểm trong đa giác, Con trỏ quay và Nửa mặt phẳng.",
    icon: "fa6-solid:shapes",
    groups: [
      {
        id: "geo-step-1",
        stepNumber: 1,
        title: "Vector 2D, Tích vô hướng & Tích có hướng",
        level: "Cơ bản",
        levelBadge: "Level 1 • Nền tảng số nguyên",
        description: "Tọa độ điểm và vector 2D/3D, phép cộng trừ vector, tích vô hướng kiểm tra vuông góc và tích có hướng 2D tính diện tích hình bình hành không lo sai số thực.",
        nodeIds: ["geo-vectors-dot-cross"]
      },
      {
        id: "geo-step-2",
        stepNumber: 2,
        title: "Hàm CCW & Kiểm tra hai đoạn thẳng cắt nhau",
        level: "Trung cấp",
        levelBadge: "Level 2 • Kỹ thuật then chốt",
        description: "Hàm Counter-Clockwise (CCW) xác định hướng rẽ trái / rẽ phải / thẳng hàng chỉ bằng dấu tích có hướng. Ứng dụng kiểm tra hai đoạn thẳng cắt nhau không dùng số thực.",
        nodeIds: ["geo-ccw-segment-intersection"]
      },
      {
        id: "geo-step-3",
        stepNumber: 3,
        title: "Bao lồi (Convex Hull) & Điểm trong đa giác",
        level: "Nâng cao",
        levelBadge: "Level 3 • Thuật toán kinh điển",
        description: "Thuật toán tìm Bao lồi Monotone Chain / Graham Scan trong O(N log N). Kiểm tra điểm nằm trong đa giác lồi trong O(log N) và con trỏ quay (Rotating Calipers) tìm cặp điểm xa nhất.",
        nodeIds: ["geo-convex-hull-point-in-poly"]
      },
      {
        id: "geo-step-4",
        stepNumber: 4,
        title: "Đường quét, Hình học đường tròn & Nửa mặt phẳng",
        level: "Đỉnh cao",
        levelBadge: "Level 4 • Đỉnh cao hình học",
        description: "Thuật toán đường quét (Sweep Line), giao điểm và phương tích đường tròn, và thuật toán tìm giao các nửa mặt phẳng (Half-Plane Intersection) trong O(N log N).",
        nodeIds: ["geo-sweep-line-half-planes"]
      }
    ],
    nodes: [
      {
        id: "geo-vectors-dot-cross",
        title: "Vector 2D/3D, Tích Vô Hướng (Dot) & Tích Có Hướng (Cross)",
        vietnameseTitle: "Tọa độ vector, Dot Product, Cross Product & Diện tích tam giác",
        description: "Biểu diễn Point struct. Vector AB = B - A. Tích vô hướng u.v = x1*x2 + y1*y2 xác định góc và tính vuông góc. Tích có hướng u x v = x1*y2 - x2*y1 đo diện tích hình bình hành có dấu.",
        status: "completed",
        difficulty: "Cơ bản",
        prerequisites: ["Hình học phẳng cấp 3"],
        keyTheorems: [
          "Tích vô hướng: u · v = |u| * |v| * cos(θ) = x1*x2 + y1*y2 (u ⊥ v <=> u · v = 0)",
          "Tích có hướng: u × v = x1*y2 - x2*y1 = |u| * |v| * sin(θ)",
          "Diện tích tam giác ABC: S = 1/2 * |cross(AB, AC)|"
        ],
        latexFormula: "\\vec{u} \\cdot \\vec{v} = x_1 x_2 + y_1 y_2, \\quad \\vec{u} \\times \\vec{v} = x_1 y_2 - x_2 y_1, \\quad S_{ABC} = \\frac{1}{2} |\\vec{AB} \\times \\vec{AC}|",
        applications: ["Tính góc giữa hai đường thẳng", "Tính diện tích đa giác bằng công thức Shoelace (dây giày)", "Kiểm tra vuông góc"],
        practiceProblems: [
          { title: "CSES 2189: Point Location Test", judge: "CSES", url: "https://cses.fi/problemset/task/2189", difficulty: "Easy" },
          { title: "CSES 2191: Polygon Area", judge: "CSES", url: "https://cses.fi/problemset/task/2191", difficulty: "Easy" }
        ],
        blogSlug: "2026-06-10-computational-geometry-vectors-ccw"
      },
      {
        id: "geo-ccw-segment-intersection",
        title: "Phép Rẽ CCW & Kiểm Tra Đoạn Thẳng Cắt Nhau",
        vietnameseTitle: "Counter-Clockwise Orientation & Segment Intersection Test",
        description: "Hàm CCW(A, B, C): xác định C nằm bên trái (>0), bên phải (<0) hay thẳng hàng (=0) với vector AB. Kiểm tra hai đoạn thẳng AB và CD cắt nhau bằng phép nhân dấu CCW hoàn toàn bằng số nguyên.",
        status: "completed",
        difficulty: "Trung cấp",
        prerequisites: ["Tích có hướng Cross Product"],
        keyTheorems: [
          "CCW(A, B, C) = cross(B - A, C - A)",
          "Hai đoạn AB và CD cắt nhau <=> C và D khác phía so với AB VÀ A và B khác phía so với CD",
          "Điều kiện khác phía: ccw(A, B, C) * ccw(A, B, D) <= 0"
        ],
        latexFormula: "\\text{ccw}(A, B, C) = (x_B - x_A)(y_C - y_A) - (y_B - y_A)(x_C - x_A)",
        applications: ["Kiểm tra đa giác tự cắt", "Tìm giao điểm của các tia", "Trò chơi vật lý 2D"],
        practiceProblems: [
          { title: "CSES 2190: Line Segment Intersection", judge: "CSES", url: "https://cses.fi/problemset/task/2190", difficulty: "Medium" },
          { title: "Codeforces 1036B: Diagonal Walking v.2", judge: "Codeforces", url: "https://codeforces.com/problemset/problem/1036/B", difficulty: "Medium" }
        ],
        blogSlug: "2026-06-10-computational-geometry-vectors-ccw"
      },
      {
        id: "geo-convex-hull-point-in-poly",
        title: "Bao Lồi (Convex Hull) & Điểm Trong Đa Giác",
        vietnameseTitle: "Thuật toán Monotone Chain O(N log N) & Rotating Calipers",
        description: "Dựng bao lồi bằng thuật toán Monotone Chain (Andrew). Kiểm tra điểm nằm trong đa giác bằng thuật toán Ray Casting (bắn tia) cho đa giác bất kỳ và chặt nhị phân O(log N) cho đa giác lồi. Kỹ thuật con trỏ quay tìm cặp điểm xa nhất.",
        status: "completed",
        difficulty: "Nâng cao",
        prerequisites: ["Hàm CCW"],
        keyTheorems: [
          "Bao lồi là đa giác lồi nhỏ nhất bao phủ toàn bộ tập điểm",
          "Monotone Chain dựng vỏ dưới và vỏ trên bằng cách duy trì rẽ trái ccw > 0",
          "Kỹ thuật con trỏ quay (Rotating Calipers) tìm khoảng cách xa nhất giữa 2 điểm trong O(N) sau khi có bao lồi"
        ],
        latexFormula: "\\text{while } (k \\ge 2 \\text{ and } \\text{ccw}(h_{k-2}, h_{k-1}, p_i) \\le 0) \\quad k--",
        applications: ["Tìm cặp điểm xa nhất trên mặt phẳng", "Xác định vùng phủ nhỏ nhất của robot", "Bao lồi động trong tối ưu hóa CHT"],
        practiceProblems: [
          { title: "CSES 2195: Convex Hull", judge: "CSES", url: "https://cses.fi/problemset/task/2195", difficulty: "Medium" },
          { title: "CSES 2192: Point in Polygon", judge: "CSES", url: "https://cses.fi/problemset/task/2192", difficulty: "Medium" }
        ],
        blogSlug: "2026-07-20-computational-geometry-convex-hull"
      },
      {
        id: "geo-sweep-line-half-planes",
        title: "Thuật Toán Đường Quét (Sweep Line) & Giao Nửa Mặt Phẳng",
        vietnameseTitle: "Sweep Line, Circle Geometry & Half-Plane Intersection O(N log N)",
        description: "Thuật toán đường quét (Sweep Line) giải bài toán tìm cặp điểm gần nhất O(N log N) và diện tích hợp các hình chữ nhật. Hình học đường tròn. Giao các nửa mặt phẳng dựng vùng đa giác lồi khả thi.",
        status: "in_progress",
        difficulty: "Đỉnh cao",
        prerequisites: ["Bao lồi", "Cấu trúc dữ liệu Set/Treap"],
        keyTheorems: [
          "Đường quét biến bài toán 2D tĩnh thành bài toán 1D động theo trục x",
          "Giao các nửa mặt phẳng luôn tạo thành một tập lồi (có thể rỗng hoặc vô hạn)"
        ],
        latexFormula: "\\mathcal{H}_i: a_i x + b_i y + c_i \\le 0 \\implies \\bigcap_{i=1}^n \\mathcal{H}_i = \\text{Đa giác lồi khả thi}",
        applications: ["Quy hoạch tuyến tính 2D", "Tìm tầm nhìn của camera trong phòng đa giác (Art Gallery Problem)", "Tính diện tích phủ radar"],
        practiceProblems: [
          { title: "CSES 2194: Minimum Euclidean Distance", judge: "CSES", url: "https://cses.fi/problemset/task/2194", difficulty: "Hard" },
          { title: "Codeforces 1060F: Shrinking Tree", judge: "Codeforces", url: "https://codeforces.com/problemset/problem/1060/F", difficulty: "Hard" }
        ],
        blogSlug: null
      }
    ]
  },

  // ==========================================
  // PILLAR 7: MATHEMATICAL DP AND OPTIMIZATION
  // ==========================================
  {
    id: 7,
    name: "7. Quy Hoạch Động Toán & Tối Ưu",
    subtitle: "Mathematical DP & Optimization",
    description: "Bộ bí kíp tối ưu hóa thuật toán quy hoạch động: Bitmask DP, Digit DP, SOS DP, Tối ưu chia để trị (D&C), Convex Hull Trick (CHT), Cây Li Chao và Tối ưu Knuth.",
    icon: "fa6-solid:bolt",
    groups: [
      {
        id: "dp-step-1",
        stepNumber: 1,
        title: "Quy hoạch động Bitmask & Chữ số (Digit DP)",
        level: "Trung cấp",
        levelBadge: "Level 1 • Nâng tầm DP",
        description: "Làm chủ Bitmask DP biểu diễn tập hợp bằng số nguyên 32-bit, và Digit DP đếm số lượng số trong đoạn [L, R] thỏa mãn điều kiện chữ số.",
        nodeIds: ["dp-bitmask-core", "dp-digit-dp"]
      },
      {
        id: "dp-step-2",
        stepNumber: 2,
        title: "SOS DP (Sum Over Subsets) & Tối ưu Chia để trị",
        level: "Nâng cao",
        levelBadge: "Level 2 • Tối ưu kinh điển",
        description: "Tính tổng trên mọi tập con bằng SOS DP trong O(N * 2^N) thay vì O(3^N). Tối ưu hóa chia để trị (D&C Optimization) giảm độ phức tạp từ O(K*N^2) xuống O(K*N log N).",
        nodeIds: ["dp-sos-dp", "dp-divide-and-conquer-opt"]
      },
      {
        id: "dp-step-3",
        stepNumber: 3,
        title: "Convex Hull Trick (CHT) & Cây Li Chao",
        level: "Đỉnh cao",
        levelBadge: "Level 3 • Tối ưu đường thẳng",
        description: "Tối ưu hóa chuyển trạng thái dạng dp[i] = min(m_j * x_i + c_j) bằng bao lồi các đường thẳng CHT trong O(N) và Cây Li Chao hỗ trợ truy vấn động trong O(log C).",
        nodeIds: ["dp-convex-hull-trick-li-chao"]
      },
      {
        id: "dp-step-4",
        stepNumber: 4,
        title: "Tối ưu Knuth & Lập luận đổi chỗ (Exchange Arguments)",
        level: "Đỉnh cao",
        levelBadge: "Level 4 • Đỉnh cao cấu trúc",
        description: "Tối ưu Knuth cho quy hoạch động đoạn thỏa mãn bất đẳng thức tứ giác (Quadrangle Inequality) opt[i][j-1] <= opt[i][j] <= opt[i+1][j] giảm từ O(N^3) xuống O(N^2).",
        nodeIds: ["dp-knuth-exchange-arguments"]
      }
    ],
    nodes: [
      {
        id: "dp-bitmask-core",
        title: "Quy Hoạch Động Trạng Thái Mặt Nạ Bit (Bitmask DP)",
        vietnameseTitle: "Mặt nạ bit biểu diễn tập con & Bài toán người du lịch (TSP)",
        description: "Sử dụng số nguyên biểu diễn tập con hữu hạn N <= 20 phần tử. Các thao tác bitwise bật, tắt, kiểm tra bit. Áp dụng giải bài toán người du lịch TSP trong O(N^2 * 2^N) thay vì O(N!).",
        status: "completed",
        difficulty: "Trung cấp",
        prerequisites: ["Thao tác bitwise", "Quy hoạch động cơ bản"],
        keyTheorems: [
          "Tập con n phần tử được nén hoàn hảo thành một số nguyên từ 0 đến 2^n - 1",
          "Kiểm tra phần tử i: (mask >> i) & 1",
          "Bật phần tử i: mask | (1 << i), tắt phần tử i: mask & ~(1 << i)"
        ],
        latexFormula: "dp[\\text{mask}][u] = \\min_{v \\notin \\text{mask}} \\Big(dp[\\text{mask} \\mid (1 \\ll v)][v] + \\text{dist}(u, v)\\Big)",
        applications: ["Bài toán người du lịch (TSP)", "Xếp lịch công việc", "Đếm số cách ghép đôi hoàn hảo"],
        practiceProblems: [
          { title: "CSES 1690: Hamiltonian Flights", judge: "CSES", url: "https://cses.fi/problemset/task/1690", difficulty: "Medium" },
          { title: "CSES 2181: Counting Tilings", judge: "CSES", url: "https://cses.fi/problemset/task/2181", difficulty: "Hard" }
        ],
        blogSlug: "2025-10-04-bitmasks-and-bitmask-dp"
      },
      {
        id: "dp-digit-dp",
        title: "Quy Hoạch Động Chữ Số (Digit DP)",
        vietnameseTitle: "Đếm số nguyên trong đoạn [L, R] thỏa mãn tính chất chữ số",
        description: "Kỹ thuật đếm số lượng số trong đoạn [L, R] có tính chất đặc biệt (ví dụ: không chứa số 13, tổng chữ số là số nguyên tố). Trạng thái (vị trí chữ số, cờ tight, các điều kiện tích lũy).",
        status: "completed",
        difficulty: "Trung cấp",
        prerequisites: ["Đệ quy có nhớ"],
        keyTheorems: [
          "Quy tắc đoạn: f([L, R]) = f([0, R]) - f([0, L - 1])",
          "Cờ tight (chặn trên): Nếu các chữ số trước đã nhỏ hơn tiền tố của R thì chữ số tiếp theo được tự do chọn từ 0 đến 9"
        ],
        latexFormula: "dp(\\text{pos}, \\text{tight}, \\text{mask}) = \\sum_{d=0}^{\\text{limit}} dp(\\text{pos} + 1, \\text{tight} \\land (d = \\text{limit}), \\text{update}(\\text{mask}, d))",
        applications: ["Đếm số không chứa chữ số 4 và 7", "Đếm số đối xứng (Palindrome) trong đoạn lớn 10^18", "Tìm số tự nhiên thứ K"],
        practiceProblems: [
          { title: "CSES 2220: Counting Numbers", judge: "CSES", url: "https://cses.fi/problemset/task/2220", difficulty: "Medium" },
          { title: "Codeforces 1073E: Segment Sum", judge: "Codeforces", url: "https://codeforces.com/problemset/problem/1073/E", difficulty: "Hard" }
        ],
        blogSlug: null
      },
      {
        id: "dp-sos-dp",
        title: "SOS DP (Sum Over Subsets Dynamic Programming)",
        vietnameseTitle: "Tính tổng trên mọi tập con F[mask] = ∑_{sub ⊆ mask} A[sub] trong O(N * 2^N)",
        description: "Tính tổng trên toàn bộ các tập con của từng mặt nạ bit. Thuật toán duyệt ngây thơ mất O(3^N), SOS DP sử dụng ý tưởng hàm tiền tố trên từng bit giảm xuống đúng O(N * 2^N).",
        status: "in_progress",
        difficulty: "Nâng cao",
        prerequisites: ["Bitmask DP"],
        keyTheorems: [
          "Biến đổi SOS: dp[i][mask] là tổng của các tập con chỉ khác mask ở i bit đầu tiên",
          "Chuyển trạng thái: dp[i][mask] = dp[i-1][mask] + (nếu bit i bật: dp[i-1][mask ^ (1 << i)])",
          "Độ phức tạp tối ưu: O(N * 2^N)"
        ],
        latexFormula: "F[\\text{mask}] = \\sum_{s \\subseteq \\text{mask}} A[s] \\implies O(N \\cdot 2^N)",
        applications: ["Tính toán xác suất trên đồ thị", "Đếm số cặp i, j có a_i & a_j = 0", "Biến đổi Walsh-Hadamard"],
        practiceProblems: [
          { title: "CSES 1654: Bit Problem", judge: "CSES", url: "https://cses.fi/problemset/task/1654", difficulty: "Hard" },
          { title: "Codeforces 1208F: Bits And Pieces", judge: "Codeforces", url: "https://codeforces.com/problemset/problem/1208/F", difficulty: "Hard" }
        ],
        blogSlug: null
      },
      {
        id: "dp-divide-and-conquer-opt",
        title: "Tối Ưu Hóa Chia Để Trị (Divide and Conquer Optimization)",
        vietnameseTitle: "Tối ưu DP O(K*N^2) xuống O(K*N log N) nhờ tính đơn điệu điểm tối ưu",
        description: "Áp dụng cho quy hoạch động phân hoạch K đoạn dạng dp[i][j] = min_{k < j} (dp[i-1][k] + Cost(k+1, j)). Nếu điểm tối ưu opt[i][j] đơn điệu không giảm theo j, ta chia để trị giảm độ phức tạp xuống O(K * N log N).",
        status: "completed",
        difficulty: "Nâng cao",
        prerequisites: ["Quy hoạch động phân hoạch"],
        keyTheorems: [
          "Điều kiện đơn điệu điểm tối ưu: opt[i][j] <= opt[i][j+1]",
          "Thỏa mãn khi hàm chi phí Cost(i, j) có tính chất bất đẳng thức tứ giác (Monge Property): Cost(a, c) + Cost(b, d) <= Cost(a, d) + Cost(b, c) với a <= b <= c <= d"
        ],
        latexFormula: "\\text{opt}[i][j] \\le \\text{opt}[i][j+1] \\implies O(K \\cdot N \\log N)",
        applications: ["Phân cụm dữ liệu 1D", "Chia đoạn văn bản", "Bài toán phân bổ tài nguyên tối ưu"],
        practiceProblems: [
          { title: "CSES 2084: Monster Game I", judge: "CSES", url: "https://cses.fi/problemset/task/2084", difficulty: "Medium" },
          { title: "Codeforces 321E: Ciel and Gondolas", judge: "Codeforces", url: "https://codeforces.com/problemset/problem/321/E", difficulty: "Hard" }
        ],
        blogSlug: "2025-10-12-divide-and-conquer-dp"
      },
      {
        id: "dp-convex-hull-trick-li-chao",
        title: "Convex Hull Trick (CHT) & Cây Li Chao (Li Chao Tree)",
        vietnameseTitle: "Tối ưu hóa quy hoạch động hàm bậc nhất min(m*x + c) trong O(log N)",
        description: "Tối ưu hóa chuyển trạng thái dạng dp[i] = min_{j < i} (m_j * x_i + c_j) bằng cấu trúc bao lồi các đường thẳng. Khi hệ số góc không đơn điệu, Cây Li Chao (Segment Tree trên đường thẳng) hỗ trợ chèn đường thẳng và truy vấn trong O(log C).",
        status: "in_progress",
        difficulty: "Đỉnh cao",
        prerequisites: ["Bao lồi", "Segment Tree"],
        keyTheorems: [
          "Dạng hàm: Mỗi trạng thái cũ cung cấp một đường thẳng y = m*x + c, trạng thái mới là truy vấn cực trị tại x",
          "CHT tĩnh: Duy trì giao điểm các đường thẳng bằng deque trong O(N)",
          "Cây Li Chao: Segment Tree lưu đường thẳng chiếm ưu thế tại trung điểm"
        ],
        latexFormula: "dp[i] = \\min_{j < i} \\big(m_j \\cdot x_i + c_j\\big) \\xrightarrow{\\text{Li Chao / CHT}} O(N \\log C)",
        applications: ["Monster Game trong CSES", "Bài toán cắt cây đốn gỗ", "Tối ưu hóa chi phí vận chuyển"],
        practiceProblems: [
          { title: "CSES 2085: Monster Game II", judge: "CSES", url: "https://cses.fi/problemset/task/2085", difficulty: "Hard" },
          { title: "Codeforces 1083E: The Fair Nut and Rectangles", judge: "Codeforces", url: "https://codeforces.com/problemset/problem/1083/E", difficulty: "Hard" }
        ],
        blogSlug: null
      },
      {
        id: "dp-knuth-exchange-arguments",
        title: "Tối Ưu Knuth & Lập Luận Đổi Chỗ (Exchange Arguments)",
        vietnameseTitle: "Tối ưu DP đoạn O(N^3) xuống O(N^2) & Kỹ thuật tham lam chứng minh thứ tự",
        description: "Tối ưu Knuth cho quy hoạch động đoạn dp[i][j] = min_{i <= k < j} (dp[i][k] + dp[k+1][j]) + Cost(i, j) nhờ tính chất kẹp điểm tối ưu opt[i][j-1] <= opt[i][j] <= opt[i+1][j]. Lập luận đổi chỗ (Exchange Arguments) chứng minh thứ tự sắp xếp tham lam.",
        status: "completed",
        difficulty: "Đỉnh cao",
        prerequisites: ["Tối ưu D&C"],
        keyTheorems: [
          "Bất đẳng thức kẹp Knuth: opt[i][j-1] <= opt[i][j] <= opt[i+1][j]",
          "Giảm độ phức tạp: Tổng số phép duyệt qua tất cả các đoạn bằng O(N^2)",
          "Exchange Arguments: Giả sử tồn tại hoán vị tối ưu mà hai phần tử liền kề nghịch thế, đổi chỗ chúng để suy ra mâu thuẫn"
        ],
        latexFormula: "\\text{opt}[i][j-1] \\le \\text{opt}[i][j] \\le \\text{opt}[i+1][j] \\implies O(N^3) \\to O(N^2)",
        applications: ["Dựng cây nhị phân tìm kiếm tối ưu (OBST)", "Bài toán nối chuỗi / cắt thanh gỗ", "Chứng minh thuật toán tham lam"],
        practiceProblems: [
          { title: "CSES 2088: Knuth Division", judge: "CSES", url: "https://cses.fi/problemset/task/2088", difficulty: "Hard" },
          { title: "Codeforces 888G: Xor-MST", judge: "Codeforces", url: "https://codeforces.com/problemset/problem/888/G", difficulty: "Hard" }
        ],
        blogSlug: "2025-10-26-knuth-optimization-range-dp"
      }
    ]
  },

  // ==========================================
  // PILLAR 8: GRAPH THEORY
  // ==========================================
  {
    id: 8,
    name: "8. Lý Thuyết Đồ Thị",
    subtitle: "Graph Theory & Network Flows",
    description: "Bộ công cụ đồ thị toán học: Bổ đề bắt tay, Đường đi Euler, Tính chất cây, Đồ thị hai phía, Cặp ghép cực đại, Định lý Hall, Thành phần liên thông mạnh (SCC), Đồ thị phẳng và Tô màu đồ thị.",
    icon: "fa6-solid:diagram-project",
    groups: [
      {
        id: "graph-step-1",
        stepNumber: 1,
        title: "Bổ đề bắt tay, Bậc đỉnh & Đường đi Euler",
        level: "Cơ bản",
        levelBadge: "Level 1 • Cơ sở đồ thị",
        description: "Bổ đề bắt tay ∑ deg(v) = 2E, bậc chẵn lẻ, chu trình Euler và đường đi Euler (thuật toán Hierholzer) đi qua mỗi cạnh đúng 1 lần.",
        nodeIds: ["graph-handshake-eulerian"]
      },
      {
        id: "graph-step-2",
        stepNumber: 2,
        title: "Tính chất của cây, Cây khung & Tổ tiên chung (LCA)",
        level: "Trung cấp",
        levelBadge: "Level 2 • Cấu trúc cây",
        description: "Định nghĩa cây là đồ thị liên thông không chu trình (E = V - 1). Cây khung nhỏ nhất MST và kỹ thuật nhảy nhị phân Binary Lifting tìm LCA trong O(log N).",
        nodeIds: ["graph-tree-properties-lca"]
      },
      {
        id: "graph-step-3",
        stepNumber: 3,
        title: "Đồ thị hai phía, Cặp ghép & Định lý Hall",
        level: "Nâng cao",
        levelBadge: "Level 3 • Cặp ghép tối ưu",
        description: "Kiểm tra đồ thị hai phía (không có chu trình độ dài lẻ). Thuật toán tìm cặp ghép cực đại (Kuhn Algorithm) và Định lý hôn nhân Hall chứng minh sự tồn tại cặp ghép hoàn hảo.",
        nodeIds: ["graph-bipartite-matching-hall"]
      },
      {
        id: "graph-step-4",
        stepNumber: 4,
        title: "SCC, Tô-pô DAG, Đồ thị phẳng & Tô màu",
        level: "Đỉnh cao",
        levelBadge: "Level 4 • Đỉnh cao cấu trúc",
        description: "Thành phần liên thông mạnh (Tarjan / Kosaraju), thứ tự Tô-pô trên DAG, công thức Euler đồ thị phẳng V - E + F = 2 và bài toán tô màu đồ thị (Graph Coloring).",
        nodeIds: ["graph-scc-planar-coloring"]
      }
    ],
    nodes: [
      {
        id: "graph-handshake-eulerian",
        title: "Bổ Đề Bắt Tay & Đường Đi Euler (Eulerian Paths)",
        vietnameseTitle: "Handshake Lemma, Đồ thị Euler & Thuật toán Hierholzer",
        description: "Bổ đề bắt tay: Tổng bậc của tất cả các đỉnh bằng 2 lần số cạnh ∑ deg(v) = 2E. Suy ra số đỉnh bậc lẻ luôn là số chẵn. Điều kiện tồn tại chu trình Euler (mọi đỉnh có bậc chẵn) và đường đi Euler.",
        status: "completed",
        difficulty: "Cơ bản",
        prerequisites: ["Khái niệm đồ thị cơ bản"],
        keyTheorems: [
          "Bổ đề bắt tay: ∑_{v ∈ V} deg(v) = 2E",
          "Số đỉnh bậc lẻ trong bất kỳ đồ thị vô hướng nào luôn là một số chẵn",
          "Chu trình Euler tồn tại <=> đồ thị liên thông và mọi đỉnh đều có bậc chẵn",
          "Đường đi Euler tồn tại <=> liên thông và có đúng 0 hoặc 2 đỉnh bậc lẻ"
        ],
        latexFormula: "\\sum_{v \\in V} \\deg(v) = 2|E|",
        applications: ["Vẽ hình một nét không nhấc bút", "Tái tạo chuỗi gen De Bruijn", "Tối ưu hóa đường đi của xe quét rác"],
        practiceProblems: [
          { title: "CSES 1691: Mail Delivery", judge: "CSES", url: "https://cses.fi/problemset/task/1691", difficulty: "Medium" },
          { title: "CSES 1693: Teleporters Path", judge: "CSES", url: "https://cses.fi/problemset/task/1693", difficulty: "Medium" }
        ],
        blogSlug: "2025-06-08-graph-traversal-bfs-dfs"
      },
      {
        id: "graph-tree-properties-lca",
        title: "Tính Chất Của Cây & Tổ Tiên Chung Gần Nhất (LCA)",
        vietnameseTitle: "Tree Properties & Binary Lifting Lowest Common Ancestor",
        description: "Đồ thị liên thông không chu trình gồm V đỉnh có đúng V - 1 cạnh. Bất kỳ 2 đỉnh nào cũng có đúng một đường đi đơn duy nhất. Kỹ thuật nhảy nhị phân Binary Lifting tìm LCA(u, v) và tính khoảng cách trên cây trong O(log V).",
        status: "completed",
        difficulty: "Trung cấp",
        prerequisites: ["BFS / DFS trên cây"],
        keyTheorems: [
          "Một đồ thị liên thông V đỉnh là cây <=> có đúng V - 1 cạnh",
          "Thêm một cạnh bất kỳ vào cây tạo ra đúng một chu trình đơn duy nhất",
          "Khoảng cách trên cây: dist(u, v) = depth[u] + depth[v] - 2 * depth[LCA(u, v)]"
        ],
        latexFormula: "|E| = |V| - 1, \\quad \\text{dist}(u, v) = \\text{depth}[u] + \\text{depth}[v] - 2 \\cdot \\text{depth}[\\text{LCA}(u, v)]",
        applications: ["Truy vấn đường đi trên cây", "Cây khung nhỏ nhất Kruskal/Prim", "Hệ thống mạng cáp viễn thông"],
        practiceProblems: [
          { title: "CSES 1687: Company Queries I", judge: "CSES", url: "https://cses.fi/problemset/task/1687", difficulty: "Easy" },
          { title: "CSES 1688: Company Queries II", judge: "CSES", url: "https://cses.fi/problemset/task/1688", difficulty: "Medium" }
        ],
        blogSlug: "2025-07-28-lowest-common-ancestor-binary-lifting"
      },
      {
        id: "graph-bipartite-matching-hall",
        title: "Đồ Thị Hai Phía, Cặp Ghép Cực Đại & Định Lý Hôn Nhân Hall",
        vietnameseTitle: "Bipartite Graphs, Maximum Matching & Hall's Marriage Theorem",
        description: "Đồ thị hai phía là đồ thị tô được bằng 2 màu (không có chu trình độ dài lẻ). Cặp ghép cực đại tìm bằng thuật toán Kuhn (Augmenting Paths) trong O(V * E). Định lý Hall: Điều kiện cần và đủ để tồn tại cặp ghép phủ toàn bộ tập X là |N(S)| >= |S| với mọi S con của X.",
        status: "in_progress",
        difficulty: "Nâng cao",
        prerequisites: ["BFS / DFS"],
        keyTheorems: [
          "Đồ thị là hai phía khi và chỉ khi không chứa bất kỳ chu trình độ dài lẻ nào",
          "Định lý König: Trong đồ thị hai phía, kích thước cặp ghép cực đại bằng kích thước phủ đỉnh cực tiểu",
          "Định lý hôn nhân Hall: Tồn tại cặp ghép hoàn hảo phủ X <=> với mọi S ⊆ X ta có |N(S)| >= |S|"
        ],
        latexFormula: "|N(S)| \\ge |S| \\quad (\\forall S \\subseteq X) \\iff \\text{Tồn tại cặp ghép bão hòa } X",
        applications: ["Phân công công việc tối ưu (Job Assignment)", "Ghép đôi học sinh vào trường", "Định lý Dilworth về chuỗi và phản xích"],
        practiceProblems: [
          { title: "CSES 1696: School Dance", judge: "CSES", url: "https://cses.fi/problemset/task/1696", difficulty: "Medium" },
          { title: "Codeforces 1009F: Dominant Indices", judge: "Codeforces", url: "https://codeforces.com/problemset/problem/1009/F", difficulty: "Hard" }
        ],
        blogSlug: null
      },
      {
        id: "graph-scc-planar-coloring",
        title: "SCC, Thứ Tự Tô-pô, Đồ Thị Phẳng & Tô Màu Đồ Thị",
        vietnameseTitle: "Strongly Connected Components, Planar Graphs & Four Color Theorem",
        description: "Thành phần liên thông mạnh (SCC) nén đồ thị có hướng thành DAG (thuật toán Tarjan / Kosaraju). Sắp xếp Tô-pô. Công thức Euler đồ thị phẳng V - E + F = 2. Định lý 4 màu và sắc số đồ thị.",
        status: "completed",
        difficulty: "Đỉnh cao",
        prerequisites: ["DFS", "Đồ thị có hướng"],
        keyTheorems: [
          "Định lý Kosaraju / Tarjan: Tìm toàn bộ SCC trong O(V + E)",
          "Công thức Euler đồ thị phẳng liên thông: V - E + F = 2",
          "Đồ thị phẳng đơn không chứa K5 và K3,3 (Định lý Kuratowski), có số cạnh E <= 3V - 6",
          "Định lý 4 màu: Mọi đồ thị phẳng đều có thể tô bằng tối đa 4 màu sao cho 2 đỉnh kề nhau khác màu"
        ],
        latexFormula: "V - E + F = 2, \\quad E \\le 3V - 6, \\quad \\chi(G) \\le 4 \\quad (\\text{đồ thị phẳng})",
        applications: ["Giải bài toán 2-SAT", "Vẽ mạch in không chéo dây", "Quy hoạch phân bổ tần số sóng di động"],
        practiceProblems: [
          { title: "CSES 1686: Coin Collector", judge: "CSES", url: "https://cses.fi/problemset/task/1686", difficulty: "Hard" },
          { title: "CSES 1684: Giant Pizza (2-SAT)", judge: "CSES", url: "https://cses.fi/problemset/task/1684", difficulty: "Hard" }
        ],
        blogSlug: "2025-07-04-topological-sort-dag"
      }
    ]
  },

  // ==========================================
  // PILLAR 9: ADVANCED MATHEMATICS
  // ==========================================
  {
    id: 9,
    name: "9. Toán Cao Cấp & Cấu Trúc Rời Rạc",
    subtitle: "Advanced Mathematics & Abstract Structures",
    description: "Vươn tới đỉnh cao tư duy toán học: Đại số trừu tượng (Nhóm, Vành, Trường), Cơ sở XOR tuyến tính, Tổ hợp Modulo nâng cao (Định lý Lucas), Lý thuyết Matroid, Trò chơi Sprague-Grundy, Lý thuyết Ramsey và Phân tích tiệm cận.",
    icon: "fa6-solid:brain",
    groups: [
      {
        id: "adv-step-1",
        stepNumber: 1,
        title: "Đại số trừu tượng & Cơ sở tuyến tính XOR",
        level: "Nâng cao",
        levelBadge: "Level 1 • Cấu trúc đại số",
        description: "Khái niệm Nhóm (Group), Vành (Ring), Trường (Field). Không gian vector trên trường Z2 và thuật toán dựng cơ sở XOR Basis tìm tập con có XOR lớn nhất trong O(N log C).",
        nodeIds: ["adv-abstract-algebra-xor"]
      },
      {
        id: "adv-step-2",
        stepNumber: 2,
        title: "Tổ hợp Modulo nâng cao & Định lý Lucas",
        level: "Nâng cao",
        levelBadge: "Level 2 • Tổ hợp số học",
        description: "Tính C(n, k) mod p khi n, k lên tới 10^18 bằng Định lý Lucas biểu diễn theo hệ cơ số p. Mở rộng định lý Kummer về số mũ nguyên tố của hệ số nhị thức.",
        nodeIds: ["adv-lucas-modular-combinatorics"]
      },
      {
        id: "adv-step-3",
        stepNumber: 3,
        title: "Lý thuyết Matroid & Thuật toán Tham lam",
        level: "Đỉnh cao",
        levelBadge: "Level 3 • Bản chất của Tham lam",
        description: "Lý thuyết Matroid giải thích vì sao thuật toán Tham lam (Greedy) như Kruskal lại đưa ra nghiệm tối ưu toàn cục. Thuật toán giao Matroid (Matroid Intersection).",
        nodeIds: ["adv-matroids-greedy"]
      },
      {
        id: "adv-step-4",
        stepNumber: 4,
        title: "Lý thuyết Trò chơi Nim & Định lý Sprague-Grundy",
        level: "Đỉnh cao",
        levelBadge: "Level 4 • Đỉnh cao Game Theory",
        description: "Trò chơi Nim và phép cộng Nim-sum (XOR). Định lý Sprague-Grundy biến mọi trò chơi không thiên vị (Impartial Games) thành trò chơi Nim thông qua hàm mex.",
        nodeIds: ["adv-sprague-grundy-games"]
      }
    ],
    nodes: [
      {
        id: "adv-abstract-algebra-xor",
        title: "Đại Số Trừu Tượng & Không Gian Vector XOR Basis",
        vietnameseTitle: "Groups, Rings, Fields & Linear Basis trên trường F2",
        description: "Nhóm (tính kết hợp, phần tử đơn vị, phần tử nghịch đảo). Không gian vector nhị phân Z2^B. Thuật toán dựng cơ sở tuyến tính XOR Basis giải bài toán tìm tập con có tổng XOR lớn nhất hoặc kiểm tra xem một số có tạo được từ tập con hay không.",
        status: "completed",
        difficulty: "Nâng cao",
        prerequisites: ["Phép toán XOR", "Khử Gauss"],
        keyTheorems: [
          "Cơ sở XOR gồm tối đa B phần tử (B = 60 cho số 64-bit)",
          "Mọi giá trị XOR có thể tạo thành từ tập hợp đều biểu diễn duy nhất qua cơ sở",
          "Số lượng giá trị XOR phân biệt có thể tạo thành là 2^(kích thước cơ sở)"
        ],
        latexFormula: "\\text{span}(\\mathcal{B}) = \\left\\{ \\bigoplus_{b \\in S} b \\;\\middle|\\; S \\subseteq \\mathcal{B} \\right\\}, \\quad |\\mathcal{B}| \\le 60",
        applications: ["Tìm tập con có XOR lớn nhất trong O(N log MAX)", "Đếm số tập con có XOR = 0", "Tìm cây khung nhỏ nhất XOR (XOR-MST)"],
        practiceProblems: [
          { title: "Codeforces 1101G: (Zero XOR Subset)-less", judge: "Codeforces", url: "https://codeforces.com/problemset/problem/1101/G", difficulty: "Hard" },
          { title: "Codeforces 888G: Xor-MST", judge: "Codeforces", url: "https://codeforces.com/problemset/problem/888/G", difficulty: "Hard" }
        ],
        blogSlug: "2026-06-20-gaussian-elimination-linear-systems"
      },
      {
        id: "adv-lucas-modular-combinatorics",
        title: "Định Lý Lucas & Tổ Hợp Modulo Nâng Cao",
        vietnameseTitle: "Lucas Theorem for C(n, k) mod p with N, K up to 10^18",
        description: "Khi n, k lên tới 10^18 mà modulo p là số nguyên tố nhỏ (p <= 10^5), mảng giai thừa bị tràn. Định lý Lucas phân tích n và k trong hệ cơ số p để tính tổ hợp trong O(p + log_p n).",
        status: "completed",
        difficulty: "Nâng cao",
        prerequisites: ["Tổ hợp C(n, k)", "Hệ cơ số"],
        keyTheorems: [
          "Định lý Lucas: C(n, k) ≡ ∏ C(n_i, k_i) (mod p) với n_i, k_i là các chữ số trong hệ cơ số p",
          "Quy ước: C(a, b) = 0 nếu a < b (Nếu có chữ số n_i < k_i thì C(n, k) chia hết cho p)",
          "Định lý Kummer: Số mũ của p trong C(n, k) bằng số lần nhớ khi cộng k và n - k trong hệ cơ số p"
        ],
        latexFormula: "\\binom{n}{k} \\equiv \\prod_{i=0}^m \\binom{n_i}{k_i} \\pmod{p}, \\quad n = \\sum n_i p^i, \\; k = \\sum k_i p^i",
        applications: ["Tính tổ hợp với N, K khổng lồ cỡ 10^18", "Kiểm tra tính chẵn lẻ của C(n, k) bằng bitwise AND (n & k == k)"],
        practiceProblems: [
          { title: "Codeforces 568A: Primes or Palindromes", judge: "Codeforces", url: "https://codeforces.com/problemset/problem/568/A", difficulty: "Medium" },
          { title: "HackerEarth: Lucas Theorem", judge: "Codeforces", url: "https://www.hackerearth.com", difficulty: "Medium" }
        ],
        blogSlug: "2026-05-10-binomial-coefficients-combinatorics"
      },
      {
        id: "adv-matroids-greedy",
        title: "Lý Thuyết Matroid & Thuật Toán Tham Lam (Greedy)",
        vietnameseTitle: "Matroid Theory & Matroid Intersection",
        description: "Cấu trúc độc lập trừu tượng Matroid M = (E, I). Ba tiên đề độc lập. Định lý Rado-Edmonds: Thuật toán tham lam luôn tìm ra nghiệm tối ưu khi và chỉ khi tập phương án là một Matroid. Thuật toán giao Matroid.",
        status: "in_progress",
        difficulty: "Đỉnh cao",
        prerequisites: ["Đại số tuyến tính", "Lý thuyết đồ thị"],
        keyTheorems: [
          "Tiên đề di truyền: Tập con của tập độc lập là độc lập",
          "Tiên đề mở rộng: Nếu |A| < |B| thì luôn có phần tử b ∈ B \ A sao cho A ∪ {b} độc lập",
          "Định lý Rado: Thuật toán Greedy cho trọng số luôn tối ưu trên Matroid"
        ],
        latexFormula: "M = (E, \\mathcal{I}), \\quad A \\in \\mathcal{I}, \\; |A| < |B| \\implies \\exists e \\in B \\setminus A: A \\cup \\{e\\} \\in \\mathcal{I}",
        applications: ["Giải thích thuật toán Kruskal tìm cây khung nhỏ nhất", "Giao hai Matroid giải bài toán đồ thị phức tạp"],
        practiceProblems: [
          { title: "Codeforces 1284E: New Year and Castle Construction", judge: "Codeforces", url: "https://codeforces.com/problemset/problem/1284/E", difficulty: "Hard" },
          { title: "SPOJ COG: Colors on Graph", judge: "Codeforces", url: "https://www.spoj.com/problems/COG/", difficulty: "Hard" }
        ],
        blogSlug: null
      },
      {
        id: "adv-sprague-grundy-games",
        title: "Lý Thuyết Trò Chơi & Định Lý Sprague-Grundy",
        vietnameseTitle: "Game Theory, Trò chơi Nim & Hàm Grundy (mex)",
        description: "Trò chơi hai người không thiên vị, không có yếu tố ngẫu nhiên, thông tin hoàn hảo. Trò chơi bốc sỏi Nim và phép cộng Nim-sum (XOR). Định lý Sprague-Grundy: Mọi trò chơi đều tương đương một đống Nim kích thước g(u) = mex({g(v)}).",
        status: "completed",
        difficulty: "Đỉnh cao",
        prerequisites: ["Phép toán XOR", "Đồ thị có hướng"],
        keyTheorems: [
          "Trò chơi Nim: Vị trí thua (P-position) khi và chỉ khi XOR sum = s1 ⊕ s2 ⊕ ... ⊕ sk = 0",
          "Hàm mex: Giá trị nguyên không âm nhỏ nhất KHÔNG nằm trong tập hợp",
          "Định lý Sprague-Grundy: Trò chơi kết hợp nhiều trò chơi độc lập có giá trị Grundy bằng XOR sum các giá trị Grundy thành phần"
        ],
        latexFormula: "g(u) = \\text{mex}\\big(\\{g(v) \\mid u \\to v\\}\\), \\quad \\text{Nim-sum} = \\bigoplus_{i=1}^k g(u_i) = 0 \\iff \\text{Thua}",
        applications: ["Giải các bài toán bốc sỏi / di chuyển quân cờ", "Trò chơi trên đồ thị có hướng DAG", "Trò chơi chia quân cờ"],
        practiceProblems: [
          { title: "CSES 2207: Nim Game I", judge: "CSES", url: "https://cses.fi/problemset/task/2207", difficulty: "Easy" },
          { title: "CSES 2208: Nim Game II", judge: "CSES", url: "https://cses.fi/problemset/task/2208", difficulty: "Medium" }
        ],
        blogSlug: "2026-05-01-olympiad-comb-games-windmill-terence-tao"
      }
    ]
  }
];
