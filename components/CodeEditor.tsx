"use client";

import { LANGUAGES } from "@/config/app.config";
import type { LanguageId } from "@/types/roast";
import React, { useCallback, useEffect, useRef, useState } from "react";

interface CodeEditorProps {
  code: string;
  onChange: (code: string) => void;
  language: LanguageId;
  errorLine?: number;
  onLoadSample: () => void;
}

export function CodeEditor({
  code,
  onChange,
  language,
  errorLine,
  onLoadSample,
}: CodeEditorProps) {
  const [cursor, setCursor] = useState({ line: 1, col: 1 });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const gutterRef = useRef<HTMLDivElement>(null);

  const lines = code.split("\n");
  const lineCount = Math.max(lines.length, 10);

  const langObj = LANGUAGES.find((l) => l.id === language);
  const languageLabel = langObj ? `${langObj.label} (${langObj.extension})` : language;

  const updateCursorPosition = useCallback(() => {
    if (!textareaRef.current) return;
    const { selectionStart } = textareaRef.current;
    const textBefore = code.slice(0, selectionStart);
    const splitLines = textBefore.split("\n");
    const currentLine = splitLines.length;
    const currentCol = splitLines[splitLines.length - 1].length + 1;
    setCursor({ line: currentLine, col: currentCol });
  }, [code]);

  const handleScroll = () => {
    if (textareaRef.current && gutterRef.current) {
      gutterRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      const textarea = textareaRef.current;
      if (!textarea) return;

      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      const newCode = code.substring(0, start) + "    " + code.substring(end);
      onChange(newCode);

      requestAnimationFrame(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 4;
          updateCursorPosition();
        }
      });
    }
  };

  useEffect(() => {
    updateCursorPosition();
  }, [code, updateCursorPosition]);

  return (
    <section className="flex flex-col h-full bg-[var(--color-panel,#FDFDFD)]">
      {/* 40px Header Strip */}
      <div className="h-10 border-b border-[var(--color-subtle,#E6E6E2)] bg-[var(--color-canvas,#F5F5F3)] px-4 flex items-center justify-between text-xs font-mono select-none">
        <div className="flex items-center gap-2">
          <span className="text-neutral-500 uppercase tracking-wider text-[11px]">
            INPUT // SRC
          </span>
          <span className="text-neutral-400">—</span>
          <span className="font-bold text-[var(--color-frame,#111111)] uppercase tracking-wide">
            Your Code
          </span>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <button
            type="button"
            onClick={onLoadSample}
            className="text-neutral-600 hover:text-[var(--color-accent,#D94826)] underline decoration-neutral-400 uppercase tracking-wider cursor-pointer"
          >
            SAMPLE BUG
          </button>
          <span className="text-neutral-300">|</span>
          <button
            type="button"
            onClick={() => onChange("")}
            className="text-neutral-600 hover:text-black uppercase tracking-wider cursor-pointer"
          >
            CLEAR
          </button>
        </div>
      </div>

      {/* Editor Body: Gutter + Textarea */}
      <div className="flex-1 flex overflow-hidden font-mono text-xs relative bg-[var(--color-panel,#FDFDFD)]">
        {/* Line Numbers Gutter */}
        <div
          ref={gutterRef}
          aria-hidden="true"
          className="w-12 bg-[var(--color-canvas,#F5F5F3)] border-r border-[var(--color-subtle,#E6E6E2)] py-3 text-right pr-3 select-none text-neutral-400 font-mono leading-6 overflow-hidden"
        >
          {Array.from({ length: lineCount }, (_, i) => i + 1).map((lineNum) => {
            const isError = lineNum === errorLine;
            return (
              <div
                key={lineNum}
                className={
                  isError
                    ? "text-[var(--color-accent,#D94826)] font-bold bg-[rgba(217,72,38,0.12)] -mr-3 pr-3 border-r-2 border-[var(--color-accent,#D94826)]"
                    : ""
                }
              >
                {String(lineNum).padStart(2, "0")}
              </div>
            );
          })}
        </div>

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={code}
          onChange={(e) => onChange(e.target.value)}
          onScroll={handleScroll}
          onSelect={updateCursorPosition}
          onClick={updateCursorPosition}
          onKeyUp={updateCursorPosition}
          onKeyDown={handleKeyDown}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
          placeholder="// Paste your code here..."
          className="flex-1 p-3 font-mono text-xs leading-6 text-neutral-900 bg-transparent resize-none focus:outline-none whitespace-pre overflow-auto"
          style={{ tabSize: 4 }}
        />
      </div>

      {/* 8px / Bottom Status Strip Overlay */}
      <div className="h-8 border-t border-[var(--color-subtle,#E6E6E2)] bg-[var(--color-canvas,#F5F5F3)] px-4 flex items-center justify-between text-[11px] font-mono text-neutral-600 select-none">
        <div>
          Ln {cursor.line}, Col {cursor.col} · {languageLabel}
        </div>
        <div className="hidden sm:block text-neutral-500">
          UTF-8 · Tab Size: 4
        </div>
      </div>
    </section>
  );
}
