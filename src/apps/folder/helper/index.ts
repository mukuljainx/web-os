import { IFolderRoutes, IFile } from "../interfaces";
import { interpolate } from "utils/string";
import { Draft } from "immer";

export const getPath = (file: IFile, user: string) => {
  const path = `${file.parent === "/" ? "" : file.parent}/${file.name}`;
  return interpolate(path, { user });
};

export const updatePath = (route: string, dIndex: number, a: string) => {
  const splits = route.split("/");
  const index = dIndex < 0 ? splits.length + dIndex : dIndex;
  // splits[0] = "/";
  splits[index] = a;
  return splits.join("/");
};

export const updateTree = (root: Draft<IFile>) => {
  if (root.files) {
    Object.values(root.files).forEach((file) => {
      file.parent = root.path;
      file.path = file.parent + "/" + file.name;
      file = updateTree(file);
    });
  }

  return root;
};

export const getRoutes = (root: IFile, user: string): IFolderRoutes[] => {
  const inner = (root: IFile, user: string) => {
    let routes: IFolderRoutes[] = [];
    Object.values(root.files || {}).forEach((file: IFile) => {
      if (file.isFolder) {
        routes.push({
          path: getPath(file, user),
          files: Object.values(file.files || {}),
          file,
        });
        routes.push(...inner(file, user));
      }
    });

    return routes;
  };

  return [
    ...inner(root, user),
    { path: "/", file: root, files: Object.values(root.files || {}) },
  ];
};
