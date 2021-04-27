import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getRoutes, updatePath, updateTree } from "../helper";
import { IFile, IFolderRoutes } from "../interfaces";
import { getDefaultRoutes } from "./routes";
import { Draft } from "immer";

interface IBaseState {
  root: IFile;
  routes: IFolderRoutes[];
  user: string;
}

const goToPath = (root: Draft<IBaseState["root"]>, route: string) => {
  const splits = route.split("/");
  let x = root;
  let parent = root;
  splits.forEach((dSplit) => {
    let split = dSplit;
    if (split === "") {
      x = root!;
      return;
    }
    parent = x;
    x = x.files![split];
  });

  if (!x.files) {
    x.files = {};
  }

  return { currentFile: x, parent };
};

const initialState: IBaseState = {
  root: getDefaultRoutes(),
  routes: [],
  user: "",
};

const folderSlice = createSlice({
  name: "folder",
  initialState,
  reducers: {
    initRoutes: (state, action: PayloadAction<string>) => {
      state.root["files"]!["users"]["files"]![action.payload] = {
        ...state.root["files"]!["users"]["files"]!["home"],
        id: action.payload,
      };
      delete state.root["files"]!["users"]["files"]!["home"];
      state.routes = getRoutes(state.root, action.payload);
      state.user = action.payload;
    },
    createFolder: (
      state,
      { payload }: PayloadAction<{ route: string; user: string }>
    ) => {
      let { currentFile } = goToPath(state.root, payload.route);

      let i = 0;
      let name = "new folder";
      let found = false;
      let files = Object.values(currentFile.files!);
      while (!found) {
        const tempName = name + (i === 0 ? "" : " " + i);
        const x = files.filter(
          (f) => f.name === name + (i === 0 ? "" : " " + i)
        );
        if (x.length === 0) {
          found = true;
          name = tempName;
        }
        i++;
      }

      currentFile.files![name] = {
        name,
        id: name,
        appName: "folder",
        icon: "",
        isFolder: true,
        parent: payload.route,
        path: payload.route + "/" + name,
        files: {},
      };
      state.routes = getRoutes(state.root, payload.user);
    },
    renameFolder: (
      state,
      { payload }: PayloadAction<{ name: string; route: string }>
    ) => {
      let { currentFile, parent } = goToPath(state.root, payload.route);
      const oldName = currentFile.name;
      currentFile.name = payload.name;
      currentFile.path = updatePath(currentFile.path, -1, currentFile.name);

      currentFile = updateTree(currentFile);
      parent.files![currentFile.name] = currentFile;
      delete parent.files![oldName];

      state.routes = getRoutes(state.root, state.user);
    },
    deleteFolder: (
      state,
      { payload }: PayloadAction<{ name: string; route: string }>
    ) => {
      let { parent } = goToPath(state.root, payload.route);
      if (parent["files"]) {
        delete parent["files"][payload.name];
        state.routes = getRoutes(state.root, state.user);
      }
    },
  },
});

export const {
  initRoutes,
  createFolder,
  renameFolder,
  deleteFolder,
} = folderSlice.actions;
export default folderSlice.reducer;
