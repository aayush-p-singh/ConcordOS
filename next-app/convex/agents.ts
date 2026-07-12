import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

const opinionValidator = v.object({
  overview: v.string(),
  pros: v.array(v.string()),
  cons: v.array(v.string()),
  recommendation: v.string(),
  confidence: v.number(),
});

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

    opinion: opinionValidator,

    revisedOpinion: opinionValidator,

    discussion: v.array(
      v.object({
        round: v.number(),
        message: v.string(),
        timestamp: v.number(),
      })
    ),

    status: v.string(),
    progress: v.number(),
  },

  handler: async (ctx, args) => {
    await ctx.db.patch(args.agentId, {
      opinion: args.opinion,
      revisedOpinion: args.revisedOpinion,
      discussion: args.discussion,

      confidence: args.revisedOpinion.confidence,

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