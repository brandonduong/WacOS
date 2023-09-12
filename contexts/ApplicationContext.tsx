import { createContext, useState, ReactNode, useMemo, lazy } from "react";
import { App } from "../types/ApplicationType";

const APPLICATIONS = {
  clock: lazy(() => import("../components/Apps/Clock")),
  task: lazy(() => import("../components/Apps/Clock")),
  email: lazy(() => import("../components/Apps/Email/index")),
  messenger: lazy(() => import("../components/Apps/Clock")),
};

export type ApplicationName = keyof typeof APPLICATIONS;

interface AddAppProps {
  name: ApplicationName;
  x?: number;
  y?: number;
}

export interface ApplicationType {
  apps: App[];
  addApp: (props: AddAppProps) => void;
  removeApp: (name: string) => void;
  clearApps: () => void;
}

const ApplicationContext = createContext<ApplicationType>(
  {} as ApplicationType
);

function randomFixedInteger(length: number) {
  return Math.floor(
    Math.pow(10, length - 1) +
      Math.random() * (Math.pow(10, length) - Math.pow(10, length - 1) - 1)
  );
}

const ApplicationProvider = ({ children }: { children: ReactNode }) => {
  const [apps, setApps] = useState<App[]>([]);

  const addApp = ({ name, x, y }: AddAppProps) => {
    // Only allow 1 instance open
    if (!apps.find((app) => app.title === name)) {
      const Comp = APPLICATIONS[name];

      const app: App = {
        Node: Comp,
        title: name,
        start: Date.now(),
        x: x,
        y: y,
      };

      setApps([...apps, app]);
    }
  };

  const removeApp = (name: string) => {
    setApps((prev) => prev.filter((app) => app.title !== name));
  };

  const clearApps = () => {
    setApps([]);
  };

  const value = useMemo(
    () => ({
      apps,
      addApp,
      removeApp,
      clearApps,
    }),
    [apps]
  );

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
};

export { ApplicationContext };

export default ApplicationProvider;
