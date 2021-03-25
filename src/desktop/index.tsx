import * as React from "react";

import Folder from "molecules/folder";
import "./desktop.scss";

const Desktop = () => {
  return (
    <div
      style={{
        // this should be from redux "display" state
        backgroundImage: `url(${
          require("display/wallpaper/default.jpg").default
        })`,
      }}
      className="desktop"
    >
      <Folder />
    </div>
  );
};

export default Desktop;
