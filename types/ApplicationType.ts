import type { LazyExoticComponent, ComponentType } from "react";

interface App {
  Node: LazyExoticComponent<ComponentType<any>>;

  title: string;

  start?: number;

  x?: number;
  y?: number;
  width?: number;
  height?: number;

  minimized: boolean;
}

export type { App };
