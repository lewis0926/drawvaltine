import { z } from 'zod'

export const ImageFormatSchema = z.object({
  url: z.string(),
  width: z.number(),
  height: z.number(),
})

export const ImageSchema = z.object({
  id: z.number(),
  url: z.string(),
  alternativeText: z.string().nullable(),
  width: z.number(),
  height: z.number(),
  formats: z.object({
    thumbnail: ImageFormatSchema.optional(),
    small: ImageFormatSchema.optional(),
    medium: ImageFormatSchema.optional(),
    large: ImageFormatSchema.optional(),
  }).nullable(),
})

export const ArtworkSchema = z.object({
  id: z.number(),
  title: z.string(),
  description: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  image: ImageSchema.nullable(),
})

export const ArtworkListResponseSchema = z.object({
  data: z.array(ArtworkSchema),
  meta: z.object({
    pagination: z.object({
      page: z.number(),
      pageSize: z.number(),
      pageCount: z.number(),
      total: z.number(),
    }),
  }),
})

export const ArtworkResponseSchema = z.object({
  data: ArtworkSchema,
})

export type Image = z.infer<typeof ImageSchema>
export type Artwork = z.infer<typeof ArtworkSchema>
export type ArtworkListResponse = z.infer<typeof ArtworkListResponseSchema>
export type ArtworkResponse = z.infer<typeof ArtworkResponseSchema>
