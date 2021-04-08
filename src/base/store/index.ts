import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IApp, IAppGroup, IFile } from "base/interfaces";
import { getDefaultRoutes } from "base/store/routes";

interface IBaseState {
  apps: Record<string, IAppGroup>;
  routes: IFile[];
}

const initialState: IBaseState = { apps: {}, routes: getDefaultRoutes() };

const authSlice = createSlice({
  name: "base",
  initialState,
  reducers: {
    openApp(state, action: PayloadAction<IApp>) {
      const newApp = action.payload;
      const instanceId = `${newApp.id}-${new Date().getTime()}`;
      const runningApp = state.apps[newApp.id];
      if (runningApp) {
        runningApp.instances.push({ ...newApp, id: instanceId });
      } else {
        state.apps[newApp.id] = {
          id: newApp.id,
          name: newApp.name,
          instances: [{ ...newApp, id: instanceId }],
        };
      }
    },
  },
});

const { openApp } = authSlice.actions;

export { openApp };
export default authSlice.reducer;
