import { animate } from "framer-motion";
import { useWindowSize } from "react-use";
import { useWindowContext } from "../Application/helper";
import { useApps } from "@/hooks/useApp";

export default function ApplicationButton({ title }: { title: string }) {
  const { apps, getIndex } = useApps();
  const { width, height } = useWindowSize();

  function handleClick() {
    const app = apps[getIndex(title)];
    animate(
      `#${title}`,
      {
        x: (width - app.width!) / 2,
        y: (height - app.height!) / 2,
      },
      { type: "spring" }
    );
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
