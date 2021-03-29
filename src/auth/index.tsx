import * as React from "react";

import Input from "atoms/input";
import "./auth.scss";

const Auth = () => {
  const actions = ["login", "signup", "guest"] as const;
  const [selected, setSelected] = React.useState<typeof actions[number] | null>(
    null
  );

  const filteredActions = actions.filter((a) =>
    selected ? a === selected : true
  );

  const handleActionClick = (event: React.MouseEvent) => {
    setSelected(
      event.currentTarget.getAttribute("data-id") as typeof actions[number]
    );
  };

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
          {filteredActions.map((action) => (
            <div
              data-id={action}
              className="auth__button flex flex-column vertical-center"
              key={action}
              onClick={handleActionClick}
            >
              <div className="auth__button__image"></div>
              <p className="auth__button__text">{action}</p>
              <Input
                withForm
                onSubmit={(value) => {
                  console.log(value);
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Auth;
