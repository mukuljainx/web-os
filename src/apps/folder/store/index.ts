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
    // createFolder: (
    //   state,
    //   { payload }: PayloadAction<{ name: string; route: string }>
    // ) => {},
    // changeFolderName: (
    //   state,
    //   { payload }: PayloadAction<{ name: string; id: string; route: string }>
    // ) => {},
  },
});

export const { initRoutes } = folderSlice.actions;
export default folderSlice.reducer;
