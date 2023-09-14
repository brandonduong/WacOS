import { useGame } from "@/hooks/useGame";
import Task from "./Task";

export default function TaskManager() {
  const { stats, setStats } = useGame();
  const { rejections: omitted, ...rest } = stats;
  const { rejections } = stats;

  return (
    <div className="grid gap-y-2">
      <Task title={"rejections"} value={rejections} />
      {Object.entries(rest).map(([key, value]) => (
        <Task key={key} title={key} value={value} graph />
      ))}
    </div>
  );
}
