import { IFolderRoutes, IFile } from "../interfaces";
import { interpolate } from "utils/string";

export const getPath = (file: IFile, user: string) => {
  const path = `${file.parent === "/" ? "" : file.parent}/${file.name}`;
  return interpolate(path, { user }).replace(" ", "-");
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
