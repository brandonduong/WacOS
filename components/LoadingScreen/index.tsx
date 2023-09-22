export default function LoadingScreen() {
  return (
    <div className="flex flex-col min-h-screen bg-fuchsia-200 justify-between">
      <div>
        <div className="p-12 bg-fuchsia-300"></div>
        <div className="p-1 bg-fuchsia-100"></div>
      </div>
      <div className="flex flex-col items-center font-visitor text-fuchsia-300 text-6xl">
        Loading...
      </div>
      <div>
        <div className="p-1 bg-cyan-100"></div>
        <div className="p-12 bg-fuchsia-300"></div>
      </div>
    </div>
  );
}
