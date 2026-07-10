import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const updateEngineering = mutation({
  args: {
    id: v.id("agents"),
  },

  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: "Completed",
      progress: 100,
      currentTask: "Implementation complete",

      opinion: "Project is technically feasible.",

      confidence: 91,
    });
  },
});