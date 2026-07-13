"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Brain,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Plus,
  ArrowRight,
  Calendar,
  User,
} from "lucide-react";

const statusColor = (status: string) => {
  switch (status) {
    case "Negotiating":
      return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";

    case "Approved":
      return "bg-green-500/20 text-green-400 border-green-500/30";

    case "Rejected":
      return "bg-red-500/20 text-red-400 border-red-500/30";

    default:
      return "bg-zinc-700 text-zinc-300 border-zinc-700";
  }
};

const priorityColor = (priority: string) => {
  switch (priority) {
    case "Critical":
      return "bg-red-500/20 text-red-400";

    case "High":
      return "bg-orange-500/20 text-orange-400";

    case "Medium":
      return "bg-yellow-500/20 text-yellow-400";

    default:
      return "bg-blue-500/20 text-blue-400";
  }
};

export default function DecisionsPage() {
  const decisions = useQuery(api.decisions.getDecisions);

  if (decisions === undefined) {
    return (
      <div className="flex h-screen bg-slate-950 text-white">
        <Sidebar />

        <div className="flex flex-1 flex-col">
          <Navbar />

          <main className="flex flex-1 items-center justify-center">
            <div className="text-center">
              <Brain className="mx-auto mb-4 h-12 w-12 animate-pulse text-cyan-400" />
              <p className="text-lg text-zinc-400">
                Loading Decision Center...
              </p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  const active = decisions.filter(
    (d) => d.status === "Negotiating"
  ).length;

  const approved = decisions.filter(
    (d) => d.status === "Approved"
  ).length;

  const rejected = decisions.filter(
    (d) => d.status === "Rejected"
  ).length;

  return (
    <div className="flex h-screen bg-slate-950 text-white">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">

        <Navbar />

        <main className="flex-1 overflow-y-auto">

          {/* Hero */}

          <section className="border-b border-zinc-800 bg-linear-to-r from-slate-900 via-slate-950 to-slate-900">

            <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-10">

              <div>

                <h1 className="text-4xl font-bold">
                  Decision Center
                </h1>

                <p className="mt-3 max-w-2xl text-zinc-400">
                  Create, monitor and review AI-powered strategic
                  decisions across your organization.
                </p>

              </div>

              <Link href="/new-decision">
                <Button className="bg-blue-600 hover:bg-blue-500">
                  <Plus className="mr-2 h-4 w-4" />
                  New Decision
                </Button>
              </Link>

            </div>

          </section>

          <div className="mx-auto max-w-7xl space-y-8 p-8">

            {/* Statistics */}

            <div className="grid gap-6 md:grid-cols-4">

              <Card className="border-zinc-800 bg-zinc-900 p-6">
                <Brain className="mb-4 text-cyan-400" />
                <p className="text-3xl font-bold">
                  {decisions.length}
                </p>
                <p className="text-zinc-400">
                  Total Decisions
                </p>
              </Card>

              <Card className="border-zinc-800 bg-zinc-900 p-6">
                <Clock className="mb-4 text-yellow-400" />
                <p className="text-3xl font-bold">
                  {active}
                </p>
                <p className="text-zinc-400">
                  Negotiating
                </p>
              </Card>

              <Card className="border-zinc-800 bg-zinc-900 p-6">
                <CheckCircle2 className="mb-4 text-green-400" />
                <p className="text-3xl font-bold">
                  {approved}
                </p>
                <p className="text-zinc-400">
                  Approved
                </p>
              </Card>

              <Card className="border-zinc-800 bg-zinc-900 p-6">
                <AlertTriangle className="mb-4 text-red-400" />
                <p className="text-3xl font-bold">
                  {rejected}
                </p>
                <p className="text-zinc-400">
                  Rejected
                </p>
              </Card>

            </div>

            {/* Decisions */}

            {decisions.length === 0 ? (

              <Card className="border-dashed border-zinc-700 bg-zinc-900 p-16 text-center">

                <Brain className="mx-auto mb-6 h-16 w-16 text-zinc-600" />

                <h2 className="text-2xl font-semibold">
                  No Decisions Yet
                </h2>

                <p className="mt-2 text-zinc-500">
                  Start by creating your first AI-assisted decision.
                </p>

                <Link href="/new-decision">
                  <Button className="mt-8">
                    Create Decision
                  </Button>
                </Link>

              </Card>

            ) : (

              <div className="grid gap-6">

                {decisions.map((decision) => (

                  <Card
                    key={decision._id}
                    className="border-zinc-800 bg-zinc-900 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10"
                  >

                    <CardContent className="p-6">

                      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                        <div className="space-y-4 flex-1">

                          <div className="flex flex-wrap items-center gap-3">

                            <h2 className="text-2xl font-semibold">
                              {decision.title}
                            </h2>

                            <Badge
                              className={priorityColor(
                                decision.priority
                              )}
                            >
                              {decision.priority}
                            </Badge>

                            <Badge
                              className={statusColor(
                                decision.status
                              )}
                            >
                              {decision.status}
                            </Badge>

                          </div>

                          <div className="flex flex-wrap gap-6 text-zinc-400">

                            <div className="flex items-center gap-2">
                              <User size={16} />
                              {decision.createdBy}
                            </div>

                            <div className="flex items-center gap-2">
                              <Calendar size={16} />
                              {decision.deadline}
                            </div>

                          </div>

                        </div>

                        <div className="flex flex-wrap gap-3">

                          <Link
                            href={`/decisions/${decision._id}`}
                          >
                            <Button variant="secondary">
                              View Details
                            </Button>
                          </Link>

                          <Link
                            href={`/negotiation/${decision._id}`}
                          >
                            <Button className="bg-blue-600 hover:bg-blue-500">
                              Negotiation
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                          </Link>

                        </div>

                      </div>

                    </CardContent>

                  </Card>

                ))}

              </div>

            )}

          </div>

        </main>

      </div>

    </div>
  );
}