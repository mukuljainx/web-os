import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "normalize.css";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";

import "theme/index.scss";
import store from "store";
import theme from "theme";
// import Desktop from "desktop";
import Auth from "auth";

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route path="/auth" component={Auth} />
          </Switch>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
