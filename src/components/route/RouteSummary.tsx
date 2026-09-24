"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Ruler } from "lucide-react";
import { formatDuration, formatDistance } from "@/lib/utils";
import type { RoutingResult } from "@/types/api";

interface RouteSummaryProps {
  result: RoutingResult;
}

export function RouteSummary({ result }: RouteSummaryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-4 p-3 rounded-xl bg-zinc-900 border border-zinc-800"
    >
      <div className="flex items-start gap-2 mb-2.5">
        <MapPin size={14} className="text-blue-400 mt-0.5 flex-shrink-0" />
        <div className="min-w-0">
          <p className="text-xs text-zinc-500 mb-0.5">Route</p>
          <p className="text-sm font-semibold text-zinc-100 leading-snug">
            {result.origin}
            <span className="mx-1.5 text-zinc-600 font-normal">→</span>
            {result.destination}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-2 border-t border-zinc-800">
        <div className="flex items-center gap-1.5">
          <Clock size={12} className="text-zinc-500" />
          <span className="text-xs font-medium text-zinc-300">
            {formatDuration(result.totalEstimatedDurationSeconds)}
          </span>
        </div>
        <div className="w-px h-3 bg-zinc-700" />
        <div className="flex items-center gap-1.5">
          <Ruler size={12} className="text-zinc-500" />
          <span className="text-xs font-medium text-zinc-300">
            {formatDistance(result.totalDistanceMeters)}
          </span>
        </div>
        <div className="w-px h-3 bg-zinc-700" />
        <span className="text-xs text-zinc-500">
          {result.legs.length} leg{result.legs.length !== 1 ? "s" : ""}
        </span>
        {result.cachedAt && (
          <>
            <div className="w-px h-3 bg-zinc-700" />
            <span className="text-xs text-zinc-600">from cache</span>
          </>
        )}
      </div>
    </motion.div>
  );
}
