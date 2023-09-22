"use client";

import ApplicationProvider from "@/contexts/ApplicationContext";
import Desktop from "@/components/Desktop";
import TaskBar from "@/components/TaskBar";
import GameProvider from "@/contexts/GameContext";
import clsx from "clsx";
import { useGame } from "@/hooks/useGame";
import { ReactNode, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Boot from "@/components/Boot";
import LoadingScreen from "@/components/LoadingScreen";

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

export default function Home() {
  const [signedIn, setSignedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      setSignedIn(true);
      // ...
    } else {
      // User is signed out
      // ...
      setSignedIn(false);
    }
  });

  return (
    <GameProvider>
      <ApplicationProvider>
        <OS>
          {loading ? (
            <LoadingScreen />
          ) : signedIn ? (
            <>
              <Desktop />
              <TaskBar />
            </>
          ) : (
            <Boot />
          )}
        </OS>
      </ApplicationProvider>
    </GameProvider>
  );
}
