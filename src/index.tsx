import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
//@ts-ignore
import { initializeIcons } from "@fluentui/react";

initializeIcons();

ReactDOM.render(<App />, document.getElementById("web-os-root"));
