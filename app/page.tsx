"use client";

import ApplicationProvider from "@/contexts/ApplicationContext";
import Desktop from "@/components/Desktop";
import TaskBar from "@/components/TaskBar";
import GameProvider from "@/contexts/GameContext";

export default function Home() {
  return (
    <GameProvider>
      <ApplicationProvider>
        <main className="min-h-screen">
          <Desktop />
          <TaskBar />
        </main>
      </ApplicationProvider>
    </GameProvider>
  );
}
