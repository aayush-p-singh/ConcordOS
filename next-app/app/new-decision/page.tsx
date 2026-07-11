"use client";

import { useState } from "react";
import { useMutation, useAction } from "convex/react";
import { useRouter } from "next/navigation";

import { api } from "@/convex/_generated/api";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function NewDecisionPage() {
  const router = useRouter();

  const createDecision = useMutation(api.decisions.createDecision);
  const startWorkflow = useMutation(api.orchestrator.startWorkflow);

  // AI Action
  const generateAgentOpinions = useAction(
    api.ai.generateAgentOpinions
  );

  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [deadline, setDeadline] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a decision title.");
      return;
    }

    if (!deadline) {
      alert("Please select a deadline.");
      return;
    }

    setLoading(true);

    try {
      // 1. Create Decision
      const decisionId = await createDecision({
        title,
        priority,
        createdBy: "CEO",
        deadline,
      });

      // 2. Start Workflow
      await startWorkflow({
        decisionId,
      });

      // 3. Generate AI Opinions
      await generateAgentOpinions({
        decisionId,
        title,
      });

      // 4. Open Negotiation Page
      router.push(`/negotiation/${decisionId}`);
    } catch (err) {
      console.error("Workflow Error:", err);
      alert("Something went wrong. Check the console.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-zinc-950 p-8">
      <Card className="mx-auto max-w-3xl border-zinc-800 bg-zinc-900">
        <CardHeader>
          <CardTitle className="text-3xl text-white">
            Create New Decision
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                Decision Title
              </label>

              <input
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 p-3 text-white outline-none focus:border-blue-500"
                placeholder="Launch AI Customer Support"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                Priority
              </label>

              <select
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 p-3 text-white focus:border-blue-500"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
                <option>Critical</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm text-zinc-400">
                Deadline
              </label>

              <input
                type="date"
                className="w-full rounded-lg border border-zinc-700 bg-zinc-950 p-3 text-white focus:border-blue-500"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                required
              />
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500"
            >
              {loading
                ? "Generating AI Analysis..."
                : "Create Decision"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}