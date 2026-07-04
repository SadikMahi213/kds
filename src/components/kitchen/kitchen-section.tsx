"use client";

import { Order, KitchenStation } from "@/lib/types";
import { OrderCard } from "./order-card";
import { stationLabels, stationColors } from "@/lib/mock-data";
import { motion, AnimatePresence } from "framer-motion";
import { ChefHat } from "lucide-react";
import { cn } from "@/lib/utils";

interface KitchenSectionProps {
  station: KitchenStation;
  orders: Order[];
  onBump: (id: string) => void;
  onRecall: (id: string) => void;
  onAssignChef: (id: string) => void;
  compact?: boolean;
}

export function KitchenSection({
  station,
  orders,
  onBump,
  onRecall,
  onAssignChef,
  compact,
}: KitchenSectionProps) {
  const color = stationColors[station];

  return (
    <div className="flex flex-col h-full">
      {/* Section Header */}
      <div
        className="flex items-center justify-between px-4 py-3 rounded-t-xl border-b"
        style={{
          backgroundColor: `${color}10`,
          borderColor: `${color}20`,
        }}
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: color }}
          />
          <h3 className="text-sm font-semibold text-foreground">
            {stationLabels[station]}
          </h3>
          <span
            className="text-xs font-medium px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: `${color}20`,
              color: color,
            }}
          >
            {orders.length}
          </span>
        </div>
        <ChefHat className="w-4 h-4 text-muted-foreground" />
      </div>

      {/* Orders Grid */}
      <div
        className={cn(
          "flex-1 overflow-y-auto p-3 space-y-3",
          "bg-card/30 rounded-b-xl"
        )}
      >
        <AnimatePresence mode="popLayout">
          {orders.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center py-12 text-center"
            >
              <ChefHat className="w-8 h-8 text-muted-foreground/40 mb-2" />
              <p className="text-sm text-muted-foreground/60">No orders</p>
              <p className="text-xs text-muted-foreground/40">Waiting for new tickets...</p>
            </motion.div>
          ) : (
            orders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onBump={onBump}
                onRecall={onRecall}
                onAssignChef={onAssignChef}
              />
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
