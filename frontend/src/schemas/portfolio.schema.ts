import { z } from 'zod';
import { ArtworkSchema } from './artwork.schema';

export const PortfolioSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  description: z.string().nullable(),
  artworks: z.array(ArtworkSchema),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
});

export type Portfolio = z.infer<typeof PortfolioSchema>;