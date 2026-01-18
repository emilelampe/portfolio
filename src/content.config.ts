import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const films = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/films' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    youtubeId: z.string(),
    thumbnail: z.string(),
    order: z.number(),
  }),
});

const albums = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/albums' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      cover: image(),
      order: z.number(),
      photos: z.array(
        z.object({
          src: image(),
          date: z.string(),
          caption: z.string(),
        })
      ),
    }),
});

const stills = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/stills' }),
  schema: z.object({
    filmSlug: z.string(),
    images: z.array(z.string()),
  }),
});

export const collections = { films, albums, stills };
