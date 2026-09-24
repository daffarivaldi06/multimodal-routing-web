import type {
  LoginRequest,
  RegisterRequest,
  AuthTokenResponse,
  RouteApiResponse,
  ApiError,
} from "@/types/api";

// When running in the browser, use empty string to leverage Next.js rewrite proxy
// When running in SSR, fallback to NEXT_PUBLIC_API_URL or localhost:3000
const BASE_URL =
  typeof window !== "undefined"
    ? ""
    : (process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3000");

async function request<T>(
  path: string,
  options: RequestInit
): Promise<T> {
  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers ?? {}),
      },
    });

    if (!res.ok) {
      const err: ApiError = await res.json().catch(() => ({
        error: "HTTP Error",
        message: `HTTP ${res.status}: ${res.statusText}`,
      }));
      throw err;
    }

    return (await res.json()) as T;
  } catch (err: unknown) {
    const errorObj = err as Record<string, unknown>;
    if (errorObj?.error) {
      throw err;
    }
    throw {
      error: "Connection Error",
      message:
        errorObj?.message === "Failed to fetch"
          ? "Gagal terhubung ke backend server. Pastikan backend aktif di port 3000."
          : String(errorObj?.message || "Failed to fetch data"),
    } as ApiError;
  }
}

export async function login(data: LoginRequest): Promise<AuthTokenResponse> {
  return request<AuthTokenResponse>("/api/v1/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function register(data: RegisterRequest): Promise<{ message: string }> {
  return request<{ message: string }>("/api/v1/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function planRoute(
  query: string,
  token: string
): Promise<RouteApiResponse> {
  return request<RouteApiResponse>("/api/v1/route", {
    method: "POST",
    body: JSON.stringify({ query }),
    headers: { Authorization: `Bearer ${token}` },
  });
}
