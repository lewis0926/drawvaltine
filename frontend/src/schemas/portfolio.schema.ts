import { z } from 'zod';

export const PortfolioSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  body: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
});

export type Portfolio = z.infer<typeof PortfolioSchema>;
