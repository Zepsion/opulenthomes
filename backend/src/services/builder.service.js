import { Builder } from "../models/Builder.model.js";
import { Property } from "../models/Property.model.js";
import { ApiError } from "../utils/ApiError.js";
import { getPagination } from "../utils/pagination.js";
import { deleteFromCloudinary } from "../config/cloudinary.js";

export const listBuilders = async (query) => {
  const { skip, limit, buildMeta } = getPagination(query);
  const filter = { isActive: true };
  if (query.search) filter.name = { $regex: query.search, $options: "i" };

  const [items, total] = await Promise.all([
    Builder.find(filter).sort("-createdAt").skip(skip).limit(limit),
    Builder.countDocuments(filter),
  ]);

  return { items, meta: buildMeta(total) };
};

export const getBuilderBySlug = async (slug) => {
  const builder = await Builder.findOne({ slug, isActive: true });
  if (!builder) throw ApiError.notFound("Builder not found");

  const properties = await Property.find({ builder: builder._id, isActive: true }).limit(20);
  return { builder, properties };
};

export const createBuilder = async (payload, logoFile) => {
  const data = { ...payload };
  if (logoFile) {
    data.logo = { url: logoFile.path, publicId: logoFile.filename };
  }
  return Builder.create(data);
};

export const updateBuilder = async (id, payload, logoFile) => {
  const builder = await Builder.findById(id);
  if (!builder) throw ApiError.notFound("Builder not found");

  if (logoFile) {
    if (builder.logo?.publicId) await deleteFromCloudinary(builder.logo.publicId);
    builder.logo = { url: logoFile.path, publicId: logoFile.filename };
  }

  Object.assign(builder, payload);
  await builder.save();
  return builder;
};

export const deleteBuilder = async (id) => {
  const builder = await Builder.findById(id);
  if (!builder) throw ApiError.notFound("Builder not found");

  const linkedProperties = await Property.countDocuments({ builder: id });
  if (linkedProperties > 0) {
    throw ApiError.conflict("Cannot delete builder with linked properties");
  }

  if (builder.logo?.publicId) await deleteFromCloudinary(builder.logo.publicId);
  await builder.deleteOne();
};
