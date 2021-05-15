import * as React from "react";
import { useSelector } from "react-redux";

import Auth from "auth";
import Base from "base";

const App = () => {
  const auth = useSelector((state) => state.auth);

  return auth.user && auth.loggedIn ? <Base /> : <Auth />;
};

export default App;
