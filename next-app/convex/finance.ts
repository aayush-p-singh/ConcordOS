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
      opinion: {
        overview: "Estimated investment is $120,000 with expected ROI within 8 months.",
        pros: ["Clear revenue potential", "Defined cost structure"],
        cons: ["Upfront capital required", "Market adoption risk"],
        recommendation: "Approve budget and monitor early KPIs.",
        confidence: 88,
      },

      confidence: 88,
    });

    return "Finance analysis completed";
  },
});