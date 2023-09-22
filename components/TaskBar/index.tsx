import { useApps } from "@/hooks/useApp";
import ApplicationButton from "./ApplicationButton";
import CustomButton from "../CustomButton";
import { useState } from "react";
import Date from "./Date";
import StartMenu from "./StartMenu";

export default function TaskBar() {
  const { apps } = useApps();

  const [start, setStart] = useState(false);

  function handleClick() {
    setStart(!start);
  }

  return (
    <div className="absolute font-visitor bottom-0 px-2 py-1 bg-fuchsia-200 w-screen border-white border-t-2 z-50 flex items-center justify-between">
      <div className="flex items-center">
        {start && <StartMenu />}
        <CustomButton
          handleClick={handleClick}
          title={"START"}
          clicked={start}
          className="px-6 mr-2"
        />

        <div className="mr-2 pr-1 border-2 border-b-cpurple border-r-cpurple border-t-white border-l-white h-8"></div>

        {apps.map((app) => (
          <ApplicationButton
            key={app.title}
            title={app.title}
            name={app.name}
          />
        ))}
      </div>

      <Date />
    </div>
  );
}
