import { AI, APP } from "@/config/app.config";
import React from "react";

interface StatusBarProps {
  isRoasting: boolean;
}

export function StatusBar({ isRoasting }: StatusBarProps) {
  return (
    <footer className="border-t-2 border-[var(--color-frame,#111111)] bg-[var(--color-canvas,#F5F5F3)] px-4 py-2 flex flex-col gap-1 text-[11px] font-mono select-none">
      {/* Top Status Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-neutral-600">
        <div className="flex items-center gap-3">
          {isRoasting ? (
            <span className="flex items-center gap-1.5 text-[var(--color-smell,#D97706)] font-bold">
              <span className="w-2 h-2 rounded-full bg-[var(--color-smell,#D97706)] inline-block animate-ping"></span>
              STATUS: PROCESSING...
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-neutral-900 font-medium">
              <span className="w-2 h-2 rounded-full bg-[var(--color-opt,#15803D)] inline-block"></span>
              STATUS: ONLINE ({AI.modelLabel.toUpperCase()})
            </span>
          )}

          <span className="text-neutral-400 hidden sm:inline">|</span>
          <span className="text-neutral-600 hidden sm:inline">
            ENGINE: GOOGLE GEMINI
          </span>
        </div>

        <div className="text-neutral-800 uppercase tracking-widest font-semibold">
          {APP.name} {APP.version} // LIVE
        </div>
      </div>

      {/* Subtitle Workshop Line */}
      <div className="text-center text-[10px] text-neutral-500 border-t border-[var(--color-subtle,#E6E6E2)] pt-1">
        Made at GDG Nashik Pre-DevFest Workshop
      </div>
    </footer>
  );
}
