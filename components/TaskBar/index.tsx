import { useApps } from "@/hooks/useApp";
import ApplicationButton from "./ApplicationButton";

export default function TaskBar() {
  const { apps } = useApps();

  return (
    <div className="absolute bottom-0 pl-2 py-1 bg-fuchsia-200 w-screen border-white border-t-2 z-50 flex items-center">
      <button className="py-1 px-6 border-t-white border-l-white border-b-indigo-600 border-r-indigo-600 border-2 hover:bg-red-200">
        START
      </button>

      <div className="ml-2 pr-2 border-l-2 border-black h-8"></div>

      {apps.map((app) => (
        <ApplicationButton key={app.title} title={app.title} />
      ))}
    </div>
  );
}
