import dotenv from "dotenv";

dotenv.config();

/**
 * Single source of truth for all environment variables.
 * Never call process.env directly elsewhere in the codebase —
 * import `env` from this file so misconfiguration fails fast, in one place.
 */
export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: Number(process.env.PORT) || 5000,
  API_VERSION: process.env.API_VERSION || "v1",
  CLIENT_URL: process.env.CLIENT_URL || "http://localhost:5173",
  ADMIN_URL: process.env.ADMIN_URL || "http://localhost:5174",

  MONGODB_URI:
    process.env.NODE_ENV === "production"
      ? process.env.MONGODB_URI_PROD
      : process.env.MONGODB_URI,

  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_ACCESS_EXPIRY: process.env.JWT_ACCESS_EXPIRY || "15m",
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRY: process.env.JWT_REFRESH_EXPIRY || "7d",
  JWT_COOKIE_EXPIRY_DAYS: Number(process.env.JWT_COOKIE_EXPIRY_DAYS) || 7,

  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET,
  CLOUDINARY_FOLDER: process.env.CLOUDINARY_FOLDER || "opulent-homes",

  BCRYPT_SALT_ROUNDS: Number(process.env.BCRYPT_SALT_ROUNDS) || 12,
  RATE_LIMIT_WINDOW_MS: Number(process.env.RATE_LIMIT_WINDOW_MS) || 900000,
  RATE_LIMIT_MAX_REQUESTS: Number(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,

  isProduction: process.env.NODE_ENV === "production",
  isDevelopment: process.env.NODE_ENV !== "production",
};

/**
 * Fail fast on missing critical env vars rather than crashing
 * unpredictably later at request time.
 */
const REQUIRED_IN_ALL_ENVS = ["JWT_ACCESS_SECRET", "JWT_REFRESH_SECRET", "MONGODB_URI"];

export function validateEnv() {
  const missing = REQUIRED_IN_ALL_ENVS.filter((key) => !env[key]);
  if (missing.length > 0) {
    // eslint-disable-next-line no-console
    console.error(`❌ Missing required environment variables: ${missing.join(", ")}`);
    process.exit(1);
  }
}
