"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { useDemoEngine } from "@/hooks/use-demo-engine";
import { OrderTimer } from "@/components/kitchen/order-timer";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  CheckCheck,
  Search,
  Clock,
  Users,
  Bike,
  ShoppingBag,
  RotateCcw,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CompletedPage() {
  const { orders, recallOrder } = useDemoEngine();
  const [search, setSearch] = useState("");

  const completedOrders = orders
    .filter((o) => o.status === "completed")
    .filter((o) => {
      if (!search) return true;
      const q = search.toLowerCase();
      return (
        o.customerName.toLowerCase().includes(q) ||
        o.displayId.toString().includes(q)
      );
    })
    .sort((a, b) => (b.completedAt || 0) - (a.completedAt || 0));

  const typeIcons = {
    "dine-in": Users,
    takeout: ShoppingBag,
    delivery: Bike,
    pickup: ShoppingBag,
  };

  const getCompletionTime = (order: typeof completedOrders[0]) => {
    if (!order.completedAt) return "";
    const elapsed = order.completedAt - order.createdAt;
    const mins = Math.floor(elapsed / 60000);
    const secs = Math.floor((elapsed % 60000) / 1000);
    return `${mins}m ${secs}s`;
  };

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <CheckCheck className="w-8 h-8 text-success" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">Completed Orders</h1>
              <p className="text-muted-foreground">{completedOrders.length} orders completed today</p>
            </div>
          </div>

          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search completed orders..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="h-10 rounded-xl bg-secondary border-0 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 w-64"
            />
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Order</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Customer</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Type</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Items</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total Time</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Completed</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {completedOrders.map((order, index) => {
                  const TypeIcon = typeIcons[order.type];
                  const itemCount = order.items.reduce((s, i) => s + i.quantity, 0);

                  return (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.2, delay: index * 0.02 }}
                      className="hover:bg-accent/30 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <span className="text-sm font-bold tabular-nums text-muted-foreground">
                          #{order.displayId}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div>
                          <span className="text-sm font-medium">{order.customerName}</span>
                          <span className="text-xs text-muted-foreground ml-2">{order.serverName}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <TypeIcon className="w-3.5 h-3.5" />
                          {order.tableNumber ? `T${order.tableNumber}` : order.type}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-sm text-muted-foreground">{itemCount} items</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Clock className="w-3.5 h-3.5" />
                          {getCompletionTime(order)}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs text-muted-foreground">
                          {order.completedAt
                            ? new Date(order.completedAt).toLocaleTimeString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : ""}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => recallOrder(order.id)}
                        >
                          <RotateCcw className="w-4 h-4 mr-1" />
                          Recall
                        </Button>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {completedOrders.length === 0 && (
            <div className="py-16 text-center">
              <CheckCheck className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
              <p className="text-muted-foreground">No completed orders yet</p>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
