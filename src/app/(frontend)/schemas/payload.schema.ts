import { z } from 'zod'

export const PayloadCollectionResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    docs: z.array(itemSchema),
    totalDocs: z.number(),
    limit: z.number(),
    page: z.number(),
    totalPages: z.number(),
    hasNextPage: z.boolean(),
    hasPrevPage: z.boolean(),
    nextPage: z.number().nullable(),
    prevPage: z.number().nullable(),
  })
