import {
  motion,
  useAnimationControls,
  useDragControls,
  useInView,
} from "framer-motion";
import { animate } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";
import { useWindowSize } from "react-use";

interface Props {
  children: React.ReactNode;

  drag: boolean;
  setDrag: (drag: boolean) => void;

  mouse?: PointerEvent;

  isFullscreen?: boolean;

  x?: number;
  y?: number;

  initialWidth: number;
  initialHeight: number;

  id: string;
}

export default function Draggable({
  children,
  x,
  y,
  drag,
  setDrag,
  mouse,
  initialHeight,
  initialWidth,
  isFullscreen,
  id,
}: Props) {
  const controls = useDragControls();
  const { width, height } = useWindowSize();

  useEffect(() => {
    if (drag && mouse && !isFullscreen) {
      controls.start(mouse);
    }
  }, [drag]);

  const onDragEnd = (
    z: PointerEvent,
    e: { point: { x: number; y: number } }
  ) => {
    const TASKBAR_HEIGHT = 50;

    const { x, y } = e.point;
    if (y > height - TASKBAR_HEIGHT) {
      animate(`#${id}`, { y: height - initialHeight }, { type: "spring" });
    } else if (y < 0) {
      animate(`#${id}`, { y: 0 }, { type: "spring" });
    }

    if (x > width) {
      animate(`#${id}`, { x: width - initialWidth }, { type: "spring" });
    } else if (x < 0) {
      animate(`#${id}`, { x: 0 }, { type: "spring" });
    }
    setDrag(false);
  };

  const initialPosition = useMemo(() => {
    if (x !== undefined && y !== undefined) {
      return {
        x: x,
        y: y,
      };
    }
    return {
      x: (width - initialWidth) / 2,
      y: (height - initialHeight) / 2,
    };
  }, [x, y, width, height]);

  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.1,
        x: initialPosition.x,
        y: initialPosition.y,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        x: isFullscreen ? 0 : initialPosition.x,
        y: isFullscreen ? 0 : initialPosition.y,
      }}
      transition={{
        duration: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96],
      }}
      drag={drag}
      onDragEnd={onDragEnd}
      dragControls={controls}
      dragMomentum={false}
      style={{
        position: "absolute",
        zIndex: 25,
        width: isFullscreen ? "100%" : "fit-content",
        height: isFullscreen ? "100%" : "fit-content",
      }}
      id={id}
    >
      {children}
    </motion.div>
  );
}
