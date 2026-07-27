import { apiClient } from "./apiClient.js";

export const getProperties = (params = {}) => apiClient.get("/properties", { params });
export const getPropertyById = (id) => apiClient.get(`/properties/${id}`);
export const createProperty = (formData) =>
  apiClient.post("/properties", formData, { headers: { "Content-Type": "multipart/form-data" } });
export const updateProperty = (id, formData) =>
  apiClient.patch(`/properties/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
export const deleteProperty = (id) => apiClient.delete(`/properties/${id}`);
export const removePropertyImage = (id, publicId) =>
  apiClient.patch(`/properties/${id}/remove-image`, { publicId });
