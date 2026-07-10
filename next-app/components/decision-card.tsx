"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const decisions = [
  {
    id: "DEC-001",
    title: "Launch AI Feature",
    priority: "High",
    status: "Negotiating",
    owner: "Engineering • Finance • Marketing",
  },
  {
    id: "DEC-002",
    title: "Hire Backend Engineer",
    priority: "Medium",
    status: "Pending Approval",
    owner: "HR • Finance",
  },
  {
    id: "DEC-003",
    title: "Switch Cloud Provider",
    priority: "Critical",
    status: "Executing",
    owner: "Infrastructure • Finance",
  },
];

const badgeColor = (status: string) => {
  switch (status) {
    case "Negotiating":
      return "bg-yellow-500/20 text-yellow-400";
    case "Pending Approval":
      return "bg-blue-500/20 text-blue-400";
    case "Executing":
      return "bg-green-500/20 text-green-400";
    default:
      return "bg-zinc-700 text-zinc-300";
  }
};

export default function DecisionCard() {
  return (
    <Card className="mt-6 border-zinc-800 bg-zinc-900">
      <CardHeader>
        <CardTitle className="text-white">
          Active Decisions
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {decisions.map((decision) => (
          <Link key={decision.id} href={`/decisions/${decision.id}`}>
            <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950 p-5 transition hover:border-blue-500 cursor-pointer">
              <div>
                <p className="text-lg font-semibold text-white">
                  {decision.title}
                </p>

                <p className="mt-1 text-sm text-zinc-400">
                  {decision.owner}
                </p>

                <div className="mt-3 flex gap-2">
                  <Badge variant="secondary">
                    {decision.priority}
                  </Badge>

                  <Badge className={badgeColor(decision.status)}>
                    {decision.status}
                  </Badge>
                </div>
              </div>

              <ArrowRight className="text-zinc-500" />
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}