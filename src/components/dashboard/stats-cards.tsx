"use client";

import { motion } from "framer-motion";
import { KitchenStats } from "@/lib/types";
import {
  ClipboardList,
  ChefHat,
  CheckCheck,
  AlertTriangle,
  Gauge,
  Timer,
  TrendingUp,
  DollarSign,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardsProps {
  stats: KitchenStats;
}

const cards = [
  {
    key: "totalOrdersToday",
    label: "Today's Orders",
    icon: ClipboardList,
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
    format: (v: number) => v.toString(),
  },
  {
    key: "ordersInProgress",
    label: "In Progress",
    icon: ChefHat,
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-amber-500/10",
    format: (v: number) => v.toString(),
  },
  {
    key: "completedOrders",
    label: "Completed",
    icon: CheckCheck,
    color: "from-green-500 to-emerald-500",
    bgColor: "bg-green-500/10",
    format: (v: number) => v.toString(),
  },
  {
    key: "delayedOrders",
    label: "Delayed",
    icon: AlertTriangle,
    color: "from-red-500 to-rose-500",
    bgColor: "bg-red-500/10",
    format: (v: number) => v.toString(),
  },
  {
    key: "kitchenLoad",
    label: "Kitchen Load",
    icon: Gauge,
    color: "from-violet-500 to-purple-500",
    bgColor: "bg-violet-500/10",
    format: (v: number) => `${v}%`,
  },
  {
    key: "averagePrepTime",
    label: "Avg Prep Time",
    icon: Timer,
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-500/10",
    format: (v: number) => {
      const mins = Math.floor(v / 60);
      const secs = v % 60;
      return `${mins}:${secs.toString().padStart(2, "0")}`;
    },
  },
  {
    key: "averageTicketTime",
    label: "Avg Ticket Time",
    icon: TrendingUp,
    color: "from-indigo-500 to-blue-500",
    bgColor: "bg-indigo-500/10",
    format: (v: number) => {
      const mins = Math.floor(v / 60);
      return `${mins}m`;
    },
  },
  {
    key: "revenueToday",
    label: "Revenue Today",
    icon: DollarSign,
    color: "from-emerald-500 to-teal-500",
    bgColor: "bg-emerald-500/10",
    format: (v: number) => `$${v.toLocaleString()}`,
  },
];

export function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((card, index) => {
        const value = stats[card.key as keyof KitchenStats] as number;
        const Icon = card.icon;

        return (
          <motion.div
            key={card.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="rounded-2xl border border-border bg-card p-4 hover:border-primary/30 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center", card.bgColor)}>
                <Icon className="w-5 h-5" style={{ color: card.color.split(' ')[0].replace('from-', '') }} />
              </div>
            </div>
            <p className="text-2xl font-bold text-foreground tabular-nums mb-1">
              {card.format(value)}
            </p>
            <p className="text-xs text-muted-foreground">{card.label}</p>
          </motion.div>
        );
      })}
    </div>
  );
}
