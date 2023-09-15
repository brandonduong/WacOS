import type { LazyExoticComponent, ComponentType } from "react";

interface App {
  Node: LazyExoticComponent<ComponentType<any>>;

  name: string; // name to use
  title: string; // id

  start?: number;

  x?: number;
  y?: number;
  width?: number;
  height?: number;

  minimized: boolean;
  scroll: boolean;
}

export type { App };
