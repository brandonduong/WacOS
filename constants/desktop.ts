import { ApplicationName } from "../contexts/ApplicationContext";

export const AppsOnDesktop: {
  title: string;
  id: ApplicationName;
  icon: string;
  scroll: boolean;
}[] = [
  {
    title: "Task Manager",
    id: "task",
    icon: "/icons/text.png",
    scroll: false,
  },
  {
    title: "Email",
    id: "email",
    icon: "/icons/email.png",
    scroll: true,
  },

  {
    title: "Internet",
    id: "internet",
    icon: "/icons/internet.png",
    scroll: true,
  },
  {
    title: "Messenger",
    id: "messenger",
    icon: "/icons/messenger.png",
    scroll: true,
  },
  {
    title: "Clock",
    id: "clock",
    icon: "/icons/clock.png",
    scroll: false,
  },
];
