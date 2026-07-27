import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import * as userService from "../services/user.service.js";

export const getUsers = asyncHandler(async (req, res) => {
  const { items, meta } = await userService.listUsers(req.query);
  res.status(200).json(new ApiResponse(200, items, "Users fetched successfully", meta));
});

export const getUserById = asyncHandler(async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  res.status(200).json(new ApiResponse(200, user, "User fetched successfully"));
});

export const createStaffUser = asyncHandler(async (req, res) => {
  const user = await userService.createStaffUser(req.body);
  res.status(201).json(new ApiResponse(201, user.toSafeObject(), "Staff account created"));
});

export const updateUserStatus = asyncHandler(async (req, res) => {
  const user = await userService.updateUserStatus(req.params.id, req.body.isActive);
  res.status(200).json(new ApiResponse(200, user, "User status updated"));
});

export const updateUserRole = asyncHandler(async (req, res) => {
  const user = await userService.updateUserRole(req.params.id, req.body.role);
  res.status(200).json(new ApiResponse(200, user, "User role updated"));
});
