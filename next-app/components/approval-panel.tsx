"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function ApprovalPanel() {
  const [status, setStatus] = useState("Waiting");

  return (
    <Card className="border-zinc-800 bg-zinc-900">
      <CardHeader>
        <CardTitle>Human Approval</CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">

        <div className="rounded-lg bg-zinc-800 p-3">
          Status:
          <span className="ml-2 font-bold text-blue-400">
            {status}
          </span>
        </div>

        <Button
          className="w-full"
          onClick={() => setStatus("Approved")}
        >
          Approve
        </Button>

        <Button
          variant="secondary"
          className="w-full"
          onClick={() => setStatus("Modified")}
        >
          Modify
        </Button>

        <Button
          variant="destructive"
          className="w-full"
          onClick={() => setStatus("Rejected")}
        >
          Reject
        </Button>

      </CardContent>
    </Card>
  );
}