"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

import {
  generateOpinion,
  generateNegotiation,
} from "../lib/ai";

export const generateAgentOpinions = action({
  args: {
    decisionId: v.id("decisions"),
    title: v.string(),
  },

  handler: async (ctx, args) => {
    // ------------------------------------
    // Generate all agent opinions
    // ------------------------------------
    const [
      engineeringOpinion,
      financeOpinion,
      marketingOpinion,
    ] = await Promise.all([
      generateOpinion("Engineering", args.title),
      generateOpinion("Finance", args.title),
      generateOpinion("Marketing", args.title),
    ]);

    console.log("Engineering:", engineeringOpinion);
    console.log("Finance:", financeOpinion);
    console.log("Marketing:", marketingOpinion);

    // ------------------------------------
    // Fetch agents
    // ------------------------------------
    const agents = await ctx.runQuery(
      api.agents.getAgentsForDecision,
      {
        decisionId: args.decisionId,
      }
    );

    const engineering = agents.find(
      (a) => a.department === "Engineering"
    );

    const finance = agents.find(
      (a) => a.department === "Finance"
    );

    const marketing = agents.find(
      (a) => a.department === "Marketing"
    );

    // ------------------------------------
    // Save Engineering Opinion
    // ------------------------------------
    if (engineering) {
      await ctx.runMutation(api.agents.updateAgentOpinion, {
        agentId: engineering._id,
        opinion: engineeringOpinion,
        status: "Completed",
        progress: 100,
      });
    }

    // ------------------------------------
    // Save Finance Opinion
    // ------------------------------------
    if (finance) {
      await ctx.runMutation(api.agents.updateAgentOpinion, {
        agentId: finance._id,
        opinion: financeOpinion,
        status: "Completed",
        progress: 100,
      });
    }

    // ------------------------------------
    // Save Marketing Opinion
    // ------------------------------------
    if (marketing) {
      await ctx.runMutation(api.agents.updateAgentOpinion, {
        agentId: marketing._id,
        opinion: marketingOpinion,
        status: "Completed",
        progress: 100,
      });
    }

    // ------------------------------------
    // AI Negotiation
    // ------------------------------------
    const negotiation = await generateNegotiation(
  args.title,
  engineeringOpinion,
  financeOpinion,
  marketingOpinion
  );


    // ------------------------------------
    // Store negotiation
    // ------------------------------------
   await ctx.runMutation(api.negotiation.negotiate, {
  decisionId: args.decisionId,

  engineeringOpinion: engineeringOpinion,
  financeOpinion: financeOpinion,
  marketingOpinion: marketingOpinion,

  executiveSummary: negotiation.executiveSummary,
  conflicts: negotiation.conflicts,
  recommendation: negotiation.recommendation,
  risks: negotiation.risks,

  confidence: negotiation.confidence,
});

    return {
      success: true,
    };
  },
});