"use client";

import { motion } from "framer-motion";
import { Gauge } from "lucide-react";
import { cn } from "@/lib/utils";

interface KitchenLoadProps {
  load: number;
  ordersInProgress: number;
}

export function KitchenLoad({ load, ordersInProgress }: KitchenLoadProps) {
  const getColor = (value: number) => {
    if (value < 50) return "text-success";
    if (value < 80) return "text-warning";
    return "text-destructive";
  };

  const getBarColor = (value: number) => {
    if (value < 50) return "bg-success";
    if (value < 80) return "bg-warning";
    return "bg-destructive";
  };

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Kitchen Load</h3>
        <Gauge className={cn("w-5 h-5", getColor(load))} />
      </div>

      <div className="relative h-4 rounded-full bg-secondary overflow-hidden mb-3">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${load}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full rounded-full ${getBarColor(load)}`}
        />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <motion.span
            key={load}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn("text-3xl font-bold", getColor(load))}
          >
            {load}%
          </motion.span>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">{ordersInProgress} active orders</p>
          <p className="text-xs text-muted-foreground">
            {load < 50 ? "Low capacity" : load < 80 ? "Moderate load" : "High volume"}
          </p>
        </div>
      </div>
    </div>
  );
}


