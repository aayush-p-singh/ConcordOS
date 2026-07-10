import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAgents = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("agents").collect();
  },
});

export const updateAgent = mutation({
  args: {
    id: v.id("agents"),
    status: v.string(),
    progress: v.number(),
    currentTask: v.string(),
  },

  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: args.status,
      progress: args.progress,
      currentTask: args.currentTask,
    });
  },
});