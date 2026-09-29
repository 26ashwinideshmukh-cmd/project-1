import { AI } from "@/config/app.config";
import { ROAST_SYSTEM_INSTRUCTION, buildUserPrompt } from "@/lib/prompt";
import { roastResponseSchema } from "@/lib/schema";
import type { RoastRequest, RoastResult } from "@/types/roast";
import { GoogleGenAI } from "@google/genai";

function friendlyErrorMessage(status: number | undefined, error: unknown): string {
  const rawMsg = error instanceof Error ? error.message : String(error);

  switch (status) {
    case 400:
      return `Invalid request to Gemini API (400): ${rawMsg}. Please check input parameters.`;
    case 403:
      return "Authentication failed (403): Invalid or unauthorized GEMINI_API_KEY. Verify your key in .env.local and restart the server.";
    case 404:
      return `Model not found (404): Model "${AI.model}" was not recognized. Check AI.model in config/app.config.ts.`;
    case 429:
      return "Rate limit exceeded (429): Too many requests to Gemini API. Please wait a moment before roasting again.";
    case 503:
      return "Gemini service temporarily overloaded (503): High traffic on Google AI servers. Retried but still busy. Please try again shortly.";
    default:
      return `Gemini API Error${status ? ` (${status})` : ""}: ${rawMsg}`;
  }
}

export async function analyzeCode(request: RoastRequest): Promise<RoastResult> {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey.trim() === "") {
    throw new Error(
      "GEMINI_API_KEY is missing. Copy .env.example to .env.local, add your key, and restart the server."
    );
  }

  const ai = new GoogleGenAI({ apiKey });
  const contents = buildUserPrompt(request);

  let lastError: unknown = null;

  for (let attempt = 1; attempt <= AI.maxAttempts; attempt++) {
    try {
      const response = await ai.models.generateContent({
        model: AI.model,
        contents,
        config: {
          systemInstruction: ROAST_SYSTEM_INSTRUCTION,
          responseMimeType: "application/json",
          responseSchema: roastResponseSchema,
        },
      });

      const responseText = response.text;
      if (!responseText || responseText.trim() === "") {
        throw new Error("Received empty response from Gemini API.");
      }

      let parsed: any;
      try {
        parsed = JSON.parse(responseText);
      } catch (parseErr) {
        throw new Error(
          `Failed to parse JSON response from Gemini: ${parseErr instanceof Error ? parseErr.message : String(parseErr)}`
        );
      }

      return {
        roast: parsed.roast ?? "",
        issues: Array.isArray(parsed.issues) ? parsed.issues : [],
        correctedCode: parsed.correctedCode ?? "",
        takeaway: parsed.takeaway ?? "",
      };
    } catch (err: any) {
      lastError = err;
      const status =
        err?.status || err?.statusCode || (typeof err?.code === "number" ? err.code : undefined);

      if (status === 503 && attempt < AI.maxAttempts) {
        await new Promise((resolve) => setTimeout(resolve, attempt * 1000));
        continue;
      }

      const message = friendlyErrorMessage(status, err);
      throw new Error(message);
    }
  }

  throw new Error(friendlyErrorMessage(503, lastError));
}
