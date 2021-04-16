import DesktopIcon from "atoms/icons";
import { IAppGroup } from "base/interfaces";
import * as React from "react";
import styled from "styled-components";
import { Acrylic } from "atoms/styled";
import { Icon } from "@fluentui/react";

const Wrapper = styled(Acrylic)`
  display: flex;
  width: 100%;
  height: 52px;
  position: fixed;
  bottom: 0;
  justify-content: space-between;
`;

interface IProps {
  apps: Record<string, IAppGroup>;
}

const AppBar = ({ apps }: IProps) => {
  const sortedApps = Object.values(apps).sort((a, b) =>
    a.initialWeight > b.initialWeight ? 1 : -1
  );

  return (
    <Wrapper data-id="app-bar">
      <div>
        {sortedApps.map((app) => (
          <div>
            <DesktopIcon key={app.id} name={app.id} />
          </div>
        ))}
      </div>
      <div>
        <Icon iconName="ChevronUp" />
      </div>
    </Wrapper>
  );
};

export default AppBar;
