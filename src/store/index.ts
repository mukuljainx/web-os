import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import reducer, { RootState as RootStateX } from "./reducer";

type RootState = RootStateX;

export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export { RootState };
