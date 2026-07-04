"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Clock } from "lucide-react";

interface OrderTimerProps {
  createdAt: number;
  className?: string;
}

export function OrderTimer({ createdAt, className }: OrderTimerProps) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const update = () => setElapsed(Date.now() - createdAt);
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [createdAt]);

  const minutes = Math.floor(elapsed / 60000);
  const seconds = Math.floor((elapsed % 60000) / 1000);
  const timeString = `${minutes}:${seconds.toString().padStart(2, "0")}`;

  // Thresholds in milliseconds
  const warningThreshold = 4 * 60 * 1000; // 4 minutes
  const criticalThreshold = 8 * 60 * 1000; // 8 minutes

  const timerClass = cn(
    elapsed > criticalThreshold ? "timer-red" :
    elapsed > warningThreshold ? "timer-yellow" :
    "text-muted-foreground"
  );

  return (
    <div className={cn("flex items-center gap-1.5 font-mono text-sm", timerClass, className)}>
      <Clock className="w-3.5 h-3.5" />
      <span className="font-semibold tabular-nums">{timeString}</span>
    </div>
  );
}
