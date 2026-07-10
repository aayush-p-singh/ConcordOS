import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const analyze = mutation({
  args: {
    agentId: v.id("agents"),
  },

  handler: async (ctx, args) => {
    await ctx.db.patch(args.agentId, {
      status: "Completed",
      progress: 100,
      currentTask: "Market Analysis Complete",

      opinion:
        "Strong demand expected among enterprise customers. Recommended launch in Q4.",

      confidence: 94,
    });

    return "Marketing analysis completed";
  },
});