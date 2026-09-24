"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import type { ApiError } from "@/types/api";
import { Loader2, UserPlus } from "lucide-react";

export function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { register, login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      await register(email, password);
      await login(email, password);
      router.push("/dashboard");
    } catch (err) {
      const apiErr = err as ApiError;
      const details = apiErr.details;
      const msg = details
        ? Object.values(details).flat().join(" ")
        : apiErr.message ?? apiErr.error ?? "Registration failed.";
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-zinc-400">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          required
          className="w-full rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-zinc-200 placeholder:text-zinc-600 px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-zinc-600 focus:border-zinc-600 transition-colors"
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-zinc-400">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Min 8 chars, 1 uppercase, 1 number"
          required
          className="w-full rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-zinc-200 placeholder:text-zinc-600 px-3.5 py-2.5 focus:outline-none focus:ring-1 focus:ring-zinc-600 focus:border-zinc-600 transition-colors"
        />
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
        {isLoading ? <Loader2 size={14} className="animate-spin" /> : <UserPlus size={14} />}
        {isLoading ? "Creating account…" : "Create account"}
      </button>

      <p className="text-center text-xs text-zinc-600">
        Already have an account?{" "}
        <a href="/login" className="text-zinc-400 hover:text-zinc-200 transition-colors">
          Sign in
        </a>
      </p>
    </form>
  );
}
