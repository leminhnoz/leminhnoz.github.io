import type { CollectionEntry } from "astro:content";

type Post = CollectionEntry<"blog">;

function demenBlogNumber(post: Post): number | null {
  if (!post.data.tags?.includes("DeMen Blog")) return null;

  const match = /^DeMen Blog #(\d+)\b/i.exec(post.data.title);
  return match ? Number(match[1]) : null;
}

export function sortDemenBlogPosts(a: Post, b: Post): number {
  const aNumber = demenBlogNumber(a);
  const bNumber = demenBlogNumber(b);
  if (aNumber !== null && bNumber !== null) return aNumber - bNumber;
  return sortPosts(a, b);
}

export function sortPosts(a: Post, b: Post): number {
  const dateDifference = b.data.pubDate.getTime() - a.data.pubDate.getTime();
  if (dateDifference !== 0) return dateDifference;

  const aNumber = demenBlogNumber(a);
  const bNumber = demenBlogNumber(b);
  if (aNumber !== null && bNumber !== null) return aNumber - bNumber;
  if (aNumber !== null) return -1;
  if (bNumber !== null) return 1;

  return a.id.localeCompare(b.id);
}
