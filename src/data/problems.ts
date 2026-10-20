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
        title: "Birthday",
        url: "https://marisaoj.com/problem/76",
        platform: "MarisaOJ",
      },
      {
        id: "78",
        title: "Large subarray",
        url: "https://marisaoj.com/problem/78",
        platform: "MarisaOJ",
      },
    ],
  },
];
