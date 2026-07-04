"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { DemoControls } from "@/components/demo/demo-controls";
import { useDemoEngine } from "@/hooks/use-demo-engine";
import { OrderCard } from "@/components/kitchen/order-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  MonitorPlay,
  ChefHat,
  Timer,
  Zap,
  Users,
  Bike,
  ShoppingBag,
  Bell,
  AlertTriangle,
  CheckCheck,
  RefreshCw,
  UserCheck,
} from "lucide-react";

export default function DemoPage() {
  const { orders, stats, notifications, bumpOrder, recallOrder, assignChef, config, updateConfig, generateOrder } = useDemoEngine();
  const [viewMode, setViewMode] = useState<"live" | "compact">("live");

  const activeOrders = orders
    .filter((o) => o.status !== "completed")
    .slice(0, 12);

  const handleAssignChef = (id: string) => {
    assignChef(id, "Unassigned");
  };

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MonitorPlay className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">Demo Mode</h1>
              <p className="text-muted-foreground">
                Simulating restaurant activity · {config.speed}x speed
                {config.rushHour && " · Rush Hour"}
                {config.quietMode && " · Quiet Mode"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant={config.autoGenerate ? "default" : "secondary"} className="gap-1.5">
              <div className={cn(
                "w-1.5 h-1.5 rounded-full",
                config.autoGenerate ? "bg-success animate-pulse" : "bg-muted-foreground"
              )} />
              {config.autoGenerate ? "Live" : "Paused"}
            </Badge>
            <div className="flex rounded-lg border border-border">
              <button
                onClick={() => setViewMode("live")}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded-l-lg transition-colors",
                  viewMode === "live" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                Live View
              </button>
              <button
                onClick={() => setViewMode("compact")}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded-r-lg transition-colors",
                  viewMode === "compact" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                With Controls
              </button>
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { label: "Active Orders", value: stats.ordersInProgress, icon: ChefHat, color: "text-primary" },
            { label: "Completed", value: stats.completedOrders, icon: CheckCheck, color: "text-success" },
            { label: "Delayed", value: stats.delayedOrders, icon: AlertTriangle, color: "text-destructive" },
            { label: "Kitchen Load", value: `${stats.kitchenLoad}%`, icon: Zap, color: stats.kitchenLoad > 70 ? "text-destructive" : "text-success" },
            { label: "Revenue", value: `$${stats.revenueToday.toFixed(0)}`, icon: Timer, color: "text-primary" },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl bg-card border border-border p-3"
            >
              <div className="flex items-center justify-between mb-1">
                <stat.icon className={cn("w-4 h-4", stat.color)} />
              </div>
              <p className={cn("text-xl font-bold tabular-nums", stat.color)}>{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Orders Grid */}
          <div className={cn(viewMode === "compact" ? "lg:col-span-3" : "lg:col-span-4")}>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
              <AnimatePresence mode="popLayout">
                {activeOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    order={order}
                    onBump={bumpOrder}
                    onRecall={recallOrder}
                    onAssignChef={handleAssignChef}
                  />
                ))}
              </AnimatePresence>
            </div>

            {activeOrders.length === 0 && (
              <div className="flex flex-col items-center justify-center py-24 text-center rounded-2xl border-2 border-dashed border-border">
                <MonitorPlay className="w-16 h-16 text-muted-foreground/30 mb-4" />
                <h3 className="text-xl font-semibold text-muted-foreground/60 mb-2">
                  No Active Orders
                </h3>
                <p className="text-sm text-muted-foreground/40 mb-4">
                  Use the demo controls to generate orders, or enable auto-generation
                </p>
                <Button onClick={() => {}} variant="outline" className="gap-2">
                  <Zap className="w-4 h-4" />
                  Enable Auto-Generation
                </Button>
              </div>
            )}
          </div>

          {/* Demo Controls Sidebar */}
          {viewMode === "compact" && (
            <div className="lg:col-span-1">
              <DemoControls />
            </div>
          )}
        </div>

        {/* Bottom Controls when in live view */}
        {viewMode === "live" && (
          <div className="fixed bottom-6 right-6 left-[calc(72px+1.5rem)] z-20">
            <div className="bg-card border border-border rounded-2xl shadow-2xl p-4 backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Timer className="w-4 h-4" />
                    Orders updating in real-time
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Bell className="w-4 h-4" />
                    {notifications.filter((n) => !n.read).length} new
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant={config.autoGenerate ? "default" : "outline"}
                    size="sm"
                    onClick={() => updateConfig({ autoGenerate: !config.autoGenerate })}
                  >
                    {config.autoGenerate ? "Pause" : "Resume"}
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => generateOrder()}>
                    New Order
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
