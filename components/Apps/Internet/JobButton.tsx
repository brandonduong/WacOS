import { JobType } from "@/contexts/GameContext";
import clsx from "clsx";

interface Props {
  selected: boolean;
  job: JobType;
  handleClick: () => void;
}

export default function JobButton({ job, selected, handleClick }: Props) {
  return (
    <div
      className={clsx(
        "p-2 bg-fuchsia-200 border-2 flex flex-col",
        {
          "border-cpurple": selected,
        },
        { "border-purple-300": !selected }
      )}
      onClick={handleClick}
    >
      <div className="grid grid-cols-3">
        <span className="text-cpurple">{job.author}</span>
        <span
          className="truncate col-span-2 text-end"
          style={{ color: "rgb(94, 178, 222)" }}
        >
          {job.title}
        </span>
      </div>
      <div className="truncate text-slate-400">
        <span>{job.message}</span>
      </div>
    </div>
  );
}
