import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const kb = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/kb' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    /**
     * agentic:   what an agent doing analytics actually is and needs
     * stack:     the three layers of the agentic stack
     * substrate: the open lakehouse pieces underneath
     * practice:  running this in an enterprise
     */
    kind: z.enum(['agentic', 'stack', 'substrate', 'practice']),
    order: z.number(),
    keywords: z.array(z.string()).default([]),
    sources: z
      .array(z.object({ label: z.string(), url: z.string(), note: z.string().optional() }))
      .default([]),
    related: z.array(z.string()).default([]),
    apacheProject: z.boolean().default(false),
  }),
});

export const collections = { kb };
