"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
    <Card className="border-zinc-800 bg-zinc-900">
      <CardHeader>
        <CardTitle className="text-white">
          Negotiation Summary
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">

        <div>
          <p className="text-xs text-zinc-500">Engineering</p>
          <p className="text-white">{engineering}</p>
        </div>

        <div>
          <p className="text-xs text-zinc-500">Finance</p>
          <p className="text-white">{finance}</p>
        </div>

        <div>
          <p className="text-xs text-zinc-500">Marketing</p>
          <p className="text-white">{marketing}</p>
        </div>

        <div className="rounded-lg border border-blue-800 bg-blue-950/20 p-4">
          <p className="text-sm font-semibold text-blue-400">
            Final Recommendation
          </p>

          <p className="mt-2 text-white">
            {finalDecision}
          </p>

          <Badge className="mt-4 bg-emerald-500/20 text-emerald-400">
            {confidence}% Confidence
          </Badge>
        </div>

      </CardContent>
    </Card>
  );
}