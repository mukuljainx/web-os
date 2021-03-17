import * as React from "react";
import Icon from "icons";

import "./desktop.scss";

const Desktop = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${
          require("display/wallpaper/default.jpg").default
        })`,
      }}
      className="desktop"
    >
      <Icon draggable name="folder" type="DESKTOP" label="Applications" />
    </div>
  );
};

export default Desktop;
