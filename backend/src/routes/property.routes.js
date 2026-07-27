import { Router } from "express";
import * as propertyController from "../controllers/property.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { createUploader } from "../middleware/upload.middleware.js";
import { expandFormBody } from "../middleware/expandFormBody.middleware.js";
import { CLOUDINARY_FOLDERS, USER_ROLES } from "../constants/index.js";
import {
  createPropertySchema,
  updatePropertySchema,
  propertyQuerySchema,
} from "../validators/property.validator.js";
import { idParamSchema } from "../validators/common.validator.js";

const router = Router();
const uploadPropertyImages = createUploader(CLOUDINARY_FOLDERS.PROPERTIES);

const STAFF_ROLES = [USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN];

// Public routes
router.get("/", validate(propertyQuerySchema), propertyController.getProperties);
router.get("/slug/:slug", propertyController.getPropertyBySlug);

// Protected (admin) routes
router.get(
  "/:id",
  authenticate,
  authorize(...STAFF_ROLES),
  validate(idParamSchema),
  propertyController.getPropertyById
);
router.post(
  "/",
  authenticate,
  authorize(...STAFF_ROLES),
  uploadPropertyImages.array("images", 10),
  expandFormBody,
  validate(createPropertySchema),
  propertyController.createProperty
);
router.patch(
  "/:id",
  authenticate,
  authorize(...STAFF_ROLES),
  uploadPropertyImages.array("images", 10),
  expandFormBody,
  validate(updatePropertySchema),
  propertyController.updateProperty
);
router.delete(
  "/:id",
  authenticate,
  authorize(...STAFF_ROLES),
  validate(idParamSchema),
  propertyController.deleteProperty
);
router.patch(
  "/:id/remove-image",
  authenticate,
  authorize(...STAFF_ROLES),
  validate(idParamSchema),
  propertyController.removePropertyImage
);

export default router;
