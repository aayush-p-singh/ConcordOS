"use client";

import { useParams } from "next/navigation";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import NegotiationResult from "@/components/negotiation-result";

export default function NegotiationPage() {
  const { id } = useParams();

  const negotiation = useQuery(
    api.negotiation.getNegotiation,
    {
      decisionId: id as any,
    }
  );

  if (!negotiation) {
    return (
      <div className="p-8 text-white">
        Loading negotiation...
      </div>
    );
  }

  return (
    <div className="p-8 bg-slate-950 min-h-screen">
      <NegotiationResult
        engineering={negotiation.engineeringOpinion}
        finance={negotiation.financeOpinion}
        marketing={negotiation.marketingOpinion}
        finalDecision={negotiation.finalDecision}
        confidence={negotiation.confidence}
      />
    </div>
  );
}