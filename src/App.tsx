import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "normalize.css";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";

import "theme/index.scss";
import store from "store";
import theme from "theme";
import Auth from "auth";
import Base from "base";
import { openApp, closeApp, bringToTop } from "base/store";

const App = () => {
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
        <Router>
          <Switch>
            <Route path="/auth" component={Auth} />
            <Route path="/" component={Base} />
          </Switch>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
