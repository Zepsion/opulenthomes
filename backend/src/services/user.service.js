import { User } from "../models/User.model.js";
import { ApiError } from "../utils/ApiError.js";
import { getPagination } from "../utils/pagination.js";
import { USER_ROLES } from "../constants/index.js";

export const listUsers = async (query) => {
  const { skip, limit, buildMeta } = getPagination(query);
  const filter = {};
  if (query.role) filter.role = query.role;
  if (query.search) {
    filter.$or = [
      { name: { $regex: query.search, $options: "i" } },
      { email: { $regex: query.search, $options: "i" } },
    ];
  }

  const [items, total] = await Promise.all([
    User.find(filter).select("-password").sort("-createdAt").skip(skip).limit(limit),
    User.countDocuments(filter),
  ]);

  return { items, meta: buildMeta(total) };
};

export const getUserById = async (id) => {
  const user = await User.findById(id).select("-password");
  if (!user) throw ApiError.notFound("User not found");
  return user;
};

/** Only a super_admin may create staff accounts (admin/broker/builder). */
export const createStaffUser = async (payload) => {
  const existing = await User.findOne({ email: payload.email });
  if (existing) throw ApiError.conflict("An account with this email already exists");

  if (payload.role === USER_ROLES.SUPER_ADMIN) {
    throw ApiError.forbidden("Cannot create another super_admin via this endpoint");
  }

  return User.create(payload);
};

export const updateUserStatus = async (id, isActive) => {
  const user = await User.findByIdAndUpdate(id, { isActive }, { new: true }).select("-password");
  if (!user) throw ApiError.notFound("User not found");
  return user;
};

export const updateUserRole = async (id, role) => {
  if (role === USER_ROLES.SUPER_ADMIN) {
    throw ApiError.forbidden("Cannot assign super_admin via this endpoint");
  }
  const user = await User.findByIdAndUpdate(id, { role }, { new: true }).select("-password");
  if (!user) throw ApiError.notFound("User not found");
  return user;
};
