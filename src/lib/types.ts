export type OrderType = "dine-in" | "takeout" | "delivery" | "pickup";

export type OrderStatus =
  | "pending"
  | "preparing"
  | "cooking"
  | "ready"
  | "completed"
  | "delayed";

export type Priority = "low" | "normal" | "high" | "urgent";

export type KitchenStation =
  | "grill"
  | "fryer"
  | "pizza"
  | "saute"
  | "drinks"
  | "dessert"
  | "salad"
  | "expo";

export interface MenuItem {
  id: string;
  name: string;
  category: string;
  price: number;
  station: KitchenStation;
  prepTime: number; // seconds
}

export interface OrderItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  modifiers: string[];
  specialInstructions: string;
  status: OrderStatus;
  startedAt: number;
  completedAt?: number;
}

export interface Order {
  id: string;
  displayId: number;
  type: OrderType;
  status: OrderStatus;
  priority: Priority;
  customerName: string;
  tableNumber?: number;
  serverName: string;
  items: OrderItem[];
  createdAt: number;
  updatedAt: number;
  startedAt?: number;
  completedAt?: number;
  notes: string;
  estimatedPrepTime: number;
  station: KitchenStation;
}

export interface KitchenStats {
  totalOrdersToday: number;
  ordersInProgress: number;
  completedOrders: number;
  delayedOrders: number;
  kitchenLoad: number; // percentage
  averagePrepTime: number; // seconds
  averageTicketTime: number; // seconds
  revenueToday: number;
}

export interface OrderMetric {
  hour: string;
  orders: number;
  completed: number;
  avgTime: number;
}

export interface TopItem {
  name: string;
  count: number;
  revenue: number;
  station: KitchenStation;
}

export interface ChefPerformance {
  name: string;
  station: KitchenStation;
  ordersCompleted: number;
  avgTime: number;
  rating: number;
}

export interface Notification {
  id: string;
  type: "order-incoming" | "order-delayed" | "order-completed" | "system";
  message: string;
  timestamp: number;
  read: boolean;
  orderId?: string;
}

export interface DemoConfig {
  speed: number; // 1x, 2x, etc.
  autoGenerate: boolean;
  rushHour: boolean;
  quietMode: boolean;
  generateInterval: number; // ms
}
