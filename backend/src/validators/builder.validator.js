import { z } from "zod";
import { objectIdSchema } from "./common.validator.js";

export const createBuilderSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2).max(150),
    description: z.string().trim().optional(),
    establishedYear: z.coerce.number().optional(),
    headquarters: z.string().trim().optional(),
    website: z.string().trim().url().optional().or(z.literal("")),
    contactEmail: z.string().trim().email().optional().or(z.literal("")),
    contactPhone: z.string().trim().optional(),
    isFeatured: z.coerce.boolean().optional(),
  }),
});

export const updateBuilderSchema = z.object({
  body: createBuilderSchema.shape.body.partial(),
  params: z.object({ id: objectIdSchema }),
});
