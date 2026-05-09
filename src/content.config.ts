import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: z.object({
    title:  z.string(),
    date:   z.string(),
    read:   z.string(),
    cat:    z.enum(['writeup', 'research', 'tooling', 'notes']),
    accent: z.enum(['mauve', 'blue', 'peach', 'green', 'teal', 'yellow', 'red']),
    draft:  z.boolean().default(false),
  }),
});

const writeups = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/writeups' }),
  schema: z.object({
    title:     z.string(),
    date:      z.string(),
    read:      z.string(),
    src:       z.string(),
    cat:       z.enum(['htb', 'ctf', 'pro', 'rt']),
    catLabel:  z.string(),
    diff:      z.enum(['easy', 'med', 'hard', 'insane']),
    diffLabel: z.string(),
    pts:       z.number().nullable().default(null),
    accent:    z.enum(['mauve', 'blue', 'peach', 'green', 'teal', 'yellow', 'red']),
    tags:      z.array(z.string()),
    tldr:      z.object({ entry: z.string(), piv: z.string(), goal: z.string() }),
    draft:     z.boolean().default(false),
  }),
});

export const collections = { posts, writeups };
