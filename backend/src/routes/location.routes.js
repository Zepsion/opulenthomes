import { Router } from "express";
import * as locationController from "../controllers/location.controller.js";
import { authenticate, authorize } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { createUploader } from "../middleware/upload.middleware.js";
import { expandFormBody } from "../middleware/expandFormBody.middleware.js";
import { CLOUDINARY_FOLDERS, USER_ROLES } from "../constants/index.js";
import { createLocationSchema, updateLocationSchema } from "../validators/location.validator.js";
import { idParamSchema } from "../validators/common.validator.js";

const router = Router();
const uploadCoverImage = createUploader(CLOUDINARY_FOLDERS.LOCATIONS);
const STAFF_ROLES = [USER_ROLES.ADMIN, USER_ROLES.SUPER_ADMIN];

router.get("/", locationController.getLocations);
router.get("/slug/:slug", locationController.getLocationBySlug);

router.post(
  "/",
  authenticate,
  authorize(...STAFF_ROLES),
  uploadCoverImage.single("coverImage"),
  expandFormBody,
  validate(createLocationSchema),
  locationController.createLocation
);
router.patch(
  "/:id",
  authenticate,
  authorize(...STAFF_ROLES),
  uploadCoverImage.single("coverImage"),
  expandFormBody,
  validate(updateLocationSchema),
  locationController.updateLocation
);
router.delete(
  "/:id",
  authenticate,
  authorize(...STAFF_ROLES),
  validate(idParamSchema),
  locationController.deleteLocation
);

export default router;
