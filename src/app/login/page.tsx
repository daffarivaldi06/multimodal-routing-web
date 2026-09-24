import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/LoginForm";
import { Map } from "lucide-react";

export const metadata: Metadata = {
  title: "Sign In | Routing Agent",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 mb-4 shadow-lg shadow-blue-500/20">
            <Map size={22} className="text-white" />
          </div>
          <h1 className="text-xl font-semibold text-zinc-100">Welcome back</h1>
          <p className="text-sm text-zinc-500 mt-1">Sign in to plan your journey</p>
        </div>
        <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 backdrop-blur-sm">
          <LoginForm />
        </div>
        <p className="text-center text-xs text-zinc-700 mt-6">
          Demo: user@routing.local / User1234!
        </p>
      </div>
    </div>
  );
}
