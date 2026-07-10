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
  }),

  auditLogs: defineTable({
    decisionId: v.id("decisions"),
    agent: v.string(),
    action: v.string(),
    timestamp: v.number(),
  }),
});