// drag and drop icons

export type Coordinates = { x: number; y: number };
export type MoveHandler = (param: Coordinates) => void;
export type ElementHandler = (param: {
  coordinates: Coordinates;
  start: MoveHandler;
  move: MoveHandler;
  stop: Noop;
  unselect: Noop;
  multiple: boolean;
  id: string;
}) => void;
