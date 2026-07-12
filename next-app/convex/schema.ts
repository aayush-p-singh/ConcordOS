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

  opinion: v.optional(
  v.object({
    overview: v.string(),
    pros: v.array(v.string()),
    cons: v.array(v.string()),
    recommendation: v.string(),
    confidence: v.number(),
  })
),

  confidence: v.optional(v.number()),

  decisionId: v.optional(v.id("decisions")),
}),
    negotiations: defineTable({
  decisionId: v.id("decisions"),

  engineeringOpinion: v.object({
    overview: v.string(),
    pros: v.array(v.string()),
    cons: v.array(v.string()),
    recommendation: v.string(),
    confidence: v.number(),
  }),

  financeOpinion: v.object({
    overview: v.string(),
    pros: v.array(v.string()),
    cons: v.array(v.string()),
    recommendation: v.string(),
    confidence: v.number(),
  }),

  marketingOpinion: v.object({
    overview: v.string(),
    pros: v.array(v.string()),
    cons: v.array(v.string()),
    recommendation: v.string(),
    confidence: v.number(),
  }),

  executiveSummary: v.string(),
  conflicts: v.string(),
  recommendation: v.string(),
  risks: v.string(),

  status: v.string(),
  confidence: v.number(),
  createdAt: v.number(),
}),

  auditLogs: defineTable({
    decisionId: v.id("decisions"),
    agent: v.string(),
    action: v.string(),
    timestamp: v.number(),
  }),
});