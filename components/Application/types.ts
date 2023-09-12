import { App } from "../../types/ApplicationType";

interface IApplicationProps extends Omit<App, "start"> {
  focused: string;
  setFocused: (focused: string) => void;
}

export type { IApplicationProps };
