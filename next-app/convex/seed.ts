import { mutation } from "./_generated/server";

export const seedDatabase = mutation({
  args: {},
  handler: async (ctx) => {
    // Don't insert duplicates
    const existing = await ctx.db.query("decisions").collect();
    if (existing.length > 0) {
      return "Database already seeded";
    }

    // -----------------------------
    // Decision 1
    // -----------------------------
    const decision1 = await ctx.db.insert("decisions", {
      title: "Launch AI Assistant",
      priority: "High",
      status: "Negotiating",
      createdBy: "CEO",
      deadline: "30 Days",
      createdAt: Date.now(),
    });

    // -----------------------------
    // Decision 2
    // -----------------------------
    await ctx.db.insert("decisions", {
      title: "Expand to Europe",
      priority: "Medium",
      status: "Pending",
      createdBy: "Board",
      deadline: "60 Days",
      createdAt: Date.now(),
    });

    // -----------------------------
    // Engineering Agent
    // -----------------------------
    await ctx.db.insert("agents", {
      name: "Engineering Agent",
      department: "Engineering",

      status: "Idle",
      progress: 0,
      currentTask: "Waiting",

      opinion: {
        overview: "",
        pros: [],
        cons: [],
        recommendation: "",
        confidence: 0,
      },

      revisedOpinion: {
        overview: "",
        pros: [],
        cons: [],
        recommendation: "",
        confidence: 0,
      },

      discussion: [],

      confidence: 0,

      decisionId: decision1,
    });

    // -----------------------------
    // Finance Agent
    // -----------------------------
    await ctx.db.insert("agents", {
      name: "Finance Agent",
      department: "Finance",

      status: "Idle",
      progress: 0,
      currentTask: "Waiting",

      opinion: {
        overview: "",
        pros: [],
        cons: [],
        recommendation: "",
        confidence: 0,
      },

      revisedOpinion: {
        overview: "",
        pros: [],
        cons: [],
        recommendation: "",
        confidence: 0,
      },

      discussion: [],

      confidence: 0,

      decisionId: decision1,
    });

    // -----------------------------
    // Marketing Agent
    // -----------------------------
    await ctx.db.insert("agents", {
      name: "Marketing Agent",
      department: "Marketing",

      status: "Idle",
      progress: 0,
      currentTask: "Waiting",

      opinion: {
        overview: "",
        pros: [],
        cons: [],
        recommendation: "",
        confidence: 0,
      },

      revisedOpinion: {
        overview: "",
        pros: [],
        cons: [],
        recommendation: "",
        confidence: 0,
      },

      discussion: [],

      confidence: 0,

      decisionId: decision1,
    });

    return "Database Seeded!";
  },
});