import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  decisions: defineTable({
    title: v.string(),
    priority: v.string(),
    status: v.string(),
    createdBy: v.string(),
    deadline: v.string(),
    createdAt: v.number(),
  }),

  agents: defineTable({
  name: v.string(),
  department: v.string(),

  status: v.string(),
  progress: v.number(),
  currentTask: v.string(),

  // Initial opinion
  opinion: v.object({
    overview: v.string(),
    pros: v.array(v.string()),
    cons: v.array(v.string()),
    recommendation: v.string(),
    confidence: v.number(),
  }),

  // Discussion history
  discussion: v.optional(
    v.array(
      v.object({
        round: v.number(),
        message: v.string(),
        timestamp: v.number(),
      })
    )
  ),

  // Latest revised opinion
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

  // New fields
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
}),

  auditLogs: defineTable({
    decisionId: v.id("decisions"),
    agent: v.string(),
    action: v.string(),
    timestamp: v.number(),
  }),
});