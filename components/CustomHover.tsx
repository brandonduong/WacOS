import { useState } from "react";

interface Props {
  children: React.ReactNode;
  text: string;
  disabled?: boolean;
}

export default function CustomHover({ children, text, disabled }: Props) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="flex justify-center relative"
    >
      {hover && !disabled && (
        <div className="absolute top-[-48px] whitespace-nowrap bg-fuchsia-200 px-2 py-1 rounded border-2 border-cpurple">
          {text}
        </div>
      )}
      {children}
    </div>
  );
}
