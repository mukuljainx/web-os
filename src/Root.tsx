import * as React from "react";
import "normalize.css";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";

import "theme/index.scss";
import store from "store";
import theme from "theme";
import { openApp, closeApp, bringToTop } from "base/store";
import App from "App";

const Root = () => {
  // move to more apporpiate place

  React.useEffect(() => {
    // init global object
    window.os = {
      ...window.os,
      openApp: (param) => store.dispatch(openApp(param)),
      closeApp: (param) => store.dispatch(closeApp(param)),
      bringToTop: (param) => store.dispatch(bringToTop(param)),
      events: {},
    };

    // housekeeping
    return () => {
      (window.os as any) = undefined;
    };
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  );
};

export default Root;
