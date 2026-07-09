import {
  Activity,
  Bot,
  CheckCircle,
  Clock,
} from "lucide-react";

import StatCard from "./stat-card";

export default function CompanyHealth() {
  return (
    <div className="grid grid-cols-2 gap-5 xl:grid-cols-4">
      <StatCard
        title="Running Agents"
        value="8"
        subtitle="Currently active"
        icon={Bot}
      />

      <StatCard
        title="Pending Decisions"
        value="14"
        subtitle="Awaiting review"
        icon={Clock}
      />

      <StatCard
        title="Executed Today"
        value="38"
        subtitle="Automation completed"
        icon={CheckCircle}
      />

      <StatCard
        title="System Health"
        value="99.9%"
        subtitle="Operational"
        icon={Activity}
      />
    </div>
  );
}