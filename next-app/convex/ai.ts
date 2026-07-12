"use node";

import { action } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

import {
  generateOpinion,
  debateRound,
  reviseOpinion,
  generateNegotiation,
} from "../lib/ai";

export const generateAgentOpinions = action({
  args: {
    decisionId: v.id("decisions"),
    title: v.string(),
  },

  handler: async (ctx, args) => {
    // ------------------------------------
    // Generate Initial Opinions
    // ------------------------------------
    const [
      engineeringOpinion,
      financeOpinion,
      marketingOpinion,
    ] = await Promise.all([
      generateOpinion("Engineering", args.title),
      generateOpinion("Finance", args.title),
      generateOpinion("Marketing", args.title),
    ]);

    console.log(engineeringOpinion);
    console.log(financeOpinion);
    console.log(marketingOpinion);

    // ------------------------------------
    // Debate Simulation
    // ------------------------------------
    const transcript: string[] = [];

    for (let round = 1; round <= 3; round++) {
      const engineeringReply = await debateRound(
        args.title,
        transcript.join("\n"),
        "Engineering"
      );

      transcript.push(
        `Round ${round} | Engineering: ${engineeringReply.message}`
      );

      const financeReply = await debateRound(
        args.title,
        transcript.join("\n"),
        "Finance"
      );

      transcript.push(
        `Round ${round} | Finance: ${financeReply.message}`
      );

      const marketingReply = await debateRound(
        args.title,
        transcript.join("\n"),
        "Marketing"
      );

      transcript.push(
        `Round ${round} | Marketing: ${marketingReply.message}`
      );
    }

    console.log(transcript);

    // ------------------------------------
    // Generate Revised Opinions
    // ------------------------------------
    const revisedEngineering = await reviseOpinion(
      "Engineering",
      args.title,
      engineeringOpinion,
      transcript.join("\n")
    );

    const revisedFinance = await reviseOpinion(
      "Finance",
      args.title,
      financeOpinion,
      transcript.join("\n")
    );

    const revisedMarketing = await reviseOpinion(
      "Marketing",
      args.title,
      marketingOpinion,
      transcript.join("\n")
    );

    console.log("Revised Engineering:", revisedEngineering);
    console.log("Revised Finance:", revisedFinance);
    console.log("Revised Marketing:", revisedMarketing);

    // ------------------------------------
    // Fetch Agents
    // ------------------------------------
    const agents = await ctx.runQuery(
      api.agents.getAgentsForDecision,
      {
        decisionId: args.decisionId,
      }
    );

    const engineering = agents.find(
      (a) => a.department === "Engineering"
    );

    const finance = agents.find(
      (a) => a.department === "Finance"
    );

    const marketing = agents.find(
      (a) => a.department === "Marketing"
    );

    const discussion = transcript.map((line, index) => ({
      round: Math.floor(index / 3) + 1,
      message: line,
      timestamp: Date.now(),
    }));

    // ------------------------------------
    // Save Engineering
    // ------------------------------------
    if (engineering) {
      await ctx.runMutation(api.agents.updateAgentOpinion, {
        agentId: engineering._id,
        opinion: engineeringOpinion,
        revisedOpinion: revisedEngineering,
        discussion,
        status: "Completed",
        progress: 100,
      });
    }

    // ------------------------------------
    // Save Finance
    // ------------------------------------
    if (finance) {
      await ctx.runMutation(api.agents.updateAgentOpinion, {
        agentId: finance._id,
        opinion: financeOpinion,
        revisedOpinion: revisedFinance,
        discussion,
        status: "Completed",
        progress: 100,
      });
    }

    // ------------------------------------
    // Save Marketing
    // ------------------------------------
    if (marketing) {
      await ctx.runMutation(api.agents.updateAgentOpinion, {
        agentId: marketing._id,
        opinion: marketingOpinion,
        revisedOpinion: revisedMarketing,
        discussion,
        status: "Completed",
        progress: 100,
      });
    }

    // ------------------------------------
    // CEO Negotiation
    // Uses REVISED opinions
    // ------------------------------------
    const negotiation = await generateNegotiation(
      args.title,
      revisedEngineering,
      revisedFinance,
      revisedMarketing,
      transcript.join("\n")
    );

    console.log(negotiation);

    // ------------------------------------
    // Store Negotiation
    // ------------------------------------
    await ctx.runMutation(api.negotiation.negotiate, {
      decisionId: args.decisionId,

      engineeringOpinion: revisedEngineering,
      financeOpinion: revisedFinance,
      marketingOpinion: revisedMarketing,

      executiveSummary: negotiation.executiveSummary,
      conflicts: negotiation.conflicts,
      recommendation: negotiation.recommendation,
      risks: negotiation.risks,

      confidence: negotiation.confidence,

      rounds: 3,
      consensusReached:
        negotiation.consensusReached ??
        negotiation.confidence >= 85,

      transcript: transcript.map((line, index) => ({
        round: Math.floor(index / 3) + 1,
        speaker: line.split(":")[0],
        message: line.split(":").slice(1).join(":").trim(),
        timestamp: Date.now(),
      })),
    });

    return {
      success: true,
      transcript,
      negotiation,
      revisedOpinions: {
        engineering: revisedEngineering,
        finance: revisedFinance,
        marketing: revisedMarketing,
      },
    };
  },
});