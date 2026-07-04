"use client";

import { Square, Globe, ExternalLink } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="relative bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Square className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold text-white">KDS Pro</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-4">
              The intelligent Kitchen Display System that transforms how restaurants manage their kitchen workflow.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors">
                <Globe className="w-4 h-4 text-slate-400" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors">
                <Globe className="w-4 h-4 text-slate-400" />
              </a>
              <a href="#" className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors">
                <ExternalLink className="w-4 h-4 text-slate-400" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Product</h4>
            <ul className="space-y-2.5">
              {["Features", "Pricing", "Demo", "Integrations", "Changelog"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-2.5">
              {["About", "Blog", "Careers", "Contact", "Press Kit"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">Support</h4>
            <ul className="space-y-2.5">
              {["Documentation", "API Reference", "Status", "FAQ", "Community"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-sm text-slate-400 hover:text-white transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © 2026 KDS Pro. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-xs text-slate-500 hover:text-slate-400 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-xs text-slate-500 hover:text-slate-400 transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-xs text-slate-500 hover:text-slate-400 transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
