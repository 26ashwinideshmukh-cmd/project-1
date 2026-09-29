import { DEFAULTS, LANGUAGES, LIMITS, ROAST_LEVELS } from "@/config/app.config";
import { analyzeCode } from "@/lib/gemini";
import type { LanguageId, RoastLevel } from "@/types/roast";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let body: any;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON in request body." },
      { status: 400 }
    );
  }

  const code: string = typeof body?.code === "string" ? body.code : "";
  const errorMessage: string =
    typeof body?.errorMessage === "string" ? body.errorMessage.trim() : "";

  // 1. Validate empty code
  if (!code || code.trim() === "") {
    return NextResponse.json({ error: "No code provided." }, { status: 400 });
  }

  // 2. Validate code length
  if (code.length > LIMITS.maxCodeLength) {
    return NextResponse.json(
      {
        error: `Code exceeds maximum allowed length of ${LIMITS.maxCodeLength.toLocaleString()} characters (received ${code.length.toLocaleString()}).`,
      },
      { status: 400 }
    );
  }

  // 3. Validate error message length
  if (errorMessage.length > LIMITS.maxErrorMessageLength) {
    return NextResponse.json(
      {
        error: `Error message exceeds maximum allowed length of ${LIMITS.maxErrorMessageLength.toLocaleString()} characters (received ${errorMessage.length.toLocaleString()}).`,
      },
      { status: 400 }
    );
  }

  // Fallback language & roastLevel if invalid
  const validLanguages = LANGUAGES.map((l) => l.id as string);
  const validRoastLevels = ROAST_LEVELS.map((r) => r.id as string);

  const language: LanguageId = validLanguages.includes(body?.language)
    ? body.language
    : DEFAULTS.language;

  const roastLevel: RoastLevel = validRoastLevels.includes(body?.roastLevel)
    ? body.roastLevel
    : DEFAULTS.roastLevel;

  try {
    const result = await analyzeCode({
      language,
      code,
      roastLevel,
      errorMessage: errorMessage || undefined,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (err: any) {
    console.error("[/api/roast] Analysis failure:", err);
    const message =
      err instanceof Error ? err.message : "Internal server error during analysis.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
