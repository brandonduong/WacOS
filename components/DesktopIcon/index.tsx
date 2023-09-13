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
  const [position, setPosition] = useState(defaultPosition);
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
    e: { point: { x: number; y: number }; offset: { x: number; y: number } }
  ) => {
    const TASKBAR_HEIGHT = 50;

    const { x, y } = e.point;

    let newX, newY;
    if (y > wHeight - TASKBAR_HEIGHT - height) {
      newY = wHeight - height * 2;
    } else if (y < height) {
      newY = 0;
    }

    if (x > wWidth - width) {
      newX = wWidth - width * 2;
    } else if (x < width) {
      newX = 0;
    }

    const condX = newX !== undefined ? newX : position!.x + e.offset.x;
    const condY = newY !== undefined ? newY : position!.y + e.offset.y;
    const nearestX = width * 1.2 + 16; // + 16 from padding
    const nearestY = height * 0.8 + 16 + 20; // + 20 from 1.25rem line height
    const newPos = {
      x: Math.round(condX * (1 / nearestX)) / (1 / nearestX) + 10,
      y: Math.round(condY * (1 / nearestY)) / (1 / nearestY) + 10,
    };
    console.log(newPos, width);
    animate(`#icon-${id}`, newPos);
    setPosition(newPos);
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
        style={{
          position: "absolute",

          width: "fit-content",
          height: "fit-content",
        }}
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
          className={clsx("break-words text-center text-purple", {
            "text-white": showAppBg,
          })}
        >
          {title}
        </strong>
      </motion.div>
    </>
  );
}
