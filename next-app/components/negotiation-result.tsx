"use client";

import {
  CheckCircle,
  AlertTriangle,
  ShieldAlert,
  FileText,
  BarChart3,
  Bot,
  MessageSquare,
} from "lucide-react";

import AnimatedCard from "@/components/ui/animated-card";
import AgentOpinionCard from "./agent-opinion-card";

type Opinion = {
  overview: string;
  pros: string[];
  cons: string[];
  recommendation: string;
  confidence: number;
};

type TranscriptItem = {
  round: number;
  speaker: string;
  message: string;
  timestamp?: number;
};

interface NegotiationResultProps {
  engineering: Opinion;
  finance: Opinion;
  marketing: Opinion;

  executiveSummary: string;
  conflicts: string;
  recommendation: string;
  risks: string;

  confidence: number;

  transcript?: TranscriptItem[];
  consensusReached?: boolean;
}

export default function NegotiationResult({
  engineering,
  finance,
  marketing,
  executiveSummary,
  conflicts,
  recommendation,
  risks,
  confidence,
  transcript = [],
  consensusReached = false,
}: NegotiationResultProps) {
  return (
    <div className="space-y-6">

      {/* Executive Summary */}

      <AnimatedCard
        delay={0}
        className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg"
      >
        <div className="mb-4 flex items-center gap-3">
          <FileText className="text-blue-400" size={22} />
          <h2 className="text-2xl font-bold text-white">
            Executive Summary
          </h2>
        </div>

        <p className="whitespace-pre-wrap leading-7 text-zinc-300">
          {executiveSummary}
        </p>
      </AnimatedCard>

      {/* Department Analysis */}

      <AnimatedCard
        delay={0.1}
        className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg"
      >
        <div className="mb-6 flex items-center gap-3">
          <Bot className="text-cyan-400" />

          <h2 className="text-2xl font-bold text-white">
            AI Department Analysis
          </h2>
        </div>

        <div className="space-y-5">
          <AgentOpinionCard
            department="Engineering"
            opinion={engineering}
            confidence={engineering.confidence}
            color="border-cyan-600/40"
          />

          <AgentOpinionCard
            department="Finance"
            opinion={finance}
            confidence={finance.confidence}
            color="border-green-600/40"
          />

          <AgentOpinionCard
            department="Marketing"
            opinion={marketing}
            confidence={marketing.confidence}
            color="border-pink-600/40"
          />
        </div>
      </AnimatedCard>

      {/* Debate Transcript */}

      {transcript.length > 0 && (
        <AnimatedCard
          delay={0.2}
          className="rounded-xl border border-indigo-500/30 bg-zinc-900 p-6 shadow-lg"
        >
          <div className="mb-5 flex items-center gap-3">
            <MessageSquare className="text-indigo-400" />

            <h2 className="text-2xl font-bold text-white">
              Debate Transcript
            </h2>
          </div>

          <div className="space-y-4">
            {transcript.map((item, index) => (
              <AnimatedCard
                key={index}
                delay={0.03 * index}
                className="rounded-lg border border-zinc-800 bg-zinc-950 p-4"
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="font-semibold text-blue-400">
                    {item.speaker}
                  </span>

                  <span className="rounded bg-zinc-800 px-2 py-1 text-xs text-zinc-400">
                    Round {item.round}
                  </span>
                </div>

                <p className="text-zinc-300">{item.message}</p>
              </AnimatedCard>
            ))}
          </div>
        </AnimatedCard>
      )}

      {/* Conflicts */}

      <AnimatedCard
        delay={0.3}
        className="rounded-xl border border-yellow-500/30 bg-yellow-500/10 p-6 shadow-lg"
      >
        <div className="mb-4 flex items-center gap-3">
          <AlertTriangle className="text-yellow-400" />

          <h2 className="text-xl font-bold text-yellow-300">
            Conflicts Identified
          </h2>
        </div>

        <p className="whitespace-pre-wrap leading-7 text-yellow-100">
          {conflicts}
        </p>
      </AnimatedCard>

      {/* Recommendation */}

      <AnimatedCard
        delay={0.4}
        className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-6 shadow-lg"
      >
        <div className="mb-4 flex items-center gap-3">
          <CheckCircle className="text-emerald-400" />

          <h2 className="text-xl font-bold text-emerald-300">
            Final Recommendation
          </h2>
        </div>

        <p className="whitespace-pre-wrap leading-7 text-emerald-100">
          {recommendation}
        </p>
      </AnimatedCard>

      {/* Risks */}

      <AnimatedCard
        delay={0.5}
        className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 shadow-lg"
      >
        <div className="mb-4 flex items-center gap-3">
          <ShieldAlert className="text-red-400" />

          <h2 className="text-xl font-bold text-red-300">
            Risks
          </h2>
        </div>

        <p className="whitespace-pre-wrap leading-7 text-red-100">
          {risks}
        </p>
      </AnimatedCard>

      {/* Confidence */}

      <AnimatedCard
        delay={0.6}
        className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg"
      >
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="flex items-center gap-2 text-xl font-bold text-white">
              <BarChart3 className="text-blue-400" />
              Overall AI Confidence
            </h2>

            <p className="mt-1 text-sm text-zinc-400">
              {consensusReached
                ? "Consensus Reached"
                : "Human Review Recommended"}
            </p>
          </div>

          <span className="text-3xl font-bold text-blue-400">
            {confidence}%
          </span>
        </div>

        <div className="h-4 w-full overflow-hidden rounded-full bg-zinc-800">
          <div
            className={`h-4 rounded-full transition-all duration-1000 ${
              confidence >= 85
                ? "bg-green-500"
                : confidence >= 65
                ? "bg-yellow-500"
                : "bg-red-500"
            }`}
            style={{
              width: `${confidence}%`,
            }}
          />
        </div>
      </AnimatedCard>

      {/* Workflow Timeline */}

      <AnimatedCard
        delay={0.7}
        className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg"
      >
        <h2 className="mb-6 text-2xl font-bold text-white">
          AI Workflow Timeline
        </h2>

        <div className="space-y-5">
          {[
            "Decision Created",
            "Engineering Initial Analysis",
            "Finance Initial Analysis",
            "Marketing Initial Analysis",
            "Multi-Agent Debate (3 Rounds)",
            "Departments Revised Opinions",
            "CEO Generated Executive Summary",
            consensusReached
              ? "Consensus Reached"
              : "Awaiting Human Decision",
          ].map((step, index) => (
            <AnimatedCard
              key={index}
              delay={0.05 * index}
              className="flex items-center gap-4 bg-transparent p-0 shadow-none border-none"
            >
              <div
                className={`h-3 w-3 rounded-full ${
                  index === 7
                    ? "animate-pulse bg-blue-500"
                    : "bg-green-500"
                }`}
              />

              <p className="text-zinc-300">{step}</p>
            </AnimatedCard>
          ))}
        </div>
      </AnimatedCard>

    </div>
  );
}