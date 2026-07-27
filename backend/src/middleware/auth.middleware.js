import { verifyAccessToken } from "../utils/jwt.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/User.model.js";

/**
 * Verifies the Bearer access token and attaches the authenticated
 * user document to req.user. Use on any protected route.
 */
export const authenticate = asyncHandler(async (req, _res, next) => {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.split(" ")[1] : null;

  if (!token) {
    throw ApiError.unauthorized("Authentication token missing");
  }

  let decoded;
  try {
    decoded = verifyAccessToken(token);
  } catch {
    throw ApiError.unauthorized("Invalid or expired token");
  }

  const user = await User.findById(decoded.id).select("-password");
  if (!user || !user.isActive) {
    throw ApiError.unauthorized("User no longer exists or is inactive");
  }

  req.user = user;
  next();
});

/**
 * Restricts a route to specific roles.
 * Usage: router.delete("/:id", authenticate, authorize("admin", "super_admin"), handler)
 */
export const authorize =
  (...allowedRoles) =>
  (req, _res, next) => {
    if (!req.user) {
      throw ApiError.unauthorized("Authentication required");
    }
    if (!allowedRoles.includes(req.user.role)) {
      throw ApiError.forbidden("You do not have permission to perform this action");
    }
    next();
  };
