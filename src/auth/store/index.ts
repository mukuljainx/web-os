import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IAuthState {
  user?: {
    guest?: boolean;
    name: string;
    authInfo?: {
      email: string;
      token: string;
    };
  };
}

const initialState: IAuthState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : undefined,
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
    },
  },
});

export const { guestAccess } = authSlice.actions;
export default authSlice.reducer;
