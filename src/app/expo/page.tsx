"use client";

import { AppShell } from "@/components/layout/app-shell";
import { ExpoGrid } from "@/components/expo/expo-grid";
import { ClipboardList } from "lucide-react";

export default function ExpoPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <ClipboardList className="w-8 h-8 text-primary" />
          <div>
            <h1 className="text-3xl font-bold text-foreground">Expo Screen</h1>
            <p className="text-muted-foreground">Stage and manage orders ready for pickup</p>
          </div>
        </div>
        <ExpoGrid />
      </div>
    </AppShell>
  );
}
