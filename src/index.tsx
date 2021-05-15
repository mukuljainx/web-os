import * as React from "react";
import * as ReactDOM from "react-dom";
import Root from "./Root";
//@ts-ignore
import { initializeIcons } from "@fluentui/react";

initializeIcons();

ReactDOM.render(<Root />, document.getElementById("web-os-root"));
