import { useWindowSize } from "react-use";
import JobButton from "./JobButton";
import { useGame } from "@/hooks/useGame";
import { useState, useEffect } from "react";
import { useWindow } from "@/contexts/WindowContext";
import CustomButton from "@/components/CustomButton";
import clsx from "clsx";
import { ENERGY_COSTS } from "@/contexts/GameContext";
import CustomHover from "@/components/CustomHover";

export default function Internet() {
  const { height } = useWindowSize();
  const { jobs, applyToJob, stats } = useGame();
  const [selected, setSelected] = useState(jobs[0].id);

  const { setIsResizable } = useWindow();
  const selectedJob = jobs.find((job) => job.id === selected);

  useEffect(() => {
    setIsResizable(true);
  }, []);

  function parseJob() {
    return selectedJob!.message
      .replaceAll("[Fake Recruiter Name]", selectedJob!.author)
      .replaceAll("[Position Name]", selectedJob!.title);
  }

  return (
    <div className="grid grid-cols-5 gap-2 h-full items-start">
      <div className="col-span-2 grid grid-cols-1 auto-rows-min gap-2">
        {jobs.map((job) => (
          <JobButton
            key={`${job.id}`}
            job={job}
            selected={selected === job.id}
            handleClick={() => setSelected(job.id)}
          />
        ))}
      </div>
      <div
        className="col-span-3 bg-fuchsia-200 border-2 border-cpurple p-2"
        style={{ minHeight: `${Math.round((height * 2) / 5)}px` }}
      >
        {selectedJob && (
          <>
            <div className="flex justify-between items-start">
              <div>
                <div className="text-ccyan">{selectedJob.title}</div>
                <div className="text-slate-400">{selectedJob.company}</div>
                <div className="text-slate-400">
                  {selectedJob.location} away
                </div>
                <div className="text-slate-400">{selectedJob.time} ago</div>
                <div className="text-slate-400">{selectedJob.author}</div>
              </div>
              <CustomHover
                text={`Energy: -${ENERGY_COSTS.apply}`}
                justify="end"
                position="bot"
              >
                <button
                  className={clsx(
                    "flex px-2 items-center justify-center border-2 border-cpurple text-cpurple text-2xl bg-fuchsia-200",
                    {
                      "hover:cursor-pointer hover:bg-fuchsia-100":
                        !selectedJob.applied,
                    },
                    {
                      "hover:cursor-disabled":
                        selectedJob.applied ||
                        stats.energy < ENERGY_COSTS.apply,
                    }
                  )}
                  onClick={() =>
                    !selectedJob.applied &&
                    stats.energy >= ENERGY_COSTS.apply &&
                    applyToJob(selected)
                  }
                >
                  {selectedJob.applied
                    ? "Applied"
                    : stats.energy >= ENERGY_COSTS.apply
                    ? "Apply"
                    : "No Energy"}
                </button>
              </CustomHover>
            </div>
            <div>
              {parseJob()
                .split("\n")
                .map((line) => (
                  <div key={line} className="mt-4 text-cpurple">
                    {line}
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
