import * as React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "normalize.css";

import "theme/index.scss";
import Desktop from "desktop";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Desktop} />
      </Switch>
    </Router>
  );
};

export default App;
