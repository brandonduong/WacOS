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

function Application({ Node, ...props }: IApplicationProps) {
  const { getIndex, removeApp, setSize, apps, setXY } = useApps();

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
    setXY(props.title, newX, newY);
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
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

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
        style={{
          width: isFullscreen ? "100vw" : initialSize.width,
          height: isFullscreen ? "calc(100vh - 50px)" : initialSize.height,
        }}
        className={clsx(
          "z-10 flex flex-col items-center rounded-lg border-[6px] border-black"
        )}
      >
        <div
          className="z-30 mt-0 flex h-8 w-full select-none items-center border-2 border-black bg-black text-white"
          onPointerDown={move}
        >
          <strong
            className={clsx("ml-auto block capitalize", {
              "opacity-0": loading === true,
            })}
          >
            {props.title}
          </strong>

          <div className="ml-auto flex w-fit gap-2">
            <button
              className="flex h-6 w-6 items-center justify-center bg-white text-2xl text-black"
              onClick={minimize}
            >
              -
            </button>
            {isResizable && (
              <button
                onClick={handleFullscreen}
                className="flex h-6 w-6 items-center justify-center bg-white text-2xl text-black"
              >
                =
              </button>
            )}
            <button
              className="flex h-6 w-6 items-center justify-center bg-white text-2xl text-black"
              onClick={close}
            >
              x
            </button>
          </div>
        </div>

        <div
          className={clsx(
            "flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-md bg-white"
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
