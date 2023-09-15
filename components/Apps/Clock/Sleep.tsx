import { TIME, Time } from "@/contexts/GameContext";
import { useApps } from "@/hooks/useApp";
import { useGame } from "@/hooks/useGame";
import clsx from "clsx";
import Image from "next/image";

interface Props {
  newTime: Time;
}
export default function Sleep({ newTime }: Props) {
  const { setTime, nextDay, time } = useGame();
  const { removeApp } = useApps();
  const disabled = newTime !== "morning" && TIME[time] >= TIME[newTime];

  function handleClick() {
    setTime(newTime);
    if (newTime === "morning") {
      nextDay();
    }
    removeApp("clock"); // Close window after sleeping
  }

  return (
    <button
      className={clsx("flex flex-col items-center", {
        "contrast-50": disabled,
      })}
      onClick={handleClick}
      disabled={disabled}
    >
      <Image
        src={`/icons/${newTime}.png`}
        width={48}
        height={48}
        alt={newTime}
        draggable={false}
        className="mb-2"
      />
      <span className="leading-3">Sleep Until</span>
      <span className="leading-3 capitalize">{newTime}</span>
    </button>
  );
}
