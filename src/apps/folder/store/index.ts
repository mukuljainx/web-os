// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { IFile } from "../interfaces";
import { getDefaultRoutes } from "./routes";

interface IBaseState {
  routes: IFile[];
}

const initialState: IBaseState = {
  routes: getDefaultRoutes(),
};

const folderSlice = createSlice({
  name: "folder",
  initialState,
  reducers: {},
});

export const {} = folderSlice.actions;
export default folderSlice.reducer;
