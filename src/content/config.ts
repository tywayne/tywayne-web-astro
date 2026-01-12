import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.string(),
    categories: z.string().optional(),
    published: z.boolean().default(false),
    author: z.string().optional(),
    excerpt: z.string().optional(),
    twitter_card: z.string().optional(),
  }),
});

const reading = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.string(),
    published: z.boolean().default(false),
    excerpt: z.string().optional(),
    book_count: z.number(),
    goal: z.number(),
    twitter_card: z.string().optional(),
  }),
});

const photography = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.string(),
    published: z.boolean().default(false),
    excerpt: z.string().optional(),
    img_dir: z.string(),
    cover_img: z.string(),
  }),
});

const code = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.string(),
    published: z.boolean().default(false),
    excerpt: z.string().optional(),
    archived: z.boolean().default(false),
    link: z.string(),
    twitter_card: z.string().optional(),
  }),
});

export const collections = {
  posts,
  reading,
  photography,
  code,
};
