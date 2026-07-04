import {
  Order,
  OrderItem,
  MenuItem,
  KitchenStats,
  OrderMetric,
  TopItem,
  ChefPerformance,
  KitchenStation,
  Notification,
} from "./types";

const menuItems: MenuItem[] = [
  { id: "m1", name: "Classic Cheeseburger", category: "Burgers", price: 14.99, station: "grill", prepTime: 480 },
  { id: "m2", name: "Double Smash Burger", category: "Burgers", price: 17.99, station: "grill", prepTime: 540 },
  { id: "m3", name: "Bacon BBQ Burger", category: "Burgers", price: 16.99, station: "grill", prepTime: 600 },
  { id: "m4", name: "Veggie Burger", category: "Burgers", price: 13.99, station: "grill", prepTime: 420 },
  { id: "m5", name: "French Fries", category: "Sides", price: 5.99, station: "fryer", prepTime: 180 },
  { id: "m6", name: "Sweet Potato Fries", category: "Sides", price: 6.99, station: "fryer", prepTime: 240 },
  { id: "m7", name: "Onion Rings", category: "Sides", price: 7.99, station: "fryer", prepTime: 300 },
  { id: "m8", name: "Chicken Wings (10pc)", category: "Appetizers", price: 12.99, station: "fryer", prepTime: 600 },
  { id: "m9", name: "Margherita Pizza", category: "Pizza", price: 15.99, station: "pizza", prepTime: 540 },
  { id: "m10", name: "Pepperoni Pizza", category: "Pizza", price: 16.99, station: "pizza", prepTime: 540 },
  { id: "m11", name: "BBQ Chicken Pizza", category: "Pizza", price: 18.99, station: "pizza", prepTime: 600 },
  { id: "m12", name: "Caesar Salad", category: "Salads", price: 10.99, station: "salad", prepTime: 240 },
  { id: "m13", name: "House Salad", category: "Salads", price: 8.99, station: "salad", prepTime: 180 },
  { id: "m14", name: "Grilled Chicken Salad", category: "Salads", price: 13.99, station: "salad", prepTime: 360 },
  { id: "m15", name: "Spaghetti Bolognese", category: "Pasta", price: 14.99, station: "saute", prepTime: 480 },
  { id: "m16", name: "Fettuccine Alfredo", category: "Pasta", price: 13.99, station: "saute", prepTime: 420 },
  { id: "m17", name: "Grilled Salmon", category: "Entrees", price: 22.99, station: "grill", prepTime: 720 },
  { id: "m18", name: "Steak Frites", category: "Entrees", price: 28.99, station: "grill", prepTime: 900 },
  { id: "m19", name: "Chocolate Lava Cake", category: "Desserts", price: 8.99, station: "dessert", prepTime: 360 },
  { id: "m20", name: "Tiramisu", category: "Desserts", price: 9.99, station: "dessert", prepTime: 120 },
  { id: "m21", name: "Ice Cream Sundae", category: "Desserts", price: 7.99, station: "dessert", prepTime: 120 },
  { id: "m22", name: "Coca Cola", category: "Drinks", price: 2.99, station: "drinks", prepTime: 30 },
  { id: "m23", name: "Lemonade", category: "Drinks", price: 3.49, station: "drinks", prepTime: 30 },
  { id: "m24", name: "Iced Tea", category: "Drinks", price: 2.99, station: "drinks", prepTime: 30 },
  { id: "m25", name: "Craft Beer", category: "Drinks", price: 6.99, station: "drinks", prepTime: 30 },
  { id: "m26", name: "Margarita", category: "Drinks", price: 11.99, station: "drinks", prepTime: 90 },
  { id: "m27", name: "Mojito", category: "Drinks", price: 10.99, station: "drinks", prepTime: 90 },
];

const firstNames = [
  "James", "Maria", "Ahmed", "Sofia", "Liam", "Emma", "Noah", "Olivia",
  "Ethan", "Ava", "Mason", "Isabella", "Carlos", "Yuki", "Fatima", "Omar",
  "Sophie", "Raj", "Chen", "Elena", "Mateo", "Priya", "Hannah", "Samuel",
];

const lastNames = [
  "Johnson", "Garcia", "Kim", "Patel", "Smith", "Brown", "Williams",
  "Martinez", "Lee", "Wong", "Singh", "Rodriguez", "Chen", "Davis",
  "Miller", "Wilson", "Taylor", "Anderson", "Thomas", "Jackson",
];

const serverNames = [
  "Alex", "Jordan", "Taylor", "Morgan", "Casey", "Riley", "Avery",
  "Quinn", "Skyler", "Harper", "Blake", "Drew", "Reese", "Dakota",
];

const streetNames = [
  "Main St", "Oak Ave", "Elm St", "Park Blvd", "Broadway",
  "Highland Ave", "Lake Dr", "River Rd", "Cedar Ln", "Maple Ave",
];

export function randomItem<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateCustomerName(): string {
  return `${randomItem(firstNames)} ${randomItem(lastNames)}`;
}

export function generateServerName(): string {
  return randomItem(serverNames);
}

export function generateOrderItems(count?: number): OrderItem[] {
  const itemCount = count || randomInt(1, 5);
  const items: OrderItem[] = [];
  const usedIds = new Set<string>();

  for (let i = 0; i < itemCount; i++) {
    const menuItem = randomItem(menuItems);
    if (usedIds.has(menuItem.id)) continue;
    usedIds.add(menuItem.id);

    const modifiers: string[] = [];
    if (Math.random() > 0.6) {
      const modifierOptions = [
        "Extra cheese", "No onions", "Well done", "Medium rare",
        "Extra sauce", "Light ice", "No salt", "Add bacon",
        "Gluten free bun", "Substitute fries", "Add avocado",
      ];
      modifiers.push(randomItem(modifierOptions));
      if (Math.random() > 0.8) modifiers.push(randomItem(modifierOptions.filter((m) => !modifiers.includes(m))));
    }

    items.push({
      id: `oi-${Date.now()}-${i}`,
      menuItem,
      quantity: randomInt(1, 3),
      modifiers,
      specialInstructions: Math.random() > 0.85 ? randomItem(["Allergies: please check", "Birthday celebration!", "Extra napkins please", "No plastic, please"]) : "",
      status: "pending",
      startedAt: 0,
    });
  }

  return items;
}

export function generateOrder(station?: KitchenStation): Order {
  const items = generateOrderItems();
  const orderTypes = ["dine-in", "takeout", "delivery", "pickup"] as const;
  const orderType = randomItem(orderTypes);
  const now = Date.now() - randomInt(0, 600000);
  const totalPrepTime = items.reduce((sum, item) => sum + item.menuItem.prepTime * item.quantity, 0);
  const avgPrepTime = Math.round(totalPrepTime / items.length);

  return {
    id: `ord-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    displayId: randomInt(100, 999),
    type: orderType,
    status: "pending",
    priority: Math.random() > 0.8 ? "high" : Math.random() > 0.9 ? "urgent" : Math.random() > 0.7 ? "low" : "normal",
    customerName: generateCustomerName(),
    tableNumber: orderType === "dine-in" ? randomInt(1, 30) : undefined,
    serverName: generateServerName(),
    items,
    createdAt: now,
    updatedAt: now,
    notes: Math.random() > 0.9 ? randomItem(["VIP - please prioritize", "Large party", "Anniversary dinner", "Business meeting", "Kids menu items separate"]) : "",
    estimatedPrepTime: avgPrepTime,
    station: station || items[0].menuItem.station,
  };
}

export function generateMultipleOrders(count: number, station?: KitchenStation): Order[] {
  return Array.from({ length: count }, () => generateOrder(station));
}

export const initialOrders: Order[] = generateMultipleOrders(12);

export const mockStats: KitchenStats = {
  totalOrdersToday: 147,
  ordersInProgress: 8,
  completedOrders: 128,
  delayedOrders: 3,
  kitchenLoad: 72,
  averagePrepTime: 420,
  averageTicketTime: 780,
  revenueToday: 4875.5,
};

export const ordersPerHourData: OrderMetric[] = [
  { hour: "11 AM", orders: 8, completed: 7, avgTime: 420 },
  { hour: "12 PM", orders: 22, completed: 20, avgTime: 480 },
  { hour: "1 PM", orders: 28, completed: 27, avgTime: 510 },
  { hour: "2 PM", orders: 15, completed: 15, avgTime: 390 },
  { hour: "3 PM", orders: 6, completed: 6, avgTime: 360 },
  { hour: "4 PM", orders: 4, completed: 4, avgTime: 340 },
  { hour: "5 PM", orders: 12, completed: 11, avgTime: 450 },
  { hour: "6 PM", orders: 24, completed: 22, avgTime: 540 },
  { hour: "7 PM", orders: 18, completed: 16, avgTime: 520 },
  { hour: "8 PM", orders: 10, completed: 10, avgTime: 480 },
  { hour: "9 PM", orders: 5, completed: 5, avgTime: 400 },
];

export const topItemsData: TopItem[] = [
  { name: "Classic Cheeseburger", count: 89, revenue: 1334.11, station: "grill" },
  { name: "French Fries", count: 76, revenue: 455.24, station: "fryer" },
  { name: "Chicken Wings (10pc)", count: 54, revenue: 701.46, station: "fryer" },
  { name: "Pepperoni Pizza", count: 48, revenue: 815.52, station: "pizza" },
  { name: "Caesar Salad", count: 42, revenue: 461.58, station: "salad" },
  { name: "Double Smash Burger", count: 38, revenue: 683.62, station: "grill" },
  { name: "Margherita Pizza", count: 35, revenue: 559.65, station: "pizza" },
  { name: "Coca Cola", count: 32, revenue: 95.68, station: "drinks" },
];

export const chefPerformanceData: ChefPerformance[] = [
  { name: "Chef Marco", station: "grill", ordersCompleted: 42, avgTime: 390, rating: 4.8 },
  { name: "Chef Luis", station: "fryer", ordersCompleted: 38, avgTime: 210, rating: 4.6 },
  { name: "Chef Antonio", station: "pizza", ordersCompleted: 45, avgTime: 480, rating: 4.9 },
  { name: "Chef Yuki", station: "saute", ordersCompleted: 31, avgTime: 360, rating: 4.7 },
  { name: "Chef Sarah", station: "salad", ordersCompleted: 35, avgTime: 180, rating: 4.5 },
  { name: "Chef Diego", station: "grill", ordersCompleted: 29, avgTime: 420, rating: 4.3 },
];

export const stationIcons: Record<KitchenStation, string> = {
  grill: "flame",
  fryer: "cooking-pot",
  pizza: "pizza",
  saute: "utensils-crossed",
  drinks: "wine",
  dessert: "cake-slice",
  salad: "salad",
  expo: "clipboard-list",
};

export const stationLabels: Record<KitchenStation, string> = {
  grill: "Grill Station",
  fryer: "Fry Station",
  pizza: "Pizza Station",
  saute: "Sauté Station",
  drinks: "Drink Station",
  dessert: "Dessert Station",
  salad: "Salad Station",
  expo: "Expo Line",
};

export const stationColors: Record<KitchenStation, string> = {
  grill: "#ef4444",
  fryer: "#f97316",
  pizza: "#eab308",
  saute: "#22c55e",
  drinks: "#3b82f6",
  dessert: "#ec4899",
  salad: "#14b8a6",
  expo: "#8b5cf6",
};
