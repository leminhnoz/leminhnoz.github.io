export interface RoadmapProblem {
  id: string;
  title: string;
  url: string;
  platform: string;
}

export interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  difficulty: "Beginner" | "Easy" | "Medium" | "Hard" | "Advanced";
  prerequisites: string[];
  objectives: string[];
  fact: string;
  blogSlug: string | null;
  blogTitle?: string;
  status: "completed" | "missing" | "advanced";
  problems: RoadmapProblem[];
}

export interface RoadmapStage {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  nodes: RoadmapNode[];
}

export const roadmapStages: RoadmapStage[] = [
  {
    id: 1,
    slug: "foundations",
    title: "Stage 1 — Foundations",
    subtitle: "Nền tảng C++, Tư duy & Chiến thuật",
    description: "Xây dựng nền móng vững chắc với ngôn ngữ C++, phân tích độ phức tạp thời gian, làm chủ thư viện STL và chiến thuật thi đấu.",
    nodes: [
      {
        id: "time-complexity",
        title: "Độ phức tạp Big-O & Quy tắc 1 Giây",
        description: "Hiểu sâu về tốc độ tăng trưởng của thuật toán, quy tắc 10^8 phép tính/giây trong CP và cách quản lý bộ nhớ 256MB.",
        difficulty: "Beginner",
        prerequisites: [],
        objectives: [
          "Biết cách tính độ phức tạp thời gian và không gian của code C++.",
          "Áp dụng quy tắc 1 giây (~10^8 phép tính) để đoán trước thuật toán cần dùng dựa vào giới hạn N.",
          "Tránh lỗi tràn số nguyên (Integer Overflow) và tràn ngăn xếp (Stack Overflow)."
        ],
        fact: "Một phép chia nguyên (/) hoặc modulo (%) trong C++ có thể tốn từ 15 đến 20 chu kỳ CPU, chậm gấp 20 lần so với phép cộng hoặc thao tác bit (&, |).",
        blogSlug: "2025-03-04-time-and-space-complexity-big-o",
        blogTitle: "Hiểu sâu về Độ phức tạp Thời gian và Không gian (Big-O) trong Competitive Programming",
        status: "completed",
        problems: []
      },
      {
        id: "cpp-stl",
        title: "Làm chủ C++ STL & Fast I/O",
        description: "Sử dụng thành thạo vector, set, map, priority_queue, lambda comparator và cơ chế chống hack unordered_map.",
        difficulty: "Beginner",
        prerequisites: ["time-complexity"],
        objectives: [
          "Thiết lập Fast I/O và hiểu vì sao không bao giờ nên dùng std::endl trong vòng lặp.",
          "Nắm vững sự khác nhau giữa vector (liên tục trong RAM) và set/map (Cây đỏ đen).",
          "Biết cách viết Custom Hash chống hack hash collisions O(N) trên Codeforces."
        ],
        fact: "Hàm băm mặc định của GCC std::hash<long long> rất ngây thơ (chính là số nguyên đó), cho phép đối thủ dễ dàng tạo test case đẩy unordered_map về O(N).",
        blogSlug: "2025-03-15-cpp-stl-for-competitive-programming",
        blogTitle: "Làm chủ C++ STL trong Competitive Programming: Từ bản chất cấu trúc đến tốc độ thực thi",
        status: "completed",
        problems: []
      },
      {
        id: "contest-strategy",
        title: "Chiến thuật phòng thi & Stress Testing",
        description: "Quản lý 5 tiếng thi đấu ICPC/HSG, xử lý tâm lý khi dính WA và tuyệt kỹ Stress Testing tự động tìm bộ test sai nhỏ nhất.",
        difficulty: "Beginner",
        prerequisites: ["time-complexity"],
        objectives: [
          "Phân bổ thời gian 5 tiếng thi đấu: săn bài bánh mì, phân loại giữa trận và giờ đóng băng.",
          "Cài đặt hệ thống Stress Testing tự động gồm sol.cpp, brute.cpp và generator.cpp.",
          "Tìm ra bộ test phản ví dụ nhỏ nhất chỉ gồm 3-4 số để sửa lỗi ngay trong 3 phút."
        ],
        fact: "Stress Testing với test ngẫu nhiên cực nhỏ (N ≤ 5) hiệu quả hơn test lớn gấp 100 lần vì mắt người có thể tự tính tay kiểm tra ngay lập tức.",
        blogSlug: "2025-02-12-icpc-contest-strategy-and-stress-testing",
        blogTitle: "Chiến thuật phòng thi Competitive Programming và Tuyệt kỹ Stress Testing bắt bug test sai",
        status: "completed",
        problems: []
      }
    ]
  },
  {
    id: 2,
    slug: "basic-problem-solving",
    title: "Stage 2 — Basic Problem Solving",
    subtitle: "Kỹ thuật Mảng & Thuật toán Cơ sở",
    description: "Những kỹ thuật thao tác trên mảng kinh điển giúp biến thuật toán ngây thơ O(N^2) thành tuyến tính O(N) hoặc hằng số O(1).",
    nodes: [
      {
        id: "prefix-sum-diff",
        title: "Prefix Sum & Difference Array (1D & 2D)",
        description: "Truy vấn tổng đoạn mảng tĩnh trong O(1) và cập nhật giá trị cả một đoạn liên tiếp trong O(1).",
        difficulty: "Easy",
        prerequisites: ["cpp-stl"],
        objectives: [
          "Xây dựng và truy vấn mảng cộng dồn 1 chiều và 2 chiều bằng nguyên lý bao hàm - loại trừ.",
          "Sử dụng Difference Array để cập nhật đoạn [L, R] trong O(1) mà không cần cấu trúc cây.",
          "Phân biệt rõ bài toán tĩnh (dùng Prefix Sum) và bài toán động (cần Segment/Fenwick Tree)."
        ],
        fact: "Mảng ban đầu A chính là mảng cộng dồn của mảng hiệu D (A[i] = sum(D[1..i])), vì vậy cập nhật 2 điểm trên D tương đương cập nhật cả đoạn trên A.",
        blogSlug: "2025-04-25-prefix-sum-and-difference-array",
        blogTitle: "Mảng cộng dồn (Prefix Sum) và Mảng hiệu (Difference Array): Cội nguồn của xử lý mảng",
        status: "completed",
        problems: [
          { id: "1646", title: "Static Range Sum Queries", url: "https://cses.fi/problemset/task/1646", platform: "CSES" },
          { id: "203", title: "Cập nhật đoạn, truy vấn tổng", url: "https://marisaoj.com/problem/203", platform: "MarisaOJ" }
        ]
      },
      {
        id: "two-pointers-window",
        title: "Two Pointers & Sliding Window",
        description: "Tận dụng tính đơn điệu của hai con trỏ để quét toàn bộ mảng trong O(N) mà không cần quay lui.",
        difficulty: "Easy",
        prerequisites: ["cpp-stl"],
        objectives: [
          "Nhận diện điều kiện đơn điệu (Monotonicity) để áp dụng Two Pointers.",
          "Cài đặt cửa sổ trượt (Sliding Window) cùng chiều cho bài toán đoạn con liên tiếp.",
          "Cài đặt Two Pointers ngược chiều cho bài toán 2-Sum trên mảng đã sắp xếp."
        ],
        fact: "Hai con trỏ chỉ hoạt động khi bài toán có tính đơn điệu; nếu mảng có cả số âm lẫn số dương, tính đơn điệu bị phá vỡ và Two Pointers sẽ thất bại.",
        blogSlug: "2025-05-06-two-pointers-and-sliding-window",
        blogTitle: "Kỹ thuật Hai con trỏ (Two Pointers) và Cửa sổ trượt (Sliding Window): Biến O(N^2) thành O(N)",
        status: "completed",
        problems: [
          { id: "1660", title: "Subarray Sums I", url: "https://cses.fi/problemset/task/1660", platform: "CSES" },
          { id: "279B", title: "Books", url: "https://codeforces.com/problemset/problem/279/B", platform: "Codeforces" }
        ]
      },
      {
        id: "binary-search-basic",
        title: "Tìm kiếm Nhị phân Căn bản",
        description: "Bất biến vòng lặp, cách viết Binary Search không bao giờ dính bug lặp vô tận, cùng cơ chế std::lower_bound và upper_bound.",
        difficulty: "Easy",
        prerequisites: ["cpp-stl"],
        objectives: [
          "Viết thuật toán chia đôi chuẩn xác với mid = low + (high - low) / 2 tránh tràn số.",
          "Thành thạo std::lower_bound (>= X) và std::upper_bound (> X) trong O(log N).",
          "Hiểu rõ bất biến vòng lặp để không bao giờ bị lệch 1 vị trí (Off-by-one)."
        ],
        fact: "Với N = 1 triệu phần tử, Binary Search chỉ cần tối đa 20 lần so sánh (log2(10^6) ≈ 19.93) để tìm ra kết quả.",
        blogSlug: "2025-04-03-binary-search-fundamentals",
        blogTitle: "Tìm kiếm nhị phân căn bản: Bất biến vòng lặp và nghệ thuật không bao giờ lặp vô tận",
        status: "completed",
        problems: [
          { id: "76", title: "Tìm kiếm nhị phân 2", url: "https://marisaoj.com/problem/76", platform: "MarisaOJ" },
          { id: "79", title: "Truy vấn đếm", url: "https://marisaoj.com/problem/79", platform: "MarisaOJ" },
          { id: "706B", title: "Interesting drink", url: "https://codeforces.com/problemset/problem/706/B", platform: "Codeforces" }
        ]
      }
    ]
  },
  {
    id: 3,
    slug: "core-patterns",
    title: "Stage 3 — Core Patterns",
    subtitle: "Mẫu hình Giải thuật & Vét cạn",
    description: "Các kỹ thuật giải bài then chốt: Chặt nhị phân kết quả, Vét cạn có nhánh cận, Chia đôi tập và Ngăn xếp đơn điệu.",
    nodes: [
      {
        id: "binary-search-answer",
        title: "Chặt nhị phân kết quả (Binary Search on Answer)",
        description: "Áp dụng tìm kiếm nhị phân lên không gian đáp án dựa trên hàm kiểm tra tính khả thi đơn điệu.",
        difficulty: "Medium",
        prerequisites: ["binary-search-basic"],
        objectives: [
          "Chuyển đổi bài toán tối ưu 'Tìm giá trị cực trị' thành bài toán quyết định 'Giá trị X có khả thi không?'.",
          "Xác định miền tìm kiếm đáp án [low, high] và tính đơn điệu của hàm check(mid).",
          "Giải quyết bài toán lập lịch, chia việc và khoảng cách tối thiểu."
        ],
        fact: "Binary Search on Answer có thể tìm kiếm trên không gian đáp án khổng lồ lên tới 10^18 chỉ trong khoảng 60 bước lặp.",
        blogSlug: "2025-04-14-binary-search-on-answer",
        blogTitle: "Chặt nhị phân kết quả (Binary Search on Answer): Từ tư duy đoán mò đến vũ khí tối thượng trong CP",
        status: "completed",
        problems: [
          { id: "81", title: "Viên kẹo thứ k", url: "https://marisaoj.com/problem/81", platform: "MarisaOJ" },
          { id: "85", title: "Cạnh tam giác", url: "https://marisaoj.com/problem/85", platform: "MarisaOJ" },
          { id: "1620", title: "Factory Machines", url: "https://cses.fi/problemset/task/1620", platform: "CSES" },
          { id: "1201C", title: "Maximum Median", url: "https://codeforces.com/problemset/problem/1201/C", platform: "Codeforces" }
        ]
      },
      {
        id: "backtracking",
        title: "Vét cạn & Quay lui (Branch and Bound)",
        description: "Duyệt toàn bộ không gian trạng thái, kỹ thuật hoàn tác (undo) và cắt tỉa nhánh cận để giải quyết các bài toán NP-Hard.",
        difficulty: "Medium",
        prerequisites: ["cpp-stl"],
        objectives: [
          "Nắm vững 3 bước chuẩn của hàm quay lui: Dừng, Thử lựa chọn và Hoàn tác (Undo).",
          "Áp dụng kỹ thuật Cắt tỉa nhánh cận (Branch and Bound) loại bỏ sớm các nhánh vô nghiệm.",
          "Giải quyết bài toán N quân hậu và sinh hoán vị có điều kiện ràng buộc."
        ],
        fact: "Bước hoàn tác (Undo Choice) là linh hồn của thuật toán quay lui; nếu quên khôi phục trạng thái cũ, cây đệ quy sẽ bị ô nhiễm dữ liệu hoàn toàn.",
        blogSlug: "2025-05-12-backtracking-and-branch-and-bound",
        blogTitle: "Vét cạn và Quay lui (Backtracking): Từ cây đệ quy đến nghệ thuật Cắt tỉa Nhánh cận",
        status: "completed",
        problems: [
          { id: "1622", title: "Creating Strings", url: "https://cses.fi/problemset/task/1622", platform: "CSES" },
          { id: "1624", title: "Chessboard and Queens", url: "https://cses.fi/problemset/task/1624", platform: "CSES" }
        ]
      },
      {
        id: "meet-in-the-middle",
        title: "Chia đôi tập (Meet in the Middle)",
        description: "Đột phá giới hạn từ O(2^N) sang O(2^(N/2)) khi N ≈ 40, biến 10^12 phép tính bất khả thi thành 10^6 bước chạy trong 0.2s.",
        difficulty: "Medium",
        prerequisites: ["binary-search-basic"],
        objectives: [
          "Nhận diện tín hiệu vàng của bài toán khi giới hạn N nằm trong khoảng 30 đến 45.",
          "Chia mảng thành 2 nửa bằng nhau và sinh độc lập tất cả các tổng tập con.",
          "Sắp xếp và sử dụng Binary Search (std::equal_range) để ghép nối kết quả hai nửa."
        ],
        fact: "Meet in the Middle giảm số phép tính từ 2^40 (khoảng 1.1 nghìn tỷ bước, chạy mất 3 tiếng) xuống 2 * 2^20 (khoảng 2 triệu bước, chạy mất 0.05 giây)!",
        blogSlug: "2025-05-24-meet-in-the-middle",
        blogTitle: "Kỹ thuật Chia đôi tập (Meet in the Middle): Đột phá giới hạn từ O(2^N) sang O(2^(N/2))",
        status: "completed",
        problems: [
          { id: "1628", title: "Meet in the Middle", url: "https://cses.fi/problemset/task/1628", platform: "CSES" },
          { id: "888E", title: "Maximum Subsequence", url: "https://codeforces.com/problemset/problem/888/E", platform: "Codeforces" }
        ]
      },
      {
        id: "monotonic-stack-queue",
        title: "Ngăn xếp & Hàng đợi Đơn điệu",
        description: "Duy trì cấu trúc luôn tăng hoặc giảm để tìm phần tử nhỏ hơn/lớn hơn gần nhất trong O(N).",
        difficulty: "Medium",
        prerequisites: ["cpp-stl"],
        objectives: [
          "Xây dựng Monotonic Stack để giải bài toán Nearest Smaller Element trong O(N).",
          "Cài đặt Monotonic Deque để tìm Min/Max trên cửa sổ trượt kích thước K trong O(N).",
          "Ứng dụng giải bài toán diện tích hình chữ nhật lớn nhất trong biểu đồ cột."
        ],
        fact: "Dù có vòng lặp while lồng bên trong vòng for, mỗi phần tử chỉ được push vào và pop ra khỏi stack đúng 1 lần duy nhất, nên tổng độ phức tạp luôn là O(N).",
        blogSlug: "2025-05-18-minimum-stack-minimum-queue",
        blogTitle: "Ngăn xếp nhỏ nhất và Hàng đợi nhỏ nhất (Minimum Stack / Minimum Queue)",
        status: "completed",
        problems: [
          { id: "1645", title: "Nearest Smaller Values", url: "https://cses.fi/problemset/task/1645", platform: "CSES" },
          { id: "HISTOGRA", title: "Largest Rectangle in a Histogram", url: "https://www.spoj.com/problems/HISTOGRA/", platform: "SPOJ" }
        ]
      }
    ]
  },
  {
    id: 4,
    slug: "graph-algorithms",
    title: "Stage 4 — Graph Algorithms",
    subtitle: "Lý thuyết Đồ thị & Mạng lưới",
    description: "Chinh phục cấu trúc dữ liệu đồ thị từ các phép duyệt cơ bản tới các thuật toán đường đi ngắn nhất và cây khung.",
    nodes: [
      {
        id: "graph-traversal",
        title: "Duyệt Đồ thị: DFS & BFS Toàn diện",
        description: "Biểu diễn đồ thị bằng danh sách kề, duyệt chiều sâu, duyệt chiều rộng, tìm đường ngắn nhất không trọng số và duyệt lưới 2D.",
        difficulty: "Easy",
        prerequisites: ["cpp-stl"],
        objectives: [
          "Cài đặt danh sách kề vector<vector<int>> và giải thích vì sao không dùng ma trận kề O(V^2).",
          "Áp dụng DFS để đếm thành phần liên thông và phát hiện chu trình.",
          "Áp dụng BFS với hàng đợi queue để tìm đường đi ngắn nhất trên đồ thị không trọng số và mê cung 2D."
        ],
        fact: "DFS đi sâu tới tận cùng bằng ngăn xếp (Stack/Đệ quy), trong khi BFS lan tỏa theo từng tầng bằng hàng đợi (Queue) đảm bảo tìm ra đường ngắn nhất với trọng số 1.",
        blogSlug: "2025-06-08-graph-traversal-bfs-dfs",
        blogTitle: "Nhập môn Lý thuyết Đồ thị: Biểu diễn đồ thị và Chinh phục DFS / BFS toàn diện",
        status: "completed",
        problems: [
          { id: "1192", title: "Counting Rooms", url: "https://cses.fi/problemset/task/1192", platform: "CSES" },
          { id: "1193", title: "Labyrinth", url: "https://cses.fi/problemset/task/1193", platform: "CSES" }
        ]
      },
      {
        id: "dijkstra",
        title: "Thuật toán Dijkstra (Shortest Path)",
        description: "Tìm đường đi ngắn nhất từ đỉnh nguồn trên đồ thị có trọng số không âm bằng Min-Heap O((V + E) log V).",
        difficulty: "Medium",
        prerequisites: ["graph-traversal"],
        objectives: [
          "Hiểu bản chất chiến lược Tham lam (Greedy) đằng sau Dijkstra.",
          "Cài đặt thuật toán với priority_queue kèm kỹ thuật Lazy Deletion (bỏ qua bản ghi cũ).",
          "Giải thích được vì sao cạnh âm làm hỏng thuật toán Dijkstra và cách truy vết đường đi."
        ],
        fact: "Nhà khoa học Edsger Dijkstra đã nghĩ ra thuật toán này chỉ trong vòng 20 phút khi đang ngồi uống cà phê cùng hôn thê tại Amsterdam năm 1956.",
        blogSlug: "2025-06-20-dijkstra-shortest-path",
        blogTitle: "Thuật toán Dijkstra: Tìm đường đi ngắn nhất bằng chiến lược tham lam và Hàng đợi ưu tiên",
        status: "completed",
        problems: [
          { id: "1671", title: "Shortest Routes I", url: "https://cses.fi/problemset/task/1671", platform: "CSES" },
          { id: "20C", title: "Dijkstra?", url: "https://codeforces.com/problemset/problem/20/C", platform: "Codeforces" }
        ]
      },
      {
        id: "topological-sort",
        title: "Sắp xếp Tô-pô & DAG",
        description: "Thuật toán Kahn dựa trên bán bậc vào (In-degree), phát hiện chu trình có hướng và Quy hoạch động trên DAG.",
        difficulty: "Medium",
        prerequisites: ["graph-traversal"],
        objectives: [
          "Nắm vững định nghĩa Đồ thị có hướng không chu trình (DAG).",
          "Cài đặt thuật toán Kahn bằng hàng đợi bán bậc vào trong O(V + E).",
          "Ứng dụng thứ tự tô-pô để giải bài toán đường đi dài nhất bằng Dynamic Programming."
        ],
        fact: "Mọi bài toán Quy hoạch động (DP) đều có thể mô hình hóa dưới dạng một DAG, nơi các trạng thái là đỉnh và các bước chuyển trạng thái là cạnh có hướng.",
        blogSlug: "2025-07-04-topological-sort-dag",
        blogTitle: "Sắp xếp Tô-pô (Topological Sort) và Đồ thị có hướng không chu trình (DAG)",
        status: "completed",
        problems: [
          { id: "1679", title: "Course Schedule", url: "https://cses.fi/problemset/task/1679", platform: "CSES" },
          { id: "1680", title: "Longest Flight Route", url: "https://cses.fi/problemset/task/1680", platform: "CSES" }
        ]
      },
      {
        id: "dsu",
        title: "Disjoint Set Union (DSU)",
        description: "Cấu trúc rừng tập hợp không giao nhau với Nén đường đi (Path Compression) và Gộp theo hạng chạy gần như O(1).",
        difficulty: "Medium",
        prerequisites: ["cpp-stl"],
        objectives: [
          "Hiểu cơ chế quản lý các thành phần liên thông độc lập.",
          "Cài đặt hàm find_set với Path Compression và union_sets theo kích thước/hạng.",
          "Ứng dụng DSU trong thuật toán cây khung nhỏ nhất Kruskal."
        ],
        fact: "Nhờ kỹ thuật nén đường đi kết hợp hợp theo hạng, thời gian trung bình cho mỗi thao tác DSU là hàm Ackermann nghịch đảo α(N) — với mọi N trong vũ trụ, α(N) ≤ 4!",
        blogSlug: "2025-07-16-disjoint-set-union-dsu",
        blogTitle: "Cấu trúc dữ liệu các tập hợp rời nhau (Disjoint Set Union - DSU)",
        status: "completed",
        problems: [
          { id: "1676", title: "Road Construction", url: "https://cses.fi/problemset/task/1676", platform: "CSES" },
          { id: "25D", title: "Roads not only in Berland", url: "https://codeforces.com/problemset/problem/25/D", platform: "Codeforces" }
        ]
      }
    ]
  },
  {
    id: 5,
    slug: "dynamic-programming",
    title: "Stage 5 — Dynamic Programming",
    subtitle: "Quy hoạch Động từ Căn bản đến Chuyên sâu",
    description: "Làm chủ nghệ thuật chia bài toán lớn thành các bài toán con gối nhau, Knapsack, LIS, Bitmask DP và tối ưu nâng cao.",
    nodes: [
      {
        id: "dp-intro",
        title: "Nhập môn Quy hoạch Động (DP)",
        description: "Bản chất không tính lại việc cũ, kỹ thuật Memoization (Top-down) và Tabulation (Bottom-up).",
        difficulty: "Easy",
        prerequisites: ["time-complexity"],
        objectives: [
          "Hiểu bản chất tối ưu hóa từ đệ quy ngây thơ O(2^n) xuống tuyến tính O(n).",
          "Xác định hai yếu tố quyết định: Bài toán con gối nhau và Cấu trúc con tối ưu.",
          "Thành thạo chuyển đổi qua lại giữa Top-down và Bottom-up."
        ],
        fact: "Thuật ngữ Dynamic Programming do nhà toán học Richard Bellman đặt ra vào thập niên 1950 nhằm xin ngân sách nghiên cứu mà không bị chính quyền nghi ngờ.",
        blogSlug: "2025-09-03-introduction-to-dynamic-programming",
        blogTitle: "Nhập môn Quy hoạch động (Dynamic Programming): Từ đệ quy ngây thơ đến tối ưu hóa",
        status: "completed",
        problems: [
          { id: "1633", title: "Dice Combinations", url: "https://cses.fi/problemset/task/1633", platform: "CSES" },
          { id: "dp_a", title: "Frog 1", url: "https://atcoder.jp/contests/dp/tasks/dp_a", platform: "AtCoder" }
        ]
      },
      {
        id: "lis",
        title: "Dãy con tăng dài nhất (LIS)",
        description: "Từ thuật toán O(N^2) cơ bản đến bước đột phá O(N log N) bằng Binary Search hoặc Segment/Fenwick Tree.",
        difficulty: "Medium",
        prerequisites: ["dp-intro", "binary-search-basic"],
        objectives: [
          "Xây dựng công thức quy hoạch động O(N^2) kinh điển.",
          "Tối ưu hóa không gian trạng thái bằng mảng tail và std::lower_bound trong O(N log N).",
          "Truy vết khôi phục lại dãy con tăng thực tế."
        ],
        fact: "Mảng tail trong thuật toán LIS O(N log N) không chứa dãy con tăng thực tế, mà chỉ chứa phần tử kết thúc nhỏ nhất có thể của các dãy con độ dài tương ứng.",
        blogSlug: "2025-09-17-longest-increasing-subsequence-lis",
        blogTitle: "Dãy con tăng dài nhất (Longest Increasing Subsequence - LIS): Từ O(N^2) đến O(N log N)",
        status: "completed",
        problems: [
          { id: "1143", title: "Increasing Subsequence", url: "https://cses.fi/problemset/task/1143", platform: "CSES" }
        ]
      },
      {
        id: "knapsack",
        title: "Bài toán Cái túi (Knapsack)",
        description: "Các biến thể Knapsack 0/1, Unbounded Knapsack, Bounded Knapsack và kỹ thuật tối ưu mảng 1 chiều.",
        difficulty: "Medium",
        prerequisites: ["dp-intro"],
        objectives: [
          "Phân biệt Knapsack 0/1 (mỗi món tối đa 1 lần) và Unbounded (vô hạn số lượng).",
          "Nắm vững lý do vì sao Knapsack 0/1 phải duyệt trọng lượng ngược từ W về 0.",
          "Chuyển đổi bài toán khi trọng lượng W quá lớn nhưng giá trị V nhỏ."
        ],
        fact: "Khi duyệt ngược từ W về 0 trên mảng 1 chiều trong Knapsack 0/1, ta đang đảm bảo mỗi đồ vật chỉ được chọn tối đa một lần mà không cần ma trận 2D tốn bộ nhớ.",
        blogSlug: "2025-09-29-knapsack-problem-dp",
        blogTitle: "Bài toán Cái túi (Knapsack Problem) trong Quy hoạch động: 0/1, Vô hạn và Đa dạng",
        status: "completed",
        problems: [
          { id: "1158", title: "Book Shop", url: "https://cses.fi/problemset/task/1158", platform: "CSES" },
          { id: "dp_d", title: "Knapsack 1", url: "https://atcoder.jp/contests/dp/tasks/dp_d", platform: "AtCoder" },
          { id: "dp_e", title: "Knapsack 2", url: "https://atcoder.jp/contests/dp/tasks/dp_e", platform: "AtCoder" }
        ]
      },
      {
        id: "bitmask-dp",
        title: "Quy hoạch động Mặt nạ bit (Bitmask DP)",
        description: "Nén tập hợp các phần tử thành một số nguyên 32 bit, giải bài toán Người du lịch TSP trong O(2^N * N^2) và ghép cặp hoàn hảo.",
        difficulty: "Hard",
        prerequisites: ["dp-intro"],
        objectives: [
          "Thành thạo các phép toán bit: bật, tắt, đảo bit và kỹ thuật duyệt tất cả tập con (sub = (sub - 1) & mask).",
          "Xây dựng trạng thái dp[mask][u] cho bài toán Người du lịch (TSP) và đường đi Hamiltonian.",
          "Áp dụng Bitmask DP giải các bài toán ghép cặp trên đồ thị nhỏ N ≤ 20."
        ],
        fact: "Với N = 20, Bitmask DP chỉ tốn khoảng 4 * 10^8 phép tính để tìm đường đi TSP ngắn nhất, trong khi duyệt hoán vị ngây thơ 19! tốn tới 1.2 * 10^17 phép tính!",
        blogSlug: "2025-10-04-bitmasks-and-bitmask-dp",
        blogTitle: "Làm chủ Bitmask và Quy hoạch động Mặt nạ bit (Bitmask DP)",
        status: "completed",
        problems: [
          { id: "1690", title: "Hamiltonian Flights", url: "https://cses.fi/problemset/task/1690", platform: "CSES" },
          { id: "dp_o", title: "Matching", url: "https://atcoder.jp/contests/dp/tasks/dp_o", platform: "AtCoder" }
        ]
      },
      {
        id: "dp-optimizations",
        title: "Tối ưu hóa DP Nâng cao",
        description: "Kỹ thuật Divide & Conquer DP và Tối ưu Knuth cho các bài toán quy hoạch động trên đoạn.",
        difficulty: "Hard",
        prerequisites: ["knapsack"],
        objectives: [
          "Nhận diện tính chất đơn điệu của điểm cắt tối ưu opt[i][j] <= opt[i][j+1].",
          "Áp dụng Divide & Conquer DP giảm độ phức tạp từ O(K * N^2) xuống O(K * N log N).",
          "Áp dụng Knuth Optimization cho Range DP giảm từ O(N^3) xuống O(N^2)."
        ],
        fact: "Cả Divide & Conquer DP lẫn Knuth Optimization đều dựa trên Bất đẳng thức Tứ giác (Quadrangle Inequality) để chứng minh tính đơn điệu của điểm chia tối ưu.",
        blogSlug: "2025-10-12-divide-and-conquer-dp",
        blogTitle: "Tối ưu hóa Quy hoạch động: Chia để trị (Divide and Conquer DP)",
        status: "advanced",
        problems: []
      }
    ]
  },
  {
    id: 6,
    slug: "range-queries",
    title: "Stage 6 — Range Queries & Data Structures",
    subtitle: "Cấu trúc Dữ liệu & Truy vấn Đoạn",
    description: "Các cấu trúc dữ liệu tối tân giúp trả lời các truy vấn trên đoạn và cập nhật dữ liệu với tốc độ ánh sáng.",
    nodes: [
      {
        id: "sparse-table",
        title: "Sparse Table & RMQ",
        description: "Bảng thưa trả lời truy vấn Range Minimum/Maximum Query (RMQ) trong O(1) sau tiền xử lý O(N log N).",
        difficulty: "Medium",
        prerequisites: ["time-complexity"],
        objectives: [
          "Hiểu nguyên lý phân rã đoạn thành các lũy thừa của 2.",
          "Tận dụng tính chất lũy thừa (Idempotency) của phép toán min/max/gcd để chồng lấn hai đoạn trong O(1).",
          "Cài đặt Sparse Table hoàn chỉnh trong C++."
        ],
        fact: "Sparse Table chỉ đạt thời gian O(1) với các phép toán lũy đẳng (f(x, x) = x như min, max, gcd); với phép cộng (+), Sparse Table vẫn mất O(log N).",
        blogSlug: "2025-11-22-sparse-table-rmq",
        blogTitle: "Sparse Table: Truy vấn đoạn tĩnh trong O(1) và bài toán RMQ",
        status: "completed",
        problems: [
          { id: "RMQSQ", title: "Range Minimum Query", url: "http://www.spoj.com/problems/RMQSQ/", platform: "SPOJ" },
          { id: "THRBL", title: "Catapult consortium", url: "http://www.spoj.com/problems/THRBL/", platform: "SPOJ" }
        ]
      },
      {
        id: "fenwick-tree",
        title: "Fenwick Tree (Binary Indexed Tree)",
        description: "Cấu trúc dữ liệu cây chỉ số nhị phân siêu gọn nhẹ, cập nhật điểm và truy vấn tổng tiền tố trong O(log N).",
        difficulty: "Medium",
        prerequisites: ["prefix-sum-diff"],
        objectives: [
          "Giải mã phép toán bit i & (-i) để lấy bit 1 thấp nhất (Lowest Set Bit).",
          "Xây dựng cây BIT quản lý các đoạn lũy thừa 2.",
          "Ứng dụng Fenwick Tree đếm số cặp nghịch thế (Inversions) trong O(N log N)."
        ],
        fact: "Cây Fenwick chỉ mất đúng một mảng 1 chiều kích thước N để lưu trữ và chỉ tốn khoảng 10 dòng code C++.",
        blogSlug: "2025-12-08-fenwick-tree-binary-indexed-tree",
        blogTitle: "Cây Fenwick (Binary Indexed Tree - BIT): Tối giản, thanh lịch và hiệu năng",
        status: "completed",
        problems: [
          { id: "INVCNT", title: "Inversion Count", url: "http://www.spoj.com/problems/INVCNT/", platform: "SPOJ" },
          { id: "YODANESS", title: "YODANESS", url: "http://www.spoj.com/problems/YODANESS/", platform: "SPOJ" },
          { id: "597C", title: "Subsequences", url: "http://codeforces.com/contest/597/problem/C", platform: "Codeforces" }
        ]
      },
      {
        id: "segment-tree",
        title: "Segment Tree & Lazy Propagation",
        description: "Cây đoạn toàn năng: Cập nhật điểm, truy vấn đoạn, và cập nhật cả một đoạn với kỹ thuật trì hoãn trong O(log N).",
        difficulty: "Medium",
        prerequisites: ["fenwick-tree"],
        objectives: [
          "Hiểu cách chia đôi đoạn liên tục thành cây nhị phân đầy đủ kích thước 4N.",
          "Cài đặt các hàm build, update và query linh hoạt cho mọi phép toán kết hợp.",
          "Làm chủ kỹ thuật Lazy Propagation (gắn thẻ lười) để cập nhật đoạn O(log N)."
        ],
        fact: "Mọi Segment Tree đều có thể mở rộng để hỗ trợ lưu trữ trạng thái lịch sử theo thời gian gọi là Persistent Segment Tree.",
        blogSlug: "2025-12-24-segment-tree",
        blogTitle: "Cây phân đoạn (Segment Tree) và kỹ thuật Cập nhật lười (Lazy Propagation)",
        status: "completed",
        problems: [
          { id: "201", title: "Cập nhật điểm, truy vấn tổng", url: "https://marisaoj.com/problem/201", platform: "MarisaOJ" },
          { id: "204", title: "Cập nhật đoạn, truy vấn nhỏ nhất", url: "https://marisaoj.com/problem/204", platform: "MarisaOJ" },
          { id: "1648", title: "Dynamic Range Sum Queries", url: "https://cses.fi/problemset/task/1648", platform: "CSES" },
          { id: "339D", title: "Xenia and Bit Operations", url: "https://codeforces.com/problemset/problem/339/D", platform: "Codeforces" }
        ]
      },
      {
        id: "sqrt-decomp-mo",
        title: "Sqrt Decomposition & Mo's Algorithm",
        description: "Phân rã mảng thành các khối căn bậc hai và thuật toán Mo sắp xếp truy vấn offline thần tốc.",
        difficulty: "Hard",
        prerequisites: ["segment-tree"],
        objectives: [
          "Hiểu nguyên lý chia mảng thành sqrt(N) khối kích thước sqrt(N).",
          "Sắp xếp các truy vấn offline theo khối L và chỉ số R.",
          "Cài đặt thuật toán Mo giải bài toán đếm số phần tử phân biệt trên đoạn trong O((N + Q) * sqrt(N))."
        ],
        fact: "Bằng cách sắp xếp các truy vấn theo thứ tự Hilbert curve thay vì sắp xếp khối thông thường, hằng số thời gian của thuật toán Mo có thể giảm thêm tới 30%.",
        blogSlug: "2026-01-08-sqrt-decomposition-mo-algorithm",
        blogTitle: "Phân rã căn bậc hai (Sqrt Decomposition) và Thuật toán Mo",
        status: "completed",
        problems: [
          { id: "DQUERY", title: "D-query", url: "http://www.spoj.com/problems/DQUERY/", platform: "SPOJ" },
          { id: "86D", title: "Powerful array", url: "http://codeforces.com/contest/86/problem/D", platform: "Codeforces" }
        ]
      },
      {
        id: "treap",
        title: "Treap & Cartesian Tree",
        description: "Sự kết hợp hoàn hảo giữa Cây tìm kiếm nhị phân (BST) và Heap ngẫu nhiên hóa, hỗ trợ cắt và ghép cây.",
        difficulty: "Hard",
        prerequisites: ["segment-tree"],
        objectives: [
          "Hiểu cơ chế duy trì tính chất BST trên khóa và tính chất Heap trên độ ưu tiên ngẫu nhiên.",
          "Cài đặt hai thao tác cốt lõi: split (cắt cây) và merge (ghép cây).",
          "Sử dụng Implicit Treap để thực hiện đảo ngược đoạn con trong O(log N)."
        ],
        fact: "Cái tên Treap được ghép từ Tree và Heap; nhờ độ ưu tiên được gán ngẫu nhiên, chiều cao kỳ vọng của Treap luôn là O(log N) với xác suất cực cao.",
        blogSlug: "2026-01-22-treap-cartesian-tree",
        blogTitle: "Cây Treap (Cartesian Tree): Sự kết hợp hoàn hảo giữa BST và Heap",
        status: "completed",
        problems: [
          { id: "863D", title: "Almost Permutation", url: "https://codeforces.com/contest/863/problem/D", platform: "Codeforces" }
        ]
      }
    ]
  },
  {
    id: 7,
    slug: "advanced-topics",
    title: "Stage 7 — Advanced Topics",
    subtitle: "Xâu chuỗi, Cây, Hình học & Heuristic",
    description: "Những vũ khí hạng nặng đỉnh cao: Thuật toán xâu, Hình học tính toán, Heuristic, Lý thuyết số và Đại số tuyến tính.",
    nodes: [
      {
        id: "string-hashing",
        title: "Băm chuỗi đa thức (String Hashing)",
        description: "Chuyển chuỗi ký tự thành số nguyên lớn để so sánh hai xâu con bất kỳ trong O(1).",
        difficulty: "Medium",
        prerequisites: ["time-complexity"],
        objectives: [
          "Xây dựng hàm băm đa thức cuộn (Polynomial Rolling Hash).",
          "Cài đặt Double Hash (băm kép modulo 10^9+7 và 10^9+9) để triệt tiêu hoàn toàn nguy cơ va chạm băm.",
          "Tìm kiếm xâu con và so sánh xâu con trong O(1)."
        ],
        fact: "Theo Nghịch lý Ngày sinh (Birthday Paradox), nếu chỉ dùng 1 modulo 10^9+7, xác suất xảy ra va chạm băm sẽ vượt quá 50% sau khi băm khoảng 40.000 xâu phân biệt!",
        blogSlug: "2026-08-10-string-hashing-polynomial-rolling-hash",
        blogTitle: "Băm chuỗi (String Hashing) và Thuật toán Rolling Hash đa thức",
        status: "completed",
        problems: [
          { id: "1753", title: "String Matching", url: "https://cses.fi/problemset/task/1753", platform: "CSES" },
          { id: "271D", title: "Good Substrings", url: "https://codeforces.com/contest/271/problem/D", platform: "Codeforces" }
        ]
      },
      {
        id: "kmp-z-algo",
        title: "Thuật toán KMP & Z-Function",
        description: "Khớp chuỗi mẫu trong thời gian tuyến tính O(N + M) mà không cần băm hay phụ thuộc vào xác suất.",
        difficulty: "Hard",
        prerequisites: ["string-hashing"],
        objectives: [
          "Hiểu hàm tiền tố (Prefix Function pi) của KMP.",
          "Cài đặt thuật toán Z-box và mảng Z trong O(N).",
          "Ứng dụng tìm chu kỳ ngắn nhất của xâu và đếm số lần xuất hiện của tiền tố."
        ],
        fact: "Cả KMP và Z-function đều đảm bảo thời gian chạy tuyến tính tuyệt đối O(N) mà không hề có bất kỳ rủi ro nào về va chạm băm hay hằng số nhân lớn.",
        blogSlug: "2026-09-02-prefix-function-kmp-algorithm",
        blogTitle: "Hàm tiền tố (Prefix function) và Thuật toán Knuth-Morris-Pratt (KMP)",
        status: "completed",
        problems: [
          { id: "NHAY", title: "Needle in the Haystack", url: "http://www.spoj.com/problems/NHAY/", platform: "SPOJ" },
          { id: "126B", title: "Password", url: "http://codeforces.com/contest/126/problem/B", platform: "Codeforces" }
        ]
      },
      {
        id: "trie",
        title: "Cây tiền tố (Trie) & Bitwise Trie",
        description: "Tra cứu từ điển siêu tốc trong O(|S|) và ứng dụng Bitwise Trie tìm cặp XOR lớn nhất trong O(30N).",
        difficulty: "Medium",
        prerequisites: ["cpp-stl"],
        objectives: [
          "Xây dựng cây Trie lưu trữ từ điển chữ cái trong O(|S|).",
          "Áp dụng Bitwise Trie trên các bit nhị phân để giải bài toán XOR tối đa.",
          "Kết hợp Trie với Quy hoạch động để ghép từ."
        ],
        fact: "Bằng cách biểu diễn số nguyên dưới dạng chuỗi 30 bit, Bitwise Trie biến bài toán tìm XOR cực trị từ O(N^2) thành bài toán duyệt cây tham lam O(30N).",
        blogSlug: "2026-09-22-trie-prefix-tree",
        blogTitle: "Cây tiền tố (Trie): Từ tra cứu từ điển siêu tốc đến phép thuật tìm XOR lớn nhất",
        status: "completed",
        problems: [
          { id: "1731", title: "Word Combinations", url: "https://cses.fi/problemset/task/1731", platform: "CSES" },
          { id: "706D", title: "Vasiliy's Multiset", url: "https://codeforces.com/problemset/problem/706/D", platform: "Codeforces" }
        ]
      },
      {
        id: "tree-lca",
        title: "Tổ tiên chung (LCA) & Binary Lifting",
        description: "Tiền xử lý O(N log N) bằng bảng nhảy nhị phân để tìm LCA và tính khoảng cách trên cây trong O(log N).",
        difficulty: "Medium",
        prerequisites: ["graph-traversal"],
        objectives: [
          "Xây dựng bảng up[u][i] = up[up[u][i-1]][i-1] bằng lũy thừa của 2.",
          "Cài đặt thuật toán tìm LCA trong O(log N).",
          "Tính khoảng cách giữa hai đỉnh dist(u, v) = depth[u] + depth[v] - 2*depth[lca]."
        ],
        fact: "Binary Lifting hoạt động tương tự như việc phân tích một số thành nhị phân: thay vì leo từng bậc, ta thực hiện các bước nhảy kích thước 2^k để chạm tới đích trong tối đa 19 bước.",
        blogSlug: "2025-07-28-lowest-common-ancestor-binary-lifting",
        blogTitle: "Tổ tiên chung gần nhất (LCA) và Kỹ thuật Nhảy nhị phân (Binary Lifting) trên cây",
        status: "completed",
        problems: [
          { id: "1687", title: "Company Queries I", url: "https://cses.fi/problemset/task/1687", platform: "CSES" },
          { id: "1688", title: "Company Queries II", url: "https://cses.fi/problemset/task/1688", platform: "CSES" }
        ]
      },
      {
        id: "computational-geometry",
        title: "Hình học tính toán & Bao lồi (Convex Hull)",
        description: "Từ Vector, Tích có hướng (Cross Product), kiểm tra hướng rẽ CCW, công thức dây giày đến Bao lồi Andrew's Monotone Chain O(N log N).",
        difficulty: "Hard",
        prerequisites: ["time-complexity"],
        objectives: [
          "Sử dụng số nguyên long long để tránh hoàn toàn sai số dấu phẩy động (Precision Error).",
          "Áp dụng Tích có hướng 2D kiểm tra hướng rẽ trái/phải và tính diện tích đa giác bằng công thức dây giày.",
          "Cài đặt thuật toán Andrew's Monotone Chain dựng bao lồi trong O(N log N)."
        ],
        fact: "Tích có hướng 2D giữa hai vector thực chất là định thức ma trận 2x2, mang dấu dương nếu rẽ trái (CCW), dấu âm nếu rẽ phải (CW) và bằng 0 nếu 3 điểm thẳng hàng.",
        blogSlug: "2026-07-20-computational-geometry-convex-hull",
        blogTitle: "Hình học tính toán: Từ Vector, Tích có hướng (Cross Product) đến Bao lồi (Convex Hull)",
        status: "completed",
        problems: [
          { id: "2189", title: "Point Location Test", url: "https://cses.fi/problemset/task/2189", platform: "CSES" },
          { id: "2195", title: "Convex Hull", url: "https://cses.fi/problemset/task/2195", platform: "CSES" }
        ]
      },
      {
        id: "simulated-annealing",
        title: "Thuật toán Heuristic & Luyện kim mô phỏng",
        description: "Thuật toán ngẫu nhiên hóa Simulated Annealing (SA) giải các bài toán tối ưu NP-Hard, vượt qua bẫy cực tiểu cục bộ bằng xác suất Metropolis.",
        difficulty: "Advanced",
        prerequisites: ["time-complexity"],
        objectives: [
          "Hiểu nguyên lý vật lý của việc làm nguội kim loại từ từ để đạt mức năng lượng thấp nhất.",
          "Áp dụng tiêu chuẩn Metropolis chấp nhận nghiệm xấu hơn với xác suất P = exp(-delta / T).",
          "Sử dụng clock() để vắt kiệt 0.95 giây Time Limit trong phòng thi."
        ],
        fact: "Simulated Annealing là vũ khí bí mật giúp các cao thủ giành huy chương trong các kỳ thi Marathon Contests và AtCoder Heuristic Contest khi bài toán không thể giải tối ưu bằng đa thức.",
        blogSlug: "2026-06-25-simulated-annealing-heuristics",
        blogTitle: "Thuật toán Heuristic và Luyện kim mô phỏng (Simulated Annealing): Vũ khí 'cứu cánh' cho bài toán NP-Hard",
        status: "advanced",
        problems: []
      },
      {
        id: "suffix-structures",
        title: "Cấu trúc Hậu tố: Suffix Array & SAM",
        description: "Mảng hậu tố O(N log N) và Suffix Automaton (SAM) tuyến tính O(N) — đỉnh cao của xử lý chuỗi.",
        difficulty: "Advanced",
        prerequisites: ["kmp-z-algo"],
        objectives: [
          "Xây dựng Suffix Array và mảng LCP bằng thuật toán Kasai.",
          "Hiểu cấu trúc tự động hữu hạn nén toàn bộ xâu con trong O(N) của SAM.",
          "Đếm số lượng xâu con phân biệt và tìm xâu con chung dài nhất (LCS)."
        ],
        fact: "Suffix Automaton chứa toàn bộ thông tin của tất cả O(N^2) xâu con của một chuỗi độ dài N, nhưng chỉ tốn tối đa 2N đỉnh và 3N cạnh trong O(N) bộ nhớ!",
        blogSlug: "2026-10-16-suffix-automaton-sam",
        blogTitle: "Suffix Automaton (SAM): Cỗ Máy Trạng Thái Tối Thượng Nén Toàn Bộ Xâu Con Trong O(N)",
        status: "advanced",
        problems: [
          { id: "SUBLEX", title: "Lexicographical Substring Search", url: "http://www.spoj.com/problems/SUBLEX/", platform: "SPOJ" },
          { id: "LCS", title: "Longest Common Substring", url: "http://www.spoj.com/problems/LCS/", platform: "SPOJ" }
        ]
      },
      {
        id: "number-theory",
        title: "Lý thuyết Số & Phương trình Diophantine",
        description: "Lũy thừa nhị phân, thuật toán Euclid mở rộng giải ax + by = gcd(a, b) và số Fibonacci siêu tốc.",
        difficulty: "Medium",
        prerequisites: ["time-complexity"],
        objectives: [
          "Cài đặt lũy thừa nhị phân tính a^b mod m trong O(log b).",
          "Áp dụng Extended Euclidean Algorithm tìm nghịch đảo modulo (Modular Inverse).",
          "Tính số Fibonacci thứ 10^18 bằng Fast Doubling hoặc nhân ma trận."
        ],
        fact: "Định lý Bézout khẳng định phương trình ax + by = d có nghiệm nguyên khi và chỉ khi d chia hết cho gcd(a, b).",
        blogSlug: "2026-04-02-extended-euclidean-algorithm",
        blogTitle: "Thuật toán Euclid mở rộng (Extended Euclidean Algorithm) và Định lý Bézout",
        status: "completed",
        problems: [
          { id: "1095", title: "Exponentiation", url: "https://cses.fi/problemset/task/1095", platform: "CSES" },
          { id: "1244C", title: "The Football Season", url: "https://codeforces.com/problemset/problem/1244/C", platform: "Codeforces" }
        ]
      },
      {
        id: "linear-algebra",
        title: "Đại số Tuyến tính & Cơ sở XOR",
        description: "Khử Gauss giải hệ phương trình tuyến tính, tính định thức, hạng ma trận và cơ sở tuyến tính XOR.",
        difficulty: "Hard",
        prerequisites: ["number-theory"],
        objectives: [
          "Cài đặt phương pháp khử Gauss giải hệ n phương trình m ẩn số.",
          "Tính định thức ma trận bằng khử Gauss và phương pháp Crout trong O(N^3).",
          "Ứng dụng Không gian vector trên trường F2 (XOR Basis) để tìm tập con có XOR lớn nhất."
        ],
        fact: "XOR Basis thực chất là phép khử Gauss trên trường nhị phân GF(2), nơi phép cộng chính là phép XOR và phép nhân chính là phép AND.",
        blogSlug: "2026-06-20-gaussian-elimination-linear-systems",
        blogTitle: "Phương pháp khử Gauss giải hệ phương trình tuyến tính",
        status: "advanced",
        problems: [
          { id: "167E", title: "Susets", url: "https://codeforces.com/contest/167/problem/E", platform: "Codeforces" },
          { id: "XMAX", title: "XOR Maximization", url: "http://www.spoj.com/problems/XMAX/", platform: "SPOJ" }
        ]
      }
    ]
  }
];
