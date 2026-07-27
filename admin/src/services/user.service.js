import { apiClient } from "./apiClient.js";

export const getUsers = (params = {}) => apiClient.get("/users", { params });
export const getUserById = (id) => apiClient.get(`/users/${id}`);
export const createStaffUser = (payload) => apiClient.post("/users", payload);
export const updateUserStatus = (id, isActive) => apiClient.patch(`/users/${id}/status`, { isActive });
export const updateUserRole = (id, role) => apiClient.patch(`/users/${id}/role`, { role });
