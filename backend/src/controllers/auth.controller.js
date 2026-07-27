import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { refreshCookieOptions } from "../utils/jwt.js";
import * as authService from "../services/auth.service.js";

export const register = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.registerUser(req.body);

  res
    .cookie("refreshToken", refreshToken, refreshCookieOptions())
    .status(201)
    .json(new ApiResponse(201, { user, accessToken }, "Account created successfully"));
});

export const login = asyncHandler(async (req, res) => {
  const { user, accessToken, refreshToken } = await authService.loginUser(req.body);

  res
    .cookie("refreshToken", refreshToken, refreshCookieOptions())
    .status(200)
    .json(new ApiResponse(200, { user, accessToken }, "Login successful"));
});

export const logout = asyncHandler(async (_req, res) => {
  res
    .clearCookie("refreshToken", refreshCookieOptions())
    .status(200)
    .json(new ApiResponse(200, null, "Logged out successfully"));
});

export const refresh = asyncHandler(async (req, res) => {
  const accessToken = await authService.refreshAccessToken(req.cookies?.refreshToken);
  res.status(200).json(new ApiResponse(200, { accessToken }, "Token refreshed"));
});

export const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(new ApiResponse(200, req.user, "Current user fetched"));
});

export const changePassword = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  await authService.changeUserPassword(req.user._id, currentPassword, newPassword);
  res.status(200).json(new ApiResponse(200, null, "Password updated successfully"));
});
