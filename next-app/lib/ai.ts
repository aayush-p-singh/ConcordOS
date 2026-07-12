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
  marketing: any,
  transcript: string
) {
  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",

    messages: [
      {
        role: "system",
        content: `
You are the CEO moderating a meeting between Engineering,
Finance and Marketing.

Your job is to analyse:

- Initial opinions
- Entire debate transcript

Return ONLY valid JSON.

{
  "executiveSummary":"...",
  "conflicts":"...",
  "recommendation":"...",
  "risks":"...",
  "confidence":92,
  "consensusReached":true
}

Return JSON only.
No markdown.
`,
      },
      {
        role: "user",
        content: `
Decision

${title}

Engineering Initial Opinion

${JSON.stringify(engineering, null, 2)}

Finance Initial Opinion

${JSON.stringify(finance, null, 2)}

Marketing Initial Opinion

${JSON.stringify(marketing, null, 2)}

Debate Transcript

${transcript}
`,
      },
    ],

    response_format: {
      type: "json_object",
    },

    temperature: 0.4,
  });

  return JSON.parse(response.choices[0].message.content ?? "{}");
}

export async function generateRebuttal(
  department: string,
  ownOpinion: any,
  otherOpinions: any[]
) {
  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",

    response_format: {
      type: "json_object",
    },

    temperature: 0.6,

    messages: [
      {
        role: "system",
        content: `
You are the ${department} department.

You have already analyzed a business decision.

Now review the opinions of the other departments.

Return ONLY valid JSON.

{
  "agreements": [
    "...",
    "..."
  ],
  "disagreements": [
    "...",
    "..."
  ],
  "compromise": "...",
  "finalPosition": "..."
}

Return JSON only.
`,
      },
      {
        role: "user",
        content: `
Your Opinion:

${JSON.stringify(ownOpinion, null, 2)}

Other Departments:

${JSON.stringify(otherOpinions, null, 2)}
`,
      },
    ],
  });

  return JSON.parse(
    response.choices[0].message.content ?? "{}"
  );
}

export async function debateRound(
  title: string,
  transcript: string,
  department: string
) {
  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",

    messages: [
      {
        role: "system",
        content: `
You are the ${department} department in a board meeting.

Read the discussion so far.

Respond ONLY from the perspective of ${department}.

If another department has a good point,
you may agree with it.

If you disagree,
explain why.

Return ONLY valid JSON.

{
  "message":"...",
  "confidence":85
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

Discussion so far:

${transcript}
`,
      },
    ],

    response_format: {
      type: "json_object",
    },

    temperature: 0.6,
  });

  return JSON.parse(response.choices[0].message.content ?? "{}");
}

export async function reviseOpinion(
  department: string,
  title: string,
  originalOpinion: any,
  transcript: string
) {
  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",

    messages: [
      {
        role: "system",
        content: `
You are the ${department} department.

You have heard the debate from other departments.

Revise your opinion if necessary.

Return ONLY valid JSON.

{
  "overview":"...",
  "pros":["..."],
  "cons":["..."],
  "recommendation":"...",
  "confidence":90
}
`,
      },
      {
        role: "user",
        content: `
Decision:
${title}

Original Opinion:
${JSON.stringify(originalOpinion)}

Discussion:
${transcript}
`,
      },
    ],

    response_format: {
      type: "json_object",
    },
  });

  return JSON.parse(response.choices[0].message.content!);
}