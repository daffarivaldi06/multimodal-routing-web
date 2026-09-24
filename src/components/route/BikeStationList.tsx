"use client";

import { motion } from "framer-motion";
import { Bike } from "lucide-react";
import { formatDistance } from "@/lib/utils";
import type { BikeOption } from "@/types/api";

interface BikeStationListProps {
  options: BikeOption[];
}

export function BikeStationList({ options }: BikeStationListProps) {
  if (!options.length) return null;

  return (
    <div className="mt-4 pt-4 border-t border-zinc-800">
      <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-2.5">
        Nearby Bike Stations
      </p>
      <div className="space-y-2">
        {options.map((opt, i) => (
          <motion.div
            key={opt.id}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="flex items-center justify-between p-2.5 rounded-xl bg-zinc-900 border border-zinc-800"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-7 h-7 rounded-lg bg-orange-400/10 flex items-center justify-center flex-shrink-0">
                <Bike size={13} className="text-orange-400" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-medium text-zinc-200 truncate">{opt.name}</p>
                <p className="text-xs text-zinc-600">{opt.provider}</p>
              </div>
            </div>
            <div className="text-right flex-shrink-0 ml-2">
              <p className="text-xs font-semibold text-zinc-200">{opt.availableBikes} bikes</p>
              <p className="text-xs text-zinc-600">{formatDistance(opt.distanceMeters)}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
