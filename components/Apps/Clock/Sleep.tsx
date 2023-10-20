import CustomHover from "@/components/CustomHover";
import { ENERGY_BOOSTS, TIME, Time } from "@/contexts/GameContext";
import { useApps } from "@/hooks/useApp";
import { useGame } from "@/hooks/useGame";
import clsx from "clsx";
import Image from "next/image";

interface Props {
  newTime: Time;
}
export default function Sleep({ newTime }: Props) {
  const { setTimeTo, nextDay, time } = useGame();
  const { removeApp } = useApps();
  const disabled = newTime !== "morning" && TIME[time] >= TIME[newTime];

  function handleClick() {
    setTimeTo(newTime);
    if (newTime === "morning") {
      nextDay();
    }
    removeApp("clock"); // Close window after sleeping
  }

  function calculateBoost() {
    switch (TIME[newTime] - TIME[time]) {
      case 1:
        return ENERGY_BOOSTS.rest1;
      case 2:
        return ENERGY_BOOSTS.rest2;
      default:
        return 100;
    }
  }

  return (
    <CustomHover text={`Energy: +${calculateBoost()}`} disabled={disabled}>
      <button
        className={clsx("flex flex-col items-center hover:cursor-pointer", {
          "contrast-50 hover:cursor-disabled": disabled,
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
    </CustomHover>
  );
}
