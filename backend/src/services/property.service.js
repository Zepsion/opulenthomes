import { Property } from "../models/Property.model.js";
import { ApiError } from "../utils/ApiError.js";
import { getPagination } from "../utils/pagination.js";
import { deleteFromCloudinary } from "../config/cloudinary.js";

/** Builds a Mongoose filter object from sanitized query params. */
const buildPropertyFilter = (query) => {
  const filter = { isActive: true };

  if (query.propertyType) filter.propertyType = query.propertyType;
  if (query.listingType) filter.listingType = query.listingType;
  if (query.status) filter.status = query.status;
  if (query.location) filter.location = query.location;
  if (query.builder) filter.builder = query.builder;

  if (query.minPrice || query.maxPrice) {
    filter["price.amount"] = {};
    if (query.minPrice) filter["price.amount"].$gte = Number(query.minPrice);
    if (query.maxPrice) filter["price.amount"].$lte = Number(query.maxPrice);
  }

  if (query.search) {
    filter.$text = { $search: query.search };
  }

  return filter;
};

export const listProperties = async (query) => {
  const { skip, limit, buildMeta } = getPagination(query);
  const filter = buildPropertyFilter(query);
  const sort = query.sort ? query.sort.split(",").join(" ") : "-createdAt";

  const [items, total] = await Promise.all([
    Property.find(filter)
      .populate("location", "name city state")
      .populate("builder", "name slug logo")
      .sort(sort)
      .skip(skip)
      .limit(limit),
    Property.countDocuments(filter),
  ]);

  return { items, meta: buildMeta(total) };
};

export const getPropertyBySlug = async (slug) => {
  const property = await Property.findOneAndUpdate(
    { slug, isActive: true },
    { $inc: { viewsCount: 1 } },
    { new: true }
  )
    .populate("location")
    .populate("builder");

  if (!property) throw ApiError.notFound("Property not found");
  return property;
};

export const getPropertyById = async (id) => {
  const property = await Property.findById(id).populate("location").populate("builder");
  if (!property) throw ApiError.notFound("Property not found");
  return property;
};

export const createProperty = async (payload, userId, uploadedFiles = []) => {
  const images = uploadedFiles.map((file, index) => ({
    url: file.path,
    publicId: file.filename,
    isCover: index === 0,
  }));

  return Property.create({ ...payload, images, createdBy: userId });
};

export const updateProperty = async (id, payload, uploadedFiles = []) => {
  const property = await Property.findById(id);
  if (!property) throw ApiError.notFound("Property not found");

  if (uploadedFiles.length > 0) {
    const newImages = uploadedFiles.map((file) => ({
      url: file.path,
      publicId: file.filename,
      isCover: false,
    }));
    property.images.push(...newImages);
  }

  Object.assign(property, payload);
  await property.save();
  return property;
};

export const deleteProperty = async (id) => {
  const property = await Property.findById(id);
  if (!property) throw ApiError.notFound("Property not found");

  await Promise.all(property.images.map((img) => deleteFromCloudinary(img.publicId)));
  await property.deleteOne();
};

export const removePropertyImage = async (id, publicId) => {
  const property = await Property.findById(id);
  if (!property) throw ApiError.notFound("Property not found");

  await deleteFromCloudinary(publicId);
  property.images = property.images.filter((img) => img.publicId !== publicId);
  await property.save();
  return property;
};
