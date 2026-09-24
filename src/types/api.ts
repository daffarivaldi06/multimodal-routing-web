// Mirrors backend: src/modules/auth/auth.types.ts & src/modules/route/route.types.ts

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface AuthTokenResponse {
  token: string;
  expiresIn: string;
  role: "USER" | "ADMIN";
}

export type TransportMode = "walk" | "bike" | "bus" | "metro" | "tram" | "train";

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface RouteLeg {
  mode: TransportMode;
  from: string;
  to: string;
  line?: string;
  operator?: string;
  durationSeconds: number;
  distanceMeters: number;
  originCoords?: Coordinates;
  destinationCoords?: Coordinates;
}

export interface BikeOption {
  id: string;
  name: string;
  availableBikes: number;
  totalSlots: number;
  provider: string;
  distanceMeters: number;
  walkToDock?: number;
}

export interface RoutingResult {
  origin: string;
  destination: string;
  legs: RouteLeg[];
  bikeOptions?: BikeOption[];
  totalEstimatedDurationSeconds: number;
  totalDistanceMeters: number;
  cachedAt?: string;
  agentThought?: string;
}

export interface RouteApiResponse {
  success: boolean;
  query: string;
  result: RoutingResult;
  meta: {
    cached: boolean;
    model: string;
    timestamp: string;
  };
}

export interface ApiError {
  error: string;
  message?: string;
  details?: Record<string, string[]>;
  retryAfterSeconds?: number;
}

export type RouteState = "idle" | "loading" | "success" | "error";
