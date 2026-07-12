import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY!,
  baseURL: "https://api.groq.com/openai/v1",
});

export async function generateOpinion(
  department: string,
  title: string
) {
  const response = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",

    messages: [
      {
        role: "system",
        content: `
You are the ${department} department of a company.

Analyze every business decision only from your department's perspective.

Respond with:

Overview

Pros

Cons

Recommendation

Confidence (0-100)

Keep your response under 150 words.
        `,
      },
      {
        role: "user",
        content: `Decision: ${title}`,
      },
    ],

    temperature: 0.7,
  });

  return response.choices[0].message.content ?? "No response";
}