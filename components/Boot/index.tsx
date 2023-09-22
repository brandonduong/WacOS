import Image from "next/image";
import Signup from "./Signup";

export default function Boot() {
  return (
    <div className="flex flex-col min-h-screen bg-fuchsia-200 justify-between">
      <div>
        <div className="p-12 bg-fuchsia-300"></div>
        <div className="p-1 bg-fuchsia-100"></div>
      </div>
      <div className="flex flex-col items-center">
        <Image
          src={`/icons/morning.png`}
          width={120}
          height={120}
          alt={"avatar"}
          draggable={false}
          className="mb-2 border-4 border-fuchsia-300 rounded-3xl"
        />
        <Signup />
      </div>
      <div>
        <div className="p-1 bg-cyan-100"></div>
        <div className="p-12 bg-fuchsia-300"></div>
      </div>
    </div>
  );
}
