import DesktopIcon from "@/components/DesktopIcon";
import { AppsOnDesktop } from "../../constants/desktop";

// hooks
import { useApps } from "../../hooks/useApp";
import Application from "../Application";

export default function Desktop() {
  const { apps, addApp } = useApps();

  return (
    <>
      {apps.map((app) => (
        <Application key={app.title} {...app} />
      ))}

      {AppsOnDesktop.map((app) => (
        <DesktopIcon
          key={app.id}
          icon={app.icon}
          isDraggable
          onDoubleClick={() => addApp({ name: app.id })}
          defaultPosition={{ x: 10, y: 10 }}
          title={app.title}
          id={app.id}
        />
      ))}
    </>
  );
}
