import { animate } from "framer-motion";
import { useApps } from "@/hooks/useApp";
import CustomButton from "../CustomButton";

export default function ApplicationButton({
  title,
  name,
}: {
  title: string;
  name: string;
}) {
  const { apps, getIndex, setMinimized, setForwardsHistory, minimize } =
    useApps();
  const app = apps[getIndex(title)];

  function isVisible() {
    return !apps[getIndex(title)].minimized;
  }

  function handleClick() {
    if (!isVisible()) {
      animate(
        `#${title}`,
        {
          x: app.x,
          y: app.y,
        },
        { type: "spring" }
      );
      setMinimized(title, false);

      setForwardsHistory(title);
    } else {
      minimize(title);
    }
  }

  return (
    <CustomButton
      handleClick={handleClick}
      title={
        <>
          <div className="mx-1 h-4 w-4 bg-cpurple"></div>
          {name}
        </>
      }
      clicked={!app.minimized}
      className="w-48 text-start"
    />
  );
}
