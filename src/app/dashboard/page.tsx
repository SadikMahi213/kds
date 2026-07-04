"use client";

import { AppShell } from "@/components/layout/app-shell";
import { StatsCards } from "@/components/dashboard/stats-cards";
import { OrdersChart } from "@/components/dashboard/orders-chart";
import { KitchenLoad } from "@/components/dashboard/kitchen-load";
import { RecentOrders } from "@/components/dashboard/recent-orders";
import { PerformanceMetrics } from "@/components/dashboard/performance-metrics";
import { useDemoEngine } from "@/hooks/use-demo-engine";

export default function DashboardPage() {
  const { stats, orders } = useDemoEngine();

  return (
    <AppShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Kitchen Dashboard</h1>
          <p className="text-muted-foreground">Real-time kitchen overview and performance metrics</p>
        </div>

        <StatsCards stats={stats} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <OrdersChart />
          </div>
          <KitchenLoad load={stats.kitchenLoad} ordersInProgress={stats.ordersInProgress} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentOrders orders={orders} />
          <PerformanceMetrics />
        </div>
      </div>
    </AppShell>
  );
}
