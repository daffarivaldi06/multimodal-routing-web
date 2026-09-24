"use client";

import { useState } from "react";
import { Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const EXAMPLE_QUERIES = [
  "Find a route from Stadium Lille Métropole to UPHF campus in Valenciennes",
  "Get a bike route from Lille Flandres to Grand Palais",
];

interface QueryInputProps {
  onSubmit: (query: string) => void;
  isLoading: boolean;
}

export function QueryInput({ onSubmit, isLoading }: QueryInputProps) {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim().length >= 10 && !isLoading) {
      onSubmit(query.trim());
    }
  };

  const charCount = query.length;
  const isValid = charCount >= 10 && charCount <= 500;

  return (
    <div className="space-y-3">
      <div>
        <label className="text-xs font-medium text-zinc-400 uppercase tracking-widest mb-1.5 block">
          Natural Language Query
        </label>
        <form onSubmit={handleSubmit} className="relative">
          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Describe your journey in natural language…"
            rows={4}
            maxLength={500}
            disabled={isLoading}
            className={cn(
              "w-full rounded-xl bg-zinc-900 border text-sm text-zinc-200",
              "placeholder:text-zinc-600 resize-none",
              "px-3.5 py-3 pr-12",
              "focus:outline-none focus:ring-1 focus:ring-zinc-600 focus:border-zinc-600",
              "transition-colors duration-200",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              charCount > 0 && !isValid
                ? "border-red-500/40"
                : "border-zinc-800 hover:border-zinc-700"
            )}
          />
          <button
            type="submit"
            disabled={!isValid || isLoading}
            className={cn(
              "absolute bottom-3 right-3 p-1.5 rounded-lg transition-all duration-200",
              isValid && !isLoading
                ? "bg-blue-600 hover:bg-blue-500 text-white"
                : "bg-zinc-800 text-zinc-600 cursor-not-allowed"
            )}
          >
            {isLoading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              <Send size={14} />
            )}
          </button>
        </form>
        <div className="flex justify-between items-center mt-1.5">
          <span className="text-xs text-zinc-600">Min 10 characters</span>
          <span className={cn("text-xs", charCount > 480 ? "text-amber-500" : "text-zinc-600")}>
            {charCount}/500
          </span>
        </div>
      </div>

      <div className="space-y-1.5">
        <p className="text-xs text-zinc-600 uppercase tracking-widest">Examples</p>
        {EXAMPLE_QUERIES.map((q) => (
          <button
            key={q}
            onClick={() => setQuery(q)}
            disabled={isLoading}
            className="w-full text-left text-xs text-zinc-500 hover:text-zinc-300 bg-zinc-900/50 hover:bg-zinc-800/80 border border-zinc-800 hover:border-zinc-700 rounded-lg px-3 py-2 transition-all duration-200 leading-relaxed disabled:opacity-40"
          >
            {q}
          </button>
        ))}
      </div>
    </div>
  );
}
