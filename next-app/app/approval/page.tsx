"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";

import {
  CheckCircle,
  XCircle,
  RotateCcw,
  Eye,
  UserCheck,
  ArrowLeft,
  Clock,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ApprovalPage() {
  const negotiations = useQuery(api.negotiation.getAllNegotiations);

  if (negotiations === undefined) {
    return (
      <div className="flex h-screen bg-slate-950 text-white">
        <Sidebar />

        <div className="flex flex-1 flex-col">
          <Navbar />

          <main className="flex items-center justify-center flex-1">
            Loading approvals...
          </main>
        </div>
      </div>
    );
  }

  const pending = negotiations.filter(
    (n: any) => n.ceoDecision === "Pending"
  );

  return (
    <div className="flex h-screen bg-slate-950 text-white">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-8">
          {/* Header */}

          <div className="mb-8 flex items-center justify-between">
            <div>
              <Link
                href="/"
                className="mb-4 inline-flex items-center gap-2 text-zinc-400 hover:text-white"
              >
                <ArrowLeft size={18} />
                Dashboard
              </Link>

              <h1 className="text-4xl font-bold">
                CEO Approval Center
              </h1>

              <p className="mt-2 text-zinc-400">
                Review AI negotiations before final approval.
              </p>
            </div>

            <div className="rounded-xl border border-blue-500/30 bg-blue-500/10 px-6 py-4">
              <p className="text-sm text-zinc-400">
                Pending Reviews
              </p>

              <p className="text-4xl font-bold text-blue-400">
                {pending.length}
              </p>
            </div>
          </div>

          {pending.length === 0 ? (
            <Card className="border-zinc-800 bg-zinc-900">
              <CardContent className="flex flex-col items-center py-20">
                <CheckCircle className="mb-4 h-16 w-16 text-green-500" />

                <h2 className="text-2xl font-bold">
                  No Pending Approvals
                </h2>

                <p className="mt-2 text-zinc-400">
                  Every negotiation has already been reviewed.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-6">
              {pending.map((item: any) => (
                <Card
                  key={item._id}
                  className="border-zinc-800 bg-zinc-900 transition-all duration-300 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/10"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-2xl text-white">
                          Decision Review
                        </CardTitle>

                        <p className="mt-2 text-zinc-400">
                          Negotiation ID: {item._id}
                        </p>
                      </div>

                      <Badge className="bg-yellow-500/20 text-yellow-400">
                        <Clock className="mr-2 h-4 w-4" />
                        Pending
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Summary */}

                    <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5">
                      <h3 className="mb-3 font-semibold text-white">
                        Executive Summary
                      </h3>

                      <p className="text-zinc-300">
                        {item.executiveSummary}
                      </p>
                    </div>

                    {/* Metrics */}

                    <div className="grid gap-4 md:grid-cols-3">
                      <Card className="border-zinc-800 bg-zinc-950">
                        <CardContent className="p-5">
                          <p className="text-sm text-zinc-400">
                            AI Confidence
                          </p>

                          <p className="mt-2 text-3xl font-bold text-blue-400">
                            {item.confidence}%
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="border-zinc-800 bg-zinc-950">
                        <CardContent className="p-5">
                          <p className="text-sm text-zinc-400">
                            Debate Rounds
                          </p>

                          <p className="mt-2 text-3xl font-bold text-cyan-400">
                            {item.rounds}
                          </p>
                        </CardContent>
                      </Card>

                      <Card className="border-zinc-800 bg-zinc-950">
                        <CardContent className="p-5">
                          <p className="text-sm text-zinc-400">
                            Consensus
                          </p>

                          <p className="mt-2 text-xl font-bold text-green-400">
                            {item.consensusReached ? "Reached" : "No"}
                          </p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Actions */}

                    <div className="flex flex-wrap gap-4 pt-2">
                      <Link href={`/negotiation/${item.decisionId}`}>
                        <Button className="gap-2 bg-blue-600 hover:bg-blue-500">
                          <Eye size={18} />
                          View Full Report
                        </Button>
                      </Link>

                      <Button className="gap-2 bg-green-600 hover:bg-green-500">
                        <CheckCircle size={18} />
                        Approve
                      </Button>

                      <Button
                        variant="destructive"
                        className="gap-2"
                      >
                        <XCircle size={18} />
                        Reject
                      </Button>

                      <Button
                        variant="secondary"
                        className="gap-2"
                      >
                        <RotateCcw size={18} />
                        Request Revision
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}