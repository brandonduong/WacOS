import { TECH_COMPANIES } from "@/constants/companies";
import {
  BYES,
  GREETINGS,
  REJECT_MESSAGES,
  REJECT_SUBJECTS,
  UNPROFESSIONAL_BYES,
  UNPROFESSIONAL_GREETINGS,
  UNPROFESSIONAL_REJECT_MESSAGES,
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
    if (rng(10) <= 7) {
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
    } else
      return {
        author: `${application.author}`,
        message: `${getRandom(UNPROFESSIONAL_GREETINGS)}\n${getRandom(
          UNPROFESSIONAL_REJECT_MESSAGES
        )}\n${getRandom(UNPROFESSIONAL_BYES)}`,
        subject: getRandom(REJECT_SUBJECTS),
        opened: false,
        id: `reject-${application.author}`,
        title: application.title,
        company: application.company,
      };
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
    }),
    [time, day, stats, loading, emails, jobs]
  );

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export { GameContext };

export default GameProvider;
