import { ApplicationName } from "../contexts/ApplicationContext";

export const AppsOnDesktop: {
  title: string;
  id: ApplicationName;
  icon: string;
}[] = [
  {
    title: "Clock",
    id: "clock",
    icon: "/icons/clock.png",
  },
  {
    title: "Task Manager",
    id: "task manager",
    icon: "/icons/text.png",
  },
  {
    title: "Email",
    id: "email",
    icon: "/icons/email.png",
  },
  {
    title: "Messenger",
    id: "messenger",
    icon: "/icons/messenger.png",
  },
];
