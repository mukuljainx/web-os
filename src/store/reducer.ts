import { combineReducers } from "@reduxjs/toolkit";
import auth from "auth/store";
import base from "base/store";

const rootReducer = combineReducers({ auth, base });

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
