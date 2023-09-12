import type { LazyExoticComponent, ComponentType } from "react";

interface App {
  Node: LazyExoticComponent<ComponentType<any>>;
  title: string;

  start?: number;

  x?: number;
  y?: number;
}

export type { App };
