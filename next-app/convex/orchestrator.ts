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

    return {
      success: true,
    };
  },
});