export interface MathProblem {
  id: string;
  code: string;
  title: string;
  category: string;
  source: "Project Euler" | "CSES" | "Codeforces" | "VNOJ";
  url: string;
  difficulty: "Easy" | "Medium" | "Hard" | "Master";
  theorems: string[];
  latexDescription: string;
}

export const mathCategories = [
  "Tất cả",
  "Lý thuyết số (Number Theory)",
  "Đại số tuyến tính & Ma trận (Linear Algebra)",
  "Đại số tổ hợp (Combinatorics)",
  "Hình học tính toán (Geometry)",
  "Xác suất & Kỳ vọng (Probability)",
  "Lý thuyết trò chơi (Game Theory)"
];

export const mathProblems: MathProblem[] = [
  // --- Category: Number Theory ---
  {
    id: "mp-1",
    code: "PE 1",
    title: "Multiples of 3 or 5",
    category: "Lý thuyết số (Number Theory)",
    source: "Project Euler",
    url: "https://projecteuler.net/problem=1",
    difficulty: "Easy",
    theorems: ["Cấp số cộng", "Nguyên lý bù trừ (PIE)"],
    latexDescription: "Tính tổng tất cả các bội số của 3 hoặc 5 nhỏ hơn N trong $O(1)$ dùng công thức cấp số cộng Gauss: $S(n) = \\frac{n(n+1)}{2}$."
  },
  {
    id: "mp-2",
    code: "CSES 1095",
    title: "Exponentiation",
    category: "Lý thuyết số (Number Theory)",
    source: "CSES",
    url: "https://cses.fi/problemset/task/1095",
    difficulty: "Easy",
    theorems: ["Lũy thừa nhị phân", "Modulo Arithmetic"],
    latexDescription: "Tính $a^b \\pmod{10^9+7}$ trong $O(\\log b)$ với $a, b \\le 10^9$."
  },
  {
    id: "mp-3",
    code: "CSES 1712",
    title: "Exponentiation II",
    category: "Lý thuyết số (Number Theory)",
    source: "CSES",
    url: "https://cses.fi/problemset/task/1712",
    difficulty: "Medium",
    theorems: ["Định lý Fermat nhỏ", "Số mũ lồng"],
    latexDescription: "Tính $a^{b^c} \\pmod{10^9+7}$ bằng cách áp dụng Fermat nhỏ: tính số mũ $E = b^c \\pmod{10^9+6}$ rồi tính $a^E \\pmod{10^9+7}$."
  },
  {
    id: "mp-4",
    code: "CSES 1081",
    title: "Counting Divisors",
    category: "Lý thuyết số (Number Theory)",
    source: "CSES",
    url: "https://cses.fi/problemset/task/1081",
    difficulty: "Easy",
    theorems: ["Phân tích thừa số nguyên tố", "Sàng Eratosthenes"],
    latexDescription: "Đếm số ước nguyên dương $d(n) = \\prod (e_i + 1)$ cho nhiều truy vấn trong $O(\\log n)$ bằng tiền xử lý ước nguyên tố nhỏ nhất (min_prime sieve)."
  },
  {
    id: "mp-5",
    code: "CSES 1082",
    title: "Common Divisors",
    category: "Lý thuyết số (Number Theory)",
    source: "CSES",
    url: "https://cses.fi/problemset/task/1082",
    difficulty: "Medium",
    theorems: ["Ước chung lớn nhất", "Đếm tần số bội"],
    latexDescription: "Tìm ước chung lớn nhất lớn nhất của hai số bất kỳ trong mảng $n \\le 2 \\cdot 10^5$ số bằng cách duyệt ngược từ giá trị cực đại."
  },
  {
    id: "mp-6",
    code: "CSES 2182",
    title: "Divisor Analysis",
    category: "Lý thuyết số (Number Theory)",
    source: "CSES",
    url: "https://cses.fi/problemset/task/2182",
    difficulty: "Hard",
    theorems: ["Hàm nhân tính", "Cấp số nhân Modulo", "Fermat nhỏ"],
    latexDescription: "Tính đồng thời: số lượng ước, tổng các ước và tích các ước của một số cực lớn $n = \\prod p_i^{k_i}$ modulo $10^9+7$."
  },
  {
    id: "mp-7",
    code: "PE 69",
    title: "Totient Maximum",
    category: "Lý thuyết số (Number Theory)",
    source: "Project Euler",
    url: "https://projecteuler.net/problem=69",
    difficulty: "Medium",
    theorems: ["Hàm Phi Euler $\\phi(n)$", "Primorial"],
    latexDescription: "Tìm $n \\le 10^6$ sao cho tỉ số $n / \\phi(n) = \\prod_{p|n} \\frac{p}{p-1}$ đạt cực đại (tích các số nguyên tố liên tiếp)."
  },
  {
    id: "mp-8",
    code: "CF 1244C",
    title: "The Football Season",
    category: "Lý thuyết số (Number Theory)",
    source: "Codeforces",
    url: "https://codeforces.com/problemset/problem/1244/C",
    difficulty: "Medium",
    theorems: ["Phương trình Diophantine tuyến tính", "Euclid mở rộng"],
    latexDescription: "Giải phương trình $w \\cdot x + d \\cdot y = p$ với ràng buộc $x + y + z = n$ và $x, y, z \\ge 0$ trong $O(d)$ hoặc $O(\\log d)$."
  },
  {
    id: "mp-9",
    code: "PE 75",
    title: "Singular Integer Right Triangles",
    category: "Lý thuyết số (Number Theory)",
    source: "Project Euler",
    url: "https://projecteuler.net/problem=75",
    difficulty: "Hard",
    theorems: ["Bộ ba số Pythagoras", "Công thức Euclid"],
    latexDescription: "Sinh các bộ ba cạnh tam giác vuông nguyên tố cùng nhau $a = m^2 - n^2, b = 2mn, c = m^2 + n^2$ với chu vi $L = 2m(m+n) \\le 1.5 \\cdot 10^6$."
  },

  // --- Category: Linear Algebra ---
  {
    id: "mp-10",
    code: "CSES 1722",
    title: "Fibonacci Numbers",
    category: "Đại số tuyến tính & Ma trận (Linear Algebra)",
    source: "CSES",
    url: "https://cses.fi/problemset/task/1722",
    difficulty: "Easy",
    theorems: ["Nhân ma trận nhị phân", "Dãy truy hồi tuyến tính"],
    latexDescription: "Tính số Fibonacci $F_n \\pmod{10^9+7}$ với $n \\le 10^{18}$ trong $O(\\log n)$ bằng lũy thừa ma trận $2 \\times 2$."
  },
  {
    id: "mp-11",
    code: "CSES 1723",
    title: "Graph Paths I",
    category: "Đại số tuyến tính & Ma trận (Linear Algebra)",
    source: "CSES",
    url: "https://cses.fi/problemset/task/1723",
    difficulty: "Medium",
    theorems: ["Ma trận kề đồ thị", "Đếm đường đi độ dài K"],
    latexDescription: "Đếm số đường đi có đúng $k$ cạnh từ đỉnh 1 đến đỉnh $n$ trên đồ thị có hướng $n \\le 100, k \\le 10^9$ bằng ma trận kề $A^k$."
  },
  {
    id: "mp-12",
    code: "CSES 1724",
    title: "Graph Paths II",
    category: "Đại số tuyến tính & Ma trận (Linear Algebra)",
    source: "CSES",
    url: "https://cses.fi/problemset/task/1724",
    difficulty: "Hard",
    theorems: ["Min-Plus Matrix Multiplication", "Vành Tropical"],
    latexDescription: "Tìm đường đi có đúng $k$ cạnh có tổng trọng số nhỏ nhất dùng phép nhân ma trận trên vành nhiệt đới: $(A \\odot B)_{ij} = \\min_p (A_{ip} + B_{pj})$."
  },
  {
    id: "mp-13",
    code: "CF 1155E",
    title: "Guess the Root",
    category: "Đại số tuyến tính & Ma trận (Linear Algebra)",
    source: "Codeforces",
    url: "https://codeforces.com/problemset/problem/1155/E",
    difficulty: "Hard",
    theorems: ["Khử Gauss", "Nội suy đa thức Lagrange", "Modulo nguyên tố"],
    latexDescription: "Hỏi giá trị đa thức bậc 10 tại tối đa 50 điểm và tìm nghiệm của đa thức $f(x) \\equiv 0 \\pmod{10^6+3}$ bằng phép khử Gauss."
  },
  {
    id: "mp-14",
    code: "CF 895C",
    title: "Square Subsets",
    category: "Đại số tuyến tính & Ma trận (Linear Algebra)",
    source: "Codeforces",
    url: "https://codeforces.com/problemset/problem/895/C",
    difficulty: "Hard",
    theorems: ["Không gian vector F2", "Cơ sở tuyến tính XOR (XOR Basis)"],
    latexDescription: "Đếm số tập con có tích là số chính phương bằng cách ánh xạ lũy thừa thừa số nguyên tố $\\le 70$ thành vector bitmask modulo 2."
  },
  {
    id: "mp-15",
    code: "CF 1285D",
    title: "Dr. Evil Underscores",
    category: "Đại số tuyến tính & Ma trận (Linear Algebra)",
    source: "Codeforces",
    url: "https://codeforces.com/problemset/problem/1285/D",
    difficulty: "Medium",
    theorems: ["Trie nhị phân", "Cơ sở bitwise", "Chia để trị"],
    latexDescription: "Tìm $X$ sao cho $\\max_i (a_i \\oplus X)$ nhỏ nhất bằng cách xây Trie theo từng bit từ cao xuống thấp."
  },

  // --- Category: Combinatorics ---
  {
    id: "mp-16",
    code: "CSES 1079",
    title: "Binomial Coefficients",
    category: "Đại số tổ hợp (Combinatorics)",
    source: "CSES",
    url: "https://cses.fi/problemset/task/1079",
    difficulty: "Easy",
    theorems: ["Hệ số nhị thức", "Tiền xử lý giai thừa"],
    latexDescription: "Tính $\\binom{a}{b} \\pmod{10^9+7}$ cho $10^5$ truy vấn với $a, b \\le 10^6$ bằng mảng giai thừa và nghịch đảo giai thừa tiền xử lý trong $O(N)$."
  },
  {
    id: "mp-17",
    code: "CSES 1715",
    title: "Distributing Apples",
    category: "Đại số tổ hợp (Combinatorics)",
    source: "CSES",
    url: "https://cses.fi/problemset/task/1715",
    difficulty: "Easy",
    theorems: ["Bài toán chia kẹo Euler", "Stars and Bars"],
    latexDescription: "Chia $m$ quả táo cho $n$ đứa trẻ: số nghiệm nguyên không âm của $x_1 + \\dots + x_n = m$ là $\\binom{m+n-1}{n-1}$."
  },
  {
    id: "mp-18",
    code: "CSES 2064",
    title: "Bracket Sequences I",
    category: "Đại số tổ hợp (Combinatorics)",
    source: "CSES",
    url: "https://cses.fi/problemset/task/2064",
    difficulty: "Medium",
    theorems: ["Số Catalan", "Đường đi Dyck"],
    latexDescription: "Đếm số biểu thức ngoặc hợp lệ độ dài $n$: bằng 0 nếu $n$ lẻ, bằng số Catalan $C_{n/2} = \\frac{1}{n/2+1} \\binom{n}{n/2}$ nếu $n$ chẵn."
  },
  {
    id: "mp-19",
    code: "CSES 2185",
    title: "Prime Multiples",
    category: "Đại số tổ hợp (Combinatorics)",
    source: "CSES",
    url: "https://cses.fi/problemset/task/2185",
    difficulty: "Medium",
    theorems: ["Nguyên lý Bù trừ (Inclusion-Exclusion Principle)"],
    latexDescription: "Đếm số nguyên trong $[1, n]$ chia hết cho ít nhất một trong $k$ số nguyên tố cho trước với $n \\le 10^{18}, k \\le 20$."
  },
  {
    id: "mp-20",
    code: "CSES 2209",
    title: "Counting Necklaces",
    category: "Đại số tổ hợp (Combinatorics)",
    source: "CSES",
    url: "https://cses.fi/problemset/task/2209",
    difficulty: "Hard",
    theorems: ["Bổ đề Burnside", "Nhóm quay Cyclic $C_n$"],
    latexDescription: "Đếm số vòng cổ gồm $n$ hạt được tô bởi $m$ màu sao cho hai vòng cổ quay được vào nhau xem là trùng nhau: $\\frac{1}{n} \\sum_{i=0}^{n-1} m^{\\gcd(i, n)}$."
  },
  {
    id: "mp-21",
    code: "PE 15",
    title: "Lattice Paths",
    category: "Đại số tổ hợp (Combinatorics)",
    source: "Project Euler",
    url: "https://projecteuler.net/problem=15",
    difficulty: "Easy",
    theorems: ["Đường đi trên lưới 2D", "Tổ hợp nhị thức"],
    latexDescription: "Đếm số đường đi chỉ đi xuống và sang phải từ góc $(0, 0)$ đến $(20, 20)$ trên lưới: $\\binom{40}{20} = 137846528820$."
  },
  {
    id: "mp-22",
    code: "CF 1342E",
    title: "Placing Rooks",
    category: "Đại số tổ hợp (Combinatorics)",
    source: "Codeforces",
    url: "https://codeforces.com/problemset/problem/1342/E",
    difficulty: "Hard",
    theorems: ["Số Stirling loại 2", "Nguyên lý Bù trừ", "Đếm toàn ánh"],
    latexDescription: "Đặt $n$ quân xe trên bàn cờ $n \\times n$ sao cho có đúng $k$ cặp quân xe tấn công lẫn nhau."
  },

  // --- Category: Computational Geometry ---
  {
    id: "mp-23",
    code: "CSES 2189",
    title: "Point Location Test",
    category: "Hình học tính toán (Geometry)",
    source: "CSES",
    url: "https://cses.fi/problemset/task/2189",
    difficulty: "Easy",
    theorems: ["Tích có hướng 2D", "CCW Orientation"],
    latexDescription: "Xác định điểm $p_3$ nằm bên trái, bên phải hay nằm trên đường thẳng đi qua $p_1, p_2$ bằng dấu của $(x_2-x_1)(y_3-y_1) - (x_3-x_1)(y_2-y_1)$."
  },
  {
    id: "mp-24",
    code: "CSES 2190",
    title: "Line Segment Intersection",
    category: "Hình học tính toán (Geometry)",
    source: "CSES",
    url: "https://cses.fi/problemset/task/2190",
    difficulty: "Medium",
    theorems: ["Giao điểm đoạn thẳng", "Bao hộp biên Bounding Box"],
    latexDescription: "Kiểm tra hai đoạn thẳng có giao nhau hay không (kể cả trường hợp suy biến thẳng hàng)."
  },
  {
    id: "mp-25",
    code: "CSES 2191",
    title: "Polygon Area",
    category: "Hình học tính toán (Geometry)",
    source: "CSES",
    url: "https://cses.fi/problemset/task/2191",
    difficulty: "Easy",
    theorems: ["Công thức Shoelace Gauss", "Tích phân Green"],
    latexDescription: "Tính $2 \\times$ diện tích của đa giác đơn $n$ đỉnh có tọa độ nguyên bằng công thức dây giày."
  },
  {
    id: "mp-26",
    code: "CSES 2193",
    title: "Polygon Lattice Points",
    category: "Hình học tính toán (Geometry)",
    source: "CSES",
    url: "https://cses.fi/problemset/task/2193",
    difficulty: "Hard",
    theorems: ["Định lý Pick", "GCD tính điểm trên đoạn thẳng"],
    latexDescription: "Tính số điểm nguyên nằm hoàn toàn bên trong và số điểm nguyên nằm trên biên của đa giác bằng công thức Pick: $I = S - B/2 + 1$."
  },
  {
    id: "mp-27",
    code: "CSES 2195",
    title: "Convex Hull",
    category: "Hình học tính toán (Geometry)",
    source: "CSES",
    url: "https://cses.fi/problemset/task/2195",
    difficulty: "Medium",
    theorems: ["Bao lồi Monotone Chain", "Graham Scan"],
    latexDescription: "Tìm bao lồi nhỏ nhất chứa toàn bộ $n \\le 2 \\cdot 10^5$ điểm trong $O(n \\log n)$ bằng thuật toán chuỗi đơn điệu của Andrew."
  },

  // --- Category: Probability & Expectation ---
  {
    id: "mp-28",
    code: "CSES 1725",
    title: "Dice Probability",
    category: "Xác suất & Kỳ vọng (Probability)",
    source: "CSES",
    url: "https://cses.fi/problemset/task/1725",
    difficulty: "Medium",
    theorems: ["Quy hoạch động xác suất", "Đại số đa thức"],
    latexDescription: "Gieo $n$ con xúc xắc 6 mặt, tính xác suất để tổng các mặt nằm trong khoảng $[a, b]$ làm tròn 6 chữ số thập phân."
  },
  {
    id: "mp-29",
    code: "CSES 1726",
    title: "Moving Robots",
    category: "Xác suất & Kỳ vọng (Probability)",
    source: "CSES",
    url: "https://cses.fi/problemset/task/1726",
    difficulty: "Hard",
    theorems: ["Tính tuyến tính kỳ vọng", "Xác suất độc lập"],
    latexDescription: "Tính kỳ vọng số ô trống trên bàn cờ $8 \\times 8$ sau khi mỗi robot di chuyển ngẫu nhiên $k$ bước bằng cách tính xác suất từng ô không bị robot nào ghé thăm."
  },
  {
    id: "mp-30",
    code: "PE 301",
    title: "Nim",
    category: "Lý thuyết trò chơi (Game Theory)",
    source: "Project Euler",
    url: "https://projecteuler.net/problem=301",
    difficulty: "Easy",
    theorems: ["Trò chơi Nim", "Hàm XOR-sum", "Dãy số Fibonacci"],
    latexDescription: "Đếm số $n \\le 2^{30}$ sao cho trạng thái Nim $(n, 2n, 3n)$ có $n \\oplus 2n \\oplus 3n = 0$ (liên hệ trực tiếp với dãy số Fibonacci)."
  },
  {
    id: "mp-31",
    code: "CSES 1729",
    title: "Stick Game",
    category: "Lý thuyết trò chơi (Game Theory)",
    source: "CSES",
    url: "https://cses.fi/problemset/task/1729",
    difficulty: "Easy",
    theorems: ["Trạng thái thắng / thua", "Quy hoạch động đối kháng"],
    latexDescription: "Xác định mọi vị trí $1 \\le i \\le n$ là trạng thái thắng hay thua trong trò chơi bốc que với tập bước đi cho trước."
  },
  {
    id: "mp-32",
    code: "CSES 1730",
    title: "Nim Game I",
    category: "Lý thuyết trò chơi (Game Theory)",
    source: "CSES",
    url: "https://cses.fi/problemset/task/1730",
    difficulty: "Easy",
    theorems: ["Định lý Bouton", "Tổng XOR Nim"],
    latexDescription: "Người chơi thứ nhất thắng khi và chỉ khi XOR-sum của kích thước các đống que khác 0."
  },
  {
    id: "mp-33",
    code: "CSES 2207",
    title: "Grundy's Game",
    category: "Lý thuyết trò chơi (Game Theory)",
    source: "CSES",
    url: "https://cses.fi/problemset/task/2207",
    difficulty: "Medium",
    theorems: ["Định lý Sprague-Grundy", "Hàm Mex"],
    latexDescription: "Tính giá trị hàm Grundy cho trò chơi chia một đống que thành hai đống có kích thước không bằng nhau."
  }
];
