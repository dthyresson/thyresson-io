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
    tags: z.array(z.string()),
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

const factory_records_cassette_colors = defineCollection({
  loader: file("src/content/factory_records/fac_cassette_colors.json"),
  schema: z.object({
    id: z.string(),
    slug: z.string(),
    name: z.string(),
    color: z.string(),
    hexColor: z.string(),
    cassettes: z.array(
      z.object({
        id: z.string(),
        slug: z.string(),
        release: z.string(),
        title: z.string(),
      }),
    ),
  }),
});

export const collections = {
  airports,
  blog,
  experiments,
  factory_records_cassette_colors,
};
