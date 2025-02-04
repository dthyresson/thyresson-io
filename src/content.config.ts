import { file, glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const airports = defineCollection({
  loader: file("src/content/airports/airports.json"),
  schema: z.object({
    url: z.string(),
    id: z.string(),
  }),
});

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
  }),
});

const experiments = defineCollection({
  loader: file("src/content/experiments/experiments.json"),
  schema: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    url: z.string(),
    tags: z.array(z.string()),
  }),
});

export const collections = { airports, blog, experiments };
