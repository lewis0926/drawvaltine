import { z } from 'zod';
import { MediaSchema } from './media.schema';

export const ArtworkSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  image: MediaSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
});

export type Artwork = z.infer<typeof ArtworkSchema>;
