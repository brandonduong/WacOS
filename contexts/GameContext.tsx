import {
  EMAILS,
  FAKE_FIRST,
  FAKE_LAST,
  REJECT_MESSAGES,
  REJECT_SUBJECTS,
} from "@/constants/emails";
import { createContext, useState, ReactNode, useMemo, useEffect } from "react";

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
  emails: EmailType[];
}

interface StatsType {
  rejections: number;
  energy: number;
  stress: number;
  guilt: number;
}

interface EmailType {
  author: string;
  message: string;
  subject: string;
  opened: boolean;
  id: string;
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
  const [emails, setEmails] = useState<EmailType[]>([]);

  useEffect(() => {
    setEmails([generateRejection(), generateRejection(), generateRejection()]);
  }, []);

  function load() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }

  function getRandom(constList: string[]) {
    return constList[Math.floor(Math.random() * constList.length)];
  }

  function generateRejection(): EmailType {
    return {
      author: `${getRandom(FAKE_FIRST)} ${getRandom(FAKE_LAST)}`,
      message: getRandom(REJECT_MESSAGES),
      subject: getRandom(REJECT_SUBJECTS),
      opened: false,
      id: `${getRandom(FAKE_FIRST)}${getRandom(FAKE_LAST)}`,
    };
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
      emails,
    }),
    [time, day, stats, loading, emails]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export { GameContext };

export default GameProvider;
