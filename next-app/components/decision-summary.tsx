import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function DecisionSummary() {
  return (
    <Card className="border-zinc-800 bg-zinc-900">
      <CardHeader>
        <CardTitle>Decision Summary</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">

        <div>
          <p className="text-zinc-400">Objective</p>
          <h3 className="font-semibold">
            Launch AI Feature
          </h3>
        </div>

        <div>
          <p className="text-zinc-400">Deadline</p>
          <h3>30 Days</h3>
        </div>

        <div>
          <p className="text-zinc-400">Requested By</p>
          <h3>CEO</h3>
        </div>

        <div>
          <p className="text-zinc-400">Business Goal</p>
          <h3>Increase productivity by 25%</h3>
        </div>

      </CardContent>
    </Card>
  );
}