import { getCollection } from "astro:content";
import { sortPosts } from "../utils/sortPosts";

export async function GET() {
  const posts = await getCollection("blog");
  const sortedPosts = posts.sort(sortPosts);
  const searchList = sortedPosts.map((post) => ({
    id: post.id,
    data: {
      title: post.data.title,
      description: post.data.description,
      keywords: post.data.keywords,
      pubDate: post.data.pubDate,
    },
  }));

  return new Response(JSON.stringify(searchList), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}
