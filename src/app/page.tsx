"use client";

import { Hero } from "@/components/landing/hero";
import { FeaturesSection } from "@/components/landing/features-section";
import { Testimonials } from "@/components/landing/testimonials";
import { Stats } from "@/components/landing/stats";
import { FAQ } from "@/components/landing/faq";
import { Footer } from "@/components/landing/footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Hero />
      <Stats />
      <FeaturesSection />
      <Testimonials />
      <FAQ />
      <Footer />
    </div>
  );
}
