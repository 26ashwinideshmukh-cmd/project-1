"use client";

import { DEFAULTS, SAMPLE } from "@/config/app.config";
import { CodeEditor } from "@/components/CodeEditor";
import { ErrorMessageInput } from "@/components/ErrorMessageInput";
import { RoastControls } from "@/components/RoastControls";
import { RoastReport } from "@/components/RoastReport";
import { StatusBar } from "@/components/StatusBar";
import { TopBar } from "@/components/TopBar";
import { requestRoast } from "@/lib/api";
import type { LanguageId, ReportState, RoastLevel, RoastResult } from "@/types/roast";
import React, { useCallback, useEffect, useState } from "react";

export function Workspace() {
  const [roastLevel, setRoastLevel] = useState<RoastLevel>(DEFAULTS.roastLevel);
  const [language, setLanguage] = useState<LanguageId>(DEFAULTS.language);
  const [code, setCode] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [errorDrawerOpen, setErrorDrawerOpen] = useState<boolean>(false);
  const [reportState, setReportState] = useState<ReportState>("empty");
  const [roastResult, setRoastResult] = useState<RoastResult | null>(null);
  const [roastedCode, setRoastedCode] = useState<string>("");
  const [apiError, setApiError] = useState<string>("");

  const isRoasting = reportState === "loading";

  const handleRoast = useCallback(async () => {
    if (isRoasting) return;

    if (!code || code.trim() === "") {
      setApiError("No code provided. I can't roast the void.");
      setReportState("error");
      return;
    }

    setReportState("loading");
    setApiError("");
    setRoastResult(null);

    try {
      const result = await requestRoast({
        language,
        code,
        roastLevel,
        errorMessage: errorMessage.trim() || undefined,
      });

      setRoastResult(result);
      setRoastedCode(code);
      setReportState("results");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Failed to generate code roast.";
      setApiError(message);
      setReportState("error");
    }
  }, [code, errorMessage, isRoasting, language, roastLevel]);

  const handleLoadSample = useCallback(() => {
    setLanguage(SAMPLE.language);
    setCode(SAMPLE.code);
  }, []);

  const handleApplyFix = useCallback((fixedCode: string) => {
    setCode(fixedCode);
  }, []);

  // Global keydown listener for Ctrl/Cmd+Enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        handleRoast();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleRoast]);

  // Highlight first issue's line only if code hasn't changed since roasting
  const errorLine =
    reportState === "results" && code === roastedCode
      ? roastResult?.issues?.[0]?.line
      : undefined;

  return (
    <main className="w-full max-w-[1360px] my-auto bg-[var(--color-panel,#FDFDFD)] border-2 border-[var(--color-frame,#111111)] blueprint-shadow flex flex-col overflow-hidden">
      {/* Top Bar with Roast Controls */}
      <TopBar>
        <RoastControls
          roastLevel={roastLevel}
          onRoastLevelChange={setRoastLevel}
          language={language}
          onLanguageChange={setLanguage}
          onRoast={handleRoast}
          isRoasting={isRoasting}
          errorDrawerOpen={errorDrawerOpen}
          onToggleErrorDrawer={() => setErrorDrawerOpen((prev) => !prev)}
        />
      </TopBar>

      {/* Conditionally rendered Error Message Drawer */}
      {errorDrawerOpen && (
        <ErrorMessageInput
          value={errorMessage}
          onChange={setErrorMessage}
          onClose={() => setErrorDrawerOpen(false)}
        />
      )}

      {/* Responsive two-column body */}
      <div className="flex flex-col lg:flex-row flex-1 min-h-[600px] border-b-0">
        {/* Left Column: Code Editor (~54-55%) */}
        <div className="w-full lg:w-[55%] border-b-2 lg:border-b-0 lg:border-r-2 border-[var(--color-frame,#111111)] flex flex-col">
          <CodeEditor
            code={code}
            onChange={setCode}
            language={language}
            errorLine={errorLine}
            onLoadSample={handleLoadSample}
          />
        </div>

        {/* Right Column: Roast Report (~46-45%) */}
        <div className="w-full lg:w-[45%] flex flex-col">
          <RoastReport
            state={reportState}
            roastLevel={roastLevel}
            language={language}
            result={roastResult}
            errorMsg={apiError}
            onRetry={handleRoast}
            onApplyFix={handleApplyFix}
          />
        </div>
      </div>

      {/* Persistent Status Bar */}
      <StatusBar isRoasting={isRoasting} />
    </main>
  );
}
