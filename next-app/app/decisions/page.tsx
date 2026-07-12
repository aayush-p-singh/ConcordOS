"use client";

import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";

const badgeColor = (status: string) => {
  switch (status) {
    case "Negotiating":
      return "bg-yellow-500/20 text-yellow-400";

    case "Approved":
      return "bg-green-500/20 text-green-400";

    case "Rejected":
      return "bg-red-500/20 text-red-400";

    default:
      return "bg-zinc-700 text-zinc-300";
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

          <main className="p-8">
            <p>Loading decisions...</p>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-slate-950 text-white">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-8">
          <h1 className="mb-8 text-3xl font-bold">
            Decisions
          </h1>

          <div className="grid gap-6">
            {decisions.length === 0 ? (
              <Card className="border-zinc-800 bg-zinc-900">
                <CardContent className="py-10 text-center text-zinc-400">
                  No decisions found.
                </CardContent>
              </Card>
            ) : (
              decisions.map((decision) => (
                <Card
                  key={decision._id}
                  className="border-zinc-800 bg-zinc-900"
                >
                  <CardHeader>
                    <CardTitle className="text-white">
                      {decision.title}
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <p className="text-zinc-400">
                      Created By: {decision.createdBy}
                    </p>

                    <p className="text-zinc-400">
                      Deadline: {decision.deadline}
                    </p>

                    <div className="flex gap-2">
                      <Badge>{decision.priority}</Badge>

                      <Badge
                        className={badgeColor(
                          decision.status
                        )}
                      >
                        {decision.status}
                      </Badge>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Link
                        href={`/decisions/${decision._id}`}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-500"
                      >
                        View Details
                      </Link>

                      <Link
                        href={`/negotiation/${decision._id}`}
                        className="rounded-lg bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-500"
                      >
                        View Negotiation
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}