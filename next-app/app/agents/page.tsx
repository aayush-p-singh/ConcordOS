"use client";

import { useEffect, useState } from "react";
import {
  Brain,
  DollarSign,
  Megaphone,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";

const agents = [
  {
    name: "Engineering",
    icon: Brain,
    color: "text-blue-400",
    tasks: [
      "Reading Sprint Capacity...",
      "Checking GitHub Issues...",
      "Estimating Timeline...",
      "Evaluating Technical Risks...",
    ],
  },
  {
    name: "Finance",
    icon: DollarSign,
    color: "text-green-400",
    tasks: [
      "Reading Budget Policy...",
      "Calculating ROI...",
      "Checking Quarterly Spend...",
      "Negotiating Costs...",
    ],
  },
  {
    name: "Marketing",
    icon: Megaphone,
    color: "text-pink-400",
    tasks: [
      "Checking Campaign Calendar...",
      "Analyzing Market Trends...",
      "Planning Launch...",
      "Estimating Reach...",
    ],
  },
];

export default function AgentsPage() {
  return (
    <main className="min-h-screen bg-zinc-950 p-8 text-white">

      <h1 className="mb-8 text-4xl font-bold">
        AI Departments
      </h1>

      <div className="grid gap-6 md:grid-cols-3">
        {agents.map((agent) => (
          <Link key={agent.name} href={`/agents/${agent.name}`}>
            <AgentCard {...agent} />
          </Link>
        ))}
      </div>

    </main>
  );
}

function AgentCard({
  name,
  icon: Icon,
  color,
  tasks,
}: any) {
  const [progress, setProgress] = useState(10);
  const [taskIndex, setTaskIndex] = useState(0);

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100;
        return prev + Math.floor(Math.random() * 8);
      });
    }, 700);

    const taskTimer = setInterval(() => {
      setTaskIndex((prev) => (prev + 1) % tasks.length);
    }, 1800);

    return () => {
      clearInterval(progressTimer);
      clearInterval(taskTimer);
    };
  }, [tasks.length]);

  return (
    <Card className="border-zinc-800 bg-zinc-900 transition hover:border-blue-500">

      <CardContent className="p-6">

        <div className="flex items-center justify-between">

          <Icon className={`h-10 w-10 ${color}`} />

          <span
            className={`rounded-full px-3 py-1 text-xs font-semibold bg-zinc-800 ${color}`}
          >
            {progress === 100 ? "Completed" : "Thinking"}
          </span>

        </div>

        <h2 className="mt-5 text-2xl font-bold">
          {name}
        </h2>

        <p className="mt-4 text-sm text-zinc-400">
          {tasks[taskIndex]}
        </p>

        <Progress
          value={progress}
          className="mt-5"
        />

        <div className="mt-3 flex justify-between text-sm text-zinc-500">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>

      </CardContent>

    </Card>
  );
}