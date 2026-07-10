"use client";

import { Bot } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface AgentCardProps {
  name: string;
  department: string;
  status: string;
  progress: number;
  task: string;
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
}: AgentCardProps) {
  return (
    <Card className="border-zinc-800 bg-zinc-900 transition-all duration-300 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/10">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg text-white">
            {name}
          </CardTitle>

          <p className="mt-1 text-sm text-zinc-400">
            {department}
          </p>
        </div>

        <Bot className="h-8 w-8 text-blue-400" />
      </CardHeader>

      <CardContent className="space-y-5">
        <div className="flex items-center justify-between">
          <span className="text-sm text-zinc-400">
            Status
          </span>

          <Badge className={statusColor(status)}>
            {status}
          </Badge>
        </div>

        <div>
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm text-zinc-400">
              Progress
            </span>

            <span className="text-sm font-semibold text-white">
              {progress}%
            </span>
          </div>

          <Progress value={progress} />
        </div>

        <div className="rounded-lg border border-zinc-800 bg-zinc-950 p-3">
          <p className="text-xs uppercase tracking-wide text-zinc-500">
            Current Task
          </p>

          <p className="mt-2 text-sm text-white">
            {task}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}