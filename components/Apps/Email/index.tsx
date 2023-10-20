import { useWindow } from "@/contexts/WindowContext";
import { useGame } from "@/hooks/useGame";
import { useEffect, useState } from "react";
import EmailButton from "./EmailButton";
import { useWindowSize } from "react-use";
import { auth } from "@/firebase";
import { EmailType } from "@/contexts/GameContext";

export default function Email() {
  const { emails, readEmail } = useGame();
  const [selected, setSelected] = useState("");
  const { setIsResizable } = useWindow();
  const selectedEmail = emails.find((email) => email.id === selected);
  const { height } = useWindowSize();

  useEffect(() => {
    setIsResizable(true);
  }, []);

  function parseEmail(message: string, email: EmailType) {
    return message
      .replaceAll("[Fake Recruiter Name]", email.author)
      .replaceAll("[Applicant Name]", auth.currentUser!.displayName!)
      .replaceAll("[Position Name]", email.title!)
      .replaceAll("[Fake Company Name]", email.company!);
  }

  function handleClick(email: EmailType) {
    if (selected === email.id) {
      setSelected("");
    } else {
      setSelected(email.id);
      readEmail(email.id);
    }
  }

  return (
    <div className="h-full">
      <div className="">
        {emails.map((email) => (
          <div className="mb-2" key={`${email.author}-${email.subject}`}>
            <EmailButton
              author={email.author}
              message={parseEmail(email.message, email)}
              subject={parseEmail(email.subject, email)}
              opened={email.opened}
              selected={selected === email.id}
              handleClick={() => handleClick(email)}
            />
            {email.id === selected && (
              <div
                className="bg-fuchsia-200 border-2 border-t-0 border-cpurple p-2 text-cpurple"
                style={{ minHeight: `${Math.round((height * 2) / 5)}px` }}
              >
                {selectedEmail && (
                  <>
                    <div className="text-ccyan">
                      {parseEmail(email.subject, email)}
                    </div>
                    <div className="text-slate-400">{selectedEmail.author}</div>
                    <div>
                      {parseEmail(email.message, email)
                        .split("\n")
                        .map((line: string) => (
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
