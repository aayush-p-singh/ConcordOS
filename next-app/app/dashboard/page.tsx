import Sidebar from "@/components/sidebar";
import Navbar from "@/components/navbar";
import StatCard from "@/components/stat-card";
import DecisionCard from "@/components/decision-card";
import LiveFeed from "@/components/live-feed";
import NegotiationTimeline from "@/components/negotiation-timeline";

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-slate-950 text-white">
      <Sidebar />

      <div className="flex-1 flex flex-col">

        <Navbar />

        <main className="p-6 grid grid-cols-12 gap-6">

          <div className="col-span-8">

            <div className="grid grid-cols-4 gap-4">

              <StatCard
                title="Active Decisions"
                value="12"
              />

              <StatCard
                title="Running Agents"
                value="5"
              />

              <StatCard
                title="Pending Approval"
                value="3"
              />

              <StatCard
                title="Today's Actions"
                value="42"
              />

            </div>

            <DecisionCard />

          </div>

          <div className="col-span-4 space-y-6">
            <LiveFeed />
            <NegotiationTimeline />
          </div>

        </main>

      </div>

    </div>
  );
}