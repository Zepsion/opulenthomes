import { z } from "zod";
import { USER_ROLES } from "../constants/index.js";
import { objectIdSchema } from "./common.validator.js";

export const createStaffUserSchema = z.object({
  body: z.object({
    name: z.string().trim().min(2).max(100),
    email: z.string().trim().email(),
    password: z.string().min(8),
    phone: z.string().trim().optional(),
    role: z.enum(
      Object.values(USER_ROLES).filter((role) => role !== USER_ROLES.SUPER_ADMIN)
    ),
  }),
});

export const updateUserStatusSchema = z.object({
  body: z.object({ isActive: z.coerce.boolean() }),
  params: z.object({ id: objectIdSchema }),
});

export const updateUserRoleSchema = z.object({
  body: z.object({
    role: z.enum(Object.values(USER_ROLES).filter((role) => role !== USER_ROLES.SUPER_ADMIN)),
  }),
  params: z.object({ id: objectIdSchema }),
});
