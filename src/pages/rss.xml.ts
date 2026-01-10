import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  // Get all published content
  const posts = await getCollection('posts', ({ data }) => data.published);
  const reading = await getCollection('reading', ({ data }) => data.published);
  const photography = await getCollection('photography', ({ data }) => data.published);
  const code = await getCollection('code', ({ data }) => data.published);

  // Combine all items
  const allItems = [
    ...posts.map((post) => ({
      title: post.data.title,
      pubDate: new Date(post.data.date),
      description: post.data.excerpt || '',
      link: `/blog/${post.slug}/`,
    })),
    ...reading.map((post) => ({
      title: `Reading List - ${post.data.title}`,
      pubDate: new Date(post.data.date),
      description: post.data.excerpt || '',
      link: `/reading/${post.slug}/`,
    })),
    ...photography.map((post) => ({
      title: `Photography - ${post.data.title}`,
      pubDate: new Date(post.data.date),
      description: post.data.excerpt || '',
      link: `/photography/${post.slug}/`,
    })),
    ...code.map((post) => ({
      title: `Code - ${post.data.title}`,
      pubDate: new Date(post.data.date),
      description: post.data.excerpt || '',
      link: `/code/${post.slug}/`,
    })),
  ];

  // Sort by date descending
  allItems.sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  return rss({
    title: 'Ty Carlson',
    description: 'Personal website of Ty Carlson - reading, photography, code, and more.',
    site: context.site!,
    items: allItems,
    customData: `<language>en-us</language>`,
  });
}
