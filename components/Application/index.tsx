import { useEffect, useState } from "react";
import { useApps } from "../../hooks/useApp";
import clsx from "clsx";
import AppWrapper from "./AppWrapper";
import { IApplicationProps } from "./types";
import { WindowProvider } from "../../contexts/WindowContext";
import { useWindowContext } from "./helper";
import Draggable from "./Draggable";
import { useWindowSize } from "react-use";

function Application({ Node, ...props }: IApplicationProps) {
  const { removeApp, setSize, focused, setForwardsHistory, minimize, setXY } =
    useApps();

  const { isResizable, setIsResizable, initialSize, setInitialSize } =
    useWindowContext();

  const [drag, setDrag] = useState(false);
  const [mouse, setMouse] = useState<PointerEvent>();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [loading, setLoading] = useState(true);

  const { width, height } = useWindowSize();

  const move = (event: any) => {
    setMouse(event);
    setDrag(true);
  };

  const close = () => {
    removeApp(props.title);
  };

  function handleFullscreen() {
    if (isFullscreen) {
      setSize(props.title, initialSize.width, initialSize.height);

      // Set to middle of screen
      setXY(
        props.title,
        width / 2 - initialSize.width / 2,
        height / 2 - initialSize.height / 2
      );
    } else {
      setSize(props.title, width, height);
      setXY(props.title, 0, 0);
    }
    setIsFullscreen((prev) => !prev);
    setDrag(false);
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  function handleClick() {
    setForwardsHistory(props.title);
  }

  return (
    <Draggable
      drag={!isFullscreen && drag}
      mouse={mouse}
      setDrag={setDrag}
      x={props.x}
      y={props.y}
      isFullscreen={isFullscreen}
      initialHeight={initialSize.height}
      initialWidth={initialSize.width}
      id={props.title}
    >
      <div
        onPointerDown={handleClick}
        style={{
          width: isFullscreen ? "100vw" : "100%",
          height: isFullscreen ? "calc(100vh - 50px)" : "100%",
        }}
        className={clsx(
          "z-10 flex flex-col items-center border-2 border-purple pt-1 px-1 drop-shadow-3xl font-visitor select-none",
          { "bg-cyan-200": focused === props.title },
          { "bg-slate-200": focused !== props.title }
        )}
      >
        <div
          className={clsx(
            "z-30 mt-0 flex w-full select-none items-center border-2 border-purple text-purple mb-1",
            { "bg-fuchsia-200": focused === props.title },
            { "bg-slate-200": focused !== props.title }
          )}
          onPointerDown={move}
          onPointerUp={() => setDrag(false)}
        >
          <div className="mx-1 h-4 w-4 bg-purple"></div>
          <span
            className={clsx("block capitalize", {
              "opacity-0": loading === true,
            })}
          >
            {props.title}
          </span>

          <div className="ml-auto flex w-fit gap-1 p-1">
            <button
              className={clsx(
                "flex h-5 w-5 pl-[2px] pb-[1px] items-center justify-center border-2 border-purple text-2xl",
                {
                  "bg-fuchsia-200 hover:bg-fuchsia-100":
                    focused === props.title,
                },
                { "bg-slate-200 hover:bg-slate-100": focused !== props.title }
              )}
              onClick={() => minimize(props.title)}
            >
              -
            </button>
            {isResizable && (
              <button
                onClick={handleFullscreen}
                className={clsx(
                  "flex h-5 w-5 pl-[2px] pb-[1px] items-center justify-center border-2 border-purple text-2xl",
                  {
                    "bg-fuchsia-200 hover:bg-fuchsia-100":
                      focused === props.title,
                  },
                  { "bg-slate-200 hover:bg-slate-100": focused !== props.title }
                )}
              >
                =
              </button>
            )}
            <button
              className={clsx(
                "flex h-5 w-5 pl-[3.5px] items-center justify-center border-2 border-purple text-4xl",
                {
                  "bg-fuchsia-200 hover:bg-fuchsia-100":
                    focused === props.title,
                },
                { "bg-slate-200 hover:bg-slate-100": focused !== props.title }
              )}
              onClick={close}
            >
              x
            </button>
          </div>
        </div>
        <div
          className={clsx(
            "flex w-full flex-col items-center justify-center overflow-hidden border-2 border-purple bg-white",
            { "h-full": isFullscreen }
          )}
        >
          <WindowProvider
            appId={props.title}
            setIsResizable={setIsResizable}
            isFullscreen={isFullscreen}
            initialSize={initialSize}
            setInitialSize={setInitialSize}
          >
            <div
              className={clsx(
                "h-full w-full p-2",
                loading ? "opacity-0" : "opacity-100"
              )}
            >
              <AppWrapper Node={Node} appID={props.title} />
            </div>
          </WindowProvider>
        </div>

        <div className="flex w-full">
          <div className="mt-2 mr-1 px-6 pb-1 border-t-2 border-x-2 border-purple bg-fuchsia-300"></div>
          <div className="mt-2 mb-1 mr-1 pl-1 pt-1 border-2 border-purple"></div>
          <div className="mt-2 mb-1 mr-1 pl-1 pt-1 border-2 border-purple"></div>
          <div className="mt-2 mb-1 mr-1 pl-1 pt-1 border-2 border-purple"></div>
        </div>
      </div>
    </Draggable>
  );
}

export default Application;
