"use client";

import {
  CheckCircle2,
  Cpu,
  DollarSign,
  Megaphone,
  Sparkles,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface NegotiationResultProps {
  engineering: string;
  finance: string;
  marketing: string;
  finalDecision: string;
  confidence: number;
}

export default function NegotiationResult({
  engineering,
  finance,
  marketing,
  finalDecision,
  confidence,
}: NegotiationResultProps) {
  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-zinc-800 bg-zinc-900">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2 text-white">
              <Sparkles className="h-6 w-6 text-blue-400" />
              AI Negotiation Summary
            </CardTitle>

            <p className="mt-2 text-sm text-zinc-400">
              Multi-agent decision analysis
            </p>
          </div>

          <Badge className="bg-emerald-500/20 text-emerald-400">
            Completed
          </Badge>
        </CardHeader>
      </Card>

      {/* Agent Opinions */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="border-blue-900 bg-zinc-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <Cpu size={20} />
              Engineering
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-sm leading-7 text-zinc-300">
              {engineering}
            </p>
          </CardContent>
        </Card>

        <Card className="border-green-900 bg-zinc-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <DollarSign size={20} />
              Finance
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-sm leading-7 text-zinc-300">
              {finance}
            </p>
          </CardContent>
        </Card>

        <Card className="border-purple-900 bg-zinc-900">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <Megaphone size={20} />
              Marketing
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-sm leading-7 text-zinc-300">
              {marketing}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Final Recommendation */}
      <Card className="border-emerald-800 bg-linear-to-r from-emerald-950 to-zinc-900">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-emerald-400">
            <CheckCircle2 className="h-6 w-6" />
            Final Recommendation
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="rounded-lg border border-emerald-800 bg-black/20 p-4">
            <p className="text-lg font-medium leading-8 text-white">
              {finalDecision}
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-zinc-400">
                AI Confidence
              </span>

              <span className="font-bold text-white">
                {confidence}%
              </span>
            </div>

            <Progress value={confidence} />
          </div>

          <div className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950 p-4">
            <div>
              <p className="text-sm text-zinc-400">
                Decision Status
              </p>

              <p className="mt-1 text-white">
                Ready for Approval
              </p>
            </div>

            <Badge className="bg-green-500/20 px-3 py-1 text-green-400">
              Completed
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* AI Workflow Timeline */}
      <Card className="border-zinc-800 bg-zinc-900">
        <CardHeader>
          <CardTitle className="text-white">
            Workflow Timeline
          </CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-5">
            {[
              "Decision Created",
              "Engineering Analysis Complete",
              "Finance Analysis Complete",
              "Marketing Analysis Complete",
              "Negotiation Completed",
            ].map((step, index) => (
              <div key={step} className="flex items-center gap-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                  {index + 1}
                </div>

                <div>
                  <p className="font-medium text-white">
                    {step}
                  </p>

                  <p className="text-sm text-zinc-500">
                    Completed successfully
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}