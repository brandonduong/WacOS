import { useEffect, useState } from "react";
import { useApps } from "../../hooks/useApp";
import clsx from "clsx";
import AppWrapper from "./AppWrapper";
import { IApplicationProps } from "./types";
import { WindowProvider } from "../../contexts/WindowContext";
import { useWindowContext } from "./helper";
import Draggable from "./Draggable";
import { animate } from "framer-motion";
import { useWindowSize } from "react-use";

function Application({
  Node,
  focused,
  setFocused,
  ...props
}: IApplicationProps) {
  const { getIndex, removeApp, setSize, apps, setMinimized } = useApps();

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

  const minimize = () => {
    const newX =
      100 +
      100 +
      200 * getIndex(props.title) -
      apps[getIndex(props.title)].width! / 2;
    const newY = height;
    animate(
      `#${props.title}`,
      {
        y: newY,
        x: newX, // 100 for start button, 100 for half a task bar button
      },
      { type: "spring" }
    );
    setMinimized(props.title, true);
  };

  function handleFullscreen() {
    if (isFullscreen) {
      setSize(props.title, initialSize.width, initialSize.height);
    } else {
      setSize(props.title, width, height);
    }
    setIsFullscreen((prev) => !prev);
    setDrag(false);
  }

  useEffect(() => {
    setFocused(props.title);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

  function handleClick() {
    setFocused(props.title);
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
      focused={focused}
    >
      <div
        onPointerDown={handleClick}
        style={{
          width: isFullscreen ? "100vw" : initialSize.width,
          height: isFullscreen ? "calc(100vh - 50px)" : initialSize.height,
        }}
        className={clsx(
          "z-10 flex flex-col items-center border-2 border-indigo-600 px-1 pb-2 pt-1",
          { "bg-cyan-200": focused === props.title },
          { "bg-slate-200": focused !== props.title }
        )}
      >
        <div
          className={clsx(
            "z-30 mt-0 flex w-full select-none items-center border-2 border-indigo-600 text-indigo-600 mb-1",
            { "bg-fuchsia-200": focused === props.title },
            { "bg-slate-200": focused !== props.title }
          )}
          onPointerDown={move}
        >
          <strong
            className={clsx("block capitalize", {
              "opacity-0": loading === true,
            })}
          >
            {props.title}
          </strong>

          <div className="ml-auto flex w-fit gap-1 p-1">
            <button
              className={clsx(
                "flex h-6 w-6 items-center justify-center border-2 border-indigo-600 text-2xl text-black",
                { "bg-fuchsia-200": focused === props.title },
                { "bg-slate-200": focused !== props.title }
              )}
              onClick={minimize}
            >
              -
            </button>
            {isResizable && (
              <button
                onClick={handleFullscreen}
                className={clsx(
                  "flex h-6 w-6 items-center justify-center border-2 border-indigo-600 text-2xl text-black",
                  { "bg-fuchsia-200": focused === props.title },
                  { "bg-slate-200": focused !== props.title }
                )}
              >
                =
              </button>
            )}
            <button
              className={clsx(
                "flex h-6 w-6 items-center justify-center border-2 border-indigo-600 text-2xl text-black",
                { "bg-fuchsia-200": focused === props.title },
                { "bg-slate-200": focused !== props.title }
              )}
              onClick={close}
            >
              x
            </button>
          </div>
        </div>

        <div
          className={clsx(
            "flex h-full w-full flex-col items-center justify-center overflow-hidden border-2 border-indigo-600 bg-white"
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
                "h-full w-full",
                loading ? "opacity-0" : "opacity-100"
              )}
            >
              <AppWrapper Node={Node} appID={props.title} />
            </div>
          </WindowProvider>
        </div>
      </div>
    </Draggable>
  );
}

export default Application;
