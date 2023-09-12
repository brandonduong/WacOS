import DesktopIcon from "@/components/DesktopIcon";
import { AppsOnDesktop } from "../../constants/desktop";

// hooks
import { useApps } from "../../hooks/useApp";
import Application from "../Application";
import { useState } from "react";

export default function Desktop() {
  const { apps, addApp } = useApps();
  const [focused, setFocused] = useState("");

  return (
    <>
      {apps.map((app) => (
        <Application
          key={app.title}
          {...app}
          focused={focused}
          setFocused={setFocused}
        />
      ))}

      {AppsOnDesktop.map((app, index) => (
        <DesktopIcon
          key={app.id}
          icon={app.icon}
          isDraggable
          onDoubleClick={() => addApp({ name: app.id })}
          width={80}
          height={80}
          defaultPosition={{ x: 10, y: 100 * index + 10 }}
          title={app.title}
          id={app.id}
        />
      ))}
    </>
  );
}
