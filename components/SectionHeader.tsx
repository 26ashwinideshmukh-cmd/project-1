import React from "react";

interface SectionHeaderProps {
  number: number;
  title: string;
  children?: React.ReactNode;
}

export function SectionHeader({ number, title, children }: SectionHeaderProps) {
  const paddedNumber = String(number).padStart(2, "0");

  return (
    <div className="flex items-center justify-between border-b border-[var(--color-frame,#111111)] pb-1.5 font-mono">
      <span className="font-bold text-xs tracking-widest uppercase text-[var(--color-frame,#111111)]">
        {paddedNumber} // {title}
      </span>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
}
