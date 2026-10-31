import type { CollectionEntry } from "astro:content";

export function isPureMathPost(post: CollectionEntry<"blog"> | { id?: string; slug?: string; data: { categories?: string[]; tags?: string[]; title?: string } }): boolean {
  const slug = (post.slug || post.id || "").toLowerCase();
  const cats = (post.data.categories || []).map((c: string) => c.toLowerCase());
  const tags = (post.data.tags || []).map((t: string) => t.toLowerCase());

  // Strictly eliminate Competitive Programming / C++ / Algorithm posts
  const isCP =
    cats.some(c => c.includes("competitive") || c.includes("programming") || c.includes("thuật toán") || c.includes("c++")) ||
    tags.some(t => t.includes("competitive programming") || t === "c++" || t === "icpc" || t === "codeforces" || t === "cses" || t === "algorithm" || t === "thuật toán");
  if (isCP) return false;

  // Pure Olympiad Math identifiers
  return (
    slug.includes("olympiad") ||
    cats.some(c => c.includes("toán học") || c.includes("olympic") || c.includes("math")) ||
    tags.some(t => t === "toán học" || t === "olympic" || t === "imo" || t === "vmo" || t === "usamo")
  );
}
