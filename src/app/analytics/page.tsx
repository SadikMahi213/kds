"use client";

import { AppShell } from "@/components/layout/app-shell";
import { motion } from "framer-motion";
import { useDemoEngine } from "@/hooks/use-demo-engine";
import { ordersPerHourData, topItemsData, chefPerformanceData } from "@/lib/mock-data";
import { stationColors, stationLabels } from "@/lib/mock-data";
import { KitchenStation } from "@/lib/types";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Clock,
  Users,
  ChefHat,
  DollarSign,
  Pizza,
} from "lucide-react";

const chartColors = ["#3b82f6", "#22c55e", "#eab308", "#ef4444", "#ec4899", "#8b5cf6", "#14b8a6"];

export default function AnalyticsPage() {
  const { stats, orders } = useDemoEngine();
  const maxOrders = Math.max(...ordersPerHourData.map((d) => d.orders));
  const maxItemCount = Math.max(...topItemsData.map((d) => d.count));

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <BarChart3 className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Kitchen Analytics</h1>
            <p className="text-muted-foreground">Performance data and insights</p>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Total Revenue", value: `$${stats.revenueToday.toLocaleString()}`, icon: DollarSign, change: "+12.5%", trend: "up" },
            { label: "Avg Ticket Time", value: `${Math.floor(stats.averageTicketTime / 60)}m ${stats.averageTicketTime % 60}s`, icon: Clock, change: "-8.3%", trend: "down" },
            { label: "Orders Today", value: stats.totalOrdersToday.toString(), icon: TrendingUp, change: "+15.2%", trend: "up" },
            { label: "Completion Rate", value: `${Math.round((stats.completedOrders / Math.max(stats.totalOrdersToday, 1)) * 100)}%`, icon: ChefHat, change: "+3.1%", trend: "up" },
          ].map((card, index) => (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="rounded-2xl border border-border bg-card p-4"
            >
              <div className="flex items-start justify-between mb-2">
                <card.icon className="w-5 h-5 text-primary" />
                <span className={`text-xs font-medium flex items-center gap-1 ${
                  card.trend === "up" ? "text-success" : "text-destructive"
                }`}>
                  {card.trend === "up" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {card.change}
                </span>
              </div>
              <p className="text-2xl font-bold text-foreground tabular-nums">{card.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{card.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Orders Per Hour */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-6">Orders Per Hour</h3>
            <div className="flex items-end gap-2 h-48">
              {ordersPerHourData.map((data, index) => (
                <motion.div
                  key={data.hour}
                  initial={{ height: 0 }}
                  animate={{ height: `${(data.orders / maxOrders) * 100}%` }}
                  transition={{ duration: 0.5, delay: index * 0.03 }}
                  className="flex-1 flex flex-col items-center gap-1 group relative"
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-popover border border-border rounded-lg px-2 py-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    {data.orders} orders
                  </div>
                  <div
                    className="w-full rounded-t-md transition-all duration-200 cursor-pointer hover:opacity-80"
                    style={{
                      height: "100%",
                      background: `linear-gradient(180deg, ${chartColors[index % chartColors.length]} 0%, ${chartColors[index % chartColors.length]}88 100%)`,
                    }}
                  />
                  <span className="text-[10px] text-muted-foreground mt-1">{data.hour}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Top Items */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Most Ordered Items</h3>
            <div className="space-y-3">
              {topItemsData.slice(0, 6).map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-center gap-3"
                >
                  <span className="text-xs font-bold text-muted-foreground w-5">{index + 1}</span>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-foreground">{item.name}</span>
                      <span className="text-sm text-muted-foreground">{item.count}</span>
                    </div>
                    <div className="h-2 rounded-full bg-secondary overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(item.count / maxItemCount) * 100}%` }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: stationColors[item.station] }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Chef Performance */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Chef Performance</h3>
            <div className="space-y-4">
              {chefPerformanceData.map((chef, index) => (
                <motion.div
                  key={chef.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-center gap-4 p-3 rounded-xl bg-secondary/50"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-sm font-bold text-white">
                    {chef.name.split(" ")[1]?.[0] || chef.name[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-foreground">{chef.name}</span>
                      <span className="text-xs text-muted-foreground">{chef.ordersCompleted} orders</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{stationLabels[chef.station]}</span>
                      <span>Avg: {Math.floor(chef.avgTime / 60)}m</span>
                      <span className="flex items-center gap-1">
                        <span className="text-yellow-500">{Array.from({ length: Math.round(chef.rating) }).fill("★").join("")}</span>
                        {chef.rating}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Peak Hours Analysis */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Peak Hours Analysis</h3>
            <div className="grid grid-cols-7 gap-2">
              {ordersPerHourData.map((data, index) => {
                const intensity = data.orders / maxOrders;
                return (
                  <div key={data.hour} className="flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-lg transition-all duration-200"
                      style={{
                        height: `${Math.max(intensity * 80, 16)}px`,
                        backgroundColor: intensity > 0.7 ? "#ef4444" : intensity > 0.4 ? "#eab308" : "#22c55e",
                        opacity: 0.7 + intensity * 0.3,
                      }}
                    />
                    <span className="text-[10px] text-muted-foreground">{data.hour.replace(" ", "")}</span>
                    <span className="text-[10px] font-bold text-foreground">{data.orders}</span>
                  </div>
                );
              })}
            </div>
            <div className="flex items-center justify-center gap-4 mt-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-sm bg-success" /> Low
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-sm bg-warning" /> Medium
              </div>
              <div className="flex items-center gap-1">
                <div className="w-3 h-3 rounded-sm bg-destructive" /> Peak
              </div>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
