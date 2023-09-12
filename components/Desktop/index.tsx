import DesktopIcon from "@/components/DesktopIcon";
import { AppsOnDesktop } from "../../constants/desktop";

// hooks
import { useApps } from "../../hooks/useApp";

export default function Desktop() {
  const { addApp } = useApps();

  return (
    <>
      {AppsOnDesktop.map((app) => (
        <DesktopIcon
          key={app.id}
          icon={app.icon}
          isDraggable
          onDoubleClick={() => addApp({ name: app.id })}
          defaultPosition={{ x: 10, y: 10 }}
          title={app.title}
        />
      ))}
    </>
  );
}
