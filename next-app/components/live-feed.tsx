import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const events = [
  {
    agent: "Engineering",
    message: "Estimated timeline: 32 days",
  },
  {
    agent: "Finance",
    message: "Budget exceeds policy",
  },
  {
    agent: "Marketing",
    message: "Campaign window available",
  },
  {
    agent: "Consensus",
    message: "Proposal ready for approval",
  },
];

export default function LiveFeed() {
  return (
    <Card className="h-full border-zinc-800 bg-zinc-900">
      <CardHeader>
        <CardTitle>Live Agent Activity</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5">
        {events.map((event, index) => (
          <div
            key={index}
            className="rounded-lg border border-zinc-800 bg-zinc-950 p-4"
          >
            <p className="font-semibold text-blue-400">
              {event.agent}
            </p>

            <p className="mt-2 text-sm text-zinc-300">
              {event.message}
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}