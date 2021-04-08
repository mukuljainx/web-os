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
import { openApp } from "base/store";

const App = () => {
  // move to more apporpiate place
  React.useEffect(() => {
    window.os = {
      ...window.os,
      openApp: (params) => {
        store.dispatch(openApp(params));
        // store.
      },
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
