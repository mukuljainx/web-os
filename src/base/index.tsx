import * as React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import { RootState } from "store";
import useTypedReducer from "utils/hooks/useTypedReducer";
import { actionCreators, initialState } from "base/store";
import { IFolderRoutes } from "base/interfaces";
import Folder from "base/folder";
import { getRoutes } from "base/helper";

interface IProps {}

const Base = ({}: IProps) => {
  let user = useSelector((state: RootState) => state.auth.user);
  const [state, actions] = useTypedReducer(actionCreators, initialState);
  actions;

  if (!user) {
    return <Redirect to="/auth" />;
  }

  let routes: IFolderRoutes[] = [];

  React.useMemo(() => {
    routes = getRoutes(state.root, user!.name).sort((a, b) =>
      a.path.length < b.path.length ? 1 : -1
    );
  }, [state.root]);

  return (
    <BrowserRouter>
      <Switch>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            render={(props) => (
              <Folder {...props} user={user!.name} files={route.files} />
            )}
          />
        ))}
        <Route
          path="/"
          exact
          render={(props) => (
            <Folder {...props} user={user!.name} files={state.root.files!} />
          )}
        ></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default React.memo(Base);
