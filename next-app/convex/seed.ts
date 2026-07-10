import { mutation } from "./_generated/server";

export const seedDatabase = mutation({
  args: {},
  handler: async (ctx) => {
    // Don't insert duplicates
    const existing = await ctx.db.query("decisions").collect();
    if (existing.length > 0) return "Database already seeded";

    await ctx.db.insert("decisions", {
      title: "Launch AI Assistant",
      priority: "High",
      status: "Negotiating",
      createdBy: "CEO",
      deadline: "30 Days",
      createdAt: Date.now(),
    });

    await ctx.db.insert("decisions", {
      title: "Expand to Europe",
      priority: "Medium",
      status: "Pending",
      createdBy: "Board",
      deadline: "60 Days",
      createdAt: Date.now(),
    });

    await ctx.db.insert("agents", {
      name: "Engineering",
      department: "Engineering",
      status: "Thinking",
      progress: 72,
      currentTask: "Estimating implementation time",
    });

    await ctx.db.insert("agents", {
      name: "Finance",
      department: "Finance",
      status: "Negotiating",
      progress: 53,
      currentTask: "Calculating ROI",
    });

    await ctx.db.insert("agents", {
      name: "Marketing",
      department: "Marketing",
      status: "Waiting",
      progress: 25,
      currentTask: "Checking launch window",
    });

    return "Database Seeded!";
  },
});