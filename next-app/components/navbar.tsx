"use client";

import Link from "next/link";
import { Bell, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-zinc-800 bg-zinc-950 px-6">

      {/* Left */}
      <div className="flex items-center gap-4">

        <h2 className="text-xl font-semibold text-white">
          Enterprise Dashboard
        </h2>

        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-3 text-zinc-500"
          />

          <input
            placeholder="Search decisions..."
            className="w-72 rounded-lg border border-zinc-700 bg-zinc-900 py-2 pl-10 pr-4 text-white outline-none focus:border-blue-500"
          />
        </div>

      </div>

      {/* Right */}
      <div className="flex items-center gap-4">

        <Link href="/new-decision">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Decision
          </Button>
        </Link>

        <button className="rounded-lg bg-zinc-900 p-2 hover:bg-zinc-800">
          <Bell />
        </button>

        <div className="flex items-center gap-2 rounded-lg bg-zinc-900 px-4 py-2">
          <div className="h-3 w-3 rounded-full bg-green-500"></div>

          <span className="text-sm">
            CEO
          </span>
        </div>

      </div>

    </header>
  );
}