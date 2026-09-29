import { EmptyState } from "@/components/EmptyState";
import { ErrorState } from "@/components/ErrorState";
import { FixedCode } from "@/components/FixedCode";
import { IssueCard } from "@/components/IssueCard";
import { LoadingState } from "@/components/LoadingState";
import { SectionHeader } from "@/components/SectionHeader";
import type { LanguageId, ReportState, RoastLevel, RoastResult } from "@/types/roast";
import React from "react";

interface RoastReportProps {
  state: ReportState;
  roastLevel: RoastLevel;
  language: LanguageId;
  result: RoastResult | null;
  errorMsg: string;
  onRetry: () => void;
  onApplyFix: (code: string) => void;
}

export function RoastReport({
  state,
  roastLevel,
  language,
  result,
  errorMsg,
  onRetry,
  onApplyFix,
}: RoastReportProps) {
  return (
    <section className="flex flex-col h-full bg-[var(--color-panel,#FDFDFD)]">
      {/* 40px Header Strip */}
      <div className="h-10 border-b border-[var(--color-subtle,#E6E6E2)] bg-[var(--color-canvas,#F5F5F3)] px-4 flex items-center justify-between text-xs font-mono select-none">
        <div className="flex items-center gap-2">
          <span className="text-neutral-500 uppercase tracking-wider text-[11px]">
            AUDIT // REPORT
          </span>
          <span className="text-neutral-400">—</span>
          <span className="font-bold text-[var(--color-frame,#111111)] uppercase tracking-wide">
            Roast Report
          </span>
        </div>
        <div className="w-12"></div>
      </div>

      {/* Main Panel Content */}
      <div className="flex-1 overflow-y-auto flex flex-col">
        {state === "empty" && <EmptyState />}
        {state === "loading" && <LoadingState />}
        {state === "error" && <ErrorState error={errorMsg} onRetry={onRetry} />}

        {state === "results" && result && (
          <div className="flex-1 p-5 space-y-6 font-mono">
            {/* Section 1: Roast */}
            <div className="space-y-2.5">
              <SectionHeader number={1} title="Roast">
                <span className="text-[10px] font-mono text-neutral-500 uppercase">
                  STYLE: {roastLevel.toUpperCase()}
                </span>
              </SectionHeader>
              <div className="bg-[var(--color-canvas,#F5F5F3)] border-l-4 border-[var(--color-accent,#D94826)] border-y border-r border-[var(--color-subtle,#E6E6E2)] p-4 text-xs font-mono leading-relaxed text-[var(--color-frame,#111111)]">
                <p className="italic text-sm whitespace-pre-wrap">
                  &ldquo;{result.roast}&rdquo;
                </p>
              </div>
            </div>

            {/* Section 2: What's Wrong */}
            <div className="space-y-3">
              <SectionHeader number={2} title="What's Wrong">
                <span className="text-[10px] font-mono text-neutral-500 uppercase">
                  {result.issues.length === 1
                    ? "1 ISSUE"
                    : `${result.issues.length} ISSUES`}
                </span>
              </SectionHeader>

              {result.issues.length === 0 ? (
                <div className="bg-[var(--color-canvas,#F5F5F3)] border border-[var(--color-subtle,#E6E6E2)] p-4 text-xs font-mono text-[var(--color-opt,#15803D)] font-semibold">
                  No issues found. Suspiciously clean.
                </div>
              ) : (
                <div className="space-y-3">
                  {result.issues.map((issue, idx) => (
                    <IssueCard key={`${issue.line}-${idx}`} index={idx + 1} issue={issue} />
                  ))}
                </div>
              )}
            </div>

            {/* Section 3: Fix (ONLY when correctedCode is non-empty) */}
            {result.correctedCode && result.correctedCode.trim() !== "" && (
              <FixedCode
                sectionNumber={3}
                language={language}
                code={result.correctedCode}
                onApply={onApplyFix}
              />
            )}

            {/* Takeaway Section (ONLY when takeaway is non-empty) */}
            {result.takeaway && result.takeaway.trim() !== "" && (
              <div className="space-y-2 pb-2">
                <SectionHeader
                  number={
                    result.correctedCode && result.correctedCode.trim() !== "" ? 4 : 3
                  }
                  title="Takeaway"
                />
                <div className="bg-[var(--color-canvas,#F5F5F3)] border border-[var(--color-subtle,#E6E6E2)] p-3 text-xs font-mono text-neutral-800 leading-relaxed whitespace-pre-wrap">
                  {result.takeaway}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
