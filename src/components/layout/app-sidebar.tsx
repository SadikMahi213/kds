"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  ChefHat,
  ClipboardList,
  ListOrdered,
  CheckCheck,
  BarChart3,
  Settings,
  MonitorPlay,
  Square,
  Home,
} from "lucide-react";

const sidebarItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/kitchen", icon: ChefHat, label: "Kitchen" },
  { href: "/expo", icon: ClipboardList, label: "Expo" },
  { href: "/queue", icon: ListOrdered, label: "Queue" },
  { href: "/completed", icon: CheckCheck, label: "Completed" },
  { href: "/analytics", icon: BarChart3, label: "Analytics" },
  { href: "/settings", icon: Settings, label: "Settings" },
  { href: "/demo", icon: MonitorPlay, label: "Demo Mode" },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 h-screen w-[72px] border-r border-border bg-sidebar flex flex-col items-center py-4 gap-1">
      <div className="mb-6 mt-2">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
          <Square className="w-5 h-5 text-primary-foreground" />
        </div>
      </div>

      <nav className="flex flex-col items-center gap-1 flex-1">
        {sidebarItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 relative group",
                isActive
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              )}
            >
              <item.icon className="w-5 h-5" />
              <div className="absolute left-full ml-3 px-3 py-1.5 bg-popover border border-border rounded-lg text-sm font-medium whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 shadow-xl z-50">
                {item.label}
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="text-[10px] text-muted-foreground text-center mt-auto pb-2">
        <div className="w-8 h-0.5 bg-border mx-auto mb-2" />
        KDS v2.0
      </div>
    </aside>
  );
}
