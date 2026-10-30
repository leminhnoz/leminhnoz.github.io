export interface MathRoadmapNode {
  id: string;
  title: string;
  vietnameseTitle: string;
  description: string;
  status: "completed" | "in_progress" | "planned";
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  prerequisites: string[];
  keyTheorems: string[];
  latexFormula: string;
  applications: string[];
  practiceProblems: {
    title: string;
    judge: "CSES" | "Project Euler" | "Codeforces" | "VNOJ";
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
    name: "Giai đoạn 1: Lý Thuyết Số & Số Học Đồng Dư",
    subtitle: "Number Theory & Modular Arithmetic",
    description: "Nền tảng bất biến của mật mã học, đại số máy tính và tư duy logic hình thức.",
    icon: "fa6-solid:infinity",
    nodes: [
      {
        id: "nt-gcd-euclid",
        title: "Thuật toán Euclid & Euclid Mở rộng",
        vietnameseTitle: "Bổ đề Bézout & Phương trình Diophantine",
        description: "Tìm ước chung lớn nhất trong thời gian O(log(min(a,b))) và tìm nghiệm nguyên x, y thỏa mãn ax + by = gcd(a, b).",
        status: "completed",
        difficulty: "Beginner",
        prerequisites: ["Phép chia có dư", "Quan hệ chia hết"],
        keyTheorems: [
          "Bổ đề Bézout: Luôn tồn tại x, y sao cho ax + by = gcd(a, b)",
          "gcd(a, b) = gcd(b, a mod b)"
        ],
        latexFormula: "a \\cdot x + b \\cdot y = \\gcd(a, b)",
        applications: ["Nghịch đảo Modulo", "Giải mã khóa RSA", "Phương trình Diophantine tuyến tính"],
        practiceProblems: [
          { title: "CSES Exponentiation II", judge: "CSES", url: "https://cses.fi/problemset/task/1712", difficulty: "Medium" },
          { title: "Project Euler 5: Smallest Multiple", judge: "Project Euler", url: "https://projecteuler.net/problem=5", difficulty: "Easy" },
          { title: "VNOJ - Extended Euclid", judge: "VNOJ", url: "https://oj.vnoi.info/", difficulty: "Easy" }
        ],
        blogSlug: "2026-04-02-extended-euclidean-algorithm"
      },
      {
        id: "nt-linear-diophantine",
        title: "Phương trình Diophantine Tuyến tính",
        vietnameseTitle: "Nghiệm nguyên tổng quát ax + by = c",
        description: "Điều kiện có nghiệm c chia hết cho gcd(a, b), tìm nghiệm nguyên nhỏ nhất và đếm số nghiệm nguyên trong một khoảng [x1, x2].",
        status: "completed",
        difficulty: "Intermediate",
        prerequisites: ["Thuật toán Euclid Mở rộng"],
        keyTheorems: [
          "ax + by = c có nghiệm nguyên khi và chỉ khi gcd(a, b) | c",
          "Nghiệm tổng quát: x = x0 + k*(b/g), y = y0 - k*(a/g)"
        ],
        latexFormula: "x = x_0 + k \\cdot \\frac{b}{g}, \\quad y = y_0 - k \\cdot \\frac{a}{g}",
        applications: ["Phân phối tài nguyên nguyên", "Bài toán quy hoạch nguyên 2 biến"],
        practiceProblems: [
          { title: "Codeforces 1244C: The Football Season", judge: "Codeforces", url: "https://codeforces.com/problemset/problem/1244/C", difficulty: "Medium" },
          { title: "Project Euler 75: Singular integer right triangles", judge: "Project Euler", url: "https://projecteuler.net/problem=75", difficulty: "Hard" }
        ],
        blogSlug: "2026-04-15-linear-diophantine-equation"
      },
      {
        id: "nt-modular-inverse-fermat",
        title: "Đồng Dư Thức, Nghịch Đảo Modulo & Định Lý Fermat",
        vietnameseTitle: "Chia trong vành Z/mZ và Định lý Euler",
        description: "Phép nhân và chia modulo số nguyên tố p, định lý Fermat nhỏ a^(p-1) = 1 (mod p) và hàm phi Euler phi(n).",
        status: "completed",
        difficulty: "Beginner",
        prerequisites: ["Euclid mở rộng"],
        keyTheorems: [
          "Fermat nhỏ: a^(p-1) ≡ 1 (mod p) với p nguyên tố và gcd(a, p) = 1",
          "Euler: a^φ(n) ≡ 1 (mod n) với gcd(a, n) = 1",
          "Nghịch đảo modulo: a^(-1) ≡ a^(p-2) (mod p)"
        ],
        latexFormula: "a^{-1} \\equiv a^{p-2} \\pmod{p}, \\quad a^{\\phi(n)} \\equiv 1 \\pmod{n}",
        applications: ["Tính tổ hợp nCr mod 10^9+7", "Mật mã RSA", "Xử lý số dư lớn"],
        practiceProblems: [
          { title: "CSES Counting Divisors", judge: "CSES", url: "https://cses.fi/problemset/task/1081", difficulty: "Easy" },
          { title: "CSES Exponentiation", judge: "CSES", url: "https://cses.fi/problemset/task/1095", difficulty: "Easy" },
          { title: "Project Euler 69: Totient maximum", judge: "Project Euler", url: "https://projecteuler.net/problem=69", difficulty: "Medium" }
        ],
        blogSlug: "2026-03-08-binary-exponentiation"
      },
      {
        id: "nt-crt-chinese-remainder",
        title: "Định Lý Thặng Dư Trung Hoa (CRT)",
        vietnameseTitle: "Hệ phương trình đồng dư bậc nhất",
        description: "Giải hệ x ≡ a_i (mod m_i) với các m_i đôi một nguyên tố cùng nhau, và mở rộng cho trường hợp không nguyên tố cùng nhau.",
        status: "completed",
        difficulty: "Intermediate",
        prerequisites: ["Nghịch đảo Modulo"],
        keyTheorems: [
          "Hệ có nghiệm duy nhất modulo M = m1 * m2 * ... * mk",
          "Công thức Garner xử lý số lớn không tràn số"
        ],
        latexFormula: "x \\equiv \\sum_{i=1}^k a_i \\cdot M_i \\cdot M_i^{-1} \\pmod{M}",
        applications: ["Phép nhân số nguyên lớn FFT", "Mật mã lượng tử & Hệ số lớn"],
        practiceProblems: [
          { title: "Project Euler 134: Prime pair connection", judge: "Project Euler", url: "https://projecteuler.net/problem=134", difficulty: "Medium" },
          { title: "Codeforces 980E", judge: "Codeforces", url: "https://codeforces.com/problemset/problem/980/E", difficulty: "Hard" }
        ],
        blogSlug: null
      },
      {
        id: "nt-primitive-roots",
        title: "Căn Nguyên Thủy & Logarithm Rời Rạc",
        vietnameseTitle: "Cấu trúc nhóm cyclic (Z/pZ)* và BSGS",
        description: "Căn nguyên thủy g sinh ra toàn bộ nhóm nhân modulo p, và giải phương trình g^x ≡ h (mod p) bằng thuật toán Baby-step Giant-step trong O(sqrt(p)).",
        status: "in_progress",
        difficulty: "Advanced",
        prerequisites: ["Định lý Euler", "Meet in the Middle"],
        keyTheorems: [
          "Bậc của phần tử: ord_m(a) | φ(m)",
          "BSGS: Phân rã x = i*m - j với m = ceil(sqrt(p))"
        ],
        latexFormula: "g^{i \\cdot m} \\equiv h \\cdot g^j \\pmod{p}",
        applications: ["Biến đổi Fourier số học (NTT)", "Mật mã Diffie-Hellman"],
        practiceProblems: [
          { title: "Codeforces 1106F: Lunar New Year and a Recursive Sequence", judge: "Codeforces", url: "https://codeforces.com/problemset/problem/1106/F", difficulty: "Hard" },
          { title: "Project Euler 429: Sum of squares of unitary divisors", judge: "Project Euler", url: "https://projecteuler.net/problem=429", difficulty: "Hard" }
        ],
        blogSlug: null
      }
    ]
  },
  {
    id: 2,
    name: "Giai đoạn 2: Đại Số Tuyến Tính & Ma Trận",
    subtitle: "Linear Algebra & Matrix Theory",
    description: "Đại số ma trận, giải hệ phương trình tuyến tính, không gian vector và cơ sở tuyến tính XOR.",
    icon: "fa6-solid:cubes-stacked",
    nodes: [
      {
        id: "la-matrix-exponentiation",
        title: "Nhân Ma Trận & Lũy Thừa Ma Trận Nhị Phân",
        vietnameseTitle: "Giải hệ thức truy hồi tuyến tính O(K^3 log N)",
        description: "Biểu diễn dãy truy hồi (Fibonacci, số đường đi độ dài N trên đồ thị) dưới dạng vector trạng thái và ma trận chuyển tiếp.",
        status: "completed",
        difficulty: "Beginner",
        prerequisites: ["Phép nhân ma trận", "Lũy thừa nhị phân"],
        keyTheorems: [
          "Tính kết hợp của phép nhân ma trận: A*(B*C) = (A*B)*C",
          "Số đường đi độ dài k giữa 2 đỉnh là phần tử của ma trận kề lũy thừa k"
        ],
        latexFormula: "\\begin{pmatrix} F_{n+1} \\\\ F_n \\end{pmatrix} = \\begin{pmatrix} 1 & 1 \\\\ 1 & 0 \\end{pmatrix}^n \\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix}",
        applications: ["Tính số Fibonacci thứ 10^18 trong 0.01s", "Đếm chuỗi thoả mãn DFA"],
        practiceProblems: [
          { title: "CSES Fibonacci Numbers", judge: "CSES", url: "https://cses.fi/problemset/task/1722", difficulty: "Easy" },
          { title: "CSES Graph Paths I", judge: "CSES", url: "https://cses.fi/problemset/task/1723", difficulty: "Medium" },
          { title: "CSES Graph Paths II", judge: "CSES", url: "https://cses.fi/problemset/task/1724", difficulty: "Hard" }
        ],
        blogSlug: "2026-04-27-fibonacci-numbers-secrets"
      },
      {
        id: "la-gaussian-elimination",
        title: "Khử Gauss & Giải Hệ Phương Trình Tuyến Tính",
        vietnameseTitle: "Đưa ma trận về dạng bậc thang trong O(N^3)",
        description: "Phép biến đổi sơ cấp trên dòng để giải hệ Ax = b: xác định hệ vô nghiệm, có nghiệm duy nhất hoặc vô số nghiệm.",
        status: "completed",
        difficulty: "Intermediate",
        prerequisites: ["Ma trận", "Định thức"],
        keyTheorems: [
          "Phép biến đổi dòng không thay đổi tập nghiệm của hệ phương trình",
          "Định lý Rouché–Capelli về điều kiện có nghiệm của hệ tuyến tính"
        ],
        latexFormula: "A \\cdot \\mathbf{x} = \\mathbf{b} \\iff U \\cdot \\mathbf{x} = \\mathbf{c}",
        applications: ["Tính xác suất chuyển đổi Markov", "Mạch điện Kirchhoff", "Cân bằng phương trình"],
        practiceProblems: [
          { title: "Codeforces 1155E: Guess the Root", judge: "Codeforces", url: "https://codeforces.com/problemset/problem/1155/E", difficulty: "Hard" },
          { title: "Project Euler 101: Optimum polynomial", judge: "Project Euler", url: "https://projecteuler.net/problem=101", difficulty: "Medium" }
        ],
        blogSlug: "2026-06-20-gaussian-elimination-linear-systems"
      },
      {
        id: "la-determinant-crout",
        title: "Định Thức Ma Trận & Phân Tích Crout LU",
        vietnameseTitle: "Tính det(A) trong O(N^3) bằng phép khử & LU",
        description: "Tính định thức ma trận thông qua ma trận tam giác: det(A) = det(L)*det(U) và phương pháp Crout giải không đảo dấu.",
        status: "completed",
        difficulty: "Intermediate",
        prerequisites: ["Khử Gauss"],
        keyTheorems: [
          "Đổi chỗ hai dòng làm đổi dấu định thức",
          "Định thức của ma trận tam giác bằng tích các phần tử trên đường chéo chính"
        ],
        latexFormula: "\\det(A) = \\prod_{i=1}^n U_{ii}",
        applications: ["Định lý Kirchhoff Matrix-Tree đếm số cây khung", "Tính thể tích khối đa diện"],
        practiceProblems: [
          { title: "Codeforces 852D: Exploring Ruins", judge: "Codeforces", url: "https://codeforces.com/problemset/problem/852/D", difficulty: "Hard" },
          { title: "Project Euler 347: Largest integer divisible by two primes", judge: "Project Euler", url: "https://projecteuler.net/problem=347", difficulty: "Medium" }
        ],
        blogSlug: "2026-07-06-matrix-determinant-gauss"
      },
      {
        id: "la-xor-basis",
        title: "Không Gian Vector F2 & Cơ Sở Tuyến Tính XOR",
        vietnameseTitle: "Linear Basis giải bài toán XOR cực trị",
        description: "Mô hình hóa phép XOR như phép cộng vector trên trường F2, duy trì tập cơ sở kích thước tối đa 60 để tìm XOR lớn nhất, nhỏ nhất, số lượng xor khác nhau.",
        status: "completed",
        difficulty: "Advanced",
        prerequisites: ["Bitmask", "Khử Gauss"],
        keyTheorems: [
          "Mọi vector đều có thể biểu diễn duy nhất qua tập cơ sở độc lập tuyến tính",
          "Kích thước cơ sở tối đa là log2(max_value) <= 60"
        ],
        latexFormula: "v = c_1 b_1 \\oplus c_2 b_2 \\oplus \\dots \\oplus c_k b_k, \\quad c_i \\in \\{0, 1\\}",
        applications: ["Tìm tập con có XOR lớn nhất", "Đếm số chu trình trong đồ thị có XOR = 0"],
        practiceProblems: [
          { title: "Codeforces 895C: Square Subsets", judge: "Codeforces", url: "https://codeforces.com/problemset/problem/895/C", difficulty: "Hard" },
          { title: "Codeforces 1285D: Dr. Evil Underscores", judge: "Codeforces", url: "https://codeforces.com/problemset/problem/1285/D", difficulty: "Medium" }
        ],
        blogSlug: "2026-07-30-matrix-rank-gaussian-elimination"
      }
    ]
  },
  {
    id: 3,
    name: "Giai đoạn 3: Đại Số Tổ Hợp & Lý Thuyết Đếm",
    subtitle: "Combinatorics & Counting Theory",
    description: "Quy tắc đếm cấu trúc, hệ số nhị thức, dãy số Catalan, Stirling, nguyên lý bù trừ và lý thuyết nhóm đối xứng Pólya.",
    icon: "fa6-solid:dice-d20",
    nodes: [
      {
        id: "cb-ncr-modulo",
        title: "Tổ Hợp & Hệ Số Nhị Thức nCr mod P",
        vietnameseTitle: "Tiền xử lý giai thừa O(N) và Định lý Lucas",
        description: "Tính số cách chọn k phần tử từ n phần tử với n lớn (lên tới 10^18 bằng định lý Lucas) modulo số nguyên tố p.",
        status: "completed",
        difficulty: "Beginner",
        prerequisites: ["Nghịch đảo Modulo"],
        keyTheorems: [
          "nCr = n! / (k! * (n-k)!)",
          "Tam giác Pascal: C(n, k) = C(n-1, k-1) + C(n-1, k)",
          "Định lý Lucas: C(n, k) ≡ ∏ C(n_i, k_i) (mod p) theo cơ số p"
        ],
        latexFormula: "\\binom{n}{k} \\equiv \\prod_{i=0}^m \\binom{n_i}{k_i} \\pmod{p}",
        applications: ["Bài toán chia kẹo Euler (Stars and Bars)", "Đếm đường đi trên lưới"],
        practiceProblems: [
          { title: "CSES Binomial Coefficients", judge: "CSES", url: "https://cses.fi/problemset/task/1079", difficulty: "Easy" },
          { title: "CSES Distributing Apples", judge: "CSES", url: "https://cses.fi/problemset/task/1715", difficulty: "Easy" },
          { title: "Project Euler 15: Lattice Paths", judge: "Project Euler", url: "https://projecteuler.net/problem=15", difficulty: "Easy" }
        ],
        blogSlug: "2026-05-10-binomial-coefficients-combinatorics"
      },
      {
        id: "cb-catalan-numbers",
        title: "Dãy Số Catalan & Biểu Thức Ngoặc Hợp Lệ",
        vietnameseTitle: "C_n = (1/(n+1)) * C(2n, n)",
        description: "Đếm số cách đặt ngoặc hợp lệ, số cây nhị phân có n đỉnh, tam giác hóa đa giác n+2 cạnh và đường đi Dyck không vượt đường chéo.",
        status: "completed",
        difficulty: "Intermediate",
        prerequisites: ["Hệ số nhị thức"],
        keyTheorems: [
          "Công thức phản xạ André: C_n = C(2n, n) - C(2n, n+1)",
          "Hệ thức truy hồi: C_n = ∑ C_i * C_{n-1-i}"
        ],
        latexFormula: "C_n = \\frac{1}{n+1} \\binom{2n}{n} = \\binom{2n}{n} - \\binom{2n}{n+1}",
        applications: ["Cấu trúc cây cú pháp", "Biểu thức số học hợp lệ", "Đếm đường đi phẳng"],
        practiceProblems: [
          { title: "CSES Bracket Sequences I", judge: "CSES", url: "https://cses.fi/problemset/task/2064", difficulty: "Medium" },
          { title: "Project Euler 116: Red, green or blue tiles", judge: "Project Euler", url: "https://projecteuler.net/problem=116", difficulty: "Medium" }
        ],
        blogSlug: "2026-05-22-catalan-numbers-combinatorics"
      },
      {
        id: "cb-pie-inclusion-exclusion",
        title: "Nguyên Lý Bù Trừ (Inclusion-Exclusion Principle)",
        vietnameseTitle: "Đếm phần bù và bài toán xáo trộn hoàn toàn",
        description: "Tính lực lượng của hợp các tập hợp thông qua các giao điểm, giải bài toán Derangements (xáo trộn không cố định vị trí).",
        status: "in_progress",
        difficulty: "Intermediate",
        prerequisites: ["Tổ hợp"],
        keyTheorems: [
          "|∪ A_i| = ∑ |A_i| - ∑ |A_i ∩ A_j| + ∑ |A_i ∩ A_j ∩ A_k| - ...",
          "Số xáo trộn hoàn toàn: D_n = n! * ∑ (-1)^k / k!"
        ],
        latexFormula: "\\left| \\bigcup_{i=1}^n A_i \\right| = \\sum_{k=1}^n (-1)^{k-1} \\sum_{1 \\le i_1 < \\dots < i_k \\le n} |A_{i_1} \\cap \\dots \\cap A_{i_k}|",
        applications: ["Đếm số nguyên tố cùng nhau với N", "Đếm chu trình Euler", "Xác suất"],
        practiceProblems: [
          { title: "CSES Prime Multiples", judge: "CSES", url: "https://cses.fi/problemset/task/2185", difficulty: "Medium" },
          { title: "Codeforces 1342E: Placing Rooks", judge: "Codeforces", url: "https://codeforces.com/problemset/problem/1342/E", difficulty: "Hard" }
        ],
        blogSlug: null
      },
      {
        id: "cb-burnside-polya",
        title: "Bổ Đề Burnside & Định Lý Đếm Pólya",
        vietnameseTitle: "Đếm cấu trúc tô màu bất biến dưới phép quay và phản xạ",
        description: "Đếm số cách tô màu vòng cổ hạt, hình lập phương khi xoay hoặc lật được xem là giống nhau, sử dụng trung bình số điểm bất động.",
        status: "in_progress",
        difficulty: "Expert",
        prerequisites: ["Lý thuyết nhóm đối xứng", "GCD"],
        keyTheorems: [
          "Bổ đề Burnside: Số quỹ đạo bằng trung bình cộng số điểm bất động qua các phép biến hình trong nhóm G",
          "Định lý đếm Pólya dùng đa thức chỉ số chu trình Z(G)"
        ],
        latexFormula: "|X / G| = \\frac{1}{|G|} \\sum_{g \\in G} |X^g|",
        applications: ["Hóa học phân tử đồng phân", "Thiết kế vi mạch", "Bài toán tô màu đồ thị"],
        practiceProblems: [
          { title: "CSES Counting Necklaces", judge: "CSES", url: "https://cses.fi/problemset/task/2209", difficulty: "Hard" },
          { title: "Project Euler 282: The Ackermann function", judge: "Project Euler", url: "https://projecteuler.net/problem=282", difficulty: "Expert" }
        ],
        blogSlug: null
      }
    ]
  },
  {
    id: 4,
    name: "Giai đoạn 4: Hình Học Tính Toán & Đại Số Vector",
    subtitle: "Computational Geometry & Vector Analysis",
    description: "Tích có hướng 2D/3D, bao lồi đa giác, quét đoạn thẳng, phân hoạch không gian và diện tích đa giác.",
    icon: "fa6-solid:shapes",
    nodes: [
      {
        id: "geo-cross-product-ccw",
        title: "Tích Có Hướng & Kiểm Tra Rẽ Trái/Phải (CCW)",
        vietnameseTitle: "Bản chất đại số vector trong hình học 2D",
        description: "Sử dụng định thức ma trận 2x2 để xác định điểm C nằm bên trái, bên phải hay thẳng hàng với tia AB mà không dùng hàm lượng giác thực.",
        status: "completed",
        difficulty: "Beginner",
        prerequisites: ["Vector 2D", "Định thức"],
        keyTheorems: [
          "Cross product > 0: Rẽ trái (Counter-Clockwise)",
          "Cross product < 0: Rẽ phải (Clockwise)",
          "Cross product = 0: Thẳng hàng (Collinear)"
        ],
        latexFormula: "\\vec{u} \\times \\vec{v} = x_u \\cdot y_v - x_v \\cdot y_u",
        applications: ["Kiểm tra giao điểm hai đoạn thẳng", "Xác định hướng quay"],
        practiceProblems: [
          { title: "CSES Point Location Test", judge: "CSES", url: "https://cses.fi/problemset/task/2189", difficulty: "Easy" },
          { title: "CSES Line Segment Intersection", judge: "CSES", url: "https://cses.fi/problemset/task/2190", difficulty: "Medium" }
        ],
        blogSlug: "2026-07-20-computational-geometry-convex-hull"
      },
      {
        id: "geo-polygon-shoelace-pick",
        title: "Diện Tích Đa Giác & Định Lý Pick",
        vietnameseTitle: "Công thức Shoelace (Dây giày Gauss)",
        description: "Tính diện tích đa giác đơn bất kỳ từ tọa độ các đỉnh và liên hệ diện tích với số điểm nguyên bên trong và trên biên: S = I + B/2 - 1.",
        status: "completed",
        difficulty: "Intermediate",
        prerequisites: ["Tích có hướng", "GCD"],
        keyTheorems: [
          "Công thức Shoelace: S = 1/2 * |∑ (x_i * y_{i+1} - x_{i+1} * y_i)|",
          "Định lý Pick: Diện tích S = I + B/2 - 1 với I là điểm trong, B là điểm biên"
        ],
        latexFormula: "S = I + \\frac{B}{2} - 1, \\quad B = \\sum_{i=1}^n \\gcd(|x_{i+1} - x_i|, |y_{i+1} - y_i|)",
        applications: ["Đồ họa vector", "Địa tin học GIS", "Bài toán đếm điểm lưới"],
        practiceProblems: [
          { title: "CSES Polygon Area", judge: "CSES", url: "https://cses.fi/problemset/task/2191", difficulty: "Easy" },
          { title: "CSES Point in Polygon", judge: "CSES", url: "https://cses.fi/problemset/task/2192", difficulty: "Medium" },
          { title: "CSES Polygon Lattice Points", judge: "CSES", url: "https://cses.fi/problemset/task/2193", difficulty: "Hard" }
        ],
        blogSlug: "2026-07-20-computational-geometry-convex-hull"
      },
      {
        id: "geo-convex-hull",
        title: "Bao Lồi Đa Giác (Convex Hull)",
        vietnameseTitle: "Thuật toán Graham Scan & Andrew's Monotone Chain",
        description: "Tìm đa giác lồi nhỏ nhất bao phủ toàn bộ tập N điểm trong O(N log N) bằng cách sắp xếp và duy trì stack với kiểm tra CCW.",
        status: "completed",
        difficulty: "Intermediate",
        prerequisites: ["Kiểm tra CCW", "Sắp xếp"],
        keyTheorems: [
          "Mọi điểm trên bao lồi đều tạo thành chuỗi rẽ trái liên tục",
          "Bao lồi có chu vi và diện tích nhỏ nhất chứa toàn bộ tập điểm"
        ],
        latexFormula: "\\text{CCW}(P_{i-1}, P_i, P_{i+1}) > 0",
        applications: ["Nhận diện cụm điểm", "Tối ưu hóa bao lồi trong DP (Convex Hull Trick)", "Quy hoạch không gian"],
        practiceProblems: [
          { title: "CSES Convex Hull", judge: "CSES", url: "https://cses.fi/problemset/task/2195", difficulty: "Medium" },
          { title: "Project Euler 504: Square on the Inside", judge: "Project Euler", url: "https://projecteuler.net/problem=504", difficulty: "Hard" }
        ],
        blogSlug: "2026-07-20-computational-geometry-convex-hull"
      }
    ]
  },
  {
    id: 5,
    name: "Giai đoạn 5: Giải Tích Số & Tối Ưu Hóa",
    subtitle: "Calculus, Numerical Methods & Optimization",
    description: "Khai triển Taylor, xấp xỉ nghiệm Newton-Raphson, tích phân số Simpson, Gradient Descent và Tôi luyện kim loại.",
    icon: "fa6-solid:chart-line",
    nodes: [
      {
        id: "calc-newton-raphson",
        title: "Phương Pháp Newton-Raphson & Chia Đôi",
        vietnameseTitle: "Tìm nghiệm phương trình phi tuyến tính",
        description: "Xấp xỉ nghiệm của phương trình f(x) = 0 bằng cách đi theo tiếp tuyến x_{n+1} = x_n - f(x_n)/f'(x_n) với tốc độ hội tụ bậc hai.",
        status: "in_progress",
        difficulty: "Intermediate",
        prerequisites: ["Đạo hàm hàm số"],
        keyTheorems: [
          "Tốc độ hội tụ quadratic: Sai số e_{n+1} ≈ C * e_n^2",
          "Định lý giá trị trung gian Bolzano"
        ],
        latexFormula: "x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}",
        applications: ["Tính căn bậc hai nhanh (Fast InvSqrt)", "Tìm điểm cân bằng vật lý"],
        practiceProblems: [
          { title: "Codeforces 1033D: Divisors", judge: "Codeforces", url: "https://codeforces.com/problemset/problem/1033/D", difficulty: "Hard" },
          { title: "Project Euler 107: Minimal network", judge: "Project Euler", url: "https://projecteuler.net/problem=107", difficulty: "Medium" }
        ],
        blogSlug: null
      },
      {
        id: "calc-simpson-integration",
        title: "Tích Phân Số Bằng Công Thức Simpson",
        vietnameseTitle: "Xấp xỉ diện tích dưới đường cong bằng parabol",
        description: "Tính tích phân xác định ∫_a^b f(x) dx khi không có nguyên hàm sơ cấp bằng cách chia lưới và nội suy parabol.",
        status: "in_progress",
        difficulty: "Intermediate",
        prerequisites: ["Tích phân xác định"],
        keyTheorems: [
          "Công thức Simpson 1/3: Sai số tỉ lệ thuận với O(h^4 * f^{(4)}(ξ))"
        ],
        latexFormula: "\\int_a^b f(x)\\,dx \\approx \\frac{h}{3} \\left( f(a) + 4 \\sum f(x_{2i-1}) + 2 \\sum f(x_{2i}) + f(b) \\right)",
        applications: ["Tính xác suất trong phân phối chuẩn Gaussian", "Động lực học chất lưu"],
        practiceProblems: [
          { title: "Project Euler 301: Nim", judge: "Project Euler", url: "https://projecteuler.net/problem=301", difficulty: "Easy" }
        ],
        blogSlug: null
      },
      {
        id: "calc-simulated-annealing",
        title: "Tôi Luyện Kim Loại (Simulated Annealing)",
        vietnameseTitle: "Thuật toán Heuristic tối ưu hóa phi lồi",
        description: "Mô phỏng quá trình nhiệt luyện kim loại để thoát khỏi cực tiểu địa phương: luôn nhận bước đi tốt hơn và chấp nhận bước đi tệ hơn với xác suất P = exp(-ΔE / T).",
        status: "completed",
        difficulty: "Advanced",
        prerequisites: ["Xác suất", "Heuristics"],
        keyTheorems: [
          "Phân bố Boltzmann: P(chấp nhận) = exp(-ΔE / T)",
          "Nhiệt độ T giảm dần theo quy luật T = T * alpha"
        ],
        latexFormula: "P(\\Delta E, T) = \\exp\\left(-\\frac{\\Delta E}{T}\\right)",
        applications: ["Bài toán người đưa thư TSP", "Xếp lịch thi đấu", "Tìm tâm tối ưu của tập điểm"],
        practiceProblems: [
          { title: "Codeforces 1556H: DIY Tree", judge: "Codeforces", url: "https://codeforces.com/problemset/problem/1556/H", difficulty: "Expert" }
        ],
        blogSlug: "2026-06-25-simulated-annealing-heuristics"
      }
    ]
  },
  {
    id: 6,
    name: "Giai đoạn 6: Xác Suất, Kỳ Vọng & Lý Thuyết Trò Chơi",
    subtitle: "Probability, Random Variables & Game Theory",
    description: "Tính tuyến tính của kỳ vọng toán, xác suất Markov, trò chơi tổ hợp vô hướng và định lý Sprague-Grundy.",
    icon: "fa6-solid:chess-knight",
    nodes: [
      {
        id: "prob-expectation-linearity",
        title: "Kỳ Vọng Toán Học & Tính Tuyến Tính",
        vietnameseTitle: "E[X + Y] = E[X] + E[Y] không phụ thuộc tính độc lập",
        description: "Sức mạnh tối thượng của tính tuyến tính: giải bài toán đếm kỳ vọng bằng cách phân rã biến ngẫu nhiên phức tạp thành tổng các biến chỉ thị (Indicator Variables).",
        status: "completed",
        difficulty: "Intermediate",
        prerequisites: ["Xác suất cơ bản"],
        keyTheorems: [
          "Linearity of Expectation: E[c1*X + c2*Y] = c1*E[X] + c2*E[Y] ngay cả khi X, Y phụ thuộc",
          "Kỳ vọng biến chỉ thị: E[I_A] = P(A)"
        ],
        latexFormula: "\\mathbb{E}\\left[ \\sum_{i=1}^n X_i \\right] = \\sum_{i=1}^n \\mathbb{E}[X_i]",
        applications: ["Phân tích thuật toán ngẫu nhiên (Quicksort, Hash)", "Bài toán Coupon Collector"],
        practiceProblems: [
          { title: "CSES Dice Probability", judge: "CSES", url: "https://cses.fi/problemset/task/1725", difficulty: "Medium" },
          { title: "CSES Inversion Probability", judge: "CSES", url: "https://cses.fi/problemset/task/1726", difficulty: "Hard" }
        ],
        blogSlug: null
      },
      {
        id: "game-sprague-grundy",
        title: "Lý Thuyết Trò Chơi Nim & Định Lý Sprague-Grundy",
        vietnameseTitle: "Tổng XOR của các trạng thái trò chơi vô hướng",
        description: "Mọi trạng thái trong trò chơi tổ hợp không hoàn hảo 2 người chơi (Impartial Game) đều tương đương với một đống Nim có kích thước bằng hàm Grundy mex.",
        status: "in_progress",
        difficulty: "Advanced",
        prerequisites: ["XOR", "DAG"],
        keyTheorems: [
          "Trò chơi Nim: Người chơi thứ nhất thắng khi và chỉ khi XOR_sum > 0",
          "Hàm Grundy: g(v) = mex({ g(u) | u là trạng thái tiếp theo từ v })"
        ],
        latexFormula: "g(v) = \\text{mex}\\{ g(u) \\mid v \\to u \\}, \\quad g(A + B) = g(A) \\oplus g(B)",
        applications: ["Giải mọi trò chơi tổ hợp đối kháng 2 người", "Quy hoạch động trên đồ thị trò chơi"],
        practiceProblems: [
          { title: "CSES Stick Game", judge: "CSES", url: "https://cses.fi/problemset/task/1729", difficulty: "Easy" },
          { title: "CSES Nim Game I", judge: "CSES", url: "https://cses.fi/problemset/task/1730", difficulty: "Easy" },
          { title: "CSES Grundy's Game", judge: "CSES", url: "https://cses.fi/problemset/task/2207", difficulty: "Medium" }
        ],
        blogSlug: null
      }
    ]
  }
];
