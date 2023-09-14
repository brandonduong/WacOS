import { createContext, useState, ReactNode, useMemo } from "react";

const TIME = {
  morning: "morning",
  noon: "noon",
  night: "night",
};

export interface GameType {
  time: string;
  day: number;
  stats: StatsType;
  setStats: (stats: StatsType) => void;
}

interface StatsType {
  rejections: number;
  energy: number;
  stress: number;
  guilt: number;
}

const GameContext = createContext<GameType>({} as GameType);

const GameProvider = ({ children }: { children: ReactNode }) => {
  const [time, setTime] = useState(TIME.morning);
  const [day, setDay] = useState(1);
  const [stats, setStats] = useState<StatsType>({
    rejections: 0,
    energy: 100,
    stress: 0,
    guilt: 0,
  });

  const value = useMemo(
    () => ({
      time,
      day,
      stats,
      setStats,
    }),
    [time, day, stats]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export { GameContext };

export default GameProvider;
