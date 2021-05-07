import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IButtonAction, INotification } from "../interface";
import {
  buttonActions,
  dummyNotification,
} from "../quickSettings/buttonActionList";

interface IBaseState {
  show: boolean;
  notifications: INotification[];
  buttonActions: IButtonAction[];
  slider: {
    volume: number;
    brigthness: number;
  };
}

const initialState: IBaseState = {
  show: false,
  notifications: dummyNotification,
  buttonActions: buttonActions.map((x) => ({ ...x, selected: false })),
  slider: {
    volume: 40,
    brigthness: 40,
  },
};

const baseSlice = createSlice({
  name: "base",
  initialState,
  reducers: {
    toggleQuickActions: (state) => {
      state.show = !state.show;
    },
    toggleButton: (
      state,
      { payload: { index } }: PayloadAction<{ index: number; id: string }>
    ) => {
      state.buttonActions[index].selected = !state.buttonActions[index]
        .selected;
    },
    sliderOnChange: (
      state,
      {
        payload: { value, target },
      }: PayloadAction<{
        value: number;
        target: keyof IBaseState["slider"];
      }>
    ) => {
      state.slider[target] = value;
    },
    addNotification: (
      state,
      {
        payload: { title, description },
      }: PayloadAction<Omit<INotification, "id" | "date">>
    ) => {
      state.notifications = [
        ...state.notifications,
        {
          title,
          description,
          id: state.notifications.length,
          date: new Date().getTime(),
        },
      ];
    },
  },
});

export const {
  toggleQuickActions,
  toggleButton,
  sliderOnChange,
} = baseSlice.actions;
export default baseSlice.reducer;
