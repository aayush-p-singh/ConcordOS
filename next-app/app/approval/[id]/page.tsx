"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";

import {
  ArrowLeft,
  BrainCircuit,
  CheckCircle2,
  Clock,
  RotateCcw,
  ShieldCheck,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ApprovalPage() {
  const { id } = useParams();
  const router = useRouter();

  const negotiation = useQuery(api.negotiation.getNegotiation, {
    decisionId: id as any,
  });

  const approve = useMutation(api.ceo.approveDecision);

  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  // Loading
  if (negotiation === undefined) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        Loading Approval...
      </div>
    );
  }

  // Not Found
  if (negotiation === null) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-red-400">
        Negotiation not found.
      </div>
    );
  }

  // negotiation is guaranteed to exist below
  const data = negotiation;

  async function submit(
    decision: "Approved" | "Rejected" | "Revision Requested"
  ) {
    setLoading(true);

    try {
      await approve({
        negotiationId: data._id,
        decision,
        approvedBy: "CEO",
        comment,
      });

      router.push("/approval");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <div className="border-b border-zinc-800 bg-zinc-900/70 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between p-6">
          <div>
            <Button
              variant="ghost"
              className="mb-4"
              onClick={() => router.push("/approval")}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>

            <h1 className="text-4xl font-bold">CEO Approval Center</h1>

            <p className="mt-2 text-zinc-400">
              Final Human Review before execution
            </p>
          </div>

          <ShieldCheck className="h-16 w-16 text-blue-500" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-6 p-6">
        {/* AI Recommendation */}
        <Card className="border-blue-500/30 bg-blue-950/20">
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <BrainCircuit className="text-blue-400" />
              <h2 className="text-2xl font-bold">AI Recommendation</h2>
            </div>

            <p className="mt-6 leading-7 text-zinc-300">
              {data.recommendation}
            </p>
          </CardContent>
        </Card>

        {/* Confidence */}
        <Card className="border-zinc-800 bg-zinc-900">
          <CardContent className="p-6">
            <div className="mb-4 flex justify-between">
              <span>AI Confidence</span>

              <span className="text-2xl font-bold text-green-400">
                {data.confidence}%
              </span>
            </div>

            <div className="h-4 overflow-hidden rounded-full bg-zinc-800">
              <div
                className="h-full bg-linear-to-r from-green-500 to-emerald-400 transition-all duration-1000"
                style={{
                  width: `${data.confidence}%`,
                }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Risks */}
        <Card className="border-red-500/30 bg-red-950/20">
          <CardContent className="p-6">
            <h2 className="mb-4 text-xl font-bold text-red-400">
              Risks
            </h2>

            <p className="text-zinc-300">{data.risks}</p>
          </CardContent>
        </Card>

        {/* CEO Notes */}
        <Card className="border-zinc-800 bg-zinc-900">
          <CardContent className="p-6">
            <h2 className="mb-4 text-xl font-bold">
              CEO Notes
            </h2>

            <textarea
              rows={6}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your approval comments..."
              className="w-full rounded-lg border border-zinc-700 bg-zinc-950 p-4 text-white outline-none focus:border-blue-500"
            />
          </CardContent>
        </Card>

        {/* Buttons */}
        <div className="grid gap-4 md:grid-cols-3">
          <Button
            disabled={loading}
            onClick={() => submit("Approved")}
            className="h-14 bg-green-600 hover:bg-green-500"
          >
            <CheckCircle2 className="mr-2 h-5 w-5" />
            Approve
          </Button>

          <Button
            disabled={loading}
            onClick={() => submit("Revision Requested")}
            className="h-14 bg-yellow-600 hover:bg-yellow-500"
          >
            <RotateCcw className="mr-2 h-5 w-5" />
            Request Revision
          </Button>

          <Button
            disabled={loading}
            onClick={() => submit("Rejected")}
            className="h-14 bg-red-600 hover:bg-red-500"
          >
            <XCircle className="mr-2 h-5 w-5" />
            Reject
          </Button>
        </div>

        {/* Status */}
        <Card className="border-zinc-800 bg-zinc-900">
          <CardContent className="flex items-center gap-4 p-6">
            <Clock className="text-yellow-400" />

            <div>
              <p className="font-semibold">
                Current Status
              </p>

              <p className="text-zinc-400">
                {data.ceoDecision ?? "Pending"}
              </p>

              {data.approvedBy && (
                <p className="mt-1 text-sm text-zinc-500">
                  Approved By: {data.approvedBy}
                </p>
              )}

              {data.ceoComment && (
                <div className="mt-3 rounded-lg bg-zinc-800 p-3">
                  <p className="text-xs uppercase text-zinc-500">
                    CEO Comment
                  </p>

                  <p className="mt-2 text-sm text-zinc-300">
                    {data.ceoComment}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}