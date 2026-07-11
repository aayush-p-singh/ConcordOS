"use client";

import { useParams } from "next/navigation";
import { useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";

import AgentCard from "@/components/agent-card";
import NegotiationResult from "@/components/negotiation-result";

export default function DecisionDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const decisions = useQuery(api.decisions.getDecisions);
  const allAgents = useQuery(
    api.agents.getAgentsForDecision,
    id
      ? {
          decisionId: id as any,
        }
      : "skip"
  );

  const negotiation = useQuery(
    api.negotiation.getNegotiation,
    id
      ? {
          decisionId: id as any,
        }
      : "skip"
  );

  // Loading
  if (
    decisions === undefined ||
    allAgents === undefined ||
    negotiation === undefined
  ) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        Loading...
      </div>
    );
  }

  const decision = decisions.find((d) => d._id === id);
  const agents = allAgents as any[];

  // Invalid decision
  if (!decision) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-red-400">
        Decision not found.
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 p-8 space-y-8">
      {/* Decision Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">
          {decision.title}
        </h1>

        <p className="mt-2 text-zinc-400">
          Priority: {decision.priority}
        </p>

        <p className="text-zinc-500">
          Created By: {decision.createdBy}
        </p>

        <p className="text-zinc-500">
          Deadline: {decision.deadline}
        </p>
      </div>

      {/* Agents */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold text-white">
          AI Agents
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {agents.map((agent: any) => (
            <AgentCard
              key={agent._id}
              name={agent.name}
              department={agent.department}
              status={agent.status}
              progress={agent.progress}
              task={agent.currentTask}
              opinion={agent.opinion}
              confidence={agent.confidence}
            />
          ))}
        </div>
      </section>

      {/* Negotiation */}
      <section>
        <h2 className="mb-4 text-2xl font-semibold text-white">
          Negotiation Result
        </h2>

        {negotiation ? (
          <NegotiationResult
            engineering={negotiation.engineeringOpinion}
            finance={negotiation.financeOpinion}
            marketing={negotiation.marketingOpinion}
            finalDecision={negotiation.finalDecision}
            confidence={negotiation.confidence}
          />
        ) : (
          <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 text-zinc-400">
            Negotiation has not been generated yet.
          </div>
        )}
      </section>
    </main>
  );
}