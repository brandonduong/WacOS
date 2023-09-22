import { useWindowSize } from "react-use";
import JobButton from "./JobButton";
import { useGame } from "@/hooks/useGame";
import { useState, useEffect } from "react";
import { useWindow } from "@/contexts/WindowContext";

export default function Internet() {
  const { height } = useWindowSize();
  const { jobs } = useGame();
  const [selected, setSelected] = useState(jobs[0].id);

  const { setIsResizable } = useWindow();
  const selectedJob = jobs.find((job) => job.id === selected);

  useEffect(() => {
    setIsResizable(true);
  }, []);

  function parseJob() {
    return selectedJob!.message.replaceAll(
      "[Fake Recruiter Name]",
      selectedJob!.author
    );
  }

  return (
    <div className="grid grid-cols-5 gap-2 h-full">
      <div className="col-span-2 grid grid-cols-1 auto-rows-min gap-2">
        {jobs.map((job) => (
          <>
            <JobButton
              key={`${job.id}`}
              job={job}
              selected={selected === job.id}
              handleClick={() => setSelected(job.id)}
            />
          </>
        ))}
      </div>
      <div
        className="col-span-3 bg-fuchsia-200 border-2 border-cpurple p-2 text-cpurple"
        style={{ minHeight: `${Math.round((height * 2) / 5)}px` }}
      >
        {selectedJob && (
          <>
            <div style={{ color: "rgb(94, 178, 222)" }}>
              {selectedJob.title}
            </div>
            <div>
              {parseJob()
                .split("\n")
                .map((line) => (
                  <div key={line} className="mt-4">
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
