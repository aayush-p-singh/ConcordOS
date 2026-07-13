"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import {
  ArrowLeft,
  BrainCircuit,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import NegotiationResult from "@/components/negotiation-result";

export default function NegotiationPage() {
  const { id } = useParams();

  const negotiation = useQuery(api.negotiation.getNegotiation, {
    decisionId: id as any,
  });

  if (!negotiation) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="space-y-5 text-center">
          <div className="mx-auto h-16 w-16 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />

          <h2 className="text-2xl font-semibold text-white">
            AI Negotiation in Progress...
          </h2>

          <p className="text-zinc-400">
            Gathering opinions and generating executive recommendation.
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-black">

      {/* Header */}
      <div className="border-b border-zinc-800 bg-zinc-900/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-6">

          <div>
            <div className="flex items-center gap-3">

              <BrainCircuit className="text-blue-400" size={34} />

              <div>
                <h1 className="text-3xl font-bold text-white">
                  AI Negotiation Report
                </h1>

                <p className="mt-1 text-zinc-400">
                  Multi-agent debate • Executive Recommendation • Consensus Analysis
                </p>
              </div>
            </div>
          </div>

          <Link href="/">
            <Button
              variant="outline"
              className="border-zinc-700 bg-zinc-900 hover:bg-zinc-800"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </Link>

        </div>
      </div>

      {/* Hero Banner */}
      <section className="mx-auto max-w-7xl px-8 py-8">
        <div className="rounded-2xl border border-blue-500/20 bg-linear-to-r from-blue-600/10 via-indigo-600/10 to-cyan-600/10 p-8 backdrop-blur-xl">

          <div className="flex items-center gap-4">

            <Sparkles className="h-10 w-10 text-cyan-400" />

            <div>
              <h2 className="text-2xl font-bold text-white">
                Executive AI Decision Center
              </h2>

              <p className="mt-2 max-w-3xl text-zinc-300">
                Three specialized AI departments independently analyzed the
                decision, debated multiple rounds, revised their viewpoints,
                and collaborated to produce an executive recommendation.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Negotiation Content */}
      <section className="mx-auto max-w-7xl px-8 pb-12">
        <NegotiationResult
          engineering={negotiation.engineeringOpinion}
          finance={negotiation.financeOpinion}
          marketing={negotiation.marketingOpinion}
          executiveSummary={negotiation.executiveSummary}
          conflicts={negotiation.conflicts}
          recommendation={negotiation.recommendation}
          risks={negotiation.risks}
          confidence={negotiation.confidence}
          transcript={negotiation.transcript}
          consensusReached={negotiation.consensusReached}
        />
      </section>

    </main>
  );
}