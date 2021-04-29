import { IFolderRoutes, IFile, IFolder } from "../interfaces";
import { interpolate } from "utils/string";
import { sortBy } from "lodash-es";
import { Draft } from "immer";
import { IBaseState } from "./index";

/**
 * Returns back the array of all possible routes from tree
 * also updates (mutates the draft) of tree
 * @param root
 * @param user
 * @returns
 */
export const getRoutes = (
  parent: IFile,
  user: string,
  folderPool: Record<string, IFolder>
) => {
  const routeToFolder: Record<string, string> = { "/": "" };
  const folderToRoute: Record<string, string> = { root: "/" };
  const inner = (
    root: IFile,
    user: string,
    parentPath: string,
    treePath: string
  ) => {
    let routes: IFolderRoutes[] = [];

    Object.values(root.files || {}).forEach((file: IFile) => {
      const path = interpolate(
        (parentPath === "/" ? parentPath : parentPath + "/") +
          folderPool[file.data.id].name,
        {
          user,
        }
      );
      routes.push({
        path,
        files: Object.values(sortBy(file.files, ["order"]) || {}),
        file,
      });

      if (file.symlink) {
        return;
      }

      routeToFolder[path] = `${treePath === "" ? "" : treePath + "."}files.${
        file.data.id
      }`;
      folderToRoute[file.data.id] = path;
      routes.push(...inner(file, user, path, routeToFolder[path]));
    });

    return routes;
  };

  const finalRoutes = [
    ...inner(parent, user, "/", ""),
    { path: "/", file: parent, files: Object.values(parent.files || {}) },
  ];

  return { routes: finalRoutes, routeToFolder, folderToRoute };
};

export const refreshRoutes = (state: Draft<IBaseState>) => {
  const x = getRoutes(state.root, state.user, state.folderPool);
  state.routes = x.routes;
  state.folderToRoute = x.folderToRoute;
  state.routeToFolder = x.routeToFolder;
};

export const deleteChildren = (
  file: Draft<IFile>,
  folderPool: Draft<IBaseState["folderPool"]>
) => {
  if (file.files) {
    Object.values(file.files).forEach((f) => {
      if (f.appName === "folder") {
        if (!f.symlink) {
          delete folderPool[f.data.id];
        }
        deleteChildren(f, folderPool);
      }
      delete file.files![f.data.id];
    });
  }
};
