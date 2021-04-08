// folder structure
export interface IFile {
  // current path
  path: string;
  // is copy/duplicate of
  symlink?: string;
  name: string;
  icon: string;
  // useful for drag files/folder into folder
  // default behavoiur of opening other layout
  isFolder: boolean;
}

// everything is a folder
// it's start with a root directory which can have
// users and other stuff
// user will have Desktop, Applications, Settings etc.
// Folder will behave as base for OS to run
export interface IFolder extends IFile {
  children: IFile[];
}

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
