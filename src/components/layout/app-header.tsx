"use client";

import { useState } from "react";
import { Bell, Search, ChevronDown, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDemoEngine } from "@/hooks/use-demo-engine";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function AppHeader() {
  const { notifications, markNotificationRead, clearNotifications } = useDemoEngine();
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="fixed top-0 right-0 left-[72px] h-16 border-b border-border bg-background/80 backdrop-blur-xl z-30 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
          <span className="text-sm font-medium text-muted-foreground">Live</span>
        </div>
        <div className="h-4 w-px bg-border" />
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search orders..."
            className="h-9 w-64 rounded-lg bg-secondary border-0 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Link href="/demo">
          <Button variant="outline" size="sm" className="gap-2">
            <MonitorPlayIcon className="w-4 h-4" />
            <span className="hidden sm:inline">Demo Mode</span>
          </Button>
        </Link>

        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => setShowNotifications(!showNotifications)}
            onBlur={() => setTimeout(() => setShowNotifications(false), 200)}
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-destructive text-[10px] font-bold flex items-center justify-center text-destructive-foreground">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
          </Button>

          {showNotifications && (
            <div className="absolute right-0 top-full mt-2 w-80 rounded-xl border border-border bg-popover shadow-2xl overflow-hidden animate-scale-in">
              <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                <h3 className="text-sm font-semibold">Notifications</h3>
                <button
                  onClick={clearNotifications}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  Clear all
                </button>
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="px-4 py-8 text-center text-sm text-muted-foreground">
                    No notifications yet
                  </div>
                ) : (
                  notifications.slice(0, 10).map((n) => (
                    <button
                      key={n.id}
                      onClick={() => markNotificationRead(n.id)}
                      className={cn(
                        "w-full px-4 py-3 text-left border-b border-border/50 hover:bg-accent/50 transition-colors flex items-start gap-3",
                        !n.read && "bg-accent/30"
                      )}
                    >
                      <div
                        className={cn(
                          "w-2 h-2 rounded-full mt-1.5 shrink-0",
                          n.type === "order-incoming" && "bg-primary",
                          n.type === "order-completed" && "bg-success",
                          n.type === "order-delayed" && "bg-destructive"
                        )}
                      />
                      <div>
                        <p className="text-sm text-foreground">{n.message}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {formatTimeAgo(n.timestamp)}
                        </p>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 pl-3 border-l border-border">
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
            WC
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium leading-tight">William Castillo</p>
            <p className="text-xs text-muted-foreground">Manager</p>
          </div>
        </div>
      </div>
    </header>
  );
}

function MonitorPlayIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 7.75a.75.75 0 0 1 1.142-.638l3.664 2.249a.75.75 0 0 1 0 1.278l-3.664 2.25a.75.75 0 0 1-1.142-.64z" />
      <path d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
}

function formatTimeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return "Just now";
  if (seconds < 120) return "1m ago";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 7200) return "1h ago";
  return `${Math.floor(seconds / 3600)}h ago`;
}
