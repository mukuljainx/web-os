import * as React from "react";

import IconLayout from "molecules/iconLayout";
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
      <IconLayout></IconLayout>
    </div>
  );
};

export default Desktop;
