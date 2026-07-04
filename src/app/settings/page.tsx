"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useDemoEngine } from "@/hooks/use-demo-engine";
import {
  Settings,
  ChefHat,
  Printer,
  Palette,
  Globe,
  Bell,
  Route,
  Monitor,
  Save,
  RotateCcw,
  Check,
  Sun,
  Moon,
  Wifi,
  WifiOff,
} from "lucide-react";

interface SettingRowProps {
  icon: React.ElementType;
  label: string;
  description: string;
  action: React.ReactNode;
}

function SettingRow({ icon: Icon, label, description, action }: SettingRowProps) {
  return (
    <div className="flex items-center justify-between py-4 px-4 rounded-xl hover:bg-accent/30 transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center shrink-0">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div>
          <p className="text-sm font-medium text-foreground">{label}</p>
          <p className="text-xs text-muted-foreground">{description}</p>
        </div>
      </div>
      {action}
    </div>
  );
}

export default function SettingsPage() {
  const { config, updateConfig, resetDemo } = useDemoEngine();
  const [saved, setSaved] = useState(false);
  const [activeStations, setActiveStations] = useState({
    grill: true,
    fryer: true,
    pizza: true,
    saute: true,
    salad: true,
    drinks: true,
    dessert: true,
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <AppShell>
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Settings className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-3xl font-bold text-foreground">Settings</h1>
              <p className="text-muted-foreground">Configure your Kitchen Display System</p>
            </div>
          </div>
          <Button onClick={handleSave} className="gap-2">
            {saved ? (
              <>
                <Check className="w-4 h-4" />
                Saved
              </>
            ) : (
              <>
                <Save className="w-4 h-4" />
                Save Changes
              </>
            )}
          </Button>
        </div>

        {/* Kitchen Stations */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="px-4 py-3 border-b border-border bg-secondary/30">
            <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <ChefHat className="w-4 h-4 text-primary" />
              Kitchen Stations
            </h2>
          </div>
          <div className="divide-y divide-border">
            {Object.entries(activeStations).map(([station, active]) => (
              <SettingRow
                key={station}
                icon={ChefHat}
                label={`${station.charAt(0).toUpperCase() + station.slice(1)} Station`}
                description={`Manage ${station} station orders and display`}
                action={
                  <Button
                    variant={active ? "default" : "outline"}
                    size="sm"
                    onClick={() =>
                      setActiveStations((prev) => ({ ...prev, [station as keyof typeof prev]: !prev[station as keyof typeof prev] }))
                    }
                  >
                    {active ? "Active" : "Disabled"}
                  </Button>
                }
              />
            ))}
          </div>
        </div>

        {/* Printer Settings */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="px-4 py-3 border-b border-border bg-secondary/30">
            <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Printer className="w-4 h-4 text-primary" />
              Printer Settings
            </h2>
          </div>
          <div className="divide-y divide-border">
            <SettingRow
              icon={Printer}
              label="Receipt Printer"
              description="Star TSP100 (Connected)"
              action={<Badge variant="secondary"><Wifi className="w-3 h-3 mr-1" /> Online</Badge>}
            />
            <SettingRow
              icon={Printer}
              label="Kitchen Printer"
              description="Epson TM-T88 (Connected)"
              action={<Badge variant="secondary"><Wifi className="w-3 h-3 mr-1" /> Online</Badge>}
            />
            <SettingRow
              icon={Printer}
              label="Label Printer"
              description="Brother QL-810W"
              action={<Badge variant="secondary"><WifiOff className="w-3 h-3 mr-1" /> Offline</Badge>}
            />
          </div>
        </div>

        {/* Display & Theme */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="px-4 py-3 border-b border-border bg-secondary/30">
            <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Palette className="w-4 h-4 text-primary" />
              Display & Theme
            </h2>
          </div>
          <div className="divide-y divide-border">
            <SettingRow
              icon={Monitor}
              label="Screen Layout"
              description="Auto-adjust for your display"
              action={
                <select className="bg-secondary border border-border rounded-lg px-3 py-1.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/50">
                  <option>Auto</option>
                  <option>Landscape</option>
                  <option>Portrait</option>
                </select>
              }
            />
            <SettingRow
              icon={Sun}
              label="Dark Mode"
              description="Always dark for kitchen environments"
              action={<Badge>Always Dark</Badge>}
            />
            <SettingRow
              icon={Globe}
              label="Language"
              description="Interface language"
              action={
                <select className="bg-secondary border border-border rounded-lg px-3 py-1.5 text-sm text-foreground outline-none focus:ring-2 focus:ring-primary/50">
                  <option>English</option>
                  <option>Spanish</option>
                  <option>French</option>
                </select>
              }
            />
          </div>
        </div>

        {/* Notifications */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="px-4 py-3 border-b border-border bg-secondary/30">
            <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Bell className="w-4 h-4 text-primary" />
              Notifications
            </h2>
          </div>
          <div className="divide-y divide-border">
            <SettingRow
              icon={Bell}
              label="Sound Alerts"
              description="Play sound on new orders"
              action={
                <Button variant="default" size="sm">On</Button>
              }
            />
            <SettingRow
              icon={Bell}
              label="Delay Notifications"
              description="Alert when orders are delayed"
              action={
                <Button variant="default" size="sm">On</Button>
              }
            />
            <SettingRow
              icon={Bell}
              label="Visual Alerts"
              description="Flash screen on urgent orders"
              action={
                <Button variant="default" size="sm">On</Button>
              }
            />
          </div>
        </div>

        {/* Order Routing */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="px-4 py-3 border-b border-border bg-secondary/30">
            <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Route className="w-4 h-4 text-primary" />
              Order Routing
            </h2>
          </div>
          <div className="divide-y divide-border">
            <SettingRow
              icon={Route}
              label="Auto-Routing"
              description="Auto-assign orders to stations"
              action={<Badge variant="default">Enabled</Badge>}
            />
            <SettingRow
              icon={Route}
              label="Priority Rules"
              description="VIP and large party prioritization"
              action={<Badge variant="default">Enabled</Badge>}
            />
          </div>
        </div>

        {/* Demo Settings */}
        <div className="rounded-2xl border border-border bg-card overflow-hidden">
          <div className="px-4 py-3 border-b border-border bg-secondary/30">
            <h2 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Monitor className="w-4 h-4 text-primary" />
              Demo Controls
            </h2>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Reset Demo Data</p>
                <p className="text-xs text-muted-foreground">Clear all orders and restart simulation</p>
              </div>
              <Button variant="destructive" size="sm" onClick={resetDemo} className="gap-2">
                <RotateCcw className="w-4 h-4" />
                Reset Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
