import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import logger from "redux-logger";

export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});
