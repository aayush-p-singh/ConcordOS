import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { generateOpinion } from "../lib/ai";

export const startWorkflow = mutation({
  args: {
    decisionId: v.id("decisions"),
  },

  handler: async (ctx, args) => {
    const agents = await ctx.db
      .query("agents")
      .filter((q) => q.eq(q.field("decisionId"), args.decisionId))
      .collect();

    for (const agent of agents) {
      await ctx.db.patch(agent._id, {
        status: "Thinking",
        progress: 10,
      });
    }

    return {
      success: true,
      decisionId: args.decisionId,
    };
  },
});