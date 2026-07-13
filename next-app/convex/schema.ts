import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // ============================
  // Decisions
  // ============================
  decisions: defineTable({
    title: v.string(),
    priority: v.string(),

    // Workflow Status
    status: v.string(),

    createdBy: v.string(),
    deadline: v.string(),
    createdAt: v.number(),
  }),

  // ============================
  // AI Agents
  // ============================
  agents: defineTable({
    name: v.string(),
    department: v.string(),

    status: v.string(),
    progress: v.number(),
    currentTask: v.string(),

    // Initial Opinion
    opinion: v.object({
      overview: v.string(),
      pros: v.array(v.string()),
      cons: v.array(v.string()),
      recommendation: v.string(),
      confidence: v.number(),
    }),

    // Debate Discussion
    discussion: v.optional(
      v.array(
        v.object({
          round: v.number(),
          message: v.string(),
          timestamp: v.number(),
        })
      )
    ),

    // Revised Opinion After Debate
    revisedOpinion: v.optional(
      v.object({
        overview: v.string(),
        pros: v.array(v.string()),
        cons: v.array(v.string()),
        recommendation: v.string(),
        confidence: v.number(),
      })
    ),

    confidence: v.number(),

    decisionId: v.optional(v.id("decisions")),
  }),

  // ============================
  // Negotiations
  // ============================
  negotiations: defineTable({
  decisionId: v.id("decisions"),

  engineeringOpinion: v.any(),
  financeOpinion: v.any(),
  marketingOpinion: v.any(),

  executiveSummary: v.string(),
  conflicts: v.string(),
  recommendation: v.string(),
  risks: v.string(),

  confidence: v.number(),

  rounds: v.number(),
  consensusReached: v.boolean(),

  transcript: v.array(
    v.object({
      round: v.number(),
      speaker: v.string(),
      message: v.string(),
      timestamp: v.number(),
    })
  ),

  status: v.string(),
  createdAt: v.number(),

  // CEO Approval (optional for existing documents)
  ceoDecision: v.optional(
    v.union(
      v.literal("Pending"),
      v.literal("Approved"),
      v.literal("Rejected"),
      v.literal("Revision Requested")
    )
  ),

  ceoComment: v.optional(v.string()),

  approvedBy: v.optional(v.string()),

  approvedAt: v.optional(v.number()),

  revisionCount: v.optional(v.number()),

  lastUpdated: v.optional(v.number()),
}),

  // ============================
  // Audit Logs
  // ============================
  auditLogs: defineTable({
    decisionId: v.id("decisions"),

    agent: v.string(),

    action: v.string(),

    timestamp: v.number(),

    metadata: v.optional(v.any()),
  }),
});