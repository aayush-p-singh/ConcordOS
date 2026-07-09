import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const messages = [
  {
    agent: "Engineering",
    color: "bg-blue-500",
    message: "Estimated implementation time is 40 days.",
    time: "09:30",
  },
  {
    agent: "Finance",
    color: "bg-green-500",
    message: "Budget exceeds quarterly allocation by $12,000.",
    time: "09:32",
  },
  {
    agent: "Marketing",
    color: "bg-pink-500",
    message: "Launch window is fixed for next month.",
    time: "09:34",
  },
  {
    agent: "Engineering",
    color: "bg-blue-500",
    message: "Reducing feature scope to fit timeline.",
    time: "09:36",
  },
  {
    agent: "Finance",
    color: "bg-green-500",
    message: "Budget approved after scope reduction.",
    time: "09:38",
  },
];

export default function NegotiationTimeline() {
  return (
    <Card className="border-zinc-800 bg-zinc-900">
      <CardHeader>
        <CardTitle>Agent Negotiation</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {messages.map((item, index) => (
          <div
            key={index}
            className="flex gap-4 rounded-xl border border-zinc-800 bg-zinc-950 p-4"
          >
            <div
              className={`mt-1 h-3 w-3 rounded-full ${item.color}`}
            />

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-white">
                  {item.agent}
                </h3>

                <Badge variant="secondary">
                  {item.time}
                </Badge>
              </div>

              <p className="mt-2 text-sm text-zinc-400">
                {item.message}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}