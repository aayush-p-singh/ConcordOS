import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getDecisions = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("decisions").order("desc").collect();
  },
});

export const createDecision = mutation({
  args: {
    title: v.string(),
    priority: v.string(),
    createdBy: v.string(),
    deadline: v.string(),
  },

  handler: async (ctx, args) => {
    return await ctx.db.insert("decisions", {
      ...args,
      status: "Negotiating",
      createdAt: Date.now(),
    });
  },
});

export const updateDecisionStatus = mutation({
  args: {
    id: v.id("decisions"),
    status: v.string(),
  },

  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, {
      status: args.status,
    });
  },
});

export const getDecision = query({
  args: {
    id: v.id("decisions"),
  },

  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});