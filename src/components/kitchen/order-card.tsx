"use client";

import { motion } from "framer-motion";
import { Order } from "@/lib/types";
import { OrderTimer } from "./order-timer";
import { cn } from "@/lib/utils";
import {
  ChefHat,
  Clock,
  Users,
  Bike,
  ShoppingBag,
  AlertTriangle,
  UtensilsCrossed,
  CheckCheck,
  RefreshCw,
  UserCheck,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface OrderCardProps {
  order: Order;
  onBump: (id: string) => void;
  onRecall: (id: string) => void;
  onAssignChef: (id: string) => void;
}

const statusColors: Record<string, string> = {
  pending: "border-l-blue-500",
  preparing: "border-l-yellow-500",
  cooking: "border-l-orange-500",
  ready: "border-l-green-500",
  completed: "border-l-gray-500 opacity-60",
  delayed: "border-l-red-500",
};

const priorityColors: Record<string, string> = {
  low: "bg-slate-500/20 text-slate-400",
  normal: "bg-primary/10 text-primary",
  high: "bg-orange-500/20 text-orange-400",
  urgent: "bg-red-500/20 text-red-400 animate-pulse",
};

const orderTypeIcons = {
  "dine-in": Users,
  takeout: ShoppingBag,
  delivery: Bike,
  pickup: ShoppingBag,
};

const orderTypeLabels = {
  "dine-in": "Dine-in",
  takeout: "Takeout",
  delivery: "Delivery",
  pickup: "Pickup",
};

export function OrderCard({ order, onBump, onRecall, onAssignChef }: OrderCardProps) {
  const TypeIcon = orderTypeIcons[order.type];
  const isDelayed = order.status === "delayed";
  const isCompleted = order.status === "completed";
  const isReady = order.status === "ready";

  const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);
  const uniqueItems = order.items.length;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.15 } }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={cn(
        "relative rounded-2xl border border-border bg-card overflow-hidden group",
        "hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5",
        "transition-all duration-200",
        `border-l-4 ${isDelayed ? 'border-l-red-500' : statusColors[order.status]}`,
        isCompleted && "opacity-50"
      )}
    >
      {/* Delay warning banner */}
      {isDelayed && (
        <div className="absolute top-0 left-0 right-0 bg-destructive/20 backdrop-blur-sm px-4 py-1.5 flex items-center gap-2">
          <AlertTriangle className="w-3.5 h-3.5 text-destructive" />
          <span className="text-xs font-semibold text-destructive">DELAYED — Priority escalated</span>
        </div>
      )}

      <div className={cn("p-4", isDelayed && "pt-8")}>
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="text-2xl font-bold text-foreground tabular-nums">
              #{order.displayId}
            </div>
            <Badge
              variant="secondary"
              className={cn(
                "text-xs font-semibold border-0",
                priorityColors[order.priority]
              )}
            >
              {order.priority.toUpperCase()}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <OrderTimer createdAt={order.createdAt} />
          </div>
        </div>

        {/* Customer & Order Info */}
        <div className="flex items-center gap-3 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1.5">
            <TypeIcon className="w-3.5 h-3.5" />
            <span>{orderTypeLabels[order.type]}</span>
          </div>
          {order.tableNumber && (
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5" />
              <span>Table {order.tableNumber}</span>
            </div>
          )}
          <div className="flex items-center gap-1.5">
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>{order.serverName}</span>
          </div>
        </div>

        <p className="text-base font-semibold text-foreground mb-3">
          {order.customerName}
        </p>

        {/* Items */}
        <div className="space-y-1.5 mb-3">
          {order.items.map((item) => (
            <div key={item.id} className="flex items-start gap-2">
              <span className="text-xs font-bold text-muted-foreground w-5 shrink-0 text-right">
                {item.quantity}x
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground">
                  {item.menuItem.name}
                </p>
                {item.modifiers.length > 0 && (
                  <p className="text-xs text-muted-foreground">
                    {item.modifiers.join(", ")}
                  </p>
                )}
                {item.specialInstructions && (
                  <p className="text-xs text-amber-400 italic">
                    📝 {item.specialInstructions}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Notes */}
        {order.notes && (
          <div className="mb-3 px-3 py-2 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <p className="text-xs text-amber-400">{order.notes}</p>
          </div>
        )}

        {/* Status Summary */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
          <span>{uniqueItems} items • {totalItems} total</span>
          <span className="capitalize">{order.status}</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          {!isCompleted && (
            <Button
              onClick={() => onBump(order.id)}
              size="sm"
              className={cn(
                "flex-1 gap-1.5",
                isReady
                  ? "bg-success hover:bg-success/80 text-white"
                  : "bg-primary hover:bg-primary/80"
              )}
            >
              <CheckCheck className="w-4 h-4" />
              {isReady ? "Serve" : "Bump"}
            </Button>
          )}
          {!isCompleted && (
            <Button
              onClick={() => onRecall(order.id)}
              variant="outline"
              size="sm"
              className="gap-1.5"
            >
              <RefreshCw className="w-4 h-4" />
              Recall
            </Button>
          )}
          <Button
            onClick={() => onAssignChef(order.id)}
            variant="ghost"
            size="sm"
            className="gap-1.5"
          >
            <UserCheck className="w-4 h-4" />
          </Button>
        </div>

        {/* Progress bar for active orders */}
        {!isCompleted && order.status !== "pending" && (
          <div className="mt-3 h-1 rounded-full bg-secondary overflow-hidden">
            <motion.div
              initial={{ width: "0%" }}
              animate={{
                width: order.status === "preparing" ? "33%" :
                       order.status === "cooking" ? "66%" :
                       order.status === "ready" ? "100%" : "0%",
              }}
              transition={{ duration: 0.5 }}
              className={cn(
                "h-full rounded-full",
                order.status === "ready" ? "bg-success" :
                order.status === "cooking" ? "bg-warning" : "bg-primary"
              )}
            />
          </div>
        )}
      </div>
    </motion.div>
  );
}
