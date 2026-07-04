"use client";

import { motion } from "framer-motion";
import { Star, MessageSquareQuote } from "lucide-react";

const testimonials = [
  {
    name: "Marco Rossi",
    role: "Executive Chef",
    restaurant: "Ristorante Italiano",
    avatar: "MR",
    content: "This KDS cut our ticket times by 40%. The station routing is a game-changer — no more shouting across the kitchen for orders.",
    rating: 5,
  },
  {
    name: "Sarah Chen",
    role: "Restaurant Owner",
    restaurant: "Golden Dragon",
    avatar: "SC",
    content: "We went from paper tickets to this system and it's night and day. The analytics alone helped us optimize our staffing during peak hours.",
    rating: 5,
  },
  {
    name: "James Wilson",
    role: "Kitchen Manager",
    restaurant: "The Grill House",
    avatar: "JW",
    content: "The bump system is incredibly intuitive. New hires pick it up in minutes. The color-coded timers are a lifesaver during rush hour.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Trusted by Restaurant Teams
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Hear from the chefs and restaurant owners who use our system every day.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative rounded-2xl bg-slate-800/50 border border-slate-700/50 p-6"
            >
              <MessageSquareQuote className="w-8 h-8 text-primary/30 mb-4" />
              <p className="text-slate-300 mb-6 leading-relaxed">{testimonial.content}</p>
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                ))}
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center text-sm font-bold text-white">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">{testimonial.name}</p>
                  <p className="text-xs text-slate-400">{testimonial.role}, {testimonial.restaurant}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
