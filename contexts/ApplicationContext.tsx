import { createContext, useState, ReactNode, useMemo, lazy } from "react";
import { App } from "../types/ApplicationType";
import { useWindowContext } from "@/components/Application/helper";
import { useWindowSize } from "react-use";
import { animate } from "framer-motion/dom";

const APPLICATIONS = {
  clock: lazy(() => import("../components/Apps/Clock/index")),
  task: lazy(() => import("../components/Apps/TaskManager/index")),
  email: lazy(() => import("../components/Apps/Email/index")),
  messenger: lazy(() => import("../components/Apps/Clock/index")),
  internet: lazy(() => import("../components/Apps/Internet/index")),
};

export type ApplicationName = keyof typeof APPLICATIONS;

interface AddAppProps {
  name: ApplicationName;
  title: string;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  minimized?: boolean;
  scroll: boolean;
}

export interface ApplicationType {
  apps: App[];
  addApp: (props: AddAppProps) => void;
  removeApp: (name: string) => void;
  clearApps: () => void;
  getIndex: (name: string) => number;
  setSize: (name: string, width: number, height: number) => void;
  setXY: (name: string, x: number, y: number) => void;
  setMinimized: (name: string, minimized: boolean) => void;
  setBackwardsHistory: (name: string) => void;
  setForwardsHistory: (name: string) => void;
  focused: string;
  minimize: (name: string) => void;
  history: string[];
}

const ApplicationContext = createContext<ApplicationType>(
  {} as ApplicationType
);

const ApplicationProvider = ({ children }: { children: ReactNode }) => {
  const [apps, setApps] = useState<App[]>([]);
  const [focused, setFocused] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const { initialSize } = useWindowContext();
  const wWidth = useWindowSize().width;
  const wHeight = useWindowSize().height;

  const addApp = ({
    name,
    title,
    x,
    y,
    width,
    height,
    minimized,
    scroll,
  }: AddAppProps) => {
    // Only allow 1 instance open
    if (!apps.find((app) => app.title === name)) {
      const Comp = APPLICATIONS[name];

      const app: App = {
        Node: Comp,
        name: title,
        title: name,
        start: Date.now(),
        x: x || wWidth / 2 - initialSize.width / 2,
        y: y || wHeight / 2 - initialSize.height / 2,
        width: width || initialSize.width,
        height: height || initialSize.height,
        minimized: minimized || false,
        scroll: scroll || false,
      };

      setApps([...apps, app]);
      setForwardsHistory(name);
    } else {
      setForwardsHistory(name);
    }
  };

  const removeApp = (name: string) => {
    setApps((prev) => prev.filter((app) => app.title !== name));

    setBackwardsHistory(name);
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

  function setMinimized(name: string, minimized: boolean) {
    const app = apps.find((a) => a.title === name);
    if (app) {
      app.minimized = minimized;
      const copy = [...apps];
      copy[getIndex(app.title)] = app;
      setApps(copy);
    }
  }

  function setBackwardsHistory(name: string) {
    const newHistory = [...history].filter((h) => h !== name);
    setHistory([...newHistory]);
    setFocused(newHistory[newHistory.length - 1]);
  }

  function setForwardsHistory(name: string) {
    setFocused(name);
    const newHistory = [...history].filter((h) => h !== name);
    setHistory([...newHistory, name]);
  }

  const minimize = (name: string) => {
    const newX =
      100 + 100 + 200 * getIndex(name) - apps[getIndex(name)].width! / 2;
    const newY = wHeight;
    animate(
      `#${name}`,
      {
        y: newY,
        x: newX, // 100 for start button, 100 for half a task bar button
      },
      { type: "spring" }
    );
    setMinimized(name, true);
    setBackwardsHistory(name);
  };

  const value = useMemo(
    () => ({
      apps,
      addApp,
      removeApp,
      clearApps,
      getIndex,
      setSize,
      setXY,
      setMinimized,
      setBackwardsHistory,
      setForwardsHistory,
      focused,
      minimize,
      history,
    }),
    [apps, focused, history]
  );

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
};

export { ApplicationContext };

export default ApplicationProvider;
