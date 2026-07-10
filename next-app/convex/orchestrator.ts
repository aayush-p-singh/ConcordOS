import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const startWorkflow = mutation({
  args: {
    decisionId: v.id("decisions"),
  },

  handler: async (ctx, args) => {
    const agents = await ctx.db.query("agents").collect();

    for (const agent of agents) {
      await ctx.db.patch(agent._id, {
        decisionId: args.decisionId,
        status: "Thinking",
        progress: 0,
      });
    }

    return "Workflow Started";
  },
});