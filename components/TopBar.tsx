import { APP } from "@/config/app.config";
import React from "react";

interface TopBarProps {
  children: React.ReactNode;
}

export function TopBar({ children }: TopBarProps) {
  return (
    <header className="border-b-2 border-[var(--color-frame,#111111)] bg-[var(--color-panel,#FDFDFD)] px-4 py-3 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
      {/* Left: App Identity */}
      <div className="flex items-center gap-3 select-none">
        <h1 className="font-display font-bold text-xl tracking-[0.18em] uppercase text-[var(--color-frame,#111111)]">
          {APP.name}
        </h1>
        <span className="text-xs px-2 py-0.5 border border-[var(--color-frame,#111111)] font-mono font-semibold text-[var(--color-frame,#111111)] bg-[var(--color-canvas,#F5F5F3)]">
          {APP.version}
        </span>
      </div>

      {/* Right: Controls */}
      <div className="flex flex-wrap items-center gap-3 text-xs font-mono">
        {children}
      </div>
    </header>
  );
}
