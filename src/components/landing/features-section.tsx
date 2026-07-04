"use client";

import { motion } from "framer-motion";
import {
  Zap,
  ChefHat,
  Route,
  Timer,
  BarChart3,
  Bell,
  Users,
  Monitor,
  Wifi,
  Smartphone,
  Shield,
  Layers,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Real-Time Orders",
    description: "Orders appear instantly from your POS system. No more lost tickets or miscommunication.",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Route,
    title: "Smart Kitchen Routing",
    description: "Auto-route items to the right station — grill, fryer, pizza, salad, or drinks.",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Timer,
    title: "Live Ticket Timers",
    description: "Every order tracked with precise timers. Color-coded alerts when tickets are approaching delays.",
    color: "from-orange-500 to-red-500",
  },
  {
    icon: ChefHat,
    title: "Multi-Station Support",
    description: "Dedicated views for each kitchen station with items filtered automatically.",
    color: "from-green-500 to-emerald-500",
  },
  {
    icon: BarChart3,
    title: "Kitchen Analytics",
    description: "Track prep times, order volumes, peak hours, and chef productivity in real-time.",
    color: "from-violet-500 to-purple-500",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description: "Visual and audio alerts for delayed orders, new tickets, and completed items.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Layers,
    title: "Order Bumping",
    description: "One-tap bump system to move tickets through the workflow smoothly.",
    color: "from-teal-500 to-cyan-500",
  },
  {
    icon: Shield,
    title: "Offline Ready",
    description: "Continues working even if internet drops. Syncs automatically when reconnected.",
    color: "from-indigo-500 to-blue-500",
  },
  {
    icon: Smartphone,
    title: "Touchscreen Optimized",
    description: "Large buttons, high contrast, and responsive layout designed for busy kitchens.",
    color: "from-rose-500 to-pink-500",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-900" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Everything Your Kitchen Needs
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Built from the ground up for restaurant efficiency. Replace paper tickets and 
            streamline your entire kitchen workflow.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="group relative rounded-2xl bg-slate-800/50 border border-slate-700/50 p-6 hover:bg-slate-800/80 hover:border-slate-600/50 transition-all duration-300"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} p-2.5 mb-4 shadow-lg`}>
                <feature.icon className="w-full h-full text-white" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-400 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
