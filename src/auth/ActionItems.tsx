import * as React from "react";
import styled from "styled-components";

import Input, { Button } from "atoms/input";
import MaterialIcon from "atoms/materialIcon";
import If from "atoms/If";

const BackButton = styled(Button)`
  position: static;
  margin-right: 4px;
  border-color: white;
  color: white;
`;

const AuthDisplayString = styled.p<{ selected: boolean }>`
  text-transform: capitalize;
  color: ${({ theme }) => theme.icon.textColor};
  text-shadow: ${({ theme }) => theme.icon.textShadow};
  margin: 16px 0 40px;
  ${({ selected }) => (selected ? "margin-bottom: 16px" : "")}
`;

interface IProps {}

const ActionItems = ({}: IProps) => {
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

  const handleBackClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setSelected(null);
  };

  return filteredActions.map((action) => (
    <div
      data-id={action}
      className="auth__button flex flex-column vertical-center"
      key={action}
      onClick={handleActionClick}
    >
      <div className="auth__button__image"></div>
      <AuthDisplayString selected={action === selected}>
        {action}
      </AuthDisplayString>
      <If condition={selected === "guest"}>
        <div className="flex vertical-center">
          <BackButton onClick={handleBackClick}>
            <MaterialIcon name="west" />
          </BackButton>
          <Input
            withForm
            onSubmit={(value) => {
              console.log(value);
            }}
          />
        </div>
      </If>
    </div>
  ));
};

export default ActionItems;
