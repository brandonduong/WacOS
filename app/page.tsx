"use client";

import ApplicationProvider from "@/contexts/ApplicationContext";
import Desktop from "@/components/Desktop";
import TaskBar from "@/components/TaskBar";

export default function Home() {
  return (
    <ApplicationProvider>
      <main className="min-h-screen">
        <Desktop />
        <TaskBar />
      </main>
    </ApplicationProvider>
  );
}
