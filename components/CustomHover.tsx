import clsx from "clsx";
import { useState } from "react";

interface Props {
  children: React.ReactNode;
  text: string;
  disabled?: boolean;
  justify?: string;
  position?: string;
  offset?: number;
}

export default function CustomHover({
  children,
  text,
  disabled,
  justify,
  position,
}: Props) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={clsx("flex items-start relative", {
        "justify-center": justify === "center",
        "justify-end": justify === "end",
      })}
    >
      {hover && !disabled && (
        <div
          className={clsx(
            "absolute whitespace-nowrap bg-fuchsia-200 px-2 py-1 rounded border-2 border-cpurple text-cpurple",
            { "top-[-48px]": position === "top" },
            { "bottom-[-48px]": position === "bot" }
          )}
        >
          {text}
        </div>
      )}
      {children}
    </div>
  );
}
