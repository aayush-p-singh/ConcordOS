"use client";

import { motion } from "framer-motion";
import {
  CheckCircle2,
  Loader2,
  Circle,
} from "lucide-react";

type Step = {
  title: string;
  description: string;
  status: "pending" | "running" | "completed";
};

interface Props {
  steps: Step[];
}

export default function WorkflowProgress({
  steps,
}: Props) {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6 shadow-xl">
      <h2 className="mb-6 text-2xl font-bold text-white">
        AI Workflow
      </h2>

      <div className="space-y-6">
        {steps.map((step, index) => (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            transition={{
              delay: index * 0.15,
            }}
            className="flex gap-4"
          >
            <div className="mt-1">
              {step.status === "completed" && (
                <CheckCircle2
                  className="text-green-500"
                  size={22}
                />
              )}

              {step.status === "running" && (
                <Loader2
                  className="animate-spin text-blue-400"
                  size={22}
                />
              )}

              {step.status === "pending" && (
                <Circle
                  className="text-zinc-600"
                  size={22}
                />
              )}
            </div>

            <div className="flex-1">
              <p className="font-semibold text-white">
                {step.title}
              </p>

              <p className="text-sm text-zinc-400">
                {step.description}
              </p>

              {step.status === "running" && (
                <motion.div
                  className="mt-3 h-2 overflow-hidden rounded-full bg-zinc-800"
                >
                  <motion.div
                    className="h-full bg-blue-500"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  />
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}