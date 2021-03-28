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

const initialState: IAuthState = {};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    guestAccess(state, action: PayloadAction<string>) {
      state.user = {
        name: action.payload,
        guest: true,
      };
    },
  },
});

export const { guestAccess } = authSlice.actions;
export default authSlice.reducer;
