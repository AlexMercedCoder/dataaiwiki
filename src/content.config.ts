import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const wiki = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/wiki' }),
  schema: z.object({
    title: z.string(),
    sourceFile: z.string().optional(),
    slug: z.string().optional(),
    updatedFromWiki: z.boolean().optional(),
  }),
});

export const collections = { wiki };
