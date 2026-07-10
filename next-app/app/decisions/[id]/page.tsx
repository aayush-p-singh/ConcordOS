"use client";

import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import NegotiationResult from "@/components/negotiation-result";
import AgentCard from "@/components/agent-card";

export default function DecisionDetailsPage() {
  const { id } = useParams();

  const decisions = useQuery(api.decisions.getDecisions);
  const allAgents = useQuery(api.agents.getAgents);
  const negotiation = useQuery(api.negotiation.getNegotiation, {
    decisionId: id as any,
  });

  const decision = decisions?.find((d) => d._id === id);
  const agents = allAgents?.filter((a) => a.decisionId === id);

  if (!decision || !agents) {
    return (
      <div className="p-8 text-white">
        Loading...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 p-8 space-y-8">

      <div>
        <h1 className="text-3xl font-bold text-white">
          {decision.title}
        </h1>

        <p className="text-zinc-400 mt-2">
          Priority: {decision.priority}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {agents?.map((agent: any) => (
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