"use client";

import {
  Bot,
  Bell,
  Database,
  Shield,
  BrainCircuit,
  Save,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-zinc-950 p-8 text-white">

      <h1 className="text-4xl font-bold mb-8">
        Settings
      </h1>

      <div className="grid gap-6 lg:grid-cols-2">

        {/* AI Agents */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot size={22} />
              AI Agents
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">

            <div className="flex justify-between items-center">
              <span>Engineering Agent</span>
              <input type="checkbox" defaultChecked />
            </div>

            <div className="flex justify-between items-center">
              <span>Finance Agent</span>
              <input type="checkbox" defaultChecked />
            </div>

            <div className="flex justify-between items-center">
              <span>Marketing Agent</span>
              <input type="checkbox" defaultChecked />
            </div>

          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell size={22} />
              Notifications
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">

            <div className="flex justify-between">
              <span>Email Alerts</span>
              <input type="checkbox" defaultChecked />
            </div>

            <div className="flex justify-between">
              <span>Slack Alerts</span>
              <input type="checkbox" />
            </div>

            <div className="flex justify-between">
              <span>Desktop Notifications</span>
              <input type="checkbox" defaultChecked />
            </div>

          </CardContent>
        </Card>

        {/* AI Model */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BrainCircuit size={22} />
              AI Configuration
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">

            <label className="block text-sm text-zinc-400">
              Active Model
            </label>

            <select className="w-full rounded-lg bg-zinc-800 p-3 border border-zinc-700">
              <option>GPT-5.5</option>
              <option>Claude</option>
              <option>Gemini</option>
            </select>

            <label className="block text-sm text-zinc-400">
              Creativity
            </label>

            <input
              type="range"
              min={0}
              max={100}
              defaultValue={70}
              className="w-full"
            />

          </CardContent>
        </Card>

        {/* Database */}
        <Card className="bg-zinc-900 border-zinc-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database size={22} />
              Backend
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">

            <div className="flex justify-between">
              <span>Convex</span>
              <span className="text-green-400">
                Connected
              </span>
            </div>

            <div className="flex justify-between">
              <span>GitHub</span>
              <span className="text-yellow-400">
                Pending
              </span>
            </div>

            <div className="flex justify-between">
              <span>Notion</span>
              <span className="text-green-400">
                Connected
              </span>
            </div>

          </CardContent>
        </Card>

        {/* Security */}
        <Card className="bg-zinc-900 border-zinc-800 lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield size={22} />
              Security & Human Approval
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">

            <div className="flex justify-between">
              <span>Require CEO Approval</span>
              <input type="checkbox" defaultChecked />
            </div>

            <div className="flex justify-between">
              <span>Audit Every Action</span>
              <input type="checkbox" defaultChecked />
            </div>

            <div className="flex justify-between">
              <span>Allow Automatic Execution</span>
              <input type="checkbox" />
            </div>

          </CardContent>
        </Card>

      </div>

      <div className="mt-8 flex justify-end">

        <Button className="gap-2">
          <Save size={18} />
          Save Changes
        </Button>

      </div>

    </main>
  );
}