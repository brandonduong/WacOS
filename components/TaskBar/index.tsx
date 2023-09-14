import { useApps } from "@/hooks/useApp";
import ApplicationButton from "./ApplicationButton";
import CustomButton from "../CustomButton";
import { useState } from "react";

export default function TaskBar() {
  const { apps } = useApps();

  const [start, setStart] = useState(false);

  function handleClick() {
    console.log("show menu");
    setStart(!start);
  }

  return (
    <div className="absolute font-visitor bottom-0 pl-2 py-1 bg-fuchsia-200 w-screen border-white border-t-2 z-50 flex items-center">
      <CustomButton
        handleClick={handleClick}
        title={"START"}
        clicked={start}
        className="px-6"
      />

      <div className="ml-2 pr-2 border-l-2 border-black h-8"></div>

      {apps.map((app) => (
        <ApplicationButton key={app.title} title={app.title} />
      ))}
    </div>
  );
}
