"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { useDemoEngine } from "@/hooks/use-demo-engine";
import { OrderTimer } from "@/components/kitchen/order-timer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  ListOrdered,
  Search,
  CheckCheck,
  AlertTriangle,
  Clock,
  Users,
  Bike,
  ShoppingBag,
  ArrowUpDown,
  Filter,
} from "lucide-react";

type SortKey = "time" | "priority" | "displayId";

export default function QueuePage() {
  const { orders, bumpOrder, recallOrder } = useDemoEngine();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortKey>("time");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const filteredOrders = orders
    .filter((o) => o.status !== "completed")
    .filter((o) => {
      if (filterStatus !== "all" && o.status !== filterStatus) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          o.customerName.toLowerCase().includes(q) ||
          o.displayId.toString().includes(q) ||
          o.serverName.toLowerCase().includes(q)
        );
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "priority": {
          const order = { urgent: 0, high: 1, normal: 2, low: 3 };
          return order[a.priority] - order[b.priority];
        }
        case "displayId":
          return b.displayId - a.displayId;
        case "time":
        default:
          return a.createdAt - b.createdAt;
      }
    });

  const statuses = [
    { value: "all", label: "All", count: orders.filter((o) => o.status !== "completed").length },
    { value: "pending", label: "Pending", count: orders.filter((o) => o.status === "pending").length },
    { value: "preparing", label: "Preparing", count: orders.filter((o) => o.status === "preparing").length },
    { value: "cooking", label: "Cooking", count: orders.filter((o) => o.status === "cooking").length },
    { value: "ready", label: "Ready", count: orders.filter((o) => o.status === "ready").length },
    { value: "delayed", label: "Delayed", count: orders.filter((o) => o.status === "delayed").length },
  ];

  const typeIcons = {
    "dine-in": Users,
    takeout: ShoppingBag,
    delivery: Bike,
    pickup: ShoppingBag,
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <ListOrdered className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Order Queue</h1>
            <p className="text-muted-foreground">Manage and monitor all active orders</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by order #, customer, or server..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-10 rounded-xl bg-secondary border-0 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
          </div>

          <div className="flex gap-2">
            {(["time", "priority", "displayId"] as SortKey[]).map((key) => (
              <Button
                key={key}
                variant={sortBy === key ? "default" : "outline"}
                size="sm"
                onClick={() => setSortBy(key)}
              >
                <ArrowUpDown className="w-3.5 h-3.5 mr-1.5" />
                {key === "time" ? "Time" : key === "priority" ? "Priority" : "Order #"}
              </Button>
            ))}
          </div>
        </div>

        {/* Status Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-1">
          {statuses.map((status) => (
            <button
              key={status.value}
              onClick={() => setFilterStatus(status.value)}
              className={cn(
                "px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all",
                filterStatus === status.value
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              {status.label}
              <span className="ml-2 text-xs opacity-70">({status.count})</span>
            </button>
          ))}
        </div>

        {/* Queue Table */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Order</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Customer</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Type</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Items</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Timer</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredOrders.map((order, index) => {
                  const TypeIcon = typeIcons[order.type];
                  const itemCount = order.items.reduce((s, i) => s + i.quantity, 0);
                  const priorityColors: Record<string, string> = {
                    low: "text-slate-400",
                    normal: "text-primary",
                    high: "text-orange-400",
                    urgent: "text-red-400",
                  };

                  return (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.02 }}
                      className={cn(
                        "hover:bg-accent/30 transition-colors",
                        order.status === "delayed" && "bg-destructive/5"
                      )}
                    >
                      <td className="px-4 py-3">
                        <span className="text-sm font-bold tabular-nums">#{order.displayId}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm font-medium">{order.customerName}</span>
                        <span className="text-xs text-muted-foreground ml-2">{order.serverName}</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <TypeIcon className="w-3.5 h-3.5" />
                          {order.tableNumber ? `T${order.tableNumber}` : order.type}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm">{itemCount} items</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="secondary"
                            className={cn(
                              "text-xs font-medium",
                              order.status === "delayed" && "bg-destructive/20 text-destructive",
                              order.status === "ready" && "bg-success/20 text-success",
                              order.status === "cooking" && "bg-warning/20 text-warning"
                            )}
                          >
                            {order.status === "delayed" && <AlertTriangle className="w-3 h-3 mr-1" />}
                            {order.status}
                          </Badge>
                          <span className={cn("text-xs font-semibold", priorityColors[order.priority])}>
                            {order.priority}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <OrderTimer createdAt={order.createdAt} />
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => bumpOrder(order.id)}
                          >
                            <CheckCheck className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => recallOrder(order.id)}
                          >
                            <AlertTriangle className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="py-16 text-center">
              <ListOrdered className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground">No orders match your filters</p>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
