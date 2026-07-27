import { Location } from "../models/Location.model.js";
import { Property } from "../models/Property.model.js";
import { ApiError } from "../utils/ApiError.js";
import { getPagination } from "../utils/pagination.js";
import { deleteFromCloudinary } from "../config/cloudinary.js";

export const listLocations = async (query) => {
  const { skip, limit, buildMeta } = getPagination(query);
  const filter = { isActive: true };
  if (query.city) filter.city = { $regex: query.city, $options: "i" };

  const [items, total] = await Promise.all([
    Location.find(filter).sort("name").skip(skip).limit(limit),
    Location.countDocuments(filter),
  ]);

  return { items, meta: buildMeta(total) };
};

export const getLocationBySlug = async (slug) => {
  const location = await Location.findOne({ slug, isActive: true });
  if (!location) throw ApiError.notFound("Location not found");
  return location;
};

export const createLocation = async (payload, coverImageFile) => {
  const data = { ...payload };
  if (coverImageFile) {
    data.coverImage = { url: coverImageFile.path, publicId: coverImageFile.filename };
  }
  return Location.create(data);
};

export const updateLocation = async (id, payload, coverImageFile) => {
  const location = await Location.findById(id);
  if (!location) throw ApiError.notFound("Location not found");

  if (coverImageFile) {
    if (location.coverImage?.publicId) await deleteFromCloudinary(location.coverImage.publicId);
    location.coverImage = { url: coverImageFile.path, publicId: coverImageFile.filename };
  }

  Object.assign(location, payload);
  await location.save();
  return location;
};

export const deleteLocation = async (id) => {
  const location = await Location.findById(id);
  if (!location) throw ApiError.notFound("Location not found");

  const linkedProperties = await Property.countDocuments({ location: id });
  if (linkedProperties > 0) {
    throw ApiError.conflict("Cannot delete location with linked properties");
  }

  if (location.coverImage?.publicId) await deleteFromCloudinary(location.coverImage.publicId);
  await location.deleteOne();
};
