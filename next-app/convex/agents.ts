import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAgentsForDecision = query({
  args: {
    decisionId: v.id("decisions"),
  },

  handler: async (ctx, args) => {
    return await ctx.db
      .query("agents")
      .filter((q) =>
        q.eq(q.field("decisionId"), args.decisionId)
      )
      .collect();
  },
});

export const updateAgentOpinion = mutation({
  args: {
    agentId: v.id("agents"),

    opinion: v.object({
      overview: v.string(),
      pros: v.array(v.string()),
      cons: v.array(v.string()),
      recommendation: v.string(),
      confidence: v.number(),
    }),

    status: v.string(),
    progress: v.number(),
  },

  handler: async (ctx, args) => {
    await ctx.db.patch(args.agentId, {
      opinion: args.opinion,
      confidence: args.opinion.confidence,
      status: args.status,
      progress: args.progress,
      currentTask: "Analysis Complete",
    });

    return {
      success: true,
    };
  },
});

export const getAgents = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("agents").collect();
  },
});