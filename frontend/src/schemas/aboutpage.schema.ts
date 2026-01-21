import { z } from 'zod';
import { MediaSchema } from './media.schema';

export const AboutPageSchema = z.object({
  id: z.number(),
  documentId: z.string(),
  title: z.string(),
  subtitle: z.string().nullable(),
  body: z.string().nullable(),
  profilePic: MediaSchema.nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
  publishedAt: z.string(),
});

export type AboutPage = z.infer<typeof AboutPageSchema>;
