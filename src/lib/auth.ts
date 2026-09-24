const TOKEN_KEY = "routing_token";
const ROLE_KEY = "routing_role";

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getRole(): "USER" | "ADMIN" | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ROLE_KEY) as "USER" | "ADMIN" | null;
}

export function saveAuth(token: string, role: "USER" | "ADMIN"): void {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(ROLE_KEY, role);
}

export function clearAuth(): void {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLE_KEY);
}

export function isAuthenticated(): boolean {
  return !!getToken();
}
