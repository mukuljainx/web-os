import * as React from "react";
import { render } from "react-dom";
import App from "./App";
//@ts-ignore
import { initializeIcons } from "@fluentui/react";

initializeIcons();

render(<App />, document.getElementById("web-os-root"));
