"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Bot,
  ClipboardList,
  Settings,
  BrainCircuit,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

const items = [
  {
    title: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
  },
  {
    title: "Agents",
    href: "/agents",
    icon: Bot,
  },
  {
    title: "Decisions",
    href: "/decisions",
    icon: ClipboardList,
  },
  {
    title: "CEO Approval",
    href: "/approval",
    icon: ShieldCheck,
  },
  {
    title: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState(false);

  return (
    <aside
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className={`relative flex h-screen flex-col border-r border-zinc-800 bg-linear-to-b from-zinc-950 via-slate-950 to-black transition-all duration-300 ease-in-out ${
        expanded ? "w-72" : "w-24"
      }`}
    >
      {/* Logo */}

      <div className="border-b border-zinc-800 p-6">
        <div
          className={`flex items-center ${
            expanded ? "gap-3" : "justify-center"
          }`}
        >
          <div className="rounded-xl bg-cyan-500/10 p-2">
            <BrainCircuit className="h-8 w-8 text-cyan-400" />
          </div>

          <div
            className={`overflow-hidden transition-all duration-300 ${
              expanded
                ? "max-w-xs opacity-100"
                : "max-w-0 opacity-0"
            }`}
          >
            <h1 className="whitespace-nowrap text-2xl font-bold text-white">
              ConcordOS
            </h1>

            <p className="whitespace-nowrap text-xs text-zinc-500">
              AI Executive Operating System
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-2 p-4">
        {items.map((item) => {
          const Icon = item.icon;

          const active =
            pathname === item.href ||
            (item.href !== "/" &&
              pathname.startsWith(item.href));

          return (
            <Link
              key={item.title}
              href={item.href}
              className={`group flex items-center rounded-xl px-4 py-3 transition-all duration-300 ${
                active
                  ? "bg-linear-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-500/20"
                  : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
              } ${expanded ? "gap-4" : "justify-center"}`}
            >
              <Icon
                size={22}
                className="shrink-0 transition-all duration-300 group-hover:scale-110"
              />

              <span
                className={`overflow-hidden whitespace-nowrap font-medium transition-all duration-300 ${
                  expanded
                    ? "max-w-xs opacity-100"
                    : "max-w-0 opacity-0"
                }`}
              >
                {item.title}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}

      <div className="p-4">
        <div
          className={`overflow-hidden rounded-xl border border-cyan-500/20 bg-cyan-500/10 transition-all duration-300 ${
            expanded
              ? "max-h-48 p-4 opacity-100"
              : "max-h-0 border-0 p-0 opacity-0"
          }`}
        >
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-cyan-400" />

            <p className="font-semibold text-cyan-400">
              AI Status
            </p>
          </div>

          <div className="mt-4 flex items-center gap-2">
            <div className="h-2.5 w-2.5 animate-pulse rounded-full bg-green-400" />

            <span className="text-sm text-zinc-300">
              All Systems Operational
            </span>
          </div>

          <div className="mt-3 rounded-lg bg-zinc-900/50 p-3">
            <div className="flex justify-between text-xs">
              <span className="text-zinc-400">
                Workflow
              </span>

              <span className="text-green-400">
                Active
              </span>
            </div>

            <div className="mt-2 h-2 overflow-hidden rounded-full bg-zinc-800">
              <div className="h-full w-full animate-pulse rounded-full bg-linear-to-r from-cyan-500 to-blue-500" />
            </div>
          </div>

          <div className="mt-4 border-t border-zinc-800 pt-3">
            <p className="text-center text-xs text-zinc-500">
              ConcordOS v1.0 • Hackathon
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}