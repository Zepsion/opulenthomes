"use client";

import axios from "axios";

/**
 * Client-side Axios instance. Only used inside Client Components for
 * actions that must happen in the browser — submitting the enquiry
 * form, essentially. Initial page data comes from src/lib/api-server.js
 * inside Server Components instead, so this file is intentionally small.
 */
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5001/api/v1",
  headers: { "Content-Type": "application/json" },
});

export const submitLead = (payload) => apiClient.post("/leads", payload);
