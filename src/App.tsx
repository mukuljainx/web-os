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

Switch;
Route;

const App = () => {
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
