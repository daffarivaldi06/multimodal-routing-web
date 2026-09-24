import {
  Bus,
  TrainFront,
  TramFront,
  Bike,
  Footprints,
  Zap,
} from "lucide-react";
import type { TransportMode } from "@/types/api";
import { cn } from "@/lib/utils";

const modeConfig: Record<
  TransportMode,
  { icon: React.ElementType; label: string; color: string; bg: string }
> = {
  bus: { icon: Bus, label: "Bus", color: "text-amber-400", bg: "bg-amber-400/10" },
  metro: { icon: Zap, label: "Metro", color: "text-violet-400", bg: "bg-violet-400/10" },
  tram: { icon: TramFront, label: "Tram", color: "text-emerald-400", bg: "bg-emerald-400/10" },
  train: { icon: TrainFront, label: "Train", color: "text-blue-400", bg: "bg-blue-400/10" },
  bike: { icon: Bike, label: "Bike", color: "text-orange-400", bg: "bg-orange-400/10" },
  walk: { icon: Footprints, label: "Walk", color: "text-zinc-400", bg: "bg-zinc-400/10" },
};

interface ModeIconProps {
  mode: TransportMode;
  size?: number;
  showBadge?: boolean;
}

export function ModeIcon({ mode, size = 16, showBadge = false }: ModeIconProps) {
  const cfg = modeConfig[mode];
  const Icon = cfg.icon;

  if (showBadge) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium",
          cfg.color,
          cfg.bg
        )}
      >
        <Icon size={12} />
        {cfg.label}
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0",
        cfg.color,
        cfg.bg
      )}
    >
      <Icon size={size} />
    </span>
  );
}
