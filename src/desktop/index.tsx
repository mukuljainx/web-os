import * as React from "react";

import Folder from "molecules/folder";
import "./desktop.scss";

const Desktop = () => {
  return (
    <div
      style={{
        // this should be from redux "display" state
        //// <a href='https://www.freepik.com/photos/abstract'>Abstract photo created by wirestock - www.freepik.com</a>
        backgroundImage: `url(${
          require("display/wallpaper/default.jpg").default
        })`,
      }}
      className="image-cover"
    >
      <Folder />
    </div>
  );
};

export default Desktop;
