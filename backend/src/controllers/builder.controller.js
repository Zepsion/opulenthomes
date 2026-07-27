import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import * as builderService from "../services/builder.service.js";

export const getBuilders = asyncHandler(async (req, res) => {
  const { items, meta } = await builderService.listBuilders(req.query);
  res.status(200).json(new ApiResponse(200, items, "Builders fetched successfully", meta));
});

export const getBuilderBySlug = asyncHandler(async (req, res) => {
  const result = await builderService.getBuilderBySlug(req.params.slug);
  res.status(200).json(new ApiResponse(200, result, "Builder fetched successfully"));
});

export const createBuilder = asyncHandler(async (req, res) => {
  const builder = await builderService.createBuilder(req.body, req.file);
  res.status(201).json(new ApiResponse(201, builder, "Builder created successfully"));
});

export const updateBuilder = asyncHandler(async (req, res) => {
  const builder = await builderService.updateBuilder(req.params.id, req.body, req.file);
  res.status(200).json(new ApiResponse(200, builder, "Builder updated successfully"));
});

export const deleteBuilder = asyncHandler(async (req, res) => {
  await builderService.deleteBuilder(req.params.id);
  res.status(200).json(new ApiResponse(200, null, "Builder deleted successfully"));
});
