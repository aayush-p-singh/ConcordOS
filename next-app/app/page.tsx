"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import StatCard from "@/components/stat-card";
import DecisionCard from "@/components/decision-card";
import LiveFeed from "@/components/live-feed";
import NegotiationTimeline from "@/components/negotiation-timeline";

import {
  Bot,
  Clock,
  CheckCircle,
  BarChart3,
} from "lucide-react";

export default function Dashboard() {
  const stats = useQuery(api.dashboard.getDashboardStats);

  if (!stats) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 text-white">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-linear-to-br from-slate-950 via-slate-900 to-black text-white">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-8">

          {/* Header */}

          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold tracking-tight">
                AI Decision Dashboard
              </h1>

              <p className="mt-2 text-zinc-400">
                Monitor AI agents, negotiations and executive decisions in real time.
              </p>
            </div>

            <div className="rounded-xl border border-cyan-500/20 bg-cyan-500/10 px-5 py-3">
              <p className="text-xs uppercase tracking-widest text-cyan-400">
                System Status
              </p>

              <p className="font-semibold text-green-400">
                ● All Services Online
              </p>
            </div>
          </div>

          {/* Stats */}

          <div className="mb-8 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            <StatCard
              title="Active Decisions"
              value={stats.activeDecisions.toString()}
              subtitle="Currently Open"
              icon={Clock}
            />

            <StatCard
              title="Running Agents"
              value={stats.runningAgents.toString()}
              subtitle="AI Processing"
              icon={Bot}
            />

            <StatCard
              title="Negotiations"
              value={stats.completedNegotiations.toString()}
              subtitle="Completed"
              icon={CheckCircle}
            />

            <StatCard
              title="Avg Confidence"
              value={`${stats.averageConfidence}%`}
              subtitle="Consensus Score"
              icon={BarChart3}
            />

          </div>

          {/* Main Grid */}

          <div className="grid gap-8 xl:grid-cols-12">

            {/* Left */}

            <div className="space-y-8 xl:col-span-8">

              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-md shadow-xl">
                <DecisionCard />
              </div>

            </div>

            {/* Right */}

            <div className="space-y-8 xl:col-span-4">

              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-md shadow-xl">
                <LiveFeed />
              </div>

              <div className="rounded-2xl border border-zinc-800 bg-zinc-900/70 backdrop-blur-md shadow-xl">
                <NegotiationTimeline />
              </div>

            </div>

          </div>

        </main>
      </div>
    </div>
  );
}