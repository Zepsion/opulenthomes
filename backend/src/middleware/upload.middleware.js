import multer from "multer";
import { buildCloudinaryStorage } from "../config/cloudinary.js";
import { ApiError } from "../utils/ApiError.js";

const MAX_FILE_SIZE_MB = 5;

const fileFilter = (_req, file, cb) => {
  const allowed = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
  if (!allowed.includes(file.mimetype)) {
    return cb(ApiError.badRequest("Only JPEG, PNG, and WEBP images are allowed"), false);
  }
  cb(null, true);
};

/**
 * Returns a configured multer instance uploading straight to a
 * Cloudinary subfolder (see constants/CLOUDINARY_FOLDERS).
 *
 * Usage:
 *   const uploadPropertyImages = createUploader(CLOUDINARY_FOLDERS.PROPERTIES);
 *   router.post("/", uploadPropertyImages.array("images", 10), controller.create)
 */
export const createUploader = (subfolder) =>
  multer({
    storage: buildCloudinaryStorage(subfolder),
    fileFilter,
    limits: { fileSize: MAX_FILE_SIZE_MB * 1024 * 1024 },
  });
