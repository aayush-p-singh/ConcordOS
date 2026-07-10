import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const events = [
  "Engineering analyzed request",
  "Finance rejected initial budget",
  "Marketing confirmed launch window",
  "Engineering reduced feature scope",
  "Consensus reached",
];

export default function AuditTimeline() {
  return (
    <Card className="border-zinc-800 bg-zinc-900">
      <CardHeader>
        <CardTitle>Audit Timeline</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">

        {events.map((event, index) => (
          <div
            key={index}
            className="border-l-2 border-blue-500 pl-4"
          >
            <p className="text-sm text-zinc-300">
              {event}
            </p>
          </div>
        ))}

      </CardContent>
    </Card>
  );
}