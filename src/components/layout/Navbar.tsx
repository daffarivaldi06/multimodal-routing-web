"use client";

import { LogOut, Cpu } from "lucide-react";
import { CacheBadge } from "@/components/shared/CacheBadge";
import { cn } from "@/lib/utils";

interface NavbarProps {
  model?: string;
  cached?: boolean;
  onLogout: () => void;
}

export function Navbar({ model, cached, onLogout }: NavbarProps) {
  return (
    <header className="h-12 border-b border-zinc-800/60 bg-zinc-950/80 backdrop-blur-md flex items-center px-4 gap-3 flex-shrink-0">
      <div className="flex items-center gap-2 flex-1">
        <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center flex-shrink-0">
          <span className="text-white text-xs font-bold">R</span>
        </div>
        <span className="text-sm font-semibold text-zinc-100 hidden sm:block">
          Routing Agent
        </span>
      </div>

      <div className="flex items-center gap-2">
        {model && (
          <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-zinc-500 bg-zinc-900 border border-zinc-800 px-2 py-1 rounded-full font-mono">
            <Cpu size={10} />
            {model}
          </span>
        )}
        {cached !== undefined && <CacheBadge cached={cached} />}
        <button
          onClick={onLogout}
          className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-zinc-200 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 px-2.5 py-1.5 rounded-lg transition-all duration-200"
        >
          <LogOut size={12} />
          <span className="hidden sm:block">Logout</span>
        </button>
      </div>
    </header>
  );
}
