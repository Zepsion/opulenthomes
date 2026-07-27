import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { generateAuthTokens, verifyRefreshToken, signAccessToken } from "../utils/jwt.js";
import { USER_ROLES } from "../constants/index.js";

/**
 * Registers a new customer-facing user account.
 * Admin/broker/builder accounts are provisioned separately by admins,
 * never via public self-registration.
 */
export const registerUser = async ({ name, email, password, phone }) => {
  const existing = await User.findOne({ email });
  if (existing) {
    throw ApiError.conflict("An account with this email already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    phone,
    role: USER_ROLES.CUSTOMER,
  });

  const tokens = generateAuthTokens(user);
  return { user: user.toSafeObject(), ...tokens };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user || !(await user.comparePassword(password))) {
    throw ApiError.unauthorized("Invalid email or password");
  }
  if (!user.isActive) {
    throw ApiError.forbidden("This account has been deactivated");
  }

  user.lastLoginAt = new Date();
  await user.save({ validateBeforeSave: false });

  const tokens = generateAuthTokens(user);
  return { user: user.toSafeObject(), ...tokens };
};

/**
 * Exchanges a valid refresh token (from httpOnly cookie) for a new access token.
 */
export const refreshAccessToken = async (refreshToken) => {
  if (!refreshToken) {
    throw ApiError.unauthorized("Refresh token missing");
  }

  let decoded;
  try {
    decoded = verifyRefreshToken(refreshToken);
  } catch {
    throw ApiError.unauthorized("Invalid or expired refresh token");
  }

  const user = await User.findById(decoded.id);
  if (!user || !user.isActive) {
    throw ApiError.unauthorized("User no longer exists or is inactive");
  }

  return signAccessToken({ id: user._id, role: user.role });
};

export const changeUserPassword = async (userId, currentPassword, newPassword) => {
  const user = await User.findById(userId).select("+password");
  if (!user || !(await user.comparePassword(currentPassword))) {
    throw ApiError.badRequest("Current password is incorrect");
  }
  user.password = newPassword;
  await user.save();
};
