/**
 * One-off seed script to create the initial super admin account.
 * Run with: npm run seed
 */
import { connectDB, disconnectDB } from "../config/db.js";
import { User } from "../models/User.model.js";
import { USER_ROLES } from "../constants/index.js";
import { logger } from "./logger.js";
import dotenv from "dotenv";

dotenv.config();

const seed = async () => {
  await connectDB();

  const email = process.env.SEED_ADMIN_EMAIL;
  const existing = await User.findOne({ email });

  if (existing) {
    logger.info(`Super admin already exists: ${email}`);
  } else {
    await User.create({
      name: process.env.SEED_ADMIN_NAME || "Super Admin",
      email,
      password: process.env.SEED_ADMIN_PASSWORD,
      role: USER_ROLES.SUPER_ADMIN,
      isEmailVerified: true,
    });
    logger.info(`Super admin created: ${email}`);
  }

  await disconnectDB();
  process.exit(0);
};

seed().catch((err) => {
  logger.error(`Seed failed: ${err.message}`);
  process.exit(1);
});
