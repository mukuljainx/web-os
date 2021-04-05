import { IFolderRoutes, IFile } from "base/interfaces";
import { interpolate } from "utils/string";

export const getPath = (file: IFile, user: string) => {
  const path = `${file.parent === "/" ? "" : file.parent}/${file.name}`;
  return interpolate(path, { user }).replace(" ", "-");
};

export const getRoutes = (root: IFile, user: string): IFolderRoutes[] => {
  let routes: IFolderRoutes[] = [];
  root.files!.forEach((file: IFile) => {
    if (file.isFolder) {
      routes.push({ path: getPath(file, user), files: file.files! });
      routes.push(...getRoutes(file, user));
    }
  });

  return routes;
};
