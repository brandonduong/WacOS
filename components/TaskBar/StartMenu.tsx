import { getAuth, signOut } from "firebase/auth";

function StartButton({ title, onClick }: { title: string; onClick }) {
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
  const auth = getAuth();
  function handleShutdown() {
    signOut(auth);
  }

  return (
    <div className="absolute bottom-11 left-0 border-b-2 border-b-white">
      <div className="flex items-stretch">
        <div className="w-2 bg-purple-300"></div>
        <div className="flex flex-col">
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
