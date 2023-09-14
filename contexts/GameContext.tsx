import { createContext, useState, ReactNode, useMemo } from "react";

const TIME = {
  morning: "morning",
  noon: "noon",
  night: "night",
};

export interface GameType {
  time: string;
  day: number;
}

const GameContext = createContext<GameType>({} as GameType);

const GameProvider = ({ children }: { children: ReactNode }) => {
  const [time, setTime] = useState(TIME.morning);
  const [day, setDay] = useState(1);

  const value = useMemo(
    () => ({
      time,
      day,
    }),
    [time, day]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export { GameContext };

export default GameProvider;
