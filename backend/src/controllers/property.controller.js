import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import * as propertyService from "../services/property.service.js";

export const getProperties = asyncHandler(async (req, res) => {
  const { items, meta } = await propertyService.listProperties(req.query);
  res.status(200).json(new ApiResponse(200, items, "Properties fetched successfully", meta));
});

export const getPropertyBySlug = asyncHandler(async (req, res) => {
  const property = await propertyService.getPropertyBySlug(req.params.slug);
  res.status(200).json(new ApiResponse(200, property, "Property fetched successfully"));
});

export const getPropertyById = asyncHandler(async (req, res) => {
  const property = await propertyService.getPropertyById(req.params.id);
  res.status(200).json(new ApiResponse(200, property, "Property fetched successfully"));
});

export const createProperty = asyncHandler(async (req, res) => {
  const property = await propertyService.createProperty(req.body, req.user._id, req.files);
  res.status(201).json(new ApiResponse(201, property, "Property created successfully"));
});

export const updateProperty = asyncHandler(async (req, res) => {
  const property = await propertyService.updateProperty(req.params.id, req.body, req.files);
  res.status(200).json(new ApiResponse(200, property, "Property updated successfully"));
});

export const deleteProperty = asyncHandler(async (req, res) => {
  await propertyService.deleteProperty(req.params.id);
  res.status(200).json(new ApiResponse(200, null, "Property deleted successfully"));
});

export const removePropertyImage = asyncHandler(async (req, res) => {
  const property = await propertyService.removePropertyImage(req.params.id, req.body.publicId);
  res.status(200).json(new ApiResponse(200, property, "Image removed successfully"));
});
