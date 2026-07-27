import { Router } from "express";
import * as userController from "../controllers/user.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { USER_ROLES } from "../constants/index.js";
import {
  createStaffUserSchema,
  updateUserStatusSchema,
  updateUserRoleSchema,
} from "../validators/user.validator.js";
import { idParamSchema } from "../validators/common.validator.js";

const router = Router();

// Staff/user management is restricted to super_admin only.
router.use(authenticate, authorize(USER_ROLES.SUPER_ADMIN));

router.get("/", userController.getUsers);
router.get("/:id", validate(idParamSchema), userController.getUserById);
router.post("/", validate(createStaffUserSchema), userController.createStaffUser);
router.patch("/:id/status", validate(updateUserStatusSchema), userController.updateUserStatus);
router.patch("/:id/role", validate(updateUserRoleSchema), userController.updateUserRole);

export default router;
