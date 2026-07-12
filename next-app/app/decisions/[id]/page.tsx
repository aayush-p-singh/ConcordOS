"use client";

import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import AgentCard from "@/components/agent-card";
import NegotiationResult from "@/components/negotiation-result";

export default function DecisionDetailsPage() {
  const params = useParams();
  const id = params.id as any;

  // ALL HOOKS FIRST
  const decision = useQuery(api.decisions.getDecision, { id });

  const agents = useQuery(api.agents.getAgentsForDecision, {
    decisionId: id,
  });

  const negotiation = useQuery(api.negotiation.getNegotiation, {
    decisionId: id,
  });

  // Loading
  if (
    decision === undefined ||
    agents === undefined ||
    negotiation === undefined
  ) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        Loading...
      </div>
    );
  }

  if (!decision) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-red-500">
        Decision not found.
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white">
          {decision.title}
        </h1>

        <p className="text-zinc-400">
          Priority: {decision.priority}
        </p>

        <p className="text-zinc-500">
          Deadline: {decision.deadline}
        </p>
      </div>

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

      {negotiation && (
        <NegotiationResult
          engineering={negotiation.engineeringOpinion}
          finance={negotiation.financeOpinion}
          marketing={negotiation.marketingOpinion}
          finalDecision={negotiation.finalDecision}
          confidence={negotiation.confidence}
        />
      )}
    </main>
  );
}