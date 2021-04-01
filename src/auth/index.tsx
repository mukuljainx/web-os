import * as React from "react";
import { useTransition, animated } from "react-spring";

import "./auth.scss";

const Auth = () => {
  const transitions = useTransition(items, (item) => item.key, {
    from: { transform: "translate3d(0,-40px,0)" },
    enter: { transform: "translate3d(0,0px,0)" },
    leave: { transform: "translate3d(0,-40px,0)" },
  });

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
      <div className="flex vertical-center horizontal-center auth h-100">
        <div className="flex">
          {transitions.map(({ item, props, key }) => (
            <animated.div key={key} style={props}>
              {item.text}
            </animated.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Auth;
