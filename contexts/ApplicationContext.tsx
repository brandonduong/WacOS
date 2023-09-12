import { createContext, useState, ReactNode, useMemo, lazy } from "react";
import { App } from "../types/ApplicationType";
import { useWindowContext } from "@/components/Application/helper";

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
  width?: number;
  height?: number;
}

export interface ApplicationType {
  apps: App[];
  addApp: (props: AddAppProps) => void;
  removeApp: (name: string) => void;
  clearApps: () => void;
  getIndex: (name: string) => number;
  setSize: (name: string, width: number, height: number) => void;
  setXY: (name: string, x: number, y: number) => void;
}

const ApplicationContext = createContext<ApplicationType>(
  {} as ApplicationType
);

const ApplicationProvider = ({ children }: { children: ReactNode }) => {
  const [apps, setApps] = useState<App[]>([]);
  const { initialSize } = useWindowContext();

  const addApp = ({ name, x, y, width, height }: AddAppProps) => {
    // Only allow 1 instance open
    if (!apps.find((app) => app.title === name)) {
      const Comp = APPLICATIONS[name];

      const app: App = {
        Node: Comp,
        title: name,
        start: Date.now(),
        x: x,
        y: y,
        width: width || initialSize.width,
        height: height || initialSize.height,
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

  function getIndex(name: string) {
    return apps.findIndex((app) => app.title === name);
  }

  function setSize(name: string, width: number, height: number) {
    const app = apps.find((a) => a.title === name);
    if (app) {
      app.width = width;
      app.height = height;

      const copy = [...apps];
      copy[getIndex(app.title)] = app;
      setApps(copy);
    }
  }

  function setXY(name: string, x: number, y: number) {
    const app = apps.find((a) => a.title === name);
    if (app) {
      app.x = x;
      app.y = y;

      const copy = [...apps];
      copy[getIndex(app.title)] = app;
      setApps(copy);
    }
  }

  const value = useMemo(
    () => ({
      apps,
      addApp,
      removeApp,
      clearApps,
      getIndex,
      setSize,
      setXY,
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
