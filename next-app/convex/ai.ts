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
    // Generate all opinions in parallel
    const [
      engineeringOpinion,
      financeOpinion,
      marketingOpinion,
    ] = await Promise.all([
      generateOpinion("Engineering", args.title),
      generateOpinion("Finance", args.title),
      generateOpinion("Marketing", args.title),
    ]);

    // Get all agents for this decision
    const agents = await ctx.runQuery(
      api.agents.getAgentsForDecision,
      {
        decisionId: args.decisionId,
      }
    );

    // Update Engineering
    const engineering = agents.find(
      (a) => a.department === "Engineering"
    );

    if (engineering) {
      await ctx.runMutation(api.agents.updateAgentOpinion, {
        agentId: engineering._id,
        opinion: engineeringOpinion,
        status: "Completed",
        progress: 100,
        confidence: 94,
      });
    }

    // Update Finance
    const finance = agents.find(
      (a) => a.department === "Finance"
    );

    if (finance) {
      await ctx.runMutation(api.agents.updateAgentOpinion, {
        agentId: finance._id,
        opinion: financeOpinion,
        status: "Completed",
        progress: 100,
        confidence: 92,
      });
    }

    // Update Marketing
    const marketing = agents.find(
      (a) => a.department === "Marketing"
    );

    if (marketing) {
      await ctx.runMutation(api.agents.updateAgentOpinion, {
        agentId: marketing._id,
        opinion: marketingOpinion,
        status: "Completed",
        progress: 100,
        confidence: 95,
      });
    }

    // Run negotiation after all opinions are generated
    await ctx.runMutation(api.negotiation.negotiate, {
      decisionId: args.decisionId,
    });

    return {
      success: true,
    };
  },
});