import { z } from 'zod';
import { MediaSchema } from './media.schema';
import { RichTextSchema } from './richtext.schema';

export const AboutPageSchema = z.object({
  title: z.string(),
  subtitle: z.string().nullable().optional(),
  body: RichTextSchema,
  profileImage: MediaSchema.nullable().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type AboutPage = z.infer<typeof AboutPageSchema>;
