"use client";

import { motion } from "framer-motion";
import { Compass } from "lucide-react";

const features = [
  { icon: "🗺", label: "Geocoding" },
  { icon: "🚆", label: "Multi-operator" },
  { icon: "⚡", label: "AI-powered" },
];

export function EmptyState() {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: { staggerChildren: 0.12, delayChildren: 0.1 },
        },
      }}
      className="flex flex-col items-center justify-center py-14 px-6 text-center select-none"
    >
      {/* Icon with pulsing rings */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 16 },
          show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
        }}
        className="relative mb-6"
      >
        {/* Outer pulse ring */}
        <motion.div
          animate={{ scale: [1, 1.18, 1], opacity: [0.15, 0.04, 0.15] }}
          transition={{ repeat: Infinity, duration: 3.2 }}
          className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500 to-violet-600 -m-3"
        />
        {/* Inner pulse ring */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.06, 0.2] }}
          transition={{ repeat: Infinity, duration: 3.2, delay: 0.4 }}
          className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500 to-violet-600 -m-1.5"
        />
        {/* Icon container */}
        <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700/60 flex items-center justify-center shadow-2xl shadow-black/40">
          <Compass size={28} className="text-zinc-300" strokeWidth={1.5} />
        </div>
      </motion.div>

      {/* Headline */}
      <motion.h2
        variants={{
          hidden: { opacity: 0, y: 16 },
          show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
        }}
        className="text-lg font-semibold text-zinc-100 mb-1.5 tracking-tight"
      >
        Where to next?
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        variants={{
          hidden: { opacity: 0, y: 16 },
          show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
        }}
        className="text-xs text-zinc-500 leading-relaxed max-w-[240px] mb-6"
      >
        Enter your transit request above and the AI agent will orchestrate a complete
        door-to-door itinerary.
      </motion.p>

      {/* Feature chips */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 16 },
          show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
        }}
        className="flex items-center gap-2 flex-wrap justify-center"
      >
        {features.map(({ icon, label }) => (
          <span
            key={label}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-zinc-800/60 border border-zinc-700/50 text-zinc-400 backdrop-blur-sm"
          >
            <span>{icon}</span>
            {label}
          </span>
        ))}
      </motion.div>

      {/* Subtle hint */}
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 16 },
          show: { opacity: 1, y: 0, transition: { duration: 0.4 } },
        }}
        className="mt-8 flex items-center gap-2 text-zinc-700"
      >
        <div className="h-px w-8 bg-zinc-800" />
        <span className="text-[10px] uppercase tracking-widest">
          powered by LangChain + Gemini
        </span>
        <div className="h-px w-8 bg-zinc-800" />
      </motion.div>
    </motion.div>
  );
}
