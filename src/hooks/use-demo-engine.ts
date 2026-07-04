"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Order, KitchenStats, Notification, KitchenStation, DemoConfig } from "@/lib/types";
import { DemoEngine, getDemoEngine } from "@/lib/demo-engine";
import { mockStats } from "@/lib/mock-data";

const defaultConfig: DemoConfig = {
  speed: 1,
  autoGenerate: true,
  rushHour: false,
  quietMode: false,
  generateInterval: 8000,
};

export function useDemoEngine() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState<KitchenStats>(mockStats);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [config, setConfig] = useState<DemoConfig>(defaultConfig);
  const [isRunning, setIsRunning] = useState(false);
  const engineRef = useRef<DemoEngine | null>(null);

  useEffect(() => {
    const engine = getDemoEngine();
    engineRef.current = engine;

    engine.setCallbacks({
      onNewOrder: (order) => {
        setOrders((prev) => [order, ...prev]);
      },
      onOrderUpdate: (order) => {
        setOrders((prev) => prev.map((o) => (o.id === order.id ? order : o)));
      },
      onOrderComplete: (order) => {
        setOrders((prev) => prev.map((o) => (o.id === order.id ? order : o)));
      },
      onOrderDelayed: (order) => {
        setOrders((prev) => prev.map((o) => (o.id === order.id ? order : o)));
      },
      onNotification: (notification) => {
        setNotifications((prev) => [notification, ...prev].slice(0, 50));
      },
      onStatsUpdate: (partial) => {
        setStats((prev) => ({ ...prev, ...partial }));
      },
    });

    // Load initial orders
    const initialOrders = engine.getOrders();
    if (initialOrders.length > 0) {
      setOrders(initialOrders);
    }

    // Start the engine
    engine.start();
    setIsRunning(true);

    return () => {
      engine.stop();
    };
  }, []);

  const updateConfig = useCallback((partial: Partial<DemoConfig>) => {
    setConfig((prev) => {
      const newConfig = { ...prev, ...partial };
      const engine = engineRef.current;
      if (engine) {
        engine.setSpeed(newConfig.speed);
        engine.setRushHour(newConfig.rushHour);
        engine.setQuietMode(newConfig.quietMode);
      }
      return newConfig;
    });
  }, []);

  const bumpOrder = useCallback((orderId: string) => {
    engineRef.current?.bumpOrder(orderId);
  }, []);

  const recallOrder = useCallback((orderId: string) => {
    engineRef.current?.recallOrder(orderId);
  }, []);

  const delayOrder = useCallback((orderId: string) => {
    engineRef.current?.delayOrder(orderId);
  }, []);

  const assignChef = useCallback((orderId: string, chef: string) => {
    engineRef.current?.assignChef(orderId, chef);
  }, []);

  const generateOrder = useCallback((station?: KitchenStation) => {
    engineRef.current?.generateSpecificOrder(station);
  }, []);

  const resetDemo = useCallback(() => {
    engineRef.current?.reset();
    setOrders(engineRef.current?.getOrders() || []);
    setStats(mockStats);
    setNotifications([]);
    setConfig(defaultConfig);
  }, []);

  const completeOrder = useCallback((orderId: string) => {
    engineRef.current?.completeOrder(orderId);
  }, []);

  const markNotificationRead = useCallback((notificationId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notificationId ? { ...n, read: true } : n))
    );
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const filters = {
    byStation: useCallback(
      (station: KitchenStation) =>
        orders.filter((o) => o.station === station && o.status !== "completed"),
      [orders]
    ),
    byStatus: useCallback(
      (status: string) => orders.filter((o) => o.status === status),
      [orders]
    ),
    active: useCallback(
      () => orders.filter((o) => o.status !== "completed"),
      [orders]
    ),
    completed: useCallback(
      () => orders.filter((o) => o.status === "completed"),
      [orders]
    ),
    delayed: useCallback(
      () => orders.filter((o) => o.status === "delayed"),
      [orders]
    ),
  };

  return {
    orders,
    stats,
    notifications,
    config,
    isRunning,
    bumpOrder,
    recallOrder,
    delayOrder,
    assignChef,
    generateOrder,
    resetDemo,
    completeOrder,
    updateConfig,
    markNotificationRead,
    clearNotifications,
    filters,
  };
}
