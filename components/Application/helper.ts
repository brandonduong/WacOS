import { useState } from "react";
import { useWindowSize } from "react-use";

export function useWindowContext() {
  const screen = useWindowSize();
  const [isResizable, setIsResizable] = useState(false);
  const [initialSize, setInitialSize] = useState({
    width: (screen.width * 3) / 4,
    height: (screen.height * 3) / 4,
  });

  return {
    isResizable,
    setIsResizable,
    initialSize,
    setInitialSize,
  };
}
