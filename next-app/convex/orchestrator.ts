import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const startWorkflow = mutation({
  args: {
    decisionId: v.id("decisions"),
  },

  handler: async (ctx, args) => {
    const departments = [
      "Engineering",
      "Finance",
      "Marketing",
    ];

    // Create AI agents
    for (const department of departments) {
      await ctx.db.insert("agents", {
        name: `${department} Agent`,
        department,

        decisionId: args.decisionId,

        status: "Thinking",
        progress: 10,
        currentTask: "Analyzing decision",

        opinion: {
          overview: "",
          pros: [],
          cons: [],
          recommendation: "",
          confidence: 0,
        },

        revisedOpinion: {
          overview: "",
          pros: [],
          cons: [],
          recommendation: "",
          confidence: 0,
        },

        discussion: [],

        confidence: 0,
      });
    }

    // Update decision status
    await ctx.db.patch(args.decisionId, {
      status: "Negotiating",
    });

    // Create empty negotiation document
    await ctx.db.insert("negotiations", {
      decisionId: args.decisionId,

      engineeringOpinion: {},
      financeOpinion: {},
      marketingOpinion: {},

      executiveSummary: "",
      conflicts: "",
      recommendation: "",
      risks: "",

      confidence: 0,

      rounds: 0,
      transcript: [],
      consensusReached: false,

      status: "Running",

      // CEO Approval fields
      ceoDecision: "Pending",
      ceoComment: "",
      approvedBy: "",
      approvedAt: undefined,
      revisionCount: 0,
      lastUpdated: Date.now(),

      createdAt: Date.now(),
    });

    return {
      success: true,
    };
  },
});