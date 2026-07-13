"use client";

import { Bot, CheckCircle, XCircle, Lightbulb } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface Opinion {
  overview: string;
  pros: string[];
  cons: string[];
  recommendation: string;
  confidence: number;
}

interface AgentCardProps {
  name: string;
  department: string;
  status: string;
  progress: number;
  task: string;
  opinion?: Opinion;
  confidence?: number;
}

const statusColor = (status: string) => {
  switch (status) {
    case "Thinking":
      return "bg-yellow-500/20 text-yellow-400";
    case "Negotiating":
      return "bg-blue-500/20 text-blue-400";
    case "Executing":
      return "bg-green-500/20 text-green-400";
    case "Completed":
      return "bg-emerald-500/20 text-emerald-400";
    case "Waiting":
      return "bg-zinc-700 text-zinc-300";
    default:
      return "bg-zinc-700 text-zinc-300";
  }
};

export default function AgentCard({
  name,
  department,
  status,
  progress,
  task,
  opinion,
  confidence,
}: AgentCardProps) {
  return (
    <Card className="border-zinc-800 bg-zinc-900 transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/20">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg text-white">{name}</CardTitle>

          <p className="mt-1 text-sm text-zinc-400">{department}</p>
        </div>

        <Bot className="h-8 w-8 text-cyan-400" />
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Status */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-zinc-400">Status</span>

          <Badge className={statusColor(status)}>{status}</Badge>
        </div>

        {/* Progress */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-zinc-400">Progress</span>

            <span className="font-semibold text-white">
              {progress}%
            </span>
          </div>

          <Progress value={progress} />
        </div>

        {/* Task */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-3">
          <p className="text-xs uppercase tracking-wider text-zinc-500">
            Current Task
          </p>

          <p className="mt-2 text-sm text-white">{task}</p>
        </div>

        {/* Opinion */}
        {opinion && (
          <div className="space-y-4 rounded-xl border border-blue-900/50 bg-blue-950/10 p-4">
            <div>
              <h3 className="mb-2 flex items-center gap-2 font-semibold text-blue-400">
                <Lightbulb size={16} />
                Overview
              </h3>

              <p className="text-sm leading-6 text-zinc-300">
                {opinion.overview}
              </p>
            </div>

            <div>
              <h3 className="mb-2 flex items-center gap-2 font-semibold text-emerald-400">
                <CheckCircle size={16} />
                Pros
              </h3>

              <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-300">
                {opinion.pros.map((pro, index) => (
                  <li key={index}>{pro}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-2 flex items-center gap-2 font-semibold text-red-400">
                <XCircle size={16} />
                Cons
              </h3>

              <ul className="list-disc space-y-1 pl-5 text-sm text-zinc-300">
                {opinion.cons.map((con, index) => (
                  <li key={index}>{con}</li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-2 font-semibold text-yellow-400">
                Recommendation
              </h3>

              <p className="text-sm leading-6 text-zinc-300">
                {opinion.recommendation}
              </p>
            </div>
          </div>
        )}

        {/* Confidence */}
        {confidence !== undefined && (
          <div className="rounded-xl border border-emerald-900 bg-emerald-950/20 p-4">
            <div className="mb-2 flex items-center justify-between">
              <span className="text-sm text-zinc-300">
                AI Confidence
              </span>

              <Badge className="bg-emerald-500/20 text-emerald-400">
                {confidence}%
              </Badge>
            </div>

            <Progress value={confidence} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}