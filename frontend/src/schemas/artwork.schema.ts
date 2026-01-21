import { z } from 'zod';
import { MediaSchema } from './media.schema';

export const ArtworkSchema = z.object({
  id: z.number(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  image: z.array(MediaSchema),
});

export type Artwork = z.infer<typeof ArtworkSchema>;