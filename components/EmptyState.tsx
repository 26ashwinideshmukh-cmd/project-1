import React from "react";

export function EmptyState() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center min-h-[440px] select-none">
      <div className="w-16 h-16 border-2 border-dashed border-[var(--color-frame,#111111)] flex items-center justify-center text-2xl font-mono text-neutral-400 mb-4 bg-[var(--color-canvas,#F5F5F3)]">
        &#123; &#125;
      </div>
      <h3 className="font-display font-bold text-base uppercase tracking-wider text-[var(--color-frame,#111111)] mb-2">
        Awaiting Code Submission
      </h3>
      <p className="font-mono text-xs text-neutral-500 max-w-xs leading-relaxed mb-6">
        Paste your code on the left, then click{" "}
        <span className="text-[var(--color-frame,#111111)] font-semibold">
          &quot;ROAST MY CODE&quot;
        </span>{" "}
        or press <kbd className="bg-[var(--color-canvas,#F5F5F3)] border border-[var(--color-frame,#111111)] px-1 py-0.5 text-[10px]">Ctrl+Enter</kbd> (⌘+Enter on Mac).
      </p>
      <div className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest border-t border-[var(--color-subtle,#E6E6E2)] pt-3 w-40">
        // READY //
      </div>
    </div>
  );
}
