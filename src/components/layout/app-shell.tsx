"use client";

import { AppSidebar } from "./app-sidebar";
import { AppHeader } from "./app-header";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <AppSidebar />
      <AppHeader />
      <main className="pl-[72px] pt-16">
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
