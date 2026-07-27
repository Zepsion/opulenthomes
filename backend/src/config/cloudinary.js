import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { env } from "./env.js";
import { CLOUDINARY_FOLDERS } from "../constants/index.js";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
  secure: true,
});

/**
 * Builds a CloudinaryStorage engine scoped to a specific subfolder,
 * e.g. buildCloudinaryStorage(CLOUDINARY_FOLDERS.PROPERTIES)
 * so Multer uploads land in opulent-homes/properties/...
 */
export const buildCloudinaryStorage = (subfolder = CLOUDINARY_FOLDERS.PROPERTIES) =>
  new CloudinaryStorage({
    cloudinary,
    params: {
      folder: `${env.CLOUDINARY_FOLDER}/${subfolder}`,
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
      transformation: [{ quality: "auto", fetch_format: "auto" }],
    },
  });

/**
 * Deletes an asset from Cloudinary by its public_id.
 * Used by services when a property/builder image is replaced or removed.
 */
export const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return null;
  return cloudinary.uploader.destroy(publicId);
};

export { cloudinary };
