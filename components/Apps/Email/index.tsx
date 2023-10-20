import { useWindow } from "@/contexts/WindowContext";
import { useGame } from "@/hooks/useGame";
import { useEffect, useState } from "react";
import EmailButton from "./EmailButton";
import { useWindowSize } from "react-use";

export default function Email() {
  const { emails } = useGame();
  const [selected, setSelected] = useState("");
  const { setIsResizable } = useWindow();
  const selectedEmail = emails.find((email) => email.id === selected);
  const { height } = useWindowSize();

  useEffect(() => {
    setIsResizable(true);
  }, []);

  function parseEmail() {
    return selectedEmail!.message.replaceAll(
      "[Fake Recruiter Name]",
      selectedEmail!.author
    );
  }

  return (
    <div className="h-full">
      <div className="">
        {emails.map((email) => (
          <div className="mb-2" key={`${email.author}-${email.subject}`}>
            <EmailButton
              author={email.author}
              message={email.message}
              subject={email.subject}
              opened={email.opened}
              selected={selected === email.id}
              handleClick={() => {
                selected === email.id ? setSelected("") : setSelected(email.id);
              }}
            />
            {email.id === selected && (
              <div
                className="bg-fuchsia-200 border-2 border-t-0 border-cpurple p-2 text-cpurple"
                style={{ minHeight: `${Math.round((height * 2) / 5)}px` }}
              >
                {selectedEmail && (
                  <>
                    <div className="text-ccyan">{selectedEmail.subject}</div>
                    <div className="text-slate-400">{selectedEmail.author}</div>
                    <div>
                      {parseEmail()
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
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
