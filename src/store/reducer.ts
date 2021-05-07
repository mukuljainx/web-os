import { combineReducers } from "@reduxjs/toolkit";
import auth from "auth/store";
import base from "base/store";
import folder from "apps/folder/store";
import actionCenter from "apps/actionCenter/store";

const rootReducer = combineReducers({ auth, base, folder, actionCenter });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
