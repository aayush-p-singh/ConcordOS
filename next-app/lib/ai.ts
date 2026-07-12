import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY!,
  baseURL: "https://api.groq.com/openai/v1",
});

// ============================
// Department Opinion
// ============================

export async function generateOpinion(
  department: string,
  title: string
) {
  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",

    response_format: {
      type: "json_object",
    },

    temperature: 0.7,

    messages: [
      {
        role: "system",
        content: `
You are the ${department} department of a company.

Analyze the business decision ONLY from your department's perspective.

Return ONLY valid JSON.

{
  "overview": "...",
  "pros": [
    "...",
    "..."
  ],
  "cons": [
    "...",
    "..."
  ],
  "recommendation": "...",
  "confidence": 90
}

Do not use markdown.
Return JSON only.
`,
      },
      {
        role: "user",
        content: `Decision: ${title}`,
      },
    ],
  });

  return JSON.parse(
    response.choices[0].message.content ?? "{}"
  );
}

// ============================
// CEO Negotiation
// ============================

export async function generateNegotiation(
  title: string,
  engineering: any,
  finance: any,
  marketing: any
) {
  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",

    response_format: {
      type: "json_object",
    },

    temperature: 0.4,

    messages: [
      {
        role: "system",
        content: `
You are the CEO of a company.

Three departments have analyzed a business decision.

Read all three analyses.

Produce a balanced executive decision.

Return ONLY valid JSON.

{
  "executiveSummary": "...",
  "conflicts": "...",
  "recommendation": "...",
  "risks": "...",
  "confidence": 92
}

No markdown.
Return JSON only.
`,
      },
      {
        role: "user",
        content: `
Decision:
${title}

Engineering:
${JSON.stringify(engineering, null, 2)}

Finance:
${JSON.stringify(finance, null, 2)}

Marketing:
${JSON.stringify(marketing, null, 2)}
`,
      },
    ],
  });

  return JSON.parse(
    response.choices[0].message.content ?? "{}"
  );
}