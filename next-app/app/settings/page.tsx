"use client";

import Link from "next/link";

import {
  Bot,
  Bell,
  Database,
  Shield,
  BrainCircuit,
  Save,
  ArrowLeft,
  Cpu,
  Server,
  CheckCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* Hero */}

      <section className="border-b border-zinc-800 bg-linear-to-r from-slate-900 via-slate-950 to-slate-900">

        <div className="mx-auto max-w-7xl px-8 py-10">

          <Link href="/">
            <Button
              variant="outline"
              className="mb-8 border-zinc-700 bg-zinc-900 hover:bg-zinc-800"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>

          <div className="flex items-center gap-5">

            <div className="rounded-2xl bg-blue-500/10 p-5">
              <BrainCircuit className="h-12 w-12 text-cyan-400" />
            </div>

            <div>
              <h1 className="text-4xl font-bold">
                AI Control Center
              </h1>

              <p className="mt-2 max-w-2xl text-zinc-400">
                Configure AI agents, integrations, security,
                workflow automation and platform preferences.
              </p>
            </div>

          </div>

        </div>

      </section>

      <div className="mx-auto max-w-7xl space-y-8 p-8">

        {/* Stats */}

        <div className="grid gap-6 md:grid-cols-4">

          <Card className="border-zinc-800 bg-zinc-900 p-6">

            <Bot className="mb-4 text-cyan-400" />

            <h2 className="text-3xl font-bold">3</h2>

            <p className="text-zinc-400">
              Active AI Agents
            </p>

          </Card>

          <Card className="border-zinc-800 bg-zinc-900 p-6">

            <Database className="mb-4 text-green-400" />

            <h2 className="text-3xl font-bold">
              Online
            </h2>

            <p className="text-zinc-400">
              Backend Status
            </p>

          </Card>

          <Card className="border-zinc-800 bg-zinc-900 p-6">

            <Cpu className="mb-4 text-purple-400" />

            <h2 className="text-3xl font-bold">
              GPT-5.5
            </h2>

            <p className="text-zinc-400">
              Active Model
            </p>

          </Card>

          <Card className="border-zinc-800 bg-zinc-900 p-6">

            <Shield className="mb-4 text-orange-400" />

            <h2 className="text-3xl font-bold">
              Secure
            </h2>

            <p className="text-zinc-400">
              Security Level
            </p>

          </Card>

        </div>

        {/* Main Grid */}

        <div className="grid gap-6 lg:grid-cols-2">

          {/* AI Agents */}

          <Card className="border-zinc-800 bg-zinc-900 transition-all hover:border-cyan-500">

            <CardHeader>

              <CardTitle className="flex items-center gap-3">

                <Bot className="text-cyan-400" />

                AI Agents

              </CardTitle>

            </CardHeader>

            <CardContent className="space-y-5">

              {[
                "Engineering Agent",
                "Finance Agent",
                "Marketing Agent",
              ].map((agent) => (
                <div
                  key={agent}
                  className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950 p-4"
                >
                  <span>{agent}</span>

                  <input
                    type="checkbox"
                    defaultChecked
                    className="h-5 w-5 accent-cyan-500"
                  />
                </div>
              ))}

            </CardContent>

          </Card>

          {/* Notifications */}

          <Card className="border-zinc-800 bg-zinc-900 transition-all hover:border-blue-500">

            <CardHeader>

              <CardTitle className="flex items-center gap-3">

                <Bell className="text-blue-400" />

                Notifications

              </CardTitle>

            </CardHeader>

            <CardContent className="space-y-5">

              {[
                ["Email Alerts", true],
                ["Slack Alerts", false],
                ["Desktop Notifications", true],
              ].map(([title, checked]) => (
                <div
                  key={String(title)}
                  className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950 p-4"
                >
                  <span>{title}</span>

                  <input
                    type="checkbox"
                    defaultChecked={checked as boolean}
                    className="h-5 w-5 accent-blue-500"
                  />
                </div>
              ))}

            </CardContent>

          </Card>

          {/* AI Configuration */}

          <Card className="border-zinc-800 bg-zinc-900 transition-all hover:border-purple-500">

            <CardHeader>

              <CardTitle className="flex items-center gap-3">

                <BrainCircuit className="text-purple-400" />

                AI Configuration

              </CardTitle>

            </CardHeader>

            <CardContent className="space-y-6">

              <div>

                <label className="mb-2 block text-sm text-zinc-400">
                  Active Model
                </label>

                <select className="w-full rounded-xl border border-zinc-700 bg-zinc-950 p-3">
                  <option>GPT-5.5</option>
                  <option>Claude</option>
                  <option>Gemini</option>
                </select>

              </div>

              <div>

                <div className="mb-3 flex justify-between">

                  <span className="text-sm text-zinc-400">
                    Creativity
                  </span>

                  <span className="text-cyan-400">
                    70%
                  </span>

                </div>

                <input
                  type="range"
                  min={0}
                  max={100}
                  defaultValue={70}
                  className="w-full accent-cyan-500"
                />

              </div>

            </CardContent>

          </Card>

          {/* Integrations */}

          <Card className="border-zinc-800 bg-zinc-900 transition-all hover:border-green-500">

            <CardHeader>

              <CardTitle className="flex items-center gap-3">

                <Server className="text-green-400" />

                Integrations

              </CardTitle>

            </CardHeader>

            <CardContent className="space-y-4">

              {[
                ["Convex", "Connected", "text-green-400"],
                ["GitHub", "Pending", "text-yellow-400"],
                ["Notion", "Connected", "text-green-400"],
                ["OpenAI", "Connected", "text-green-400"],
              ].map(([name, status, color]) => (
                <div
                  key={String(name)}
                  className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-950 p-4"
                >
                  <span>{name}</span>

                  <span className={color}>
                    {status}
                  </span>

                </div>
              ))}

            </CardContent>

          </Card>

          {/* Security */}

          <Card className="border-zinc-800 bg-zinc-900 lg:col-span-2 transition-all hover:border-orange-500">

            <CardHeader>

              <CardTitle className="flex items-center gap-3">

                <Shield className="text-orange-400" />

                Security & Workflow

              </CardTitle>

            </CardHeader>

            <CardContent className="grid gap-4 md:grid-cols-2">

              {[
                "Require CEO Approval",
                "Audit Every Action",
                "Allow Automatic Execution",
                "Enable AI Logging",
              ].map((setting, index) => (
                <div
                  key={setting}
                  className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-950 p-5"
                >
                  <span>{setting}</span>

                  <input
                    type="checkbox"
                    defaultChecked={index !== 2}
                    className="h-5 w-5 accent-orange-500"
                  />
                </div>
              ))}

            </CardContent>

          </Card>

        </div>

        {/* System Status */}

        <Card className="border-zinc-800 bg-linear-to-r from-zinc-900 to-slate-900">

          <CardHeader>

            <CardTitle className="flex items-center gap-3">

              <CheckCircle2 className="text-green-400" />

              System Status

            </CardTitle>

          </CardHeader>

          <CardContent>

            <div className="grid gap-4 md:grid-cols-4">

              {[
                "Convex",
                "OpenAI",
                "Database",
                "Workflow Engine",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-xl border border-green-500/20 bg-green-500/10 p-5 text-center"
                >
                  <div className="mb-2 text-green-400">
                    ●
                  </div>

                  <p className="font-semibold">
                    {item}
                  </p>

                  <p className="text-sm text-green-400">
                    Operational
                  </p>

                </div>
              ))}

            </div>

          </CardContent>

        </Card>

        <div className="flex justify-end">

          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-500"
          >
            <Save className="mr-2 h-5 w-5" />
            Save Changes
          </Button>

        </div>

      </div>

    </main>
  );
}