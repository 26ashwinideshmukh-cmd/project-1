"use client";

import { LANGUAGES } from "@/config/app.config";
import { SectionHeader } from "@/components/SectionHeader";
import type { LanguageId } from "@/types/roast";
import { useState } from "react";

interface FixedCodeProps {
  sectionNumber: number;
  language: LanguageId;
  code: string;
  onApply: (code: string) => void;
}

export function FixedCode({
  sectionNumber,
  language,
  code,
  onApply,
}: FixedCodeProps) {
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "failed">(
    "idle"
  );

  const langObj = LANGUAGES.find((l) => l.id === language);
  const extension = langObj ? langObj.extension : "txt";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("failed");
    } finally {
      setTimeout(() => {
        setCopyStatus("idle");
      }, 2000);
    }
  };

  const copyLabel =
    copyStatus === "copied"
      ? "✓ COPIED TO CLIPBOARD"
      : copyStatus === "failed"
      ? "✕ COPY BLOCKED, SELECT MANUALLY"
      : "📋 COPY FIXED CODE";

  return (
    <div className="space-y-2.5 font-mono">
      <SectionHeader number={sectionNumber} title="Fix">
        <span className="text-[10px] font-bold text-[var(--color-opt,#15803D)] uppercase">
          CORRECTED CODE
        </span>
      </SectionHeader>

      <div className="border border-[var(--color-frame,#111111)] bg-[var(--color-panel,#FDFDFD)] blueprint-shadow-sm overflow-hidden">
        {/* Filename Header Strip */}
        <div className="bg-[var(--color-canvas,#F5F5F3)] border-b border-[var(--color-subtle,#E6E6E2)] px-3 py-1.5 flex items-center justify-between text-[11px] font-mono select-none">
          <span className="font-bold text-neutral-800">solution.{extension}</span>
          <span className="text-[10px] text-[var(--color-opt,#15803D)] font-semibold uppercase">
            READY TO APPLY
          </span>
        </div>

        {/* Code Content */}
        <pre className="p-3 font-mono text-xs text-neutral-900 leading-5 bg-[var(--color-panel,#FDFDFD)] overflow-x-auto whitespace-pre">
          <code>{code}</code>
        </pre>
      </div>

      {/* Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-xs">
        <button
          type="button"
          onClick={handleCopy}
          className="border border-[var(--color-frame,#111111)] bg-[var(--color-panel,#FDFDFD)] hover:bg-[var(--color-frame,#111111)] hover:text-white py-2 px-3 uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-1.5 blueprint-shadow-sm cursor-pointer active:translate-x-[1px] active:translate-y-[1px]"
        >
          <span>{copyLabel}</span>
        </button>

        <button
          type="button"
          onClick={() => onApply(code)}
          className="border border-[var(--color-frame,#111111)] bg-[var(--color-frame,#111111)] text-white hover:bg-[var(--color-accent,#D94826)] hover:border-[var(--color-accent,#D94826)] py-2 px-3 uppercase tracking-wider font-semibold transition-colors flex items-center justify-center gap-1.5 blueprint-shadow-sm cursor-pointer active:translate-x-[1px] active:translate-y-[1px]"
        >
          <span>APPLY TO EDITOR ↵</span>
        </button>
      </div>
    </div>
  );
}
