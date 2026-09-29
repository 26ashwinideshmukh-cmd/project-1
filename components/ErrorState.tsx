import React from "react";

interface ErrorStateProps {
  error: string;
  onRetry: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  const displayError =
    error && error.trim() !== ""
      ? error
      : "An unknown error occurred during code evaluation.";

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[440px]">
      <div className="w-16 h-16 border-2 border-[var(--color-accent,#D94826)] flex items-center justify-center text-3xl font-mono text-[var(--color-accent,#D94826)] mb-4 bg-orange-50 blueprint-shadow-accent select-none">
        !
      </div>
      <h3 className="font-display font-bold text-base uppercase tracking-wider text-[var(--color-accent,#D94826)] mb-2">
        Analysis Failed
      </h3>
      <div className="font-mono text-xs text-neutral-800 max-w-sm leading-relaxed mb-6 bg-[var(--color-canvas,#F5F5F3)] p-3 border border-[var(--color-subtle,#E6E6E2)] text-left break-words">
        {displayError}
      </div>
      <button
        type="button"
        onClick={onRetry}
        className="bg-[var(--color-frame,#111111)] text-white hover:bg-[var(--color-accent,#D94826)] px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider blueprint-shadow-sm transition-colors cursor-pointer active:translate-x-[1px] active:translate-y-[1px]"
      >
        RETRY ANALYSIS ↵
      </button>
    </div>
  );
}
