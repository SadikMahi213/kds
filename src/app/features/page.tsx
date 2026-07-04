"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Check, Star } from "lucide-react";

const features = [
  {
    category: "Core Features",
    items: [
      {
        title: "Real-Time Order Sync",
        description: "Orders appear instantly from Square, Toast, or Lightspeed POS. No delays, no lost tickets.",
        benefits: ["Zero latency order transmission", "Bi-directional sync with POS", "Order modification in real-time"],
      },
      {
        title: "Smart Kitchen Routing",
        description: "Auto-route menu items to the correct station. Burgers go to Grill, salads to Salad Station, etc.",
        benefits: ["Automatic station assignment", "Cross-station order splitting", "Dynamic re-routing on the fly"],
      },
      {
        title: "Intelligent Prioritization",
        description: "Orders are automatically prioritized based on VIP status, party size, and wait time.",
        benefits: ["VIP customer flagging", "Wait-time escalation", "Large party prioritization"],
      },
      {
        title: "Color-Coded Timers",
        description: "Visual timer system that changes from green to yellow to red as orders approach delay thresholds.",
        benefits: ["At-a-glance status awareness", "Configurable thresholds", "Audio alert integration"],
      },
    ],
  },
  {
    category: "Kitchen Operations",
    items: [
      {
        title: "Multi-Station Display",
        description: "Dedicated screens for each kitchen station with filtered views. Grill sees only grill orders.",
        benefits: ["Station-specific views", "Customizable layouts", "Touch-optimized interface"],
      },
      {
        title: "Expo Line Management",
        description: "Stage completed orders and manage the final pass-off between kitchen and serving staff.",
        benefits: ["Visual order staging", "Ready-for-pickup alerts", "Quality check workflow"],
      },
      {
        title: "Order Bumping System",
        description: "One-tap bump to move orders through the workflow. Haptic feedback on supported devices.",
        benefits: ["Quick status progression", "Completion tracking", "Performance analytics"],
      },
    ],
  },
  {
    category: "Analytics & Insights",
    items: [
      {
        title: "Kitchen Performance",
        description: "Real-time analytics on order volumes, prep times, and station performance.",
        benefits: ["Live performance dashboard", "Historical data comparison", "Bottleneck identification"],
      },
      {
        title: "Chef Productivity",
        description: "Track individual chef performance, average times, and order completion rates.",
        benefits: ["Individual metrics", "Station-level analytics", "Team performance trends"],
      },
      {
        title: "Peak Hour Analysis",
        description: "Understand your busiest periods and optimize staffing accordingly.",
        benefits: ["Hourly volume breakdowns", "Trend analysis", "Staff optimization insights"],
      },
    ],
  },
  {
    category: "Integration & Reliability",
    items: [
      {
        title: "Square POS Integration",
        description: "Seamless two-way sync with Square POS. Menu, orders, and modifiers sync automatically.",
        benefits: ["Native Square integration", "Real-time menu sync", "Modifier support"],
      },
      {
        title: "Offline Mode",
        description: "Continues working even without internet. Orders queue locally and sync when reconnected.",
        benefits: ["Uninterrupted operations", "Automatic sync recovery", "Data integrity guaranteed"],
      },
      {
        title: "Hardware Compatible",
        description: "Works with touchscreens, bump bars, printers, and kitchen displays from major manufacturers.",
        benefits: ["Touchscreen optimized", "Bump bar support", "Printer integration"],
      },
    ],
  },
];

const plans = [
  {
    name: "Starter",
    price: "$79",
    period: "/month",
    description: "Perfect for small restaurants and cafes",
    features: ["Up to 2 kitchen stations", "Real-time order sync", "Basic analytics", "Email support", "1 user"],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Professional",
    price: "$149",
    period: "/month",
    description: "Ideal for busy mid-sized restaurants",
    features: [
      "Up to 6 kitchen stations",
      "Advanced routing",
      "Full analytics suite",
      "Priority support",
      "Unlimited users",
      "API access",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$299",
    period: "/month",
    description: "For large restaurants and multi-location chains",
    features: [
      "Unlimited stations",
      "Multi-location support",
      "Custom integrations",
      "Dedicated support",
      "SLA guarantee",
      "On-premise option",
      "White-label available",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-white">
            KDS Pro
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/dashboard" className="text-sm text-slate-400 hover:text-white transition-colors">
              Live Demo
            </Link>
            <Link href="/">
              <Button variant="outline" size="sm" className="border-slate-700 text-slate-300">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-24 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl sm:text-6xl font-bold text-white mb-6"
          >
            Everything Your
            <span className="text-gradient block">Kitchen Needs</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-slate-400 max-w-2xl mx-auto mb-8"
          >
            From real-time order management to advanced analytics, our KDS has everything 
            you need to run an efficient, profitable kitchen.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Link href="/dashboard">
              <Button size="lg" className="gap-2 text-base h-12 px-8">
                Try Live Demo <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features by Category */}
      {features.map((section) => (
        <section key={section.category} className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl font-bold text-white mb-2"
            >
              {section.category}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 }}
              className="text-slate-400 mb-10"
            >
              {section.category === "Core Features" && "The foundational tools that power your kitchen"}
              {section.category === "Kitchen Operations" && "Streamline your daily kitchen workflow"}
              {section.category === "Analytics & Insights" && "Data-driven decisions for your restaurant"}
              {section.category === "Integration & Reliability" && "Works with your existing setup"}
            </motion.p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.items.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="rounded-2xl bg-slate-800/50 border border-slate-700/50 p-6 hover:bg-slate-800/80 hover:border-slate-600/50 transition-all"
                >
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-slate-400 mb-4 leading-relaxed">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2 text-sm text-slate-300">
                        <Check className="w-4 h-4 text-success mt-0.5 shrink-0" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ))}

      {/* Pricing */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-slate-400">
              Start with a free trial. No credit card required.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-2xl p-8 relative ${
                  plan.popular
                    ? "bg-primary/10 border-2 border-primary shadow-xl shadow-primary/10"
                    : "bg-slate-800/50 border border-slate-700/50"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                    Most Popular
                  </div>
                )}
                <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-bold text-white">{plan.price}</span>
                  <span className="text-slate-400">{plan.period}</span>
                </div>
                <p className="text-sm text-slate-400 mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-slate-300">
                      <Check className="w-4 h-4 text-success shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full ${plan.popular ? '' : 'border-slate-600 text-slate-300 hover:text-white'}`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 border-t border-slate-800">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-500 text-yellow-500" />
            ))}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Kitchen?
          </h2>
          <p className="text-lg text-slate-400 mb-8 max-w-xl mx-auto">
            Join 500+ restaurants already using KDS Pro to streamline their kitchen operations.
          </p>
          <Link href="/dashboard">
            <Button size="lg" className="gap-2 text-base h-12 px-8">
              Start Free Trial <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
          <p className="text-xs text-slate-500 mt-3">No credit card required · 14-day free trial</p>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="border-t border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">© 2026 KDS Pro. All rights reserved.</p>
          <Link href="/" className="text-sm text-slate-500 hover:text-white transition-colors">
            Back to Home
          </Link>
        </div>
      </footer>
    </div>
  );
}
