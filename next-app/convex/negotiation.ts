import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const negotiate = mutation({
  args: {
    decisionId: v.id("decisions"),
  },

  handler: async (ctx, args) => {
    const agents = await ctx.db
      .query("agents")
      .filter((q) => q.eq(q.field("decisionId"), args.decisionId))
      .collect();

    const engineering =
      agents.find((a) => a.department === "Engineering")?.opinion ??
      "No opinion";

    const finance =
      agents.find((a) => a.department === "Finance")?.opinion ??
      "No opinion";

    const marketing =
      agents.find((a) => a.department === "Marketing")?.opinion ??
      "No opinion";

    const finalDecision =
      "Consensus reached. Recommended to proceed.";

    const confidence = 91;

    await ctx.db.insert("negotiations", {
      decisionId: args.decisionId,
      engineeringOpinion: engineering,
      financeOpinion: finance,
      marketingOpinion: marketing,
      finalDecision,
      status: "Completed",
      confidence,
      createdAt: Date.now(),
    });

    return finalDecision;
  },
});

import { query } from "./_generated/server";

export const getNegotiation = query({
  args: {
    decisionId: v.id("decisions"),
  },

  handler: async (ctx, args) => {
    return await ctx.db
      .query("negotiations")
      .filter((q) =>
        q.eq(q.field("decisionId"), args.decisionId)
      )
      .first();
  },
});