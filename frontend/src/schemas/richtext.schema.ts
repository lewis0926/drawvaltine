import { z } from 'zod';

// Lexical rich text JSON structure (simplified)
export const RichTextSchema: z.ZodType<unknown> = z.object({
  root: z.object({
    type: z.string(),
    format: z.union([z.string(), z.number()]),
    indent: z.number(),
    version: z.number(),
    children: z.array(z.unknown()),
    direction: z.string().nullable(),
  }),
}).nullable();

export type RichText = z.infer<typeof RichTextSchema>;
