import { combineReducers } from "@reduxjs/toolkit";
import auth from "auth/store";
import base from "base/store";
import folder from "apps/folder/store";
import actionCenter from "apps/actionCenter/store";
import appManager from "apps/appManager/store";

const rootReducer = combineReducers({
  auth,
  base,
  folder,
  actionCenter,
  appManager,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
