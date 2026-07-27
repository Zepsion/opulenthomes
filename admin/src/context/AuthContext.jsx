"use client";

import { createContext, useState, useEffect, useCallback } from "react";
import { apiClient, TOKEN_STORAGE_KEY } from "@services/apiClient.js";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCurrentUser = useCallback(async () => {
    const token = localStorage.getItem(TOKEN_STORAGE_KEY);
    if (!token) {
      setIsLoading(false);
      return;
    }
    try {
      const { data } = await apiClient.get("/auth/me");
      setUser(data.data);
    } catch {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCurrentUser();
  }, [fetchCurrentUser]);

  const login = async (credentials) => {
    const { data } = await apiClient.post("/auth/login", credentials);
    const loggedInUser = data.data.user;

    if (!["admin", "super_admin"].includes(loggedInUser.role)) {
      throw new Error("This account does not have admin access");
    }

    localStorage.setItem(TOKEN_STORAGE_KEY, data.data.accessToken);
    setUser(loggedInUser);
    return loggedInUser;
  };

  const logout = async () => {
    await apiClient.post("/auth/logout");
    localStorage.removeItem(TOKEN_STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
