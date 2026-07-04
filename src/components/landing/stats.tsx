"use client";

import { motion } from "framer-motion";
import { TrendingUp, Clock, Users, Zap } from "lucide-react";

const stats = [
  { label: "Orders Processed", value: "50K+", icon: TrendingUp, suffix: "/month" },
  { label: "Avg Prep Time Saved", value: "40%", icon: Clock, suffix: "" },
  { label: "Active Restaurants", value: "500+", icon: Users, suffix: "" },
  { label: "Ticket Accuracy", value: "99.9%", icon: Zap, suffix: "" },
];

export function Stats() {
  return (
    <section className="py-16 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-800 to-slate-900" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                <stat.icon className="w-7 h-7 text-primary" />
              </div>
              <div className="text-4xl font-bold text-white mb-1">
                {stat.value}
                <span className="text-lg text-primary ml-1">{stat.suffix}</span>
              </div>
              <p className="text-sm text-slate-400">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
