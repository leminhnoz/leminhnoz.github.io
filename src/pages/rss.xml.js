import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

import { SITE } from "../utils/config";
import { urlFor } from "../utils/urlFor";
import { sortPosts } from "../utils/sortPosts";

export async function GET(context) {
  const posts = await getCollection("blog");
  const sortedPosts = posts.sort(sortPosts);
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site,
    items: sortedPosts.map((post) => ({
      ...post.data,
      link: urlFor(`blog/${post.id}/`),
    })),
  });
}
