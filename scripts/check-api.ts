import { AI, SAMPLE } from "../config/app.config";
import { analyzeCode } from "../lib/gemini";

async function main() {
  console.log(`[check-api] Testing Gemini connection with model: ${AI.model}...`);

  const sampleError =
    "Traceback (most recent call last):\n  File 'test.py', line 4, in calculate_average\nTypeError: unsupported operand type(s) for +=: 'int' and 'list'";

  try {
    const result = await analyzeCode({
      language: SAMPLE.language,
      code: SAMPLE.code,
      roastLevel: "sharp",
      errorMessage: sampleError,
    });

    console.log("\n--- API CHECK SUCCESSFUL ---");
    console.log(`Roast: ${result.roast}`);
    console.log(`Issues detected: ${result.issues.length}`);
    result.issues.forEach((issue, idx) => {
      console.log(`  [#${idx + 1}] Line ${issue.line} [${issue.severity}]: ${issue.title}`);
    });
    console.log(`Corrected code available: ${result.correctedCode ? "YES" : "NO"}`);
    console.log(`Takeaway: ${result.takeaway}`);
    console.log("----------------------------\n");
  } catch (error) {
    console.error("\n[check-api] ERROR:", error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();
