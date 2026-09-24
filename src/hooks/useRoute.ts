"use client";

import { useState, useCallback } from "react";
import { planRoute as apiPlanRoute } from "@/lib/api";
import type { RoutingResult, RouteState, ApiError } from "@/types/api";

export function useRoute() {
  const [state, setState] = useState<RouteState>("idle");
  const [result, setResult] = useState<RoutingResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [meta, setMeta] = useState<{ cached: boolean; model: string; timestamp: string } | null>(null);

  const planRoute = useCallback(async (query: string, token: string) => {
    setState("loading");
    setResult(null);
    setError(null);
    setMeta(null);

    try {
      const res = await apiPlanRoute(query, token);
      setResult(res.result);
      setMeta(res.meta);
      setState("success");
    } catch (err) {
      const apiErr = err as ApiError;
      setError(apiErr.message ?? apiErr.error ?? "An unexpected error occurred.");
      setState("error");
    }
  }, []);

  const reset = useCallback(() => {
    setState("idle");
    setResult(null);
    setError(null);
    setMeta(null);
  }, []);

  return { state, result, error, meta, planRoute, reset };
}
