import { TECH_COMPANIES } from "@/constants/companies";
import {
  BYES,
  GREETINGS,
  REJECT_MESSAGES,
  REJECT_SUBJECTS,
} from "@/constants/emails";
import { FAKE_FIRST } from "@/constants/firsts";
import {
  DESCRIPTION,
  EDUCATION,
  END,
  EXPERIENCE,
  OVERVIEW,
  REQUIREMENTS,
  RESPONSIBILITIES,
} from "@/constants/jobs";
import { FAKE_LAST } from "@/constants/lasts";
import { LOCATIONS } from "@/constants/locations";
import { SAD, SUPPORT } from "@/constants/sad";
import { STORY } from "@/constants/story";
import { TIMES } from "@/constants/times";
import { TECH_TITLES } from "@/constants/titles";
import { createContext, useState, ReactNode, useMemo } from "react";

export const TIME = {
  morning: 0,
  noon: 1,
  night: 2,
};
export const ENERGY_COSTS = {
  apply: 40,
};
export const ENERGY_BOOSTS = {
  rest1: 20,
  rest2: 50,
};
export const STRESS_COSTS = {
  Rejection: 6,
};
export const GUILT_COSTS = {
  Rejection: 3,
};

export type Time = keyof typeof TIME;

export interface GameType {
  time: Time;
  day: number;
  stats: StatsType;
  setStats: (stats: StatsType) => void;
  setTimeTo: (time: Time) => void;
  nextDay: () => void;
  loading: boolean;
  load: () => void;
  emails: EmailType[];
  jobs: JobType[];
  applyToJob: (id: string) => void;
  readEmail: (id: string) => void;
  readMessages: boolean;
  setReadMessages: (read: boolean) => void;
  messages: MessageType[];
}

interface StatsType {
  rejections: number;
  energy: number;
  stress: number;
  guilt: number;
}

export interface EmailType {
  author: string;
  message: string;
  subject: string;
  opened: boolean;
  id: string;
  title?: string;
  company?: string;
}

export interface JobType {
  author: string;
  message: string;
  title: string;
  company: string;
  location: string;
  applied: boolean;
  id: string;
  time: string;
  people: number;
}

export interface MessageType {
  outgoing: boolean;
  message: string;
}

const GameContext = createContext<GameType>({} as GameType);

const GameProvider = ({ children }: { children: ReactNode }) => {
  const [time, setTime] = useState<Time>("morning");
  const [day, setDay] = useState(1);
  const [messages, setMessages] = useState<MessageType[]>([
    { outgoing: true, message: SAD[rng(SAD.length)] },
  ]);
  const [readMessages, setReadMessages] = useState<boolean>(false);
  const [stats, setStats] = useState<StatsType>({
    rejections: 0,
    energy: 100,
    stress: 10,
    guilt: 5,
  });

  const [loading, setLoading] = useState(false);
  const [emails, setEmails] = useState<EmailType[]>([STORY[0]]);
  const [jobs, setJobs] = useState<JobType[]>([
    generateJob(),
    generateJob(),
    generateJob(),
    generateJob(),
    generateJob(),
  ]);
  const [applications, setApplications] = useState<JobType[]>([]);

  function setTimeTo(t: Time): void {
    setTime(t);

    // Gain energy
    let e = 0;
    switch (TIME[t] - TIME[time]) {
      case 1:
        e = ENERGY_BOOSTS.rest1;
        break;
      case 2:
        e = ENERGY_BOOSTS.rest2;
      default:
        break;
    }

    setStats({ ...stats, energy: Math.min(stats.energy + e, 100) });

    load();
  }

  function nextDay() {
    setDay(day + 1);

    // Get new emails in response to applications
    let cpy = emails;
    let newApplications = applications;
    for (let i = 0; i < applications.length; i++) {
      if (rng(10) <= 3) {
        cpy = [generateRejection(applications[i]), ...cpy];
        newApplications = newApplications.splice(i, 1);
      }
    }
    setEmails(cpy);

    // Remove random postings
    const oldJobs = jobs.filter((job) => {
      if (rng(100) >= 60) {
        return job;
      }
    });

    // Generate new job postings
    const newJobs = [];
    for (let i = 0; i < 5; i++) {
      newJobs.push(generateJob());
    }

    setJobs([...newJobs, ...oldJobs]);

    // Gain guilt if have left over energy
    const guiltMod =
      stats.energy > 60 ? 5 : stats.energy > 30 ? 3 : stats.energy > 10 ? 1 : 0;
    setStats({ ...stats, guilt: stats.guilt + guiltMod, energy: 100 });

    // Generate new messages
    // Randomly get messages
    if (rng(10) < 4) {
      // Randomly get sad or supporting
      if (rng(10) < 5) {
        // Get sad
        setMessages([
          ...messages,
          { outgoing: true, message: SAD[rng(SAD.length)] },
        ]);
      } else {
        // Get support
        setMessages([
          ...messages,
          { outgoing: false, message: SUPPORT[rng(SUPPORT.length)] },
        ]);
      }
      setReadMessages(false);
    }

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

  function generateJob(): JobType {
    const first = getRandom(FAKE_FIRST);
    const last = getRandom(FAKE_LAST);
    return {
      author: `${first} ${last}`,
      message: `${getRandom(OVERVIEW)}\n${getRandom(
        DESCRIPTION
      )}\nEducation: ${getRandom(EDUCATION)}\nExperience: ${getRandom(
        EXPERIENCE
      )}\nResponsibilities: ${getRandom(
        RESPONSIBILITIES
      )}\nRequirements: ${getRandom(REQUIREMENTS)}\n${getRandom(END)}`,
      title: getRandom(TECH_TITLES),
      applied: false,
      id: `job-${first}-${last}-${rng(99999)}`,
      company: getRandom(TECH_COMPANIES),
      location: `${rng(100)} ${getRandom(LOCATIONS)}`,
      time: `${rng(30)} ${getRandom(TIMES)}`,
      people: rng(1000),
    };
  }

  function applyToJob(id: string): void {
    const ind = jobs.findIndex((job) => job.id === id);
    const old = jobs[ind];

    // Update job list
    const updated = { ...old, applied: true };
    setJobs([...jobs.slice(0, ind), updated, ...jobs.slice(ind + 1)]);

    // Add job to applications
    setApplications([...applications, updated]);

    // Update stats
    setStats({ ...stats, energy: stats.energy - ENERGY_COSTS.apply });
  }

  function rng(maxNum: number) {
    return Math.floor(Math.random() * maxNum);
  }

  function generateRejection(application: JobType): EmailType {
    return {
      author: application.author,
      message: `${getRandom(GREETINGS)}\n${getRandom(
        REJECT_MESSAGES
      )}\n${getRandom(BYES)}`,
      subject: getRandom(REJECT_SUBJECTS),
      opened: false,
      id: `reject-${application.author}`,
      title: application.title,
      company: application.company,
    };
  }

  function readEmail(id: string) {
    const ind = emails.findIndex((email) => email.id === id);
    const old = emails[ind];

    if (!old.opened) {
      // Update email list
      const updated = { ...old, opened: true };
      if (old) {
        setEmails([...emails.slice(0, ind), updated, ...emails.slice(ind + 1)]);
      }

      // Increase rejection count, stress, and guilt
      setStats({
        ...stats,
        stress: stats.stress + rng(STRESS_COSTS.Rejection),
        guilt: stats.guilt + rng(GUILT_COSTS.Rejection),
        rejections: stats.rejections + 1,
      });
    }
  }

  const value = useMemo(
    () => ({
      time,
      day,
      stats,
      setStats,
      setTimeTo,
      nextDay,
      loading,
      load,
      emails,
      jobs,
      applyToJob,
      readEmail,
      messages,
      readMessages,
      setReadMessages,
    }),
    [time, day, stats, loading, emails, jobs, messages, readMessages]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export { GameContext };

export default GameProvider;
