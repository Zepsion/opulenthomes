import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import * as locationService from "../services/location.service.js";

export const getLocations = asyncHandler(async (req, res) => {
  const { items, meta } = await locationService.listLocations(req.query);
  res.status(200).json(new ApiResponse(200, items, "Locations fetched successfully", meta));
});

export const getLocationBySlug = asyncHandler(async (req, res) => {
  const location = await locationService.getLocationBySlug(req.params.slug);
  res.status(200).json(new ApiResponse(200, location, "Location fetched successfully"));
});

export const createLocation = asyncHandler(async (req, res) => {
  const location = await locationService.createLocation(req.body, req.file);
  res.status(201).json(new ApiResponse(201, location, "Location created successfully"));
});

export const updateLocation = asyncHandler(async (req, res) => {
  const location = await locationService.updateLocation(req.params.id, req.body, req.file);
  res.status(200).json(new ApiResponse(200, location, "Location updated successfully"));
});

export const deleteLocation = asyncHandler(async (req, res) => {
  await locationService.deleteLocation(req.params.id);
  res.status(200).json(new ApiResponse(200, null, "Location deleted successfully"));
});
