import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";

import reducer, { RootState } from "./reducer";

export default configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export { RootState };
