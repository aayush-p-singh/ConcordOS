"use node";

import { action } from "../_generated/server";
import { v } from "convex/values";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export const generateCEOApproval = action({
  args: {
    executiveSummary: v.string(),
    recommendation: v.string(),
    conflicts: v.string(),
    risks: v.string(),
    confidence: v.number(),
  },

  handler: async (_, args) => {
    const prompt = `
You are the CEO of a Fortune 500 company.

Review the AI negotiation result.

Executive Summary:
${args.executiveSummary}

Recommendation:
${args.recommendation}

Conflicts:
${args.conflicts}

Risks:
${args.risks}

Confidence:
${args.confidence}%

Return ONLY valid JSON.

{
  "decision":"Approved | Rejected | Revision Requested",
  "comment":"Short CEO reasoning (2-4 sentences)"
}

Rules:

If confidence >=90 and risks are manageable:
Approved

If confidence between 70-89:
Revision Requested

If confidence below 70:
Rejected
`;

    const response = await client.chat.completions.create({
      model: "gpt-5.5",
      temperature: 0.2,
      messages: [
        {
          role: "system",
          content:
            "You are a decisive CEO. Respond with JSON only.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });

    const content = response.choices[0].message.content ?? "{}";

    try {
      return JSON.parse(content);
    } catch {
      return {
        decision: "Revision Requested",
        comment:
          "Unable to confidently determine approval. Human review is recommended.",
      };
    }
  },
});