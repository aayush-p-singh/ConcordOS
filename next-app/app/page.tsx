import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import StatCard from "@/components/stat-card";
import DecisionCard from "@/components/decision-card";
import LiveFeed from "@/components/live-feed";
import NegotiationTimeline from "@/components/negotiation-timeline";
import {
  Bot,
  Clock,
  CheckCircle,
  Activity,
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-slate-950 text-white">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">

        <Navbar />

        <main className="flex-1 overflow-y-auto p-6 grid grid-cols-12 gap-6">

          <div className="lg:col-span-8">

            <div className="grid grid-cols-4 gap-4">

              <StatCard
              title="Active Decisions"
              value="12"
              subtitle="Currently open"
              icon={Clock}
            />

            <StatCard
              title="Running Agents"
              value="5"
              subtitle="Working now"
              icon={Bot}
            />

            <StatCard
              title="Pending Approval"
              value="3"
              subtitle="Waiting for review"
              icon={CheckCircle}
            />

            <StatCard
              title="Today's Actions"
              value="42"
              subtitle="Completed"
              icon={Activity}
            />

            </div>

            <DecisionCard />

          </div>

          <div className="lg:col-span-4 space-y-6">
            <LiveFeed />
            <NegotiationTimeline />
          </div>

        </main>

      </div>

    </div>
  );
}