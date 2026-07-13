"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import {
  ArrowLeft,
  Bot,
  CheckCircle,
  Activity,
  Cpu,
} from "lucide-react";

import AgentCard from "@/components/agent-card";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function AgentsPage() {
  const agents = useQuery(api.agents.getAgents);

  if (agents === undefined) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="text-center">
          <Bot className="mx-auto mb-4 h-12 w-12 animate-pulse text-cyan-400" />
          <p className="text-lg text-zinc-400">
            Loading AI Agents...
          </p>
        </div>
      </main>
    );
  }

  const completed = agents.filter(
    (a) => a.status === "Completed"
  ).length;

  const running = agents.filter(
    (a) =>
      a.status !== "Completed" &&
      a.status !== "Waiting"
  ).length;

  const avgConfidence =
    agents.length > 0
      ? Math.round(
          agents.reduce(
            (sum, a) => sum + (a.confidence || 0),
            0
          ) / agents.length
        )
      : 0;

  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* Header */}

      <section className="border-b border-zinc-800 bg-linear-to-r from-slate-900 via-slate-950 to-slate-900">
        <div className="mx-auto max-w-7xl px-8 py-10">

          <Link href="/">
            <Button
              variant="outline"
              className="mb-8 border-zinc-700 bg-zinc-900 hover:bg-zinc-800"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>

          <div className="flex items-center gap-4">

            <div className="rounded-xl bg-cyan-500/10 p-4">
              <Bot className="h-10 w-10 text-cyan-400" />
            </div>

            <div>
              <h1 className="text-4xl font-bold">
                AI Agent Center
              </h1>

              <p className="mt-2 text-zinc-400">
                Monitor every AI department, view their
                opinions, confidence scores and workflow
                progress.
              </p>
            </div>

          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl space-y-8 px-8 py-8">

        {/* Stats */}

        <div className="grid gap-6 md:grid-cols-4">

          <Card className="border-zinc-800 bg-zinc-900 p-6">
            <Bot className="mb-4 text-cyan-400" />
            <p className="text-3xl font-bold">
              {agents.length}
            </p>
            <p className="text-zinc-400">
              Total Agents
            </p>
          </Card>

          <Card className="border-zinc-800 bg-zinc-900 p-6">
            <Activity className="mb-4 text-blue-400" />
            <p className="text-3xl font-bold">
              {running}
            </p>
            <p className="text-zinc-400">
              Running
            </p>
          </Card>

          <Card className="border-zinc-800 bg-zinc-900 p-6">
            <CheckCircle className="mb-4 text-green-400" />
            <p className="text-3xl font-bold">
              {completed}
            </p>
            <p className="text-zinc-400">
              Completed
            </p>
          </Card>

          <Card className="border-zinc-800 bg-zinc-900 p-6">
            <Cpu className="mb-4 text-purple-400" />
            <p className="text-3xl font-bold">
              {avgConfidence}%
            </p>
            <p className="text-zinc-400">
              Avg Confidence
            </p>
          </Card>

        </div>

        {/* Agents */}

        {agents.length === 0 ? (
          <Card className="border-dashed border-zinc-700 bg-zinc-900 p-16 text-center">
            <Bot className="mx-auto mb-4 h-16 w-16 text-zinc-600" />
            <h2 className="text-2xl font-semibold">
              No Agents Yet
            </h2>
            <p className="mt-2 text-zinc-500">
              Create a decision to automatically spawn AI
              department agents.
            </p>
          </Card>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
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
        )}
      </div>
    </main>
  );
}