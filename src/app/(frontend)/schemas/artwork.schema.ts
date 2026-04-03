import { z } from 'zod'
import { MediaSchema } from './media.schema'

export const ArtworkSchema = z.object({
  id: z.union([z.number(), z.string()]),
  title: z.string(),
  description: z.string().nullable().optional(),
  image: MediaSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type Artwork = z.infer<typeof ArtworkSchema>
