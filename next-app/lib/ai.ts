import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY!,
  baseURL: "https://api.groq.com/openai/v1",
});

// ============================
// Helpers
// ============================

function normalizeOpinion(data: any) {
  return {
    overview: data?.overview ?? "",
    pros: Array.isArray(data?.pros) ? data.pros : [],
    cons: Array.isArray(data?.cons) ? data.cons : [],
    recommendation: data?.recommendation ?? "",
    confidence: Number(data?.confidence ?? 0),
  };
}

function normalizeNegotiation(data: any) {
  return {
    executiveSummary: data?.executiveSummary ?? "",
    conflicts: data?.conflicts ?? "",
    recommendation: data?.recommendation ?? "",
    risks: data?.risks ?? "",
    confidence: Number(data?.confidence ?? 0),
    consensusReached: Boolean(data?.consensusReached),
  };
}

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
You are the ${department} department.

Analyze the business decision ONLY from your department's perspective.

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
        content: `Decision: ${title}`,
      },
    ],
  });

  const parsed = JSON.parse(
    response.choices[0].message.content ?? "{}"
  );

  console.log(`${department} Opinion`, parsed);

  return normalizeOpinion(parsed);
}

// ============================
// Debate Round
// ============================

export async function debateRound(
  title: string,
  transcript: string,
  department: string
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

Reply to the discussion.

Return JSON only.

{
  "message":"...",
  "confidence":85
}
`,
      },
      {
        role: "user",
        content: `
Decision:
${title}

Discussion:
${transcript}
`,
      },
    ],
  });

  return JSON.parse(
    response.choices[0].message.content ?? "{}"
  );
}

// ============================
// Revise Opinion
// ============================

export async function reviseOpinion(
  department: string,
  title: string,
  originalOpinion: any,
  transcript: string
) {
  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    response_format: {
      type: "json_object",
    },
    temperature: 0.5,
    messages: [
      {
        role: "system",
        content: `
You are the ${department} department.

Revise your opinion after hearing the debate.

Return ONLY JSON.

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
${JSON.stringify(originalOpinion, null, 2)}

Discussion:
${transcript}
`,
      },
    ],
  });

  const parsed = JSON.parse(
    response.choices[0].message.content ?? "{}"
  );

  console.log(`${department} Revised`, parsed);

  return normalizeOpinion(parsed);
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
    response_format: {
      type: "json_object",
    },
    temperature: 0.4,
    messages: [
      {
        role: "system",
        content: `
You are the CEO.

Return ONLY JSON.

{
  "executiveSummary":"...",
  "conflicts":"...",
  "recommendation":"...",
  "risks":"...",
  "confidence":92,
  "consensusReached":true
}
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

Transcript:
${transcript}
`,
      },
    ],
  });

  const parsed = JSON.parse(
    response.choices[0].message.content ?? "{}"
  );

  console.log("CEO Negotiation", parsed);

  return normalizeNegotiation(parsed);
}

// ============================
// Rebuttal
// ============================

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
You are ${department}.

Return ONLY JSON.

{
  "agreements":["..."],
  "disagreements":["..."],
  "compromise":"...",
  "finalPosition":"..."
}
`,
      },
      {
        role: "user",
        content: `
Your Opinion:
${JSON.stringify(ownOpinion, null, 2)}

Other Opinions:
${JSON.stringify(otherOpinions, null, 2)}
`,
      },
    ],
  });

  return JSON.parse(
    response.choices[0].message.content ?? "{}"
  );
}