"use client";

import { useState } from "react";
import { useMutation, useAction } from "convex/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
    ArrowLeft,
    Sparkles,
    BrainCircuit,
    Bot,
    Loader2,
    CheckCircle2,
} from "lucide-react";

import { api } from "@/convex/_generated/api";

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

export default function NewDecisionPage() {
    const router = useRouter();

    const createDecision = useMutation(api.decisions.createDecision);
    const startWorkflow = useMutation(api.orchestrator.startWorkflow);

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
            const decisionId = await createDecision({
                title,
                priority,
                createdBy: "CEO",
                deadline,
            });

            await startWorkflow({
                decisionId,
            });

            await generateAgentOpinions({
                decisionId,
                title,
            });

            router.push(`/negotiation/${decisionId}`);
        } catch (err) {
            console.error(err);
            alert("Something went wrong.");
        } finally {
            setLoading(false);
        }
    }

    return (
        <main className="min-h-screen bg-linear-to-br from-slate-950 via-slate-900 to-black">

            {/* Header */}

            <div className="mx-auto max-w-6xl px-8 pt-8">

                <Link href="/">
                    <Button
                        variant="ghost"
                        className="mb-6 text-zinc-300 hover:text-white"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Dashboard
                    </Button>
                </Link>

                <div className="mb-10 flex items-center justify-between">

                    <div>
                        <h1 className="text-5xl font-bold text-white">
                            New AI Decision
                        </h1>

                        <p className="mt-3 text-zinc-400">
                            Submit a strategic decision and let autonomous AI
                            departments debate before recommending the best
                            outcome.
                        </p>
                    </div>

                    <Sparkles className="h-12 w-12 animate-pulse text-blue-400" />
                </div>

                <div className="grid gap-8 lg:grid-cols-3">

                    {/* Left */}

                    <div className="lg:col-span-2">

                        <Card className="border-zinc-800 bg-zinc-900/70 backdrop-blur">

                            <CardHeader>
                                <CardTitle className="text-3xl text-white">
                                    Decision Details
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
                                            className="w-full rounded-xl border border-zinc-700 bg-zinc-950 p-4 text-white outline-none transition focus:border-blue-500"
                                            placeholder="Launch AI Customer Support"
                                            value={title}
                                            onChange={(e) =>
                                                setTitle(e.target.value)
                                            }
                                        />

                                    </div>

                                    <div className="grid gap-6 md:grid-cols-2">

                                        <div>

                                            <label className="mb-2 block text-sm text-zinc-400">
                                                Priority
                                            </label>

                                            <select
                                                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 p-4 text-white"
                                                value={priority}
                                                onChange={(e) =>
                                                    setPriority(e.target.value)
                                                }
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
                                                className="w-full rounded-xl border border-zinc-700 bg-zinc-950 p-4 text-white"
                                                value={deadline}
                                                onChange={(e) =>
                                                    setDeadline(e.target.value)
                                                }
                                            />

                                        </div>

                                    </div>

                                    <Button
                                        disabled={loading}
                                        className="h-12 w-full rounded-xl bg-blue-600 text-lg hover:bg-blue-500"
                                    >
                                        {loading ? (
                                            <>
                                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                                                AI Departments Working...
                                            </>
                                        ) : (
                                            <>
                                                <BrainCircuit className="mr-2 h-5 w-5" />
                                                Launch AI Workflow
                                            </>
                                        )}
                                    </Button>

                                </form>

                            </CardContent>

                        </Card>

                    </div>

                    {/* Right */}

                    <div>

                        <Card className="border-blue-500/20 bg-linear-to-br from-blue-950/40 to-zinc-900 backdrop-blur">

                            <CardHeader>

                                <CardTitle className="flex items-center gap-2 text-white">
                                    <Bot className="text-cyan-400" />
                                    AI Workflow
                                </CardTitle>

                            </CardHeader>

                            <CardContent className="space-y-5">

                                {[
                                    "Engineering Analysis",
                                    "Finance Evaluation",
                                    "Marketing Review",
                                    "3-Round AI Debate",
                                    "Opinion Revision",
                                    "CEO Recommendation",
                                ].map((step) => (
                                    <div
                                        key={step}
                                        className="flex items-center gap-3"
                                    >
                                        <CheckCircle2 className="h-5 w-5 text-green-400" />

                                        <span className="text-zinc-300">
                                            {step}
                                        </span>
                                    </div>
                                ))}

                                <div className="mt-8 rounded-xl border border-blue-500/20 bg-blue-500/10 p-4">

                                    <p className="text-sm leading-6 text-blue-200">
                                        Your AI board members will independently
                                        analyze the decision, debate each other,
                                        revise their opinions and generate an
                                        executive recommendation with confidence
                                        scoring.
                                    </p>

                                </div>

                            </CardContent>

                        </Card>

                    </div>

                </div>

            </div>

        </main>
    );
}