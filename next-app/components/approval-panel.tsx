import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ApprovalPanel() {
  return (
    <Card className="border-zinc-800 bg-zinc-900">
      <CardHeader>
        <CardTitle>Human Approval</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">

        <p className="text-zinc-400">
          All departments have reached consensus.
        </p>

        <Button className="w-full bg-green-600 hover:bg-green-700">
          Approve
        </Button>

        <Button
          variant="secondary"
          className="w-full"
        >
          Modify
        </Button>

        <Button
          variant="destructive"
          className="w-full"
        >
          Reject
        </Button>

      </CardContent>
    </Card>
  );
}