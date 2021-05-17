import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "utils/api";
import { IApp } from "./interface";

interface IAppManagerState {
  apps: IApp[];
  loading: boolean;
  error?: any;
}

const initialState: IAppManagerState = { apps: [], loading: true };

const getAppsAsync = createAsyncThunk(
  "appManager/getAppsAsync",
  (_, thunkAPI) => {
    return api
      .get("/manager/apps/")
      .then(({ data }) => data)
      .catch((e) => {
        thunkAPI.rejectWithValue(e);
      });
  }
);

const authSlice = createSlice({
  name: "appManager",
  initialState,
  reducers: {
    getApps: () => {},
  },
  extraReducers: {
    // Add reducers for additional action types here, and handle loading state as needed
    [getAppsAsync.fulfilled.type]: (state, action) => {
      state.apps.push(action.payload);
      state.loading = false;
    },
    [getAppsAsync.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error;
    },
  },
});

export const {} = authSlice.actions;
export { getAppsAsync };
export default authSlice.reducer;
