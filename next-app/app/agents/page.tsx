"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import AgentCard from "@/components/agent-card";

export default function AgentsPage() {
  const agents = useQuery(api.agents.getAgents);

  if (agents === undefined) {
    return (
      <div className="p-8 text-white">
        Loading agents...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-zinc-950 p-8">
      <h1 className="mb-8 text-3xl font-bold text-white">
        AI Agents
      </h1>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent) => (
          <AgentCard
            key={agent._id}
            name={agent.name}
            department={agent.department}
            progress={agent.progress}
            status={agent.status}
            task={agent.currentTask}
          />
        ))}
      </div>
    </main>
  );
}