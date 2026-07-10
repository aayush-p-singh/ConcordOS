"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useQuery } from "convex/react";

import { api } from "@/convex/_generated/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const badgeColor = (status: string) => {
  switch (status) {
    case "Negotiating":
      return "bg-yellow-500/20 text-yellow-400";

    case "Pending Approval":
      return "bg-blue-500/20 text-blue-400";

    case "Executing":
      return "bg-green-500/20 text-green-400";

    case "Approved":
      return "bg-emerald-500/20 text-emerald-400";

    case "Rejected":
      return "bg-red-500/20 text-red-400";

    default:
      return "bg-zinc-700 text-zinc-300";
  }
};

export default function DecisionCard() {
  const decisions = useQuery(api.decisions.getDecisions);

  // Loading State
  if (decisions === undefined) {
    return (
      <Card className="mt-6 border-zinc-800 bg-zinc-900">
        <CardHeader>
          <CardTitle className="text-white">
            Active Decisions
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="animate-pulse rounded-xl border border-zinc-800 bg-zinc-950 p-5"
            >
              <div className="mb-3 h-5 w-48 rounded bg-zinc-800" />
              <div className="mb-4 h-4 w-32 rounded bg-zinc-800" />
              <div className="flex gap-2">
                <div className="h-6 w-20 rounded bg-zinc-800" />
                <div className="h-6 w-24 rounded bg-zinc-800" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  // Empty State
  if (decisions.length === 0) {
    return (
      <Card className="mt-6 border-zinc-800 bg-zinc-900">
        <CardHeader>
          <CardTitle className="text-white">
            Active Decisions
          </CardTitle>
        </CardHeader>

        <CardContent className="py-10 text-center text-zinc-400">
          No decisions found.
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mt-6 border-zinc-800 bg-zinc-900">
      <CardHeader>
        <CardTitle className="text-white">
          Active Decisions
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {decisions.map((decision) => (
          <div key={decision._id} className="space-y-3">

            <Link href={`/decisions/${decision._id}`}>
              <div className="group flex cursor-pointer items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950 p-5 transition-all duration-200 hover:border-blue-500 hover:bg-zinc-900">

                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {decision.title}
                  </h3>

                  <p className="mt-1 text-sm text-zinc-400">
                    Created by: {decision.createdBy}
                  </p>

                  <p className="mt-1 text-sm text-zinc-500">
                    Deadline: {decision.deadline}
                  </p>

                  <div className="mt-4 flex gap-2">
                    <Badge variant="secondary">
                      {decision.priority}
                    </Badge>

                    <Badge className={badgeColor(decision.status)}>
                      {decision.status}
                    </Badge>
                  </div>
                </div>

                <ArrowRight className="text-zinc-500 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>

            <Link href={`/negotiation/${decision._id}`}>
              <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white hover:bg-blue-500">
                View Negotiation
              </button>
            </Link>

          </div>
        ))}
      </CardContent>
    </Card>
  );
}