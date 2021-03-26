import Desktop from "desktop";
import * as React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

interface IProps {}

const Folder = ({}: IProps) => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/">
          <Desktop />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Folder;
