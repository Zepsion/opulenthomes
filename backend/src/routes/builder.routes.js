import { Router } from "express";
import * as builderController from "../controllers/builder.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { createUploader } from "../middleware/upload.middleware.js";
import { CLOUDINARY_FOLDERS, USER_ROLES } from "../constants/index.js";
import { createBuilderSchema, updateBuilderSchema } from "../validators/builder.validator.js";
import { idParamSchema } from "../validators/common.validator.js";

const router = Router();
const uploadLogo = createUploader(CLOUDINARY_FOLDERS.BUILDERS);
const STAFF_ROLES = [USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN];

router.get("/", builderController.getBuilders);
router.get("/slug/:slug", builderController.getBuilderBySlug);

router.post(
  "/",
  authenticate,
  authorize(...STAFF_ROLES),
  uploadLogo.single("logo"),
  validate(createBuilderSchema),
  builderController.createBuilder
);
router.patch(
  "/:id",
  authenticate,
  authorize(...STAFF_ROLES),
  uploadLogo.single("logo"),
  validate(updateBuilderSchema),
  builderController.updateBuilder
);
router.delete(
  "/:id",
  authenticate,
  authorize(...STAFF_ROLES),
  validate(idParamSchema),
  builderController.deleteBuilder
);

export default router;
