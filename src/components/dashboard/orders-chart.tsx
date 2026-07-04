"use client";

import { motion } from "framer-motion";
import { ordersPerHourData } from "@/lib/mock-data";
import { TrendingUp } from "lucide-react";

export function OrdersChart() {
  const maxOrders = Math.max(...ordersPerHourData.map((d) => d.orders));

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Orders Per Hour</h3>
          <p className="text-sm text-muted-foreground">Today's order volume</p>
        </div>
        <div className="flex items-center gap-2 text-sm text-success">
          <TrendingUp className="w-4 h-4" />
          <span>+12% vs last week</span>
        </div>
      </div>

      <div className="flex items-end gap-2 h-40">
        {ordersPerHourData.map((data, index) => (
          <motion.div
            key={data.hour}
            initial={{ height: 0 }}
            animate={{ height: `${(data.orders / maxOrders) * 100}%` }}
            transition={{ duration: 0.5, delay: index * 0.03 }}
            className="flex-1 flex flex-col items-center gap-1 group relative"
          >
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-popover border border-border rounded-lg px-2 py-1 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {data.orders} orders
            </div>
            <div
              className="w-full rounded-t-md bg-primary/80 hover:bg-primary transition-colors cursor-pointer"
              style={{ height: "100%" }}
            />
            <span className="text-[10px] text-muted-foreground rotate-45 origin-left whitespace-nowrap mt-1">
              {data.hour}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Summary */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-border text-sm text-muted-foreground">
        <span>Total: {ordersPerHourData.reduce((s, d) => s + d.orders, 0)} orders</span>
        <span>Peak: {Math.max(...ordersPerHourData.map((d) => d.orders))} orders</span>
      </div>
    </div>
  );
}
