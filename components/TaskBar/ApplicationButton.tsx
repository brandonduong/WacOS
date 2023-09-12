import { animate } from "framer-motion";
import { useWindowSize } from "react-use";
import { useWindowContext } from "../Application/helper";
import { useApps } from "@/hooks/useApp";

export default function ApplicationButton({ title }: { title: string }) {
  const { apps, getIndex, setMinimized } = useApps();
  const { width, height } = useWindowSize();
  const app = apps[getIndex(title)];

  function isVisible() {
    return !apps[getIndex(title)].minimized;
  }

  function handleClick() {
    let newX, newY;
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
    } else {
      newX =
        100 + 100 + 200 * getIndex(title) - apps[getIndex(title)].width! / 2;
      newY = height;
      animate(
        `#${title}`,
        {
          y: height,
          x:
            100 +
            100 +
            200 * getIndex(title) -
            apps[getIndex(title)].width! / 2, // 100 for start button, 100 for half a task bar button
        },
        { type: "spring" }
      );
      setMinimized(title, true);
    }
  }

  return (
    <div className="mr-2 text-indigo-600">
      <button
        className="p-1 border-t-indigo-600 border-l-indigo-600 border-2 hover:bg-red-200 capitalize w-48 text-start"
        onClick={handleClick}
      >
        {title}
      </button>
    </div>
  );
}
