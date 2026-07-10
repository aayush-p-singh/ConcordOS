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
      currentTask: "Budget Approved",

      opinion:
        "Estimated investment is $120,000 with expected ROI within 8 months.",

      confidence: 88,
    });

    return "Finance analysis completed";
  },
});