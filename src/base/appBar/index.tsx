import Icon from "atoms/icons";
import { IAppGroup } from "base/interfaces";
import * as React from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  height: 64px;
  flex-shrink: 0;
`;

interface IProps {
  apps: Record<string, IAppGroup>;
}

const AppBar = ({ apps }: IProps) => {
  const sortedApps = Object.values(apps).map((app) => app);
  console.log(sortedApps);

  return (
    <Wrapper data-id="app-bar">
      {sortedApps.map((app) => (
        <div>
          {app.instances.map(() => (
            <Icon name={app.id} />
          ))}
        </div>
      ))}
    </Wrapper>
  );
};

export default AppBar;
