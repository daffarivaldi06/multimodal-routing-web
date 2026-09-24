"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STEPS = [
  { id: 0, text: "Parsing natural language query...",       detail: "NLP tokenization" },
  { id: 1, text: "Geocoding origin & destination...",       detail: "PostGIS ST_MakePoint" },
  { id: 2, text: "Querying transit database...",            detail: "GTFS spatial lookup" },
  { id: 3, text: "Orchestrating multimodal legs...",        detail: "LangChain AgentExecutor" },
  { id: 4, text: "Compiling final itinerary...",            detail: "Route cache write" },
];

const STEP_DURATION_MS = 1800;

export function LoadingSkeleton() {
  const [activeStep, setActiveStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [blink, setBlink] = useState(true);

  // Advance steps on a timer
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        const next = prev + 1;
        if (next < STEPS.length) {
          setCompletedSteps((c) => [...c, prev]);
          return next;
        }
        // Loop back to create an endless feel
        setCompletedSteps([]);
        return 0;
      });
    }, STEP_DURATION_MS);
    return () => clearInterval(interval);
  }, []);

  // Blinking cursor
  useEffect(() => {
    const blinkInterval = setInterval(() => setBlink((b) => !b), 530);
    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <div className="p-4 space-y-3">
      {/* Terminal header */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/80 overflow-hidden shadow-xl">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-zinc-800/60 border-b border-zinc-800">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
          </div>
          <span className="text-[10px] font-mono text-zinc-500 ml-1">agent.reasoning</span>
          <div className="ml-auto flex items-center gap-1.5">
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ repeat: Infinity, duration: 1.4 }}
              className="w-1.5 h-1.5 rounded-full bg-emerald-400"
            />
            <span className="text-[10px] font-mono text-emerald-400">RUNNING</span>
          </div>
        </div>

        {/* Terminal body */}
        <div className="p-4 font-mono text-xs space-y-2 min-h-[160px]">
          <AnimatePresence mode="popLayout">
            {STEPS.map((step) => {
              const isDone = completedSteps.includes(step.id);
              const isActive = step.id === activeStep;
              const isPending = !isDone && !isActive;

              if (isPending && step.id > activeStep) return null;

              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: isPending ? 0.3 : 1, x: 0 }}
                  transition={{ duration: 0.25 }}
                  className="flex items-start gap-2"
                >
                  {/* Status indicator */}
                  <span className="flex-shrink-0 w-4 mt-0.5">
                    {isDone ? (
                      <span className="text-emerald-400">✓</span>
                    ) : isActive ? (
                      <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ repeat: Infinity, duration: 1 }}
                        className="text-blue-400"
                      >
                        ›
                      </motion.span>
                    ) : (
                      <span className="text-zinc-700">·</span>
                    )}
                  </span>

                  {/* Step text */}
                  <div className="flex-1 min-w-0">
                    <span
                      className={
                        isDone
                          ? "text-zinc-500"
                          : isActive
                          ? "text-zinc-200"
                          : "text-zinc-700"
                      }
                    >
                      {step.text}
                      {isActive && (
                        <span
                          className={`inline-block w-[6px] h-[11px] ml-0.5 bg-blue-400 align-text-bottom transition-opacity ${blink ? "opacity-100" : "opacity-0"}`}
                        />
                      )}
                    </span>
                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-[10px] text-zinc-600 mt-0.5"
                      >
                        [{step.detail}]
                      </motion.div>
                    )}
                  </div>

                  {/* Timestamp (done steps) */}
                  {isDone && (
                    <span className="text-[10px] text-zinc-700 flex-shrink-0">ok</span>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 w-full rounded-full bg-zinc-800 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
          animate={{
            width: `${((completedSteps.length) / STEPS.length) * 100}%`,
          }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
      <p className="text-[10px] text-zinc-600 text-center">
        This may take 30–60s while the LLM orchestrates your route
      </p>
    </div>
  );
}
