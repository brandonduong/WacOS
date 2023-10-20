import { useGame } from "@/hooks/useGame";
import clsx from "clsx";
import { useEffect } from "react";

export default function Messenger() {
  const { messages, setReadMessages } = useGame();

  setReadMessages(true);

  return (
    <div className="bg-messenger bg-repeat-y bg-cover p-2">
      {messages.map((message, ind) => (
        <div
          key={`message-${ind}`}
          className={clsx("flex mb-2", {
            "justify-end": message.outgoing,
          })}
        >
          <div
            className={clsx(
              "w-4/5 rounded py-1 px-2 text-cpurple",
              {
                "text-end bg-fuchsia-200": message.outgoing,
              },
              { "bg-cyan-200": !message.outgoing }
            )}
          >
            {message.message}
          </div>
        </div>
      ))}
    </div>
  );
}
