import { combineReducers } from "@reduxjs/toolkit";
import auth from "auth/store";
import base from "base/store";
import folder from "apps/folder/store";

const rootReducer = combineReducers({ auth, base, folder });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
