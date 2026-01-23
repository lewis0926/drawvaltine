import { z } from 'zod';
import { RichTextSchema } from './richtext.schema';

export const PortfolioSchema = z.object({
  title: z.string(),
  subtitle: z.string().nullable().optional(),
  content: RichTextSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Portfolio = z.infer<typeof PortfolioSchema>;
