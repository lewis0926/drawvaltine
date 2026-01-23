import { z } from 'zod';

export const MediaSchema = z.object({
  id: z.union([z.number(), z.string()]),
  alt: z.string().nullable().optional(),
  filename: z.string(),
  mimeType: z.string(),
  filesize: z.number(),
  width: z.number().nullable().optional(),
  height: z.number().nullable().optional(),
  url: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Media = z.infer<typeof MediaSchema>;
