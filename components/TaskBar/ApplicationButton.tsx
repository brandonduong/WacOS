import { animate } from "framer-motion";
import { useApps } from "@/hooks/useApp";

export default function ApplicationButton({ title }: { title: string }) {
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
    <div className="mr-2 text-indigo-600">
      <button
        className="p-1 border-t-indigo-600 border-l-indigo-600 border-b-white border-r-white border-2 hover:bg-red-200 capitalize w-48 text-start"
        onClick={handleClick}
      >
        {title}
      </button>
    </div>
  );
}
