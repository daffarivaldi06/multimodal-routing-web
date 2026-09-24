import { LegCard } from "./LegCard";
import type { RouteLeg } from "@/types/api";

interface RouteTimelineProps {
  legs: RouteLeg[];
}

export function RouteTimeline({ legs }: RouteTimelineProps) {
  return (
    <div className="mt-1">
      {legs.map((leg, i) => (
        <LegCard key={i} leg={leg} index={i} isLast={i === legs.length - 1} />
      ))}
    </div>
  );
}
