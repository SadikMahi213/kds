"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useDemoEngine } from "@/hooks/use-demo-engine";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { KitchenStation } from "@/lib/types";
import { stationLabels } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import {
  Plus,
  Play,
  Pause,
  FastForward,
  RotateCcw,
  Coffee,
  Zap,
  Moon,
  AlertTriangle,
  ChefHat,
} from "lucide-react";

const stations: KitchenStation[] = ["grill", "fryer", "pizza", "saute", "salad", "drinks", "dessert"];

export function DemoControls() {
  const { config, updateConfig, generateOrder, resetDemo, isRunning } = useDemoEngine();
  const [showStationPicker, setShowStationPicker] = useState(false);

  return (
    <div className="rounded-2xl border border-border bg-card p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Demo Controls</h3>
          <p className="text-sm text-muted-foreground">Simulate restaurant activity</p>
        </div>
        <Badge variant={config.autoGenerate ? "default" : "secondary"}>
          {config.autoGenerate ? "Auto-Generating" : "Paused"}
        </Badge>
      </div>

      {/* Speed Control */}
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">Simulation Speed</label>
        <div className="flex gap-2">
          {[1, 2, 3, 5].map((speed) => (
            <Button
              key={speed}
              variant={config.speed === speed ? "default" : "outline"}
              size="sm"
              onClick={() => updateConfig({ speed })}
              className="flex-1"
            >
              {speed === 1 ? null : <FastForward className="w-3 h-3 mr-1" />}
              {speed}x
            </Button>
          ))}
        </div>
      </div>

      {/* Mode Toggles */}
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">Kitchen Mode</label>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant={config.rushHour ? "default" : "outline"}
            size="sm"
            onClick={() => updateConfig({ rushHour: !config.rushHour })}
            className={cn(config.rushHour && "bg-destructive hover:bg-destructive/80")}
          >
            <Zap className="w-4 h-4 mr-1.5" />
            Rush Hour
          </Button>
          <Button
            variant={config.quietMode ? "default" : "outline"}
            size="sm"
            onClick={() => updateConfig({ quietMode: !config.quietMode })}
            className={cn(config.quietMode && "bg-muted-foreground")}
          >
            <Moon className="w-4 h-4 mr-1.5" />
            Quiet Mode
          </Button>
        </div>
      </div>

      {/* Auto Generate Toggle */}
      <div className="flex gap-2">
        <Button
          variant={config.autoGenerate ? "default" : "outline"}
          className="flex-1"
          onClick={() => updateConfig({ autoGenerate: !config.autoGenerate })}
        >
          {config.autoGenerate ? (
            <>
              <Pause className="w-4 h-4 mr-1.5" />
              Pause Auto
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-1.5" />
              Resume Auto
            </>
          )}
        </Button>
        <Button variant="outline" onClick={resetDemo}>
          <RotateCcw className="w-4 h-4 mr-1.5" />
          Reset
        </Button>
      </div>

      {/* Generate Order */}
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">Generate Order</label>
        <div className="relative">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setShowStationPicker(!showStationPicker)}
          >
            <Plus className="w-4 h-4 mr-1.5" />
            New Order
          </Button>
          {showStationPicker && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="absolute bottom-full mb-2 left-0 right-0 bg-popover border border-border rounded-xl p-2 shadow-2xl grid grid-cols-2 gap-1"
            >
              {stations.map((station) => (
                <button
                  key={station}
                  onClick={() => {
                    generateOrder(station);
                    setShowStationPicker(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm hover:bg-accent transition-colors"
                >
                  <ChefHat className="w-3.5 h-3.5 text-muted-foreground" />
                  {stationLabels[station]}
                </button>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <label className="text-sm font-medium text-foreground mb-2 block">Quick Actions</label>
        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => updateConfig({ rushHour: true, speed: 3 })}
          >
            <Zap className="w-4 h-4 mr-1.5" />
            Simulate Rush
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => updateConfig({ rushHour: false, quietMode: true, speed: 1 })}
          >
            <Coffee className="w-4 h-4 mr-1.5" />
            Quiet Period
          </Button>
        </div>
      </div>
    </div>
  );
}
