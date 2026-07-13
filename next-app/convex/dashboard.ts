// convex/dashboard.ts

import { query } from "./_generated/server";

export const getDashboardStats = query({
  args: {},
  handler: async (ctx) => {
    const decisions = await ctx.db.query("decisions").collect();
    const agents = await ctx.db.query("agents").collect();
    const negotiations = await ctx.db.query("negotiations").collect();

    return {
      activeDecisions: decisions.length,

      runningAgents: agents.filter(
        (a) => a.status !== "Completed"
      ).length,

      completedNegotiations: negotiations.length,

      averageConfidence:
        negotiations.length === 0
          ? 0
          : Math.round(
              negotiations.reduce(
                (sum, n) => sum + n.confidence,
                0
              ) / negotiations.length
            ),
    };
  },
});