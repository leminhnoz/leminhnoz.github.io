export interface ProblemItem {
  id: string;
  title: string;
  url: string;
  platform?: string;
  difficulty?: string;
  notes?: string;
}

export interface ProblemCategory {
  name: string;
  slug: string;
  description?: string;
  problems: ProblemItem[];
}

export const problemCategories: ProblemCategory[] = [
  {
    name: "Binary Search",
    slug: "binary-search",
    description: "Các bài toán rèn luyện kỹ thuật tìm kiếm nhị phân trên mảng và tìm kiếm nhị phân trên tập kết quả.",
    problems: [
      {
        id: "76",
        title: "Tìm kiếm nhị phân 2",
        url: "https://marisaoj.com/problem/76",
        platform: "MarisaOJ",
      },
      {
        id: "78",
        title: "Mảng con lớn",
        url: "https://marisaoj.com/problem/78",
        platform: "MarisaOJ",
      },
      {
        id: "79",
        title: "Truy vấn đếm",
        url: "https://marisaoj.com/problem/79",
        platform: "MarisaOJ",
      },
      {
        id: "80",
        title: "Đếm cặp",
        url: "https://marisaoj.com/problem/80",
        platform: "MarisaOJ",
      },
      {
        id: "81",
        title: "Viên kẹo thứ k",
        url: "https://marisaoj.com/problem/81",
        platform: "MarisaOJ",
      },

      {
        id: "85",
        title: "Cạnh tam giác",
        url: "https://marisaoj.com/problem/85",
        platform: "MarisaOJ",
      },

      {
        id: "637",
        title: "Đoạn con",
        url: "https://marisaoj.com/problem/637",
        platform: "MarisaOJ",
      },
    ],
  },

  {
    name: "Segment Tree",
    slug: "segment-tree",
    description: "Các bài toán cập nhật điểm, cập nhật đoạn và truy vấn trên đoạn.",
    problems: [
      {
        id: "201",
        title: "Cập nhật điểm, truy vấn tổng",
        url: "https://marisaoj.com/problem/201",
        platform: "MarisaOJ",
      },
      {
        id: "202",
        title: "Cập nhật điểm, truy vấn nhỏ nhất",
        url: "https://marisaoj.com/problem/202",
        platform: "MarisaOJ",
      },
      {
        id: "203",
        title: "Cập nhật đoạn, truy vấn tổng",
        url: "https://marisaoj.com/problem/203",
        platform: "MarisaOJ",
      },
      {
        id: "204",
        title: "Cập nhật đoạn, truy vấn nhỏ nhất",
        url: "https://marisaoj.com/problem/204",
        platform: "MarisaOJ",
      },
      {
        id: "205",
        title: "Hái táo",
        url: "https://marisaoj.com/problem/205",
        platform: "MarisaOJ",
      },
      {
        id: "207",
        title: "Mảng con không âm",
        url: "https://marisaoj.com/problem/207",
        platform: "MarisaOJ",
      },
    ],
  },

];
