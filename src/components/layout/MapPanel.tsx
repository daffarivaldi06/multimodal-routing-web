"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Map, Navigation, Pin } from "lucide-react";
import type { RoutingResult } from "@/types/api";

// ── Static placeholder shown when no route is planned ──
function StaticMapPlaceholder({ result }: { result?: RoutingResult | null }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-5 z-10 select-none pointer-events-none">
      {result ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-zinc-800/80 backdrop-blur-xl border border-zinc-700/50 shadow-xl">
              <Pin size={14} className="text-emerald-400" />
              <span className="text-sm font-medium text-zinc-200">{result.origin}</span>
            </div>
            <Navigation size={16} className="text-zinc-600" />
            <div className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-zinc-800/80 backdrop-blur-xl border border-zinc-700/50 shadow-xl">
              <Pin size={14} className="text-blue-400 fill-blue-400/30" />
              <span className="text-sm font-medium text-zinc-200">{result.destination}</span>
            </div>
          </div>
          <div className="px-4 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-zinc-800 text-xs text-zinc-400">
            Rendering route...
          </div>
        </motion.div>
      ) : (
        <>
          <div className="relative">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700/50 flex items-center justify-center shadow-2xl">
              <Map size={32} className="text-zinc-500" />
            </div>
            <motion.div
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 rounded-full bg-zinc-800/70 backdrop-blur-xl border border-zinc-700/50 text-xs text-zinc-400 shadow-lg"
            >
              📍 Interactive Map
            </motion.div>
          </div>
          <p className="text-xs text-zinc-600 mt-2 text-center max-w-[220px] leading-relaxed">
            Your multimodal route and stations will be rendered interactively on the map
          </p>
        </>
      )}
    </div>
  );
}

// ── SSR-safe dynamic import of Leaflet ──
const LeafletMap = dynamic(
  () => import("./LeafletMap"),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center">
        <StaticMapPlaceholder />
      </div>
    ),
  }
);

// ── MapPanel ──
export interface MapPanelProps {
  result?: RoutingResult | null;
}

export function MapPanel({ result }: MapPanelProps) {
  return (
    <div className="flex-1 relative overflow-hidden bg-zinc-900 w-full h-full min-h-[500px]">
      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Gradient orbs (shown behind map) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/3 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/3 w-48 h-48 rounded-full bg-violet-500/5 blur-3xl" />
      </div>

      {/* Interactive Leaflet map - rendered whenever routing result is active */}
      {result ? (
        <div className="absolute inset-0 z-10 w-full h-full">
          <LeafletMap result={result} />
        </div>
      ) : (
        <StaticMapPlaceholder result={result} />
      )}
    </div>
  );
}
