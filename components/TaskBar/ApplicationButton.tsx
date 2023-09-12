import { animate } from "framer-motion";
import { useWindowSize } from "react-use";
import { useWindowContext } from "../Application/helper";
import { useApps } from "@/hooks/useApp";

export default function ApplicationButton({ title }: { title: string }) {
  const { apps, getIndex, setXY } = useApps();
  const { width, height } = useWindowSize();
  const app = apps[getIndex(title)];

  function isVisible() {
    return (
      (app &&
        app.x &&
        app.y &&
        app.x > 0 &&
        app.x < width &&
        app.y > 0 &&
        app.y < height) ||
      !app.x ||
      !app.y
    );
  }

  function handleClick() {
    let newX, newY;
    if (!isVisible()) {
      newX = (width - app.width!) / 2;
      newY = (height - app.height!) / 2;
      animate(
        `#${title}`,
        {
          x: newX,
          y: newY,
        },
        { type: "spring" }
      );
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
    }
    setXY(title, newX, newY);
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
