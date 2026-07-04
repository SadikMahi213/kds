"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Order } from "@/lib/types";
import { OrderTimer } from "@/components/kitchen/order-timer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDemoEngine } from "@/hooks/use-demo-engine";
import {
  CheckCheck,
  Users,
  Bike,
  ShoppingBag,
  ChefHat,
  Bell,
  AlertTriangle,
} from "lucide-react";

export function ExpoGrid() {
  const { orders, bumpOrder, recallOrder } = useDemoEngine();

  // Expo shows orders that are "ready" or "cooking" - staged for pickup
  const expoOrders = orders
    .filter((o) => o.status === "ready" || o.status === "cooking")
    .sort((a, b) => {
      // Ready orders first, then by priority
      if (a.status === "ready" && b.status !== "ready") return -1;
      if (a.status !== "ready" && b.status === "ready") return 1;
      const priorityOrder = { urgent: 0, high: 1, normal: 2, low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    });

  return (
    <div className="space-y-6">
      {/* Expo Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center">
            <Bell className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Expo Line</h2>
            <p className="text-sm text-muted-foreground">
              {expoOrders.length} orders staged for pickup
            </p>
          </div>
        </div>
      </div>

      {/* Order grid */}
      <AnimatePresence mode="popLayout">
        {expoOrders.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-24 text-center rounded-2xl border-2 border-dashed border-border"
          >
            <ChefHat className="w-16 h-16 text-muted-foreground/30 mb-4" />
            <h3 className="text-xl font-semibold text-muted-foreground/60 mb-2">
              No Orders Staged
            </h3>
            <p className="text-sm text-muted-foreground/40">
              Orders will appear here when they're ready for pickup
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {expoOrders.map((order) => (
              <ExpoOrderCard
                key={order.id}
                order={order}
                onBump={bumpOrder}
                onRecall={recallOrder}
              />
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

interface ExpoOrderCardProps {
  order: Order;
  onBump: (id: string) => void;
  onRecall: (id: string) => void;
}

function ExpoOrderCard({ order, onBump, onRecall }: ExpoOrderCardProps) {
  const typeIcons = {
    "dine-in": Users,
    takeout: ShoppingBag,
    delivery: Bike,
    pickup: ShoppingBag,
  };
  const TypeIcon = typeIcons[order.type];
  const isReady = order.status === "ready";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className={cn(
        "rounded-2xl border-2 overflow-hidden group transition-all duration-200",
        isReady
          ? "border-success/50 bg-success/5 shadow-lg shadow-success/10"
          : "border-border bg-card hover:border-warning/50"
      )}
    >
      <div
        className={cn(
          "px-4 py-3 flex items-center justify-between border-b",
          isReady ? "bg-success/10 border-success/20" : "bg-secondary/50 border-border"
        )}
      >
        <div className="flex items-center gap-3">
          <span className="text-2xl font-bold text-foreground tabular-nums">
            #{order.displayId}
          </span>
          <Badge variant="secondary" className="gap-1">
            <TypeIcon className="w-3 h-3" />
            {order.type === "dine-in" ? `Table ${order.tableNumber}` : order.type}
          </Badge>
        </div>
        <OrderTimer createdAt={order.createdAt} />
      </div>

      <div className="p-4">
        <p className="text-lg font-semibold text-foreground mb-3">{order.customerName}</p>

        <div className="space-y-1.5 mb-4">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-center gap-2">
              <span className="text-xs font-bold text-muted-foreground w-5 shrink-0 text-right">
                {item.quantity}x
              </span>
              <span className="text-sm text-foreground">{item.menuItem.name}</span>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <Button
            onClick={() => onBump(order.id)}
            size="lg"
            className={cn(
              "flex-1 gap-2 text-base h-12",
              isReady
                ? "bg-success hover:bg-success/80 text-white"
                : "bg-primary hover:bg-primary/80"
            )}
          >
            <CheckCheck className="w-5 h-5" />
            {isReady ? "Complete Order" : "Mark Ready"}
          </Button>
          <Button
            onClick={() => onRecall(order.id)}
            variant="outline"
            size="lg"
            className="h-12 px-4"
          >
            <AlertTriangle className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
