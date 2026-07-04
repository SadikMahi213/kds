"use client";

import { TrendingUp, TrendingDown, Minus } from "lucide-react";

const metrics = [
  { label: "Order Accuracy", value: "98.5%", trend: "up", change: "+2.1%" },
  { label: "Avg Prep Time", value: "7m 12s", trend: "down", change: "-45s" },
  { label: "Peak Throughput", value: "28/hr", trend: "up", change: "+4/hr" },
  { label: "Avg Customer Wait", value: "12m", trend: "down", change: "-2m" },
  { label: "Kitchen Efficiency", value: "92%", trend: "up", change: "+5%" },
  { label: "Staff Utilization", value: "78%", trend: "down", change: "-3%" },
];

export function PerformanceMetrics() {
  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Performance Metrics</h3>
      <div className="grid grid-cols-2 gap-4">
        {metrics.map((metric) => (
          <div
            key={metric.label}
            className="p-3 rounded-xl bg-secondary/50 hover:bg-accent/50 transition-colors"
          >
            <p className="text-xs text-muted-foreground mb-1">{metric.label}</p>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-foreground">{metric.value}</span>
              <div className="flex items-center gap-1">
                {metric.trend === "up" ? (
                  <TrendingUp className="w-3.5 h-3.5 text-success" />
                ) : metric.trend === "down" ? (
                  <TrendingDown className="w-3.5 h-3.5 text-destructive" />
                ) : (
                  <Minus className="w-3.5 h-3.5 text-muted-foreground" />
                )}
                <span
                  className={`text-xs font-medium ${
                    metric.trend === "up" ? "text-success" :
                    metric.trend === "down" ? "text-destructive" : "text-muted-foreground"
                  }`}
                >
                  {metric.change}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
