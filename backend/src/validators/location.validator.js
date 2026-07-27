import { z } from "zod";
import { objectIdSchema } from "./common.validator.js";

export const createLocationSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2).max(150),
    city: z.string().trim().min(2),
    state: z.string().trim().min(2),
    country: z.string().trim().optional(),
    pincode: z.string().trim().optional(),
    coordinates: z
      .object({
        lat: z.coerce.number().optional(),
        lng: z.coerce.number().optional(),
      })
      .optional(),
    isFeatured: z.coerce.boolean().optional(),
  }),
});

export const updateLocationSchema = z.object({
  body: createLocationSchema.shape.body.partial(),
  params: z.object({ id: objectIdSchema }),
});
