import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteChildren, refreshRoutes } from "./helper";
import { IFolder, IFolderRoutes, IFile } from "../interfaces";
import { folderPool, folderMap } from "./routes";
import { sortBy, get } from "lodash-es";
import { getAppsAsync } from "apps/appManager/store";
import { IApp } from "apps/appManager/interface";

export interface IBaseState {
  folderPool: Record<string, IFolder>;
  root: IFile;
  routes: IFolderRoutes[];
  folderToRoute: Record<string, string>;
  routeToFolder: Record<string, string>;
  user: string;
}

const initialState: IBaseState = {
  folderPool,
  root: folderMap,
  routes: [],
  user: "",
  folderToRoute: {},
  routeToFolder: {},
};

const folderSlice = createSlice({
  name: "folder",
  initialState,
  reducers: {
    initRoutes: (state, action: PayloadAction<string>) => {
      // update the folder map
      // replace home with user name
      // state.root["files"]!["users"]["files"]![action.payload] = {
      //   ...state.root["files"]!["users"]["files"]!["home"],
      //   data: { id: action.payload },
      // };
      // delete state.root["files"]!["users"]["files"]!["home"];
      // get routes
      state.user = action.payload;
      refreshRoutes(state);

      // update folder pool, with home to user name
      // these updates are to make this consistent
      state.folderPool[action.payload] = {
        ...state.folderPool["home"],
        id: action.payload,
      };
      Object.keys(state.folderPool).forEach((k) => {
        if (state.folderPool[k].parent === "home") {
          state.folderPool[k].parent = action.payload;
        }
      });
    },
    createFolder: (
      state,
      { payload }: PayloadAction<{ route: string; user: string }>
    ) => {
      const currentFile = get(
        state.root,
        state.routeToFolder[payload.route]
      ) as IFile;

      let i = 0;
      let name = "new folder";
      let found = false;
      let files = Object.values(currentFile.files!);
      while (!found) {
        const tempName = name + (i === 0 ? "" : " " + i);
        const x = files.filter(
          (f) =>
            state.folderPool[f.data.id].name === name + (i === 0 ? "" : " " + i)
        );
        if (x.length === 0) {
          found = true;
          name = tempName;
        }
        i++;
      }

      const id = `folder-${new Date().getTime()}`;

      currentFile.files![id] = {
        appName: "folder",
        data: { id },
        files: {},
        order: Object.keys(currentFile.files || {}).length,
        sortBy: "name",
      };
      state.folderPool[id] = {
        name,
        id: id,
        icon: "",
        parent: currentFile.data.id,
        createdOn: new Date().getTime(),
        updatedOn: new Date().getTime(),
      };

      refreshRoutes(state);
    },
    renameFolder: (
      state,
      { payload }: PayloadAction<{ name: string; route: string }>
    ) => {
      const currentFile = get(
        state.root,
        state.routeToFolder[payload.route]
      ) as IFile;

      const fileDetails = state.folderPool[currentFile.data.id];
      fileDetails.name = payload.name;
      fileDetails.updatedOn = new Date().getTime();
      refreshRoutes(state);
    },
    deleteFolder: (
      state,
      { payload }: PayloadAction<{ fileId: string; route: string }>
    ) => {
      const currentFile = get(
        state.root,
        state.routeToFolder[payload.route]
      ) as IFile;
      const treePathArray = state.routeToFolder[payload.route].split(".");
      const parent = get(
        state.root,
        treePathArray.slice(0, treePathArray.length - 2).join(".")
      ) as IFile;

      state.folderPool[parent.data.id].updatedOn = new Date().getTime();
      if (currentFile.appName === "folder") {
        deleteChildren(currentFile, state.folderPool);
        delete state.folderPool[payload.fileId];
      }
      delete parent.files![payload.fileId];

      refreshRoutes(state);
    },
    sortFolder: (
      state,
      {
        payload,
      }: PayloadAction<{
        route: string;
        sortKey: IFile["sortBy"];
      }>
    ) => {
      const currentFile = get(
        state.root,
        state.routeToFolder[payload.route]
      ) as IFile;

      if (currentFile.appName !== "folder") {
        console.error(
          `Current file: ${currentFile.data.id} is not a folder but a ${currentFile.appName}`
        );
        return;
      }

      let filesArray = Object.values(currentFile.files || {});
      if (filesArray.length) {
        currentFile.sortBy = payload.sortKey;
        const sorted = sortBy(
          filesArray.map((f) => state.folderPool[f.data.id]),
          [payload.sortKey!]
        );

        sorted.forEach((f, i) => {
          currentFile.files![f.id].order = i;
        });
      }
      refreshRoutes(state);
    },
  },
  extraReducers: {
    [getAppsAsync.fulfilled.type]: (
      state,
      { payload }: PayloadAction<IApp[]>
    ) => {
      //data: {
      //   id: "img2",
      //   name: "lady.jpg",
      //   icon: "image",
      //   path: "lady.jpg",
      // },
      // appName: "photo",
      // order: 1,
      const applicationsFolder = get(
        state.root,
        state.routeToFolder["/applications"]
      ).files;
      const startingOrder = Object.keys(applicationsFolder).length;
      payload.forEach((customApp, index) => {
        applicationsFolder[customApp.appId] = {
          data: {
            appId: customApp.appId,
            icon: customApp.icon,
            name: customApp.name,
            appType: "EXTERNAL",
            options: customApp.options,
          },
          appName: customApp.appId,
          order: startingOrder + index,
        };
      });
      refreshRoutes(state);
    },
  },
});

export const {
  initRoutes,
  createFolder,
  renameFolder,
  deleteFolder,
  sortFolder,
} = folderSlice.actions;
export default folderSlice.reducer;
