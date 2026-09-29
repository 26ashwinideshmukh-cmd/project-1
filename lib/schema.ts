import { SEVERITIES } from "@/config/app.config";
import { Schema, Type } from "@google/genai";

export const roastResponseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    roast: {
      type: Type.STRING,
      description: "A witty, comedic roast of the code written in Hinglish with emojis.",
    },
    issues: {
      type: Type.ARRAY,
      description: "Structured list of detected issues sorted by severity.",
      items: {
        type: Type.OBJECT,
        properties: {
          line: {
            type: Type.INTEGER,
            description: "1-based line number where the issue occurs.",
          },
          severity: {
            type: Type.STRING,
            enum: [...SEVERITIES],
            description: "The severity of the issue: FATAL BUG, CODE SMELL, or OPTIMIZATION.",
          },
          title: {
            type: Type.STRING,
            description: "Brief title of the issue in Hinglish with emojis.",
          },
          codeSnippet: {
            type: Type.STRING,
            description: "The exact line or snippet of offending code.",
          },
          diagnosis: {
            type: Type.STRING,
            description: "Explanation of what is wrong in Hinglish with emojis.",
          },
          expected: {
            type: Type.STRING,
            description: "What should be done instead in Hinglish with emojis.",
          },
        },
        required: [
          "line",
          "severity",
          "title",
          "codeSnippet",
          "diagnosis",
          "expected",
        ],
      },
    },
    correctedCode: {
      type: Type.STRING,
      description: "The complete, working, corrected code without markdown fences.",
    },
    takeaway: {
      type: Type.STRING,
      description: "A memorable one-sentence lesson/punchline in Hinglish with emojis.",
    },
  },
  required: ["roast", "issues", "correctedCode", "takeaway"],
};
