import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers/providers";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KDS Pro — Intelligent Kitchen Display System",
  description:
    "Next-generation Kitchen Display System. Real-time order management, smart routing, kitchen analytics, and seamless POS integration for modern restaurants.",
  keywords: [
    "kitchen display system",
    "restaurant POS",
    "order management",
    "kitchen automation",
    "square POS",
    "toast POS",
    "restaurant technology",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased dark`} suppressHydrationWarning>
      <body className="min-h-full bg-background text-foreground">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
