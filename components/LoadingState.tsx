import React from "react";

export function LoadingState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[440px] select-none">
      <div className="w-16 h-16 border-2 border-[var(--color-frame,#111111)] flex items-center justify-center text-3xl font-mono text-[var(--color-accent,#D94826)] mb-4 bg-[var(--color-canvas,#F5F5F3)] blueprint-shadow-sm">
        <span className="spin-slash inline-block">/</span>
      </div>
      <h3 className="font-display font-bold text-base uppercase tracking-wider text-[var(--color-frame,#111111)] mb-2 animate-pulse">
        Analyzing Code
      </h3>
      <p className="font-mono text-xs text-neutral-500 max-w-xs leading-relaxed mb-6">
        Evaluating computational complexity and architectural purity...
      </p>
      <div className="w-48 h-1 bg-[var(--color-subtle,#E6E6E2)] overflow-hidden">
        <div className="h-full bg-[var(--color-frame,#111111)] animate-pulse w-2/3"></div>
      </div>
    </div>
  );
}
