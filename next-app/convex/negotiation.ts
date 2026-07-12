import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const opinionValidator = v.object({
  overview: v.string(),
  pros: v.array(v.string()),
  cons: v.array(v.string()),
  recommendation: v.string(),
  confidence: v.number(),
});

export const negotiate = mutation({
  args: {
    decisionId: v.id("decisions"),

    engineeringOpinion: opinionValidator,
    financeOpinion: opinionValidator,
    marketingOpinion: opinionValidator,

    executiveSummary: v.string(),
    conflicts: v.string(),
    recommendation: v.string(),
    risks: v.string(),

    confidence: v.number(),
  },

  handler: async (ctx, args) => {
    await ctx.db.insert("negotiations", {
      decisionId: args.decisionId,

      engineeringOpinion: args.engineeringOpinion,
      financeOpinion: args.financeOpinion,
      marketingOpinion: args.marketingOpinion,

      executiveSummary: args.executiveSummary,
      conflicts: args.conflicts,
      recommendation: args.recommendation,
      risks: args.risks,

      confidence: args.confidence,

      status: "Completed",
      createdAt: Date.now(),
    });

    return {
      success: true,
    };
  },
});

export const getNegotiation = query({
  args: {
    decisionId: v.id("decisions"),
  },

  handler: async (ctx, args) => {
    return await ctx.db
      .query("negotiations")
      .filter((q) =>
        q.eq(q.field("decisionId"), args.decisionId)
      )
      .first();
  },
});