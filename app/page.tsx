"use client";

import ApplicationProvider from "@/contexts/ApplicationContext";
import Desktop from "@/components/Desktop";

export default function Home() {
  return (
    <ApplicationProvider>
      <main className="min-h-screen">
        <Desktop />
      </main>
    </ApplicationProvider>
  );
}
