import Image from "next/image";
import { IAppIconProps } from "./types";
import { useRef, useState } from "react";
import { useDragControls, motion } from "framer-motion";
import { useClickAway } from "react-use";
import clsx from "clsx";
import { animate } from "framer-motion";
import { useWindowSize } from "react-use";

export default function DesktopIcon({
  onDoubleClick,
  defaultPosition,
  isDraggable,
  title,
  width = 80,
  height = 80,
  icon,
  id,
}: IAppIconProps) {
  const [showAppBg, setShowAppBg] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const controls = useDragControls();

  const wWidth = useWindowSize().width;
  const wHeight = useWindowSize().height;

  const onClickContent = () => {
    const isDoubleClick = clickCount === 1;

    if (isDoubleClick) {
      onDoubleClick?.();
    }

    const timeout = setTimeout(() => {
      setClickCount(0);
    }, 300);

    setClickCount((prev) => {
      if (prev === 1) {
        setShowAppBg(false);
        return 0;
      }
      setShowAppBg(true);
      return 1;
    });

    return () => clearTimeout(timeout);
  };

  useClickAway(ref, () => {
    setClickCount(0);
    setShowAppBg(false);
  });

  const onDragEnd = (
    z: PointerEvent,
    e: { point: { x: number; y: number } }
  ) => {
    const TASKBAR_HEIGHT = 50;

    const { x, y } = e.point;
    if (y > wHeight - TASKBAR_HEIGHT - height) {
      animate(`#icon-${id}`, { y: wHeight - height * 2 });
    } else if (y < height) {
      animate(`#icon-${id}`, { y: 0 });
    }

    if (x > wWidth - width) {
      animate(`#icon-${id}`, { x: wWidth - width * 2 });
    } else if (x < width) {
      animate(`#icon-${id}`, { x: 0 });
    }
  };

  return (
    <>
      <motion.div
        drag={isDraggable}
        initial={defaultPosition}
        dragControls={controls}
        dragMomentum={false}
        ref={ref}
        onClickCapture={onClickContent}
        onDragEnd={onDragEnd}
        className={clsx(
          "flex h-fit w-fit flex-col items-center justify-center p-2",
          {
            "bg-black": showAppBg,
          }
        )}
        id={`icon-${id}`}
      >
        <div
          style={{
            width: width * 0.8,
            height: width * 0.8,
            backgroundImage: `url(${icon})`,
          }}
          className={clsx(`bg-contain bg-center bg-no-repeat`)}
        />
        <strong
          style={{ width: width * 1.2, fontSize: "0.85rem" }}
          className={clsx("break-words text-center", {
            "text-white": showAppBg,
            "text-black": !showAppBg,
          })}
        >
          {title}
        </strong>
      </motion.div>
    </>
  );
}
