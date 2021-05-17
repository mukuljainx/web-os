// everything is a file
// folder is a special file
// it's start with a root directory which can have
// users and other stuff
// user will have Desktop, Applications, Settings etc.

// base file (root) will behave as base for OS to run
export interface IFile {
  data: Record<string, any>;
  symlink?: string;
  appName: "folder" | "photo" | "appManager";
  files?: Record<string, IFile>;
  // will exist on folder only
  sortBy?: "name" | "updatedOn" | "createdOn";
  order: number;
}

export interface IFolderRoutes {
  path: string;
  files?: IFile[];
  file: IFile;
}

export interface IFolder {
  parent: string | null;
  id: string;
  name: string;
  icon: string;
  safe?: boolean;
  createdOn: number;
  updatedOn: number;
}
