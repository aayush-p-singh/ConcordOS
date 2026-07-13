import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

/**
 * Get negotiation for a decision
 */
export const getCEOReview = query({
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

/**
 * CEO Approves Decision
 */
export const approveDecision = mutation({
  args: {
    negotiationId: v.id("negotiations"),

    decision: v.union(
      v.literal("Approved"),
      v.literal("Rejected"),
      v.literal("Revision Requested")
    ),

    approvedBy: v.string(),

    comment: v.optional(v.string()),
  },

  handler: async (ctx, args) => {
    await ctx.db.patch(args.negotiationId, {
      ceoDecision: args.decision,
      approvedBy: args.approvedBy,
      approvedAt: Date.now(),
      ceoComment: args.comment ?? "",
      lastUpdated: Date.now(),

      status:
        args.decision === "Approved"
          ? "Completed"
          : args.decision === "Rejected"
          ? "Rejected"
          : "Revision Requested",

      revisionCount:
        args.decision === "Revision Requested"
          ? 1
          : 0,
    });

    return {
      success: true,
    };
  },
});

/**
 * CEO Rejects Decision
 */
export const rejectDecision = mutation({
  args: {
    negotiationId: v.id("negotiations"),
    approvedBy: v.string(),
    comment: v.string(),
  },

  handler: async (ctx, args) => {
    const negotiation = await ctx.db.get(args.negotiationId);

    if (!negotiation) {
      throw new Error("Negotiation not found");
    }

    await ctx.db.patch(args.negotiationId, {
      ceoDecision: "Rejected",
      ceoComment: args.comment,
      approvedBy: args.approvedBy,
      approvedAt: Date.now(),
      lastUpdated: Date.now(),
      status: "Rejected",
    });

    await ctx.db.patch(negotiation.decisionId, {
      status: "Rejected",
    });

    return {
      success: true,
    };
  },
});

/**
 * CEO Requests Revision
 */
export const requestRevision = mutation({
  args: {
    negotiationId: v.id("negotiations"),
    approvedBy: v.string(),
    comment: v.string(),
  },

  handler: async (ctx, args) => {
    const negotiation = await ctx.db.get(args.negotiationId);

    if (!negotiation) {
      throw new Error("Negotiation not found");
    }

    await ctx.db.patch(args.negotiationId, {
      ceoDecision: "Revision Requested",
      ceoComment: args.comment,
      approvedBy: args.approvedBy,
      lastUpdated: Date.now(),
      revisionCount: (negotiation.revisionCount ?? 0) + 1,
      status: "Revision Requested",
    });

    await ctx.db.patch(negotiation.decisionId, {
      status: "Revision Requested",
    });

    return {
      success: true,
    };
  },
});

/**
 * Dashboard Stats
 */
export const getCEOStats = query({
  args: {},

  handler: async (ctx) => {
    const negotiations = await ctx.db
      .query("negotiations")
      .collect();

    return {
      pending: negotiations.filter(
        (n) => n.ceoDecision === "Pending"
      ).length,

      approved: negotiations.filter(
        (n) => n.ceoDecision === "Approved"
      ).length,

      rejected: negotiations.filter(
        (n) => n.ceoDecision === "Rejected"
      ).length,

      revisions: negotiations.filter(
        (n) => n.ceoDecision === "Revision Requested"
      ).length,
    };
  },
});