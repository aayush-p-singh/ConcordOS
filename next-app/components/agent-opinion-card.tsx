"use client";

import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Brain,
  BadgeCheck,
  Clock,
} from "lucide-react";

interface Props {
  department: string;
  opinion: string;
  confidence: number;
  color: string;
}

export default function AgentOpinionCard({
  department,
  opinion,
  confidence,
  color,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`rounded-xl border ${color} bg-zinc-900 shadow-lg transition-all`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between p-5"
      >
        <div>
          <h3 className="text-xl font-bold text-white">
            {department}
          </h3>

          <div className="mt-2 flex gap-2">
            <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs text-blue-300">
              AI Generated
            </span>

            <span className="rounded-full bg-green-500/20 px-3 py-1 text-xs text-green-300">
              Completed
            </span>
          </div>
        </div>

        {open ? (
          <ChevronUp className="text-zinc-400" />
        ) : (
          <ChevronDown className="text-zinc-400" />
        )}
      </button>

      {open && (
        <div className="border-t border-zinc-800 p-5">
          <div className="mb-4 flex items-center gap-3 text-zinc-400">
            <Brain size={18} />
            AI Analysis
          </div>

          <p className="whitespace-pre-wrap leading-7 text-zinc-300">
            {opinion}
          </p>

          <div className="mt-6 flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <BadgeCheck className="text-green-400" size={18} />
              <span className="text-zinc-300">
                Confidence: {confidence}%
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="text-blue-400" size={18} />
              <span className="text-zinc-300">
                Generated just now
              </span>
            </div>
          </div>

          <div className="mt-4 h-2 rounded-full bg-zinc-800">
            <div
              className={`h-2 rounded-full ${
                confidence > 85
                  ? "bg-green-500"
                  : confidence > 60
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              style={{
                width: `${confidence}%`,
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}