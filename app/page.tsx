"use client";

import ApplicationProvider from "@/contexts/ApplicationContext";
import Desktop from "@/components/Desktop";
import TaskBar from "@/components/TaskBar";
import GameProvider from "@/contexts/GameContext";
import clsx from "clsx";
import { useGame } from "@/hooks/useGame";
import { ReactNode } from "react";

export default function Home() {
  function OS({ children }: { children: ReactNode }) {
    const { loading } = useGame();
    return (
      <main
        className={clsx("min-h-screen transition-all", {
          "contrast-50 pointer-events-none": loading,
        })}
      >
        {children}
      </main>
    );
  }

  return (
    <GameProvider>
      <ApplicationProvider>
        <OS>
          <Desktop />
          <TaskBar />
        </OS>
      </ApplicationProvider>
    </GameProvider>
  );
}
