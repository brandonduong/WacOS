import Sleep from "./Sleep";

export default function Clock() {
  return (
    <>
      <div className="flex items-center">
        <div className="p-4 w-20 rounded-full bg-fuchsia-200">
          <div
            className="bg-contain bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(/icons/clock.png)`,
              width: "3rem",
              height: "3rem",
            }}
          />
        </div>
        <span className="mb-4 pl-2 text-purple border-b-2 w-full leading-5 border-fuchsia-200 text-3xl text-cpurple">
          Sleep
        </span>
      </div>
      <div className="ml-20 mr-10 mb-5 pl-2 grid grid-cols-3 gap-8 text-cpurple">
        <Sleep newTime="noon" />
        <Sleep newTime="night" />
        <Sleep newTime="morning" />
      </div>
    </>
  );
}
