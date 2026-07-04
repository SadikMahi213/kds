"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";

const faqs = [
  {
    q: "How does the Kitchen Display System integrate with Square POS?",
    a: "Our KDS syncs in real-time with Square POS via their API. When an order is placed on Square, it appears instantly on the appropriate kitchen station screen. Changes made on either system are reflected immediately.",
  },
  {
    q: "Can I use this with my existing restaurant setup?",
    a: "Yes! Our system works with most standard restaurant configurations. We support Square, Toast, and Lightspeed POS systems. The touchscreen interface works on any modern tablet or monitor with a web browser.",
  },
  {
    q: "How many kitchen stations can I set up?",
    a: "You can create unlimited kitchen stations. Common setups include Grill, Fryer, Pizza, Sauté, Salad, Drinks, Dessert, and Expo. Orders are automatically routed to the correct station based on menu items.",
  },
  {
    q: "What happens if the internet goes down?",
    a: "Our system continues working offline. Orders are stored locally and automatically sync when the connection is restored. Your kitchen never stops running.",
  },
  {
    q: "Is the system easy for new staff to learn?",
    a: "Extremely. The large touch-friendly buttons, color-coded priority system, and intuitive bump workflow mean most staff are productive within their first shift. We provide training materials and support.",
  },
  {
    q: "Can I customize the display and workflow?",
    a: "Absolutely. You can customize station layouts, priority rules, timer thresholds, display themes, notification settings, and more. The system adapts to your kitchen's unique workflow.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-slate-900" />
      
      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-400">
            Everything you need to know about upgrading your kitchen.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="rounded-xl border border-slate-700/50 bg-slate-800/30 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-800/50 transition-colors"
              >
                <span className="text-white font-medium pr-4">{faq.q}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-slate-400 leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
