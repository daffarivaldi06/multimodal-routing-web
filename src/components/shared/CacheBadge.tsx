import { cn } from "@/lib/utils";
import { Zap, Database } from "lucide-react";

interface CacheBadgeProps {
  cached: boolean;
}

export function CacheBadge({ cached }: CacheBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium border",
        cached
          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
          : "bg-zinc-500/10 text-zinc-400 border-zinc-500/20"
      )}
    >
      {cached ? <Zap size={10} className="fill-emerald-400" /> : <Database size={10} />}
      CACHE: {cached ? "HIT" : "MISS"}
    </span>
  );
}
