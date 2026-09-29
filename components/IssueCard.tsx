import type { RoastIssue, Severity } from "@/types/roast";

interface IssueCardProps {
  index: number;
  issue: RoastIssue;
}

const SEVERITY_STYLES: Record<
  Severity,
  { badgeClass: string; stripeClass: string }
> = {
  "FATAL BUG": {
    badgeClass:
      "bg-[rgba(217,72,38,0.1)] text-[var(--color-fatal,#D94826)] border-[var(--color-fatal,#D94826)]",
    stripeClass: "border-[var(--color-fatal,#D94826)]",
  },
  "CODE SMELL": {
    badgeClass:
      "bg-[rgba(217,119,6,0.1)] text-[var(--color-smell,#D97706)] border-[var(--color-smell,#D97706)]",
    stripeClass: "border-[var(--color-smell,#D97706)]",
  },
  OPTIMIZATION: {
    badgeClass:
      "bg-[rgba(21,128,61,0.1)] text-[var(--color-opt,#15803D)] border-[var(--color-opt,#15803D)]",
    stripeClass: "border-[var(--color-opt,#15803D)]",
  },
};

export function IssueCard({ index, issue }: IssueCardProps) {
  const paddedIndex = String(index).padStart(2, "0");
  const style =
    SEVERITY_STYLES[issue.severity] ?? SEVERITY_STYLES["CODE SMELL"];

  return (
    <div className="border border-[var(--color-frame,#111111)] bg-[var(--color-panel,#FDFDFD)] p-3 blueprint-shadow-sm space-y-2 font-mono">
      {/* Top Row */}
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          {/* Black index chip */}
          <span className="w-5 h-5 bg-[var(--color-frame,#111111)] text-white flex items-center justify-center text-[10px] font-bold select-none">
            {paddedIndex}
          </span>
          <span className="font-bold text-[var(--color-frame,#111111)]">
            LINE {issue.line}
          </span>
          <span
            className={`border px-1.5 py-0.2 text-[10px] font-bold uppercase tracking-wider ${style.badgeClass}`}
          >
            {issue.severity}
          </span>
        </div>
        <span className="text-[11px] text-neutral-500 text-right flex-1 break-words">
          {issue.title}
        </span>
      </div>

      {/* Code Snippet with accent stripe */}
      <div
        className={`border-l-2 ${style.stripeClass} bg-[var(--color-canvas,#F5F5F3)] px-2.5 py-1.5 font-mono text-xs text-neutral-800 overflow-x-auto`}
      >
        <pre className="whitespace-pre">
          <code>{issue.codeSnippet}</code>
        </pre>
      </div>

      {/* Diagnosis & Expected */}
      <div className="space-y-1 text-xs font-mono pt-0.5">
        <div className="text-[var(--color-accent,#D94826)] flex items-start gap-1.5 leading-snug">
          <span className="font-bold select-none">✕</span>
          <span>
            <strong>Diagnosis:</strong> {issue.diagnosis}
          </span>
        </div>
        <div className="text-[var(--color-opt,#15803D)] flex items-start gap-1.5 leading-snug">
          <span className="font-bold select-none">✓</span>
          <span>
            <strong>Expected:</strong> {issue.expected}
          </span>
        </div>
      </div>
    </div>
  );
}
