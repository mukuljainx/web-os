import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getRoutes } from "../helper";
import { IFile, IFolderRoutes } from "../interfaces";
import { getDefaultRoutes } from "./routes";

interface IBaseState {
  root: IFile;
  routes: IFolderRoutes[];
}

const initialState: IBaseState = {
  root: getDefaultRoutes(),
  routes: [],
};

const folderSlice = createSlice({
  name: "folder",
  initialState,
  reducers: {
    initRoutes: (state, action: PayloadAction<string>) => {
      state.routes = getRoutes(state.root, action.payload);
    },
    createFolder: (
      state,
      { payload }: PayloadAction<{ route: string; user: string }>
    ) => {
      // const path = getPath(payload);
      const splits = payload.route.split("/");
      let x = state.root;
      splits.forEach((dSplit) => {
        let split = dSplit;
        if (split === payload.user.replace(" ", "-")) {
          debugger;
          split = "home";
        }
        if (split === "") {
          x = state.root!;
          return;
        }
        x = x.files![split];
      });

      if (!x.files) {
        x.files = {};
      }

      let i = 0;
      let name = "new folder";
      let found = false;
      let files = Object.values(x.files);
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

      x.files[name] = {
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
    // renameFolder: (
    //   state,
    //   { payload }: PayloadAction<{ name: string; id: string; route: string }>
    // ) => {},
  },
});

export const { initRoutes, createFolder } = folderSlice.actions;
export default folderSlice.reducer;
