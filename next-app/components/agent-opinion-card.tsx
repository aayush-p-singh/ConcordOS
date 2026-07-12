"use client";

import {
  CheckCircle,
  ThumbsUp,
  ThumbsDown,
  Target,
} from "lucide-react";

interface Opinion {
  overview: string;
  pros: string[];
  cons: string[];
  recommendation: string;
  confidence: number;
}

interface Props {
  department: string;
  opinion: Opinion;
  confidence: number;
  color?: string;
}

export default function AgentOpinionCard({
  department,
  opinion,
  confidence,
  color = "",
}: Props) {
  return (
    <div className={`rounded-xl border bg-zinc-900 p-5 ${color}`}>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">
          {department}
        </h3>

        <span className="rounded bg-blue-500/20 px-2 py-1 text-sm text-blue-400">
          {confidence}%
        </span>
      </div>

      <div className="space-y-5">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <CheckCircle size={18} className="text-cyan-400" />
            <h4 className="font-medium text-white">Overview</h4>
          </div>

          <p className="text-zinc-300">
            {opinion.overview}
          </p>
        </div>

        <div>
          <div className="mb-2 flex items-center gap-2">
            <ThumbsUp size={18} className="text-green-400" />
            <h4 className="font-medium text-white">Pros</h4>
          </div>

          <ul className="list-disc space-y-1 pl-5 text-zinc-300">
            {opinion.pros.map((pro, i) => (
              <li key={i}>{pro}</li>
            ))}
          </ul>
        </div>

        <div>
          <div className="mb-2 flex items-center gap-2">
            <ThumbsDown size={18} className="text-red-400" />
            <h4 className="font-medium text-white">Cons</h4>
          </div>

          <ul className="list-disc space-y-1 pl-5 text-zinc-300">
            {opinion.cons.map((con, i) => (
              <li key={i}>{con}</li>
            ))}
          </ul>
        </div>

        <div>
          <div className="mb-2 flex items-center gap-2">
            <Target size={18} className="text-yellow-400" />
            <h4 className="font-medium text-white">
              Recommendation
            </h4>
          </div>

          <p className="text-zinc-300">
            {opinion.recommendation}
          </p>
        </div>
      </div>
    </div>
  );
}