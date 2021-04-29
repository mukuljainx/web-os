// everything is a file
// folder is a special file
// it's start with a root directory which can have
// users and other stuff
// user will have Desktop, Applications, Settings etc.

// base file (root) will behave as base for OS to run
export interface IFile {
  parent: string | null;
  id: string;
  // current path
  path: string;
  // is copy/duplicate of
  symlink?: string;
  name: string;
  icon: string;
  // useful for drag files/folder into folder
  // default behavoiur of opening other layout
  isFolder: boolean;
  files?: Record<string, IFile>;
  // app type, a folder, setting, video-player etc
  appName: string;
  safe?: boolean;
  sortBy: "NAME" | "DATE_CREATED";
  order: number;
}

export interface IFolderRoutes {
  path: string;
  files: IFile[];
  file: IFile;
}
