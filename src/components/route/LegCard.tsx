"use client";

import { motion } from "framer-motion";
import { ModeIcon } from "@/components/shared/ModeIcon";
import { formatDuration, formatDistance } from "@/lib/utils";
import type { RouteLeg } from "@/types/api";

interface LegCardProps {
  leg: RouteLeg;
  index: number;
  isLast: boolean;
}

export function LegCard({ leg, index, isLast }: LegCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.08, duration: 0.3, ease: "easeOut" }}
      className="relative"
    >
      <div className="flex gap-3 items-start">
        <div className="flex flex-col items-center">
          <ModeIcon mode={leg.mode} />
          {!isLast && (
            <div className="w-px flex-1 mt-1.5 bg-gradient-to-b from-zinc-600 to-transparent min-h-[28px]" />
          )}
        </div>

        <div className="pb-5 flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              {(leg.line || leg.operator) && (
                <div className="flex items-center gap-1.5 mb-0.5 flex-wrap">
                  {leg.line && (
                    <span className="text-xs font-semibold text-zinc-200 bg-zinc-800 px-1.5 py-0.5 rounded">
                      {leg.line}
                    </span>
                  )}
                  {leg.operator && (
                    <span className="text-xs text-zinc-500">{leg.operator}</span>
                  )}
                </div>
              )}
              <p className="text-sm text-zinc-300 leading-snug">
                <span className="font-medium text-zinc-100">{leg.from}</span>
                <span className="mx-1.5 text-zinc-600">→</span>
                <span>{leg.to}</span>
              </p>
            </div>
            <div className="flex flex-col items-end flex-shrink-0 gap-0.5">
              <span className="text-xs font-semibold text-zinc-200 whitespace-nowrap">
                {formatDuration(leg.durationSeconds)}
              </span>
              <span className="text-xs text-zinc-500 whitespace-nowrap">
                {formatDistance(leg.distanceMeters)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
