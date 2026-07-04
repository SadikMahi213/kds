import { Order, OrderStatus, KitchenStation, Notification } from "./types";
import { generateOrder, randomItem, randomInt, stationLabels } from "./mock-data";

export type DemoEventCallback = {
  onNewOrder: (order: Order) => void;
  onOrderUpdate: (order: Order) => void;
  onOrderComplete: (order: Order) => void;
  onOrderDelayed: (order: Order) => void;
  onNotification: (notification: Notification) => void;
  onStatsUpdate: (stats: Partial<{
    totalOrdersToday: number;
    ordersInProgress: number;
    completedOrders: number;
    delayedOrders: number;
    kitchenLoad: number;
    revenueToday: number;
  }>) => void;
};

const stations: KitchenStation[] = ["grill", "fryer", "pizza", "saute", "salad", "drinks", "dessert"];

export class DemoEngine {
  private orders: Map<string, Order> = new Map();
  private callbacks: DemoEventCallback | null = null;
  private intervals: ReturnType<typeof setInterval>[] = [];
  private running = false;
  private speed = 1;
  private rushHour = false;
  private quietMode = false;
  private orderCounter = 0;
  private revenueCounter = 0;
  private completedCount = 0;
  private delayedCount = 0;

  private notificationId = 0;

  constructor() {
    this.resetCounters();
  }

  private resetCounters() {
    this.orderCounter = 147;
    this.revenueCounter = 4875.5;
    this.completedCount = 128;
    this.delayedCount = 3;
  }

  setCallbacks(cb: DemoEventCallback) {
    this.callbacks = cb;
  }

  setSpeed(speed: number) {
    this.speed = speed;
  }

  setRushHour(rush: boolean) {
    this.rushHour = rush;
  }

  setQuietMode(quiet: boolean) {
    this.quietMode = quiet;
  }

  getOrders(): Order[] {
    return Array.from(this.orders.values());
  }

  getOrder(id: string): Order | undefined {
    return this.orders.get(id);
  }

  start() {
    if (this.running) return;
    this.running = true;

    // Generate a new order periodically
    this.intervals.push(setInterval(() => {
      if (!this.running) return;
      if (this.quietMode && Math.random() > 0.3) return;
      this.generateNewOrder();
    }, this.adjustInterval(8000)));

    // Update order statuses
    this.intervals.push(setInterval(() => {
      if (!this.running) return;
      this.updateOrderStatuses();
    }, this.adjustInterval(3000)));

    // Check for delays
    this.intervals.push(setInterval(() => {
      if (!this.running) return;
      this.checkForDelays();
    }, this.adjustInterval(5000)));

    // Update stats
    this.intervals.push(setInterval(() => {
      if (!this.running) return;
      this.emitStatsUpdate();
    }, this.adjustInterval(4000)));
  }

  stop() {
    this.running = false;
    this.intervals.forEach((interval) => clearInterval(interval));
    this.intervals = [];
  }

  private adjustInterval(base: number): number {
    const rushMultiplier = this.rushHour ? 0.4 : 1;
    return (base / this.speed) * rushMultiplier;
  }

  private generateNewOrder() {
    const station = randomItem(stations);
    const order = generateOrder(station);
    order.status = "pending";

    // 30% chance of being high priority during rush hour
    if (this.rushHour && Math.random() > 0.7) {
      order.priority = "high";
    }

    this.orders.set(order.id, order);
    this.orderCounter++;
    this.revenueCounter += order.items.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);

    this.callbacks?.onNewOrder(order);
    this.callbacks?.onNotification({
      id: `notif-${++this.notificationId}`,
      type: "order-incoming",
      message: `New order #${order.displayId} - ${order.customerName}`,
      timestamp: Date.now(),
      read: false,
      orderId: order.id,
    });
  }

  private updateOrderStatuses() {
    const now = Date.now();
    const statusFlow: OrderStatus[] = ["pending", "preparing", "cooking", "ready", "completed"];

    this.orders.forEach((order) => {
      if (order.status === "completed") return;

      const currentIndex = statusFlow.indexOf(order.status);
      if (currentIndex < 0) return;

      const elapsed = now - order.updatedAt;
      const delayMultiplier = order.priority === "high" ? 0.6 : order.priority === "urgent" ? 0.4 : 1;
      const timeToNext = (order.estimatedPrepTime / statusFlow.length) * delayMultiplier * 1000;

      if (elapsed > timeToNext) {
        const nextStatus = statusFlow[currentIndex + 1];
        if (nextStatus) {
          order.status = nextStatus;
          order.updatedAt = now;

          if (nextStatus === "completed") {
            order.completedAt = now;
            this.completedCount++;

            this.callbacks?.onOrderComplete({ ...order });
            this.callbacks?.onNotification({
              id: `notif-${++this.notificationId}`,
              type: "order-completed",
              message: `Order #${order.displayId} is ready!`,
              timestamp: Date.now(),
              read: false,
              orderId: order.id,
            });
          } else {
            this.callbacks?.onOrderUpdate({ ...order });
          }
        }
      }
    });
  }

  private checkForDelays() {
    const now = Date.now();
    const threshold = 600000; // 10 minutes

    this.orders.forEach((order) => {
      if (order.status === "completed" || order.status === "delayed") return;

      const elapsed = now - order.createdAt;
      if (elapsed > threshold) {
        order.status = "delayed";
        order.priority = "urgent";
        order.updatedAt = now;
        this.delayedCount++;

        this.callbacks?.onOrderDelayed({ ...order });
        this.callbacks?.onNotification({
          id: `notif-${++this.notificationId}`,
          type: "order-delayed",
          message: `⚠️ Order #${order.displayId} is delayed! ${order.customerName}`,
          timestamp: Date.now(),
          read: false,
          orderId: order.id,
        });
      }
    });
  }

  private emitStatsUpdate() {
    const activeOrders = Array.from(this.orders.values()).filter(
      (o) => o.status !== "completed"
    ).length;

    this.callbacks?.onStatsUpdate({
      totalOrdersToday: this.orderCounter,
      ordersInProgress: activeOrders,
      completedOrders: this.completedCount,
      delayedOrders: this.delayedCount,
      kitchenLoad: Math.min(100, Math.round((activeOrders / 15) * 100)),
      revenueToday: Math.round(this.revenueCounter * 100) / 100,
    });
  }

  bumpOrder(orderId: string) {
    const order = this.orders.get(orderId);
    if (!order) return;

    order.status = "completed";
    order.completedAt = Date.now();
    order.updatedAt = Date.now();
    this.completedCount++;

    this.callbacks?.onOrderComplete({ ...order });
    this.callbacks?.onNotification({
      id: `notif-${++this.notificationId}`,
      type: "order-completed",
      message: `✅ Order #${order.displayId} bumped!`,
      timestamp: Date.now(),
      read: false,
      orderId: order.id,
    });
  }

  recallOrder(orderId: string) {
    const order = this.orders.get(orderId);
    if (!order) return;

    order.status = "preparing";
    order.priority = "urgent";
    order.updatedAt = Date.now();

    this.callbacks?.onOrderUpdate({ ...order });
    this.callbacks?.onNotification({
      id: `notif-${++this.notificationId}`,
      type: "order-incoming",
      message: `🔄 Order #${order.displayId} recalled!`,
      timestamp: Date.now(),
      read: false,
      orderId: order.id,
    });
  }

  assignChef(orderId: string, chefName: string) {
    const order = this.orders.get(orderId);
    if (!order) return;

    order.notes = `👨‍🍳 Assigned: ${chefName}`;
    order.updatedAt = Date.now();
    this.callbacks?.onOrderUpdate({ ...order });
  }

  delayOrder(orderId: string) {
    const order = this.orders.get(orderId);
    if (!order) return;

    order.status = "delayed";
    order.priority = "urgent";
    order.updatedAt = Date.now();
    this.delayedCount++;

    this.callbacks?.onOrderDelayed({ ...order });
  }

  generateSpecificOrder(station?: KitchenStation) {
    const order = generateOrder(station);
    this.orders.set(order.id, order);
    this.orderCounter++;
    this.revenueCounter += order.items.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0);

    this.callbacks?.onNewOrder(order);
    this.callbacks?.onNotification({
      id: `notif-${++this.notificationId}`,
      type: "order-incoming",
      message: `New order #${order.displayId} - ${order.customerName}`,
      timestamp: Date.now(),
      read: false,
      orderId: order.id,
    });
    return order;
  }

  completeOrder(orderId: string) {
    this.bumpOrder(orderId);
  }

  reset() {
    this.stop();
    this.orders.clear();
    this.resetCounters();

    // Regenerate initial orders
    for (let i = 0; i < 10; i++) {
      const order = generateOrder(randomItem(stations));
      // Set some as already in progress
      if (i < 6) {
        order.status = ["preparing", "cooking", "ready"][i % 3] as OrderStatus;
        order.updatedAt = Date.now() - randomInt(60000, 300000);
      }
      this.orders.set(order.id, order);
    }
  }

  getStats() {
    const activeOrders = Array.from(this.orders.values()).filter(
      (o) => o.status !== "completed"
    ).length;

    return {
      totalOrdersToday: this.orderCounter,
      ordersInProgress: activeOrders,
      completedOrders: this.completedCount,
      delayedOrders: this.delayedCount,
      kitchenLoad: Math.min(100, Math.round((activeOrders / 15) * 100)),
      revenueToday: Math.round(this.revenueCounter * 100) / 100,
    };
  }

  destroy() {
    this.stop();
    this.callbacks = null;
  }
}

// Global instance
let globalEngine: DemoEngine | null = null;

export function getDemoEngine(): DemoEngine {
  if (!globalEngine) {
    globalEngine = new DemoEngine();
  }
  return globalEngine;
}
