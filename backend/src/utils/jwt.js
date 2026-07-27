import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

/**
 * Access tokens: short-lived, sent in Authorization header, used per-request.
 * Refresh tokens: long-lived, stored in an httpOnly cookie, used to mint new access tokens.
 */

export const signAccessToken = (payload) =>
  jwt.sign(payload, env.JWT_ACCESS_SECRET, { expiresIn: env.JWT_ACCESS_EXPIRY });

export const signRefreshToken = (payload) =>
  jwt.sign(payload, env.JWT_REFRESH_SECRET, { expiresIn: env.JWT_REFRESH_EXPIRY });

export const verifyAccessToken = (token) => jwt.verify(token, env.JWT_ACCESS_SECRET);

export const verifyRefreshToken = (token) => jwt.verify(token, env.JWT_REFRESH_SECRET);

export const generateAuthTokens = (user) => {
  const payload = { id: user._id, role: user.role };
  return {
    accessToken: signAccessToken(payload),
    refreshToken: signRefreshToken(payload),
  };
};

export const refreshCookieOptions = () => ({
  httpOnly: true,
  secure: env.isProduction,
  sameSite: env.isProduction ? "none" : "lax",
  maxAge: env.JWT_COOKIE_EXPIRY_DAYS * 24 * 60 * 60 * 1000,
});
