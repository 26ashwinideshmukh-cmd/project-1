import React from "react";

interface ErrorMessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onClose: () => void;
}

export function ErrorMessageInput({
  value,
  onChange,
  onClose,
}: ErrorMessageInputProps) {
  return (
    <div className="border-b-2 border-[var(--color-frame,#111111)] bg-[var(--color-canvas,#F5F5F3)] p-4 transition-all">
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-600">
          Attach Terminal Traceback / Compiler Error (Optional)
        </span>
        <button
          type="button"
          onClick={onClose}
          className="text-xs font-mono text-neutral-500 hover:text-black cursor-pointer"
        >
          Dismiss ✕
        </button>
      </div>
      <textarea
        rows={2}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={`Traceback (most recent call last):\n  File "solution.py", line 4, in calculate_average\nTypeError: unsupported operand type(s) for +=: 'int' and 'list'`}
        className="w-full bg-[var(--color-panel,#FDFDFD)] border border-[var(--color-frame,#111111)] p-2.5 font-mono text-xs focus:outline-none focus:border-[var(--color-accent,#D94826)] resize-y"
      />
    </div>
  );
}
