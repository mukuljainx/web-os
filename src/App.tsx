import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "normalize.css";
import { Provider } from "react-redux";

import "theme/index.scss";
import store from "store";
import Desktop from "desktop";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/" component={Desktop} />
        </Switch>
      </Router>
    </Provider>
  );
};

export default App;
