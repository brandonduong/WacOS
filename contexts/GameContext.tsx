import { createContext, useState, ReactNode, useMemo } from "react";

export const TIME = {
  morning: 0,
  noon: 1,
  night: 2,
};

export type Time = keyof typeof TIME;

export interface GameType {
  time: Time;
  day: number;
  stats: StatsType;
  setStats: (stats: StatsType) => void;
  setTime: (time: Time) => void;
  setDay: (day: number) => void;
  loading: boolean;
  load: () => void;
}

interface StatsType {
  rejections: number;
  energy: number;
  stress: number;
  guilt: number;
}

const GameContext = createContext<GameType>({} as GameType);

const GameProvider = ({ children }: { children: ReactNode }) => {
  const [time, setTime] = useState<Time>("morning");
  const [day, setDay] = useState(1);
  const [stats, setStats] = useState<StatsType>({
    rejections: 0,
    energy: 100,
    stress: 10,
    guilt: 5,
  });

  const [loading, setLoading] = useState(false);

  function load() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  const value = useMemo(
    () => ({
      time,
      day,
      stats,
      setStats,
      setTime,
      setDay,
      loading,
      load,
    }),
    [time, day, stats, loading]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export { GameContext };

export default GameProvider;
