import * as React from "react";
import styled from "styled-components";
import { useSpring, animated } from "react-spring";
import { useDispatch } from "react-redux";

import Input, { Button } from "atoms/input";
import MaterialIcon from "atoms/materialIcon";
import If from "atoms/If";
import { guestAccess } from "auth/store";

const BackButton = styled(Button)`
  position: static;
  margin-right: 4px;
`;

const AuthDisplayString = styled.p<{ selected: boolean }>`
  text-transform: capitalize;
  color: ${({ theme }) => theme.icon.textColor};
  text-shadow: ${({ theme }) => theme.icon.textShadow};
  margin: 16px 0 40px;
  ${({ selected }) => (selected ? "margin-bottom: 16px" : "")}
`;

const AuthImage = styled.div`
  border-radius: 50%;
  width: 100px;
  height: 100px;
  background: white;
`;

const ActionWrapper = styled(animated.div)<{ $show: boolean }>`
  width: 202px;
  cursor: pointer;
  ${({ $show }) =>
    !$show
      ? `
    opacity: 0;
    z-index: -2;
    `
      : ``};
  &:not(:last-child) {
    margin-right: 40px;
  }
`;

const Auth = () => {
  const actions = ["login", "signup", "guest"] as const;
  const dispatch = useDispatch();
  const [selected, setSelected] = React.useState<typeof actions[number] | null>(
    null
  );
  const { x } = useSpring({ x: 0 });

  const handleActionClick = (event: React.MouseEvent) => {
    setSelected(
      event.currentTarget.getAttribute("data-id") as typeof actions[number]
    );
  };
  const handleBackClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setSelected(null);
  };

  React.useEffect(() => {
    if (selected === "guest") {
      x.start({ from: 0, to: -242 });
    }
  }, [selected]);

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
          {actions.map((action) => (
            <ActionWrapper
              $show={!selected || selected === action}
              style={action === "guest" ? { x } : {}}
              data-id={action}
              className="flex flex-column vertical-center"
              key={action}
              onClick={handleActionClick}
            >
              <AuthImage />
              <AuthDisplayString selected={action === selected}>
                {action}
              </AuthDisplayString>
              <If condition={selected === "guest" && action === "guest"}>
                <div className="flex vertical-center">
                  <BackButton onClick={handleBackClick}>
                    <MaterialIcon name="west" bold type="round" size={14} />
                  </BackButton>
                  <Input
                    withForm
                    onSubmit={(value) => {
                      dispatch(guestAccess(value));
                    }}
                  />
                </div>
              </If>
            </ActionWrapper>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Auth;
