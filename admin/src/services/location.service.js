import { apiClient } from "./apiClient.js";

export const getLocations = (params = {}) => apiClient.get("/locations", { params });
export const createLocation = (formData) =>
  apiClient.post("/locations", formData, { headers: { "Content-Type": "multipart/form-data" } });
export const updateLocation = (id, formData) =>
  apiClient.patch(`/locations/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
export const deleteLocation = (id) => apiClient.delete(`/locations/${id}`);
