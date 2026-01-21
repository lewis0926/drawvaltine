import { z } from 'zod';

export const MediaFormatSchema = z.object({
  name: z.string(),
  hash: z.string(),
  ext: z.string(),
  mime: z.string(),
  width: z.number(),
  height: z.number(),
  size: z.number(),
  url: z.string(),
});

export const MediaSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  name: z.string(),
  alternativeText: z.string().nullable(),
  caption: z.string().nullable(),
  width: z.number(),
  height: z.number(),
  formats: z.object({
    thumbnail: MediaFormatSchema.optional(),
    small: MediaFormatSchema.optional(),
    medium: MediaFormatSchema.optional(),
    large: MediaFormatSchema.optional(),
  }).nullable(),
  hash: z.string(),
  ext: z.string(),
  mime: z.string(),
  size: z.number(),
  url: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const ArtworkSchema = z.object({
  id: z.number(),
  title: z.string().nullable(),
  description: z.string().nullable(),
  image: z.array(MediaSchema),
});

export const PortfolioSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  description: z.string().nullable(),
  artworks: z.array(ArtworkSchema),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
});

export const StrapiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: dataSchema,
    meta: z.object({}).passthrough(),
  });

export type Media = z.infer<typeof MediaSchema>;
export type Artwork = z.infer<typeof ArtworkSchema>;
export type Portfolio = z.infer<typeof PortfolioSchema>;