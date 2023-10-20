import DesktopIcon from "@/components/DesktopIcon";
import { AppsOnDesktop } from "../../constants/desktop";

// hooks
import { useApps } from "../../hooks/useApp";
import Application from "../Application";
import { useState } from "react";

export default function Desktop() {
  const { apps, addApp } = useApps();

  return (
    <>
      {apps.map((app) => (
        <Application key={app.title} {...app} />
      ))}

      {AppsOnDesktop.map((app, index) => (
        <DesktopIcon
          key={app.id}
          icon={app.icon}
          isDraggable
          onDoubleClick={() =>
            addApp({ name: app.id, title: app.title, scroll: app.scroll })
          }
          width={80}
          height={80}
          defaultPosition={{ x: 10, y: 100 * index + 10 }}
          title={app.title}
          id={app.id}
        />
      ))}
      <DesktopIcon
        icon={"/icons/coffee.png"}
        isDraggable
        onDoubleClick={() =>
          window.open("https://ko-fi.com/brandonduong", "_blank")
        }
        width={80}
        height={80}
        defaultPosition={{ x: 10, y: 100 * AppsOnDesktop.length + 10 }}
        title={"Ko-fi"}
        id={"ko-fi"}
      />
    </>
  );
}
