import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

import AnalysisCard from "@/components/analysis-card";
import DecisionSummary from "@/components/decision-summary";
import ApprovalPanel from "@/components/approval-panel";
import AuditTimeline from "@/components/audit-timeline";

export default async function DecisionPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-zinc-950 text-white p-8">

      <Link
        href="/"
        className="flex items-center gap-2 text-zinc-400 hover:text-white mb-8"
      >
        <ArrowLeft size={18} />
        Back to Dashboard
      </Link>

      <div className="flex items-center justify-between mb-8">

        <div>
          <h1 className="text-4xl font-bold">
            Launch AI Feature
          </h1>

          <p className="mt-2 text-zinc-400">
            Decision ID: {id}
          </p>
        </div>

        <div className="rounded-xl bg-yellow-500/20 px-4 py-2 text-yellow-400">
          Negotiating
        </div>

      </div>

      <div className="grid grid-cols-12 gap-6">

        <div className="col-span-8 space-y-6">

          <DecisionSummary />

          <AnalysisCard
            title="Engineering"
            summary="Estimated implementation time: 32 days."
            recommendation="Reduce Feature X to meet deadline."
            icon={<Clock className="text-blue-400" />}
          />

          <AnalysisCard
            title="Finance"
            summary="Budget exceeds policy by ₹2,00,000."
            recommendation="Approve if scope is reduced."
            icon={<AlertTriangle className="text-yellow-400" />}
          />

          <AnalysisCard
            title="Marketing"
            summary="Launch window available next month."
            recommendation="Proceed in Week 2."
            icon={<CheckCircle className="text-green-400" />}
          />

        </div>

        <div className="col-span-4 space-y-6">

          <ApprovalPanel />

          <AuditTimeline />

        </div>

      </div>

    </main>
  );
}