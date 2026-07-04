"use client";

import { motion } from "framer-motion";
import { ArrowRight, Play, ChefHat } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1555396273-367ea4eb4db5?q=80&w=1974')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/90 via-slate-800/80 to-slate-900/90" />
      </div>

      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.1) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-6">
                <ChefHat className="w-4 h-4" />
                Next-Gen Kitchen Display System
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6"
            >
              Transform Your
              <span className="text-gradient block">Restaurant Kitchen</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg text-slate-300 mb-8 max-w-lg leading-relaxed"
            >
              Eliminate paper tickets, reduce wait times, and streamline your kitchen workflow with our intelligent Kitchen Display System powered by real-time syncing and smart routing.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4"
            >
              <Link href="/dashboard">
                <Button size="lg" className="gap-2 text-base h-12 px-8">
                  View Live Demo
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/features">
                <Button variant="outline" size="lg" className="gap-2 text-base h-12 px-8 border-slate-600 text-slate-300 hover:text-white hover:border-slate-500">
                  <Play className="w-5 h-5" />
                  See Features
                </Button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex items-center gap-8 mt-12 pt-8 border-t border-slate-700/50"
            >
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-2 border-slate-800 bg-gradient-to-br from-slate-600 to-slate-700 flex items-center justify-center text-xs font-bold text-white"
                  >
                    {['M','J','A','S'][i-1]}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-white font-semibold">4.9/5 from 500+ reviews</p>
                <p className="text-sm text-slate-400">Trusted by restaurant teams nationwide</p>
              </div>
            </motion.div>
          </div>

          {/* Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="hidden lg:block relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-primary/10 border border-slate-700/50">
              <div className="bg-slate-900 p-4">
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="text-xs text-slate-500 ml-2">Kitchen Display System</div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { num: 245, items: 3, time: "4:32", status: "preparing" },
                    { num: 246, items: 2, time: "6:15", status: "cooking" },
                    { num: 247, items: 4, time: "2:48", status: "ready" },
                  ].map((order) => (
                    <div
                      key={order.num}
                      className="rounded-xl bg-slate-800 p-3 border border-slate-700"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg font-bold text-white">#{order.num}</span>
                        <span className={`text-sm font-medium ${
                          order.status === 'ready' ? 'text-green-400' :
                          order.status === 'cooking' ? 'text-yellow-400' : 'text-blue-400'
                        }`}>
                          {order.time}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400">Table 12 · Dine-in</div>
                      <div className="text-sm text-slate-300 mt-1">
                        {order.items} items • {['Smash Burger', 'Caesar Salad', 'Steak Frites'][order.num-245]}
                      </div>
                      <div className={`mt-2 h-1.5 rounded-full ${
                        order.status === 'ready' ? 'bg-green-500/30' :
                        order.status === 'cooking' ? 'bg-yellow-500/30' : 'bg-blue-500/30'
                      }`}>
                        <div className={`h-full rounded-full ${
                          order.status === 'ready' ? 'bg-green-500 w-full' :
                          order.status === 'cooking' ? 'bg-yellow-500 w-2/3' : 'bg-blue-500 w-1/3'
                        }`} />
                      </div>
                    </div>
                  ))}
                  <div className="col-span-3 mt-2 pt-2 border-t border-slate-700/50">
                    <div className="flex items-center justify-between text-xs text-slate-500">
                      <span>12 orders in queue</span>
                      <span>Avg time: 6m 42s</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center backdrop-blur-xl">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">72%</div>
                <div className="text-[10px] text-primary">Efficiency</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
