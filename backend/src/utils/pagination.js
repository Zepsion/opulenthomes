import { PAGINATION_DEFAULTS } from "../constants/index.js";

/**
 * Normalizes page/limit query params and returns Mongoose-ready
 * skip/limit values plus a meta object for the response envelope.
 *
 * Usage:
 *   const { skip, limit, buildMeta } = getPagination(req.query);
 *   const docs = await Model.find(filter).skip(skip).limit(limit);
 *   const total = await Model.countDocuments(filter);
 *   res.json(new ApiResponse(200, docs, "OK", buildMeta(total)));
 */
export const getPagination = (query = {}) => {
  const page = Math.max(Number(query.page) || PAGINATION_DEFAULTS.PAGE, 1);
  const limit = Math.min(
    Number(query.limit) || PAGINATION_DEFAULTS.LIMIT,
    PAGINATION_DEFAULTS.MAX_LIMIT
  );
  const skip = (page - 1) * limit;

  const buildMeta = (totalItems) => ({
    page,
    limit,
    totalItems,
    totalPages: Math.ceil(totalItems / limit),
  });

  return { page, limit, skip, buildMeta };
};
