import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IApp, IAppGroup } from "base/interfaces";

interface IBaseState {
  apps: Record<string, IAppGroup>;

  currentWeight: number;
  menu: {
    show: boolean;
  };
}

const initialState: IBaseState = {
  apps: {},
  currentWeight: 0,
  menu: {
    show: false,
  },
};

const baseSlice = createSlice({
  name: "base",
  initialState,
  reducers: {
    openApp(state, action: PayloadAction<IApp>) {
      const newApp = action.payload;
      const instanceId = `${newApp.appName}-${newApp.id}`;
      const runningApp = state.apps[newApp.appName];

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
        state.apps[newApp.appName] = {
          initialWeight: state.currentWeight,
          weight: state.currentWeight,
          id: newApp.id,
          name: newApp.appName,
          instances: [{ ...newApp, id: instanceId }],
        };
      }
      // relying on this to never cross the css z-index limit - 10000
      // TODO: if does, have to reset every app weight that's all
      state.currentWeight++;
    },
    closeApp: (
      state,
      action: PayloadAction<{ appName: string; instanceId: string }>
    ) => {
      const app = state.apps[action.payload.appName];
      if (!app) {
        return;
      }

      if (app.instances.length === 1) {
        delete state.apps[action.payload.appName];
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

export const { openApp, closeApp, toggleStartMenu } = baseSlice.actions;
export default baseSlice.reducer;
