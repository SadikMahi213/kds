"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { KitchenGrid } from "@/components/kitchen/kitchen-grid";
import { useDemoEngine } from "@/hooks/use-demo-engine";
import { motion } from "framer-motion";
import { stationLabels, stationColors } from "@/lib/mock-data";
import { KitchenStation } from "@/lib/types";
import { cn } from "@/lib/utils";
import {
  ChefHat,
  Grid3X3,
  LayoutList,
  Timer,
  Users,
  AlertTriangle,
} from "lucide-react";

const allStations: KitchenStation[] = ["grill", "fryer", "pizza", "saute", "salad", "drinks", "dessert"];

export default function KitchenPage() {
  const { orders, stats } = useDemoEngine();
  const [viewMode, setViewMode] = useState<"grid" | "compact">("grid");
  const [selectedStation, setSelectedStation] = useState<KitchenStation | "all">("all");

  const activeOrders = orders.filter((o) => o.status !== "completed").length;
  const delayedOrders = orders.filter((o) => o.status === "delayed").length;

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-3">
              <ChefHat className="w-8 h-8 text-primary" />
              <div>
                <h1 className="text-3xl font-bold text-foreground">Kitchen Display</h1>
                <p className="text-muted-foreground">
                  {activeOrders} active orders · {delayedOrders} delayed
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Station Filter */}
            <div className="flex gap-1 overflow-x-auto pb-1">
              <button
                onClick={() => setSelectedStation("all")}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap",
                  selectedStation === "all"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted-foreground hover:text-foreground"
                )}
              >
                All Stations
              </button>
              {allStations.map((station) => (
                <button
                  key={station}
                  onClick={() => setSelectedStation(station)}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap",
                    selectedStation === station
                      ? "text-white"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  )}
                  style={
                    selectedStation === station
                      ? { backgroundColor: stationColors[station] }
                      : undefined
                  }
                >
                  {stationLabels[station].split(" ")[0]}
                </button>
              ))}
            </div>

            {/* View toggle */}
            <div className="flex rounded-lg border border-border">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-2 rounded-l-lg transition-colors",
                  viewMode === "grid" ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("compact")}
                className={cn(
                  "p-2 rounded-r-lg transition-colors",
                  viewMode === "compact" ? "bg-accent text-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                <LayoutList className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-success" />
            <span className="text-muted-foreground">
              {orders.filter((o) => o.status === "ready").length} ready
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="text-muted-foreground">
              {orders.filter((o) => o.status === "preparing" || o.status === "cooking").length} in progress
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-destructive" />
            <span className="text-muted-foreground">{delayedOrders} delayed</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted-foreground">
            <Timer className="w-3.5 h-3.5" />
            <span>Avg: {Math.floor(stats.averagePrepTime / 60)}m {stats.averagePrepTime % 60}s</span>
          </div>
        </div>

        {/* Kitchen Grid */}
        <div className={cn(viewMode === "compact" ? "max-w-4xl mx-auto" : "")}>
          <KitchenGrid />
        </div>
      </div>
    </AppShell>
  );
}
