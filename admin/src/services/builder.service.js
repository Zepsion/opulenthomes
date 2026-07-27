import { apiClient } from "./apiClient.js";

export const getBuilders = (params = {}) => apiClient.get("/builders", { params });
export const createBuilder = (formData) =>
  apiClient.post("/builders", formData, { headers: { "Content-Type": "multipart/form-data" } });
export const updateBuilder = (id, formData) =>
  apiClient.patch(`/builders/${id}`, formData, { headers: { "Content-Type": "multipart/form-data" } });
export const deleteBuilder = (id) => apiClient.delete(`/builders/${id}`);
