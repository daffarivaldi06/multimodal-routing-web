"use client";

import { useState, useCallback } from "react";
import { saveAuth, clearAuth, getToken, getRole, isAuthenticated } from "@/lib/auth";
import { login as apiLogin, register as apiRegister } from "@/lib/api";
import type { ApiError } from "@/types/api";

export function useAuth() {
  const [token, setToken] = useState<string | null>(() => getToken());
  const [role, setRole] = useState<"USER" | "ADMIN" | null>(() => getRole());

  const login = useCallback(async (email: string, password: string) => {
    const res = await apiLogin({ email, password });
    saveAuth(res.token, res.role);
    setToken(res.token);
    setRole(res.role);
    return res;
  }, []);

  const register = useCallback(async (email: string, password: string) => {
    return apiRegister({ email, password });
  }, []);

  const logout = useCallback(() => {
    clearAuth();
    setToken(null);
    setRole(null);
  }, []);

  return {
    token,
    role,
    isAuthenticated: isAuthenticated(),
    login,
    register,
    logout,
  };
}
