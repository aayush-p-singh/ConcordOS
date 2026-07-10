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
      currentTask: "Analysis Complete",

      opinion:
        "Feature is technically feasible with an estimated development time of 4 weeks.",

      confidence: 91,
    });

    return "Engineering analysis completed";
  },
});