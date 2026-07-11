import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function generateOpinion(
  department: string,
  decision: string
) {
  const prompt = `
You are the ${department} department of a company.

Analyze this business decision:

"${decision}"

Give:
1. Your opinion
2. Risks
3. Recommendation

Keep the answer under 120 words.
`;

  const response = await openai.responses.create({
    model: "gpt-4.1-mini",
    input: prompt,
  });

  return response.output_text;
}