"use client";

import {
  CheckCircle,
  ThumbsUp,
  ThumbsDown,
  Target,
} from "lucide-react";

interface Opinion {
  overview?: string;
  pros?: string[];
  cons?: string[];
  recommendation?: string;
  confidence?: number;
}

interface Props {
  department: string;
  opinion?: Opinion | null;
  confidence?: number;
  color?: string;
}

export default function AgentOpinionCard({
  department,
  opinion,
  confidence = 0,
  color = "",
}: Props) {
  const overview = opinion?.overview ?? "No overview available.";

  const pros = Array.isArray(opinion?.pros) ? opinion!.pros : [];

  const cons = Array.isArray(opinion?.cons) ? opinion!.cons : [];

  const recommendation =
    opinion?.recommendation ?? "No recommendation available.";

  return (
    <div className={`rounded-xl border border-zinc-800 bg-zinc-900 p-5 ${color}`}>
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">
          {department}
        </h3>

        <span className="rounded-lg bg-blue-500/20 px-3 py-1 text-sm font-medium text-blue-400">
          {confidence}%
        </span>
      </div>

      <div className="space-y-6">
        {/* Overview */}
        <div>
          <div className="mb-2 flex items-center gap-2">
            <CheckCircle className="text-cyan-400" size={18} />
            <h4 className="font-medium text-white">Overview</h4>
          </div>

          <p className="text-zinc-300">
            {overview}
          </p>
        </div>

        {/* Pros */}
        <div>
          <div className="mb-2 flex items-center gap-2">
            <ThumbsUp className="text-green-400" size={18} />
            <h4 className="font-medium text-white">Pros</h4>
          </div>

          {pros.length > 0 ? (
            <ul className="list-disc space-y-1 pl-5 text-zinc-300">
              {pros.map((pro, index) => (
                <li key={index}>{pro}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-zinc-500">
              No pros available.
            </p>
          )}
        </div>

        {/* Cons */}
        <div>
          <div className="mb-2 flex items-center gap-2">
            <ThumbsDown className="text-red-400" size={18} />
            <h4 className="font-medium text-white">Cons</h4>
          </div>

          {cons.length > 0 ? (
            <ul className="list-disc space-y-1 pl-5 text-zinc-300">
              {cons.map((con, index) => (
                <li key={index}>{con}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-zinc-500">
              No cons available.
            </p>
          )}
        </div>

        {/* Recommendation */}
        <div>
          <div className="mb-2 flex items-center gap-2">
            <Target className="text-yellow-400" size={18} />
            <h4 className="font-medium text-white">
              Recommendation
            </h4>
          </div>

          <p className="text-zinc-300">
            {recommendation}
          </p>
        </div>
      </div>
    </div>
  );
}