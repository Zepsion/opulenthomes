import { apiClient } from "./apiClient.js";

export const getLeads = (params = {}) => apiClient.get("/leads", { params });
export const getLeadById = (id) => apiClient.get(`/leads/${id}`);
export const updateLeadStatus = (id, status) => apiClient.patch(`/leads/${id}/status`, { status });
export const addLeadNote = (id, text) => apiClient.patch(`/leads/${id}/notes`, { text });
export const assignLead = (id, assignedTo) => apiClient.patch(`/leads/${id}/assign`, { assignedTo });
export const archiveLead = (id) => apiClient.patch(`/leads/${id}/archive`);
