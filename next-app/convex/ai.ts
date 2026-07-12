"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";

import { api } from "./_generated/api";
import { generateOpinion } from "../lib/ai";

export const generateAgentOpinions = action({
  args: {
    decisionId: v.id("decisions"),
    title: v.string(),
  },

  handler: async (ctx, args) => {
  const [
    engineeringOpinion,
    financeOpinion,
    marketingOpinion,
  ] = await Promise.all([
    generateOpinion("Engineering", args.title),
    generateOpinion("Finance", args.title),
    generateOpinion("Marketing", args.title),
  ]);

  console.log("Engineering Opinion:", engineeringOpinion);
  console.log("Finance Opinion:", financeOpinion);
  console.log("Marketing Opinion:", marketingOpinion);

  const agents = await ctx.runQuery(
    api.agents.getAgentsForDecision,
    {
      decisionId: args.decisionId,
    }
  );

  console.log("Agents Found:", agents.length);
  console.log("Agents:", agents);

  const engineering = agents.find(
    (a) => a.department === "Engineering"
  );

  const finance = agents.find(
    (a) => a.department === "Finance"
  );

  const marketing = agents.find(
    (a) => a.department === "Marketing"
  );

  console.log("Engineering Agent:", engineering);
  console.log("Finance Agent:", finance);
  console.log("Marketing Agent:", marketing);

  if (engineering) {
    await ctx.runMutation(api.agents.updateAgentOpinion, {
      agentId: engineering._id,
      opinion: engineeringOpinion,
      status: "Completed",
      progress: 100,
      confidence: 94,
    });
  }

  if (finance) {
    await ctx.runMutation(api.agents.updateAgentOpinion, {
      agentId: finance._id,
      opinion: financeOpinion,
      status: "Completed",
      progress: 100,
      confidence: 92,
    });
  }

  if (marketing) {
    await ctx.runMutation(api.agents.updateAgentOpinion, {
      agentId: marketing._id,
      opinion: marketingOpinion,
      status: "Completed",
      progress: 100,
      confidence: 95,
    });
  }

  await ctx.runMutation(api.negotiation.negotiate, {
    decisionId: args.decisionId,
  });

  return { success: true };
}
});