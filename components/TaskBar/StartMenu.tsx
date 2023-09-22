import { auth } from "@/firebase";
import { signOut } from "firebase/auth";

interface Props {
  title: string;
  onClick: () => void;
}

function StartButton({ title, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className="px-6 py-1 border-2 border-purple-300 border-t-white border-l-white bg-fuchsia-200 hover:bg-cpurple hover:text-white text-cpurple text-center"
    >
      {title}
    </div>
  );
}

export default function StartMenu() {
  function handleShutdown() {
    signOut(auth);
  }

  return (
    <div className="absolute bottom-11 left-0 border-b-2 border-b-white">
      <div className="flex items-stretch">
        <div className="w-2 bg-purple-300 border-t-2 border-r-2 border-t-white border-r-purple-300"></div>
        <div className="flex flex-col">
          <div className="px-6 py-1 border-2 border-purple-300 border-t-white border-l-white bg-purple-300 text-white text-center">
            {auth.currentUser?.displayName}
          </div>
          <StartButton
            title="Control Panel"
            onClick={() => console.log("settings")}
          />
          <StartButton title="Shut Down" onClick={handleShutdown} />
        </div>
      </div>
    </div>
  );
}
