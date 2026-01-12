import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  // Get all published content (excluding blog posts to match original)
  const reading = await getCollection("reading", ({ data }) => data.published);
  const photography = await getCollection("photography", ({ data }) => data.published);
  const code = await getCollection("code", ({ data }) => data.published);

  const siteURL = context.site!.toString().replace(/\/$/, "");

  // Combine all items with title prefixes
  const allItems = [
    ...reading.map((post) => ({
      title: `Reading List - ${post.data.title}`,
      pubDate: new Date(post.data.date),
      description: post.data.excerpt || "",
      content: post.data.excerpt || "",
      link: `${siteURL}/reading/${post.id}`,
      author: "tywayne@fastmail.com (Ty Carlson)",
    })),
    ...photography.map((post) => ({
      title: `Photography - ${post.data.title}`,
      pubDate: new Date(post.data.date),
      description: post.data.excerpt || "",
      content: post.data.excerpt || "",
      link: `${siteURL}/photography/${post.id}`,
      author: "tywayne@fastmail.com (Ty Carlson)",
    })),
    ...code.map((post) => ({
      title: `Code - ${post.data.title}`,
      pubDate: new Date(post.data.date),
      description: post.data.excerpt || "",
      content: post.data.excerpt || "",
      link: `${siteURL}/code/${post.id}`,
      author: "tywayne@fastmail.com (Ty Carlson)",
    })),
  ];

  // Sort by date descending
  allItems.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  const date = new Date();

  return rss({
    title: "Ty Carlson",
    description: "",
    site: context.site!,
    items: allItems,
    customData: `<lastBuildDate>${date.toUTCString()}</lastBuildDate>
<generator>https://github.com/jpmonette/feed</generator>
<copyright>All rights reserved ${date.getFullYear()}, Ty Carlson</copyright>`,
  });
}
