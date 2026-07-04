"use client";

import { motion } from "framer-motion";
import { Order } from "@/lib/types";
import { OrderTimer } from "@/components/kitchen/order-timer";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Clock, Users, Bike, ShoppingBag } from "lucide-react";

interface RecentOrdersProps {
  orders: Order[];
}

const typeIcons = {
  "dine-in": Users,
  takeout: ShoppingBag,
  delivery: Bike,
  pickup: ShoppingBag,
};

export function RecentOrders({ orders }: RecentOrdersProps) {
  const recentOrders = orders.slice(0, 8);

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Recent Orders</h3>
        <span className="text-xs text-muted-foreground">Live updates</span>
      </div>

      <div className="space-y-2">
        {recentOrders.map((order, index) => {
          const Icon = typeIcons[order.type];
          const itemCount = order.items.reduce((s, i) => s + i.quantity, 0);

          return (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.03 }}
              className={cn(
                "flex items-center gap-3 p-3 rounded-xl hover:bg-accent/50 transition-colors",
                order.status === "delayed" && "bg-destructive/5"
              )}
            >
              <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                <span className="text-sm font-bold tabular-nums">#{order.displayId}</span>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-sm font-medium text-foreground truncate">
                    {order.customerName}
                  </span>
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0 h-4">
                    <Icon className="w-3 h-3" />
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{itemCount} items</span>
                  {order.tableNumber && <span>Table {order.tableNumber}</span>}
                </div>
              </div>

              <div className="text-right shrink-0">
                <OrderTimer createdAt={order.createdAt} className="justify-end" />
                <p className="text-[10px] text-muted-foreground capitalize mt-0.5">
                  {order.status}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
