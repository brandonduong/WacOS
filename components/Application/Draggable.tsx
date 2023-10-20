import { useApps } from "@/hooks/useApp";
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
  const { apps, getIndex, setXY, focused, history } = useApps();
  const app = apps[getIndex(id)];
  const controls = useDragControls();
  const { width, height } = useWindowSize();
  const ref = useRef<HTMLDivElement>(null);

  const hIndex = history.findIndex((h) => h === id);

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
    let newX, newY;
    if (y > height - TASKBAR_HEIGHT) {
      newY = height - TASKBAR_HEIGHT * 2;
    } else if (y < 0) {
      newY = 0;
    }

    if (x > width) {
      newX = width - TASKBAR_HEIGHT;
    } else if (x < TASKBAR_HEIGHT) {
      newX = 0;
    }

    // Fix bug where state change is same
    if (newX === app.x) {
      newX! += 0.1;
    }
    if (newY === app.y) {
      newY! += 0.1;
    }

    const refElement = ref?.current;
    if (refElement) {
      const coords = refElement.style.transform.match(
        /^translateX\((.+)px\) translateY\((.+)px\)/
      );

      if (coords?.length) {
        setXY(
          id,
          newX !== undefined ? newX : parseInt(coords[1]),
          newY !== undefined ? newY : parseInt(coords[2])
        );
      }
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
        zIndex: 10 * hIndex + 1,
        width: isFullscreen ? "100%" : "fit-content",
        height: isFullscreen ? "100%" : "fit-content",
      }}
      id={id}
      ref={ref}
    >
      {children}
    </motion.div>
  );
}
