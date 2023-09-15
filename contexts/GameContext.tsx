import {
  BYES,
  FAKE_FIRST,
  FAKE_LAST,
  GREETINGS,
  REJECT_MESSAGES,
  REJECT_SUBJECTS,
  UNPROFESSIONAL_BYES,
  UNPROFESSIONAL_GREETINGS,
  UNPROFESSIONAL_REJECT_MESSAGES,
} from "@/constants/emails";
import { STORY } from "@/constants/story";
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
  nextDay: () => void;
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
  const [emails, setEmails] = useState<EmailType[]>([STORY[0]]);

  function nextDay() {
    setDay(day + 1);

    // Get new emails in response to applications
    setEmails([generateRejection(), ...emails]);

    // Gain guilt if have left over energy
    const guiltMod =
      stats.energy > 60 ? 5 : stats.energy > 30 ? 3 : stats.energy > 10 ? 1 : 0;
    setStats({ ...stats, guilt: stats.guilt + guiltMod });

    load();
  }

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
    if (Math.floor(Math.random() * 10) <= 7) {
      return {
        author: `${getRandom(FAKE_FIRST)} ${getRandom(FAKE_LAST)}`,
        message: `${getRandom(GREETINGS)}\n${getRandom(
          REJECT_MESSAGES
        )}\n${getRandom(BYES)}`,
        subject: getRandom(REJECT_SUBJECTS),
        opened: false,
        id: `${getRandom(FAKE_FIRST)}${getRandom(FAKE_LAST)}`,
      };
    } else
      return {
        author: `${getRandom(FAKE_FIRST)} ${getRandom(FAKE_LAST)}`,
        message: `${getRandom(UNPROFESSIONAL_GREETINGS)}\n${getRandom(
          UNPROFESSIONAL_REJECT_MESSAGES
        )}\n${getRandom(UNPROFESSIONAL_BYES)}`,
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
      nextDay,
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
