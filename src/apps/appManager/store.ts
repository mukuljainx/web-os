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
        return thunkAPI.rejectWithValue(e);
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
      if (!action.payload || !Array.isArray(action.payload)) {
        state.error = "Unable to fetch";
        return;
      }
      const apps: Record<string, IApp> = {};
      [...state.apps, ...action.payload].forEach((a) => {
        apps[a._id] = a;
      });
      state.apps = [...Object.values(apps)];
      state.loading = false;
      state.error = undefined;
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
