import { z } from "zod";
import { LEAD_STATUS, LEAD_SOURCE } from "../constants/index.js";
import { objectIdSchema } from "./common.validator.js";

export const createLeadSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2).max(100),
    email: z.string().trim().email(),
    phone: z.string().trim().min(7),
    message: z.string().trim().optional(),
    property: objectIdSchema.optional(),
    source: z.enum(Object.values(LEAD_SOURCE)).optional(),
  }),
});

export const updateLeadStatusSchema = z.object({
  body: z.object({
    status: z.enum(Object.values(LEAD_STATUS)),
  }),
  params: z.object({ id: objectIdSchema }),
});

export const addLeadNoteSchema = z.object({
  body: z.object({
    text: z.string().trim().min(1),
  }),
  params: z.object({ id: objectIdSchema }),
});
