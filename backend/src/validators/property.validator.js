import { z } from "zod";
import { PROPERTY_TYPE, LISTING_TYPE, PROPERTY_STATUS } from "../constants/index.js";
import { objectIdSchema } from "./common.validator.js";

export const createPropertySchema = z.object({
  body: z.object({
    title: z.string().trim().min(3).max(150),
    description: z.string().trim().min(10),
    propertyType: z.enum(Object.values(PROPERTY_TYPE)),
    listingType: z.enum(Object.values(LISTING_TYPE)),
    status: z.enum(Object.values(PROPERTY_STATUS)).optional(),
    price: z.object({
      amount: z.coerce.number().min(0),
      currency: z.string().optional(),
      priceOnRequest: z.coerce.boolean().optional(),
    }),
    area: z.object({
      value: z.coerce.number().positive(),
      unit: z.enum(["sqft", "sqm", "acres"]).optional(),
    }),
    bedrooms: z.coerce.number().min(0).optional(),
    bathrooms: z.coerce.number().min(0).optional(),
    parkingSpaces: z.coerce.number().min(0).optional(),
    floors: z.coerce.number().min(0).optional(),
    amenities: z.array(z.string()).optional(),
    location: objectIdSchema,
    builder: objectIdSchema.optional(),
    isFeatured: z.coerce.boolean().optional(),
  }),
});

export const updatePropertySchema = z.object({
  body: createPropertySchema.shape.body.partial(),
  params: z.object({ id: objectIdSchema }),
});

export const propertyQuerySchema = z.object({
  query: z.object({
    page: z.string().optional(),
    limit: z.string().optional(),
    propertyType: z.string().optional(),
    listingType: z.string().optional(),
    status: z.string().optional(),
    location: z.string().optional(),
    builder: z.string().optional(),
    minPrice: z.string().optional(),
    maxPrice: z.string().optional(),
    search: z.string().optional(),
    sort: z.string().optional(),
  }),
});
