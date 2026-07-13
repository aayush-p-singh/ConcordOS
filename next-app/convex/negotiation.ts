import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

const opinionValidator = v.object({
  overview: v.string(),
  pros: v.array(v.string()),
  cons: v.array(v.string()),
  recommendation: v.string(),
  confidence: v.number(),
});

const transcriptValidator = v.object({
  round: v.number(),
  speaker: v.string(),
  message: v.string(),
  timestamp: v.number(),
});

export const getAllNegotiations = query({
  args: {},

  handler: async (ctx) => {
    return await ctx.db
      .query("negotiations")
      .order("desc")
      .collect();
  },
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

    rounds: v.number(),
    consensusReached: v.boolean(),
    transcript: v.array(transcriptValidator),
  },

  handler: async (ctx, args) => {
    const id = await ctx.db.insert("negotiations", {
      decisionId: args.decisionId,

      engineeringOpinion: args.engineeringOpinion,
      financeOpinion: args.financeOpinion,
      marketingOpinion: args.marketingOpinion,

      executiveSummary: args.executiveSummary,
      conflicts: args.conflicts,
      recommendation: args.recommendation,
      risks: args.risks,

      confidence: args.confidence,

      rounds: args.rounds,
      consensusReached: args.consensusReached,
      transcript: args.transcript,

      status: "Completed",
      createdAt: Date.now(),

      // ==========================
      // CEO Approval Fields
      // ==========================
      ceoDecision: "Pending",
      ceoComment: "",
      approvedBy: "",
      approvedAt: undefined,
      revisionCount: 0,
      lastUpdated: Date.now(),
    });

    return id;
  },
});

export const getNegotiation = query({
  args: {
    decisionId: v.id("decisions"),
  },

  handler: async (ctx, args) => {
    return await ctx.db
      .query("negotiations")
      .filter((q) => q.eq(q.field("decisionId"), args.decisionId))
      .first();
  },
});