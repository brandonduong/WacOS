import { useGame } from "@/hooks/useGame";
import Image from "next/image";

export default function Date() {
  const { day, time } = useGame();

  return (
    <div className="px-2 py-1 border-2 border-t-cpurple border-l-cpurple border-b-white border-r-white flex items-center">
      <Image
        src={`/icons/${time}.png`}
        width={24}
        height={24}
        alt={time}
        draggable={false}
      />
      <span className="ml-4 mr-2 text-lg leading-4">DAY {day}</span>
    </div>
  );
}
