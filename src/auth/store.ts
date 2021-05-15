import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "./interface";

interface IAuthState {
  loggedIn: boolean;
  user: Partial<Omit<IUser, "name">> & Pick<IUser, "name">;
}

const user = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user")!)
  : undefined;
const initialState: IAuthState = {
  loggedIn: !!(user || {}).token,
  user,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    guestAccess(state, action: PayloadAction<string>) {
      const user = {
        name: action.payload,
        guest: true,
      };
      localStorage.setItem("user", JSON.stringify(user));
      state.user = user;
      state.loggedIn = true;
    },
    logUser(state) {
      state.loggedIn = true;
    },
    authUser(state, { payload }: PayloadAction<IAuthState["user"]>) {
      state.user = payload;
      state.loggedIn = true;
      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem("user.token", state.user.token!);
    },
  },
});

export const { guestAccess, logUser, authUser } = authSlice.actions;
export default authSlice.reducer;
