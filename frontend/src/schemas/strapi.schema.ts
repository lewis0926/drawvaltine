import { z } from 'zod';

export const StrapiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    data: dataSchema,
    meta: z.object({}).passthrough(),
  });