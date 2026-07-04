"use client";

import { KitchenStation } from "@/lib/types";
import { KitchenSection } from "./kitchen-section";
import { useDemoEngine } from "@/hooks/use-demo-engine";

const stations: KitchenStation[] = ["grill", "fryer", "pizza", "saute", "salad", "drinks", "dessert"];

export function KitchenGrid() {
  const { orders, bumpOrder, recallOrder, assignChef } = useDemoEngine();

  // Sort orders by priority and then creation time within each station
  const handleAssignChef = (id: string) => {
    assignChef(id, "Unassigned");
  };

  const getStationOrders = (station: KitchenStation) => {
    return orders
      .filter((o) => o.station === station && o.status !== "completed")
      .sort((a, b) => {
        const priorityOrder = { urgent: 0, high: 1, normal: 2, low: 3 };
        const pDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
        if (pDiff !== 0) return pDiff;
        return a.createdAt - b.createdAt;
      });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 h-full">
      {stations.map((station) => (
        <KitchenSection
          key={station}
          station={station}
          orders={getStationOrders(station)}
          onBump={bumpOrder}
          onRecall={recallOrder}
          onAssignChef={handleAssignChef}
        />
      ))}
    </div>
  );
}
