"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import type { ApiError } from "@/types/api";
import { Loader2, LogIn, Mail, Lock } from "lucide-react";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await login(email, password);
      router.push("/dashboard");
    } catch (err) {
      const apiErr = err as ApiError;
      setError(apiErr.message ?? apiErr.error ?? "Login failed. Check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Email field */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-zinc-400">Email</label>
        <div className="relative">
          <Mail
            size={14}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="user@routing.local"
            required
            className="w-full rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-zinc-200 placeholder:text-zinc-600 pl-9 pr-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-zinc-600 focus:border-zinc-600 transition-colors"
          />
        </div>
      </div>

      {/* Password field */}
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-zinc-400">Password</label>
        <div className="relative">
          <Lock
            size={14}
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none"
          />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
            className="w-full rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-zinc-200 placeholder:text-zinc-600 pl-9 pr-10 py-2.5 focus:outline-none focus:ring-1 focus:ring-zinc-600 focus:border-zinc-600 transition-colors"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 transition-colors"
            tabIndex={-1}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {error && (
        <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-medium py-2.5 rounded-xl transition-all duration-200"
      >
        {isLoading ? <Loader2 size={14} className="animate-spin" /> : <LogIn size={14} />}
        {isLoading ? "Signing in…" : "Sign in"}
      </button>

      <p className="text-center text-xs text-zinc-600">
        No account?{" "}
        <a href="/register" className="text-zinc-400 hover:text-zinc-200 transition-colors">
          Register
        </a>
      </p>
    </form>
  );
}
