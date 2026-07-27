import { z } from "zod";
import mongoose from "mongoose";

/** Reusable Zod refinement for validating Mongo ObjectIds in params/body. */
export const objectIdSchema = z
  .string()
  .refine((val) => mongoose.Types.ObjectId.isValid(val), { message: "Invalid ID format" });

export const idParamSchema = z.object({
  params: z.object({ id: objectIdSchema }),
});
