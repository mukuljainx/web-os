import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IApp, IAppGroup } from "base/interfaces";

interface IBaseState {
  runningApp: Record<string, IAppGroup>;

  currentWeight: number;
  menu: {
    show: boolean;
  };
}

const initialState: IBaseState = {
  runningApp: {},
  currentWeight: 0,
  menu: {
    show: false,
  },
};

const baseSlice = createSlice({
  name: "base",
  initialState,
  reducers: {
    bringToTop: (
      state,
      {
        payload: { appName, instanceId },
      }: PayloadAction<{ appName: string; instanceId: string }>
    ) => {
      const runningApp = state.runningApp[appName];
      if (
        runningApp.instances[runningApp.instances.length - 1].id === instanceId
      ) {
        // instance is at top
        if (runningApp.weight === state.currentWeight - 1) {
          return;
        } else {
          runningApp.weight++;
          state.currentWeight++;
          return;
        }
      }
      runningApp.weight = state.currentWeight;
      const index = runningApp.instances.findIndex(
        (instance) => instance.id === instanceId
      );
      // instance is already mounted, bring it to top
      if (index !== -1) {
        const temp = runningApp.instances.splice(index, 1);
        runningApp.instances.push(temp[0]);
        return;
      }
      state.currentWeight++;
    },
    openApp(state, action: PayloadAction<IApp>) {
      const newApp = action.payload;
      const instanceId = `${newApp.appName}-${newApp.id}`;
      const runningApp = state.runningApp[newApp.appName];

      if (runningApp) {
        runningApp.weight = state.currentWeight;
        const index = runningApp.instances.findIndex(
          (instance) => instance.id === instanceId
        );
        // instance is already mounted, bring it to top
        if (index !== -1) {
          const temp = runningApp.instances.splice(index, 1);
          runningApp.instances.push(temp[0]);
          return;
        }
        runningApp.instances.push({ ...newApp, id: instanceId });
      } else {
        state.runningApp[newApp.appName] = {
          initialWeight: state.currentWeight,
          weight: state.currentWeight,
          id: newApp.id,
          name: newApp.appName,
          instances: [{ ...newApp, id: instanceId }],
        };
      }
      // relying on this, to never cross the css z-index limit - 10000
      // TODO: if does, have to reset every app weight that's all
      state.currentWeight++;
    },
    closeApp: (
      state,
      action: PayloadAction<{ appName: string; instanceId: string }>
    ) => {
      const app = state.runningApp[action.payload.appName];
      if (!app) {
        return;
      }

      if (app.instances.length === 1) {
        delete state.runningApp[action.payload.appName];
      } else {
        app.instances = app.instances.filter(
          (instance) => instance.id !== action.payload.instanceId
        );
      }
    },
    toggleStartMenu: (state) => {
      state.menu.show = !state.menu.show;
    },
  },
});

export const { openApp, closeApp, toggleStartMenu, bringToTop } =
  baseSlice.actions;
export default baseSlice.reducer;
