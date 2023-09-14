import { useGame } from "@/hooks/useGame";
import Task from "./Task";

export default function TaskManager() {
  const { stats, setStats } = useGame();
  const { rejections: omitted, ...rest } = stats;
  const { rejections } = stats;

  return (
    <div>
      {Object.entries(rest).map(([key, value]) => (
        <Task key={key} title={key} value={value} />
      ))}
      <div onClick={() => setStats({ ...stats, energy: stats.energy - 1 })}>
        test
      </div>
    </div>
  );
}
