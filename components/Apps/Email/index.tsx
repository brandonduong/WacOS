import { useWindow } from "@/contexts/WindowContext";
import { useEffect } from "react";

export default function Email() {
  const { setIsResizable } = useWindow();

  useEffect(() => {
    setIsResizable(true);
  }, []);

  return <>email</>;
}
